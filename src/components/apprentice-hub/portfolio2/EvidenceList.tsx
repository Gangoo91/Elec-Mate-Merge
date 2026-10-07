/**
 * The evidence list on the portfolio home (ELE-1892): every item as a card
 * with its picture, its honest state, how its criteria stand (claimed ·
 * submitted · passed · needs more) and the one next step. One toolbar row on
 * desktop (search, state, unit); tapping a card opens the evidence detail,
 * the single place to act on it.
 *
 * Phone: cards stack edge to edge. Desktop: a grid that grows with the width.
 */
import { useMemo, useState } from 'react';
import { ArrowRight, Eye, FileText, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EvidenceImage } from '@/components/shared/EvidenceImage';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import type { ItemState, PortfolioItemView } from '@/hooks/portfolio/usePortfolio';
import { ITEM_STATE_CHIP, P_INPUT, fmtDate, itemStateLabel, pChip } from './ui';

type Filter = 'all' | 'todo' | ItemState;

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'todo', label: 'Needs a step from you' },
  { key: 'needs_more', label: 'Needs more' },
  { key: 'submitted', label: 'With your assessor' },
  { key: 'passed', label: 'Passed' },
  { key: 'draft', label: 'Not claimed yet' },
];

/** Criteria on one item as a stacked bar: passed · with assessor · needs more · claimed. */
function CriteriaBar({ item }: { item: PortfolioItemView }) {
  const c = item.counts;
  const claimedOnly = Math.max(0, c.claimed - c.passed - c.submitted - c.needsMore);
  const total = c.passed + c.submitted + c.needsMore + claimedOnly + c.suggested;
  if (total === 0) return null;
  const seg = (n: number, cls: string, label: string) =>
    n > 0 ? <span key={label} className={cls} style={{ width: `${(n / total) * 100}%` }} title={`${n} ${label}`} /> : null;
  return (
    <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-white/[0.08]" aria-hidden>
      {seg(c.passed, 'bg-emerald-400', 'passed')}
      {seg(c.submitted, 'bg-sky-400', 'with your assessor')}
      {seg(c.needsMore, 'bg-orange-400', 'needs more')}
      {seg(claimedOnly, 'bg-white/70', 'claimed')}
      {seg(c.suggested, 'bg-white/[0.25]', 'suggested')}
    </div>
  );
}

function criteriaLine(item: PortfolioItemView): string {
  const c = item.counts;
  const parts: string[] = [];
  if (c.passed) parts.push(`${c.passed} passed`);
  if (c.submitted) parts.push(`${c.submitted} with your assessor`);
  if (c.needsMore) parts.push(`${c.needsMore} need more`);
  const claimedOnly = Math.max(0, c.claimed - c.passed - c.submitted - c.needsMore);
  if (claimedOnly) parts.push(`${claimedOnly} claimed`);
  if (c.suggested) parts.push(`${c.suggested} suggested`);
  return parts.length ? parts.join(' · ') : 'No criteria yet';
}

