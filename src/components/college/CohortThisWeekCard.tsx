import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RefreshCw, Sparkles } from 'lucide-react';
import { useTutorThisWeek, type TutorThisWeekBullet } from '@/hooks/useTutorThisWeek';
import { cn } from '@/lib/utils';

/* ==========================================================================
   CohortThisWeekCard — tutor's Monday-morning briefing. Mirrors apprentice
   MyThisWeekCard structurally but pulls cohort-level signals (OTJ inbox,
   risk scores, recent quiz fails, action-required portfolio comments) and
   deep-links into the right tutor surface. Amber tone matches the AI
   Notebook's tutor accent.
   ========================================================================== */

export function CohortThisWeekCard() {
  const { brief, loading, generating, error, regenerate } = useTutorThisWeek();

  if (!loading && !brief && !generating && error?.includes('not_college_staff')) {
    return null;
  }

  if (loading || (generating && !brief)) {
    return <SkeletonCard />;
  }
  if (!brief) {
    return (
      <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] px-4 sm:px-5 py-4">
        <div className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-amber-300/85">
          This week
        </div>
        <p className="mt-1.5 text-[13px] text-white/85 leading-snug">
          Couldn't put together the cohort briefing.{' '}
          {error ? <span className="text-rose-200">{error}</span> : null}
        </p>
        <button
          type="button"
          onClick={regenerate}
          className="mt-3 inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-amber-300 hover:bg-amber-200 text-black text-[12px] font-semibold transition-colors touch-manipulation"
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
      className="relative overflow-hidden rounded-2xl border border-amber-300/20 bg-gradient-to-br from-amber-500/[0.06] via-[hsl(0_0%_10%)] to-[hsl(0_0%_10%)]"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/40 to-transparent" />

      <div className="px-4 sm:px-5 lg:px-6 py-4 sm:py-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-[10.5px] font-medium uppercase tracking-[0.22em] text-amber-300">
              <Sparkles className="h-3 w-3" />
              This week with your cohort
            </div>
            <p className="mt-2 text-[14px] sm:text-[14.5px] text-white/85 leading-snug">
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
            className="shrink-0 inline-flex items-center gap-1 h-7 px-2 rounded-full text-[10.5px] font-medium text-amber-200/85 hover:text-amber-100 hover:bg-amber-500/[0.08] transition-colors touch-manipulation disabled:opacity-50"
            title="Regenerate this week's briefing"
          >
            <RefreshCw className={cn('h-3 w-3', generating && 'animate-spin')} />
            {generating ? 'Refreshing' : 'Refresh'}
          </button>
        </div>

        <ul className="mt-4 space-y-2">
          {brief.bullets.map((b, i) => (
            <ThisWeekBulletRow key={`${b.action_kind}-${i}`} bullet={b} index={i} />
          ))}
        </ul>

        {brief.encouragement && (
          <p className="mt-4 text-[13px] sm:text-[13.5px] text-amber-100/85 leading-snug italic">
            {brief.encouragement}
          </p>
        )}
      </div>
    </motion.div>
  );
}

function ThisWeekBulletRow({ bullet, index }: { bullet: TutorThisWeekBullet; index: number }) {
  const navigate = useNavigate();
  return (
    <motion.li
      initial={{ opacity: 0, x: -4 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.18, delay: 0.06 + index * 0.05 }}
      className="rounded-xl bg-white/[0.02] border border-white/[0.05] px-3 py-2.5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="text-[13.5px] font-semibold text-white leading-snug">{bullet.title}</div>
          {bullet.why && (
            <p className="mt-1 text-[12.5px] text-white/85 leading-snug">{bullet.why}</p>
          )}
        </div>
        <button
          type="button"
          onClick={() => navigate(bullet.action_href)}
          className="shrink-0 inline-flex items-center h-7 px-2.5 rounded-md bg-amber-300 hover:bg-amber-200 text-black text-[11.5px] font-semibold transition-colors touch-manipulation"
        >
          {bullet.action_label} →
        </button>
      </div>
    </motion.li>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] px-4 sm:px-5 py-4 animate-pulse">
      <div className="h-3 w-28 rounded-full bg-white/10" />
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
