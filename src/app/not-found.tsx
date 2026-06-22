import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="shell py-24">
      <h1 className="text-4xl font-semibold tracking-tight">Không tìm thấy nội dung</h1>
      <p className="mt-4 text-base text-slate-600">Trang hoặc sản phẩm bạn tìm hiện chưa tồn tại.</p>
      <Link href="/" className="mt-8 inline-flex rounded-full bg-brand px-5 py-3 text-sm font-medium text-white">
        Về trang chủ
      </Link>
    </div>
  );
}
