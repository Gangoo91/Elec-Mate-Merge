import { Flame, ExternalLink, Tag, ChevronRight } from 'lucide-react';
import { DealOfTheDay as DealOfTheDayType } from '@/hooks/useMarketplaceSearch';
import { cn } from '@/lib/utils';
import { proxyImageUrl } from '@/lib/proxyImage';

interface DealOfTheDayProps {
  deal: DealOfTheDayType;
}

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
      className="group block card-surface-interactive overflow-hidden touch-manipulation active:scale-[0.98] transition-all duration-200"
    >
      {/* Top accent line */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-red-500 via-orange-400 to-elec-yellow opacity-40 group-hover:opacity-80 transition-opacity duration-200" />

      <div className="relative z-10 p-4 sm:p-5">
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/20">
            <Flame className="h-4 w-4 text-red-400" />
          </div>
          <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
            Deal of the Day
          </span>
        </div>

        <div className="flex gap-4">
          {/* Image */}
          {deal.image_url && (
            <div className="flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-xl bg-white overflow-hidden">
              <img
                src={proxyImageUrl(deal.image_url)!}
                alt={deal.name}
                className="w-full h-full object-contain p-2"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm sm:text-base font-semibold text-white line-clamp-2 mb-2 group-hover:text-elec-yellow transition-colors">
              {deal.name}
            </h3>

            {/* Price row */}
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className="text-xl font-bold text-elec-yellow">
                £{deal.current_price.toFixed(2)}
              </span>
              {deal.regular_price && (
                <span className="text-xs text-white line-through">
                  £{deal.regular_price.toFixed(2)}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {deal.discount_percentage && (
                <span className="inline-flex items-center gap-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                  <Tag className="h-2.5 w-2.5" />
                  {deal.discount_percentage}% OFF
                </span>
              )}
              {savings && (
                <span className="text-xs font-medium text-green-400">Save £{savings}</span>
              )}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/[0.06]">
          <span className="text-xs text-white">{deal.supplier_name}</span>
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-medium text-elec-yellow">View Deal</span>
            <div
              className={cn(
                'w-7 h-7 sm:w-8 sm:h-8 rounded-full',
                'bg-white/[0.05] border border-elec-yellow/20',
                'flex items-center justify-center',
                'group-hover:bg-elec-yellow group-hover:border-elec-yellow',
                'transition-all duration-200'
              )}
            >
              <ExternalLink
                className={cn(
                  'w-3.5 h-3.5 text-white',
                  'group-hover:text-black',
                  'transition-all'
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

export default DealOfTheDay;
