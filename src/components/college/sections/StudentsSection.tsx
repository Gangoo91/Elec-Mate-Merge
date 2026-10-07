/**
 * StudentsSection — the learner roster (College Hub kit, 7 Oct 2026).
 *
 * Header (with "?") → mine / whole college switch (ELE-1886) → four headline
 * figures, each also a filter → activation → search + status and cohort
 * chips → the roster: one row per learner with risk, attendance, off-the-job
 * hours and progress, tapping through to Student 360
 * (`/college?section=student360&studentId=<college_students.id>`).
 *
 * The row menu carries the lifecycle actions (ELE-1902): move cohort, break
 * in learning, withdraw, completed, back to active — one confirmation sheet
 * (LearnerLifecycleSheet) that writes the row and checks it was written.
 *
 * Long-press (or "Select") starts batch mode, as before.
 */
import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { AddStudentDialog } from '@/components/college/dialogs/AddStudentDialog';
import { BulkAddStudentsSheet } from '@/components/college/dialogs/BulkAddStudentsSheet';
import { EditStudentSheet } from '@/components/college/sheets/EditStudentSheet';
import { AssignStaffSheet } from '@/components/college/sheets/AssignStaffSheet';
import { CreateInviteSheet } from '@/components/college/sheets/CreateInviteSheet';
import { StudentActivationStrip } from '@/components/college/widgets/StudentActivationStrip';
import { PullToRefresh } from '@/components/college/ui/PullToRefresh';
import { StudentCardSkeletonList } from '@/components/college/ui/StudentCardSkeleton';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import type { CollegeStudent } from '@/contexts/CollegeSupabaseContext';
import { useCollegeSettings } from '@/hooks/college/useCollegeSettings';
import { formatUKDateShort } from '@/utils/collegeHelpers';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import {
  COLLEGE_BTN,
  COLLEGE_BTN_PRIMARY,
  COLLEGE_LIST,
  CollegeEmpty,
  CollegePageHeader,
  CollegeSectionTitle,
  CollegeStats,
} from '@/components/college/ui/CollegeUi';
import {
  FilterChips,
  NameBadge,
  PeopleListHead,
  PeopleRow,
  SEARCH_CN,
  ScopeSwitch,
  norm,
  type RowMenuItem,
} from '@/components/college/people/peopleKit';
import { useMyScope, type PeopleScope } from '@/components/college/people/useMyScope';
import { otjFigure, useRosterOtj } from '@/components/college/people/useRosterOtj';
import {
  LearnerLifecycleSheet,
  type LifecycleAction,
} from '@/components/college/people/LearnerLifecycleSheet';

type StatusFilter = 'all' | 'active' | 'break' | 'withdrawn' | 'completed' | 'risk' | 'attendance' | 'otj';

const HELP: PageHelpContent = {
  id: 'college-learners',
  title: 'Learners',
  what: 'Everyone on your roll, with the figures that tell you who needs you: risk, attendance, off-the-job hours and progress. Tap a learner to open their Student 360.',
  steps: [
    { title: 'Start with yours', body: 'The switch at the top shows your learners first: the ones assigned to you and the cohorts you teach. Switch to the whole college when you need everyone.' },
    { title: 'Filter to what matters', body: 'Tap a headline figure or a chip to narrow the list: at risk, low attendance, behind on hours, or one cohort.' },
    { title: 'Open the learner', body: 'Tap a row for Student 360. The ⋯ menu has call, email, assign staff, edit, and the moves: change cohort, break in learning, withdraw or completed.' },
    { title: 'Add learners', body: 'Enrol one at a time, paste a whole class with Bulk enrol (you see every row checked before anything is saved), or share a join code.' },
  ],
  legend: [
    { swatch: 'bg-red-400', label: 'Critical risk', body: 'Check in today.' },
    { swatch: 'bg-orange-400', label: 'High risk, or behind', body: 'Worth a conversation this week.' },
    { swatch: 'bg-emerald-400', label: 'On track' },
  ],
  notes: [
    { title: 'Attendance', body: 'Counts present and late against every register marked. A learner with no register yet shows a dash, never 100%.' },
    { title: 'Off-the-job hours', body: 'Counted hours against the hours their programme needs, the same figure as the Off-the-job page.' },
  ],
};

