import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const ADMIN_COOKIE_NAME = "mtk_admin_session";

function getAuthSecret() {
  const secret = process.env.ADMIN_AUTH_SECRET;

  if (!secret) {
    throw new Error("Missing ADMIN_AUTH_SECRET");
  }

  return new TextEncoder().encode(secret);
}

export function isAdminConfigured() {
  return Boolean(
    process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD && process.env.ADMIN_AUTH_SECRET
  );
}

export function getAdminCookieName() {
  return ADMIN_COOKIE_NAME;
}

export async function createAdminSession(username: string) {
  return new SignJWT({ username, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getAuthSecret());
}

export async function verifyAdminSession(token: string) {
  try {
    const result = await jwtVerify(token, getAuthSecret());
    return result.payload as { username: string; role: string };
  } catch {
    return null;
  }
}

export async function getCurrentAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  return verifyAdminSession(token);
}
