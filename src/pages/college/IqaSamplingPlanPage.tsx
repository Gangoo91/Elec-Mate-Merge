import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { openEvidence } from '@/lib/evidenceUrl';
import {
  PageFrame,
  LoadingState,
  Pill,
  itemVariants,
  textareaClass,
  type Tone,
} from '@/components/college/primitives';
import {
  useIqaSamplingPlan,
  type IqaSampleRow,
  type EligibleObservation,
  type EligibleOtjEntry,
  type SampleVerdict,
} from '@/hooks/useIqaSamplingPlan';
import {
  AddIqaFindingDialog,
  type AddIqaFindingPrefill,
} from '@/components/college/dialogs/AddIqaFindingDialog';

/* ==========================================================================
   IqaSamplingPlanPage — /college/iqa/sampling/:id
   IQA picks observations to sample, then marks each verdict.
   ========================================================================== */

const VERDICT_TONE: Record<SampleVerdict, Tone> = {
  pending: 'amber',
  agree: 'green',
  disagree: 'red',
  refer: 'amber',
};

const VERDICT_LABEL: Record<SampleVerdict, string> = {
  pending: 'Awaiting verdict',
  agree: 'Agree',
  disagree: 'Disagree',
  refer: 'Refer back',
};

const VERDICT_OPTIONS: SampleVerdict[] = ['pending', 'agree', 'disagree', 'refer'];

