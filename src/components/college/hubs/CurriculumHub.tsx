/**
 * Curriculum Hub (College Hub redesign, 7 Oct 2026).
 *
 *   header + "?" → four figures → start something → next 7 days → build → deliver
 *
 * Built from the College Hub kit (CollegeUi). This week's rows open the
 * lesson itself (/college/lessons/:id) rather than the lesson plan list.
 * The upcoming list reads `scheduled_date` and `cohort_id` (the real columns;
 * the old camelCase names rendered "Invalid Date").
 */
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import {
  COLLEGE_LINK,
  CollegeEmpty,
  CollegePageHeader,
  CollegeSectionTitle,
  CollegeStats,
} from '@/components/college/ui/CollegeUi';
import {
  LinkGroup,
  QuickActions,
  TeachingScreen,
  WorkRows,
} from '@/components/college/teaching/TeachingKit';

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

const HELP: PageHelpContent = {
  id: 'college-curriculum-hub',
  title: 'Curriculum',
  what: 'Everything you need to plan and teach: courses, schemes of work, lesson plans, the timetable and the materials you teach from.',
  steps: [
    {
      title: 'Plan the year',
      body: 'Set up the course, then a scheme of work that spreads the units across the weeks for a cohort.',
    },
    {
      title: 'Plan each lesson',
      body: 'Write or generate a lesson plan, map it to the assessment criteria, and build the slides from it.',
    },
    {
      title: 'Teach and take the register',
      body: 'Open the lesson from Next 7 days, deliver it, and take the register from the same screen.',
    },
  ],
  notes: [
    {
      title: 'Drafts',
      body: 'A lesson plan stays a draft until you mark it ready. Drafts show in orange so nothing is left half-written before the class.',
    },
  ],
};

