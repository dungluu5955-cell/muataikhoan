import Link from "next/link";
import { getCategories } from "@/lib/category-service";
import { ContactFloat } from "@/components/shared/contact-float";
import { MobileNav } from "@/components/shared/mobile-nav";

const navItems = [
  { href: "/tin-tuc", label: "Tin tức" },
  { href: "/lien-he", label: "Liên hệ" }
];

export default async function PublicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-[#fff8f4]">
      <header className="sticky top-0 z-30 border-b border-[#f0ddd6] bg-white/92 backdrop-blur">
        <div className="shell relative flex min-h-20 items-center justify-between gap-6 py-4">
          <Link href="/" className="flex items-center gap-3 text-lg font-semibold tracking-tight text-ink">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
              MTK
            </span>
            <span>MuaTàiKhoản</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-slate-700 md:flex">
            <Link href="/" className="hover:text-brand">
              Trang chủ
            </Link>
            <div className="group relative">
              <button type="button" className="flex items-center gap-2 hover:text-brand">
                Danh mục sản phẩm
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.512a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <div className="invisible absolute left-0 top-full z-20 mt-4 w-[320px] translate-y-2 rounded-[24px] border border-[#f0ddd6] bg-white p-3 opacity-0 shadow-[0_18px_50px_rgba(20,24,36,0.08)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <div className="grid gap-2">
                  {categories.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/danh-muc/${category.slug}`}
                      className="rounded-[18px] px-4 py-3 hover:bg-[#fff5ef]"
                    >
                      <p className="text-sm font-semibold text-ink">{category.name}</p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">{category.productCount} sản phẩm</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-brand">
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/san-pham"
            className="hidden rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-dark md:inline-flex"
          >
            Mua ngay
          </Link>
          <MobileNav categories={categories} />
        </div>
      </header>
      <main>{children}</main>
      <ContactFloat />
      <footer className="mt-20 border-t border-[#f0ddd6] bg-[#fff1eb]">
        <div className="shell grid gap-8 py-12 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div>
            <p className="text-lg font-semibold">MuaTàiKhoản</p>
            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-600">
              Nền tảng giới thiệu và đăng bán tài khoản, phần mềm, khóa học và dịch vụ số.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Bảo hành rõ ràng", "Hỗ trợ 24/7", "Giao nhanh"].map((item) => (
                <span key={item} className="rounded-full border border-[#efcfc5] bg-white px-3 py-2 text-xs font-medium text-slate-700">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Danh mục</p>
            <div className="mt-3 space-y-2 text-sm text-slate-600">
              <p>Phần mềm, công cụ AI</p>
              <p>Học tập, khóa học</p>
              <p>Streaming, giải trí</p>
              <p>Bảo mật, VPN</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Hỗ trợ</p>
            <div className="mt-3 space-y-2 text-sm text-slate-600">
              <p>Chính sách bảo hành</p>
              <p>Hướng dẫn mua hàng</p>
              <p>Câu hỏi thường gặp</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Liên hệ</p>
            <div className="mt-3 space-y-2 text-sm text-slate-600">
              <p>SĐT / Zalo: 0234235345</p>
              <p>Email: abcd@gmail.com</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
