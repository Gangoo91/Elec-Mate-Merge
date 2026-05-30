/**
 * OJTHub — Apprentice Off-the-Job Training workspace
 *
 * Single-page editorial layout. No sidebar.
 *
 * What apprentices struggle with: PROOF. ESFA only counts hours that have
 * a source + a verifier + (ideally) an evidence link. This page makes the
 * proof chain visible:
 *
 *   • In-app auto-tracked          (system-attested — videos, study sessions)
 *   • Apprentice-submitted (pending) → tutor verifies in college hub
 *   • Apprentice-submitted (verified) → counts for gateway
 *   • Tutor-recorded                (pre-verified by college)
 *   • Employer-attested             (signed by supervisor via attestation link)
 *
 * The source-mix bar tells the apprentice at a glance how much of their
 * total is actually defensible vs still pending verification.
 *
 * Sections (top → bottom):
 *   1. Editorial header + Log time CTA
 *   2. KPI strip — week / year / verification rate / on-pace status
 *   3. Source mix — stacked bar by source_kind
 *   4. Compliance forecast — projection vs gateway
 *   5. Verification panel — pending + rejected with one-tap actions
 *   6. Recent entries timeline — every entry shows source + verification chip
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Loader2, Clock, RefreshCw, Share2, Download } from 'lucide-react';
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
import {
  Eyebrow,
  SectionHeader,
} from '@/components/apprentice-hub/portfolio/PortfolioPrimitives';
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

// Weekly target, gateway target and weeks-remaining are no longer hardcoded —
// they come from useOtjProgramme (college dates → self-set → estimate). See
// the `programme` object inside the component.

const SOURCE_LABEL: Record<SourceKind, string> = {
  in_app: 'In-app',
  apprentice_submitted: 'Submitted',
  tutor_recorded: 'Tutor',
  employer_attested: 'Employer',
};

const SOURCE_TONE: Record<SourceKind, string> = {
  in_app: 'bg-elec-yellow/85',
  apprentice_submitted: 'bg-white/55',
  tutor_recorded: 'bg-elec-yellow',
  employer_attested: 'bg-elec-yellow/70',
};

const STATUS_CHIP_TONE: Record<VerificationStatus, string> = {
  verified: 'border-elec-yellow/30 bg-elec-yellow/[0.06] text-elec-yellow',
  verified_by_employer: 'border-elec-yellow/30 bg-elec-yellow/[0.06] text-elec-yellow',
  pending: 'border-white/[0.10] bg-white/[0.04] text-white/85',
  rejected: 'border-red-500/30 bg-red-500/[0.04] text-red-300',
};

const STATUS_LABEL: Record<VerificationStatus, string> = {
  verified: 'Verified',
  verified_by_employer: 'Employer verified',
  pending: 'Pending',
  rejected: 'Refer back',
};

const fmtHours = (hours: number) => {
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
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const { toast } = useToast();

  // Real programme envelope — drives weekly/gateway targets + weeks remaining.
  const programme = useOtjProgramme();
  const weeklyTargetHours = programme.weeklyTargetHours;
  const yearTargetHours = programme.totalTargetHours;
  const weeksRemaining = programme.weeksRemaining;
  const [showProgrammeSetup, setShowProgrammeSetup] = useState(false);

  // Data sources
  const { breakdown, entries: otjEntries, loading: otjLoading, refresh: refreshOtj } =
    useApprenticeOtj(user?.id ?? null, weeklyTargetHours * 60);
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
    breakdown.by_source.learning_activity.minutes +
    breakdown.by_source.study_session.minutes;
  const collegeMinutes = breakdown.by_source.college.minutes;

  // Derive verified vs pending breakdown
  const sourceBreakdown = useMemo(() => {
    // college_otj_entries split by source_kind × verification_status
    const byKind: Record<SourceKind, { verifiedMin: number; pendingMin: number; rejectedMin: number }> = {
      in_app: { verifiedMin: 0, pendingMin: 0, rejectedMin: 0 },
      apprentice_submitted: { verifiedMin: 0, pendingMin: 0, rejectedMin: 0 },
      tutor_recorded: { verifiedMin: 0, pendingMin: 0, rejectedMin: 0 },
      employer_attested: { verifiedMin: 0, pendingMin: 0, rejectedMin: 0 },
    };
    for (const r of verificationRows) {
      const bucket = byKind[r.source_kind];
      if (!bucket) continue;
      if (r.verification_status === 'verified' || r.verification_status === 'verified_by_employer') {
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

    return { byKind, autoTrackedMin };
  }, [verificationRows, inAppMinutes]);

  const totalDefensibleMin =
    sourceBreakdown.autoTrackedMin +
    sourceBreakdown.byKind.apprentice_submitted.verifiedMin +
    sourceBreakdown.byKind.tutor_recorded.verifiedMin +
    sourceBreakdown.byKind.employer_attested.verifiedMin;
  const totalPendingMin =
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
    // In-app auto-tracked (defensible, system-attested)
    for (const e of otjEntries) {
      if (e.source !== 'learning_activity' && e.source !== 'study_session') continue;
      if (e.occurred_at >= sinceWeek) weekMin += e.duration_minutes;
      if (e.occurred_at >= since30) last30Min += e.duration_minutes;
    }
    // Verified college hours only (pending/rejected excluded)
    for (const r of verificationRows) {
      if (
        r.verification_status !== 'verified' &&
        r.verification_status !== 'verified_by_employer'
      )
        continue;
      const at = r.activity_date ? `${r.activity_date}T12:00:00Z` : null;
      if (!at) continue;
      if (at >= sinceWeek) weekMin += r.duration_minutes;
      if (at >= since30) last30Min += r.duration_minutes;
    }
    return { weekHours: weekMin / 60, last30Avg: last30Min / 60 / 4.3 };
  }, [otjEntries, verificationRows]);

  const weekPct =
    weeklyTargetHours > 0
      ? Math.min(Math.round((weekHours / weeklyTargetHours) * 100), 150)
      : 0;
  const onPace = weekHours >= weeklyTargetHours;

  // Forecast: at current verified weekly rate, where will we be at gateway?
  const projectedHours = yearHours + last30Avg * weeksRemaining;
  const projectedShortfall = Math.max(0, yearTargetHours - projectedHours);
  const requiredWeekly =
    projectedShortfall > 0 ? projectedShortfall / weeksRemaining + last30Avg : last30Avg;

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }, []);
  const fullName = profile?.full_name || user?.email?.split('@')[0] || 'Apprentice';
  const firstName =
    fullName.split(' ')[0].charAt(0).toUpperCase() +
    fullName.split(' ')[0].slice(1).toLowerCase();

  /* ─── Employer attestation link ─────────────────────────────────── */
  const handleEmployerLink = async (row: OtjEntryRow) => {
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
  };

  /* ─── Verification actions ─────────────────────────────────────── */
  const editAndResubmit = async (row: OtjEntryRow) => {
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
  };

  /* ─── Export evidence pack ──────────────────────────────────────── */
  const buildExportData = useCallback(async (): Promise<OtjExportData> => {
    const prettify = (t: string) =>
      t.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

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

    const entries = [...collegeEntries, ...inAppEntries].sort((a, b) =>
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
          r.source_kind === 'employer_attested' ||
          r.verification_status === 'verified_by_employer';
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
          const { data: emp } = await supabase
            .from('employers')
            .select('name')
            .eq('id', cs.employer_id)
            .maybeSingle();
          employer = (emp?.name as string | null) ?? null;
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

  const canExport = verificationRows.length > 0 || yearHours > 0;

  /* ─── Render ──────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      {/* Editorial header — sticky */}
      <header className="sticky top-0 z-40 bg-[hsl(0_0%_8%)]/92 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => navigate('/apprentice')}
            className="inline-flex items-center justify-center gap-2 text-[11px] sm:text-[12px] uppercase tracking-[0.18em] text-white/55 hover:text-white/85 transition-colors h-11 px-2 -ml-1 touch-manipulation flex-shrink-0"
            aria-label="Back to apprentice hub"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden md:inline">Apprentice hub</span>
          </button>
          <div className="hidden md:block h-5 w-px bg-white/10 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 truncate inline-block max-w-full">
              <span className="hidden sm:inline">Off-the-job training</span>
              <span className="sm:hidden">Off-the-job training</span>
            </span>
          </div>
          <button
            onClick={() => setShowLogSheet(true)}
            className="inline-flex items-center justify-center gap-1.5 h-10 px-3 sm:px-4 rounded-md bg-elec-yellow text-black text-[12.5px] font-semibold hover:bg-elec-yellow/90 active:scale-[0.97] transition-all touch-manipulation flex-shrink-0"
          >
            <Plus className="h-4 w-4" strokeWidth={2.5} />
            <span className="hidden sm:inline">Log time</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-7 lg:py-9 space-y-6 sm:space-y-7 lg:space-y-10">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18 }}
          className="space-y-2"
        >
          <Eyebrow>{greeting}</Eyebrow>
          <h1 className="text-[24px] sm:text-[28px] lg:text-[32px] font-semibold tracking-tight text-white leading-[1.05]">
            {firstName}'s off-the-job hours
          </h1>
          <p className="text-[13.5px] sm:text-[14px] text-white/70 leading-relaxed max-w-2xl">
            Every hour with a clear source &amp; verifier — the proof chain checked at
            gateway. Log it here and your tutor or supervisor signs it off.
          </p>
        </motion.div>

        {/* KPI strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          <KpiCell
            label="This week"
            value={`${fmtHours(weekHours)}h`}
            sub={`${weekPct}% of ${fmtHours(weeklyTargetHours)}h/wk suggested pace`}
            highlight={onPace}
            bar={Math.min(weekPct, 100)}
          />
          <KpiCell
            label="Counts to gateway"
            value={`${fmtHours(yearHours)}h`}
            sub={
              otjComplete
                ? `Complete · all ${yearTargetHours}h banked`
                : yearPendingHours > 0
                  ? `${yearPct}% of ${yearTargetHours}h · ${fmtHours(yearPendingHours)}h pending`
                  : `${yearPct}% of ${yearTargetHours}h total`
            }
            highlight={yearPct >= 50}
            bar={Math.min(yearPct, 100)}
          />
          <KpiCell
            label="Verification"
            value={`${verificationRate}%`}
            sub={
              totalAllMin === 0
                ? 'No college-recorded hours yet'
                : verificationRate >= 90
                  ? 'Strongly defensible'
                  : verificationRate >= 60
                    ? 'Mostly verified'
                    : 'Lots still pending'
            }
            highlight={verificationRate >= 90}
            bar={verificationRate}
          />
          <KpiCell
            label="Pending sign-off"
            value={pending_apprentice.length}
            sub={
              pending_apprentice.length === 0
                ? 'Nothing waiting'
                : 'With your tutor'
            }
            warn={pending_apprentice.length > 5}
          />
        </div>

        {/* Source mix bar */}
        <SourceMixBar
          autoTrackedMin={sourceBreakdown.autoTrackedMin}
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

        {/* Goals — personal OTJ targets (migrated from legacy /apprentice/ojt) */}
        <OjtGoalsSection />

        {/* Assessments — deadline tracking (migrated from legacy /apprentice/ojt) */}
        <OjtAssessmentsSection />
      </main>

      {/* Unified log sheet — photos + AI proposal, writes college_otj_entries.
          Same component the portfolio hub uses, so there's one log path. */}
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
      />
    </div>
  );
}

