import { z } from "zod";

export const productStatusSchema = z.enum(["ACTIVE", "SOLD", "HIDDEN"]);

export const productAttributeInputSchema = z.object({
  label: z.string().min(1).max(80),
  value: z.string().min(1).max(300)
});

export const productInputSchema = z.object({
  title: z.string().min(3).max(180),
  slug: z.string().min(3).max(180),
  sku: z.string().max(120).optional().nullable(),
  category: z.string().min(2).max(120),
  categoryDescription: z.string().max(240).optional().nullable(),
  price: z.union([z.string(), z.number()]),
  salePrice: z.union([z.string(), z.number()]).optional().nullable(),
  originalPrice: z.union([z.string(), z.number()]).optional().nullable(),
  status: productStatusSchema.default("ACTIVE"),
  shortDescription: z.string().max(400).optional().nullable(),
  description: z.string().min(10),
  thumbnailUrl: z.string().url(),
  thumbnailPublicId: z.string().max(255).optional().nullable(),
  isFeatured: z.boolean().default(false),
  contactLink: z.string().url().optional().nullable(),
  attributes: z.array(productAttributeInputSchema).default([]),
  images: z
    .array(
      z.object({
        imageUrl: z.string().url(),
        publicId: z.string().max(255).optional().nullable(),
        sortOrder: z.number().int().min(0).optional()
      })
    )
    .default([])
});

export type ProductInput = z.infer<typeof productInputSchema>;
