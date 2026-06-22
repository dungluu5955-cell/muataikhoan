import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { assertAdminRequest } from "@/lib/server-auth";
import { deleteProduct, updateProduct } from "@/lib/product-service";

type Context = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, { params }: Context) {
  const authError = await assertAdminRequest();

  if (authError) {
    return authError;
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const item = await updateProduct(id, body);
    return NextResponse.json({ message: "Đã cập nhật sản phẩm.", item });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ message: "Dữ liệu cập nhật không hợp lệ.", issues: error.flatten() }, { status: 400 });
    }

    return NextResponse.json({ message: "Không thể cập nhật sản phẩm." }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: Context) {
  const authError = await assertAdminRequest();

  if (authError) {
    return authError;
  }

  const { id } = await params;
  await deleteProduct(id);
  return NextResponse.json({ message: "Đã xóa sản phẩm." });
}
