"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AdminDeleteProductButton } from "@/components/admin/admin-delete-product-button";
import type { SampleProduct } from "@/types/product";

type AdminProductsTableProps = {
  products: SampleProduct[];
};

export function AdminProductsTable({ products }: AdminProductsTableProps) {
  const [query, setQuery] = useState("");

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return products.filter((product) => {
      const matchesQuery =
        !normalizedQuery ||
        product.title.toLowerCase().includes(normalizedQuery) ||
        product.slug.toLowerCase().includes(normalizedQuery) ||
        product.category.toLowerCase().includes(normalizedQuery);

      return matchesQuery;
    });
  }, [products, query]);

  return (
    <div className="mt-8 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">
      <div className="border-b border-slate-800 p-5">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Tìm theo tên, slug hoặc danh mục"
          className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500"
        />
      </div>

      <table className="min-w-full text-left text-sm text-slate-300">
        <thead className="bg-slate-950/60 text-xs uppercase tracking-[0.18em] text-slate-500">
          <tr>
            <th className="px-6 py-4">Sản phẩm</th>
            <th className="px-6 py-4">Danh mục</th>
            <th className="px-6 py-4">Giá</th>
            <th className="px-6 py-4">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length ? (
            filteredProducts.map((product) => (
              <tr key={product.id} className="border-t border-slate-800">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="relative h-14 w-20 overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
                      {product.thumbnailUrl ? (
                        <Image src={product.thumbnailUrl} alt={product.title} fill className="object-cover" />
                      ) : null}
                    </div>
                    <div>
                      <p className="font-medium text-white">{product.title}</p>
                      <p className="mt-1 text-xs text-slate-500">{product.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4">{product.salePriceLabel ?? product.priceLabel}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <Link href={`/admin/products/${product.id}`} className="text-white hover:text-brand">
                      Chỉnh sửa
                    </Link>
                    {product.id ? (
                      <AdminDeleteProductButton
                        productId={product.id}
                        productTitle={product.title}
                        className="text-sm text-red-400 hover:text-red-300"
                      />
                    ) : null}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="px-6 py-6 text-slate-400" colSpan={4}>
                Không có sản phẩm khớp bộ lọc hiện tại.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
