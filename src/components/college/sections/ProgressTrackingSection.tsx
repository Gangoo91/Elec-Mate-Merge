/**
 * ProgressTrackingSection — progress scores, attendance and at-risk flags
 * for every active learner.
 *
 * Rebuilt on the shared hub language. CollegeDashboard draws the masthead;
 * this is content only:
 *
 *   KPI row → at risk (needs you) → by cohort → filters → learners
 *
 * What went: the PageHero, the blue StatStrip, the `bg-[hsl(0_0%_12%)]`
 * "immediate attention" panel of red name-pills, the blue avatar rings and
 * the emerald attendance bars.
 *
 * Two things corrected:
 *
 * 1. `risk_level` is Capitalised in the live table — Critical, High, Medium —
 *    and this page compared it to 'high' and 'critical'. Nobody was ever at
 *    risk here: the filter was empty, the rail never drew and the callout
 *    listed a different set of learners from the rows beneath it. Compared
 *    case-insensitively now, and Critical counts (it is the worst level, and
 *    `useStudentsAtRisk` in collegeStudentService only asks for Medium and
 *    High — five Critical learners on the live roll were missing from it).
 *    The at-risk figure is now derived from the same rows as the list, so the
 *    KPI, the list and the filter agree.
 *
 * 2. "On track" was ≥80% in the KPI and ≥70% in the filter — the same word
 *    counting two different sets one tap apart. One definition now: On track
 *    ≥80, Needs attention 60–79, Behind <60, and At risk is a flag on top.
 *
 * Per-learner attendance still comes from the one server-side aggregation
 * (`useCollegeStudentSummaries`) rather than every attendance row.
 */
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, MoreHorizontal } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import {
  HubKpi,
  HubKpiRow,
  HubSectionHeading,
  HubWorkList,
  type HubWorkItem,
} from '@/components/hub/HubPrimitives';
import { useCollegeStudents } from '@/hooks/college/useCollegeStudents';
import type { CollegeStudent } from '@/services/college/collegeStudentService';
import { useCollegeCohorts } from '@/hooks/college/useCollegeCohorts';
import { useCollegeStudentSummaries } from '@/hooks/college/useCollegeStudentSummaries';
import { StudentDetailSheet } from '@/components/college/sheets/StudentDetailSheet';
import { ProgressUpdateSheet } from '@/components/college/sheets/ProgressUpdateSheet';
import { useToast } from '@/hooks/use-toast';
import { PullToRefresh } from '@/components/college/ui/PullToRefresh';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Band = 'ontrack' | 'attention' | 'behind';
type Filter = 'all' | 'atrisk' | Band;

const bandOf = (progress: number): Band =>
  progress >= 80 ? 'ontrack' : progress >= 60 ? 'attention' : 'behind';

const riskOf = (level: string | null): 'critical' | 'high' | 'medium' | null => {
  const l = (level ?? '').toLowerCase();
  return l === 'critical' || l === 'high' || l === 'medium' ? l : null;
};

const chipCn = (active: boolean) =>
  cn(
    'inline-flex h-11 shrink-0 items-center whitespace-nowrap rounded-full border px-3.5 text-[12.5px] font-medium transition-colors touch-manipulation',
    active
      ? 'border-elec-yellow text-elec-yellow'
      : 'border-white/[0.12] text-white hover:bg-white/[0.06]'
  );

