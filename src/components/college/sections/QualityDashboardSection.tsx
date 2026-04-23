/**
 * QualityDashboardSection — Ofsted-ready compliance overview.
 * Auto-generates KPIs from existing student, attendance, ILP, EPA and grade data.
 */

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import {
  ListCard,
  ListRow,
  HubGrid,
  HubCard,
  SectionHeader,
  Pill,
  Arrow,
  LoadingState,
} from '@/components/college/primitives';

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

  if (isLoading) return <LoadingState />;

  const kpiColor = (val: number) => {
    if (val >= 85) return 'text-green-400';
    if (val >= 70) return 'text-amber-400';
    return 'text-red-400';
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-7xl space-y-10 sm:space-y-14 pb-12"
    >
      {/* Hero */}
      <motion.div variants={itemVariants}>
        <div className="pt-6 sm:pt-8 lg:pt-10 pb-2">
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Tools · Quality Dashboard
          </div>
          <h1 className="mt-1.5 text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-[1.05]">
            Ofsted-ready metrics
          </h1>
          <p className="mt-3 text-[13px] sm:text-sm text-white/55 max-w-2xl leading-relaxed">
            Auto-generated KPIs from students, attendance, ILPs, EPA and grades. Updated in real time.
          </p>
        </div>
      </motion.div>

      {/* KPI Strip */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
          {[
            { value: `${metrics.attendancePercent}%`, label: 'Attendance', color: kpiColor(metrics.attendancePercent) },
            { value: `${metrics.ilpCompliancePercent}%`, label: 'ILP Compliance', color: kpiColor(metrics.ilpCompliancePercent) },
            { value: `${metrics.epaOnTrackPercent}%`, label: 'EPA On Track', color: kpiColor(metrics.epaOnTrackPercent) },
            { value: `${metrics.achievementPercent}%`, label: 'Achievement', color: kpiColor(metrics.achievementPercent) },
          ].map((kpi, i) => (
            <div
              key={kpi.label}
              className="bg-[hsl(0_0%_12%)] px-5 py-6 sm:px-6 sm:py-8 lg:px-7 lg:py-9"
            >
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                {String(i + 1).padStart(2, '0')} · {kpi.label}
              </div>
              <div
                className={cn(
                  'mt-3 sm:mt-4 font-semibold tabular-nums tracking-tight leading-none',
                  'text-4xl sm:text-5xl lg:text-6xl',
                  kpi.color
                )}
              >
                {kpi.value}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Compliance Alerts */}
      {(() => {
        const alerts = [
          {
            title: 'Overdue ILP reviews',
            count: metrics.overdueILPs.length,
            desc: `${metrics.overdueILPs.length} reviews need completing`,
            tone: 'amber' as const,
            section: 'ilpmanagement' as CollegeSection,
          },
          {
            title: 'Low attendance students',
            count: metrics.lowAttendanceStudents.length,
            desc: `${metrics.lowAttendanceStudents.length} below 80% attendance`,
            tone: 'red' as const,
            section: 'attendance' as CollegeSection,
          },
          {
            title: 'Pending assessments',
            count: metrics.pendingAssessments.length,
            desc: `${metrics.pendingAssessments.length} awaiting grading`,
            tone: 'amber' as const,
            section: 'grading' as CollegeSection,
          },
          {
            title: 'EPA gateway due soon',
            count: metrics.epaGatewayDueSoon.length,
            desc: `${metrics.epaGatewayDueSoon.length} within next 2 weeks`,
            tone: 'purple' as const,
            section: 'epatracking' as CollegeSection,
          },
        ].filter((a) => a.count > 0);

        if (alerts.length === 0) {
          return (
            <motion.section variants={itemVariants} className="space-y-5">
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Compliance
              </div>
              <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6 flex items-center gap-4">
                <span aria-hidden className="w-[3px] h-10 rounded-full bg-green-400 shrink-0" />
                <div className="min-w-0">
                  <div className="text-[15px] font-medium text-white">All clear</div>
                  <div className="mt-0.5 text-[12px] text-white/75">
                    No outstanding compliance alerts.
                  </div>
                </div>
              </div>
            </motion.section>
          );
        }

        return (
          <motion.section variants={itemVariants} className="space-y-5">
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Compliance Alerts
            </div>
            <ListCard>
              {alerts.map((alert) => (
                <ListRow
                  key={alert.title}
                  onClick={() => onNavigate(alert.section)}
                  accent={alert.tone}
                  title={alert.title}
                  subtitle={alert.desc}
                  trailing={
                    <>
                      <Pill tone={alert.tone}>{alert.count}</Pill>
                      <Arrow />
                    </>
                  }
                />
              ))}
            </ListCard>
          </motion.section>
        );
      })()}

      {/* Key Metrics */}
      <motion.section variants={itemVariants} className="space-y-5">
        <SectionHeader eyebrow="Key Metrics" title="Beyond the headline KPIs" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
          {[
            {
              title: 'Retention',
              sub: 'Rate',
              value: `${metrics.retentionPercent}%`,
              color: kpiColor(metrics.retentionPercent),
            },
            {
              title: 'Attendance',
              sub: 'Trend',
              value: metrics.attendanceTrend,
              color:
                metrics.attendanceTrend === 'Improving'
                  ? 'text-green-400'
                  : metrics.attendanceTrend === 'Declining'
                    ? 'text-red-400'
                    : 'text-white',
            },
            {
              title: 'Turnaround',
              sub: 'Avg days to grade',
              value: `${metrics.avgTurnaround}d`,
              color: metrics.avgTurnaround <= 7 ? 'text-green-400' : 'text-amber-400',
            },
          ].map((metric) => (
            <div
              key={metric.title}
              className="bg-[hsl(0_0%_12%)] px-5 py-5 sm:px-6 sm:py-6"
            >
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                {metric.title}
              </div>
              <div
                className={cn(
                  'mt-2 text-2xl sm:text-3xl font-semibold tabular-nums tracking-tight leading-none',
                  metric.color
                )}
              >
                {metric.value}
              </div>
              <div className="mt-2 text-[11px] text-white/75">{metric.sub}</div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Ofsted Evidence */}
      <motion.section variants={itemVariants} className="space-y-5">
        <SectionHeader eyebrow="Ofsted Framework" title="Evidence by judgement area" />
        <HubGrid columns={3}>
          <HubCard
            number="01"
            eyebrow="Curriculum Design"
            title="Intent"
            description="Curriculum planning, sequencing and coverage evidence."
            tone="blue"
            meta="Courses · schemes of work"
            onClick={() => onNavigate('courses')}
            cta="Open"
          />
          <HubCard
            number="02"
            eyebrow="Delivery"
            title="Implementation"
            description="Teaching, learning and assessment evidence."
            tone="emerald"
            meta="Lesson plans · feedback"
            onClick={() => onNavigate('lessonplans')}
            cta="Open"
          />
          <HubCard
            number="03"
            eyebrow="Outcomes"
            title="Impact"
            description="Achievement, progression and destination evidence."
            tone="purple"
            meta="Grades · EPA outcomes"
            onClick={() => onNavigate('grading')}
            cta="Open"
          />
        </HubGrid>
      </motion.section>
    </motion.div>
  );
}
