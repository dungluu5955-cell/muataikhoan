import Link from "next/link";
import Image from "next/image";
import { getCategories } from "@/lib/category-service";
import { CategoryGrid } from "@/components/shared/category-grid";
import HeroCarousel from "@/components/shared/hero-carousel";
import { ProductCarousel } from "@/components/shared/product-carousel";
import { ProductGrid } from "@/components/shared/product-grid";
import { PromotionCarousel } from "@/components/shared/promotion-carousel";
import { getPromotionProducts, getPublicProducts } from "@/lib/product-service";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const products = await getPublicProducts();
  const categories = await getCategories();
  const promotionProducts = await getPromotionProducts();
  const featuredProducts = products.slice(0, 8);
  const latestProducts = products.slice(0, 8);
  const categoryBanners = [
    {
      src: "/banner/small-1.png",
      alt: "Banner học tập chất lượng"
    },
    {
      src: "/banner/small-2.png",
      alt: "Banner bảo mật VPN và công cụ AI"
    },
    {
      src: "/banner/small-3.png",
      alt: "Banner giải trí đa dạng"
    }
  ];
  const trustItems = [
    {
      icon: "🎁",
      title: "Quà tặng kèm",
      copy: "Với các hóa đơn trên 199K",
      bg: "bg-[#eaf0fb]"
    },
    {
      icon: "📋",
      title: "Chính sách",
      copy: "Trải nghiệm sản phẩm miễn phí",
      bg: "bg-[#f8e8ef]"
    },
    {
      icon: "🛡️",
      title: "Bảo hành",
      copy: "Trong toàn bộ thời gian của gói",
      bg: "bg-[#fff6cf]"
    },
    {
      icon: "🧊",
      title: "Hỗ trợ 24/7",
      copy: "Qua Hotline, Fanpage, Zalo",
      bg: "bg-[#e6f8dc]"
    }
  ];

  return (
    <div className="pb-20">
      <section className="shell pt-8">
        <HeroCarousel />
      </section>

      <section className="shell pt-5">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {trustItems.map((item) => (
            <div
              key={item.title}
              className={`group flex min-h-[108px] cursor-default items-center gap-4 rounded-[22px] px-5 py-5 shadow-[0_10px_24px_rgba(24,28,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(24,28,42,0.12)] ${item.bg}`}
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] bg-white/70 text-3xl shadow-sm transition-transform duration-300 group-hover:scale-105">
                {item.icon}
              </div>
              <div>
                <p className="text-[15px] font-semibold leading-5 text-ink sm:text-[16px]">{item.title}</p>
                <p className="mt-1 text-sm leading-6 text-slate-700">{item.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="shell pt-6">
        <div className="grid gap-5 lg:grid-cols-3">
          {categoryBanners.map((item) => (
            <div
              key={item.src}
              className="cursor-default overflow-hidden rounded-[24px] border border-[#eadcd6] bg-white shadow-[0_14px_34px_rgba(24,28,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_42px_rgba(24,28,42,0.14)]"
            >
              <div className="relative aspect-[16/7] w-full overflow-hidden">
                <Image src={item.src} alt={item.alt} fill className="object-cover transition-transform duration-500 hover:scale-[1.04]" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {promotionProducts.length ? (
        <section className="shell pt-8">
          <div className="rounded-[30px] bg-[linear-gradient(135deg,#d7a9ff_0%,#8d5cff_55%,#8a47ea_100%)] p-5 shadow-[0_24px_70px_rgba(127,73,228,0.28)] sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div className="inline-flex rounded-full bg-white/18 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-white">
                Tài khoản, phần mềm khuyến mãi
              </div>
            </div>
            <PromotionCarousel products={promotionProducts} />
          </div>
        </section>
      ) : null}

      <section className="shell py-6">
        <h2 className="section-title">Danh mục hot</h2>
        <CategoryGrid categories={categories} />
      </section>

      <section className="shell py-14">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="section-title">Phần mềm, tài khoản bán chạy</h2>
          </div>
          <Link href="/san-pham" className="hidden rounded-full border border-[#e5cfc6] bg-white px-5 py-3 text-sm font-medium text-ink hover:border-brand hover:text-brand md:inline-flex">
            Xem tất cả
          </Link>
        </div>
        <div className="mt-8">
          <ProductCarousel products={featuredProducts} />
        </div>
      </section>

      <section className="shell py-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="section-title">Sản phẩm mới nhất</h2>
          </div>
        </div>
        <ProductGrid products={latestProducts} showHotBadge={false} />
      </section>
    </div>
  );
}
