/**
 * OJTHub — Apprentice Off-the-Job Training workspace
 *
 * Built on the shared hub primitives (`components/hub/HubPrimitives`), the same
 * shell as the Apprentice Hub, the Business Hub and Inspection & Testing:
 *
 *   masthead → (alert, only if something is wrong) → quick start → KPIs →
 *   needs-you → the detail sections
 *
 * It previously had its own dialect — a bespoke sticky header, a 300px
 * editorial hero (greeting, the apprentice's first name, and a paragraph
 * restating the figures directly beneath it) and a private `KpiCell`. That is
 * exactly the drift HubPrimitives exists to stop, and the hero pushed the first
 * actionable thing on the page below the fold on a phone.
 *
 * What apprentices struggle with: PROOF. ESFA only counts hours that have
 * a source + a verifier + (ideally) an evidence link. This page makes the
 * proof chain visible:
 *
 *   • In-app auto-tracked          (system-attested — videos, study sessions)
 *   • Site diary / manual log      (self-reported time_entries — defensible
 *                                   only once supervisor-verified)
 *   • Apprentice-submitted (pending) → tutor verifies in college hub
 *   • Apprentice-submitted (verified) → counts for gateway
 *   • Tutor-recorded                (pre-verified by college)
 *   • Employer-attested             (signed by supervisor via attestation link)
 *
 * The source-mix bar tells the apprentice at a glance how much of their
 * total is actually defensible vs still pending verification.
 *
 * Sections (top → bottom):
 *   1. Masthead + alert line (only when something is actually wrong)
 *   2. Quick start — log time, evidence pack, programme
 *   3. KPIs — week / gateway / verified / NOT COUNTING YET
 *   4. Needs you — referred-back, unverified, awaiting tutor
 *   5. Source mix — stacked bar by source_kind
 *   6. Compliance forecast — projection vs gateway
 *   7. Verification panel — pending + rejected with one-tap actions
 *   8. Recent entries timeline — every entry shows source + verification chip
 *
 * The fourth KPI is the point of the page. It used to be "Pending sign-off",
 * counting entries formally submitted to a tutor — so an apprentice with 24.5h
 * of self-logged site diary and nothing submitted read "0 · Nothing waiting"
 * while the card two along said "25h pending". It named the queue rather than
 * the risk. It now reports every hour that will not count at gateway, and says
 * whose move it is.
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDeepLinkFocus } from '@/hooks/useDeepLinkFocus';
import { Loader2, RefreshCw, Share2, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useApprenticeOtj } from '@/hooks/useApprenticeOtj';
import { useOtjProgramme } from '@/hooks/useOtjProgramme';
import {
  fetchLearnerAppDays,
  useAppLearningBreakdown,
  useOtjHoursStatement,
  useOtjSummary,
  type AppLearningDay,
} from '@/hooks/useOtjSummary';
import { OtjStatementSignSheet } from './OtjStatementSignSheet';
import { AppLearningCard, OjtHeroCard, OjtRequirementsCard } from './OjtOverview';
import { useMyEmployerLink, type MyEmployerLink } from '@/hooks/useMyEmployerLink';
import {
  useStudentOtjVerification,
  type OtjEntryRow,
  type SourceKind,
  type VerificationStatus,
} from '@/hooks/useStudentOtjVerification';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { Eyebrow, GuideActions } from '@/components/apprentice/shared/GuideKit';
import {
  HubPage,
  HubBody,
  HubMasthead,
  HubAlertLine,
  HubWorkList,
  type HubWorkItem,
} from '@/components/hub/HubPrimitives';
import { SubmitWorkOtjSheet } from '@/components/apprentice-hub/SubmitWorkOtjSheet';
import { HoursToConfirmCard } from '@/components/apprentice-hub/otj/HoursToConfirmCard';
import { useOtjProposals } from '@/hooks/useOtjProposals';
import { OTJ_STANDARDS } from '@/data/otjStandards';
import { downloadLearnerDocument } from '@/lib/documents/learnerDocuments';
import {
  exportOtjCsv,
  type OtjExportData,
  type OtjExportEntry,
  type OtjVerification,
} from '@/services/otjEvidenceExport';
import { OjtGoalsSection } from './OjtGoalsSection';
import { OjtAssessmentsSection } from './OjtAssessmentsSection';
import { ProgrammeSetupSheet } from './ProgrammeSetupSheet';
import { KpiDetailSheet, type KpiDetail } from './KpiDetailSheet';
import { OjtSectionHeader as SectionHeader } from './ojtSection';

// Weekly target, gateway target and weeks-remaining are no longer hardcoded —
// they come from useOtjProgramme (college dates → self-set → estimate). See
// the `programme` object inside the component.

const SOURCE_LABEL: Record<SourceKind, string> = {
  in_app: 'In-app',
  apprentice_submitted: 'Submitted',
  tutor_recorded: 'Tutor',
  employer_attested: 'Employer',
};

const STATUS_LABEL: Record<VerificationStatus, string> = {
  verified: 'Verified',
  verified_by_employer: 'Employer verified',
  pending: 'Pending',
  rejected: 'Refer back',
};

const fmtHours = (hours: number) => {
  // A bad divide anywhere upstream would otherwise print "NaNh" next to an
  // ESFA hours figure. Falls back to zero rather than showing nonsense.
  if (!Number.isFinite(hours) || hours < 0) return '0';
  if (hours >= 10) return Math.round(hours).toString();
  return hours.toFixed(1).replace(/\.0$/, '');
};

const fmtDate = (iso: string | null | undefined) => {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
    });
  } catch {
    return '';
  }
};

export default function OJTHub() {
  const { user, profile } = useAuth();
  const { toast } = useToast();

  // Still needed by the evidence pack's learner block. The greeting and the
  // first-name heading that used to sit beside it went with the hero.
  const fullName = profile?.full_name || user?.email?.split('@')[0] || 'Apprentice';

  // Real programme envelope — drives weekly/gateway targets + weeks remaining.
  const programme = useOtjProgramme();
  const weeklyTargetHours = programme.weeklyTargetHours;
  const programmeTargetHours = programme.totalTargetHours;
  const weeksRemaining = programme.weeksRemaining;
  const [showProgrammeSetup, setShowProgrammeSetup] = useState(false);

  // Data sources
  const {
    breakdown,
    entries: otjEntries,
    loading: otjLoading,
    refresh: refreshOtj,
  } = useApprenticeOtj(user?.id ?? null, weeklyTargetHours * 60);
  const {
    rows: verificationRows,
    pending_apprentice,
    rejected_apprentice,
    stats: verifyStats,
    loading: verifyLoading,
    refresh: refreshVerify,
  } = useStudentOtjVerification(user?.id ?? null);
  useDeepLinkFocus(new URLSearchParams(window.location.search).get('entry'), !verifyLoading);

  // Log sheet — unified work-activity capture (photos + AI), shared with the
  // portfolio hub. Replaces the old inline Quick Log so there's one log path.
  const [showLogSheet, setShowLogSheet] = useState(false);

  // The one figure (ELE-1877): the same SQL function the tutor and employer
  // read. Learning time the app records (Study Centre, mocks, flashcards,
  // quizzes, revision, videos, AM2 and EPA practice) COUNTS towards their
  // hours — Andrew, 6 Oct 2026. It is complete (no 200-row cap), excludes the
  // ELE-1724 phantom rows, and drops out of here once a tutor approves it,
  // when it becomes a verified in_app entry instead — so never counted twice.
  const { data: otjSummary, refresh: refreshSummary } = useOtjSummary(user?.id ?? null);
  const { data: appLearning } = useAppLearningBreakdown(user?.id ?? null, 30);
  // ELE-1876: registers, diary college days and unsent diary training come
  // back as proposed hours the apprentice confirms (one list, one tap).
  const {
    proposals: otjProposals,
    loading: proposalsLoading,
    refresh: refreshProposals,
  } = useOtjProposals(user?.id ?? null);
  // Planned-versus-actual statement the college prepared (funding rules 92–94).
  const { data: hoursStatement, refresh: refreshStatement } = useOtjHoursStatement(
    user?.id ?? null
  );
  const [showStatement, setShowStatement] = useState(false);
  // Notification deep links: ?statement=<id> opens the hours statement to
  // sign; ?entry=<id> scrolls to that entry (verified, sent back, approved
  // or left out) and rings it.
  const [deepParams, setDeepParams] = useSearchParams();
  const focusEntry = deepParams.get('entry');
  const wantsStatement = deepParams.get('statement');
  useEffect(() => {
    if (!wantsStatement || !hoursStatement) return;
    setShowStatement(true);
    setDeepParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete('statement');
        return next;
      },
      { replace: true }
    );
  }, [wantsStatement, hoursStatement, setDeepParams]);
  // ?programme=1 (the gateway check's start-date line, ELE-1872) opens the
  // programme dates sheet, unless the college sets the dates.
  const wantsProgramme = deepParams.get('programme') === '1';
  useEffect(() => {
    if (!wantsProgramme || programme.loading) return;
    if (programme.source !== 'college') setShowProgrammeSetup(true);
    setDeepParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete('programme');
        return next;
      },
      { replace: true }
    );
  }, [wantsProgramme, programme.loading, programme.source, setDeepParams]);
  // ELE-1833: ?log=firm (the firm's "it counted as training" bell) opens the
  // log form filled in. The apprentice adds what they learned and submits it.
  const [firmPrefill, setFirmPrefill] = useState<{
    activity_date?: string;
    title?: string;
    description?: string;
    duration_minutes?: number;
    activity_type?: string;
  } | null>(null);
  useEffect(() => {
    if (deepParams.get('log') !== 'firm') return;
    const mins = Number(deepParams.get('mins'));
    setFirmPrefill({
      activity_type: deepParams.get('type') ?? undefined,
      activity_date: deepParams.get('date') ?? undefined,
      title: deepParams.get('title') ?? undefined,
      description: deepParams.get('desc') ?? undefined,
      duration_minutes: Number.isFinite(mins) && mins > 0 ? mins : undefined,
    });
    // The form fills itself as it opens, so if it's already open (half-way
    // through another entry) close it and reopen with this one.
    setShowLogSheet(false);
    window.setTimeout(() => setShowLogSheet(true), 0);
    setDeepParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        ['log', 'type', 'date', 'title', 'desc', 'mins'].forEach((k) => next.delete(k));
        return next;
      },
      { replace: true }
    );
  }, [deepParams, setDeepParams]);
  // Funding rules para 89: some off-the-job training every calendar month.
  const trainedThisMonth = useMemo(() => {
    const month = new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/London' }).slice(0, 7);
    if ((appLearning?.days ?? []).some((d) => d.day.startsWith(month) && d.minutes > 0))
      return true;
    return verificationRows.some(
      (r) => r.verification_status !== 'rejected' && (r.activity_date ?? '').startsWith(month)
    );
  }, [appLearning, verificationRows]);
  const capturedMin = Math.round((otjSummary?.app_learning_hours ?? 0) * 60);
  // The server's required hours (learner record → course → own setting),
  // so the target matches the tutor's and employer's view.
  const yearTargetHours = otjSummary?.required_hours ?? programmeTargetHours;

  // Recent entries — merge college_otj_entries (source-of-truth for verification)
  // with the unified breakdown's entries from learning_activity_log etc. The
  // verificationRows already include status, so we use them as the primary
  // timeline; the breakdown gives us in-app totals.
  // In-app study is no longer read from here: captured time comes from the
  // server summary (otjSummary) so it can never be counted twice.
  const collegeMinutes = breakdown.by_source.college.minutes;

  // Derive verified vs pending breakdown
  const sourceBreakdown = useMemo(() => {
    // college_otj_entries split by source_kind × verification_status
    const byKind: Record<
      SourceKind,
      { verifiedMin: number; pendingMin: number; rejectedMin: number }
    > = {
      in_app: { verifiedMin: 0, pendingMin: 0, rejectedMin: 0 },
      apprentice_submitted: { verifiedMin: 0, pendingMin: 0, rejectedMin: 0 },
      tutor_recorded: { verifiedMin: 0, pendingMin: 0, rejectedMin: 0 },
      employer_attested: { verifiedMin: 0, pendingMin: 0, rejectedMin: 0 },
    };
    for (const r of verificationRows) {
      const bucket = byKind[r.source_kind];
      if (!bucket) continue;
      if (
        r.verification_status === 'verified' ||
        r.verification_status === 'verified_by_employer'
      ) {
        bucket.verifiedMin += r.duration_minutes;
      } else if (r.verification_status === 'pending') {
        bucket.pendingMin += r.duration_minutes;
      } else if (r.verification_status === 'rejected') {
        bucket.rejectedMin += r.duration_minutes;
      }
    }

    // App learning, recorded automatically and counting (see otjSummary above).
    // Approved app learning arrives as verified source_kind='in_app' entries in
    // byKind.in_app instead.
    const autoTrackedMin = capturedMin;

    // Manual time_entries (site diary / legacy time tracker) are SELF-REPORTED,
    // not system-attested, so they never join autoTrackedMin (that bucket is
    // treated as defensible by definition). Supervisor-verified manual hours
    // count as defensible; unverified ones sit with the pending total.
    const manualVerifiedMin = 0;
    let manualUnverifiedMin = 0;
    for (const e of otjEntries) {
      if (e.source !== 'time_entry') continue;
      // Self-set "verified" flags are not a verification (see totalDefensibleMin).
      manualUnverifiedMin += e.duration_minutes;
    }

    return { byKind, autoTrackedMin, manualVerifiedMin, manualUnverifiedMin };
  }, [verificationRows, otjEntries, capturedMin]);

  // time_entries.is_supervisor_verified is a flag on the learner's own row
  // that only their own device writes, so it is not a verification: it does
  // not count here or in get_otj_summary. (Site diary time counts once it is
  // sent and signed off as a college_otj_entries row.)
  const totalDefensibleMin =
    sourceBreakdown.autoTrackedMin +
    sourceBreakdown.byKind.in_app.verifiedMin +
    sourceBreakdown.byKind.apprentice_submitted.verifiedMin +
    sourceBreakdown.byKind.tutor_recorded.verifiedMin +
    sourceBreakdown.byKind.employer_attested.verifiedMin;
  const totalPendingMin =
    sourceBreakdown.manualUnverifiedMin +
    sourceBreakdown.byKind.in_app.pendingMin +
    sourceBreakdown.byKind.apprentice_submitted.pendingMin +
    sourceBreakdown.byKind.tutor_recorded.pendingMin +
    sourceBreakdown.byKind.employer_attested.pendingMin;
  const totalAllMin = totalDefensibleMin + totalPendingMin;

  // Share of counted time a person has approved or verified. App learning
  // counts as it is recorded, but an approval from the tutor is what an
  // assessor at gateway looks for, so this tile tracks that.
  const approvedMin = totalDefensibleMin - sourceBreakdown.autoTrackedMin;
  const verificationRate = totalAllMin > 0 ? Math.round((approvedMin / totalAllMin) * 100) : 100;

  // Gateway total must reflect ONLY ESFA-defensible hours — auto-tracked
  // in-app activity plus tutor/employer-verified entries. breakdown.total_hours
  // also includes pending AND rejected college_otj_entries, which must never
  // inflate the gateway figure or the forecast: a tutor-rejected entry is not
  // a banked hour. Pending hours are surfaced separately so the apprentice can
  // see what's still in the pipeline without it counting prematurely.
  // The server's counted figure when it has loaded, so this page can never
  // disagree with the tutor's view or the employer's.
  const yearHours = otjSummary?.counted_hours ?? totalDefensibleMin / 60;
  const yearPendingHours = totalPendingMin / 60;

  /*
   * What is NOT counting, split by whose move it is.
   *
   * The fourth KPI used to be "Pending sign-off: {pending_apprentice.length}",
   * which counts only entries formally submitted to a tutor. An apprentice with
   * 24.5h of self-logged site diary and nothing submitted therefore read
   * "0 — Nothing waiting" while the card beside it said "25h pending", and the
   * 24.5h will not count at gateway. The one number on this page that should
   * drive action was telling them there was none.
   *
   * `unverifiedHours` is theirs to fix (log it properly so it can be signed
   * off). `awaitingOthersHours` is already with a tutor or supervisor and is
   * nobody's fault — worth showing, but not worth nagging about.
   */
  const unverifiedHours = sourceBreakdown.manualUnverifiedMin / 60;
  const awaitingOthersHours = yearPendingHours - unverifiedHours;
  const rejectedHours =
    (sourceBreakdown.byKind.apprentice_submitted.rejectedMin +
      sourceBreakdown.byKind.tutor_recorded.rejectedMin +
      sourceBreakdown.byKind.employer_attested.rejectedMin) /
    60;
  const yearPct = Math.round((yearHours / yearTargetHours) * 100);
  // OTJ is a total to complete (not a perpetual weekly quota): once banked,
  // the apprentice can stop logging.
  const otjComplete = yearTargetHours > 0 && yearHours >= yearTargetHours;

  // Weekly + run-rate must use the SAME defensible basis as the gateway total —
  // auto-tracked in-app activity plus tutor/employer-verified college hours.
  // breakdown.this_week_minutes / last_30_days_minutes include pending AND
  // rejected college entries, which would let unverified hours inflate "this
  // week", on-pace status and the forecast projection.
  const { weekHours, last30Avg } = useMemo(() => {
    // Week starts on the London Monday, matching get_otj_summary.
    const londonToday = new Date(
      `${new Date().toLocaleDateString('en-CA', { timeZone: 'Europe/London' })}T12:00:00Z`
    );
    const diffToMonday = (londonToday.getUTCDay() + 6) % 7;
    const sinceWeek = new Date(
      Date.UTC(
        londonToday.getUTCFullYear(),
        londonToday.getUTCMonth(),
        londonToday.getUTCDate() - diffToMonday
      )
    ).toISOString();
    const since30 = new Date(Date.now() - 30 * 86_400_000).toISOString();
    let weekMin = 0;
    let last30Min = 0;
    // "This week" is a pacing view of everything the apprentice did: study the
    // app captured and not yet sent, site diary time, and entries already sent
    // (verified or waiting). Rejected entries are not time they have.
    weekMin += (otjSummary?.app_learning_this_week_hours ?? 0) * 60;
    for (const e of otjEntries) {
      if (e.source !== 'time_entry') continue;
      if (e.occurred_at >= sinceWeek) weekMin += e.duration_minutes;
    }
    for (const r of verificationRows) {
      if (r.verification_status === 'rejected') continue;
      const at = r.activity_date ? `${r.activity_date}T12:00:00Z` : null;
      if (!at) continue;
      if (at >= sinceWeek) weekMin += r.duration_minutes;
      if (
        at >= since30 &&
        (r.verification_status === 'verified' || r.verification_status === 'verified_by_employer')
      )
        last30Min += r.duration_minutes;
    }
    // Pace towards gateway comes from the server when it can, so the learner,
    // tutor and employer see the same pace.
    const serverPace = otjSummary?.weekly_pace_hours;
    return {
      weekHours: weekMin / 60,
      last30Avg:
        serverPace != null && otjSummary?.forecast_at_end_hours != null
          ? serverPace
          : last30Min / 60 / 4.3,
    };
  }, [otjEntries, verificationRows, otjSummary]);

  const weekPct =
    weeklyTargetHours > 0 ? Math.min(Math.round((weekHours / weeklyTargetHours) * 100), 150) : 0;
  const onPace = weekHours >= weeklyTargetHours;

  // Forecast: at current verified weekly rate, where will we be at gateway?
  // The server's forecast when it has programme dates, so every screen agrees.
  const projectedHours =
    otjSummary?.forecast_at_end_hours ?? yearHours + last30Avg * weeksRemaining;
  const projectedShortfall = Math.max(0, yearTargetHours - projectedHours);
  // The server holds the forecast back until four weeks in; before that a
  // "you'll finish 1,063h short" line is noise, not a warning.
  const forecastReliable = !otjSummary || otjSummary.forecast_at_end_hours != null;
  const requiredWeekly =
    projectedShortfall > 0 ? projectedShortfall / weeksRemaining + last30Avg : last30Avg;

  /* ─── Employer link (roster) ───────────────────────────────────── */
  // Who the apprentice works for, from the employer's roster. When present the
  // employer can attest off-the-job entries inside their own Employer Hub, so
  // the share-a-link route below becomes the fallback rather than the only way.
  const { data: employerLink } = useMyEmployerLink();

  /* ─── Employer attestation link ─────────────────────────────────── */
  // useCallback because the "Needs you" list memoises on it; without a stable
  // identity that list rebuilds on every render.
  const handleEmployerLink = useCallback(
    async (row: OtjEntryRow) => {
      const url = `${window.location.origin}/attest-ojt/${row.id}`;
      try {
        // Prefer native share on mobile when available
        const nav = navigator as Navigator & {
          share?: (data: { title?: string; text?: string; url?: string }) => Promise<void>;
        };
        if (typeof nav.share === 'function') {
          await nav.share({
            title: 'Confirm my training hours',
            text: `${(row.duration_minutes / 60).toFixed(1)}h of off-the-job training — ${row.title}. Tap to attest:`,
            url,
          });
          return;
        }
        await navigator.clipboard.writeText(url);
        toast({
          title: 'Attestation link copied',
          description: employerLink
            ? `Your supervisor at ${employerLink.companyName} can confirm it in Elec-Mate — no link needed. Or send them a link.`
            : 'Send it to your supervisor. They open it, type their name + email, and these hours flip to employer-attested.',
        });
      } catch (err) {
        // user cancelled share or clipboard rejected
        toast({
          title: 'Link ready',
          description: url,
        });
        void err;
      }
    },
    [toast, employerLink]
  );

  /* ─── Verification actions ─────────────────────────────────────── */
  const editAndResubmit = useCallback(
    async (row: OtjEntryRow) => {
      if (!user?.id) return;
      try {
        const { error } = await supabase
          .from('college_otj_entries')
          .update({
            verification_status: 'pending',
            verification_rationale: null,
          })
          .eq('id', row.id);
        if (error) throw error;
        toast({ title: 'Resubmitted', description: 'Sent back to your tutor for review.' });
        await refreshVerify();
      } catch (err) {
        toast({
          title: 'Could not resubmit',
          description: (err as Error).message,
          variant: 'destructive',
        });
      }
    },
    [user?.id, toast, refreshVerify]
  );

  /* ─── Export evidence pack ──────────────────────────────────────── */
  const buildExportData = useCallback(async (): Promise<OtjExportData> => {
    const prettify = (t: string) => t.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

    // Learning in Elec-Mate the app MEASURED and a tutor has not yet decided
    // on (it counts while it waits). The same rows get_otj_summary counts —
    // never the XP estimates in learning_activity_log / study_sessions, which
    // this pack used to list as "Verified · System". Approved and left-out app
    // learning appear below as the tutor's in_app entries.
    let appDays: AppLearningDay[] = [];
    try {
      appDays = user?.id ? await fetchLearnerAppDays(user.id) : [];
    } catch {
      appDays = [];
    }
    const inAppEntries: OtjExportEntry[] = appDays.map((d) => ({
      date: d.day,
      title: 'Learning in Elec-Mate',
      activityType: Array.from(new Set(d.activities.map((a) => a.area))).join(', '),
      source: 'Elec-Mate (measured)',
      status: 'Counting, awaiting tutor approval',
      durationMinutes: d.minutes,
      verifier: '—',
      evidenceCount: 0,
    }));

    // Manual site-diary / time-tracker entries (self-reported; defensible only
    // once a supervisor has verified them)
    const manualEntries: OtjExportEntry[] = otjEntries
      .filter((e) => e.source === 'time_entry')
      .map((e) => ({
        date: e.occurred_at.slice(0, 10),
        title: e.title,
        activityType: prettify(e.category ?? 'Manual'),
        source: 'Site diary / manual log',
        // A self-set flag on the learner's own row is not a verification.
        status: 'Self-logged, not counted until sent and signed off',
        durationMinutes: e.duration_minutes,
        verifier: '—',
        evidenceCount: 0,
      }));

    // College / submitted / attested entries
    const collegeEntries: OtjExportEntry[] = verificationRows.map((r) => ({
      date: r.activity_date,
      title: r.title,
      activityType: prettify(r.activity_type),
      source: SOURCE_LABEL[r.source_kind] ?? r.source_kind,
      status:
        r.source_kind === 'in_app' && r.verification_status === 'rejected'
          ? 'Left out by tutor'
          : (STATUS_LABEL[r.verification_status] ?? r.verification_status),
      durationMinutes: r.duration_minutes,
      verifier: r.attested_by_name ?? r.recorded_by_name_snapshot ?? null,
      evidenceCount: r.evidence_urls?.length ?? (r.evidence_url ? 1 : 0),
    }));

    const entries = [...collegeEntries, ...inAppEntries, ...manualEntries].sort((a, b) =>
      a.date < b.date ? 1 : -1
    );

    // Human sign-offs (tutor verified / employer attested) — the "signatures".
    const verifications: OtjVerification[] = verificationRows
      .filter(
        (r) =>
          (r.verification_status === 'verified' ||
            r.verification_status === 'verified_by_employer') &&
          true
      )
      .map((r) => {
        if (r.source_kind === 'in_app') {
          // A tutor approving measured app learning is a signature too.
          return {
            date: r.activity_date,
            title: r.title,
            durationMinutes: r.duration_minutes,
            verifierName:
              r.verification_rationale?.replace(/^App learning approved by /, '') ?? 'Tutor',
            verifierRole: 'Tutor / Assessor',
            verifierContact: null,
            statement: 'Approved measured learning in Elec-Mate as off-the-job training.',
            verifiedAt: r.verified_at,
          };
        }
        const isEmployer =
          r.source_kind === 'employer_attested' || r.verification_status === 'verified_by_employer';
        return {
          date: r.activity_date,
          title: r.title,
          durationMinutes: r.duration_minutes,
          verifierName:
            (isEmployer ? r.attested_by_name : r.recorded_by_name_snapshot) ??
            (isEmployer ? 'Employer' : 'Tutor / Assessor'),
          verifierRole: isEmployer ? 'Employer' : 'Tutor / Assessor',
          verifierContact: isEmployer ? r.attestation_email : null,
          statement:
            (isEmployer ? r.attestation_comment : null) ??
            (isEmployer
              ? 'Confirmed the apprentice completed this work.'
              : 'Verified for off-the-job training.'),
          verifiedAt: r.verified_at,
        };
      });

    const standard = OTJ_STANDARDS.find((s) => s.otjHours === yearTargetHours);

    // Learner identity — best-effort, resilient to RLS / missing rows.
    let uln: string | null = null;
    let provider: string | null = null;
    let employer: string | null = null;
    let level: string | null = standard ? `Level ${standard.level}` : null;
    try {
      if (user?.id) {
        const [{ data: prof }, { data: cs }] = await Promise.all([
          supabase
            .from('profiles')
            .select('apprentice_level, apprentice_college')
            .eq('id', user.id)
            .maybeSingle(),
          supabase
            .from('college_students')
            .select('uln, employer_id')
            .eq('user_id', user.id)
            .maybeSingle(),
        ]);
        if (prof?.apprentice_level) level = `Level ${prof.apprentice_level}`;
        provider = (prof?.apprentice_college as string | null) ?? null;
        uln = (cs?.uln as string | null) ?? null;
        // Employer name: the roster link (Employer Hub) wins; fall back to the
        // college's placement record. (This used to query a table called
        // `employers` that does not exist, so the export line was always blank.)
        employer = employerLink?.companyName ?? null;
        if (!employer && cs?.employer_id) {
          const { data: ce } = await supabase
            .from('college_employers')
            .select('company_name')
            .eq('id', cs.employer_id as string)
            .maybeSingle();
          employer = (ce as { company_name?: string | null } | null)?.company_name ?? null;
        }
      }
    } catch {
      /* fall back to nulls — export still works without identity extras */
    }

    return {
      learner: {
        name: fullName,
        uln,
        standard: standard?.name ?? null,
        level,
        provider,
        employer,
        startDate: programme.startDate,
        endDate: programme.endDate,
      },
      totalTargetHours: yearTargetHours,
      summary: {
        defensibleHours: yearHours,
        pendingHours: yearPendingHours,
        verificationRatePct: verificationRate,
        totalEntries: entries.length,
      },
      entries,
      verifications,
    };
  }, [
    otjEntries,
    verificationRows,
    fullName,
    yearTargetHours,
    programme.startDate,
    programme.endDate,
    yearHours,
    yearPendingHours,
    verificationRate,
    user?.id,
    employerLink?.companyName,
  ]);

  const handleExportPdf = useCallback(() => {
    void (async () => {
      try {
        // The hours PDF is rendered in PDFMonkey from the live record (ELE-2017).
        await downloadLearnerDocument({ kind: 'otj_log' });
      } catch (e) {
        toast({
          title: 'Could not export',
          description: (e as Error).message,
          variant: 'destructive',
        });
      }
    })();
  }, [buildExportData, toast]);

  const handleExportCsv = useCallback(() => {
    void (async () => {
      try {
        exportOtjCsv(await buildExportData());
      } catch (e) {
        toast({
          title: 'Could not export',
          description: (e as Error).message,
          variant: 'destructive',
        });
      }
    })();
  }, [buildExportData, toast]);

  const canExport = verificationRows.length > 0 || yearHours > 0 || yearPendingHours > 0;

  /*
   * What sits behind each KPI, and the one thing to do about it.
   *
   * Every `advice` line is computed from this apprentice's actual position —
   * "log 4.4h a week to catch up" rather than "keep going". A dashboard that
   * reports a number and offers nothing is judging them without helping, and
   * off-the-job hours are the thing most apprentices are behind on.
   */
  const [kpiDetail, setKpiDetail] = useState<KpiDetail | null>(null);

  const weekDetail = useCallback((): KpiDetail => {
    const shortfallThisWeek = Math.max(0, weeklyTargetHours - weekHours);
    return {
      label: 'This week',
      value: `${fmtHours(weekHours)}h`,
      verdict: onPace ? 'On pace' : 'Behind pace',
      rows: [
        {
          label: 'Logged this week',
          value: `${fmtHours(weekHours)}h`,
          share: weeklyTargetHours > 0 ? weekHours / weeklyTargetHours : 0,
          tone: onPace ? 'volt' : 'warn',
        },
        { label: 'Weekly pace to stay on track', value: `${fmtHours(weeklyTargetHours)}h` },
        { label: 'Your average over 30 days', value: `${fmtHours(last30Avg)}h/wk` },
      ],
      advice: onPace
        ? `You're ahead of the ${fmtHours(weeklyTargetHours)}h pace — bank the extra now while you have the run.`
        : `Log ${fmtHours(shortfallThisWeek)}h more this week to hit pace.`,
      adviceDetail: otjComplete
        ? 'Your hours are already banked — anything you log now is a bonus.'
        : projectedShortfall > 0 && last30Avg < weeklyTargetHours
          ? `At your 30-day average of ${fmtHours(last30Avg)}h/wk you'd finish ${fmtHours(projectedShortfall)}h short. Sustained, ${fmtHours(requiredWeekly)}h/wk closes it.`
          : 'A single logged activity a week is usually enough to hold pace.',
      action: { label: 'Add training', onClick: () => setShowLogSheet(true) },
    };
  }, [
    weekHours,
    weeklyTargetHours,
    onPace,
    last30Avg,
    otjComplete,
    projectedShortfall,
    requiredWeekly,
  ]);

  const gatewayDetail = useCallback((): KpiDetail => {
    const total = totalAllMin || 1;
    return {
      label: 'Counts to gateway',
      value: `${fmtHours(yearHours)}h`,
      verdict: otjComplete ? 'Complete' : `${yearPct}% of ${yearTargetHours}h`,
      rows: [
        {
          label: 'Learning in the app, recorded automatically',
          value: `${fmtHours(sourceBreakdown.autoTrackedMin / 60)}h`,
          share: sourceBreakdown.autoTrackedMin / total,
          tone: 'volt',
        },
        {
          label: 'Approved or verified by your tutor or employer',
          value: `${fmtHours((totalDefensibleMin - sourceBreakdown.autoTrackedMin) / 60)}h`,
          share: (totalDefensibleMin - sourceBreakdown.autoTrackedMin) / total,
          tone: 'volt',
        },
        {
          label: 'Logged but not yet counting',
          value: `${fmtHours(yearPendingHours)}h`,
          share: totalPendingMin / total,
          tone: 'warn',
        },
        { label: 'Still to find', value: `${fmtHours(Math.max(0, yearTargetHours - yearHours))}h` },
      ],
      advice: otjComplete
        ? `All ${yearTargetHours}h are banked and defensible — you can stop logging.`
        : yearPendingHours >= 1
          ? `Getting your ${fmtHours(yearPendingHours)}h of pending time signed off is the fastest way to move this number.`
          : `${fmtHours(Math.max(0, yearTargetHours - yearHours))}h to go, over about ${weeksRemaining} weeks.`,
      adviceDetail:
        'Time you spend learning in Elec-Mate counts automatically and your tutor approves it. Site diary and work activities count once your tutor or employer signs them off.',
      action: { label: 'Add training', onClick: () => setShowLogSheet(true) },
    };
  }, [
    yearHours,
    yearTargetHours,
    yearPct,
    otjComplete,
    yearPendingHours,
    totalAllMin,
    totalDefensibleMin,
    totalPendingMin,
    sourceBreakdown.autoTrackedMin,
    weeksRemaining,
  ]);

  const verifiedDetail = useCallback((): KpiDetail => {
    const total = totalAllMin || 1;
    return {
      label: 'Verified',
      value: `${verificationRate}%`,
      verdict:
        totalAllMin === 0
          ? 'Nothing logged yet'
          : verificationRate >= 90
            ? 'Strongly defensible'
            : verificationRate >= 60
              ? 'Mostly verified'
              : 'Lots still pending',
      rows: [
        {
          label: 'Approved or verified by a person',
          value: `${fmtHours(approvedMin / 60)}h`,
          share: approvedMin / total,
          tone: 'volt',
        },
        {
          label: 'App learning, counting, waiting for your tutor to approve',
          value: `${fmtHours(sourceBreakdown.autoTrackedMin / 60)}h`,
          share: sourceBreakdown.autoTrackedMin / total,
          tone: 'plain',
        },
        {
          label: 'Self-logged, no verifier',
          value: `${fmtHours(unverifiedHours)}h`,
          share: (unverifiedHours * 60) / total,
          tone: 'warn',
        },
        {
          label: 'Submitted, waiting on someone',
          value: `${fmtHours(awaitingOthersHours)}h`,
          share: (awaitingOthersHours * 60) / total,
          tone: 'plain',
        },
        ...(rejectedHours > 0
          ? [
              {
                label: 'Referred back',
                value: `${fmtHours(rejectedHours)}h`,
                tone: 'warn' as const,
              },
            ]
          : []),
      ],
      advice:
        unverifiedHours >= 0.5
          ? `${fmtHours(unverifiedHours)}h has no verifier. Re-log it as an activity so a tutor or your supervisor can sign it.`
          : awaitingOthersHours >= 0.5
            ? `Nothing for you to do — ${fmtHours(awaitingOthersHours)}h is with your tutor.`
            : sourceBreakdown.autoTrackedMin >= 30
              ? 'Your app learning is counting. Your tutor approves it from their cohort hours page.'
              : 'Every hour you have logged has a named verifier. That is exactly what gateway wants to see.',
      adviceDetail:
        'A gateway assessor checks that each hour has a source and someone who signed it. Unverified time is the first thing they discount.',
      action: { label: 'Add training', onClick: () => setShowLogSheet(true) },
    };
  }, [
    verificationRate,
    totalAllMin,
    approvedMin,
    sourceBreakdown.autoTrackedMin,
    unverifiedHours,
    awaitingOthersHours,
    rejectedHours,
  ]);

  const notCountingDetail = useCallback((): KpiDetail => {
    const total = totalPendingMin || 1;
    return {
      label: 'Not counting yet',
      value: `${fmtHours(yearPendingHours)}h`,
      verdict: yearPendingHours === 0 ? 'Every hour counts' : 'At risk',
      rows: [
        {
          label: 'Self-logged with no verifier — your move',
          value: `${fmtHours(unverifiedHours)}h`,
          share: (unverifiedHours * 60) / total,
          tone: 'warn',
        },
        {
          label: 'With your tutor — their move',
          value: `${fmtHours(awaitingOthersHours)}h`,
          share: (awaitingOthersHours * 60) / total,
          tone: 'plain',
        },
        {
          label: 'Worth, once signed off',
          value: `${Math.round((yearPendingHours / Math.max(1, yearTargetHours)) * 100)}% of gateway`,
        },
      ],
      advice:
        yearPendingHours === 0
          ? 'Nothing you have logged is going to waste.'
          : unverifiedHours >= 0.5
            ? `Re-log your ${fmtHours(unverifiedHours)}h of site diary time as an activity — that is what sends it for sign-off.`
            : `${fmtHours(awaitingOthersHours)}h is already submitted. Give your tutor a nudge if it has been sitting a while.`,
      adviceDetail:
        'Site diary hours are self-reported, so they never count on their own. The same work logged as an activity, with a verifier, does.',
      action: { label: 'Add training', onClick: () => setShowLogSheet(true) },
    };
  }, [yearPendingHours, unverifiedHours, awaitingOthersHours, totalPendingMin, yearTargetHours]);

  /*
   * "Needs you" — ranked by what actually costs the apprentice their gateway.
   *
   * Referred-back entries first: those are hours already worked that a tutor
   * has refused, so they are the closest to being lost. Then self-logged hours
   * with no verifier, which count for nothing until someone signs them. Hours
   * already sitting with a tutor come last — they are somebody else's move and
   * belong on the list only so the apprentice knows they are not forgotten.
   */
  const needsYou: HubWorkItem[] = useMemo(() => {
    const items: HubWorkItem[] = [];

    if (hoursStatement && !hoursStatement.learner_signed_at) {
      items.push({
        id: 'statement',
        title: 'Sign your hours statement',
        reason: 'Your college prepared it: planned against delivered off-the-job hours',
        urgent: true,
        onClick: () => setShowStatement(true),
      });
    }

    if (rejected_apprentice.length > 0) {
      items.push({
        id: 'rejected',
        title: `${rejected_apprentice.length} ${rejected_apprentice.length === 1 ? 'entry' : 'entries'} referred back`,
        reason: 'Your tutor wants these changed before they count',
        trailing: `${fmtHours(rejectedHours)}h`,
        urgent: true,
        onClick: () => editAndResubmit(rejected_apprentice[0]),
      });
    }

    if (unverifiedHours >= 0.5) {
      items.push({
        id: 'unverified',
        title: `${fmtHours(unverifiedHours)}h logged with no verifier`,
        reason: 'Site diary hours only count once someone signs them off',
        trailing: `${fmtHours(unverifiedHours)}h`,
        urgent: true,
        onClick: () => setShowLogSheet(true),
      });
    }

    if (pending_apprentice.length > 0) {
      items.push({
        id: 'pending',
        title: employerLink
          ? `${pending_apprentice.length} waiting for ${employerLink.companyName}`
          : `${pending_apprentice.length} awaiting sign-off`,
        reason: employerLink
          ? 'Your employer has been told — nothing for you to do'
          : 'Send your supervisor a link so they can confirm the hours',
        trailing: `${fmtHours(awaitingOthersHours)}h`,
        onClick: () => handleEmployerLink(pending_apprentice[0]),
      });
    }

    if (!programme.loading && programme.source !== 'college' && programme.source !== 'self') {
      items.push({
        id: 'programme',
        title: 'Set your programme dates',
        reason: 'Targets and the forecast are estimates until you do',
        onClick: () => setShowProgrammeSetup(true),
      });
    }

    return items;
  }, [
    rejected_apprentice,
    pending_apprentice,
    unverifiedHours,
    awaitingOthersHours,
    rejectedHours,
    hoursStatement,
    programme.loading,
    programme.source,
    editAndResubmit,
    handleEmployerLink,
    employerLink,
  ]);

  /* ─── Render ──────────────────────────────────────────────────── */
  return (
    <HubPage>
      <HubMasthead section="Apprentice" title="Off-the-job training" backTo="/apprentice" />

      <HubBody>
        {/*
          One line, only when something is genuinely wrong, ranked the same way
          as the work list below it. The old page led with a 300px editorial
          hero — a greeting, the apprentice's name and a paragraph restating the
          numbers underneath it — before anything actionable. What was
          load-bearing in it was this.
        */}
        {rejected_apprentice.length > 0 ? (
          <HubAlertLine
            text={`${rejected_apprentice.length} ${rejected_apprentice.length === 1 ? 'entry has' : 'entries have'} been referred back`}
            action="Fix"
            onClick={() => editAndResubmit(rejected_apprentice[0])}
          />
        ) : unverifiedHours >= 0.5 ? (
          <HubAlertLine
            text={`${fmtHours(unverifiedHours)}h logged with no verifier — these won't count at gateway`}
            action="Fix"
            onClick={() => setShowLogSheet(true)}
          />
        ) : !otjComplete && forecastReliable && projectedShortfall > 0 && weeksRemaining > 0 ? (
          <HubAlertLine
            text={`On this pace you finish ${fmtHours(projectedShortfall)}h short — ${fmtHours(requiredWeekly)}h/wk gets you there`}
            action="Add"
            onClick={() => setShowLogSheet(true)}
          />
        ) : null}

        <OjtHeroCard
          summary={otjSummary}
          fallbackRequired={yearTargetHours}
          weekHours={weekHours}
          waitingHours={yearPendingHours}
          trainedThisMonth={trainedThisMonth}
          onAddTraining={() => setShowLogSheet(true)}
          onWeek={() => setKpiDetail(weekDetail())}
          onCounted={() => setKpiDetail(gatewayDetail())}
          onApproved={() => setKpiDetail(verifiedDetail())}
          onWaiting={() => setKpiDetail(notCountingDetail())}
          onSetProgramme={() => setShowProgrammeSetup(true)}
        />

        <HoursToConfirmCard
          proposals={otjProposals}
          loading={proposalsLoading}
          onChanged={() => {
            void Promise.all([refreshProposals(), refreshOtj(), refreshVerify(), refreshSummary()]);
          }}
        />

        <GuideActions
          items={[
            {
              title: 'Add training',
              description: 'College days, courses and shadowing, kept ready for sign-off',
              primary: true,
              onClick: () => setShowLogSheet(true),
            },
            {
              title: 'Evidence pack',
              description: canExport ? 'PDF for your tutor or gateway' : 'Log an hour first',
              onClick: () => (canExport ? handleExportPdf() : setShowLogSheet(true)),
            },
            {
              title: 'My programme',
              description:
                programme.source === 'college'
                  ? 'Dates set by your college'
                  : 'Set your dates and target',
              onClick: () => setShowProgrammeSetup(true),
            },
          ]}
        />

        <AppLearningCard
          data={appLearning}
          leftOut={verificationRows
            .filter((r) => r.source_kind === 'in_app' && r.verification_status === 'rejected')
            .map((r) => ({
              date: r.activity_date,
              minutes: r.duration_minutes,
              reason: r.verification_rationale,
            }))}
        />

        <HubWorkList items={needsYou} unit="thing" />

        {/* Verification panel */}
        {(pending_apprentice.length > 0 || rejected_apprentice.length > 0) && (
          <VerificationPanel
            pending={pending_apprentice}
            rejected={rejected_apprentice}
            onResubmit={editAndResubmit}
            onEmployerLink={handleEmployerLink}
            employerLink={employerLink ?? null}
          />
        )}

        {/* Recent entries timeline */}
        <RecentEntries
          focusId={focusEntry}
          rows={verificationRows}
          employerLink={employerLink ?? null}
          loading={verifyLoading || otjLoading}
          inAppMinutes={capturedMin}
          collegeMinutes={collegeMinutes}
          canExport={canExport}
          onExportPdf={handleExportPdf}
          onExportCsv={handleExportCsv}
        />

        {/*
          Goals and assessments are peers, and both are usually near-empty —
          stacked full-width they were two enormous bands of empty state at the
          bottom of the page. Side by side from lg:, each with its own items
          two-up, gives the 2x2 block they should have been.
        */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-6">
          {/* Personal OTJ targets (migrated from legacy /apprentice/ojt) */}
          <OjtGoalsSection />
          {/* Deadline tracking (migrated from legacy /apprentice/ojt) */}
          <OjtAssessmentsSection />
        </div>

        <OjtRequirementsCard />
      </HubBody>

      {/* Unified log sheet — photos + AI proposal, writes college_otj_entries.
          Same component the portfolio hub uses, so there's one log path. */}
      {/* Tapping any KPI opens what is behind the figure, plus one computed
          next step. `null` closes it — one piece of state, not two. */}
      <KpiDetailSheet detail={kpiDetail} onOpenChange={(o) => !o && setKpiDetail(null)} />

      <OtjStatementSignSheet
        statement={hoursStatement}
        open={showStatement}
        onOpenChange={setShowStatement}
        defaultName={fullName}
        onSigned={() => void refreshStatement()}
      />

      <SubmitWorkOtjSheet
        open={showLogSheet}
        onOpenChange={(o) => {
          setShowLogSheet(o);
          if (!o) setFirmPrefill(null);
        }}
        prefill={firmPrefill ?? undefined}
        onSubmitted={() => {
          void Promise.all([refreshOtj(), refreshVerify(), refreshSummary()]);
        }}
      />

      {/* Programme setup — self-set dates for apprentices with no college link */}
      <ProgrammeSetupSheet
        open={showProgrammeSetup}
        onOpenChange={setShowProgrammeSetup}
        initial={
          programme.source === 'self' && programme.startDate && programme.endDate
            ? {
                start_date: programme.startDate,
                end_date: programme.endDate,
                total_hours: programme.totalTargetHours,
              }
            : null
        }
        onSave={(p) => {
          programme.setSelfProgramme(p);
          setTimeout(() => void refreshSummary(), 800);
        }}
        /* College dates outrank anything set in the sheet (see useOtjProgramme's
           source priority), so a linked student is shown what their provider
           holds instead of a form whose input would be discarded. */
        college={
          programme.source === 'college'
            ? {
                startDate: programme.startDate,
                endDate: programme.endDate,
                totalHours: programme.totalTargetHours,
              }
            : null
        }
      />
    </HubPage>
  );
}

