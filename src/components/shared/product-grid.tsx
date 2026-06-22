import Link from "next/link";
import type { SampleProduct } from "@/types/product";

type ProductGridProps = {
  products: SampleProduct[];
  showHotBadge?: boolean;
};

export function ProductGrid({ products, showHotBadge = true }: ProductGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {products.map((product) => (
        <Link
          key={product.slug}
          href={`/san-pham/${product.slug}`}
          className="group block overflow-hidden rounded-[24px] border border-[#ecd7d0] bg-white shadow-[0_18px_44px_rgba(16,20,24,0.08)] transition-transform hover:-translate-y-1"
        >
          <div className="relative aspect-[16/9] overflow-hidden bg-[linear-gradient(135deg,_rgba(228,75,45,0.20),_rgba(18,122,95,0.12))]">
            {showHotBadge ? (
              <div className="absolute left-0 top-0 z-10">
                <div className="rounded-br-[18px] rounded-tr-[18px] bg-[#ff1d14] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-[0_10px_24px_rgba(255,29,20,0.34)]">
                  Hot deal
                </div>
                <div className="h-0 w-0 border-r-[10px] border-t-[10px] border-r-transparent border-t-[#a80d08]" />
              </div>
            ) : null}
            <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/25 to-transparent" />
          </div>
          <div className="p-4">
            <div className="flex items-center gap-4">
              <span className="rounded-full bg-accent-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                {product.category}
              </span>
            </div>
            <h3 className="mt-3 line-clamp-2 text-lg font-semibold leading-7 tracking-tight text-ink">{product.title}</h3>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{product.shortDescription}</p>
            <div className="mt-4">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Giá ưu đãi</p>
                <p className="mt-1 text-xl font-semibold text-brand">{product.priceLabel.replace("d", "đ")}</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
