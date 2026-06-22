"use client";

import Link from "next/link";
import { useState } from "react";
import type { CategoryView } from "@/lib/category-service";

type MobileNavProps = {
  categories: CategoryView[];
};

const navItems = [
  { href: "/", label: "Trang chủ" },
  { href: "/tin-tuc", label: "Tin tức" },
  { href: "/lien-he", label: "Liên hệ" }
];

export function MobileNav({ categories }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label="Mở menu"
        onClick={() => setIsOpen((current) => !current)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#ecd7cf] bg-white text-lg text-ink"
      >
        {isOpen ? "×" : "☰"}
      </button>

      {isOpen ? (
        <div className="absolute inset-x-4 top-[76px] z-30 rounded-[24px] border border-[#f0ddd6] bg-white p-4 shadow-[0_18px_50px_rgba(20,24,36,0.08)]">
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => setIsCategoryOpen((current) => !current)}
              className="flex w-full items-center justify-between rounded-[18px] bg-[#fff6f1] px-4 py-3 text-left text-sm font-semibold text-ink"
            >
              <span>Danh mục sản phẩm</span>
              <span className="text-xs">{isCategoryOpen ? "▴" : "▾"}</span>
            </button>

            {isCategoryOpen ? (
              <div className="grid gap-2 rounded-[18px] border border-[#f3e3dc] bg-[#fffdfa] p-2">
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/danh-muc/${category.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="rounded-[14px] px-3 py-3 text-sm text-slate-700 hover:bg-[#fff5ef]"
                  >
                    <p className="font-semibold text-ink">{category.name}</p>
                    <p className="mt-1 text-xs text-slate-500">{category.productCount} sản phẩm</p>
                  </Link>
                ))}
              </div>
            ) : null}

            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block rounded-[18px] px-4 py-3 text-sm font-medium text-slate-700 hover:bg-[#fff5ef]"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/san-pham"
              onClick={() => setIsOpen(false)}
              className="mt-2 block rounded-full bg-brand px-5 py-3 text-center text-sm font-medium text-white"
            >
              Mua ngay
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
