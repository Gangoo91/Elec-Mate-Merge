import { useState } from 'react';
import { Copy, Check, Tag, Truck, BadgePercent } from 'lucide-react';
import { MarketplaceCoupon } from '@/hooks/useMarketplaceSearch';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface CouponCardProps {
  coupon: MarketplaceCoupon;
}

export function CouponCard({ coupon }: CouponCardProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(coupon.code);
      setCopied(true);
      toast({
        title: 'Code copied!',
        description: `${coupon.code} copied to clipboard`,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const input = document.createElement('input');
      input.value = coupon.code;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const DiscountIcon =
    coupon.discount_type === 'free_shipping'
      ? Truck
      : coupon.discount_type === 'percentage'
        ? BadgePercent
        : Tag;

  const discountText =
    coupon.discount_type === 'percentage' && coupon.discount_value
      ? `${coupon.discount_value}% off`
      : coupon.discount_type === 'fixed_amount' && coupon.discount_value
        ? `£${coupon.discount_value} off`
        : coupon.discount_type === 'free_shipping'
          ? 'Free delivery'
          : 'Discount';

  return (
    <button
      onClick={handleCopy}
      className="w-full card-surface-interactive p-3 flex items-center gap-3 touch-manipulation active:scale-[0.98] transition-all duration-200 text-left"
    >
      {/* Discount icon */}
      <div className="flex-shrink-0 p-2 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20">
        <DiscountIcon className="h-4 w-4 text-elec-yellow" />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-semibold text-elec-yellow">{discountText}</span>
          {coupon.is_verified && <Check className="h-3 w-3 text-green-500 flex-shrink-0" />}
        </div>
        <p className="text-xs text-white line-clamp-1">
          {coupon.supplier_name}
          {coupon.minimum_spend ? ` · Min. £${coupon.minimum_spend}` : ''}
        </p>
      </div>

      {/* Code + copy */}
      <div className="flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.06] border border-dashed border-white/15">
        <span className="text-xs font-mono font-bold text-elec-yellow tracking-wider">
          {coupon.code}
        </span>
        {copied ? (
          <Check className="h-3.5 w-3.5 text-green-500" />
        ) : (
          <Copy className="h-3.5 w-3.5 text-white" />
        )}
      </div>
    </button>
  );
}

export default CouponCard;
