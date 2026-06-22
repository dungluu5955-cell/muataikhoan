import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminSession, isAdminConfigured } from "@/lib/auth";

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1)
});

export async function POST(request: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json({ message: "Biến môi trường admin chưa được cấu hình." }, { status: 500 });
  }

  const body = await request.json();
  const parsed = loginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ message: "Dữ liệu đăng nhập không hợp lệ." }, { status: 400 });
  }

  if (
    parsed.data.username !== process.env.ADMIN_USERNAME ||
    parsed.data.password !== process.env.ADMIN_PASSWORD
  ) {
    return NextResponse.json({ message: "Sai username hoặc password." }, { status: 401 });
  }

  const token = await createAdminSession(parsed.data.username);
  const response = NextResponse.json({ message: "Đăng nhập thành công." });
  response.cookies.set("mtk_admin_session", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });

  return response;
}
