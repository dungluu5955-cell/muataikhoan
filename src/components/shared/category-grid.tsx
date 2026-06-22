import Link from "next/link";
import type { CategoryView } from "@/lib/category-service";

type CategoryGridProps = {
  categories: CategoryView[];
};

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {categories.map((item) => (
        <Link
          href={`/danh-muc/${item.slug}`}
          key={item.slug}
          className="group relative overflow-hidden rounded-[28px] border border-[#f0d7cf] bg-[linear-gradient(180deg,#fff8f4_0%,#ffffff_80%)] p-6 shadow-[0_18px_50px_rgba(120,42,18,0.08)]"
        >
          <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-[32px] bg-[radial-gradient(circle,_rgba(228,75,45,0.22),_transparent_70%)]" />
          <div className="relative">
            <p className="text-xl font-semibold leading-8 tracking-tight text-ink">{item.name}</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
            <div className="mt-6 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">{item.productCount} sản phẩm</span>
              <span className="rounded-full bg-brand px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-transform group-hover:-translate-y-0.5">
                Mở danh mục
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
