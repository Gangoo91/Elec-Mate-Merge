import {
  ExternalLink,
  Tag,
  Package,
  CheckCircle2,
  ShoppingCart,
  Flame,
  Zap,
  Timer,
  Bookmark,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MarketplaceProduct } from '@/hooks/useMarketplaceSearch';
import { PriceSparkline } from '@/components/marketplace/PriceSparkline';
import { cn } from '@/lib/utils';
import { proxyImageUrl } from '@/lib/proxyImage';

interface MarketplaceProductCardProps {
  product: MarketplaceProduct;
  className?: string;
  onSave?: (product: MarketplaceProduct) => void;
  isSaved?: boolean;
}

// Safe price formatting helper
const formatPrice = (price: number | null | undefined): string => {
  if (price === null || price === undefined) return '-.--';
  return price.toFixed(2);
};

const calculateSavings = (
  regular: number | null | undefined,
  current: number | null | undefined
): string | null => {
  if (!regular || !current || regular <= current) return null;
  return (regular - current).toFixed(2);
};

/**
 * Mobile-first product card for marketplace grid
 * Merged brand+title with line-clamp-3, consistent flex layout
 */
export function MarketplaceProductCard({
  product,
  className,
  onSave,
  isSaved = false,
}: MarketplaceProductCardProps) {
  const savings = calculateSavings(product.regular_price, product.current_price);

  // Stock status info
  const getStockInfo = () => {
    const status = product.stock_status?.toLowerCase() || '';
    if (status.includes('in stock')) {
      return { text: 'In Stock', color: 'text-green-500', bgColor: 'bg-green-500/20' };
    } else if (status.includes('low')) {
      return { text: 'Low Stock', color: 'text-orange-500', bgColor: 'bg-orange-500/20' };
    } else if (status.includes('out')) {
      return { text: 'Out of Stock', color: 'text-red-500', bgColor: 'bg-red-500/20' };
    }
    return { text: 'Check Availability', color: 'text-white', bgColor: 'bg-muted' };
  };

  // Deal badge type
  const getDealBadge = () => {
    if (!product.is_on_sale || !product.discount_percentage) return null;

    if (product.discount_percentage >= 30) {
      return { icon: Flame, text: 'Hot Deal', className: 'bg-red-500 text-white' };
    } else if (product.discount_percentage >= 20) {
      return { icon: Zap, text: 'Flash Sale', className: 'bg-orange-500 text-white' };
    } else {
      return {
        icon: Tag,
        text: `${product.discount_percentage}% off`,
        className: 'bg-green-500 text-white',
      };
    }
  };

  const stockInfo = getStockInfo();
  const dealBadge = getDealBadge();

  // Supplier badge colours
  const supplierColors: Record<string, string> = {
    screwfix: 'bg-orange-500',
    toolstation: 'bg-blue-500',
    cef: 'bg-green-500',
    'electrical-direct': 'bg-purple-500',
    'rs-components': 'bg-red-500',
    'tlc-electrical': 'bg-cyan-500',
    edmundson: 'bg-yellow-500',
    wickes: 'bg-teal-500',
    bandq: 'bg-emerald-500',
    'machine-mart': 'bg-amber-500',
    ffx: 'bg-indigo-500',
  };

  // Supplier fallback gradients (shown when no image / image fails)
  const supplierGradients: Record<string, string> = {
    screwfix: 'from-orange-100 to-orange-200',
    toolstation: 'from-blue-100 to-blue-200',
    cef: 'from-green-100 to-green-200',
    'electrical-direct': 'from-purple-100 to-purple-200',
    'rs-components': 'from-red-100 to-red-200',
    'tlc-electrical': 'from-cyan-100 to-cyan-200',
    edmundson: 'from-yellow-100 to-yellow-200',
    wickes: 'from-teal-100 to-teal-200',
    bandq: 'from-emerald-100 to-emerald-200',
    'machine-mart': 'from-amber-100 to-amber-200',
    ffx: 'from-indigo-100 to-indigo-200',
  };

  const proxiedImage = proxyImageUrl(product.image_url);

  // Merged brand + product name
  const displayTitle = product.brand ? `${product.brand} ${product.name}` : product.name;

  return (
    <div
      className={cn(
        'group relative flex flex-col h-full bg-white/[0.03] rounded-2xl border border-white/[0.08] overflow-hidden touch-manipulation',
        'transition-all duration-200 active:bg-white/[0.06] lg:hover:border-white/20 lg:hover:shadow-xl lg:hover:shadow-black/20 lg:hover:-translate-y-0.5',
        className
      )}
    >
      {/* Image Section - 200px prominent */}
      <div className="relative w-full h-[200px] bg-white overflow-hidden">
        {proxiedImage ? (
          <img
            src={proxiedImage}
            alt={product.name}
            className="w-full h-full object-contain p-3 transition-transform duration-200 group-active:scale-105"
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
        {/* Styled fallback — shown when no image or image fails to load */}
        <div
          data-fallback
          className={cn(
            'w-full h-full flex flex-col items-center justify-center bg-gradient-to-br',
            supplierGradients[product.supplier_slug] || 'from-gray-100 to-gray-200'
          )}
          style={{ display: proxiedImage ? 'none' : 'flex' }}
        >
          <Package className="h-10 w-10 text-gray-400 mb-1" />
          <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">
            {product.supplier_name}
          </span>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-active:opacity-100 transition-opacity duration-200" />

        {/* Deal badge - top right */}
        {dealBadge && (
          <Badge
            className={cn(
              'absolute top-2 right-2 text-xs font-semibold shadow-md',
              dealBadge.className
            )}
          >
            <dealBadge.icon className="h-3 w-3 mr-1" />
            {dealBadge.text}
          </Badge>
        )}

        {/* Supplier badge - top left */}
        <Badge
          className={cn(
            'absolute top-2 left-2 text-xs font-medium text-white shadow-md',
            supplierColors[product.supplier_slug] || 'bg-gray-500'
          )}
        >
          {product.supplier_name}
        </Badge>

        {/* Save/bookmark button - bottom right */}
        {onSave && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSave(product);
            }}
            className={cn(
              'absolute bottom-2 right-2 h-8 w-8 rounded-full flex items-center justify-center touch-manipulation',
              'transition-all duration-200 shadow-md',
              isSaved ? 'bg-elec-yellow text-black' : 'bg-black/50 text-white hover:bg-black/70'
            )}
          >
            <Bookmark className={cn('h-4 w-4', isSaved && 'fill-current')} />
          </button>
        )}

        {/* Low stock indicator - bottom */}
        {stockInfo.text === 'Low Stock' && (
          <div className={cn('absolute bottom-2', onSave ? 'left-2 right-12' : 'left-2 right-2')}>
            <Badge
              variant="outline"
              className="w-full justify-center bg-orange-500/90 text-white border-orange-500 text-xs"
            >
              <Timer className="h-3 w-3 mr-1" />
              Only few left!
            </Badge>
          </div>
        )}
      </div>

      {/* Content Section - flex-1 to fill remaining space */}
      <div className="flex-1 flex flex-col p-3 space-y-2">
        {/* Product name - merged brand + title, 4 lines max */}
        <h3 className="font-medium text-sm leading-tight text-white line-clamp-4 min-h-[5rem]">
          {displayTitle}
        </h3>

        {/* Price section - fixed min-height so cards align whether or not there's a sale */}
        <div className="min-h-[3.25rem] space-y-0.5 pt-1 border-t border-white/[0.08] mt-auto">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-elec-yellow">
              £{formatPrice(product.current_price)}
            </span>
            <span className="text-xs text-white">inc. VAT</span>
          </div>

          {product.is_on_sale && savings && (
            <div className="flex items-center gap-2 text-xs">
              <span className="text-white line-through">£{formatPrice(product.regular_price)}</span>
              <span className="text-green-500 font-medium">Save £{savings}</span>
            </div>
          )}
        </div>

        {/* Price sparkline */}
        {product.price_history && product.price_history.length >= 2 && (
          <PriceSparkline
            history={product.price_history}
            currentPrice={product.current_price}
            className="pt-0.5"
          />
        )}

        {/* Stock status */}
        <a
          href={product.product_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 touch-manipulation"
        >
          <CheckCircle2 className={cn('h-3 w-3', stockInfo.color)} />
          <span className={cn('text-xs font-medium', stockInfo.color)}>{stockInfo.text}</span>
          {stockInfo.text === 'Check Availability' && (
            <ExternalLink className="h-2.5 w-2.5 text-white" />
          )}
        </a>

        {/* CTA Button - h-11 minimum touch target */}
        <Button
          asChild
          className="w-full h-11 touch-manipulation bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold text-sm rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          <a
            href={product.product_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            View Deal
            <ExternalLink className="h-3 w-3" />
          </a>
        </Button>
      </div>
    </div>
  );
}

export default MarketplaceProductCard;
