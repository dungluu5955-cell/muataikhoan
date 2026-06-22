export type ProductAttributeView = {
  label: string;
  value: string;
};

export type ProductImageView = {
  imageUrl: string;
  publicId?: string | null;
  sortOrder?: number;
};

export type SampleProduct = {
  id?: string;
  slug: string;
  title: string;
  category: string;
  categorySlug?: string;
  status: string;
  priceValue?: number;
  salePriceValue?: number | null;
  priceLabel: string;
  salePriceLabel?: string | null;
  shortDescription: string;
  description: string;
  thumbnailUrl?: string;
  isFeatured?: boolean;
  contactLink?: string | null;
  attributes: ProductAttributeView[];
  images?: ProductImageView[];
};
