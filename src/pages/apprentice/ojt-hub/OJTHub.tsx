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

import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Plus,
  Loader2,
  Send,
  AlertTriangle,
  CheckCircle2,
  Clock,
  RefreshCw,
  Mic,
  MicOff,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Link2, Share2 } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useApprenticeOtj } from '@/hooks/useApprenticeOtj';
import {
  useStudentOtjVerification,
  type OtjEntryRow,
  type SourceKind,
  type VerificationStatus,
} from '@/hooks/useStudentOtjVerification';
import { useSpeechToText } from '@/hooks/useSpeechToText';
import { cn } from '@/lib/utils';
import {
  Eyebrow,
  SectionHeader,
} from '@/components/apprentice-hub/portfolio/PortfolioPrimitives';

const ACTIVITY_TYPES = [
  { value: 'workshop', label: 'Workshop training' },
  { value: 'college', label: 'College session' },
  { value: 'online', label: 'Online learning' },
  { value: 'practical', label: 'Practical assessment' },
  { value: 'study', label: 'Self study' },
  { value: 'site-visit', label: 'Site visit / tour' },
  { value: 'mentoring', label: 'Mentoring session' },
  { value: 'safety', label: 'Safety training' },
];

const WEEKLY_TARGET_HOURS = 7.5;
const YEAR_TARGET_HOURS = 400;
// Programme weeks remaining estimator — apprenticeship duration roughly 50 weeks/yr
const PROGRAMME_WEEKS_REMAINING = 30;

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

  // Data sources
  const { breakdown, loading: otjLoading, refresh: refreshOtj } = useApprenticeOtj(
    user?.id ?? null,
    WEEKLY_TARGET_HOURS * 60
  );
  const {
    rows: verificationRows,
    pending_apprentice,
    rejected_apprentice,
    stats: verifyStats,
    loading: verifyLoading,
    refresh: refreshVerify,
  } = useStudentOtjVerification(user?.id ?? null);

  // Quick Log sheet state
  const [showQuickLog, setShowQuickLog] = useState(false);
  const [quickLogData, setQuickLogData] = useState({
    activity_type: 'practical',
    title: '',
    description: '',
    duration: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [submitting, setSubmitting] = useState(false);
  const [aiStructuring, setAiStructuring] = useState(false);

  // Speech-to-text for the description
  const {
    isSupported: speechSupported,
    isListening,
    transcript: speechTranscript,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechToText({ continuous: true });

  useEffect(() => {
    if (!speechTranscript) return;
    setQuickLogData((prev) => {
      if (!speechTranscript || speechTranscript === prev.description) return prev;
      return { ...prev, description: speechTranscript };
    });
  }, [speechTranscript]);

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
    // system-verified hours that don't appear in college_otj_entries
    const autoTrackedMin = inAppMinutes;

    return { byKind, autoTrackedMin };
  }, [verificationRows, inAppMinutes]);

  const totalDefensibleMin =
    sourceBreakdown.autoTrackedMin +
    sourceBreakdown.byKind.in_app.verifiedMin +
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

  const yearHours = breakdown.total_hours;
  const yearPct = Math.round((yearHours / YEAR_TARGET_HOURS) * 100);
  const weekHours = breakdown.this_week_minutes / 60;
  const weekPct = Math.min(
    Math.round((breakdown.this_week_minutes / breakdown.weekly_target_minutes) * 100),
    150
  );
  const onPace = weekHours >= WEEKLY_TARGET_HOURS;

  // Forecast: at current weekly rate, where will we be at gateway?
  const last30Avg =
    breakdown.last_30_days_minutes > 0 ? breakdown.last_30_days_minutes / 60 / 4.3 : weekHours;
  const projectedHours = yearHours + last30Avg * PROGRAMME_WEEKS_REMAINING;
  const projectedShortfall = Math.max(0, YEAR_TARGET_HOURS - projectedHours);
  const requiredWeekly =
    projectedShortfall > 0 ? projectedShortfall / PROGRAMME_WEEKS_REMAINING + last30Avg : last30Avg;

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

  /* ─── AI structure voice transcript ────────────────────────────── */
  const handleAiStructure = async () => {
    const text = quickLogData.description.trim();
    if (text.length < 5) {
      toast({
        title: 'Speak or type a description first',
        description: 'AI needs a few words to structure the entry.',
        variant: 'destructive',
      });
      return;
    }
    setAiStructuring(true);
    try {
      const { data, error } = await supabase.functions.invoke('ojt-parse-voice', {
        body: {
          transcript: text,
          default_date: quickLogData.date,
        },
      });
      if (error) throw error;
      const parsed = data as {
        success?: boolean;
        title?: string;
        description?: string;
        activity_type?: string;
        duration_minutes?: number;
        unit_codes?: string[];
        error?: string;
      };
      if (!parsed.success) throw new Error(parsed.error || 'AI structuring failed');
      setQuickLogData((prev) => ({
        ...prev,
        title: parsed.title || prev.title,
        description: parsed.description || prev.description,
        activity_type: parsed.activity_type || prev.activity_type,
        duration:
          parsed.duration_minutes && parsed.duration_minutes > 0
            ? (parsed.duration_minutes / 60).toString()
            : prev.duration,
      }));
      toast({
        title: 'Structured by AI',
        description:
          parsed.unit_codes && parsed.unit_codes.length
            ? `Picked up unit codes: ${parsed.unit_codes.join(', ')}`
            : 'Title, type and duration filled — review and submit.',
      });
    } catch (err) {
      toast({
        title: 'AI structuring failed',
        description: (err as Error).message,
        variant: 'destructive',
      });
    } finally {
      setAiStructuring(false);
    }
  };

  /* ─── Quick Log submit ─────────────────────────────────────────── */
  const resetQuickLog = () => {
    setQuickLogData({
      activity_type: 'practical',
      title: '',
      description: '',
      duration: '',
      date: new Date().toISOString().split('T')[0],
    });
    resetTranscript();
    stopListening();
  };

  const handleSubmitQuickLog = async () => {
    if (!user?.id) return;
    if (!quickLogData.title.trim() && !quickLogData.description.trim()) {
      toast({
        title: 'Add some detail',
        description: 'Set a title or describe what you did.',
        variant: 'destructive',
      });
      return;
    }
    const minutes = Math.round(parseFloat(quickLogData.duration || '0') * 60);
    if (!minutes || minutes <= 0) {
      toast({
        title: 'Add a duration',
        description: 'Tell us roughly how long you spent.',
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(true);
    try {
      // college_students.id is the FK target
      const { data: cs } = await supabase
        .from('college_students')
        .select('id, college_id')
        .eq('user_id', user.id)
        .maybeSingle();

      const row: Record<string, unknown> = {
        student_id: user.id,
        activity_date: quickLogData.date,
        activity_type: quickLogData.activity_type,
        title: quickLogData.title.trim() || quickLogData.description.trim().slice(0, 80),
        description: quickLogData.description.trim() || null,
        duration_minutes: minutes,
        source_kind: 'apprentice_submitted' as SourceKind,
        verification_status: 'pending' as VerificationStatus,
      };
      const csRow = cs as { id: string; college_id: string } | null;
      if (csRow) {
        row.college_student_id = csRow.id;
        row.college_id = csRow.college_id;
      }

      const { error } = await supabase.from('college_otj_entries').insert(row);
      if (error) throw error;

      toast({
        title: 'Submitted to your tutor',
        description: 'Hours land in your tutor inbox for sign-off.',
      });
      resetQuickLog();
      setShowQuickLog(false);
      await Promise.all([refreshOtj(), refreshVerify()]);
    } catch (err) {
      toast({
        title: 'Could not submit',
        description: (err as Error).message,
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

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
              <span className="hidden sm:inline">Off-the-job training · 20% rule</span>
              <span className="sm:hidden">OJT · 20% rule</span>
            </span>
          </div>
          <button
            onClick={() => setShowQuickLog(true)}
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
            {firstName}'s 20% off-the-job hours
          </h1>
          <p className="text-[13.5px] sm:text-[14px] text-white/70 leading-relaxed max-w-2xl">
            Every hour with a clear source &amp; verifier — the chain ESFA + Ofsted
            check at gateway. Hours flow straight to your tutor for sign-off.
          </p>
        </motion.div>

        {/* KPI strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          <KpiCell
            label="This week"
            value={`${fmtHours(weekHours)}h`}
            sub={`${weekPct}% of ${WEEKLY_TARGET_HOURS}h target`}
            highlight={onPace}
            bar={Math.min(weekPct, 100)}
          />
          <KpiCell
            label="Year total"
            value={`${fmtHours(yearHours)}h`}
            sub={`${yearPct}% of ${YEAR_TARGET_HOURS}h gateway target`}
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

        {/* Compliance forecast */}
        <ComplianceForecast
          yearHours={yearHours}
          projectedHours={projectedHours}
          projectedShortfall={projectedShortfall}
          requiredWeekly={requiredWeekly}
          weeksRemaining={PROGRAMME_WEEKS_REMAINING}
          last30Avg={last30Avg}
        />

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
        />
      </main>

      {/* Quick Log Sheet */}
      <Sheet
        open={showQuickLog}
        onOpenChange={(v) => {
          setShowQuickLog(v);
          if (!v) resetQuickLog();
        }}
      >
        <SheetContent
          side="bottom"
          className="h-[90vh] sm:h-[80vh] rounded-t-3xl bg-[hsl(0_0%_8%)] border-white/[0.06] p-0"
        >
          <div className="w-12 h-1 bg-white/15 rounded-full mx-auto mt-3 mb-2" />
          <div className="flex flex-col h-full">
            <SheetHeader className="px-4 sm:px-6 pb-4">
              <SheetTitle className="text-left">
                <Eyebrow>Log time · OJT</Eyebrow>
                <h2 className="text-[20px] sm:text-[24px] font-semibold tracking-tight text-white mt-1">
                  Submit hours for tutor sign-off
                </h2>
              </SheetTitle>
              <SheetDescription className="text-left text-[13px] text-white/70 leading-snug">
                Goes to your tutor as <code className="font-mono text-elec-yellow/85">apprentice_submitted</code>.
                They verify in their college dashboard; you'll see a toast the
                moment it's signed off.
              </SheetDescription>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-32 space-y-4">
              <div className="space-y-2">
                <Eyebrow>Activity type</Eyebrow>
                <Select
                  value={quickLogData.activity_type}
                  onValueChange={(v) =>
                    setQuickLogData((p) => ({ ...p, activity_type: v }))
                  }
                >
                  <SelectTrigger className="h-11 touch-manipulation bg-[hsl(0_0%_10%)] border-white/[0.08]">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {ACTIVITY_TYPES.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Eyebrow>Title</Eyebrow>
                <Input
                  placeholder="e.g. Safe isolation refresher"
                  value={quickLogData.title}
                  onChange={(e) =>
                    setQuickLogData((p) => ({ ...p, title: e.target.value }))
                  }
                  className="h-11 touch-manipulation bg-[hsl(0_0%_10%)] border-white/[0.08] text-[13px] text-white placeholder:text-white/40 focus:border-elec-yellow/40 focus:ring-1 focus:ring-elec-yellow/20"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-baseline justify-between gap-2">
                  <Eyebrow>Description</Eyebrow>
                  <div className="flex items-center gap-1.5">
                    {speechSupported && (
                      <button
                        type="button"
                        onClick={isListening ? stopListening : startListening}
                        disabled={submitting}
                        className={cn(
                          'inline-flex items-center gap-1.5 h-7 px-2 rounded-md text-[11px] font-medium border transition-colors touch-manipulation',
                          isListening
                            ? 'border-red-500/40 bg-red-500/[0.06] text-red-300'
                            : 'border-white/[0.08] bg-white/[0.02] text-white/85 hover:bg-white/[0.04]'
                        )}
                      >
                        {isListening ? (
                          <>
                            <MicOff className="h-3 w-3" />
                            Stop
                          </>
                        ) : (
                          <>
                            <Mic className="h-3 w-3" />
                            Voice
                          </>
                        )}
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={handleAiStructure}
                      disabled={aiStructuring || submitting}
                      className="inline-flex items-center gap-1.5 h-7 px-2 rounded-md text-[11px] font-medium border border-elec-yellow/30 bg-elec-yellow/[0.06] text-elec-yellow hover:bg-elec-yellow/[0.12] transition-colors touch-manipulation disabled:opacity-50"
                    >
                      {aiStructuring ? (
                        <>
                          <Loader2 className="h-3 w-3 animate-spin" />
                          Structuring…
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-3 w-3" />
                          AI structure
                        </>
                      )}
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <Textarea
                    value={quickLogData.description}
                    onChange={(e) =>
                      setQuickLogData((p) => ({ ...p, description: e.target.value }))
                    }
                    placeholder="What did you do? Be specific — testing, safe isolation, units covered. Or tap Voice and just speak."
                    rows={4}
                    className={cn(
                      'touch-manipulation bg-[hsl(0_0%_10%)] text-[13px] text-white placeholder:text-white/40 focus:border-elec-yellow/40 focus:ring-1 focus:ring-elec-yellow/20 transition-colors',
                      isListening
                        ? 'border-red-400/60 ring-1 ring-red-400/30'
                        : 'border-white/[0.08]'
                    )}
                  />
                  {isListening && (
                    <div className="absolute top-2.5 right-2.5 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-red-500/[0.12] border border-red-500/30">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-red-400/60 animate-ping" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-400" />
                      </span>
                      <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-red-300">
                        Listening
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="space-y-2">
                  <Eyebrow>Duration (hours)</Eyebrow>
                  <Input
                    type="number"
                    step="0.5"
                    min="0.5"
                    inputMode="decimal"
                    placeholder="e.g. 2.5"
                    value={quickLogData.duration}
                    onChange={(e) =>
                      setQuickLogData((p) => ({ ...p, duration: e.target.value }))
                    }
                    className="h-11 touch-manipulation bg-[hsl(0_0%_10%)] border-white/[0.08] text-[13px] text-white placeholder:text-white/40 focus:border-elec-yellow/40 focus:ring-1 focus:ring-elec-yellow/20"
                  />
                </div>
                <div className="space-y-2">
                  <Eyebrow>Date</Eyebrow>
                  <Input
                    type="date"
                    value={quickLogData.date}
                    onChange={(e) =>
                      setQuickLogData((p) => ({ ...p, date: e.target.value }))
                    }
                    className="h-11 touch-manipulation bg-[hsl(0_0%_10%)] border-white/[0.08] text-[13px] text-white"
                  />
                </div>
              </div>
            </div>

            <div className="px-4 sm:px-6 py-3 border-t border-white/[0.06] bg-[hsl(0_0%_8%)] pb-20 sm:pb-3">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowQuickLog(false)}
                  className="h-12 rounded-xl border border-white/[0.08] bg-[hsl(0_0%_10%)] text-white text-[13px] font-semibold hover:bg-white/[0.04]"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitQuickLog}
                  disabled={submitting}
                  className="h-12 rounded-xl bg-elec-yellow text-black font-semibold text-[14px] hover:bg-elec-yellow/90 disabled:opacity-50 inline-flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting…
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send for sign-off
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
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
          'text-[22px] sm:text-[26px] lg:text-[28px] font-mono font-semibold tabular-nums leading-none',
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
      minutes: autoTrackedMin + byKind.in_app.verifiedMin,
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
        meta="Defensibility at a glance — yellow = ESFA-defensible, grey = pending"
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
                    <span className="font-mono text-white/85 tabular-nums">
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
  projectedHours,
  projectedShortfall,
  requiredWeekly,
  weeksRemaining,
  last30Avg,
}: {
  yearHours: number;
  projectedHours: number;
  projectedShortfall: number;
  requiredWeekly: number;
  weeksRemaining: number;
  last30Avg: number;
}) {
  const onTrack = projectedShortfall === 0;
  return (
    <section className="space-y-3">
      <SectionHeader
        eyebrow="Compliance forecast"
        title={
          onTrack
            ? "On pace to clear gateway"
            : `Projecting ${fmtHours(projectedShortfall)}h short`
        }
        meta={`Based on the last 30 days · ${weeksRemaining} weeks to go · ${YEAR_TARGET_HOURS}h target`}
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
                  'text-[26px] sm:text-[30px] lg:text-[32px] font-mono font-semibold tabular-nums leading-none',
                  onTrack ? 'text-elec-yellow' : 'text-red-300'
                )}
              >
                {fmtHours(projectedHours)}h
              </span>
              <span className="text-[12px] sm:text-[13px] text-white/40 font-mono">
                / {YEAR_TARGET_HOURS}h
              </span>
            </div>
          </div>
          <div className="text-right space-y-1 flex-shrink-0">
            <Eyebrow>Pace</Eyebrow>
            <span className="text-[14px] sm:text-[16px] font-mono text-white tabular-nums whitespace-nowrap block">
              {last30Avg.toFixed(1)}h/wk
            </span>
          </div>
        </div>
        <p className="text-[13px] text-white/85 leading-relaxed">
          {onTrack ? (
            <>
              Maintain your current rate and you'll have{' '}
              <span className="font-mono text-elec-yellow whitespace-nowrap">
                {fmtHours(projectedHours - YEAR_TARGET_HOURS)}h
              </span>{' '}
              of headroom by gateway. Keep the cadence — auditors love consistent weekly logs.
            </>
          ) : (
            <>
              You're sitting at{' '}
              <span className="font-mono text-white whitespace-nowrap">{fmtHours(yearHours)}h</span>.
              To clear the {YEAR_TARGET_HOURS}h gateway, lift to{' '}
              <span className="font-mono text-elec-yellow whitespace-nowrap">
                ~{requiredWeekly.toFixed(1)}h/week
              </span>{' '}
              for the remaining {weeksRemaining} weeks. Submit hours weekly and chase tutor sign-off.
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
                    <span className="text-[11px] font-mono text-white/55">
                      {fmtDate(row.activity_date)}
                    </span>
                    <span className="text-[11px] font-mono text-white/55">
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
            <span className="text-[11px] font-mono text-white/55 tabular-nums whitespace-nowrap">
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
                      <span className="text-[10.5px] font-mono text-white/55 block">
                        {fmtDate(row.activity_date)}
                      </span>
                      <span className="text-[13px] text-white block leading-snug break-words">
                        {row.title}
                      </span>
                    </div>
                  </div>
                  <span className="text-[12px] font-mono text-white/85 tabular-nums flex-shrink-0 whitespace-nowrap pt-0.5">
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
            <p className="text-[11px] text-white/40 font-mono">
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
}: {
  rows: OtjEntryRow[];
  loading: boolean;
  inAppMinutes: number;
  collegeMinutes: number;
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
                    <span className="text-[10px] font-mono text-white/40 whitespace-nowrap">
                      {fmtDate(row.activity_date)}
                    </span>
                    {row.recorded_by_name_snapshot && (
                      <span className="text-[10px] text-white/40 font-mono truncate max-w-[110px] sm:max-w-none">
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
                  <span className="text-[15px] sm:text-[16px] font-mono font-semibold text-white tabular-nums leading-none">
                    {(row.duration_minutes / 60).toFixed(1)}
                  </span>
                  <span className="text-[10px] text-white/40 font-mono ml-0.5">h</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

// Ensure unused-but-imported icons don't trip the linter
void AlertTriangle;
void CheckCircle2;
void X;
void Link2;
void SOURCE_TONE;
