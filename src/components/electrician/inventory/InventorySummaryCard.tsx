import { Package, PoundSterling, AlertTriangle } from 'lucide-react';
import { InventoryItem, InventoryStats, INVENTORY_LOCATIONS } from '@/types/inventory';

interface InventorySummaryCardProps {
  stats: InventoryStats;
  items: InventoryItem[];
}

export function InventorySummaryCard({ stats, items = [] }: InventorySummaryCardProps) {
  // Calculate value per location
  const locationValues = INVENTORY_LOCATIONS.map((loc) => {
    const locItems = items.filter((i) => i.location === loc.id);
    const value = locItems.reduce(
      (sum, i) => sum + (i.unit_cost != null ? i.quantity * i.unit_cost : 0),
      0
    );
    const count = locItems.length;
    return { ...loc, value: Math.round(value * 100) / 100, count };
  }).filter((l) => l.count > 0);

  return (
    <div className="space-y-3">
      {/* Top stats row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-3 text-center">
          <Package className="h-5 w-5 text-teal-400 mx-auto mb-1" />
          <p className="text-[20px] font-bold text-white">{stats.totalItems}</p>
          <p className="text-[11px] text-white">Items</p>
        </div>
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-3 text-center">
          <PoundSterling className="h-5 w-5 text-emerald-400 mx-auto mb-1" />
          <p className="text-[20px] font-bold text-white">
            {stats.totalValue > 0 ? `£${stats.totalValue.toFixed(0)}` : '—'}
          </p>
          <p className="text-[11px] text-white">Value</p>
        </div>
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-3 text-center">
          <AlertTriangle
            className={`h-5 w-5 mx-auto mb-1 ${stats.lowStockCount > 0 ? 'text-amber-400' : 'text-white'}`}
          />
          <p
            className={`text-[20px] font-bold ${stats.lowStockCount > 0 ? 'text-amber-400' : 'text-white'}`}
          >
            {stats.lowStockCount}
          </p>
          <p className="text-[11px] text-white">Low Stock</p>
        </div>
      </div>

      {/* Per-location breakdown */}
      {locationValues.length > 1 && (
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {locationValues.map((loc) => (
            <div
              key={loc.id}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] flex-shrink-0"
            >
              <span className="text-[11px] text-white font-medium">{loc.label}</span>
              <span className="text-[11px] text-white font-bold">{loc.count}</span>
              {loc.value > 0 && (
                <span className="text-[11px] text-emerald-400">£{loc.value.toFixed(0)}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