export function ProgressTrackingSection() {
  const { data: students = [], isLoading: studentsLoading } = useCollegeStudents();
  const { data: cohorts = [] } = useCollegeCohorts();
  const collegeId = students[0]?.college_id ?? undefined;
  const { data: studentSummaries = [] } = useCollegeStudentSummaries(collegeId);
  const summaryByStudent = useMemo(
    () => new Map(studentSummaries.map((s) => [s.student_id, s])),
    [studentSummaries]
  );

  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [filterCohort, setFilterCohort] = useState<string>('all');
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<CollegeStudent | null>(null);
  const [profileSheetOpen, setProfileSheetOpen] = useState(false);
  const [progressSheetOpen, setProgressSheetOpen] = useState(false);

  const handleRefresh = async () => {
    await queryClient.invalidateQueries({ queryKey: ['college-students'] });
    await queryClient.invalidateQueries({ queryKey: ['college-student-summaries'] });
  };

  /** null when there are no marks — never a made-up 100%. */
  const attendanceRateFor = (studentId: string): number | null => {
    const s = summaryByStudent.get(studentId);
    if (!s || s.attendance_total === 0) return null;
    return Math.round((s.attendance_present_late / s.attendance_total) * 100);
  };

  const progressData = useMemo(
    () =>
      students
        .filter((s) => (s.status ?? '').toLowerCase() === 'active')
        .map((student) => {
          const progress = student.progress_percent ?? 0;
          const risk = riskOf(student.risk_level);
          return {
            student,
            progress,
            attendance: attendanceRateFor(student.id),
            band: bandOf(progress),
            risk,
            isAtRisk: risk !== null,
          };
        }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [students, summaryByStudent]
  );

  const atRisk = progressData.filter((p) => p.isAtRisk);
  const criticalCount = atRisk.filter((p) => p.risk === 'critical').length;
  const onTrackCount = progressData.filter((p) => !p.isAtRisk && p.band === 'ontrack').length;
  const attentionCount = progressData.filter((p) => !p.isAtRisk && p.band === 'attention').length;
  const behindCount = progressData.filter((p) => !p.isAtRisk && p.band === 'behind').length;
  const avgProgress =
    progressData.length > 0
      ? Math.round(progressData.reduce((sum, p) => sum + p.progress, 0) / progressData.length)
      : null;

  const cohortName = (cohortId?: string | null) =>
    !cohortId ? 'Unassigned' : cohorts.find((c) => c.id === cohortId)?.name || 'Unknown';
  const activeCohorts = useMemo(
    () => cohorts.filter((c) => (c.status ?? '').toLowerCase() === 'active'),
    [cohorts]
  );

  const cohortAverages = activeCohorts
    .map((cohort) => {
      const rows = progressData.filter((p) => p.student.cohort_id === cohort.id);
      return {
        ...cohort,
        avgProgress:
          rows.length > 0 ? Math.round(rows.reduce((sum, p) => sum + p.progress, 0) / rows.length) : null,
        studentCount: rows.length,
        atRiskCount: rows.filter((p) => p.isAtRisk).length,
      };
    })
    .filter((c) => c.studentCount > 0);

  const q = searchQuery.trim().toLowerCase();
  const filtered = useMemo(
    () =>
      progressData
        .filter((p) => {
          const matchesSearch =
            !q ||
            p.student.name.toLowerCase().includes(q) ||
            (p.student.uln ?? '').toLowerCase().includes(q);
          const matchesFilter =
            filter === 'all' ||
            (filter === 'atrisk' && p.isAtRisk) ||
            (filter !== 'atrisk' && !p.isAtRisk && p.band === filter);
          const matchesCohort = filterCohort === 'all' || p.student.cohort_id === filterCohort;
          return matchesSearch && matchesFilter && matchesCohort;
        })
        .sort((a, b) => a.progress - b.progress),
    [progressData, q, filter, filterCohort]
  );

  const goTo360 = (studentId: string) =>
    navigate(`/college?section=student360&studentId=${encodeURIComponent(studentId)}`);

  const atRiskItems: HubWorkItem[] = [...atRisk]
    .sort((a, b) => {
      const rank = { critical: 0, high: 1, medium: 2 } as const;
      return rank[a.risk!] - rank[b.risk!];
    })
    .map((p) => ({
      id: `risk-${p.student.id}`,
      title: p.student.name,
      reason: [
        `${p.risk!.charAt(0).toUpperCase()}${p.risk!.slice(1)} risk`,
        cohortName(p.student.cohort_id),
        p.attendance !== null ? `attendance ${p.attendance}%` : null,
      ]
        .filter(Boolean)
        .join(' · '),
      trailing: `${p.progress}%`,
      urgent: p.risk === 'critical' || p.risk === 'high',
      onClick: () => goTo360(p.student.id),
    }));

  const exportCsv = () => {
    // Real CSV export of the currently filtered list — no backend round-trip,
    // just serialise the rows we already have.
    if (filtered.length === 0) {
      toast({
        title: 'Nothing to export',
        description: 'Adjust the filters so the list has at least one learner.',
        variant: 'destructive',
      });
      return;
    }
    const escape = (v: string) => (/[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);
    const header = ['Name', 'ULN', 'Cohort', 'Progress %', 'Attendance %', 'Risk'];
    const lines = [
      header.join(','),
      ...filtered.map((p) =>
        [
          escape(p.student.name ?? ''),
          escape(p.student.uln ?? ''),
          escape(cohortName(p.student.cohort_id)),
          String(p.progress),
          p.attendance === null ? '' : String(p.attendance),
          escape(p.student.risk_level ?? ''),
        ].join(',')
      ),
    ];
    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `progress-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
      title: 'Export ready',
      description: `${filtered.length} learner${filtered.length === 1 ? '' : 's'} downloaded as CSV.`,
    });
  };

  return (
    <PullToRefresh onRefresh={handleRefresh} className="space-y-8 sm:space-y-10">
      <HubKpiRow>
        <HubKpi
          accent
          label="At risk"
          value={String(atRisk.length)}
          verdict={
            criticalCount > 0
              ? `${criticalCount} critical — check in today`
              : atRisk.length > 0
                ? 'Worth a check-in this week'
                : 'Nobody flagged'
          }
          context="Flagged Critical, High or Medium"
          sentiment={atRisk.length > 0 ? 'bad' : 'neutral'}
          onClick={() => setFilter('atrisk')}
        />
        <HubKpi
          label="On track"
          value={String(onTrackCount)}
          verdict={onTrackCount > 0 ? '80% or more, not flagged' : 'Nobody at 80% yet'}
          onClick={() => setFilter('ontrack')}
        />
        <HubKpi
          label="Needs attention"
          value={String(attentionCount)}
          verdict={attentionCount > 0 ? 'Between 60% and 80%' : 'Nobody in the 60–80% band'}
          context={behindCount > 0 ? `${behindCount} below 60%` : undefined}
          onClick={() => setFilter('attention')}
        />
        <HubKpi
          label="Average progress"
          value={avgProgress === null ? '—' : `${avgProgress}%`}
          verdict={
            avgProgress === null
              ? 'No active learners'
              : `Across ${progressData.length} active learner${progressData.length === 1 ? '' : 's'}`
          }
        />
      </HubKpiRow>

      {/* Renders nothing when nobody is flagged. */}
      <HubWorkList label="At risk" items={atRiskItems} unit="learner" />

      {cohortAverages.length > 0 && (
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          <HubSectionHeading>By cohort</HubSectionHeading>
          <motion.div
            variants={itemVariants}
            className={cn(
              '-mx-4 overflow-hidden border-y border-elec-yellow/35 sm:mx-0 sm:rounded-2xl sm:border-x',
              CARD_SURFACE
            )}
          >
            <ul className="divide-y divide-white/[0.10]">
              {cohortAverages.map((cohort) => (
                <li key={cohort.id}>
                  <button
                    type="button"
                    onClick={() => setFilterCohort(cohort.id)}
                    className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09] sm:px-5"
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        'h-8 w-[3px] shrink-0 rounded-full',
                        cohort.atRiskCount > 0 ? 'bg-red-400' : 'bg-white/[0.25]'
                      )}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[14px] font-semibold leading-tight text-white">
                        {cohort.name}
                      </span>
                      <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
                        {cohort.studentCount} learner{cohort.studentCount === 1 ? '' : 's'}
                        {cohort.atRiskCount > 0 ? ` · ${cohort.atRiskCount} at risk` : ''}
                      </span>
                    </span>
                    <span className="shrink-0 text-[13px] font-semibold tabular-nums text-white">
                      {cohort.avgProgress === null ? '—' : `${cohort.avgProgress}%`}
                    </span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.section>
      )}

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        <motion.div variants={itemVariants} className="flex items-end justify-between gap-4">
          <HubSectionHeading>Learners</HubSectionHeading>
          <button
            type="button"
            onClick={exportCsv}
            className="-my-2 flex h-11 items-center px-2 text-[12px] font-bold text-elec-yellow transition-colors touch-manipulation"
          >
            Export CSV
          </button>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-3">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or ULN"
            aria-label="Search learners"
            className="h-11 w-full border-0 border-b border-white/[0.18] bg-transparent px-0 text-[14px] text-white placeholder:text-white placeholder:opacity-60 focus:border-elec-yellow focus:outline-none"
          />
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
            {(
              [
                ['all', `All · ${progressData.length}`],
                ['atrisk', `At risk · ${atRisk.length}`],
                ['ontrack', `On track · ${onTrackCount}`],
                ['attention', `Needs attention · ${attentionCount}`],
                ['behind', `Behind · ${behindCount}`],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setFilter(value)}
                className={chipCn(filter === value)}
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
          {studentsLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-elec-yellow border-t-transparent" />
            </div>
          ) : filtered.length === 0 ? (
            <p className="px-4 py-6 text-[13px] text-white sm:px-5">
              {progressData.length === 0 ? 'No active learners on the roll.' : 'Nothing matches these filters.'}
            </p>
          ) : (
            <ul className="divide-y divide-white/[0.10]">
              {filtered.map((p) => {
                const reason = [
                  cohortName(p.student.cohort_id),
                  p.attendance !== null ? `attendance ${p.attendance}%` : 'no attendance marks',
                  p.student.expected_end_date
                    ? `due ${new Date(p.student.expected_end_date).toLocaleDateString('en-GB', {
                        month: 'short',
                        year: 'numeric',
                      })}`
                    : null,
                ]
                  .filter(Boolean)
                  .join(' · ');
                return (
                  <li key={p.student.id} className="flex items-stretch">
                    <button
                      type="button"
                      onClick={() => goTo360(p.student.id)}
                      className="flex min-w-0 flex-1 items-center gap-3 px-4 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09] sm:px-5"
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          'h-8 w-[3px] shrink-0 rounded-full',
                          p.isAtRisk ? 'bg-red-400' : p.band === 'behind' ? 'bg-elec-yellow' : 'bg-white/[0.25]'
                        )}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="flex min-w-0 items-center gap-2">
                          <span className="truncate text-[14px] font-semibold leading-tight text-white">
                            {p.student.name}
                          </span>
                          {p.isAtRisk && (
                            <span className="inline-flex h-6 shrink-0 items-center rounded-full border border-red-400/40 px-2 text-[11px] font-medium text-red-300">
                              {p.student.risk_level}
                            </span>
                          )}
                        </span>
                        <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
                          {reason}
                        </span>
                      </span>
                      <span
                        className={cn(
                          'shrink-0 text-[13px] font-semibold tabular-nums',
                          p.isAtRisk ? 'text-red-300' : p.band === 'behind' ? 'text-elec-yellow' : 'text-white'
                        )}
                      >
                        {p.progress}%
                      </span>
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
                        <DropdownMenuItem
                          className="h-11"
                          onClick={() => {
                            setSelectedStudent(p.student);
                            setProfileSheetOpen(true);
                          }}
                        >
                          Quick view
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="h-11"
                          onClick={() => {
                            setSelectedStudentId(p.student.id);
                            setProgressSheetOpen(true);
                          }}
                        >
                          Update progress
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="h-11"
                          disabled={!p.student.phone}
                          onClick={() => {
                            if (p.student.phone) window.location.href = 'tel:' + p.student.phone;
                          }}
                        >
                          {p.student.phone ? `Call · ${p.student.phone}` : 'Call'}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="h-11"
                          disabled={!p.student.email}
                          onClick={() => {
                            if (p.student.email) window.location.href = 'mailto:' + p.student.email;
                          }}
                        >
                          Email
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

      <StudentDetailSheet
        student={selectedStudent}
        open={profileSheetOpen}
        onOpenChange={setProfileSheetOpen}
      />
      <ProgressUpdateSheet
        studentId={selectedStudentId}
        open={progressSheetOpen}
        onOpenChange={setProgressSheetOpen}
      />
    </PullToRefresh>
  );
}
