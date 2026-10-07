import { useEffect, useMemo, useState } from 'react';
import { Minus, Plus, Search, Check } from 'lucide-react';
import { FormSheet } from '@/components/forms/FormSheet';
import { inputCn, chipBase, chipOn, chipOff, buttonPrimaryCn, buttonSecondaryCn } from '@/components/forms/fieldStyles';
import { cn } from '@/lib/utils';
import {
  useFirmPriceBook,
  gbp,
  normaliseName,
  priceFor,
  type FirmPriceBookItem,
} from '@/hooks/useFirmPriceBook';

/* ==========================================================================
   Pick lines from the firm price book (ELE-1991) — used by hub quotes
   (sell prices) and purchase orders (buy prices).

   One sheet, multi-select with a quantity per line. In `buy` mode the price
   shown is the buy price, falling back to the last price actually paid; an
   office manager never gets here in buy mode (POs are owner/admin only).
   ========================================================================== */

export interface PickedPriceBookLine {
  item: FirmPriceBookItem;
  qty: number;
  /** The unit price for this mode (sell or buy), null when the book has none. */
  unitPrice: number | null;
}

const ALL = 'All';
const PAGE = 80;

export function PriceBookPicker({
  open,
  onOpenChange,
  mode,
  onAdd,
  title,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'sell' | 'buy';
  onAdd: (lines: PickedPriceBookLine[]) => void;
  title?: string;
}) {
  const { data: items = [], isLoading, isError } = useFirmPriceBook();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(ALL);
  const [picked, setPicked] = useState<Record<string, number>>({});
  const [limit, setLimit] = useState(PAGE);

  useEffect(() => {
    if (!open) {
      setPicked({});
      setSearch('');
      setCategory(ALL);
      setLimit(PAGE);
    }
  }, [open]);

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const i of items) counts.set(i.category, (counts.get(i.category) ?? 0) + 1);
    return [ALL, ...[...counts.entries()].sort((a, b) => b[1] - a[1]).map(([c]) => c)];
  }, [items]);

  // One row per name: the same product saved in two lists shows once.
  const unique = useMemo(() => {
    const seen = new Set<string>();
    return items.filter((i) => {
      const k = normaliseName(i.name);
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
  }, [items]);

  const filtered = useMemo(() => {
    const q = normaliseName(search);
    const words = q ? q.split(' ') : [];
    return unique.filter(
      (i) =>
        (category === ALL || i.category === category) &&
        words.every((w) => normaliseName(`${i.name} ${i.supplier ?? ''}`).includes(w))
    );
  }, [unique, search, category]);

  const pickedCount = Object.keys(picked).length;
  const pickedTotal = Object.entries(picked).reduce((sum, [id, qty]) => {
    const it = unique.find((i) => i.item_id === id);
    const p = it ? priceFor(it, mode) : null;
    return sum + (p ?? 0) * qty;
  }, 0);

  const toggle = (id: string) =>
    setPicked((prev) => {
      const next = { ...prev };
      if (next[id]) delete next[id];
      else next[id] = 1;
      return next;
    });
  const bump = (id: string, d: number) =>
    setPicked((prev) => {
      const q = Math.max(0, (prev[id] ?? 0) + d);
      const next = { ...prev };
      if (q === 0) delete next[id];
      else next[id] = q;
      return next;
    });

  const add = () => {
    const lines = Object.entries(picked)
      .map(([id, qty]) => {
        const item = unique.find((i) => i.item_id === id);
        return item ? { item, qty, unitPrice: priceFor(item, mode) } : null;
      })
      .filter((l): l is PickedPriceBookLine => !!l);
    onAdd(lines);
    onOpenChange(false);
  };

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      eyebrow="Price book"
      title={title ?? (mode === 'sell' ? 'Add from the price book' : 'Order from the price book')}
      description={
        mode === 'sell'
          ? 'Sell prices from the firm price book, shared with the Electrical Hub.'
          : 'Buy prices from the firm price book, or the last price you paid.'
      }
      width="wide"
      subheader={
        <div className="space-y-3 pb-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2 text-white" aria-hidden />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search the price book"
              className={cn(inputCn, 'pl-7')}
              aria-label="Search the price book"
            />
          </div>
          {categories.length > 2 && (
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 hide-scrollbar sm:mx-0 sm:px-0">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={cn(chipBase, 'shrink-0 whitespace-nowrap rounded-full px-4 text-[13px]', category === c ? chipOn : chipOff)}
                >
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>
      }
      footer={
        <div className="flex gap-2">
          <button type="button" onClick={() => onOpenChange(false)} className={cn(buttonSecondaryCn, 'flex-1 px-4')}>
            Cancel
          </button>
          <button type="button" onClick={add} disabled={pickedCount === 0} className={cn(buttonPrimaryCn, 'flex-[2] px-4')}>
            {pickedCount === 0
              ? 'Pick items'
              : `Add ${pickedCount} item${pickedCount === 1 ? '' : 's'}${pickedTotal > 0 ? ` · ${gbp(pickedTotal)}` : ''}`}
          </button>
        </div>
      }
    >
      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-16 animate-pulse rounded-xl bg-white/[0.05]" />
          ))}
        </div>
      ) : isError ? (
        <p className="py-10 text-center text-[14px] text-white">Couldn't load the price book. Close and try again.</p>
      ) : unique.length === 0 ? (
        <div className="py-10 text-center">
          <p className="text-[15px] font-semibold text-white">The price book is empty</p>
          <p className="mt-1 text-[13px] text-white">
            Add items in Finance → Price book, or save lines from a quote in the Electrical Hub.
          </p>
        </div>
      ) : filtered.length === 0 ? (
        <p className="py-10 text-center text-[14px] text-white">Nothing matches “{search}”.</p>
      ) : (
        <>
          <ul className="-mx-4 divide-y divide-white/[0.08] border-y border-white/[0.08] sm:mx-0 sm:rounded-2xl sm:border-x lg:grid lg:grid-cols-2 lg:divide-y-0 lg:gap-px lg:bg-white/[0.08] lg:overflow-hidden">
            {filtered.slice(0, limit).map((i) => {
              const qty = picked[i.item_id] ?? 0;
              const price = priceFor(i, mode);
              const fromLastPaid = mode === 'buy' && i.buy_price == null && i.last_paid_price != null;
              return (
                <li key={i.item_id} className={cn('flex items-center gap-3 px-4 py-2.5 bg-[hsl(0_0%_8%)]', qty > 0 && 'bg-white/[0.06]')}>
                  <button
                    type="button"
                    onClick={() => toggle(i.item_id)}
                    className="flex min-h-11 min-w-0 flex-1 items-center gap-3 text-left touch-manipulation"
                    aria-pressed={qty > 0}
                  >
                    <span
                      className={cn(
                        'flex h-6 w-6 shrink-0 items-center justify-center rounded-md border',
                        qty > 0 ? 'border-elec-yellow bg-elec-yellow text-black' : 'border-white/40'
                      )}
                      aria-hidden
                    >
                      {qty > 0 && <Check className="h-4 w-4" />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[14px] font-medium text-white">{i.name}</span>
                      <span className="block truncate text-[12px] text-white">
                        {price != null
                          ? `${gbp(price)} / ${i.unit}`
                          : mode === 'buy'
                            ? `No buy price yet${i.sell_price != null ? ` · sells at ${gbp(i.sell_price)}` : ''}`
                            : 'No sell price yet'}
                        {fromLastPaid ? ' · last paid' : ''}
                        {i.supplier ? ` · ${i.supplier}` : ''}
                      </span>
                    </span>
                  </button>
                  {qty > 0 && (
                    <div className="flex shrink-0 items-center gap-1">
                      <button
                        type="button"
                        onClick={() => bump(i.item_id, -1)}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.14] text-white touch-manipulation"
                        aria-label={`One fewer ${i.name}`}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center text-[15px] font-semibold tabular-nums text-white">{qty}</span>
                      <button
                        type="button"
                        onClick={() => bump(i.item_id, 1)}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.14] text-white touch-manipulation"
                        aria-label={`One more ${i.name}`}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
          {filtered.length > limit && (
            <button
              type="button"
              onClick={() => setLimit((l) => l + PAGE)}
              className={cn(buttonSecondaryCn, 'w-full')}
            >
              Show more ({filtered.length - limit} left)
            </button>
          )}
        </>
      )}
    </FormSheet>
  );
}
