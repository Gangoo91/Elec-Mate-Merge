import { ExternalLink, Tag, Package, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MarketplaceProduct } from '@/hooks/useMarketplaceSearch';
import { cn } from '@/lib/utils';

interface SearchResultCardProps {
  product: MarketplaceProduct;
  className?: string;
}

/**
 * Horizontal search result card (Google Shopping / Amazon style)
 * Not a card - a list row
 */
export function SearchResultCard({ product, className }: SearchResultCardProps) {
  const savings = product.regular_price
    ? (product.regular_price - product.current_price).toFixed(2)
    : null;

  // Stock status color
  const stockColor =
    product.stock_status?.toLowerCase().includes('in stock')
      ? 'text-green-500'
      : product.stock_status?.toLowerCase().includes('low')
        ? 'text-orange-500'
        : 'text-red-500';

  return (
    <div
      className={cn(
        'flex flex-col sm:flex-row gap-4 p-4 border-b border-border hover:bg-muted/50 transition-colors',
        className
      )}
    >
      {/* Product Image */}
      <div className="w-full sm:w-24 h-32 sm:h-24 bg-white rounded-lg flex-shrink-0 overflow-hidden">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-contain p-2"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <Package className="h-8 w-8 text-muted-foreground" />
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0 space-y-2">
        {/* Title */}
        <h3 className="font-medium text-base sm:text-lg leading-tight line-clamp-2">
          {product.name}
        </h3>

        {/* Brand & Category */}
        <div className="flex flex-wrap items-center gap-2 text-sm">
          {product.brand && (
            <span className="text-muted-foreground">{product.brand}</span>
          )}
          {product.category && (
            <Badge variant="secondary" className="text-xs">
              {product.category}
            </Badge>
          )}
        </div>

        {/* Supplier Badge */}
        <div className="flex items-center gap-2">
          <SupplierBadge
            name={product.supplier_name}
            slug={product.supplier_slug}
          />
          {product.is_on_sale && (
            <Badge className="bg-green-500/20 text-green-500 border-green-500/30">
              <Tag className="h-3 w-3 mr-1" />
              {product.discount_percentage}% off
            </Badge>
          )}
        </div>

        {/* Highlights */}
        {product.highlights && product.highlights.length > 0 && (
          <ul className="hidden sm:flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
            {product.highlights.slice(0, 3).map((highlight, i) => (
              <li key={i} className="flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3 text-green-500" />
                {highlight}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Price & CTA */}
      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 sm:gap-1 sm:min-w-[140px]">
        {/* Price */}
        <div className="text-right">
          <p className="text-xl sm:text-2xl font-bold text-elec-yellow">
            £{product.current_price.toFixed(2)}
          </p>
          {product.is_on_sale && product.regular_price && (
            <>
              <p className="text-sm text-muted-foreground line-through">
                £{product.regular_price.toFixed(2)}
              </p>
              <p className="text-sm text-green-500 font-medium">
                Save £{savings}
              </p>
            </>
          )}
        </div>

        {/* Stock Status */}
        <p className={cn('text-sm font-medium hidden sm:block', stockColor)}>
          {product.stock_status || 'Check availability'}
        </p>

        {/* CTA Button */}
        <Button
          asChild
          className="bg-elec-yellow hover:bg-elec-yellow/90 text-black font-medium h-11 touch-manipulation"
        >
          <a
            href={product.product_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            View Deal
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </div>
    </div>
  );
}

/**
 * Supplier Badge Component
 */
function SupplierBadge({ name, slug }: { name: string; slug: string }) {
  // Supplier colors
  const colors: Record<string, string> = {
    screwfix: 'bg-orange-500/20 text-orange-500 border-orange-500/30',
    toolstation: 'bg-blue-500/20 text-blue-500 border-blue-500/30',
    cef: 'bg-green-500/20 text-green-500 border-green-500/30',
    'electrical-direct': 'bg-purple-500/20 text-purple-500 border-purple-500/30',
    'rs-components': 'bg-red-500/20 text-red-500 border-red-500/30',
    'tlc-electrical': 'bg-cyan-500/20 text-cyan-500 border-cyan-500/30',
    edmundson: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30',
  };

  return (
    <Badge variant="outline" className={cn('text-xs', colors[slug] || '')}>
      {name}
    </Badge>
  );
}

export { SupplierBadge };
