/**
 * AssessmentPlanTodo — "From your tutor": the learner's assessment plan as a
 * to-do (ELE-1874).
 *
 * Each open item says what to do, how it will be assessed, the criteria in
 * plain words and the date, with one button straight into capture with those
 * criteria ticked. An item closes itself when the learner sends evidence that
 * claims every criterion on it (or the assessor passes them).
 *
 * ?plan=<id> (from the push notification) scrolls to and highlights the item.
 */
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Check, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CaptureSeed } from '../UnifiedCaptureSheet';
import { planAcRef, type AssessmentPlanItem, type useAssessmentPlans } from '@/hooks/portfolio/useAssessmentPlans';
import { P_BTN, P_BTN_PRIMARY, P_CARD } from './ui';

type Plans = ReturnType<typeof useAssessmentPlans>;

function todayLondon(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/London' }).format(new Date());
}
function dueLine(item: AssessmentPlanItem): string {
  if (!item.due_date) return 'No date set';
  const d = new Date(`${item.due_date}T12:00:00Z`);
  const label = d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
  const days = Math.round(
    (new Date(`${item.due_date}T12:00:00Z`).getTime() - new Date(`${todayLondon()}T12:00:00Z`).getTime()) / 86400000
  );
  if (days < 0) return `Was due ${label}`;
  if (days === 0) return 'Due today';
  if (days === 1) return 'Due tomorrow';
  return `By ${label}`;
}

/** The capture seed for a plan item: its criteria ticked, the activity as the brief. */
export function planCaptureSeed(item: AssessmentPlanItem): CaptureSeed {
  const open = item.criteria.filter((c) => !c.met_at);
  const list = open.length ? open : item.criteria;
  return {
    title: item.activity.slice(0, 120),
    acRefs: list.map(planAcRef),
    brief: [
      { label: `${item.method_label}: ${item.activity}` },
      ...(item.notes ? [{ label: item.notes }] : []),
    ],
    briefSource: 'from your assessment plan',
  };
}

