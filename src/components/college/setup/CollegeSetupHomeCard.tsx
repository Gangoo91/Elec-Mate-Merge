import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { itemVariants } from '@/components/college/primitives';
import { COLLEGE_BTN_PRIMARY, COLLEGE_CARD } from '@/components/college/ui/CollegeUi';
import { dismissSetup, useCollegeSetupStatus, useRefreshSetupStatus } from '@/lib/collegeSetup';
import {
  markValueReviewed,
  useRefreshWeekOne,
  useWeekOneStatus,
  weekOneDays,
} from '@/lib/collegeWeekOne';

/* ==========================================================================
   CollegeSetupHomeCard — "Your first week" on the College Hub home for a new
   college (ELE-1855, grouped into days by ELE-1921). The same five days as
   the written week-one playbook in the sales kit: who does what on day 1 to
   day 5. Every step ticks itself off from the college's records; day 5 (the
   month in numbers, gone through with the head of department) is ticked by
   a person. The card goes once the week is done or someone hides it.

   Light by default (Andrew, 10 Oct): one sentence, a slim bar, the next
   action, a five-day stepper and only today's remaining steps. The whole week
   opens on request as a plain list, no boxes inside the card.
   ========================================================================== */

const OPEN_KEY = 'em-week-one-open';

export function CollegeSetupHomeCard() {
  const navigate = useNavigate();
  const { data: status } = useCollegeSetupStatus(true);
  const { data: week } = useWeekOneStatus(!!status && !status.dismissed);
  const refresh = useRefreshSetupStatus();
  const refreshWeek = useRefreshWeekOne();
  const [open, setOpen] = useState<boolean>(() => {
    try {
      return window.localStorage.getItem(OPEN_KEY) === '1';
    } catch {
      return false;
    }
  });
  if (!status || status.dismissed) return null;

  const days = weekOneDays(status, week);
  const steps = days.flatMap((d) => d.steps);
  const done = steps.filter((s) => s.done).length;
  if (done === steps.length) return null;
  const next = steps.find((s) => !s.done);
  const today = days.find((d) => d.steps.some((s) => !s.done)) ?? days[days.length - 1];
  const pct = Math.round((done / steps.length) * 100);
  // Day 5's step is ticked by a person: the next action is to mark it.
  const nextIsReview = today.day === 5 && today.steps.filter((s) => !s.done).length === 1;

  const toggle = () => {
    const v = !open;
    setOpen(v);
    try {
      window.localStorage.setItem(OPEN_KEY, v ? '1' : '0');
    } catch {
      /* remembered only while storage allows */
    }
  };

  const StepRow = ({ s }: { s: (typeof steps)[number] }) => (
    <li>
      <button
        type="button"
        onClick={() => navigate(s.to)}
        className="flex min-h-[44px] w-full items-center gap-3 rounded-xl px-2 text-left transition-colors touch-manipulation hover:bg-white/[0.04]"
      >
        <span
          aria-hidden
          className={cn(
            'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border',
            s.done ? 'border-emerald-400 bg-emerald-400 text-black' : 'border-white/[0.35]'
          )}
        >
          {s.done && <Check className="h-3 w-3" />}
        </span>
        <span className="min-w-0 flex-1 text-[13.5px] font-medium leading-snug text-white">
          {s.title}
        </span>
        <span className="sr-only">{s.done ? 'done' : 'to do'}</span>
      </button>
    </li>
  );

  return (
    <motion.section
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className={cn(COLLEGE_CARD, 'space-y-3')}
      data-testid="college-week-one"
    >
      {/* Where you are and the one thing to do next */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-[13px] font-semibold text-elec-yellow">Your first week</p>
          <p className="mt-1 text-[15px] font-semibold leading-snug text-white">
            {done} of {steps.length} done.
            {next ? <> Next: {next.title.charAt(0).toLowerCase() + next.title.slice(1)}.</> : null}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {nextIsReview ? (
            <button
              type="button"
              onClick={() => void markValueReviewed(status.college_id).then(() => refreshWeek())}
              className={COLLEGE_BTN_PRIMARY}
            >
              Mark as gone through
            </button>
          ) : (
            <button
              type="button"
              onClick={() => navigate(next?.to ?? '/college/setup')}
              className={COLLEGE_BTN_PRIMARY}
            >
              Carry on setting up
            </button>
          )}
          <button
            type="button"
            onClick={() => void dismissSetup(status.college_id).then(() => refresh())}
            className="inline-flex h-11 items-center px-3 text-[13px] font-semibold text-white underline-offset-4 hover:underline touch-manipulation"
          >
            Hide
          </button>
        </div>
      </div>

      <div className="h-1 w-full overflow-hidden rounded-full bg-white/[0.08]">
        <div className="h-full rounded-full bg-elec-yellow" style={{ width: `${pct}%` }} />
      </div>

      {/* Five days as a light stepper, no boxes */}
      <ol className="grid grid-cols-5 gap-1.5 sm:gap-3">
        {days.map((d) => {
          const dayDone = d.steps.every((s) => s.done);
          const isToday = d.day === today.day;
          return (
            <li key={d.day} data-testid={`week-one-day-${d.day}`} className="min-w-0">
              <div className="flex items-center gap-2">
                <span
                  aria-hidden
                  className={cn(
                    'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[12px] font-bold',
                    dayDone
                      ? 'border-emerald-400 bg-emerald-400 text-black'
                      : isToday
                        ? 'border-elec-yellow text-elec-yellow'
                        : 'border-white/[0.3] text-white'
                  )}
                >
                  {dayDone ? <Check className="h-3.5 w-3.5" /> : d.day}
                </span>
                <span className="hidden h-px flex-1 bg-white/[0.12] sm:block" aria-hidden />
              </div>
              <p
                className={cn(
                  'mt-1.5 text-[12px] font-semibold leading-tight',
                  isToday ? 'text-elec-yellow' : 'text-white'
                )}
              >
                Day {d.day}
                <span className="sr-only">{dayDone ? ', done' : isToday ? ', now' : ''}</span>
              </p>
              <p className="hidden truncate text-[12px] leading-tight text-white sm:block">
                {d.title}
              </p>
              <p className="sr-only">{d.who}</p>
            </li>
          );
        })}
      </ol>

      {/* Today's remaining steps (only when there's more than the one named above) */}
      {!open && today.steps.filter((s) => !s.done).length > 1 && (
        <div>
          <p className="text-[12px] font-semibold text-white">
            Day {today.day}: {today.title} <span className="font-normal">· {today.who}</span>
          </p>
          <ul className="mt-1">
            {today.steps
              .filter((s) => !s.done)
              .map((s) => (
                <StepRow key={s.key} s={s} />
              ))}
          </ul>
        </div>
      )}

      {/* The whole week, on request */}
      {open && (
        <div className="grid gap-x-8 gap-y-4 md:grid-cols-2 xl:grid-cols-3">
          {days.map((d) => (
            <div key={d.day} className="min-w-0">
              <p className="text-[12px] font-semibold text-white">
                Day {d.day}: {d.title} <span className="font-normal">· {d.who}</span>
              </p>
              <ul className="mt-1">
                {d.steps.map((s) => (
                  <StepRow key={s.key} s={s} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        className="inline-flex h-11 items-center text-[13px] font-semibold text-white underline-offset-4 hover:underline touch-manipulation"
      >
        {open ? 'Show less' : 'See the whole week'}
        <ChevronDown className={cn('ml-1 h-4 w-4 transition-transform', open && 'rotate-180')} />
      </button>
    </motion.section>
  );
}