function formatDate(iso: string | null | undefined): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function IqaSamplingPlanPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const data = useIqaSamplingPlan(id ?? null);
  const [visibleEligible, setVisibleEligible] = useState(50);
  const [visibleEligibleOtj, setVisibleEligibleOtj] = useState(50);
  const [findingPrefill, setFindingPrefill] = useState<AddIqaFindingPrefill | null>(null);
  const [pickingObs, setPickingObs] = useState(false);
  const [pickingOtj, setPickingOtj] = useState(false);

  if (!id) {
    return (
      <PageFrame>
        <div className="text-white">No plan id.</div>
      </PageFrame>
    );
  }

  if (data.loading && !data.plan) {
    return (
      <PageFrame>
        <LoadingState />
      </PageFrame>
    );
  }

  if (!data.plan) {
    return (
      <PageFrame>
        <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-6 py-6">
          <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-red-300 mb-2">
            Not found
          </div>
          <p className="text-[13.5px] text-white">This sampling plan couldn't be loaded.</p>
        </div>
      </PageFrame>
    );
  }

  const { plan, samples, eligible, eligibleOtj } = data;

  const target = plan.target_sample_percent ?? 0;
  const total =
    (plan.total_assessments ?? 0) || eligible.length + eligibleOtj.length + samples.length;
  const sampledPct = total > 0 ? Math.round((samples.length / total) * 100) : 0;
  const onTrack = sampledPct >= target;

  const handleAdd = async (obsId: string) => {
    try {
      await data.addSample(obsId);
      toast({ title: 'Added to sample' });
    } catch (e) {
      toast({
        title: 'Add failed',
        description: (e as Error).message,
        variant: 'destructive',
      });
    }
  };

  const handleAddOtj = async (otj: { id: string; title: string; activity_date: string }) => {
    try {
      await data.addOtjSample(otj);
      toast({ title: 'OTJ added to sample' });
    } catch (e) {
      toast({
        title: 'Add failed',
        description: (e as Error).message,
        variant: 'destructive',
      });
    }
  };

  // Random sampling — Fisher-Yates shuffle of the eligible list, slice N,
  // fire the existing add fn for each. Done sequentially (not parallel) so
  // we don't trigger a thundering-herd of inserts and so toast progress
  // reads in order. Default 5 — the awarding-body benchmark for routine
  // sampling on a quarterly plan.
  const pickRandomObservations = async (n: number) => {
    if (eligible.length === 0 || pickingObs) return;
    setPickingObs(true);
    try {
      const pool = [...eligible];
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
      const picks = pool.slice(0, Math.min(n, pool.length));
      let added = 0;
      for (const p of picks) {
        try {
          await data.addSample(p.id);
          added += 1;
        } catch {
          /* one row failing shouldn't kill the rest */
        }
      }
      toast({
        title: `Added ${added} random sample${added === 1 ? '' : 's'}`,
        description: 'Mark each verdict from the In Scope list above.',
      });
    } finally {
      setPickingObs(false);
    }
  };

  const pickRandomOtj = async (n: number) => {
    if (eligibleOtj.length === 0 || pickingOtj) return;
    setPickingOtj(true);
    try {
      const pool = [...eligibleOtj];
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
      const picks = pool.slice(0, Math.min(n, pool.length));
      let added = 0;
      for (const p of picks) {
        try {
          await data.addOtjSample({
            id: p.id,
            title: p.title,
            activity_date: p.activity_date,
          });
          added += 1;
        } catch {
          /* swallow per-row failures */
        }
      }
      toast({
        title: `Added ${added} random OTJ sample${added === 1 ? '' : 's'}`,
        description: 'Mark each verdict from the In Scope list above.',
      });
    } finally {
      setPickingOtj(false);
    }
  };

  const handleViewEvidence = async (sample: IqaSampleRow) => {
    if (sample.otj_id) {
      // OTJ evidence: pull `evidence_url` (or first of `evidence_urls`) from
      // the source OTJ row. If the entry's been deleted, the snapshot still
      // proves the audit trail but no file is reachable.
      const { data: otj, error: otjErr } = await supabase
        .from('college_otj_entries')
        .select('evidence_url, evidence_urls')
        .eq('id', sample.otj_id)
        .maybeSingle();
      if (otjErr || !otj) {
        toast({
          title: 'Original OTJ entry deleted',
          description: 'The source OTJ row is gone; only the snapshot survives in the audit pack.',
          variant: 'destructive',
        });
        return;
      }
      const direct = (otj as { evidence_url?: string | null }).evidence_url ?? null;
      const list = ((otj as { evidence_urls?: string[] | null }).evidence_urls ?? null) || null;
      const url = direct || (list && list.length > 0 ? list[0] : null);
      if (!url) {
        toast({
          title: 'No evidence file on this OTJ entry',
          description: "The apprentice didn't attach a file when submitting it.",
        });
        return;
      }
      await openEvidence(url);
      return;
    }

    if (!sample.observation_id) {
      toast({
        title: 'Original observation deleted',
        description:
          'The source observation is no longer in the system; only the snapshot survives.',
        variant: 'destructive',
      });
      return;
    }
    const { data: obs, error: obsErr } = await supabase
      .from('college_observations')
      .select('evidence_path')
      .eq('id', sample.observation_id)
      .maybeSingle();
    if (obsErr || !obs?.evidence_path) {
      toast({
        title: 'No evidence file on this observation',
        description: "The assessor didn't attach a file when recording it.",
      });
      return;
    }
    const { data: signed, error: signErr } = await supabase.storage
      .from('compliance-evidence')
      .createSignedUrl(obs.evidence_path as string, 60);
    if (signErr || !signed?.signedUrl) {
      toast({
        title: 'Could not open evidence',
        description: signErr?.message ?? 'Try again.',
        variant: 'destructive',
      });
      return;
    }
    window.open(signed.signedUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <PageFrame className="max-w-[1280px] pb-16">
      <motion.div variants={itemVariants}>
        <button
          onClick={() => navigate(-1)}
          className="text-[12px] font-medium text-white hover:text-white transition-colors no-print"
        >
          ← Back to IQA
        </button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-white">
          Quality assurance · Sampling plan
        </div>
        <h1 className="mt-2 text-[28px] sm:text-[36px] font-semibold text-white tracking-tight leading-tight">
          {plan.qualification_code ?? 'All qualifications'}
          {plan.unit_code && <span className="text-white font-medium"> · {plan.unit_code}</span>}
        </h1>
        <div className="mt-3 flex items-center flex-wrap gap-x-3 gap-y-1.5 text-[12px]">
          <Pill tone={onTrack ? 'green' : 'amber'}>{onTrack ? 'On track' : 'Catching up'}</Pill>
          <span className="text-white tabular-nums">Target {target}%</span>
          <span className="text-white">·</span>
          <span className="text-white tabular-nums">
            {formatDate(plan.period_start)} → {formatDate(plan.period_end)}
          </span>
          {plan.iqa_name_snapshot && (
            <>
              <span className="text-white">·</span>
              <span className="text-white">
                IQA: <span className="text-white">{plan.iqa_name_snapshot}</span>
              </span>
            </>
          )}
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-5 py-4">
          <div className="flex items-end justify-between gap-3 flex-wrap">
            <div>
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
                Sample progress
              </div>
              <div className="mt-1 text-[24px] font-semibold tabular-nums text-white">
                {samples.length}
                <span className="text-white text-[16px]"> / {total}</span>
                <span className="ml-2 text-[14px] font-medium text-white">{sampledPct}%</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-[0.18em] text-white">Verdicts</div>
              <div className="mt-1 flex items-center gap-2 text-[11.5px] tabular-nums">
                <VerdictTally
                  label="Agree"
                  tone="emerald"
                  n={samples.filter((s) => s.verdict === 'agree').length}
                />
                <VerdictTally
                  label="Disagree"
                  tone="red"
                  n={samples.filter((s) => s.verdict === 'disagree').length}
                />
                <VerdictTally
                  label="Refer"
                  tone="amber"
                  n={samples.filter((s) => s.verdict === 'refer').length}
                />
                <VerdictTally
                  label="Pending"
                  tone="white"
                  n={samples.filter((s) => s.verdict === 'pending').length}
                />
              </div>
            </div>
          </div>
          <div className="mt-3 h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
            <div
              className={cn('h-full transition-all', onTrack ? 'bg-emerald-400' : 'bg-amber-400')}
              style={{ width: `${Math.min(100, sampledPct)}%` }}
            />
          </div>
          {plan.notes && (
            <p className="mt-3 pt-3 border-t border-white/[0.06] text-[12px] text-white leading-relaxed">
              {plan.notes}
            </p>
          )}
        </div>
      </motion.div>

      {/* Samples — already in scope */}
      <motion.section variants={itemVariants} className="space-y-3">
        <div>
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
            In scope
          </div>
          <h2 className="mt-1 text-[20px] sm:text-[22px] font-semibold text-white tracking-tight">
            Sampled observations · {samples.length}
          </h2>
        </div>
        {samples.length === 0 ? (
          <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-6 py-6">
            <p className="text-[12.5px] text-white max-w-md leading-relaxed">
              Nothing sampled yet. Pick observations from the list below to add them to your sample,
              then mark each with a verdict.
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {samples.map((s) => (
              <SampleCard
                key={s.id}
                sample={s}
                linkedFindingCount={data.findingCountBySample.get(s.id) ?? 0}
                onViewEvidence={() => handleViewEvidence(s)}
                onSetVerdict={async (v, comments) => {
                  try {
                    await data.setVerdict(s.id, v, comments);
                    toast({ title: 'Verdict updated' });
                  } catch (e) {
                    toast({
                      title: 'Save failed',
                      description: (e as Error).message,
                      variant: 'destructive',
                    });
                  }
                }}
                onPromoteToFinding={() => {
                  // Pre-fill the AddIqaFindingDialog with this sample's
                  // context so the IQA doesn't re-type the assessor /
                  // description / rationale. Disagree → "action required",
                  // refer → "concern". The IQA can override before saving.
                  const findingType =
                    s.verdict === 'disagree'
                      ? 'action'
                      : s.verdict === 'refer'
                        ? 'concern'
                        : 'observation';
                  const what = s.otj_id
                    ? (s.otj_title_snapshot ?? 'OTJ entry')
                    : (s.observation_title_snapshot ?? 'Observation');
                  const rationale = s.comments?.trim() ? `Rationale: ${s.comments.trim()}` : '';
                  const description = [
                    `Raised from IQA sample — verdict: ${VERDICT_LABEL[s.verdict].toLowerCase()}`,
                    `Sample: ${what}`,
                    rationale,
                  ]
                    .filter(Boolean)
                    .join('\n');
                  setFindingPrefill({
                    iqa_id: plan.iqa_id ?? undefined,
                    assessor_id: plan.assessor_id ?? undefined,
                    sample_id: s.id,
                    finding_type: findingType,
                    description,
                  });
                }}
                onRemove={async () => {
                  const ok = window.confirm('Remove from sample? Logged in audit trail.');
                  if (!ok) return;
                  try {
                    await data.removeSample(s.id);
                    toast({ title: 'Removed from sample' });
                  } catch (e) {
                    toast({
                      title: 'Remove failed',
                      description: (e as Error).message,
                      variant: 'destructive',
                    });
                  }
                }}
              />
            ))}
          </div>
        )}
      </motion.section>

      {/* Eligible — pickable */}
      <motion.section variants={itemVariants} className="space-y-3">
        <div className="flex items-end justify-between gap-3 flex-wrap">
          <div>
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
              Available
            </div>
            <h2 className="mt-1 text-[20px] sm:text-[22px] font-semibold text-white tracking-tight">
              Eligible observations · {eligible.length}
            </h2>
          </div>
          {eligible.length > 0 && (
            <div className="flex items-center gap-1.5">
              {[5, 10].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => pickRandomObservations(n)}
                  disabled={pickingObs || n > eligible.length}
                  className="h-8 px-3 rounded-full bg-purple-500/[0.10] border border-purple-400/40 text-[11.5px] font-semibold text-purple-200 hover:bg-purple-500/[0.18] disabled:opacity-40 touch-manipulation"
                  title={`Randomly pick ${n} unsampled observations`}
                >
                  {pickingObs ? '…' : `🎲 Pick ${n} random`}
                </button>
              ))}
            </div>
          )}
        </div>
        {eligible.length === 0 ? (
          <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-6 py-6">
            <p className="text-[12.5px] text-white max-w-md leading-relaxed">
              No eligible observations in this period
              {plan.assessor_id ? ' for this assessor' : ''}
              {plan.qualification_code ? ` on ${plan.qualification_code}` : ''}. Either widen the
              plan's filters or wait for new observations to be recorded.
            </p>
          </div>
        ) : (
          <>
            <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl divide-y divide-white/[0.04]">
              {eligible.slice(0, visibleEligible).map((o) => (
                <EligibleRow key={o.id} obs={o} onAdd={() => handleAdd(o.id)} />
              ))}
            </div>
            {eligible.length > visibleEligible && (
              <div className="mt-3 flex items-center justify-between gap-3">
                <p className="text-[11.5px] text-white/60 tabular-nums">
                  Showing {Math.min(visibleEligible, eligible.length)} of {eligible.length}
                </p>
                <button
                  type="button"
                  onClick={() => setVisibleEligible((n) => n + 50)}
                  className="h-11 px-4 text-[12.5px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation"
                >
                  Load more →
                </button>
              </div>
            )}
          </>
        )}
      </motion.section>

      {/* Eligible OTJ entries — assessor-verified entries the IQA can sample
          to check the assessor's verdict. Only shows entries within the
          plan's period and (when set) verified by the plan's assessor. */}
      <motion.section variants={itemVariants} className="space-y-3">
        <div className="flex items-end justify-between gap-3 flex-wrap">
          <div>
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
              Available · OTJ
            </div>
            <h2 className="mt-1 text-[20px] sm:text-[22px] font-semibold text-white tracking-tight">
              Eligible OTJ entries · {eligibleOtj.length}
            </h2>
            <p className="mt-1 text-[12px] text-white leading-relaxed max-w-2xl">
              Assessor-verified OTJ submissions in this period. Sample to confirm the assessor's
              verdict was sound — agree, disagree or refer with comments.
            </p>
          </div>
          {eligibleOtj.length > 0 && (
            <div className="flex items-center gap-1.5">
              {[5, 10].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => pickRandomOtj(n)}
                  disabled={pickingOtj || n > eligibleOtj.length}
                  className="h-8 px-3 rounded-full bg-purple-500/[0.10] border border-purple-400/40 text-[11.5px] font-semibold text-purple-200 hover:bg-purple-500/[0.18] disabled:opacity-40 touch-manipulation"
                  title={`Randomly pick ${n} unsampled OTJ entries`}
                >
                  {pickingOtj ? '…' : `🎲 Pick ${n} random`}
                </button>
              ))}
            </div>
          )}
        </div>
        {eligibleOtj.length === 0 ? (
          <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-6 py-6">
            <p className="text-[12.5px] text-white max-w-md leading-relaxed">
              No assessor-verified OTJ entries in this period
              {plan.assessor_id ? ' for this assessor' : ''}. They appear here once the assessor
              signs off submissions.
            </p>
          </div>
        ) : (
          <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl divide-y divide-white/[0.04]">
            {eligibleOtj.slice(0, visibleEligibleOtj).map((o) => (
              <EligibleOtjRow
                key={o.id}
                otj={o}
                onAdd={() =>
                  handleAddOtj({
                    id: o.id,
                    title: o.title,
                    activity_date: o.activity_date,
                  })
                }
              />
            ))}
          </div>
        )}
        {eligibleOtj.length > visibleEligibleOtj && (
          <div className="mt-3 flex items-center justify-between gap-3">
            <p className="text-[11.5px] text-white/60 tabular-nums">
              Showing {Math.min(visibleEligibleOtj, eligibleOtj.length)} of {eligibleOtj.length}
            </p>
            <button
              type="button"
              onClick={() => setVisibleEligibleOtj((n) => n + 50)}
              className="h-11 px-4 text-[12.5px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation"
            >
              Load more →
            </button>
          </div>
        )}
      </motion.section>

      {/* Findings dialog mounted at page level so the SampleCard can
          "promote" a disagree/refer verdict into a formal finding without
          duplicating the heavy form. Prefilled with the sample's context. */}
      <AddIqaFindingDialog
        open={findingPrefill !== null}
        onOpenChange={(o) => {
          if (!o) setFindingPrefill(null);
        }}
        prefill={findingPrefill ?? undefined}
      />
    </PageFrame>
  );
}

