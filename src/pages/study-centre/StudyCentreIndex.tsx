/**
 * StudyCentreIndex — built on the shared hub primitives, like every other hub.
 *
 * This page was the last one still on the editorial dialect: a sticky masthead
 * followed by a date eyebrow, a two-tone slogan rotating on hour and
 * day-of-year, a verdict paragraph restating the numbers directly beneath it,
 * and `01 · THIS MONTH` / `02 · CONTINUE` / `03 · YOUR LEARNING` numbering over
 * a hairline grid of 240px cells.
 *
 * `HubPrimitives` was extracted precisely to end that split — its own note says
 * the hero "cost roughly 300px before an electrician reached a single tool",
 * and that the numbered eyebrows "implied an order the groups never had". The
 * other hubs took that medicine; this one hadn't, which is why it looked like a
 * different product.
 *
 * Nothing was dropped in the move:
 *   hero verdict      → deleted (it only restated the KPI row below it)
 *   01 · THIS MONTH   → HubKpiRow
 *   02 · CONTINUE     → the primary card in HubQuickStart
 *   03 · YOUR LEARNING→ HubToolGrid
 *   WATCH & LEARN     → a card in that same grid
 *   04 · MOMENTUM     → folded into the KPI verdict/context lines, which is
 *                       what those slots are for (level, best run, avg score)
 */
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/contexts/AuthContext';
import { useStudyStreak } from '@/hooks/useStudyStreak';
import { useQuizResults } from '@/hooks/useQuizResults';
import { useLearningXP } from '@/hooks/useLearningXP';
import { useLastStudyLocation } from '@/hooks/useLastStudyLocation';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import { completedSectionsForCourse } from '@/lib/courseProgressMatch';
import { getCount as getMissedCount } from '@/lib/missedQuestions';
import useSEO from '@/hooks/useSEO';

import {
  HubPage,
  HubBody,
  HubMasthead,
  HubQuickStart,
  HubToolGrid,
  HubKpi,
  HubKpiRow,
  type HubQuickAction,
  type HubTool,
} from '@/components/hub/HubPrimitives';
import { curatedVideos } from '@/data/apprentice/curatedVideos';
import { TOTAL_IN_APP_MOCK_EXAMS } from '@/data/study-centre/inAppMockExams';
import { flashcardSetDefinitions } from '@/data/flashcards';
import {
  TOTAL_COURSES,
  countByTrack,
  type CourseTrack,
} from '@/data/study-centre/courseCatalogue';

// ─────────────────────────────────────────────────────────────────────────
// Categories
// ─────────────────────────────────────────────────────────────────────────

/**
 * `count` is deliberately absent — it used to be typed in here by hand and had
 * drifted from the real course lists in both directions: 8 apprentice courses
 * claimed against 6, 14 general against 15. That made the hub's headline "46
 * courses" wrong and measured "1/46 complete" against a total that never
 * existed. It now comes from the catalogue, which derives it.
 */
interface CategoryDef {
  id: CourseTrack;
  eyebrow: string;
  title: string;
  description: string;
  routeKeys: string[];
  href: string;
}

