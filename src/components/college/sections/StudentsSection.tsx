/**
 * StudentsSection — the enrolled-learner list, on the shared hub language.
 *
 * Renders CONTENT ONLY: the masthead comes from CollegeDashboard. What went:
 * the PageHero (eyebrow, 40px title, a sentence restating the count), the
 * pill-shaped tab bar, the boxed `<select>` for cohorts, avatars with
 * risk-coloured rings, a three-colour progress bar per row and the
 * `bg-[hsl(…)]` surfaces.
 *
 * Shape now: KPI row → the one solid volt action → filters → activation →
 * the list as HubWorkList rows (rule · name · reason · figure · chevron).
 * Tapping a row opens Student 360 at
 * `/college?section=student360&studentId=<college_students.id>`.
 *
 * Everything is `text-white`. Red survives only for a critical-risk learner;
 * volt marks high risk, exactly as the rest of the hub does.
 */
import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AddStudentDialog } from '@/components/college/dialogs/AddStudentDialog';
import { BulkAddStudentsSheet } from '@/components/college/dialogs/BulkAddStudentsSheet';
import { StudentDetailSheet } from '@/components/college/sheets/StudentDetailSheet';
import { EditStudentSheet } from '@/components/college/sheets/EditStudentSheet';
import { AssignStaffSheet } from '@/components/college/sheets/AssignStaffSheet';
import { CreateInviteSheet } from '@/components/college/sheets/CreateInviteSheet';
import { StudentActivationStrip } from '@/components/college/widgets/StudentActivationStrip';
import { WithdrawStudentDialog } from '@/components/college/dialogs/WithdrawStudentDialog';
import { PullToRefresh } from '@/components/college/ui/PullToRefresh';
import { StudentCardSkeletonList } from '@/components/college/ui/StudentCardSkeleton';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import type { CollegeStudent } from '@/contexts/CollegeSupabaseContext';
import { useCollegeSettings } from '@/hooks/college/useCollegeSettings';
import { formatUKDateShort } from '@/utils/collegeHelpers';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { HubKpi, HubKpiRow, HubSectionHeading } from '@/components/hub/HubPrimitives';
import { containerVariants, itemVariants } from '@/components/college/primitives';

/* Hub-language atoms, kept local so this file has no dependency on the old
   college primitives beyond the motion variants. */
const CHIP =
  'inline-flex h-11 shrink-0 items-center gap-1.5 rounded-full border px-4 text-[12.5px] transition-colors touch-manipulation';
const CHIP_ON = 'border-elec-yellow bg-elec-yellow font-semibold text-black';
const CHIP_OFF = 'border-white/[0.12] bg-white/[0.06] font-medium text-white hover:bg-white/[0.10]';
const SEARCH =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white caret-elec-yellow transition-colors placeholder:text-white placeholder:opacity-60 hover:border-white/[0.3] focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation';
const PRIMARY =
  'inline-flex h-11 w-full items-center justify-center rounded-full bg-elec-yellow px-5 text-[13px] font-semibold text-black transition-[opacity,transform] hover:opacity-90 active:scale-[0.98] disabled:bg-white/[0.08] disabled:text-white disabled:opacity-60 touch-manipulation sm:w-auto';
const TEXT_ACTION =
  'flex h-11 shrink-0 items-center px-2 text-[12px] font-bold text-elec-yellow transition-colors touch-manipulation';
const LIST_CARD = cn(
  '-mx-4 overflow-hidden border-y border-elec-yellow/35 sm:mx-0 sm:rounded-2xl sm:border-x',
  CARD_SURFACE
);

type StatusFilter = 'all' | 'active' | 'withdrawn' | 'completed' | 'risk' | 'attendance';

const norm = (s: string | null | undefined) => (s ?? '').trim().toLowerCase();

