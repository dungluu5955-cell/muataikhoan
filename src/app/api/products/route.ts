import { NextResponse } from "next/server";
import { getPublicProducts } from "@/lib/product-service";

export async function GET() {
  const items = await getPublicProducts();
  return NextResponse.json({ items });
}
