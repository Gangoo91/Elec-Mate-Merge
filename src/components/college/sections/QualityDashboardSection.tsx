/**
 * QualityDashboardSection — Ofsted-ready compliance overview.
 *
 * Auto-generates KPIs from existing student, attendance, ILP, EPA and
 * grade data and surfaces the surrounding evidence chain (SAR, QIP,
 * compliance docs, EPA pass-rate report) so an inspector can move from
 * a top-line number to the underlying evidence in two clicks.
 *
 * Rebuilt on the shared hub language. CollegeDashboard draws the masthead,
 * so this is content only:
 *
 *   print (the one solid volt control) → four KPIs with their gap to target
 *   → needs you → the three secondary measures → direction of travel
 *   → evidence, in two groups of three
 *
 * The hero ("Ofsted-ready metrics" at 48px and a paragraph explaining the
 * page), the numbered `01 · ATTENDANCE` eyebrows, the hairline grid of
 * flat cells and the six colour-toned evidence cards all went. Colour now
 * only encodes state: a KPI below target carries a red gap chip, a declining
 * attendance trend is the red word, everything else is white.
 *
 * Status comparisons are case-insensitive — `college_students.status` and
 * `college_attendance.status` are Capitalised in the live table.
 */

import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { buttonPrimaryCn } from '@/components/forms/fieldStyles';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import {
  HubKpi,
  HubKpiRow,
  HubSectionHeading,
  HubToolGrid,
  HubWorkList,
  type HubTool,
  type HubWorkItem,
} from '@/components/hub/HubPrimitives';

interface QualityDashboardSectionProps {
  onNavigate: (section: CollegeSection) => void;
}

/* Hard-coded Ofsted/awarding-body benchmarks. Attendance target comes from
   per-college settings; the others are sector norms that don't typically
   vary by provider. Keeping them inline avoids forcing every college to
   configure something everyone already agrees on. */
const ILP_COMPLIANCE_TARGET = 95;
const EPA_ON_TRACK_TARGET = 90;
const ACHIEVEMENT_TARGET = 90;
const RETENTION_TARGET = 90;
const TURNAROUND_TARGET_DAYS = 7;

