import { useCallback, useEffect, useMemo, useState } from 'react';
import { ChevronRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { SubmitWorkOtjSheet } from './SubmitWorkOtjSheet';

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
  pending: 'Awaiting tutor',
  verified: 'Verified',
  rejected: 'Returned',
  verified_by_employer: 'Employer verified',
};

const STATUS_TONE: Record<VerificationStatus, string> = {
  pending: 'text-amber-300',
  verified: 'text-emerald-300',
  rejected: 'text-rose-300',
  verified_by_employer: 'text-blue-300',
};

const ACTIVITY_LABEL: Record<string, string> = {
  practical: 'Practical',
  shadowing: 'Shadowing',
  manufacturer_training: 'Manufacturer training',
  industry_visit: 'Industry visit',
  employer_meeting: 'Toolbox talk',
  simulation: 'Simulation',
  mentoring: 'Mentoring',
  theory: 'Theory',
  assessment: 'Assessment',
  workshop: 'Workshop',
  one_to_one: '1-2-1',
  tutorial: 'Tutorial',
  conference: 'Conference',
  other: 'Other',
};

function fmtHours(min: number): string {
  if (min < 60) return `${Math.round(min)}m`;
  const h = min / 60;
  return h >= 10 ? `${h.toFixed(0)}h` : `${h.toFixed(1)}h`;
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
        description: 'A few words about what you did so the AI has something to work with.',
      });
      return;
    }
    setAiPromptLoading(true);
    try {
      const { data: session } = await supabase.auth.getSession();
      const token = session.session?.access_token;
      if (!token) throw new Error('Not signed in');
      const url = `${(import.meta.env.VITE_SUPABASE_URL as string | undefined) ?? ''}/functions/v1/ai-otj-proposal`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ prompt: trimmed }),
      });
      if (!res.ok) {
        let detail = `request_${res.status}`;
        try {
          const j = (await res.json()) as { error?: string; detail?: string };
          detail = j.detail ?? j.error ?? detail;
        } catch {
          // ignore
        }
        throw new Error(detail);
      }
      const proposal = (await res.json()) as AiPrefill;
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
        .channel(`my_otj:${uid}`)
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

  if (loading) return <Skeleton />;

  return (
    <>
      <section className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] overflow-hidden">
        <div className="px-4 sm:px-5 py-4 sm:py-5">
          {/* Eyebrow */}
          <div className="flex items-baseline justify-between gap-3 flex-wrap">
            <div className="text-[11px] sm:text-[11.5px] font-medium uppercase tracking-[0.18em] text-emerald-300/85">
              Off-the-job training
            </div>
            {summary.pendingMin > 0 && (
              <span className="text-[10.5px] tabular-nums text-amber-300">
                {fmtHours(summary.pendingMin)} awaiting tutor
              </span>
            )}
          </div>

          {/* Headline numbers */}
          <div className="mt-3 grid grid-cols-3 gap-3 sm:gap-5">
            <Stat value={fmtHours(summary.verifiedMin)} label="Verified" tone="text-emerald-200" />
            <Stat value={fmtHours(summary.pendingMin)} label="Pending" tone="text-amber-200" />
            <Stat value={fmtHours(summary.last7Min)} label="Last 7 days" tone="text-white" />
          </div>

          <p className="mt-3 text-[11.5px] sm:text-[12px] text-white/85 leading-snug">
            ESFA needs your verified hours to total at least 20% of your paid time on the
            apprenticeship. Submit work activities here and your tutor signs them off.
          </p>

          {/* CTA row — primary submit, secondary AI write-up shortcut. The
              AI path lands on College AI with a pre-prompt that fires the
              write-back loop, drafting the OTJ entry + portfolio item +
              optional ILP goal off a real story. */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2">
            <button
              type="button"
              onClick={() => {
                // Direct submit — clear any stale AI prefill so the form
                // opens blank as expected.
                setAiPrefill(null);
                setOpen(true);
              }}
              className="h-11 rounded-lg bg-emerald-500 text-black text-[13px] font-semibold hover:bg-emerald-400 transition-colors touch-manipulation"
            >
              Submit work activity
            </button>
            <button
              type="button"
              onClick={() => setAiPromptOpen((x) => !x)}
              className={cn(
                'inline-flex items-center justify-center gap-1.5 h-11 px-4 rounded-lg border text-[13px] font-semibold transition-colors touch-manipulation',
                aiPromptOpen
                  ? 'border-cyan-300/40 bg-cyan-300/[0.14] text-cyan-100'
                  : 'border-cyan-300/30 bg-cyan-300/[0.08] text-cyan-200 hover:bg-cyan-300/[0.14]'
              )}
            >
              <Sparkles className="h-3.5 w-3.5" />
              Write up with AI
            </button>
          </div>

          {/* AI prompt panel — slides in below the CTAs. Apprentice types a
              one-line description, AI returns a structured proposal, the
              SubmitWorkOtjSheet opens prefilled with it. Always editable. */}
          {aiPromptOpen && (
            <div className="mt-3 rounded-xl border border-cyan-300/25 bg-cyan-500/[0.04] p-3.5 space-y-2.5">
              <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-cyan-200">
                Tell me what you did
              </div>
              <textarea
                value={aiPromptText}
                onChange={(e) => setAiPromptText(e.target.value)}
                placeholder="e.g. rewired a kitchen consumer unit with my supervisor, took 4 hours, learned how to terminate the SWA properly"
                rows={3}
                disabled={aiPromptLoading}
                className="w-full px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.08] text-[12.5px] text-white placeholder:text-white/45 leading-snug focus:outline-none focus:border-cyan-300/50 focus:ring-1 focus:ring-cyan-300/25 touch-manipulation resize-none disabled:opacity-60"
              />
              <div className="flex items-center justify-between gap-2">
                <p className="text-[10.5px] text-white/65 leading-snug">
                  AI drafts a starter — you review, edit, then submit. Nothing is auto-filed.
                </p>
                <button
                  type="button"
                  onClick={() => void handleGenerateProposal()}
                  disabled={aiPromptLoading || aiPromptText.trim().length < 8}
                  className={cn(
                    'shrink-0 inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg text-[12px] font-semibold transition-colors touch-manipulation',
                    aiPromptLoading
                      ? 'bg-cyan-300/40 text-black/70'
                      : aiPromptText.trim().length < 8
                        ? 'bg-white/[0.05] text-white/40'
                        : 'bg-cyan-300 text-black hover:bg-cyan-200'
                  )}
                >
                  <Sparkles className="h-3 w-3" />
                  {aiPromptLoading ? 'Drafting…' : 'Draft my entry'}
                </button>
              </div>
            </div>
          )}

          {/* Recent submissions */}
          {rows.length > 0 && (
            <div className="mt-5 -mx-1">
              <div className="px-1 text-[10.5px] font-medium uppercase tracking-[0.16em] text-white/95">
                Recent
              </div>
              <ul className="mt-2 divide-y divide-white/[0.05]">
                {visible.map((r) => (
                  <RowItem key={r.id} row={r} />
                ))}
              </ul>
              {rows.length > 4 && (
                <button
                  type="button"
                  onClick={() => setExpanded((x) => !x)}
                  className="mt-2 px-1 text-[11.5px] font-medium text-emerald-300 hover:text-emerald-200 transition-colors touch-manipulation"
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

function Stat({ value, label, tone }: { value: string; label: string; tone: string }) {
  return (
    <div>
      <div
        className={cn('text-[20px] sm:text-[24px] font-semibold tabular-nums leading-none', tone)}
      >
        {value}
      </div>
      <div className="mt-1 text-[10.5px] uppercase tracking-[0.14em] text-white/95">{label}</div>
    </div>
  );
}

function RowItem({ row }: { row: OtjRow }) {
  const apprenticeSubmitted = row.source_kind === 'apprentice_submitted';
  return (
    <li className="px-1 py-2.5">
      <div className="flex items-baseline justify-between gap-3">
        <div className="min-w-0">
          <div className="truncate text-[13px] font-medium text-white leading-snug">
            {row.title}
          </div>
          <div className="mt-0.5 flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-[10.5px] text-white/85">
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
            <div className="mt-1.5 border-l-2 border-rose-400/40 pl-2 text-[11px] text-rose-200/85 leading-snug">
              {row.verification_rationale}
            </div>
          )}
        </div>
        <span
          className={cn(
            'shrink-0 text-[10.5px] font-medium tabular-nums tracking-tight uppercase',
            STATUS_TONE[row.verification_status]
          )}
        >
          {STATUS_LABEL[row.verification_status]}
        </span>
      </div>
    </li>
  );
}

function Skeleton() {
  return (
    <section className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_10%)] overflow-hidden">
      <div className="px-4 sm:px-5 py-4 sm:py-5 space-y-4">
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
