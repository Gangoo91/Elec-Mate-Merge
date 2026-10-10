import { ExternalLink, Check, X } from 'lucide-react';
import type { Supplier } from '@/data/professional-tools/types';

interface SupplierCardProps {
  supplier: Supplier;
}

const SupplierCard = ({ supplier }: SupplierCardProps) => {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3 max-sm:-mx-4 max-sm:rounded-none max-sm:border-x-0">
      <div className="flex items-center justify-between gap-3">
        <h4 className="text-[14px] font-semibold text-white">{supplier.name}</h4>
        <a
          href={supplier.url}
          target="_blank"
          rel="noopener noreferrer"
          className="-my-1.5 inline-flex h-11 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-xl border border-white/[0.14] px-3.5 text-[13px] font-semibold text-white transition-colors hover:border-white/[0.3] active:bg-white/[0.06] touch-manipulation"
        >
          Visit
          <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.5} />
        </a>
      </div>
      <p className="text-[14px] text-white leading-relaxed">{supplier.description}</p>
      <div className="space-y-1.5 text-[13px] text-white">
        <div>
          <span className="font-medium">Best for:</span> {supplier.bestFor}
        </div>
        <div>
          <span className="font-medium">Delivery:</span> {supplier.deliveryInfo}
        </div>
        <div className="flex items-center gap-1">
          <span className="font-medium">Trade account:</span>
          {supplier.tradeAccount ? (
            <span className="flex items-center gap-1 text-elec-yellow">
              <Check className="h-3 w-3" /> Required
            </span>
          ) : (
            <span className="flex items-center gap-1 text-white">
              <X className="h-3 w-3" /> Open to all
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupplierCard;
