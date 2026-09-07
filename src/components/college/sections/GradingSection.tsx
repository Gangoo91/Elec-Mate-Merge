/**
 * GradingSection — the marking queue.
 *
 * Rebuilt on the shared hub language (`@/components/hub/HubPrimitives` +
 * `card-recipe`). CollegeDashboard draws the masthead; this is content only:
 *
 *   KPI row → record a grade → filters → the list
 *
 * What went: the PageHero (a second title under the masthead), the amber
 * StatStrip, the `bg-[hsl(0_0%_12%)]` cohort select and the tone-coloured
 * pills. Colour now only encodes state: a volt rule on work that has waited a
 * week, red on work returned to the learner.
 *
 * One count corrected. "Pending" here was `status === 'Pending'` alone, while
 * the Assessment hub's "To mark" KPI (and the work queue) count Pending AND
 * Submitted — `usePendingGrades` in collegeGradeService. A tutor tapping "3 to
 * mark" landed on a page saying 2. Both now count the same rows. Marked work
 * likewise accepts `Graded`, `Verified` and the lowercase `final` that
 * LogGradeSheet writes.
 */
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, MoreHorizontal } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import { HubKpi, HubKpiRow, HubSectionHeading } from '@/components/hub/HubPrimitives';
import { RecordGradeDialog } from '@/components/college/dialogs/RecordGradeDialog';
import { RubricGradingDialog } from '@/components/college/dialogs/RubricGradingDialog';
import { GradeDetailSheet } from '@/components/college/sheets/GradeDetailSheet';
import { FeedbackSheet } from '@/components/college/sheets/FeedbackSheet';
import { PullToRefresh } from '@/components/college/ui/PullToRefresh';
import { useCollegeGrades, useUpdateGrade } from '@/hooks/college/useCollegeGrades';
import { useCollegeStudents } from '@/hooks/college/useCollegeStudents';
import { useCollegeStaff } from '@/hooks/college/useCollegeStaff';
import { useCollegeCohorts } from '@/hooks/college/useCollegeCohorts';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const DAY_MS = 86_400_000;

type Bucket = 'tomark' | 'marked' | 'returned' | 'other';

/**
 * The live table holds Pending, Submitted, Graded, Verified, Resubmission and
 * a lowercase `final` (LogGradeSheet). Bucket them the way the hub does rather
 * than matching one spelling each.
 */
function bucketOf(status: string | null): Bucket {
  const s = (status ?? '').toLowerCase();
  if (s === 'pending' || s === 'submitted') return 'tomark';
  if (s === 'graded' || s === 'verified' || s === 'final') return 'marked';
  if (s === 'resubmission') return 'returned';
  return 'other';
}

function daysSince(iso: string | null | undefined): number | null {
  if (!iso) return null;
  const t = new Date(iso).getTime();
  if (!Number.isFinite(t)) return null;
  return Math.max(0, Math.floor((Date.now() - t) / DAY_MS));
}

function shortDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

const chipCn = (active: boolean) =>
  cn(
    'inline-flex h-11 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-3.5 text-[12.5px] font-medium transition-colors touch-manipulation',
    active
      ? 'border-elec-yellow text-elec-yellow'
      : 'border-white/[0.12] text-white hover:bg-white/[0.06]'
  );

const statusChipCn = (bucket: Bucket) =>
  cn(
    'inline-flex h-6 shrink-0 items-center rounded-full border px-2 text-[11px] font-medium',
    bucket === 'returned'
      ? 'border-red-400/40 text-red-300'
      : bucket === 'tomark'
        ? 'border-elec-yellow/40 text-elec-yellow'
        : 'border-white/[0.15] text-white'
  );

