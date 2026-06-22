import Link from "next/link";
import { AdminProductsTable } from "@/components/admin/admin-products-table";
import { getProducts } from "@/lib/product-service";

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Sản phẩm</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">Quản lý sản phẩm</h1>
        </div>
        <Link href="/admin/products/new" className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-950">
          Thêm sản phẩm
        </Link>
      </div>
      <AdminProductsTable products={products} />
    </div>
  );
}
