"use client";

import { useEffect, useState } from "react";
import type { SampleProduct } from "@/types/product";

type BuyNowQrModalProps = {
  product: SampleProduct;
  amount: number;
};

function formatMoney(value: number) {
  return `${new Intl.NumberFormat("vi-VN").format(value)}đ`;
}

function getQrImageSrc(product: SampleProduct, amount: number) {
  const bankCode = process.env.NEXT_PUBLIC_BANK_CODE?.trim();
  const accountNumber = process.env.NEXT_PUBLIC_BANK_ACCOUNT_NUMBER?.trim();
  const accountName = process.env.NEXT_PUBLIC_BANK_ACCOUNT_NAME?.trim();
  const transferContent =
    process.env.NEXT_PUBLIC_BANK_TRANSFER_CONTENT?.trim() || product.slug.toUpperCase();

  if (bankCode && accountNumber && accountName) {
    return `https://img.vietqr.io/image/${bankCode}-${accountNumber}-compact2.png?amount=${amount}&addInfo=${encodeURIComponent(transferContent)}&accountName=${encodeURIComponent(accountName)}`;
  }

  const fallbackText = [
    "THONG TIN CHUYEN KHOAN",
    `San pham: ${product.title}`,
    `So tien: ${formatMoney(amount)}`,
    `Noi dung: ${transferContent}`
  ].join("\n");

  return `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(fallbackText)}`;
}

export function BuyNowQrModal({ product, amount }: BuyNowQrModalProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  const qrImageSrc = getQrImageSrc(product, amount);
  const bankCode = process.env.NEXT_PUBLIC_BANK_CODE?.trim();
  const accountNumber = process.env.NEXT_PUBLIC_BANK_ACCOUNT_NUMBER?.trim();
  const accountName = process.env.NEXT_PUBLIC_BANK_ACCOUNT_NAME?.trim();
  const transferContent =
    process.env.NEXT_PUBLIC_BANK_TRANSFER_CONTENT?.trim() || product.slug.toUpperCase();
  const hasBankConfig = Boolean(bankCode && accountNumber && accountName);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/30 transition hover:-translate-y-0.5 hover:bg-brand/90"
      >
        Mua ngay
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 py-6 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div
            className="w-full max-w-md rounded-3xl bg-white p-5 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand">Thanh toán QR</p>
                <h2 className="mt-2 text-xl font-semibold text-ink">{product.title}</h2>
                <p className="mt-1 text-sm text-slate-500">Số tiền: <span className="font-semibold text-slate-800">{formatMoney(amount)}</span></p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600 transition hover:bg-slate-200"
              >
                Đóng
              </button>
            </div>

            <div className="mt-5 flex justify-center rounded-3xl bg-mist p-4">
              <img
                src={qrImageSrc}
                alt="QR chuyển khoản"
                className="h-[320px] w-[320px] rounded-2xl bg-white object-contain p-2"
              />
            </div>

            <div className="mt-5 rounded-2xl border border-line bg-mist px-4 py-3 text-sm text-slate-700">
              <p className="font-semibold text-ink">Thông tin chuyển khoản</p>
              {hasBankConfig ? (
                <div className="mt-2 space-y-1">
                  <p>Ngân hàng: {bankCode}</p>
                  <p>Số tài khoản: {accountNumber}</p>
                  <p>Chủ tài khoản: {accountName}</p>
                  <p>Nội dung: {transferContent}</p>
                </div>
              ) : (
                <p className="mt-2 text-slate-500">Chưa cấu hình `NEXT_PUBLIC_BANK_CODE`, `NEXT_PUBLIC_BANK_ACCOUNT_NUMBER`, `NEXT_PUBLIC_BANK_ACCOUNT_NAME`.</p>
              )}
              <p className="mt-3 text-slate-600">Sau khi chuyển khoản, vui lòng liên hệ Zalo hoặc email để xác nhận.</p>
              <div className="mt-2 space-y-1 text-slate-700">
                <a className="block font-medium text-brand hover:underline" href="https://zalo.me/0913079896" target="_blank" rel="noreferrer">
                  Zalo: 0913079896
                </a>
                <a className="block font-medium text-brand hover:underline" href="mailto:congtyvuonratg@gmail.com">
                  Email: congtyvuonratg@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
