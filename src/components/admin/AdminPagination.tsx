import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  itemsPerPageOptions?: number[];
  className?: string;
}

/**
 * Consistent pagination component for admin pages
 */
export default function AdminPagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  itemsPerPageOptions = [25, 50, 100],
  className,
}: AdminPaginationProps) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className={cn(
      "flex flex-col sm:flex-row items-center justify-between gap-3 py-3",
      className
    )}>
      {/* Item count and per-page selector */}
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <span>
          {startItem}-{endItem} of {totalItems}
        </span>
        {onItemsPerPageChange && (
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline">Show:</span>
            <Select
              value={String(itemsPerPage)}
              onValueChange={(val) => onItemsPerPageChange(Number(val))}
            >
              <SelectTrigger className="h-9 w-20 touch-manipulation">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {itemsPerPageOptions.map((option) => (
                  <SelectItem key={option} value={String(option)}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Page navigation */}
      <div className="flex items-center gap-1">
        {/* First page */}
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 touch-manipulation"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>

        {/* Previous page */}
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 touch-manipulation"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Page numbers */}
        <div className="flex items-center gap-1 mx-1">
          {generatePageNumbers(currentPage, totalPages).map((page, idx) => (
            page === "..." ? (
              <span key={`ellipsis-${idx}`} className="px-2 text-muted-foreground">...</span>
            ) : (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="icon"
                className={cn(
                  "h-9 w-9 touch-manipulation",
                  currentPage === page && "bg-yellow-500 hover:bg-yellow-600 text-black"
                )}
                onClick={() => onPageChange(page as number)}
              >
                {page}
              </Button>
            )
          ))}
        </div>

        {/* Next page */}
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 touch-manipulation"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {/* Last page */}
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 touch-manipulation"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

/**
 * Generate page numbers with ellipsis for large page counts
 */
function generatePageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "...")[] = [];

  // Always show first page
  pages.push(1);

  // Calculate range around current page
  const rangeStart = Math.max(2, current - 1);
  const rangeEnd = Math.min(total - 1, current + 1);

  // Add ellipsis if needed before range
  if (rangeStart > 2) {
    pages.push("...");
  }

  // Add range pages
  for (let i = rangeStart; i <= rangeEnd; i++) {
    pages.push(i);
  }

  // Add ellipsis if needed after range
  if (rangeEnd < total - 1) {
    pages.push("...");
  }

  // Always show last page
  if (total > 1) {
    pages.push(total);
  }

  return pages;
}