const CATEGORIES: CategoryDef[] = [
  {
    id: 'apprentice',
    eyebrow: 'Apprentice',
    title: 'Apprentice training',
    // Descriptions lead with WHO the track is for. On a hub with four
    // near-identical cards, "who am I in this list?" is the question a new
    // student is actually asking, and the titles alone don't answer it.
    description: 'For apprentices and college students — Level 2, Level 3 and AM2 prep.',
    routeKeys: ['apprentice'],
    href: '/study-centre/apprentice',
  },
  {
    id: 'upskilling',
    eyebrow: 'CPD',
    title: 'Professional upskilling',
    description: 'For qualified electricians — BS 7671, EV charging and solar PV.',
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
    eyebrow: 'Safety',
    title: 'General upskilling',
    description: 'For everyone on site — IPAF, first aid, working at height and CSCS.',
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
    eyebrow: 'Growth',
    title: 'Personal development',
    description: 'For every stage of your career — leadership, confidence and resilience.',
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
  const { user } = useAuth();
  const studyStreakData = useStudyStreak();
  const quizData = useQuizResults();
  const xpData = useLearningXP();
  const { lastLocation, loading: lastLocLoading, getLastStudiedDisplay } = useLastStudyLocation();
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
  const totalCourses = TOTAL_COURSES;

  // ── Start something ──────────────────────────────────────────────────
  // Resuming is the single most-reached-for action on this page, so it takes
  // the one solid volt card the group allows. When there's nothing to resume
  // the strip still has somewhere to send people.
  const quickStart: HubQuickAction[] = useMemo(() => {
    const items: HubQuickAction[] = [];
    if (lastLocation && !lastLocLoading) {
      items.push({
        title: lastLocation.title,
        description: `Pick up where you left off · ${getLastStudiedDisplay()}`,
        primary: true,
        onClick: () => navigate(lastLocation.path),
      });
    }
    // Was pointed at /study-centre/apprentice, which is one of four tracks —
    // so "browse" could only ever show you a sixth of the catalogue.
    items.push({
      title: 'Find a course',
      description: `Search all ${totalCourses} across four tracks`,
      onClick: () => navigate('/study-centre/browse'),
    });
    items.push({
      title: 'Leaderboard',
      description: 'See where you rank this month',
      onClick: () => navigate('/study-centre/leaderboard'),
    });
    return items;
  }, [lastLocation, lastLocLoading, getLastStudiedDisplay, navigate, totalCourses]);

  // ── Revise & test yourself ───────────────────────────────────────────
  // Mock exams and flashcards are the two most-used study habits after the
  // courses themselves; they used to be invisible from this page (flashcards
  // two taps away under On-the-job tools, mock exams not linked at all).
  // Counts are derived from the catalogues, never typed by hand — see the
  // CategoryDef note above for how hand-typed counts drift.
  const missedCount = user?.id ? getMissedCount(user.id) : 0;
  const reviseCards: HubTool[] = useMemo(
    () => [
      {
        id: 'mock-exams',
        title: 'Mock exams',
        value: String(TOTAL_IN_APP_MOCK_EXAMS),
        valueLabel: 'papers to sit',
        // The in-app index, not the public /mock-exams SEO pages — those are
        // the free acquisition funnel and stay where they are.
        to: '/study-centre/mock-exams',
      },
      {
        id: 'flashcards',
        title: 'Flashcards',
        value: String(flashcardSetDefinitions.length),
        valueLabel: 'revision decks',
        to: '/study-centre/flashcards',
      },
      {
        id: 'revision',
        title: 'Quick revision',
        // The pile only fills once you've got questions wrong — until then
        // the card explains itself rather than showing a dead zero.
        ...(missedCount > 0
          ? { value: String(missedCount), valueLabel: 'to win back', alert: true }
          : { description: 'Replays the questions you get wrong until you beat them.' }),
        // onClick rather than `to` so the session knows it was opened from the
        // Study Centre and sends the learner back here, not to Today.
        onClick: () =>
          navigate('/apprentice/revision', {
            state: { from: '/study-centre', label: 'Study Centre' },
          }),
      },
      {
        id: 'videos',
        title: 'Video library',
        value: String(curatedVideos.length),
        valueLabel: 'training videos',
        to: '/study-centre/videos',
      },
    ],
    [missedCount, navigate]
  );

  // ── Your learning ────────────────────────────────────────────────────
  // The description ALWAYS shows: it says who the track is for, which is the
  // one thing a learner picking a track needs and the one thing that used to
  // vanish. Progress moves to the footer line, so a started track reports and
  // still explains itself. (Same unit trap as the KPI above: `completed`
  // counts sections, never courses — so it's a bare figure, not a fraction.)
  const learningCards: HubTool[] = useMemo(() => {
    return CATEGORIES.map((c) => {
      const completed = completedByCategory[c.id] ?? 0;
      return {
        id: c.id,
        eyebrow: c.eyebrow,
        title: c.title,
        description: c.description,
        meta: completed > 0 ? `${completed} section${completed === 1 ? '' : 's'} done` : undefined,
        to: c.href,
      };
    });
  }, [completedByCategory]);

  return (
    <HubPage>
      <HubMasthead section="Learning" title="Study Centre" backTo="/dashboard" />

      <HubBody>
        <HubQuickStart label="Start something" items={quickStart} />

        {/* Streak takes the row's single accent — it's the one figure that
            decays if ignored, which is exactly what an accent should mean.
            Level, best run and average score used to be a separate "MOMENTUM"
            section; they belong on these rows as verdict and context. */}
        <HubKpiRow>
          <HubKpi
            label="Streak"
            value={String(currentStreak)}
            accent
            verdict={currentStreak > 0 ? `Day ${currentStreak} of your run` : 'Start today'}
            context={
              longestStreak > 0
                ? `Best run ${longestStreak} day${longestStreak === 1 ? '' : 's'}`
                : undefined
            }
            onClick={() => navigate('/study-centre/leaderboard')}
          />
          <HubKpi
            label="Total XP"
            value={totalXP.toLocaleString()}
            verdict={`Level ${level}`}
            context={`${Math.round(xpProgress)}% to level ${level + 1}`}
            onClick={() => navigate('/study-centre/leaderboard')}
          />
          <HubKpi
            label="Quizzes"
            value={String(totalQuizzes)}
            verdict={totalQuizzes > 0 ? `Average ${avgScore}%` : 'Take your first'}
            context={
              totalQuizzes > 0
                ? `Across ${totalQuizzes} quiz${totalQuizzes === 1 ? '' : 'zes'}`
                : undefined
            }
            onClick={() => navigate('/mock-exams')}
          />
          <HubKpi
            /*
             * Sections, not courses.
             *
             * This read `${totalCompleted}/${totalCourses}` under the label
             * "Completed" with the context "courses" — but the numerator comes
             * from `completedSectionsForCourse`, which counts SECTIONS. The two
             * were never the same unit. Course-level completion isn't recorded
             * at all: `course_progress` holds 3,490 completed rows and every
             * one is a section.
             *
             * Eighteen learners have already passed 45 completed sections, so
             * they were being shown fractions like "368/45 courses".
             */
            label="Sections done"
            value={String(totalCompleted)}
            verdict={totalCompleted > 0 ? 'Keep going' : 'Nothing finished yet'}
            context={`across ${totalCourses} courses`}
            onClick={() => navigate('/study-centre/apprentice')}
          />
        </HubKpiRow>

        <HubToolGrid label="Revise & test yourself" cards={reviseCards} columns="four" />

        <HubToolGrid label="Your learning" cards={learningCards} columns="four" />
      </HubBody>
    </HubPage>
  );
}
