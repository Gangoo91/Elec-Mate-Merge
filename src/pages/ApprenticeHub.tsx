/**
 * ApprenticeHub — editorial redesign matching ElectricianHub / SiteSafety /
 * BusinessHub / Inspection & Testing / Study Centre.
 *
 * Sticky text-only masthead, date-eyebrow Hero with rotating thematic
 * two-tone tagline + verdict + CTA, numbered hairline-grid sections:
 *   01 · AT A GLANCE        (Streak / Progress / Videos / Diary)
 *   02 · FROM YOUR COLLEGE  (College plan + assigned quizzes)
 *   03 · CORE LEARNING      (Study Centre · Inspection & Testing)
 *   04 · EXAM PREP          (EPA Simulator · AM2 Simulator)
 *   05 · PORTFOLIO & OJT    (Evidence · OJT hours)
 *   06 · LEARNING VIDEOS    (existing widget, unchanged)
 *   07 · TOOLS              (8 quick-access tiles)
 *
 * Black 2px hairline gaps, single yellow accent per row, mobile-flat per the
 * project working agreement.
 */
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import useSEO from '@/hooks/useSEO';
import { useApprenticeData } from '@/hooks/useApprenticeData';
import { useMyIlp } from '@/hooks/useMyIlp';
import { useMyAssignedQuizzes } from '@/hooks/useMyAssignedQuizzes';
import { useVideoInsights } from '@/hooks/apprentice-stats/useVideoInsights';
import { useSiteDiaryEntries } from '@/hooks/site-diary/useSiteDiaryEntries';
import { LearningVideosSection } from '@/components/apprentice/learning-videos/LearningVideosSection';
import { ElecIdBanner } from '@/components/elec-id/ElecIdBanner';
import { VideosWatchedDetailSheet } from '@/components/apprentice/stats-detail/VideosWatchedDetailSheet';
import { DiaryEntriesDetailSheet } from '@/components/apprentice/stats-detail/DiaryEntriesDetailSheet';
import { StudyStreakDetailSheet } from '@/components/apprentice/stats-detail/StudyStreakDetailSheet';
import { ProgressDetailSheet } from '@/components/apprentice/stats-detail/ProgressDetailSheet';
import { cn } from '@/lib/utils';
import { Eyebrow, containerVariants, itemVariants } from '@/components/college/primitives';

// ─────────────────────────────────────────────────────────────────────────
// Editorial helpers
// ─────────────────────────────────────────────────────────────────────────

const partOfDay = (): 'MORNING' | 'AFTERNOON' | 'EVENING' => {
  const h = new Date().getHours();
  if (h < 12) return 'MORNING';
  if (h < 18) return 'AFTERNOON';
  return 'EVENING';
};

const dateEyebrow = (): string => {
  const d = new Date();
  const weekday = d.toLocaleDateString('en-GB', { weekday: 'long' }).toUpperCase();
  const day = d.getDate();
  const month = d.toLocaleDateString('en-GB', { month: 'long' }).toUpperCase();
  return `${weekday} · ${day} ${month} · ${partOfDay()}`;
};

interface HeroHeadline {
  yellow: string;
  white: string;
}

const HEADLINES_OVERDUE: HeroHeadline[] = [
  { yellow: "Tutor's", white: 'set work.' },
  { yellow: 'Stuff', white: 'to catch up on.' },
  { yellow: 'Work', white: 'waiting from college.' },
];

const HEADLINES_STREAK: HeroHeadline[] = [
  { yellow: 'Same', white: 'time tomorrow.' },
  { yellow: 'Day', white: 'after day.' },
  { yellow: 'Keep', white: 'going.' },
];

const HEADLINES_HEALTHY: HeroHeadline[] = [
  { yellow: 'Your', white: 'apprenticeship.' },
  { yellow: 'Course,', white: 'site, log.' },
  { yellow: "What's", white: 'on today.' },
  { yellow: 'Training', white: 'in one place.' },
  { yellow: 'Crack', white: 'on.' },
];

const HEADLINES_EMPTY: HeroHeadline[] = [
  { yellow: 'Year', white: 'one.' },
  { yellow: 'Start', white: 'here.' },
];

