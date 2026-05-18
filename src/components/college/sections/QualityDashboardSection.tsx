/**
 * QualityDashboardSection — Ofsted-ready compliance overview.
 *
 * Auto-generates KPIs from existing student, attendance, ILP, EPA and
 * grade data and surfaces the surrounding evidence chain (SAR, QIP,
 * compliance docs, EPA pass-rate report) so an inspector can move from
 * a top-line number to the underlying evidence in two clicks.
 *
 * Edits May 2026:
 *   - Achievement rate corrected to Completed / (Completed + Withdrawn),
 *     the Ofsted norm. Previous calc counted active learners against the
 *     enrolled total which always understated the figure.
 *   - KPIs now show their target alongside the actual + a small gap chip.
 *   - Ofsted EIF section now wires SAR + QIP + Compliance Docs + EPA
 *     pass-rate so the evidence chain is one click away.
 *   - "Print pack" trigger — prints the page as the inspector hand-over.
 */

import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Printer } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  CartesianGrid,
} from 'recharts';
import { cn } from '@/lib/utils';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import { useCollegeSettings } from '@/hooks/college/useCollegeSettings';
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

/* Hard-coded Ofsted/awarding-body benchmarks. Attendance target comes from
   per-college settings; the others are sector norms that don't typically
   vary by provider. Keeping them inline avoids forcing every college to
   configure something everyone already agrees on. */
const ILP_COMPLIANCE_TARGET = 95;
const EPA_ON_TRACK_TARGET = 90;
const ACHIEVEMENT_TARGET = 90;
const TURNAROUND_TARGET_DAYS = 7;

