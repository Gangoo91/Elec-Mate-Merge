import { useMemo, useState } from 'react';
import { Check, ChevronDown, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { inputCn } from '@/components/forms/fieldStyles';
import { chipCn } from '@/components/college/ui/CollegeUi';
import {
  STATE_CHIP,
  STATE_LABEL,
  usePortfolioAcState,
  type AcStateRow,
} from '@/hooks/portfolio/usePortfolioAcState';

/* ==========================================================================
   CriteriaPicker — tick the criteria you saw, from the learner's own
   catalogue (get_portfolio_ac_state), never typed codes. Each row shows where
   that criterion stands now, so a tutor does not re-observe something passed.

   Units fold; a search opens every unit that matches. The ticked set sits on
   top as removable chips.
   ========================================================================== */

export interface PickedCriterion {
  unit_code: string;
  ac_code: string;
}

const k = (c: PickedCriterion) => `${c.unit_code}::${c.ac_code}`;
const OPEN_STATES = new Set([
  'not_started',
  'suggested',
  'claimed',
  'submitted',
  'referred',
  'not_yet',
  'iqa_rejected',
]);

export function CriteriaPicker({
  learnerUserId,
  value,
  onChange,
  verb = 'saw',
}: {
  learnerUserId: string;
  value: PickedCriterion[];
  onChange: (next: PickedCriterion[]) => void;
  /** "saw" for an observation, "discussed" for a professional discussion. */
  verb?: string;
}) {
  const { units, loading, error } = usePortfolioAcState(learnerUserId);
  const [q, setQ] = useState('');
  const [scope, setScope] = useState<'open' | 'all'>('open');
  const [openUnit, setOpenUnit] = useState<string | null>(null);
  const picked = useMemo(() => new Set(value.map(k)), [value]);
  const byKey = useMemo(() => {
    const m = new Map<string, AcStateRow>();
    units.forEach((u) => u.rows.forEach((r) => m.set(k(r), r)));
    return m;
  }, [units]);

  const t = q.trim().toLowerCase();
  const shown = useMemo(
    () =>
      units
        .map((u) => ({
          ...u,
          shown: u.rows.filter(
            (r) =>
              (scope === 'all' || t || OPEN_STATES.has(r.state) || picked.has(k(r))) &&
              (!t ||
                `${u.unit_code} ${u.unit_title} ac ${r.ac_code} ${r.ac_text ?? ''}`
                  .toLowerCase()
                  .includes(t))
          ),
        }))
        .filter((u) => u.shown.length > 0),
    [units, scope, t, picked]
  );

  const toggle = (r: AcStateRow) => {
    const key = k(r);
    onChange(
      picked.has(key)
        ? value.filter((c) => k(c) !== key)
        : [...value, { unit_code: r.unit_code, ac_code: r.ac_code }]
    );
  };

  if (loading && units.length === 0) {
    return (
      <div className="space-y-2" aria-busy>
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-14 animate-pulse rounded-2xl bg-white/[0.05]" />
        ))}
      </div>
    );
  }
  if (error) {
    return <p className="text-[13px] text-white">Could not load the criteria: {error}</p>;
  }
  if (units.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-white/[0.2] p-4 text-[13px] text-white">
        This learner has no qualification set, so there are no criteria to tick. Set their course in
        Student 360, then come back.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {value.length > 0 && (
        <div className="flex flex-wrap gap-1.5" aria-label="Ticked criteria">
          {value.map((c) => {
            const row = byKey.get(k(c));
            return (
              <button
                key={k(c)}
                type="button"
                onClick={() => onChange(value.filter((x) => k(x) !== k(c)))}
                className="inline-flex h-11 items-center gap-1.5 rounded-full border border-elec-yellow bg-elec-yellow px-3 text-[12.5px] font-semibold text-black touch-manipulation"
                title={row?.ac_text ?? undefined}
                aria-label={`Remove ${c.unit_code} AC ${c.ac_code}`}
              >
                {c.unit_code} AC {c.ac_code}
                <X className="h-3.5 w-3.5" aria-hidden />
              </button>
            );
          })}
        </div>
      )}

      <div className="relative">
        <Search
          className="pointer-events-none absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2 text-white"
          aria-hidden
        />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={`Find what you ${verb}: "ring final", "302 AC 3.1"`}
          aria-label="Search criteria"
          className={cn(inputCn, 'pl-7')}
          enterKeyHint="search"
        />
      </div>
      {!t && (
        <div className="flex gap-2">
          <button
            type="button"
            className={chipCn(scope === 'open')}
            onClick={() => setScope('open')}
          >
            Not passed yet
          </button>
          <button type="button" className={chipCn(scope === 'all')} onClick={() => setScope('all')}>
            All criteria
          </button>
        </div>
      )}

      {shown.length === 0 ? (
        <p className="py-3 text-[13px] text-white">
          {t ? `Nothing matches "${q.trim()}".` : 'Every criterion is passed.'}
        </p>
      ) : (
        <ul className="space-y-2">
          {shown.map((u) => {
            const isOpen = !!t || openUnit === u.unit_code || shown.length === 1;
            const ticked = u.rows.filter((r) => picked.has(k(r))).length;
            return (
              <li
                key={u.unit_code}
                className="overflow-hidden rounded-2xl border border-white/[0.1] bg-white/[0.03]"
              >
                <button
                  type="button"
                  onClick={() => setOpenUnit(isOpen && !t ? null : u.unit_code)}
                  aria-expanded={isOpen}
                  className="flex min-h-[56px] w-full items-center gap-3 px-4 py-2.5 text-left touch-manipulation"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block text-[12px] font-semibold text-elec-yellow">
                      Unit {u.unit_code}
                    </span>
                    <span className="block truncate text-[14px] font-semibold text-white">
                      {u.unit_title}
                    </span>
                  </span>
                  <span className="shrink-0 text-[12px] tabular-nums text-white">
                    {ticked > 0 ? `${ticked} ticked` : `${u.passed}/${u.total} passed`}
                  </span>
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 shrink-0 text-white transition-transform',
                      isOpen && 'rotate-180'
                    )}
                    aria-hidden
                  />
                </button>
                {isOpen && (
                  <ul className="divide-y divide-white/[0.06] border-t border-white/[0.08]">
                    {u.shown.map((r) => {
                      const on = picked.has(k(r));
                      return (
                        <li key={k(r)}>
                          <button
                            type="button"
                            role="checkbox"
                            aria-checked={on}
                            onClick={() => toggle(r)}
                            className={cn(
                              'flex min-h-[56px] w-full items-start gap-3 px-4 py-3 text-left transition-colors touch-manipulation',
                              on ? 'bg-white/[0.06]' : 'active:bg-white/[0.06]'
                            )}
                          >
                            <span
                              aria-hidden
                              className={cn(
                                'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2',
                                on
                                  ? 'border-elec-yellow bg-elec-yellow text-black'
                                  : 'border-white/40'
                              )}
                            >
                              {on && <Check className="h-4 w-4" strokeWidth={3} />}
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="flex flex-wrap items-center gap-1.5">
                                <span className="font-mono text-[12.5px] font-semibold text-white">
                                  AC {r.ac_code}
                                </span>
                                {r.state !== 'not_started' && (
                                  <span
                                    className={cn(
                                      'rounded-full border px-2 py-0.5 text-[12px] font-medium',
                                      STATE_CHIP[r.state]
                                    )}
                                  >
                                    {STATE_LABEL[r.state]}
                                  </span>
                                )}
                              </span>
                              <span className="mt-0.5 block text-[13.5px] leading-snug text-white">
                                {r.ac_text}
                              </span>
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