export function StudentsSection() {
  const { students: allStudents, cohorts, staff, attendance, isLoading, updateStudent } = useCollegeSupabase();
  const scopeInfo = useMyScope({ staff, students: allStudents, cohorts });
  const { hasMine, myStudentIds } = scopeInfo;
  /*
   * A ?cohort= deep link may need the whole college to show a cohort that is
   * not mine. That is a one-visit override, never written to the remembered
   * choice; tapping the switch clears it.
   */
  const [scopeOverride, setScopeOverride] = useState<PeopleScope | null>(null);
  const scope: PeopleScope = scopeOverride ?? scopeInfo.scope;
  const setScope = (s: PeopleScope) => {
    setScopeOverride(null);
    scopeInfo.setScope(s);
  };
  // Hold a skeleton until the roll AND the "who is mine" answer are both in,
  // so the page never shows the whole college and then flips to Mine.
  const loading = isLoading || !scopeInfo.ready;
  const students = useMemo(
    () => (scope === 'mine' ? allStudents.filter((s) => myStudentIds.has(s.id)) : allStudents),
    [allStudents, scope, myStudentIds]
  );
  const { byStudent: otjById } = useRosterOtj();
  const [lifecycle, setLifecycle] = useState<{ student: CollegeStudent; action: LifecycleAction } | null>(null);
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
  const [batchMode, setBatchMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Seed the cohort filter from a ?cohort=<id> deep-link (e.g. tapping a cohort
  // row), then strip it so refreshes don't re-pin the filter. Waits until we
  // know which cohorts are mine; before that every cohort looks "not mine".
  const deepLinkDone = useRef(false);
  useEffect(() => {
    if (deepLinkDone.current || loading) return;
    deepLinkDone.current = true;
    const cohortParam = searchParams.get('cohort');
    if (cohortParam) {
      setFilterCohort(cohortParam);
      if (cohortParam !== 'none' && scopeInfo.scope === 'mine' && !scopeInfo.myCohortIds.has(cohortParam)) {
        setScopeOverride('college');
      }
      const next = new URLSearchParams(searchParams);
      next.delete('cohort');
      setSearchParams(next, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

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
    setDetailOpen(false);
    setLifecycle({ student, action: 'withdraw' });
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
  const onBreak = students.filter((s) => norm(s.status) === 'break in learning').length;
  const behindHours = active.filter((s) => otjFigure(otjById.get(s.id)).warn);
  const measuredHours = active.filter((s) => otjById.has(s.id)).length;

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
              : filterStatus === 'otj'
                ? status === 'active' && otjFigure(otjById.get(student.id)).warn
                : filterStatus === 'break'
                  ? status === 'break in learning'
                  : status === filterStatus;
      const matchesCohort =
        filterCohort === 'all'
          ? true
          : filterCohort === 'none'
            ? !student.cohort_id
            : student.cohort_id === filterCohort;
      return matchesSearch && matchesStatus && matchesCohort;
    });
  }, [students, searchQuery, filterStatus, filterCohort, attendanceRate, lowAttendance, otjById]);

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
    { value: 'otj', label: 'Behind on hours', count: behindHours.length },
    ...(onBreak > 0 ? [{ value: 'break' as StatusFilter, label: 'On Break', count: onBreak }] : []),
    { value: 'withdrawn', label: 'Withdrawn', count: withdrawnCount },
    { value: 'completed', label: 'Completed', count: completedCount },
  ];

  const riskWord = (s: CollegeStudent): string | null => {
    const level = norm(s.risk_level);
    if (level === 'critical') return 'Critical risk';
    if (level === 'high') return 'High risk';
    if (level === 'medium') return 'Medium risk';
    return null;
  };

  const cohortCount = (id: string) => students.filter((s) => s.cohort_id === id && isActive(s)).length;
  const visibleCohorts = scope === 'mine' ? activeCohorts.filter((c) => scopeInfo.myCohortIds.has(c.id) || cohortCount(c.id) > 0) : activeCohorts;

  const menuFor = (student: CollegeStudent): RowMenuItem[] => {
    const active = isActive(student);
    const items: RowMenuItem[] = [{ label: 'Open Student 360', onClick: () => handleSelectStudent(student) }];
    if (student.phone) items.push({ label: `Call · ${student.phone}`, onClick: () => handleCall(student), separated: true });
    if (student.email) items.push({ label: 'Email', onClick: () => handleEmail(student), separated: !student.phone });
    if (!isAtRisk(student) && active) items.push({ label: 'Flag as at risk', onClick: () => handleFlagAtRisk(student), separated: true });
    if (student.user_id) items.push({ label: 'Assign staff', onClick: () => handleAssignStaff(student), separated: isAtRisk(student) || !active });
    items.push({ label: 'Edit details', onClick: () => handleEditStudent(student) });
    items.push({ label: 'Move cohort', onClick: () => setLifecycle({ student, action: 'move' }), separated: true });
    if (active) {
      items.push({ label: 'On Break', onClick: () => setLifecycle({ student, action: 'break' }) });
      items.push({ label: 'Completed', onClick: () => setLifecycle({ student, action: 'complete' }) });
      items.push({ label: 'Withdraw', onClick: () => setLifecycle({ student, action: 'withdraw' }), danger: true });
    } else {
      items.push({ label: 'Back to active', onClick: () => setLifecycle({ student, action: 'return' }) });
    }
    return items;
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6 sm:space-y-8">
      <CollegePageHeader
        eyebrow="People"
        title={!loading && scope === 'mine' ? 'Your learners' : 'Learners'}
        description={
          loading
            ? 'Loading the roll…'
            : `${active.length} active on the roll${scope === 'mine' ? ' that you teach or are assigned to' : ''}. Tap anyone to open their Student 360.`
        }
        help={HELP}
        actions={
          <>
            <button type="button" onClick={() => setInviteOpen(true)} className={COLLEGE_BTN}>
              Invite by code
            </button>
            <button type="button" onClick={() => setBulkAddOpen(true)} className={COLLEGE_BTN}>
              Bulk enrol
            </button>
            <button type="button" onClick={() => setAddStudentOpen(true)} className={cn(COLLEGE_BTN_PRIMARY, 'order-first lg:order-none')}>
              Enrol learner
            </button>
          </>
        }
      />

      <ScopeSwitch
        scope={scope}
        onChange={(s) => {
          setScope(s);
          setFilterCohort('all');
        }}
        hasMine={!loading && hasMine}
        mineLabel="My learners"
        mineCount={allStudents.filter((s) => myStudentIds.has(s.id) && isActive(s)).length}
        collegeCount={allStudents.filter(isActive).length}
      />

      <CollegeStats
        items={[
          {
            label: 'On the roll',
            value: String(active.length),
            sub:
              [
                withdrawnCount > 0 ? `${withdrawnCount} withdrawn` : null,
                completedCount > 0 ? `${completedCount} completed` : null,
                onBreak > 0 ? `${onBreak} on a break` : null,
              ]
                .filter(Boolean)
                .join(' · ') || 'Active learners',
            onClick: () => setFilterStatus('active'),
          },
          {
            label: 'At risk',
            value: String(atRisk.length),
            sub: criticalCount > 0 ? `${criticalCount} critical, check in today` : atRisk.length > 0 ? 'Worth a check-in this week' : 'Nothing flagged',
            warn: atRisk.length > 0,
            onClick: () => setFilterStatus('risk'),
          },
          {
            label: 'Low attendance',
            value: String(lowAttendanceLearners.length),
            sub: attendance.length === 0 ? 'No register marked yet' : `Below the ${lowAttendance}% target`,
            warn: lowAttendanceLearners.length > 0,
            onClick: () => setFilterStatus('attendance'),
          },
          {
            label: 'Behind on hours',
            value: String(behindHours.length),
            sub: measuredHours === 0 ? 'No hours measured yet' : 'Off-the-job pace below plan',
            warn: behindHours.length > 0,
            onClick: () => setFilterStatus('otj'),
          },
        ]}
      />

      <motion.div variants={itemVariants}>
        <StudentActivationStrip collegeId={allStudents[0]?.college_id ?? undefined} onShareInvite={() => setInviteOpen(true)} />
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-3">
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search name, ULN or email…"
          aria-label="Search learners"
          className={cn(SEARCH_CN, 'lg:max-w-xl')}
        />
        <FilterChips<StatusFilter> label="Status" items={statusChips} value={filterStatus} onChange={setFilterStatus} />
        {(visibleCohorts.length > 0 || unassigned.length > 0) && (
          <FilterChips
            label="Cohort"
            value={filterCohort}
            onChange={setFilterCohort}
            items={[
              { value: 'all', label: 'All cohorts' },
              ...visibleCohorts.map((c) => ({ value: c.id, label: c.name, count: cohortCount(c.id) })),
              ...(unassigned.length > 0 ? [{ value: 'none', label: 'No cohort', count: unassigned.length }] : []),
            ]}
          />
        )}
      </motion.div>

      <motion.section variants={itemVariants} className="space-y-3">
        <CollegeSectionTitle
          title={batchMode ? `${selectedIds.size} selected` : 'Roster'}
          sub={
            filteredStudents.length === students.length
              ? `${students.length} ${students.length === 1 ? 'learner' : 'learners'}`
              : `${filteredStudents.length} of ${students.length} shown`
          }
          action={
            <>
              {hasActiveFilters && (
                <button
                  type="button"
                  className="flex h-11 items-center px-2 text-[13px] font-semibold text-elec-yellow touch-manipulation"
                  onClick={() => {
                    setSearchQuery('');
                    setFilterStatus('all');
                    setFilterCohort('all');
                  }}
                >
                  Clear filters
                </button>
              )}
              <button
                type="button"
                className="flex h-11 items-center px-2 text-[13px] font-semibold text-elec-yellow touch-manipulation"
                onClick={() => (batchMode ? exitBatchMode() : setBatchMode(true))}
              >
                {batchMode ? 'Done' : 'Select'}
              </button>
            </>
          }
        />

        {loading ? (
          <StudentCardSkeletonList count={4} />
        ) : filteredStudents.length === 0 ? (
          <CollegeEmpty
            title={students.length === 0 ? (scope === 'mine' ? 'No learners assigned to you yet' : 'No learners enrolled yet') : 'No learners match these filters'}
            body={
              students.length === 0
                ? scope === 'mine'
                  ? 'Switch to the whole college, or ask your head of department to put you on a cohort.'
                  : 'Enrol a learner, paste a whole class with Bulk enrol, or share a join code.'
                : 'Clear the search or pick another chip.'
            }
            action={
              students.length === 0 && scope === 'college' ? (
                <button type="button" className={COLLEGE_BTN_PRIMARY} onClick={() => setAddStudentOpen(true)}>
                  Enrol learner
                </button>
              ) : undefined
            }
          />
        ) : (
          <PullToRefresh onRefresh={handleRefresh}>
            <div className={COLLEGE_LIST}>
              <PeopleListHead title="Learner" figures={['Attendance', 'Off-the-job', 'Progress']} />
              <ul className="divide-y divide-white/[0.06]">
                {filteredStudents.map((student) => {
                  const rate = attendanceRate(student.id);
                  const otj = otjFigure(otjById.get(student.id));
                  const progressPercent = student.progress_percent ?? 0;
                  const risk = isAtRisk(student);
                  const critical = isCritical(student);
                  const isSelected = selectedIds.has(student.id);
                  const statusWord = isActive(student) ? null : student.status;
                  const sub = [
                    riskWord(student),
                    getCohortName(student.cohort_id),
                    student.uln ? `ULN ${student.uln}` : null,
                    student.expected_end_date ? `Ends ${formatUKDateShort(student.expected_end_date)}` : null,
                  ]
                    .filter(Boolean)
                    .join(' · ');
                  return (
                    <div
                      key={student.id}
                      onTouchStart={() => startLongPress(student.id)}
                      onTouchEnd={cancelLongPress}
                      onTouchCancel={cancelLongPress}
                      onTouchMove={cancelLongPress}
                    >
                      <PeopleRow
                        title={student.name}
                        headed
                        badge={
                          statusWord ? (
                            <NameBadge>{statusWord}</NameBadge>
                          ) : scope === 'college' && myStudentIds.has(student.id) ? (
                            <NameBadge tone="mine">Yours</NameBadge>
                          ) : undefined
                        }
                        sub={sub}
                        tone={critical ? 'critical' : risk ? 'warn' : 'quiet'}
                        selected={isSelected}
                        openLabel={batchMode ? `Select ${student.name}` : `Open ${student.name}`}
                        leading={
                          batchMode ? (
                            <span
                              aria-hidden
                              className={cn(
                                'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-[13px] font-bold',
                                isSelected ? 'border-elec-yellow bg-elec-yellow text-black' : 'border-white/[0.25] text-transparent'
                              )}
                            >
                              ✓
                            </span>
                          ) : undefined
                        }
                        onOpen={() => {
                          if (longPressFiredRef.current) {
                            longPressFiredRef.current = false;
                            return;
                          }
                          handleSelectStudent(student);
                        }}
                        figures={[
                          {
                            label: 'attendance',
                            value: rate === null ? '—' : `${rate}%`,
                            warn: rate !== null && rate < lowAttendance,
                          },
                          { label: 'hours', value: otj.value, warn: otj.warn },
                          { label: 'progress', value: `${progressPercent}%` },
                        ]}
                        menu={batchMode ? undefined : menuFor(student)}
                      />
                    </div>
                  );
                })}
              </ul>
            </div>
          </PullToRefresh>
        )}
      </motion.section>

      {/* Batch bar: appears on long-press or "Select". */}
      {batchMode && selectedIds.size > 0 && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-white/[0.10] bg-elec-dark/95 p-4 backdrop-blur-sm"
          style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))' }}
        >
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-3">
            <p className="text-sm font-medium tabular-nums text-white">{selectedIds.size} selected</p>
            <div className="flex items-center gap-2">
              <button type="button" onClick={exitBatchMode} className={COLLEGE_BTN}>
                Cancel
              </button>
              <button
                type="button"
                className={COLLEGE_BTN_PRIMARY}
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
      <BulkAddStudentsSheet
        open={bulkAddOpen}
        onOpenChange={setBulkAddOpen}
        defaultCohortId={filterCohort !== 'all' && filterCohort !== 'none' ? filterCohort : undefined}
      />
      <CreateInviteSheet open={inviteOpen} onOpenChange={setInviteOpen} />
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
      <LearnerLifecycleSheet
        student={lifecycle?.student ?? null}
        cohorts={cohorts}
        students={allStudents}
        open={!!lifecycle}
        initialAction={lifecycle?.action}
        onOpenChange={(o) => {
          if (!o) setLifecycle(null);
        }}
      />
    </motion.div>
  );
}