/* ──────────────────────────────────────────────────────── */

function VerdictTally({
  label,
  n,
  tone,
}: {
  label: string;
  n: number;
  tone: 'emerald' | 'red' | 'amber' | 'white';
}) {
  const colour =
    n === 0
      ? 'text-white'
      : tone === 'emerald'
        ? 'text-emerald-300'
        : tone === 'red'
          ? 'text-red-300'
          : tone === 'amber'
            ? 'text-amber-300'
            : 'text-white';
  return (
    <span className="inline-flex items-center gap-1">
      <span className={cn('font-semibold', colour)}>{n}</span>
      <span className="text-white">{label}</span>
    </span>
  );
}

/* ──────────────────────────────────────────────────────── */

// Numeric keyboard shortcuts on a SampleCard — order matches VERDICT_OPTIONS.
const VERDICT_SHORTCUT: Record<SampleVerdict, string> = {
  pending: '1',
  agree: '2',
  disagree: '3',
  refer: '4',
};
const SHORTCUT_TO_VERDICT: Record<string, SampleVerdict> = {
  '1': 'pending',
  '2': 'agree',
  '3': 'disagree',
  '4': 'refer',
};

function SampleCard({
  sample,
  linkedFindingCount,
  onSetVerdict,
  onRemove,
  onViewEvidence,
  onPromoteToFinding,
}: {
  sample: IqaSampleRow;
  /** Count of findings raised from this sample (via the FK on
   *  college_iqa_findings.sample_id). Renders a small badge in the
   *  header so the IQA can see at a glance which samples already have
   *  a finding logged against them. */
  linkedFindingCount: number;
  onSetVerdict: (v: SampleVerdict, comments?: string) => Promise<void>;
  onRemove: () => Promise<void>;
  onViewEvidence: () => void;
  /** Open the Findings dialog with this sample's context prefilled. */
  onPromoteToFinding: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [comments, setComments] = useState(sample.comments ?? '');

  const verdictTone = VERDICT_TONE[sample.verdict];

  const persistComments = async () => {
    if (comments === (sample.comments ?? '')) {
      setEditing(false);
      return;
    }
    await onSetVerdict(sample.verdict, comments);
    setEditing(false);
  };

  // Keyboard shortcuts: 1/2/3/4 sets verdict when the card is focused.
  // We use tabIndex on the wrapper so click/tab gives keyboard focus, and
  // bail out when the user is typing in the comments textarea (editing).
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (editing) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const target = e.target as HTMLElement;
    if (target.tagName === 'TEXTAREA' || target.tagName === 'INPUT') return;
    const next = SHORTCUT_TO_VERDICT[e.key];
    if (!next || next === sample.verdict) return;
    e.preventDefault();
    void onSetVerdict(next, comments);
  };

  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label={`Sample ${sample.observation_title_snapshot ?? sample.otj_title_snapshot ?? 'untitled'} — keyboard 1/2/3/4 to set verdict`}
      className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-5 sm:px-6 py-4 focus-visible:border-elec-yellow/40 focus-visible:ring-1 focus-visible:ring-elec-yellow/20 outline-none"
    >
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <Pill tone={verdictTone}>{VERDICT_LABEL[sample.verdict]}</Pill>
            {linkedFindingCount > 0 && (
              <span
                className="inline-flex items-center h-5 px-1.5 rounded-md bg-amber-500/[0.10] border border-amber-400/30 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-amber-200"
                title={`${linkedFindingCount} IQA finding${linkedFindingCount === 1 ? '' : 's'} raised from this sample`}
              >
                {linkedFindingCount} finding{linkedFindingCount === 1 ? '' : 's'}
              </span>
            )}
            <span className="text-[11px] text-white tabular-nums">
              Sampled {formatDate(sample.sampled_at)}
            </span>
            {sample.iqa_name_snapshot && (
              <>
                <span className="text-white">·</span>
                <span className="text-[11px] text-white">by {sample.iqa_name_snapshot}</span>
              </>
            )}
          </div>
          <h3 className="mt-1.5 text-[14px] font-medium text-white flex items-center gap-2">
            <span
              className={cn(
                'inline-flex items-center h-5 px-1.5 rounded-md border text-[10px] font-semibold uppercase tracking-[0.16em]',
                sample.otj_id
                  ? 'border-emerald-300/30 text-emerald-200 bg-emerald-500/[0.06]'
                  : 'border-cyan-300/30 text-cyan-200 bg-cyan-500/[0.06]'
              )}
            >
              {sample.otj_id ? 'OTJ' : 'Observation'}
            </span>
            <span className="truncate">
              {sample.otj_id
                ? (sample.otj_title_snapshot ?? 'OTJ entry')
                : (sample.observation_title_snapshot ?? 'Observation')}
            </span>
          </h3>
          <div className="mt-0.5 text-[11px] text-white tabular-nums">
            {sample.otj_id ? 'Activity' : 'Observed'}{' '}
            {formatDate(
              sample.otj_id ? sample.otj_date_snapshot : sample.observation_date_snapshot
            )}
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-1.5 flex-wrap">
        {VERDICT_OPTIONS.map((v) => {
          const active = sample.verdict === v;
          const tone = VERDICT_TONE[v];
          return (
            <button
              key={v}
              type="button"
              onClick={() => onSetVerdict(v, comments)}
              className={cn(
                'h-8 px-3 rounded-full text-[11.5px] font-medium border transition-colors touch-manipulation inline-flex items-center gap-1.5',
                active
                  ? tone === 'green'
                    ? 'bg-emerald-500/[0.12] border-emerald-500/40 text-emerald-200'
                    : tone === 'red'
                      ? 'bg-red-500/[0.12] border-red-500/40 text-red-200'
                      : 'bg-amber-500/[0.12] border-amber-500/40 text-amber-200'
                  : 'bg-[hsl(0_0%_14%)] border-white/[0.08] text-white hover:text-white hover:border-white/[0.18]'
              )}
              title={`Set verdict (keyboard: ${VERDICT_SHORTCUT[v]})`}
            >
              <span
                aria-hidden
                className="inline-flex items-center justify-center h-4 w-4 rounded bg-white/[0.08] text-[9.5px] font-mono tabular-nums text-white/65"
              >
                {VERDICT_SHORTCUT[v]}
              </span>
              {VERDICT_LABEL[v]}
            </button>
          );
        })}
        <div className="flex-1" />
        <button
          type="button"
          onClick={onViewEvidence}
          className="h-8 px-3 rounded-full bg-[hsl(0_0%_14%)] border border-white/[0.08] text-[11.5px] font-medium text-white hover:text-white hover:border-white/[0.18] transition-colors touch-manipulation"
        >
          View evidence
        </button>
        {(sample.verdict === 'disagree' || sample.verdict === 'refer') && (
          <button
            type="button"
            onClick={onPromoteToFinding}
            className="h-8 px-3 rounded-full border bg-amber-500/[0.10] border-amber-400/40 text-[11.5px] font-semibold text-amber-200 hover:bg-amber-500/[0.18] transition-colors touch-manipulation"
            title="Raise an IQA finding from this sample"
          >
            Raise finding →
          </button>
        )}
        <button
          type="button"
          onClick={onRemove}
          className="h-8 px-3 rounded-full text-[11.5px] font-medium text-white hover:text-red-300 hover:bg-red-500/[0.06] transition-colors touch-manipulation"
        >
          Remove
        </button>
      </div>

      <div className="mt-3 pt-3 border-t border-white/[0.06]">
        {editing ? (
          <>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows={3}
              className={cn(textareaClass, 'min-h-[70px]')}
              placeholder="Verdict rationale, agreed actions, IV evidence reference…"
            />
            <div className="mt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setComments(sample.comments ?? '');
                  setEditing(false);
                }}
                className="h-7 px-3 rounded-full text-[11px] font-medium text-white hover:text-white transition-colors touch-manipulation"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={persistComments}
                className="h-7 px-3 rounded-full bg-elec-yellow text-black text-[11px] font-semibold hover:bg-elec-yellow/90 transition-colors touch-manipulation"
              >
                Save comment
              </button>
            </div>
          </>
        ) : sample.comments ? (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="text-left w-full text-[12px] text-white leading-relaxed hover:bg-white/[0.02] -mx-2 px-2 py-1 rounded-md transition-colors"
          >
            {sample.comments}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="text-[11.5px] font-medium text-white hover:text-white transition-colors touch-manipulation"
          >
            Add verdict comment →
          </button>
        )}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */

