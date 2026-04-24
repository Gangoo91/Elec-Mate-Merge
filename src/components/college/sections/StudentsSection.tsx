import { useState, useCallback, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AddStudentDialog } from '@/components/college/dialogs/AddStudentDialog';
import { StudentDetailSheet } from '@/components/college/sheets/StudentDetailSheet';
import { EditStudentSheet } from '@/components/college/sheets/EditStudentSheet';
import { WithdrawStudentDialog } from '@/components/college/dialogs/WithdrawStudentDialog';
import { PullToRefresh } from '@/components/college/ui/PullToRefresh';
import { StudentCardSkeletonList } from '@/components/college/ui/StudentCardSkeleton';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import type { CollegeStudent } from '@/contexts/CollegeSupabaseContext';
import { getInitials, formatUKDateShort } from '@/utils/collegeHelpers';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  PageFrame,
  PageHero,
  ListCard,
  Pill,
  EmptyState,
  FilterBar,
  itemVariants,
} from '@/components/college/primitives';

export function StudentsSection() {
  const { students, cohorts, attendance, isLoading, updateStudent } = useCollegeSupabase();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCohort, setFilterCohort] = useState<string>('all');
  const [addStudentOpen, setAddStudentOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<CollegeStudent | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [batchMode, setBatchMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const handleSelectStudent = (student: CollegeStudent) => {
    if (batchMode) {
      toggleSelection(student.id);
      return;
    }
    // Dedicated Student 360 page is the primary profile view.
    navigate(`/college/students/${student.id}`);
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

  const getAttendanceRate = (studentId: string): number => {
    const records = attendance.filter((a) => a.student_id === studentId);
    if (records.length === 0) return 100;
    const present = records.filter((a) => a.status === 'Present' || a.status === 'Late').length;
    return Math.round((present / records.length) * 100);
  };

  const filteredStudents = useMemo(
    () =>
      students.filter((student) => {
        const matchesSearch =
          student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (student.uln ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
          student.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus === 'all' || student.status === filterStatus;
        const matchesCohort = filterCohort === 'all' || student.cohort_id === filterCohort;
        return matchesSearch && matchesStatus && matchesCohort;
      }),
    [students, searchQuery, filterStatus, filterCohort]
  );

  const getCohortName = (cohortId: string | null) => {
    if (!cohortId) return 'Unassigned';
    return cohorts.find((c) => c.id === cohortId)?.name || 'Unknown';
  };

  const handleRefresh = async () => {
    await new Promise((resolve) => setTimeout(resolve, 800));
  };

  const hasActiveFilters = searchQuery || filterStatus !== 'all' || filterCohort !== 'all';
  const activeCount = students.filter((s) => s.status === 'Active').length;

  return (
    <PageFrame>
      {/* HERO */}
      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="People · Students"
          title="Enrolled learners"
          description={`${activeCount} active student${activeCount === 1 ? '' : 's'} enrolled.`}
          tone="yellow"
          actions={
            <button
              onClick={() => setAddStudentOpen(true)}
              className="text-[12.5px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation whitespace-nowrap"
            >
              Enrol student →
            </button>
          }
        />
      </motion.div>

      {/* FILTER BAR */}
      <motion.div variants={itemVariants}>
        <FilterBar
          tabs={[
            { value: 'all', label: 'All', count: students.length },
            {
              value: 'Active',
              label: 'Active',
              count: students.filter((s) => s.status === 'Active').length,
            },
            {
              value: 'Withdrawn',
              label: 'Withdrawn',
              count: students.filter((s) => s.status === 'Withdrawn').length,
            },
            {
              value: 'Completed',
              label: 'Completed',
              count: students.filter((s) => s.status === 'Completed').length,
            },
          ]}
          activeTab={filterStatus}
          onTabChange={setFilterStatus}
          search={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search name, ULN or email…"
          actions={
            <select
              value={filterCohort}
              onChange={(e) => setFilterCohort(e.target.value)}
              className="h-10 px-3 bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-full text-[13px] text-white focus:outline-none focus:border-elec-yellow/60 touch-manipulation"
            >
              <option value="all">All Cohorts</option>
              {cohorts
                .filter((c) => c.status === 'Active')
                .map((cohort) => (
                  <option key={cohort.id} value={cohort.id}>
                    {cohort.name}
                  </option>
                ))}
            </select>
          }
        />
      </motion.div>

      {/* LIST */}
      {isLoading ? (
        <StudentCardSkeletonList count={4} />
      ) : (
        <PullToRefresh onRefresh={handleRefresh}>
          {filteredStudents.length === 0 ? (
            <EmptyState
              title="No students found"
              description={
                hasActiveFilters
                  ? 'Try adjusting your search or filters.'
                  : 'Get started by enrolling your first student.'
              }
              action={hasActiveFilters ? undefined : 'Enrol student'}
              onAction={() => setAddStudentOpen(true)}
            />
          ) : (
            <motion.div variants={itemVariants}>
              <ListCard>
                {filteredStudents.map((student) => {
                  const attendanceRate = getAttendanceRate(student.id);
                  const progressPercent = student.progress_percent ?? 0;
                  const isAtRisk =
                    student.risk_level === 'High' || student.risk_level === 'Medium';
                  const isCritical = student.risk_level === 'Critical' || student.risk_level === 'High';
                  const isSelected = selectedIds.has(student.id);

                  const attendanceTone =
                    attendanceRate < 80
                      ? 'text-red-400'
                      : attendanceRate < 90
                        ? 'text-amber-400'
                        : 'text-emerald-400';

                  return (
                    <div
                      key={student.id}
                      className={cn(
                        'relative group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4 sm:py-5 transition-colors',
                        isSelected
                          ? 'bg-elec-yellow/[0.06]'
                          : 'hover:bg-[hsl(0_0%_14%)]'
                      )}
                      onTouchStart={() => startLongPress(student.id)}
                      onTouchEnd={cancelLongPress}
                      onTouchCancel={cancelLongPress}
                      onTouchMove={cancelLongPress}
                    >
                      {/* Risk accent rail — visible left edge for at-risk */}
                      {isAtRisk && !batchMode && (
                        <span
                          aria-hidden
                          className={cn(
                            'absolute left-0 top-3 bottom-3 w-[3px] rounded-full',
                            isCritical ? 'bg-red-400/80' : 'bg-amber-400/80'
                          )}
                        />
                      )}

                      {/* Avatar / checkbox (col 1) */}
                      <button
                        type="button"
                        onMouseDown={() => {
                          // Long-press for desktop mouse too (nice-to-have)
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (longPressFiredRef.current) {
                            longPressFiredRef.current = false;
                            return;
                          }
                          handleSelectStudent(student);
                        }}
                        className="shrink-0 touch-manipulation"
                        aria-label={`Open ${student.name}`}
                      >
                        {batchMode ? (
                          <div
                            className={cn(
                              'h-10 w-10 rounded-full flex items-center justify-center border-2 transition-colors',
                              isSelected
                                ? 'bg-elec-yellow border-elec-yellow text-black'
                                : 'border-white/20'
                            )}
                          >
                            {isSelected && <span className="text-sm font-semibold">✓</span>}
                          </div>
                        ) : (
                          <Avatar
                            className={cn(
                              'h-10 w-10 ring-1 transition-colors',
                              isCritical
                                ? 'ring-red-500/40'
                                : isAtRisk
                                  ? 'ring-amber-500/40'
                                  : 'ring-white/[0.08]'
                            )}
                          >
                            <AvatarImage src={student.photo_url ?? undefined} />
                            <AvatarFallback className="bg-elec-yellow/10 text-elec-yellow text-xs font-semibold">
                              {getInitials(student.name)}
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </button>

                      {/* Body (col 2) — tappable row */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (longPressFiredRef.current) {
                            longPressFiredRef.current = false;
                            return;
                          }
                          handleSelectStudent(student);
                        }}
                        className="text-left min-w-0 touch-manipulation"
                      >
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <span className="text-[14.5px] sm:text-[15px] font-semibold text-white truncate max-w-full">
                            {student.name}
                          </span>
                          {isAtRisk && (
                            <Pill tone={isCritical ? 'red' : 'amber'}>
                              {student.risk_level}
                            </Pill>
                          )}
                        </div>
                        <div className="mt-0.5 text-[11.5px] text-white truncate tabular-nums">
                          {student.uln
                            ? `ULN · ${student.uln}`
                            : getCohortName(student.cohort_id)}
                        </div>

                        {/* Progress + meta — single responsive line */}
                        <div className="mt-2.5 flex items-center gap-3">
                          <div className="flex-1 max-w-[180px] h-1 bg-white/[0.06] rounded-full overflow-hidden">
                            <div
                              className={cn(
                                'h-full rounded-full transition-all',
                                progressPercent >= 66
                                  ? 'bg-emerald-400/80'
                                  : progressPercent >= 33
                                    ? 'bg-elec-yellow/80'
                                    : 'bg-red-400/70'
                              )}
                              style={{ width: `${progressPercent}%` }}
                            />
                          </div>
                          <span className="text-[11.5px] font-medium text-white tabular-nums shrink-0">
                            {progressPercent}%
                          </span>
                          <span className={cn('text-[11px] tabular-nums shrink-0', attendanceTone)}>
                            {attendanceRate}% att
                          </span>
                          <span className="hidden sm:inline text-[11px] text-white truncate">
                            {getCohortName(student.cohort_id)}
                          </span>
                          {student.expected_end_date && (
                            <span className="hidden lg:inline text-[11px] text-white tabular-nums">
                              Due {formatUKDateShort(student.expected_end_date)}
                            </span>
                          )}
                        </div>
                      </button>

                      {/* Trailing (col 3) — status + actions */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        <Pill
                          tone={
                            student.status === 'Active'
                              ? 'green'
                              : student.status === 'Withdrawn'
                                ? 'red'
                                : 'yellow'
                          }
                        >
                          <span className="hidden sm:inline">{student.status}</span>
                          <span className="sm:hidden">
                            {student.status === 'Active'
                              ? '●'
                              : student.status === 'Withdrawn'
                                ? '○'
                                : '◐'}
                          </span>
                        </Pill>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button
                              type="button"
                              aria-label="More actions"
                              onClick={(e) => e.stopPropagation()}
                              className="h-9 w-9 rounded-full flex items-center justify-center text-white hover:text-white hover:bg-white/[0.06] transition-colors touch-manipulation"
                            >
                              <span className="text-[15px] font-semibold tracking-[0.12em]">
                                ⋯
                              </span>
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="bg-[hsl(0_0%_11%)] border border-white/[0.08] text-white min-w-[180px]"
                          >
                            <DropdownMenuItem
                              onClick={() => handleSelectStudent(student)}
                              className="text-[13px]"
                            >
                              Open profile
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-white/[0.06]" />
                            {student.phone && (
                              <DropdownMenuItem
                                onClick={() => handleCall(student)}
                                className="text-[13px]"
                              >
                                Call · {student.phone}
                              </DropdownMenuItem>
                            )}
                            {student.email && (
                              <DropdownMenuItem
                                onClick={() => handleEmail(student)}
                                className="text-[13px]"
                              >
                                Email
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator className="bg-white/[0.06]" />
                            {!isAtRisk && (
                              <DropdownMenuItem
                                onClick={() => handleFlagAtRisk(student)}
                                className="text-[13px] text-amber-300 focus:text-amber-200"
                              >
                                Flag as at risk
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              onClick={() => handleEditStudent(student)}
                              className="text-[13px]"
                            >
                              Edit details
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-white/[0.06]" />
                            <DropdownMenuItem
                              onClick={() => handleWithdrawStudent(student)}
                              className="text-[13px] text-red-300 focus:text-red-200"
                            >
                              Withdraw
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  );
                })}
              </ListCard>
            </motion.div>
          )}
        </PullToRefresh>
      )}

      {/* BATCH BAR */}
      {batchMode && selectedIds.size > 0 && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          className="fixed bottom-0 inset-x-0 z-50 p-4 bg-[hsl(0_0%_8%)]/95 backdrop-blur-sm border-t border-white/[0.06]"
        >
          <div className="flex items-center justify-between gap-3 max-w-2xl mx-auto">
            <p className="text-sm text-white font-medium tabular-nums">
              {selectedIds.size} selected
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={exitBatchMode}
                className="text-[12.5px] font-medium text-white hover:text-white transition-colors touch-manipulation"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  const ids = Array.from(selectedIds);
                  for (const id of ids) {
                    await updateStudent(id, { risk_level: 'High' });
                  }
                  toast({
                    title: 'Students flagged',
                    description: `${ids.length} student${ids.length !== 1 ? 's' : ''} flagged as high risk.`,
                  });
                  exitBatchMode();
                }}
                className="text-[12.5px] font-medium text-amber-400 hover:text-amber-300 transition-colors touch-manipulation"
              >
                Flag as at risk →
              </button>
            </div>
          </div>
        </motion.div>
      )}

      <AddStudentDialog open={addStudentOpen} onOpenChange={setAddStudentOpen} />
      <StudentDetailSheet
        student={selectedStudent}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        onEdit={handleEditStudent}
        onWithdraw={handleWithdrawStudent}
      />
      <EditStudentSheet student={selectedStudent} open={editOpen} onOpenChange={setEditOpen} />
      <WithdrawStudentDialog
        student={selectedStudent}
        open={withdrawOpen}
        onOpenChange={setWithdrawOpen}
        onWithdrawn={() => {
          setSelectedStudent(null);
          setWithdrawOpen(false);
        }}
      />
    </PageFrame>
  );
}
