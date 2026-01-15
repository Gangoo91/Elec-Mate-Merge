import { Package, Loader2 } from 'lucide-react';
import { SearchResultCard } from './SearchResultCard';
import { MarketplaceProduct } from '@/hooks/useMarketplaceSearch';
import { Button } from '@/components/ui/button';

interface SearchResultsGridProps {
  products: MarketplaceProduct[];
  total: number;
  page: number;
  totalPages: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
}

/**
 * Search Results Grid (List Style)
 * Displays products in a vertical list format
 */
export function SearchResultsGrid({
  products,
  total,
  page,
  totalPages,
  isLoading,
  onPageChange,
}: SearchResultsGridProps) {
  // Loading state
  if (isLoading && products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
        <p className="mt-4 text-muted-foreground">Searching products...</p>
      </div>
    );
  }

  // Empty state
  if (!isLoading && products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Package className="h-16 w-16 text-muted-foreground/50" />
        <h3 className="mt-4 text-lg font-medium">No products found</h3>
        <p className="mt-2 text-muted-foreground text-center max-w-md">
          Try adjusting your search terms or filters to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {/* Results Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-muted/30 rounded-t-lg">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">{products.length}</span> of{' '}
          <span className="font-medium text-foreground">{total.toLocaleString()}</span> results
        </p>
        {isLoading && (
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        )}
      </div>

      {/* Results List */}
      <div className="border border-t-0 rounded-b-lg overflow-hidden">
        {products.map((product) => (
          <SearchResultCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}

/**
 * Pagination Component
 */
function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];
    const showPages = 5;

    if (totalPages <= showPages + 2) {
      // Show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push('ellipsis');
      }

      // Show pages around current
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('ellipsis');
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-1 py-6">
      {/* Previous Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="h-10 px-4 touch-manipulation"
      >
        Previous
      </Button>

      {/* Page Numbers */}
      <div className="hidden sm:flex items-center gap-1">
        {getPageNumbers().map((page, index) =>
          page === 'ellipsis' ? (
            <span key={`ellipsis-${index}`} className="px-2 text-muted-foreground">
              ...
            </span>
          ) : (
            <Button
              key={page}
              variant={page === currentPage ? 'default' : 'outline'}
              size="sm"
              onClick={() => onPageChange(page)}
              className={
                page === currentPage
                  ? 'h-10 w-10 bg-elec-yellow text-black hover:bg-elec-yellow/90'
                  : 'h-10 w-10 touch-manipulation'
              }
            >
              {page}
            </Button>
          )
        )}
      </div>

      {/* Mobile Page Indicator */}
      <span className="sm:hidden px-4 text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </span>

      {/* Next Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="h-10 px-4 touch-manipulation"
      >
        Next
      </Button>
    </div>
  );
}
