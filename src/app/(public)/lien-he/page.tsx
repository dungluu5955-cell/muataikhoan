export default function ContactPage() {
  return (
    <div className="shell py-16">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight">Liên hệ</h1>
        <p className="mt-4 text-base leading-7 text-slate-600">
          Hỗ trợ tư vấn nhanh qua điện thoại, Zalo hoặc email. Nếu bạn cần báo giá hoặc muốn chốt gói nhanh, chỉ cần liên hệ trực tiếp.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-[28px] border border-[#f0ddd6] bg-white p-6 shadow-[0_18px_50px_rgba(20,24,36,0.06)]">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">SĐT / Zalo</p>
          <a href="tel:0913079896" className="mt-4 block text-3xl font-semibold tracking-tight text-ink hover:text-brand">
            0913079896
          </a>
          <p className="mt-3 text-sm leading-6 text-slate-600">Phù hợp để tư vấn nhanh, gửi danh sách sản phẩm và hỗ trợ chốt đơn.</p>
        </div>

        <div className="rounded-[28px] border border-[#f0ddd6] bg-white p-6 shadow-[0_18px_50px_rgba(20,24,36,0.06)]">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">Email</p>
          <a
            href="mailto:congtyvuonratg@gmail.com"
            className="mt-4 block break-all text-3xl font-semibold tracking-tight text-ink hover:text-brand"
          >
            congtyvuonratg@gmail.com
          </a>
          <p className="mt-3 text-sm leading-6 text-slate-600">Phù hợp khi cần gửi thông tin chi tiết, yêu cầu riêng hoặc trao đổi lâu dài.</p>
        </div>
      </div>
    </div>
  );
}
