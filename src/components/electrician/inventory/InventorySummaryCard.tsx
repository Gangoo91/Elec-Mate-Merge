import { InventoryItem, InventoryStats, INVENTORY_LOCATIONS } from '@/types/inventory';
import { cn } from '@/lib/utils';

interface InventorySummaryCardProps {
  stats: InventoryStats;
  items: InventoryItem[];
}

const formatValue = (v: number) => {
  if (v <= 0) return '—';
  if (v >= 1000) return `£${(v / 1000).toFixed(1)}k`;
  return `£${v.toFixed(0)}`;
};

/**
 * Stock at a glance.
 *
 * Was three icon-led boxes — a teal cube, a green pound, an amber triangle —
 * decoration doing a job that type and spacing do better, and against the house
 * rule that headings carry no icons. It also never used the width it was given:
 * three centred boxes across a 1600px display.
 *
 * Now one surface split into cells, reading in the order an electrician cares
 * about: how much have I got, what is it worth, what am I about to run out of —
 * then where it all is.
 */
export function InventorySummaryCard({ stats, items = [] }: InventorySummaryCardProps) {
  const locationValues = INVENTORY_LOCATIONS.map((loc) => {
    const locItems = items.filter((i) => i.location === loc.id);
    return {
      ...loc,
      count: locItems.length,
      value: Math.round(
        locItems.reduce((sum, i) => sum + (i.unit_cost != null ? i.quantity * i.unit_cost : 0), 0)
      ),
    };
  }).filter((l) => l.count > 0);

  /** Items with no alert level can never report as low, however empty they get. */
  const untracked = items.filter((i) => i.low_stock_threshold == null).length;

  const cellCn = 'px-3 py-3.5 sm:px-4';
  const labelCn = 'text-[10px] font-semibold uppercase tracking-[0.16em] text-white';
  const valueCn = 'mt-1 text-[20px] font-bold leading-none tracking-tight tabular-nums';

  return (
    <div className="space-y-3">
      {/* Edge to edge on a phone, inset from sm: up — the house card language. */}
      <div className="-mx-4 grid grid-cols-3 border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] sm:mx-0 sm:rounded-2xl sm:border-x">
        <div className={cellCn}>
          <p className={labelCn}>Items</p>
          <p className={cn(valueCn, 'text-white')}>{stats.totalItems}</p>
        </div>
        <div className={cn(cellCn, 'border-l border-white/[0.10]')}>
          <p className={labelCn}>Value</p>
          {/* Nobody in production has ever set a unit cost, so this cell read
              "—" forever — a dead number taking a third of the row. Say why it
              is empty instead of just being empty. */}
          {stats.totalValue > 0 ? (
            <p className={cn(valueCn, 'text-white')}>{formatValue(stats.totalValue)}</p>
          ) : (
            <p className="mt-1 text-[12px] leading-tight text-white">Add costs to see</p>
          )}
        </div>
        <div className={cn(cellCn, 'border-l border-white/[0.10]')}>
          <p className={labelCn}>Low stock</p>
          {/* A zero here used to be ambiguous: plenty in stock, or no alert
              levels set on anything? Say which. */}
          {untracked > 0 && stats.lowStockCount === 0 ? (
            <p className="mt-1 text-[12px] leading-tight text-white">
              {untracked} with no alert level
            </p>
          ) : (
            <p className={cn(valueCn, stats.lowStockCount > 0 ? 'text-amber-400' : 'text-white')}>
              {stats.lowStockCount}
            </p>
          )}
        </div>
      </div>

      {/* Where it is. Only earns its space once stock is in more than one place. */}
      {locationValues.length > 1 && (
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
          {locationValues.map((loc) => (
            <div
              key={loc.id}
              className="flex flex-shrink-0 items-baseline gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-3 py-2"
            >
              <span className="text-[12px] font-medium text-white">{loc.label}</span>
              <span className="text-[12px] font-semibold tabular-nums text-white">{loc.count}</span>
              {loc.value > 0 && (
                <span className="text-[12px] tabular-nums text-white">£{loc.value}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
