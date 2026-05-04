import { ExternalLink, Check, X } from 'lucide-react';
import type { Supplier } from '@/data/professional-tools/types';

interface SupplierCardProps {
  supplier: Supplier;
}

const SupplierCard = ({ supplier }: SupplierCardProps) => {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-[14px] font-semibold text-white">{supplier.name}</h4>
        <a
          href={supplier.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-[12px] text-white/85 px-2 py-1 rounded-md border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] touch-manipulation active:scale-[0.98] whitespace-nowrap"
        >
          Visit
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
      <p className="text-[14px] text-white/85 leading-relaxed">{supplier.description}</p>
      <div className="space-y-1.5 text-[13px] text-white/85">
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
            <span className="flex items-center gap-1 text-white/85">
              <X className="h-3 w-3" /> Open to all
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupplierCard;
