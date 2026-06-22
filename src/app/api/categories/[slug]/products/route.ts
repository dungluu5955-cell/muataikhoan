import { NextResponse } from "next/server";
import { getProductsByCategorySlug } from "@/lib/product-service";

type Context = {
  params: Promise<{ slug: string }>;
};

export async function GET(_: Request, { params }: Context) {
  const { slug } = await params;
  const items = await getProductsByCategorySlug(slug);
  return NextResponse.json({ items });
}
