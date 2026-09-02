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
import { Loader2, RefreshCw, Share2, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useApprenticeOtj } from '@/hooks/useApprenticeOtj';
import { useOtjProgramme } from '@/hooks/useOtjProgramme';
import {
  useStudentOtjVerification,
  type OtjEntryRow,
  type SourceKind,
  type VerificationStatus,
} from '@/hooks/useStudentOtjVerification';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { Eyebrow } from '@/components/apprentice-hub/portfolio/PortfolioPrimitives';
import {
  HubPage,
  HubBody,
  HubMasthead,
  HubAlertLine,
  HubQuickStart,
  HubKpi,
  HubKpiRow,
  HubWorkList,
  type HubWorkItem,
} from '@/components/hub/HubPrimitives';
import { SubmitWorkOtjSheet } from '@/components/apprentice-hub/SubmitWorkOtjSheet';
import { OTJ_STANDARDS } from '@/data/otjStandards';
import {
  exportOtjEvidencePack,
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
  const yearTargetHours = programme.totalTargetHours;
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

  // Log sheet — unified work-activity capture (photos + AI), shared with the
  // portfolio hub. Replaces the old inline Quick Log so there's one log path.
  const [showLogSheet, setShowLogSheet] = useState(false);

  // Recent entries — merge college_otj_entries (source-of-truth for verification)
  // with the unified breakdown's entries from learning_activity_log etc. The
  // verificationRows already include status, so we use them as the primary
  // timeline; the breakdown gives us in-app totals.
  const inAppMinutes =
    breakdown.by_source.learning_activity.minutes + breakdown.by_source.study_session.minutes;
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

    // In-app auto-tracked (learning_activity_log + study_sessions): treated as
    // system-verified hours. These are the canonical source for in-app hours;
    // college_otj_entries.source_kind='in_app' rows (byKind.in_app) are NOT
    // added to the defensible total — doing so would double-count the same
    // activity, since there is no dedup key tying the two representations.
    const autoTrackedMin = inAppMinutes;

    // Manual time_entries (site diary / legacy time tracker) are SELF-REPORTED,
    // not system-attested, so they never join autoTrackedMin (that bucket is
    // treated as defensible by definition). Supervisor-verified manual hours
    // count as defensible; unverified ones sit with the pending total.
    let manualVerifiedMin = 0;
    let manualUnverifiedMin = 0;
    for (const e of otjEntries) {
      if (e.source !== 'time_entry') continue;
      if (e.verified_at) manualVerifiedMin += e.duration_minutes;
      else manualUnverifiedMin += e.duration_minutes;
    }

    return { byKind, autoTrackedMin, manualVerifiedMin, manualUnverifiedMin };
  }, [verificationRows, inAppMinutes, otjEntries]);

  const totalDefensibleMin =
    sourceBreakdown.autoTrackedMin +
    sourceBreakdown.manualVerifiedMin +
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

  const verificationRate =
    totalAllMin > 0 ? Math.round((totalDefensibleMin / totalAllMin) * 100) : 100;

  // Gateway total must reflect ONLY ESFA-defensible hours — auto-tracked
  // in-app activity plus tutor/employer-verified entries. breakdown.total_hours
  // also includes pending AND rejected college_otj_entries, which must never
  // inflate the gateway figure or the forecast: a tutor-rejected entry is not
  // a banked hour. Pending hours are surfaced separately so the apprentice can
  // see what's still in the pipeline without it counting prematurely.
  const yearHours = totalDefensibleMin / 60;
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
    const now = new Date();
    const diffToMonday = (now.getUTCDay() + 6) % 7;
    const sinceWeek = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - diffToMonday)
    ).toISOString();
    const since30 = new Date(Date.now() - 30 * 86_400_000).toISOString();
    let weekMin = 0;
    let last30Min = 0;
    // In-app auto-tracked (defensible, system-attested) plus manual site-diary
    // time entries — pacing reflects all logged work, not just attested hours.
    for (const e of otjEntries) {
      if (
        e.source !== 'learning_activity' &&
        e.source !== 'study_session' &&
        e.source !== 'time_entry'
      )
        continue;
      if (e.occurred_at >= sinceWeek) weekMin += e.duration_minutes;
      if (e.occurred_at >= since30) last30Min += e.duration_minutes;
    }
    // Verified college hours only (pending/rejected excluded)
    for (const r of verificationRows) {
      if (r.verification_status !== 'verified' && r.verification_status !== 'verified_by_employer')
        continue;
      const at = r.activity_date ? `${r.activity_date}T12:00:00Z` : null;
      if (!at) continue;
      if (at >= sinceWeek) weekMin += r.duration_minutes;
      if (at >= since30) last30Min += r.duration_minutes;
    }
    return { weekHours: weekMin / 60, last30Avg: last30Min / 60 / 4.3 };
  }, [otjEntries, verificationRows]);

  const weekPct =
    weeklyTargetHours > 0 ? Math.min(Math.round((weekHours / weeklyTargetHours) * 100), 150) : 0;
  const onPace = weekHours >= weeklyTargetHours;

  // Forecast: at current verified weekly rate, where will we be at gateway?
  const projectedHours = yearHours + last30Avg * weeksRemaining;
  const projectedShortfall = Math.max(0, yearTargetHours - projectedHours);
  const requiredWeekly =
    projectedShortfall > 0 ? projectedShortfall / weeksRemaining + last30Avg : last30Avg;

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
          description:
            'Send it to your supervisor. They open it, type their name + email, and these hours flip to employer-attested.',
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
    [toast]
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

    // In-app auto-tracked (system-attested, verified)
    const inAppEntries: OtjExportEntry[] = otjEntries
      .filter((e) => e.source === 'learning_activity' || e.source === 'study_session')
      .map((e) => ({
        date: e.occurred_at.slice(0, 10),
        title: e.title,
        activityType: prettify(e.category ?? 'In-app'),
        source: 'In-app',
        status: 'Verified',
        durationMinutes: e.duration_minutes,
        verifier: 'System',
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
        status: e.verified_at ? 'Verified' : 'Self-logged',
        durationMinutes: e.duration_minutes,
        verifier: e.verified_at ? 'Supervisor' : '—',
        evidenceCount: 0,
      }));

    // College / submitted / attested entries
    const collegeEntries: OtjExportEntry[] = verificationRows.map((r) => ({
      date: r.activity_date,
      title: r.title,
      activityType: prettify(r.activity_type),
      source: SOURCE_LABEL[r.source_kind] ?? r.source_kind,
      status: STATUS_LABEL[r.verification_status] ?? r.verification_status,
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
          r.source_kind !== 'in_app'
      )
      .map((r) => {
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
        if (cs?.employer_id) {
          /*
           * Cast through an untyped builder.
           *
           * `.from('employers')` against the generated types blew the checker
           * out — TS2589 "type instantiation is excessively deep", which then
           * cascaded into three more errors on the same four lines, because
           * once the row type collapses to `never` the column name and the
           * result property both fail too. Four errors from one query, all of
           * them noise, sitting permanently in the file. Known noise is worse
           * than no check: it is where a real error hides.
           *
           * Same single documented escape hatch `usePublicLeadPage` uses.
           * Behaviour is unchanged — this is a shape assertion, not a change
           * of query.
           */
          const db = supabase as unknown as {
            from: (t: string) => {
              select: (c: string) => {
                eq: (
                  col: string,
                  val: string
                ) => { maybeSingle: () => Promise<{ data: { name: string | null } | null }> };
              };
            };
          };
          const { data: emp } = await db
            .from('employers')
            .select('name')
            .eq('id', cs.employer_id as string)
            .maybeSingle();
          employer = emp?.name ?? null;
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
  ]);

  const handleExportPdf = useCallback(() => {
    void (async () => {
      try {
        await exportOtjEvidencePack(await buildExportData());
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
      action: { label: 'Log time', onClick: () => setShowLogSheet(true) },
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
          label: 'In-app, auto-tracked',
          value: `${fmtHours(sourceBreakdown.autoTrackedMin / 60)}h`,
          share: sourceBreakdown.autoTrackedMin / total,
          tone: 'volt',
        },
        {
          label: 'Verified by a tutor or employer',
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
        'Only hours with a named verifier count at gateway. In-app study and video time is system-attested, so it counts automatically.',
      action: { label: 'Log time', onClick: () => setShowLogSheet(true) },
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
          label: 'Verified — counts at gateway',
          value: `${fmtHours(totalDefensibleMin / 60)}h`,
          share: totalDefensibleMin / total,
          tone: 'volt',
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
            : 'Every hour you have logged has a named verifier. That is exactly what gateway wants to see.',
      adviceDetail:
        'A gateway assessor checks that each hour has a source and someone who signed it. Unverified time is the first thing they discount.',
      action: { label: 'Log time', onClick: () => setShowLogSheet(true) },
    };
  }, [
    verificationRate,
    totalAllMin,
    totalDefensibleMin,
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
      action: { label: 'Log time', onClick: () => setShowLogSheet(true) },
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
        title: `${pending_apprentice.length} awaiting your tutor`,
        reason: 'Submitted — nothing for you to do yet',
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
    programme.loading,
    programme.source,
    editAndResubmit,
    handleEmployerLink,
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
        ) : !otjComplete && projectedShortfall > 0 && weeksRemaining > 0 ? (
          <HubAlertLine
            text={`On this pace you finish ${fmtHours(projectedShortfall)}h short — ${fmtHours(requiredWeekly)}h/wk gets you there`}
            action="Log"
            onClick={() => setShowLogSheet(true)}
          />
        ) : null}

        <HubQuickStart
          label="Start something"
          items={[
            {
              title: 'Log time',
              description: 'Photos and notes, signed off by your tutor',
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

        <HubKpiRow>
          <HubKpi
            accent
            onClick={() => setKpiDetail(weekDetail())}
            label="This week"
            value={`${fmtHours(weekHours)}h`}
            verdict={onPace ? 'On pace' : 'Behind pace'}
            direction={onPace ? 'up' : 'down'}
            sentiment={onPace ? 'good' : 'bad'}
            context={`${weekPct}% of the ${fmtHours(weeklyTargetHours)}h/wk that keeps you on track`}
          />
          <HubKpi
            onClick={() => setKpiDetail(gatewayDetail())}
            label="Counts to gateway"
            value={`${fmtHours(yearHours)}h`}
            verdict={otjComplete ? 'Complete' : `${yearPct}% of ${yearTargetHours}h`}
            context={
              otjComplete
                ? `All ${yearTargetHours}h banked and defensible`
                : `Verified hours only — pending time is not counted here`
            }
          />
          <HubKpi
            onClick={() => setKpiDetail(verifiedDetail())}
            label="Verified"
            value={`${verificationRate}%`}
            verdict={
              totalAllMin === 0
                ? 'Nothing logged yet'
                : verificationRate >= 90
                  ? 'Strongly defensible'
                  : verificationRate >= 60
                    ? 'Mostly verified'
                    : 'Lots still pending'
            }
            context="Share of your logged hours with a named verifier"
          />
          {/*
            Was "Pending sign-off", counting only entries formally submitted to
            a tutor — so an apprentice with 24.5h of unverified site diary and
            nothing submitted read "0 · Nothing waiting" while the card two
            along said "25h pending". It named the queue instead of the risk.
          */}
          <HubKpi
            label="Not counting yet"
            value={`${fmtHours(yearPendingHours)}h`}
            verdict={
              yearPendingHours === 0
                ? 'Every hour counts'
                : unverifiedHours >= 0.5
                  ? 'Needs a verifier'
                  : 'With your tutor'
            }
            sentiment={unverifiedHours >= 0.5 ? 'bad' : 'neutral'}
            direction={unverifiedHours >= 0.5 ? 'down' : 'flat'}
            context={
              yearPendingHours === 0
                ? 'Nothing logged is going to waste'
                : unverifiedHours >= 0.5
                  ? `${fmtHours(unverifiedHours)}h self-logged with no verifier${awaitingOthersHours >= 0.1 ? `, ${fmtHours(awaitingOthersHours)}h with your tutor` : ''}`
                  : `${fmtHours(awaitingOthersHours)}h submitted and waiting`
            }
            onClick={() => setKpiDetail(notCountingDetail())}
          />
        </HubKpiRow>

        <HubWorkList items={needsYou} unit="thing" />

        {/* Source mix bar */}
        <SourceMixBar
          autoTrackedMin={sourceBreakdown.autoTrackedMin}
          manualVerifiedMin={sourceBreakdown.manualVerifiedMin}
          manualUnverifiedMin={sourceBreakdown.manualUnverifiedMin}
          byKind={sourceBreakdown.byKind}
          totalAllMin={totalAllMin + sourceBreakdown.autoTrackedMin}
        />

        {/* Compliance forecast — held back until the real programme resolves
            so a college-linked apprentice never sees the estimate flash first. */}
        {!programme.loading && (
          <ComplianceForecast
            yearHours={yearHours}
            yearTarget={yearTargetHours}
            projectedHours={projectedHours}
            projectedShortfall={projectedShortfall}
            requiredWeekly={requiredWeekly}
            weeksRemaining={weeksRemaining}
            last30Avg={last30Avg}
            programmeSource={programme.source}
            isComplete={otjComplete}
            onPersonalise={() => setShowProgrammeSetup(true)}
          />
        )}

        {/* Verification panel */}
        {(pending_apprentice.length > 0 || rejected_apprentice.length > 0) && (
          <VerificationPanel
            pending={pending_apprentice}
            rejected={rejected_apprentice}
            onResubmit={editAndResubmit}
            onEmployerLink={handleEmployerLink}
          />
        )}

        {/* Recent entries timeline */}
        <RecentEntries
          rows={verificationRows}
          loading={verifyLoading || otjLoading}
          inAppMinutes={inAppMinutes}
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
      </HubBody>

      {/* Unified log sheet — photos + AI proposal, writes college_otj_entries.
          Same component the portfolio hub uses, so there's one log path. */}
      {/* Tapping any KPI opens what is behind the figure, plus one computed
          next step. `null` closes it — one piece of state, not two. */}
      <KpiDetailSheet detail={kpiDetail} onOpenChange={(o) => !o && setKpiDetail(null)} />

      <SubmitWorkOtjSheet
        open={showLogSheet}
        onOpenChange={setShowLogSheet}
        onSubmitted={() => {
          void Promise.all([refreshOtj(), refreshVerify()]);
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
        onSave={programme.setSelfProgramme}
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

function SourceMixBar({
  autoTrackedMin,
  manualVerifiedMin,
  manualUnverifiedMin,
  byKind,
  totalAllMin,
}: {
  autoTrackedMin: number;
  manualVerifiedMin: number;
  manualUnverifiedMin: number;
  byKind: Record<SourceKind, { verifiedMin: number; pendingMin: number; rejectedMin: number }>;
  totalAllMin: number;
}) {
  // Build segments — stacked
  const segments: Array<{ label: string; minutes: number; tone: string }> = [
    {
      label: 'In-app auto-tracked',
      minutes: autoTrackedMin,
      tone: 'bg-elec-yellow/85',
    },
    {
      label: 'Tutor-recorded',
      minutes: byKind.tutor_recorded.verifiedMin,
      tone: 'bg-elec-yellow',
    },
    {
      label: 'Employer-attested',
      minutes: byKind.employer_attested.verifiedMin,
      tone: 'bg-elec-yellow/70',
    },
    {
      label: 'Apprentice-submitted (verified)',
      minutes: byKind.apprentice_submitted.verifiedMin,
      tone: 'bg-elec-yellow/55',
    },
    {
      label: 'Site diary (verified)',
      minutes: manualVerifiedMin,
      tone: 'bg-elec-yellow/40',
    },
    {
      label: 'Pending sign-off',
      minutes:
        byKind.in_app.pendingMin +
        byKind.apprentice_submitted.pendingMin +
        byKind.tutor_recorded.pendingMin +
        byKind.employer_attested.pendingMin,
      tone: 'bg-white/35',
    },
    {
      label: 'Site diary (self-logged)',
      minutes: manualUnverifiedMin,
      tone: 'bg-white/25',
    },
  ];
  const total = totalAllMin || segments.reduce((s, x) => s + x.minutes, 0);

  return (
    <section className="space-y-3">
      <SectionHeader
        eyebrow="Source mix"
        title="Where your hours come from"
        meta="Defensibility at a glance — yellow = verified & counts, grey = pending"
      />
      <div
        className={cn(
          'rounded-2xl border border-elec-yellow/35 p-4 sm:p-5 space-y-3',
          CARD_SURFACE
        )}
      >
        {total === 0 ? (
          <p className="text-[13px] text-white leading-relaxed">
            No hours logged yet. Tap "Log time" to send your first entry to your tutor.
          </p>
        ) : (
          <>
            <div className="h-3 w-full rounded-full overflow-hidden bg-white/[0.04] flex">
              {segments.map(
                (s) =>
                  s.minutes > 0 && (
                    <div
                      key={s.label}
                      className={cn('h-full transition-all duration-500', s.tone)}
                      style={{ width: `${(s.minutes / total) * 100}%` }}
                      title={`${s.label}: ${(s.minutes / 60).toFixed(1)}h`}
                    />
                  )
              )}
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
              {segments
                .filter((s) => s.minutes > 0)
                .map((s) => (
                  <li key={s.label} className="flex items-center gap-2 text-[12px] text-white">
                    <span className={cn('h-2 w-2 rounded-sm flex-shrink-0', s.tone)} />
                    <span className="flex-1 truncate">{s.label}</span>
                    <span className="text-white tabular-nums">{(s.minutes / 60).toFixed(1)}h</span>
                  </li>
                ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}

function ComplianceForecast({
  yearHours,
  yearTarget,
  projectedHours,
  projectedShortfall,
  requiredWeekly,
  weeksRemaining,
  last30Avg,
  programmeSource,
  isComplete,
  onPersonalise,
}: {
  yearHours: number;
  yearTarget: number;
  projectedHours: number;
  projectedShortfall: number;
  requiredWeekly: number;
  weeksRemaining: number;
  last30Avg: number;
  programmeSource: 'college' | 'self' | 'estimated';
  isComplete: boolean;
  onPersonalise: () => void;
}) {
  const onTrack = projectedShortfall === 0;
  const isEstimate = programmeSource === 'estimated';

  // Off-the-job hours are a total to complete, not a perpetual weekly quota —
  // apprentices can front-load and, once the total is banked, stop logging.
  if (isComplete) {
    return (
      <section className="space-y-3">
        <SectionHeader
          eyebrow="Off-the-job training"
          title="Hours complete"
          meta={`All ${yearTarget}h banked — you can stop logging off-the-job hours`}
        />
        <div className="rounded-xl border border-elec-yellow/30 bg-white/[0.05] p-4 sm:p-5 space-y-3">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-[26px] sm:text-[30px] lg:text-[32px] font-semibold text-elec-yellow tracking-tight tabular-nums leading-none">
              {fmtHours(yearHours)}h
            </span>
            <span className="text-[12px] sm:text-[13px] text-white">/ {yearTarget}h ✓</span>
          </div>
          <p className="text-[13px] text-white leading-relaxed">
            You've banked your full off-the-job requirement. You don't need to keep logging hours —
            front-loading like this is fine. Your apprenticeship still runs to gateway and end-point
            assessment; keep the evidence safe for your records.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-3">
      <SectionHeader
        eyebrow="Off-the-job forecast"
        title={
          onTrack
            ? 'On pace to finish your hours'
            : `Projecting ${fmtHours(projectedShortfall)}h short`
        }
        meta={
          isEstimate
            ? `Estimate · ${weeksRemaining} weeks to go · ${yearTarget}h total — set your dates for an accurate forecast`
            : `Suggested pace from the last 30 days · ${weeksRemaining} weeks to go · ${yearTarget}h total`
        }
        action={
          // College-linked dates are provider-authoritative — only self /
          // estimated programmes are apprentice-editable.
          programmeSource === 'college' ? undefined : (
            <button
              type="button"
              onClick={onPersonalise}
              className={cn(
                'inline-flex h-11 items-center gap-1.5 rounded-lg px-4 text-[13px] font-semibold transition-colors touch-manipulation active:scale-[0.98]',
                isEstimate
                  ? 'bg-elec-yellow text-black hover:bg-elec-yellow/90'
                  : 'border border-white/[0.08] bg-white/[0.02] text-white hover:bg-white/[0.04]'
              )}
            >
              {isEstimate ? 'Set your dates' : 'Edit dates'}
            </button>
          )
        }
      />
      {/*
        Volt, not red. Red is the app's destructive/error colour — it is what a
        tutor REJECTING your hours looks like. Being
        behind pace is not an error, it is the thing this page exists to tell
        you, and dressing it as one made the whole card read as a failure
        notice. Degree of accent carries it instead: a brighter volt edge when
        you are short, the same quiet one when you are not — the same rule
        HubKpi and HubToolGrid use for outstanding work.
      */}
      <div
        className={cn(
          'space-y-3.5 rounded-2xl border p-4 sm:p-5',
          CARD_SURFACE,
          onTrack ? 'border-elec-yellow/35' : 'border-elec-yellow/70'
        )}
      >
        <div className="flex items-end justify-between gap-3">
          <div className="space-y-1 min-w-0">
            <Eyebrow>Projected at gateway</Eyebrow>
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span
                className={cn(
                  'text-[26px] font-semibold leading-none tabular-nums tracking-tight sm:text-[30px] lg:text-[32px]',
                  'text-elec-yellow'
                )}
              >
                {fmtHours(projectedHours)}h
              </span>
              <span className="text-[12px] sm:text-[13px] text-white">/ {yearTarget}h</span>
            </div>
          </div>
          <div className="text-right space-y-1 flex-shrink-0">
            <Eyebrow>Pace</Eyebrow>
            <span className="text-[14px] sm:text-[16px] text-white tabular-nums whitespace-nowrap block">
              {last30Avg.toFixed(1)}h/wk
            </span>
          </div>
        </div>
        <p className="text-[13px] text-white leading-relaxed">
          {onTrack ? (
            <>
              Keep your current rate and you'll have{' '}
              <span className="text-elec-yellow whitespace-nowrap">
                {fmtHours(projectedHours - yearTarget)}h
              </span>{' '}
              of headroom. Log as you go or front-load — the hours just need banking by gateway.
            </>
          ) : (
            <>
              You're at <span className="text-white whitespace-nowrap">{fmtHours(yearHours)}h</span>
              . To bank your {yearTarget}h, aim for around{' '}
              <span className="text-elec-yellow whitespace-nowrap">
                ~{requiredWeekly.toFixed(1)}h/week
              </span>{' '}
              over the remaining {weeksRemaining} weeks — or front-load and finish sooner. Chase
              tutor sign-off so they count.
            </>
          )}
        </p>
      </div>
    </section>
  );
}

function VerificationPanel({
  pending,
  rejected,
  onResubmit,
  onEmployerLink,
}: {
  pending: OtjEntryRow[];
  rejected: OtjEntryRow[];
  onResubmit: (row: OtjEntryRow) => void;
  onEmployerLink: (row: OtjEntryRow) => void;
}) {
  const pendingHours = pending.reduce((sum, r) => sum + r.duration_minutes, 0) / 60;

  return (
    <section className="space-y-3">
      <SectionHeader
        title={
          rejected.length > 0
            ? `${rejected.length} ${rejected.length === 1 ? 'entry needs' : 'entries need'} editing`
            : `${fmtHours(pendingHours)}h waiting on sign-off`
        }
        meta="Hours land in your tutor's college inbox the moment you submit"
      />

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
            <li key={row.id} className="px-4 py-3.5 sm:px-5">
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
            '-mx-4 divide-y divide-white/[0.10] overflow-hidden border-y border-elec-yellow/35 sm:mx-0 sm:rounded-2xl sm:border-x',
            CARD_SURFACE
          )}
        >
          {pending.slice(0, 5).map((row) => (
            <li key={row.id} className="px-4 py-3.5 sm:px-5">
              <div className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="mt-0.5 h-9 w-[3px] shrink-0 rounded-full bg-white/[0.30]"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] font-semibold leading-tight text-white">
                    {row.title}
                  </p>
                  <p className="mt-0.5 text-[12px] leading-tight text-white">
                    With your tutor · {fmtDate(row.activity_date)}
                  </p>
                </div>
                <span className="shrink-0 text-[15px] font-semibold leading-tight tabular-nums text-white">
                  {(row.duration_minutes / 60).toFixed(1)}
                  <span className="ml-0.5 text-[10px] font-medium text-white">h</span>
                </span>
              </div>
              {/*
                The second route to a signature, and the one most apprentices
                need: no college link means no tutor inbox, so the supervisor
                who watched them do the work signs it instead.
              */}
              <button
                type="button"
                onClick={() => onEmployerLink(row)}
                className="mt-2.5 inline-flex h-11 items-center gap-1.5 rounded-lg border border-white/[0.14] bg-white/[0.05] px-4 text-[13px] font-medium text-white transition-colors touch-manipulation hover:bg-white/[0.09] active:scale-[0.98]"
              >
                <Share2 className="h-3.5 w-3.5" />
                Ask my supervisor to sign it
              </button>
            </li>
          ))}
          {pending.length > 5 && (
            <li className="px-4 py-3 text-[12.5px] font-medium text-white sm:px-5">
              + {pending.length - 5} more waiting
            </li>
          )}
        </ul>
      )}
    </section>
  );
}

function RecentEntries({
  rows,
  loading,
  inAppMinutes,
  collegeMinutes,
  canExport,
  onExportPdf,
  onExportCsv,
}: {
  rows: OtjEntryRow[];
  loading: boolean;
  inAppMinutes: number;
  collegeMinutes: number;
  canExport: boolean;
  onExportPdf: () => void;
  onExportCsv: () => void;
}) {
  void collegeMinutes;
  const recent = rows.slice(0, 12);
  return (
    <section className="space-y-3">
      <SectionHeader
        eyebrow="Recent entries"
        title="Every hour, every source"
        meta={
          inAppMinutes > 0
            ? `Plus ${(inAppMinutes / 60).toFixed(1)}h auto-tracked from in-app activity`
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
            'rounded-2xl border border-elec-yellow/35 p-6 text-center space-y-2',
            CARD_SURFACE
          )}
        >
          <Eyebrow>No college-recorded entries yet</Eyebrow>
          <p className="text-[13px] text-white leading-relaxed">
            In-app activity (videos, study sessions) auto-counts but tutor-verified hours start when
            you tap "Log time".
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
            '-mx-4 divide-y divide-white/[0.10] overflow-hidden border-y border-elec-yellow/35 sm:mx-0 sm:rounded-2xl sm:border-x',
            CARD_SURFACE
          )}
        >
          {recent.map((row) => {
            const rejected = row.verification_status === 'rejected';
            const counts =
              row.verification_status === 'verified' ||
              row.verification_status === 'verified_by_employer';
            return (
              <li key={row.id} className="flex items-start gap-3 px-4 py-3 sm:px-5">
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
                  <p className="mt-0.5 truncate text-[12px] leading-tight text-white">
                    {STATUS_LABEL[row.verification_status]} · {SOURCE_LABEL[row.source_kind]}
                    {row.activity_date ? ` · ${fmtDate(row.activity_date)}` : ''}
                    {row.recorded_by_name_snapshot ? ` · ${row.recorded_by_name_snapshot}` : ''}
                  </p>
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
                  <span className="ml-0.5 text-[10px] font-medium text-white">h</span>
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
