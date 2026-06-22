"use client";

import Image from "next/image";
import { ChangeEvent, useMemo, useState } from "react";

export type UploadedImage = {
  imageUrl: string;
  publicId?: string | null;
};

type ImageUploadFieldProps = {
  label: string;
  value: UploadedImage[];
  folder?: string;
  description?: string;
  multiple?: boolean;
  onUploaded: (images: UploadedImage[]) => void;
  onRemove?: (imageUrl: string) => void;
};

export function ImageUploadField({
  label,
  value,
  folder = "products",
  description,
  multiple = false,
  onUploaded,
  onRemove
}: ImageUploadFieldProps) {
  const [status, setStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const previewItems = useMemo(() => value.filter((item) => item.imageUrl.trim().length > 0), [value]);

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);

    if (!files.length) {
      return;
    }

    setStatus("uploading");
    setErrorMessage("");

    try {
      const uploadedItems: UploadedImage[] = [];

      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder);

        const response = await fetch("/api/admin/media/upload", {
          method: "POST",
          body: formData
        });

        const payload = (await response.json()) as {
          message?: string;
          item?: UploadedImage;
        };

        if (!response.ok || !payload.item) {
          throw new Error(payload.message ?? "Upload thất bại");
        }

        uploadedItems.push(payload.item);
      }

      onUploaded(multiple ? [...previewItems, ...uploadedItems] : uploadedItems);
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Chưa thể upload ảnh.");
    } finally {
      event.target.value = "";
    }
  }

  return (
    <div className="grid gap-4 rounded-[24px] border border-dashed border-slate-700 bg-slate-950/70 p-4">
      <div>
        <p className="text-sm font-medium text-slate-300">{label}</p>
        {description ? <p className="mt-1 text-xs leading-6 text-slate-500">{description}</p> : null}
      </div>

      <label className="inline-flex w-fit cursor-pointer items-center rounded-full border border-slate-700 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300 transition hover:border-white hover:text-white">
        {multiple ? "Chọn nhiều ảnh" : "Chọn ảnh"}
        <input type="file" accept="image/*" multiple={multiple} onChange={handleFileChange} className="hidden" />
      </label>

      {status === "uploading" ? <p className="text-xs text-slate-400">Đang upload ảnh...</p> : null}
      {status === "success" ? <p className="text-xs font-medium text-green-400">Upload thành công.</p> : null}
      {errorMessage ? <p className="text-xs text-red-400">{errorMessage}</p> : null}

      {previewItems.length ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {previewItems.map((item, index) => (
            <div key={`${item.imageUrl}-${index}`} className="overflow-hidden rounded-2xl border border-slate-700 bg-slate-900">
              <div className="relative aspect-[16/10]">
                <Image src={item.imageUrl} alt={`${label} ${index + 1}`} fill className="object-cover" />
                {onRemove ? (
                  <button
                    type="button"
                    onClick={() => onRemove(item.imageUrl)}
                    className="absolute right-3 top-3 rounded-full bg-black/65 px-3 py-1 text-xs font-semibold text-white backdrop-blur"
                  >
                    Xóa
                  </button>
                ) : null}
              </div>
              <div className="border-t border-slate-700 px-3 py-2 text-xs font-medium text-slate-400">Ảnh {index + 1}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-[20px] border border-slate-700 bg-slate-900 px-4 py-5 text-xs text-slate-500">
          Chưa có ảnh nào được chọn.
        </div>
      )}
    </div>
  );
}
