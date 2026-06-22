"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLoginForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setErrorMessage(null);

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: formData.get("username"),
        password: formData.get("password")
      })
    });

    const payload = (await response.json()) as { message?: string };

    if (!response.ok) {
      setErrorMessage(payload.message ?? "Đăng nhập thất bại.");
      setIsSubmitting(false);
      return;
    }

    router.push("/admin/dashboard");
    router.refresh();
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="username" className="mb-2 block text-sm font-medium text-slate-300">
          Tên đăng nhập
        </label>
        <input
          id="username"
          name="username"
          className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none ring-0 placeholder:text-slate-500"
          placeholder="admin"
        />
      </div>
      <div>
        <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-300">
          Mật khẩu
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none ring-0 placeholder:text-slate-500"
          placeholder="••••••••"
        />
      </div>
      {errorMessage ? <p className="text-sm text-red-400">{errorMessage}</p> : null}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Đang xử lý..." : "Đăng nhập"}
      </button>
    </form>
  );
}
