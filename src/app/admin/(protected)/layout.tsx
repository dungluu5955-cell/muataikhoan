import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminLogoutButton } from "@/components/admin/admin-logout-button";
import { getCurrentAdminSession } from "@/lib/auth";

const adminNav = [
  { href: "/admin/dashboard", label: "Tổng quan" },
  { href: "/admin/products", label: "Sản phẩm" },
  { href: "/admin/categories", label: "Danh mục" }
];

export default async function AdminProtectedLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await getCurrentAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="border-b border-slate-800 bg-slate-900 p-6 lg:border-b-0 lg:border-r">
          <Link href="/" className="text-lg font-semibold tracking-tight text-white">
            MuaTaiKhoan Admin
          </Link>
          <nav className="mt-10 space-y-2">
            {adminNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-2xl px-4 py-3 text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <AdminLogoutButton />
        </aside>
        <main className="p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
