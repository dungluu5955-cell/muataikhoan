import { notFound } from "next/navigation";
import { ProductEditorForm } from "@/components/admin/product-editor-form";
import { getCategories } from "@/lib/category-service";
import { getProductById } from "@/lib/product-service";

type EditProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const [product, categories] = await Promise.all([getProductById(id), getCategories()]);

  if (!product) {
    notFound();
  }

  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Sản phẩm</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">Chỉnh sửa sản phẩm</h1>
      <p className="mt-3 text-sm text-slate-400">Cập nhật thông tin, hình ảnh và danh mục sản phẩm.</p>
      <div className="mt-8">
        <ProductEditorForm mode="edit" productId={id} initialProduct={product} categories={categories} />
      </div>
    </div>
  );
}
