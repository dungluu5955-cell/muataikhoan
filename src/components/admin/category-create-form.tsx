"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function CategoryCreateForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const response = await fetch("/api/admin/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        description
      })
    });

    const result = (await response.json()) as { message?: string };
    setMessage(result.message ?? (response.ok ? "Đã tạo danh mục." : "Không thể tạo danh mục."));
    setIsSubmitting(false);

    if (!response.ok) {
      return;
    }

    router.push("/admin/categories");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <div className="grid gap-4">
        <label className="grid gap-2 text-sm text-slate-300">
          <span>Tên danh mục</span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Ví dụ: Công cụ AI"
            className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none"
          />
        </label>
        <label className="grid gap-2 text-sm text-slate-300">
          <span>Mô tả danh mục</span>
          <input
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Mô tả ngắn về danh mục"
            className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none"
          />
        </label>
      </div>

      <div className="mt-6 flex items-center justify-end gap-4">
        {message ? <p className="text-sm text-slate-300">{message}</p> : null}
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 disabled:opacity-60"
        >
          {isSubmitting ? "Đang lưu..." : "Tạo danh mục"}
        </button>
      </div>
    </form>
  );
}
