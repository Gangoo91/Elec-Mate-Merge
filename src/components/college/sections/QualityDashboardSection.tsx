/**
 * QualityDashboardSection — the college's quality figures and the evidence
 * behind them (College Hub redesign, 7 Oct 2026).
 *
 *   header (one sentence: which measures are below target) + Download PDF
 *   → each measure vs its target (chart) → needs you → learners at risk, explained (ELE-1909)
 *   → attendance trend + beyond the headline → evidence links
 *
 * Figures come from student, attendance, ILP, EPA and grade data already in
 * the College context. Status comparisons are case-insensitive:
 * `college_students.status` and `college_attendance.status` are Capitalised
 * in the live table.
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
import { itemVariants } from '@/components/college/primitives';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import { CollegeSectionTitle } from '@/components/college/ui/CollegeUi';
import { VisHead } from '@/components/college/student360/Student360Visuals';
import { StatusPill } from '@/components/college/quality/QualityKit';
import {
  LinkGroup,
  QBTN_PRIMARY,
  QCARD,
  QLIST,
  QPanel,
  QualityHeader,
  QualityLoading,
  QualityScreen,
  WorkRows,
  type WorkRow,
} from '@/components/college/quality/QualityHubKit';
import { joinAnd, plural } from '@/components/college/quality/qualityText';
import { RiskFlagsPanel } from '@/components/college/quality/RiskFlagsPanel';
import { useLearnerDocumentDownload } from '@/lib/documents/useLearnerDocumentDownload';
import { useCollegeEpaPace } from '@/hooks/college/useCohortCriteriaGaps';

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

/** Lower-case the first letter for mid-sentence use, but keep acronyms (EPA). */
const lowerFirst = (s: string) =>
  /^[A-Z]{2}/.test(s) ? s : `${s.charAt(0).toLowerCase()}${s.slice(1)}`;
const lc = (s: string | null | undefined) => (s ?? '').toLowerCase();
const isPresent = (s: string | null | undefined) => lc(s) === 'present' || lc(s) === 'late';

