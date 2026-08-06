import { DealOfTheDay as DealOfTheDayType } from '@/hooks/useMarketplaceSearch';
import { cn } from '@/lib/utils';
import { cardInteractiveCn, eyebrowCn } from '@/components/shared/surfaceStyles';
import ProductImage from './ProductImage';

interface DealOfTheDayProps {
  deal: DealOfTheDayType;
}

/**
 * The day's best discount.
 *
 * Rebuilt on the house card surface. Three things went, all of them competing
 * with the one number that matters — the price:
 *
 *   · the red/orange/yellow gradient rule across the top
 *   · the flame in a red tile, and the red "Deal of the Day" label
 *   · a red discount badge and a green savings line, side by side
 *
 * That is four accent colours on one card, none of them the brand's. The
 * saving is the point, so it is the only thing highlighted, and the discount
 * reads as plain type next to it.
 */
export function DealOfTheDay({ deal }: DealOfTheDayProps) {
  const savings =
    deal.regular_price && deal.regular_price > deal.current_price
      ? (deal.regular_price - deal.current_price).toFixed(2)
      : null;

  return (
    <a
      href={deal.product_url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(cardInteractiveCn, 'group block overflow-hidden active:scale-[0.99]')}
    >
      <div className="p-4 sm:p-5">
        <span className={cn(eyebrowCn, 'block text-elec-yellow')}>Deal of the day</span>

        <div className="mt-3 flex gap-4">
          <ProductImage
            src={deal.image_url}
            alt={deal.name}
            fallbackLabel={deal.name}
            sizeClassName="h-24 w-24 shrink-0 sm:h-28 sm:w-28"
            className="rounded-xl"
          />

          <div className="min-w-0 flex-1">
            <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug tracking-tight text-white">
              {deal.name}
            </h3>

            <div className="mt-2 flex flex-wrap items-baseline gap-2">
              <span className="text-[24px] font-bold leading-none tracking-tight text-elec-yellow tabular-nums">
                £{deal.current_price.toFixed(2)}
              </span>
              {deal.regular_price && (
                <span className="text-[13px] text-white line-through tabular-nums">
                  £{deal.regular_price.toFixed(2)}
                </span>
              )}
            </div>

            {/* What you keep, in one line. The percentage is the working; the
                pounds saved is the answer. */}
            <p className="mt-1.5 text-[12px] text-white tabular-nums">
              {savings ? `Save £${savings}` : null}
              {savings && deal.discount_percentage ? ' · ' : ''}
              {deal.discount_percentage ? `${deal.discount_percentage}% off` : null}
            </p>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-white/[0.10] pt-3">
          <span className="text-[12px] text-white">{deal.supplier_name}</span>
          <span className="text-[13px] font-semibold text-elec-yellow">View deal</span>
        </div>
      </div>
    </a>
  );
}

export default DealOfTheDay;