export function CurriculumHub({ onNavigate }: CurriculumHubProps) {
  const navigate = useNavigate();
  const { courses, lessonPlans, cohorts, getUpcomingLessonsData } = useCollegeSupabase();

  const activeCourses = courses.filter((c) => c.status === 'Active').length;
  const upcomingLessons = getUpcomingLessonsData();
  const draftLessons = lessonPlans.filter(
    (lp) => String(lp.status).toLowerCase() === 'draft'
  ).length;
  const totalLessons = lessonPlans.length;

  const cohortName = useMemo(() => {
    const map = new Map<string, string>();
    for (const c of cohorts) map.set(c.id, c.name);
    return (id: string | null) => (id ? map.get(id) : undefined);
  }, [cohorts]);

  const rows = useMemo(
    () =>
      upcomingLessons.slice(0, 6).map((lesson) => ({
        id: lesson.id,
        title: lesson.title,
        sub:
          [
            cohortName(lesson.cohort_id),
            lesson.scheduled_room
              ? /^room\b/i.test(lesson.scheduled_room)
                ? lesson.scheduled_room
                : `Room ${lesson.scheduled_room}`
              : null,
            lesson.status,
          ]
            .filter(Boolean)
            .join(' · ') || 'Lesson',
        trailing: lesson.scheduled_date ? fmtDay(lesson.scheduled_date) : undefined,
        warn: String(lesson.status).toLowerCase() === 'draft',
        onClick: () => navigate(`/college/lessons/${lesson.id}`),
      })),
    [upcomingLessons, cohortName, navigate]
  );

  return (
    <TeachingScreen>
      <CollegePageHeader
        eyebrow="Teaching"
        title="Curriculum"
        description="Plan the year, plan each lesson, then teach it and take the register."
        help={HELP}
      />

      <CollegeStats
        items={[
          {
            label: 'Next 7 days',
            value: String(upcomingLessons.length),
            sub: 'lessons scheduled',
            onClick: () => onNavigate('timetable'),
          },
          {
            label: 'Drafts',
            value: String(draftLessons),
            sub: draftLessons > 0 ? 'not marked ready' : 'all plans ready',
            warn: draftLessons > 0,
            onClick: () => onNavigate('lessonplans'),
          },
          {
            label: 'Lesson plans',
            value: String(totalLessons),
            sub: 'on file',
            onClick: () => onNavigate('lessonplans'),
          },
          {
            label: 'Courses',
            value: String(activeCourses),
            sub: 'active',
            onClick: () => onNavigate('coursesetup'),
          },
        ]}
      />

      <section className="space-y-4">
        <CollegeSectionTitle title="Start something" />
        <QuickActions
          items={[
            {
              title: 'New lesson plan',
              body: 'Plan a lesson and build its slides',
              onClick: () => onNavigate('lessonplans'),
              primary: true,
            },
            {
              title: 'Take a register',
              body: 'Mark who is in, by tap',
              onClick: () => onNavigate('attendance'),
            },
            {
              title: 'Add a resource',
              body: 'Upload slides or a handout',
              onClick: () => onNavigate('teachingresources'),
            },
            {
              title: 'Open the notebook',
              body: 'Notes, summaries and quizzes',
              onClick: () => onNavigate('tutornotebook'),
            },
          ]}
        />
      </section>

      <section className="space-y-4">
        <CollegeSectionTitle
          title="Next 7 days"
          sub={
            upcomingLessons.length > 0
              ? upcomingLessons.length > rows.length
                ? `${upcomingLessons.length} lessons coming up, the next ${rows.length} shown`
                : `${upcomingLessons.length} lesson${upcomingLessons.length === 1 ? '' : 's'} coming up`
              : undefined
          }
          action={
            <button type="button" className={COLLEGE_LINK} onClick={() => onNavigate('timetable')}>
              Timetable
            </button>
          }
        />
        {rows.length > 0 ? (
          <WorkRows rows={rows} />
        ) : (
          <CollegeEmpty
            title="Nothing in the next 7 days"
            body="Give a lesson plan a date and it shows here and on the timetable."
          />
        )}
      </section>

      <LinkGroup
        title="Build the curriculum"
        items={[
          {
            title: 'Course setup',
            figure: activeCourses > 0 ? String(activeCourses) : undefined,
            body:
              activeCourses > 0
                ? 'active courses'
                : 'The courses learners enrol on: standard, off-the-job hours and status.',
            onClick: () => onNavigate('coursesetup'),
          },
          {
            title: 'Curriculum browser',
            body: 'Qualification units, learning outcomes and assessment criteria.',
            onClick: () => onNavigate('courses'),
          },
          {
            title: 'Schemes of work',
            body: 'How each qualification is delivered to a cohort across the year.',
            onClick: () => onNavigate('schemesofwork'),
          },
          {
            title: 'Lesson plans',
            figure:
              draftLessons > 0
                ? String(draftLessons)
                : totalLessons > 0
                  ? String(totalLessons)
                  : undefined,
            body:
              draftLessons > 0
                ? 'drafts, not marked ready'
                : totalLessons > 0
                  ? 'plans on file'
                  : 'Create, sequence and publish lesson plans per cohort.',
            warn: draftLessons > 0,
            onClick: () => onNavigate('lessonplans'),
          },
        ]}
      />

      <LinkGroup
        title="Teach it"
        items={[
          {
            title: 'Timetable',
            figure: upcomingLessons.length > 0 ? String(upcomingLessons.length) : undefined,
            body:
              upcomingLessons.length > 0
                ? 'lessons in the next 7 days'
                : 'The week across cohorts, rooms and tutors.',
            onClick: () => onNavigate('timetable'),
          },
          {
            title: 'Registers',
            body: 'Take a register and see who is below 85%.',
            onClick: () => onNavigate('attendance'),
          },
          {
            title: 'Teaching resources',
            body: 'Slides, handouts and reference materials for lessons.',
            onClick: () => onNavigate('teachingresources'),
          },
          {
            title: 'Teaching notebook',
            body: 'Notes, lesson summaries and generated quizzes.',
            onClick: () => onNavigate('tutornotebook'),
          },
          {
            title: 'Quizzes',
            body: 'Quizzes and homework you have set, with results.',
            onClick: () => navigate('/college/quizzes'),
          },
          {
            title: 'Document library',
            body: 'Policies, templates and shared college documents.',
            onClick: () => onNavigate('documentlibrary'),
          },
          {
            title: 'Compliance docs',
            body: 'Policies, quality documentation and inspection-ready records.',
            onClick: () => onNavigate('compliancedocs'),
          },
          {
            title: 'Learning plan drafts',
            body: 'Draft an individual learning plan from what the record already holds.',
            onClick: () => onNavigate('aiilpgenerator'),
          },
        ]}
      />
    </TeachingScreen>
  );
}
