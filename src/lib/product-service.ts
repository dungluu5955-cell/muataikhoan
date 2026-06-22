import { ProductStatus } from "@prisma/client";
import { ensureCategory } from "@/lib/category-service";
import { prisma } from "@/lib/prisma";
import { sampleProducts } from "@/lib/sample-data";
import { slugify } from "@/lib/slug";
import type { SampleProduct } from "@/types/product";
import { productInputSchema, type ProductInput } from "@/lib/validation";

function toPriceLabel(value: string | number | null | undefined) {
  const numericValue = Number(value ?? 0);

  if (Number.isNaN(numericValue)) {
    return "0d";
  }

  return `${new Intl.NumberFormat("vi-VN").format(numericValue)}d`;
}

function decimalLikeToValue(
  value: { toNumber?: () => number } | number | string | null | undefined
): string | number | null | undefined {
  if (typeof value === "object" && value && "toNumber" in value) {
    return value.toNumber?.();
  }

  return value as string | number | null | undefined;
}

function mapDbProduct(product: {
  id: string;
  slug: string;
  title: string;
  category: { name: string; slug: string };
  status: ProductStatus;
  price: { toNumber?: () => number } | number | string;
  salePrice?: { toNumber?: () => number } | number | string | null;
  shortDescription: string | null;
  description: string;
  images?: { imageUrl: string; publicId: string | null; sortOrder: number }[];
  attributes?: { label: string; value: string; sortOrder: number }[];
  thumbnailUrl?: string;
  isFeatured?: boolean;
}) {
  const rawPrice = decimalLikeToValue(product.price);
  const rawSalePrice = decimalLikeToValue(product.salePrice);
  const priceValue = Number(rawPrice ?? 0);
  const salePriceValue = rawSalePrice === null || rawSalePrice === undefined ? null : Number(rawSalePrice);

  return {
    id: product.id,
    slug: product.slug,
    title: product.title,
    category: product.category.name,
    categorySlug: product.category.slug,
    status: product.status.toLowerCase(),
    priceValue,
    salePriceValue,
    priceLabel: toPriceLabel(rawPrice),
    salePriceLabel: rawSalePrice ? toPriceLabel(rawSalePrice) : null,
    shortDescription: product.shortDescription ?? "",
    description: product.description,
    thumbnailUrl: product.thumbnailUrl ?? "",
    isFeatured: product.isFeatured ?? false,
    attributes: (product.attributes ?? []).map((item) => ({
      label: item.label,
      value: item.value
    })),
    images: (product.images ?? []).map((item) => ({
      imageUrl: item.imageUrl,
      publicId: item.publicId,
      sortOrder: item.sortOrder
    }))
  };
}

function normalizeInput(input: ProductInput) {
  return {
    ...input,
    slug: slugify(input.slug || input.title),
    sku: input.sku || null,
    shortDescription: input.shortDescription || null,
    thumbnailPublicId: input.thumbnailPublicId || null,
    categoryDescription: input.categoryDescription || null,
    salePrice:
      input.salePrice === undefined || input.salePrice === null || input.salePrice === ""
        ? null
        : String(input.salePrice),
    originalPrice:
      input.originalPrice === undefined || input.originalPrice === null || input.originalPrice === ""
        ? null
        : String(input.originalPrice)
  };
}

export async function getPublicProducts() {
  try {
    const items = await prisma.product.findMany({
      where: { status: ProductStatus.ACTIVE },
      include: {
        category: true,
        images: {
          orderBy: { sortOrder: "asc" }
        },
        attributes: {
          orderBy: { sortOrder: "asc" }
        }
      },
      orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }]
    });

    return items.map(mapDbProduct);
  } catch {
    return sampleProducts;
  }
}

export async function getPublicProductBySlug(slug: string) {
  try {
    const item = await prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
        attributes: {
          orderBy: { sortOrder: "asc" }
        },
        images: {
          orderBy: { sortOrder: "asc" }
        }
      }
    });

    return item ? mapDbProduct(item) : null;
  } catch {
    return sampleProducts.find((item) => item.slug === slug) ?? null;
  }
}