/* ────────────────────────── Sub-components ────────────────────────── */

function KpiCell({
  label,
  value,
  sub,
  highlight,
  warn,
  bar,
}: {
  label: string;
  value: string | number;
  sub?: string;
  highlight?: boolean;
  warn?: boolean;
  bar?: number;
}) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-3.5 sm:p-5 space-y-1.5 sm:space-y-2">
      <Eyebrow className="text-[9.5px] sm:text-[10px]">{label}</Eyebrow>
      <div
        className={cn(
          'text-[22px] sm:text-[26px] lg:text-[28px] font-semibold tracking-tight tabular-nums leading-none',
          highlight ? 'text-elec-yellow' : warn ? 'text-red-300' : 'text-white'
        )}
      >
        {value}
      </div>
      {bar !== undefined && (
        <div className="h-1 w-full bg-white/[0.04] rounded-full overflow-hidden">
          <div
            className={cn(
              'h-full rounded-full transition-all duration-700',
              highlight ? 'bg-elec-yellow' : warn ? 'bg-red-400/70' : 'bg-white/55'
            )}
            style={{ width: `${Math.min(bar, 100)}%` }}
          />
        </div>
      )}
      {sub && (
        <span className="text-[10.5px] sm:text-[11px] text-white/55 block leading-snug">
          {sub}
        </span>
      )}
    </div>
  );
}

