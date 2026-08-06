import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { cardCn, chipBase, chipOff, chipOn, eyebrowCn } from '@/components/shared/surfaceStyles';
import { useCableComparison, useCableSizes } from '@/hooks/useCableComparison';

const money = (v: number) => `£${v.toFixed(2)}`;
const perMetre = (v: number) => `£${v.toFixed(2)}/m`;

/** How stale a price is, in words. */
function freshness(iso: string): string | null {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (days <= 1) return null;
  if (days < 7) return `${days} days old`;
  if (days < 60) return `${Math.round(days / 7)} weeks old`;
  return `${Math.round(days / 30)} months old`;
}

/**
 * Who is cheapest for a given size of twin and earth, today.
 *
 * This is the one thing the marketplace can tell an electrician that no
 * supplier's own site can. It works by comparing the SPEC rather than the
 * product name — name matching is hopeless here, since only two product names
 * in 13,631 appear at more than one supplier.
 *
 * Everything is normalised to £ per metre, which is what makes a 10m coil, a
 * 50m reel, a 100m drum and a cut-to-length price comparable at all. The pack
 * each price came from is shown next to it, because £/m alone would hide that
 * the cheapest-looking coil is 10m and the dearest is a full drum.
 */
const CableComparison = () => {
  const { data: sizes = [], isLoading: sizesLoading } = useCableSizes();
  const [csa, setCsa] = useState<number | null>(null);

  /*
   * Open on 2.5mm².
   *
   * Opening on the biggest headline saving would show 10mm², where the spread
   * is £586 per 100m — but that gap is a full reel against a cut-to-length
   * price, which is a real warning rather than a real choice. 2.5mm² is the
   * cable an electrician actually buys most of: ring finals, socket circuits,
   * most domestic work. Show the useful answer first, not the biggest number.
   */
  useEffect(() => {
    if (csa != null || sizes.length === 0) return;
    const workhorse = sizes.find((s) => s.csa_mm2 === 2.5);
    if (workhorse) {
      setCsa(workhorse.csa_mm2);
      return;
    }
    const mostStocked = [...sizes].sort((a, b) => b.supplier_count - a.supplier_count)[0];
    setCsa(mostStocked.csa_mm2);
  }, [sizes, csa]);

  const { data: offers = [], isLoading } = useCableComparison(csa);
  const selected = sizes.find((s) => s.csa_mm2 === csa);

  if (sizesLoading || sizes.length === 0) return null;

  const cheapest = offers.find((o) => o.is_cheapest);
  const dearest = offers.length > 1 ? offers[offers.length - 1] : null;

  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-[15px] font-semibold tracking-tight text-white">
          Twin &amp; earth — who is cheapest
        </h2>
        <p className="mt-0.5 text-[12px] text-white">
          Every price worked back to £ per metre, so drums, reels and cut lengths compare properly.
        </p>
      </div>

      <div className="scrollbar-hide -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
        {sizes.map((s) => (
          <button
            key={s.csa_mm2}
            type="button"
            onClick={() => setCsa(s.csa_mm2)}
            className={cn(chipBase, csa === s.csa_mm2 ? chipOn : chipOff)}
          >
            {s.csa_mm2}mm²
          </button>
        ))}
      </div>

      {/* The headline: what choosing well is worth on a 100m drum. */}
      {selected && cheapest && dearest && selected.saving_per_100m > 0 && (
        <div className={cn(cardCn, 'p-4 sm:p-5')}>
          <span className={cn(eyebrowCn, 'block')}>Save on 100m</span>
          <p className="mt-1 text-[28px] font-bold leading-none tracking-tight text-elec-yellow tabular-nums">
            {money(selected.saving_per_100m)}
          </p>
          <p className="mt-2 text-[13px] leading-snug text-white">
            {cheapest.supplier_name} at {perMetre(cheapest.price_per_metre)} against{' '}
            {dearest.supplier_name} at {perMetre(dearest.price_per_metre)} for {selected.csa_mm2}mm².
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
                  {/* What the price is actually FOR. Without this, a 10m coil
                      and a 100m drum look like the same offer. */}
                  <span className="mt-0.5 block truncate text-[12px] text-white tabular-nums">
                    {o.sold_per_metre
                      ? 'Cut to length'
                      : o.length_m
                        ? `${money(o.current_price)} for ${o.length_m}m`
                        : money(o.current_price)}
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
        stock is excluded so the comparison stays like for like.
      </p>
    </section>
  );
};

export default CableComparison;
