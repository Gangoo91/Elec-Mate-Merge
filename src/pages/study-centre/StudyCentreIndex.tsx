/**
 * StudyCentreIndex — editorial design matching ElectricianHub / SiteSafety /
 * BusinessHub / Inspection & Testing.
 *
 * Sticky text-only masthead, date-eyebrow Hero with rotating thematic
 * two-tone tagline + verdict + CTA, `01 · THIS MONTH` HeadlineStats, then
 * hairline grids for `02 · CONTINUE` (when there's a last location),
 * `03 · YOUR LEARNING` and `04 · MOMENTUM`. Black 2px gaps, mobile-flat,
 * single yellow accent per row.
 */
import { useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Flame, Trophy, Play } from 'lucide-react';

import { useStudyStreak } from '@/hooks/useStudyStreak';
import { useQuizResults } from '@/hooks/useQuizResults';
import { useLearningXP } from '@/hooks/useLearningXP';
import { useLastStudyLocation } from '@/hooks/useLastStudyLocation';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import { completedSectionsForCourse } from '@/lib/courseProgressMatch';
import useSEO from '@/hooks/useSEO';
import { cn } from '@/lib/utils';

import { Eyebrow, containerVariants, itemVariants } from '@/components/college/primitives';
import { curatedVideos } from '@/data/apprentice/curatedVideos';

// A few strong titles to preview in the video card thumbnail strip
const VIDEO_PREVIEW_IDS = ['c9gm_NL7KyE', 'jcY4QN7awEc', '59HBoIXzX_c', 'J3kKNNizARc'];

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

const HEADLINES_STREAK: HeroHeadline[] = [
  { yellow: 'Streak', white: 'alive.' },
  { yellow: 'Keep', white: 'the chain going.' },
  { yellow: 'One more', white: 'section, day done.' },
  { yellow: 'Discipline', white: 'compounds.' },
];

const HEADLINES_HEALTHY: HeroHeadline[] = [
  { yellow: 'Stack', white: 'the small wins.' },
  { yellow: 'Knowledge', white: 'compounds.' },
  { yellow: 'Five minutes,', white: 'every day.' },
  { yellow: 'Read.', white: 'Quiz. Repeat.' },
  { yellow: 'Sharpen', white: 'the saw.' },
];

