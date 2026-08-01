import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  searchParams: Record<string, string>;
}

type PageItem = number | '...';

const PAGE_NEIGHBORS = 2;

export default function Pagination({
  currentPage,
  totalPages,
  baseUrl,
  searchParams,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const getPageUrl = (page: number) => {
    const params = new URLSearchParams({
      ...searchParams,
      page: String(page),
    });

    return `${baseUrl}?${params.toString()}`;
  };

  const getVisiblePages = (): PageItem[] => {
if (totalPages <= PAGE_NEIGHBORS * 2 + 3) {
  return Array.from({ length: totalPages }, (_, i) => i + 1);
}
    const pages: PageItem[] = [];
    const middlePages: number[] = [];

    for (
      let page = Math.max(2, currentPage - PAGE_NEIGHBORS);
      page <= Math.min(totalPages - 1, currentPage + PAGE_NEIGHBORS);
      page++
    ) {
      middlePages.push(page);
    }

    pages.push(1);

    if (currentPage - PAGE_NEIGHBORS > 2) {
      pages.push('...');
    }

    pages.push(...middlePages);

    if (currentPage + PAGE_NEIGHBORS < totalPages - 1) {
      pages.push('...');
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <nav
      className="flex items-center justify-center gap-1"
      aria-label="Pagination"
    >
      <Link
        href={getPageUrl(Math.max(1, currentPage - 1))}
        aria-disabled={isFirstPage}
        className={`flex items-center rounded-lg px-3 py-2 text-sm font-medium ${isFirstPage
            ? 'pointer-events-none cursor-not-allowed bg-gray-100 text-gray-400'
            : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-100'
          }`}
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Previous
      </Link>

      {visiblePages.map((page, index) => {
        if (page === '...') {
          return (
            <span
              key={`dots-${index}`}
              className="px-3 py-2 text-sm text-gray-500"
            >
              ...
            </span>
          );
        }

        const isCurrent = page === currentPage;

        return (
          <Link
            key={page}
            href={getPageUrl(page)}
            aria-current={isCurrent ? 'page' : undefined}
            className={`rounded-lg px-3 py-2 text-sm font-medium ${isCurrent
                ? 'bg-purple-600 text-white'
                : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-100'
              }`}
          >
            {page}
          </Link>
        );
      })}

      <Link
        href={getPageUrl(Math.min(totalPages, currentPage + 1))}
        aria-disabled={isLastPage}
        className={`flex items-center rounded-lg px-3 py-2 text-sm font-medium ${isLastPage
            ? 'pointer-events-none cursor-not-allowed bg-gray-100 text-gray-400'
            : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-100'
          }`}
      >
        Next
        <ChevronRight className="ml-1 h-4 w-4" />
      </Link>
    </nav>
  );
}
