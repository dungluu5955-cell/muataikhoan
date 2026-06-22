import { redirect } from "next/navigation";
import { Pagination } from "@/components/shared/pagination";
import { ProductGrid } from "@/components/shared/product-grid";
import { getPublicProducts } from "@/lib/product-service";

type ProductsPageProps = {
  searchParams?: Promise<{
    page?: string;
  }>;
};

const PRODUCTS_PER_PAGE = 12;

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const products = await getPublicProducts();
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const pageFromQuery = Number(resolvedSearchParams.page ?? "1");
  const currentPage = Number.isFinite(pageFromQuery) && pageFromQuery > 0 ? Math.floor(pageFromQuery) : 1;
  const totalPages = Math.max(1, Math.ceil(products.length / PRODUCTS_PER_PAGE));

  if (currentPage > totalPages) {
    redirect("/san-pham");
  }

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const paginatedProducts = products.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

  return (
    <div className="shell py-16">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">Listing page</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">Danh sách sản phẩm</h1>
        <p className="mt-4 text-base leading-7 text-slate-600">
          Danh sách sản phẩm được chia trang để dễ lướt hơn khi số lượng mặt hàng tăng lên.
        </p>
      </div>
      <div className="mt-10">
        <ProductGrid products={paginatedProducts} />
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} basePath="/san-pham" />
    </div>
  );
}
