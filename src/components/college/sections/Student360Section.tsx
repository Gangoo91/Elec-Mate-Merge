/**
 * Student360Section — one learner, inside the College Hub.
 *
 * Reached from the dashboard's "Needs you" list and the at-risk widget via
 * `?section=student360&studentId=…`, which makes it the most-opened page in
 * the College Hub. It used to be a shim that redirected to
 * `/college/students/:id` — the deep link cost a full page swap and dropped
 * the tutor outside the hub shell they had just been in.
 *
 * Now it IS the learner page, built on the shared hub language the parent
 * dashboard already wears (HubPage → HubMasthead → HubBody are rendered by
 * CollegeDashboard; this is the body):
 *
 *   identity line → start something → four KPIs → needs you → sections
 *
 * No hero. The name is one line under the masthead, not a 40px headline
 * with a photo and a risk-tinted gradient. The four figures a tutor scans
 * before anything else — AC coverage, attendance, off-the-job hours, risk —
 * are one HubKpi each with a verdict, and everything outstanding for THIS
 * learner (overdue ILP review, blocked goals, follow-ups, unanswered
 * learner replies, submissions waiting, absences in a row) is one ranked
 * "Needs you" list derived from data the sections already load.
 *
 * `/college/students/:id` (Student360Page) still exists for links that
 * arrive from outside the dashboard.
 *
 * Every query is the same as the canonical page's: `useStudent360` for the
 * core record, attendance, grades, AC coverage, notes and risk; the ILP,
 * observation and portfolio hooks are run ONCE here and handed to their
 * sections, so the KPI row and the work list do not cost a second fetch.
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/components/ui/sheet';
import { EmptyState, LoadingState, containerVariants, itemVariants } from '@/components/college/primitives';
import {
  HubKpi,
  HubKpiRow,
  HubQuickStart,
  HubSectionHeading,
  HubWorkList,
  type HubQuickAction,
  type HubWorkItem,
} from '@/components/hub/HubPrimitives';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import { LearnerQuickJump } from '@/components/college/sections/LearnerQuickJump';
import {
  useStudent360,
  type AttendanceRow,
  type GradeRow,
  type PastoralNote,
  type RiskSnapshot,
  type StudentCore,
} from '@/hooks/useStudent360';
import { useStudentIlp } from '@/hooks/useStudentIlp';
import { useCollegeObservations } from '@/hooks/useCollegeObservations';
import { useStudentPortfolio } from '@/hooks/useStudentPortfolio';
import { useOtjForecast } from '@/hooks/useOtjForecast';
import { useCohortNeighbors } from '@/hooks/useCohortNeighbors';
import { useStaffRole } from '@/hooks/useStaffRole';
import { useSyncAcCoverage, useRecomputeRisk } from '@/hooks/useStudentRisk';
import { useStudentGdprExport } from '@/hooks/useStudentGdprExport';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import type { NextAction } from '@/hooks/useAiNextBestAction';
import { AddPastoralNoteDialog, type NoteKind } from '@/components/college/dialogs/AddPastoralNoteDialog';
import { StudentMessageSheet } from '@/components/college/sheets/StudentMessageSheet';
import { RecordObservationSheet } from '@/components/college/sheets/RecordObservationSheet';
import { LogCollegeOtjSheet } from '@/components/college/sheets/LogCollegeOtjSheet';
import { MarkAttendanceSheet } from '@/components/college/sheets/MarkAttendanceSheet';
import { LogGradeSheet } from '@/components/college/sheets/LogGradeSheet';
import { CreateQuizSheet } from '@/components/college/sheets/CreateQuizSheet';
import { UploadAssessmentDocSheet } from '@/components/college/sheets/UploadAssessmentDocSheet';
import { StudentInclusionSheet } from '@/components/college/sheets/StudentInclusionSheet';
import { TripartiteReviewSheet } from '@/components/college/sheets/TripartiteReviewSheet';
import { ParentContactsSheet } from '@/components/college/sheets/ParentContactsSheet';
import { OtjForecastBadge } from '@/components/college/widgets/OtjForecastBadge';
import { SectionNextBestAction } from '@/components/college/student360/SectionNextBestAction';
import { SectionIlp } from '@/components/college/student360/SectionIlp';
import { SectionSupportNeeds } from '@/components/college/student360/SectionSupportNeeds';
import { SectionCourseProgress } from '@/components/college/student360/SectionCourseProgress';
import { StudentAssessmentConfidence } from '@/components/college/student360/StudentAssessmentConfidence';
import { SectionAcMatrix } from '@/components/college/student360/SectionAcMatrix';
import { SectionApprenticeOtj } from '@/components/college/student360/SectionApprenticeOtj';
import { SectionPortfolio } from '@/components/college/student360/SectionPortfolio';
import { SectionObservations } from '@/components/college/student360/SectionObservations';
import { SectionQuizzes } from '@/components/college/student360/SectionQuizzes';
import { SectionEpaReadiness } from '@/components/college/student360/SectionEpaReadiness';

interface Student360SectionProps {
  studentId: string;
  onNavigate: (section: CollegeSection) => void;
  onBack: () => void;
}

/* ──────────────────────────────────────────────────────────────────────────
   Shared bits
   ────────────────────────────────────────────────────────────────────────── */

const CARD = cn('overflow-hidden rounded-2xl border border-elec-yellow/35', CARD_SURFACE);

const ACTION_BTN =
  '-my-2 flex h-11 shrink-0 items-center px-2 text-[12px] font-bold text-elec-yellow transition-colors touch-manipulation disabled:opacity-50';

const DAY_MS = 86_400_000;

function daysUntil(iso: string | null | undefined): number | null {
  if (!iso) return null;
  const t = new Date(iso).getTime();
  if (!Number.isFinite(t)) return null;
  return Math.ceil((t - Date.now()) / DAY_MS);
}

function shortDate(iso: string | null | undefined): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

function plural(n: number, one: string, many = `${one}s`): string {
  return `${n} ${n === 1 ? one : many}`;
}

function scrollTo(anchor: string) {
  document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/** Attendance rows are stored capitalised ("Present", "Late", "Absent",
 *  "Authorised"). Compare case-insensitively — a case-sensitive compare on
 *  the lowercase spellings is how the canonical page's stat strip came to
 *  show 0% for every learner. */
const norm = (s: string | null | undefined) => (s ?? '').toLowerCase();

function attendanceSummary(rows: AttendanceRow[]) {
  const last28 = rows.slice(0, 28);
  const attended = last28.filter((a) => ['present', 'late'].includes(norm(a.status))).length;
  const absent = last28.filter((a) => norm(a.status) === 'absent').length;
  const late = last28.filter((a) => norm(a.status) === 'late').length;
  const rate = last28.length > 0 ? Math.round((attended / last28.length) * 100) : null;
  let streak = 0;
  for (const r of rows) {
    if (norm(r.status) === 'absent') streak += 1;
    else break;
  }
  return { sessions: last28.length, attended, absent, late, rate, streak };
}

const RISK_LABEL: Record<string, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  critical: 'Critical',
};

// Maps a risk-factor key to the section it relates to, so a tutor can jump
// straight from "why" to "where".
const FACTOR_ANCHOR: Record<string, string> = {
  attendance_low: 'attendance',
  attendance_dropping: 'attendance',
  attendance_unknown: 'attendance',
  ac_velocity_zero: 'coverage',
  behind_pace: 'coverage',
  portfolio_stale: 'portfolio',
  portfolio_empty: 'portfolio',
  grade_drop: 'grades',
  ilp_overdue: 'ilp',
  open_flags: 'notes',
  no_observations: 'observations',
  observation_stale: 'observations',
  observation_followup: 'observations',
  otj_none: 'otj',
  otj_gap: 'otj',
  epa_gateway_risk: 'epa',
};