export function QualityDashboardSection({ onNavigate }: QualityDashboardSectionProps) {
  const navigate = useNavigate();
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
  const { settings } = useCollegeSettings();
  const lowAttendance = settings.low_attendance_threshold_percent;
  const attendanceTarget = settings.high_attendance_threshold_percent;

  // ----- Derived metrics -----
  const metrics = useMemo(() => {
    const activeStudents = students.filter((s) => s.status === 'Active');
    const totalEnrolled = students.length;

    // Overall Attendance %
    const totalRecords = attendance.length;
    const presentRecords = attendance.filter(
      (a) => a.status === 'Present' || a.status === 'Late'
    ).length;
    const attendancePercent =
      totalRecords > 0 ? Math.round((presentRecords / totalRecords) * 100) : 0;

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

    // Achievement Rate % — Ofsted norm is Completed / (Completed + Withdrawn).
    // Counting against total enrolled (the prior calc) silently included
    // every active learner mid-course, so the number always undershot.
    const completedStudents = students.filter((s) => s.status === 'Completed').length;
    const withdrawnStudents = students.filter((s) => s.status === 'Withdrawn').length;
    const achievementDenominator = completedStudents + withdrawnStudents;
    const achievementPercent =
      achievementDenominator > 0
        ? Math.round((completedStudents / achievementDenominator) * 100)
        : null; // null = no leavers yet → render as "—" not "0%"

    // Retention Rate — same population, different question. Active + completed
    // out of (active + completed + withdrawn). Excludes long-term suspended.
    const retentionDenominator = activeStudents.length + completedStudents + withdrawnStudents;
    const retentionPercent =
      retentionDenominator > 0
        ? Math.round(((activeStudents.length + completedStudents) / retentionDenominator) * 100)
        : null;

    // Attendance Trend (last 12 weeks for the chart + 4 for the headline
    // direction read). Each bucket is a Sunday-ending week.
    const now = new Date();
    const weeks: number[] = [];
    const weeklyPoints: { week_ending: string; attendance_pct: number; sessions: number }[] = [];
    for (let w = 0; w < 12; w++) {
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
      const pct = weekRecords.length > 0 ? (weekPresent / weekRecords.length) * 100 : 0;
      weeks.push(pct);
      weeklyPoints.push({
        week_ending: weekEnd.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
        attendance_pct: weekRecords.length > 0 ? Math.round(pct) : 0,
        sessions: weekRecords.length,
      });
    }
    // weeks[0] is most recent → reverse the chart series so X axis reads
    // oldest → newest left-to-right.
    weeklyPoints.reverse();

    let attendanceTrend: 'Improving' | 'Stable' | 'Declining' = 'Stable';
    if (weeks.length >= 4) {
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
      return (present / studentRecords.length) * 100 < lowAttendance;
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
      completedStudents,
      withdrawnStudents,
      totalEnrolled,
      weeklyPoints,
    };
  }, [
    students,
    attendance,
    ilps,
    epaRecords,
    grades,
    getOverdueILPReviewsData,
    getPendingGradesData,
    lowAttendance,
  ]);

  if (isLoading) return <LoadingState />;

  const kpiColor = (val: number | null, target: number) => {
    if (val == null) return 'text-white/50';
    if (val >= target) return 'text-green-400';
    if (val >= target - 15) return 'text-amber-400';
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
        <div className="pt-6 sm:pt-8 lg:pt-10 pb-2 flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
              Tools · Quality Dashboard
            </div>
            <h1 className="mt-1.5 text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-[1.05]">
              Ofsted-ready metrics
            </h1>
            <p className="mt-3 text-[13px] sm:text-sm text-white max-w-2xl leading-relaxed">
              Auto-generated KPIs from students, attendance, ILPs, EPA and grades. Each KPI shows
              its sector benchmark so the gap is visible at a glance.
            </p>
          </div>
          {/* Inspector hand-over: native print → "Save as PDF" gives a
              clean snapshot of the whole dashboard. Cheaper than building
              a bespoke PDF generator and matches the dashboard 1:1. */}
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-blue-500/[0.10] border border-blue-400/40 text-[11.5px] font-semibold text-blue-200 hover:bg-blue-500/[0.18] no-print touch-manipulation"
            title="Print this dashboard as a Quality pack snapshot — use the browser's 'Save as PDF' to hand over"
          >
            <Printer className="h-3 w-3" />
            Print quality pack
          </button>
        </div>
      </motion.div>

      {/* KPI Strip */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
          <KpiTile
            label="Attendance"
            value={metrics.attendancePercent}
            target={attendanceTarget}
            valueColour={kpiColor(metrics.attendancePercent, attendanceTarget)}
            index={1}
          />
          <KpiTile
            label="ILP Compliance"
            value={metrics.ilpCompliancePercent}
            target={ILP_COMPLIANCE_TARGET}
            valueColour={kpiColor(metrics.ilpCompliancePercent, ILP_COMPLIANCE_TARGET)}
            index={2}
          />
          <KpiTile
            label="EPA On Track"
            value={metrics.epaOnTrackPercent}
            target={EPA_ON_TRACK_TARGET}
            valueColour={kpiColor(metrics.epaOnTrackPercent, EPA_ON_TRACK_TARGET)}
            index={3}
          />
          <KpiTile
            label="Achievement"
            value={metrics.achievementPercent}
            target={ACHIEVEMENT_TARGET}
            valueColour={kpiColor(metrics.achievementPercent, ACHIEVEMENT_TARGET)}
            index={4}
            sub={
              metrics.completedStudents + metrics.withdrawnStudents === 0
                ? 'No leavers yet'
                : `${metrics.completedStudents}/${metrics.completedStudents + metrics.withdrawnStudents} leavers achieved`
            }
          />
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
            desc: `${metrics.lowAttendanceStudents.length} below ${lowAttendance}% attendance`,
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
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
                Compliance
              </div>
              <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6 flex items-center gap-4">
                <span aria-hidden className="w-[3px] h-10 rounded-full bg-green-400 shrink-0" />
                <div className="min-w-0">
                  <div className="text-[15px] font-medium text-white">All clear</div>
                  <div className="mt-0.5 text-[12px] text-white">
                    No outstanding compliance alerts.
                  </div>
                </div>
              </div>
            </motion.section>
          );
        }

        return (
          <motion.section variants={itemVariants} className="space-y-5">
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
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
              sub: metrics.retentionPercent == null ? '—' : 'Active + completed / population',
              value: metrics.retentionPercent == null ? '—' : `${metrics.retentionPercent}%`,
              color:
                metrics.retentionPercent == null
                  ? 'text-white/50'
                  : kpiColor(metrics.retentionPercent, 90),
            },
            {
              title: 'Attendance',
              sub: 'Direction over 4 weeks',
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
              sub: `Avg days to grade · target ≤${TURNAROUND_TARGET_DAYS}d`,
              value: `${metrics.avgTurnaround}d`,
              color:
                metrics.avgTurnaround === 0
                  ? 'text-white/50'
                  : metrics.avgTurnaround <= TURNAROUND_TARGET_DAYS
                    ? 'text-green-400'
                    : 'text-amber-400',
            },
          ].map((metric) => (
            <div
              key={metric.title}
              className="bg-[hsl(0_0%_12%)] px-5 py-5 sm:px-6 sm:py-6"
            >
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
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
              <div className="mt-2 text-[11px] text-white">{metric.sub}</div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Attendance trend — 12-week line chart with low/target reference
          lines. Gives the inspector the "direction of travel" Ofsted asks
          for as a one-glance question. */}
      <motion.section variants={itemVariants} className="space-y-5">
        <SectionHeader eyebrow="Direction of travel" title="Attendance · last 12 weeks" />
        <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-4 sm:px-5 py-5">
          <div className="h-56 sm:h-64 w-full -mx-1">
            <ResponsiveContainer>
              <LineChart
                data={metrics.weeklyPoints}
                margin={{ top: 8, right: 16, left: -10, bottom: 0 }}
              >
                <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="2 4" />
                <XAxis
                  dataKey="week_ending"
                  tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.45)' }}
                  tickLine={false}
                  axisLine={{ stroke: 'rgba(255,255,255,0.08)' }}
                  minTickGap={20}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.45)' }}
                  tickLine={false}
                  axisLine={{ stroke: 'rgba(255,255,255,0.08)' }}
                  label={{
                    value: '%',
                    angle: 0,
                    position: 'insideTopLeft',
                    offset: 8,
                    style: { fontSize: 10, fill: 'rgba(255,255,255,0.45)' },
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(0 0% 8%)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '0.5rem',
                    fontSize: 11,
                  }}
                  labelStyle={{ color: 'rgba(255,255,255,0.55)' }}
                  itemStyle={{ color: 'rgba(255,255,255,0.85)' }}
                  formatter={(v: number, _name: string, item: { payload?: { sessions?: number } }) =>
                    item.payload?.sessions === 0
                      ? '— no sessions'
                      : `${v}% (${item.payload?.sessions ?? 0} sessions)`
                  }
                />
                {/* Low threshold (red) and target (green) reference lines —
                    instantly readable as "danger / pass" without checking
                    the legend. */}
                <ReferenceLine
                  y={lowAttendance}
                  stroke="rgba(248,113,113,0.45)"
                  strokeDasharray="3 4"
                  label={{
                    value: `Low ${lowAttendance}%`,
                    position: 'right',
                    fill: 'rgba(248,113,113,0.65)',
                    fontSize: 9,
                  }}
                />
                <ReferenceLine
                  y={attendanceTarget}
                  stroke="rgba(52,211,153,0.45)"
                  strokeDasharray="3 4"
                  label={{
                    value: `Target ${attendanceTarget}%`,
                    position: 'right',
                    fill: 'rgba(52,211,153,0.7)',
                    fontSize: 9,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="attendance_pct"
                  stroke="rgb(96,165,250)"
                  strokeWidth={2.2}
                  dot={{ r: 2.5, fill: 'rgb(96,165,250)', stroke: 'none' }}
                  name="Attendance"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 text-[10.5px] text-white/45 flex items-center gap-3 flex-wrap">
            <span>
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-400 mr-1" />
              Weekly attendance
            </span>
            <span>
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-400/70 mr-1" />
              Low threshold ({lowAttendance}%)
            </span>
            <span>
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400/70 mr-1" />
              Target ({attendanceTarget}%)
            </span>
            <span className="ml-auto capitalize">
              Current direction:{' '}
              <span
                className={cn(
                  'font-semibold',
                  metrics.attendanceTrend === 'Improving'
                    ? 'text-emerald-300'
                    : metrics.attendanceTrend === 'Declining'
                      ? 'text-red-300'
                      : 'text-white/85'
                )}
              >
                {metrics.attendanceTrend}
              </span>
            </span>
          </div>
        </div>
      </motion.section>

      {/* Ofsted Evidence — six cards covering the full EIF evidence chain.
          Each one is a click-through to the source-of-truth surface. */}
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
          <HubCard
            number="04"
            eyebrow="Self-Assessment"
            title="SAR draft"
            description="The current Self-Assessment Report. Draft, edit, approve."
            tone="amber"
            meta="Ofsted prep"
            onClick={() => navigate('/college/compliance/sar')}
            cta="Open"
          />
          <HubCard
            number="05"
            eyebrow="Improvement Plan"
            title="QIP tracker"
            description="Open QIP actions, owners and due dates."
            tone="orange"
            meta="Track follow-through"
            onClick={() => navigate('/college/compliance/qip')}
            cta="Open"
          />
          <HubCard
            number="06"
            eyebrow="EPA Outcomes"
            title="Pass-rate report"
            description="Per-cohort Distinction / Merit / Pass / Fail roll-up. Source data for the Impact judgement."
            tone="green"
            meta="CSV export"
            onClick={() => navigate('/college/reports?r=epa_pass_rate')}
            cta="Open"
          />
        </HubGrid>
      </motion.section>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────── */

/** A single KPI tile showing actual + target + gap chip. Renders "—" when
 *  there's no underlying data (so the inspector sees an honest "not yet"
 *  rather than a misleading 0%). */
function KpiTile({
  label,
  value,
  target,
  valueColour,
  index,
  sub,
}: {
  label: string;
  value: number | null;
  target: number;
  valueColour: string;
  index: number;
  sub?: string;
}) {
  const display = value == null ? '—' : `${value}%`;
  const gap = value == null ? null : value - target;
  const onTarget = gap !== null && gap >= 0;

  return (
    <div className="bg-[hsl(0_0%_12%)] px-5 py-6 sm:px-6 sm:py-8 lg:px-7 lg:py-9">
      <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
        {String(index).padStart(2, '0')} · {label}
      </div>
      <div
        className={cn(
          'mt-3 sm:mt-4 font-semibold tabular-nums tracking-tight leading-none',
          'text-4xl sm:text-5xl lg:text-6xl',
          valueColour
        )}
      >
        {display}
      </div>
      <div className="mt-3 flex items-center gap-2 flex-wrap text-[10.5px] text-white/65">
        <span className="uppercase tracking-[0.14em]">Target {target}%</span>
        {gap !== null && (
          <span
            className={cn(
              'inline-flex items-center h-5 px-1.5 rounded-md border text-[10px] font-semibold tabular-nums',
              onTarget
                ? 'bg-emerald-500/[0.08] border-emerald-400/30 text-emerald-200'
                : Math.abs(gap) >= 15
                  ? 'bg-red-500/[0.08] border-red-400/30 text-red-200'
                  : 'bg-amber-500/[0.08] border-amber-400/30 text-amber-200'
            )}
          >
            {gap > 0 ? '+' : ''}
            {gap}pp
          </span>
        )}
      </div>
      {sub && <div className="mt-1 text-[10.5px] text-white/55">{sub}</div>}
    </div>
  );
}
