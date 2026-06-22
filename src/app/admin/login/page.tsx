import { AdminLoginForm } from "@/components/admin/admin-login-form";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8 text-white">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Khu vực quản trị</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">Đăng nhập quản trị</h1>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          Đăng nhập để quản lý sản phẩm, hình ảnh và nội dung bán hàng trong hệ thống.
        </p>
        <div className="mt-8">
          <AdminLoginForm />
        </div>
      </div>
    </div>
  );
}