/* ==========================================================================
   The section
   ========================================================================== */

export function Student360Section({ studentId, onBack }: Student360SectionProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { profile } = useAuth();
  const staffRole = useStaffRole();

  const data = useStudent360(studentId || null);
  const { core, attendance, grades, acCoverage, notes, risk, riskHistory, loading, errors, refresh } =
    data;

  // Run once here, shared with the sections below.
  const ilpHook = useStudentIlp({ collegeStudentId: studentId || null });
  const observationsHook = useCollegeObservations(studentId || null);
  const portfolioHook = useStudentPortfolio(core?.user_id ?? null);
  const { forecast } = useOtjForecast(studentId || null);
  const neighbors = useCohortNeighbors(studentId || null);

  const { sync: syncCoverage, running: syncingCoverage } = useSyncAcCoverage();
  const { recompute, running: recomputingRisk } = useRecomputeRisk();
  const { exportPack } = useStudentGdprExport();

  const [noteOpen, setNoteOpen] = useState(false);
  const [noteKind, setNoteKind] = useState<NoteKind>('note');
  const [messageOpen, setMessageOpen] = useState(false);
  const [observationOpen, setObservationOpen] = useState(false);
  const [otjOpen, setOtjOpen] = useState(false);
  const [attendanceOpen, setAttendanceOpen] = useState(false);
  const [gradeOpen, setGradeOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState<{ acCodes?: string[] } | null>(null);
  const [uploadDocOpen, setUploadDocOpen] = useState(false);
  const [inclusionOpen, setInclusionOpen] = useState(false);
  const [tripartiteOpen, setTripartiteOpen] = useState(false);
  const [parentsOpen, setParentsOpen] = useState(false);
  const [actionsOpen, setActionsOpen] = useState(false);

  const openNote = useCallback((k: NoteKind) => {
    setNoteKind(k);
    setNoteOpen(true);
  }, []);

  // Hash-scroll: `…&studentId=…#ilp` from the inbox or notification bell.
  // Retries a few times so a section that mounts after data lands is not
  // missed. `#messages` has no inline section — open the sheet instead.
  useEffect(() => {
    const hash = location.hash.replace(/^#/, '');
    if (!hash) return;
    if (hash === 'messages') {
      setMessageOpen(true);
      return;
    }
    let attempts = 0;
    let timer: ReturnType<typeof setTimeout> | null = null;
    const tryScroll = () => {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      attempts += 1;
      if (attempts < 12) timer = setTimeout(tryScroll, 250);
    };
    tryScroll();
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [location.hash, loading.core]);

  // "quiz:suggest-from-ac" from an AC chip or the weak-AC bulk action opens
  // CreateQuizSheet pre-filled with the AC codes.
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ ac_code?: string; ac_codes?: string[] }>).detail;
      const codes = detail?.ac_codes ?? (detail?.ac_code ? [detail.ac_code] : []);
      if (codes.length === 0) return;
      setQuizOpen({ acCodes: codes });
    };
    window.addEventListener('quiz:suggest-from-ac', handler);
    return () => window.removeEventListener('quiz:suggest-from-ac', handler);
  }, []);

  const goTo = useCallback(
    (id: string) => navigate(`/college?section=student360&studentId=${encodeURIComponent(id)}`),
    [navigate]
  );

  // Cmd/Ctrl + arrow keys cycle through learners in the same cohort.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!(e.metaKey || e.ctrlKey)) return;
      if (e.key === 'ArrowLeft' && neighbors.prev) {
        e.preventDefault();
        goTo(neighbors.prev.id);
      } else if (e.key === 'ArrowRight' && neighbors.next) {
        e.preventDefault();
        goTo(neighbors.next.id);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [neighbors.prev, neighbors.next, goTo]);

  // AI next-best-action → the right sheet, dialog or anchor.
  const handleNextAction = (action: NextAction) => {
    switch (action.kind) {
      case 'schedule_one_to_one':
        openNote('one_to_one');
        break;
      case 'log_observation':
        setObservationOpen(true);
        break;
      case 'send_message':
        setMessageOpen(true);
        break;
      case 'add_pastoral_note':
        openNote('note');
        break;
      case 'log_otj':
        setOtjOpen(true);
        break;
      case 'review_portfolio':
      case 'add_evidence':
        scrollTo('portfolio');
        break;
      case 'edit_ilp':
      case 'add_ilp_goal':
        scrollTo('ilp');
        break;
      case 'log_attendance':
        setAttendanceOpen(true);
        break;
      case 'escalate_safeguarding':
        openNote('safeguarding');
        break;
      case 'praise':
        openNote('praise');
        break;
      default:
        openNote('note');
    }
  };

  const recomputeRisk = async () => {
    if (!core) return;
    await recompute({ student_ids: [core.id] });
    await refresh();
  };

  const seedCoverage = async () => {
    if (!core) return;
    await syncCoverage({ student_ids: [core.id] });
    await refresh();
  };

  const downloadGdpr = async () => {
    if (!core) return;
    try {
      await exportPack({
        collegeStudentId: core.id,
        studentUserId: core.user_id ?? null,
        studentName: core.name,
      });
      toast({ title: 'GDPR pack downloaded', description: 'ZIP saved to your downloads folder.' });
    } catch (e) {
      toast({ title: 'GDPR export failed', description: (e as Error).message, variant: 'destructive' });
    }
  };

  /* ── Figures ─────────────────────────────────────────────────────── */

  const att = useMemo(() => attendanceSummary(attendance), [attendance]);

  const coverage = useMemo(() => {
    const total = acCoverage.length;
    const done = acCoverage.filter((r) =>
      ['evidenced', 'assessed', 'confirmed'].includes(r.status)
    ).length;
    const confirmed = acCoverage.filter((r) => r.status === 'confirmed').length;
    const assessed = acCoverage.filter((r) => r.status === 'assessed').length;
    return { total, done, confirmed, assessed, pct: total > 0 ? Math.round((done / total) * 100) : null };
  }, [acCoverage]);

  const riskLevel = (risk?.level ?? core?.risk_level ?? null)?.toLowerCase() ?? null;
  const riskBad = riskLevel === 'high' || riskLevel === 'critical';
  const topFactor = risk?.factors?.[0] ?? null;

  const openActions = useMemo(
    () => notes.filter((n) => n.action_required && !n.action_completed_at),
    [notes]
  );

  /* ── Needs you ────────────────────────────────────────────────────
     Ranked by cost of delay: a learner in trouble first, then anything
     with a date already passed, then work that is simply waiting. */
  const work: HubWorkItem[] = useMemo(() => {
    if (!core) return [];
    const items: HubWorkItem[] = [];
    const first = core.name.split(' ')[0];

    if (riskBad && riskLevel) {
      items.push({
        id: 'risk',
        title: `${RISK_LABEL[riskLevel]} risk`,
        reason: topFactor?.label ?? 'Check in with them today',
        trailing: risk ? String(Math.round(risk.score)) : undefined,
        urgent: true,
        onClick: () => scrollTo('risk'),
      });
    }

    if (att.streak >= 2) {
      items.push({
        id: 'absences',
        title: `${att.streak} absences in a row`,
        reason: `Most recent ${shortDate(attendance[0]?.date)} · follow up today`,
        urgent: true,
        onClick: () => scrollTo('attendance'),
      });
    }

    for (const n of openActions) {
      const d = daysUntil(n.action_by_date);
      items.push({
        id: `note-${n.id}`,
        title: n.action_required ?? n.title ?? 'Action from a note',
        reason: [n.kind.replace(/_/g, ' '), n.title].filter(Boolean).join(' · '),
        trailing: d !== null ? (d < 0 ? `${-d}d late` : d === 0 ? 'today' : `${d}d`) : undefined,
        urgent: d !== null && d <= 0,
        onClick: () => scrollTo('notes'),
      });
    }

    const { ilp, rollUp } = ilpHook;
    if (!ilp && !ilpHook.loading) {
      items.push({
        id: 'ilp-none',
        title: 'No learning plan yet',
        reason: `Generate one with AI or start a blank plan for ${first}`,
        onClick: () => scrollTo('ilp'),
      });
    }
    if (ilp?.review_date) {
      const d = daysUntil(ilp.review_date);
      if (d !== null && d <= 7) {
        items.push({
          id: 'ilp-review',
          title: d < 0 ? 'ILP review overdue' : 'ILP review due',
          reason: `Review date ${shortDate(ilp.review_date)}`,
          trailing: d < 0 ? `${-d}d late` : d === 0 ? 'today' : `${d}d`,
          urgent: d <= 0,
          onClick: () => scrollTo('ilp'),
        });
      }
    }
    if (rollUp.overdue > 0) {
      items.push({
        id: 'ilp-overdue',
        title: `${plural(rollUp.overdue, 'ILP goal')} overdue`,
        reason: 'Past its target date and not done',
        urgent: true,
        onClick: () => scrollTo('ilp'),
      });
    }
    if (rollUp.blocked > 0) {
      items.push({
        id: 'ilp-blocked',
        title: `${plural(rollUp.blocked, 'ILP goal')} blocked`,
        reason: `${first} can't move on this without you`,
        urgent: true,
        onClick: () => scrollTo('ilp'),
      });
    }
    if (rollUp.unread_student_comments > 0) {
      items.push({
        id: 'ilp-replies',
        title: `${plural(rollUp.unread_student_comments, 'reply', 'replies')} from ${first}`,
        reason: 'Learner comments on ILP goals with no answer from you',
        onClick: () => scrollTo('ilp'),
      });
    }

    for (const o of observationsHook.observations) {
      if (!o.follow_up_required) continue;
      const d = daysUntil(o.follow_up_date);
      items.push({
        id: `obs-${o.id}`,
        title: 'Observation follow-up',
        reason: o.activity_title,
        trailing: d !== null ? (d < 0 ? `${-d}d late` : d === 0 ? 'today' : `${d}d`) : undefined,
        urgent: d !== null && d <= 0,
        onClick: () => scrollTo('observations'),
      });
    }

    const pr = portfolioHook.rollUp;
    const waiting =
      pr.by_status.submitted + pr.by_status.resubmitted + pr.by_status.in_review + pr.by_status.under_review;
    if (waiting > 0) {
      items.push({
        id: 'portfolio-waiting',
        title: `${plural(waiting, 'submission')} waiting for review`,
        reason: 'Portfolio evidence submitted and not yet marked',
        onClick: () => scrollTo('portfolio'),
      });
    }
    if (pr.overdue_requirements > 0) {
      items.push({
        id: 'portfolio-overdue',
        title: `${plural(pr.overdue_requirements, 'evidence requirement')} overdue`,
        reason: 'Requirements you set that have passed their due date',
        urgent: true,
        onClick: () => scrollTo('portfolio'),
      });
    }

    if (forecast && forecast.risk === 'red') {
      items.push({
        id: 'otj-pace',
        title: 'Off-the-job behind pace',
        reason: `Forecast ${forecast.forecast_pct}% of the ${forecast.required_hours}h required`,
        trailing: `${Math.abs(forecast.shortfall_hours)}h short`,
        urgent: true,
        onClick: () => scrollTo('otj'),
      });
    }

    if (!loading.acCoverage && !errors.acCoverage && acCoverage.length === 0) {
      items.push({
        id: 'coverage-seed',
        title: 'No AC list tracked',
        reason: "Seed the criteria from this learner's course to start tracking coverage",
        onClick: () => void seedCoverage(),
      });
    }

    // Urgent first; within each band keep the order above.
    return items.sort((a, b) => Number(!!b.urgent) - Number(!!a.urgent));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    core,
    riskBad,
    riskLevel,
    topFactor,
    risk,
    att,
    attendance,
    openActions,
    ilpHook.ilp,
    ilpHook.rollUp,
    ilpHook.loading,
    observationsHook.observations,
    portfolioHook.rollUp,
    forecast,
    loading.acCoverage,
    errors.acCoverage,
    acCoverage.length,
  ]);

  /* ── Start something ─────────────────────────────────────────────
     The one solid volt card is the action this role reaches for most.
     Everything else is one tap away in the actions sheet. */
  const quickStart: HubQuickAction[] = useMemo(() => {
    if (!core) return [];
    const first = core.name.split(' ')[0];
    if (staffRole.isEqa) {
      return [
        { title: 'Evidence chain', description: 'Inspector-ready view', onClick: () => navigate(`/college/students/${core.id}/evidence`), primary: true },
        { title: 'Print', description: 'Learner summary PDF', onClick: () => navigate(`/college/students/${core.id}/print`) },
        { title: 'GDPR pack', description: 'Everything held, as a ZIP', onClick: () => void downloadGdpr() },
        { title: 'Ask AI', description: `About ${first}'s record`, onClick: () => navigate(`/college/ai-notebook?student=${core.id}`) },
      ];
    }
    if (staffRole.isDsl) {
      return [
        { title: 'Safeguarding', description: 'Restricted note, DSL only', onClick: () => openNote('safeguarding'), primary: true },
        { title: '1-2-1', description: 'Log a one-to-one', onClick: () => openNote('one_to_one') },
        { title: 'Message', description: `Send to ${first}`, onClick: () => setMessageOpen(true) },
        { title: 'More actions', description: 'Observe, register, grade, flag…', onClick: () => setActionsOpen(true) },
      ];
    }
    if (staffRole.isAssessor || staffRole.isIqa) {
      return [
        { title: 'Observation', description: 'Record assessment evidence', onClick: () => setObservationOpen(true), primary: true },
        { title: 'Grade', description: 'Log an assessment result', onClick: () => setGradeOpen(true) },
        { title: 'Note', description: 'Pastoral note', onClick: () => openNote('note') },
        { title: 'More actions', description: 'Message, register, quiz, flag…', onClick: () => setActionsOpen(true) },
      ];
    }
    return [
      { title: '1-2-1', description: 'Log a one-to-one', onClick: () => openNote('one_to_one'), primary: true },
      { title: 'Note', description: 'Pastoral note', onClick: () => openNote('note') },
      { title: 'Message', description: `Send to ${first}`, onClick: () => setMessageOpen(true) },
      { title: 'More actions', description: 'Observe, register, grade, flag…', onClick: () => setActionsOpen(true) },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [core, staffRole.isEqa, staffRole.isDsl, staffRole.isAssessor, staffRole.isIqa, navigate, openNote]);

  /* ── No learner ──────────────────────────────────────────────────── */

  if (!studentId) {
    return (
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
        <motion.div variants={itemVariants}>
          <EmptyState
            title="No learner selected"
            description="Pick a learner to open their profile — next best action, risk, ILP, attendance, grades, off-the-job, EPA and portfolio in one place."
            action="Back to learners"
            onAction={onBack}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <LearnerQuickJump />
        </motion.div>
      </motion.div>
    );
  }

  const initialLoading = loading.core && !core;
  if (initialLoading) return <LoadingState />;

  if (!core) {
    return (
      <EmptyState
        title="This learner couldn't be loaded"
        description={data.error ?? "They may have been removed, or your account isn't a member of their college."}
        action="Back to learners"
        onAction={onBack}
      />
    );
  }

  const first = core.name.split(' ')[0];
  const prevId = neighbors.prev?.id;
  const nextId = neighbors.next?.id;

  return (
    <>
      <IdentityLine
        core={core}
        neighbors={neighbors}
        onPrev={prevId ? () => goTo(prevId) : undefined}
        onNext={nextId ? () => goTo(nextId) : undefined}
      />

      <HubQuickStart label="Start something" items={quickStart} />

      <HubKpiRow>
        <HubKpi
          accent
          label="AC coverage"
          value={coverage.pct === null ? '—' : `${coverage.pct}%`}
          verdict={
            coverage.total === 0
              ? errors.acCoverage
                ? "Couldn't load the AC list"
                : 'No AC list seeded yet'
              : `${coverage.done} of ${coverage.total} criteria evidenced or better`
          }
          context={
            coverage.total > 0
              ? `${coverage.assessed} assessed · ${coverage.confirmed} IQA confirmed`
              : undefined
          }
          onClick={() => scrollTo('coverage')}
        />
        <HubKpi
          label="Attendance"
          value={att.rate === null ? '—' : `${att.rate}%`}
          sentiment={att.rate !== null && att.rate < 85 ? 'bad' : 'neutral'}
          verdict={
            att.rate === null
              ? 'No register taken yet'
              : att.streak >= 2
                ? `${att.streak} absences in a row`
                : att.rate >= 95
                  ? 'On track'
                  : att.rate >= 85
                    ? 'Worth watching'
                    : 'Below target'
          }
          context={
            att.sessions > 0
              ? `Last ${plural(att.sessions, 'session')} · ${att.absent} absent · ${att.late} late`
              : undefined
          }
          onClick={() => scrollTo('attendance')}
        />
        <HubKpi
          label="Off-the-job hours"
          value={forecast ? `${forecast.current_hours}h` : '—'}
          sentiment={
            forecast?.risk === 'red' ? 'bad' : forecast?.risk === 'green' ? 'good' : 'neutral'
          }
          direction={forecast?.risk === 'red' ? 'down' : forecast?.risk === 'green' ? 'up' : 'flat'}
          verdict={
            !forecast
              ? 'Working it out…'
              : forecast.risk === 'unknown'
                ? 'No start and end dates — no forecast'
                : forecast.risk === 'green'
                  ? 'On course for the required hours'
                  : `Forecast ${forecast.forecast_pct}% of ${forecast.required_hours}h`
          }
          context={
            forecast && forecast.risk !== 'unknown'
              ? `${forecast.weekly_pace_hours}h a week${forecast.weekly_needed_to_close_gap > 0 ? ` · needs ${forecast.weekly_needed_to_close_gap}h to close the gap` : ''}`
              : undefined
          }
          onClick={() => scrollTo('otj')}
        />
        <HubKpi
          label="Risk"
          value={riskLevel ? RISK_LABEL[riskLevel] ?? riskLevel : '—'}
          sentiment={riskBad ? 'bad' : 'neutral'}
          verdict={
            !riskLevel
              ? 'No risk score yet'
              : topFactor
                ? topFactor.label
                : riskBad
                  ? 'Check in today'
                  : 'No active risk factors'
          }
          context={
            risk
              ? `Score ${risk.score.toFixed(0)} · updated ${shortDate(risk.computed_at)}`
              : undefined
          }
          onClick={() => scrollTo('risk')}
        />
      </HubKpiRow>

      <HubWorkList items={work} unit="thing" />

      <SectionNextBestAction
        id="next-best"
        studentId={core.id}
        studentName={core.name}
        onAction={handleNextAction}
      />

      <RiskCard
        risk={risk}
        history={riskHistory}
        loading={loading.risk}
        computing={recomputingRisk}
        onCompute={recomputeRisk}
      />

      <SectionIlp id="ilp" studentName={core.name} collegeStudentId={core.id} hook={ilpHook} />

      <SectionSupportNeeds
        id="support"
        collegeStudentId={core.id}
        sendFlags={core.send_flags}
        eal={core.eal}
        ehcpRef={core.ehcp_ref}
        accessibilityNotes={core.accessibility_notes}
        firstLanguage={core.first_language}
        pronouns={core.pronouns}
        onSaved={refresh}
      />

      <SectionCourseProgress id="progress" studentName={core.name} userId={core.user_id} />

      <StudentAssessmentConfidence studentId={core.id} />

      <div id="coverage" className="scroll-mt-20 space-y-3">
        <SectionAcMatrix studentId={core.id} studentUserId={core.user_id} studentName={core.name} />
        {errors.acCoverage ? (
          <div className={cn(CARD, 'flex items-center gap-3 border-red-400/30 px-4 py-3 sm:px-5')}>
            <p className="min-w-0 flex-1 text-[12.5px] leading-snug text-white">
              Couldn't load the AC coverage rows: {errors.acCoverage}. Most likely your account
              isn't college staff for this learner's college.
            </p>
            <button type="button" onClick={() => void seedCoverage()} disabled={syncingCoverage} className={cn(ACTION_BTN, '-my-0')}>
              {syncingCoverage ? 'Retrying…' : 'Retry sync'}
            </button>
          </div>
        ) : (
          <div className="flex justify-end">
            <button type="button" onClick={() => void seedCoverage()} disabled={syncingCoverage} className={cn(ACTION_BTN, '-my-0')}>
              {syncingCoverage
                ? 'Syncing…'
                : acCoverage.length === 0
                  ? 'Seed AC list from course'
                  : 'Sync AC list'}
            </button>
          </div>
        )}
      </div>

      <div id="otj" className="scroll-mt-20 space-y-3">
        <OtjForecastBadge studentId={core.id} />
        <SectionApprenticeOtj
          id="otj-list"
          studentName={core.name}
          userId={core.user_id}
          collegeStudentId={core.id}
          onAdd={() => setOtjOpen(true)}
        />
      </div>

      <SectionPortfolio id="portfolio" studentName={core.name} userId={core.user_id} data={portfolioHook} />

      <SectionObservations
        id="observations"
        studentId={core.id}
        onAdd={() => setObservationOpen(true)}
        data={observationsHook}
      />

      <SectionQuizzes id="quizzes" studentName={core.name} userId={core.user_id} collegeStudentId={core.id} />

      <SectionEpaReadiness id="epa" studentName={core.name} userId={core.user_id} collegeStudentId={core.id} />

      <AttendanceCard rows={attendance} loading={loading.attendance} onMark={() => setAttendanceOpen(true)} />

      <GradesCard rows={grades} loading={loading.grades} onLog={() => setGradeOpen(true)} />

      <NotesCard notes={notes} loading={loading.notes} onAdd={() => openNote('note')} />

      {/* Actions sheet — every action the canonical page offers, grouped,
          one 44px row each. Role decides the order, never what is shown. */}
      <ActionsSheet
        open={actionsOpen}
        onOpenChange={setActionsOpen}
        first={first}
        role={staffRole}
        handlers={{
          observation: () => setObservationOpen(true),
          attendance: () => setAttendanceOpen(true),
          grade: () => setGradeOpen(true),
          quiz: () => setQuizOpen({}),
          uploadDoc: () => setUploadDocOpen(true),
          otj: () => setOtjOpen(true),
          message: () => setMessageOpen(true),
          note: () => openNote('note'),
          oneToOne: () => openNote('one_to_one'),
          praise: () => openNote('praise'),
          flag: () => openNote('flag'),
          concern: () => openNote('concern'),
          safeguarding: () => openNote('safeguarding'),
          inclusion: () => setInclusionOpen(true),
          tripartite: () => setTripartiteOpen(true),
          parents: () => setParentsOpen(true),
          evidence: () => navigate(`/college/students/${core.id}/evidence`),
          print: () => navigate(`/college/students/${core.id}/print`),
          gdpr: () => void downloadGdpr(),
          askAi: () => navigate(`/college/ai-notebook?student=${core.id}`),
        }}
      />

      {/* Dialogs / sheets — unchanged from the canonical page */}
      <AddPastoralNoteDialog
        open={noteOpen}
        onOpenChange={setNoteOpen}
        studentId={core.id}
        studentName={core.name}
        defaultKind={noteKind}
        onOptimisticStart={(draft) =>
          data.prependOptimisticNote({ ...draft, action_completed_at: null } as PastoralNote)
        }
        onOptimisticConfirm={(token, serverRow) =>
          data.confirmOptimisticNote(token, serverRow as PastoralNote)
        }
        onOptimisticRollback={data.rollbackOptimisticNote}
      />
      <StudentMessageSheet open={messageOpen} onOpenChange={setMessageOpen} studentId={core.id} studentName={core.name} />
      <RecordObservationSheet open={observationOpen} onOpenChange={setObservationOpen} studentId={core.id} studentName={core.name} />
      {core.user_id && (
        <LogCollegeOtjSheet open={otjOpen} onOpenChange={setOtjOpen} studentUserId={core.user_id} studentName={core.name} />
      )}
      <MarkAttendanceSheet open={attendanceOpen} onOpenChange={setAttendanceOpen} studentId={core.id} studentName={core.name} onSaved={refresh} />
      <LogGradeSheet open={gradeOpen} onOpenChange={setGradeOpen} studentId={core.id} studentName={core.name} courseId={core.course_id} onSaved={refresh} />
      <CreateQuizSheet
        open={quizOpen !== null}
        onOpenChange={(o) => {
          if (!o) setQuizOpen(null);
        }}
        collegeStudentId={core.id}
        studentName={core.name}
        initialAcCodes={quizOpen?.acCodes}
        onSaved={() => refresh()}
      />
      <UploadAssessmentDocSheet open={uploadDocOpen} onOpenChange={setUploadDocOpen} collegeStudentId={core.id} studentName={core.name} onSaved={() => refresh()} />
      <StudentInclusionSheet open={inclusionOpen} onOpenChange={setInclusionOpen} studentId={core.id} studentName={core.name} />
      {profile?.college_id && (
        <TripartiteReviewSheet open={tripartiteOpen} onOpenChange={setTripartiteOpen} studentId={core.id} studentName={core.name} collegeId={profile.college_id} />
      )}
      <ParentContactsSheet open={parentsOpen} onOpenChange={setParentsOpen} studentId={core.id} studentName={core.name} />
    </>
  );
}

/* ==========================================================================
   Identity line — one line, not a hero
   ========================================================================== */

function IdentityLine({
  core,
  neighbors,
  onPrev,
  onNext,
}: {
  core: StudentCore;
  neighbors: ReturnType<typeof useCohortNeighbors>;
  onPrev?: () => void;
  onNext?: () => void;
}) {
  const meta = [core.cohort_name, core.course_name, core.status, core.uln ? `ULN ${core.uln}` : null]
    .filter(Boolean)
    .join(' · ');
  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className="-mb-4 flex items-center gap-3 sm:-mb-6"
    >
      <div className="min-w-0 flex-1 text-[13px] leading-snug text-white">
        <span className="font-semibold">{core.name}</span>
        {meta && <span className="text-white"> · {meta}</span>}
      </div>
      {neighbors.position && (
        <div className="-mr-2 flex shrink-0 items-center">
          <button
            type="button"
            onClick={onPrev}
            disabled={!onPrev}
            aria-label={neighbors.prev ? `Previous: ${neighbors.prev.name}` : 'No previous learner'}
            className="flex h-11 w-11 items-center justify-center text-white transition-colors touch-manipulation hover:text-elec-yellow disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
          </button>
          <span className="text-[11px] tabular-nums text-white">
            {neighbors.position.index} / {neighbors.position.total}
          </span>
          <button
            type="button"
            onClick={onNext}
            disabled={!onNext}
            aria-label={neighbors.next ? `Next: ${neighbors.next.name}` : 'No next learner'}
            className="flex h-11 w-11 items-center justify-center text-white transition-colors touch-manipulation hover:text-elec-yellow disabled:opacity-40"
          >
            <ChevronRight className="h-4 w-4" aria-hidden />
          </button>
        </div>
      )}
    </motion.div>
  );
}

