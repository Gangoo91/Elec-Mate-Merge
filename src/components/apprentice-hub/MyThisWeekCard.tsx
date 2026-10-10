import { LC_FRAME, plainWords } from '@/components/apprentice-hub/college-hub/learnerUi';
import { useNavigate } from 'react-router-dom';
import { useLoggingReminders } from '@/hooks/useLoggingReminders';
import { motion } from 'framer-motion';
import { ChevronRight, RefreshCw } from 'lucide-react';
import { useApprenticeThisWeek, type ThisWeekBullet } from '@/hooks/useApprenticeThisWeek';
import { cn } from '@/lib/utils';

/* ==========================================================================
   MyThisWeekCard — mate-tutor coaching nudge at the top of the apprentice
   hub. Greeting + headline + 3-4 actionable bullets + encouragement.
   Generated weekly by ai-apprentice-this-week, cached one row per ISO week.
   ========================================================================== */

export function MyThisWeekCard() {
  // Settings → Reminders drops the AI's "log your hours" suggestion (ELE-1804).
  const { hidden: hideReminders } = useLoggingReminders();
  const { brief, loading, generating, error, regenerate } = useApprenticeThisWeek();

  // Hide entirely if no learner context (apprentice not enrolled yet) — no
  // value showing an empty card. The hook surfaces an error in that case.
  if (!loading && !brief && !generating) {
    if (error?.includes('no_learner_context')) return null;
  }

  if (loading || (generating && !brief)) {
    return <SkeletonCard />;
  }
  if (!brief) {
    return (
      <div className={cn(LC_FRAME, 'px-4 sm:px-5 py-4')}>
        <div className="text-[13px] font-semibold text-white">This week</div>
        <p className="mt-1.5 text-[13px] text-white leading-snug">
          Couldn't put together your weekly brief just now.{' '}
          {error ? <span className="text-white">{error}</span> : null}
        </p>
        <button
          type="button"
          onClick={regenerate}
          className="mt-3 inline-flex h-11 items-center gap-1.5 rounded-xl border border-white/[0.14] px-4 text-[13.5px] font-semibold text-white transition-colors touch-manipulation hover:border-elec-yellow"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Try again
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
      className={LC_FRAME}
    >
      <div className="px-4 sm:px-5 lg:px-6 py-4 sm:py-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[13px] font-medium text-white">This week</div>
            <h3 className="mt-1.5 text-[17px] font-semibold leading-snug tracking-tight text-white">
              {plainWords(brief.headline)}
            </h3>
            <p className="mt-1 text-[13.5px] leading-snug text-white">
              {plainWords(brief.greeting)}
            </p>
          </div>
          <button
            type="button"
            onClick={regenerate}
            disabled={generating}
            className="-mr-2 -mt-2 inline-flex h-11 shrink-0 items-center gap-1 rounded-full px-2 text-[12.5px] font-semibold text-white transition-colors touch-manipulation hover:bg-white/[0.06] disabled:opacity-60"
            title="Regenerate this week's brief"
          >
            <RefreshCw className={cn('h-3 w-3', generating && 'animate-spin')} />
            {generating ? 'Refreshing' : 'Refresh'}
          </button>
        </div>

        <ul className="mt-4 -mx-4 divide-y divide-white/[0.10] border-t border-white/[0.10] sm:-mx-5">
          {brief.bullets
            .filter((b) => !hideReminders || b.action_kind !== 'submit_otj')
            .map((b, i) => (
              <ThisWeekBulletRow key={`${b.action_kind}-${i}`} bullet={b} index={i} />
            ))}
        </ul>

        {brief.encouragement && (
          <p className="mt-4 text-[13px] leading-snug text-white">
            {plainWords(brief.encouragement)}
          </p>
        )}
      </div>
    </motion.div>
  );
}

/*
 * The whole row is the action.
 *
 * 🔴 This used to put a solid volt pill on the right of every bullet — four
 *    of them here, three more on the Today's Focus card beside it. Seven
 *    maximum-emphasis buttons on one screen means none of them is emphasis,
 *    and the pill was `h-7`: a 28px tap target on a phone, against the 44px
 *    minimum this app holds everywhere else.
 *
 *    Now it matches HubWorkList — a rule, the words, a chevron, and the row
 *    itself is the button. The action label stays as quiet volt text so you
 *    still know what tapping does.
 */
function ThisWeekBulletRow({ bullet, index }: { bullet: ThisWeekBullet; index: number }) {
  const navigate = useNavigate();
  return (
    <motion.li
      initial={{ opacity: 0, x: -4 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.18, delay: 0.06 + index * 0.05 }}
    >
      <button
        type="button"
        onClick={() => navigate(bullet.action_href)}
        className="flex w-full items-start gap-3 px-4 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09] sm:px-5"
      >
        <span className="min-w-0 flex-1">
          <span className="block text-[14px] font-semibold leading-snug text-white">
            {plainWords(bullet.title)}
          </span>
          {bullet.why && (
            <span className="mt-1 block text-[13px] leading-relaxed text-white">
              {plainWords(bullet.why)}
            </span>
          )}
          <span className="mt-1.5 block text-[13px] font-semibold text-white underline decoration-white/40 underline-offset-4">
            {plainWords(bullet.action_label)}
          </span>
        </span>
        <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-white" aria-hidden="true" />
      </button>
    </motion.li>
  );
}

function SkeletonCard() {
  return (
    <div className={cn(LC_FRAME, 'px-4 sm:px-5 py-4 animate-pulse')}>
      <div className="h-3 w-20 rounded-full bg-white/10" />
      <div className="mt-3 h-4 w-2/3 rounded-full bg-white/10" />
      <div className="mt-2 h-5 w-3/4 rounded-full bg-white/12" />
      <div className="mt-4 space-y-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-12 rounded-xl bg-white/[0.04]" />
        ))}
      </div>
    </div>
  );
}
