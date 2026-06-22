import Link from "next/link";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  basePath: string;
};

function buildPageHref(basePath: string, page: number) {
  return page <= 1 ? basePath : `${basePath}?page=${page}`;
}

export function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
      <Link
        href={buildPageHref(basePath, Math.max(1, currentPage - 1))}
        aria-disabled={currentPage === 1}
        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
          currentPage === 1
            ? "pointer-events-none border border-[#ead7cf] bg-white text-slate-400"
            : "border border-[#ead7cf] bg-white text-ink hover:border-brand hover:text-brand"
        }`}
      >
        Trước
      </Link>

      {pages.map((page) => (
        <Link
          key={page}
          href={buildPageHref(basePath, page)}
          className={`inline-flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
            page === currentPage
              ? "bg-brand text-white"
              : "border border-[#ead7cf] bg-white text-ink hover:border-brand hover:text-brand"
          }`}
        >
          {page}
        </Link>
      ))}

      <Link
        href={buildPageHref(basePath, Math.min(totalPages, currentPage + 1))}
        aria-disabled={currentPage === totalPages}
        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
          currentPage === totalPages
            ? "pointer-events-none border border-[#ead7cf] bg-white text-slate-400"
            : "border border-[#ead7cf] bg-white text-ink hover:border-brand hover:text-brand"
        }`}
      >
        Sau
      </Link>
    </div>
  );
}
