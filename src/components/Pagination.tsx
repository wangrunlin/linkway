"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  className,
}: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams);
      if (page === 1) {
        params.delete("page");
      } else {
        params.set("page", page.toString());
      }
      return params.toString();
    },
    [searchParams]
  );

  const handlePageChange = (page: number) => {
    const queryString = createQueryString(page);
    router.push(`${pathname}${queryString ? `?${queryString}` : ""}`);
  };

  const renderPageNumbers = () => {
    const items = [];
    const showAroundCurrent = window.innerWidth < 640 ? 1 : 2;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        Math.abs(i - currentPage) <= showAroundCurrent
      ) {
        items.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={cn(
              "min-w-[2.5rem] px-3 py-2 border dark:border-gray-700 rounded-md transition-colors text-center",
              i === currentPage
                ? "bg-blue-600 border-blue-600 text-white dark:bg-blue-500 dark:border-blue-500"
                : "hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-300"
            )}
            aria-current={i === currentPage ? "page" : undefined}
            aria-label={`Page ${i}`}
          >
            {i}
          </button>
        );
      } else if (
        i === currentPage - showAroundCurrent - 1 ||
        i === currentPage + showAroundCurrent + 1
      ) {
        items.push(
          <span
            key={i}
            className="px-1 text-gray-500 dark:text-gray-400 self-end"
            aria-hidden="true"
          >
            •••
          </span>
        );
      }
    }
    return items;
  };

  return (
    <div className={cn("mt-12 space-y-4", className)}>
      <nav
        className="flex justify-center items-center gap-2"
        aria-label="Pagination"
      >
        {currentPage > 1 && (
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-3 py-2 border dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors dark:text-gray-300 sm:px-4"
            aria-label="Previous page"
          >
            <span className="hidden sm:inline">Previous</span>
            <span className="sm:hidden">←</span>
          </button>
        )}

        <div className="flex gap-1 sm:gap-2">{renderPageNumbers()}</div>

        {currentPage < totalPages && (
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-3 py-2 border dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors dark:text-gray-300 sm:px-4"
            aria-label="Next page"
          >
            <span className="hidden sm:inline">Next</span>
            <span className="sm:hidden">→</span>
          </button>
        )}
      </nav>

      <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
        <span className="hidden sm:inline">
          Page {currentPage} of {totalPages} • Showing products{" "}
        </span>
        <span className="sm:hidden">
          {currentPage}/{totalPages} •{" "}
        </span>
        {(currentPage - 1) * pageSize + 1}-
        {Math.min(currentPage * pageSize, totalItems)} of {totalItems}
      </p>
    </div>
  );
}
