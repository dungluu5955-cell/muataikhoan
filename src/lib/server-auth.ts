import { NextResponse } from "next/server";
import { getCurrentAdminSession } from "@/lib/auth";

export async function assertAdminRequest() {
  const session = await getCurrentAdminSession();

  if (!session) {
    return NextResponse.json({ message: "Bạn chưa đăng nhập quản trị." }, { status: 401 });
  }

  return null;
}
