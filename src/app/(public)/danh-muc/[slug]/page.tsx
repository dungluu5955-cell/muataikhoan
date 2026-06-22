import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/shared/product-grid";
import { getCategoryBySlug } from "@/lib/category-service";
import { getProductsByCategorySlug } from "@/lib/product-service";

type CategoryDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export default async function CategoryDetailPage({ params }: CategoryDetailPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = await getProductsByCategorySlug(slug);

  return (
    <div className="shell py-16">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">Danh mục sản phẩm</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">{category.name}</h1>
        <p className="mt-4 text-base leading-7 text-slate-600">{category.description}</p>
      </div>
      <div className="mt-10">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