/* ==========================================================================
   Risk
   ========================================================================== */

function RiskCard({
  risk,
  history,
  loading,
  computing,
  onCompute,
}: {
  risk: RiskSnapshot | null;
  history: { computed_at: string; score: number; level: string }[];
  loading: boolean;
  computing: boolean;
  onCompute: () => Promise<void>;
}) {
  const level = risk?.level ?? null;
  const bad = level === 'high' || level === 'critical';
  return (
    <section id="risk" className="scroll-mt-20 space-y-3">
      <div className="flex items-end justify-between gap-4">
        <HubSectionHeading>Risk</HubSectionHeading>
        <button type="button" onClick={() => void onCompute()} disabled={computing} className={ACTION_BTN}>
          {computing ? 'Computing…' : risk ? 'Recompute' : 'Compute now'}
        </button>
      </div>
      {loading && !risk ? (
        <div className={cn(CARD, 'h-24 animate-pulse')} />
      ) : !risk ? (
        <div className={cn(CARD, 'px-4 py-5 sm:px-5')}>
          <p className="text-[12.5px] leading-relaxed text-white">
            No risk score yet. Compute one now, or wait for the nightly run.
          </p>
        </div>
      ) : (
        <div className={CARD}>
          <div className="flex flex-wrap items-start gap-5 px-4 py-4 sm:px-5">
            <div>
              <div className="text-[12px] font-medium text-white">Current</div>
              <div
                className={cn(
                  'mt-1 text-[30px] font-semibold leading-none tracking-tight',
                  bad ? 'text-red-300' : level === 'medium' ? 'text-elec-yellow' : 'text-white'
                )}
              >
                {RISK_LABEL[risk.level] ?? risk.level}
              </div>
              <div className="mt-1.5 text-[11.5px] tabular-nums text-white">
                Score {risk.score.toFixed(1)} · updated {shortDate(risk.computed_at)}
              </div>
            </div>
            <div className="min-w-[220px] flex-1">
              <div className="mb-2 text-[12px] font-medium text-white">
                Trend · last {plural(history.length, 'check')}
              </div>
              <TrendSparkline history={history} />
            </div>
          </div>
          {risk.factors.length > 0 && (
            <ul className="divide-y divide-white/[0.10] border-t border-white/[0.10]">
              {risk.factors.slice(0, 5).map((f, i) => {
                const anchor = f.key ? FACTOR_ANCHOR[f.key] : undefined;
                const inner = (
                  <>
                    <span
                      aria-hidden
                      className={cn(
                        'h-8 w-[3px] shrink-0 rounded-full',
                        f.severity >= 0.7 ? 'bg-red-400' : f.severity >= 0.4 ? 'bg-elec-yellow' : 'bg-white/[0.25]'
                      )}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[13px] font-medium leading-snug text-white">{f.label}</span>
                      {f.detail && (
                        <span className="mt-0.5 block text-[11.5px] leading-snug text-white">{f.detail}</span>
                      )}
                    </span>
                    {anchor && <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden />}
                  </>
                );
                return (
                  <li key={i}>
                    {anchor ? (
                      <button
                        type="button"
                        onClick={() => scrollTo(anchor)}
                        className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09] sm:px-5"
                      >
                        {inner}
                      </button>
                    ) : (
                      <div className="flex items-center gap-3 px-4 py-3 sm:px-5">{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}

function TrendSparkline({ history }: { history: { computed_at: string; score: number }[] }) {
  if (history.length < 2) {
    return <div className="text-[11.5px] text-white">Not enough history yet.</div>;
  }
  const w = 240;
  const h = 48;
  const maxScore = Math.max(100, ...history.map((p) => p.score));
  const stepX = w / (history.length - 1);
  const pts = history.map((p, i) => ({
    x: i * stepX,
    y: h - (p.score / maxScore) * h,
  }));
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-[48px] w-full overflow-visible">
      <polyline
        points={pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-elec-yellow"
      />
      {pts.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={i === pts.length - 1 ? 2.5 : 1.5}
          className={i === pts.length - 1 ? 'fill-elec-yellow' : 'fill-white/[0.5]'}
        />
      ))}
    </svg>
  );
}

/* ==========================================================================
   Attendance
   ========================================================================== */

function attendanceTone(status: string | null): { chip: string; text: string } {
  const s = norm(status);
  // Turning up is the expected state and stays quiet; late is worth
  // noticing so it takes volt; an unexplained absence is the one thing here
  // that is actually a problem, so it keeps red. Authorised is quieter than
  // present — excused, not held against them.
  if (s === 'present') return { chip: 'bg-white/[0.35]', text: 'text-white' };
  if (s === 'late') return { chip: 'bg-elec-yellow', text: 'text-elec-yellow' };
  if (s === 'absent') return { chip: 'bg-red-400', text: 'text-red-300' };
  if (s === 'authorised') return { chip: 'bg-white/[0.18]', text: 'text-white' };
  return { chip: 'bg-white/[0.08]', text: 'text-white' };
}

function AttendanceCard({
  rows,
  loading,
  onMark,
}: {
  rows: AttendanceRow[];
  loading: boolean;
  onMark: () => void;
}) {
  const summary = useMemo(() => attendanceSummary(rows), [rows]);
  const last28 = rows.slice(0, 28);

  // This week — Monday to Friday of the current week.
  const today = new Date();
  const monday = new Date(today);
  monday.setUTCDate(today.getUTCDate() - ((today.getUTCDay() + 6) % 7));
  const thisWeek = [0, 1, 2, 3, 4].map((offset) => {
    const d = new Date(monday);
    d.setUTCDate(monday.getUTCDate() + offset);
    const iso = d.toISOString().slice(0, 10);
    return { date: iso, day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'][offset], status: rows.find((r) => r.date === iso)?.status ?? null };
  });

  // Pattern callouts — only when something useful was detected.
  const patterns = useMemo(() => {
    const out: string[] = [];
    if (rows.length < 5) return out;
    const rate = (list: AttendanceRow[]) =>
      list.length ? list.filter((r) => ['present', 'late'].includes(norm(r.status))).length / list.length : null;
    const last7 = rate(rows.slice(0, 7));
    const prior7 = rate(rows.slice(7, 14));
    if (last7 != null && prior7 != null && prior7 - last7 >= 0.2) {
      out.push(`Attendance dropped this week (${Math.round(last7 * 100)}%) against last (${Math.round(prior7 * 100)}%).`);
    }
    const byDay = new Map<number, { absent: number; total: number }>();
    for (const r of rows.slice(0, 28)) {
      const d = new Date(r.date).getUTCDay();
      const m = byDay.get(d) ?? { absent: 0, total: 0 };
      m.total += 1;
      if (norm(r.status) === 'absent') m.absent += 1;
      byDay.set(d, m);
    }
    const names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    for (const [day, st] of byDay) {
      if (st.total >= 3 && st.absent >= Math.ceil(st.total * 0.6)) {
        out.push(`${names[day]}s: absent ${st.absent} of ${st.total} sessions in the last four weeks — worth a conversation.`);
      }
    }
    if (summary.late >= 4) {
      out.push(`${summary.late} late marks in the last 28 sessions — punctuality is the pattern, not absence.`);
    }
    if (summary.streak >= 2) {
      out.push(`${summary.streak} consecutive absences, most recent ${shortDate(rows[0]?.date)}. Follow up today.`);
    }
    return out.slice(0, 4);
  }, [rows, summary]);

  return (
    <section id="attendance" className="scroll-mt-20 space-y-3">
      <div className="flex items-end justify-between gap-4">
        <HubSectionHeading>Attendance</HubSectionHeading>
        <button type="button" onClick={onMark} className={cn(ACTION_BTN, 'no-print')}>
          Mark attendance
        </button>
      </div>
      {loading && rows.length === 0 ? (
        <div className={cn(CARD, 'h-32 animate-pulse')} />
      ) : rows.length === 0 ? (
        <div className={cn(CARD, 'px-4 py-5 sm:px-5')}>
          <p className="text-[12.5px] leading-relaxed text-white">
            No attendance recorded yet. Take the first register to begin the trend.
          </p>
        </div>
      ) : (
        <div className={CARD}>
          <div className="px-4 py-4 sm:px-5">
            <div className="flex items-end gap-4">
              <div
                className={cn(
                  'text-[30px] font-semibold leading-none tabular-nums tracking-tight',
                  summary.rate !== null && summary.rate < 85
                    ? 'text-red-300'
                    : summary.rate !== null && summary.rate < 95
                      ? 'text-elec-yellow'
                      : 'text-white'
                )}
              >
                {summary.rate === null ? '—' : `${summary.rate}%`}
              </div>
              <div className="pb-0.5 text-[11.5px] leading-snug tabular-nums text-white">
                attended, last {plural(summary.sessions, 'session')}
                <br />
                {summary.attended} present or late · {summary.absent} absent
              </div>
            </div>

            <div className="mt-4 text-[12px] font-medium text-white">This week</div>
            <div className="mt-1.5 grid grid-cols-5 gap-1.5">
              {thisWeek.map((d) => {
                const tone = attendanceTone(d.status);
                return (
                  <div
                    key={d.date}
                    title={`${d.date} · ${d.status ?? 'no record'}`}
                    className="rounded-xl border border-white/[0.12] px-1 py-2 text-center"
                  >
                    <div className="text-[10.5px] font-semibold text-white">{d.day}</div>
                    <div className={cn('mt-0.5 truncate text-[11px] font-medium', tone.text)}>
                      {d.status ?? '—'}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 text-[12px] font-medium text-white">Last 28 sessions (newest right)</div>
            <div className="mt-1.5 flex flex-wrap gap-[3px]">
              {last28
                .slice()
                .reverse()
                .map((a) => (
                  <span
                    key={a.id}
                    title={`${a.date} · ${a.status}`}
                    className={cn('h-5 w-5 rounded-[3px]', attendanceTone(a.status).chip)}
                  />
                ))}
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-white">
              <Legend colour="bg-white/[0.35]" label="Present" />
              <Legend colour="bg-elec-yellow" label="Late" />
              <Legend colour="bg-red-400" label="Absent" />
              <Legend colour="bg-white/[0.18]" label="Authorised" />
            </div>
          </div>

          {patterns.length > 0 && (
            <ul className="divide-y divide-white/[0.10] border-t border-white/[0.10]">
              {patterns.map((p, i) => (
                <li key={i} className="flex items-center gap-3 px-4 py-3 sm:px-5">
                  <span aria-hidden className="h-8 w-[3px] shrink-0 rounded-full bg-elec-yellow" />
                  <p className="text-[12.5px] leading-snug text-white">{p}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}

function Legend({ colour, label }: { colour: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={cn('inline-block h-2 w-2 rounded-sm', colour)} />
      {label}
    </span>
  );
}

/* ==========================================================================
   Grades
   ========================================================================== */

const GRADE_RANK: Record<string, number> = { distinction: 4, merit: 3, pass: 2, fail: 1 };

function GradesCard({ rows, loading, onLog }: { rows: GradeRow[]; loading: boolean; onLog: () => void }) {
  const analysis = useMemo(() => {
    const g = (x: string | null) => (x ?? '').toLowerCase();
    const ranked = rows.map((r) => GRADE_RANK[g(r.grade)] ?? null).filter((n): n is number => n != null);
    const avgRank = ranked.length ? ranked.reduce((s, n) => s + n, 0) / ranked.length : null;
    const predicted =
      avgRank == null ? null : avgRank >= 3.5 ? 'Distinction' : avgRank >= 2.5 ? 'Merit' : avgRank >= 1.5 ? 'Pass' : 'Fail';
    const scored = rows.filter((r) => r.score != null);
    const avgScore = scored.length ? Math.round(scored.reduce((s, r) => s + (r.score ?? 0), 0) / scored.length) : null;
    const counts = {
      distinction: rows.filter((r) => g(r.grade) === 'distinction').length,
      merit: rows.filter((r) => g(r.grade) === 'merit').length,
      pass: rows.filter((r) => g(r.grade) === 'pass').length,
      fail: rows.filter((r) => g(r.grade) === 'fail').length,
    };
    return { predicted, avgScore, counts, graded: ranked.length };
  }, [rows]);

  return (
    <section id="grades" className="scroll-mt-20 space-y-3">
      <div className="flex items-end justify-between gap-4">
        <HubSectionHeading>Assessments &amp; grades</HubSectionHeading>
        <button type="button" onClick={onLog} className={cn(ACTION_BTN, 'no-print')}>
          Log grade
        </button>
      </div>
      {loading && rows.length === 0 ? (
        <div className={cn(CARD, 'h-24 animate-pulse')} />
      ) : rows.length === 0 ? (
        <div className={cn(CARD, 'px-4 py-5 sm:px-5')}>
          <p className="text-[12.5px] leading-relaxed text-white">No assessment grades recorded yet.</p>
        </div>
      ) : (
        <div className={CARD}>
          <div className="grid grid-cols-2 divide-x divide-white/[0.10] border-b border-white/[0.10]">
            <div className="px-4 py-3.5 sm:px-5">
              <div className="text-[12px] font-medium text-white">Predicted band</div>
              <div
                className={cn(
                  'mt-1 text-[24px] font-semibold leading-none tracking-tight',
                  analysis.predicted === 'Fail' ? 'text-red-300' : 'text-white'
                )}
              >
                {analysis.predicted ?? '—'}
              </div>
              <div className="mt-1 text-[11px] tabular-nums text-white">
                {analysis.graded > 0
                  ? [
                      analysis.counts.distinction ? `${analysis.counts.distinction} distinction` : null,
                      analysis.counts.merit ? `${analysis.counts.merit} merit` : null,
                      analysis.counts.pass ? `${analysis.counts.pass} pass` : null,
                      analysis.counts.fail ? `${analysis.counts.fail} fail` : null,
                    ]
                      .filter(Boolean)
                      .join(' · ')
                  : 'No banded grades yet'}
              </div>
            </div>
            <div className="px-4 py-3.5 sm:px-5">
              <div className="text-[12px] font-medium text-white">Average score</div>
              <div className="mt-1 text-[24px] font-semibold leading-none tabular-nums tracking-tight text-white">
                {analysis.avgScore != null ? `${analysis.avgScore}%` : '—'}
              </div>
              <div className="mt-1 text-[11px] tabular-nums text-white">{plural(rows.length, 'attempt')} on record</div>
            </div>
          </div>
          <ul className="divide-y divide-white/[0.10]">
            {rows.slice(0, 8).map((g) => {
              const fail = (g.grade ?? '').toLowerCase() === 'fail';
              return (
                <li key={g.id} className="flex items-start gap-3 px-4 py-3 sm:px-5">
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13px] font-medium text-white">{g.unit_name ?? '—'}</div>
                    <div className="mt-0.5 text-[11px] capitalize tabular-nums text-white">
                      {g.assessment_type?.replace(/_/g, ' ') ?? 'Assessment'}
                      {g.assessed_at && ` · ${shortDate(g.assessed_at)}`}
                    </div>
                    {g.feedback && (
                      <p className="mt-1 line-clamp-2 text-[11.5px] leading-snug text-white">{g.feedback}</p>
                    )}
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-0.5">
                    <span
                      className={cn(
                        'inline-flex items-center rounded-full border px-2 py-0.5 text-[10.5px] font-semibold capitalize',
                        fail
                          ? 'border-red-400/30 bg-red-500/[0.08] text-red-300'
                          : 'border-white/[0.14] bg-white/[0.06] text-white'
                      )}
                    >
                      {g.grade ?? '—'}
                    </span>
                    {g.score != null && <span className="text-[11px] tabular-nums text-white">{g.score}%</span>}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </section>
  );
}

/* ==========================================================================
   Pastoral notes
   ========================================================================== */

function NotesCard({ notes, loading, onAdd }: { notes: PastoralNote[]; loading: boolean; onAdd: () => void }) {
  const [filter, setFilter] = useState<'all' | 'flags' | 'actions'>('all');
  const filtered = useMemo(() => {
    if (filter === 'flags') return notes.filter((n) => ['flag', 'concern', 'safeguarding'].includes(n.kind));
    if (filter === 'actions') return notes.filter((n) => n.action_required && !n.action_completed_at);
    return notes;
  }, [notes, filter]);

  return (
    <section id="notes" className="scroll-mt-20 space-y-3">
      <div className="flex items-end justify-between gap-4">
        <HubSectionHeading>Notes &amp; interventions</HubSectionHeading>
        <button type="button" onClick={onAdd} className={cn(ACTION_BTN, 'no-print')}>
          Add note
        </button>
      </div>
      <div className="-my-1 flex items-center gap-1">
        {(['all', 'flags', 'actions'] as const).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={cn(
              'flex h-11 items-center px-2.5 text-[12px] font-semibold capitalize transition-colors touch-manipulation',
              filter === f ? 'text-elec-yellow' : 'text-white'
            )}
          >
            {f === 'actions' ? 'Open actions' : f}
          </button>
        ))}
      </div>
      {loading && notes.length === 0 ? (
        <div className={cn(CARD, 'h-24 animate-pulse')} />
      ) : filtered.length === 0 ? (
        <div className={cn(CARD, 'px-4 py-5 sm:px-5')}>
          <p className="text-[12.5px] leading-relaxed text-white">
            {filter === 'actions' ? 'No outstanding actions.' : filter === 'flags' ? 'No flags.' : 'No notes yet.'}
          </p>
        </div>
      ) : (
        <div className={CARD}>
          <ul className="divide-y divide-white/[0.10]">
            {filtered.map((n) => (
              <NoteRow key={n.id} note={n} />
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

function NoteRow({ note }: { note: PastoralNote }) {
  const kindTone =
    note.kind === 'safeguarding'
      ? 'text-red-300'
      : note.kind === 'flag' || note.kind === 'concern'
        ? 'text-elec-yellow'
        : note.kind === 'praise'
          ? 'text-emerald-300'
          : 'text-white';
  const open = !!note.action_required && !note.action_completed_at;
  const due = daysUntil(note.action_by_date);
  return (
    <li className="px-4 py-3.5 sm:px-5">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] tabular-nums">
        <span className={cn('font-semibold capitalize', kindTone)}>{note.kind.replace(/_/g, ' ')}</span>
        <span className="text-white">{shortDate(note.created_at)}</span>
        {note.author_name && <span className="text-white">{note.author_name}</span>}
        {note.visibility === 'safeguarding' && <span className="font-semibold text-red-300">Restricted</span>}
      </div>
      {note.title && <div className="mt-1 text-[14px] font-semibold leading-tight text-white">{note.title}</div>}
      <p className="mt-1 whitespace-pre-line text-[13px] leading-relaxed text-white">{note.body}</p>
      {note.action_required && (
        <div className="mt-2.5 border-t border-white/[0.10] pt-2.5 text-[12px] leading-relaxed text-white">
          <span className={cn('mr-2 font-semibold', open ? 'text-elec-yellow' : 'text-emerald-300')}>
            {open ? 'Action' : 'Done'}
          </span>
          {note.action_required}
          {note.action_by_date && (
            <span className={cn('ml-2 tabular-nums', open && due !== null && due < 0 ? 'font-semibold text-red-300' : 'text-white')}>
              · by {shortDate(note.action_by_date)}
            </span>
          )}
        </div>
      )}
    </li>
  );
}

/* ==========================================================================
   Actions sheet — everything the canonical page's pill rail offered
   ========================================================================== */

type ActionKey =
  | 'observation'
  | 'attendance'
  | 'grade'
  | 'quiz'
  | 'uploadDoc'
  | 'otj'
  | 'message'
  | 'note'
  | 'oneToOne'
  | 'praise'
  | 'flag'
  | 'concern'
  | 'safeguarding'
  | 'inclusion'
  | 'tripartite'
  | 'parents'
  | 'evidence'
  | 'print'
  | 'gdpr'
  | 'askAi';

const ACTION_LABEL: Record<ActionKey, { title: string; reason: string }> = {
  observation: { title: 'Record observation', reason: 'Assessment evidence with ACs and outcome' },
  attendance: { title: 'Mark attendance', reason: 'Register for a session' },
  grade: { title: 'Log grade', reason: 'Assessment result and feedback' },
  quiz: { title: 'Send a quiz', reason: 'AI-generated knowledge check' },
  uploadDoc: { title: 'Grade from document', reason: 'Upload marked work and record it' },
  otj: { title: 'Log off-the-job', reason: 'Hours the college delivered' },
  message: { title: 'Message', reason: 'Direct message to the learner' },
  note: { title: 'Note', reason: 'Pastoral note on the record' },
  oneToOne: { title: '1-2-1', reason: 'Log a one-to-one meeting' },
  praise: { title: 'Praise', reason: 'Recognise good work' },
  flag: { title: 'Flag', reason: 'Something to keep an eye on' },
  concern: { title: 'Concern', reason: 'Wellbeing or progress worry' },
  safeguarding: { title: 'Safeguarding', reason: 'Restricted — DSL only' },
  inclusion: { title: 'Inclusion plan', reason: 'Support arrangements and reviews' },
  tripartite: { title: 'Tripartite review', reason: 'Learner, employer and college' },
  parents: { title: 'Parent contacts', reason: 'Next of kin and consent' },
  evidence: { title: 'Evidence chain', reason: 'Inspector-ready "prove it" view' },
  print: { title: 'Print summary', reason: 'PDF of this learner' },
  gdpr: { title: 'GDPR pack', reason: 'Everything held on them, as a ZIP' },
  askAi: { title: 'Ask AI', reason: 'Notebook with this learner loaded' },
};

const RECORD: ActionKey[] = ['observation', 'attendance', 'grade', 'quiz', 'uploadDoc', 'otj', 'tripartite'];
const COMMUNICATE: ActionKey[] = ['oneToOne', 'note', 'message', 'parents'];
const FLAG: ActionKey[] = ['praise', 'flag', 'concern', 'safeguarding'];
const UTILITY: ActionKey[] = ['inclusion', 'evidence', 'print', 'gdpr', 'askAi'];

function groupsForRole(role: ReturnType<typeof useStaffRole>): { label: string; keys: ActionKey[] }[] {
  // EQA is a READ-ONLY external role — only view/export, never record,
  // communicate or flag (those also can't write at the DB layer).
  if (role.isEqa) return [{ label: 'Review', keys: ['evidence', 'print', 'gdpr'] }];
  if (role.isDsl) {
    return [
      { label: 'Safeguarding', keys: ['safeguarding'] },
      { label: 'Record', keys: RECORD },
      { label: 'Communicate', keys: COMMUNICATE },
      { label: 'Flag', keys: FLAG.filter((k) => k !== 'safeguarding') },
      { label: 'More', keys: UTILITY },
    ];
  }
  if (role.isAssessor || role.isIqa) {
    return [
      { label: 'Record', keys: RECORD },
      { label: 'Communicate', keys: COMMUNICATE },
      { label: 'Flag', keys: FLAG },
      { label: 'More', keys: UTILITY },
    ];
  }
  return [
    { label: 'Communicate', keys: COMMUNICATE },
    { label: 'Record', keys: RECORD },
    { label: 'Flag', keys: FLAG },
    { label: 'More', keys: UTILITY },
  ];
}

function ActionsSheet({
  open,
  onOpenChange,
  first,
  role,
  handlers,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  first: string;
  role: ReturnType<typeof useStaffRole>;
  handlers: Record<ActionKey, () => void>;
}) {
  const groups = groupsForRole(role);
  const run = (k: ActionKey) => {
    onOpenChange(false);
    // Let the sheet close before the next one opens.
    setTimeout(() => handlers[k](), 120);
  };
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] overflow-hidden rounded-t-2xl border-white/10 p-0">
        <div className="flex h-full flex-col bg-background">
          <div className="flex shrink-0 justify-center pb-1 pt-2.5">
            <div className="h-1 w-10 rounded-full bg-white/20" />
          </div>
          <div className="shrink-0 border-b border-white/[0.10] px-5 pb-3">
            <SheetTitle className="text-[17px] font-semibold text-white">Actions for {first}</SheetTitle>
            <SheetDescription className="mt-0.5 text-[12px] text-white">
              Everything you can record, send or flag on this learner.
            </SheetDescription>
          </div>
          <div
            className="flex-1 space-y-5 overflow-y-auto overscroll-contain px-4 py-4"
            style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
          >
            {groups.map((g) => (
              <div key={g.label} className="space-y-2">
                <HubSectionHeading>{g.label}</HubSectionHeading>
                <ul className={cn(CARD, 'divide-y divide-white/[0.10]')}>
                  {g.keys.map((k) => (
                    <li key={k}>
                      <button
                        type="button"
                        onClick={() => run(k)}
                        className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09]"
                      >
                        <span
                          aria-hidden
                          className={cn(
                            'h-8 w-[3px] shrink-0 rounded-full',
                            k === 'safeguarding' ? 'bg-red-400' : 'bg-white/[0.25]'
                          )}
                        />
                        <span className="min-w-0 flex-1">
                          <span className="block text-[14px] font-semibold leading-tight text-white">
                            {ACTION_LABEL[k].title}
                          </span>
                          <span className="mt-0.5 block text-[12px] leading-tight text-white">
                            {ACTION_LABEL[k].reason}
                          </span>
                        </span>
                        <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
