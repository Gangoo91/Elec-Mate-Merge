import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { cardCn, chipBase, chipOff, chipOn, eyebrowCn } from '@/components/shared/surfaceStyles';
import {
  useCableComparison,
  useCableFamilies,
  useCableSpecs,
} from '@/hooks/useCableComparison';

const money = (v: number) => `£${v.toFixed(2)}`;
const perMetre = (v: number) => `£${v.toFixed(2)}/m`;

/** How stale a price is, in words. Nothing shown for today's and yesterday's. */
function freshness(iso: string): string | null {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (days <= 1) return null;
  if (days < 7) return `${days} days old`;
  if (days < 60) return `${Math.round(days / 7)} weeks old`;
  return `${Math.round(days / 30)} months old`;
}

/** What the price actually buys — a drum, a pack, or cut off a reel. */
function packLabel(o: {
  sold_per_metre: boolean;
  length_m: number | null;
  pack_qty: number;
  current_price: number;
}): string {
  if (o.sold_per_metre) return 'Cut to length';
  if (!o.length_m) return money(o.current_price);
  if (o.pack_qty > 1) {
    return `${money(o.current_price)} for ${o.pack_qty} × ${o.length_m}m`;
  }
  return `${money(o.current_price)} for ${o.length_m}m`;
}

/**
 * Who is cheapest for a given cable, today.
 *
 * The one thing this marketplace can tell an electrician that no supplier's own
 * site can. It compares the SPEC rather than the product name — name matching
 * is hopeless, since only two names in 13,631 appear at more than one supplier.
 *
 * Everything is normalised to £ per metre, which is what makes a 10m coil, a
 * 50m reel, a 100m drum, a multi-pack and a cut-to-length price comparable at
 * all. The pack each price came from is shown beside it, because £/m alone
 * would hide that the cheapest-looking coil is 10m and the dearest is a drum.
 */
const CableComparison = () => {
  const { data: families = [], isLoading: familiesLoading } = useCableFamilies();
  const [family, setFamily] = useState<string | null>(null);
  const [specKey, setSpecKey] = useState<string | null>(null);

  // Twin and earth first — it is what most work is wired in.
  useEffect(() => {
    if (family != null || families.length === 0) return;
    setFamily(families.find((f) => f.family === 'twin_earth')?.family ?? families[0].family);
  }, [families, family]);

  const { data: specs = [] } = useCableSpecs(family);

  /*
   * Open on 2.5mm² where it exists.
   *
   * Leading on the biggest headline saving would pick the widest outlier —
   * usually a full reel against a cut-to-length price, which is a real warning
   * rather than a real choice. 2.5mm² is the cable an electrician actually buys
   * most of. Show the useful answer first, not the biggest number.
   */
  useEffect(() => {
    if (specs.length === 0) return;
    if (specKey && specs.some((s) => s.spec_key === specKey)) return;
    const workhorse = specs.find((s) => s.csa_mm2 === 2.5) ?? specs[0];
    setSpecKey(workhorse.spec_key);
  }, [specs, specKey]);

  const { data: offers = [], isLoading } = useCableComparison(family, specKey);
  const selected = specs.find((s) => s.spec_key === specKey);

  if (familiesLoading || families.length === 0) return null;

  const cheapest = offers.find((o) => o.is_cheapest);
  const dearest = offers.length > 1 ? offers[offers.length - 1] : null;

  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-[15px] font-semibold tracking-tight text-white">
          Cable — who is cheapest
        </h2>
        <p className="mt-0.5 text-[12px] text-white">
          Every price worked back to £ per metre, so drums, reels, packs and cut lengths compare
          properly.
        </p>
      </div>

      {/* Family, then spec. Two rows of chips rather than one long list — a
          4mm² twin-and-earth and a 4mm² 3-core SWA are different purchases. */}
      {families.length > 1 && (
        <div className="scrollbar-hide -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
          {families.map((f) => (
            <button
              key={f.family}
              type="button"
              onClick={() => {
                setFamily(f.family);
                setSpecKey(null);
              }}
              className={cn(chipBase, family === f.family ? chipOn : chipOff)}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      {specs.length > 0 && (
        <div className="scrollbar-hide -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
          {specs.map((s) => (
            <button
              key={s.spec_key}
              type="button"
              onClick={() => setSpecKey(s.spec_key)}
              className={cn(
                chipBase,
                'text-[12.5px]',
                specKey === s.spec_key ? chipOn : chipOff
              )}
            >
              {s.spec_label}
            </button>
          ))}
        </div>
      )}

      {selected && cheapest && dearest && selected.saving_per_100m > 0 && (
        <div className={cn(cardCn, 'p-4 sm:p-5')}>
          <span className={cn(eyebrowCn, 'block')}>Save on 100m</span>
          <p className="mt-1 text-[28px] font-bold leading-none tracking-tight text-elec-yellow tabular-nums">
            {money(selected.saving_per_100m)}
          </p>
          <p className="mt-2 text-[13px] leading-snug text-white">
            {cheapest.supplier_name} at {perMetre(cheapest.price_per_metre)} against{' '}
            {dearest.supplier_name} at {perMetre(dearest.price_per_metre)} for{' '}
            {selected.spec_label}.
          </p>
        </div>
      )}

      <div className={cn(cardCn, 'divide-y divide-white/[0.08] overflow-hidden')}>
        {isLoading && (
          <p className="px-4 py-6 text-center text-[13px] text-white">Comparing suppliers…</p>
        )}

        {!isLoading &&
          offers.map((o) => {
            const stale = freshness(o.scraped_at);
            return (
              <a
                key={`${o.supplier_slug}-${o.product_url}`}
                href={o.product_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-white/[0.04] touch-manipulation sm:px-5"
              >
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="truncate text-[14px] font-semibold tracking-tight text-white">
                      {o.supplier_name}
                    </span>
                    {o.is_cheapest && (
                      <span className="shrink-0 rounded-full bg-elec-yellow px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-black">
                        Cheapest
                      </span>
                    )}
                  </span>
                  <span className="mt-0.5 block truncate text-[12px] text-white tabular-nums">
                    {packLabel(o)}
                    {stale ? ` · ${stale}` : ''}
                  </span>
                </span>

                <span className="shrink-0 text-right">
                  <span className="block text-[16px] font-bold leading-none tracking-tight text-elec-yellow tabular-nums">
                    {perMetre(o.price_per_metre)}
                  </span>
                  {!o.is_cheapest && o.pct_above_cheapest > 0 && (
                    <span className="mt-1 block text-[11px] text-white tabular-nums">
                      {o.pct_above_cheapest}% more
                    </span>
                  )}
                </span>
              </a>
            );
          })}
      </div>

      <p className="px-1 text-[11px] leading-snug text-white">
        Prices as last scraped from each supplier — check before you buy. Refurbished and clearance
        stock is excluded, and a size only appears once three or more suppliers stock it.
      </p>
    </section>
  );
};

export default CableComparison;
