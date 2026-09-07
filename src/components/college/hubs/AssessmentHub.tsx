/**
 * Assessment Hub — marking, attendance, learning plans, off-the-job and EPA.
 *
 * Rebuilt on the shared hub shell (`@/components/hub/HubPrimitives`). The
 * masthead is drawn by CollegeDashboard; this is only the body:
 *
 *   quick start → KPI row → mark & record → learner progress → OTJ & EPA →
 *   quality & reports
 *
 * What went, and why:
 *
 * The HERO and the numbered, colour-toned cards (amber, green, orange, blue,
 * purple, emerald, cyan, yellow — eight tones on one page, none of them
 * meaning anything). Colour now only encodes state: a volt figure means work
 * outstanding.
 *
 * The "AI" PILLS on four cards. A chip saying AI is not information; the
 * description says what the tool does.
 *
 * A group of NINE cards and a group of SIX. The grid is auto-fit, and auto-fit
 * only collapses tracks that are empty for the whole grid, so nine drew
 * 4 + 4 + 1 with three holes. Every group is now exactly four.
 *
 * One figure corrected: "Attendance — rolling average" was every attendance
 * row the college has ever recorded. It is now the last 30 days, and says so;
 * it falls back to all-time (and says that) only when there is nothing in
 * the window.
 */
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RecordGradeSheet } from '@/components/college/sheets/RecordGradeSheet';
import { CalibrationSessionSheet } from '@/components/college/sheets/CalibrationSessionSheet';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import { usePendingGrades } from '@/hooks/college/useCollegeGrades';
import { useOverdueILPReviews } from '@/hooks/college/useCollegeILP';
import { useCollegeEPAs } from '@/hooks/college/useCollegeEPA';
import { useCollegeAttendance } from '@/hooks/college/useCollegeAttendance';
import { useWorkQueue } from '@/hooks/college/useWorkQueue';
import {
  HubQuickStart,
  HubKpi,
  HubKpiRow,
  HubToolGrid,
  type HubTool,
  type HubQuickAction,
} from '@/components/hub/HubPrimitives';

interface AssessmentHubProps {
  onNavigate: (section: CollegeSection) => void;
}

const DAY_MS = 86_400_000;

