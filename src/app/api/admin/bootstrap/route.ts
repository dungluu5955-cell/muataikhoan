import { NextResponse } from "next/server";
import { ensureCategory } from "@/lib/category-service";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slug";

const sampleSeed = [
  {
    title: "Canva Pro Team",
    category: "AI tools",
    price: "89000",
    description: "Tài khoản team phù hợp cho nhóm nhỏ.",
    shortDescription: "Tài khoản mẫu cho phase 1.",
    thumbnailUrl: "https://res.cloudinary.com/demo/image/upload/sample.jpg"
  },
  {
    title: "Spotify Premium",
    category: "Streaming",
    price: "39000",
    description: "Sản phẩm mẫu để kiểm thử flow CRUD.",
    shortDescription: "Dữ liệu demo.",
    thumbnailUrl: "https://res.cloudinary.com/demo/image/upload/sample.jpg"
  }
];

export async function POST() {
  try {
    await Promise.all(
      sampleSeed.map(async (item, index) => {
        const category = await ensureCategory({
          name: item.category
        });

        return prisma.product.upsert({
          where: { slug: slugify(item.title) },
          update: {},
          create: {
            title: item.title,
            slug: slugify(item.title),
            categoryId: category.id,
            price: item.price,
            description: item.description,
            shortDescription: item.shortDescription,
            thumbnailUrl: item.thumbnailUrl,
            isFeatured: index === 0
          } as any
        });
      })
    );

    return NextResponse.json({ message: "Đã seed dữ liệu mẫu." });
  } catch {
    return NextResponse.json({ message: "Không thể seed dữ liệu. Kiểm tra database và Prisma." }, { status: 500 });
  }
}
