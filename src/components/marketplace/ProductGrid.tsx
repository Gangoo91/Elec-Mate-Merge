import { Package, Loader2, ChevronDown, RefreshCw } from 'lucide-react';
import { MarketplaceProductCard } from './MarketplaceProductCard';
import { MarketplaceProduct } from '@/hooks/useMarketplaceSearch';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProductGridProps {
  products: MarketplaceProduct[];
  total: number;
  isLoading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  className?: string;
}

/**
 * Mobile-first Product Grid
 * 2 columns on mobile, 3 on tablet, 4 on desktop
 * Uses "Load More" instead of pagination for native app feel
 */
export function ProductGrid({
  products,
  total,
  isLoading,
  hasMore,
  onLoadMore,
  className,
}: ProductGridProps) {
  // Initial loading state
  if (isLoading && products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="relative">
          <Loader2 className="h-10 w-10 animate-spin text-elec-yellow" />
          <div className="absolute inset-0 h-10 w-10 animate-ping opacity-20 rounded-full bg-elec-yellow" />
        </div>
        <p className="mt-4 text-muted-foreground text-center">
          Searching across all suppliers...
        </p>
      </div>
    );
  }

  // Empty state
  if (!isLoading && products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
          <Package className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">No products found</h3>
        <p className="mt-2 text-muted-foreground text-center max-w-sm">
          Try adjusting your search terms or removing some filters to see more results.
        </p>
      </div>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      {/* Results Header */}
      <div className="flex items-center justify-between px-1">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">{products.length}</span> of{' '}
          <span className="font-medium text-foreground">{total.toLocaleString()}</span> products
        </p>
        {isLoading && (
          <RefreshCw className="h-4 w-4 animate-spin text-muted-foreground" />
        )}
      </div>

      {/* Product Grid - 2 cols mobile, 3 tablet, 4 desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {products.map((product) => (
          <MarketplaceProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Load More Button - Mobile-first, no pagination */}
      {hasMore && (
        <div className="pt-4 pb-safe">
          <Button
            onClick={onLoadMore}
            disabled={isLoading}
            className={cn(
              'w-full h-12 touch-manipulation font-semibold text-base',
              'bg-elec-gray hover:bg-elec-gray/80 border border-elec-yellow/30',
              'text-foreground rounded-xl transition-all',
              isLoading && 'opacity-70'
            )}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                Loading more...
              </>
            ) : (
              <>
                <ChevronDown className="h-5 w-5 mr-2" />
                Load More Products
              </>
            )}
          </Button>

          {/* Progress indicator */}
          <p className="text-center text-xs text-muted-foreground mt-2">
            {products.length} of {total.toLocaleString()} loaded
          </p>
        </div>
      )}

      {/* All loaded state */}
      {!hasMore && products.length > 0 && products.length >= total && (
        <div className="py-6 text-center">
          <p className="text-sm text-muted-foreground">
            You've seen all {total.toLocaleString()} products
          </p>
        </div>
      )}
    </div>
  );
}

/**
 * Skeleton loader for initial load
 */
export function ProductGridSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <div className="h-4 w-32 bg-muted rounded animate-pulse" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-card rounded-xl border border-border/50 overflow-hidden">
            {/* Image skeleton */}
            <div className="w-full h-[150px] bg-muted animate-pulse" />

            {/* Content skeleton */}
            <div className="p-3 space-y-2">
              <div className="h-4 w-full bg-muted rounded animate-pulse" />
              <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
              <div className="h-3 w-1/2 bg-muted rounded animate-pulse" />
              <div className="h-6 w-20 bg-muted rounded animate-pulse mt-2" />
              <div className="h-11 w-full bg-muted rounded-lg animate-pulse mt-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductGrid;
