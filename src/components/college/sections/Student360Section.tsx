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

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/components/ui/sheet';
import { EmptyState, LoadingState, containerVariants, itemVariants } from '@/components/college/primitives';
import {
  HubQuickStart,
  HubSectionHeading,
  type HubQuickAction,
  type HubWorkItem,
} from '@/components/hub/HubPrimitives';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import { PageHelpButton, type PageHelpContent } from '@/components/hub/PageHelp';
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
import { useOtjSummary } from '@/hooks/useOtjSummary';
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
import { SectionProgressReviews, useReviewDueBy } from '@/components/college/student360/SectionProgressReviews';
import { ParentContactsSheet } from '@/components/college/sheets/ParentContactsSheet';
import { OtjForecastBadge } from '@/components/college/widgets/OtjForecastBadge';
import { SectionNextBestAction } from '@/components/college/student360/SectionNextBestAction';
import { SectionIlp } from '@/components/college/student360/SectionIlp';
import { SectionSupportNeeds } from '@/components/college/student360/SectionSupportNeeds';
import { SectionCourseProgress } from '@/components/college/student360/SectionCourseProgress';
import { StudentAssessmentConfidence } from '@/components/college/student360/StudentAssessmentConfidence';
import { SectionAcMatrix } from '@/components/college/student360/SectionAcMatrix';
import { SectionAssessCriteria } from '@/components/college/student360/SectionAssessCriteria';
import { SectionApprenticeOtj } from '@/components/college/student360/SectionApprenticeOtj';
import { SectionSiteDiary } from '@/components/college/student360/SectionSiteDiary';
import { SectionPortfolio } from '@/components/college/student360/SectionPortfolio';
import { SectionObservations } from '@/components/college/student360/SectionObservations';
import { SectionQuizzes } from '@/components/college/student360/SectionQuizzes';
import {
  ActivityChart,
  AttendanceStrip,
  CriteriaByUnit,
  GoalsCard,
  HoursChart,
  PortfolioDonut,
  ProgrammeJourney,
  RiskTrend,
  Ring,
  VIS_CARD,
} from '@/components/college/student360/Student360Visuals';
import { SectionEpaReadiness } from '@/components/college/student360/SectionEpaReadiness';

interface Student360SectionProps {
  studentId: string;
  onNavigate: (section: CollegeSection) => void;
  onBack: () => void;
}

/* ──────────────────────────────────────────────────────────────────────────
   Shared bits
   ────────────────────────────────────────────────────────────────────────── */

const CARD = cn('overflow-hidden rounded-3xl border border-white/[0.08]', CARD_SURFACE);

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

function longDate(iso: string | null | undefined): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function plural(n: number, one: string, many = `${one}s`): string {
  return `${n} ${n === 1 ? one : many}`;
}

