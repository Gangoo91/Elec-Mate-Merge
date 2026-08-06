import { MarketplaceProduct } from '@/hooks/useMarketplaceSearch';
import { cn } from '@/lib/utils';
import ProductImage from './ProductImage';

interface SearchResultCardProps {
  product: MarketplaceProduct;
  className?: string;
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
 * Horizontal search result card (Google Shopping / Amazon style)
 * Not a card - a list row
 */
export function SearchResultCard({ product, className }: SearchResultCardProps) {
  const savings = calculateSavings(product.regular_price, product.current_price);

  /*
   * Stock status is deliberately NOT shown.
   *
   * Of 13,631 products, 12,314 say "unknown" (in two different casings), and
   * only 1,300 claim a real state. A green "In Stock" on one card and nothing
   * on the next reads as a promise the data cannot keep — worse than staying
   * quiet and letting the supplier's own page answer it.
   */

  return (
    <div
      className={cn(
        'flex flex-col gap-4 border-b border-white/[0.08] p-4 transition-colors hover:bg-white/[0.03] sm:flex-row sm:p-5',
        className
      )}
    >
      <ProductImage
        src={product.image_url}
        alt={product.name}
        fallbackLabel={product.name}
        sizeClassName="h-32 w-full shrink-0 sm:h-24 sm:w-24"
        className="rounded-xl"
      />

      <div className="min-w-0 flex-1">
        <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug tracking-tight text-white">
          {product.name}
        </h3>

        {/* One meta line. Brand, category and supplier were three separate
            rows of pills in three different colours. */}
        <p className="mt-1 truncate text-[12px] text-white">
          {[product.brand, product.supplier_name, product.category].filter(Boolean).join(' · ')}
        </p>

        {product.highlights && product.highlights.length > 0 && (
          <ul className="mt-2 hidden flex-wrap gap-x-4 gap-y-1 text-[12px] text-white sm:flex">
            {product.highlights.slice(0, 3).map((highlight, i) => (
              <li key={i}>{highlight}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex shrink-0 items-end justify-between gap-3 sm:min-w-[150px] sm:flex-col sm:items-end">
        <div className="text-right">
          <p className="text-[22px] font-bold leading-none tracking-tight text-elec-yellow tabular-nums">
            £{formatPrice(product.current_price)}
          </p>
          {product.is_on_sale && savings && (
            <p className="mt-1 text-[12px] text-white tabular-nums">
              <span className="line-through">£{formatPrice(product.regular_price)}</span>
              {' · '}Save £{savings}
            </p>
          )}
        </div>

        <a
          href={product.product_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-11 shrink-0 items-center justify-center rounded-xl bg-elec-yellow px-5 text-[14px] font-semibold text-black transition-colors hover:bg-elec-yellow/90 touch-manipulation active:scale-[0.98] sm:w-full"
        >
          View deal
        </a>
      </div>
    </div>
  );
}

/**
 * Supplier Badge Component
 */
/**
 * Supplier name.
 *
 * There were seven hand-picked brand colours here — orange for Screwfix, blue
 * for Toolstation, red for RS and so on — so a list of results from several
 * wholesalers looked like a colour chart, and the eleventh supplier got no
 * colour at all. One treatment for all of them.
 */
function SupplierBadge({ name }: { name: string; slug?: string }) {
  return (
    <span className="rounded-full border border-white/[0.14] bg-white/[0.06] px-2 py-0.5 text-[11px] font-medium text-white">
      {name}
    </span>
  );
}

export { SupplierBadge };