function SourceMixBar({
  autoTrackedMin,
  byKind,
  totalAllMin,
}: {
  autoTrackedMin: number;
  byKind: Record<SourceKind, { verifiedMin: number; pendingMin: number; rejectedMin: number }>;
  totalAllMin: number;
}) {
  // Build segments — 5 stacked
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
      label: 'Pending sign-off',
      minutes:
        byKind.in_app.pendingMin +
        byKind.apprentice_submitted.pendingMin +
        byKind.tutor_recorded.pendingMin +
        byKind.employer_attested.pendingMin,
      tone: 'bg-white/35',
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
      <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-3">
        {total === 0 ? (
          <p className="text-[13px] text-white/55 leading-relaxed">
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
                  <li
                    key={s.label}
                    className="flex items-center gap-2 text-[12px] text-white/85"
                  >
                    <span className={cn('h-2 w-2 rounded-sm flex-shrink-0', s.tone)} />
                    <span className="flex-1 truncate">{s.label}</span>
                    <span className="text-white/85 tabular-nums">
                      {(s.minutes / 60).toFixed(1)}h
                    </span>
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
        <div className="rounded-xl border border-elec-yellow/30 bg-elec-yellow/[0.06] p-4 sm:p-5 space-y-3">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-[26px] sm:text-[30px] lg:text-[32px] font-semibold text-elec-yellow tracking-tight tabular-nums leading-none">
              {fmtHours(yearHours)}h
            </span>
            <span className="text-[12px] sm:text-[13px] text-white/40">
              / {yearTarget}h ✓
            </span>
          </div>
          <p className="text-[13px] text-white/85 leading-relaxed">
            You've banked your full off-the-job requirement. You don't need to keep logging
            hours — front-loading like this is fine. Your apprenticeship still runs to gateway
            and end-point assessment; keep the evidence safe for your records.
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
            ? "On pace to finish your hours"
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
                'inline-flex items-center gap-1.5 h-9 px-3 rounded-md text-[12px] font-semibold transition-colors touch-manipulation',
                isEstimate
                  ? 'bg-elec-yellow text-black hover:bg-elec-yellow/90'
                  : 'border border-white/[0.08] bg-white/[0.02] text-white/85 hover:bg-white/[0.04]'
              )}
            >
              {isEstimate ? 'Set your dates' : 'Edit dates'}
            </button>
          )
        }
      />
      <div
        className={cn(
          'rounded-xl border p-4 sm:p-5 space-y-3.5',
          onTrack
            ? 'border-elec-yellow/25 bg-elec-yellow/[0.04]'
            : 'border-red-500/25 bg-red-500/[0.04]'
        )}
      >
        <div className="flex items-end justify-between gap-3">
          <div className="space-y-1 min-w-0">
            <Eyebrow>Projected at gateway</Eyebrow>
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span
                className={cn(
                  'text-[26px] sm:text-[30px] lg:text-[32px] font-semibold tracking-tight tabular-nums leading-none',
                  onTrack ? 'text-elec-yellow' : 'text-red-300'
                )}
              >
                {fmtHours(projectedHours)}h
              </span>
              <span className="text-[12px] sm:text-[13px] text-white/40">
                / {yearTarget}h
              </span>
            </div>
          </div>
          <div className="text-right space-y-1 flex-shrink-0">
            <Eyebrow>Pace</Eyebrow>
            <span className="text-[14px] sm:text-[16px] text-white tabular-nums whitespace-nowrap block">
              {last30Avg.toFixed(1)}h/wk
            </span>
          </div>
        </div>
        <p className="text-[13px] text-white/85 leading-relaxed">
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
              You're at{' '}
              <span className="text-white whitespace-nowrap">{fmtHours(yearHours)}h</span>.
              To bank your {yearTarget}h, aim for around{' '}
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
  return (
    <section className="space-y-3">
      <SectionHeader
        eyebrow="Verification"
        title={
          rejected.length > 0
            ? `${rejected.length} entr${rejected.length === 1 ? 'y' : 'ies'} need editing`
            : `${pending.length} pending tutor sign-off`
        }
        meta="Hours land in your tutor's college inbox the moment you submit"
      />
      {rejected.length > 0 && (
        <ul className="space-y-2">
          {rejected.map((row) => (
            <li
              key={row.id}
              className="rounded-xl border border-red-500/30 bg-red-500/[0.04] p-4 sm:p-5 space-y-2"
            >
              <div className="flex items-baseline justify-between gap-3 flex-wrap">
                <div className="min-w-0 space-y-1">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <Eyebrow className="text-red-300">Refer back</Eyebrow>
                    <span className="text-[11px] text-white/55">
                      {fmtDate(row.activity_date)}
                    </span>
                    <span className="text-[11px] text-white/55">
                      · {(row.duration_minutes / 60).toFixed(1)}h
                    </span>
                  </div>
                  <p className="text-[14px] font-medium text-white leading-snug">{row.title}</p>
                </div>
                <button
                  onClick={() => onResubmit(row)}
                  className="inline-flex items-center gap-1.5 h-8 px-3 rounded-md bg-elec-yellow text-black text-[11.5px] font-semibold hover:bg-elec-yellow/90 transition-colors touch-manipulation"
                >
                  <RefreshCw className="h-3 w-3" />
                  Resubmit
                </button>
              </div>
              {row.verification_rationale && (
                <p className="text-[12px] text-white/70 leading-relaxed italic pl-1 border-l-2 border-red-500/40 ml-1">
                  {row.verification_rationale}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
      {pending.length > 0 && (
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-2">
          <div className="flex items-baseline justify-between gap-3">
            <Eyebrow>Pending</Eyebrow>
            <span className="text-[11px] text-white/55 tabular-nums whitespace-nowrap">
              {(pending.reduce((s, r) => s + r.duration_minutes, 0) / 60).toFixed(1)}h waiting
            </span>
          </div>
          <ul className="divide-y divide-white/[0.04]">
            {pending.slice(0, 5).map((row) => (
              <li key={row.id} className="py-2.5 space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1 flex items-start gap-2">
                    <Clock className="h-3.5 w-3.5 text-white/40 flex-shrink-0 mt-0.5" />
                    <div className="min-w-0 flex-1 space-y-0.5">
                      <span className="text-[10.5px] text-white/55 block">
                        {fmtDate(row.activity_date)}
                      </span>
                      <span className="text-[13px] text-white block leading-snug break-words">
                        {row.title}
                      </span>
                    </div>
                  </div>
                  <span className="text-[12px] text-white/85 tabular-nums flex-shrink-0 whitespace-nowrap pt-0.5">
                    {(row.duration_minutes / 60).toFixed(1)}h
                  </span>
                </div>
                <div className="pl-5">
                  <button
                    type="button"
                    onClick={() => onEmployerLink(row)}
                    className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-md border border-white/[0.10] bg-white/[0.02] text-white/85 text-[11px] font-medium hover:bg-white/[0.04] transition-colors touch-manipulation"
                    title="Get a link your supervisor can use to attest these hours"
                  >
                    <Share2 className="h-3 w-3" />
                    <span className="hidden sm:inline">Get supervisor attestation link</span>
                    <span className="sm:hidden">Send to supervisor</span>
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {pending.length > 5 && (
            <p className="text-[11px] text-white/40">
              + {pending.length - 5} more
            </p>
          )}
        </div>
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
                className="inline-flex items-center gap-1.5 h-9 px-3 rounded-md bg-elec-yellow text-black text-[12px] font-semibold hover:bg-elec-yellow/90 active:scale-[0.97] transition-all touch-manipulation"
              >
                <Download className="h-3.5 w-3.5" strokeWidth={2.5} />
                Evidence pack
              </button>
              <button
                type="button"
                onClick={onExportCsv}
                className="inline-flex items-center gap-1.5 h-9 px-3 rounded-md border border-white/[0.08] bg-white/[0.02] text-white/85 text-[12px] font-semibold hover:bg-white/[0.04] transition-colors touch-manipulation"
              >
                CSV
              </button>
            </div>
          ) : undefined
        }
      />
      {loading ? (
        <div className="flex items-center gap-3 py-6">
          <Loader2 className="h-4 w-4 animate-spin text-white/55" />
          <Eyebrow>Loading…</Eyebrow>
        </div>
      ) : recent.length === 0 ? (
        <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-6 text-center space-y-2">
          <Eyebrow>No college-recorded entries yet</Eyebrow>
          <p className="text-[13px] text-white/85 leading-relaxed">
            In-app activity (videos, study sessions) auto-counts but tutor-verified
            hours start when you tap "Log time".
          </p>
        </div>
      ) : (
        <ul className="space-y-2">
          {recent.map((row) => (
            <li
              key={row.id}
              className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] px-3.5 py-3 sm:px-5 sm:py-4"
            >
              {/* Mobile: stacked layout. Desktop (sm+): inline columns. */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={cn(
                        'text-[9.5px] font-medium uppercase tracking-[0.14em] px-1.5 py-[1px] rounded-md border whitespace-nowrap',
                        STATUS_CHIP_TONE[row.verification_status]
                      )}
                    >
                      {STATUS_LABEL[row.verification_status]}
                    </span>
                    <span className="text-[9.5px] uppercase tracking-[0.14em] text-white/55 whitespace-nowrap">
                      {SOURCE_LABEL[row.source_kind]}
                    </span>
                    <span className="text-[10px] text-white/40 whitespace-nowrap">
                      {fmtDate(row.activity_date)}
                    </span>
                    {row.recorded_by_name_snapshot && (
                      <span className="text-[10px] text-white/40 truncate max-w-[110px] sm:max-w-none">
                        · {row.recorded_by_name_snapshot}
                      </span>
                    )}
                  </div>
                  <p className="text-[13px] font-medium text-white leading-snug break-words">
                    {row.title}
                  </p>
                  {row.verification_rationale &&
                    row.verification_status === 'rejected' && (
                      <p className="text-[12px] text-red-300/85 italic leading-snug">
                        {row.verification_rationale}
                      </p>
                    )}
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-[15px] sm:text-[16px] font-semibold text-white tabular-nums leading-none">
                    {(row.duration_minutes / 60).toFixed(1)}
                  </span>
                  <span className="text-[10px] text-white/40 ml-0.5">h</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

// SOURCE_TONE is retained for parity with the source-kind palette though not
// currently rendered.
void SOURCE_TONE;