function scrollTo(anchor: string) {
  document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* Student 360 is an overview plus one page per area (Andrew, 6 Oct: "the
   page is massive… cards for stuff"; ELE-2015). An area opens with the URL
   hash, so the old deep links (#ilp, #otj, #portfolio…) land on its page. */
type AreaKey =
  | 'assess'
  | 'portfolio'
  | 'otj'
  | 'ilp'
  | 'reviews'
  | 'diary'
  | 'observations'
  | 'quizzes'
  | 'attendance'
  | 'grades'
  | 'notes'
  | 'risk';

const AREA_FOR: Record<string, AreaKey> = {
  assess: 'assess',
  coverage: 'assess',
  progress: 'assess',
  portfolio: 'portfolio',
  otj: 'otj',
  'otj-list': 'otj',
  ilp: 'ilp',
  support: 'ilp',
  reviews: 'reviews',
  diary: 'diary',
  observations: 'observations',
  quizzes: 'quizzes',
  epa: 'quizzes',
  attendance: 'attendance',
  grades: 'grades',
  notes: 'notes',
  risk: 'risk',
  'next-best': 'risk',
};

const AREA_TITLE: Record<AreaKey, string> = {
  assess: 'Criteria and assessment',
  portfolio: 'Portfolio and evidence',
  otj: 'Off-the-job hours',
  ilp: 'Learning plan and support',
  reviews: 'Progress reviews',
  diary: 'Site diary',
  observations: 'Observations',
  quizzes: 'Quizzes and EPA readiness',
  attendance: 'Attendance',
  grades: 'Grades',
  notes: 'Notes and one-to-ones',
  risk: 'Risk and next best action',
};

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
  // The programme dates and planned-to-date hours, as the hours page counts them.
  const { data: otj } = useOtjSummary(core?.user_id ?? null);
  const reviewDueBy = useReviewDueBy(studentId || null);
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
  const [tripartiteReviewId, setTripartiteReviewId] = useState<string | null>(null);
  const [parentsOpen, setParentsOpen] = useState(false);
  const [actionsOpen, setActionsOpen] = useState(false);

  const openNote = useCallback((k: NoteKind) => {
    setNoteKind(k);
    setNoteOpen(true);
  }, []);

  const area: AreaKey | null = AREA_FOR[location.hash.replace(/^#/, '')] ?? null;
  // True when this area page was opened from the overview in this visit, so
  // "Overview" can step back instead of stacking another history entry.
  const fromOverview = useRef(false);
  const openArea = useCallback(
    (anchor: string) => {
      if (!AREA_FOR[anchor]) return scrollTo(anchor);
      // Keep the exact anchor (#epa, #coverage…): the area opens and scrolls to it.
      if (!AREA_FOR[location.hash.replace(/^#/, '')]) fromOverview.current = true;
      navigate({ search: location.search, hash: anchor }, { replace: !!AREA_FOR[location.hash.replace(/^#/, '')] });
      if (AREA_FOR[anchor] === anchor) window.scrollTo({ top: 0 });
    },
    [navigate, location.search, location.hash]
  );
  const closeArea = useCallback(() => {
    if (fromOverview.current) {
      fromOverview.current = false;
      navigate(-1);
    } else {
      navigate({ search: location.search, hash: '' }, { replace: true });
    }
    window.scrollTo({ top: 0 });
  }, [navigate, location.search]);

  // Hash-scroll: `…&studentId=…#ilp` from the inbox or notification bell.
  // Retries a few times so a section that mounts after data lands is not
  // missed. `#messages` has no inline section — open the sheet instead.
  useEffect(() => {
    const hash = location.hash.replace(/^#/, '');
    if (!hash) return;
    if (hash === 'messages') {
      setMessageOpen(true);
      // Clear it, so a later refresh or the next learner doesn't reopen the sheet.
      navigate({ search: location.search, hash: '' }, { replace: true });
      return;
    }
    if (AREA_FOR[hash] === hash) return; // the area page itself, opened at the top
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
    (id: string) =>
      navigate(`/college?section=student360&studentId=${encodeURIComponent(id)}${location.hash}`),
    [navigate, location.hash]
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
        openArea('portfolio');
        break;
      case 'edit_ilp':
      case 'add_ilp_goal':
        openArea('ilp');
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
        onClick: () => openArea('risk'),
      });
    }

    if (att.streak >= 2) {
      items.push({
        id: 'absences',
        title: `${att.streak} absences in a row`,
        reason: `Most recent ${shortDate(attendance[0]?.date)} · follow up today`,
        urgent: true,
        onClick: () => openArea('attendance'),
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
        onClick: () => openArea('notes'),
      });
    }

    const { ilp, rollUp } = ilpHook;
    if (!ilp && !ilpHook.loading) {
      items.push({
        id: 'ilp-none',
        title: 'No learning plan yet',
        reason: `Generate one with AI or start a blank plan for ${first}`,
        onClick: () => openArea('ilp'),
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
          onClick: () => openArea('ilp'),
        });
      }
    }
    if (rollUp.overdue > 0) {
      items.push({
        id: 'ilp-overdue',
        title: `${plural(rollUp.overdue, 'ILP goal')} overdue`,
        reason: 'Past its target date and not done',
        urgent: true,
        onClick: () => openArea('ilp'),
      });
    }
    if (rollUp.blocked > 0) {
      items.push({
        id: 'ilp-blocked',
        title: `${plural(rollUp.blocked, 'ILP goal')} blocked`,
        reason: `${first} can't move on this without you`,
        urgent: true,
        onClick: () => openArea('ilp'),
      });
    }
    if (rollUp.unread_student_comments > 0) {
      items.push({
        id: 'ilp-replies',
        title: `${plural(rollUp.unread_student_comments, 'reply', 'replies')} from ${first}`,
        reason: 'Learner comments on ILP goals with no answer from you',
        onClick: () => openArea('ilp'),
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
        onClick: () => openArea('observations'),
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
        onClick: () => openArea('portfolio'),
      });
    }
    if (pr.overdue_requirements > 0) {
      items.push({
        id: 'portfolio-overdue',
        title: `${plural(pr.overdue_requirements, 'evidence requirement')} overdue`,
        reason: 'Requirements you set that have passed their due date',
        urgent: true,
        onClick: () => openArea('portfolio'),
      });
    }

    // Progress review past the 3-calendar-month limit (funding rules para 97).
    {
      const d = daysUntil(reviewDueBy);
      if (d !== null && d <= 14) {
        items.push({
          id: 'review-due',
          title: d < 0 ? 'Progress review overdue' : 'Progress review due',
          reason: `Three-way with the employer · due by ${shortDate(reviewDueBy)}`,
          trailing: d < 0 ? `${-d}d late` : d === 0 ? 'today' : `${d}d`,
          urgent: d < 0,
          onClick: () => openArea('reviews'),
        });
      }
    }

    if (forecast && forecast.risk === 'red') {
      items.push({
        id: 'otj-pace',
        title: 'Off-the-job behind pace',
        reason: `Forecast ${forecast.forecast_pct}% of the ${forecast.required_hours}h required`,
        trailing: `${Math.abs(forecast.shortfall_hours)}h short`,
        urgent: true,
        onClick: () => openArea('otj'),
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
    reviewDueBy,
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

  /* ── Area cards: one per part of the record, figure first ───────── */
  const ilpRoll = ilpHook.rollUp;
  const pfRoll = portfolioHook.rollUp;
  const pfWaiting = pfRoll.by_status.submitted + pfRoll.by_status.in_review + pfRoll.by_status.under_review + pfRoll.by_status.resubmitted;
  const reviewDays = daysUntil(reviewDueBy);
  const lastObs = observationsHook.observations[0]?.observed_at ?? null;
  const lastGrade = grades[0] ?? null;

  const progStart = core.start_date ?? otj?.start_date ?? null;
  const progEnd = core.expected_end_date ?? otj?.end_date ?? null;
  const plannedNow = otj?.planned_to_date_hours ?? null;
  const countedNow = otj?.counted_hours ?? forecast?.current_hours ?? 0;
  const pacePct = plannedNow ? Math.round((countedNow / plannedNow) * 100) : null;
  const goPortfolio = () => openArea('portfolio');

  const cards: AreaCardData[] = [
    {
      key: 'assess',
      title: 'Criteria and assessment',
      figure: coverage.pct === null ? '—' : `${coverage.pct}%`,
      unit: 'covered',
      line: coverage.total === 0 ? 'No criteria list yet' : `${coverage.done} of ${coverage.total} criteria evidenced`,
      pct: coverage.pct,
    },
    {
      key: 'portfolio',
      title: 'Portfolio and evidence',
      figure: String(pfRoll.total_submissions),
      unit: pfRoll.total_submissions === 1 ? 'submission' : 'submissions',
      line: pfWaiting > 0 ? `${pfWaiting} waiting on an assessor` : pfRoll.iqa_requires_action > 0 ? `${pfRoll.iqa_requires_action} need action from IQA` : `${pfRoll.by_status.approved} signed off`,
      warn: pfWaiting > 0,
    },
    {
      key: 'otj',
      title: 'Off-the-job hours',
      figure: forecast ? `${forecast.current_hours}h` : '—',
      unit: forecast && forecast.required_hours > 0 ? `of ${forecast.required_hours}h` : '',
      line: !core.user_id ? 'No app account linked yet' : !forecast ? 'Working it out…' : forecast.risk === 'unknown' ? 'No start and end dates' : forecast.risk === 'green' ? 'On course' : `Forecast ${forecast.forecast_pct}% by the end`,
      pct: forecast && forecast.required_hours > 0 ? Math.min(100, Math.round((forecast.current_hours / forecast.required_hours) * 100)) : null,
      warn: forecast?.risk === 'red',
    },
    {
      key: 'reviews',
      title: 'Progress reviews',
      figure: reviewDays === null ? '—' : reviewDays < 0 ? `${-reviewDays}d` : `${reviewDays}d`,
      unit: reviewDays === null ? '' : reviewDays < 0 ? 'overdue' : 'until due',
      line: !reviewDueBy ? 'No review history yet' : reviewDays !== null && reviewDays < 0 ? `Was due by ${shortDate(reviewDueBy)}, book it now` : `Next review due by ${shortDate(reviewDueBy)}`,
      warn: reviewDays !== null && reviewDays <= 14,
    },
    {
      key: 'ilp',
      title: 'Learning plan and support',
      figure: ilpRoll.total_goals ? `${ilpRoll.completion_percent}%` : '—',
      unit: ilpRoll.total_goals ? 'of goals met' : '',
      line: ilpRoll.total_goals === 0 ? 'No goals set yet' : ilpRoll.overdue > 0 ? `${ilpRoll.overdue} goal${ilpRoll.overdue === 1 ? '' : 's'} past target date` : `${ilpRoll.in_progress} in progress`,
      pct: ilpRoll.total_goals ? ilpRoll.completion_percent : null,
      warn: ilpRoll.overdue > 0,
    },
    {
      key: 'attendance',
      title: 'Attendance',
      figure: att.rate === null ? '—' : `${att.rate}%`,
      unit: att.sessions ? `of ${plural(att.sessions, 'session')}` : '',
      line: att.rate === null ? 'No register taken yet' : att.streak >= 2 ? `${att.streak} absences in a row` : `${att.absent} absent · ${att.late} late`,
      pct: att.rate,
      warn: att.rate !== null && att.rate < 85,
    },
    {
      key: 'observations',
      title: 'Observations',
      figure: String(observationsHook.observations.length),
      unit: 'recorded',
      line: lastObs ? `Last on ${shortDate(lastObs)}` : 'None recorded yet',
    },
    {
      key: 'grades',
      title: 'Grades',
      figure: String(grades.length),
      unit: grades.length === 1 ? 'result' : 'results',
      line: lastGrade ? `Latest: ${lastGrade.unit_name ?? lastGrade.assessment_type ?? 'result'}${lastGrade.grade ? ` · ${lastGrade.grade}` : ''}` : 'No results logged',
    },
    {
      key: 'quizzes',
      title: 'Quizzes and EPA readiness',
      figure: '',
      line: 'Quiz scores, weak topics and how ready they are for gateway',
    },
    {
      key: 'diary',
      title: 'Site diary',
      figure: '',
      line: `Days ${first} has shared from site, and questions for you`,
    },
    {
      key: 'notes',
      title: 'Notes and one-to-ones',
      figure: String(notes.length),
      unit: notes.length === 1 ? 'note' : 'notes',
      line: openActions.length ? `${openActions.length} open action${openActions.length === 1 ? '' : 's'}` : 'No open actions',
      warn: openActions.length > 0,
    },
    {
      key: 'risk',
      title: 'Risk and next best action',
      figure: riskLevel ? RISK_LABEL[riskLevel] ?? riskLevel : '—',
      line: topFactor ? topFactor.label : riskLevel ? 'No active risk factors' : 'No risk score yet',
      warn: riskBad,
    },
  ];

  const header = (
    <ProfileHeader
      core={core}
      neighbors={neighbors}
      onPrev={prevId ? () => goTo(prevId) : undefined}
      onNext={nextId ? () => goTo(nextId) : undefined}
      compact={!!area}
    />
  );

  return (
    <>
      {area ? (
        <>
          {header}
          <AreaBar
            title={AREA_TITLE[area]}
            onBack={closeArea}
            areas={cards.map((c) => ({ key: c.key, title: c.title }))}
            current={area}
            onPick={(k) => openArea(k)}
          />
          <div className="space-y-6">
            {area === 'assess' && (
              <>
                <CriteriaByUnit rows={acCoverage} limit={60} />
          <SectionCourseProgress id="progress" studentName={core.name} userId={core.user_id} />

          <StudentAssessmentConfidence studentId={core.id} />

          <SectionAssessCriteria id="assess" studentName={core.name} userId={core.user_id} />

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
              </>
            )}
            {area === 'otj' && (
              <>
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
              </>
            )}
            {area === 'reviews' && (
              <>
          <SectionProgressReviews
            id="reviews"
            studentId={core.id}
            studentName={core.name}
            onOpen={() => {
              setTripartiteReviewId(null);
              setTripartiteOpen(true);
            }}
          />
              </>
            )}
            {area === 'ilp' && (
              <>
                <GoalsCard total={ilpRoll.total_goals} completed={ilpRoll.completed} inProgress={ilpRoll.in_progress} notStarted={ilpRoll.not_started} blocked={ilpRoll.blocked} overdueStatus={ilpRoll.total_goals - ilpRoll.completed - ilpRoll.in_progress - ilpRoll.not_started - ilpRoll.blocked} overdue={ilpRoll.overdue} />
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
              </>
            )}
            {area === 'risk' && (
              <>
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
            onJump={openArea}
          />
              </>
            )}
            {area === 'diary' && (
              <>
          <SectionSiteDiary
            id="diary"
            studentName={core.name}
            userId={core.user_id}
            onMessage={() => setMessageOpen(true)}
          />
              </>
            )}
            {area === 'portfolio' && (
              <>
                <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-2 [&>section]:h-auto">
                  <PortfolioDonut byStatus={pfRoll.by_status} items={pfRoll.total_items} verifiedItems={pfRoll.items_supervisor_verified} />
                  <EvidencePackLink first={first} onOpen={() => navigate(`/college/evidence-pack/${core.id}`)} />
                </div>
          <SectionPortfolio id="portfolio" studentName={core.name} userId={core.user_id} data={portfolioHook} />
              </>
            )}
            {area === 'observations' && (
              <>
          <SectionObservations
            id="observations"
            studentId={core.id}
            onAdd={() => setObservationOpen(true)}
            data={observationsHook}
          />
              </>
            )}
            {area === 'quizzes' && (
              <>
          <SectionQuizzes id="quizzes" studentName={core.name} userId={core.user_id} collegeStudentId={core.id} />

          <SectionEpaReadiness id="epa" studentName={core.name} userId={core.user_id} collegeStudentId={core.id} />
              </>
            )}
            {area === 'attendance' && (
              <>
          <AttendanceCard rows={attendance} loading={loading.attendance} onMark={() => setAttendanceOpen(true)} />
              </>
            )}
            {area === 'grades' && (
              <>
          <GradesCard rows={grades} loading={loading.grades} onLog={() => setGradeOpen(true)} />
              </>
            )}
            {area === 'notes' && (
              <>
          <NotesCard notes={notes} loading={loading.notes} onAdd={() => openNote('note')} />
              </>
            )}
          </div>
        </>
      ) : (
        <>
          {header}

          {/* ── At a glance: the programme and four rings ── */}
          <motion.section variants={itemVariants} initial="hidden" animate="visible" className={VIS_CARD}>
            <ProgrammeJourney start={progStart} end={progEnd} reviewDueBy={reviewDueBy} />
            <div className="mt-6 grid grid-cols-2 gap-x-2 gap-y-5 border-t border-white/[0.06] pt-5 lg:grid-cols-4">
              <Ring
                pct={coverage.pct}
                value={coverage.pct === null ? '—' : `${coverage.pct}%`}
                label="Criteria covered"
                sub={coverage.total ? `${coverage.done} of ${coverage.total} evidenced` : 'No criteria list yet'}
                onClick={() => openArea('assess')}
              />
              <Ring
                pct={pacePct}
                value={pacePct === null ? '—' : `${Math.min(pacePct, 999)}%`}
                label="Hours on pace"
                sub={!core.user_id ? 'No app account linked yet' : plannedNow === 0 && progStart ? 'Programme not started yet' : plannedNow ? `${Math.round(countedNow * 10) / 10}h of ${Math.round(plannedNow * 10) / 10}h planned by now` : 'Needs start and end dates'}
                warn={pacePct !== null && pacePct < 80}
                onClick={() => openArea('otj')}
              />
              <Ring
                pct={att.rate}
                value={att.rate === null ? '—' : `${att.rate}%`}
                label="Attendance"
                sub={att.sessions ? `Last ${plural(att.sessions, 'session')}` : 'No register yet'}
                warn={att.rate !== null && att.rate < 85}
                onClick={() => openArea('attendance')}
              />
              <Ring
                pct={ilpRoll.total_goals ? ilpRoll.completion_percent : null}
                value={ilpRoll.total_goals ? `${ilpRoll.completion_percent}%` : '—'}
                label="Plan goals met"
                sub={ilpRoll.total_goals ? `${ilpRoll.completed} of ${ilpRoll.total_goals}${ilpRoll.overdue ? `, ${ilpRoll.overdue} overdue` : ''}` : 'No goals set'}
                warn={ilpRoll.overdue > 0}
                onClick={() => openArea('ilp')}
              />
            </div>
          </motion.section>

          <HubQuickStart label="Start something" items={quickStart} />

          {/* Every row below sits on the same three-column grid, and every
              box in a row stretches to the tallest, so edges and tops line up
              (Andrew, 6 Oct: "all the boxes should be level"). */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 items-stretch gap-5 xl:grid-cols-3"
          >
            <div className="min-w-0 xl:col-span-2">
              <HoursChart collegeStudentId={core.id} userId={core.user_id} first={first} onOpen={() => openArea('otj')} />
            </div>
            <ActivityChart userId={core.user_id} first={first} onOpen={() => openArea('otj')} />

            <div className="min-w-0 xl:col-span-2">
              <NeedsYouCard items={work} first={first} />
            </div>
            <AboutCard
              core={{ ...core, start_date: progStart, expected_end_date: progEnd }}
              reviewDueBy={reviewDueBy}
              onEditSupport={() => openArea('ilp')}
              onEvidencePack={() => navigate(`/college/evidence-pack/${core.id}`)}
            />
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-2 xl:grid-cols-3"
          >
            <CriteriaByUnit rows={acCoverage} limit={5} onOpen={() => openArea('assess')} />
            <AttendanceStrip rows={attendance} rate={att.rate} onOpen={() => openArea('attendance')} />
            <PortfolioDonut
              byStatus={pfRoll.by_status}
              items={pfRoll.total_items}
              verifiedItems={pfRoll.items_supervisor_verified}
              onOpen={goPortfolio}
            />
            <GoalsCard
              total={ilpRoll.total_goals}
              completed={ilpRoll.completed}
              inProgress={ilpRoll.in_progress}
              notStarted={ilpRoll.not_started}
              blocked={ilpRoll.blocked}
              overdueStatus={ilpRoll.total_goals - ilpRoll.completed - ilpRoll.in_progress - ilpRoll.not_started - ilpRoll.blocked}
              overdue={ilpRoll.overdue}
              onOpen={() => openArea('ilp')}
            />
            <RiskTrend
              history={riskHistory}
              level={riskLevel}
              factor={topFactor?.label ?? null}
              onOpen={() => openArea('risk')}
            />
            <ReviewsCard
              dueBy={reviewDueBy}
              days={reviewDays}
              onOpen={() => openArea('reviews')}
              onBook={() => {
                setTripartiteReviewId(null);
                setTripartiteOpen(true);
              }}
            />
          </motion.div>

          <section className="space-y-3">
            <HubSectionHeading>Everything about {first}</HubSectionHeading>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4"
            >
              {cards.map((c) => (
                <AreaCard key={c.key} card={c} onOpen={() => openArea(c.key)} />
              ))}
            </motion.div>
          </section>
        </>
      )}

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
        <TripartiteReviewSheet open={tripartiteOpen} onOpenChange={setTripartiteOpen} studentId={core.id} studentName={core.name} collegeId={profile.college_id} initialReviewId={tripartiteReviewId} />
      )}
      <ParentContactsSheet open={parentsOpen} onOpenChange={setParentsOpen} studentId={core.id} studentName={core.name} />
    </>
  );
}

/* ==========================================================================
   Profile header, area cards, About — the overview (ELE-2015)
   ========================================================================== */

const S360_HELP: PageHelpContent = {
  id: 'college-student360',
  title: 'The learner profile',
  what: 'Everything the college holds on one learner. The overview shows what needs you and a card for each part of the record; tap a card to open that part on its own page.',
  steps: [
    { title: 'Start with Needs you', body: 'Anything late or waiting on you for this learner, most costly first. Each row opens the place to deal with it.' },
    { title: 'Open a card', body: 'Each card shows the headline figure. Tap it for the full detail: criteria, hours, reviews, portfolio and the rest.' },
    { title: 'Record as you go', body: 'Start something logs a one-to-one, a note, an observation or a grade without leaving the profile.' },
    { title: 'Step through a cohort', body: 'The arrows by the name, or Ctrl and the arrow keys, move to the next learner and keep the page you are on.' },
  ],
  notes: [
    { title: 'Orange means look now', body: 'A card turns orange when something is behind: hours off course, a review due inside two weeks, goals past their date, attendance under 85%.' },
    { title: 'Back to the overview', body: 'Use Overview at the top of any area, or your browser back button.' },
  ],
};

const SURFACE = 'border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025]';

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join('');
}

function ProfileHeader({
  core,
  neighbors,
  onPrev,
  onNext,
  compact,
}: {
  core: StudentCore;
  neighbors: ReturnType<typeof useCohortNeighbors>;
  onPrev?: () => void;
  onNext?: () => void;
  compact: boolean;
}) {
  const meta = [core.cohort_name, core.course_name].filter(Boolean).join(' · ');
  const status = core.status ? core.status.replace(/_/g, ' ') : null;
  return (
    <motion.header
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        compact
          ? '-mb-2 flex items-center gap-4'
          : 'grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-4 gap-y-3'
      )}
    >
      {core.photo_url ? (
        <img
          src={core.photo_url}
          alt=""
          className={cn('shrink-0 rounded-2xl object-cover', compact ? 'h-11 w-11' : 'h-14 w-14 sm:h-20 sm:w-20')}
        />
      ) : (
        <div
          aria-hidden
          className={cn(
            'flex shrink-0 items-center justify-center rounded-2xl bg-elec-yellow font-bold text-black',
            compact ? 'h-11 w-11 text-[15px]' : 'h-14 w-14 text-[20px] sm:h-20 sm:w-20 sm:text-[26px]'
          )}
        >
          {initials(core.name) || '?'}
        </div>
      )}
      <div className={cn('min-w-0 flex-1', !compact && 'col-span-3 row-start-2 sm:col-span-1 sm:col-start-2 sm:row-start-1')}>
        <h1
          className={cn(
            'font-bold tracking-tight text-white [overflow-wrap:anywhere]',
            compact ? 'truncate text-[18px]' : 'text-[22px] leading-tight sm:text-[32px]'
          )}
        >
          {core.name}
        </h1>
        <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-white">
          {meta && <span className={compact ? 'truncate' : ''}>{meta}</span>}
          {status && !compact && (
            <span className="rounded-full border border-white/[0.14] px-2 py-0.5 text-[11.5px] font-medium capitalize text-white">
              {status}
            </span>
          )}
          {core.uln && !compact && <span className="tabular-nums">ULN {core.uln}</span>}
        </p>
      </div>
      <div className={cn('flex shrink-0 items-center gap-1', !compact && 'col-start-3 row-start-1 justify-self-end')}>
        {neighbors.position && (
          <div className="flex items-center">
            <button
              type="button"
              onClick={onPrev}
              disabled={!onPrev}
              aria-label={neighbors.prev ? `Previous: ${neighbors.prev.name}` : 'No previous learner'}
              className="flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors touch-manipulation hover:bg-white/[0.06] hover:text-elec-yellow disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden />
            </button>
            <span className="text-[12px] tabular-nums text-white">
              {neighbors.position.index} of {neighbors.position.total}
            </span>
            <button
              type="button"
              onClick={onNext}
              disabled={!onNext}
              aria-label={neighbors.next ? `Next: ${neighbors.next.name}` : 'No next learner'}
              className="flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors touch-manipulation hover:bg-white/[0.06] hover:text-elec-yellow disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" aria-hidden />
            </button>
          </div>
        )}
        {!compact && <PageHelpButton help={S360_HELP} />}
      </div>
    </motion.header>
  );
}

interface AreaCardData {
  key: AreaKey;
  title: string;
  figure: string;
  unit?: string;
  line: string;
  /** 0–100 for the bar under the figure; null hides it. */
  pct?: number | null;
  warn?: boolean;
}

function AreaCard({ card, onOpen }: { card: AreaCardData; onOpen: () => void }) {
  return (
    <motion.button
      variants={itemVariants}
      type="button"
      onClick={onOpen}
      className={cn(
        'group flex min-h-[148px] w-full flex-col rounded-3xl border p-5 text-left transition-colors touch-manipulation hover:border-white/[0.2]',
        SURFACE,
        card.warn && 'border-orange-400/40'
      )}
    >
      <span className="flex w-full items-start justify-between gap-3">
        <span className="text-[14px] font-semibold leading-snug text-white">{card.title}</span>
        <ChevronRight
          className="mt-0.5 h-4 w-4 shrink-0 text-white transition-transform group-hover:translate-x-0.5 group-hover:text-elec-yellow"
          aria-hidden
        />
      </span>
      <span className="mt-auto block pt-4">
        {card.figure && (
          <span className="flex items-baseline gap-2">
            <span
              className={cn(
                'text-[28px] font-bold leading-none tabular-nums',
                card.warn ? 'text-orange-400' : 'text-white'
              )}
            >
              {card.figure}
            </span>
            {card.unit && <span className="text-[12.5px] text-white">{card.unit}</span>}
          </span>
        )}
        {typeof card.pct === 'number' && (
          <span className="mt-3 block h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
            <span
              className={cn('block h-full rounded-full', card.warn ? 'bg-orange-400' : 'bg-elec-yellow')}
              style={{ width: `${Math.max(2, Math.min(100, card.pct))}%` }}
            />
          </span>
        )}
        <span className="mt-2 block text-[12.5px] leading-snug text-white">{card.line}</span>
      </span>
    </motion.button>
  );
}

function AboutCard({
  core,
  reviewDueBy,
  onEditSupport,
  onEvidencePack,
}: {
  core: StudentCore;
  reviewDueBy: string | null;
  onEditSupport: () => void;
  onEvidencePack: () => void;
}) {
  const support = [
    ...(core.send_flags ?? []),
    core.eal ? 'EAL' : null,
    core.ehcp_ref ? 'EHCP' : null,
  ].filter(Boolean) as string[];
  const rows: Array<[string, string]> = [
    ['Course', core.course_name ?? '—'],
    ['Cohort', core.cohort_name ?? '—'],
    ['Started', longDate(core.start_date)],
    ['Planned end', longDate(core.expected_end_date)],
    ['Next review by', longDate(reviewDueBy)],
    ['Email', core.email ?? '—'],
    ['Phone', core.phone ?? '—'],
  ];
  return (
    <motion.aside variants={itemVariants} className={cn(VIS_CARD, 'flex flex-col')}>
      <h2 className="text-[15px] font-semibold tracking-tight text-white">About</h2>
      <dl className="mt-3 divide-y divide-white/[0.06]">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-baseline justify-between gap-4 py-2.5">
            <dt className="shrink-0 text-[12.5px] text-white">{k}</dt>
            <dd className="min-w-0 text-right text-[13px] font-medium text-white [overflow-wrap:anywhere]">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-3 border-t border-white/[0.06] pt-3">
        <p className="text-[12.5px] text-white">Support needs</p>
        {support.length ? (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {support.map((t) => (
              <span key={t} className="rounded-full border border-white/[0.14] px-2.5 py-1 text-[12px] font-medium text-white">
                {t}
              </span>
            ))}
          </div>
        ) : (
          <p className="mt-1 text-[13px] font-medium text-white">None recorded</p>
        )}
      </div>
      <div className="mt-auto grid grid-cols-2 gap-2 pt-4">
        <button
          type="button"
          onClick={onEditSupport}
          className="h-11 rounded-xl border border-white/[0.14] text-[13px] font-semibold text-white transition-colors touch-manipulation hover:border-elec-yellow"
        >
          Plan and support
        </button>
        <button
          type="button"
          onClick={onEvidencePack}
          className="h-11 rounded-xl border border-white/[0.14] text-[13px] font-semibold text-white transition-colors touch-manipulation hover:border-elec-yellow"
        >
          Evidence pack
        </button>
      </div>
    </motion.aside>
  );
}

/** "Needs you" as a card, so it sits level with About beside it. */
function NeedsYouCard({ items, first }: { items: HubWorkItem[]; first: string }) {
  const navigate = useNavigate();
  const [all, setAll] = useState(false);
  const shown = all ? items : items.slice(0, 6);
  const go = (i: HubWorkItem) => (i.onClick ? i.onClick() : i.to ? navigate(i.to) : undefined);
  return (
    <motion.section variants={itemVariants} className={cn(VIS_CARD, 'flex flex-col')}>
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-[15px] font-semibold tracking-tight text-white">Needs you</h2>
        <span className={cn('text-[12.5px] font-semibold tabular-nums', items.some((i) => i.urgent) ? 'text-elec-yellow' : 'text-white')}>
          {items.length === 0 ? 'All clear' : `${items.length} ${items.length === 1 ? 'thing' : 'things'}`}
        </span>
      </div>
      {items.length === 0 ? (
        <div className="mt-4 flex flex-1 items-center justify-center rounded-2xl border border-dashed border-white/[0.12] px-4 py-8 text-center text-[13px] text-white">
          Nothing is waiting on you for {first}.
        </div>
      ) : (
        <ul className="-mx-2 mt-3 flex-1 divide-y divide-white/[0.06]">
          {shown.map((i) => (
            <li key={i.id}>
              <button
                type="button"
                onClick={() => go(i)}
                className="flex min-h-[56px] w-full items-center gap-3 rounded-xl px-2 py-2.5 text-left transition-colors touch-manipulation hover:bg-white/[0.05]"
              >
                <span aria-hidden className={cn('h-8 w-[3px] shrink-0 rounded-full', i.urgent ? 'bg-orange-400' : 'bg-white/[0.25]')} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[14px] font-semibold leading-tight text-white">{i.title}</span>
                  <span className="mt-0.5 block truncate text-[12.5px] leading-tight text-white">{i.reason}</span>
                </span>
                {i.trailing && (
                  <span className={cn('shrink-0 text-[13px] font-semibold tabular-nums', i.urgent ? 'text-orange-300' : 'text-white')}>
                    {i.trailing}
                  </span>
                )}
                <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden />
              </button>
            </li>
          ))}
        </ul>
      )}
      {items.length > 6 && (
        <button
          type="button"
          onClick={() => setAll((v) => !v)}
          className="mt-2 h-11 w-full rounded-xl text-[13px] font-semibold text-elec-yellow touch-manipulation hover:bg-white/[0.05]"
        >
          {all ? 'Show fewer' : `Show all ${items.length}`}
        </button>
      )}
    </motion.section>
  );
}

/** Progress review countdown, the sixth box of the detail grid. */
function ReviewsCard({
  dueBy,
  days,
  onOpen,
  onBook,
}: {
  dueBy: string | null;
  days: number | null;
  onOpen: () => void;
  onBook: () => void;
}) {
  const late = days !== null && days < 0;
  const soon = days !== null && days >= 0 && days <= 14;
  return (
    <motion.section variants={itemVariants} className={cn(VIS_CARD, 'flex flex-col')}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-[15px] font-semibold tracking-tight text-white">Progress reviews</h3>
          <p className="mt-0.5 text-[12.5px] leading-snug text-white">Three-way, at least every 3 calendar months</p>
        </div>
        <button type="button" onClick={onOpen} className="-my-2 h-11 shrink-0 px-1 text-[12.5px] font-semibold text-elec-yellow touch-manipulation">
          Open
        </button>
      </div>
      <p className={cn('mt-4 text-[32px] font-bold leading-none tabular-nums', late || soon ? 'text-orange-400' : 'text-white')}>
        {days === null ? '—' : `${Math.abs(days)} days`}
      </p>
      <p className="mt-2 text-[13px] text-white">
        {!dueBy ? 'No review history yet' : late ? `Overdue. It was due by ${longDate(dueBy)}.` : `Until it is due, by ${longDate(dueBy)}`}
      </p>
      <div className="mt-auto pt-5">
        <button
          type="button"
          onClick={onBook}
          className={cn(
            'h-11 w-full rounded-xl text-[13px] font-semibold touch-manipulation transition-colors',
            late || soon ? 'bg-elec-yellow text-black' : 'border border-white/[0.14] text-white hover:border-elec-yellow'
          )}
        >
          Book or open a review
        </button>
      </div>
    </motion.section>
  );
}

/** Top of an area page: back to the overview, and a rail to hop between areas. */
function AreaBar({
  title,
  onBack,
  areas,
  current,
  onPick,
}: {
  title: string;
  onBack: () => void;
  areas: Array<{ key: AreaKey; title: string }>;
  current: AreaKey;
  onPick: (k: AreaKey) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="-ml-2 flex h-11 items-center gap-1 rounded-full px-2 text-[13px] font-semibold text-elec-yellow touch-manipulation hover:bg-white/[0.06]"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden />
          Overview
        </button>
        <h2 className="min-w-0 truncate text-[20px] font-bold tracking-tight text-white sm:text-[24px]">{title}</h2>
      </div>
      <nav
        aria-label="Parts of the record"
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
      >
        {areas.map((a) => (
          <button
            key={a.key}
            type="button"
            onClick={() => onPick(a.key)}
            aria-current={a.key === current ? 'page' : undefined}
            className={cn(
              'h-9 shrink-0 rounded-full border px-3.5 text-[12.5px] transition-colors touch-manipulation',
              a.key === current
                ? 'border-elec-yellow bg-elec-yellow font-semibold text-black'
                : 'border-white/[0.12] bg-white/[0.06] font-medium text-white hover:border-white/[0.3]'
            )}
          >
            {a.title}
          </button>
        ))}
      </nav>
    </div>
  );
}

function EvidencePackLink({ first, onOpen }: { first: string; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        '-mx-4 flex min-h-[64px] w-[calc(100%+2rem)] items-center justify-between gap-3 border-y px-5 py-3 text-left touch-manipulation hover:border-white/[0.2] sm:mx-0 sm:w-full sm:rounded-3xl sm:border-x',
        SURFACE
      )}
    >
      <span className="min-w-0">
        <span className="block text-[15px] font-semibold text-white">Funding evidence pack</span>
        <span className="block text-[12.5px] text-white">
          What the funding rules need on file for {first}, with what is missing
        </span>
      </span>
      <span className="shrink-0 text-[13px] font-semibold text-elec-yellow">Open</span>
    </button>
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
  onJump,
}: {
  risk: RiskSnapshot | null;
  history: { computed_at: string; score: number; level: string }[];
  loading: boolean;
  computing: boolean;
  onCompute: () => Promise<void>;
  onJump: (anchor: string) => void;
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
                        onClick={() => onJump(anchor)}
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
