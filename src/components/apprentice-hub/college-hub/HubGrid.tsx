import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CollegeOverviewStat } from '@/hooks/useMyCollegeOverview';

/* ==========================================================================
   HubGrid — apprentice College Hub landing.

   Matches the main /apprentice/hub `EditorialToolGrid` pattern exactly:
   connected grid (cards as cells with 2px black gaps inside one rounded
   container), yellow accent line at top, "01 · TODAY" header rows,
   border-top footer with meta + "Open →" CTA, alert pill for
   action-required items.
   ========================================================================== */

function fmtHours(min: number): string {
  if (min < 60) return `${Math.round(min)}m`;
  const h = min / 60;
  return h >= 10 ? `${h.toFixed(0)}h` : `${h.toFixed(1)}h`;
}

interface HubGridProps {
  stats: CollegeOverviewStat;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } },
};

interface CollegeCard {
  eyebrow: string;
  title: string;
  description: string;
  meta: string;
  route: string;
  alert?: boolean;
}

export function HubGrid({ stats }: HubGridProps) {
  const navigate = useNavigate();

  const cards: CollegeCard[] = [
    {
      eyebrow: 'Today',
      title: 'Your day at college',
      description: 'Focus for today, this week, and your timetable — everything that\'s due or scheduled.',
      meta: 'Open',
      route: '/apprentice/college/today',
    },
    {
      eyebrow: 'ILP',
      title: 'Plan & messages',
      description: 'Goals from your tutor and the comment thread back. Both sides see the same thing.',
      meta:
        stats.unread_tutor_comments > 0
          ? `${stats.unread_tutor_comments} new from tutor`
          : `${stats.open_goals} goal${stats.open_goals === 1 ? '' : 's'} open`,
      route: '/apprentice/college/plan',
      alert: stats.unread_tutor_comments > 0,
    },
    {
      eyebrow: 'Progress',
      title: 'Your qualification',
      description: 'Live coverage through every assessment criterion on your course.',
      meta: 'Open AC map',
      route: '/apprentice/college/progress',
    },
    {
      eyebrow: 'Activities',
      title: 'Quizzes, hours & portfolio',
      description: 'Take quizzes, log off-the-job hours, keep your portfolio moving toward sign-off.',
      meta:
        stats.overdue_quizzes > 0
          ? `${stats.overdue_quizzes} overdue`
          : stats.pending_quizzes > 0
            ? `${stats.pending_quizzes} quiz${stats.pending_quizzes === 1 ? '' : 'zes'} to do`
            : 'All caught up',
      route: '/apprentice/college/activities',
      alert: stats.overdue_quizzes > 0,
    },
    {
      eyebrow: 'EPA',
      title: 'End-point prep',
      description: 'Read your pre-EPA brief and practice with timed mocks — your scores feed into your tutor\'s read.',
      meta: 'Brief + simulator',
      route: '/apprentice/college/epa',
    },
    {
      eyebrow: 'OTJ',
      title: 'Off-the-job hours',
      description: 'Verified hours toward the 20% rule. Submit new entries with photos and reflection.',
      meta:
        stats.rejected_otj_minutes > 0
          ? `${fmtHours(stats.rejected_otj_minutes)} returned`
          : stats.pending_otj_minutes > 0
            ? `${fmtHours(stats.verified_otj_minutes)} verified · ${fmtHours(stats.pending_otj_minutes)} pending`
            : `${fmtHours(stats.verified_otj_minutes)} verified`,
      route: '/apprentice/college/activities',
      alert: stats.rejected_otj_minutes > 0,
    },
    {
      eyebrow: 'Voice',
      title: 'Survey & reflection',
      description: 'Tell your college how it\'s going. Your input shapes what your tutor focuses on next.',
      meta: 'Open',
      route: '/apprentice/college/voice',
    },
    {
      eyebrow: 'Activity',
      title: 'Your record',
      description: 'Live feed of comments, sign-offs and observations from your college team.',
      meta:
        stats.unactioned_portfolio_comments > 0
          ? `${stats.unactioned_portfolio_comments} tutor needs reply`
          : 'Open',
      route: '/apprentice/college/activity',
      alert: stats.unactioned_portfolio_comments > 0,
    },
  ];

  // 8 cards → 4-col on lg gives 2 clean rows; 3-col gives 3 rows with 1
  // filler; 2-col gives 4 rows with no filler. Match the main hub which
  // uses 4-col on lg for the same density.
  const largestColCount = 4;
  const fillerCount = (largestColCount - (cards.length % largestColCount)) % largestColCount;

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      <motion.div variants={itemVariants}>
        <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80">
          Your college · everything tutor-driven
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className={cn(
          'relative grid auto-rows-[220px] sm:auto-rows-[240px] gap-[2px]',
          'bg-black border border-white/[0.08] rounded-2xl overflow-hidden',
          'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
        )}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/60 to-elec-yellow/0 pointer-events-none z-10" />

        {cards.map((card, i) => (
          <button
            key={card.eyebrow}
            type="button"
            onClick={() => navigate(card.route)}
            className="group relative bg-[hsl(0_0%_10%)] hover:bg-elec-yellow/[0.04] transition-colors p-5 sm:p-6 lg:p-7 text-left touch-manipulation flex flex-col h-full"
          >
            <div className="flex items-baseline justify-between gap-2">
              <div className="flex items-baseline gap-2">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80 tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                  · {card.eyebrow}
                </span>
              </div>
              {card.alert && (
                <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-red-300 border border-red-400/30 bg-red-500/10 px-1.5 py-0.5 rounded">
                  Action
                </span>
              )}
            </div>

            <h3 className="mt-3 sm:mt-4 text-[18px] sm:text-[20px] lg:text-[22px] font-semibold tracking-tight leading-[1.15] text-white group-hover:text-elec-yellow transition-colors">
              {card.title}
            </h3>
            <p className="mt-2 text-[12.5px] leading-relaxed text-white/60 max-w-[34ch]">
              {card.description}
            </p>

            <div className="flex-grow" />

            <div className="mt-5 flex items-center justify-between gap-3 pt-3 border-t border-white/[0.05]">
              <span className="text-[11px] text-white/55 truncate tabular-nums">{card.meta}</span>
              <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-elec-yellow shrink-0">
                Open
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </button>
        ))}

        {/* Filler cells so the connected-grid look stays whole on lg
            even when card count isn't a multiple of column count. */}
        {Array.from({ length: fillerCount }).map((_, i) => (
          <div key={`filler-${i}`} aria-hidden className="hidden lg:block bg-[hsl(0_0%_10%)]" />
        ))}
      </motion.div>
    </motion.section>
  );
}
