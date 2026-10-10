/**
 * GradingSection — the marking queue.
 *
 * 7 Oct 2026: rebuilt on the College kit (CollegeUi). Header with help and
 * the one volt action, figures, the grade spread and how long work has
 * waited as charts, then the list in the College inbox row style, oldest
 * unmarked first. Mine first (ELE-1886); j/k and Enter on a desktop
 * keyboard (ELE-1889).
 *
 * Counts: "To mark" is Pending AND Submitted, the same rows as the
 * Assessment hub's "To mark" and the work queue (usePendingGrades). Marked
 * accepts Graded, Verified and the lowercase `final` that LogGradeSheet writes.
 */
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, MoreHorizontal } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import {
  COLLEGE_BTN_PRIMARY,
  COLLEGE_CARD,
  COLLEGE_LIST,
  CollegeEmpty,
  CollegePageHeader,
  CollegeSectionTitle,
} from '@/components/college/ui/CollegeUi';
import { ActionSheet, TextTabs } from '@/components/college/assessment/AssessmentTabs';
import { useMyLearners } from '@/components/college/assessment/useMyLearners';
import {
  Bars,
  KeyHint,
  ScopeToggle,
  initialsOf,
  useQueueKeys,
  useScope,
} from '@/components/college/assessment/AssessmentKit';
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
import { keyLabel } from '@/lib/college/labels';

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

const statusChipCn = (bucket: Bucket) =>
  cn(
    'inline-flex h-6 shrink-0 items-center rounded-full border px-2 text-[12px] font-semibold text-white',
    bucket === 'returned' ? 'border-orange-400/60' : 'border-white/[0.16]'
  );

/** Grades are stored in mixed case ("Merit", "merit"). */
const GRADE_BANDS: Array<{ key: string; label: string; cls: string }> = [
  { key: 'distinction', label: 'Distinction', cls: 'bg-emerald-400' },
  { key: 'merit', label: 'Merit', cls: 'bg-emerald-600' },
  { key: 'pass', label: 'Pass', cls: 'bg-white' },
  { key: 'refer', label: 'Refer or fail', cls: 'bg-orange-500' },
  { key: 'other', label: 'Other', cls: 'bg-white/40' },
];
function gradeBand(g: string | null): string {
  const v = (g ?? '').trim().toLowerCase();
  if (v.startsWith('dist')) return 'distinction';
  if (v.startsWith('merit')) return 'merit';
  if (v.startsWith('pass')) return 'pass';
  if (v.startsWith('ref') || v.startsWith('fail') || v === 'u') return 'refer';
  return 'other';
}

const AGE_BANDS: Array<{ label: string; min: number; max: number; cls: string }> = [
  { label: 'This week', min: 0, max: 6, cls: 'bg-white' },
  { label: '1 to 2 weeks', min: 7, max: 13, cls: 'bg-orange-300' },
  { label: '2 to 4 weeks', min: 14, max: 29, cls: 'bg-orange-400' },
  { label: 'Over a month', min: 30, max: Infinity, cls: 'bg-orange-600' },
];

