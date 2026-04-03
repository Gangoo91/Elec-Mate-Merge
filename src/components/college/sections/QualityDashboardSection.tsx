/**
 * QualityDashboardSection — Ofsted-ready compliance overview.
 * Auto-generates KPIs from existing student, attendance, ILP, EPA and grade data.
 */

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  Users,
  Target,
  Award,
  AlertTriangle,
  TrendingDown,
  Clock,
  ChevronRight,
  Loader2,
  ShieldCheck,
  BookOpen,
  Lightbulb,
  Rocket,
  Star,
  CalendarCheck,
  FileCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';

interface QualityDashboardSectionProps {
  onNavigate: (section: CollegeSection) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
};

export function QualityDashboardSection({ onNavigate }: QualityDashboardSectionProps) {
  const {
    students,
    attendance,
    ilps,
    epaRecords,
    grades,
    isLoading,
    getOverdueILPReviewsData,
    getPendingGradesData,
  } = useCollegeSupabase();

  // ----- Derived metrics -----
  const metrics = useMemo(() => {
    const activeStudents = students.filter((s) => s.status === 'Active');
    const totalEnrolled = students.length;

    // Overall Attendance %
    const totalRecords = attendance.length;
    const presentRecords = attendance.filter(
      (a) => a.status === 'Present' || a.status === 'Late'
    ).length;
    const attendancePercent = totalRecords > 0 ? Math.round((presentRecords / totalRecords) * 100) : 0;

    // ILP Compliance % — students with ILP reviewed in last 6 weeks vs total active
    const sixWeeksAgo = new Date();
    sixWeeksAgo.setDate(sixWeeksAgo.getDate() - 42);
    const studentsWithRecentILP = new Set(
      ilps
        .filter((ilp) => ilp.last_reviewed && new Date(ilp.last_reviewed) >= sixWeeksAgo)
        .map((ilp) => ilp.student_id)
    );
    const ilpCompliancePercent =
      activeStudents.length > 0
        ? Math.round((studentsWithRecentILP.size / activeStudents.length) * 100)
        : 0;

    // EPA On Track %
    const epaStudents = epaRecords.length;
    const epaOnTrack = epaRecords.filter(
      (e) =>
        e.status === 'In Progress' ||
        e.status === 'Pre-Gateway' ||
        e.status === 'Gateway Ready' ||
        e.status === 'Complete'
    ).length;
    const epaOnTrackPercent = epaStudents > 0 ? Math.round((epaOnTrack / epaStudents) * 100) : 0;

    // Achievement Rate %
    const completedStudents = students.filter((s) => s.status === 'Completed').length;
    const achievementPercent =
      totalEnrolled > 0 ? Math.round((completedStudents / totalEnrolled) * 100) : 0;

    // Retention Rate
    const withdrawnStudents = students.filter((s) => s.status === 'Withdrawn').length;
    const retentionPercent =
      totalEnrolled > 0 ? Math.round(((totalEnrolled - withdrawnStudents) / totalEnrolled) * 100) : 0;

    // Attendance Trend (last 4 weeks)
    const now = new Date();
    const weeks: number[] = [];
    for (let w = 0; w < 4; w++) {
      const weekStart = new Date(now);
      weekStart.setDate(weekStart.getDate() - (w + 1) * 7);
      const weekEnd = new Date(now);
      weekEnd.setDate(weekEnd.getDate() - w * 7);
      const weekRecords = attendance.filter((a) => {
        const d = new Date(a.date);
        return d >= weekStart && d < weekEnd;
      });
      const weekPresent = weekRecords.filter(
        (a) => a.status === 'Present' || a.status === 'Late'
      ).length;
      weeks.push(weekRecords.length > 0 ? (weekPresent / weekRecords.length) * 100 : 0);
    }
    // weeks[0] is most recent
    let attendanceTrend: 'Improving' | 'Stable' | 'Declining' = 'Stable';
    if (weeks.length >= 2) {
      const recentAvg = (weeks[0] + weeks[1]) / 2;
      const olderAvg = (weeks[2] + weeks[3]) / 2;
      if (recentAvg - olderAvg > 2) attendanceTrend = 'Improving';
      else if (olderAvg - recentAvg > 2) attendanceTrend = 'Declining';
    }

    // Assessment Turnaround (average days from created_at to assessed_at)
    const gradedAssessments = grades.filter((g) => g.assessed_at && g.created_at);
    let avgTurnaround = 0;
    if (gradedAssessments.length > 0) {
      const totalDays = gradedAssessments.reduce((sum, g) => {
        const created = new Date(g.created_at!);
        const assessed = new Date(g.assessed_at!);
        return sum + Math.max(0, (assessed.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
      }, 0);
      avgTurnaround = Math.round(totalDays / gradedAssessments.length);
    }

    // Alerts
    const overdueILPs = getOverdueILPReviewsData();
    const lowAttendanceStudents = activeStudents.filter((student) => {
      const studentRecords = attendance.filter((a) => a.student_id === student.id);
      if (studentRecords.length === 0) return false;
      const present = studentRecords.filter(
        (a) => a.status === 'Present' || a.status === 'Late'
      ).length;
      return (present / studentRecords.length) * 100 < 80;
    });
    const pendingAssessments = getPendingGradesData();
    const epaGatewayDueSoon = epaRecords.filter((e) => {
      if (!e.gateway_date) return false;
      const gw = new Date(e.gateway_date);
      const twoWeeks = new Date();
      twoWeeks.setDate(twoWeeks.getDate() + 14);
      return gw <= twoWeeks && gw >= now && e.status !== 'Complete';
    });

    return {
      attendancePercent,
      ilpCompliancePercent,
      epaOnTrackPercent,
      achievementPercent,
      retentionPercent,
      attendanceTrend,
      avgTurnaround,
      overdueILPs,
      lowAttendanceStudents,
      pendingAssessments,
      epaGatewayDueSoon,
    };
  }, [students, attendance, ilps, epaRecords, grades, getOverdueILPReviewsData, getPendingGradesData]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
      </div>
    );
  }

  const kpiColor = (val: number) => {
    if (val >= 85) return 'text-green-400';
    if (val >= 70) return 'text-amber-400';
    return 'text-red-400';
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
      {/* KPI Strip */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {[
          {
            value: `${metrics.attendancePercent}%`,
            label: 'Attendance',
            icon: Users,
            color: kpiColor(metrics.attendancePercent),
          },
          {
            value: `${metrics.ilpCompliancePercent}%`,
            label: 'ILP Compliance',
            icon: Target,
            color: kpiColor(metrics.ilpCompliancePercent),
          },
          {
            value: `${metrics.epaOnTrackPercent}%`,
            label: 'EPA On Track',
            icon: Award,
            color: kpiColor(metrics.epaOnTrackPercent),
          },
          {
            value: `${metrics.achievementPercent}%`,
            label: 'Achievement',
            icon: Star,
            color: kpiColor(metrics.achievementPercent),
          },
        ].map((kpi) => (
          <div
            key={kpi.label}
            className="card-surface p-3 flex flex-col items-center"
          >
            <kpi.icon className={cn('h-4 w-4 mb-1', kpi.color)} />
            <span className={cn('text-lg font-bold', kpi.color)}>{kpi.value}</span>
            <span className="text-[10px] text-white uppercase tracking-wider">{kpi.label}</span>
          </div>
        ))}
      </motion.div>

      {/* Compliance Alerts */}
      <motion.section variants={itemVariants} className="space-y-3">
        <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
          Compliance Alerts
        </h2>
        <div className="space-y-2">
          {[
            {
              title: 'Overdue ILP Reviews',
              count: metrics.overdueILPs.length,
              desc: `${metrics.overdueILPs.length} reviews need completing`,
              icon: Target,
              gradient: 'from-amber-500 to-orange-400',
              iconBg: 'bg-amber-500/10 border border-amber-500/20',
              iconColor: 'text-amber-400',
              badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
              section: 'ilpmanagement' as CollegeSection,
              show: metrics.overdueILPs.length > 0,
            },
            {
              title: 'Low Attendance Students',
              count: metrics.lowAttendanceStudents.length,
              desc: `${metrics.lowAttendanceStudents.length} below 80% attendance`,
              icon: TrendingDown,
              gradient: 'from-red-500 to-rose-400',
              iconBg: 'bg-red-500/10 border border-red-500/20',
              iconColor: 'text-red-400',
              badgeBg: 'bg-red-500/10 text-red-400 border-red-500/20',
              section: 'attendance' as CollegeSection,
              show: metrics.lowAttendanceStudents.length > 0,
            },
            {
              title: 'Pending Assessments',
              count: metrics.pendingAssessments.length,
              desc: `${metrics.pendingAssessments.length} awaiting grading`,
              icon: Clock,
              gradient: 'from-amber-500 to-yellow-400',
              iconBg: 'bg-amber-500/10 border border-amber-500/20',
              iconColor: 'text-amber-400',
              badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
              section: 'grading' as CollegeSection,
              show: metrics.pendingAssessments.length > 0,
            },
            {
              title: 'EPA Gateway Due Soon',
              count: metrics.epaGatewayDueSoon.length,
              desc: `${metrics.epaGatewayDueSoon.length} within next 2 weeks`,
              icon: CalendarCheck,
              gradient: 'from-purple-500 to-violet-400',
              iconBg: 'bg-purple-500/10 border border-purple-500/20',
              iconColor: 'text-purple-400',
              badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
              section: 'epatracking' as CollegeSection,
              show: metrics.epaGatewayDueSoon.length > 0,
            },
          ]
            .filter((alert) => alert.show)
            .map((alert) => (
              <button
                key={alert.title}
                onClick={() => onNavigate(alert.section)}
                className="w-full text-left touch-manipulation"
              >
                <div className="group card-surface-interactive overflow-hidden active:scale-[0.98] transition-all">
                  <div
                    className={cn(
                      'absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r opacity-50',
                      alert.gradient
                    )}
                  />
                  <div className="relative z-10 p-3.5 flex items-center gap-3">
                    <div className={cn('p-2 rounded-xl', alert.iconBg)}>
                      <alert.icon className={cn('h-4 w-4', alert.iconColor)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white">{alert.title}</p>
                      <p className="text-[11px] text-white">{alert.desc}</p>
                    </div>
                    <span
                      className={cn(
                        'px-2 py-0.5 rounded-full text-[10px] font-semibold border',
                        alert.badgeBg
                      )}
                    >
                      {alert.count}
                    </span>
                    <div className="w-6 h-6 rounded-full bg-white/[0.05] border border-elec-yellow/20 flex items-center justify-center">
                      <ChevronRight className="w-3.5 h-3.5 text-elec-yellow" />
                    </div>
                  </div>
                </div>
              </button>
            ))}

          {metrics.overdueILPs.length === 0 &&
            metrics.lowAttendanceStudents.length === 0 &&
            metrics.pendingAssessments.length === 0 &&
            metrics.epaGatewayDueSoon.length === 0 && (
              <div className="card-surface p-4 flex items-center gap-3">
                <div className="p-2 rounded-xl bg-green-500/10 border border-green-500/20">
                  <ShieldCheck className="h-4 w-4 text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">All Clear</p>
                  <p className="text-[11px] text-white">No outstanding compliance alerts</p>
                </div>
              </div>
            )}
        </div>
      </motion.section>

      {/* Key Metrics */}
      <motion.section variants={itemVariants} className="space-y-3">
        <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
          Key Metrics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {[
            {
              title: 'Retention Rate',
              value: `${metrics.retentionPercent}%`,
              icon: Users,
              color: kpiColor(metrics.retentionPercent),
              iconBg: 'bg-blue-500/10 border border-blue-500/20',
              iconColor: 'text-blue-400',
            },
            {
              title: 'Attendance Trend',
              value: metrics.attendanceTrend,
              icon: BarChart3,
              color:
                metrics.attendanceTrend === 'Improving'
                  ? 'text-green-400'
                  : metrics.attendanceTrend === 'Declining'
                    ? 'text-red-400'
                    : 'text-white',
              iconBg: 'bg-emerald-500/10 border border-emerald-500/20',
              iconColor: 'text-emerald-400',
            },
            {
              title: 'Assessment Turnaround',
              value: `${metrics.avgTurnaround} days`,
              icon: FileCheck,
              color: metrics.avgTurnaround <= 7 ? 'text-green-400' : 'text-amber-400',
              iconBg: 'bg-amber-500/10 border border-amber-500/20',
              iconColor: 'text-amber-400',
            },
          ].map((metric) => (
            <div key={metric.title} className="card-surface overflow-hidden">
              <div className="p-3.5 flex items-center gap-3">
                <div className={cn('p-2 rounded-xl', metric.iconBg)}>
                  <metric.icon className={cn('h-4 w-4', metric.iconColor)} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-white uppercase tracking-wider">{metric.title}</p>
                  <p className={cn('text-lg font-bold', metric.color)}>{metric.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Ofsted Evidence */}
      <motion.section variants={itemVariants} className="space-y-3">
        <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
          Ofsted Evidence
        </h2>
        <div className="space-y-2">
          {[
            {
              title: 'Intent',
              desc: 'Curriculum planning and sequencing evidence',
              icon: Lightbulb,
              gradient: 'from-blue-500 via-blue-400 to-cyan-400',
              iconBg: 'bg-blue-500/10 border border-blue-500/20',
              iconColor: 'text-blue-400',
              section: 'courses' as CollegeSection,
            },
            {
              title: 'Implementation',
              desc: 'Teaching, learning and assessment evidence',
              icon: Rocket,
              gradient: 'from-emerald-500 via-emerald-400 to-green-400',
              iconBg: 'bg-emerald-500/10 border border-emerald-500/20',
              iconColor: 'text-emerald-400',
              section: 'lessonplans' as CollegeSection,
            },
            {
              title: 'Impact',
              desc: 'Outcomes, achievement and progression evidence',
              icon: BookOpen,
              gradient: 'from-purple-500 via-violet-400 to-indigo-400',
              iconBg: 'bg-purple-500/10 border border-purple-500/20',
              iconColor: 'text-purple-400',
              section: 'grading' as CollegeSection,
            },
          ].map((evidence) => (
            <button
              key={evidence.title}
              onClick={() => onNavigate(evidence.section)}
              className="w-full text-left touch-manipulation"
            >
              <div className="group card-surface-interactive overflow-hidden active:scale-[0.98] transition-all">
                <div
                  className={cn(
                    'absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r opacity-30 group-hover:opacity-80 transition-opacity',
                    evidence.gradient
                  )}
                />
                <div className="relative z-10 p-3.5 flex items-center gap-3">
                  <div className={cn('p-2 rounded-xl', evidence.iconBg)}>
                    <evidence.icon className={cn('h-4 w-4', evidence.iconColor)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white">{evidence.title}</p>
                    <p className="text-[11px] text-white">{evidence.desc}</p>
                  </div>
                  <span className="text-[11px] font-medium text-elec-yellow mr-1">View Evidence</span>
                  <div className="w-6 h-6 rounded-full bg-white/[0.05] border border-elec-yellow/20 flex items-center justify-center">
                    <ChevronRight className="w-3.5 h-3.5 text-elec-yellow" />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
}
