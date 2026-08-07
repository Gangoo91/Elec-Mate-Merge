import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { cardCn } from '@/components/shared/surfaceStyles';
import type { ComparisonItem, SupplierMatch } from '@/types/procurement';

const money = (v: number) => `£${v.toFixed(2)}`;

/**
 * Stock, in words.
 *
 * Was a 12px tick/triangle/cross beside the text. The words already said it
 * and the icons were too small to read at a glance on a phone; the colour
 * carries the same signal without them.
 */
function stockTone(status: string): string {
  const s = status.toLowerCase();
  if (s.includes('out')) return 'text-orange-300';
  if (s.includes('low')) return 'text-orange-300';
  return 'text-white';
}

function SupplierRow({
  match,
  quantity,
  cheapestPrice,
}: {
  match: SupplierMatch;
  quantity: number;
  cheapestPrice: number;
}) {
  const lineTotal = match.current_price * quantity;
  // How much dearer than the best on this item — the number that makes the
  // list worth reading past the first row.
  const pctAbove =
    cheapestPrice > 0 && match.current_price > cheapestPrice
      ? Math.round(((match.current_price - cheapestPrice) / cheapestPrice) * 100)
      : 0;

  const delivery =
    match.delivery.click_collect !== 'N/A'
      ? `Click & collect ${match.delivery.click_collect}`
      : match.delivery.standard;

  return (
    <a
      href={match.product_url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] p-3 transition-colors hover:bg-white/[0.05] touch-manipulation"
    >
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="truncate text-sm font-semibold text-white">{match.supplier_name}</span>
          {match.is_recommended && (
            <span className="shrink-0 rounded-full bg-elec-yellow px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-black">
              Cheapest
            </span>
          )}
        </span>

        <span className="mt-1 block truncate text-xs text-white">
          <span className={stockTone(match.stock_status)}>{match.stock_status}</span>
          {' · '}
          {delivery}
        </span>

        {match.product_name !== match.supplier_name && (
          <span className="mt-1 block line-clamp-1 text-xs text-white">{match.product_name}</span>
        )}
      </span>

      <span className="shrink-0 text-right">
        <span className="block text-sm font-bold text-white tabular-nums">
          {money(match.current_price)}
        </span>
        {quantity > 1 && (
          <span className="block text-xs text-white tabular-nums">{money(lineTotal)} total</span>
        )}
        {match.is_on_sale && match.regular_price && (
          <span className="block text-xs text-white line-through tabular-nums">
            {money(match.regular_price)}
          </span>
        )}
        {pctAbove > 0 && (
          <span className="mt-0.5 block text-[11px] text-orange-300 tabular-nums">
            {pctAbove}% more
          </span>
        )}
      </span>
    </a>
  );
}

function ComparisonCard({ item }: { item: ComparisonItem }) {
  const [isOpen, setIsOpen] = useState(false);
  const hasMatches = item.matches.length > 0;
  const cheapestPrice = hasMatches ? Math.min(...item.matches.map((m) => m.current_price)) : 0;

  return (
    <div className={cn(cardCn, 'overflow-hidden p-0')}>
      <button
        type="button"
        onClick={() => hasMatches && setIsOpen(!isOpen)}
        className={cn(
          'flex w-full items-center gap-3 p-4 text-left touch-manipulation',
          hasMatches && 'active:bg-white/[0.05]'
        )}
        disabled={!hasMatches}
      >
        <span className="min-w-0 flex-1">
          <span className="line-clamp-2 block text-sm font-medium text-white">{item.name}</span>
          <span className="mt-1 flex flex-wrap items-center gap-x-3 text-xs">
            <span className="text-white tabular-nums">
              {item.quantity} off
            </span>
            {item.best_price !== null ? (
              <span className="font-semibold text-elec-yellow tabular-nums">
                {money(item.best_price)} at {item.best_supplier}
              </span>
            ) : (
              <span className="text-orange-300">Nothing matched</span>
            )}
            {item.matches.length > 1 && (
              <span className="text-white tabular-nums">
                {item.matches.length} suppliers stock it
              </span>
            )}
          </span>
        </span>

        {hasMatches &&
          (isOpen ? (
            <ChevronUp className="h-5 w-5 shrink-0 text-white" />
          ) : (
            <ChevronDown className="h-5 w-5 shrink-0 text-white" />
          ))}
      </button>

      {isOpen && (
        <div className="space-y-2 px-3 pb-3">
          {item.matches.map((match) => (
            <SupplierRow
              key={match.product_id}
              match={match}
              quantity={item.quantity}
              cheapestPrice={cheapestPrice}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/** Every item on the list, with who stocks it and for how much. */
export function ItemComparisonTable({ items }: { items: ComparisonItem[] }) {
  const matchedItems = items.filter((i) => i.matches.length > 0);
  const unmatchedItems = items.filter((i) => i.matches.length === 0);

  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-[15px] font-semibold tracking-tight text-white">
          Item by item
          <span className="ml-2 text-[13px] font-normal text-white tabular-nums">
            {items.length} {items.length === 1 ? 'line' : 'lines'}
          </span>
        </h2>
        {unmatchedItems.length > 0 && (
          <span className="shrink-0 text-xs text-orange-300 tabular-nums">
            {unmatchedItems.length} not matched
          </span>
        )}
      </div>

      {matchedItems.map((item, index) => (
        <ComparisonCard key={`matched-${index}`} item={item} />
      ))}

      {unmatchedItems.length > 0 && (
        <>
          <p className="pt-2 text-xs leading-snug text-white">
            Nothing came back for these — the wording may not match how the suppliers list them.
            Worth searching by hand.
          </p>
          {unmatchedItems.map((item, index) => (
            <ComparisonCard key={`unmatched-${index}`} item={item} />
          ))}
        </>
      )}
    </div>
  );
}