const HELP: PageHelpContent = {
  id: 'college-grading',
  title: 'Grading',
  what: 'Every assessment your learners have handed in, with the oldest unmarked at the top. Mark it, add feedback, or send it back for resubmission.',
  steps: [
    {
      title: 'Mark the oldest first',
      body: 'The list opens on To mark, oldest first. Anything over a week is orange.',
    },
    {
      title: 'Open, then grade',
      body: 'Tap a row to see the submission. The menu on the right grades with a rubric, quick-grades, adds feedback or asks for a resubmission.',
    },
    {
      title: 'Record one from scratch',
      body: 'Record a grade adds an assessment that was marked away from the app.',
    },
  ],
  legend: [
    {
      swatch: 'bg-orange-500',
      label: 'Waiting too long',
      body: 'Unmarked for a week or more, or sent back to the learner.',
    },
  ],
  notes: [
    {
      title: 'Keyboard',
      body: 'On a desktop: j and k move down and up the list, Enter opens the highlighted assessment.',
    },
    {
      title: 'Whose work',
      body: 'My learners shows the cohorts you lead or learners assigned to you. Whole college shows everyone at the college.',
    },
  ],
};

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

  const my = useMyLearners();
  const [scope, setScope] = useScope('grading', my);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterBucket, setFilterBucket] = useState<'all' | Bucket>('tomark');
  const [filterCohort, setFilterCohort] = useState<string>('all');
  const [gradeDialogOpen, setGradeDialogOpen] = useState(false);
  const [rubricDialogOpen, setRubricDialogOpen] = useState(false);
  const [selectedAssessmentId, setSelectedAssessmentId] = useState<string | undefined>();
  const [gradeDetailOpen, setGradeDetailOpen] = useState(false);
  const [feedbackSheetOpen, setFeedbackSheetOpen] = useState(false);
  const [selectedGradeId, setSelectedGradeId] = useState<string | null>(null);
  /** Phone: the row whose actions sheet is open. */
  const [actionsFor, setActionsFor] = useState<string | null>(null);

  const isLoading = gradesLoading || studentsLoading || staffLoading || cohortsLoading;

  const studentById = useMemo(() => new Map(students.map((s) => [s.id, s])), [students]);
  const staffById = useMemo(() => new Map(staff.map((s) => [s.id, s])), [staff]);
  const activeCohorts = useMemo(
    () => cohorts.filter((c) => (c.status ?? '').toLowerCase() === 'active'),
    [cohorts]
  );

  const isMine = (studentId: string | null) => {
    const st = studentId ? studentById.get(studentId) : undefined;
    return my.isMine({ studentId, cohortId: st?.cohort_id ?? null });
  };
  const allGrades = grades;
  const scoped = scope === 'mine' ? allGrades.filter((g) => isMine(g.student_id)) : allGrades;
  const mineToMark = allGrades.filter(
    (g) => bucketOf(g.status) === 'tomark' && isMine(g.student_id)
  ).length;
  const allToMark = allGrades.filter((g) => bucketOf(g.status) === 'tomark').length;
  const toMark = scoped.filter((g) => bucketOf(g.status) === 'tomark');
  const marked = scoped.filter((g) => bucketOf(g.status) === 'marked');
  const returned = scoped.filter((g) => bucketOf(g.status) === 'returned');
  const gradeRows = GRADE_BANDS.map((b) => ({
    key: b.key,
    label: b.label,
    cls: b.cls,
    n: marked.filter((g) => gradeBand(g.grade) === b.key).length,
  })).filter((r) => r.key !== 'other' || r.n > 0);
  const ageRows = AGE_BANDS.map((b) => ({
    label: b.label,
    cls: b.cls,
    n: toMark.filter((g) => {
      const d = daysSince(g.created_at);
      return d !== null && d >= b.min && d <= b.max;
    }).length,
  }));

  const oldestWaitingDays = useMemo(() => {
    const ages = toMark.map((g) => daysSince(g.created_at)).filter((d): d is number => d !== null);
    return ages.length ? Math.max(...ages) : null;
  }, [toMark]);

  const markedThisWeek = useMemo(() => {
    const since = Date.now() - 7 * DAY_MS;
    return marked.filter((g) => g.assessed_at && new Date(g.assessed_at).getTime() >= since).length;
  }, [marked]);

  // One sentence carries the figures the old row of tiles repeated.
  const summary = (() => {
    const parts: string[] = [];
    if (toMark.length === 0) parts.push('Nothing waiting to be marked.');
    else {
      parts.push(
        `${toMark.length} ${toMark.length === 1 ? 'assessment' : 'assessments'} to mark, oldest first.`
      );
      if (oldestWaitingDays !== null && oldestWaitingDays >= 7)
        parts.push(`The oldest has waited ${oldestWaitingDays} days.`);
    }
    if (returned.length > 0) parts.push(`${returned.length} sent back and waiting on the learner.`);
    parts.push(
      markedThisWeek > 0
        ? `${markedThisWeek} marked this week.`
        : marked.length > 0
          ? 'None marked this week yet.'
          : ''
    );
    return parts.filter(Boolean).join(' ');
  })();

  const q = searchQuery.trim().toLowerCase();
  const filteredGrades = useMemo(
    () =>
      scoped
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [scoped, studentById, q, filterBucket, filterCohort]
  );

  const studentName = (studentId: string | null) =>
    (studentId && studentById.get(studentId)?.name) || 'Unknown learner';
  const assessorLine = (assessorId: string | null) =>
    !assessorId
      ? 'No assessor yet'
      : `Assessor ${staffById.get(assessorId)?.name || 'not on the staff list'}`;

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
  const { focus } = useQueueKeys({ keys: filteredGrades.map((g) => g.id), onOpen: openDetail });

  const bucketLabel: Record<Bucket, string> = {
    tomark: 'To mark',
    marked: 'Marked',
    returned: 'Returned',
    other: 'Other',
  };

  return (
    <PullToRefresh onRefresh={handleRefresh} className="space-y-8 sm:space-y-10">
      <CollegePageHeader
        eyebrow="Assessment"
        title="Grading"
        description={summary}
        help={HELP}
        actions={
          <>
            <ScopeToggle
              scope={scope}
              onChange={setScope}
              my={my}
              mineCount={mineToMark}
              allCount={allToMark}
            />
            <button
              type="button"
              onClick={() => {
                setSelectedAssessmentId(undefined);
                setGradeDialogOpen(true);
              }}
              className={COLLEGE_BTN_PRIMARY}
            >
              Record a grade
            </button>
          </>
        }
      />

      {/* On a phone the list comes first and the charts follow it. */}
      <div className="flex flex-col gap-8 sm:gap-10">
        <div className="order-last grid grid-cols-1 items-stretch gap-4 sm:order-none lg:grid-cols-2">
          <motion.section
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className={cn(COLLEGE_CARD, 'h-full')}
          >
            <CollegeSectionTitle
              title="Grades awarded"
              sub={
                marked.length ? `Across ${marked.length} marked assessments` : 'Nothing marked yet'
              }
            />
            <div className="mt-4">
              <Bars rows={gradeRows} labelWidth="7rem" onPick={() => setFilterBucket('marked')} />
            </div>
          </motion.section>
          <motion.section
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className={cn(COLLEGE_CARD, 'h-full')}
          >
            <CollegeSectionTitle
              title="How long work has waited"
              sub={toMark.length ? `${toMark.length} unmarked` : 'Nothing waiting'}
            />
            <div className="mt-4">
              <Bars rows={ageRows} labelWidth="7rem" onPick={() => setFilterBucket('tomark')} />
            </div>
          </motion.section>
        </div>

        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <CollegeSectionTitle
            title="Assessments"
            sub={`${filteredGrades.length} shown`}
            action={
              <KeyHint
                items={[
                  ['j k', 'Move'],
                  ['Enter', 'Open'],
                ]}
              />
            }
          />

          {/* Filters: quiet text tabs for the status, a second rail for the
              cohort when there is more than one, then the search. */}
          <motion.div variants={itemVariants} className="space-y-2">
            <TextTabs
              ariaLabel="Which assessments to show"
              value={filterBucket}
              onChange={setFilterBucket}
              items={[
                { key: 'tomark' as const, label: 'To mark', count: toMark.length },
                { key: 'marked' as const, label: 'Marked', count: marked.length },
                { key: 'returned' as const, label: 'Returned', count: returned.length },
                { key: 'all' as const, label: 'All', count: scoped.length },
              ]}
            />
            {activeCohorts.length > 1 && (
              <TextTabs
                ariaLabel="Which cohort"
                className="border-b-0"
                value={filterCohort}
                onChange={setFilterCohort}
                items={[
                  { key: 'all', label: 'All cohorts' },
                  ...activeCohorts.map((c) => ({ key: c.id, label: c.name })),
                ]}
              />
            )}
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Find a unit, learner or assessment type"
              aria-label="Search assessments"
              className="input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white placeholder:text-white placeholder:opacity-40 caret-elec-yellow focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation lg:max-w-md"
            />
          </motion.div>

          {isLoading ? (
            <div className="space-y-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-[76px] animate-pulse rounded-2xl bg-white/[0.04]" />
              ))}
            </div>
          ) : filteredGrades.length === 0 ? (
            <CollegeEmpty
              title={
                grades.length === 0
                  ? 'No assessments recorded yet'
                  : filterBucket === 'tomark' && !q && filterCohort === 'all'
                    ? 'Nothing waiting to be marked'
                    : 'Nothing matches these filters'
              }
              body={
                grades.length === 0
                  ? 'Record a grade to start the list. Work learners hand in lands here too.'
                  : scope === 'mine'
                    ? 'Switch to Whole college to see the rest of the college, or try another filter.'
                    : 'Try another filter or clear the search.'
              }
            />
          ) : (
            <motion.ul variants={itemVariants} className={COLLEGE_LIST}>
              {filteredGrades.map((grade) => {
                const bucket = bucketOf(grade.status);
                const age = bucket === 'tomark' ? daysSince(grade.created_at) : null;
                const urgent = (age !== null && age >= 7) || bucket === 'returned';
                const mine = scope === 'all' && isMine(grade.student_id);
                const name = studentName(grade.student_id);
                const when =
                  bucket === 'tomark'
                    ? age === null
                      ? 'Waiting'
                      : age <= 0
                        ? 'Handed in today'
                        : `Waiting ${age} ${age === 1 ? 'day' : 'days'}`
                    : grade.assessed_at
                      ? `Marked ${shortDate(grade.assessed_at)}`
                      : bucket === 'returned'
                        ? 'With the learner'
                        : null;

                return (
                  <li
                    key={grade.id}
                    data-qkey={grade.id}
                    className={cn(
                      'flex items-stretch',
                      focus === grade.id &&
                        'bg-white/[0.06] shadow-[inset_3px_0_0_0_hsl(47_100%_50%)]'
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => openDetail(grade.id)}
                      className="flex min-w-0 flex-1 items-center gap-3 py-3.5 pl-4 text-left transition-colors touch-manipulation hover:bg-white/[0.04] active:bg-white/[0.07] sm:gap-4 sm:pl-5"
                    >
                      {/* Neutral avatar: the orange waiting line carries the urgency. */}
                      <span
                        aria-hidden="true"
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/[0.1] text-[13.5px] font-bold text-white"
                      >
                        {initialsOf(name)}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block break-words text-[15px] font-semibold leading-tight text-white">
                          {name}
                        </span>
                        <span className="mt-1 line-clamp-2 block text-[13px] leading-snug text-white">
                          <span className="font-semibold">
                            {grade.unit_name || 'Untitled unit'}
                          </span>
                          {grade.assessment_type ? ` · ${keyLabel(grade.assessment_type)}` : ''}
                        </span>
                        <span className="mt-1.5 flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
                          <span className={statusChipCn(bucket)}>
                            {grade.status || bucketLabel[bucket]}
                          </span>
                          {mine && (
                            <span className="inline-flex h-6 shrink-0 items-center rounded-full border border-white/[0.4] px-2 text-[12px] font-semibold text-white">
                              Yours
                            </span>
                          )}
                          <span className="min-w-0 text-[12.5px] text-white">
                            {when && (
                              <span className={cn('font-semibold', urgent && 'text-orange-400')}>
                                {when}
                              </span>
                            )}
                            {when ? ' · ' : ''}
                            {assessorLine(grade.assessed_by)}
                          </span>
                        </span>
                      </span>
                      {bucket !== 'tomark' && grade.grade ? (
                        <span className="shrink-0 text-[14px] font-bold capitalize text-white">
                          {grade.grade}
                        </span>
                      ) : bucket === 'tomark' ? (
                        <span className="hidden h-11 min-w-[96px] shrink-0 items-center justify-center rounded-xl border border-white/[0.18] px-3 text-[13px] font-semibold text-white sm:inline-flex">
                          Mark
                        </span>
                      ) : null}
                      <ChevronRight
                        className="h-4 w-4 shrink-0 text-white sm:hidden"
                        aria-hidden="true"
                      />
                    </button>

                    {/* Phone: the row's actions open as a bottom sheet. */}
                    <button
                      type="button"
                      aria-label="More actions"
                      onClick={() => setActionsFor(grade.id)}
                      className="mr-2 flex h-11 w-11 shrink-0 items-center justify-center self-center rounded-xl text-white transition-colors touch-manipulation active:bg-white/[0.08] sm:hidden"
                    >
                      <MoreHorizontal className="h-4 w-4" aria-hidden />
                    </button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          type="button"
                          aria-label="More actions"
                          className="mr-2 hidden h-11 w-11 shrink-0 items-center sm:flex justify-center self-center rounded-xl text-white transition-colors touch-manipulation hover:bg-white/[0.06]"
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
                          className="h-11 text-orange-300 focus:text-orange-300"
                          onClick={() => handleRequestResubmission(grade.id)}
                        >
                          Request resubmission
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </li>
                );
              })}
            </motion.ul>
          )}
        </motion.section>
      </div>

      <ActionSheet
        open={actionsFor !== null}
        onOpenChange={(o) => !o && setActionsFor(null)}
        title={(() => {
          const g = grades.find((x) => x.id === actionsFor);
          return g ? studentName(g.student_id) : 'Assessment';
        })()}
        description={grades.find((x) => x.id === actionsFor)?.unit_name || undefined}
        actions={
          actionsFor
            ? [
                { label: 'View submission', onSelect: () => openDetail(actionsFor) },
                {
                  label: 'Grade with rubric',
                  divide: true,
                  onSelect: () => {
                    setSelectedAssessmentId(actionsFor);
                    setRubricDialogOpen(true);
                  },
                },
                {
                  label: 'Quick grade',
                  onSelect: () => {
                    setSelectedAssessmentId(actionsFor);
                    setGradeDialogOpen(true);
                  },
                },
                {
                  label: 'Add feedback',
                  onSelect: () => {
                    setSelectedGradeId(actionsFor);
                    setFeedbackSheetOpen(true);
                  },
                },
                {
                  label: 'Request resubmission',
                  warn: true,
                  divide: true,
                  onSelect: () => void handleRequestResubmission(actionsFor),
                },
              ]
            : []
        }
      />
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
        onRubricGrade={(id) => {
          setGradeDetailOpen(false);
          setSelectedAssessmentId(id);
          setRubricDialogOpen(true);
        }}
        onQuickGrade={(id) => {
          setGradeDetailOpen(false);
          setSelectedAssessmentId(id);
          setGradeDialogOpen(true);
        }}
      />
      <FeedbackSheet
        gradeId={selectedGradeId}
        open={feedbackSheetOpen}
        onOpenChange={setFeedbackSheetOpen}
      />
    </PullToRefresh>
  );
}
