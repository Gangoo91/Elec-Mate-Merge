import { Flame, ExternalLink, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DealOfTheDay as DealOfTheDayType } from '@/hooks/useMarketplaceSearch';
import { cn } from '@/lib/utils';

interface DealOfTheDayProps {
  deal: DealOfTheDayType;
}

const supplierColors: Record<string, string> = {
  screwfix: 'from-orange-500/20 to-orange-600/5 border-orange-500/30',
  toolstation: 'from-blue-500/20 to-blue-600/5 border-blue-500/30',
  cef: 'from-green-500/20 to-green-600/5 border-green-500/30',
  ffx: 'from-purple-500/20 to-purple-600/5 border-purple-500/30',
  'machine-mart': 'from-red-500/20 to-red-600/5 border-red-500/30',
  'rs-components': 'from-red-500/20 to-red-600/5 border-red-500/30',
};

export function DealOfTheDay({ deal }: DealOfTheDayProps) {
  const savings =
    deal.regular_price && deal.regular_price > deal.current_price
      ? (deal.regular_price - deal.current_price).toFixed(2)
      : null;

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border bg-gradient-to-r p-4',
        supplierColors[deal.supplier_slug] ||
          'from-elec-yellow/20 to-elec-yellow/5 border-elec-yellow/30'
      )}
    >
      {/* Animated flame background */}
      <div className="absolute top-0 right-0 opacity-10">
        <Flame className="h-32 w-32 text-red-500" />
      </div>

      <div className="relative flex gap-4">
        {/* Image */}
        {deal.image_url && (
          <div className="flex-shrink-0 w-20 h-20 rounded-xl bg-white overflow-hidden">
            <img
              src={deal.image_url}
              alt={deal.name}
              className="w-full h-full object-contain p-1.5"
              loading="lazy"
            />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Flame className="h-4 w-4 text-red-500 flex-shrink-0" />
            <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
              Deal of the Day
            </span>
          </div>

          <h3 className="text-sm font-semibold text-white line-clamp-2 mb-1.5">{deal.name}</h3>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Discount badge */}
            <span className="inline-flex items-center gap-1 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
              <Tag className="h-3 w-3" />
              {deal.discount_percentage}% OFF
            </span>

            {/* Price */}
            <span className="text-lg font-bold text-elec-yellow">
              £{deal.current_price.toFixed(2)}
            </span>

            {deal.regular_price && (
              <span className="text-xs text-white line-through">
                £{deal.regular_price.toFixed(2)}
              </span>
            )}

            {savings && <span className="text-xs font-medium text-green-400">Save £{savings}</span>}
          </div>

          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-white">{deal.supplier_name}</span>
            <Button
              asChild
              size="sm"
              className="h-9 px-4 touch-manipulation bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold text-xs rounded-lg"
            >
              <a
                href={deal.product_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5"
              >
                View Deal
                <ExternalLink className="h-3 w-3" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DealOfTheDay;
