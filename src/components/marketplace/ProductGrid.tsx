import { Package, Loader2, ChevronDown, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
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
  onSave?: (product: MarketplaceProduct) => void;
  isProductSaved?: (productId: string) => boolean;
  className?: string;
}

const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.03, delayChildren: 0 },
  },
};

const gridItemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
};

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
  onSave,
  isProductSaved,
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
        <p className="mt-4 text-white text-center">Searching across all suppliers...</p>
      </div>
    );
  }

  // Empty state
  if (!isLoading && products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-20 h-20 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center mb-4">
          <Package className="h-10 w-10 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-white">No products found</h3>
        <p className="mt-2 text-white text-center max-w-sm">
          Try adjusting your search terms or removing some filters to see more results.
        </p>
      </div>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      {/* Results Header */}
      <div className="flex items-center justify-between px-1">
        <p className="text-sm text-white">
          Showing <span className="font-medium">{products.length}</span> of{' '}
          <span className="font-medium">{total.toLocaleString()}</span> products
        </p>
        {isLoading && <RefreshCw className="h-4 w-4 animate-spin text-white" />}
      </div>

      {/* Product Grid - 2 cols mobile, 3 tablet, 4 desktop */}
      <motion.div
        variants={gridContainerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
      >
        {products.map((product) => (
          <motion.div key={product.id} variants={gridItemVariants}>
            <MarketplaceProductCard
              product={product}
              onSave={onSave}
              isSaved={isProductSaved?.(product.id) ?? false}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Load More Button */}
      {hasMore && (
        <div className="pt-4 pb-safe">
          <Button
            onClick={onLoadMore}
            disabled={isLoading}
            className={cn(
              'w-full h-12 touch-manipulation font-semibold text-base',
              'bg-white/[0.03] border border-white/[0.08] active:bg-white/[0.06]',
              'text-white rounded-2xl transition-colors',
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

          <p className="text-center text-xs text-white mt-2">
            {products.length} of {total.toLocaleString()} loaded
          </p>
        </div>
      )}

      {/* All loaded state */}
      {!hasMore && products.length > 0 && products.length >= total && (
        <div className="py-6 text-center">
          <p className="text-sm text-white">
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
        <div className="h-4 w-32 bg-white/[0.03] rounded animate-pulse" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-white/[0.03] rounded-2xl border border-white/[0.08] overflow-hidden">
            <div className="w-full h-[150px] bg-white/[0.05] animate-pulse" />
            <div className="p-3 space-y-2">
              <div className="h-4 w-full bg-white/[0.05] rounded animate-pulse" />
              <div className="h-4 w-3/4 bg-white/[0.05] rounded animate-pulse" />
              <div className="h-3 w-1/2 bg-white/[0.05] rounded animate-pulse" />
              <div className="h-6 w-20 bg-white/[0.05] rounded animate-pulse mt-2" />
              <div className="h-11 w-full bg-white/[0.05] rounded-lg animate-pulse mt-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductGrid;
