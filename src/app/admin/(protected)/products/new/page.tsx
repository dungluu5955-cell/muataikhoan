import { ProductEditorForm } from "@/components/admin/product-editor-form";
import { getCategories } from "@/lib/category-service";

export default async function NewProductPage() {
  const categories = await getCategories();

  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Sản phẩm</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">Thêm sản phẩm mới</h1>
      <div className="mt-8">
        <ProductEditorForm mode="create" categories={categories} />
      </div>
    </div>
  );
}
