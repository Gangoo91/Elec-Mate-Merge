/**
 * OccasionsGrid — every criterion on the course, unit by unit, in three solid
 * colours (red: nothing yet, amber: under way or 1 of 2, green: met), with an
 * "n of 2" counter where the awarding body needs two separate assessed
 * occasions (C&G 5357-03 performance units, handbook p.14).
 *
 * Shared by the learner's coverage view, Student 360's AC matrix and the
 * assessor workspace. A phone gets one row per unit with a strip of marks;
 * tapping a unit opens its criteria as a grid of cells. The colour rule lives
 * in useAcOccasions (occasionTone), so every screen reads the same.
 */
import { useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { AcStateRow } from '@/hooks/portfolio/usePortfolioAcState';
import { STATE_LABEL } from '@/hooks/portfolio/usePortfolioAcState';
import {
  TONE_LABEL,
  TONE_MARK,
  occasionCounter,
  occasionKey,
  occasionTone,
  type AcOccasionRow,
  type OccasionTone,
} from '@/hooks/portfolio/useAcOccasions';

interface UnitView {
  unit_code: string;
  unit_title: string;
  cells: { r: AcStateRow; o: AcOccasionRow | undefined; tone: OccasionTone }[];
  met: number;
  partial: number;
  none: number;
  /** The occasions the unit's rule asks for (1 when there is no rule). */
  required: number;
  note: string | null;
  ref: string | null;
}

type Scope = 'all' | 'workplace';

export function OccasionsGrid({
  rows,
  occasions,
  onOpenCriterion,
  audience = 'staff',
  className,
}: {
  rows: AcStateRow[];
  occasions: Map<string, AcOccasionRow>;
  onOpenCriterion?: (unitCode: string, acCode: string) => void;
  /** Wording only: "you" for the learner. */
  audience?: 'learner' | 'staff';
  className?: string;
}) {
  const [open, setOpen] = useState<string | null>(null);
  const [scope, setScope] = useState<Scope>('all');

  const units = useMemo<UnitView[]>(() => {
    const map = new Map<string, UnitView>();
    for (const r of rows) {
      let u = map.get(r.unit_code);
      const o = occasions.get(occasionKey(r.unit_code, r.ac_code));
      if (!u) {
        u = {
          unit_code: r.unit_code,
          unit_title: r.unit_title ?? `Unit ${r.unit_code}`,
          cells: [],
          met: 0,
          partial: 0,
          none: 0,
          required: 1,
          note: null,
          ref: null,
        };
        map.set(r.unit_code, u);
      }
      const tone = occasionTone(r.state, o);
      u.cells.push({ r, o, tone });
      u[tone] += 1;
      if (o && o.required > u.required) {
        u.required = o.required;
        u.note = o.rule_note;
        u.ref = o.rule_ref;
      }
    }
    return [...map.values()];
  }, [rows, occasions]);

  const workplaceCount = units.filter((u) => u.required > 1).length;
  const shown = scope === 'workplace' ? units.filter((u) => u.required > 1) : units;
  const totals = shown.reduce(
    (t, u) => ({ met: t.met + u.met, partial: t.partial + u.partial, none: t.none + u.none }),
    { met: 0, partial: 0, none: 0 }
  );

  if (rows.length === 0) return null;

  return (
    <section
      aria-label="Criteria gap grid"
      className={cn(
        '-mx-4 border-y border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] sm:mx-0 sm:rounded-3xl sm:border-x',
        className
      )}
    >
      <div className="space-y-3 px-4 pb-3 pt-4 sm:px-6 sm:pt-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h2 className="text-[15px] font-semibold tracking-tight text-white">Gap grid</h2>
            <p className="mt-1 text-[13px] leading-snug text-white">
              Every criterion, unit by unit.
              {workplaceCount > 0 &&
                (audience === 'learner'
                  ? ' Workplace units need your assessor to pass you on two separate occasions.'
                  : ' Workplace units need two separate assessed occasions.')}
            </p>
          </div>
          {workplaceCount > 0 && (
            <div
              role="radiogroup"
              aria-label="Units shown"
              className="flex w-full shrink-0 rounded-xl border border-white/[0.12] p-0.5 sm:w-auto"
            >
              {(
                [
                  ['all', 'All units'],
                  ['workplace', `Workplace · ${workplaceCount}`],
                ] as const
              ).map(([k, label]) => (
                <button
                  key={k}
                  type="button"
                  role="radio"
                  aria-checked={scope === k}
                  onClick={() => setScope(k)}
                  className={cn(
                    'inline-flex h-11 flex-1 items-center justify-center whitespace-nowrap rounded-[10px] px-4 text-[13px] font-semibold transition-colors touch-manipulation sm:flex-none',
                    scope === k ? 'bg-white text-black' : 'text-white hover:bg-white/[0.06]'
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
        {/* Legend doubles as the totals: a solid mark, a bold number, a plain word. */}
        <ul
          className="flex flex-wrap gap-x-5 gap-y-2 border-t border-white/[0.08] pt-3 sm:gap-x-6"
          aria-label="What the colours mean"
        >
          {(
            [
              ['none', totals.none],
              ['partial', totals.partial],
              ['met', totals.met],
            ] as const
          ).map(([t, n]) => (
            <li
              key={t}
              className="flex items-center gap-2 whitespace-nowrap text-[13px] text-white"
            >
              <span className={cn('h-3 w-3 shrink-0 rounded-[3px]', TONE_MARK[t])} aria-hidden />
              <span className="font-semibold tabular-nums">{n}</span>
              <span className="leading-tight">{TONE_LABEL[t].toLowerCase()}</span>
            </li>
          ))}
        </ul>
      </div>

      <ul className="divide-y divide-white/[0.06] border-t border-white/[0.08]">
        {shown.map((u) => {
          const isOpen = open === u.unit_code;
          const total = u.cells.length;
          return (
            <li key={u.unit_code}>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : u.unit_code)}
                className="flex min-h-[64px] w-full items-start gap-3 px-4 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.03] active:bg-white/[0.06] sm:px-6 lg:items-center"
              >
                <div className="min-w-0 flex-1 lg:grid lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:items-center lg:gap-6">
                  <p className="text-[14px] font-semibold leading-snug text-white">
                    <span className="block text-[12.5px] font-medium tabular-nums">
                      Unit {u.unit_code}
                      {u.required > 1 ? ` · ${u.required} occasions` : ''}
                    </span>
                    <span className="line-clamp-2">{u.unit_title}</span>
                  </p>
                  <div className="mt-2 flex flex-wrap gap-[3px] lg:mt-0" aria-hidden>
                    {u.cells.map(({ r, tone }) => (
                      <span
                        key={r.ac_code}
                        className={cn('h-2.5 w-2.5 rounded-[2px]', TONE_MARK[tone])}
                      />
                    ))}
                  </div>
                </div>
                <span className="shrink-0 pt-0.5 text-right text-[13px] tabular-nums text-white lg:pt-0">
                  <span className="font-semibold">{u.met}</span>/{total} met
                </span>
                <ChevronDown
                  className={cn(
                    'mt-0.5 h-4 w-4 shrink-0 text-white transition-transform lg:mt-0',
                    isOpen && 'rotate-180'
                  )}
                  strokeWidth={1.5}
                />
              </button>
              {isOpen && (
                <div className="space-y-3 px-4 pb-4 sm:px-6">
                  {u.required > 1 && (
                    <p className="text-[12.5px] leading-snug text-white">
                      {u.note ?? `Each criterion needs ${u.required} separate assessed occasions.`}
                      {u.ref ? ` Source: ${u.ref}.` : ''}
                    </p>
                  )}
                  <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8">
                    {u.cells.map(({ r, o, tone }) => {
                      const counter = occasionCounter(o);
                      const label = `${r.unit_code} AC ${r.ac_code}: ${
                        counter ? `${counter} occasions, ` : ''
                      }${STATE_LABEL[r.state].toLowerCase()}`;
                      const Cell = onOpenCriterion ? 'button' : 'div';
                      return (
                        <li key={r.ac_code}>
                          <Cell
                            {...(onOpenCriterion
                              ? {
                                  type: 'button' as const,
                                  onClick: () => onOpenCriterion(r.unit_code, r.ac_code),
                                }
                              : {})}
                            aria-label={label}
                            title={r.ac_text ?? undefined}
                            className={cn(
                              'flex min-h-[56px] w-full flex-col justify-between gap-1 rounded-xl border border-white/[0.1] bg-white/[0.03] px-2.5 py-2 text-left',
                              onOpenCriterion &&
                                'transition-colors touch-manipulation hover:border-white/[0.3] active:bg-white/[0.08]'
                            )}
                          >
                            <span className="flex items-center gap-1.5">
                              <span
                                className={cn(
                                  'h-2.5 w-2.5 shrink-0 rounded-[2px]',
                                  TONE_MARK[tone]
                                )}
                                aria-hidden
                              />
                              <span className="font-mono text-[12.5px] font-semibold text-white">
                                {r.ac_code}
                              </span>
                            </span>
                            <span className="text-[12px] font-semibold tabular-nums text-white">
                              {counter ?? TONE_LABEL[tone]}
                            </span>
                          </Cell>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
