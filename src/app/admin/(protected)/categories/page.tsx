import Link from "next/link";
import { CategoryManager } from "@/components/admin/category-manager";
import { getCategories } from "@/lib/category-service";

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Danh mục</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">Quản lý danh mục</h1>
          <p className="mt-3 text-sm text-slate-400">Danh mục tại đây sẽ được dùng cho sản phẩm và hiển thị trong dropdown ở header.</p>
        </div>
        <Link href="/admin/categories/new" className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-950">
          Thêm danh mục
        </Link>
      </div>
      <div className="mt-8">
        <CategoryManager categories={categories} />
      </div>
    </div>
  );
}
