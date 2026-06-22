export type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readTime: string;
};

export const hardcodedNews: NewsItem[] = [
  {
    id: "news-1",
    title: "Cách chọn tài khoản học tập phù hợp với nhu cầu sử dụng",
    excerpt:
      "Nếu bạn đang tìm tài khoản phục vụ học ngoại ngữ, khóa học online hoặc làm bài tập nhóm, hãy ưu tiên gói có thời hạn rõ ràng, hỗ trợ sau mua và thông tin bàn giao minh bạch.",
    category: "Học tập",
    publishedAt: "21/06/2026",
    readTime: "4 phút đọc"
  },
  {
    id: "news-2",
    title: "5 lưu ý trước khi mua tài khoản Canva, Adobe và công cụ AI",
    excerpt:
      "Với nhóm phần mềm sáng tạo và AI, điều quan trọng không chỉ là giá mà còn là loại gói, quyền truy cập, cách bàn giao và chính sách bảo hành khi phát sinh lỗi.",
    category: "Công cụ AI",
    publishedAt: "20/06/2026",
    readTime: "5 phút đọc"
  },
  {
    id: "news-3",
    title: "Nên chọn tài khoản streaming theo tháng hay theo gói dài hạn?",
    excerpt:
      "Các dịch vụ nghe nhạc và xem phim thường có nhiều mức giá khác nhau. Gói ngắn hạn phù hợp để trải nghiệm nhanh, còn gói dài hạn sẽ tối ưu chi phí nếu bạn dùng thường xuyên.",
    category: "Giải trí",
    publishedAt: "19/06/2026",
    readTime: "3 phút đọc"
  },
  {
    id: "news-4",
    title: "Tài khoản VPN và dịch vụ bảo mật nào phù hợp cho người dùng cá nhân?",
    excerpt:
      "Khi mua VPN hoặc các công cụ bảo mật, bạn nên chú ý tới khu vực máy chủ, độ ổn định, số thiết bị hỗ trợ và khả năng dùng cho học tập, làm việc hoặc giải trí.",
    category: "Bảo mật",
    publishedAt: "18/06/2026",
    readTime: "4 phút đọc"
  },
  {
    id: "news-5",
    title: "Checklist kiểm tra shop bán tài khoản trước khi chốt đơn",
    excerpt:
      "Một shop uy tín thường có mô tả sản phẩm rõ, giá công khai, thời gian bảo hành cụ thể, kênh hỗ trợ nhanh và lịch sử cập nhật sản phẩm đều đặn.",
    category: "Mẹo mua hàng",
    publishedAt: "17/06/2026",
    readTime: "4 phút đọc"
  }
];
