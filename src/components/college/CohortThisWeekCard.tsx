import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import { useTutorThisWeek, type TutorThisWeekBullet } from '@/hooks/useTutorThisWeek';
import { cn } from '@/lib/utils';
import { COLLEGE_BTN } from '@/components/college/ui/CollegeUi';

/* ==========================================================================
   CohortThisWeekCard — tutor's Monday-morning briefing. Mirrors apprentice
   MyThisWeekCard structurally but pulls cohort-level signals (OTJ inbox,
   risk scores, recent quiz fails, action-required portfolio comments) and
   deep-links into the right tutor surface. House style: neutral card, white
   text, outline actions (the notebook keeps the one solid action).
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
      <div className="card-surface rounded-2xl px-4 py-4 sm:px-5">
        <div className="text-[13px] font-semibold text-white">This week</div>
        <p className="mt-1.5 text-[13px] leading-snug text-white">
          Couldn't put together the cohort briefing.{' '}
          {error ? <span className="text-orange-400">{error}</span> : null}
        </p>
        <button type="button" onClick={regenerate} className={cn(COLLEGE_BTN, 'mt-3')}>
          <RefreshCw className="h-4 w-4" />
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
      className="card-surface rounded-2xl"
    >
      <div className="px-4 py-4 sm:px-5 sm:py-5 lg:px-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[13px] font-semibold text-white">This week with your cohort</div>
            <p className="mt-2 text-[14px] leading-snug text-white sm:text-[14.5px]">
              {brief.greeting}
            </p>
            <h2 className="mt-1 text-[16px] font-semibold leading-snug tracking-tight text-white sm:text-[17.5px]">
              {brief.headline}
            </h2>
          </div>
          <button
            type="button"
            onClick={regenerate}
            disabled={generating}
            className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-xl px-2 text-[13px] font-semibold text-elec-yellow transition-opacity touch-manipulation disabled:opacity-50"
            title="Regenerate this week's briefing"
          >
            <RefreshCw className={cn('h-4 w-4', generating && 'animate-spin')} />
            {generating ? 'Refreshing' : 'Refresh'}
          </button>
        </div>

        <ul className="mt-4 divide-y divide-white/[0.06]">
          {brief.bullets.map((b, i) => (
            <ThisWeekBulletRow key={`${b.action_kind}-${i}`} bullet={b} index={i} />
          ))}
        </ul>

        {brief.encouragement && (
          <p className="mt-4 text-[13px] leading-snug text-white sm:text-[13.5px]">
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
      className="py-3"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
        <div className="min-w-0 flex-1">
          <div className="text-[13.5px] font-semibold leading-snug text-white">{bullet.title}</div>
          {bullet.why && <p className="mt-1 text-[13px] leading-snug text-white">{bullet.why}</p>}
        </div>
        <button
          type="button"
          onClick={() => navigate(bullet.action_href)}
          className={cn(COLLEGE_BTN, 'shrink-0 self-start')}
        >
          {bullet.action_label}
        </button>
      </div>
    </motion.li>
  );
}

function SkeletonCard() {
  return (
    <div className="card-surface animate-pulse rounded-2xl px-4 py-4 sm:px-5">
      <div className="h-3 w-28 rounded-full bg-white/10" />
      <div className="mt-3 h-4 w-2/3 rounded-full bg-white/10" />
      <div className="mt-2 h-5 w-3/4 rounded-full bg-white/10" />
      <div className="mt-4 space-y-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-12 rounded-xl bg-white/[0.04]" />
        ))}
      </div>
    </div>
  );
}
