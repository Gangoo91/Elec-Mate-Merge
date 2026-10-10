/**
 * StudyCentreIndex — the Study Centre front page (redesigned 9 Oct 2026,
 * ELE-2024, on the College Hub kit).
 *
 * Andrew: "the front page in the study centre should be better, have stats and
 * how they can be better", "best in class on mobile and best in class on
 * desktop". He rated the College Hub "quite good", so this page is built from
 * the same kit (CollegeUi): landing ground, card-landing panels edge to edge on
 * a phone, white typography-only headings, yellow kept for the one action.
 *
 * Reading order is the learner's questions, in order:
 *   1. How am I doing?        header verdict + four figures
 *   2. What should I do now?  the ranked next actions (NextUpCard)
 *   3. How do I get better?   pass forecast, weakest topics, what's due
 *   4. My mocks               last result, trend, recent attempts
 *   5. Revise & test          mock exams, flashcards, revision, videos, glossary
 *   6. Courses                the four tracks
 *
 * Desktop is wide (Andrew 6 Oct): 1–3 sit in a two-thirds column with the mock
 * panel, revise tools and the learner's college course down the right.
 *
 * Kept from the previous version: every count derives from a catalogue (they
 * drifted when typed by hand), sections not courses for completion, the
 * college-linked "Your course" card, and the employer's assigned courses.
 */
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  BookMarked,
  BookOpen,
  ChevronRight,
  FileCheck2,
  Flame,
  Layers,
  PlayCircle,
  RotateCcw,
  Search,
} from 'lucide-react';

import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useStudyStreak } from '@/hooks/useStudyStreak';
import { NextUpCard } from '@/components/study-centre/NextUpCard';
import { AssignedCoursesCard } from '@/components/study-centre/AssignedCoursesCard';
import { MockHistoryCard } from '@/components/study-centre/mock-history/MockHistoryCard';
import { HowToGetBetter } from '@/components/study-centre/insights/HowToGetBetter';
import { useMockHistory, useRevisionPile } from '@/hooks/study-centre/useMockHistory';
import { COURSES, useCourseMap } from '@/hooks/study-centre/useCourseMap';
import { recentAverage, recentPassMark } from '@/lib/study-centre/mockInsights';
import { useLearningXP } from '@/hooks/useLearningXP';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import { completedSectionsForCourse } from '@/lib/courseProgressMatch';
import { getCount as getMissedCount } from '@/lib/missedQuestions';
import useSEO from '@/hooks/useSEO';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { HowItWorks, PageHelpButton, type PageHelpContent } from '@/components/hub/PageHelp';
import {
  COLLEGE_BTN,
  COLLEGE_BTN_PRIMARY,
  CollegeSectionTitle,
} from '@/components/college/ui/CollegeUi';
import { StudyFigures } from '@/components/study-centre/insights/StudyFigures';
import { DailyXpChart } from '@/components/study-centre/insights/charts';
import { useDailyXP } from '@/hooks/study-centre/useDailyXP';
import { WeekPlanCard } from '@/components/study-centre/insights/WeekPlanCard';
import { AwardsTeaser } from '@/components/study-centre/awards/AwardsTeaser';
import { curatedVideos } from '@/data/apprentice/curatedVideos';
import { glossaryTermCount } from '@/components/study-centre/GlossaryView';
import { TOTAL_IN_APP_MOCK_EXAMS } from '@/data/study-centre/inAppMockExams';
import { flashcardSetDefinitions } from '@/data/flashcards';
import { useFlashcardProgress } from '@/hooks/useFlashcardProgress';
import { TOTAL_COURSES, countByTrack, type CourseTrack } from '@/data/study-centre/courseCatalogue';
import { cn } from '@/lib/utils';
import {
  Hairline,
  ProgressRing,
  SC_CARD,
  SC_LIST,
  SC_ROW,
} from '@/components/study-centre/ui/StudyKit';
import { useMyCollegeContext } from '@/hooks/useMyCollegeContext';
import { studySpinesFor } from '@/lib/collegeStudyMap';