export function AssessmentPlanTodo({
  plans,
  onCapture,
}: {
  plans: Plans;
  onCapture: (seed: CaptureSeed) => void;
}) {
  const [params] = useSearchParams();
  const focusId = params.get('plan');
  const [showAll, setShowAll] = useState(false);
  const refs = useRef<Record<string, HTMLLIElement | null>>({});
  const scrolledTo = useRef<string | null>(null);

  // Deep link: scroll to the item once it has loaded.
  useEffect(() => {
    if (!focusId || plans.loading) return;
    // Past the first four: show them all, then scroll on the next render.
    if (!showAll && plans.open.findIndex((p) => p.id === focusId) >= 4) {
      setShowAll(true);
      return;
    }
    const el = refs.current[focusId];
    if (el && scrolledTo.current !== focusId) {
      scrolledTo.current = focusId;
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [focusId, plans.loading, plans.open, showAll]);

  if (plans.loading || plans.error) return null;
  const focusedClosed = focusId ? plans.closed.find((p) => p.id === focusId) : null;
  if (plans.open.length === 0 && !focusedClosed) return null;

  const visible = showAll ? plans.open : plans.open.slice(0, 4);

  return (
    <section className="space-y-3" aria-labelledby="plan-todo-title">
      <div className="flex items-end justify-between gap-3">
        <div className="min-w-0">
          <h2 id="plan-todo-title" className="text-[17px] font-semibold tracking-tight text-white">
            From your tutor: evidence next
          </h2>
          <p className="mt-0.5 text-[13px] text-white">
            Capture it, claim the criteria and send it. It ticks itself off when you do.
          </p>
        </div>
        <span
          className={cn(
            'shrink-0 text-[12.5px] font-semibold tabular-nums',
            plans.overdue ? 'text-orange-300' : 'text-white'
          )}
        >
          {plans.open.length} to do{plans.overdue ? `, ${plans.overdue} late` : ''}
        </span>
      </div>

      {focusedClosed && (
        <div className={cn(P_CARD, 'flex items-center gap-3')}>
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-black" aria-hidden>
            <Check className="h-4 w-4" />
          </span>
          <p className="min-w-0 text-[14px] text-white">
            <span className="font-semibold">{focusedClosed.activity}</span> is{' '}
            {focusedClosed.status === 'cancelled' ? 'no longer needed' : 'done'}.
          </p>
        </div>
      )}

      {plans.open.length > 0 && (
        <ul
          className={cn(
            'grid grid-cols-1 items-stretch gap-3',
            // One item fills the row (its criteria sit beside it on desktop);
            // more share the width rather than leaving half the row empty.
            visible.length === 2 && 'lg:grid-cols-2',
            visible.length >= 3 && 'lg:grid-cols-2 2xl:grid-cols-3'
          )}
        >
          {visible.map((p) => {
            const met = p.criteria.filter((c) => c.met_at).length;
            const focused = p.id === focusId;
            const single = visible.length === 1;
            return (
              <li
                key={p.id}
                ref={(el) => {
                  refs.current[p.id] = el;
                }}
                className={cn(
                  P_CARD,
                  'flex h-full flex-col gap-3 scroll-mt-24',
                  single && 'lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-x-8 lg:gap-y-3',
                  focused && 'sm:border-elec-yellow border-elec-yellow'
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[12.5px] font-semibold text-elec-yellow">{p.method_label}</p>
                    <p className="mt-1 text-[16px] font-semibold leading-snug text-white">{p.activity}</p>
                  </div>
                  <span
                    className={cn(
                      'shrink-0 text-right text-[12.5px] font-semibold',
                      p.overdue ? 'text-orange-300' : 'text-white'
                    )}
                  >
                    {dueLine(p)}
                  </span>
                </div>

                <ul className={cn('space-y-1.5', single && 'lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:self-center')}>
                  {p.criteria.map((c) => (
                    <li key={`${c.unit_code}-${c.ac_code}`} className="flex items-start gap-2 text-[13.5px] leading-snug text-white">
                      <span
                        className={cn(
                          'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border',
                          c.met_at ? 'border-emerald-400 bg-emerald-400 text-black' : 'border-white/[0.3]'
                        )}
                        aria-label={c.met_at ? 'Done' : 'To do'}
                      >
                        {c.met_at && <Check className="h-3 w-3" />}
                      </span>
                      <span className="min-w-0">
                        {c.ac_text ? (
                          <>
                            {c.ac_text.charAt(0).toUpperCase() + c.ac_text.slice(1)}{' '}
                            <span className="text-[11.5px] font-semibold text-elec-yellow">
                              {c.unit_code} AC {c.ac_code}
                            </span>
                          </>
                        ) : (
                          <span className="font-semibold">
                            {c.unit_code} AC {c.ac_code}
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>

                {p.notes && (
                  <p className="border-t border-white/[0.08] pt-2 text-[13px] leading-snug text-white">
                    <span className="font-semibold">{p.set_by_name ?? 'Your tutor'}:</span> {p.notes}
                  </p>
                )}

                <div className="mt-auto flex flex-wrap items-center gap-3 pt-1">
                  <button
                    type="button"
                    className={cn(P_BTN_PRIMARY, 'flex-1 sm:flex-none')}
                    onClick={() => onCapture(planCaptureSeed(p))}
                  >
                    <Plus className="h-4 w-4" /> Capture this
                  </button>
                  <span className="text-[12px] text-white">
                    {met} of {p.criteria.length} done
                    {p.set_by_name ? ` · set by ${p.set_by_name}` : ''}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {plans.open.length > 4 && (
        <button type="button" className={P_BTN} onClick={() => setShowAll((s) => !s)}>
          {showAll ? 'Show fewer' : `Show all ${plans.open.length}`}
        </button>
      )}
    </section>
  );
}
