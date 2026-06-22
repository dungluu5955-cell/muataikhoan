import { prisma } from "@/lib/prisma";
import { sampleProducts } from "@/lib/sample-data";
import { slugify } from "@/lib/slug";

export type CategoryView = {
  id: string;
  name: string;
  slug: string;
  description: string;
  productCount: number;
};

function deriveCategoriesFromSample(): CategoryView[] {
  const map = new Map<string, CategoryView>();

  for (const product of sampleProducts) {
    const slug = product.categorySlug ?? slugify(product.category);
    const existing = map.get(slug);

    if (existing) {
      existing.productCount += 1;
      continue;
    }

    map.set(slug, {
      id: `sample-category-${slug}`,
      name: product.category,
      slug,
      description: `Danh mục ${product.category} được tạo tự động từ dữ liệu mẫu.`,
      productCount: 1
    });
  }

  return Array.from(map.values());
}

export async function getCategories(): Promise<CategoryView[]> {
  try {
    const items = await prisma.category.findMany({
      include: {
        _count: {
          select: { products: true }
        }
      },
      orderBy: [{ products: { _count: "desc" } }, { name: "asc" }]
    });

    return items.map((item) => ({
      id: item.id,
      name: item.name,
      slug: item.slug,
      description: item.description ?? `Danh mục ${item.name}.`,
      productCount: item._count.products
    }));
  } catch {
    return deriveCategoriesFromSample();
  }
}

export async function getCategoryBySlug(slug: string) {
  const categories = await getCategories();
  return categories.find((item) => item.slug === slug) ?? null;
}

export async function getCategoryById(id: string) {
  const categories = await getCategories();
  return categories.find((item) => item.id === id) ?? null;
}

export async function ensureCategory(input: { name: string; description?: string | null }) {
  const normalizedName = input.name.trim();
  const slug = slugify(normalizedName);

  return prisma.category.upsert({
    where: { slug },
    update: {
      name: normalizedName,
      description: input.description?.trim() || null
    },
    create: {
      name: normalizedName,
      slug,
      description: input.description?.trim() || null
    }
  });
}

export async function createCategory(input: { name: string; description?: string | null }) {
  const normalizedName = input.name.trim();
  const slug = slugify(normalizedName);

  return prisma.category.create({
    data: {
      name: normalizedName,
      slug,
      description: input.description?.trim() || null
    }
  });
}

export async function updateCategory(id: string, input: { name: string; description?: string | null }) {
  const normalizedName = input.name.trim();
  const slug = slugify(normalizedName);

  return prisma.category.update({
    where: { id },
    data: {
      name: normalizedName,
      slug,
      description: input.description?.trim() || null
    }
  });
}

export async function deleteCategory(id: string) {
  const category = await prisma.category.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          products: true
        }
      }
    }
  });

  if (!category) {
    throw new Error("CATEGORY_NOT_FOUND");
  }

  if (category._count.products > 0) {
    throw new Error("CATEGORY_HAS_PRODUCTS");
  }

  await prisma.category.delete({
    where: { id }
  });
}
