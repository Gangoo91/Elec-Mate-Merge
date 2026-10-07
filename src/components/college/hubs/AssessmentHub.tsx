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
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PageHelpButton, type PageHelpContent } from '@/components/hub/PageHelp';
import { INBOX_KIND_LABEL, useUnifiedInbox, type InboxKind } from '@/hooks/useUnifiedInbox';
import { useTutorToday } from '@/hooks/useTutorToday';
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
      description: pendingWork > 0 ? 'Reviews and tasks open for you.' : 'Nothing in the queue.',
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

  // ── The work to assess, from the same list as the inbox ──────────────
  const { items: inboxItems, loading: inboxLoading } = useUnifiedInbox();
  const ASSESS_KINDS: InboxKind[] = ['evidence', 'marking', 'hours', 'app_learning', 'iqa', 'review'];
  const queue = inboxItems.filter(
    (i) => ASSESS_KINDS.includes(i.kind) && (i.kind !== 'review' || /write up|signatures/i.test(i.title))
  );
  const [kind, setKind] = useState<InboxKind | 'all'>('all');
  const kindsHere = ASSESS_KINDS.filter((k) => queue.some((i) => i.kind === k));
  const shown = (kind === 'all' ? queue : queue.filter((i) => i.kind === kind)).slice(0, 8);
  const urgentCount = queue.filter((i) => i.urgent).length;

  const groups: Array<{ title: string; tools: HubTool[] }> = [
    { title: 'Mark and record', tools: [...markAndRecord, { id: 'calibration', title: 'Calibration session', description: 'Every tutor marks the same sample.', onClick: () => setCalibrationOpen(true) }] },
    { title: 'Learner progress', tools: [...learnerProgress, { id: 'ilp-gen', title: 'Generate a learning plan', description: 'A plan drafted from the learner’s live record.', onClick: () => onNavigate('aiilpgenerator') }] },
    { title: 'Off-the-job and EPA', tools: [...otjAndEpa, { id: 'reviews', title: 'Progress reviews', description: 'Three-way reviews every 3 months.', to: '/college/reviews' }] },
    { title: 'Quality and reports', tools: [...qualityAndReports, { id: 'evidence-pack', title: 'Evidence pack', description: 'What the funding rules need on file.', to: '/college/evidence-pack' }] },
  ];
  const openTool = (t: HubTool) => (t.to ? navigate(t.to) : t.onClick?.());

  const glance: Array<{ label: string; value: string; note: string; warn: boolean; go: () => void }> = [
    {
      label: 'Attendance',
      value: attendanceRate ? `${attendanceRate.pct}%` : '—',
      note: !attendanceRate ? 'No registers yet' : attendanceRate.pct >= 85 ? `Holding up · ${attendanceRate.window}` : `Look at the patterns · ${attendanceRate.window}`,
      warn: !!attendanceRate && attendanceRate.pct < 85,
      go: () => onNavigate('attendance'),
    },
    {
      label: 'Learning plan reviews overdue',
      value: String(overdueILPReviews),
      note: overdueILPReviews > 0 ? 'Book them in' : 'All on schedule',
      warn: overdueILPReviews > 0,
      go: () => onNavigate('ilpmanagement'),
    },
    {
      label: 'At or near gateway',
      value: String(studentsAtGateway),
      note: gatewayReady > 0 ? `${gatewayReady} ready to submit` : studentsAtGateway > 0 ? 'Check the blockers' : 'Nobody yet',
      warn: false,
      go: () => navigate('/college/epa'),
    },
    {
      label: 'Grades to record',
      value: String(pendingAssessments),
      note: pendingAssessments > 0 ? 'Oldest first' : 'All caught up',
      warn: pendingAssessments > 0,
      go: () => onNavigate('grading'),
    },
  ];
  const panel = 'rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025]';
  const pipeline = [
    { label: 'On programme', n: epaRecords.filter((e) => e.status === 'In Progress').length, cn: 'bg-white' },
    { label: 'Pre-gateway', n: epaRecords.filter((e) => e.status === 'Pre-Gateway').length, cn: 'bg-sky-400' },
    { label: 'Ready to submit', n: gatewayReady, cn: 'bg-elec-yellow' },
    { label: 'Complete', n: epaRecords.filter((e) => e.status === 'Complete').length, cn: 'bg-emerald-500' },
  ];
  const { data: today } = useTutorToday();
  const week = (today?.thisWeek ?? []).filter((w) => w.kind !== 'lesson').concat((today?.thisWeek ?? []).filter((w) => w.kind === 'lesson')).slice(0, 6);

  return (
    <>
      {/* Hero: what needs assessing, and the two things people come here to do */}
      <header className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0 max-w-3xl">
          <div className="flex items-start justify-between gap-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">Assessment</p>
            <PageHelpButton help={HELP} className="-mt-2 lg:hidden" />
          </div>
          <h1 className="mt-2 text-[28px] font-bold leading-[1.1] tracking-tight text-white sm:text-[36px]">
            {inboxLoading ? 'Gathering the work…' : queue.length === 0 ? 'Nothing waiting to assess' : `${queue.length} ${queue.length === 1 ? 'thing' : 'things'} to assess`}
          </h1>
          <p className="mt-2 text-[15px] leading-relaxed text-white">
            {queue.length === 0
              ? 'Evidence, written answers, hours and reviews land here as learners send them.'
              : `${urgentCount ? `${urgentCount} waiting too long. ` : ''}Evidence, written answers, hours, IQA and reviews, oldest and most urgent first.`}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2.5">
          <button
            type="button"
            onClick={() => setGradeSheetOpen(true)}
            className="inline-flex h-12 items-center justify-center rounded-2xl bg-elec-yellow px-5 text-[14px] font-bold text-black touch-manipulation active:scale-[0.98]"
          >
            Record a grade
          </button>
          <button
            type="button"
            onClick={() => onNavigate('attendance')}
            className="inline-flex h-12 items-center justify-center rounded-2xl border border-white/[0.16] px-5 text-[14px] font-semibold text-white touch-manipulation hover:bg-white/[0.06]"
          >
            Take a register
          </button>
          <PageHelpButton help={HELP} className="hidden lg:inline-flex" />
        </div>
      </header>

      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        {/* To assess now */}
        <section className="min-w-0 space-y-3">
          <div className="flex h-10 items-end justify-between gap-3">
            <h2 className="text-[15px] font-semibold tracking-tight text-white">To assess now</h2>
            <button type="button" onClick={() => navigate('/college/inbox')} className="inline-flex h-11 items-center gap-1 text-[13px] font-semibold text-elec-yellow touch-manipulation">
              Open the inbox <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          <div className={cn(panel, '-mx-4 overflow-hidden rounded-none border-x-0 sm:mx-0 sm:rounded-3xl sm:border-x')}>
            {kindsHere.length > 1 && (
              <div className="flex gap-1.5 overflow-x-auto border-b border-white/[0.06] px-4 py-3 sm:px-5">
                {(['all', ...kindsHere] as Array<InboxKind | 'all'>).map((k) => (
                  <button
                    key={k}
                    type="button"
                    aria-pressed={kind === k}
                    onClick={() => setKind(k)}
                    className={cn(
                      'inline-flex h-11 shrink-0 items-center gap-1.5 rounded-full border px-3 text-[12px] font-semibold touch-manipulation',
                      kind === k ? 'border-white bg-white text-black' : 'border-white/[0.14] text-white'
                    )}
                  >
                    {k === 'all' ? 'All' : INBOX_KIND_LABEL[k]}
                    <span className="tabular-nums">{k === 'all' ? queue.length : queue.filter((i) => i.kind === k).length}</span>
                  </button>
                ))}
              </div>
            )}
            {inboxLoading ? (
              <div className="space-y-px">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-[76px] animate-pulse bg-white/[0.03]" />
                ))}
              </div>
            ) : shown.length === 0 ? (
              <div className="px-5 py-8">
                <p className="text-[16px] font-semibold text-white">You’re up to date.</p>
                <p className="mt-1 text-[13.5px] text-white">New evidence, answers and hours appear here as learners send them.</p>
              </div>
            ) : (
              <ul className="divide-y divide-white/[0.06]">
                {shown.map((i) => (
                  <li key={i.key}>
                    <button
                      type="button"
                      onClick={() => navigate(i.href)}
                      className="flex w-full items-center gap-4 px-4 py-3.5 text-left touch-manipulation hover:bg-white/[0.04] sm:px-5"
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          'flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[13px] font-bold',
                          i.urgent ? 'bg-orange-500 text-black' : 'bg-white/[0.1] text-white'
                        )}
                      >
                        {(i.learner ?? i.title).replace(/\(.*?\)/g, '').split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase()).join('')}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <span className="truncate text-[14.5px] font-semibold text-white">{i.learner ?? i.title}</span>
                          <span className="shrink-0 rounded-full border border-white/[0.16] px-2 py-0.5 text-[10.5px] font-semibold text-white">
                            {INBOX_KIND_LABEL[i.kind]}
                          </span>
                        </span>
                        <span className="mt-0.5 block truncate text-[12.5px] text-white">
                          {i.learner ? [i.title, i.body].filter(Boolean).join(' · ') : i.body}
                        </span>
                        <span className={cn('mt-0.5 block text-[11.5px] font-semibold', i.urgent ? 'text-orange-300' : 'text-white')}>
                          {i.waitingDays <= 0 ? 'Today' : `Waiting ${i.waitingDays} days`}
                          {i.cohort ? ` · ${i.cohort}` : ''}
                        </span>
                      </span>
                      <span
                        className={cn(
                          'hidden h-10 w-[96px] shrink-0 items-center justify-center rounded-xl text-[13px] font-bold sm:inline-flex',
                          i.urgent ? 'bg-elec-yellow text-black' : 'border border-white/[0.18] text-white'
                        )}
                      >
                        {i.action}
                      </span>
                      <ChevronRight className="h-4 w-4 shrink-0 text-white sm:hidden" aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {queue.length > shown.length && (
              <button
                type="button"
                onClick={() => navigate('/college/inbox')}
                className="flex h-12 w-full items-center justify-center gap-1 border-t border-white/[0.06] text-[13px] font-semibold text-white hover:bg-white/[0.04]"
              >
                {queue.length - shown.length} more in the inbox <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>

        </section>

        {/* Where things stand */}
        <aside className="space-y-6">
          <div className="space-y-3">
            <div className="flex h-10 items-end">
              <h2 className="text-[15px] font-semibold tracking-tight text-white">Where your learners are</h2>
            </div>
            <ul className={cn(panel, 'divide-y divide-white/[0.06] overflow-hidden')}>
              {glance.map((g) => (
                <li key={g.label}>
                  <button type="button" onClick={g.go} className="flex w-full items-center gap-4 px-5 py-4 text-left touch-manipulation hover:bg-white/[0.04]">
                    <span className="min-w-0 flex-1">
                      <span className="block text-[13px] font-medium text-white">{g.label}</span>
                      <span className={cn('block text-[12px]', g.warn ? 'font-semibold text-orange-300' : 'text-white')}>{g.note}</span>
                    </span>
                    <span className={cn('text-[26px] font-bold tabular-nums', g.warn ? 'text-orange-400' : 'text-white')}>{g.value}</span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-[15px] font-semibold tracking-tight text-white">Gateway pipeline</h2>
            <button type="button" onClick={() => navigate('/college/epa')} className={cn(panel, 'block w-full p-5 text-left touch-manipulation hover:border-white/[0.18]')}>
              <div className="grid grid-cols-4 gap-2">
                {pipeline.map((st, idx) => (
                  <div key={st.label} className="min-w-0">
                    <div className={cn('h-2 rounded-full', st.n > 0 ? st.cn : 'bg-white/[0.08]')} />
                    <p className="mt-2 text-[22px] font-bold leading-none tabular-nums text-white">{st.n}</p>
                    <p className="mt-1 text-[11.5px] leading-tight text-white">{st.label}</p>
                    {idx < pipeline.length - 1 && <span className="sr-only">then</span>}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[12.5px] text-white">
                {gatewayReady > 0 ? `${gatewayReady} ready to submit to the assessment organisation.` : 'Apprentices move left to right as they near their end-point assessment.'}
              </p>
            </button>
          </div>

        </aside>
      </div>

      {week.length > 0 && (
        <div className="space-y-3">
          <div className="flex h-10 items-end">
            <h2 className="text-[15px] font-semibold tracking-tight text-white">This week</h2>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
            {week.map((w, i) => (
              <li key={`${w.date}-${i}`}>
                <button
                  type="button"
                  onClick={() => navigate(w.href)}
                  className={cn(panel, 'flex h-full w-full items-start gap-3.5 p-4 text-left touch-manipulation hover:border-white/[0.18]')}
                >
                  <span className="flex w-11 shrink-0 flex-col items-center rounded-xl border border-white/[0.12] bg-background py-1">
                    <span className="text-[10px] font-semibold uppercase text-elec-yellow">
                      {new Date(`${w.date}T12:00:00`).toLocaleDateString('en-GB', { weekday: 'short' })}
                    </span>
                    <span className="text-[16px] font-bold leading-none tabular-nums text-white">{new Date(`${w.date}T12:00:00`).getDate()}</span>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="line-clamp-2 block text-[13.5px] font-semibold leading-snug text-white">{w.title}</span>
                    <span className="mt-1 block text-[11.5px] text-white">{WEEK_KIND[w.kind] ?? 'Date'}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tools, grouped */}
      <section className="space-y-3">
        <h2 className="text-[15px] font-semibold tracking-tight text-white">Tools</h2>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {groups.map((g) => (
            <div key={g.title} className={cn(panel, '-mx-4 overflow-hidden rounded-none border-x-0 sm:mx-0 sm:rounded-3xl sm:border-x')}>
              <p className="px-5 pb-1 pt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">{g.title}</p>
              <ul className="divide-y divide-white/[0.06]">
                {g.tools.map((t) => (
                  <li key={t.id}>
                    <button
                      type="button"
                      onClick={() => openTool(t)}
                      className="flex min-h-[60px] w-full items-center gap-3 px-5 py-2.5 text-left transition-colors touch-manipulation hover:bg-white/[0.04]"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block text-[14.5px] font-semibold text-white">{t.title}</span>
                        <span className="block text-[12.5px] leading-snug text-white">{t.description}</span>
                      </span>
                      {t.value ? (
                        <span className="shrink-0 rounded-full bg-elec-yellow px-2 py-0.5 text-[11.5px] font-bold tabular-nums text-black">{t.value}</span>
                      ) : null}
                      <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <RecordGradeSheet open={gradeSheetOpen} onOpenChange={setGradeSheetOpen} />
      <CalibrationSessionSheet open={calibrationOpen} onOpenChange={setCalibrationOpen} />
    </>
  );
}

const WEEK_KIND: Record<string, string> = {
  lesson: 'Class',
  observation_due: 'Observation due',
  iqa_action: 'IQA action',
  epa_brief: 'EPA brief',
};

const HELP: PageHelpContent = {
  id: 'college-assessment-hub',
  title: 'The assessment hub',
  what: 'Where assessors work: everything waiting to be assessed at the top, where your learners stand beside it, and every assessment tool below.',
  steps: [
    { title: 'Clear the queue', body: 'Evidence, written quiz answers, hours, app learning, IQA verdicts and reviews to write up. Each button opens the exact item.' },
    { title: 'Check where learners are', body: 'Attendance, plan reviews overdue and who is at gateway, each one tap from the detail.' },
    { title: 'Use the tools', body: 'Grading, registers, learning plans, the criteria sign-off queue, EPA, IQA and reports, grouped by job.' },
  ],
  legend: [{ swatch: 'bg-orange-500', label: 'Waiting too long', body: 'Evidence or hours over a week, answers over a week.' }],
};