const lc = (s: string | null | undefined) => (s ?? '').toLowerCase();
const isPresent = (s: string | null | undefined) => lc(s) === 'present' || lc(s) === 'late';

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
    const activeStudents = students.filter((s) => lc(s.status) === 'active');

    // Overall Attendance %
    const totalRecords = attendance.length;
    const presentRecords = attendance.filter((a) => isPresent(a.status)).length;
    const attendancePercent =
      totalRecords > 0 ? Math.round((presentRecords / totalRecords) * 100) : null;

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
        : null;

    // EPA On Track %
    const epaStudents = epaRecords.length;
    const epaOnTrack = epaRecords.filter(
      (e) =>
        e.status === 'In Progress' ||
        e.status === 'Pre-Gateway' ||
        e.status === 'Gateway Ready' ||
        e.status === 'Complete'
    ).length;
    const epaOnTrackPercent =
      epaStudents > 0 ? Math.round((epaOnTrack / epaStudents) * 100) : null;

    // Achievement Rate % — Ofsted norm is Completed / (Completed + Withdrawn).
    const completedStudents = students.filter((s) => lc(s.status) === 'completed').length;
    const withdrawnStudents = students.filter((s) => lc(s.status) === 'withdrawn').length;
    const achievementDenominator = completedStudents + withdrawnStudents;
    const achievementPercent =
      achievementDenominator > 0
        ? Math.round((completedStudents / achievementDenominator) * 100)
        : null; // null = no leavers yet → render as "—" not "0%"

    // Retention Rate — same population, different question.
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
      const weekPresent = weekRecords.filter((a) => isPresent(a.status)).length;
      const pct = weekRecords.length > 0 ? (weekPresent / weekRecords.length) * 100 : 0;
      weeks.push(pct);
      weeklyPoints.push({
        week_ending: weekEnd.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
        attendance_pct: weekRecords.length > 0 ? Math.round(pct) : 0,
        sessions: weekRecords.length,
      });
    }
    weeklyPoints.reverse();

    let attendanceTrend: 'Improving' | 'Stable' | 'Declining' = 'Stable';
    if (weeks.length >= 4) {
      const recentAvg = (weeks[0] + weeks[1]) / 2;
      const olderAvg = (weeks[2] + weeks[3]) / 2;
      if (recentAvg - olderAvg > 2) attendanceTrend = 'Improving';
      else if (olderAvg - recentAvg > 2) attendanceTrend = 'Declining';
    }
    const sessionsCharted = weeklyPoints.reduce((sum, p) => sum + p.sessions, 0);

    // Assessment Turnaround (average days from created_at to assessed_at)
    const gradedAssessments = grades.filter((g) => g.assessed_at && g.created_at);
    let avgTurnaround: number | null = null;
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
      const present = studentRecords.filter((a) => isPresent(a.status)).length;
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
      weeklyPoints,
      sessionsCharted,
      epaStudents,
      gradedCount: gradedAssessments.length,
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-elec-yellow border-t-transparent" />
      </div>
    );
  }

  /* ── Needs you ─────────────────────────────────────────────────────── */
  const work: HubWorkItem[] = [
    metrics.lowAttendanceStudents.length > 0 && {
      id: 'low-attendance',
      title: 'Low attendance',
      reason: `${metrics.lowAttendanceStudents.length} learner${metrics.lowAttendanceStudents.length === 1 ? '' : 's'} below ${lowAttendance}%`,
      trailing: String(metrics.lowAttendanceStudents.length),
      urgent: true,
      onClick: () => onNavigate('attendance'),
    },
    metrics.overdueILPs.length > 0 && {
      id: 'overdue-ilps',
      title: 'Overdue ILP reviews',
      reason: `${metrics.overdueILPs.length} review${metrics.overdueILPs.length === 1 ? '' : 's'} past due`,
      trailing: String(metrics.overdueILPs.length),
      urgent: true,
      onClick: () => onNavigate('ilpmanagement'),
    },
    metrics.epaGatewayDueSoon.length > 0 && {
      id: 'epa-gateway',
      title: 'EPA gateway due soon',
      reason: `${metrics.epaGatewayDueSoon.length} within the next two weeks`,
      trailing: String(metrics.epaGatewayDueSoon.length),
      onClick: () => onNavigate('epatracking'),
    },
    metrics.pendingAssessments.length > 0 && {
      id: 'pending-assessments',
      title: 'Assessments to mark',
      reason: `${metrics.pendingAssessments.length} awaiting a grade`,
      trailing: String(metrics.pendingAssessments.length),
      onClick: () => onNavigate('grading'),
    },
  ].filter(Boolean) as HubWorkItem[];

  /* ── Evidence, two groups of three ─────────────────────────────────── */
  const judgementAreas: HubTool[] = [
    {
      id: 'intent',
      title: 'Intent',
      description: 'Curriculum planning, sequencing and coverage — courses and schemes of work.',
      onClick: () => onNavigate('courses'),
    },
    {
      id: 'implementation',
      title: 'Implementation',
      description: 'Teaching, learning and assessment — lesson plans and feedback.',
      onClick: () => onNavigate('lessonplans'),
    },
    {
      id: 'impact',
      title: 'Impact',
      description: 'Achievement, progression and destinations — grades and EPA outcomes.',
      onClick: () => onNavigate('grading'),
    },
  ];

  const documents: HubTool[] = [
    {
      id: 'sar',
      title: 'SAR draft',
      description: 'The current self-assessment report. Draft, edit, approve.',
      onClick: () => navigate('/college/compliance/sar'),
    },
    {
      id: 'qip',
      title: 'QIP tracker',
      description: 'Open QIP actions, owners and due dates.',
      onClick: () => navigate('/college/compliance/qip'),
    },
    {
      id: 'pass-rate',
      title: 'Pass-rate report',
      description: 'Per-cohort distinction / merit / pass / fail roll-up, exportable as CSV.',
      onClick: () => navigate('/college/reports?r=epa_pass_rate'),
    },
  ];

  const trendTone =
    metrics.attendanceTrend === 'Declining'
      ? 'text-red-300'
      : metrics.attendanceTrend === 'Improving'
        ? 'text-emerald-300'
        : 'text-white';

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Inspector hand-over: native print → "Save as PDF" gives a clean
          snapshot of the whole dashboard. */}
      <motion.div variants={itemVariants} initial="hidden" animate="visible" className="no-print">
        <button
          type="button"
          onClick={() => window.print()}
          className={cn(buttonPrimaryCn, 'w-full px-5 sm:w-auto')}
          title="Print this dashboard as a quality pack snapshot — use the browser's 'Save as PDF' to hand over"
        >
          Print quality pack
        </button>
      </motion.div>

      <HubKpiRow>
        <KpiWithTarget
          accent
          label="Attendance"
          value={metrics.attendancePercent}
          target={attendanceTarget}
          context={
            attendance.length > 0
              ? `${attendance.length} register entries`
              : 'No registers taken yet'
          }
          onClick={() => onNavigate('attendance')}
        />
        <KpiWithTarget
          label="ILP compliance"
          value={metrics.ilpCompliancePercent}
          target={ILP_COMPLIANCE_TARGET}
          context="Reviewed in the last six weeks"
          onClick={() => onNavigate('ilpmanagement')}
        />
        <KpiWithTarget
          label="EPA on track"
          value={metrics.epaOnTrackPercent}
          target={EPA_ON_TRACK_TARGET}
          context={
            metrics.epaStudents > 0
              ? `${metrics.epaStudents} learner${metrics.epaStudents === 1 ? '' : 's'} on an EPA record`
              : 'No EPA records yet'
          }
          onClick={() => onNavigate('epatracking')}
        />
        <KpiWithTarget
          label="Achievement"
          value={metrics.achievementPercent}
          target={ACHIEVEMENT_TARGET}
          context={
            metrics.completedStudents + metrics.withdrawnStudents === 0
              ? 'No leavers yet'
              : `${metrics.completedStudents} of ${metrics.completedStudents + metrics.withdrawnStudents} leavers achieved`
          }
        />
      </HubKpiRow>

      {work.length > 0 ? (
        <HubWorkList items={work} unit="alert" />
      ) : (
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          <HubSectionHeading>Needs you</HubSectionHeading>
          <motion.div
            variants={itemVariants}
            className={cn(
              '-mx-4 border-y border-elec-yellow/35 px-4 py-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:px-5',
              CARD_SURFACE
            )}
          >
            <p className="text-[12.5px] leading-snug text-white">
              Nothing outstanding. No overdue ILP reviews, no learner below {lowAttendance}%
              attendance, nothing waiting to be marked.
            </p>
          </motion.div>
        </motion.section>
      )}

      {/* Secondary measures — a list, not a second scoreboard. */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        <HubSectionHeading>Beyond the headline</HubSectionHeading>
        <motion.div
          variants={itemVariants}
          className={cn(
            '-mx-4 overflow-hidden border-y border-elec-yellow/35 sm:mx-0 sm:rounded-2xl sm:border-x',
            CARD_SURFACE
          )}
        >
          <ul className="divide-y divide-white/[0.10]">
            <MeasureRow
              title="Retention"
              reason="Active and completed learners out of everyone who started"
              value={metrics.retentionPercent == null ? '—' : `${metrics.retentionPercent}%`}
              tone={
                metrics.retentionPercent != null && metrics.retentionPercent < RETENTION_TARGET
                  ? 'text-elec-yellow'
                  : 'text-white'
              }
            />
            <MeasureRow
              title="Attendance direction"
              reason="Last two weeks against the two before"
              value={metrics.attendanceTrend}
              tone={trendTone}
            />
            <MeasureRow
              title="Marking turnaround"
              reason={
                metrics.gradedCount > 0
                  ? `Average days from submission to grade · target ${TURNAROUND_TARGET_DAYS} days or fewer`
                  : 'Nothing graded yet'
              }
              value={metrics.avgTurnaround == null ? '—' : `${metrics.avgTurnaround}d`}
              tone={
                metrics.avgTurnaround != null && metrics.avgTurnaround > TURNAROUND_TARGET_DAYS
                  ? 'text-elec-yellow'
                  : 'text-white'
              }
            />
          </ul>
        </motion.div>
      </motion.section>

      {/* Direction of travel — the one chart on the page. Single series, so
          no legend: the heading names it. The low threshold is the only
          coloured line, because it is the only one that means "problem". */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        <motion.div variants={itemVariants} className="flex items-end justify-between gap-4">
          <HubSectionHeading>Attendance, last 12 weeks</HubSectionHeading>
          <span className={cn('text-[11px] font-semibold', trendTone)}>
            {metrics.attendanceTrend}
          </span>
        </motion.div>
        <motion.div
          variants={itemVariants}
          className={cn(
            '-mx-4 border-y border-elec-yellow/35 px-3 py-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:px-5',
            CARD_SURFACE
          )}
        >
          {metrics.sessionsCharted === 0 ? (
            <p className="text-[12.5px] leading-snug text-white">
              No register entries in the last 12 weeks, so there is no trend to draw yet.
            </p>
          ) : (
            <>
              <div className="h-56 w-full sm:h-64">
                <ResponsiveContainer>
                  <LineChart
                    data={metrics.weeklyPoints}
                    margin={{ top: 8, right: 12, left: -16, bottom: 0 }}
                  >
                    <CartesianGrid stroke="rgba(255,255,255,0.06)" strokeDasharray="2 4" vertical={false} />
                    <XAxis
                      dataKey="week_ending"
                      tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.85)' }}
                      tickLine={false}
                      axisLine={{ stroke: 'rgba(255,255,255,0.12)' }}
                      minTickGap={20}
                    />
                    <YAxis
                      domain={[0, 100]}
                      tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.85)' }}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(v: number) => `${v}%`}
                    />
                    <Tooltip
                      cursor={{ stroke: 'rgba(255,255,255,0.25)', strokeWidth: 1 }}
                      contentStyle={{
                        backgroundColor: 'hsl(0 0% 8%)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: '0.75rem',
                        fontSize: 11,
                        color: '#fff',
                      }}
                      labelStyle={{ color: '#fff', fontWeight: 600 }}
                      itemStyle={{ color: '#fff' }}
                      formatter={(v: number, _name: string, item: { payload?: { sessions?: number } }) =>
                        item.payload?.sessions === 0
                          ? ['no sessions', 'Attendance']
                          : [`${v}% (${item.payload?.sessions ?? 0} sessions)`, 'Attendance']
                      }
                    />
                    <ReferenceLine
                      y={lowAttendance}
                      stroke="rgba(252,165,165,0.8)"
                      strokeDasharray="3 4"
                      label={{
                        value: `Low ${lowAttendance}%`,
                        position: 'insideTopRight',
                        fill: 'rgba(252,165,165,0.95)',
                        fontSize: 10,
                      }}
                    />
                    <ReferenceLine
                      y={attendanceTarget}
                      stroke="rgba(255,255,255,0.35)"
                      strokeDasharray="3 4"
                      label={{
                        value: `Target ${attendanceTarget}%`,
                        position: 'insideTopRight',
                        fill: 'rgba(255,255,255,0.9)',
                        fontSize: 10,
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="attendance_pct"
                      stroke="hsl(47 100% 52%)"
                      strokeWidth={2}
                      dot={{ r: 3, fill: 'hsl(47 100% 52%)', stroke: 'hsl(0 0% 8%)', strokeWidth: 2 }}
                      activeDot={{ r: 5, fill: 'hsl(47 100% 52%)', stroke: 'hsl(0 0% 8%)', strokeWidth: 2 }}
                      name="Attendance"
                      isAnimationActive={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="mt-2 text-[11px] leading-snug text-white">
                Weekly attendance across every register. Weeks with no sessions read as 0%.
              </p>
            </>
          )}
        </motion.div>
      </motion.section>

      <HubToolGrid label="Evidence by judgement area" cards={judgementAreas} columns="three" />

      <HubToolGrid label="Inspection documents" cards={documents} columns="three" />
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */

/** A KPI with its sector target. The gap is the delta chip — red below
 *  target, emerald at or above — so the row reads at a glance. Renders "—"
 *  when there is no underlying data, never a misleading 0%. */
function KpiWithTarget({
  label,
  value,
  target,
  context,
  accent,
  onClick,
}: {
  label: string;
  value: number | null;
  target: number;
  context?: string;
  accent?: boolean;
  onClick?: () => void;
}) {
  const gap = value == null ? null : value - target;
  return (
    <HubKpi
      accent={accent}
      label={label}
      value={value == null ? '—' : `${value}%`}
      delta={gap == null ? undefined : `${gap > 0 ? '+' : ''}${gap}pp`}
      direction={gap == null ? 'flat' : gap >= 0 ? 'up' : 'down'}
      sentiment={gap == null ? 'neutral' : gap >= 0 ? 'good' : 'bad'}
      verdict={
        gap == null
          ? `Target ${target}% — no data yet`
          : gap >= 0
            ? `On target (${target}%)`
            : `${Math.abs(gap)}pp below the ${target}% target`
      }
      context={context}
      onClick={onClick}
    />
  );
}

function MeasureRow({
  title,
  reason,
  value,
  tone,
}: {
  title: string;
  reason: string;
  value: string;
  tone: string;
}) {
  return (
    <li className="flex items-center gap-3 px-4 py-3.5 sm:px-5">
      <span aria-hidden="true" className="h-8 w-[3px] shrink-0 rounded-full bg-white/[0.25]" />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[14px] font-semibold leading-tight text-white">
          {title}
        </span>
        <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">{reason}</span>
      </span>
      <span className={cn('shrink-0 text-[15px] font-semibold tabular-nums', tone)}>{value}</span>
    </li>
  );
}
