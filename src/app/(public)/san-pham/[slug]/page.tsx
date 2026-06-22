import { notFound } from "next/navigation";
import { BuyNowQrModal } from "@/components/shared/buy-now-qr-modal";
import { ProductGallery } from "@/components/shared/product-gallery";
import { getPublicProductBySlug } from "@/lib/product-service";

type ProductDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await getPublicProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const amount = product.salePriceValue ?? product.priceValue ?? 0;
  const galleryImages = (product.images ?? []).map((item, index) => ({
    imageUrl: item.imageUrl,
    alt: `${product.title} ${index + 1}`
  }));

  return (
    <div className="shell py-16">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div className="card-surface min-h-[420px] p-6">
          {galleryImages.length > 0 ? (
            <ProductGallery images={galleryImages} />
          ) : (
            <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-line bg-mist text-sm text-slate-500">
              Khu vực gallery sản phẩm
            </div>
          )}
        </div>
        <div className="card-surface p-8">
          <h1 className="mt-4 text-3xl font-semibold tracking-tight">{product.title}</h1>
          <div className="mt-4 flex items-end gap-3">
            <p className="text-3xl font-semibold text-brand">{product.salePriceLabel ?? product.priceLabel}</p>
            {product.salePriceLabel ? <p className="pb-1 text-sm text-slate-400 line-through">{product.priceLabel}</p> : null}
          </div>
          <p className="mt-5 text-sm leading-7 text-slate-600">{product.description}</p>
          <div className="mt-7">
            <BuyNowQrModal product={product} amount={amount} />
          </div>
          <div className="mt-8 grid gap-3 text-sm text-slate-700">
            {product.attributes.map((attribute) => (
              <div key={attribute.label} className="flex items-start justify-between gap-4 rounded-2xl border border-line bg-mist px-4 py-3">
                <span className="font-medium">{attribute.label}</span>
                <span className="text-right text-slate-600">{attribute.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
