"use client";

import Image from "next/image";
import { useState } from "react";

type GalleryImage = {
  imageUrl: string;
  alt: string;
};

type ProductGalleryProps = {
  images: GalleryImage[];
};

export function ProductGallery({ images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) {
    return null;
  }

  const activeImage = images[activeIndex] ?? images[0];

  return (
    <div className="grid gap-4">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-mist">
        <Image src={activeImage.imageUrl} alt={activeImage.alt} fill className="object-cover" priority />
      </div>

      {images.length > 1 ? (
        <div className="grid grid-cols-3 gap-3">
          {images.map((image, index) => (
            <button
              key={`${image.imageUrl}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`relative aspect-square overflow-hidden rounded-xl bg-mist ring-offset-2 transition ${
                index === activeIndex ? "ring-2 ring-brand" : "hover:opacity-90"
              }`}
            >
              <Image src={image.imageUrl} alt={image.alt} fill className="object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