const HEADLINES_EMPTY: HeroHeadline[] = [
  { yellow: 'Pick a course.', white: 'Push play.' },
  { yellow: 'Start', white: 'the streak.' },
  { yellow: 'Open.', white: 'Study. Done.' },
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
// Sticky masthead — College pattern
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
              Learning
            </span>
            <span className="hidden sm:inline h-3 w-px bg-white/10" aria-hidden />
            <h1 className="text-[13px] sm:text-sm font-semibold text-white truncate tracking-tight">
              Study Centre
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────
// Categories
// ─────────────────────────────────────────────────────────────────────────

interface CategoryDef {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  count: number;
  routeKeys: string[];
  href: string;
}

const CATEGORIES: CategoryDef[] = [
  {
    id: 'apprentice',
    eyebrow: 'APPRENTICE',
    title: 'Apprentice training',
    description:
      'Level 2 & 3 qualifications, AM2 prep and the fundamentals every electrician needs.',
    count: 8,
    routeKeys: ['apprentice'],
    href: '/study-centre/apprentice',
  },
  {
    id: 'upskilling',
    eyebrow: 'CPD',
    title: 'Professional upskilling',
    description: 'BS 7671, EV charging, solar PV, smart home and other specialist tracks.',
    count: 14,
    routeKeys: [
      'upskilling',
      'bs7671',
      'ev-charging',
      'solar-pv',
      'smart-home',
      'fire-alarm',
      'data-cabling',
      'bms',
      'inspection-testing',
      'industrial-electrical',
      'energy-efficiency',
      'fiber-optics',
      'instrumentation',
      'renewable-energy',
      'emergency-lighting',
    ],
    href: '/study-centre/upskilling',
  },
  {
    id: 'general',
    eyebrow: 'SAFETY',
    title: 'General upskilling',
    description: 'Cross-industry safety — IPAF, first aid, working at height and site essentials.',
    count: 14,
    routeKeys: [
      'general-upskilling',
      'fire-safety',
      'first-aid',
      'manual-handling',
      'working-at-height',
      'ipaf',
      'pasma',
      'mewp',
      'coshh-awareness',
      'confined-spaces',
      'asbestos',
      'scaffolding-awareness',
      'cdm-regulations',
      'cscs-card',
      'environmental-sustainability',
    ],
    href: '/study-centre/general-upskilling',
  },
  {
    id: 'personal',
    eyebrow: 'GROWTH',
    title: 'Personal development',
    description:
      'Leadership, emotional intelligence, resilience and the soft skills that compound.',
    count: 10,
    routeKeys: [
      'personal-development',
      'leadership-on-site',
      'mental-health',
      'mental-health-awareness',
      'communication-confidence',
      'conflict-resolution',
      'emotional-intelligence',
      'resilience-stress-management',
      'time-management-organisation',
      'goal-setting-growth',
      'mentoring-developing-others',
      'personal-finance',
    ],
    href: '/study-centre/personal-development',
  },
];

// ─────────────────────────────────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────────────────────────────────

export default function StudyCentreIndex() {
  const navigate = useNavigate();
  const studyStreakData = useStudyStreak();
  const quizData = useQuizResults();
  const xpData = useLearningXP();
  const { lastLocation, loading: lastLocLoading, getLastStudiedDisplay } = useLastStudyLocation();
  const { allProgress } = useCourseProgress();

  useSEO({
    title: 'Study Centre | Electrical Training & CPD Courses',
    description:
      'Comprehensive electrical training for apprentices and qualified electricians. Level 2 & 3 courses, 18th Edition BS 7671, inspection & testing, EV charging, solar PV, and 2,000+ practice questions.',
    schema: {
      '@type': 'CollectionPage',
      name: 'Elec-Mate Study Centre',
      description:
        'Educational hub for UK electrical professionals - apprenticeship training and CPD courses',
      provider: { '@type': 'Organization', name: 'Elec-Mate' },
    },
  });

  const currentStreak = studyStreakData?.streak?.currentStreak || 0;
  const longestStreak = studyStreakData?.streak?.longestStreak ?? 0;
  const quizResults = useMemo(
    () => (quizData?.results || []) as Array<{ score?: number; percentage?: number }>,
    [quizData?.results]
  );
  const totalQuizzes = quizResults.length;
  const avgScore = useMemo(
    () =>
      quizResults.length > 0
        ? Math.round(
            quizResults.reduce((acc, r) => acc + (r.score ?? r.percentage ?? 0), 0) /
              quizResults.length
          )
        : 0,
    [quizResults]
  );
  const totalXP = xpData?.totalXP ?? 0;
  const level = xpData?.level ?? 1;
  const xpProgress = xpData?.xpProgress ?? 0;

  const completedByCategory = useMemo(() => {
    const map: Record<string, number> = {};
    for (const cat of CATEGORIES) {
      map[cat.id] = cat.routeKeys.reduce(
        (sum, k) => sum + completedSectionsForCourse(allProgress, k),
        0
      );
    }
    return map;
  }, [allProgress]);

  const totalCompleted = Object.values(completedByCategory).reduce((a, b) => a + b, 0);
  const totalCourses = CATEGORIES.reduce((a, c) => a + c.count, 0);

  // ── Hero state ───────────────────────────────────────────────────────
  const { headline, verdict } = useMemo(() => {
    if (currentStreak >= 2) {
      return {
        headline: pickHeadline(HEADLINES_STREAK),
        verdict: `Day ${currentStreak} of your run. One section keeps it alive.`,
      };
    }
    if (totalCompleted > 0 || totalQuizzes > 0) {
      const completedPart =
        totalCompleted > 0
          ? `${totalCompleted} ${totalCompleted === 1 ? 'course' : 'courses'} complete`
          : '';
      const quizPart =
        totalQuizzes > 0
          ? `${totalQuizzes} ${totalQuizzes === 1 ? 'quiz' : 'quizzes'} taken${avgScore > 0 ? ` · avg ${avgScore}%` : ''}`
          : '';
      const bits = [completedPart, quizPart].filter(Boolean).join(' · ');
      return {
        headline: pickHeadline(HEADLINES_HEALTHY),
        verdict: `${bits}. Keep stacking small wins.`,
      };
    }
    return {
      headline: pickHeadline(HEADLINES_EMPTY),
      verdict: 'Pick a course and start. Five minutes a day builds expertise that compounds.',
    };
  }, [currentStreak, totalCompleted, totalQuizzes, avgScore]);

  // Calm monochrome stats — single yellow accent on Streak (the headline signal)
  const stats = [
    {
      label: 'Streak',
      value: currentStreak,
      sub: currentStreak > 0 ? 'days running' : 'Start today',
      accent: true,
      onClick: () => navigate('/study-centre/leaderboard'),
    },
    {
      label: 'Total XP',
      value: totalXP.toLocaleString(),
      sub: `Level ${level} · ${Math.round(xpProgress)}%`,
      onClick: () => navigate('/study-centre/leaderboard'),
    },
    {
      label: 'Quizzes',
      value: totalQuizzes,
      sub: totalQuizzes > 0 ? `Avg ${avgScore}%` : 'Take your first',
      onClick: () => navigate('/study-centre/apprentice'),
    },
    {
      label: 'Completed',
      value: `${totalCompleted}/${totalCourses}`,
      sub: 'courses',
      onClick: () => navigate('/study-centre/apprentice'),
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

          <motion.div
            variants={itemVariants}
            className="mt-5 sm:mt-6 flex flex-wrap items-center gap-2"
          >
            {currentStreak >= 2 && (
              <span className="inline-flex items-center gap-1.5 h-9 px-3 rounded-full bg-elec-yellow/10 border border-elec-yellow/25 text-elec-yellow text-[12px] font-semibold">
                <Flame className="h-3.5 w-3.5" />
                {currentStreak}-day streak
              </span>
            )}
            <button
              type="button"
              onClick={() => navigate('/study-centre/leaderboard')}
              className={cn(
                'group inline-flex items-center gap-2 h-10 px-4 rounded-full',
                'border border-elec-yellow/25 bg-elec-yellow/10 hover:bg-elec-yellow/20',
                'text-[13px] font-medium text-elec-yellow touch-manipulation transition-colors'
              )}
            >
              <Trophy className="h-3.5 w-3.5" />
              <span>Leaderboard</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </motion.div>
        </motion.section>

        {/* 01 · THIS MONTH — calm monochrome stats */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <motion.div variants={itemVariants}>
            <Eyebrow>01 · THIS MONTH</Eyebrow>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="relative grid grid-cols-2 lg:grid-cols-4 gap-[2px] bg-black border border-white/[0.08] rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/60 to-elec-yellow/0 pointer-events-none" />

            {stats.map((stat) => {
              const valueStr = String(stat.value);
              const sizeClass =
                valueStr.length <= 4
                  ? 'text-4xl sm:text-5xl lg:text-[56px]'
                  : valueStr.length <= 8
                    ? 'text-3xl sm:text-4xl lg:text-5xl'
                    : 'text-2xl sm:text-3xl lg:text-4xl';

              return (
                <button
                  key={stat.label}
                  type="button"
                  onClick={stat.onClick}
                  className={cn(
                    'group relative bg-[hsl(0_0%_10%)] px-5 py-6 sm:px-7 sm:py-8 flex flex-col text-left touch-manipulation',
                    'hover:bg-[hsl(0_0%_15%)] transition-colors',
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

        {/* 02 · CONTINUE — single hairline cell when there's a last location */}
        {lastLocation && !lastLocLoading && (
          <motion.section
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <motion.div variants={itemVariants}>
              <Eyebrow>02 · CONTINUE</Eyebrow>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="relative bg-[hsl(0_0%_10%)] border border-white/[0.08] rounded-2xl overflow-hidden"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/60 to-elec-yellow/0 pointer-events-none" />
              <Link
                to={lastLocation.path}
                className="group block w-full text-left p-5 sm:p-6 lg:p-7 hover:bg-white/[0.06] transition-colors touch-manipulation flex flex-col gap-3"
              >
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80">
                  Continue where you left off
                </span>
                <h3 className="text-[20px] sm:text-[22px] lg:text-[24px] font-semibold tracking-tight leading-[1.15] text-white group-hover:text-elec-yellow transition-colors">
                  {lastLocation.title}
                </h3>
                <p className="text-[13px] text-white/60">{getLastStudiedDisplay()}</p>
                <div className="mt-2 flex items-center justify-between pt-3 border-t border-white/[0.05]">
                  <span className="text-[11px] text-white/55 uppercase tracking-[0.14em]">
                    Pick up where you left off
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-elec-yellow">
                    Resume
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            </motion.div>
          </motion.section>
        )}

        {/* 03 · YOUR LEARNING — monochrome category grid */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <motion.div variants={itemVariants} className="flex items-end justify-between gap-4">
            <Eyebrow>{lastLocation ? '03 · YOUR LEARNING' : '02 · YOUR LEARNING'}</Eyebrow>
            <span className="text-[11px] text-white/50 tabular-nums">{totalCourses} courses</span>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="relative grid grid-cols-1 sm:grid-cols-2 gap-[2px] bg-black border border-white/[0.08] rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/60 to-elec-yellow/0 pointer-events-none z-10" />

            {CATEGORIES.map((c, i) => {
              const completed = completedByCategory[c.id] ?? 0;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => navigate(c.href)}
                  className="group relative bg-[hsl(0_0%_10%)] hover:bg-[hsl(0_0%_15%)] transition-colors p-6 sm:p-7 lg:p-8 text-left touch-manipulation flex flex-col min-h-[220px] sm:min-h-[240px]"
                >
                  <div className="flex items-baseline gap-2">
                    <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80 tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                      · {c.eyebrow}
                    </span>
                  </div>

                  <h3 className="mt-4 sm:mt-5 text-2xl sm:text-[26px] lg:text-[30px] font-semibold tracking-tight leading-[1.1] text-white group-hover:text-elec-yellow transition-colors">
                    {c.title}
                  </h3>

                  <p className="mt-2.5 text-[13px] leading-relaxed text-white/60 max-w-[40ch]">
                    {c.description}
                  </p>

                  <div className="flex-grow" />

                  <div className="mt-6 flex items-center justify-between gap-3 pt-4 border-t border-white/[0.05]">
                    <span className="text-[11.5px] text-white/65 truncate tabular-nums">
                      {completed > 0
                        ? `${completed}/${c.count} courses · keep going`
                        : `${c.count} courses · start today`}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-elec-yellow shrink-0">
                      {completed > 0 ? 'Continue' : 'Open'}
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </button>
              );
            })}
          </motion.div>
        </motion.section>

        {/* WATCH & LEARN — surfaces the curated video library */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <motion.div variants={itemVariants}>
            <Eyebrow>WATCH &amp; LEARN</Eyebrow>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="relative bg-[hsl(0_0%_10%)] border border-white/[0.08] rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/60 to-elec-yellow/0 pointer-events-none" />
            <Link
              to="/study-centre/videos"
              className="group block w-full text-left p-5 sm:p-6 lg:p-7 hover:bg-white/[0.06] transition-colors touch-manipulation"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7">
                {/* Thumbnail strip */}
                <div className="flex -space-x-3 shrink-0">
                  {VIDEO_PREVIEW_IDS.map((vid, i) => (
                    <div
                      key={vid}
                      className="relative w-[68px] sm:w-[84px] aspect-video rounded-lg overflow-hidden border-2 border-[hsl(0_0%_10%)] bg-black/40"
                      style={{ zIndex: VIDEO_PREVIEW_IDS.length - i }}
                    >
                      <img
                        src={`https://img.youtube.com/vi/${vid}/mqdefault.jpg`}
                        alt=""
                        aria-hidden
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80">
                    Video library
                  </span>
                  <h3 className="mt-1.5 text-[20px] sm:text-[22px] lg:text-[24px] font-semibold tracking-tight leading-[1.15] text-white group-hover:text-elec-yellow transition-colors">
                    {curatedVideos.length} hand-picked training videos
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-white/60 max-w-[52ch]">
                    Electrical theory, three-phase, transformers, motors, testing and tools — short,
                    watchable lessons to sharpen the fundamentals on a break.
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-elec-yellow">
                    <Play className="h-3.5 w-3.5 fill-elec-yellow" />
                    Browse videos
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        </motion.section>

        {/* 04 · MOMENTUM — newspaper-style closer */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <motion.div variants={itemVariants}>
            <Eyebrow>{lastLocation ? '04 · MOMENTUM' : '03 · MOMENTUM'}</Eyebrow>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-[2px] bg-black border border-white/[0.08] rounded-2xl overflow-hidden"
          >
            <div className="bg-[hsl(0_0%_10%)] p-5 sm:p-6">
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/50">
                Level
              </div>
              <div className="mt-2 text-3xl sm:text-4xl font-semibold tabular-nums text-white leading-none">
                {level}
              </div>
              <div className="mt-3 text-[12px] text-white/55">
                {Math.round(xpProgress)}% to level {level + 1}
              </div>
              <div className="mt-3 h-1 rounded-full bg-white/[0.06] overflow-hidden">
                <div
                  className="h-full bg-elec-yellow/70"
                  style={{ width: `${Math.min(xpProgress, 100)}%` }}
                />
              </div>
            </div>

            <div className="bg-[hsl(0_0%_10%)] p-5 sm:p-6">
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/50">
                Best run
              </div>
              <div className="mt-2 text-3xl sm:text-4xl font-semibold tabular-nums text-white leading-none">
                {longestStreak}
              </div>
              <div className="mt-3 text-[12px] text-white/55">
                {currentStreak > 0
                  ? `Today is day ${currentStreak} of your current run.`
                  : 'No active streak — open one section to start.'}
              </div>
            </div>

            <div className="bg-[hsl(0_0%_10%)] p-5 sm:p-6">
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/50">
                Average score
              </div>
              <div className="mt-2 text-3xl sm:text-4xl font-semibold tabular-nums text-white leading-none">
                {totalQuizzes > 0 ? `${avgScore}%` : '—'}
              </div>
              <div className="mt-3 text-[12px] text-white/55">
                {totalQuizzes > 0
                  ? `Across ${totalQuizzes} quiz${totalQuizzes === 1 ? '' : 'zes'}.`
                  : 'Take your first quiz to start scoring.'}
              </div>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}
