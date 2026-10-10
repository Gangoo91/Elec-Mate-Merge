import { useCallback, useEffect, useMemo, useState } from 'react';
import { ChevronRight, PenLine } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LC_CARD, lcChip, type ChipTone } from '@/components/apprentice-hub/college-hub/learnerUi';
import { useOtjSummary } from '@/hooks/useOtjSummary';
import { supabase } from '@/integrations/supabase/client';
import { realtimeChannelName } from '@/lib/realtimeChannel';
import { useToast } from '@/hooks/use-toast';
import { SubmitWorkOtjSheet } from './SubmitWorkOtjSheet';
import { textareaCn } from '@/components/forms/fieldStyles';
import { OTJ_ACTIVITY_LABEL } from '@/data/otjActivityTypes';
import { UsesAi } from '@/components/college/ui/UsesAi';

interface AiPrefill {
  title: string;
  description: string;
  activity_type: string;
  duration_minutes: number;
  unit_codes: string[];
}

/* ==========================================================================
   MyOtjSubmitCard — apprentice-side. Shows ESFA-defensible hours total
   (verified by tutor / employer) versus pending hours + a list of recent
   submissions with their verification state, and the CTA to submit a new
   work-based OTJ activity.

   Distinguishes the four source_kind values so the apprentice understands
   why some hours don't yet count toward their ESFA total.

   8 Oct 2026: the headline is now a sentence built from get_otj_summary, the
   one hours figure the tutor sees (verified plus measured app learning). The
   three tiles it replaced counted this card's own rows, and "Last 7 days"
   mixed verified, waiting and returned hours into one number.
   ========================================================================== */

type VerificationStatus = 'pending' | 'verified' | 'rejected' | 'verified_by_employer';
type SourceKind = 'in_app' | 'apprentice_submitted' | 'tutor_recorded' | 'employer_attested';

interface OtjRow {
  id: string;
  activity_date: string;
  activity_type: string;
  title: string;
  duration_minutes: number;
  source_kind: SourceKind;
  verification_status: VerificationStatus;
  verification_rationale: string | null;
  verified_at: string | null;
  recorded_by_name_snapshot: string | null;
  created_at: string | null;
}

const STATUS_LABEL: Record<VerificationStatus, string> = {
  pending: 'Awaiting sign-off',
  verified: 'Verified',
  rejected: 'Returned',
  verified_by_employer: 'Employer verified',
};

const STATUS_TONE: Record<VerificationStatus, ChipTone> = {
  pending: 'neutral',
  verified: 'done',
  rejected: 'action',
  verified_by_employer: 'done',
};

const ACTIVITY_LABEL: Record<string, string> = OTJ_ACTIVITY_LABEL;

function fmtHours(min: number): string {
  if (!Number.isFinite(min) || min <= 0) return '0h';
  if (min < 60) return `${Math.round(min)}m`;
  const h = min / 60;
  return h >= 10 ? `${Math.round(h).toLocaleString('en-GB')}h` : `${h.toFixed(1)}h`;
}

