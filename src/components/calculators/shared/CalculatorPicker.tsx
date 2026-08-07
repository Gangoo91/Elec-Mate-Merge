/**
 * Calculator picker — search + grouped list, not a 63-item dropdown.
 *
 * What this replaces was a single `<Select>` holding all 63 calculators behind
 * sticky category headers. On a desktop that is a long scroll; on a phone it is
 * a 63-row native-ish list inside an 80vh popover, and finding "Voltage Drop"
 * means knowing it is filed under "Design & Installation" and scrolling past
 * eleven Renewable Energy entries to get there.
 *
 * So: a button that opens a sheet with a search box at the top. Type "volt",
 * "mV", "3%" or "Zs" and the list narrows — the registry carries keywords for
 * exactly this, because nobody on a van thinks in the label the menu uses.
 *
 * The trigger shows the CURRENT calculator and its category, so the page always
 * says what you are looking at without a second heading.
 *
 * ── The sheet ───────────────────────────────────────────────────────────
 *
 * TWO CLOSE BUTTONS. `SheetContent` renders its own X at `right-4 top-4`, so
 * this sheet had that one AND the header's — two X's stacked in the corner. The
 * built-in is a bare 16px icon with no padding; the header's is a real 44px
 * target aligned with the search field, so the built-in is suppressed with
 * `hideCloseButton`.
 *
 * ONE COLUMN ON A 2400px DESKTOP. Rows spanned the full width with the label
 * marooned at the far left and about 1800px of nothing to its right, and only
 * eleven of the 63 fitted on screen. The list is capped and centred, and lays
 * out in columns from `md:` up — the whole point is to see your options.
 *
 * NO KEYBOARD. A search-first picker that you cannot drive from the keyboard
 * makes you type, then reach for the mouse. Up/Down move, Enter picks, and
 * typing resets to the first match, so "volt" + Enter opens Voltage Drop.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import {
  CALCULATORS,
  CALCULATOR_CATEGORIES,
  CALCULATOR_BY_SLUG,
  searchCalculators,
  type CalculatorEntry,
} from '@/data/calculators';

interface Props {
  value: string;
  onChange: (slug: string) => void;
}

export function CalculatorPicker({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const haptic = useHaptic();

  const current = CALCULATOR_BY_SLUG.get(value) ?? CALCULATORS[0];
  const results = useMemo(() => searchCalculators(query), [query]);

  // Group the (already filtered) results, preserving category order.
  const grouped = useMemo(() => {
    const map = new Map<string, CalculatorEntry[]>();
    for (const c of results) {
      const list = map.get(c.category) ?? [];
      list.push(c);
      map.set(c.category, list);
    }
    return CALCULATOR_CATEGORIES.filter((c) => map.has(c)).map((c) => ({
      category: c,
      items: map.get(c)!,
    }));
  }, [results]);

  // Browsing and searching want different orders. With no query, group by
  // category — that is how you scan a list you don't know. With a query,
  // show best-match-first and never regroup, because grouping would throw the
  // ranking away and put a keyword match above the tool you named.
  const searching = query.trim().length > 0;

  // Keyboard order must follow what the eye sees.
  const flat = useMemo(
    () => (searching ? results : grouped.flatMap((g) => g.items)),
    [searching, results, grouped]
  );

  // Focus the search on open — the whole point is that you type rather than
  // scroll. Delayed a frame so the sheet's own focus trap doesn't fight it.
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 60);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) {
      setQuery('');
      setCursor(0);
    }
  }, [open]);

  // A new query invalidates the old position — always land on the first match.
  useEffect(() => setCursor(0), [query]);

  const pick = useCallback(
    (slug: string) => {
      haptic.light();
      onChange(slug);
      setOpen(false);
    },
    [haptic, onChange]
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!flat.length) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      setCursor((c) => {
        const next = e.key === 'ArrowDown' ? c + 1 : c - 1;
        return (next + flat.length) % flat.length;
      });
    } else if (e.key === 'Enter') {
      e.preventDefault();
      pick(flat[cursor].value);
    }
  };

  // Keep the highlighted row on screen while arrowing through 63 of them.
  useEffect(() => {
    listRef.current?.querySelector(`[data-idx="${cursor}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [cursor]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          'group relative flex w-full items-center gap-3 overflow-hidden rounded-2xl border text-left',
          'border-elec-yellow/35 px-4 py-3 sm:px-5',
          CARD_SURFACE,
          'transition-[background-image,border-color,transform] duration-150 ease-out',
          'hover:border-elec-yellow/60 active:scale-[0.99] touch-manipulation',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/60'
        )}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/55 to-elec-yellow/0"
        />
        <span className="min-w-0 flex-1">
          <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">
            {current.category}
          </span>
          <span className="mt-0.5 block truncate text-[16px] font-semibold leading-tight tracking-tight text-white">
            {current.label}
          </span>
        </span>
        <span className="flex shrink-0 items-center gap-1.5 text-[12.5px] font-semibold text-white">
          <Search className="h-4 w-4" aria-hidden />
          <span className="hidden sm:inline">Change</span>
        </span>
      </button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="bottom"
          hideCloseButton
          className="flex h-[85vh] flex-col rounded-t-2xl border-white/[0.14] bg-[hsl(0_0%_9%)] p-0"
        >
          {/* Capped and centred: on a wide monitor a full-bleed list strands
              every label at the far left of a 2400px row. */}
          <div className="mx-auto flex h-full w-full max-w-5xl flex-col" onKeyDown={onKeyDown}>
            <div className="shrink-0 border-b border-white/[0.10] p-4">
              <div className="flex items-center gap-2">
                <div className="relative min-w-0 flex-1">
                  <Search
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white"
                    aria-hidden
                  />
                  {/* 16px — anything smaller and iOS zooms the page on focus. */}
                  <input
                    ref={inputRef}
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search — volt drop, Zs, adiabatic, kVAr…"
                    aria-label="Search calculators"
                    className={cn(
                      'h-11 w-full rounded-xl border border-white/[0.18] bg-white/[0.06] pl-9 pr-3',
                      'text-[16px] text-white placeholder:text-white/50 caret-elec-yellow',
                      'focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation'
                    )}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white touch-manipulation hover:bg-white/[0.08]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <p className="mt-2 text-[11px] tabular-nums text-white">
                {query
                  ? `${results.length} of ${CALCULATORS.length} calculators`
                  : `${CALCULATORS.length} calculators`}
                <span className="ml-2 hidden sm:inline text-white">↑↓ to move · Enter to open</span>
              </p>
            </div>

            <div ref={listRef} className="min-h-0 flex-1 overflow-y-auto px-2 pb-4">
              {flat.length === 0 ? (
                <p className="px-4 py-10 text-center text-[13px] text-white">
                  Nothing matches “{query}”.
                </p>
              ) : searching ? (
                // Ranked, best first. The category rides along on the right so
                // you still know what you are picking without it dictating order.
                <div className="grid grid-cols-1 gap-x-3 pt-2 md:grid-cols-2 xl:grid-cols-3">
                  {flat.map((c, idx) => (
                    <Row
                      key={c.value}
                      entry={c}
                      idx={idx}
                      active={c.value === value}
                      focused={idx === cursor}
                      showCategory
                      onHover={setCursor}
                      onPick={pick}
                    />
                  ))}
                </div>
              ) : (
                grouped.map((group) => (
                  <div key={group.category}>
                    <div className="sticky top-0 z-10 bg-[hsl(0_0%_9%_/_0.95)] px-2 pb-2 pt-3.5 backdrop-blur-sm">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">
                        {group.category}
                      </p>
                    </div>
                    {/* Columns from md: up — 63 items one-per-row is a scroll,
                        not a menu. */}
                    <div className="grid grid-cols-1 gap-x-3 md:grid-cols-2 xl:grid-cols-3">
                      {group.items.map((c) => {
                        const idx = flat.indexOf(c);
                        return (
                          <Row
                            key={c.value}
                            entry={c}
                            idx={idx}
                            active={c.value === value}
                            focused={idx === cursor}
                            onHover={setCursor}
                            onPick={pick}
                          />
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

/** One calculator in the list. Same row whether grouped or ranked. */
function Row({
  entry,
  idx,
  active,
  focused,
  showCategory = false,
  onHover,
  onPick,
}: {
  entry: CalculatorEntry;
  idx: number;
  active: boolean;
  focused: boolean;
  showCategory?: boolean;
  onHover: (i: number) => void;
  onPick: (slug: string) => void;
}) {
  return (
    <button
      type="button"
      data-idx={idx}
      onClick={() => onPick(entry.value)}
      onMouseEnter={() => onHover(idx)}
      className={cn(
        'flex min-h-11 w-full items-center gap-2.5 rounded-lg px-2 py-2.5 text-left',
        'transition-colors touch-manipulation focus:outline-none',
        focused ? 'bg-white/[0.09]' : 'hover:bg-white/[0.06]'
      )}
    >
      <span
        aria-hidden
        className={cn(
          'h-6 w-[3px] shrink-0 rounded-full',
          active ? 'bg-elec-yellow' : 'bg-transparent'
        )}
      />
      <span className="min-w-0 flex-1">
        <span
          className={cn(
            'block truncate text-[14.5px] leading-tight',
            active ? 'font-semibold text-elec-yellow' : 'font-medium text-white'
          )}
        >
          {entry.label}
        </span>
        {showCategory && (
          <span className="mt-0.5 block truncate text-[11px] leading-tight text-white">
            {entry.category}
          </span>
        )}
      </span>
    </button>
  );
}

export default CalculatorPicker;
