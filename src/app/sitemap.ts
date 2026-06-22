import type { MetadataRoute } from "next";
import { getPublicProducts } from "@/lib/product-service";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const products = await getPublicProducts();

  return [
    {
      url: siteUrl,
      lastModified: new Date()
    },
    {
      url: `${siteUrl}/san-pham`,
      lastModified: new Date()
    },
    {
      url: `${siteUrl}/tin-tuc`,
      lastModified: new Date()
    },
    {
      url: `${siteUrl}/lien-he`,
      lastModified: new Date()
    },
    ...products.map((product) => ({
      url: `${siteUrl}/san-pham/${product.slug}`,
      lastModified: new Date()
    }))
  ];
}