function fmtRel(iso: string | null): string {
  if (!iso) return '';
  const t = new Date(iso).getTime();
  const days = Math.round((Date.now() - t) / 86_400_000);
  if (days === 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.round(days / 7)}w ago`;
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

export function MyOtjSubmitCard() {
  const { toast } = useToast();
  const [rows, setRows] = useState<OtjRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // Write-up-with-AI flow state. The apprentice types a one-line prompt,
  // we POST to ai-otj-proposal, store the structured prefill, and open
  // the SubmitWorkOtjSheet pre-populated. Apprentice always edits before
  // submitting — nothing is auto-filed.
  const [aiPromptOpen, setAiPromptOpen] = useState(false);
  const [aiPromptText, setAiPromptText] = useState('');
  const [aiPromptLoading, setAiPromptLoading] = useState(false);
  const [aiPrefill, setAiPrefill] = useState<AiPrefill | null>(null);

  const handleGenerateProposal = async () => {
    const trimmed = aiPromptText.trim();
    if (trimmed.length < 8) {
      toast({
        title: 'Tell me a bit more',
        description: 'A few words about what you did so there is something to write up.',
      });
      return;
    }
    setAiPromptLoading(true);
    try {
      // Use supabase.functions.invoke so the URL + auth header are
      // resolved by the SDK from the same config the rest of the app
      // uses. The earlier raw-fetch fallback to `/functions/v1/...`
      // would silently 200-with-HTML if VITE_SUPABASE_URL was missing
      // (relative path → app origin → index.html → JSON.parse fails).
      const { data, error: fnErr } = await supabase.functions.invoke('ai-otj-proposal', {
        body: { prompt: trimmed },
      });
      if (fnErr) throw new Error(fnErr.message ?? 'request_failed');
      const proposal = (data ?? {}) as AiPrefill | { error?: string };
      if ('error' in proposal && proposal.error) {
        throw new Error(proposal.error);
      }
      if (!('title' in proposal) || !proposal.title) {
        throw new Error('AI returned an empty proposal');
      }
      setAiPrefill(proposal);
      setAiPromptOpen(false);
      setAiPromptText('');
      // Open the submit sheet pre-populated. The Sheet's open-time
      // effect will hydrate the form from the prefill.
      setOpen(true);
    } catch (e) {
      toast({
        title: 'Could not draft your write-up',
        description: (e as Error).message,
        variant: 'destructive',
      });
    } finally {
      setAiPromptLoading(false);
    }
  };

  const fetchRows = useCallback(async () => {
    const { data: u } = await supabase.auth.getUser();
    const uid = u.user?.id;
    if (!uid) {
      setLoading(false);
      return;
    }
    const { data } = await supabase
      .from('college_otj_entries')
      .select(
        'id, activity_date, activity_type, title, duration_minutes, source_kind, verification_status, verification_rationale, verified_at, recorded_by_name_snapshot, created_at'
      )
      .eq('student_id', uid)
      .order('activity_date', { ascending: false })
      .limit(50);
    setRows((data ?? []) as OtjRow[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchRows();
  }, [fetchRows]);

  // Realtime — verification status flips happen server-side via the AI
  // verdict edge fn (Phase H.4) and tutor approvals.
  useEffect(() => {
    let chan: ReturnType<typeof supabase.channel> | null = null;
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      const uid = u.user?.id;
      if (!uid) return;
      chan = supabase
        .channel(realtimeChannelName(`my_otj:${uid}`))
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'college_otj_entries',
            filter: `student_id=eq.${uid}`,
          },
          () => fetchRows()
        )
        .subscribe();
    })();
    return () => {
      if (chan) supabase.removeChannel(chan);
    };
  }, [fetchRows]);

  const summary = useMemo(() => {
    let verifiedMin = 0;
    let pendingMin = 0;
    let rejectedMin = 0;
    let last7Min = 0;
    const since7 = Date.now() - 7 * 86_400_000;
    for (const r of rows) {
      const m = r.duration_minutes ?? 0;
      if (
        r.verification_status === 'verified' ||
        r.verification_status === 'verified_by_employer'
      ) {
        verifiedMin += m;
      } else if (r.verification_status === 'pending') {
        pendingMin += m;
      } else if (r.verification_status === 'rejected') {
        rejectedMin += m;
      }
      const dateMs = new Date(r.activity_date).getTime();
      if (dateMs >= since7) last7Min += m;
    }
    return { verifiedMin, pendingMin, rejectedMin, last7Min };
  }, [rows]);

  const visible = expanded ? rows : rows.slice(0, 4);
  const shared = useOtjSummary();
  const refreshShared = shared.refresh;
  // A new or re-verified entry moves the shared figure too.
  useEffect(() => {
    void refreshShared();
  }, [rows, refreshShared]);

  if (loading) return <Skeleton />;

  const counted = shared.data?.counted_hours ?? summary.verifiedMin / 60;
  const required = shared.data?.required_hours ?? null;
  const headline = [
    required
      ? `${fmtHours(counted * 60)} of your ${fmtHours(required * 60)} counted so far.`
      : `${fmtHours(counted * 60)} counted so far.`,
    summary.pendingMin > 0 && `${fmtHours(summary.pendingMin)} waiting on your tutor.`,
    summary.rejectedMin > 0 && `${fmtHours(summary.rejectedMin)} returned to you to fix.`,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <section className={LC_CARD}>
        <div>
          <h3 className="text-[15px] font-semibold tracking-tight text-white">Off-the-job hours</h3>
          <p className="mt-1 text-[14px] font-medium leading-snug text-white">{headline}</p>
          <p className="mt-1.5 text-[12.5px] leading-snug text-white">
            Log work you did off the tools: training, shadowing, study. Your tutor or supervisor
            signs it off, then it counts.
          </p>

          {/* CTA row — primary submit, secondary AI write-up shortcut. The
              AI path lands on College AI with a pre-prompt that fires the
              write-back loop, drafting the OTJ entry + portfolio item +
              optional ILP goal off a real story. */}
          {/* Both buttons intrinsic from `sm` up. `1fr_auto` gave the solid volt
              primary every spare pixel — roughly 560px of yellow at desktop
              width, which made it the loudest thing on the page by a mile.
              Full-width stacked on a phone, where that is correct. */}
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
            <button
              type="button"
              onClick={() => {
                // Direct submit — clear any stale AI prefill so the form
                // opens blank as expected.
                setAiPrefill(null);
                setOpen(true);
              }}
              className="h-11 w-full rounded-xl bg-elec-yellow px-5 text-[13.5px] font-semibold text-black transition-opacity touch-manipulation hover:opacity-90 sm:w-auto"
            >
              Log work activity
            </button>
            <button
              type="button"
              onClick={() => setAiPromptOpen((x) => !x)}
              aria-expanded={aiPromptOpen}
              className={cn(
                'inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-xl border px-4 text-[13.5px] font-semibold transition-colors touch-manipulation sm:w-auto',
                /*
                 * ⚠️ Both branches of this ternary used to be the same —
                 * `border-white/[0.06] bg-white/[0.02] text-white`, differing
                 * only by a hover set to the SAME colour as the base. So the
                 * toggle had no visible pressed state at all: with the AI
                 * panel open the button looked exactly as it did closed. The
                 * surface was also 2% white, which barely reads as a control.
                 */
                aiPromptOpen
                  ? 'border-elec-yellow text-elec-yellow'
                  : 'border-white/[0.14] text-white hover:border-elec-yellow'
              )}
            >
              Write it up for me <UsesAi />
            </button>
          </div>

          {/* AI prompt panel — slides in below the CTAs. Apprentice types a
              one-line description, AI returns a structured proposal, the
              SubmitWorkOtjSheet opens prefilled with it. Always editable. */}
          {aiPromptOpen && (
            <div className="mt-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5 space-y-2.5">
              <div className="text-[13px] font-semibold text-white">Tell me what you did</div>
              <textarea
                value={aiPromptText}
                onChange={(e) => setAiPromptText(e.target.value)}
                placeholder="e.g. rewired a kitchen consumer unit with my supervisor, took 4 hours, learned how to terminate the SWA properly"
                rows={3}
                disabled={aiPromptLoading}
                className={cn(textareaCn, 'w-full resize-none')}
              />
              <div className="flex items-center justify-between gap-2">
                <p className="text-[12px] text-white leading-snug">
                  This drafts a starter (uses AI). You review, edit, then submit. Nothing is filed
                  on its own.
                </p>
                <button
                  type="button"
                  onClick={() => void handleGenerateProposal()}
                  disabled={aiPromptLoading || aiPromptText.trim().length < 8}
                  className={cn(
                    'shrink-0 inline-flex items-center gap-1.5 h-11 px-4 rounded-lg text-[12.5px] font-semibold transition-colors touch-manipulation',
                    aiPromptLoading
                      ? // 🔴 Faded volt over near-black goes muddy brown. A
                        // disabled primary must go NEUTRAL, not translucent volt.
                        'bg-white/[0.08] text-white cursor-not-allowed'
                      : aiPromptText.trim().length < 8
                        ? 'bg-white/[0.05] text-white'
                        : 'bg-elec-yellow text-black hover:bg-elec-yellow/90'
                  )}
                >
                  <PenLine className="h-4 w-4" strokeWidth={1.5} aria-hidden />
                  {aiPromptLoading ? 'Drafting…' : 'Draft my entry'}
                </button>
              </div>
            </div>
          )}

          {/* Recent submissions */}
          {rows.length > 0 && (
            <div className="mt-5 -mx-1">
              <h4 className="px-1 text-[13px] font-semibold text-white">Recent</h4>
              <ul className="mt-2 divide-y divide-white/[0.05]">
                {visible.map((r) => (
                  <RowItem key={r.id} row={r} />
                ))}
              </ul>
              {rows.length > 4 && (
                <button
                  type="button"
                  onClick={() => setExpanded((x) => !x)}
                  className="mt-1 inline-flex h-11 items-center px-1 text-[13px] font-semibold text-elec-yellow touch-manipulation"
                >
                  {expanded ? 'Show less' : `Show ${rows.length - 4} more`}
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      <SubmitWorkOtjSheet
        open={open}
        onOpenChange={(o) => {
          setOpen(o);
          // Sheet closing — clear AI prefill so the next plain "Submit
          // work activity" tap opens a blank form rather than the stale
          // AI draft.
          if (!o) setAiPrefill(null);
        }}
        prefill={aiPrefill ?? undefined}
        onSubmitted={() => {
          fetchRows();
        }}
      />
    </>
  );
}

function RowItem({ row }: { row: OtjRow }) {
  const apprenticeSubmitted = row.source_kind === 'apprentice_submitted';
  return (
    <li className="px-1 py-2.5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="line-clamp-2 text-[13.5px] font-medium leading-snug text-white">
            {row.title}
          </div>
          <div className="mt-0.5 flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-[12px] text-white">
            <span>{ACTIVITY_LABEL[row.activity_type] ?? row.activity_type}</span>
            <span aria-hidden>·</span>
            <span className="tabular-nums">{fmtHours(row.duration_minutes)}</span>
            <span aria-hidden>·</span>
            <span>{fmtRel(row.activity_date)}</span>
            {!apprenticeSubmitted && (
              <>
                <span aria-hidden>·</span>
                <span>
                  {row.source_kind === 'tutor_recorded' ? 'logged by tutor' : 'auto-tracked'}
                </span>
              </>
            )}
          </div>
          {row.verification_status === 'rejected' && row.verification_rationale && (
            <div className="mt-1 text-[12.5px] leading-snug text-orange-300">
              Your tutor said: {row.verification_rationale}
            </div>
          )}
        </div>
        <span className={lcChip(STATUS_TONE[row.verification_status])}>
          {STATUS_LABEL[row.verification_status]}
        </span>
      </div>
    </li>
  );
}

function Skeleton() {
  return (
    <section className={LC_CARD}>
      <div className="space-y-4">
        <div className="h-3 w-32 rounded-full bg-white/[0.05]" />
        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-6 w-16 rounded-md bg-white/[0.05]" />
              <div className="h-3 w-12 rounded-full bg-white/[0.04]" />
            </div>
          ))}
        </div>
        <div className="h-11 rounded-lg bg-white/[0.04]" />
      </div>
    </section>
  );
}
