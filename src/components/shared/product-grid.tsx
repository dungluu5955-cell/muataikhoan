import Link from "next/link";
import Image from "next/image";
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
          className="flex h-full flex-col overflow-hidden rounded-[22px] bg-white shadow-[0_14px_34px_rgba(28,20,60,0.14)] transition-transform hover:-translate-y-1"
        >
          <div className="relative aspect-[4/3.2] w-full overflow-hidden bg-[#f5f3ff]">
            {product.thumbnailUrl ? (
              <Image src={product.thumbnailUrl} alt={product.title} fill className="object-cover" />
            ) : null}
            {showHotBadge ? (
              <div className="absolute left-0 top-0 z-10">
                <div className="rounded-br-[18px] rounded-tr-[18px] bg-[#ff1d14] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-[0_10px_24px_rgba(255,29,20,0.34)]">
                  Hot deal
                </div>
                <div className="h-0 w-0 border-r-[10px] border-t-[10px] border-r-transparent border-t-[#a80d08]" />
              </div>
            ) : null}
          </div>
          <div className="flex flex-1 flex-col p-3.5">
            <p className="min-h-[3.5rem] line-clamp-2 text-lg font-semibold leading-7 tracking-tight text-ink">{product.title}</p>
            <p className="mt-2 min-h-[2.5rem] line-clamp-2 text-sm leading-5 text-slate-600">
              {product.shortDescription || product.description}
            </p>
            <div className="mt-auto min-h-[4.75rem] pt-2.5">
              {product.salePriceLabel ? (
                <p className="text-base font-semibold text-slate-400 line-through">{product.priceLabel.replace("d", "đ")}</p>
              ) : (
                <div className="h-6" />
              )}
              <p className="text-2xl font-bold text-[#ef3d32]">
                {(product.salePriceLabel ?? product.priceLabel).replace("d", "đ")}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
