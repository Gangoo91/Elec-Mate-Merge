/**
 * Curriculum Hub — courses, schemes of work, lesson plans and materials.
 *
 * Rebuilt on the shared hub shell (`@/components/hub/HubPrimitives`). The
 * masthead is drawn by CollegeDashboard; this is only the body:
 *
 *   quick start → this week's lessons → build → deliver
 *
 * What went, and why:
 *
 * The STAT STRIP. Courses, Lessons, Drafts, Upcoming — every one of those
 * numbers now sits on the card that owns it, so the strip was repeating the
 * page back to itself.
 *
 * The "AI-Powered" section that held the Timetable. A timetable is not an AI
 * tool; it was there because the group needed a second card.
 *
 * The QUICK ACTIONS grid at the bottom — four small cards that opened the
 * same four sections as the big cards above them. They are the quick start
 * now, at the top, where a tutor between classes can reach them.
 *
 * One bug fixed: the upcoming-lessons list read `lesson.scheduledDate` and
 * `lesson.cohortName`, neither of which exists on `CollegeLessonPlan` (the
 * columns are `scheduled_date` and `cohort_id`), so every row rendered
 * "Invalid Date" with no cohort. The cohort name now comes from the cohorts
 * already in context.
 */
import { useMemo } from 'react';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import {
  HubQuickStart,
  HubWorkList,
  HubToolGrid,
  type HubTool,
  type HubQuickAction,
  type HubWorkItem,
} from '@/components/hub/HubPrimitives';

interface CurriculumHubProps {
  onNavigate: (section: CollegeSection) => void;
}

const DAY_MS = 86_400_000;

function fmtDay(iso: string): string {
  const d = new Date(iso);
  if (!Number.isFinite(d.getTime())) return '';
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = Math.round((d.getTime() - today.getTime()) / DAY_MS);
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Tomorrow';
  return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
}

export function CurriculumHub({ onNavigate }: CurriculumHubProps) {
  const { courses, lessonPlans, cohorts, getUpcomingLessonsData } = useCollegeSupabase();

  const activeCourses = courses.filter((c) => c.status === 'Active').length;
  const upcomingLessons = getUpcomingLessonsData();
  const draftLessons = lessonPlans.filter((lp) => lp.status === 'Draft').length;
  const totalLessons = lessonPlans.length;

  const cohortName = useMemo(() => {
    const map = new Map<string, string>();
    for (const c of cohorts) map.set(c.id, c.name);
    return (id: string | null) => (id ? map.get(id) : undefined);
  }, [cohorts]);

  /*
   * ── This week ────────────────────────────────────────────────────────
   * The next few scheduled lessons, soonest first (the context query already
   * orders by date). Nothing is "urgent" here — a lesson happens whether or
   * not you look at it — so no row wears the volt rule.
   */
  const work: HubWorkItem[] = useMemo(
    () =>
      upcomingLessons.slice(0, 5).map((lesson) => ({
        id: lesson.id,
        title: lesson.title,
        reason: [cohortName(lesson.cohort_id), lesson.status].filter(Boolean).join(' · ') || 'Lesson',
        trailing: lesson.scheduled_date ? fmtDay(lesson.scheduled_date) : undefined,
        onClick: () => onNavigate('lessonplans'),
      })),
    [upcomingLessons, cohortName, onNavigate]
  );

  /*
   * ── Start something ──────────────────────────────────────────────────
   * A lesson plan is the thing a tutor most often comes here to begin, so it
   * takes the single solid volt card.
   */
  const quickStart: HubQuickAction[] = [
    {
      title: 'New lesson plan',
      description: 'Plan and publish a lesson',
      onClick: () => onNavigate('lessonplans'),
      primary: true,
    },
    {
      title: 'Add a resource',
      description: 'Upload slides or a handout',
      onClick: () => onNavigate('teachingresources'),
    },
    {
      title: 'New course',
      description: 'Standard, off-the-job hours and status',
      onClick: () => onNavigate('coursesetup'),
    },
    {
      title: 'Open the notebook',
      description: 'Notes, summaries and quizzes',
      onClick: () => onNavigate('tutornotebook'),
    },
  ];

  /*
   * ── Tool groups ──────────────────────────────────────────────────────
   * Four and four. A card reports a figure when it has one and says what it
   * is for when it doesn't — never both. No eyebrows: "Courses you run /
   * Course Setup" was a line of type repeating the line beneath it.
   */
  const build: HubTool[] = [
    {
      id: 'course-setup',
      title: 'Course setup',
      onClick: () => onNavigate('coursesetup'),
      value: activeCourses > 0 ? String(activeCourses) : undefined,
      valueLabel: activeCourses > 0 ? 'active courses' : undefined,
      description: 'The courses learners enrol on — standard, off-the-job hours and status.',
    },
    {
      id: 'curriculum-browser',
      title: 'Curriculum browser',
      onClick: () => onNavigate('courses'),
      description: 'Qualification units, learning outcomes and assessment criteria.',
    },
    {
      id: 'schemes-of-work',
      title: 'Schemes of work',
      onClick: () => onNavigate('schemesofwork'),
      description: 'How each qualification is delivered to a cohort across the year.',
    },
    {
      // Drafts are the figure worth showing: work started and not published.
      // A total of every plan ever written is a number nobody acts on.
      id: 'lesson-plans',
      title: 'Lesson plans',
      onClick: () => onNavigate('lessonplans'),
      value: draftLessons > 0 ? String(draftLessons) : totalLessons > 0 ? String(totalLessons) : undefined,
      valueLabel: draftLessons > 0 ? 'drafts, not published' : totalLessons > 0 ? 'plans on file' : undefined,
      description: 'Create, sequence and publish lesson plans per cohort.',
      alert: draftLessons > 0,
    },
  ];

  const deliver: HubTool[] = [
    {
      id: 'timetable',
      title: 'Timetable',
      onClick: () => onNavigate('timetable'),
      value: upcomingLessons.length > 0 ? String(upcomingLessons.length) : undefined,
      valueLabel: upcomingLessons.length > 0 ? 'lessons this week' : undefined,
      description: 'Weekly schedule across cohorts, rooms and tutors.',
    },
    {
      id: 'teaching-resources',
      title: 'Teaching resources',
      onClick: () => onNavigate('teachingresources'),
      description: 'Slides, handouts and reference materials for lessons.',
    },
    {
      id: 'tutor-notebook',
      title: 'Teaching notebook',
      onClick: () => onNavigate('tutornotebook'),
      description: 'Notes, lesson summaries and generated quizzes.',
    },
    {
      id: 'compliance-docs',
      title: 'Compliance docs',
      onClick: () => onNavigate('compliancedocs'),
      description: 'Policies, quality documentation and inspection-ready records.',
    },
  ];

  return (
    <>
      <HubQuickStart label="Start something" items={quickStart} />

      {/* Renders nothing when nothing is scheduled. */}
      <HubWorkList label="This week" items={work} unit="lesson" />

      <HubToolGrid label="Build the curriculum" cards={build} columns="four" />

      <HubToolGrid label="Deliver it" cards={deliver} columns="four" />
    </>
  );
}
