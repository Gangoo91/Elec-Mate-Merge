/**
 * Student360Section — Comprehensive single-page view of everything about a student.
 * Editorial redesign: typography-led, no icons.
 */

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import {
  PageFrame,
  PageHero,
  StatStrip,
  SectionHeader,
  HubGrid,
  HubCard,
  ListCard,
  ListRow,
  Pill,
  LoadingState,
  EmptyState,
  itemVariants,
  containerVariants,
  type Tone,
} from '@/components/college/primitives';

interface Student360SectionProps {
  studentId: string;
  onNavigate: (section: CollegeSection) => void;
  onBack: () => void;
}

export function Student360Section({ studentId, onNavigate, onBack }: Student360SectionProps) {
  const { students, courses, cohorts, attendance, grades, ilps, epaRecords, isLoading } =
    useCollegeSupabase();

  const student = useMemo(() => students.find((s) => s.id === studentId), [students, studentId]);

  const studentAttendance = useMemo(
    () =>
      attendance
        .filter((a) => a.student_id === studentId)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [attendance, studentId]
  );

  const studentGrades = useMemo(
    () =>
      grades
        .filter((g) => g.student_id === studentId)
        .sort((a, b) => {
          const dateA = a.assessed_at || a.created_at || '';
          const dateB = b.assessed_at || b.created_at || '';
          return new Date(dateB).getTime() - new Date(dateA).getTime();
        }),
    [grades, studentId]
  );

  const studentILPs = useMemo(
    () => ilps.filter((i) => i.student_id === studentId),
    [ilps, studentId]
  );

  const studentEPA = useMemo(
    () => epaRecords.find((e) => e.student_id === studentId),
    [epaRecords, studentId]
  );

  const course = useMemo(
    () => (student?.course_id ? courses.find((c) => c.id === student.course_id) : null),
    [courses, student]
  );
  const cohort = useMemo(
    () => (student?.cohort_id ? cohorts.find((c) => c.id === student.cohort_id) : null),
    [cohorts, student]
  );

  const attendanceRate = useMemo(() => {
    if (studentAttendance.length === 0) return null;
    const present = studentAttendance.filter(
      (a) => a.status === 'Present' || a.status === 'Late'
    ).length;
    return Math.round((present / studentAttendance.length) * 100);
  }, [studentAttendance]);

  const latestGrade = studentGrades.length > 0 ? studentGrades[0] : null;

  const activeILP = useMemo(
    () =>
      studentILPs.find((i) => i.status === 'Active' || i.status === 'active') || studentILPs[0],
    [studentILPs]
  );

  const ilpReviewStatus = useMemo(() => {
    if (!activeILP?.review_date) return 'No review scheduled';
    const reviewDate = new Date(activeILP.review_date);
    const today = new Date();
    if (reviewDate < today) return 'Overdue';
    const diffDays = Math.ceil((reviewDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return `Review in ${diffDays} day${diffDays !== 1 ? 's' : ''}`;
  }, [activeILP]);

  const riskTone = useMemo<Tone>(() => {
    const level = student?.risk_level?.toLowerCase();
    if (level === 'high') return 'red';
    if (level === 'medium' || level === 'at-risk' || level === 'at risk') return 'amber';
    return 'green';
  }, [student?.risk_level]);

  const statusTone = useMemo<Tone>(() => {
    const status = student?.status?.toLowerCase();
    if (status === 'withdrawn') return 'red';
    if (status === 'at risk' || status === 'at-risk') return 'amber';
    return 'green';
  }, [student?.status]);

  const attendanceColour = useMemo(() => {
    if (attendanceRate === null) return 'text-white';
    if (attendanceRate >= 90) return 'text-emerald-400';
    if (attendanceRate >= 80) return 'text-amber-400';
    return 'text-red-400';
  }, [attendanceRate]);

  const gradeTone = (grade?: string | null): Tone => {
    const g = grade?.toLowerCase();
    if (g === 'distinction') return 'green';
    if (g === 'merit') return 'blue';
    if (g === 'pass' || g === 'competent') return 'yellow';
    if (g === 'fail' || g === 'refer') return 'red';
    return 'yellow';
  };

  const attendanceStatusTone = (s: string | null): Tone =>
    s === 'Present' ? 'green' : s === 'Absent' ? 'red' : s === 'Late' ? 'amber' : 'blue';

  const epaStages = ['Not Started', 'In Progress', 'Pre-Gateway', 'Gateway Ready', 'Complete'];
  const currentEPAIndex = studentEPA?.status ? epaStages.indexOf(studentEPA.status) : 0;

  if (isLoading) return <LoadingState />;

  if (!student) {
    return (
      <PageFrame>
        <EmptyState
          title="Student not found"
          description="This student record may have been removed or you may not have access."
          action="← Back"
          onAction={onBack}
        />
      </PageFrame>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-7xl space-y-6 sm:space-y-10 pb-12"
    >
      {/* Back */}
      <motion.div variants={itemVariants}>
        <button
          onClick={onBack}
          className="text-[12.5px] font-medium text-white/70 hover:text-white transition-colors touch-manipulation"
        >
          ← Back
        </button>
      </motion.div>

      {/* HERO */}
      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow={`Student · ${student.status || 'Active'}`}
          title={student.name}
          description={`${course?.name || 'Unassigned course'} · ${cohort?.name || 'Unassigned cohort'}`}
          tone="blue"
          actions={
            <div className="flex items-center gap-2">
              <Pill tone={riskTone}>
                {riskTone === 'green' ? 'On Track' : riskTone === 'amber' ? 'At Risk' : 'High Risk'}
              </Pill>
              <Pill tone={statusTone}>{student.status || 'Active'}</Pill>
            </div>
          }
        />
      </motion.div>

      {/* IDENTITY CARD */}
      <motion.div variants={itemVariants}>
        <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4">
            <div>
              <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
                Email
              </div>
              <div className="mt-1 text-[13px] text-white truncate">{student.email || '—'}</div>
            </div>
            <div>
              <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
                ULN
              </div>
              <div className="mt-1 text-[13px] text-white tabular-nums">{student.uln || '—'}</div>
            </div>
            <div>
              <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
                Course
              </div>
              <div className="mt-1 text-[13px] text-white truncate">{course?.name || '—'}</div>
            </div>
            <div>
              <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
                Cohort
              </div>
              <div className="mt-1 text-[13px] text-white truncate">{cohort?.name || '—'}</div>
            </div>
          </div>
          {student.progress_percent !== null && student.progress_percent !== undefined && (
            <div className="mt-5">
              <div className="flex items-baseline justify-between text-[11.5px]">
                <span className="text-white/50 uppercase tracking-[0.12em]">
                  Overall Progress
                </span>
                <span className="font-medium text-white tabular-nums">
                  {student.progress_percent}%
                </span>
              </div>
              <div className="mt-1.5 h-1 bg-white/[0.06] rounded-full overflow-hidden">
                <div
                  className="h-full bg-elec-yellow/80 rounded-full transition-all"
                  style={{ width: `${Math.min(student.progress_percent, 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* KPI STRIP */}
      <motion.div variants={itemVariants}>
        <StatStrip
          columns={4}
          stats={[
            {
              value: attendanceRate !== null ? `${attendanceRate}%` : '—',
              label: 'Attendance',
              sub: `${studentAttendance.length} sessions`,
              tone:
                attendanceRate === null
                  ? undefined
                  : attendanceRate >= 90
                    ? 'green'
                    : attendanceRate >= 80
                      ? 'amber'
                      : 'red',
            },
            {
              value: latestGrade?.grade || 'None',
              label: 'Latest Grade',
              sub: latestGrade?.unit_name || 'No grades',
              tone: latestGrade ? gradeTone(latestGrade.grade) : undefined,
            },
            {
              value: activeILP ? (ilpReviewStatus === 'Overdue' ? 'Overdue' : 'Active') : 'None',
              label: 'ILP',
              sub: activeILP ? ilpReviewStatus : 'Not created',
              tone:
                ilpReviewStatus === 'Overdue' ? 'red' : activeILP ? 'green' : undefined,
            },
            {
              value: studentEPA?.status || 'N/A',
              label: 'EPA',
              sub: 'End point assessment',
              tone: studentEPA?.status === 'Complete' ? 'green' : 'purple',
            },
          ]}
        />
      </motion.div>

      {/* ATTENDANCE */}
      <motion.section variants={itemVariants} className="space-y-5">
        <SectionHeader
          eyebrow="Attendance"
          title="Session history"
          action="View full record"
          onAction={() => onNavigate('attendance')}
        />
        {studentAttendance.length === 0 ? (
          <EmptyState title="No attendance records" />
        ) : (
          <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6">
            <div className="flex items-baseline gap-4">
              <span className={cn('text-5xl sm:text-6xl font-semibold tabular-nums leading-none', attendanceColour)}>
                {attendanceRate}%
              </span>
              <span className="text-[12px] text-white/50">
                from {studentAttendance.length} session{studentAttendance.length !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="mt-5 flex items-center gap-1.5 flex-wrap">
              {studentAttendance.slice(0, 20).map((a, idx) => {
                const dotColour =
                  a.status === 'Present'
                    ? 'bg-emerald-400'
                    : a.status === 'Absent'
                      ? 'bg-red-400'
                      : a.status === 'Late'
                        ? 'bg-amber-400'
                        : 'bg-blue-400';
                return (
                  <div
                    key={a.id || idx}
                    className={cn('w-2.5 h-2.5 rounded-full', dotColour)}
                    title={`${a.date} - ${a.status}`}
                  />
                );
              })}
              {studentAttendance.length > 20 && (
                <span className="text-[11px] text-white/40 ml-1 tabular-nums">
                  +{studentAttendance.length - 20}
                </span>
              )}
            </div>
            <div className="mt-4 flex flex-wrap gap-4 text-[11px] text-white/50">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Present
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" /> Absent
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Late
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Authorised
              </span>
            </div>
          </div>
        )}
      </motion.section>

      {/* GRADES */}
      <motion.section variants={itemVariants} className="space-y-5">
        <SectionHeader
          eyebrow="Grades"
          title="Assessment history"
          action="Record grade"
          onAction={() => onNavigate('grading')}
        />
        {studentGrades.length === 0 ? (
          <EmptyState title="No grades recorded" />
        ) : (
          <ListCard>
            {studentGrades.slice(0, 6).map((g) => (
              <ListRow
                key={g.id}
                title={g.unit_name || 'Unnamed Unit'}
                subtitle={
                  g.assessed_at
                    ? new Date(g.assessed_at).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })
                    : 'Date unknown'
                }
                trailing={<Pill tone={gradeTone(g.grade)}>{g.grade || 'Pending'}</Pill>}
              />
            ))}
            {studentGrades.length > 6 && (
              <div className="px-5 sm:px-6 py-3 text-[11.5px] text-white/40 text-center">
                +{studentGrades.length - 6} more grade{studentGrades.length - 6 !== 1 ? 's' : ''}
              </div>
            )}
          </ListCard>
        )}
      </motion.section>

      {/* ILP */}
      <motion.section variants={itemVariants} className="space-y-5">
        <SectionHeader
          eyebrow="Learning Plan"
          title="Individual learning plan"
          action={activeILP ? 'Open ILP' : 'Create ILP'}
          onAction={() => onNavigate('ilpmanagement')}
        />
        {!activeILP ? (
          <EmptyState title="No learning plan recorded" />
        ) : (
          <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
                {activeILP.targets?.length ?? 0} target
                {(activeILP.targets?.length ?? 0) !== 1 ? 's' : ''}
              </div>
              <Pill tone={ilpReviewStatus === 'Overdue' ? 'red' : 'green'}>
                {ilpReviewStatus}
              </Pill>
            </div>

            {activeILP.targets && activeILP.targets.length > 0 ? (
              <div className="divide-y divide-white/[0.06]">
                {activeILP.targets.map((target, idx) => {
                  const tTone: Tone =
                    target.status === 'Achieved'
                      ? 'green'
                      : target.status === 'In Progress'
                        ? 'blue'
                        : target.status === 'Overdue'
                          ? 'red'
                          : 'yellow';
                  return (
                    <div key={idx} className="flex items-center gap-3 py-3">
                      <span
                        aria-hidden
                        className={cn(
                          'h-1.5 w-1.5 rounded-full shrink-0',
                          target.status === 'Achieved'
                            ? 'bg-emerald-400'
                            : target.status === 'In Progress'
                              ? 'bg-blue-400'
                              : target.status === 'Overdue'
                                ? 'bg-red-400'
                                : 'bg-white/40'
                        )}
                      />
                      <p className="text-[13px] text-white flex-1 leading-relaxed">
                        {target.description}
                      </p>
                      <Pill tone={tTone}>{target.status}</Pill>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-[12.5px] text-white/50">No targets set</p>
            )}

            {activeILP.support_needs && (
              <div className="pt-3 border-t border-white/[0.06]">
                <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
                  Support Needs
                </div>
                <p className="mt-1 text-[13px] text-white/70">{activeILP.support_needs}</p>
              </div>
            )}

            {activeILP.review_date && (
              <div className="pt-3 border-t border-white/[0.06] text-[11.5px] text-white/50 tabular-nums">
                Next review ·{' '}
                {new Date(activeILP.review_date).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </div>
            )}
          </div>
        )}
      </motion.section>

      {/* EPA */}
      <motion.section variants={itemVariants} className="space-y-5">
        <SectionHeader
          eyebrow="End Point Assessment"
          title="EPA progress"
          action={studentEPA ? 'Open record' : 'Add record'}
          onAction={() => onNavigate('epatracking')}
        />
        {!studentEPA ? (
          <EmptyState title="No EPA record" />
        ) : (
          <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
                Stage
              </div>
              <Pill tone="purple">{studentEPA.status}</Pill>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                {epaStages.map((stage, idx) => {
                  const isComplete = idx <= currentEPAIndex;
                  return (
                    <span
                      key={stage}
                      aria-hidden
                      className={cn(
                        'flex-1 h-1 rounded-full transition-all',
                        isComplete ? 'bg-purple-400/80' : 'bg-white/[0.08]'
                      )}
                    />
                  );
                })}
              </div>
              <div className="mt-2 flex items-center justify-between text-[10px] uppercase tracking-[0.12em] text-white/40">
                {epaStages.map((stage, idx) => (
                  <span
                    key={stage}
                    className={cn(
                      'flex-1 text-center truncate px-0.5',
                      idx === currentEPAIndex && 'text-purple-400 font-semibold'
                    )}
                  >
                    {stage}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.06] grid grid-cols-1 sm:grid-cols-3 gap-4 text-[12px]">
              {studentEPA.gateway_date && (
                <div>
                  <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
                    Gateway
                  </div>
                  <p className="mt-1 text-white font-medium tabular-nums">
                    {new Date(studentEPA.gateway_date).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              )}
              {studentEPA.epa_date && (
                <div>
                  <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
                    EPA Date
                  </div>
                  <p className="mt-1 text-white font-medium tabular-nums">
                    {new Date(studentEPA.epa_date).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              )}
              {studentEPA.result && (
                <div>
                  <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
                    Result
                  </div>
                  <p className="mt-1 text-white font-medium">{studentEPA.result}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </motion.section>

      {/* QUICK ACTIONS */}
      <motion.section variants={itemVariants} className="space-y-5">
        <SectionHeader eyebrow="Quick Actions" title="Act on this student" />
        <HubGrid columns={4}>
          <HubCard
            size="sm"
            eyebrow="Grade"
            title="Record grade"
            description="Log an assessment result."
            tone="amber"
            onClick={() => onNavigate('grading')}
            cta="Open"
          />
          <HubCard
            size="sm"
            eyebrow="Attendance"
            title="Mark attendance"
            description="Update register entries."
            tone="blue"
            onClick={() => onNavigate('attendance')}
            cta="Open"
          />
          <HubCard
            size="sm"
            eyebrow="ILP"
            title="Update plan"
            description="Targets & support."
            tone="emerald"
            onClick={() => onNavigate('ilpmanagement')}
            cta="Open"
          />
          <HubCard
            size="sm"
            eyebrow="EPA"
            title="EPA gateway"
            description="Check readiness."
            tone="purple"
            onClick={() => onNavigate('epatracking')}
            cta="Open"
          />
        </HubGrid>
      </motion.section>
    </motion.div>
  );
}