const pickHeadline = (pool: HeroHeadline[]): HeroHeadline => {
  const now = new Date();
  const hour = now.getHours();
  const dayOfYear = Math.floor(
    (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000
  );
  return pool[(hour + dayOfYear) % pool.length];
};

// ─────────────────────────────────────────────────────────────────────────
// Sticky masthead
// ─────────────────────────────────────────────────────────────────────────

const PageMasthead = () => {
  const navigate = useNavigate();
  return (
    <div className="sticky top-0 z-50 bg-elec-dark/95 backdrop-blur-sm border-b border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center h-12 gap-4 sm:gap-6">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="text-[12.5px] font-medium text-white hover:text-white transition-colors touch-manipulation whitespace-nowrap"
          >
            ← Back
          </button>
          <div className="flex-1 min-w-0 flex items-baseline gap-2.5">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white hidden sm:inline">
              Apprentice
            </span>
            <span className="hidden sm:inline h-3 w-px bg-white/10" aria-hidden />
            <h1 className="text-[13px] sm:text-sm font-semibold text-white truncate tracking-tight">
              Apprentice Hub
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────
// HeadlineStats
// ─────────────────────────────────────────────────────────────────────────

interface AppStat {
  label: string;
  value: string | number;
  sub?: string;
  accent?: boolean;
  onClick: () => void;
}

const ApprenticeHeadlineStats = ({ stats }: { stats: AppStat[] }) => (
  <motion.section
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    className="space-y-4"
  >
    <motion.div variants={itemVariants}>
      <Eyebrow>01 · AT A GLANCE</Eyebrow>
    </motion.div>

    <motion.div
      variants={itemVariants}
      className="relative grid grid-cols-2 lg:grid-cols-4 gap-[2px] bg-black border border-white/[0.08] rounded-2xl overflow-hidden"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/60 to-elec-yellow/0 pointer-events-none" />

      {stats.map((stat) => {
        const valueStr = String(stat.value);
        const isNumericish =
          typeof stat.value === 'number' || /^[\d.,+\-/%hkm£\s]+$/i.test(valueStr);
        const sizeClass =
          isNumericish && valueStr.length <= 6
            ? 'text-4xl sm:text-5xl lg:text-[56px]'
            : valueStr.length <= 10
              ? 'text-3xl sm:text-4xl lg:text-5xl'
              : 'text-2xl sm:text-3xl lg:text-4xl';

        return (
          <button
            key={stat.label}
            type="button"
            onClick={stat.onClick}
            className={cn(
              'group relative bg-[hsl(0_0%_10%)] px-5 py-6 sm:px-7 sm:py-8 flex flex-col text-left touch-manipulation',
              'hover:bg-elec-yellow/[0.04] transition-colors',
              stat.accent &&
                'bg-gradient-to-br from-elec-yellow/[0.06] via-amber-500/[0.02] to-transparent hover:from-elec-yellow/[0.10]'
            )}
          >
            <div
              className={cn(
                'text-[10px] font-medium uppercase tracking-[0.18em]',
                stat.accent ? 'text-elec-yellow/80' : 'text-white/50'
              )}
            >
              {stat.label}
            </div>
            <span
              className={cn(
                'mt-3 sm:mt-4 font-semibold tabular-nums tracking-tight leading-none',
                sizeClass,
                stat.accent ? 'text-elec-yellow' : 'text-white'
              )}
            >
              {stat.value}
            </span>
            {stat.sub && (
              <span className="mt-3 text-[11.5px] text-white/55 group-hover:text-white/75 transition-colors">
                {stat.sub}
              </span>
            )}
          </button>
        );
      })}
    </motion.div>
  </motion.section>
);

// ─────────────────────────────────────────────────────────────────────────
// EditorialToolGrid
// ─────────────────────────────────────────────────────────────────────────

interface ToolCard {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  to?: string;
  onClick?: () => void;
  meta?: string;
  alert?: boolean;
}

const EditorialToolGrid = ({
  number,
  label,
  cards,
  columns = 'three',
}: {
  number: string;
  label: string;
  cards: ToolCard[];
  columns?: 'two' | 'three' | 'four';
}) => {
  const navigate = useNavigate();
  if (cards.length === 0) return null;

  const colClass =
    columns === 'two'
      ? 'grid-cols-1 sm:grid-cols-2'
      : columns === 'four'
        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
        : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

  const largestColCount = columns === 'two' ? 2 : columns === 'four' ? 4 : 3;
  const fillerCount = (largestColCount - (cards.length % largestColCount)) % largestColCount;

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      <motion.div variants={itemVariants}>
        <Eyebrow>
          {number} · {label}
        </Eyebrow>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className={cn(
          // Content-driven row heights; default `align-items: stretch`
          // keeps same-row cards equal-height so the layout never crops
          // the footer "Open" CTA on the longer card.
          'relative grid gap-[2px] bg-black border border-white/[0.08] rounded-2xl overflow-hidden',
          colClass
        )}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/60 to-elec-yellow/0 pointer-events-none z-10" />

        {cards.map((card, i) => (
          <button
            key={card.id}
            type="button"
            onClick={() => {
              if (card.onClick) card.onClick();
              else if (card.to) navigate(card.to);
            }}
            className="group relative bg-[hsl(0_0%_10%)] hover:bg-elec-yellow/[0.04] transition-colors p-5 sm:p-6 lg:p-7 text-left touch-manipulation flex flex-col h-full min-h-[280px] sm:min-h-[300px] lg:min-h-[320px]"
          >
            <div className="flex items-baseline justify-between gap-2 flex-wrap">
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
            {/* Description — line-clamp keeps the card tidy without ever
                cropping mid-word, no max-width that forces tall wraps in
                narrow cells. */}
            <p className="mt-2 text-[12.5px] leading-relaxed text-white/65 line-clamp-3">
              {card.description}
            </p>

            <div className="flex-grow min-h-[8px]" />

            {/* Footer — stacks vertically by default so the Open CTA gets
                its own line and can never be clipped by long meta text.
                Inline only at lg+ where there's guaranteed horizontal room. */}
            <div className="mt-4 pt-3 border-t border-white/[0.05] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
              <span className="text-[11px] text-white/55 tabular-nums leading-tight">
                {card.meta ?? 'Open'}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-elec-yellow shrink-0 self-start lg:self-auto">
                Open
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </button>
        ))}

        {Array.from({ length: fillerCount }).map((_, i) => (
          <div
            key={`filler-${i}`}
            aria-hidden
            className="hidden lg:block bg-[hsl(0_0%_10%)]"
          />
        ))}
      </motion.div>
    </motion.section>
  );
};

// ─────────────────────────────────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────────────────────────────────

export default function ApprenticeHub() {
  useSEO({
    title: 'Apprentice Hub | Level 2 & 3 Electrical Training',
    description:
      'Complete electrical apprenticeship training platform. Level 2 and Level 3 courses, AM2 exam prep, 2,000+ practice questions, OJT tracking, and industry-recognised qualifications.',
    schema: {
      '@type': 'CollectionPage',
      name: 'Electrical Apprentice Training Hub',
      description:
        'Training hub for UK electrical apprentices pursuing Level 2 and Level 3 qualifications',
      provider: { '@type': 'Organization', name: 'Elec-Mate' },
    },
  });

  const navigate = useNavigate();
  const { stats } = useApprenticeData();
  const { ilp, rollUp, hasCollegeLink } = useMyIlp();
  const { quizzes } = useMyAssignedQuizzes();
  const { watchedCount, totalVideos } = useVideoInsights();
  const { entries } = useSiteDiaryEntries();

  const [streakOpen, setStreakOpen] = useState(false);
  const [progressOpen, setProgressOpen] = useState(false);
  const [videosOpen, setVideosOpen] = useState(false);
  const [diaryOpen, setDiaryOpen] = useState(false);

  const pendingQuizzes = quizzes.filter((q) => q.status !== 'completed');
  const overdueQuizzes = pendingQuizzes.filter((q) => q.status === 'overdue');
  const notStartedQuizzes = pendingQuizzes.filter((q) => q.status === 'not_started');
  const inProgressQuizzes = pendingQuizzes.filter((q) => q.status === 'in_progress');
  const newCount =
    notStartedQuizzes.length + rollUp.unread_tutor_comments + (rollUp.needs_acknowledgement || 0);
  const hasOverdue = overdueQuizzes.length > 0;

  // ── Hero state ───────────────────────────────────────────────────────
  const { headline, verdict, cta } = useMemo(() => {
    if (hasOverdue) {
      return {
        headline: pickHeadline(HEADLINES_OVERDUE),
        verdict: `${overdueQuizzes.length} ${overdueQuizzes.length === 1 ? 'item' : 'items'} overdue from your tutor. Catch up to keep your progress on track.`,
        cta: { label: 'Open college plan', onClick: () => navigate('/apprentice/college-plan') },
      };
    }
    if (stats.learning.currentStreak >= 2) {
      return {
        headline: pickHeadline(HEADLINES_STREAK),
        verdict: `Day ${stats.learning.currentStreak} of your run. One section keeps it alive.`,
        cta: { label: 'Resume study', onClick: () => navigate('/study-centre/apprentice') },
      };
    }
    if (stats.progress.overallPercent > 0 || entries.length > 0) {
      return {
        headline: pickHeadline(HEADLINES_HEALTHY),
        verdict: `${stats.progress.overallPercent}% of your course complete · ${entries.length} diary ${entries.length === 1 ? 'entry' : 'entries'} logged.`,
        cta: { label: 'Resume study', onClick: () => navigate('/study-centre/apprentice') },
      };
    }
    return {
      headline: pickHeadline(HEADLINES_EMPTY),
      verdict: 'Pick a card below to get started.',
      cta: { label: 'Open Study Centre', onClick: () => navigate('/study-centre/apprentice') },
    };
  }, [hasOverdue, overdueQuizzes.length, stats.learning.currentStreak, stats.progress.overallPercent, entries.length, navigate]);

  // ── Stats ────────────────────────────────────────────────────────────
  const statCells: AppStat[] = [
    {
      label: 'Streak',
      value:
        stats.learning.currentStreak === 1
          ? '1 day'
          : `${stats.learning.currentStreak} days`,
      sub: stats.learning.currentStreak >= 7 ? 'On a roll' : 'Keep it going',
      accent: true,
      onClick: () => setStreakOpen(true),
    },
    {
      label: 'Progress',
      value: `${stats.progress.overallPercent}%`,
      sub: 'Course completion',
      onClick: () => setProgressOpen(true),
    },
    {
      label: 'Videos',
      value: totalVideos > 0 ? `${watchedCount}/${totalVideos}` : `${watchedCount}`,
      sub: 'Watched this term',
      onClick: () => setVideosOpen(true),
    },
    {
      label: 'Diary',
      value: entries.length,
      sub: 'Site logbook',
      onClick: () => setDiaryOpen(true),
    },
  ];

  // ── College plan card ────────────────────────────────────────────────
  const collegeDescription = !hasCollegeLink
    ? 'Connect with your college to see goals from your tutor and tick them off here.'
    : pendingQuizzes.length > 0
      ? overdueQuizzes.length > 0
        ? `${overdueQuizzes.length} overdue · ${notStartedQuizzes.length + inProgressQuizzes.length} more pending`
        : notStartedQuizzes.length === 1 && inProgressQuizzes.length === 0
          ? `New from your tutor: ${notStartedQuizzes[0].title}`
          : `${pendingQuizzes.length} ${pendingQuizzes.length === 1 ? 'item' : 'items'} from your tutor — tap to start.`
      : ilp
        ? (ilp.headline_focus ??
          `${rollUp.completed}/${rollUp.total_goals} goals complete · set by your tutor`)
        : 'Your tutor will set goals here you can tick off and reply to.';
  const collegeMeta = ilp ? `${rollUp.completed}/${rollUp.total_goals} goals` : 'Tap to open';

  // ── Tool grids ───────────────────────────────────────────────────────
  const coreLearning: ToolCard[] = [
    {
      id: 'study-centre',
      eyebrow: 'Apprenticeship',
      title: 'Study Centre',
      description: 'Level 2 & 3 courses, practice questions and exam prep — at your own pace.',
      to: '/study-centre/apprentice',
      meta: 'Active course',
    },
    {
      id: 'inspection-testing',
      eyebrow: 'BS 7671',
      title: 'Inspection & Testing',
      description: 'Comprehensive guides, quizzes and BS 7671 regulations.',
      to: '/apprentice/inspection-testing-hub',
      meta: '6 modules',
    },
  ];

  const examPrep: ToolCard[] = [
    {
      id: 'epa',
      eyebrow: 'EPA',
      title: 'EPA Simulator',
      description: 'Mock professional discussions and knowledge tests with AI scoring.',
      to: '/apprentice/epa-simulator',
      meta: 'AI-scored',
    },
    {
      id: 'am2',
      eyebrow: 'AM2',
      title: 'AM2 Simulator',
      description: 'Safe isolation, fault finding and testing simulations.',
      to: '/apprentice/am2-simulator',
      meta: 'Practice tasks',
    },
  ];

  const portfolio: ToolCard[] = [
    {
      id: 'portfolio',
      eyebrow: 'Evidence',
      title: 'Portfolio',
      description:
        'Assessment criteria, evidence quality, EPA gateway readiness, tutor sign-offs — all in one workspace.',
      to: '/apprentice/hub',
      meta: 'Open portfolio',
    },
    {
      id: 'ojt',
      eyebrow: 'OTJ',
      title: 'Off-the-job hours',
      description:
        'Track the 20% off-the-job hours, weekly compliance pace, and evidence behind every entry.',
      to: '/apprentice/ojt-hub',
      meta: 'Open OJT hub',
    },
  ];

  const tools: ToolCard[] = [
    {
      id: 'ai-tutor',
      eyebrow: 'AI tutor',
      title: 'Study assistant',
      description: 'Instant help with theory and exams.',
      to: '/apprentice/advanced-help',
      meta: 'Ask anything',
    },
    {
      id: 'site-diary',
      eyebrow: 'Logbook',
      title: 'Site diary',
      description: 'Log daily site activities and hours.',
      to: '/apprentice/site-diary',
      meta: `${entries.length} ${entries.length === 1 ? 'entry' : 'entries'}`,
    },
    {
      id: 'calculators',
      eyebrow: 'Calculations',
      title: 'Calculators',
      description: 'Cable sizing, voltage drop, and more.',
      to: '/apprentice/calculators',
      meta: 'Open tools',
    },
    {
      id: 'on-job',
      eyebrow: 'Daily work',
      title: 'On-the-job tools',
      description: 'Quick references for site tasks.',
      to: '/apprentice/on-job-tools',
      meta: 'Open',
    },
    {
      id: 'mental-health',
      eyebrow: 'Wellbeing',
      title: 'Mental health',
      description: 'Wellbeing resources and support.',
      to: '/apprentice/mental-health',
      meta: 'Open',
    },
    {
      id: 'progression',
      eyebrow: 'Career',
      title: 'Progression',
      description: 'Plan your career pathway.',
      to: '/apprentice/professional-development',
      meta: 'Open',
    },
    {
      id: 'toolbox',
      eyebrow: 'Reference',
      title: 'Guidance area',
      description: 'Tips, guides and best practices.',
      to: '/apprentice/toolbox',
      meta: 'Browse',
    },
    {
      id: 'settings',
      eyebrow: 'Account',
      title: 'Settings',
      description: 'Subscription, notifications and accessibility.',
      to: '/settings',
      meta: 'Manage',
    },
  ];

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-elec-dark min-h-screen pb-24">
      <PageMasthead />

      <div className="px-4 py-4 space-y-12 sm:space-y-16 max-w-7xl mx-auto">
        {/* Hero */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative pt-2 sm:pt-4"
        >
          <motion.div variants={itemVariants}>
            <Eyebrow>{dateEyebrow()}</Eyebrow>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="mt-3 font-semibold tracking-tight leading-[1.05] text-[34px] sm:text-[44px] lg:text-[56px]"
          >
            <span className="text-elec-yellow">{headline.yellow}</span>{' '}
            <span className="text-white">{headline.white}</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-3 sm:mt-4 text-[14px] sm:text-[15px] leading-relaxed text-white/90 max-w-2xl"
          >
            {verdict}
          </motion.p>

          {cta && (
            <motion.div variants={itemVariants} className="mt-5 sm:mt-6">
              <button
                type="button"
                onClick={cta.onClick}
                className={cn(
                  'group inline-flex items-center gap-2 h-10 px-4 rounded-full',
                  'border border-elec-yellow/25 bg-elec-yellow/10 hover:bg-elec-yellow/20',
                  'text-[13px] font-medium text-elec-yellow touch-manipulation transition-colors'
                )}
              >
                <span>{cta.label}</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </motion.div>
          )}
        </motion.section>

        <ApprenticeHeadlineStats stats={statCells} />

        {/* 02 · FROM YOUR COLLEGE — single hairline cell */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <motion.div variants={itemVariants}>
            <Eyebrow>02 · FROM YOUR COLLEGE</Eyebrow>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="relative bg-[hsl(0_0%_10%)] border border-white/[0.08] rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/60 to-elec-yellow/0 pointer-events-none" />
            <button
              type="button"
              onClick={() => navigate('/apprentice/college-plan')}
              className="group w-full text-left p-5 sm:p-6 lg:p-7 hover:bg-elec-yellow/[0.04] transition-colors touch-manipulation flex flex-col gap-3"
            >
              <div className="flex items-baseline justify-between gap-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80">
                    My college plan
                  </span>
                </div>
                {hasOverdue ? (
                  <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-red-300 border border-red-400/30 bg-red-500/10 px-1.5 py-0.5 rounded">
                    {overdueQuizzes.length} overdue
                  </span>
                ) : newCount > 0 ? (
                  <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-elec-yellow border border-elec-yellow/30 bg-elec-yellow/10 px-1.5 py-0.5 rounded">
                    {newCount} new
                  </span>
                ) : null}
              </div>
              <h3 className="text-[20px] sm:text-[22px] lg:text-[24px] font-semibold tracking-tight leading-[1.15] text-white group-hover:text-elec-yellow transition-colors">
                {hasCollegeLink
                  ? 'Your goals & quizzes from college'
                  : 'Connect with your college'}
              </h3>
              <p className="text-[13px] text-white/60">{collegeDescription}</p>
              <div className="mt-2 flex items-center justify-between pt-3 border-t border-white/[0.05]">
                <span className="text-[11px] text-white/55 uppercase tracking-[0.14em]">
                  {collegeMeta}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-elec-yellow">
                  Open
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </button>
          </motion.div>
        </motion.section>

        <EditorialToolGrid number="03" label="CORE LEARNING" cards={coreLearning} columns="two" />

        <EditorialToolGrid number="04" label="EXAM PREP" cards={examPrep} columns="two" />

        <EditorialToolGrid number="05" label="PORTFOLIO & OTJ" cards={portfolio} columns="two" />

        {/* Elec-ID banner — kept, since it's a high-value account CTA */}
        <motion.section variants={itemVariants}>
          <ElecIdBanner variant="apprentice" />
        </motion.section>

        {/* 06 · LEARNING VIDEOS — existing widget, untouched */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <motion.div variants={itemVariants}>
            <Eyebrow>06 · LEARNING VIDEOS</Eyebrow>
          </motion.div>
          <motion.div variants={itemVariants}>
            <LearningVideosSection />
          </motion.div>
        </motion.section>

        <EditorialToolGrid number="07" label="TOOLS" cards={tools} columns="four" />
      </div>

      {/* Stat detail sheets */}
      <StudyStreakDetailSheet open={streakOpen} onOpenChange={setStreakOpen} />
      <ProgressDetailSheet open={progressOpen} onOpenChange={setProgressOpen} />
      <VideosWatchedDetailSheet open={videosOpen} onOpenChange={setVideosOpen} />
      <DiaryEntriesDetailSheet
        open={diaryOpen}
        onOpenChange={setDiaryOpen}
        entries={entries}
      />
    </div>
  );
}