const HELP: PageHelpContent = {
  id: 'college-quality-dashboard',
  title: 'Quality dashboard',
  what: 'The college’s headline quality figures, each against its target, with the learners who need you and the evidence an inspector will ask to see behind each number.',
  steps: [
    {
      title: 'Read the figures',
      body: 'Each figure shows how far it is above or below target. Orange means below target. Tap a figure to open the records behind it.',
    },
    {
      title: 'Work through Needs you',
      body: 'Low attendance, overdue learning plan reviews, EPA gateways and marking, each one tap from the list to fix.',
    },
    {
      title: 'Contact learners at risk',
      body: 'Each flagged learner shows why, in plain words, and what to do. Log contact once you have spoken to them; it is saved as a 1-2-1 note on their record.',
    },
    {
      title: 'Download the report',
      body: 'Download PDF makes a clean copy of these figures, the learners at risk and the attendance trend to hand over.',
    },
  ],
  notes: [
    {
      title: 'How the figures are worked out',
      body: 'Attendance: present or late out of every register mark. Learning plans: active learners reviewed in the last six weeks. Achievement: completed out of everyone who has left. Retention: active and completed out of everyone who started.',
    },
    {
      title: 'EPA on track',
      body: 'For each active learner: the share of their qualification’s criteria passed (or IQA confirmed), against the share of their time on programme gone from start date to expected end date. A learner is on pace when the share passed is no more than 10 percentage points behind the share of time gone. Learners with no start or end date, or no qualification with criteria, are left out and said so.',
    },
    {
      title: 'Risk levels',
      body: 'Worked out overnight from coverage against time on programme, off-the-job hours, portfolio, observations, attendance and open pastoral flags. Critical and high are listed; contacted means a 1-2-1 or intervention note since the learner was flagged.',
    },
  ],
  legend: [
    { swatch: 'bg-emerald-500', label: 'At or above target' },
    { swatch: 'bg-orange-400', label: 'Below target, or not yet contacted' },
    { swatch: 'bg-red-500', label: 'Critical risk' },
  ],
};

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
  // ELE-2017: the PDF is built server-side from the live record, not printed.
  const pdf = useLearnerDocumentDownload();
  // EPA on track (8 Oct 2026): criteria passed keeping pace with time on
  // programme, worked out on the server for every active learner.
  const epaPace = useCollegeEpaPace();
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
    const weeklyPoints: { week_ending: string; attendance_pct: number | null; sessions: number }[] =
      [];
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
      // A week with no registers is a gap in the line, not 0% attendance.
      weeklyPoints.push({
        week_ending: weekEnd.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
        attendance_pct: weekRecords.length > 0 ? Math.round(pct) : null,
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
      // One decimal: rounding to whole days showed "0 days" for same-day marking.
      avgTurnaround = Math.round((totalDays / gradedAssessments.length) * 10) / 10;
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
      <QualityScreen>
        <QualityHeader
          eyebrow="Quality & compliance"
          title="Quality dashboard"
          summary="Reading your records…"
          help={HELP}
        />
        <QualityLoading />
      </QualityScreen>
    );
  }

  /* ── Needs you ─────────────────────────────────────────────────────── */
  const work: WorkRow[] = [
    metrics.lowAttendanceStudents.length > 0 && {
      id: 'low-attendance',
      title: 'Low attendance',
      sub: `${plural(metrics.lowAttendanceStudents.length, 'learner', 'learners')} below ${lowAttendance}%`,
      trailing: 'See who',
      warn: true,
      onClick: () => onNavigate('attendance'),
    },
    metrics.overdueILPs.length > 0 && {
      id: 'overdue-ilps',
      title: 'Overdue learning plan reviews',
      sub: `${plural(metrics.overdueILPs.length, 'review', 'reviews')} past due`,
      trailing: 'Review',
      warn: true,
      onClick: () => onNavigate('ilpmanagement'),
    },
    metrics.epaGatewayDueSoon.length > 0 && {
      id: 'epa-gateway',
      title: 'EPA gateway due soon',
      sub: `${plural(metrics.epaGatewayDueSoon.length, 'learner', 'learners')} within the next two weeks`,
      trailing: 'Prepare',
      onClick: () => onNavigate('epatracking'),
    },
    metrics.pendingAssessments.length > 0 && {
      id: 'pending-assessments',
      title: 'Assessments to mark',
      sub: `${plural(metrics.pendingAssessments.length, 'assessment', 'assessments')} awaiting a grade`,
      trailing: 'Mark',
      onClick: () => onNavigate('grading'),
    },
  ].filter(Boolean) as WorkRow[];

  const measures: Array<{
    label: string;
    value: number | null;
    target: number;
    onClick?: () => void;
    sub: string;
  }> = [
    {
      label: 'Attendance',
      value: metrics.attendancePercent,
      target: attendanceTarget,
      onClick: () => onNavigate('attendance'),
      sub:
        attendance.length > 0 ? `${attendance.length} register entries` : 'No registers taken yet',
    },
    {
      label: 'Learning plans reviewed',
      value: metrics.ilpCompliancePercent,
      target: ILP_COMPLIANCE_TARGET,
      onClick: () => onNavigate('ilpmanagement'),
      sub: 'Reviewed in the last six weeks',
    },
    {
      label: 'EPA on track',
      value:
        epaPace.data && epaPace.data.measured > 0
          ? Math.round((epaPace.data.on_pace / epaPace.data.measured) * 100)
          : null,
      target: EPA_ON_TRACK_TARGET,
      onClick: () => onNavigate('epatracking'),
      sub: epaPace.isLoading
        ? 'Working out who is on pace…'
        : epaPace.error
          ? 'Could not work it out just now'
          : epaPace.data && epaPace.data.measured > 0
            ? `${epaPace.data.on_pace} of ${plural(epaPace.data.measured, 'learner', 'learners')} on pace for EPA${epaPace.data.unmeasured > 0 ? `, ${epaPace.data.unmeasured} without dates or criteria` : ''}`
            : 'No learners with dates and criteria yet',
    },
    {
      label: 'Achievement',
      value: metrics.achievementPercent,
      target: ACHIEVEMENT_TARGET,
      sub:
        metrics.completedStudents + metrics.withdrawnStudents === 0
          ? 'No leavers yet'
          : `${metrics.completedStudents} of ${metrics.completedStudents + metrics.withdrawnStudents} leavers achieved`,
    },
    {
      label: 'Retention',
      value: metrics.retentionPercent,
      target: RETENTION_TARGET,
      sub: 'Active and completed out of everyone who started',
    },
  ];

  /* The sentence under the title: which measures are below target, in words. */
  const below = measures.filter((m) => m.value != null && m.value < m.target);
  const noData = measures.filter((m) => m.value == null);
  const summary = (() => {
    const scored = measures.length - noData.length;
    if (scored === 0)
      return 'No figures yet. They fill in as registers, reviews and EPA records are added.';
    const head =
      below.length === 0
        ? `All ${scored} measures with data are on target.`
        : `${below.length} of ${scored} measures below target: ${joinAnd(below.map((m) => `${lowerFirst(m.label)} at ${m.value}% (target ${m.target}%)`))}.`;
    return head;
  })();
  const summarySub =
    noData.length > 0
      ? `No data yet for ${joinAnd(noData.map((m) => lowerFirst(m.label)))}.`
      : undefined;

  const trendTone =
    metrics.attendanceTrend === 'Declining'
      ? 'warn'
      : metrics.attendanceTrend === 'Improving'
        ? 'good'
        : 'neutral';

  return (
    <QualityScreen>
      <QualityHeader
        eyebrow="Quality & compliance"
        title="Quality dashboard"
        summary={summary}
        sub={summarySub}
        help={HELP}
        primary={
          <button
            type="button"
            onClick={() => void pdf.download({ kind: 'quality_report' })}
            disabled={pdf.busy}
            className={cn(QBTN_PRIMARY, 'no-print')}
          >
            {pdf.busy ? 'Making the PDF…' : 'Download PDF'}
          </button>
        }
      />

      {/* Each measure against its target, on one scale. */}
      <motion.div variants={itemVariants} className={QCARD}>
        <VisHead
          title="Against target"
          sub="Each bar is the figure; the white line is the target. Orange is below target."
        />
        <ul className="mt-5 space-y-4">
          {measures.map((m) => {
            const below = m.value != null && m.value < m.target;
            const inner = (
              <>
                <span className="col-span-2 min-w-0 sm:col-span-1">
                  <span className="block text-[13px] font-semibold text-white">{m.label}</span>
                  <span className="block text-[12px] text-white">{m.sub}</span>
                </span>
                <span className="relative h-3 overflow-hidden rounded-full bg-white/[0.08]">
                  {m.value != null && (
                    <motion.span
                      className={cn(
                        'absolute inset-y-0 left-0 rounded-full',
                        below ? 'bg-orange-400' : 'bg-emerald-500'
                      )}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.max(0, Math.min(100, m.value))}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  )}
                  <span
                    className="absolute inset-y-[-2px] w-[2px] bg-white"
                    style={{ left: `${m.target}%` }}
                    aria-hidden
                  />
                </span>
                <span
                  className={cn(
                    'text-right text-[14px] font-bold tabular-nums',
                    below ? 'text-orange-400' : 'text-white'
                  )}
                >
                  {m.value == null ? 'None' : `${m.value}%`}
                </span>
              </>
            );
            const cls =
              'grid w-full grid-cols-[1fr_3.5rem] items-center gap-x-3 gap-y-1.5 text-left sm:grid-cols-[minmax(0,15rem)_1fr_4rem]';
            return (
              <li key={m.label}>
                {m.onClick ? (
                  <button
                    type="button"
                    onClick={m.onClick}
                    className={cn(
                      cls,
                      'min-h-[44px] touch-manipulation rounded-xl hover:bg-white/[0.03]'
                    )}
                  >
                    {inner}
                  </button>
                ) : (
                  <div className={cn(cls, 'min-h-[44px]')}>{inner}</div>
                )}
              </li>
            );
          })}
        </ul>
      </motion.div>

      <section className="space-y-4">
        <CollegeSectionTitle
          title="Needs you"
          sub={work.length > 0 ? `${plural(work.length, 'thing', 'things')} to sort` : undefined}
        />
        {work.length > 0 ? (
          <WorkRows rows={work} />
        ) : (
          <QPanel>
            <p className="text-[14px] font-semibold text-white">Nothing outstanding</p>
            <p className="mt-1 text-[13px] text-white">
              No overdue learning plan reviews, no learner below {lowAttendance}% attendance,
              nothing waiting to be marked.
            </p>
          </QPanel>
        )}
      </section>

      <RiskFlagsPanel
        students={students.map((s) => ({ id: s.id, name: s.name, status: s.status }))}
      />

      <div className="grid grid-cols-1 items-stretch gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        {/* Direction of travel. Single series; the low line is the only
            coloured one because it is the only one that means a problem. */}
        <motion.div variants={itemVariants} className={QCARD}>
          <VisHead
            title="Attendance, last 12 weeks"
            sub="Weekly attendance across every register"
            aside={<StatusPill tone={trendTone}>{metrics.attendanceTrend}</StatusPill>}
          />
          <div className="mt-4">
            {metrics.sessionsCharted === 0 ? (
              <p className="text-[13px] leading-snug text-white">
                No register entries in the last 12 weeks, so there is no trend to draw yet.
              </p>
            ) : (
              <div className="h-56 w-full sm:h-64">
                <ResponsiveContainer>
                  <LineChart
                    data={metrics.weeklyPoints}
                    margin={{ top: 8, right: 12, left: -16, bottom: 0 }}
                  >
                    <CartesianGrid
                      stroke="rgba(255,255,255,0.06)"
                      strokeDasharray="2 4"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="week_ending"
                      tick={{ fontSize: 12, fill: 'white' }}
                      tickLine={false}
                      axisLine={{ stroke: 'rgba(255,255,255,0.12)' }}
                      minTickGap={20}
                    />
                    <YAxis
                      domain={[0, 100]}
                      tick={{ fontSize: 12, fill: 'white' }}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(v: number) => `${v}%`}
                    />
                    <Tooltip
                      cursor={{ stroke: 'rgba(255,255,255,0.25)', strokeWidth: 1 }}
                      contentStyle={{
                        backgroundColor: 'hsl(0 0% 8%)',
                        border: '1px solid rgba(255,255,255,0.14)',
                        borderRadius: '0.75rem',
                        fontSize: 12,
                        color: '#fff',
                      }}
                      labelStyle={{ color: '#fff', fontWeight: 600 }}
                      itemStyle={{ color: '#fff' }}
                      formatter={(
                        v: number | null,
                        _name: string,
                        item: { payload?: { sessions?: number } }
                      ) =>
                        !item.payload?.sessions
                          ? ['no registers taken', 'Attendance']
                          : [`${v}% (${item.payload.sessions} register marks)`, 'Attendance']
                      }
                    />
                    <ReferenceLine
                      y={lowAttendance}
                      stroke="hsl(27 96% 61%)"
                      strokeDasharray="3 4"
                      label={{
                        value: `Low ${lowAttendance}%`,
                        position: 'insideTopRight',
                        fill: 'white',
                        fontSize: 12,
                      }}
                    />
                    <ReferenceLine
                      y={attendanceTarget}
                      stroke="rgba(255,255,255,0.4)"
                      strokeDasharray="3 4"
                      label={{
                        value: `Target ${attendanceTarget}%`,
                        position: 'insideTopRight',
                        fill: 'white',
                        fontSize: 12,
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="attendance_pct"
                      stroke="hsl(47 100% 52%)"
                      strokeWidth={2}
                      dot={{
                        r: 3,
                        fill: 'hsl(47 100% 52%)',
                        stroke: 'hsl(0 0% 8%)',
                        strokeWidth: 2,
                      }}
                      activeDot={{
                        r: 5,
                        fill: 'hsl(47 100% 52%)',
                        stroke: 'hsl(0 0% 8%)',
                        strokeWidth: 2,
                      }}
                      name="Attendance"
                      connectNulls={false}
                      isAnimationActive={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
            {metrics.weeklyPoints.some((p) => p.sessions === 0) && metrics.sessionsCharted > 0 && (
              <p className="mt-2 text-[12px] leading-snug text-white">
                Weeks with no registers taken are left as a gap.
              </p>
            )}
          </div>
        </motion.div>

        <section className="flex flex-col gap-3">
          <p className="px-1 text-[15px] font-semibold tracking-tight text-white">
            Beyond the headline
          </p>
          <ul className={cn(QLIST, 'flex-1')}>
            <MeasureRow
              title="Attendance direction"
              reason="Last two weeks against the two before"
              value={metrics.attendanceTrend}
              warn={metrics.attendanceTrend === 'Declining'}
            />
            <MeasureRow
              title="Marking turnaround"
              reason={
                metrics.gradedCount > 0
                  ? `Average days to grade · target ${TURNAROUND_TARGET_DAYS} or fewer`
                  : 'Nothing graded yet'
              }
              value={
                metrics.avgTurnaround == null
                  ? 'None'
                  : metrics.avgTurnaround < 1
                    ? 'Same day'
                    : `${metrics.avgTurnaround} ${metrics.avgTurnaround === 1 ? 'day' : 'days'}`
              }
              warn={metrics.avgTurnaround != null && metrics.avgTurnaround > TURNAROUND_TARGET_DAYS}
            />
          </ul>
        </section>
      </div>

      {/* Neutral wording on purpose: the inspection framework's own headings
          live on the Ofsted lens page (ELE-2021), not here. */}
      <LinkGroup
        title="Evidence behind the figures"
        items={[
          {
            title: 'Curriculum planning',
            body: 'Courses, sequencing and coverage: the curriculum and schemes of work.',
            onClick: () => onNavigate('courses'),
          },
          {
            title: 'Teaching and assessment',
            body: 'Lesson plans, feedback and how assessment is carried out.',
            onClick: () => onNavigate('lessonplans'),
          },
          {
            title: 'Achievement and outcomes',
            body: 'Grades, EPA results, progression and destinations.',
            onClick: () => onNavigate('grading'),
          },
        ]}
      />

      <LinkGroup
        title="Inspection documents"
        items={[
          {
            title: 'SAR draft',
            body: 'The current self-assessment report. Draft, edit, approve.',
            onClick: () => navigate('/college/compliance/sar'),
          },
          {
            title: 'QIP tracker',
            body: 'Open improvement plan actions, owners and due dates.',
            onClick: () => navigate('/college/compliance/qip'),
          },
          {
            title: 'Pass-rate report',
            body: 'Distinction, merit, pass and fail by cohort, as a CSV.',
            onClick: () => navigate('/college/reports?r=epa_pass_rate'),
          },
        ]}
      />
    </QualityScreen>
  );
}

function MeasureRow({
  title,
  reason,
  value,
  warn,
}: {
  title: string;
  reason: string;
  value: string;
  warn?: boolean;
}) {
  return (
    <li className="flex min-h-[64px] items-center gap-3 px-4 py-3 sm:px-5">
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[14.5px] font-semibold leading-tight text-white">
          {title}
        </span>
        <span className="mt-1 block text-[12.5px] leading-tight text-white">{reason}</span>
      </span>
      <span
        className={cn(
          'shrink-0 text-[15px] font-bold tabular-nums',
          warn ? 'text-orange-300' : 'text-white'
        )}
      >
        {value}
      </span>
    </li>
  );
}