/* ────────────────────────── Sub-components ────────────────────────── */

/**
 * Who has (or hasn't yet) signed an entry, in words (ELE-2011). Every row on
 * this page carries one, so an apprentice can tell firm-attested hours from
 * college-verified ones and see exactly who each waiting entry is with.
 * Outline only: a translucent volt fill goes muddy on this ground.
 */
type Attestation = { label: string; tone: 'volt' | 'white' | 'red' };

function attestationFor(row: OtjEntryRow, link: MyEmployerLink | null): Attestation {
  const firm = link?.companyName ?? null;
  const mine = link?.supervisors.find((s) => s.isMine) ?? link?.supervisors[0];
  const supervisorFirst = mine?.name ? mine.name.trim().split(/\s+/)[0] : null;
  if (
    row.verification_status === 'verified_by_employer' ||
    row.source_kind === 'employer_attested'
  ) {
    if (row.verification_status === 'rejected')
      return { label: 'Not confirmed by employer', tone: 'red' };
    const who = row.attested_by_name?.trim().split(/\s+/)[0] ?? firm;
    return { label: who ? `Attested · ${who}` : 'Attested by employer', tone: 'volt' };
  }
  if (row.verification_status === 'verified') {
    return {
      label: row.source_kind === 'in_app' ? 'Approved by tutor' : 'Verified by college',
      tone: 'volt',
    };
  }
  if (row.verification_status === 'rejected') {
    return {
      label: row.source_kind === 'in_app' ? 'Left out by tutor' : 'Referred back',
      tone: 'red',
    };
  }
  // pending
  if (row.source_kind === 'in_app') return { label: 'Counting · tutor to approve', tone: 'white' };
  if (link) return { label: `Waiting for ${supervisorFirst ?? firm}`, tone: 'white' };
  return { label: 'Waiting for your tutor', tone: 'white' };
}

