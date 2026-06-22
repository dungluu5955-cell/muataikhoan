"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminDeleteProductButton } from "@/components/admin/admin-delete-product-button";
import { ImageUploadField, type UploadedImage } from "@/components/admin/image-upload-field";
import type { CategoryView } from "@/lib/category-service";
import { slugify } from "@/lib/slug";
import type { ProductAttributeView, SampleProduct } from "@/types/product";

type ProductEditorFormProps = {
  mode?: "create" | "edit";
  productId?: string;
  initialProduct?: SampleProduct | null;
  categories: CategoryView[];
};

function RequiredMark() {
  return <span className="ml-1 text-red-400">*</span>;
}

type ProductFormState = {
  title: string;
  slug: string;
  category: string;
  categoryDescription: string;
  price: string;
  salePrice: string;
  shortDescription: string;
  description: string;
  thumbnailImages: UploadedImage[];
  galleryImages: UploadedImage[];
  isFeatured: boolean;
  warranty: string;
  delivery: string;
  note: string;
};

type ValidationIssues = {
  fieldErrors?: Record<string, string[] | undefined>;
  formErrors?: string[];
};

const fieldLabels: Record<string, string> = {
  title: "Tiêu đề",
  slug: "Slug",
  category: "Danh mục",
  categoryDescription: "Mô tả danh mục",
  price: "Giá",
  salePrice: "Giá khuyến mãi",
  originalPrice: "Giá gốc",
  status: "Trạng thái",
  shortDescription: "Mô tả ngắn",
  description: "Mô tả chi tiết",
  thumbnailUrl: "Ảnh đại diện",
  thumbnailPublicId: "Mã ảnh đại diện",
  isFeatured: "Sản phẩm nổi bật",
  attributes: "Thuộc tính sản phẩm",
  images: "Thư viện ảnh"
};

function getAttributeValue(attributes: ProductAttributeView[] | undefined, label: string) {
  return attributes?.find((item) => item.label === label)?.value ?? "";
}

function toRawPrice(value: string | null | undefined) {
  return value?.replace(/[^\d]/g, "") ?? "";
}

function buildInitialState(initialProduct?: SampleProduct | null): ProductFormState {
  return {
    title: initialProduct?.title ?? "",
    slug: initialProduct?.slug ?? "",
    category: initialProduct?.category ?? "",
    categoryDescription: "",
    price: toRawPrice(initialProduct?.priceLabel),
    salePrice: toRawPrice(initialProduct?.salePriceLabel),
    shortDescription: initialProduct?.shortDescription ?? "",
    description: initialProduct?.description ?? "",
    thumbnailImages: initialProduct?.thumbnailUrl
      ? [
          {
            imageUrl: initialProduct.thumbnailUrl,
            publicId: null
          }
        ]
      : [],
    galleryImages: (initialProduct?.images ?? []).map((item) => ({
      imageUrl: item.imageUrl,
      publicId: item.publicId ?? null
    })),
    isFeatured: initialProduct?.isFeatured ?? false,
    warranty: getAttributeValue(initialProduct?.attributes, "Bảo hành"),
    delivery: getAttributeValue(initialProduct?.attributes, "Bàn giao"),
    note: getAttributeValue(initialProduct?.attributes, "Ghi chú")
  };
}

