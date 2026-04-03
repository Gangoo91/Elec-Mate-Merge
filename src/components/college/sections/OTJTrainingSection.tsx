/**
 * OTJTrainingSection — Off-the-Job Training Calculator
 *
 * Calculates and displays the 20% off-the-job training requirement
 * for apprenticeships. Uses card-surface pattern, framer motion animations.
 */

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import type { CollegeStudent, CollegeCourse, CollegeAttendance } from '@/contexts/CollegeSupabaseContext';
import { cn } from '@/lib/utils';
import {
  Clock,
  Users,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Loader2,
  GraduationCap,
  BarChart3,
  Target,
} from 'lucide-react';

interface OTJTrainingSectionProps {
  onNavigate: (section: CollegeSection) => void;
}

type OTJStatus = 'On Track' | 'Behind' | 'At Risk';
type FilterOption = 'all' | 'ontrack' | 'behind' | 'atrisk';

interface StudentOTJData {
  student: CollegeStudent;
  course: CollegeCourse | undefined;
  requiredHours: number;
  completedHours: number;
  remainingHours: number;
  progressPercent: number;
  expectedPercent: number;
  status: OTJStatus;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
};

const HOURS_PER_SESSION = 6;
const HOURS_PER_WEEK = 30;
const OTJ_PERCENTAGE = 0.2;
const WEEKS_PER_MONTH = 4.33;

function calculateOTJData(
  student: CollegeStudent,
  courses: CollegeCourse[],
  attendance: CollegeAttendance[]
): StudentOTJData | null {
  const course = courses.find((c) => c.id === student.course_id);
  if (!course || !course.duration_months) return null;

  const workingWeeks = course.duration_months * WEEKS_PER_MONTH;
  const requiredHours = Math.round(workingWeeks * HOURS_PER_WEEK * OTJ_PERCENTAGE);

  // Count sessions where student was Present or Late
  const studentAttendance = attendance.filter(
    (a) => a.student_id === student.id && (a.status === 'Present' || a.status === 'Late')
  );
  const completedHours = studentAttendance.length * HOURS_PER_SESSION;
  const remainingHours = Math.max(0, requiredHours - completedHours);
  const progressPercent = requiredHours > 0 ? Math.min(100, (completedHours / requiredHours) * 100) : 0;

  // Calculate expected progress based on time elapsed
  const startDate = student.start_date ? new Date(student.start_date) : null;
  let expectedPercent = 0;
  if (startDate) {
    const now = new Date();
    const monthsElapsed =
      (now.getFullYear() - startDate.getFullYear()) * 12 + (now.getMonth() - startDate.getMonth());
    const totalMonths = course.duration_months;
    expectedPercent = totalMonths > 0 ? Math.min(100, (monthsElapsed / totalMonths) * 100) : 0;
  } else {
    // Without start_date, use progress_percent as a proxy for time elapsed
    expectedPercent = student.progress_percent ?? 0;
  }

  // Determine status
  const gap = expectedPercent - progressPercent;
  let status: OTJStatus;
  if (gap <= 10) {
    status = 'On Track';
  } else if (gap <= 20) {
    status = 'Behind';
  } else {
    status = 'At Risk';
  }

  return {
    student,
    course,
    requiredHours,
    completedHours,
    remainingHours,
    progressPercent,
    expectedPercent,
    status,
  };
}

function getStatusColour(status: OTJStatus) {
  switch (status) {
    case 'On Track':
      return {
        badge: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
        bar: 'bg-emerald-500',
        icon: CheckCircle2,
      };
    case 'Behind':
      return {
        badge: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
        bar: 'bg-amber-500',
        icon: Clock,
      };
    case 'At Risk':
      return {
        badge: 'bg-red-500/10 text-red-400 border border-red-500/20',
        bar: 'bg-red-500',
        icon: AlertTriangle,
      };
  }
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return (parts[0]?.[0] ?? '?').toUpperCase();
}

