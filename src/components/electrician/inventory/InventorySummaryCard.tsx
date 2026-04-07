import { Package, PoundSterling, AlertTriangle } from 'lucide-react';
import { InventoryStats } from '@/types/inventory';

interface InventorySummaryCardProps {
  stats: InventoryStats;
}

export function InventorySummaryCard({ stats }: InventorySummaryCardProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-3 text-center">
        <Package className="h-5 w-5 text-teal-400 mx-auto mb-1" />
        <p className="text-[20px] font-bold text-white">{stats.totalItems}</p>
        <p className="text-[11px] text-white/50">Items</p>
      </div>
      <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-3 text-center">
        <PoundSterling className="h-5 w-5 text-emerald-400 mx-auto mb-1" />
        <p className="text-[20px] font-bold text-white">
          {stats.totalValue > 0 ? `£${stats.totalValue.toFixed(0)}` : '—'}
        </p>
        <p className="text-[11px] text-white/50">Value</p>
      </div>
      <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-3 text-center">
        <AlertTriangle
          className={`h-5 w-5 mx-auto mb-1 ${stats.lowStockCount > 0 ? 'text-amber-400' : 'text-white/30'}`}
        />
        <p
          className={`text-[20px] font-bold ${stats.lowStockCount > 0 ? 'text-amber-400' : 'text-white'}`}
        >
          {stats.lowStockCount}
        </p>
        <p className="text-[11px] text-white/50">Low Stock</p>
      </div>
    </div>
  );
}
