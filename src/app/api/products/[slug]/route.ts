import { NextResponse } from "next/server";
import { getPublicProductBySlug } from "@/lib/product-service";

type Context = {
  params: Promise<{ slug: string }>;
};

export async function GET(_: Request, { params }: Context) {
  const { slug } = await params;
  const product = await getPublicProductBySlug(slug);

  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}
