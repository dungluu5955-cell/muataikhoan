"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { SampleProduct } from "@/types/product";

type PromotionCarouselProps = {
  products: SampleProduct[];
};

function parsePriceLabel(value: string | null | undefined) {
  if (!value) {
    return 0;
  }

  return Number(value.replace(/[^\d]/g, "")) || 0;
}

function getDiscountPercent(product: SampleProduct) {
  const originalPrice = parsePriceLabel(product.priceLabel);
  const discountPrice = parsePriceLabel(product.salePriceLabel);

  if (originalPrice <= 0 || discountPrice <= 0 || discountPrice >= originalPrice) {
    return 0;
  }

  return Math.max(1, Math.round(((originalPrice - discountPrice) / originalPrice) * 100));
}

export function PromotionCarousel({ products }: PromotionCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(4);

  useEffect(() => {
    function syncCardsPerView() {
      if (window.innerWidth < 768) {
        setCardsPerView(1);
        return;
      }

      if (window.innerWidth < 1280) {
        setCardsPerView(2);
        return;
      }

      setCardsPerView(4);
    }

    syncCardsPerView();
    window.addEventListener("resize", syncCardsPerView);

    return () => window.removeEventListener("resize", syncCardsPerView);
  }, []);

  const maxIndex = Math.max(0, products.length - cardsPerView);

  useEffect(() => {
    setActiveIndex((current) => Math.min(current, maxIndex));
  }, [maxIndex]);

  const trackStyle = useMemo(
    () => ({
      width: `${(products.length / cardsPerView) * 100}%`,
      transform: `translateX(-${(activeIndex * 100) / products.length}%)`
    }),
    [activeIndex, cardsPerView, products.length]
  );

  function showPrevious() {
    setActiveIndex((current) => (current <= 0 ? maxIndex : current - 1));
  }

  function showNext() {
    setActiveIndex((current) => (current >= maxIndex ? 0 : current + 1));
  }

  return (
    <div className="relative">
      {products.length > cardsPerView ? (
        <>
          <button
            type="button"
            aria-label="Sản phẩm khuyến mãi trước"
            onClick={showPrevious}
            className="absolute left-3 top-[32%] z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black text-3xl leading-none text-white shadow-lg md:flex"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Sản phẩm khuyến mãi tiếp theo"
            onClick={showNext}
            className="absolute right-3 top-[32%] z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black text-3xl leading-none text-white shadow-lg md:flex"
          >
            ›
          </button>
        </>
      ) : null}

      <div className="overflow-hidden">
        <div className="flex transition-transform duration-500 ease-out" style={trackStyle}>
          {products.map((product) => {
            const discountPercent = getDiscountPercent(product);

            return (
              <div
                key={product.slug}
                className="shrink-0 px-2.5 first:pl-0 last:pr-0"
                style={{ width: `${100 / products.length}%` }}
              >
                <Link
                  href={`/san-pham/${product.slug}`}
                  className="block overflow-hidden rounded-[22px] bg-white shadow-[0_14px_34px_rgba(28,20,60,0.14)]"
                >
                  <div className="relative aspect-[4/3.2] w-full overflow-hidden bg-[#f5f3ff]">
                    {product.thumbnailUrl ? (
                      <Image src={product.thumbnailUrl} alt={product.title} fill className="object-cover" />
                    ) : null}
                    {discountPercent ? (
                      <div className="absolute left-0 top-0 z-10">
                        <div className="rounded-br-[18px] rounded-tr-[18px] bg-[#ff1d14] px-4 py-2 text-lg font-bold leading-none text-white shadow-[0_10px_24px_rgba(255,29,20,0.34)]">
                          -{discountPercent}%
                        </div>
                        <div className="h-0 w-0 border-r-[10px] border-t-[10px] border-r-transparent border-t-[#a80d08]" />
                      </div>
                    ) : null}
                  </div>
                  <div className="p-3.5">
                    <p className="line-clamp-2 text-lg font-semibold leading-7 tracking-tight text-ink">{product.title}</p>
                    <p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-600">
                      {product.shortDescription || product.description}
                    </p>
                    <div className="mt-2.5 space-y-1">
                      <p className="text-base font-semibold text-slate-400 line-through">{product.priceLabel.replace("d", "đ")}</p>
                      <p className="text-2xl font-bold text-[#ef3d32]">{product.salePriceLabel?.replace("d", "đ")}</p>
                    </div>
                    <div className="mt-2.5 h-2.5 overflow-hidden rounded-full bg-[#ffd0bd]">
                      <div className="h-full w-3/5 rounded-full bg-[linear-gradient(90deg,#ff4d2d_0%,#ff7a1a_100%)]" />
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
