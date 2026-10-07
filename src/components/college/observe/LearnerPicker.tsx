import { useMemo, useState, type ReactNode } from 'react';
import { ChevronRight, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { inputCn } from '@/components/forms/fieldStyles';
import { chipCn } from '@/components/college/ui/CollegeUi';
import { useCollegeLearners, type PickerLearner } from './useCollegeLearners';

/* ==========================================================================
   LearnerPicker — "who?" for the workshop flows. Big rows (56px) for a
   gloved thumb, the tutor's own cohorts first, a search that matches first
   name, surname or cohort. Inline, so it lives inside whichever sheet asks.
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

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="pointer-events-none absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2 text-white" aria-hidden />
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
      {hasMine && !q.trim() && (
        <div className="flex gap-2">
          <button type="button" className={chipCn(effectiveScope === 'mine')} onClick={() => setScope('mine')}>
            My cohorts
          </button>
          <button type="button" className={chipCn(effectiveScope === 'all')} onClick={() => setScope('all')}>
            Everyone
          </button>
        </div>
      )}

      {isLoading ? (
        <ul className="space-y-2" aria-busy>
          {[0, 1, 2, 3].map((i) => (
            <li key={i} className="h-14 animate-pulse rounded-2xl bg-white/[0.05]" />
          ))}
        </ul>
      ) : error ? (
        <p className="text-[13px] text-white">Could not load your learners. Check your connection and try again.</p>
      ) : shown.length === 0 ? (
        <p className="py-4 text-[13px] text-white">
          {q.trim() ? `No learner matches "${q.trim()}".` : (emptyHint ?? 'No learners yet.')}
        </p>
      ) : (
        <ul className="-mx-1 divide-y divide-white/[0.06]">
          {shown.map((l) => {
            const blocked = requireAccount && !l.user_id;
            return (
              <li key={l.id}>
                <button
                  type="button"
                  onClick={() => !blocked && onPick(l)}
                  aria-disabled={blocked}
                  className={cn(
                    'flex min-h-[56px] w-full items-center gap-3 rounded-xl px-1 py-2 text-left transition-colors touch-manipulation',
                    blocked ? 'cursor-not-allowed' : 'hover:bg-white/[0.04] active:bg-white/[0.08]'
                  )}
                >
                  <span
                    aria-hidden
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/[0.14] bg-white/[0.06] text-[13px] font-semibold text-white"
                  >
                    {initials(l.name)}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[15px] font-semibold text-white">{l.name}</span>
                    <span className="block truncate text-[12px] text-white">
                      {blocked ? 'Not joined Elec-Mate yet' : (l.cohort_name ?? 'No cohort')}
                    </span>
                  </span>
                  {trailing?.(l)}
                  {!blocked && <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