export function OTJTrainingSection({ onNavigate }: OTJTrainingSectionProps) {
  const { students, courses, attendance, isLoading } = useCollegeSupabase();
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');

  // Only include active students with a course
  const otjData = useMemo(() => {
    const activeStudents = students.filter(
      (s) => s.status === 'Active' && s.course_id
    );
    return activeStudents
      .map((s) => calculateOTJData(s, courses, attendance))
      .filter((d): d is StudentOTJData => d !== null);
  }, [students, courses, attendance]);

  // KPI calculations
  const kpis = useMemo(() => {
    const total = otjData.length;
    const onTrack = otjData.filter((d) => d.status === 'On Track').length;
    const behind = otjData.filter((d) => d.status === 'Behind').length;
    const atRisk = otjData.filter((d) => d.status === 'At Risk').length;
    const avgOTJ =
      total > 0
        ? Math.round(otjData.reduce((sum, d) => sum + d.progressPercent, 0) / total)
        : 0;
    const onTrackPercent = total > 0 ? Math.round((onTrack / total) * 100) : 0;
    const behindPercent = total > 0 ? Math.round(((behind + atRisk) / total) * 100) : 0;

    return { total, onTrack, behind, atRisk, avgOTJ, onTrackPercent, behindPercent };
  }, [otjData]);

  // Filtered data
  const filteredData = useMemo(() => {
    switch (activeFilter) {
      case 'ontrack':
        return otjData.filter((d) => d.status === 'On Track');
      case 'behind':
        return otjData.filter((d) => d.status === 'Behind');
      case 'atrisk':
        return otjData.filter((d) => d.status === 'At Risk');
      default:
        return otjData;
    }
  }, [otjData, activeFilter]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
      </div>
    );
  }

  if (otjData.length === 0) {
    return (
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
        <motion.div variants={itemVariants}>
          <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
            Off-the-Job Training
          </h2>
        </motion.div>
        <motion.div variants={itemVariants} className="card-surface p-8 text-center">
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 inline-flex mb-4">
            <GraduationCap className="h-8 w-8 text-amber-400" />
          </div>
          <h3 className="text-base font-semibold text-white mb-2">No Apprentices Found</h3>
          <p className="text-sm text-white mb-4">
            Add active students with assigned courses to see OTJ training calculations.
          </p>
          <button
            onClick={() => onNavigate('students')}
            className="inline-flex items-center gap-2 px-4 h-11 rounded-lg bg-elec-yellow text-black font-medium text-sm touch-manipulation active:scale-[0.98] transition-all"
          >
            <Users className="h-4 w-4" />
            View Students
          </button>
        </motion.div>
      </motion.div>
    );
  }

  const filters: { key: FilterOption; label: string; count: number }[] = [
    { key: 'all', label: 'All', count: kpis.total },
    { key: 'ontrack', label: 'On Track', count: kpis.onTrack },
    { key: 'behind', label: 'Behind', count: kpis.behind },
    { key: 'atrisk', label: 'At Risk', count: kpis.atRisk },
  ];

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
      {/* Section Header */}
      <motion.div variants={itemVariants}>
        <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
          Off-the-Job Training
        </h2>
      </motion.div>

      {/* KPI Strip */}
      <motion.div variants={itemVariants} className="grid grid-cols-4 gap-2">
        {[
          {
            value: kpis.total,
            label: 'Apprentices',
            icon: Users,
            colour: 'text-blue-400',
          },
          {
            value: `${kpis.onTrackPercent}%`,
            label: 'On Track',
            icon: CheckCircle2,
            colour: 'text-emerald-400',
          },
          {
            value: `${kpis.behindPercent}%`,
            label: 'Behind',
            icon: AlertTriangle,
            colour: kpis.behindPercent > 0 ? 'text-amber-400' : 'text-white',
          },
          {
            value: `${kpis.avgOTJ}%`,
            label: 'Avg OTJ',
            icon: BarChart3,
            colour: 'text-purple-400',
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="card-surface p-3 flex flex-col items-center touch-manipulation"
          >
            <stat.icon className={cn('h-4 w-4 mb-1', stat.colour)} />
            <span className={cn('text-lg font-bold', stat.colour)}>{stat.value}</span>
            <span className="text-[10px] text-white uppercase tracking-wider">{stat.label}</span>
          </div>
        ))}
      </motion.div>

      {/* Filter Pills */}
      <motion.div variants={itemVariants} className="flex gap-2 overflow-x-auto pb-1">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={cn(
              'flex-shrink-0 h-11 px-4 rounded-full text-sm font-medium touch-manipulation active:scale-[0.98] transition-all',
              activeFilter === f.key
                ? 'bg-elec-yellow text-black'
                : 'bg-white/[0.05] text-white border border-white/[0.08] hover:bg-white/[0.08]'
            )}
          >
            {f.label}
            <span
              className={cn(
                'ml-1.5 text-xs',
                activeFilter === f.key ? 'text-black/60' : 'text-white/60'
              )}
            >
              {f.count}
            </span>
          </button>
        ))}
      </motion.div>

      {/* Student Cards */}
      <motion.div variants={itemVariants} className="space-y-3">
        {filteredData.length === 0 ? (
          <div className="card-surface p-6 text-center">
            <p className="text-sm text-white">No apprentices match this filter.</p>
          </div>
        ) : (
          filteredData.map((data) => {
            const statusStyle = getStatusColour(data.status);
            const StatusIcon = statusStyle.icon;

            return (
              <motion.div key={data.student.id} variants={itemVariants}>
                <div className="group card-surface-interactive overflow-hidden active:scale-[0.98] transition-all touch-manipulation">
                  {/* Gradient accent line */}
                  <div
                    className={cn(
                      'absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r opacity-30 group-hover:opacity-80 transition-opacity',
                      data.status === 'On Track'
                        ? 'from-emerald-500 via-emerald-400 to-green-400'
                        : data.status === 'Behind'
                          ? 'from-amber-500 via-amber-400 to-yellow-400'
                          : 'from-red-500 via-red-400 to-orange-400'
                    )}
                  />

                  <div className="relative z-10 p-4">
                    {/* Top row: avatar, name, status badge */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            'p-2 rounded-xl',
                            data.status === 'On Track'
                              ? 'bg-emerald-500/10 border border-emerald-500/20'
                              : data.status === 'Behind'
                                ? 'bg-amber-500/10 border border-amber-500/20'
                                : 'bg-red-500/10 border border-red-500/20'
                          )}
                        >
                          <GraduationCap
                            className={cn(
                              'h-5 w-5',
                              data.status === 'On Track'
                                ? 'text-emerald-400'
                                : data.status === 'Behind'
                                  ? 'text-amber-400'
                                  : 'text-red-400'
                            )}
                          />
                        </div>
                        <div>
                          <h3
                            className={cn(
                              'text-sm font-semibold text-white transition-colors',
                              data.status === 'On Track'
                                ? 'group-hover:text-emerald-300'
                                : data.status === 'Behind'
                                  ? 'group-hover:text-amber-300'
                                  : 'group-hover:text-red-300'
                            )}
                          >
                            {data.student.name}
                          </h3>
                          <p className="text-[11px] text-white">
                            {data.course?.name ?? 'Unknown Programme'}
                            {data.course?.duration_months
                              ? ` \u00B7 ${data.course.duration_months} months`
                              : ''}
                          </p>
                        </div>
                      </div>

                      <span
                        className={cn(
                          'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium',
                          statusStyle.badge
                        )}
                      >
                        <StatusIcon className="h-3 w-3" />
                        {data.status}
                      </span>
                    </div>

                    {/* Hours breakdown */}
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <div className="text-center">
                        <span className="block text-xs text-white">Required</span>
                        <span className="block text-sm font-bold text-white">
                          {data.requiredHours}h
                        </span>
                      </div>
                      <div className="text-center">
                        <span className="block text-xs text-white">Completed</span>
                        <span className="block text-sm font-bold text-emerald-400">
                          {data.completedHours}h
                        </span>
                      </div>
                      <div className="text-center">
                        <span className="block text-xs text-white">Remaining</span>
                        <span className="block text-sm font-bold text-amber-400">
                          {data.remainingHours}h
                        </span>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mb-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] text-white">OTJ Progress</span>
                        <span className="text-[11px] font-medium text-white">
                          {Math.round(data.progressPercent)}%
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-white/[0.08] overflow-hidden">
                        <div
                          className={cn('h-full rounded-full transition-all duration-500', statusStyle.bar)}
                          style={{ width: `${Math.min(100, data.progressPercent)}%` }}
                        />
                      </div>
                      {/* Expected progress marker */}
                      {data.expectedPercent > 0 && (
                        <div className="relative h-0 mt-[-10px]">
                          <div
                            className="absolute top-0 w-0.5 h-2 bg-white/40 rounded-full"
                            style={{ left: `${Math.min(100, data.expectedPercent)}%` }}
                            title={`Expected: ${Math.round(data.expectedPercent)}%`}
                          />
                        </div>
                      )}
                    </div>

                    {/* Footer: open action */}
                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/[0.06]">
                      <span className="text-[11px] font-medium text-elec-yellow">View Details</span>
                      <div className="w-6 h-6 rounded-full bg-white/[0.05] border border-elec-yellow/20 flex items-center justify-center group-hover:bg-elec-yellow group-hover:border-elec-yellow transition-all">
                        <ChevronRight className="w-3.5 h-3.5 text-white group-hover:text-black transition-all" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </motion.div>

      {/* Summary Card */}
      <motion.div variants={itemVariants}>
        <div className="card-surface p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <Target className="h-4 w-4 text-purple-400" />
            </div>
            <h3 className="text-sm font-semibold text-white">OTJ Calculation Basis</h3>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-white">Working hours per week</span>
              <span className="text-white font-medium">30 hours</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-white">OTJ requirement</span>
              <span className="text-white font-medium">20% of total</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-white">Hours per session</span>
              <span className="text-white font-medium">6 hours</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-white">Weeks per month</span>
              <span className="text-white font-medium">4.33 weeks</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
