import { getProducts } from "@/lib/product-service";

export default async function AdminDashboardPage() {
  const products = await getProducts();
  const featuredCount = products.filter((item) => item.attributes?.length || item.thumbnailUrl).length;
  const uploadedImageCount = products.reduce((total, item) => total + (item.images?.length ?? 0) + (item.thumbnailUrl ? 1 : 0), 0);

  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Admin</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">Tổng quan quản trị</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          { label: "Tổng sản phẩm", value: String(products.length) },
          { label: "Sản phẩm có nội dung", value: String(featuredCount) },
          { label: "Ảnh đã upload", value: String(uploadedImageCount) }
        ].map((item) => (
          <div key={item.label} className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">{item.label}</p>
            <p className="mt-4 text-3xl font-semibold text-white">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