export function ProductEditorForm({
  mode = "create",
  productId,
  initialProduct,
  categories
}: ProductEditorFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<ProductFormState>(() => buildInitialState(initialProduct));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);
    setValidationErrors([]);

    const payload = {
      title: form.title,
      slug: form.slug || slugify(form.title),
      category: form.category,
      price: form.price,
      salePrice: form.salePrice,
      shortDescription: form.shortDescription,
      description: form.description,
      thumbnailUrl: form.thumbnailImages[0]?.imageUrl,
      thumbnailPublicId: form.thumbnailImages[0]?.publicId ?? "",
      isFeatured: form.isFeatured,
      images: form.galleryImages.map((item, index) => ({
        imageUrl: item.imageUrl,
        publicId: item.publicId ?? "",
        sortOrder: index
      })),
      attributes: [
        { label: "Bảo hành", value: form.warranty },
        { label: "Bàn giao", value: form.delivery },
        { label: "Ghi chú", value: form.note }
      ].filter((item) => item.value.trim().length > 0)
    };

    const isEditMode = mode === "edit" && productId;
    const response = await fetch(isEditMode ? `/api/admin/products/${productId}` : "/api/admin/products", {
      method: isEditMode ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = (await response.json()) as {
      message?: string;
      item?: { id?: string };
      issues?: ValidationIssues;
    };

    if (!response.ok && result.issues) {
      const fieldErrors = Object.entries(result.issues.fieldErrors ?? {})
        .flatMap(([field, errors]) =>
          (errors ?? []).map((error) => `${fieldLabels[field] ?? field}: ${error}`)
        );
      const formErrors = result.issues.formErrors ?? [];
      setValidationErrors([...fieldErrors, ...formErrors]);
    }

    setMessage(result.message ?? (response.ok ? "Đã lưu sản phẩm." : "Không thể lưu sản phẩm."));
    setIsSubmitting(false);

    if (!response.ok) {
      return;
    }

    if (isEditMode) {
      router.refresh();
      return;
    }

    if (result.item?.id) {
      router.push(`/admin/products/${result.item.id}`);
      router.refresh();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-lg font-semibold">Thông tin cơ bản</h2>
          <div className="mt-5 grid gap-4">
            <label className="grid gap-2 text-sm text-slate-300">
              <span>
                Tiêu đề
                <RequiredMark />
              </span>
              <input
                value={form.title}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    title: event.target.value,
                    slug: slugify(event.target.value)
                  }))
                }
                className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none"
              />
            </label>
            <label className="grid gap-2 text-sm text-slate-300">
              <span>
                Danh mục
                <RequiredMark />
              </span>
              <select
                value={form.category}
                onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}
                className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none"
              >
                <option value="" disabled>
                  Chọn danh mục
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 text-sm text-slate-300">
              <span>
                Giá
                <RequiredMark />
              </span>
              <input
                value={form.price}
                onChange={(event) => setForm((current) => ({ ...current, price: event.target.value }))}
                className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none"
              />
            </label>
            <label className="grid gap-2 text-sm text-slate-300">
              <span>Giá khuyến mãi</span>
              <input
                value={form.salePrice}
                onChange={(event) => setForm((current) => ({ ...current, salePrice: event.target.value }))}
                className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none"
              />
            </label>
            <ImageUploadField
              label="Tải ảnh đại diện *"
              value={form.thumbnailImages}
              description="Trường bắt buộc. Vui lòng chọn ảnh từ máy để làm ảnh đại diện sản phẩm."
              onUploaded={(images) => setForm((current) => ({ ...current, thumbnailImages: images }))}
              onRemove={(imageUrl) =>
                setForm((current) => ({
                  ...current,
                  thumbnailImages: current.thumbnailImages.filter((item) => item.imageUrl !== imageUrl)
                }))
              }
            />
            <label className="flex items-center gap-3 text-sm text-slate-300">
              <input
                checked={form.isFeatured}
                onChange={(event) => setForm((current) => ({ ...current, isFeatured: event.target.checked }))}
                type="checkbox"
                className="h-4 w-4 rounded border-slate-700 bg-slate-950"
              />
              <span>Đánh dấu nổi bật</span>
            </label>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-lg font-semibold">Nội dung và media</h2>
          <div className="mt-5 grid gap-4">
            <label className="grid gap-2 text-sm text-slate-300">
              <span>
                Mô tả ngắn
                <RequiredMark />
              </span>
              <textarea
                value={form.shortDescription}
                onChange={(event) => setForm((current) => ({ ...current, shortDescription: event.target.value }))}
                rows={3}
                className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none"
              />
            </label>
            <label className="grid gap-2 text-sm text-slate-300">
              <span>
                Mô tả chi tiết
                <RequiredMark />
              </span>
              <textarea
                value={form.description}
                onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
                rows={8}
                className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none"
              />
            </label>
            <ImageUploadField
              label="Thư viện ảnh"
              value={form.galleryImages}
              multiple
              onUploaded={(images) => setForm((current) => ({ ...current, galleryImages: images }))}
              onRemove={(imageUrl) =>
                setForm((current) => ({
                  ...current,
                  galleryImages: current.galleryImages.filter((item) => item.imageUrl !== imageUrl)
                }))
              }
            />
          </div>
        </div>
      </div>
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="text-lg font-semibold">Thuộc tính sản phẩm</h2>
        <p className="mt-3 text-sm text-slate-400">
          Nơi đặt sẵn cho các dòng như bảo hành, loại tài khoản, tình trạng, ghi chú và thông tin bàn giao.
        </p>
        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          <label className="grid gap-2 text-sm text-slate-300">
            <span>Bảo hành</span>
            <input
              value={form.warranty}
              onChange={(event) => setForm((current) => ({ ...current, warranty: event.target.value }))}
              className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none"
            />
          </label>
          <label className="grid gap-2 text-sm text-slate-300">
            <span>Bàn giao</span>
            <input
              value={form.delivery}
              onChange={(event) => setForm((current) => ({ ...current, delivery: event.target.value }))}
              className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none"
            />
          </label>
          <label className="grid gap-2 text-sm text-slate-300">
            <span>Ghi chú</span>
            <input
              value={form.note}
              onChange={(event) => setForm((current) => ({ ...current, note: event.target.value }))}
              className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none"
            />
          </label>
        </div>
      </div>
      {validationErrors.length > 0 ? (
        <div className="rounded-3xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-100">
          <p className="font-semibold">Các trường cần kiểm tra lại:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-red-100/90">
            {validationErrors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      ) : null}
      <div className="flex flex-wrap items-center justify-end gap-4">
        {mode === "edit" && productId && initialProduct ? (
          <AdminDeleteProductButton
            productId={productId}
            productTitle={initialProduct.title}
            redirectTo="/admin/products"
            className="rounded-full border border-red-500/40 px-5 py-3 text-sm font-semibold text-red-300 hover:border-red-400 hover:text-red-200"
          />
        ) : null}
        {message ? <p className="text-sm text-slate-300">{message}</p> : null}
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Đang lưu..." : mode === "edit" ? "Cập nhật sản phẩm" : "Lưu sản phẩm"}
        </button>
      </div>
    </form>
  );
}
