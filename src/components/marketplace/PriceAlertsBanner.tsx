import { Bell, ExternalLink, X, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PriceAlert } from '@/hooks/useMarketplacePriceAlerts';
import { cn } from '@/lib/utils';

interface PriceAlertsBannerProps {
  alerts: PriceAlert[];
  onDismiss: (alertId: string, currentPrice: number) => void;
}

/**
 * Horizontal scrolling banner showing price drop alerts.
 * Each card shows the product, how much it dropped, and a link to buy.
 */
export function PriceAlertsBanner({ alerts, onDismiss }: PriceAlertsBannerProps) {
  if (!alerts || alerts.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2.5">
        <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
        <h2 className="text-base font-bold text-white">Price Drop Alerts</h2>
        <Bell className="h-4 w-4 text-blue-400" />
        <span className="text-xs font-medium text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full">
          {alerts.length}
        </span>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
        {alerts.map((alert) => (
          <div
            key={alert.alert_id}
            className="relative flex-shrink-0 w-[280px] p-3 rounded-xl border border-green-500/20 bg-green-500/5"
          >
            {/* Dismiss button */}
            <button
              onClick={() => onDismiss(alert.alert_id, alert.current_price)}
              className="absolute top-2 right-2 h-6 w-6 rounded-full bg-white/[0.08] flex items-center justify-center touch-manipulation"
            >
              <X className="h-3 w-3 text-white" />
            </button>

            <div className="flex gap-3">
              {/* Image */}
              {alert.image_url && (
                <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-white overflow-hidden">
                  <img
                    src={alert.image_url}
                    alt={alert.product_name}
                    className="w-full h-full object-contain p-1"
                    loading="lazy"
                  />
                </div>
              )}

              <div className="flex-1 min-w-0 pr-4">
                <p className="text-xs font-medium text-white line-clamp-2 mb-1">
                  {alert.product_brand
                    ? `${alert.product_brand} ${alert.product_name}`
                    : alert.product_name}
                </p>

                <div className="flex items-center gap-1.5 mb-1">
                  <TrendingDown className="h-3 w-3 text-green-500 flex-shrink-0" />
                  <span className="text-xs font-bold text-green-500">
                    {alert.price_drop_pct}% drop
                  </span>
                  <span className={cn('text-xs text-white')}>Save £{alert.savings.toFixed(2)}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-elec-yellow">
                    £{alert.current_price.toFixed(2)}
                  </span>
                  <span className="text-xs text-white line-through">
                    £{alert.price_when_saved.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <Button
              asChild
              size="sm"
              className="w-full h-9 mt-2 touch-manipulation bg-green-500 hover:bg-green-600 text-white font-semibold text-xs rounded-lg"
            >
              <a
                href={alert.product_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5"
              >
                Buy Now — Save £{alert.savings.toFixed(2)}
                <ExternalLink className="h-3 w-3" />
              </a>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PriceAlertsBanner;