export function EvidenceCard({ item, onOpen }: { item: PortfolioItemView; onOpen: (i: PortfolioItemView) => void }) {
  const files = item.files.length;
  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className={cn(
        'group -mx-4 flex h-full w-[calc(100%+2rem)] flex-col overflow-hidden border-y border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] text-left transition-colors touch-manipulation',
        'hover:border-white/[0.2] active:bg-white/[0.06] sm:mx-0 sm:w-full sm:rounded-3xl sm:border-x',
        item.state === 'needs_more' && 'border-orange-400/40 sm:border-orange-400/40'
      )}
    >
      <div className="flex gap-4 p-4 sm:p-5">
        <div className="relative h-[84px] w-[84px] shrink-0 overflow-hidden rounded-2xl bg-white/[0.06] sm:h-24 sm:w-24">
          {item.thumbnail ? (
            <EvidenceImage src={item.thumbnail} alt="" className="h-full w-full object-cover" loading="lazy" />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              {item.observation ? <Eye className="h-6 w-6 text-white" /> : <FileText className="h-6 w-6 text-white" />}
            </div>
          )}
          {files > 1 && (
            <span className="absolute bottom-1.5 right-1.5 rounded-full bg-black/70 px-1.5 py-0.5 text-[10.5px] font-semibold tabular-nums text-white">
              {files}
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex items-start justify-between gap-3">
            <p className="min-w-0 line-clamp-2 text-[15px] font-semibold leading-snug text-white">{item.title}</p>
            <span className={cn('hidden shrink-0 rounded-full border px-2 py-0.5 text-[11px] font-semibold sm:inline-flex', ITEM_STATE_CHIP[item.state])}>
              {itemStateLabel(item)}
            </span>
          </div>
          <span className={cn('inline-flex rounded-full border px-2 py-0.5 text-[11px] font-semibold sm:hidden', ITEM_STATE_CHIP[item.state])}>
            {itemStateLabel(item)}
          </span>
          <p className="text-[12.5px] text-white">
            {fmtDate(item.workDate ?? item.createdAt)}
            {item.units.length > 0 && ` · Unit ${item.units.slice(0, 3).join(', ')}${item.units.length > 3 ? ' and more' : ''}`}
          </p>
          <CriteriaBar item={item} />
          <p className="text-[12.5px] leading-snug text-white">{criteriaLine(item)}</p>
          {(item.observation || item.witnessed || item.witnessPending) && (
            <div className="flex flex-wrap gap-1.5">
              {item.observation && (
                <span className="inline-flex items-center rounded-full border border-sky-400/40 px-2 py-0.5 text-[11px] font-semibold text-sky-200">
                  {item.observation.kind === 'professional_discussion' ? 'Discussed with' : 'Observed by'}{' '}
                  {item.observation.observer_name}
                </span>
              )}
              {item.witnessed && (
                <span className="inline-flex items-center rounded-full border border-emerald-400/40 px-2 py-0.5 text-[11px] font-semibold text-emerald-300">
                  Witnessed
                </span>
              )}
              {!item.witnessed && item.witnessPending && (
                <span className="inline-flex items-center rounded-full border border-white/[0.16] px-2 py-0.5 text-[11px] font-semibold text-white">
                  Witness asked
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      <div
        className={cn(
          'mt-auto flex min-h-[48px] items-center justify-between gap-3 border-t border-white/[0.06] px-4 text-[13px] font-semibold sm:px-5',
          item.next.actionable ? 'text-elec-yellow' : 'text-white'
        )}
      >
        <span className="min-w-0 truncate">
          {item.next.actionable ? 'Next: ' : ''}
          {item.next.label}
        </span>
        {item.next.actionable && <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />}
      </div>
    </button>
  );
}

export function EvidenceList({
  items,
  onOpen,
}: {
  items: PortfolioItemView[];
  onOpen: (i: PortfolioItemView) => void;
}) {
  const [filter, setFilter] = useState<Filter>('all');
  const [unit, setUnit] = useState<string>('all');
  const [q, setQ] = useState('');

  const units = useMemo(
    () =>
      [...new Set(items.flatMap((i) => i.units))].sort((a, b) => a.localeCompare(b, undefined, { numeric: true })),
    [items]
  );

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: items.length, todo: 0 };
    for (const i of items) {
      c[i.state] = (c[i.state] ?? 0) + 1;
      if (i.next.actionable) c.todo += 1;
    }
    return c;
  }, [items]);

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return items.filter((i) => {
      const inFilter =
        filter === 'all' ||
        (filter === 'todo'
          ? i.next.actionable
          : filter === 'draft'
            ? // "Not claimed yet" also covers items with only AI suggestions.
              i.state === 'draft' || i.state === 'suggested'
            : i.state === filter);
      if (!inFilter) return false;
      if (unit !== 'all' && !i.units.includes(unit)) return false;
      if (
        needle &&
        !`${i.title} ${i.description} ${i.claimed.map((c) => `${c.unit_code} ac ${c.ac_code}`).join(' ')}`
          .toLowerCase()
          .includes(needle)
      )
        return false;
      return true;
    });
  }, [items, filter, unit, q]);

  const filterCount = (k: Filter) => (k === 'draft' ? (counts.draft ?? 0) + (counts.suggested ?? 0) : counts[k] ?? 0);
  const filtered = filter !== 'all' || unit !== 'all' || q.trim() !== '';

  return (
    <div className="space-y-4">
      {/* One toolbar: search · state · unit. Chips scroll on a phone, never wrap to two rows. */}
      <div className="flex flex-col gap-3 2xl:flex-row 2xl:items-center">
        <div className="flex items-center gap-3 lg:max-w-xl 2xl:w-[300px] 2xl:shrink-0">
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-1 top-3.5 h-4 w-4 text-white" />
            <input
              className={cn(P_INPUT, 'pl-7 pr-9')}
              placeholder="Search evidence"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="Search evidence"
            />
            {q && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => setQ('')}
                className="absolute right-0 top-0 inline-flex h-11 w-11 items-center justify-center text-white touch-manipulation"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          {units.length > 1 && (
            <div className="w-[132px] shrink-0 sm:w-[180px] 2xl:hidden">
              <UnitPicker units={units} unit={unit} onChange={setUnit} />
            </div>
          )}
        </div>
        <div
          className="-mx-4 flex min-w-0 flex-1 gap-2 overflow-x-auto px-4 pb-1 scrollbar-hide sm:mx-0 sm:px-0"
          role="group"
          aria-label="Filter pieces of evidence by state"
        >
          <span className="hidden shrink-0 self-center text-[12px] font-medium text-white sm:inline">
            Evidence
          </span>
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              className={cn(pChip(filter === f.key), 'h-11 whitespace-nowrap')}
              onClick={() => setFilter(f.key)}
              aria-pressed={filter === f.key}
            >
              {f.label}
              <span className="ml-1.5 tabular-nums">{filterCount(f.key)}</span>
            </button>
          ))}
        </div>
        {units.length > 1 && (
          <div className="hidden w-[170px] shrink-0 2xl:block">
            <UnitPicker units={units} unit={unit} onChange={setUnit} />
          </div>
        )}
      </div>

      {filtered && (
        <p className="text-[12.5px] text-white">
          Showing {shown.length} of {items.length}.{' '}
          <button
            type="button"
            className="font-semibold text-elec-yellow touch-manipulation"
            onClick={() => {
              setFilter('all');
              setUnit('all');
              setQ('');
            }}
          >
            Clear filters
          </button>
        </p>
      )}

      {shown.length === 0 ? (
        <p className="rounded-3xl border border-dashed border-white/[0.2] p-6 text-[14px] text-white">
          Nothing matches. Clear the filters to see all {items.length} pieces of evidence.
        </p>
      ) : (
        <ul className="grid grid-cols-1 gap-3 lg:grid-cols-2 2xl:grid-cols-3">
          {shown.map((i) => (
            <li key={i.id} className="min-w-0">
              <EvidenceCard item={i} onOpen={onOpen} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function UnitPicker({ units, unit, onChange }: { units: string[]; unit: string; onChange: (u: string) => void }) {
  return (
    <MobileSelectPicker
      value={unit}
      onValueChange={onChange}
      title="Filter by unit"
      options={[{ value: 'all', label: 'All units' }, ...units.map((u) => ({ value: u, label: `Unit ${u}` }))]}
    />
  );
}
