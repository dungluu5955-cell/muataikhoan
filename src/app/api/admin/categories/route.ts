import { NextResponse } from "next/server";
import { z } from "zod";
import { assertAdminRequest } from "@/lib/server-auth";
import { createCategory, getCategories } from "@/lib/category-service";

const categorySchema = z.object({
  name: z.string().min(2).max(120),
  description: z.string().max(240).optional().nullable()
});

export async function GET() {
  const authError = await assertAdminRequest();

  if (authError) {
    return authError;
  }

  const items = await getCategories();
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  const authError = await assertAdminRequest();

  if (authError) {
    return authError;
  }

  try {
    const body = await request.json();
    const input = categorySchema.parse(body);
    const item = await createCategory(input);
    return NextResponse.json({ message: "Đã tạo danh mục.", item }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Dữ liệu danh mục không hợp lệ." }, { status: 400 });
    }

    return NextResponse.json({ message: "Không thể tạo danh mục." }, { status: 500 });
  }
}