export async function getProducts() {
  try {
    const items = await prisma.product.findMany({
      include: {
        category: true,
        images: {
          orderBy: { sortOrder: "asc" }
        },
        attributes: {
          orderBy: { sortOrder: "asc" }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    return items.map(mapDbProduct);
  } catch {
    return sampleProducts.map((item, index) => ({
      id: `sample-${index + 1}`,
      ...item
    }));
  }
}

export async function getProductById(id: string): Promise<SampleProduct | null> {
  try {
    const item = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        attributes: {
          orderBy: { sortOrder: "asc" }
        },
        images: {
          orderBy: { sortOrder: "asc" }
        }
      }
    });

    return item ? mapDbProduct(item) : null;
  } catch {
    return sampleProducts.find((item, index) => `sample-${index + 1}` === id) ?? null;
  }
}

export async function createProduct(payload: unknown) {
  const parsed = productInputSchema.parse(payload);
  const input = normalizeInput(parsed);
  const category = await ensureCategory({
    name: input.category,
    description: input.categoryDescription
  });

  const item = await prisma.product.create({
    data: {
      title: input.title,
      slug: input.slug,
      sku: input.sku,
      categoryId: category.id,
      price: String(input.price),
      salePrice: input.salePrice,
      originalPrice: input.originalPrice,
      status: input.status,
      shortDescription: input.shortDescription,
      description: input.description,
      thumbnailUrl: input.thumbnailUrl,
      thumbnailPublicId: input.thumbnailPublicId,
      isFeatured: input.isFeatured,
      attributes: {
        create: input.attributes.map((attribute, index) => ({
          label: attribute.label,
          value: attribute.value,
          sortOrder: index
        }))
      },
      images: {
        create: input.images.map((image, index) => ({
          imageUrl: image.imageUrl,
          publicId: image.publicId ?? null,
          sortOrder: image.sortOrder ?? index
        }))
      }
    },
    include: {
      category: true,
      attributes: {
        orderBy: { sortOrder: "asc" }
      },
      images: {
        orderBy: { sortOrder: "asc" }
      }
    }
  });

  return mapDbProduct(item);
}

export async function updateProduct(id: string, payload: unknown) {
  const parsed = productInputSchema.parse(payload);
  const input = normalizeInput(parsed);
  const category = await ensureCategory({
    name: input.category,
    description: input.categoryDescription
  });

  const item = await prisma.product.update({
    where: { id },
    data: {
      title: input.title,
      slug: input.slug,
      sku: input.sku,
      categoryId: category.id,
      price: String(input.price),
      salePrice: input.salePrice,
      originalPrice: input.originalPrice,
      status: input.status,
      shortDescription: input.shortDescription,
      description: input.description,
      thumbnailUrl: input.thumbnailUrl,
      thumbnailPublicId: input.thumbnailPublicId,
      isFeatured: input.isFeatured,
      attributes: {
        deleteMany: {},
        create: input.attributes.map((attribute, index) => ({
          label: attribute.label,
          value: attribute.value,
          sortOrder: index
        }))
      },
      images: {
        deleteMany: {},
        create: input.images.map((image, index) => ({
          imageUrl: image.imageUrl,
          publicId: image.publicId ?? null,
          sortOrder: image.sortOrder ?? index
        }))
      }
    },
    include: {
      category: true,
      attributes: {
        orderBy: { sortOrder: "asc" }
      },
      images: {
        orderBy: { sortOrder: "asc" }
      }
    }
  });

  return mapDbProduct(item);
}

export async function deleteProduct(id: string) {
  await prisma.product.delete({
    where: { id }
  });
}

export async function getPromotionProducts() {
  const items = await getPublicProducts();
  return items.filter((item) => Boolean(item.salePriceLabel));
}

export async function getProductsByCategorySlug(categorySlug: string) {
  try {
    const items = await prisma.product.findMany({
      where: {
        status: ProductStatus.ACTIVE,
        category: {
          slug: categorySlug
        }
      },
      include: {
        category: true,
        attributes: {
          orderBy: { sortOrder: "asc" }
        }
      },
      orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }]
    });

    return items.map(mapDbProduct);
  } catch {
    return sampleProducts.filter((item) => (item.categorySlug ?? slugify(item.category)) === categorySlug);
  }
}