export function GradingSection() {
  const { data: grades = [], isLoading: gradesLoading } = useCollegeGrades();
  const { data: students = [], isLoading: studentsLoading } = useCollegeStudents();
  const { data: staff = [], isLoading: staffLoading } = useCollegeStaff();
  const { data: cohorts = [], isLoading: cohortsLoading } = useCollegeCohorts();
  const updateGrade = useUpdateGrade();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleRefresh = async () => {
    await queryClient.invalidateQueries({ queryKey: ['college-grades'] });
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [filterBucket, setFilterBucket] = useState<'all' | Bucket>('tomark');
  const [filterCohort, setFilterCohort] = useState<string>('all');
  const [gradeDialogOpen, setGradeDialogOpen] = useState(false);
  const [rubricDialogOpen, setRubricDialogOpen] = useState(false);
  const [selectedAssessmentId, setSelectedAssessmentId] = useState<string | undefined>();
  const [gradeDetailOpen, setGradeDetailOpen] = useState(false);
  const [feedbackSheetOpen, setFeedbackSheetOpen] = useState(false);
  const [selectedGradeId, setSelectedGradeId] = useState<string | null>(null);

  const isLoading = gradesLoading || studentsLoading || staffLoading || cohortsLoading;

  const studentById = useMemo(() => new Map(students.map((s) => [s.id, s])), [students]);
  const staffById = useMemo(() => new Map(staff.map((s) => [s.id, s])), [staff]);
  const activeCohorts = useMemo(
    () => cohorts.filter((c) => (c.status ?? '').toLowerCase() === 'active'),
    [cohorts]
  );

  const toMark = grades.filter((g) => bucketOf(g.status) === 'tomark');
  const marked = grades.filter((g) => bucketOf(g.status) === 'marked');
  const returned = grades.filter((g) => bucketOf(g.status) === 'returned');

  const oldestWaitingDays = useMemo(() => {
    const ages = toMark.map((g) => daysSince(g.created_at)).filter((d): d is number => d !== null);
    return ages.length ? Math.max(...ages) : null;
  }, [toMark]);

  const markedThisWeek = useMemo(() => {
    const since = Date.now() - 7 * DAY_MS;
    return marked.filter((g) => g.assessed_at && new Date(g.assessed_at).getTime() >= since).length;
  }, [marked]);

  const q = searchQuery.trim().toLowerCase();
  const filteredGrades = useMemo(
    () =>
      grades
        .filter((grade) => {
          const student = grade.student_id ? studentById.get(grade.student_id) : undefined;
          const matchesSearch =
            !q ||
            (grade.unit_name || '').toLowerCase().includes(q) ||
            (student?.name || '').toLowerCase().includes(q) ||
            (grade.assessment_type || '').toLowerCase().includes(q);
          const matchesBucket = filterBucket === 'all' || bucketOf(grade.status) === filterBucket;
          const matchesCohort = filterCohort === 'all' || student?.cohort_id === filterCohort;
          return matchesSearch && matchesBucket && matchesCohort;
        })
        // Oldest unmarked first — the KPI says "clear the oldest first", so
        // the list must put it at the top.
        .sort((a, b) => {
          const ba = bucketOf(a.status) === 'tomark' ? 0 : 1;
          const bb = bucketOf(b.status) === 'tomark' ? 0 : 1;
          if (ba !== bb) return ba - bb;
          const ta = new Date(a.created_at ?? 0).getTime();
          const tb = new Date(b.created_at ?? 0).getTime();
          return ba === 0 ? ta - tb : tb - ta;
        }),
    [grades, studentById, q, filterBucket, filterCohort]
  );

  const studentName = (studentId: string | null) =>
    (studentId && studentById.get(studentId)?.name) || 'Unknown learner';
  const assessorName = (assessorId: string | null) =>
    !assessorId ? 'Unassigned' : staffById.get(assessorId)?.name || 'Unknown';

  const handleRequestResubmission = async (gradeId: string) => {
    try {
      await updateGrade.mutateAsync({ id: gradeId, updates: { status: 'Resubmission' } });
      toast({
        title: 'Resubmission requested',
        description: 'The learner has been notified to resubmit.',
      });
    } catch (e) {
      toast({
        title: 'Could not request resubmission',
        description: (e as Error).message ?? 'Failed to request resubmission.',
        variant: 'destructive',
      });
    }
  };

  const openDetail = (gradeId: string) => {
    setSelectedGradeId(gradeId);
    setGradeDetailOpen(true);
  };

  const bucketLabel: Record<Bucket, string> = {
    tomark: 'To mark',
    marked: 'Marked',
    returned: 'Returned',
    other: 'Other',
  };

  return (
    <PullToRefresh onRefresh={handleRefresh} className="space-y-8 sm:space-y-10">
      {/* The hub's "To mark" KPI already shows the count of waiting work, so
          this row answers the next three questions instead: how long has the
          oldest sat, how much got marked this week, and how much is back with
          the learner. */}
      <HubKpiRow>
        <HubKpi
          accent
          label="Oldest waiting"
          value={oldestWaitingDays === null ? '—' : `${oldestWaitingDays}d`}
          verdict={
            oldestWaitingDays === null
              ? 'Nothing waiting to be marked'
              : oldestWaitingDays >= 7
                ? 'Mark this one first'
                : 'Within a week — keep it that way'
          }
          sentiment={oldestWaitingDays !== null && oldestWaitingDays >= 7 ? 'bad' : 'neutral'}
          onClick={() => setFilterBucket('tomark')}
        />
        <HubKpi
          label="Marked this week"
          value={String(markedThisWeek)}
          verdict={markedThisWeek > 0 ? 'Feedback is reaching learners' : 'Nothing marked in 7 days'}
          context={marked.length > 0 ? `${marked.length} marked in total` : undefined}
          onClick={() => setFilterBucket('marked')}
        />
        <HubKpi
          label="Returned"
          value={String(returned.length)}
          verdict={returned.length > 0 ? 'Waiting on the learner to resubmit' : 'Nothing sent back'}
          onClick={() => setFilterBucket('returned')}
        />
      </HubKpiRow>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
        >
          <HubSectionHeading>Assessments</HubSectionHeading>
          {/* The one solid volt control on this screen. */}
          <button
            type="button"
            onClick={() => {
              setSelectedAssessmentId(undefined);
              setGradeDialogOpen(true);
            }}
            className="inline-flex h-11 w-full items-center justify-center rounded-full bg-elec-yellow px-5 text-[13px] font-semibold text-black transition-colors touch-manipulation hover:bg-elec-yellow/90 sm:w-auto"
          >
            Record a grade
          </button>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-3">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by unit, learner or assessment type"
            aria-label="Search assessments"
            className="h-11 w-full border-0 border-b border-white/[0.18] bg-transparent px-0 text-[14px] text-white placeholder:text-white placeholder:opacity-60 focus:border-elec-yellow focus:outline-none"
          />

          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
            {(
              [
                ['tomark', `To mark · ${toMark.length}`],
                ['marked', `Marked · ${marked.length}`],
                ['returned', `Returned · ${returned.length}`],
                ['all', `All · ${grades.length}`],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setFilterBucket(value)}
                className={chipCn(filterBucket === value)}
              >
                {label}
              </button>
            ))}
          </div>

          {activeCohorts.length > 1 && (
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
              <button
                type="button"
                onClick={() => setFilterCohort('all')}
                className={chipCn(filterCohort === 'all')}
              >
                All cohorts
              </button>
              {activeCohorts.map((cohort) => (
                <button
                  key={cohort.id}
                  type="button"
                  onClick={() => setFilterCohort(cohort.id)}
                  className={chipCn(filterCohort === cohort.id)}
                >
                  {cohort.name}
                </button>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className={cn(
            '-mx-4 overflow-hidden border-y border-elec-yellow/35 sm:mx-0 sm:rounded-2xl sm:border-x',
            CARD_SURFACE
          )}
        >
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-elec-yellow border-t-transparent" />
            </div>
          ) : filteredGrades.length === 0 ? (
            <p className="px-4 py-6 text-[13px] text-white sm:px-5">
              {grades.length === 0
                ? 'No assessments recorded yet — record a grade to start the list.'
                : filterBucket === 'tomark' && !q && filterCohort === 'all'
                  ? 'Nothing waiting to be marked.'
                  : 'Nothing matches these filters.'}
            </p>
          ) : (
            <ul className="divide-y divide-white/[0.10]">
              {filteredGrades.map((grade) => {
                const bucket = bucketOf(grade.status);
                const age = bucket === 'tomark' ? daysSince(grade.created_at) : null;
                const urgent = age !== null && age >= 7;
                const reason = [
                  studentName(grade.student_id),
                  grade.assessment_type,
                  `Assessor · ${assessorName(grade.assessed_by)}`,
                ]
                  .filter(Boolean)
                  .join(' · ');
                const trailing =
                  bucket === 'tomark'
                    ? age !== null
                      ? `${age}d`
                      : undefined
                    : grade.grade || (grade.assessed_at ? shortDate(grade.assessed_at) : undefined);

                return (
                  <li key={grade.id} className="flex items-stretch">
                    <button
                      type="button"
                      onClick={() => openDetail(grade.id)}
                      className="flex min-w-0 flex-1 items-center gap-3 px-4 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09] sm:px-5"
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          'h-8 w-[3px] shrink-0 rounded-full',
                          bucket === 'returned'
                            ? 'bg-red-400'
                            : urgent
                              ? 'bg-elec-yellow'
                              : 'bg-white/[0.25]'
                        )}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="flex min-w-0 items-center gap-2">
                          <span className="truncate text-[14px] font-semibold leading-tight text-white">
                            {grade.unit_name || 'Untitled unit'}
                          </span>
                          <span className={statusChipCn(bucket)}>
                            {grade.status || bucketLabel[bucket]}
                          </span>
                        </span>
                        <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
                          {reason}
                        </span>
                      </span>
                      {trailing && (
                        <span
                          className={cn(
                            'shrink-0 text-[13px] font-semibold tabular-nums',
                            urgent ? 'text-elec-yellow' : 'text-white'
                          )}
                        >
                          {trailing}
                        </span>
                      )}
                      <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
                    </button>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          type="button"
                          aria-label="More actions"
                          className="flex h-11 w-11 shrink-0 items-center justify-center self-center text-white transition-colors touch-manipulation hover:bg-white/[0.06]"
                        >
                          <MoreHorizontal className="h-4 w-4" aria-hidden />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="h-11" onClick={() => openDetail(grade.id)}>
                          View submission
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="h-11"
                          onClick={() => {
                            setSelectedAssessmentId(grade.id);
                            setRubricDialogOpen(true);
                          }}
                        >
                          Grade with rubric
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="h-11"
                          onClick={() => {
                            setSelectedAssessmentId(grade.id);
                            setGradeDialogOpen(true);
                          }}
                        >
                          Quick grade
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="h-11"
                          onClick={() => {
                            setSelectedGradeId(grade.id);
                            setFeedbackSheetOpen(true);
                          }}
                        >
                          Add feedback
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="h-11 text-red-300 focus:text-red-300"
                          onClick={() => handleRequestResubmission(grade.id)}
                        >
                          Request resubmission
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </li>
                );
              })}
            </ul>
          )}
        </motion.div>
      </motion.section>

      <RecordGradeDialog
        open={gradeDialogOpen}
        onOpenChange={setGradeDialogOpen}
        assessmentId={selectedAssessmentId}
      />
      <RubricGradingDialog
        open={rubricDialogOpen}
        onOpenChange={setRubricDialogOpen}
        assessmentId={selectedAssessmentId}
      />
      <GradeDetailSheet
        gradeId={selectedGradeId}
        open={gradeDetailOpen}
        onOpenChange={setGradeDetailOpen}
      />
      <FeedbackSheet
        gradeId={selectedGradeId}
        open={feedbackSheetOpen}
        onOpenChange={setFeedbackSheetOpen}
      />
    </PullToRefresh>
  );
}
