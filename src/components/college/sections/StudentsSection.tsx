import { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AddStudentDialog } from '@/components/college/dialogs/AddStudentDialog';
import { StudentDetailSheet } from '@/components/college/sheets/StudentDetailSheet';
import { EditStudentSheet } from '@/components/college/sheets/EditStudentSheet';
import { WithdrawStudentDialog } from '@/components/college/dialogs/WithdrawStudentDialog';
import { SwipeableCard } from '@/components/college/ui/SwipeableCard';
import { PullToRefresh } from '@/components/college/ui/PullToRefresh';
import { ProgressSparkline } from '@/components/college/ui/ProgressSparkline';
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
    setSelectedStudent(student);
    setDetailOpen(true);
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

  const getSparklineData = (student: CollegeStudent): number[] => {
    const base = student.progress_percent ?? 0;
    const seed = student.id.charCodeAt(0) + student.id.charCodeAt(1);
    return [
      Math.max(0, base - 15 - (seed % 10)),
      Math.max(0, base - 10 - (seed % 5)),
      Math.max(0, base - 8 + (seed % 7)),
      Math.max(0, base - 4),
      base,
    ];
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
              className="h-10 px-3 bg-[hsl(0_0%_12%)] border border-white/[0.08] rounded-full text-[13px] text-white focus:outline-none focus:border-elec-yellow/60 touch-manipulation"
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
                  const isAtRisk = student.risk_level === 'High' || student.risk_level === 'Medium';
                  const isSelected = selectedIds.has(student.id);

                  return (
                    <SwipeableCard
                      key={student.id}
                      onTap={() => handleSelectStudent(student)}
                      onLongPress={() => handleLongPress(student.id)}
                      selected={isSelected}
                      rightActions={[
                        {
                          label: 'Call',
                          onClick: () => {
                            if (student.phone) window.location.href = `tel:${student.phone}`;
                          },
                          className: 'bg-emerald-500/90 text-white',
                        },
                        {
                          label: 'Email',
                          onClick: () => {
                            window.location.href = `mailto:${student.email}`;
                          },
                          className: 'bg-blue-500/90 text-white',
                        },
                      ]}
                      leftActions={
                        isAtRisk
                          ? []
                          : [
                              {
                                label: 'Flag',
                                onClick: () => handleEditStudent(student),
                                className: 'bg-amber-500/90 text-white',
                              },
                            ]
                      }
                    >
                      <button
                        onClick={() => handleSelectStudent(student)}
                        className={cn(
                          'group w-full flex items-start gap-4 px-5 sm:px-6 py-5 text-left touch-manipulation transition-colors',
                          isSelected ? 'bg-elec-yellow/10' : 'hover:bg-[hsl(0_0%_15%)]'
                        )}
                      >
                        {batchMode ? (
                          <div
                            className={cn(
                              'h-10 w-10 shrink-0 rounded-full flex items-center justify-center border-2 transition-colors',
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
                              'h-10 w-10 shrink-0 ring-1',
                              student.status === 'Active'
                                ? isAtRisk
                                  ? 'ring-amber-500/40'
                                  : 'ring-white/[0.08]'
                                : 'ring-white/[0.08]'
                            )}
                          >
                            <AvatarImage src={student.photo_url ?? undefined} />
                            <AvatarFallback className="bg-elec-yellow/10 text-elec-yellow text-xs font-semibold">
                              {getInitials(student.name)}
                            </AvatarFallback>
                          </Avatar>
                        )}

                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline justify-between gap-2">
                            <div className="min-w-0">
                              <div className="text-[15px] font-medium text-white truncate">
                                {student.name}
                              </div>
                              <div className="mt-0.5 text-[11.5px] text-white/50 truncate tabular-nums">
                                {student.uln ? `ULN · ${student.uln}` : getCohortName(student.cohort_id)}
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                              {isAtRisk && (
                                <Pill tone={student.risk_level === 'High' ? 'red' : 'amber'}>
                                  {student.risk_level}
                                </Pill>
                              )}
                              <Pill
                                tone={
                                  student.status === 'Active'
                                    ? 'green'
                                    : student.status === 'Withdrawn'
                                      ? 'red'
                                      : 'yellow'
                                }
                              >
                                {student.status}
                              </Pill>
                            </div>
                          </div>

                          {/* Progress */}
                          <div className="mt-3 flex items-center gap-3">
                            <div className="flex-1 h-1 bg-white/[0.06] rounded-full overflow-hidden">
                              <div
                                className="h-full bg-elec-yellow/80 rounded-full transition-all"
                                style={{ width: `${progressPercent}%` }}
                              />
                            </div>
                            <ProgressSparkline
                              data={getSparklineData(student)}
                              width={44}
                              height={14}
                            />
                            <span className="text-[11.5px] font-medium text-white tabular-nums shrink-0">
                              {progressPercent}%
                            </span>
                          </div>

                          <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-white/50">
                            <span
                              className={cn(
                                'tabular-nums',
                                attendanceRate < 80 && 'text-red-400',
                                attendanceRate >= 80 && attendanceRate < 90 && 'text-amber-400',
                                attendanceRate >= 90 && 'text-emerald-400'
                              )}
                            >
                              {attendanceRate}% attendance
                            </span>
                            <span>Cohort · {getCohortName(student.cohort_id)}</span>
                            {student.expected_end_date && (
                              <span className="tabular-nums">
                                Due {formatUKDateShort(student.expected_end_date)}
                              </span>
                            )}
                          </div>
                        </div>
                      </button>
                    </SwipeableCard>
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
          className="fixed bottom-0 inset-x-0 z-50 p-4 bg-background/95 backdrop-blur-sm border-t border-white/[0.06]"
        >
          <div className="flex items-center justify-between gap-3 max-w-2xl mx-auto">
            <p className="text-sm text-white font-medium tabular-nums">
              {selectedIds.size} selected
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={exitBatchMode}
                className="text-[12.5px] font-medium text-white/70 hover:text-white transition-colors touch-manipulation"
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
