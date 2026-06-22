"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type AdminDeleteProductButtonProps = {
  productId: string;
  productTitle: string;
  redirectTo?: string;
  className?: string;
};

export function AdminDeleteProductButton({
  productId,
  productTitle,
  redirectTo,
  className
}: AdminDeleteProductButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(`Xóa sản phẩm "${productTitle}"?`);

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);

    const response = await fetch(`/api/admin/products/${productId}`, {
      method: "DELETE"
    });

    setIsDeleting(false);

    if (!response.ok) {
      window.alert("Không thể xóa sản phẩm.");
      return;
    }

    if (redirectTo) {
      router.push(redirectTo);
      router.refresh();
      return;
    }

    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      className={className ?? "text-red-400 hover:text-red-300 disabled:opacity-60"}
    >
      {isDeleting ? "Đang xóa..." : "Xóa"}
    </button>
  );
}
