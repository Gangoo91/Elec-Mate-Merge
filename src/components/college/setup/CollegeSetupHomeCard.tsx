import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { itemVariants } from '@/components/college/primitives';
import { COLLEGE_BTN, COLLEGE_BTN_PRIMARY, COLLEGE_CARD } from '@/components/college/ui/CollegeUi';
import {
  dismissSetup,
  setupSteps,
  useCollegeSetupStatus,
  useRefreshSetupStatus,
} from '@/lib/collegeSetup';

/* ==========================================================================
   CollegeSetupHomeCard — the set-up checklist on the College Hub home for a
   new college (ELE-1855): "Add your staff", "Create a cohort", "Share the
   join code", "Take your first register"… Each item ticks itself off from
   the data; the card goes once every step is done or someone hides it.
   The full list with its actions lives on /college/setup.
   ========================================================================== */

export function CollegeSetupHomeCard() {
  const navigate = useNavigate();
  const { data: status } = useCollegeSetupStatus(true);
  const refresh = useRefreshSetupStatus();
  if (!status || status.dismissed) return null;
  const steps = setupSteps(status);
  const done = steps.filter((s) => s.done).length;
  if (done === steps.length) return null;
  const next = steps.find((s) => !s.done);
  const pct = Math.round((done / steps.length) * 100);

  return (
    <motion.section variants={itemVariants} initial="hidden" animate="visible" className={cn(COLLEGE_CARD, 'space-y-5')}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">Getting set up</p>
          <h2 className="mt-1 text-[20px] font-bold tracking-tight text-white">
            {done} of {steps.length} done{next ? `. Next: ${next.title.toLowerCase()}` : ''}
          </h2>
          <div className="mt-3 h-1.5 w-full max-w-md overflow-hidden rounded-full bg-white/[0.08]">
            <div className="h-full rounded-full bg-elec-yellow" style={{ width: `${pct}%` }} />
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <button type="button" onClick={() => navigate('/college/setup')} className={COLLEGE_BTN_PRIMARY}>
            Carry on setting up
          </button>
          <button
            type="button"
            onClick={() => void dismissSetup(status.college_id).then(() => refresh())}
            className={COLLEGE_BTN}
          >
            Hide
          </button>
        </div>
      </div>
      <ul className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
        {steps.map((s) => (
          <li key={s.key}>
            <button
              type="button"
              onClick={() => navigate('/college/setup')}
              className="flex h-full min-h-[48px] w-full items-center gap-3 rounded-2xl border border-white/[0.08] px-3.5 py-2.5 text-left transition-colors touch-manipulation hover:border-white/[0.2]"
            >
              <span
                aria-hidden
                className={cn(
                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border',
                  s.done ? 'border-emerald-400 bg-emerald-400 text-black' : 'border-white/[0.3]'
                )}
              >
                {s.done && <Check className="h-3.5 w-3.5" />}
              </span>
              <span className={cn('text-[13.5px] font-medium leading-snug text-white', s.done && 'line-through decoration-white/40')}>
                {s.title}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </motion.section>
  );
}
