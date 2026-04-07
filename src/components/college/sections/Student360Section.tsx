/**
 * Student360Section — Comprehensive single-page view of everything about a student.
 * Shows header, KPI strip, attendance, grades, ILP, EPA, and quick actions.
 */

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  ClipboardList,
  Target,
  Award,
  ChevronRight,
  Loader2,
  User,
  PenLine,
  CheckCircle2,
  FileEdit,
  ShieldCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import type {
  CollegeAttendance,
  CollegeGrade,
  CollegeILP,
  CollegeEPA,
} from '@/contexts/CollegeSupabaseContext';

interface Student360SectionProps {
  studentId: string;
  onNavigate: (section: CollegeSection) => void;
  onBack: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
};

export function Student360Section({ studentId, onNavigate, onBack }: Student360SectionProps) {
  const {
    students,
    courses,
    cohorts,
    attendance,
    grades,
    ilps,
    epaRecords,
    isLoading,
  } = useCollegeSupabase();

  // Find student
  const student = useMemo(
    () => students.find((s) => s.id === studentId),
    [students, studentId]
  );

  // Filter data for this student
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

  // Derived values
  const course = useMemo(
    () => (student?.course_id ? courses.find((c) => c.id === student.course_id) : null),
    [courses, student]
  );

  const cohort = useMemo(
    () => (student?.cohort_id ? cohorts.find((c) => c.id === student.cohort_id) : null),
    [cohorts, student]
  );

  // Attendance rate
  const attendanceRate = useMemo(() => {
    if (studentAttendance.length === 0) return null;
    const present = studentAttendance.filter(
      (a) => a.status === 'Present' || a.status === 'Late'
    ).length;
    return Math.round((present / studentAttendance.length) * 100);
  }, [studentAttendance]);

  // Latest grade
  const latestGrade = studentGrades.length > 0 ? studentGrades[0] : null;

  // Active ILP
  const activeILP = useMemo(
    () => studentILPs.find((i) => i.status === 'Active' || i.status === 'active') || studentILPs[0],
    [studentILPs]
  );

  // ILP review status
  const ilpReviewStatus = useMemo(() => {
    if (!activeILP?.review_date) return 'No review scheduled';
    const reviewDate = new Date(activeILP.review_date);
    const today = new Date();
    if (reviewDate < today) return 'Overdue';
    const diffDays = Math.ceil((reviewDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return `Review in ${diffDays} day${diffDays !== 1 ? 's' : ''}`;
  }, [activeILP]);

  // Risk colour
  const riskColour = useMemo(() => {
    const level = student?.risk_level?.toLowerCase();
    if (level === 'high') return { dot: 'bg-red-400', text: 'text-red-400', label: 'High Risk' };
    if (level === 'medium' || level === 'at-risk' || level === 'at risk')
      return { dot: 'bg-amber-400', text: 'text-amber-400', label: 'At Risk' };
    return { dot: 'bg-emerald-400', text: 'text-emerald-400', label: 'On Track' };
  }, [student?.risk_level]);

  // Status badge colour
  const statusBadge = useMemo(() => {
    const status = student?.status?.toLowerCase();
    if (status === 'withdrawn')
      return { bg: 'bg-red-500/10 border-red-500/20', text: 'text-red-400' };
    if (status === 'at risk' || status === 'at-risk')
      return { bg: 'bg-amber-500/10 border-amber-500/20', text: 'text-amber-400' };
    return { bg: 'bg-emerald-500/10 border-emerald-500/20', text: 'text-emerald-400' };
  }, [student?.status]);

  // Attendance colour
  const attendanceColour = useMemo(() => {
    if (attendanceRate === null) return 'text-white';
    if (attendanceRate >= 90) return 'text-emerald-400';
    if (attendanceRate >= 80) return 'text-amber-400';
    return 'text-red-400';
  }, [attendanceRate]);

  // EPA stages
  const epaStages = ['Not Started', 'In Progress', 'Pre-Gateway', 'Gateway Ready', 'Complete'];
  const currentEPAIndex = studentEPA?.status
    ? epaStages.indexOf(studentEPA.status)
    : 0;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
      </div>
    );
  }

  if (!student) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <User className="h-12 w-12 text-white" />
        <p className="text-white text-sm">Student not found</p>
        <button
          onClick={onBack}
          className="h-11 px-4 rounded-lg bg-elec-yellow text-black font-medium text-sm touch-manipulation active:scale-[0.98]"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4 pb-20"
    >
      {/* Back Button */}
      <motion.div variants={itemVariants}>
        <button
          onClick={onBack}
          className="flex items-center gap-2 h-11 px-3 rounded-lg text-white text-sm font-medium touch-manipulation active:scale-[0.98] transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </motion.div>

      {/* 1. Student Header */}
      <motion.div variants={itemVariants}>
        <div className="card-surface overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 opacity-40" />
          <div className="p-4 sm:p-5 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <User className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">{student.name}</h2>
                  <p className="text-xs text-white">{student.email}</p>
                </div>
              </div>
              <span
                className={cn(
                  'px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase border',
                  statusBadge.bg,
                  statusBadge.text
                )}
              >
                {student.status || 'Active'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-white">
              <div>
                <span className="text-white/60 text-[10px] uppercase tracking-wider">Course</span>
                <p className="text-white font-medium truncate">{course?.name || 'Not assigned'}</p>
              </div>
              <div>
                <span className="text-white/60 text-[10px] uppercase tracking-wider">Cohort</span>
                <p className="text-white font-medium truncate">{cohort?.name || 'Not assigned'}</p>
              </div>
              <div>
                <span className="text-white/60 text-[10px] uppercase tracking-wider">ULN</span>
                <p className="text-white font-medium">{student.uln || 'Not set'}</p>
              </div>
              <div>
                <span className="text-white/60 text-[10px] uppercase tracking-wider">Risk</span>
                <p className="flex items-center gap-1.5">
                  <span className={cn('w-2 h-2 rounded-full', riskColour.dot)} />
                  <span className={cn('font-medium', riskColour.text)}>{riskColour.label}</span>
                </p>
              </div>
            </div>

            {student.progress_percent !== null && student.progress_percent !== undefined && (
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-wider">
                  <span className="text-white">Overall Progress</span>
                  <span className="text-white font-bold">{student.progress_percent}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all"
                    style={{ width: `${Math.min(student.progress_percent, 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* 2. KPI Strip */}
      <motion.div variants={itemVariants}>
        <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5 mb-2">
          Key Indicators
        </h2>
        <div className="grid grid-cols-4 gap-2">
          {[
            {
              label: 'Attendance',
              value: attendanceRate !== null ? `${attendanceRate}%` : '--',
              colour: attendanceColour,
            },
            {
              label: 'Grade',
              value: latestGrade?.grade || 'None',
              colour: latestGrade ? 'text-amber-400' : 'text-white',
            },
            {
              label: 'ILP',
              value: ilpReviewStatus === 'Overdue' ? 'Overdue' : activeILP ? 'Active' : 'None',
              colour:
                ilpReviewStatus === 'Overdue'
                  ? 'text-red-400'
                  : activeILP
                    ? 'text-emerald-400'
                    : 'text-white',
            },
            {
              label: 'EPA',
              value: studentEPA?.status || 'N/A',
              colour: studentEPA?.status === 'Complete' ? 'text-emerald-400' : 'text-purple-400',
            },
          ].map((kpi) => (
            <div
              key={kpi.label}
              className="card-surface p-3 flex flex-col items-center text-center"
            >
              <span className={cn('text-sm font-bold truncate w-full', kpi.colour)}>
                {kpi.value}
              </span>
              <span className="text-[10px] text-white uppercase tracking-wider mt-0.5">
                {kpi.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 3. Attendance Section */}
      <motion.div variants={itemVariants}>
        <div className="card-surface overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400 opacity-30" />
          <div className="p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <Calendar className="h-4 w-4 text-blue-400" />
                </div>
                <h3 className="text-xs font-medium text-white uppercase tracking-wider">
                  Attendance
                </h3>
              </div>
              <button
                onClick={() => onNavigate('attendance')}
                className="flex items-center gap-1 h-11 px-2 text-xs text-white font-medium touch-manipulation active:scale-[0.98]"
              >
                View Full Record
                <div className="p-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/20">
                  <ChevronRight className="h-3 w-3 text-elec-yellow" />
                </div>
              </button>
            </div>

            {studentAttendance.length > 0 ? (
              <>
                <div className="flex items-center gap-3">
                  <span className={cn('text-3xl font-bold', attendanceColour)}>
                    {attendanceRate}%
                  </span>
                  <span className="text-xs text-white">
                    from {studentAttendance.length} session{studentAttendance.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {studentAttendance.slice(0, 10).map((a, idx) => {
                    const dotColour =
                      a.status === 'Present'
                        ? 'bg-emerald-400'
                        : a.status === 'Absent'
                          ? 'bg-red-400'
                          : a.status === 'Late'
                            ? 'bg-amber-400'
                            : 'bg-white/30';
                    return (
                      <div
                        key={a.id || idx}
                        className={cn('w-3 h-3 rounded-full', dotColour)}
                        title={`${a.date} - ${a.status}`}
                      />
                    );
                  })}
                  {studentAttendance.length > 10 && (
                    <span className="text-[10px] text-white ml-1">
                      +{studentAttendance.length - 10} more
                    </span>
                  )}
                </div>
                <div className="flex gap-3 text-[10px] text-white">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" /> Present
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-red-400" /> Absent
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-amber-400" /> Late
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-white/30" /> Authorised
                  </span>
                </div>
              </>
            ) : (
              <p className="text-sm text-white py-2">No attendance records</p>
            )}
          </div>
        </div>
      </motion.div>

      {/* 4. Grades Section */}
      <motion.div variants={itemVariants}>
        <div className="card-surface overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 opacity-30" />
          <div className="p-4 sm:p-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <ClipboardList className="h-4 w-4 text-amber-400" />
              </div>
              <h3 className="text-xs font-medium text-white uppercase tracking-wider">Grades</h3>
            </div>

            {studentGrades.length > 0 ? (
              <div className="space-y-2">
                {studentGrades.slice(0, 5).map((g) => (
                  <div
                    key={g.id}
                    className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white font-medium truncate">
                        {g.unit_name || 'Unnamed Unit'}
                      </p>
                      <p className="text-[10px] text-white">
                        {g.assessed_at
                          ? new Date(g.assessed_at).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })
                          : 'Date unknown'}
                      </p>
                    </div>
                    <span
                      className={cn(
                        'px-2.5 py-1 rounded-full text-xs font-semibold',
                        g.grade?.toLowerCase() === 'distinction'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : g.grade?.toLowerCase() === 'merit'
                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                            : g.grade?.toLowerCase() === 'pass'
                              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                              : 'bg-white/5 text-white border border-white/10'
                      )}
                    >
                      {g.grade || 'Pending'}
                    </span>
                  </div>
                ))}
                {studentGrades.length > 5 && (
                  <p className="text-[10px] text-white text-center pt-1">
                    +{studentGrades.length - 5} more grade{studentGrades.length - 5 !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
            ) : (
              <p className="text-sm text-white py-2">No grades recorded</p>
            )}
          </div>
        </div>
      </motion.div>

      {/* 5. ILP Section */}
      <motion.div variants={itemVariants}>
        <div className="card-surface overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-400 opacity-30" />
          <div className="p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <Target className="h-4 w-4 text-emerald-400" />
                </div>
                <h3 className="text-xs font-medium text-white uppercase tracking-wider">
                  Learning Plan
                </h3>
              </div>
              {activeILP && (
                <span
                  className={cn(
                    'px-2 py-0.5 rounded-full text-[10px] font-semibold border',
                    ilpReviewStatus === 'Overdue'
                      ? 'bg-red-500/10 text-red-400 border-red-500/20'
                      : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  )}
                >
                  {ilpReviewStatus}
                </span>
              )}
            </div>

            {activeILP ? (
              <div className="space-y-2">
                {activeILP.targets && activeILP.targets.length > 0 ? (
                  activeILP.targets.map((target, idx) => {
                    const statusColour =
                      target.status === 'Achieved'
                        ? 'text-emerald-400'
                        : target.status === 'In Progress'
                          ? 'text-blue-400'
                          : target.status === 'Overdue'
                            ? 'text-red-400'
                            : 'text-white';
                    return (
                      <div
                        key={idx}
                        className="flex items-start gap-2 py-2 border-b border-white/5 last:border-0"
                      >
                        <CheckCircle2
                          className={cn(
                            'h-4 w-4 mt-0.5 flex-shrink-0',
                            target.status === 'Achieved' ? 'text-emerald-400' : 'text-white'
                          )}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white">{target.description}</p>
                          <p className={cn('text-[10px] font-medium', statusColour)}>
                            {target.status}
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-sm text-white">No targets set</p>
                )}

                {activeILP.support_needs && (
                  <div className="pt-2 border-t border-white/5">
                    <span className="text-[10px] text-white uppercase tracking-wider">
                      Support Needs
                    </span>
                    <p className="text-xs text-white mt-0.5">{activeILP.support_needs}</p>
                  </div>
                )}

                {activeILP.review_date && (
                  <div className="pt-1">
                    <span className="text-[10px] text-white">
                      Next review:{' '}
                      {new Date(activeILP.review_date).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm text-white py-2">No learning plan recorded</p>
            )}
          </div>
        </div>
      </motion.div>

      {/* 6. EPA Section */}
      <motion.div variants={itemVariants}>
        <div className="card-surface overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-purple-500 via-violet-400 to-purple-400 opacity-30" />
          <div className="p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
                  <Award className="h-4 w-4 text-purple-400" />
                </div>
                <h3 className="text-xs font-medium text-white uppercase tracking-wider">
                  End Point Assessment
                </h3>
              </div>
              {studentEPA?.status && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  {studentEPA.status}
                </span>
              )}
            </div>

            {studentEPA ? (
              <div className="space-y-3">
                {/* Stage progress */}
                <div className="flex items-center gap-1">
                  {epaStages.map((stage, idx) => {
                    const isComplete = idx <= currentEPAIndex;
                    const isCurrent = idx === currentEPAIndex;
                    return (
                      <div key={stage} className="flex-1 flex flex-col items-center gap-1">
                        <div
                          className={cn(
                            'w-full h-1.5 rounded-full transition-all',
                            isComplete
                              ? 'bg-purple-400'
                              : 'bg-white/10'
                          )}
                        />
                        <span
                          className={cn(
                            'text-[8px] leading-tight text-center',
                            isCurrent ? 'text-purple-400 font-semibold' : 'text-white'
                          )}
                        >
                          {stage}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                  {studentEPA.gateway_date && (
                    <div>
                      <span className="text-[10px] text-white uppercase tracking-wider">
                        Gateway
                      </span>
                      <p className="text-white font-medium">
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
                      <span className="text-[10px] text-white uppercase tracking-wider">
                        EPA Date
                      </span>
                      <p className="text-white font-medium">
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
                      <span className="text-[10px] text-white uppercase tracking-wider">
                        Result
                      </span>
                      <p className="text-white font-medium">{studentEPA.result}</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-sm text-white py-2">No EPA record</p>
            )}
          </div>
        </div>
      </motion.div>

      {/* 7. Quick Actions */}
      <motion.div variants={itemVariants}>
        <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5 mb-2">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            {
              icon: PenLine,
              title: 'Record Grade',
              colour: 'amber',
              gradient: 'from-amber-500 via-amber-400 to-yellow-400',
              iconBg: 'bg-amber-500/10 border-amber-500/20',
              iconText: 'text-amber-400',
              section: 'grading' as CollegeSection,
            },
            {
              icon: Calendar,
              title: 'Mark Attendance',
              colour: 'blue',
              gradient: 'from-blue-500 via-blue-400 to-cyan-400',
              iconBg: 'bg-blue-500/10 border-blue-500/20',
              iconText: 'text-blue-400',
              section: 'attendance' as CollegeSection,
            },
            {
              icon: FileEdit,
              title: 'Update ILP',
              colour: 'emerald',
              gradient: 'from-emerald-500 via-green-400 to-emerald-400',
              iconBg: 'bg-emerald-500/10 border-emerald-500/20',
              iconText: 'text-emerald-400',
              section: 'ilpmanagement' as CollegeSection,
            },
            {
              icon: ShieldCheck,
              title: 'EPA Gateway',
              colour: 'purple',
              gradient: 'from-purple-500 via-violet-400 to-purple-400',
              iconBg: 'bg-purple-500/10 border-purple-500/20',
              iconText: 'text-purple-400',
              section: 'epatracking' as CollegeSection,
            },
          ].map((action) => (
            <button
              key={action.title}
              onClick={() => onNavigate(action.section)}
              className="block w-full text-left touch-manipulation"
            >
              <div className="group card-surface-interactive overflow-hidden active:scale-[0.98] transition-all">
                <div
                  className={cn(
                    'absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r opacity-30 group-hover:opacity-80 transition-opacity',
                    action.gradient
                  )}
                />
                <div className="relative z-10 p-4 flex items-center gap-3">
                  <div
                    className={cn(
                      'p-2 rounded-xl border',
                      action.iconBg,
                      action.iconText,
                      'transition-all group-hover:scale-110'
                    )}
                  >
                    <action.icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium text-white flex-1">{action.title}</span>
                  <div className="p-1.5 rounded-full bg-elec-yellow/10 border border-elec-yellow/20">
                    <ChevronRight className="h-3 w-3 text-elec-yellow" />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
