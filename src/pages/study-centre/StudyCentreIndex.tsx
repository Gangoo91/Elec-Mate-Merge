import { useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Flame, Trophy, Sparkles } from 'lucide-react';

import { useStudyStreak } from '@/hooks/useStudyStreak';
import { useQuizResults } from '@/hooks/useQuizResults';
import { useLearningXP } from '@/hooks/useLearningXP';
import { useLastStudyLocation } from '@/hooks/useLastStudyLocation';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import useSEO from '@/hooks/useSEO';
import { cn } from '@/lib/utils';

import {
  PageFrame,
  PageHero,
  StatStrip,
  ListCard,
  ListRow,
  HubGrid,
  HubCard,
  Eyebrow,
  type Tone,
} from '@/components/college/primitives';

/* ── Category model ────────────────────────────────────────────────── */

interface CategoryDef {
  id: string;
  number: string;
  title: string;
  description: string;
  meta: string;
  count: number;
  tone: Tone;
  pro?: boolean;
  routeKeys: string[];
  href: string;
}

const CATEGORIES: CategoryDef[] = [
  {
    id: 'apprentice',
    number: '01',
    title: 'Apprentice training',
    description: 'Level 2 & 3 qualifications, AM2 prep and the fundamentals every electrician needs.',
    meta: 'Level 2 · Level 3 · AM2',
    count: 8,
    tone: 'blue',
    routeKeys: ['apprentice'],
    href: '/study-centre/apprentice',
  },
  {
    id: 'upskilling',
    number: '02',
    title: 'Professional upskilling',
    description: 'BS 7671, EV charging, solar PV, smart home and other specialist tracks.',
    meta: 'BS 7671 · EV · Solar PV · Smart home',
    count: 14,
    tone: 'yellow',
    pro: true,
    routeKeys: [
      'upskilling', 'bs7671', 'ev-charging', 'solar-pv', 'smart-home', 'fire-alarm',
      'data-cabling', 'bms', 'inspection-testing', 'industrial-electrical',
      'energy-efficiency', 'fiber-optics', 'instrumentation', 'renewable-energy',
      'emergency-lighting',
    ],
    href: '/study-centre/upskilling',
  },
  {
    id: 'general',
    number: '03',
    title: 'General upskilling',
    description: 'Cross-industry safety — IPAF, first aid, working at height and site essentials.',
    meta: 'IPAF · First aid · COSHH · Fire safety',
    count: 14,
    tone: 'emerald',
    routeKeys: [
      'general-upskilling', 'fire-safety', 'first-aid', 'manual-handling',
      'working-at-height', 'ipaf', 'pasma', 'mewp', 'coshh-awareness',
      'confined-spaces', 'asbestos', 'scaffolding-awareness', 'cdm-regulations',
      'cscs-card', 'environmental-sustainability',
    ],
    href: '/study-centre/general-upskilling',
  },
  {
    id: 'personal',
    number: '04',
    title: 'Personal development',
    description: 'Leadership, emotional intelligence, resilience and the soft skills that compound.',
    meta: 'Leadership · Mental health · Communication',
    count: 10,
    tone: 'purple',
    routeKeys: [
      'personal-development', 'leadership-on-site', 'mental-health',
      'mental-health-awareness', 'communication-confidence', 'conflict-resolution',
      'emotional-intelligence', 'resilience-stress-management',
      'time-management-organisation', 'goal-setting-growth',
      'mentoring-developing-others', 'personal-finance',
    ],
    href: '/study-centre/personal-development',
  },
];

