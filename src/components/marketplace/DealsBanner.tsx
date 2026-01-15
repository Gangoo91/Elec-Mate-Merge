import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, Flame, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMarketplaceDeals, MarketplaceDeal } from '@/hooks/useMarketplaceDeals';
import { SupplierBadge } from './SearchResultCard';
import { cn } from '@/lib/utils';

interface DealsBannerProps {
  className?: string;
}

/**
 * Deals of the Day Banner
 * Rotating carousel showing active deals
 */
export function DealsBanner({ className }: DealsBannerProps) {
  const { data, isLoading } = useMarketplaceDeals(undefined, undefined, 6);
  const [currentIndex, setCurrentIndex] = useState(0);

  const deals = data?.deals || [];

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (deals.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % deals.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [deals.length]);

  // Navigation
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + deals.length) % deals.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % deals.length);
  };

  if (isLoading) {
    return (
      <div className={cn('bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-4 animate-pulse', className)}>
        <div className="h-24 bg-muted rounded-lg" />
      </div>
    );
  }

  if (deals.length === 0) {
    return null;
  }

  const currentDeal = deals[currentIndex];

  return (
    <div className={cn('relative bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl overflow-hidden', className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-orange-500/20 to-red-500/20">
        <div className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-orange-500" />
          <span className="font-semibold text-orange-500">Deals of the Day</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{currentDeal.time_remaining}</span>
        </div>
      </div>

      {/* Deal Content */}
      <div className="relative">
        {/* Navigation Buttons - h-11 (44px) minimum touch targets */}
        {deals.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-1 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center bg-background/80 hover:bg-background rounded-full shadow-lg touch-manipulation active:scale-95 transition-transform"
              aria-label="Previous deal"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-1 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center bg-background/80 hover:bg-background rounded-full shadow-lg touch-manipulation active:scale-95 transition-transform"
              aria-label="Next deal"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Deal Card */}
        <DealCard deal={currentDeal} />

        {/* Dots Indicator - wrapped in h-11 touch targets */}
        {deals.length > 1 && (
          <div className="flex items-center justify-center gap-1 py-2">
            {deals.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className="w-11 h-11 flex items-center justify-center touch-manipulation"
                aria-label={`Go to deal ${index + 1}`}
              >
                <span
                  className={cn(
                    'w-2.5 h-2.5 rounded-full transition-all',
                    index === currentIndex
                      ? 'bg-orange-500 scale-125'
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  )}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Individual Deal Card
 */
function DealCard({ deal }: { deal: MarketplaceDeal }) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 p-4">
      {/* Product Image */}
      <div className="w-24 h-24 bg-white rounded-lg flex-shrink-0 overflow-hidden">
        {deal.product_image ? (
          <img
            src={deal.product_image}
            alt={deal.product_name}
            className="w-full h-full object-contain p-2"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <Flame className="h-8 w-8 text-orange-500" />
          </div>
        )}
      </div>

      {/* Deal Info */}
      <div className="flex-1 text-center sm:text-left">
        <h3 className="font-medium line-clamp-2">{deal.product_name}</h3>
        <div className="flex items-center justify-center sm:justify-start gap-2 mt-1">
          <SupplierBadge
            name={deal.supplier_name}
            slug={deal.supplier_slug}
          />
          <span className="text-sm font-bold text-green-500">
            {deal.discount_percentage}% OFF
          </span>
        </div>
      </div>

      {/* Price & CTA */}
      <div className="text-center sm:text-right">
        <p className="text-2xl font-bold text-elec-yellow">
          £{deal.deal_price.toFixed(2)}
        </p>
        {deal.original_price && (
          <p className="text-sm text-muted-foreground line-through">
            £{deal.original_price.toFixed(2)}
          </p>
        )}
        <Button
          asChild
          className="mt-2 bg-orange-500 hover:bg-orange-600 text-white h-11 px-4 touch-manipulation font-semibold"
        >
          <a
            href={deal.product_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5"
          >
            Get Deal
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </div>
    </div>
  );
}
