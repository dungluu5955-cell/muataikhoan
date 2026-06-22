import { hardcodedNews } from "@/lib/news-data";

export default function NewsPage() {
  return (
    <div className="shell py-16">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">Tin tức công nghệ</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">Tin tức và hướng dẫn nổi bật</h1>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {hardcodedNews.map((item) => (
          <article
            key={item.id}
            className="rounded-[28px] border border-[#f0ddd6] bg-white p-6 shadow-[0_18px_50px_rgba(20,24,36,0.06)]"
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[#fff2eb] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                {item.category}
              </span>
              <span className="text-xs text-slate-500">{item.publishedAt}</span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500">{item.readTime}</span>
            </div>
            <h2 className="mt-4 text-2xl font-semibold leading-9 tracking-tight text-ink">{item.title}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">{item.excerpt}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
