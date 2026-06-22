"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function AdminLogoutButton() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleLogout() {
    setIsSubmitting(true);

    await fetch("/api/admin/logout", {
      method: "POST"
    });

    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isSubmitting}
      className="mt-10 w-full rounded-2xl border border-slate-700 px-4 py-3 text-sm font-medium text-slate-300 hover:border-white hover:text-white disabled:opacity-60"
    >
      {isSubmitting ? "Đang đăng xuất..." : "Đăng xuất"}
    </button>
  );
}
