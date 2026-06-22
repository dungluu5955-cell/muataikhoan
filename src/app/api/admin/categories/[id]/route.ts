import { NextResponse } from "next/server";
import { z } from "zod";
import { assertAdminRequest } from "@/lib/server-auth";
import { deleteCategory, updateCategory } from "@/lib/category-service";

const categorySchema = z.object({
  name: z.string().min(2).max(120),
  description: z.string().max(240).optional().nullable()
});

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
    const input = categorySchema.parse(body);
    const item = await updateCategory(id, input);
    return NextResponse.json({ message: "Đã cập nhật danh mục.", item });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Dữ liệu danh mục không hợp lệ." }, { status: 400 });
    }

    return NextResponse.json({ message: "Không thể cập nhật danh mục." }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: Context) {
  const authError = await assertAdminRequest();

  if (authError) {
    return authError;
  }

  try {
    const { id } = await params;
    await deleteCategory(id);
    return NextResponse.json({ message: "Đã xóa danh mục." });
  } catch (error) {
    if (error instanceof Error && error.message === "CATEGORY_HAS_PRODUCTS") {
      return NextResponse.json({ message: "Không thể xóa danh mục đang có sản phẩm." }, { status: 400 });
    }

    return NextResponse.json({ message: "Không thể xóa danh mục." }, { status: 500 });
  }
}
