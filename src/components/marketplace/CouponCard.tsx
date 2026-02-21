import { useState } from 'react';
import { Copy, Check, Tag, Truck, BadgePercent } from 'lucide-react';
import { MarketplaceCoupon } from '@/hooks/useMarketplaceSearch';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface CouponCardProps {
  coupon: MarketplaceCoupon;
}

const supplierColors: Record<string, string> = {
  screwfix: 'border-orange-500/30 bg-orange-500/5',
  toolstation: 'border-blue-500/30 bg-blue-500/5',
  cef: 'border-green-500/30 bg-green-500/5',
  ffx: 'border-purple-500/30 bg-purple-500/5',
  'machine-mart': 'border-red-500/30 bg-red-500/5',
  'rs-components': 'border-red-500/30 bg-red-500/5',
  'tlc-electrical': 'border-cyan-500/30 bg-cyan-500/5',
  'electrical-direct': 'border-purple-500/30 bg-purple-500/5',
};

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
      // Fallback for older browsers
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

  const discountIcon =
    coupon.discount_type === 'free_shipping'
      ? Truck
      : coupon.discount_type === 'percentage'
        ? BadgePercent
        : Tag;
  const DiscountIcon = discountIcon;

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
      className={cn(
        'relative flex items-center gap-3 w-full min-w-[240px] p-3 rounded-xl border touch-manipulation',
        'transition-all duration-200 active:scale-[0.98]',
        supplierColors[coupon.supplier_slug] || 'border-white/10 bg-white/[0.03]'
      )}
    >
      {/* Left: discount icon + value */}
      <div className="flex-shrink-0 flex flex-col items-center justify-center w-14 h-14 rounded-lg bg-white/[0.06]">
        <DiscountIcon className="h-4 w-4 text-elec-yellow mb-0.5" />
        <span className="text-xs font-bold text-elec-yellow">{discountText}</span>
      </div>

      {/* Middle: details */}
      <div className="flex-1 min-w-0 text-left">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="text-xs font-medium text-white">{coupon.supplier_name}</span>
          {coupon.is_verified && <Check className="h-3 w-3 text-green-500 flex-shrink-0" />}
        </div>
        <p className="text-xs text-white line-clamp-1">{coupon.description}</p>
        {coupon.minimum_spend && (
          <p className="text-xs text-white mt-0.5">Min. spend £{coupon.minimum_spend}</p>
        )}
      </div>

      {/* Right: code + copy */}
      <div className="flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.08] border border-dashed border-white/20">
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
