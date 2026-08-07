import { cn } from '@/lib/utils';
import { cardCn, eyebrowCn } from '@/components/shared/surfaceStyles';
import type { OptimisedBasket } from '@/types/procurement';

const money = (v: number) => `£${v.toFixed(2)}`;

/**
 * What splitting the order across suppliers is worth.
 *
 * The saving is the whole reason this page exists, and it used to sit in a
 * 14px row between the total and the supplier pills, the same size as the
 * struck-through comparison beside it. It leads now, at the size of the
 * number it is.
 *
 * The decorative icons went with it — a trending-down arrow next to the words
 * "You save" and a shop next to "Supplier split" told the reader nothing the
 * words did not.
 */
export function OptimisedBasketSummary({
  basket,
  onSendToQuote,
}: {
  basket: OptimisedBasket;
  onSendToQuote?: () => void;
}) {
  const saves = basket.savings > 0;

  return (
    <section className={cn(cardCn, 'p-4 sm:p-5')}>
      {saves ? (
        <>
          <span className={cn(eyebrowCn, 'block')}>Split across suppliers, you save</span>
          <p className="mt-1 text-[32px] font-bold leading-none tracking-tight text-elec-yellow tabular-nums">
            {money(basket.savings)}
          </p>
          <p className="mt-2 text-[13px] leading-snug text-white tabular-nums">
            {money(basket.total)} buying from the cheapest for each item, against{' '}
            {money(basket.single_supplier_total)} putting it all through{' '}
            {basket.single_supplier_name} — {basket.savings_percentage}% off.
          </p>
        </>
      ) : (
        <>
          <span className={cn(eyebrowCn, 'block')}>Basket total</span>
          <p className="mt-1 text-[32px] font-bold leading-none tracking-tight text-elec-yellow tabular-nums">
            {money(basket.total)}
          </p>
          <p className="mt-2 text-[13px] leading-snug text-white">
            Nothing to gain by splitting this one — {basket.single_supplier_name} is cheapest on
            the lot.
          </p>
        </>
      )}

      {basket.supplier_split.length > 0 && (
        <div className="mt-4 border-t border-white/[0.1] pt-4">
          <h3 className="text-sm font-semibold text-white">Where it comes from</h3>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {basket.supplier_split.map((supplier) => (
              <span
                key={supplier.supplier_slug}
                className="flex items-center gap-1.5 rounded-full border border-white/[0.12] bg-white/[0.06] px-3 py-1.5 text-[12px]"
              >
                <span className="font-semibold text-white">{supplier.supplier_name}</span>
                <span className="text-white tabular-nums">
                  {supplier.item_count} {supplier.item_count === 1 ? 'item' : 'items'}
                </span>
                <span className="font-semibold text-elec-yellow tabular-nums">
                  {money(supplier.total)}
                </span>
              </span>
            ))}
          </div>
        </div>
      )}

      {onSendToQuote && (
        <button
          type="button"
          onClick={onSendToQuote}
          className="mt-4 h-12 w-full rounded-xl bg-elec-yellow text-[14px] font-semibold text-black transition-colors hover:bg-elec-yellow/90 touch-manipulation active:scale-[0.99]"
        >
          Send to quote builder
        </button>
      )}
    </section>
  );
}
