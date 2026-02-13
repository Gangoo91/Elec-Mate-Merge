import { ExternalLink, Check, X } from "lucide-react";
import type { Supplier } from "@/data/professional-tools/types";

interface SupplierCardProps {
  supplier: Supplier;
}

const SupplierCard = ({ supplier }: SupplierCardProps) => {
  return (
    <div className="p-4 rounded-lg bg-white/[0.02] border border-white/10 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-sm font-semibold text-white">{supplier.name}</h4>
        <a
          href={supplier.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-purple-300 hover:text-purple-200 px-2 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 touch-manipulation active:scale-[0.98] whitespace-nowrap"
        >
          Visit
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
      <p className="text-xs text-white leading-relaxed">
        {supplier.description}
      </p>
      <div className="space-y-1.5 text-xs text-white">
        <div>
          <span className="font-medium">Best for:</span> {supplier.bestFor}
        </div>
        <div>
          <span className="font-medium">Delivery:</span>{" "}
          {supplier.deliveryInfo}
        </div>
        <div className="flex items-center gap-1">
          <span className="font-medium">Trade account:</span>
          {supplier.tradeAccount ? (
            <span className="flex items-center gap-1 text-green-300">
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
