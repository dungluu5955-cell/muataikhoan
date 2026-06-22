import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Da dang xuat." });
  response.cookies.set("mtk_admin_session", "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0
  });
  return response;
}
