import React from 'react';
import { Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { QuoteItem } from '@/types/quote';
import { isDerivedLabour, totalAllowanceHours } from '@/utils/timeAllowance';
import {
  rateForGrade,
  DEFAULT_LABOUR_GRADE,
  LABOUR_GRADES,
  shortGradeLabel,
} from '@/utils/labourGrades';

/**
 * Time allowance on a quote line — ELE-1780.
 *
 * Andrew: *"Is there a way, when you're doing a quote, to allocate time per
 * item instead of trying to guess a time in labour?"*
 *
 * One component for the desktop list and the mobile card, so the two cannot
 * drift — the same reason `shared/surfaces.ts` exists.
 *
 * Renders nothing on a labour line (its hours ARE the labour) or on a derived
 * line (that IS the labour). Offering the field there would invite the double
 * charge the whole feature is built to avoid.
 *
 * MULTIPLE TRADES per line, because real jobs are not one trade: a board
 * change is an electrician and an apprentice on site together, and pricing it
 * at one rate is wrong whichever rate you pick. `labourLinesFor` has emitted
 * one line per grade since ELE-1470; this is the UI catching up with it.
 */

const QUICK_PICKS = [0.25, 0.5, 1, 2];

type Allocation = { grade: string; hours: number };

interface Props {
  item: QuoteItem;
  onUpdate: (itemId: string, updates: Partial<QuoteItem>) => void;
  /** company_profiles.worker_rates */
  workerRates?: object | null;
  /** company_profiles.hourly_rate */
  hourlyRate?: number | null;
  className?: string;
}

const fmtHours = (h: number) => `${Number(h.toFixed(2))}h`;
const gbp = (n: number) =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(n);

export const TimeAllowanceField: React.FC<Props> = ({
  item,
  onUpdate,
  workerRates,
  hourlyRate,
  className,
}) => {
  if (item.category === 'labour' || isDerivedLabour(item)) return null;

  const allocations: Allocation[] = item.timeAllowance ?? [];
  const quantity = Number(item.quantity) || 0;
  const sources = { workerRates, hourlyRate };

  const commit = (next: Allocation[]) => {
    const cleaned = next.filter((a) => a.hours > 0);
    onUpdate(item.id, { timeAllowance: cleaned.length > 0 ? cleaned : undefined });
  };

  const setAt = (i: number, patch: Partial<Allocation>) =>
    commit(allocations.map((a, n) => (n === i ? { ...a, ...patch } : a)));

  /** Grades not already on this line — a trade cannot be added twice. */
  const unusedGrades = LABOUR_GRADES.filter(
    (g) => !allocations.some((a) => a.grade === g.id)
  );

  const addTrade = () => {
    const next = unusedGrades[0]?.id ?? DEFAULT_LABOUR_GRADE;
    commit([...allocations, { grade: next, hours: 0.5 }]);
  };

  const totalHours = totalAllowanceHours(item) * quantity;
  const totalCost = allocations.reduce(
    (sum, a) => sum + a.hours * quantity * rateForGrade(a.grade, sources),
    0
  );
  const anyUnrated = allocations.some(
    (a) => a.hours > 0 && rateForGrade(a.grade, sources) <= 0
  );

  return (
    <div className={cn('pt-2', className)}>
      {allocations.length === 0 ? (
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[12px] font-medium text-white mr-1">Time each</span>
          {QUICK_PICKS.map((h) => (
            <button
              key={h}
              type="button"
              onClick={() => commit([{ grade: DEFAULT_LABOUR_GRADE, hours: h }])}
              aria-label={`Add a ${h} hour allowance`}
              className="h-11 min-w-[52px] rounded-lg bg-white/[0.06] px-2 text-[13px] font-semibold text-white hover:bg-white/[0.1] touch-manipulation transition-colors"
            >
              {h}h
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-1.5">
          {allocations.map((a, i) => {
            const rate = rateForGrade(a.grade, sources);
            return (
              <div key={`${a.grade}-${i}`} className="flex items-center gap-2">
                <input
                  type="text"
                  inputMode="decimal"
                  defaultValue={String(a.hours)}
                  aria-label={`Hours per unit, ${shortGradeLabel(a.grade)}`}
                  onBlur={(e) => {
                    // ELE-974 — iOS UK keyboards put a comma on the decimal key.
                    const parsed = parseFloat(e.target.value.replace(',', '.'));
                    setAt(i, { hours: isNaN(parsed) || parsed < 0 ? 0 : parsed });
                  }}
                  className="input-underline h-11 w-16 rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-center text-[15px] font-medium text-white caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation"
                />
                <span className="text-[12px] text-white shrink-0">hrs</span>
                <select
                  value={a.grade}
                  aria-label={`Trade for this allowance on ${item.description || 'this item'}`}
                  onChange={(e) => setAt(i, { grade: e.target.value })}
                  className="h-11 min-w-0 flex-1 rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-[13px] font-medium text-white focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation [color-scheme:dark]"
                >
                  {LABOUR_GRADES.filter(
                    (g) => g.id === a.grade || !allocations.some((x) => x.grade === g.id)
                  ).map((g) => {
                    const r = rateForGrade(g.id, sources);
                    return (
                      <option key={g.id} value={g.id}>
                        {shortGradeLabel(g.id)}
                        {r > 0 ? ` — ${gbp(r)}/hr` : ' — no rate set'}
                      </option>
                    );
                  })}
                </select>
                <span className="shrink-0 text-[12px] text-white tabular-nums">
                  {rate > 0 ? gbp(a.hours * quantity * rate) : '—'}
                </span>
                <button
                  type="button"
                  onClick={() => commit(allocations.filter((_, n) => n !== i))}
                  aria-label={`Remove the ${shortGradeLabel(a.grade)} allowance`}
                  className="h-11 w-11 shrink-0 flex items-center justify-center rounded-lg hover:bg-white/[0.08] touch-manipulation transition-colors"
                >
                  <X className="h-3.5 w-3.5 text-white/60" />
                </button>
              </div>
            );
          })}

          {unusedGrades.length > 0 && (
            <button
              type="button"
              onClick={addTrade}
              className="flex min-h-[44px] items-center gap-1.5 text-[13px] font-semibold text-elec-yellow touch-manipulation"
            >
              <Plus className="h-4 w-4" />
              Add another trade
            </button>
          )}

          {/*
           * The arithmetic, because the point of the feature is to stop people
           * guessing — the number has to be visible as they type it, not
           * discovered later on the total.
           */}
          <p className="text-[12px] text-white">
            {anyUnrated ? (
              <>No hourly rate saved for one of these trades — set one in Settings</>
            ) : (
              <>
                {fmtHours(totalHours)} total @ {item.quantity} × {fmtHours(totalAllowanceHours(item))} ={' '}
                <span className="font-semibold">{gbp(totalCost)}</span> labour
              </>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default TimeAllowanceField;
