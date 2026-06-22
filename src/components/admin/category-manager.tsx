"use client";

import { useState } from "react";
import type { CategoryView } from "@/lib/category-service";

type CategoryManagerProps = {
  categories: CategoryView[];
};

export function CategoryManager({ categories: initialCategories }: CategoryManagerProps) {
  const [categories, setCategories] = useState(initialCategories);
  const [message, setMessage] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [editingDescription, setEditingDescription] = useState("");

  function startEdit(category: CategoryView) {
    setEditingId(category.id);
    setEditingName(category.name);
    setEditingDescription(category.description);
  }

  async function handleSaveEdit(id: string) {
    setMessage(null);

    const response = await fetch(`/api/admin/categories/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: editingName,
        description: editingDescription
      })
    });

    const result = (await response.json()) as { message?: string; item?: { id: string; name: string; slug: string; description?: string | null } };
    setMessage(result.message ?? (response.ok ? "Đã cập nhật danh mục." : "Không thể cập nhật danh mục."));

    if (!response.ok || !result.item) {
      return;
    }

    const nextItem = result.item;

    setCategories((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              name: nextItem.name,
              slug: nextItem.slug,
              description: nextItem.description ?? ""
            }
          : item
      )
    );
    setEditingId(null);
  }

  async function handleDelete(id: string, categoryName: string) {
    const confirmed = window.confirm(`Xóa danh mục "${categoryName}"?`);

    if (!confirmed) {
      return;
    }

    const response = await fetch(`/api/admin/categories/${id}`, {
      method: "DELETE"
    });

    const result = (await response.json()) as { message?: string };
    setMessage(result.message ?? (response.ok ? "Đã xóa danh mục." : "Không thể xóa danh mục."));

    if (!response.ok) {
      return;
    }

    setCategories((current) => current.filter((item) => item.id !== id));
  }

  return (
    <div className="grid gap-6">
      {message ? <p className="text-sm text-slate-300">{message}</p> : null}

      <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">
        <table className="min-w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-950/60 text-xs uppercase tracking-[0.18em] text-slate-500">
            <tr>
              <th className="px-6 py-4">Tên danh mục</th>
              <th className="px-6 py-4">Slug</th>
              <th className="px-6 py-4">Mô tả</th>
              <th className="px-6 py-4">Sản phẩm</th>
              <th className="px-6 py-4">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-t border-slate-800">
                <td className="px-6 py-4">
                  {editingId === category.id ? (
                    <input
                      value={editingName}
                      onChange={(event) => setEditingName(event.target.value)}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none"
                    />
                  ) : (
                    category.name
                  )}
                </td>
                <td className="px-6 py-4">{category.slug}</td>
                <td className="px-6 py-4">
                  {editingId === category.id ? (
                    <input
                      value={editingDescription}
                      onChange={(event) => setEditingDescription(event.target.value)}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none"
                    />
                  ) : (
                    category.description
                  )}
                </td>
                <td className="px-6 py-4">{category.productCount}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    {editingId === category.id ? (
                      <>
                        <button type="button" onClick={() => void handleSaveEdit(category.id)} className="text-white hover:text-brand">
                          Lưu
                        </button>
                        <button type="button" onClick={() => setEditingId(null)} className="text-slate-400 hover:text-white">
                          Hủy
                        </button>
                      </>
                    ) : (
                      <>
                        <button type="button" onClick={() => startEdit(category)} className="text-white hover:text-brand">
                          Chỉnh sửa
                        </button>
                        <button
                          type="button"
                          onClick={() => void handleDelete(category.id, category.name)}
                          className="text-sm text-red-400 hover:text-red-300"
                        >
                          Xóa
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
