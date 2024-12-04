"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { cn } from "@/lib/utils";

interface PaginProps {
  filterParams: {
    q?: string;
    category?: string;
    price?: string;
    rating?: string;
    sort?: string;
    page: string;
  };
  totalPages: number;
}

export const PaginationBar = ({ filterParams, totalPages }: PaginProps) => {
  const { page } = filterParams;

  const currentPage = Math.max(1, Math.min(Number(page) || 1, totalPages));

  const getLink = (page: number) => {
    const newSearchParams = new URLSearchParams({ ...filterParams });
    newSearchParams.set("page", page.toString());

    return `?${newSearchParams.toString()}`;
  };

  if (totalPages <= 1) return null;

  return (
    <Pagination className="pt-5">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={currentPage === 1 ? "#" : getLink(currentPage - 1)}
            className={cn(
              currentPage === 1 && "text-muted-foreground pointer-events-none"
            )}
            aria-disabled={currentPage === 1}
          />
        </PaginationItem>

        {Array.from({ length: totalPages }, (_, i) => {
          const page = i + 1;
          const isEdgePage = page === 1 || page === totalPages;
          const isNearCurrentPage = Math.abs(page - currentPage) <= 2;

          if (!isEdgePage && !isNearCurrentPage) {
            if (i === 1 || i === totalPages - 2) {
              return (
                <PaginationItem key={page} className="hidden md:block">
                  <PaginationEllipsis className="text-muted-foreground" />
                </PaginationItem>
              );
            }

            return null;
          }

          return (
            <PaginationItem
              key={page}
              className={cn(
                "hidden md:block",
                page === currentPage && "pointer-events-none"
              )}
            >
              <PaginationLink
                href={getLink(page)}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            href={currentPage >= totalPages ? "#" : getLink(currentPage + 1)}
            className={cn(
              currentPage >= totalPages &&
                "text-muted-foreground pointer-events-none"
            )}
            aria-disabled={currentPage >= totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
