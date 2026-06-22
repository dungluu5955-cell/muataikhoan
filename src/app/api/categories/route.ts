import { NextResponse } from "next/server";
import { getCategories } from "@/lib/category-service";

export async function GET() {
  const items = await getCategories();
  return NextResponse.json({ items });
}
