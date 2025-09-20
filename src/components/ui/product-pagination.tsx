import React from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface ProductPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  startIndex: number;
  endIndex: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (count: number) => void;
  itemType?: string;
}

const ProductPagination: React.FC<ProductPaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  startIndex,
  endIndex,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  itemType = "products"
}) => {
  if (totalPages <= 1) {
    return null;
  }

  const renderPageNumbers = () => {
    const pages = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <Button
            key={i}
            variant={currentPage === i ? "outline" : "ghost"}
            size="icon"
            onClick={() => onPageChange(i)}
            aria-current={currentPage === i ? "page" : undefined}
            className="h-9 w-9"
          >
            {i}
          </Button>
        );
      }
    } else {
      // Show first page
      pages.push(
        <Button
          key={1}
          variant={currentPage === 1 ? "outline" : "ghost"}
          size="icon"
          onClick={() => onPageChange(1)}
          aria-current={currentPage === 1 ? "page" : undefined}
          className="h-9 w-9"
        >
          1
        </Button>
      );

      // Show ellipsis after first page if needed
      if (currentPage > 3) {
        pages.push(
          <span
            key="start-ellipsis"
            className="flex h-9 w-9 items-center justify-center text-muted-foreground"
          >
            <MoreHorizontal className="h-4 w-4" />
          </span>
        );
      }

      // Show pages around current page
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <Button
            key={i}
            variant={currentPage === i ? "outline" : "ghost"}
            size="icon"
            onClick={() => onPageChange(i)}
            aria-current={currentPage === i ? "page" : undefined}
            className="h-9 w-9"
          >
            {i}
          </Button>
        );
      }

      // Show ellipsis before last page if needed
      if (currentPage < totalPages - 2) {
        pages.push(
          <span
            key="end-ellipsis"
            className="flex h-9 w-9 items-center justify-center text-muted-foreground"
          >
            <MoreHorizontal className="h-4 w-4" />
          </span>
        );
      }

      // Show last page
      if (totalPages > 1) {
        pages.push(
          <Button
            key={totalPages}
            variant={currentPage === totalPages ? "outline" : "ghost"}
            size="icon"
            onClick={() => onPageChange(totalPages)}
            aria-current={currentPage === totalPages ? "page" : undefined}
            className="h-9 w-9"
          >
            {totalPages}
          </Button>
        );
      }
    }

    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
      {/* Results summary and items per page selector */}
      <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-muted-foreground">
        <span>
          Showing {startIndex}-{endIndex} of {totalItems} {itemType}
        </span>
        <div className="flex items-center gap-2">
          <span>Show:</span>
          <Select value={itemsPerPage.toString()} onValueChange={(value) => onItemsPerPageChange(Number(value))}>
            <SelectTrigger className="w-16 h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="12">12</SelectItem>
              <SelectItem value="24">24</SelectItem>
              <SelectItem value="48">48</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Pagination controls */}
      <nav className="flex items-center gap-1" aria-label="Pagination">
        <Button
          variant="ghost"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="gap-1 pl-2.5"
          aria-label="Go to previous page"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Previous</span>
        </Button>

        <div className="flex items-center gap-1">
          {renderPageNumbers()}
        </div>

        <Button
          variant="ghost"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="gap-1 pr-2.5"
          aria-label="Go to next page"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </nav>
    </div>
  );
};

export default ProductPagination;