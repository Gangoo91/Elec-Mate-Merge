import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AttendanceHeatmap } from '@/components/college/ui/AttendanceHeatmap';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import type { CollegeStudent } from '@/contexts/CollegeSupabaseContext';
import {
  getInitials,
  formatUKDateShort,
  computeAttendanceRate,
} from '@/utils/collegeHelpers';
import { cn } from '@/lib/utils';
import {
  ListCard,
  ListRow,
  Pill,
  EmptyState,
  FormCard,
  Eyebrow,
  PrimaryButton,
  SecondaryButton,
  DestructiveButton,
  type Tone,
} from '@/components/college/primitives';

interface StudentDetailSheetProps {
  student: CollegeStudent | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit?: (student: CollegeStudent) => void;
  onWithdraw?: (student: CollegeStudent) => void;
}

const tabVariants = {
  enter: { opacity: 0, x: 20 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

export function StudentDetailSheet({
  student,
  open,
  onOpenChange,
  onEdit,
  onWithdraw,
}: StudentDetailSheetProps) {
  const { attendance, cohorts, ilps } = useCollegeSupabase();
  const [activeTab, setActiveTab] = useState('overview');

  const studentAttendance = useMemo(() => {
    if (!student) return [];
    return attendance
      .filter((a) => a.student_id === student.id)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [student, attendance]);

  const attendanceRate = useMemo(
    () => computeAttendanceRate(studentAttendance),
    [studentAttendance]
  );

  const cohortName = useMemo(() => {
    if (!student?.cohort_id) return 'Unassigned';
    return cohorts.find((c) => c.id === student.cohort_id)?.name || 'Unknown';
  }, [student, cohorts]);

  const studentILP = useMemo(() => {
    if (!student) return null;
    return ilps.find((ilp) => ilp.student_id === student.id && ilp.status === 'Active') || null;
  }, [student, ilps]);

  if (!student) return null;

  const progressPercent = student.progress_percent ?? 0;
  const isAtRisk = student.risk_level === 'High' || student.risk_level === 'Medium';

  const statusTone: Tone =
    student.status === 'Active'
      ? isAtRisk
        ? 'amber'
        : 'green'
      : student.status === 'Withdrawn'
        ? 'red'
        : 'yellow';

  const attendanceTone = (s: string | null): Tone =>
    s === 'Present' ? 'green' : s === 'Absent' ? 'red' : s === 'Late' ? 'amber' : 'blue';

  const targetTone = (s: string): Tone =>
    s === 'Achieved'
      ? 'green'
      : s === 'Overdue'
        ? 'red'
        : s === 'In Progress'
          ? 'blue'
          : 'yellow';

  const attendancePctTone = attendanceRate >= 90 ? 'text-emerald-400' : attendanceRate >= 80 ? 'text-amber-400' : 'text-red-400';
  const progressPctTone = progressPercent >= 70 ? 'text-emerald-400' : progressPercent >= 50 ? 'text-amber-400' : 'text-red-400';

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[85vh] p-0 overflow-hidden bg-[hsl(0_0%_8%)]"
      >
        <div className="flex flex-col h-full bg-[hsl(0_0%_8%)]">
          <div className="flex justify-center pt-2.5 pb-1 flex-shrink-0">
            <div className="h-1 w-10 rounded-full bg-white/20" />
          </div>

          <SheetHeader className="flex-shrink-0 border-b border-white/[0.08] px-5 pb-5">
            <div className="flex items-start gap-4">
              <Avatar className="h-16 w-16 shrink-0 ring-1 ring-white/[0.08]">
                <AvatarImage src={student.photo_url ?? undefined} />
                <AvatarFallback className="bg-elec-yellow/10 text-elec-yellow text-lg font-semibold">
                  {getInitials(student.name)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <Eyebrow>Student</Eyebrow>
                <SheetTitle className="mt-1 text-xl text-left text-white">{student.name}</SheetTitle>
                {student.uln && (
                  <p className="mt-0.5 text-[11.5px] text-white tabular-nums">
                    ULN · {student.uln}
                  </p>
                )}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  <Pill tone={statusTone}>{student.status}</Pill>
                  {isAtRisk && (
                    <Pill tone={student.risk_level === 'High' ? 'red' : 'amber'}>
                      {student.risk_level} risk
                    </Pill>
                  )}
                  <Pill tone="yellow">{cohortName}</Pill>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-5">
              {student.phone && (
                <a
                  href={`tel:${student.phone}`}
                  className="text-[12.5px] font-medium text-white hover:text-elec-yellow transition-colors touch-manipulation"
                >
                  Call
                </a>
              )}
              <a
                href={`mailto:${student.email}`}
                className="text-[12.5px] font-medium text-white hover:text-elec-yellow transition-colors touch-manipulation"
              >
                Email
              </a>
              {isAtRisk && (
                <span className="text-[12.5px] font-medium text-amber-400">
                  Flagged
                </span>
              )}
            </div>
          </SheetHeader>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="flex-1 flex flex-col overflow-hidden"
          >
            <TabsList className="w-full justify-start gap-0 h-auto p-0 bg-transparent rounded-none border-b border-white/[0.08] flex-shrink-0">
              {['overview', 'attendance', 'ilp', 'notes'].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="flex-1 h-11 touch-manipulation text-[12.5px] font-medium text-white data-[state=active]:text-elec-yellow data-[state=active]:bg-transparent data-[state=active]:shadow-[inset_0_-2px_0_0_hsl(var(--elec-yellow))] rounded-none capitalize"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="flex-1 overflow-y-auto overscroll-contain">
              <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                  <motion.div
                    key="overview"
                    variants={tabVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.2 }}
                    className="p-5 space-y-5"
                  >
                    <FormCard eyebrow="Contact">
                      <div className="space-y-2 text-[13px]">
                        <div className="flex items-center justify-between">
                          <span className="text-white">Email</span>
                          <a
                            href={`mailto:${student.email}`}
                            className="text-white hover:text-elec-yellow truncate ml-3 max-w-[60%]"
                          >
                            {student.email}
                          </a>
                        </div>
                        {student.phone && (
                          <div className="flex items-center justify-between">
                            <span className="text-white">Phone</span>
                            <a
                              href={`tel:${student.phone}`}
                              className="text-white hover:text-elec-yellow tabular-nums"
                            >
                              {student.phone}
                            </a>
                          </div>
                        )}
                      </div>
                    </FormCard>

                    <FormCard eyebrow="Enrolment">
                      <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-[13px]">
                        <div>
                          <Eyebrow>Cohort</Eyebrow>
                          <div className="mt-1 text-white font-medium">{cohortName}</div>
                        </div>
                        <div>
                          <Eyebrow>Status</Eyebrow>
                          <div className="mt-1 text-white font-medium">{student.status}</div>
                        </div>
                        <div>
                          <Eyebrow>Start</Eyebrow>
                          <div className="mt-1 text-white font-medium tabular-nums">
                            {formatUKDateShort(student.start_date)}
                          </div>
                        </div>
                        <div>
                          <Eyebrow>Expected End</Eyebrow>
                          <div className="mt-1 text-white font-medium tabular-nums">
                            {formatUKDateShort(student.expected_end_date)}
                          </div>
                        </div>
                      </div>
                    </FormCard>

                    <FormCard eyebrow="Progress">
                      <div className="flex items-baseline justify-between">
                        <span className="text-[13px] text-white">Overall</span>
                        <span className={cn('text-3xl font-semibold tabular-nums', progressPctTone)}>
                          {progressPercent}%
                        </span>
                      </div>
                      <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-elec-yellow/80 rounded-full transition-all"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                      <div className="pt-4 border-t border-white/[0.08] grid grid-cols-2 gap-4 text-[12px]">
                        <div>
                          <Eyebrow>Attendance</Eyebrow>
                          <div className={cn('mt-1 text-2xl font-semibold tabular-nums leading-none', attendancePctTone)}>
                            {attendanceRate}%
                          </div>
                        </div>
                        <div>
                          <Eyebrow>Complete</Eyebrow>
                          <div className={cn('mt-1 text-2xl font-semibold tabular-nums leading-none', progressPctTone)}>
                            {progressPercent}%
                          </div>
                        </div>
                      </div>
                    </FormCard>
                  </motion.div>
                )}

                {activeTab === 'attendance' && (
                  <motion.div
                    key="attendance"
                    variants={tabVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.2 }}
                    className="p-5 space-y-5"
                  >
                    <FormCard>
                      <div className="flex items-baseline justify-between">
                        <div>
                          <Eyebrow>Attendance Rate</Eyebrow>
                          <div className={cn('mt-1 text-4xl font-semibold tabular-nums leading-none', attendancePctTone)}>
                            {attendanceRate}%
                          </div>
                        </div>
                        <div className="text-right text-[11px] text-white tabular-nums">
                          <div>{studentAttendance.length} sessions</div>
                          <div>
                            {studentAttendance.filter((a) => a.status === 'Present').length}{' '}
                            present
                          </div>
                        </div>
                      </div>
                      <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
                        <div
                          className={cn(
                            'h-full rounded-full transition-all',
                            attendanceRate >= 90
                              ? 'bg-emerald-400/80'
                              : attendanceRate >= 80
                                ? 'bg-amber-400/80'
                                : 'bg-red-400/80'
                          )}
                          style={{ width: `${attendanceRate}%` }}
                        />
                      </div>
                    </FormCard>

                    <FormCard eyebrow="Attendance Pattern">
                      <AttendanceHeatmap
                        records={studentAttendance.map((a) => ({
                          date: a.date,
                          status: a.status,
                        }))}
                        weeks={8}
                      />
                    </FormCard>

                    <div>
                      <Eyebrow className="mb-3">Recent Records</Eyebrow>
                      {studentAttendance.length === 0 ? (
                        <EmptyState title="No attendance records yet" />
                      ) : (
                        <ListCard>
                          {studentAttendance.slice(0, 10).map((record) => (
                            <ListRow
                              key={record.id}
                              accent={attendanceTone(record.status)}
                              title={new Date(record.date).toLocaleDateString('en-GB', {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'short',
                              })}
                              subtitle={record.notes || undefined}
                              trailing={
                                <Pill tone={attendanceTone(record.status)}>
                                  {record.status}
                                </Pill>
                              }
                            />
                          ))}
                        </ListCard>
                      )}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'ilp' && (
                  <motion.div
                    key="ilp"
                    variants={tabVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.2 }}
                    className="p-5 space-y-5"
                  >
                    {studentILP ? (
                      <>
                        <FormCard eyebrow="Individual Learning Plan">
                          <div className="flex items-center justify-end -mt-1">
                            <Pill tone={studentILP.status === 'Active' ? 'green' : 'yellow'}>
                              {studentILP.status}
                            </Pill>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-[12.5px]">
                            <div>
                              <Eyebrow>Next Review</Eyebrow>
                              <div className="mt-1 text-white font-medium tabular-nums">
                                {formatUKDateShort(studentILP.review_date)}
                              </div>
                            </div>
                            <div>
                              <Eyebrow>Last Reviewed</Eyebrow>
                              <div className="mt-1 text-white font-medium tabular-nums">
                                {formatUKDateShort(studentILP.last_reviewed)}
                              </div>
                            </div>
                          </div>
                          {studentILP.support_needs && (
                            <div className="pt-4 border-t border-white/[0.08]">
                              <Eyebrow>Support Needs</Eyebrow>
                              <p className="mt-1.5 text-[13px] text-white leading-relaxed">
                                {studentILP.support_needs}
                              </p>
                            </div>
                          )}
                        </FormCard>

                        <div>
                          <Eyebrow className="mb-3">Targets</Eyebrow>
                          {!studentILP.targets || studentILP.targets.length === 0 ? (
                            <EmptyState title="No targets set yet" />
                          ) : (
                            <ListCard>
                              {studentILP.targets.map((target, i) => (
                                <ListRow
                                  key={i}
                                  accent={targetTone(target.status)}
                                  title={target.description}
                                  subtitle={`Due ${formatUKDateShort(target.target_date)}`}
                                  trailing={
                                    <Pill tone={targetTone(target.status)}>
                                      {target.status}
                                    </Pill>
                                  }
                                />
                              ))}
                            </ListCard>
                          )}
                        </div>
                      </>
                    ) : (
                      <EmptyState
                        title="No active ILP"
                        description="This student does not have an active Individual Learning Plan."
                      />
                    )}
                  </motion.div>
                )}

                {activeTab === 'notes' && (
                  <motion.div
                    key="notes"
                    variants={tabVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.2 }}
                    className="p-5"
                  >
                    <EmptyState
                      title="Notes coming soon"
                      description="Student notes and communication log will appear here."
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Tabs>

          <SheetFooter className="flex-shrink-0 border-t border-white/[0.08] p-5 flex-row items-center justify-end gap-4">
            <SecondaryButton onClick={() => onOpenChange(false)}>
              Close
            </SecondaryButton>
            {student.status === 'Active' && (
              <DestructiveButton onClick={() => onWithdraw?.(student)}>
                Withdraw
              </DestructiveButton>
            )}
            <PrimaryButton onClick={() => onEdit?.(student)}>
              Edit →
            </PrimaryButton>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
