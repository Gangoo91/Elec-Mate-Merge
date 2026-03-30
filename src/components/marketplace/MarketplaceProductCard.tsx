import { ExternalLink, Package, Bookmark, Zap, Cable, Lightbulb, ToggleLeft, Shield, Box } from 'lucide-react';
import { MarketplaceProduct } from '@/hooks/useMarketplaceSearch';
import { cn } from '@/lib/utils';
import { proxyImageUrl } from '@/lib/proxyImage';

// Category-based fallback icons when no product image
const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  cables: Cable,
  'consumer-units': Shield,
  'circuit-protection': Zap,
  'sockets-switches': ToggleLeft,
  lighting: Lightbulb,
  containment: Box,
};

const getCategoryIcon = (category?: string | null) => {
  if (!category) return Package;
  const key = category.toLowerCase().replace(/\s+/g, '-');
  return categoryIcons[key] || Package;
};

interface MarketplaceProductCardProps {
  product: MarketplaceProduct;
  className?: string;
  onSave?: (product: MarketplaceProduct) => void;
  isSaved?: boolean;
}

const formatPrice = (price: number | null | undefined): string => {
  if (price === null || price === undefined) return '-.--';
  return price.toFixed(2);
};

export function MarketplaceProductCard({
  product,
  className,
  onSave,
  isSaved = false,
}: MarketplaceProductCardProps) {
  const savings =
    product.regular_price && product.current_price && product.regular_price > product.current_price
      ? (product.regular_price - product.current_price).toFixed(2)
      : null;

  const proxiedImage = proxyImageUrl(product.image_url);
  const displayTitle = product.brand ? `${product.brand} ${product.name}` : product.name;

  return (
    <a
      href={product.product_url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group relative flex flex-col h-full card-surface-interactive overflow-hidden touch-manipulation',
        'active:scale-[0.98] transition-all duration-200',
        className
      )}
    >
      {/* Top accent line — yellow for normal, red for deals */}
      <div
        className={cn(
          'absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r opacity-30 group-hover:opacity-80 transition-opacity duration-200',
          product.is_on_sale
            ? 'from-red-500 via-orange-400 to-elec-yellow'
            : 'from-elec-yellow via-amber-400 to-orange-400'
        )}
      />

      {/* Image */}
      <div className="relative w-full aspect-square bg-white overflow-hidden">
        {proxiedImage ? (
          <img
            src={proxiedImage}
            alt={product.name}
            className="w-full h-full object-contain p-3"
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={(e) => {
              const img = e.currentTarget as HTMLImageElement;
              img.style.display = 'none';
              const fallback = img.parentElement?.querySelector('[data-fallback]') as HTMLElement;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
        ) : null}
        <div
          data-fallback
          className="w-full h-full flex flex-col items-center justify-center bg-[hsl(0,0%,12%)] p-4"
          style={{ display: proxiedImage ? 'none' : 'flex' }}
        >
          {(() => {
            const FallbackIcon = getCategoryIcon(product.category);
            return <FallbackIcon className="h-10 w-10 text-elec-yellow/40 mb-2" />;
          })()}
          <p className="text-[10px] text-white text-center line-clamp-2 max-w-[80%]">
            {product.brand || product.supplier_name}
          </p>
        </div>

        {/* Discount badge — top left */}
        {product.is_on_sale && product.discount_percentage && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
            {product.discount_percentage}% OFF
          </div>
        )}

        {/* Save button — top right */}
        {onSave && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onSave(product);
            }}
            className={cn(
              'absolute top-2 right-2 h-7 w-7 rounded-full flex items-center justify-center touch-manipulation',
              'transition-all duration-200 shadow-sm',
              isSaved ? 'bg-elec-yellow text-black' : 'bg-black/40 text-white active:bg-black/60'
            )}
          >
            <Bookmark className={cn('h-3.5 w-3.5', isSaved && 'fill-current')} />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col p-3 sm:p-3.5">
        {/* Supplier */}
        <p className="text-[10px] font-medium text-white mb-1">{product.supplier_name}</p>

        {/* Product name */}
        <h3 className="text-xs sm:text-sm font-semibold text-white leading-tight line-clamp-3 mb-2 group-hover:text-elec-yellow transition-colors">
          {displayTitle}
        </h3>

        {/* Spacer */}
        <div className="flex-grow" />

        {/* Price */}
        <div className="pt-2 border-t border-white/[0.06]">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-elec-yellow">
              £{formatPrice(product.current_price)}
            </span>
            {product.is_on_sale && product.regular_price && (
              <span className="text-[10px] text-white line-through">
                £{formatPrice(product.regular_price)}
              </span>
            )}
          </div>
          {savings && (
            <p className="text-[10px] font-medium text-green-400 mt-0.5">Save £{savings}</p>
          )}
        </div>

        {/* View Deal row */}
        <div className="flex items-center justify-between mt-2">
          <span className="text-[11px] sm:text-xs font-medium text-elec-yellow">View Deal</span>
          <div
            className={cn(
              'w-6 h-6 sm:w-7 sm:h-7 rounded-full',
              'bg-white/[0.05] border border-elec-yellow/20',
              'flex items-center justify-center',
              'group-hover:bg-elec-yellow group-hover:border-elec-yellow',
              'transition-all duration-200'
            )}
          >
            <ExternalLink
              className={cn(
                'w-3 h-3 sm:w-3.5 sm:h-3.5 text-white',
                'group-hover:text-black',
                'transition-all'
              )}
            />
          </div>
        </div>
      </div>
    </a>
  );
}

export default MarketplaceProductCard;
