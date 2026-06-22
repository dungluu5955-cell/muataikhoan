import Link from "next/link";
import { CategoryCreateForm } from "@/components/admin/category-create-form";

export default function AdminNewCategoryPage() {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Danh mục</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">Thêm danh mục mới</h1>
        </div>
        <Link href="/admin/categories" className="rounded-full border border-slate-700 px-4 py-2 text-sm font-medium text-white">
          Quay lại danh sách
        </Link>
      </div>
      <div className="mt-8">
        <CategoryCreateForm />
      </div>
    </div>
  );
}