export function StudentsSection() {
  const { students, cohorts, attendance, isLoading, updateStudent } = useCollegeSupabase();
  const { settings } = useCollegeSettings();
  const lowAttendance = settings.low_attendance_threshold_percent;
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<StatusFilter>('all');
  const [filterCohort, setFilterCohort] = useState<string>('all');
  const [addStudentOpen, setAddStudentOpen] = useState(false);
  const [bulkAddOpen, setBulkAddOpen] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<CollegeStudent | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [batchMode, setBatchMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Seed the cohort filter from a ?cohort=<id> deep-link (e.g. tapping a cohort
  // row), then strip it so refreshes don't re-pin the filter.
  useEffect(() => {
    const cohortParam = searchParams.get('cohort');
    if (cohortParam) {
      setFilterCohort(cohortParam);
      const next = new URLSearchParams(searchParams);
      next.delete('cohort');
      setSearchParams(next, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectStudent = (student: CollegeStudent) => {
    if (batchMode) {
      toggleSelection(student.id);
      return;
    }
    // Student 360 is the learner profile. `student.id` is the college row id,
    // which is what the section expects — never the auth uid.
    navigate(`/college?section=student360&studentId=${student.id}`);
  };

  const handleCall = (student: CollegeStudent) => {
    if (student.phone) window.location.href = `tel:${student.phone}`;
  };
  const handleEmail = (student: CollegeStudent) => {
    if (student.email) window.location.href = `mailto:${student.email}`;
  };
  const handleFlagAtRisk = async (student: CollegeStudent) => {
    await updateStudent(student.id, { risk_level: 'High' });
    toast({
      title: 'Flagged as at risk',
      description: `${student.name} has been flagged. Open their profile to add context.`,
    });
  };

  // Long-press detection for touch devices — starts batch mode
  const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressFiredRef = useRef(false);
  const startLongPress = (id: string) => {
    longPressFiredRef.current = false;
    longPressTimerRef.current = setTimeout(() => {
      longPressFiredRef.current = true;
      handleLongPress(id);
    }, 450);
  };
  const cancelLongPress = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };
  const handleEditStudent = (student: CollegeStudent) => {
    setSelectedStudent(student);
    setDetailOpen(false);
    setEditOpen(true);
  };
  const handleWithdrawStudent = (student: CollegeStudent) => {
    setSelectedStudent(student);
    setDetailOpen(false);
    setWithdrawOpen(true);
  };
  const handleAssignStaff = (student: CollegeStudent) => {
    setSelectedStudent(student);
    setDetailOpen(false);
    setAssignOpen(true);
  };
  const toggleSelection = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  const handleLongPress = useCallback(
    (id: string) => {
      if (!batchMode) {
        setBatchMode(true);
        setSelectedIds(new Set([id]));
      }
    },
    [batchMode]
  );
  const exitBatchMode = () => {
    setBatchMode(false);
    setSelectedIds(new Set());
  };

  /*
   * Attendance rate, or null when no register has been marked. The old
   * helper returned 100 for a learner with no records, which showed a brand
   * new enrolment as "100% att" — a figure nobody had measured.
   * `college_attendance.student_id` is the college row id, and the status
   * words are Capitalised in the table; compared case-insensitively here.
   */
  const attendanceRate = useMemo(() => {
    const totals = new Map<string, { n: number; attended: number }>();
    for (const a of attendance) {
      const t = totals.get(a.student_id) ?? { n: 0, attended: 0 };
      t.n += 1;
      const s = norm(a.status);
      if (s === 'present' || s === 'late') t.attended += 1;
      totals.set(a.student_id, t);
    }
    return (studentId: string): number | null => {
      const t = totals.get(studentId);
      if (!t || t.n === 0) return null;
      return Math.round((t.attended / t.n) * 100);
    };
  }, [attendance]);

  const isAtRisk = (s: CollegeStudent) => ['high', 'critical'].includes(norm(s.risk_level));
  const isCritical = (s: CollegeStudent) => norm(s.risk_level) === 'critical';
  const isActive = (s: CollegeStudent) => norm(s.status) === 'active';

  const active = useMemo(() => students.filter(isActive), [students]);
  const withdrawnCount = students.filter((s) => norm(s.status) === 'withdrawn').length;
  const completedCount = students.filter((s) => norm(s.status) === 'completed').length;
  const atRisk = active.filter(isAtRisk);
  const criticalCount = atRisk.filter(isCritical).length;
  const lowAttendanceLearners = active.filter((s) => {
    const r = attendanceRate(s.id);
    return r !== null && r < lowAttendance;
  });
  const unassigned = active.filter((s) => !s.cohort_id);

  const activeCohorts = useMemo(
    () => cohorts.filter((c) => norm(c.status) === 'active'),
    [cohorts]
  );

  const filteredStudents = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return students.filter((student) => {
      const matchesSearch =
        !q ||
        student.name.toLowerCase().includes(q) ||
        (student.uln ?? '').toLowerCase().includes(q) ||
        student.email.toLowerCase().includes(q);
      const status = norm(student.status);
      const matchesStatus =
        filterStatus === 'all'
          ? true
          : filterStatus === 'risk'
            ? status === 'active' && isAtRisk(student)
            : filterStatus === 'attendance'
              ? status === 'active' &&
                (() => {
                  const r = attendanceRate(student.id);
                  return r !== null && r < lowAttendance;
                })()
              : status === filterStatus;
      const matchesCohort =
        filterCohort === 'all'
          ? true
          : filterCohort === 'none'
            ? !student.cohort_id
            : student.cohort_id === filterCohort;
      return matchesSearch && matchesStatus && matchesCohort;
    });
  }, [students, searchQuery, filterStatus, filterCohort, attendanceRate, lowAttendance]);

  const getCohortName = (cohortId: string | null) => {
    if (!cohortId) return 'No cohort';
    return cohorts.find((c) => c.id === cohortId)?.name || 'Unknown cohort';
  };

  // A real refresh: the context has no refetch, so invalidate every active
  // query. The previous handler waited 800ms and changed nothing.
  const handleRefresh = async () => {
    await queryClient.invalidateQueries();
  };

  const hasActiveFilters = !!searchQuery || filterStatus !== 'all' || filterCohort !== 'all';

  const statusChips: { value: StatusFilter; label: string; count: number }[] = [
    { value: 'all', label: 'All', count: students.length },
    { value: 'active', label: 'Active', count: active.length },
    { value: 'risk', label: 'At risk', count: atRisk.length },
    { value: 'attendance', label: 'Low attendance', count: lowAttendanceLearners.length },
    { value: 'withdrawn', label: 'Withdrawn', count: withdrawnCount },
    { value: 'completed', label: 'Completed', count: completedCount },
  ];

  const riskWord = (s: CollegeStudent): JSX.Element | string | null => {
    const level = norm(s.risk_level);
    if (level === 'critical') return <span className="font-semibold text-red-300">Critical risk</span>;
    if (level === 'high') return 'High risk';
    if (level === 'medium') return 'Medium risk';
    return null;
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 sm:space-y-8"
    >
      {/* Four KPIs, the first in volt. Each one is also a filter. */}
      <HubKpiRow>
        <HubKpi
          accent
          label="Learners"
          value={String(active.length)}
          verdict={active.length > 0 ? 'Active on the roll' : 'No active learners yet'}
          context={
            withdrawnCount + completedCount > 0
              ? [
                  withdrawnCount > 0 ? `${withdrawnCount} withdrawn` : null,
                  completedCount > 0 ? `${completedCount} completed` : null,
                ]
                  .filter(Boolean)
                  .join(' · ')
              : undefined
          }
          onClick={() => setFilterStatus('active')}
        />
        <HubKpi
          label="At risk"
          value={String(atRisk.length)}
          verdict={
            criticalCount > 0
              ? `${criticalCount} critical — check in today`
              : atRisk.length > 0
                ? 'Worth a check-in this week'
                : 'Nothing flagged'
          }
          sentiment={atRisk.length > 0 ? 'bad' : 'neutral'}
          onClick={() => setFilterStatus('risk')}
        />
        <HubKpi
          label="Low attendance"
          value={String(lowAttendanceLearners.length)}
          verdict={
            lowAttendanceLearners.length > 0
              ? `Below the ${lowAttendance}% target`
              : `Everyone at or above ${lowAttendance}%`
          }
          context={attendance.length === 0 ? 'No register marked yet' : undefined}
          sentiment={lowAttendanceLearners.length > 0 ? 'bad' : 'neutral'}
          onClick={() => setFilterStatus('attendance')}
        />
        <HubKpi
          label="Not in a cohort"
          value={String(unassigned.length)}
          verdict={unassigned.length > 0 ? 'Assign them to a cohort' : 'Everyone is in a cohort'}
          onClick={() => setFilterCohort('none')}
        />
      </HubKpiRow>

      {/* The one solid volt action. Bulk enrol and invite are volt TEXT. */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
      >
        <button type="button" onClick={() => setAddStudentOpen(true)} className={PRIMARY}>
          Enrol learner
        </button>
        <div className="-mx-2 flex items-center gap-1 sm:mx-0">
          <button type="button" onClick={() => setBulkAddOpen(true)} className={TEXT_ACTION}>
            Bulk enrol
          </button>
          <button type="button" onClick={() => setInviteOpen(true)} className={TEXT_ACTION}>
            Invite by code
          </button>
        </div>
      </motion.div>

      {/* How many enrolled learners are actually in the app. Renders nothing
          until there is a roster to measure. */}
      <motion.div variants={itemVariants}>
        <StudentActivationStrip
          collegeId={students[0]?.college_id ?? undefined}
          onShareInvite={() => setInviteOpen(true)}
        />
      </motion.div>

      {/* Filters: underline search, then chips that wrap rather than scroll. */}
      <motion.div variants={itemVariants} className="space-y-3">
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search name, ULN or email…"
          aria-label="Search learners"
          className={SEARCH}
        />
        <div className="flex flex-wrap gap-2">
          {statusChips.map((chip) => (
            <button
              key={chip.value}
              type="button"
              onClick={() => setFilterStatus(chip.value)}
              className={cn(CHIP, filterStatus === chip.value ? CHIP_ON : CHIP_OFF)}
            >
              {chip.label}
              <span className="tabular-nums opacity-70">{chip.count}</span>
            </button>
          ))}
        </div>
        {(activeCohorts.length > 0 || unassigned.length > 0) && (
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setFilterCohort('all')}
              className={cn(CHIP, filterCohort === 'all' ? CHIP_ON : CHIP_OFF)}
            >
              All cohorts
            </button>
            {activeCohorts.map((cohort) => (
              <button
                key={cohort.id}
                type="button"
                onClick={() => setFilterCohort(cohort.id)}
                className={cn(CHIP, filterCohort === cohort.id ? CHIP_ON : CHIP_OFF)}
              >
                {cohort.name}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setFilterCohort('none')}
              className={cn(CHIP, filterCohort === 'none' ? CHIP_ON : CHIP_OFF)}
            >
              No cohort
              <span className="tabular-nums opacity-70">{unassigned.length}</span>
            </button>
          </div>
        )}
      </motion.div>

      {/* The list */}
      <motion.section variants={itemVariants} className="space-y-3">
        <div className="flex items-end justify-between gap-4">
          <HubSectionHeading>
            {batchMode ? `${selectedIds.size} selected` : 'Learners'}
          </HubSectionHeading>
          <span className="text-[11px] font-semibold tabular-nums text-white">
            {filteredStudents.length === students.length
              ? `${students.length} on the roll`
              : `${filteredStudents.length} of ${students.length}`}
          </span>
        </div>

        {isLoading ? (
          <StudentCardSkeletonList count={4} />
        ) : (
          <PullToRefresh onRefresh={handleRefresh}>
            <div className={LIST_CARD}>
              {filteredStudents.length === 0 ? (
                <div className="px-4 py-5 sm:px-5">
                  <p className="text-[14px] font-semibold text-white">
                    {students.length === 0
                      ? 'No learners enrolled yet'
                      : hasActiveFilters
                        ? 'No learners match these filters'
                        : 'No learners'}
                  </p>
                  <p className="mt-1 text-[12.5px] leading-snug text-white">
                    {students.length === 0
                      ? 'Enrol a learner above, bulk enrol from a spreadsheet, or share a join code.'
                      : 'Clear the search or pick another chip.'}
                  </p>
                </div>
              ) : (
                <ul className="divide-y divide-white/[0.10]">
                  {filteredStudents.map((student) => {
                    const rate = attendanceRate(student.id);
                    const progressPercent = student.progress_percent ?? 0;
                    const risk = isAtRisk(student);
                    const critical = isCritical(student);
                    const isSelected = selectedIds.has(student.id);
                    const statusWord = isActive(student) ? null : student.status;
                    const reason = [
                      student.uln ? `ULN ${student.uln}` : null,
                      getCohortName(student.cohort_id),
                      rate !== null ? `${rate}% attendance` : 'No register yet',
                      student.expected_end_date
                        ? `Due ${formatUKDateShort(student.expected_end_date)}`
                        : null,
                      statusWord,
                    ].filter(Boolean);
                    const riskLabel = riskWord(student);

                    return (
                      <li
                        key={student.id}
                        className={cn(
                          'flex items-center gap-2 pr-2 transition-colors sm:pr-3',
                          isSelected && 'bg-white/[0.06]'
                        )}
                        onTouchStart={() => startLongPress(student.id)}
                        onTouchEnd={cancelLongPress}
                        onTouchCancel={cancelLongPress}
                        onTouchMove={cancelLongPress}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            if (longPressFiredRef.current) {
                              longPressFiredRef.current = false;
                              return;
                            }
                            handleSelectStudent(student);
                          }}
                          aria-label={batchMode ? `Select ${student.name}` : `Open ${student.name}`}
                          className="flex min-w-0 flex-1 items-center gap-3 py-3.5 pl-4 text-left transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09] sm:pl-5"
                        >
                          {batchMode ? (
                            <span
                              aria-hidden
                              className={cn(
                                'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-[13px] font-bold',
                                isSelected
                                  ? 'border-elec-yellow bg-elec-yellow text-black'
                                  : 'border-white/[0.25] text-transparent'
                              )}
                            >
                              ✓
                            </span>
                          ) : (
                            /* A rule, not an avatar. Red only when critical;
                               volt for high risk; neutral otherwise. */
                            <span
                              aria-hidden
                              className={cn(
                                'h-8 w-[3px] shrink-0 rounded-full',
                                critical ? 'bg-red-400' : risk ? 'bg-elec-yellow' : 'bg-white/[0.25]'
                              )}
                            />
                          )}

                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[14px] font-semibold leading-tight text-white">
                              {student.name}
                            </span>
                            <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
                              {riskLabel ? (
                                <>
                                  {riskLabel}
                                  {reason.length > 0 ? ' · ' : ''}
                                </>
                              ) : null}
                              {reason.join(' · ')}
                            </span>
                          </span>

                          <span
                            className={cn(
                              'shrink-0 text-[13px] font-semibold tabular-nums',
                              risk ? 'text-elec-yellow' : 'text-white'
                            )}
                          >
                            {progressPercent}%
                          </span>
                          {!batchMode && (
                            <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden />
                          )}
                        </button>

                        {/* ⋯ sits outside the row button so a menu isn't
                            nested inside a button. */}
                        {!batchMode && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button
                                type="button"
                                aria-label={`More actions for ${student.name}`}
                                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white transition-colors touch-manipulation hover:bg-white/[0.06]"
                              >
                                <span className="text-[15px] font-semibold tracking-[0.12em]">⋯</span>
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="min-w-[180px]">
                              <DropdownMenuItem
                                className="h-11 touch-manipulation"
                                onClick={() => handleSelectStudent(student)}
                              >
                                Open profile
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {student.phone && (
                                <DropdownMenuItem
                                  className="h-11 touch-manipulation"
                                  onClick={() => handleCall(student)}
                                >
                                  Call · {student.phone}
                                </DropdownMenuItem>
                              )}
                              {student.email && (
                                <DropdownMenuItem
                                  className="h-11 touch-manipulation"
                                  onClick={() => handleEmail(student)}
                                >
                                  Email
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                              {!risk && (
                                <DropdownMenuItem
                                  className="h-11 touch-manipulation"
                                  onClick={() => handleFlagAtRisk(student)}
                                >
                                  Flag as at risk
                                </DropdownMenuItem>
                              )}
                              {student.user_id && (
                                <DropdownMenuItem
                                  className="h-11 touch-manipulation"
                                  onClick={() => handleAssignStaff(student)}
                                >
                                  Assign staff
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem
                                className="h-11 touch-manipulation"
                                onClick={() => handleEditStudent(student)}
                              >
                                Edit details
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="h-11 text-red-300 touch-manipulation focus:text-red-200"
                                onClick={() => handleWithdrawStudent(student)}
                              >
                                Withdraw
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </PullToRefresh>
        )}
      </motion.section>

      {/* Batch bar — appears on long-press. While it is up it carries the
          screen's one action; Cancel is text. */}
      {batchMode && selectedIds.size > 0 && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-white/[0.10] bg-elec-dark/95 p-4 backdrop-blur-sm"
          style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))' }}
        >
          <div className="mx-auto flex max-w-2xl items-center justify-between gap-3">
            <p className="text-sm font-medium tabular-nums text-white">
              {selectedIds.size} selected
            </p>
            <div className="flex items-center gap-2">
              <button type="button" onClick={exitBatchMode} className={cn(TEXT_ACTION, 'text-white')}>
                Cancel
              </button>
              <button
                type="button"
                className={cn(PRIMARY, 'w-auto')}
                onClick={async () => {
                  const ids = Array.from(selectedIds);
                  for (const id of ids) {
                    await updateStudent(id, { risk_level: 'High' });
                  }
                  toast({
                    title: 'Learners flagged',
                    description: `${ids.length} learner${ids.length !== 1 ? 's' : ''} flagged as high risk.`,
                  });
                  exitBatchMode();
                }}
              >
                Flag as at risk
              </button>
            </div>
          </div>
        </motion.div>
      )}

      <AddStudentDialog open={addStudentOpen} onOpenChange={setAddStudentOpen} />
      <BulkAddStudentsSheet open={bulkAddOpen} onOpenChange={setBulkAddOpen} />
      <CreateInviteSheet open={inviteOpen} onOpenChange={setInviteOpen} />
      <StudentDetailSheet
        student={selectedStudent}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        onEdit={handleEditStudent}
        onWithdraw={handleWithdrawStudent}
      />
      <EditStudentSheet student={selectedStudent} open={editOpen} onOpenChange={setEditOpen} />
      {selectedStudent?.user_id && selectedStudent?.college_id && (
        <AssignStaffSheet
          open={assignOpen}
          onOpenChange={setAssignOpen}
          studentUserId={selectedStudent.user_id}
          studentName={selectedStudent.name}
          collegeId={selectedStudent.college_id}
        />
      )}
      <WithdrawStudentDialog
        student={selectedStudent}
        open={withdrawOpen}
        onOpenChange={setWithdrawOpen}
        onWithdrawn={() => {
          setSelectedStudent(null);
          setWithdrawOpen(false);
        }}
      />
    </motion.div>
  );
}
