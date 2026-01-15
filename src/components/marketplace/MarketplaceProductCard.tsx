import { ExternalLink, Tag, Package, CheckCircle2, ShoppingCart, Flame, Zap, Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MarketplaceProduct } from '@/hooks/useMarketplaceSearch';
import { cn } from '@/lib/utils';

interface MarketplaceProductCardProps {
  product: MarketplaceProduct;
  className?: string;
}

/**
 * Mobile-first product card for marketplace grid
 * Based on ToolCard.tsx pattern with 150px images
 */
export function MarketplaceProductCard({ product, className }: MarketplaceProductCardProps) {
  const savings = product.regular_price
    ? (product.regular_price - product.current_price).toFixed(2)
    : null;

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
    return { text: 'Check Stock', color: 'text-muted-foreground', bgColor: 'bg-muted' };
  };

  // Deal badge type
  const getDealBadge = () => {
    if (!product.is_on_sale || !product.discount_percentage) return null;

    if (product.discount_percentage >= 30) {
      return { icon: Flame, text: 'Hot Deal', className: 'bg-red-500 text-white' };
    } else if (product.discount_percentage >= 20) {
      return { icon: Zap, text: 'Flash Sale', className: 'bg-orange-500 text-white' };
    } else {
      return { icon: Tag, text: `${product.discount_percentage}% off`, className: 'bg-green-500 text-white' };
    }
  };

  const stockInfo = getStockInfo();
  const dealBadge = getDealBadge();

  // Supplier colors
  const supplierColors: Record<string, string> = {
    screwfix: 'bg-orange-500',
    toolstation: 'bg-blue-500',
    cef: 'bg-green-500',
    'electrical-direct': 'bg-purple-500',
    'rs-components': 'bg-red-500',
    'tlc-electrical': 'bg-cyan-500',
    edmundson: 'bg-yellow-500',
  };

  return (
    <div
      className={cn(
        'group relative bg-card rounded-xl border border-border/50 overflow-hidden',
        'transition-all duration-300 hover:border-primary/60 hover:shadow-lg hover:-translate-y-1',
        className
      )}
    >
      {/* Image Section - 150px prominent */}
      <div className="relative w-full h-[150px] bg-white overflow-hidden">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/placeholder.svg';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <Package className="h-12 w-12 text-muted-foreground" />
          </div>
        )}

        {/* Hover gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Deal badge - top right */}
        {dealBadge && (
          <Badge className={cn('absolute top-2 right-2 text-xs font-semibold shadow-md', dealBadge.className)}>
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

        {/* Low stock indicator - bottom */}
        {stockInfo.text === 'Low Stock' && (
          <div className="absolute bottom-2 left-2 right-2">
            <Badge variant="outline" className="w-full justify-center bg-orange-500/90 text-white border-orange-500 text-xs">
              <Timer className="h-3 w-3 mr-1" />
              Only few left!
            </Badge>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-3 space-y-2">
        {/* Product name - 2 lines max */}
        <h3 className="font-medium text-sm leading-tight line-clamp-2 min-h-[2.5rem] group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Brand */}
        {product.brand && (
          <p className="text-xs text-muted-foreground truncate">
            {product.brand}
          </p>
        )}

        {/* Category badge */}
        {product.category && (
          <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>
        )}

        {/* Price section - prominent */}
        <div className="space-y-1 pt-1 border-t border-border/50">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-elec-yellow">
              £{product.current_price.toFixed(2)}
            </span>
            <span className="text-xs text-muted-foreground">inc. VAT</span>
          </div>

          {product.is_on_sale && product.regular_price && (
            <div className="flex items-center gap-2 text-xs">
              <span className="text-muted-foreground line-through">
                £{product.regular_price.toFixed(2)}
              </span>
              <span className="text-green-500 font-medium">
                Save £{savings}
              </span>
            </div>
          )}
        </div>

        {/* Stock status */}
        <div className="flex items-center gap-1">
          <CheckCircle2 className={cn('h-3 w-3', stockInfo.color)} />
          <span className={cn('text-xs font-medium', stockInfo.color)}>
            {stockInfo.text}
          </span>
        </div>

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
