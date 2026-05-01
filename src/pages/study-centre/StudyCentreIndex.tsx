/**
 * StudyCentreIndex — editorial design matching the main Dashboard.
 *
 * Calm monochrome stat strip (single yellow accent), numbered editorial
 * sections (01 · THIS MONTH, 02 · YOUR LEARNING, 03 · MOMENTUM), custom hub
 * grid mirroring EditorialHubGrid. No multi-tone gradients — restraint.
 */
import { useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Flame, Trophy } from 'lucide-react';

import { useStudyStreak } from '@/hooks/useStudyStreak';
import { useQuizResults } from '@/hooks/useQuizResults';
import { useLearningXP } from '@/hooks/useLearningXP';
import { useLastStudyLocation } from '@/hooks/useLastStudyLocation';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import { useAuth } from '@/contexts/AuthContext';
import useSEO from '@/hooks/useSEO';
import { cn } from '@/lib/utils';

import {
  PageFrame,
  Eyebrow,
  containerVariants,
  itemVariants,
} from '@/components/college/primitives';

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

export default function StudyCentreIndex() {
  const navigate = useNavigate();
  const { profile } = useAuth();
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
      map[cat.id] = allProgress.filter(
        (p) =>
          p.completed &&
          cat.routeKeys.some((k) => p.course_key === k || p.course_key.startsWith(k + '/'))
      ).length;
    }
    return map;
  }, [allProgress]);

  const totalCompleted = Object.values(completedByCategory).reduce((a, b) => a + b, 0);
  const totalCourses = CATEGORIES.reduce((a, c) => a + c.count, 0);

  // Personalised greeting matching VerdictHero pattern
  const firstName = profile?.full_name?.split(' ')[0] || 'there';
  const greeting = `Hello, ${firstName}.`;
  const verdict =
    currentStreak >= 2
      ? `${currentStreak}-day streak going. One section a day keeps it alive.`
      : totalQuizzes === 0
        ? 'Pick a course and start. Five minutes a day builds expertise that compounds.'
        : `${totalCompleted} courses complete, ${totalQuizzes} quizzes taken. Keep stacking small wins.`;

  // Calm monochrome stats — single yellow accent on Streak (the headline signal)
  const stats = [
    {
      label: 'Streak',
      value: currentStreak,
      sub: currentStreak > 0 ? 'days running' : 'Start today',
      accent: true,
      href: '/study-centre/leaderboard',
    },
    {
      label: 'Total XP',
      value: totalXP.toLocaleString(),
      sub: `Level ${level} · ${Math.round(xpProgress)}%`,
      href: '/study-centre/leaderboard',
    },
    {
      label: 'Quizzes',
      value: totalQuizzes,
      sub: totalQuizzes > 0 ? `Avg ${avgScore}%` : 'Take your first',
      href: '/study-centre/apprentice',
    },
    {
      label: 'Completed',
      value: `${totalCompleted}/${totalCourses}`,
      sub: 'courses',
      href: '/study-centre/apprentice',
    },
  ];

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <div className="space-y-12 sm:space-y-16">
            {/* Back to dashboard — small ghost affordance, sits above the
                hero so it doesn't compete with the greeting display type */}
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="group -mb-8 sm:-mb-12 inline-flex items-center gap-2 h-9 -ml-1 px-2 rounded-lg text-[12.5px] font-medium text-white/60 hover:text-white hover:bg-white/[0.04] transition-colors touch-manipulation"
              aria-label="Back to dashboard"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
              <span>Dashboard</span>
            </button>

            {/* Greeting hero — VerdictHero pattern */}
            <motion.section
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="relative pt-2 sm:pt-4"
            >
              <motion.div variants={itemVariants}>
                <Eyebrow>Learning</Eyebrow>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className={cn(
                  'mt-3 font-semibold tracking-tight leading-[1.05]',
                  'text-[34px] sm:text-[44px] lg:text-[56px]'
                )}
              >
                <span className="text-elec-yellow">Hello, </span>
                <span className="text-white">{firstName}.</span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="mt-3 sm:mt-4 text-[14px] sm:text-[15px] leading-relaxed text-white/75 max-w-2xl"
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

              {/* Hidden but keeps greeting connected for screen readers */}
              <span className="sr-only">{greeting}</span>
            </motion.section>

            {/* Continue where you left off */}
            {lastLocation && !lastLocLoading && (
              <Link
                to={lastLocation.path}
                className="block touch-manipulation active:scale-[0.99] transition-transform"
              >
                <div className="relative overflow-hidden rounded-2xl border border-elec-yellow/20 bg-gradient-to-br from-elec-yellow/[0.08] via-amber-500/[0.04] to-transparent p-5">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/70 via-amber-400/70 to-orange-400/70 opacity-70" />
                  <div className="flex items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <Eyebrow>Continue where you left off</Eyebrow>
                      <div className="mt-1.5 text-[16px] sm:text-[18px] font-semibold text-white truncate">
                        {lastLocation.title}
                      </div>
                      <div className="mt-1 text-[12px] text-white/60">
                        {getLastStudiedDisplay()}
                      </div>
                    </div>
                    <div className="shrink-0 mt-1 h-10 w-10 rounded-full bg-elec-yellow/15 border border-elec-yellow/30 flex items-center justify-center">
                      <ArrowRight className="h-4 w-4 text-elec-yellow" />
                    </div>
                  </div>
                </div>
              </Link>
            )}

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
                className="relative grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] border border-white/[0.08] rounded-2xl overflow-hidden"
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
                      onClick={() => navigate(stat.href)}
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

            {/* 02 · YOUR LEARNING — monochrome category grid */}
            <motion.section
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              <motion.div variants={itemVariants} className="flex items-end justify-between gap-4">
                <Eyebrow>02 · YOUR LEARNING</Eyebrow>
                <span className="text-[11px] text-white/50 tabular-nums">
                  {totalCourses} courses
                </span>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="relative grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/[0.06] border border-white/[0.08] rounded-2xl overflow-hidden"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/60 to-elec-yellow/0 pointer-events-none z-10" />

                {CATEGORIES.map((c, i) => {
                  const completed = completedByCategory[c.id] ?? 0;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => navigate(c.href)}
                      className="group relative bg-[hsl(0_0%_10%)] hover:bg-elec-yellow/[0.04] transition-colors p-6 sm:p-7 lg:p-8 text-left touch-manipulation flex flex-col min-h-[220px] sm:min-h-[240px]"
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

            {/* 03 · MOMENTUM — newspaper-style closer */}
            <motion.section
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              <motion.div variants={itemVariants}>
                <Eyebrow>03 · MOMENTUM</Eyebrow>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/[0.06] border border-white/[0.08] rounded-2xl overflow-hidden"
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
                    {studyStreakData?.streak?.longestStreak ?? 0}
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
        </PageFrame>
      </div>
    </div>
  );
}
