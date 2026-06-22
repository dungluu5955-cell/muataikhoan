import type { SampleProduct } from "@/types/product";

export const sampleProducts: SampleProduct[] = [
  {
    id: "sample-1",
    slug: "canva-pro-team",
    title: "Canva Pro Team",
    category: "AI tools",
    categorySlug: "ai-tools",
    status: "active",
    priceValue: 89000,
    salePriceValue: 69000,
    priceLabel: "89.000d",
    salePriceLabel: "69.000d",
    thumbnailUrl: "/banner/small-2.png",
    shortDescription: "Tài khoản dùng nhanh cho nhu cầu thiết kế cơ bản và team nhỏ.",
    description: "Sản phẩm mẫu để dựng layout chi tiết, card và quy trình CRUD ban đầu.",
    attributes: [
      { label: "Bảo hành", value: "30 ngày" },
      { label: "Bàn giao", value: "Qua email hoặc chat" },
      { label: "Loại", value: "Tài khoản team" }
    ]
  },
  {
    id: "sample-2",
    slug: "spotify-premium",
    title: "Spotify Premium",
    category: "Streaming",
    categorySlug: "streaming",
    status: "active",
    priceValue: 39000,
    salePriceValue: 29000,
    priceLabel: "39.000d",
    salePriceLabel: "29.000d",
    thumbnailUrl: "/banner/small-3.png",
    shortDescription: "Gói nghe nhạc phù hợp cho layout sản phẩm giá mềm.",
    description: "Dữ liệu này được đặt sẵn để sau này thay bằng dữ liệu database.",
    attributes: [
      { label: "Bảo hành", value: "7 ngày" },
      { label: "Loại", value: "Cá nhân" },
      { label: "Tình trạng", value: "Còn hàng" }
    ]
  },
  {
    id: "sample-3",
    slug: "office-365-1-nam",
    title: "Office 365 1 nam",
    category: "Phần mềm",
    categorySlug: "phan-mem",
    status: "sold",
    priceValue: 149000,
    salePriceValue: null,
    priceLabel: "149.000d",
    salePriceLabel: null,
    thumbnailUrl: "/banner/small-1.png",
    shortDescription: "Case mẫu cho badge đã bán và card product.",
    description: "Trang detail page có thể tái sử dụng cho nhiều loại sản phẩm khác nhau.",
    attributes: [
      { label: "Thời hạn", value: "12 tháng" },
      { label: "Bàn giao", value: "Trong ngày" },
      { label: "Tình trạng", value: "Đã bán" }
    ]
  }
];