// ─────────────────────────────────────────────────────────────────────────
// Tracks
// ─────────────────────────────────────────────────────────────────────────

/**
 * Course counts are not typed here: they drifted from the real lists in both
 * directions (8 apprentice claimed against 6). `countByTrack` derives them.
 */
interface CategoryDef {
  id: CourseTrack;
  title: string;
  description: string;
  routeKeys: string[];
  href: string;
}

const CATEGORIES: CategoryDef[] = [
  {
    id: 'apprentice',
    title: 'Apprentice training',
    // Lead with WHO the track is for: on four near-identical cards that is
    // the question a new learner is asking.
    description: 'For apprentices and college students. Level 2, Level 3 and AM2 prep.',
    routeKeys: ['apprentice'],
    href: '/study-centre/apprentice',
  },
  {
    id: 'upskilling',
    title: 'Professional upskilling',
    description: 'For qualified electricians. BS 7671, inspection and testing, EV and solar PV.',
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
    title: 'Site safety',
    description: 'For everyone on site. IPAF, first aid, working at height and CSCS.',
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
    title: 'Personal development',
    description: 'For every stage of your career. Leadership, confidence and resilience.',
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

const HELP: PageHelpContent = {
  id: 'study-centre-home',
  title: 'The Study Centre',
  what: 'Courses, mock exams and revision in one place. The top of the page tells you how you are doing and what to do next; everything you do here counts towards your streak and level.',
  steps: [
    {
      title: 'Check your figures',
      body: 'Your streak, your mock average against the pass mark, and how many questions are due to revise.',
    },
    {
      title: 'Do the next thing',
      body: '“What to do next” is ranked for you: unfinished sections, weak topics and anything due.',
    },
    {
      title: 'Work on your weak spots',
      body: '“How to get better” shows your weakest topics from your mocks, with a lesson to study and questions to practise for each.',
    },
    {
      title: 'Revise what you got wrong',
      body: 'Every question you get wrong in a mock comes back after a day, three days and a week. Get it right each time and it’s learned.',
    },
  ],
  notes: [
    {
      title: 'Streaks and freezes',
      body: 'Any study on a day (UK time) keeps your streak. Every 7 days in a row earns a streak freeze (you can hold 2); miss a day and one is used automatically so the streak carries on.',
    },
    {
      title: 'What the colours mean',
      body: 'Green is a pass or a strong topic. Orange is below the pass mark or a topic to work on.',
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────

export default function StudyCentreIndex() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const studyStreakData = useStudyStreak();
  // One load, shared by the figures, the forecast and the mock panel.
  const mockHistory = useMockHistory(200);
  const pile = useRevisionPile({ countOnly: true });
  const courseMap = useCourseMap();
  const courseModules = courseMap.courses[courseMap.primary];
  const courseStarted = courseModules.filter((m) => m.sectionsDone > 0 || m.answered > 0).length;
  const courseWeakest = courseModules
    .filter((m) => m.pct !== null && m.pct < 75)
    .sort((a, b) => (a.pct ?? 0) - (b.pct ?? 0))[0];
  const xpData = useLearningXP();
  const { allProgress } = useCourseProgress();

  useSEO({
    title: 'Study Centre | Electrical Training & CPD Courses',
    description:
      'Comprehensive electrical training for apprentices and qualified electricians. Level 2 & 3 courses, 18th Edition BS 7671, inspection & testing, EV charging, solar PV, and 20,000+ practice questions.',
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
  const studiedToday = studyStreakData?.streak?.studiedToday ?? false;
  const freezesHeld = studyStreakData?.streak?.freezesAvailable ?? 0;
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

  // Lesson-quiz misses (local) and flashcards the schedule wants back today.
  const missedCount = user?.id ? getMissedCount(user.id) : 0;
  const { getAllDueCards } = useFlashcardProgress();
  const dueCardCount = getAllDueCards().length;

  const { learner } = useMyCollegeContext();
  const yourSpine = learner
    ? (studySpinesFor(learner.qualification_code, learner.course_level)[0] ?? null)
    : null;

  // ── 1. How am I doing ────────────────────────────────────────────────
  const hasMocks = mockHistory.rows.length > 0;
  // Names are stored however they were typed ("ANDREW", "andrew"); show "Andrew".
  const rawFirst =
    String(user?.user_metadata?.full_name ?? '')
      .trim()
      .split(/\s+/)[0] ?? '';
  const firstName = rawFirst
    ? rawFirst.charAt(0).toUpperCase() + rawFirst.slice(1).toLowerCase()
    : '';
  const mockAvg = recentAverage(mockHistory.rows, 10);
  const passMark = recentPassMark(mockHistory.rows, 10);
  const dueMock = pile.count;

  // The header's one sentence: the figures above, read out as advice.
  // The header's sentence: where you stand, said plainly, then what moves it.
  const verdict = useMemo(() => {
    if (mockAvg === null) {
      return currentStreak > 1
        ? `Day ${currentStreak} of your streak. Sit a mock to see where you stand against the pass mark.`
        : 'Sit a mock to see where you stand, then we’ll point you at the topics that move your score.';
    }
    const gap = passMark - mockAvg;
    const where =
      gap <= 0
        ? `Your mocks average ${mockAvg}%, above the ${passMark}% pass mark.`
        : gap <= 10
          ? `Your mocks average ${mockAvg}%, just ${gap} points off the ${passMark}% pass mark.`
          : `Your mocks average ${mockAvg}% against a ${passMark}% pass mark.`;
    const next =
      dueMock > 0
        ? ` Getting your ${dueMock} wrong ${dueMock === 1 ? 'answer' : 'answers'} right is the quickest way up.`
        : gap > 0
          ? ' Work your weakest topics below, then sit a weak spots mock.'
          : ' Keep it there with a mock a week.';
    return where + next;
  }, [currentStreak, mockAvg, passMark, dueMock]);

  // The one thing to do now, for the hero's main button.
  const nextAction = useMemo(() => {
    if (dueMock > 0)
      return {
        label: `Revise ${dueMock} wrong ${dueMock === 1 ? 'answer' : 'answers'}`,
        to: '/study-centre/mock-exams/revise',
      };
    if (dueCardCount > 0)
      return { label: `Review ${dueCardCount} flashcards`, to: '/study-centre/flashcards' };
    if (mockAvg === null) return { label: 'Sit your first mock', to: '/study-centre/mock-exams' };
    if (mockAvg < passMark)
      return { label: 'Sit a weak spots mock', to: '/study-centre/mock-exams/targeted' };
    return { label: 'Sit a mock', to: '/study-centre/mock-exams' };
  }, [dueMock, dueCardCount, mockAvg, passMark]);

  // This month's place on the board, for the hero.
  const [monthRank, setMonthRank] = useState<{ rank: number; total: number } | null>(null);
  useEffect(() => {
    if (!user) return;
    void supabase
      .rpc('get_study_leaderboard_me' as never, { time_filter: 'month' } as never)
      .then(({ data }) => {
        const r = (data as Array<{ my_rank: number; total_learners: number }> | null)?.[0];
        setMonthRank(
          r && Number(r.my_rank) > 0
            ? { rank: Number(r.my_rank), total: Number(r.total_learners) }
            : null
        );
      });
  }, [user]);
  const xpToday = xpData?.xpToday ?? 0;
  const dailyGoal = xpData?.dailyGoal ?? 100;
  const fortnight = useDailyXP(14, xpToday);
  const monthName = new Date().toLocaleDateString('en-GB', {
    month: 'long',
    timeZone: 'Europe/London',
  });

  // ── 5. Revise & test ─────────────────────────────────────────────────
  const tools = [
    {
      id: 'mock-exams',
      title: 'Mock exams',
      body: `${TOTAL_IN_APP_MOCK_EXAMS} timed papers, marked against the real pass mark`,
      figure: undefined as string | undefined,
      warn: false,
      go: () => navigate('/study-centre/mock-exams'),
    },
    {
      id: 'flashcards',
      title: 'Flashcards',
      body:
        dueCardCount > 0
          ? 'Due for review today'
          : `${flashcardSetDefinitions.length} decks, spaced so you remember them`,
      figure: dueCardCount > 0 ? String(dueCardCount) : undefined,
      warn: dueCardCount > 0,
      go: () => navigate('/study-centre/flashcards'),
    },
    {
      id: 'revision',
      title: 'Quiz revision',
      body:
        missedCount > 0
          ? 'Lesson-quiz questions to win back'
          : 'Replays lesson-quiz questions you get wrong until you beat them',
      figure: missedCount > 0 ? String(missedCount) : undefined,
      warn: missedCount > 0,
      // Opened with state so the session returns here, not to Today.
      go: () =>
        navigate('/apprentice/revision', {
          state: { from: '/study-centre', label: 'Study Centre' },
        }),
    },
    {
      id: 'videos',
      title: 'Video library',
      body: `${curatedVideos.length} training videos`,
      figure: undefined,
      warn: false,
      go: () => navigate('/study-centre/videos'),
    },
    {
      id: 'glossary',
      title: 'Glossary',
      body: `${glossaryTermCount()} terms defined`,
      figure: undefined,
      warn: false,
      go: () => navigate('/study-centre/glossary'),
    },
  ];

  return (
    <HubPage ground="landing">
      <HubMasthead section="Learning" title="Study Centre" backTo="/dashboard" />

      <HubBody>
        {/* Hero: who you are, where you stand, the one thing to do now,
            today's goal and your place this month. */}
        <section className="relative -mx-4 overflow-hidden card-landing max-sm:!rounded-none max-sm:!border-x-0 px-5 py-6 sm:mx-0 sm:rounded-3xl sm:px-8 sm:py-8">
          <Hairline />
          <div className="flex flex-col gap-6 min-[1360px]:grid min-[1360px]:grid-cols-[minmax(0,1fr)_auto] min-[1360px]:gap-x-10">
            <div className="min-w-0">
              <div className="flex items-start justify-between gap-3 min-[1360px]:items-center min-[1360px]:justify-start">
                <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
                  Study Centre
                </p>
                <PageHelpButton help={HELP} className="-mt-2 min-[1360px]:-my-2 min-[1360px]:mt-0" />
              </div>
              <h1 className="mt-1.5 text-[30px] font-bold leading-[1.05] tracking-tight text-white sm:text-[40px]">
                {firstName
                  ? `${currentStreak > 1 ? 'Keep going' : 'Welcome back'}, ${firstName}`
                  : 'Your learning'}
              </h1>
              <p className="mt-2.5 max-w-2xl text-[15px] leading-relaxed text-white">{verdict}</p>
              {/* Streak not yet kept today: one line, and whether a freeze would cover a miss. */}
              {currentStreak > 1 && !studiedToday && !studyStreakData?.loading && (
                <p className="mt-2 flex items-start gap-2 text-[13.5px] leading-snug text-white">
                  <Flame className="mt-[1px] h-4 w-4 shrink-0 text-orange-400" aria-hidden />
                  <span>
                    Study today to keep your {`${currentStreak}\u2011day`} streak.
                    {freezesHeld > 0
                      ? ` Miss it and a freeze covers you (${freezesHeld} held).`
                      : ' No freezes held, so a missed day ends it.'}
                  </span>
                </p>
              )}
            </div>

            {/* The last fortnight as a chart: XP per day against the daily
                goal, today's figure, and this month's place. Replaced a ring
                that only ever showed today (Andrew, 10 Oct: "make the charts
                look professional"). */}
            <div className="order-last min-w-0 rounded-2xl border border-white/[0.1] bg-black/25 p-4 sm:p-5 min-[1360px]:order-none min-[1360px]:col-start-2 min-[1360px]:row-span-2 min-[1360px]:row-start-1 min-[1360px]:w-[400px] min-[1360px]:self-center">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold text-white">
                    Last 14 days · studied on {fortnight.series.filter((d) => d.xp > 0).length}
                  </p>
                  <p className="mt-1 flex items-baseline gap-1.5">
                    <span className="text-[26px] font-bold leading-none tracking-tight tabular-nums text-white">
                      {xpToday}
                    </span>
                    <span className="text-[13px] font-medium text-white">
                      of {dailyGoal} XP today
                    </span>
                  </p>
                </div>
                {xpToday >= dailyGoal ? (
                  <span className="mt-0.5 shrink-0 rounded-full border border-emerald-400/70 px-2.5 py-1 text-[12px] font-semibold text-emerald-300">
                    Goal met
                  </span>
                ) : (
                  <span className="mt-0.5 shrink-0 text-[12px] font-semibold tabular-nums text-white">
                    {dailyGoal - xpToday} to go
                  </span>
                )}
              </div>
              <DailyXpChart days={fortnight.series} goal={dailyGoal} className="mt-5" />
              <button
                type="button"
                onClick={() => navigate('/study-centre/leaderboard')}
                className="group -mx-2 mt-3 flex h-11 w-[calc(100%+1rem)] items-center justify-between gap-3 rounded-xl border-t border-white/[0.1] px-2 text-left touch-manipulation hover:bg-white/[0.04] active:bg-white/[0.06]"
              >
                <span className="min-w-0 truncate text-[13px] font-medium text-white">
                  {monthName}:{' '}
                  <span className="font-semibold">
                    {monthRank ? `#${monthRank.rank} of ${monthRank.total}` : 'not ranked yet'}
                  </span>
                </span>
                <span className="inline-flex shrink-0 items-center gap-1 text-[13px] font-semibold text-elec-yellow">
                  Leaderboard
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </button>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row min-[1360px]:col-start-1 min-[1360px]:row-start-2">
              <button
                type="button"
                onClick={() => navigate(nextAction.to)}
                className={cn(COLLEGE_BTN_PRIMARY, 'h-12 px-5 text-[14.5px]')}
              >
                {nextAction.label}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => navigate('/study-centre/browse')}
                className={cn(COLLEGE_BTN, 'h-12 px-5')}
              >
                <Search className="h-4 w-4" aria-hidden />
                Find a course
              </button>
            </div>
          </div>
        </section>

        {/* Start learning: the courses and study tools, straight under the
            header (Andrew, 10 Oct: "frightened the main learning part will
            get missed having the cards at the bottom"). 3×2 on a phone, one
            row on a computer. Live counts: cards due, questions to win back. */}
        <section aria-labelledby="sc-learn" className="space-y-3">
          <h2
            id="sc-learn"
            className="text-[18px] font-bold tracking-tight text-white sm:text-[20px]"
          >
            Start learning
          </h2>
          {/* Type, not icons (Andrew, 10 Oct: the icon tiles "look so much AI
              written"). Each tile leads with its live figure; what needs doing
              today says so in orange under it. */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 min-[1360px]:grid-cols-6">
            {[
              {
                id: 'courses',
                title: 'Courses',
                n: TOTAL_COURSES,
                unit: 'courses',
                warn: false,
                go: () => navigate('/study-centre/browse'),
              },
              {
                id: 'mock-exams',
                title: 'Mock exams',
                short: 'Mocks',
                n: TOTAL_IN_APP_MOCK_EXAMS,
                unit: 'papers',
                warn: false,
                go: () => navigate('/study-centre/mock-exams'),
              },
              {
                id: 'flashcards',
                title: 'Flashcards',
                n: dueCardCount > 0 ? dueCardCount : flashcardSetDefinitions.length,
                unit: dueCardCount > 0 ? 'due today' : 'decks',
                warn: dueCardCount > 0,
                go: () => navigate('/study-centre/flashcards'),
              },
              {
                id: 'revision',
                title: 'Revision',
                n: missedCount,
                unit: 'to win back',
                warn: missedCount > 0,
                go: tools.find((t) => t.id === 'revision')!.go,
              },
              {
                id: 'videos',
                title: 'Videos',
                n: curatedVideos.length,
                unit: 'videos',
                warn: false,
                go: () => navigate('/study-centre/videos'),
              },
              {
                id: 'glossary',
                title: 'Glossary',
                n: glossaryTermCount(),
                unit: 'terms',
                warn: false,
                go: () => navigate('/study-centre/glossary'),
              },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={t.go}
                className="group relative flex min-h-[108px] min-w-0 flex-col items-start overflow-hidden rounded-2xl border border-white/[0.12] bg-white/[0.04] p-3 text-left transition-colors touch-manipulation active:scale-[0.98] active:bg-white/[0.08] sm:min-h-[124px] sm:p-4 sm:hover:border-white/[0.3] sm:hover:bg-white/[0.06]"
              >
                <span className="flex w-full items-center justify-between gap-1">
                  <span className="truncate text-[13px] font-semibold leading-tight text-white sm:text-[15px]">
                    {/* Three across a phone is ~80px of text: short names there. */}
                    <span className="sm:hidden">{'short' in t && t.short ? t.short : t.title}</span>
                    <span className="hidden sm:inline">{t.title}</span>
                  </span>
                  <ArrowRight
                    className="hidden h-4 w-4 shrink-0 text-white transition-transform group-hover:translate-x-0.5 sm:block"
                    aria-hidden
                  />
                </span>
                <span className="mt-auto pt-3 text-[26px] font-bold leading-none tracking-tight tabular-nums text-white sm:text-[30px]">
                  {t.n.toLocaleString('en-GB')}
                </span>
                <span
                  className={cn(
                    'mt-1 text-[12px] font-medium leading-snug',
                    t.warn ? 'font-semibold text-orange-400' : 'text-white'
                  )}
                >
                  {t.unit}
                </span>
                {t.warn && (
                  <span aria-hidden className="absolute inset-x-0 bottom-0 h-[3px] bg-orange-400" />
                )}
              </button>
            ))}
          </div>
        </section>

        <HowItWorks help={HELP} />

        <StudyFigures
          streak={currentStreak}
          longestStreak={longestStreak}
          lastStudyDate={studyStreakData?.streak?.lastStudyDate ?? null}
          freezes={studyStreakData?.streak?.freezesAvailable ?? 0}
          frozenDays={studyStreakData?.streak?.frozenDays ?? []}
          mockAvg={mockAvg}
          mockCount={mockHistory.rows.length}
          mockScores={mockHistory.rows
            .slice(0, 10)
            .map((r) => r.percentage)
            .reverse()}
          passMark={passMark}
          mockLoading={mockHistory.loading}
          dueMock={dueMock}
          dueCards={dueCardCount}
          dueLoading={pile.loading}
          level={level}
          totalXP={totalXP}
          xpProgress={xpProgress}
          xpToNext={xpData?.xpToNextLevel ?? 0}
          onStreak={() => navigate('/study-centre/leaderboard')}
          onMocks={() =>
            navigate(hasMocks ? '/study-centre/mock-exams/history' : '/study-centre/mock-exams')
          }
          onDue={() =>
            navigate(
              dueMock > 0
                ? '/study-centre/mock-exams/revise'
                : dueCardCount > 0
                  ? '/study-centre/flashcards'
                  : '/study-centre/mock-exams'
            )
          }
          onLevel={() => navigate('/study-centre/leaderboard')}
        />

        {/* Doing on the left, tracking on the right, about the same height
            (10 Oct 2026: the right column used to run out halfway down). On a
            phone the columns dissolve (display: contents) and `order` puts
            the panels in priority order: next, week, awards, get better,
            course, college. */}
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-3 lg:items-start lg:gap-6">
          {/* Doing */}
          <div className="contents lg:col-span-2 lg:block lg:space-y-6">
            <div className="order-1 min-w-0 lg:order-none">
              <NextUpCard streak={currentStreak} plainHeading />
            </div>
            <div className="order-4 min-w-0 lg:order-none">
              {/* ELE-1834: courses the learner's firm asked them to do (none = nothing). */}
              <AssignedCoursesCard variant="study" />
            </div>
            <div className="order-5 min-w-0 lg:order-none">
              <section className="space-y-3" aria-labelledby="sc-better">
                <CollegeSectionTitle
                  id="sc-better"
                  title="How to get better"
                  sub={
                    hasMocks
                      ? 'From every mock you’ve sat. Weakest first.'
                      : 'Your mocks show what to work on.'
                  }
                />
                <HowToGetBetter history={mockHistory} dueCount={dueMock} />
              </section>
            </div>
          </div>

          {/* Tracking */}
          <div className="contents lg:block lg:space-y-6">
            <div className="order-2 min-w-0 lg:order-none">
              {/* The automatic weekly plan from weak spots. */}
              <WeekPlanCard />
            </div>
            <div className="order-3 min-w-0 lg:order-none">
              {/* Awards: the doorway to the section at the foot of the leaderboard. */}
              <AwardsTeaser />
            </div>
            <div className="order-6 min-w-0 lg:order-none">
              {/* Your course: the Study Centre's own modules (never qualification criteria). */}
              <section className="space-y-3" aria-labelledby="sc-course">
                <CollegeSectionTitle id="sc-course" title="Your course" />
                <button
                  type="button"
                  onClick={() => navigate('/study-centre/my-course')}
                  className="group relative -mx-4 block w-[calc(100%+2rem)] overflow-hidden card-landing-interactive max-sm:!rounded-none max-sm:!border-x-0 p-5 text-left touch-manipulation sm:mx-0 sm:w-full sm:rounded-2xl"
                >
                  <Hairline />
                  <span className="flex items-center gap-4">
                    <ProgressRing
                      pct={(courseStarted / courseModules.length) * 100}
                      size={72}
                      stroke={7}
                      label={`${courseStarted} of ${courseModules.length} modules started`}
                    >
                      <span className="text-[16px] font-black leading-none tabular-nums text-white">
                        {courseStarted}/{courseModules.length}
                      </span>
                    </ProgressRing>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[15px] font-semibold leading-snug text-white">
                        {COURSES[courseMap.primary].label}: {courseStarted} of{' '}
                        {courseModules.length} modules started
                      </span>
                      <span className="mt-0.5 block text-[12.5px] text-white">
                        {courseWeakest
                          ? `Module ${courseWeakest.n} is your weakest on mocks (${courseWeakest.pct}%)`
                          : 'Sections studied and mock results, module by module'}
                      </span>
                      <span className="mt-1.5 inline-flex items-center gap-1 text-[12.5px] font-semibold text-elec-yellow">
                        See every module
                        <ArrowRight
                          className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                          aria-hidden
                        />
                      </span>
                    </span>
                  </span>
                </button>
              </section>
            </div>
          </div>
        </div>

        {/* Your college: full width under the columns — who and what on the
            left, the two ways in on the right (one line on a computer). */}
        {learner && (learner.qualification_title || learner.course_name) && (
          <section className="space-y-3" aria-labelledby="sc-college">
            <CollegeSectionTitle id="sc-college" title="Your college" />
            <div className={cn(SC_CARD, 'lg:flex lg:items-center lg:justify-between lg:gap-8')}>
              <div className="min-w-0">
                <p className="text-[13px] font-medium text-white">
                  {[learner.college_name, learner.cohort_name].filter(Boolean).join(' · ')}
                </p>
                <p className="mt-1 text-[16px] font-semibold leading-snug text-white sm:text-[17px]">
                  {learner.qualification_title ?? learner.course_name}
                </p>
              </div>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row lg:mt-0 lg:shrink-0">
                <button
                  type="button"
                  onClick={() => navigate(yourSpine ? yourSpine.to : '/study-centre/apprentice')}
                  className={cn(
                    COLLEGE_BTN_PRIMARY,
                    'whitespace-nowrap px-5 sm:flex-1 lg:flex-none'
                  )}
                >
                  {yourSpine ? `Open ${yourSpine.label}` : 'Browse courses'}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/apprentice/college-plan')}
                  className={cn(COLLEGE_BTN, 'whitespace-nowrap px-5 sm:flex-1 lg:flex-none')}
                >
                  My college
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Mock exams across the full width: the latest result and recent
            sittings beside the trend, which needs the room. */}
        {hasMocks && (
          <section className="space-y-3" aria-labelledby="sc-mocks">
            <CollegeSectionTitle id="sc-mocks" title="Your mock exams" />
            <MockHistoryCard history={mockHistory} wide />
          </section>
        )}

        {/* 6. Courses */}
        <section className="space-y-3" aria-labelledby="sc-courses">
          <CollegeSectionTitle
            id="sc-courses"
            title="Courses"
            sub={
              totalCompleted > 0
                ? `${totalCompleted} ${totalCompleted === 1 ? 'section' : 'sections'} done across ${TOTAL_COURSES} courses`
                : `${TOTAL_COURSES} courses across four tracks`
            }
            action={
              <button
                type="button"
                onClick={() => navigate('/study-centre/browse')}
                className="inline-flex h-11 items-center gap-1 px-1 text-[13px] font-semibold text-elec-yellow touch-manipulation"
              >
                Search all
                <ChevronRight className="h-4 w-4" aria-hidden />
              </button>
            }
          />
          {/* Phone: one list, so four tracks fit on a screen */}
          <div className={cn(SC_LIST, 'sm:hidden')}>
            {CATEGORIES.map((c) => {
              const done = completedByCategory[c.id] ?? 0;
              const count = countByTrack(c.id);
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => navigate(c.href)}
                  className={cn(SC_ROW, 'py-3.5')}
                >
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline gap-2">
                      <span className="text-[15px] font-semibold text-white">{c.title}</span>
                      <span className="text-[12px] font-medium text-white">{count}</span>
                    </span>
                    <span className="mt-0.5 block text-[12.5px] leading-snug text-white">
                      {c.description}
                    </span>
                    {done > 0 && (
                      <span className="mt-1 block text-[12px] font-semibold text-emerald-400">
                        {done} {done === 1 ? 'section' : 'sections'} done
                      </span>
                    )}
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden />
                </button>
              );
            })}
          </div>
          <div className="hidden gap-3 sm:grid sm:grid-cols-2 xl:grid-cols-4">
            {CATEGORIES.map((c) => {
              const done = completedByCategory[c.id] ?? 0;
              const count = countByTrack(c.id);
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => navigate(c.href)}
                  className="group flex min-h-[150px] flex-col rounded-2xl card-landing-interactive p-5 text-left touch-manipulation"
                >
                  <span className="flex w-full items-start justify-between gap-3">
                    <span className="text-[15.5px] font-semibold leading-snug text-white">
                      {c.title}
                    </span>
                    <ChevronRight
                      className="mt-0.5 h-4 w-4 shrink-0 text-white transition-transform group-hover:translate-x-0.5 group-hover:text-elec-yellow"
                      aria-hidden
                    />
                  </span>
                  <span className="mt-1.5 block text-[13px] leading-snug text-white">
                    {c.description}
                  </span>
                  <span className="mt-auto flex items-center gap-3 pt-4 text-[12.5px] font-medium text-white">
                    <span>
                      {count} {count === 1 ? 'course' : 'courses'}
                    </span>
                    {done > 0 && (
                      <span className="text-emerald-400">
                        {done} {done === 1 ? 'section' : 'sections'} done
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      </HubBody>
    </HubPage>
  );
}
