/**
 * Curriculum Hub (College Hub redesign, 7 Oct 2026).
 *
 *   header + "?" (one sentence with the week's counts, New lesson plan)
 *   → next 7 days beside start something → plan the year → teach and follow up
 *
 * 8 Oct 2026: the four figure tiles went (the sentence carries them), New
 * lesson plan opens the same composer as the lesson plans list
 * (StartLessonPlanSheet) instead of navigating away, and rows show Draft /
 * Ready as chips rather than coloured bars.
 *
 * Built from the College Hub kit (CollegeUi). This week's rows open the
 * lesson itself (/college/lessons/:id) rather than the lesson plan list.
 * The upcoming list reads `scheduled_date` and `cohort_id` (the real columns;
 * the old camelCase names rendered "Invalid Date").
 */
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { itemVariants } from '@/components/college/primitives';
import { StartLessonPlanSheet } from '@/components/college/sheets/StartLessonPlanSheet';
import { CriteriaGapsCard } from '@/components/college/teaching/CriteriaGaps';
import { CohortMocksCard } from '@/components/college/teaching/CohortMocks';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import { COLLEGE_LINK, CollegeSectionTitle } from '@/components/college/ui/CollegeUi';
import {
  LinkGroup,
  TEACH_BTN,
  TEACH_BTN_PRIMARY,
  TEACH_CARD,
  TeachingEmpty,
  TeachingHeader,
  TeachingScreen,
  TopLine,
  WorkRows,
  plural,
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
  const [startOpen, setStartOpen] = useState(false);

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
          ]
            .filter(Boolean)
            .join(' · ') || 'Lesson',
        trailing: lesson.scheduled_date ? fmtDay(lesson.scheduled_date) : undefined,
        status:
          String(lesson.status).toLowerCase() === 'draft'
            ? { label: 'Draft', tone: 'action' as const }
            : String(lesson.status).toLowerCase() === 'ready'
              ? { label: 'Ready', tone: 'done' as const }
              : undefined,
        onClick: () => navigate(`/college/lessons/${lesson.id}`),
      })),
    [upcomingLessons, cohortName, navigate]
  );

  const draftsNext = upcomingLessons.filter(
    (l) => String(l.status).toLowerCase() === 'draft'
  ).length;

  return (
    <TeachingScreen>
      <TeachingHeader
        eyebrow="Teaching"
        title="Curriculum"
        help={HELP}
        summary={
          <>
            {upcomingLessons.length === 0
              ? 'Nothing in the timetable for the next 7 days.'
              : `${plural(upcomingLessons.length, 'lesson')} in the next 7 days`}
            {upcomingLessons.length > 0 &&
              (draftsNext > 0 ? (
                <>
                  ,{' '}
                  <span className="font-semibold text-orange-400">
                    {draftsNext === upcomingLessons.length
                      ? draftsNext === 1
                        ? 'still a draft'
                        : 'all still drafts'
                      : `${draftsNext} still ${draftsNext === 1 ? 'a draft' : 'drafts'}`}
                  </span>
                  .
                </>
              ) : (
                ', all marked ready.'
              ))}
          </>
        }
        sub={
          totalLessons > 0 || activeCourses > 0
            ? [
                totalLessons > 0
                  ? `${plural(totalLessons, 'lesson plan')} on file${draftLessons > 0 ? `, ${draftLessons} not marked ready` : ''}`
                  : null,
                activeCourses > 0 ? plural(activeCourses, 'active course') : null,
              ]
                .filter(Boolean)
                .join(' · ')
            : undefined
        }
        actions={
          <button
            type="button"
            onClick={() => setStartOpen(true)}
            className={cn(TEACH_BTN_PRIMARY, 'w-full sm:w-auto')}
          >
            New lesson plan
          </button>
        }
      />

      {/* The day's work on the left, the rest of the week's starts on the right. */}
      <div className="grid grid-cols-1 items-start gap-8 xl:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <section className="min-w-0 space-y-4">
          <CollegeSectionTitle
            title="Next 7 days"
            sub={
              upcomingLessons.length > rows.length
                ? `The next ${rows.length} of ${upcomingLessons.length} lessons`
                : undefined
            }
            action={
              <button
                type="button"
                className={COLLEGE_LINK}
                onClick={() => onNavigate('timetable')}
              >
                Timetable
              </button>
            }
          />
          {rows.length > 0 ? (
            <WorkRows rows={rows} />
          ) : (
            <TeachingEmpty
              title="Nothing in the next 7 days"
              body="Give a lesson plan a date and it shows here and on the timetable."
              action={
                <button
                  type="button"
                  className={TEACH_BTN}
                  onClick={() => onNavigate('lessonplans')}
                >
                  Open lesson plans
                </button>
              }
            />
          )}
        </section>

        <section className="min-w-0 space-y-4">
          <CollegeSectionTitle title="Start something" />
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-1"
          >
            {[
              {
                title: 'Take a register',
                body: 'Mark who is in, one tap a learner.',
                onClick: () => onNavigate('attendance'),
              },
              {
                title: 'Set a quiz',
                body: 'Quizzes and homework, with the written answers to mark.',
                onClick: () => navigate('/college/quizzes'),
              },
              {
                title: 'Add a resource',
                body: 'Upload slides or a handout, or add a link.',
                onClick: () => onNavigate('teachingresources'),
              },
            ].map((a) => (
              <button
                key={a.title}
                type="button"
                onClick={a.onClick}
                className={cn(TEACH_CARD, 'min-h-[76px] justify-center p-4')}
              >
                <TopLine />
                <span className="flex w-full items-center justify-between gap-3">
                  <span className="min-w-0">
                    <span className="block text-[14.5px] font-semibold leading-snug text-white">
                      {a.title}
                    </span>
                    <span className="mt-0.5 block text-[12.5px] leading-snug text-white">
                      {a.body}
                    </span>
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden />
                </span>
              </button>
            ))}
          </motion.div>
        </section>
      </div>

      {/* Where the classes you teach are weakest, criterion by criterion. */}
      <CriteriaGapsCard />

      {/* What learners' own mock exams say about the classes you teach. */}
      <CohortMocksCard />

      <LinkGroup
        title="Plan the year"
        items={[
          {
            title: 'Qualifications',
            body: 'Units, learning outcomes and assessment criteria, with the regulations each touches. Plan a lesson from any criterion.',
            onClick: () => onNavigate('courses'),
          },
          {
            title: 'Schemes of work',
            body: 'How each qualification is delivered to a cohort across the year, week by week.',
            onClick: () => onNavigate('schemesofwork'),
          },
          {
            title: 'Lesson plans',
            body: 'Every plan, when it is taught and whether it is ready.',
            status:
              draftLessons > 0
                ? { label: `${draftLessons} not marked ready`, tone: 'action' }
                : totalLessons > 0
                  ? { label: `${totalLessons} ready`, tone: 'done' }
                  : undefined,
            onClick: () => onNavigate('lessonplans'),
          },
          {
            title: 'Course setup',
            body: 'The courses learners enrol on: standard, off-the-job hours and status.',
            status:
              activeCourses > 0 ? { label: plural(activeCourses, 'active course') } : undefined,
            onClick: () => onNavigate('coursesetup'),
          },
        ]}
      />

      {/* Two groups (4 + 3) so every row fills; seven cards in one
          four-column grid left a ragged last row. */}
      <LinkGroup
        title="Teach"
        items={[
          {
            title: 'Timetable',
            body: 'The week by time, yours or the whole college.',
            onClick: () => onNavigate('timetable'),
          },
          {
            title: 'Registers',
            body: 'Take a register and see who is below 85%.',
            onClick: () => onNavigate('attendance'),
          },
          {
            title: 'Quizzes',
            body: 'Quizzes and homework you have set, with results.',
            onClick: () => navigate('/college/quizzes'),
          },
          {
            title: 'Teaching resources',
            body: 'Slides, handouts and links, mapped to the criteria they teach.',
            onClick: () => onNavigate('teachingresources'),
          },
        ]}
      />

      <LinkGroup
        title="Follow up"
        items={[
          {
            title: 'Learner notebook',
            body: 'Ask about one learner and get an answer written from their record.',
            ai: true,
            onClick: () => onNavigate('tutornotebook'),
          },
          {
            title: 'Learning plan drafts',
            body: 'Draft an individual learning plan from what the record already holds.',
            ai: true,
            onClick: () => onNavigate('aiilpgenerator'),
          },
          {
            title: 'Document library',
            body: 'Everything the college has shared, searchable in one place.',
            onClick: () => onNavigate('documentlibrary'),
          },
        ]}
      />

      <StartLessonPlanSheet open={startOpen} onOpenChange={setStartOpen} />
    </TeachingScreen>
  );
}
