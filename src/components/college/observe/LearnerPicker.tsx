import { useMemo, useState, type ReactNode } from 'react';
import { ChevronRight, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { inputCn } from '@/components/forms/fieldStyles';
import { useCollegeLearners, type PickerLearner } from './useCollegeLearners';

/* ==========================================================================
   LearnerPicker — "who?" for the workshop flows. Learner cards grouped by
   cohort (the tutor's own first), one column on a phone and up to four
   across on a wide screen (10 Oct: a narrow centred list on a full-width
   sheet). A search that matches first name, surname or cohort. Inline, so
   it lives inside whichever sheet asks.
   ========================================================================== */

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('');

export function LearnerPicker({
  onPick,
  trailing,
  emptyHint,
  requireAccount = false,
  autoFocus = false,
}: {
  onPick: (learner: PickerLearner) => void;
  /** Right of a row, e.g. "3 ready". */
  trailing?: (learner: PickerLearner) => ReactNode;
  emptyHint?: string;
  /** Learners without an Elec-Mate account cannot be picked (shown, greyed out of the flow). */
  requireAccount?: boolean;
  autoFocus?: boolean;
}) {
  const { data: learners = [], isLoading, error } = useCollegeLearners();
  const [q, setQ] = useState('');
  const [scope, setScope] = useState<'mine' | 'all'>('mine');
  const hasMine = learners.some((l) => l.mine);
  const effectiveScope = hasMine ? scope : 'all';

  const shown = useMemo(() => {
    const t = q.trim().toLowerCase();
    return learners
      .filter((l) => (effectiveScope === 'mine' && !t ? l.mine : true))
      .filter((l) => !t || `${l.name} ${l.cohort_name ?? ''}`.toLowerCase().includes(t))
      .slice(0, 200);
  }, [learners, q, effectiveScope]);

  // Not searching: grouped by cohort, the tutor's own cohorts first (the
  // hook already orders them). Searching: one flat grid with the cohort on
  // each card.
  const searching = q.trim().length > 0;
  const groups = useMemo(() => {
    const out: { name: string; learners: PickerLearner[] }[] = [];
    const ordered = [...shown].sort(
      (a, b) =>
        Number(b.mine) - Number(a.mine) ||
        (a.cohort_name ?? '~').localeCompare(b.cohort_name ?? '~') ||
        a.name.localeCompare(b.name)
    );
    for (const l of ordered) {
      const name = l.cohort_name ?? 'No cohort';
      const g = out.find((x) => x.name === name);
      if (g) g.learners.push(l);
      else out.push({ name, learners: [l] });
    }
    return out;
  }, [shown]);

  const card = (l: PickerLearner, showCohort: boolean) => {
    const blocked = requireAccount && !l.user_id;
    return (
      <li key={l.id}>
        <button
          type="button"
          onClick={() => !blocked && onPick(l)}
          aria-disabled={blocked}
          className={cn(
            'flex h-full min-h-[64px] w-full items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-2.5 text-left transition-colors touch-manipulation',
            blocked
              ? 'cursor-not-allowed'
              : 'hover:border-white/[0.22] hover:bg-white/[0.06] active:bg-white/[0.09]'
          )}
        >
          <span
            aria-hidden
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-[13px] font-semibold text-white"
          >
            {initials(l.name)}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[15px] font-semibold text-white">{l.name}</span>
            {(blocked || showCohort) && (
              <span className="block truncate text-[12.5px] text-white">
                {blocked ? 'Not joined Elec-Mate yet' : (l.cohort_name ?? 'No cohort')}
              </span>
            )}
          </span>
          {trailing?.(l)}
          {!blocked && <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden />}
        </button>
      </li>
    );
  };

  const gridCn = 'grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4';

  return (
    <div className="space-y-5">
      {/* Search across the full width, the scope beside it on a wide screen. */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative min-w-0 flex-1">
          <Search
            className="pointer-events-none absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2 text-white"
            aria-hidden
          />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search learners or cohorts"
            aria-label="Search learners"
            autoFocus={autoFocus}
            className={cn(inputCn, 'pl-7')}
            enterKeyHint="search"
          />
        </div>
        {hasMine && !searching && (
          <div
            role="radiogroup"
            aria-label="Whose learners"
            className="inline-flex shrink-0 rounded-xl border border-white/[0.12] bg-white/[0.03] p-0.5"
          >
            {(
              [
                ['mine', 'My cohorts'],
                ['all', 'Everyone'],
              ] as const
            ).map(([v, label]) => (
              <button
                key={v}
                type="button"
                role="radio"
                aria-checked={effectiveScope === v}
                onClick={() => setScope(v)}
                className={cn(
                  'h-11 flex-1 rounded-[10px] px-4 text-[13.5px] font-semibold transition-colors touch-manipulation',
                  effectiveScope === v ? 'bg-white text-black' : 'text-white hover:bg-white/[0.06]'
                )}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>

      {isLoading ? (
        <ul className={gridCn} aria-busy>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <li key={i} className="h-16 animate-pulse rounded-xl bg-white/[0.05]" />
          ))}
        </ul>
      ) : error ? (
        <p className="text-[13px] text-white">
          Could not load your learners. Check your connection and try again.
        </p>
      ) : shown.length === 0 ? (
        <p className="py-4 text-[13px] text-white">
          {searching ? `No learner matches "${q.trim()}".` : (emptyHint ?? 'No learners yet.')}
        </p>
      ) : searching ? (
        <ul className={gridCn}>{shown.map((l) => card(l, true))}</ul>
      ) : (
        <div className="space-y-5">
          {groups.map((g) => (
            <section key={g.name} aria-label={g.name} className="space-y-2.5">
              <h3 className="flex items-baseline gap-2 text-[14px] font-semibold text-white">
                {g.name}
                <span className="text-[12.5px] font-medium tabular-nums">
                  {g.learners.length} {g.learners.length === 1 ? 'learner' : 'learners'}
                </span>
              </h3>
              <ul className={gridCn}>{g.learners.map((l) => card(l, false))}</ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
