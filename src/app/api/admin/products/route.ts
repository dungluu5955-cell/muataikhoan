import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { createProduct, getProducts } from "@/lib/product-service";
import { assertAdminRequest } from "@/lib/server-auth";

export async function GET() {
  const authError = await assertAdminRequest();

  if (authError) {
    return authError;
  }

  const items = await getProducts();
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  const authError = await assertAdminRequest();

  if (authError) {
    return authError;
  }

  try {
    const body = await request.json();
    const product = await createProduct(body);
    return NextResponse.json({ message: "Đã tạo sản phẩm.", item: product }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ message: "Dữ liệu sản phẩm không hợp lệ.", issues: error.flatten() }, { status: 400 });
    }

    return NextResponse.json({ message: "Không thể tạo sản phẩm." }, { status: 500 });
  }
}
