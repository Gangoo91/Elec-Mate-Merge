import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, RefreshCw, Sparkles } from 'lucide-react';
import { useApprenticeThisWeek, type ThisWeekBullet } from '@/hooks/useApprenticeThisWeek';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';

/* ==========================================================================
   MyThisWeekCard — mate-tutor coaching nudge at the top of the apprentice
   hub. Greeting + headline + 3-4 actionable bullets + encouragement.
   Generated weekly by ai-apprentice-this-week, cached one row per ISO week.
   ========================================================================== */

export function MyThisWeekCard() {
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
      <div
        className={cn('rounded-2xl border border-elec-yellow/35 px-4 sm:px-5 py-4', CARD_SURFACE)}
      >
        <div className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-white">
          This week
        </div>
        <p className="mt-1.5 text-[13px] text-white leading-snug">
          Couldn't put together your weekly brief just now.{' '}
          {error ? <span className="text-white">{error}</span> : null}
        </p>
        <button
          type="button"
          onClick={regenerate}
          className="mt-3 inline-flex items-center gap-1.5 h-11 px-4 rounded-full bg-elec-yellow hover:bg-elec-yellow/90 text-black text-[12px] font-semibold transition-colors touch-manipulation"
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
      className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] via-[hsl(0_0%_10%)] to-[hsl(0_0%_10%)]"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-white/[0.02]" />

      <div className="px-4 sm:px-5 lg:px-6 py-4 sm:py-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-[10.5px] font-medium uppercase tracking-[0.22em] text-white">
              <Sparkles className="h-3 w-3" />
              This week
            </div>
            <p className="mt-2 text-[14px] sm:text-[14.5px] text-white leading-snug">
              {brief.greeting}
            </p>
            <h2 className="mt-1 text-[16px] sm:text-[17.5px] font-semibold text-white leading-snug tracking-tight">
              {brief.headline}
            </h2>
          </div>
          <button
            type="button"
            onClick={regenerate}
            disabled={generating}
            className="-mr-2 -mt-2 inline-flex h-11 shrink-0 items-center gap-1 rounded-full px-2 text-[10.5px] font-medium text-white transition-colors touch-manipulation hover:bg-white/[0.06] disabled:text-white/70"
            title="Regenerate this week's brief"
          >
            <RefreshCw className={cn('h-3 w-3', generating && 'animate-spin')} />
            {generating ? 'Refreshing' : 'Refresh'}
          </button>
        </div>

        <ul className="mt-4 -mx-4 divide-y divide-white/[0.10] border-t border-white/[0.10] sm:-mx-5">
          {brief.bullets.map((b, i) => (
            <ThisWeekBulletRow key={`${b.action_kind}-${i}`} bullet={b} index={i} />
          ))}
        </ul>

        {brief.encouragement && (
          <p className="mt-4 text-[13px] sm:text-[13.5px] text-white leading-snug italic">
            {brief.encouragement}
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
        <span
          aria-hidden="true"
          className="mt-0.5 h-8 w-[3px] shrink-0 rounded-full bg-white/[0.25]"
        />
        <span className="min-w-0 flex-1">
          <span className="block text-[14px] font-semibold leading-snug text-white">
            {bullet.title}
          </span>
          {bullet.why && (
            <span className="mt-1 block text-[12.5px] leading-relaxed text-white">
              {bullet.why}
            </span>
          )}
          <span className="mt-1.5 block text-[12px] font-medium text-elec-yellow">
            {bullet.action_label}
          </span>
        </span>
        <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-white" aria-hidden="true" />
      </button>
    </motion.li>
  );
}

function SkeletonCard() {
  return (
    <div
      className={cn(
        'rounded-2xl border border-white/[0.06] px-4 sm:px-5 py-4 animate-pulse',
        CARD_SURFACE
      )}
    >
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