function EligibleOtjRow({ otj, onAdd }: { otj: EligibleOtjEntry; onAdd: () => void }) {
  const hours = otj.duration_minutes != null ? `${(otj.duration_minutes / 60).toFixed(1)}h` : '—';
  const unitCount = otj.unit_codes?.length ?? 0;
  return (
    <div className="px-5 sm:px-6 py-3.5 flex items-start gap-3 flex-wrap">
      <div className="min-w-0 flex-1">
        <div className="text-[13px] font-medium text-white truncate flex items-center gap-2">
          <span className="inline-flex items-center h-5 px-1.5 rounded-md border border-emerald-300/30 bg-emerald-500/[0.06] text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-200">
            OTJ
          </span>
          <span className="truncate">{otj.title}</span>
        </div>
        <div className="mt-0.5 flex items-center flex-wrap gap-x-2 gap-y-0.5 text-[11px] text-white tabular-nums">
          <span>{formatDate(otj.activity_date)}</span>
          <span className="text-white">·</span>
          <span>{hours}</span>
          {otj.verified_at && (
            <>
              <span className="text-white">·</span>
              <span className="capitalize">verified {formatDate(otj.verified_at)}</span>
            </>
          )}
          {unitCount > 0 && (
            <>
              <span className="text-white">·</span>
              <span>
                {unitCount} unit{unitCount === 1 ? '' : 's'}
              </span>
            </>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={onAdd}
        className="shrink-0 h-8 px-3 rounded-full bg-elec-yellow/[0.1] border border-elec-yellow/40 text-[11.5px] font-semibold text-elec-yellow hover:bg-elec-yellow/[0.18] transition-colors touch-manipulation"
      >
        Sample →
      </button>
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */

function EligibleRow({ obs, onAdd }: { obs: EligibleObservation; onAdd: () => void }) {
  const acsCount = obs.acs_evidenced?.length ?? 0;
  return (
    <div className="px-5 sm:px-6 py-3.5 flex items-start gap-3 flex-wrap">
      <div className="min-w-0 flex-1">
        <div className="text-[13px] font-medium text-white truncate">{obs.activity_title}</div>
        <div className="mt-0.5 flex items-center flex-wrap gap-x-2 gap-y-0.5 text-[11px] text-white tabular-nums">
          <span>{formatDate(obs.observed_at)}</span>
          {obs.student_name_snapshot && (
            <>
              <span className="text-white">·</span>
              <span className="truncate max-w-[160px]">{obs.student_name_snapshot}</span>
            </>
          )}
          {obs.assessor_name_snapshot && (
            <>
              <span className="text-white">·</span>
              <span className="truncate max-w-[160px]">Assessor: {obs.assessor_name_snapshot}</span>
            </>
          )}
          {obs.outcome && (
            <>
              <span className="text-white">·</span>
              <span className="capitalize">{obs.outcome.replace(/_/g, ' ')}</span>
            </>
          )}
          {acsCount > 0 && (
            <>
              <span className="text-white">·</span>
              <span>
                {acsCount} AC{acsCount === 1 ? '' : 's'}
              </span>
            </>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={onAdd}
        className="shrink-0 h-8 px-3 rounded-full bg-elec-yellow/[0.1] border border-elec-yellow/40 text-[11.5px] font-semibold text-elec-yellow hover:bg-elec-yellow/[0.18] transition-colors touch-manipulation"
      >
        Sample →
      </button>
    </div>
  );
}
