import { useMemo } from 'react';
import { useLivePricingItemBenchmarks } from '../hooks/useLivePricing';

const gbp = (value: number) => `£${Math.round(value).toLocaleString('en-GB')}`;

// Covered better by the whole-job benchmarks; line-level semantics too murky.
const HIDDEN_ITEMS = new Set(['EICR (per property)', 'Consumer unit (board)']);

/** Per-line going rates for common items — fitted charge vs material cost. */
const ItemRatesSection = () => {
  const { data: rows } = useLivePricingItemBenchmarks();

  const items = useMemo(() => {
    const byItem = new Map<
      string,
      { fitted?: { median: number; p25: number; p75: number; n: number; users: number };
        materials?: { median: number; n: number } }
    >();
    for (const row of rows ?? []) {
      if (HIDDEN_ITEMS.has(row.item)) continue;
      const entry = byItem.get(row.item) ?? {};
      if (row.kind === 'fitted') {
        entry.fitted = {
          median: row.median_price,
          p25: row.p25_price,
          p75: row.p75_price,
          n: row.sample_size,
          users: row.contributors,
        };
      } else {
        entry.materials = { median: row.median_price, n: row.sample_size };
      }
      byItem.set(row.item, entry);
    }
    return [...byItem.entries()]
      .filter(([, entry]) => entry.fitted) // headline is the fitted charge
      .sort((a, b) => (b[1].fitted!.n ?? 0) - (a[1].fitted!.n ?? 0));
  }, [rows]);

  if (items.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between pt-1">
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80">
          Going rates · common items
        </p>
        <span className="text-[11px] text-white/70">{items.length} items</span>
      </div>
      <p className="text-xs text-white/70 -mt-1">
        Median per line on real quotes. Fitted = labour or supply &amp; fit lines; materials
        priced separately.
      </p>

      <div className="rounded-2xl bg-white/[0.04] border border-white/10 divide-y divide-white/[0.07]">
        {items.map(([name, entry]) => (
          <div key={name} className="p-3.5">
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-sm font-semibold text-white truncate min-w-0">{name}</p>
              <p className="text-base font-bold text-white tabular-nums flex-shrink-0">
                {gbp(entry.fitted!.median)}
                <span className="text-[10px] font-normal text-white/70"> fitted</span>
              </p>
            </div>
            <div className="flex items-baseline justify-between gap-3 mt-0.5">
              <p className="text-[10px] text-white/70 flex-shrink-0">
                {entry.fitted!.n} lines · {entry.fitted!.users} electricians
              </p>
              <p className="text-[10px] text-white/70 tabular-nums text-right">
                typical {gbp(entry.fitted!.p25)}–{gbp(entry.fitted!.p75)}
                {entry.materials ? ` · materials ${gbp(entry.materials.median)}` : ''}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemRatesSection;