/* ── Page ──────────────────────────────────────────────────────────── */

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
  const quizResults = quizData?.results || [];
  const totalQuizzes = quizResults.length;
  const avgScore = useMemo(
    () =>
      quizResults.length > 0
        ? Math.round(
            quizResults.reduce((acc: number, r: any) => acc + (r.score || r.percentage || 0), 0) /
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

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <PageHero
            eyebrow="Learning"
            title="Study centre"
            description="Apprentice training, CPD and the soft skills that round out a career — track every minute, every quiz, every win."
            tone="purple"
            actions={
              <>
                {currentStreak >= 2 && (
                  <span className="inline-flex items-center gap-1.5 h-9 px-3 rounded-full bg-elec-yellow/10 border border-elec-yellow/25 text-elec-yellow text-[12px] font-semibold">
                    <Flame className="h-3.5 w-3.5" />
                    {currentStreak}-day streak
                  </span>
                )}
                <button
                  onClick={() => navigate('/study-centre/leaderboard')}
                  className="inline-flex items-center gap-1.5 h-10 px-4 rounded-full bg-white/[0.04] border border-white/[0.08] text-white text-[12.5px] font-medium hover:bg-white/[0.08] transition-colors touch-manipulation"
                >
                  <Trophy className="h-3.5 w-3.5 text-elec-yellow" />
                  Leaderboard
                </button>
              </>
            }
          />

          {/* Continue where you left off — only when there's somewhere to go */}
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
                    <div className="mt-1 text-[12px] text-white">{getLastStudiedDisplay()}</div>
                  </div>
                  <div className="shrink-0 mt-1 h-10 w-10 rounded-full bg-elec-yellow/15 border border-elec-yellow/30 flex items-center justify-center">
                    <ArrowRight className="h-4 w-4 text-elec-yellow" />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Snapshot — XP / Streak / Quizzes / Progress */}
          <StatStrip
            columns={4}
            stats={[
              {
                label: 'Total XP',
                value: totalXP.toLocaleString(),
                sub: `Level ${level} · ${Math.round(xpProgress)}%`,
              },
              {
                label: 'Streak',
                value: currentStreak,
                sub: currentStreak > 0 ? 'days running' : 'Start today',
              },
              {
                label: 'Quizzes',
                value: totalQuizzes,
                sub: totalQuizzes > 0 ? `Avg ${avgScore}%` : 'Take your first',
              },
              {
                label: 'Completed',
                value: `${totalCompleted}/${totalCourses}`,
                sub: 'courses',
              },
            ]}
          />

          {/* Categories — black hairline dividers between cards */}
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3 px-0.5">
              <Eyebrow>Categories</Eyebrow>
              <span className="text-[11px] text-white">{totalCourses} courses</span>
            </div>

            <HubGrid columns={2} className="!bg-black gap-[1.5px]">
              {CATEGORIES.map((c) => {
                const completed = completedByCategory[c.id] ?? 0;
                return (
                  <HubCard
                    key={c.id}
                    number={c.number}
                    eyebrow={c.title.toUpperCase()}
                    title={c.title}
                    description={c.description}
                    meta={`${c.meta} · ${c.count} courses${c.pro ? ' · Pro' : ''}`}
                    tone={c.tone}
                    cta={completed > 0 ? `Continue · ${completed}/${c.count}` : 'Start learning'}
                    onClick={() => navigate(c.href)}
                    badge={
                      c.pro ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-elec-yellow/10 border border-elec-yellow/30 text-elec-yellow text-[10px] font-bold uppercase tracking-wider">
                          Pro
                        </span>
                      ) : undefined
                    }
                  />
                );
              })}
            </HubGrid>
          </div>

          {/* Recent activity / Achievements teaser */}
          <ListCard>
            <div className="relative px-5 sm:px-6 py-3.5 sm:py-4 border-b border-white/[0.06]">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-purple-500/70 via-violet-400/70 to-indigo-400/70 opacity-70" />
              <div className="flex items-center justify-between gap-2">
                <div className="text-[13px] font-semibold text-white">Your progress</div>
                <Link
                  to="/study-centre/leaderboard"
                  className="text-[12px] font-medium text-elec-yellow hover:text-white transition-colors"
                >
                  Leaderboard →
                </Link>
              </div>
            </div>
            <div>
              <ListRow
                lead={<span className="h-2 w-2 rounded-full bg-elec-yellow block" />}
                title={`Level ${level}`}
                subtitle={`${Math.round(xpProgress)}% of the way to level ${level + 1} — keep stacking small wins.`}
                trailing={
                  <span className="text-[11.5px] text-white">{totalXP.toLocaleString()} XP</span>
                }
              />
              <ListRow
                lead={<span className="h-2 w-2 rounded-full bg-orange-400 block" />}
                title={currentStreak > 0 ? `${currentStreak}-day streak` : 'No streak yet'}
                subtitle={
                  currentStreak > 0
                    ? 'One section or quiz a day keeps it alive.'
                    : 'Complete one section or quiz today to start.'
                }
                trailing={
                  currentStreak >= 2 ? (
                    <span className="inline-flex items-center gap-1 text-[11.5px] font-semibold text-elec-yellow">
                      <Flame className="h-3 w-3" />
                      {currentStreak}
                    </span>
                  ) : undefined
                }
              />
              <ListRow
                lead={<span className="h-2 w-2 rounded-full bg-emerald-400 block" />}
                title={totalQuizzes > 0 ? `${totalQuizzes} quizzes taken` : 'No quizzes yet'}
                subtitle={
                  totalQuizzes > 0
                    ? `Average score ${avgScore}% — keep nudging it up.`
                    : 'Take a quiz to start scoring yourself.'
                }
                trailing={
                  totalQuizzes > 0 ? (
                    <span className="text-[11.5px] text-white">{avgScore}%</span>
                  ) : undefined
                }
              />
            </div>
          </ListCard>

          {/* Quick tip — single-line, no animation, plays well on mobile */}
          <div
            className={cn(
              'rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06] px-5 py-4',
              'flex items-start gap-3'
            )}
          >
            <Sparkles className="h-4 w-4 text-elec-yellow shrink-0 mt-0.5" />
            <p className="text-[12.5px] sm:text-[13px] text-white leading-relaxed">
              One quiz a day keeps your streak alive and locks knowledge in. Consistency beats intensity.
            </p>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