function AttestationBadge({ row, link }: { row: OtjEntryRow; link: MyEmployerLink | null }) {
  const a = attestationFor(row, link);
  return (
    <span
      className={cn(
        'inline-flex max-w-full items-center truncate rounded-md border px-1.5 py-0.5 text-[12.5px] font-semibold leading-tight text-white',
        a.tone === 'volt' && 'border-elec-yellow/70',
        a.tone === 'white' && 'border-white/[0.35]',
        a.tone === 'red' && 'border-red-400/80'
      )}
    >
      {a.label}
    </span>
  );
}

function VerificationPanel({
  pending,
  rejected,
  onResubmit,
  onEmployerLink,
  employerLink,
}: {
  pending: OtjEntryRow[];
  rejected: OtjEntryRow[];
  onResubmit: (row: OtjEntryRow) => void;
  onEmployerLink: (row: OtjEntryRow) => void;
  employerLink: MyEmployerLink | null;
}) {
  const pendingHours = pending.reduce((sum, r) => sum + r.duration_minutes, 0) / 60;
  const supervisorNames = employerLink?.supervisors.map((s) => s.name).filter(Boolean) ?? [];

  // /apprentice/ojt-hub#returned (the "Do next" item, ELE-1896) scrolls here.
  useEffect(() => {
    if (rejected.length > 0 && window.location.hash === '#returned') {
      document.getElementById('returned')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [rejected.length]);

  return (
    <section id="returned" className="scroll-mt-24 space-y-3">
      <SectionHeader
        title={
          rejected.length > 0
            ? `${rejected.length} ${rejected.length === 1 ? 'entry needs' : 'entries need'} editing`
            : `${pending.length} ${pending.length === 1 ? 'entry' : 'entries'} · ${fmtHours(pendingHours)}h waiting on sign-off`
        }
        meta={
          employerLink
            ? `Your tutor sees these in the college inbox, and your supervisor at ${employerLink.companyName} confirms them in Elec-Mate`
            : "Hours land in your tutor's college inbox the moment you submit"
        }
      />

      {/* Who can sign this off for you — the two authorities, named */}
      {employerLink && pending.length > 0 && (
        <div
          className={cn(
            '-mx-4 border-y border-white/[0.12] px-4 py-3.5 sm:mx-0 sm:rounded-2xl sm:border-x sm:px-5',
            CARD_SURFACE
          )}
        >
          <p className="text-[12px] font-semibold text-white">Your employer</p>
          <p className="mt-1 text-[14px] font-semibold leading-tight text-white">
            {employerLink.companyName}
          </p>
          <p className="mt-1 text-[12.5px] leading-snug text-white">
            {supervisorNames.length > 0
              ? `${supervisorNames.slice(0, 3).join(', ')} can confirm these in Elec-Mate — no link needed.`
              : 'Your employer can confirm these in Elec-Mate — no link needed.'}
            {employerLink.employerAttestedHours > 0 &&
              ` ${employerLink.employerAttestedHours}h already workplace-attested.`}
          </p>
        </div>
      )}

      {/* Referred back first — hours already worked that a tutor has refused
          are the closest thing on this page to being lost. Red is correct
          here: this IS the app's error state, unlike the forecast card. */}
      {rejected.length > 0 && (
        <ul
          className={cn(
            '-mx-4 divide-y divide-white/[0.10] overflow-hidden border-y border-red-500/40 sm:mx-0 sm:rounded-2xl sm:border-x',
            CARD_SURFACE
          )}
        >
          {rejected.map((row) => (
            <li key={row.id} data-focus-id={row.id} className="px-4 py-3.5 sm:px-5">
              <div className="flex items-start gap-3">
                <span aria-hidden className="mt-0.5 h-9 w-[3px] shrink-0 rounded-full bg-red-400" />
                <div className="min-w-0 flex-1">
                  <p className="text-[14px] font-semibold leading-tight text-white">{row.title}</p>
                  <p className="mt-0.5 text-[12px] leading-tight text-white">
                    Referred back · {fmtDate(row.activity_date)} ·{' '}
                    {(row.duration_minutes / 60).toFixed(1)}h
                  </p>
                  {row.verification_rationale && (
                    <p className="mt-1.5 border-l-2 border-red-400/50 pl-2.5 text-[12.5px] italic leading-snug text-white">
                      {row.verification_rationale}
                    </p>
                  )}
                </div>
              </div>
              {/* h-11, not h-8. Every interactive element clears 44px — these
                  were 32px, which is under the minimum on the one screen an
                  apprentice uses one-handed on site. */}
              <button
                type="button"
                onClick={() => onResubmit(row)}
                className="mt-2.5 inline-flex h-11 items-center gap-1.5 rounded-lg bg-elec-yellow px-4 text-[13px] font-semibold text-black transition-colors touch-manipulation hover:bg-elec-yellow/90 active:scale-[0.98]"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Fix and resubmit
              </button>
            </li>
          ))}
        </ul>
      )}

      {pending.length > 0 && (
        <ul
          className={cn(
            '-mx-4 divide-y divide-white/[0.10] overflow-hidden border-y border-white/[0.08] sm:mx-0 sm:rounded-2xl sm:border-x',
            CARD_SURFACE
          )}
        >
          {/* The full list (was capped at five, ELE-2011). */}
          {pending.map((row) => (
            <li key={row.id} data-focus-id={row.id} className="px-4 py-3.5 sm:px-5">
              <div className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-0.5 h-9 w-[3px] shrink-0 rounded-full bg-white/[0.30]"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] font-semibold leading-tight text-white">
                    {row.title}
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                    <AttestationBadge row={row} link={employerLink} />
                    <span className="text-[12px] leading-tight text-white">
                      {fmtDate(row.activity_date)}
                    </span>
                  </div>
                </div>
                <span className="shrink-0 text-[15px] font-semibold leading-tight tabular-nums text-white">
                  {(row.duration_minutes / 60).toFixed(1)}
                  <span className="ml-0.5 text-[12.5px] font-medium text-white">h</span>
                </span>
              </div>
              {/*
                The second route to a signature, and the one most apprentices
                need: no college link means no tutor inbox, so the supervisor
                who watched them do the work signs it instead.
              */}
              {employerLink ? (
                // The firm is on Elec-Mate: the entry is already in their
                // attestation inbox and they were notified when it was saved,
                // so there is nothing to send. The link stays as a fallback
                // (e.g. a supervisor who isn't on the firm's account).
                <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <p className="text-[12.5px] leading-snug text-white">
                    {supervisorNames.length > 0
                      ? `${supervisorNames[0].split(' ')[0]} at ${employerLink.companyName} has been told — they confirm it in their app.`
                      : `${employerLink.companyName} has been told — they confirm it in their app.`}
                  </p>
                  <button
                    type="button"
                    onClick={() => onEmployerLink(row)}
                    className="inline-flex h-11 items-center gap-1.5 text-[12.5px] font-medium text-white underline underline-offset-2 touch-manipulation"
                  >
                    <Share2 className="h-3.5 w-3.5" />
                    Send a link instead
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => onEmployerLink(row)}
                  className="mt-2.5 inline-flex h-11 items-center gap-1.5 rounded-lg border border-white/[0.14] bg-white/[0.05] px-4 text-[13px] font-medium text-white transition-colors touch-manipulation hover:bg-white/[0.09] active:scale-[0.98]"
                >
                  <Share2 className="h-3.5 w-3.5" />
                  Ask my supervisor to sign it
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function RecentEntries({
  focusId = null,
  rows,
  employerLink,
  loading,
  inAppMinutes,
  collegeMinutes,
  canExport,
  onExportPdf,
  onExportCsv,
}: {
  rows: OtjEntryRow[];
  employerLink: MyEmployerLink | null;
  loading: boolean;
  inAppMinutes: number;
  collegeMinutes: number;
  canExport: boolean;
  onExportPdf: () => void;
  onExportCsv: () => void;
  focusId?: string | null;
}) {
  void collegeMinutes;
  const [showAll, setShowAll] = useState(false);
  // A deep-linked entry older than the latest 12 needs the full list.
  useEffect(() => {
    if (focusId && rows.findIndex((r) => r.id === focusId) >= 12) setShowAll(true);
  }, [focusId, rows]);
  const recent = showAll ? rows : rows.slice(0, 12);
  return (
    <section className="space-y-3">
      <SectionHeader
        eyebrow="Recent entries"
        title="Every hour, every source"
        meta={
          inAppMinutes > 0
            ? `Plus ${(inAppMinutes / 60).toFixed(1)}h of learning in the app, recorded automatically`
            : 'Submit your first hours via "Log time"'
        }
        action={
          canExport ? (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={onExportPdf}
                className="inline-flex h-11 items-center gap-1.5 rounded-lg bg-elec-yellow px-4 text-[13px] font-semibold text-black transition-all touch-manipulation hover:bg-elec-yellow/90 active:scale-[0.98]"
              >
                <Download className="h-3.5 w-3.5" strokeWidth={2.5} />
                Evidence pack
              </button>
              <button
                type="button"
                onClick={onExportCsv}
                className="inline-flex h-11 items-center gap-1.5 rounded-lg border border-white/[0.14] bg-white/[0.05] px-4 text-[13px] font-semibold text-white transition-colors touch-manipulation hover:bg-white/[0.09] active:scale-[0.98]"
              >
                CSV
              </button>
            </div>
          ) : undefined
        }
      />
      {loading ? (
        <div className="flex items-center gap-3 py-6">
          <Loader2 className="h-4 w-4 animate-spin text-white" />
          <Eyebrow>Loading…</Eyebrow>
        </div>
      ) : recent.length === 0 ? (
        <div
          className={cn(
            'rounded-2xl border border-white/[0.08] p-6 text-center space-y-2',
            CARD_SURFACE
          )}
        >
          <Eyebrow>No logged training yet</Eyebrow>
          <p className="text-[14px] text-white leading-relaxed">
            Learning in the app counts by itself. Training away from the app counts once you log it
            with "Add training", ready for your tutor or supervisor to sign off.
          </p>
        </div>
      ) : (
        /*
          One divided list, not N floating cards.
          These were separate full-width cards with a status chip, a source
          word, a date and a name strung across the top and the hours pinned to
          the far right edge — on a monitor that put ~1,400px of nothing
          between the title and its own figure, and six entries filled the
          screen. A single container with hairline dividers is the same pattern
          HubWorkList uses, and it reads as a ledger, which is what it is.
        */
        <ul
          className={cn(
            '-mx-4 divide-y divide-white/[0.10] overflow-hidden border-y border-white/[0.08] sm:mx-0 sm:rounded-2xl sm:border-x',
            CARD_SURFACE
          )}
        >
          {recent.map((row) => {
            const rejected = row.verification_status === 'rejected';
            const counts =
              row.verification_status === 'verified' ||
              row.verification_status === 'verified_by_employer';
            return (
              <li
                key={row.id}
                data-focus-id={row.id}
                className="flex items-start gap-3 px-4 py-3 sm:px-5"
              >
                {/* A rule, not a chip. Volt = banked, white = still pending,
                    red = referred back. The status is legible at a glance
                    without spending a whole line of type on a pill. */}
                <span
                  aria-hidden
                  className={cn(
                    'mt-0.5 h-9 w-[3px] shrink-0 rounded-full',
                    rejected ? 'bg-red-400' : counts ? 'bg-elec-yellow' : 'bg-white/[0.30]'
                  )}
                />

                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] font-semibold leading-tight text-white">
                    {row.title}
                  </p>
                  {/* One meta line, in reading order: what happened, when, who
                      signed it. Four separate spans became one sentence. */}
                  {/* Who signed it (or who it is waiting for), then source and date. */}
                  <div className="mt-1 flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
                    <AttestationBadge row={row} link={employerLink} />
                    <span className="truncate text-[12px] leading-tight text-white">
                      {SOURCE_LABEL[row.source_kind]}
                      {row.activity_date ? ` · ${fmtDate(row.activity_date)}` : ''}
                    </span>
                  </div>
                  {row.verification_rationale && rejected && (
                    <p className="mt-1 text-[12px] italic leading-snug text-red-300">
                      {row.verification_rationale}
                    </p>
                  )}
                </div>

                {/* Sits with the row, not at the far edge of the window. Volt
                    only when the hours actually count towards gateway. */}
                <span
                  className={cn(
                    'shrink-0 text-[15px] font-semibold tabular-nums leading-tight',
                    counts ? 'text-elec-yellow' : 'text-white'
                  )}
                >
                  {(row.duration_minutes / 60).toFixed(1)}
                  <span className="ml-0.5 text-[12.5px] font-medium text-white">h</span>
                </span>
              </li>
            );
          })}
        </ul>
      )}
      {!loading && rows.length > 12 && (
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          className="h-11 w-full rounded-xl border border-white/[0.18] bg-white/[0.06] text-[13px] font-semibold text-white touch-manipulation sm:w-auto sm:px-5"
        >
          {showAll ? 'Show the latest 12' : `Show all ${rows.length} entries`}
        </button>
      )}
    </section>
  );
}
