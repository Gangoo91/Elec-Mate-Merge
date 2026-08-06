import { Bookmark } from 'lucide-react';
import { MarketplaceProduct } from '@/hooks/useMarketplaceSearch';
import { cn } from '@/lib/utils';
import ProductImage from './ProductImage';

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

  const displayTitle = product.brand ? `${product.brand} ${product.name}` : product.name;

  return (
    <a
      href={product.product_url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.14]',
        'bg-gradient-to-b from-white/[0.08] to-white/[0.04] transition-colors',
        'hover:from-white/[0.10] hover:to-white/[0.06] touch-manipulation active:scale-[0.99]',
        className
      )}
    >
      {/* The gradient rule across the top went. It was a different colour for
          a deal than for a normal product, which meant every grid had two
          decorative accent schemes fighting the price for attention. */}
      <div className="relative aspect-square w-full">
        <ProductImage
          src={product.image_url}
          alt={product.name}
          fallbackLabel={displayTitle}
          sizeClassName="h-full w-full"
        />

        {product.is_on_sale && product.discount_percentage ? (
          <span className="absolute left-2 top-2 rounded-full bg-elec-yellow px-2 py-0.5 text-[10px] font-bold text-black tabular-nums">
            {product.discount_percentage}% off
          </span>
        ) : null}

        {onSave && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onSave(product);
            }}
            aria-label={isSaved ? 'Saved to list' : 'Save to list'}
            className={cn(
              'absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full transition-colors touch-manipulation',
              isSaved ? 'bg-elec-yellow text-black' : 'bg-black/50 text-white active:bg-black/70'
            )}
          >
            <Bookmark className={cn('h-4 w-4', isSaved && 'fill-current')} />
          </button>
        )}
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-3.5">
        <p className="text-[11px] text-white">{product.supplier_name}</p>

        <h3 className="mt-1 line-clamp-3 text-[13px] font-semibold leading-snug tracking-tight text-white">
          {displayTitle}
        </h3>

        {/* flex-1 so cards in a row end level whatever the title length. */}
        <div className="flex-1" />

        <div className="mt-3 border-t border-white/[0.10] pt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-[19px] font-bold leading-none tracking-tight text-elec-yellow tabular-nums">
              £{formatPrice(product.current_price)}
            </span>
            {product.is_on_sale && product.regular_price && (
              <span className="text-[11px] text-white line-through tabular-nums">
                £{formatPrice(product.regular_price)}
              </span>
            )}
          </div>
          {savings && <p className="mt-1 text-[11px] text-white tabular-nums">Save £{savings}</p>}
        </div>
      </div>
    </a>
  );
}

export default MarketplaceProductCard;
