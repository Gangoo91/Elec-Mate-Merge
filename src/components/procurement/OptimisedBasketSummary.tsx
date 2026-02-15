import { TrendingDown, Store } from 'lucide-react';
import type { OptimisedBasket } from '@/types/procurement';

interface OptimisedBasketSummaryProps {
  basket: OptimisedBasket;
}

/**
 * Summary card showing the optimised basket total, savings, and supplier split
 */
export function OptimisedBasketSummary({ basket }: OptimisedBasketSummaryProps) {
  return (
    <div className="bg-gradient-to-r from-yellow-500/10 to-green-500/10 border border-elec-yellow/30 rounded-2xl p-4 space-y-4">
      {/* Totals */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-white">Optimised Total</span>
          <span className="text-2xl font-bold text-elec-yellow">
            £{basket.total.toFixed(2)}
          </span>
        </div>

        {basket.savings > 0 && (
          <>
            <div className="flex items-center justify-between">
              <span className="text-sm text-white">vs {basket.single_supplier_name}</span>
              <span className="text-sm text-white line-through">
                £{basket.single_supplier_total.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-white flex items-center gap-1.5">
                <TrendingDown className="h-4 w-4 text-green-400" />
                You Save
              </span>
              <span className="text-sm font-bold text-green-400">
                £{basket.savings.toFixed(2)} ({basket.savings_percentage}%)
              </span>
            </div>
          </>
        )}
      </div>

      {/* Supplier split pills */}
      {basket.supplier_split.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-medium text-white">
            <Store className="h-3.5 w-3.5" />
            Supplier Split
          </div>
          <div className="flex flex-wrap gap-2">
            {basket.supplier_split.map((supplier) => (
              <div
                key={supplier.supplier_slug}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.06] border border-white/[0.1] rounded-full text-xs"
              >
                <span className="font-medium text-white">{supplier.supplier_name}</span>
                <span className="text-white">
                  {supplier.item_count} {supplier.item_count === 1 ? 'item' : 'items'}
                </span>
                <span className="text-elec-yellow font-semibold">£{supplier.total.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
