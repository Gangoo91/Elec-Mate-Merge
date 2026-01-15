import { useState } from 'react';
import { Copy, Check, Tag, Clock, BadgeCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMarketplaceCoupons, MarketplaceCoupon } from '@/hooks/useMarketplaceDeals';
import { SupplierBadge } from './SearchResultCard';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface CouponCodeCardProps {
  coupon: MarketplaceCoupon;
  className?: string;
}

/**
 * Individual Coupon Code Card
 */
export function CouponCodeCard({ coupon, className }: CouponCodeCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(coupon.code);
      setCopied(true);
      toast.success('Coupon code copied!');

      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy code');
    }
  };

  // Format valid until date
  const validUntilText = coupon.valid_until
    ? new Date(coupon.valid_until).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
      })
    : null;

  return (
    <div
      className={cn(
        'border border-dashed border-elec-yellow/50 rounded-xl p-4 bg-elec-yellow/5',
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        {/* Coupon Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <SupplierBadge name={coupon.supplier_name} slug={coupon.supplier_slug} />
            {coupon.is_verified && (
              <span className="flex items-center gap-1 text-xs text-green-500">
                <BadgeCheck className="h-3 w-3" />
                Verified
              </span>
            )}
          </div>

          {/* Discount */}
          <p className="text-lg font-bold text-elec-yellow">
            {coupon.formatted_discount}
          </p>

          {/* Description */}
          {coupon.description && (
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {coupon.description}
            </p>
          )}

          {/* Minimum Spend & Validity */}
          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-muted-foreground">
            {coupon.minimum_spend && (
              <span>Min spend: £{coupon.minimum_spend.toFixed(2)}</span>
            )}
            {validUntilText && (
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Valid until {validUntilText}
              </span>
            )}
          </div>
        </div>

        {/* Code & Copy */}
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-2 px-3 py-2 bg-background border border-border rounded-lg">
            <Tag className="h-4 w-4 text-elec-yellow flex-shrink-0" />
            <code className="font-mono font-bold text-sm sm:text-base">
              {coupon.code}
            </code>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className={cn(
              'h-9 touch-manipulation',
              copied && 'bg-green-500/10 border-green-500/30 text-green-500'
            )}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-1" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

/**
 * Coupons List Component
 */
interface CouponsListProps {
  supplier?: string;
  limit?: number;
  className?: string;
}

export function CouponsList({ supplier, limit = 5, className }: CouponsListProps) {
  const { data, isLoading } = useMarketplaceCoupons(supplier);

  const coupons = data?.coupons.slice(0, limit) || [];

  if (isLoading) {
    return (
      <div className={cn('space-y-3', className)}>
        {[1, 2].map((i) => (
          <div
            key={i}
            className="h-24 bg-muted/50 border border-dashed border-muted rounded-xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (coupons.length === 0) {
    return null;
  }

  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center gap-2">
        <Tag className="h-5 w-5 text-elec-yellow" />
        <h3 className="font-semibold">Available Coupon Codes</h3>
      </div>
      {coupons.map((coupon) => (
        <CouponCodeCard key={coupon.id} coupon={coupon} />
      ))}
    </div>
  );
}
