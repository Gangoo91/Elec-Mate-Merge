import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
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
  type SampleVerdict,
} from '@/hooks/useIqaSamplingPlan';

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
          <p className="text-[13.5px] text-white">
            This sampling plan couldn't be loaded.
          </p>
        </div>
      </PageFrame>
    );
  }

  const { plan, samples, eligible } = data;

  const target = plan.target_sample_percent ?? 0;
  const total = (plan.total_assessments ?? 0) || eligible.length + samples.length;
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

  const handleViewEvidence = async (observationId: string | null) => {
    if (!observationId) {
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
      .eq('id', observationId)
      .maybeSingle();
    if (obsErr || !obs?.evidence_path) {
      toast({
        title: 'No evidence file on this observation',
        description: 'The assessor didn\'t attach a file when recording it.',
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
          className="text-[12px] font-medium text-white/65 hover:text-white transition-colors no-print"
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
          {plan.unit_code && (
            <span className="text-white/55 font-medium">
              {' '}
              · {plan.unit_code}
            </span>
          )}
        </h1>
        <div className="mt-3 flex items-center flex-wrap gap-x-3 gap-y-1.5 text-[12px]">
          <Pill tone={onTrack ? 'green' : 'amber'}>
            {onTrack ? 'On track' : 'Catching up'}
          </Pill>
          <span className="text-white/65 tabular-nums">
            Target {target}%
          </span>
          <span className="text-white/25">·</span>
          <span className="text-white/65 tabular-nums">
            {formatDate(plan.period_start)} → {formatDate(plan.period_end)}
          </span>
          {plan.iqa_name_snapshot && (
            <>
              <span className="text-white/25">·</span>
              <span className="text-white/65">
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
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Sample progress
              </div>
              <div className="mt-1 text-[24px] font-semibold tabular-nums text-white">
                {samples.length}
                <span className="text-white/40 text-[16px]"> / {total}</span>
                <span className="ml-2 text-[14px] font-medium text-white/55">
                  {sampledPct}%
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/55">
                Verdicts
              </div>
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
              className={cn(
                'h-full transition-all',
                onTrack ? 'bg-emerald-400' : 'bg-amber-400'
              )}
              style={{ width: `${Math.min(100, sampledPct)}%` }}
            />
          </div>
          {plan.notes && (
            <p className="mt-3 pt-3 border-t border-white/[0.06] text-[12px] text-white/75 leading-relaxed">
              {plan.notes}
            </p>
          )}
        </div>
      </motion.div>

      {/* Samples — already in scope */}
      <motion.section variants={itemVariants} className="space-y-3">
        <div>
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            In scope
          </div>
          <h2 className="mt-1 text-[20px] sm:text-[22px] font-semibold text-white tracking-tight">
            Sampled observations · {samples.length}
          </h2>
        </div>
        {samples.length === 0 ? (
          <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-6 py-6">
            <p className="text-[12.5px] text-white/65 max-w-md leading-relaxed">
              Nothing sampled yet. Pick observations from the list below to add
              them to your sample, then mark each with a verdict.
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {samples.map((s) => (
              <SampleCard
                key={s.id}
                sample={s}
                onViewEvidence={() => handleViewEvidence(s.observation_id)}
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
                onRemove={async () => {
                  const ok = window.confirm(
                    'Remove from sample? Logged in audit trail.'
                  );
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
        <div>
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Available
          </div>
          <h2 className="mt-1 text-[20px] sm:text-[22px] font-semibold text-white tracking-tight">
            Eligible observations · {eligible.length}
          </h2>
        </div>
        {eligible.length === 0 ? (
          <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-6 py-6">
            <p className="text-[12.5px] text-white/65 max-w-md leading-relaxed">
              No eligible observations in this period
              {plan.assessor_id ? ' for this assessor' : ''}
              {plan.qualification_code ? ` on ${plan.qualification_code}` : ''}
              . Either widen the plan's filters or wait for new observations to
              be recorded.
            </p>
          </div>
        ) : (
          <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl divide-y divide-white/[0.04]">
            {eligible.map((o) => (
              <EligibleRow key={o.id} obs={o} onAdd={() => handleAdd(o.id)} />
            ))}
          </div>
        )}
      </motion.section>
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
      ? 'text-white/35'
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
      <span className="text-white/55">{label}</span>
    </span>
  );
}

/* ──────────────────────────────────────────────────────── */

function SampleCard({
  sample,
  onSetVerdict,
  onRemove,
  onViewEvidence,
}: {
  sample: IqaSampleRow;
  onSetVerdict: (v: SampleVerdict, comments?: string) => Promise<void>;
  onRemove: () => Promise<void>;
  onViewEvidence: () => void;
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

  return (
    <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl px-5 sm:px-6 py-4">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <Pill tone={verdictTone}>{VERDICT_LABEL[sample.verdict]}</Pill>
            <span className="text-[11px] text-white/55 tabular-nums">
              Sampled {formatDate(sample.sampled_at)}
            </span>
            {sample.iqa_name_snapshot && (
              <>
                <span className="text-white/25">·</span>
                <span className="text-[11px] text-white/65">
                  by {sample.iqa_name_snapshot}
                </span>
              </>
            )}
          </div>
          <h3 className="mt-1.5 text-[14px] font-medium text-white">
            {sample.observation_title_snapshot ?? 'Observation'}
          </h3>
          <div className="mt-0.5 text-[11px] text-white/55 tabular-nums">
            Observed {formatDate(sample.observation_date_snapshot)}
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
                'h-8 px-3 rounded-full text-[11.5px] font-medium border transition-colors touch-manipulation',
                active
                  ? tone === 'green'
                    ? 'bg-emerald-500/[0.12] border-emerald-500/40 text-emerald-200'
                    : tone === 'red'
                      ? 'bg-red-500/[0.12] border-red-500/40 text-red-200'
                      : 'bg-amber-500/[0.12] border-amber-500/40 text-amber-200'
                  : 'bg-[hsl(0_0%_14%)] border-white/[0.08] text-white/70 hover:text-white hover:border-white/[0.18]'
              )}
            >
              {VERDICT_LABEL[v]}
            </button>
          );
        })}
        <div className="flex-1" />
        <button
          type="button"
          onClick={onViewEvidence}
          className="h-8 px-3 rounded-full bg-[hsl(0_0%_14%)] border border-white/[0.08] text-[11.5px] font-medium text-white/80 hover:text-white hover:border-white/[0.18] transition-colors touch-manipulation"
        >
          View evidence
        </button>
        <button
          type="button"
          onClick={onRemove}
          className="h-8 px-3 rounded-full text-[11.5px] font-medium text-white/55 hover:text-red-300 hover:bg-red-500/[0.06] transition-colors touch-manipulation"
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
                className="h-7 px-3 rounded-full text-[11px] font-medium text-white/55 hover:text-white transition-colors touch-manipulation"
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
            className="text-left w-full text-[12px] text-white/85 leading-relaxed hover:bg-white/[0.02] -mx-2 px-2 py-1 rounded-md transition-colors"
          >
            {sample.comments}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="text-[11.5px] font-medium text-white/55 hover:text-white transition-colors touch-manipulation"
          >
            Add verdict comment →
          </button>
        )}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */

function EligibleRow({
  obs,
  onAdd,
}: {
  obs: EligibleObservation;
  onAdd: () => void;
}) {
  const acsCount = obs.acs_evidenced?.length ?? 0;
  return (
    <div className="px-5 sm:px-6 py-3.5 flex items-start gap-3 flex-wrap">
      <div className="min-w-0 flex-1">
        <div className="text-[13px] font-medium text-white truncate">
          {obs.activity_title}
        </div>
        <div className="mt-0.5 flex items-center flex-wrap gap-x-2 gap-y-0.5 text-[11px] text-white/55 tabular-nums">
          <span>{formatDate(obs.observed_at)}</span>
          {obs.student_name_snapshot && (
            <>
              <span className="text-white/25">·</span>
              <span className="truncate max-w-[160px]">
                {obs.student_name_snapshot}
              </span>
            </>
          )}
          {obs.assessor_name_snapshot && (
            <>
              <span className="text-white/25">·</span>
              <span className="truncate max-w-[160px]">
                Assessor: {obs.assessor_name_snapshot}
              </span>
            </>
          )}
          {obs.outcome && (
            <>
              <span className="text-white/25">·</span>
              <span className="capitalize">{obs.outcome.replace(/_/g, ' ')}</span>
            </>
          )}
          {acsCount > 0 && (
            <>
              <span className="text-white/25">·</span>
              <span>{acsCount} AC{acsCount === 1 ? '' : 's'}</span>
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