export function AssessmentHub({ onNavigate }: AssessmentHubProps) {
  const navigate = useNavigate();
  const { data: pendingGrades = [] } = usePendingGrades();
  const { data: overdueILPs = [] } = useOverdueILPReviews();
  const { data: epaRecords = [] } = useCollegeEPAs();
  const { data: attendance = [] } = useCollegeAttendance();
  const { stats: workStats } = useWorkQueue();
  const [gradeSheetOpen, setGradeSheetOpen] = useState(false);
  const [calibrationOpen, setCalibrationOpen] = useState(false);

  const pendingAssessments = pendingGrades.length;
  const overdueILPReviews = overdueILPs.length;
  const gatewayReady = epaRecords.filter((e) => e.status === 'Gateway Ready').length;
  const studentsAtGateway = epaRecords.filter(
    (e) => e.status === 'Pre-Gateway' || e.status === 'Gateway Ready'
  ).length;
  const pendingWork = workStats.total;

  /*
   * Present or Late counts as attended — the same rule the per-learner and
   * per-cohort rates in collegeAttendanceService use, so this figure agrees
   * with the ones on the Attendance page.
   */
  const attendanceRate = useMemo(() => {
    const since = new Date(Date.now() - 30 * DAY_MS).toISOString().slice(0, 10);
    const recent = attendance.filter((a) => a.date >= since);
    const rows = recent.length > 0 ? recent : attendance;
    if (rows.length === 0) return null;
    const attended = rows.filter((a) => a.status === 'Present' || a.status === 'Late').length;
    return {
      pct: Math.round((attended / rows.length) * 100),
      window: recent.length > 0 ? 'last 30 days' : 'all recorded sessions',
      sessions: rows.length,
    };
  }, [attendance]);

  /*
   * ── Start something ──────────────────────────────────────────────────
   * Recording a grade is the thing an assessor most often comes here to do,
   * so it takes the single solid volt card.
   */
  const quickStart: HubQuickAction[] = [
    {
      title: 'Record a grade',
      description: 'Mark a piece of work',
      onClick: () => setGradeSheetOpen(true),
      primary: true,
    },
    {
      title: 'Take a register',
      description: 'Attendance for a class',
      onClick: () => onNavigate('attendance'),
    },
    {
      title: 'Calibration session',
      description: 'Every tutor marks the same sample',
      onClick: () => setCalibrationOpen(true),
    },
    {
      title: 'Generate an ILP',
      description: 'A learning plan from live data',
      onClick: () => onNavigate('aiilpgenerator'),
    },
  ];

  /*
   * ── Tool groups ──────────────────────────────────────────────────────
   * Four groups of four. A card reports a figure when it has one and says
   * what it is for when it doesn't — never both.
   */
  const markAndRecord: HubTool[] = [
    {
      id: 'grading',
      title: 'Grading',
      onClick: () => onNavigate('grading'),
      // No figure: the "To mark" KPI directly above already shows it. A card
      // repeats what its KPI does NOT say (BusinessHub's rule).
      description: 'Mark work, record outcomes and feedback.',
      alert: pendingAssessments > 0,
    },
    {
      id: 'attendance',
      title: 'Attendance',
      onClick: () => onNavigate('attendance'),
      description: 'Registers, patterns and attendance concerns.',
    },
    {
      id: 'work-queue',
      title: 'Work queue',
      onClick: () => onNavigate('workqueue'),
      value: pendingWork > 0 ? String(pendingWork) : undefined,
      valueLabel: pendingWork > 0 ? 'reviews and tasks open' : undefined,
      description: 'Nothing in the queue.',
      alert: pendingWork > 0,
    },
    {
      id: 'batch-operations',
      title: 'Batch operations',
      onClick: () => onNavigate('batchoperations'),
      description: 'Grades, attendance or status for many learners in one pass.',
    },
  ];

  const learnerProgress: HubTool[] = [
    {
      id: 'ilp-management',
      title: 'ILP management',
      onClick: () => onNavigate('ilpmanagement'),
      description: 'Learning plans, SMART targets and review cycles.',
      alert: overdueILPReviews > 0,
    },
    {
      id: 'progress-tracking',
      title: 'Progress tracking',
      onClick: () => onNavigate('progresstracking'),
      description: 'RAG ratings, progress scores and at-risk flags.',
    },
    {
      id: 'portfolio',
      title: 'Portfolios',
      onClick: () => onNavigate('portfolio'),
      description: 'Evidence, assisted reviews and resubmissions.',
    },
    {
      id: 'mastery-queue',
      title: 'AC sign-off queue',
      onClick: () => onNavigate('masteryqueue'),
      description: 'Approve a proposed criterion sign-off once the evidence clears the threshold.',
    },
  ];

  const otjAndEpa: HubTool[] = [
    {
      id: 'otj-training',
      title: 'Off-the-job training',
      onClick: () => onNavigate('otjtraining'),
      description: "Each learner's verified hours against their required total.",
    },
    {
      id: 'gateway-readiness',
      title: 'Gateway readiness',
      to: '/college/epa',
      // The "At gateway" KPI above shows how many are there; this card
      // carries the figure the KPI only mentions in passing — how many are
      // actually ready to submit.
      value: gatewayReady > 0 ? String(gatewayReady) : undefined,
      valueLabel: gatewayReady > 0 ? 'ready to submit' : undefined,
      description: 'Learner, tutor and assisted verdicts side by side for every apprentice.',
      alert: gatewayReady > 0,
    },
    {
      id: 'epa-admin',
      title: 'EPA admin',
      onClick: () => onNavigate('epatracking'),
      description: 'Status records, gateway dates, outcomes and Functional Skills.',
    },
    {
      id: 'assessment-calendar',
      title: 'Assessment calendar',
      onClick: () => onNavigate('assessmentcalendar'),
      description: 'Assessment, IQA and observation dates across cohorts.',
    },
  ];

  const qualityAndReports: HubTool[] = [
    {
      id: 'iqa-dashboard',
      title: 'IQA dashboard',
      to: '/college/iqa',
      description: 'Sampling plans, findings and standardisation meetings.',
    },
    {
      id: 'iqa-otj-audit',
      title: 'IQA off-the-job verdicts',
      onClick: () => onNavigate('iqaotjaudit'),
      description: 'Sample verified entries and track assessor agreement.',
    },
    {
      id: 'lesson-observations',
      title: 'Lesson observations',
      onClick: () => onNavigate('tutorobs'),
      description: 'Peer, HoD, IQA and learning-walk observations for every tutor.',
    },
    {
      id: 'reports',
      title: 'Reports',
      to: '/college/reports',
      description: 'Funding, Ofsted, awarding-body and quality exports.',
    },
  ];

  return (
    <>
      <HubQuickStart label="Start something" items={quickStart} />

      {/* Four KPIs, capped at four on purpose. One accent, the first. */}
      <HubKpiRow>
        <HubKpi
          accent
          label="To mark"
          value={String(pendingAssessments)}
          verdict={pendingAssessments > 0 ? 'Clear the oldest first' : 'All caught up'}
          context={pendingWork > 0 ? `${pendingWork} in the work queue overall` : undefined}
          sentiment={pendingAssessments > 0 ? 'bad' : 'neutral'}
          onClick={() => onNavigate('grading')}
        />
        <HubKpi
          label="Attendance"
          value={attendanceRate ? `${attendanceRate.pct}%` : '—'}
          verdict={
            !attendanceRate
              ? 'No registers taken yet'
              : attendanceRate.pct >= 85
                ? 'Holding up'
                : attendanceRate.pct >= 70
                  ? 'Slipping — look at the patterns'
                  : 'Low — act on it this week'
          }
          context={
            attendanceRate
              ? `${attendanceRate.sessions} marks, ${attendanceRate.window}`
              : undefined
          }
          sentiment={attendanceRate && attendanceRate.pct < 85 ? 'bad' : 'neutral'}
          onClick={() => onNavigate('attendance')}
        />
        <HubKpi
          label="At gateway"
          value={String(studentsAtGateway)}
          verdict={
            gatewayReady > 0
              ? `${gatewayReady} ready to submit`
              : studentsAtGateway > 0
                ? 'Approaching — check the blockers'
                : 'Nobody at gateway yet'
          }
          onClick={() => navigate('/college/epa')}
        />
        <HubKpi
          label="ILP reviews overdue"
          value={String(overdueILPReviews)}
          verdict={overdueILPReviews > 0 ? 'Book the reviews in' : 'All reviews on schedule'}
          sentiment={overdueILPReviews > 0 ? 'bad' : 'neutral'}
          onClick={() => onNavigate('ilpmanagement')}
        />
      </HubKpiRow>

      <HubToolGrid label="Mark & record" cards={markAndRecord} columns="four" />

      <HubToolGrid label="Learner progress" cards={learnerProgress} columns="four" />

      <HubToolGrid label="Off-the-job & EPA" cards={otjAndEpa} columns="four" />

      <HubToolGrid label="Quality & reports" cards={qualityAndReports} columns="four" />

      <RecordGradeSheet open={gradeSheetOpen} onOpenChange={setGradeSheetOpen} />
      <CalibrationSessionSheet open={calibrationOpen} onOpenChange={setCalibrationOpen} />
    </>
  );
}
