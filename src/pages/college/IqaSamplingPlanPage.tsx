import { useState, type ReactNode } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useCollegeCan } from '@/hooks/useCollegeCan';
import { supabase } from '@/integrations/supabase/client';
import { openEvidence } from '@/lib/evidenceUrl';
import { LoadingState, textareaClass } from '@/components/college/primitives';
import { HubBody, HubMasthead, HubPage } from '@/components/hub/HubPrimitives';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import {
  COLLEGE_BTN,
  COLLEGE_CARD,
  COLLEGE_LIST,
  COLLEGE_LINK,
  CollegeEmpty,
  CollegePageHeader,
  CollegeSectionTitle,
} from '@/components/college/ui/CollegeUi';
import { AreaHero } from '@/components/college/student360/Student360AreaHeroes';
import { Ring } from '@/components/college/student360/Student360Visuals';
import { SegmentBar, StatusPill, type Tone as QTone } from '@/components/college/quality/QualityKit';
import { IqaFlowStrip, type FlowStep } from '@/components/college/quality/IqaVisuals';
import { useIqaFindings, isFindingOpen } from '@/hooks/useIqaFindings';
import {
  useIqaSamplingPlan,
  type IqaSampleRow,
  type EligibleObservation,
  type EligibleOtjEntry,
  type EligibleDecision,
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

const VERDICT_TONE: Record<SampleVerdict, QTone> = {
  pending: 'neutral',
  agree: 'good',
  disagree: 'bad',
  refer: 'warn',
};

const HELP: PageHelpContent = {
  id: 'college-iqa-sampling-plan',
  title: 'A sampling plan',
  what: 'One IQA sampling plan: the assessor decisions you have picked to check, your verdict on each, and any actions raised from them.',
  steps: [
    { title: 'Pick what to sample', body: 'Add the assessor\'s assessment decisions, observations or verified off-the-job entries from the lists below, one at a time or a handful at random. Each one counts toward the plan\'s percentage.' },
    { title: 'Give a verdict', body: 'Mark each sample agree, disagree or returned, and add a short rationale. On a decision, agree confirms it for the learner and returned sends it back. On a keyboard, focus a sample and press 1 to 4.' },
    { title: 'Returned work', body: 'Disagree or returned opens an action for the assessor and tells them, with a link to the learner. They close it once they have looked again.' },
    { title: 'Raise a finding', body: 'For anything wider than one decision, raise a finding with the details filled in, so it gets an action plan, an owner and a due date.' },
    { title: 'Close the loop', body: 'Close findings on the IQA dashboard once they are resolved. The plan is done when the target is met and every action is closed.' },
  ],
  notes: [
    { title: 'View evidence', body: 'Opens the file the assessor or apprentice attached, so you check the same evidence the decision was based on. For a decision it opens the learner\'s Assess section.' },
    { title: 'Never your own work', body: 'You cannot sample or give a verdict on a decision you made yourself.' },
    { title: 'New assessors', body: 'A plan for an assessor in their first six months is set to 100%.' },
  ],
};

const VERDICT_LABEL: Record<SampleVerdict, string> = {
  pending: 'Awaiting verdict',
  agree: 'Agree',
  disagree: 'Disagree',
  refer: 'Returned',
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
  // ELE-1898: sampling and verdicts are IQA work (college_can 'iqa.sample'),
  // the same check the samples policy makes. Others read the plan.
  const { can } = useCollegeCan();
  const canIqa = can('iqa.sample');
  const [visibleEligible, setVisibleEligible] = useState(50);
  const [visibleEligibleOtj, setVisibleEligibleOtj] = useState(50);
  const [findingPrefill, setFindingPrefill] = useState<AddIqaFindingPrefill | null>(null);
  const [pickingObs, setPickingObs] = useState(false);
  const [pickingOtj, setPickingOtj] = useState(false);
  const [pickingDec, setPickingDec] = useState(false);
  const [visibleDecisions, setVisibleDecisions] = useState(50);
  const { findings: allFindings } = useIqaFindings();

  const shell = (body: ReactNode) => (
    <HubPage ground="landing">
      <HubMasthead section="College" title="Sampling plan" backTo="/college/iqa" />
      <HubBody hidePushPrompt>{body}</HubBody>
    </HubPage>
  );

  if (!id) {
    return shell(<CollegeEmpty title="No plan chosen" body="Open a sampling plan from the IQA dashboard." />);
  }

  if (data.loading && !data.plan) {
    return shell(<LoadingState />);
  }

  if (!data.plan) {
    return shell(
      <CollegeEmpty
        title="This sampling plan could not be loaded"
        body="It may have been deleted, or it belongs to another college. Go back to the IQA dashboard to pick another plan."
        action={
          <button type="button" onClick={() => navigate('/college/iqa')} className={COLLEGE_BTN}>
            Open the IQA dashboard
          </button>
        }
      />
    );
  }

  const { plan, samples, eligible, eligibleOtj, eligibleDecisions } = data;

  const target = plan.target_sample_percent ?? 0;
  // The stored total can lag behind the samples taken, so never let the
  // sampled share pass 100%.
  const total = Math.max(
    (plan.total_assessments ?? 0) || eligible.length + eligibleOtj.length + eligibleDecisions.length + samples.length,
    samples.length
  );
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

  const handleAddDecision = async (decisionId: string) => {
    try {
      await data.addDecisionSample(decisionId);
      toast({ title: 'Decision added to sample' });
    } catch (e) {
      toast({ title: 'Add failed', description: (e as Error).message, variant: 'destructive' });
    }
  };

  const pickRandomDecisions = async (n: number) => {
    if (eligibleDecisions.length === 0 || pickingDec) return;
    setPickingDec(true);
    try {
      const pool = [...eligibleDecisions];
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
      let added = 0;
      for (const p of pool.slice(0, Math.min(n, pool.length))) {
        try {
          await data.addDecisionSample(p.id);
          added += 1;
        } catch {
          /* one row failing shouldn't kill the rest */
        }
      }
      toast({
        title: `Added ${added} random decision${added === 1 ? '' : 's'}`,
        description: 'Give each a verdict in the sample list above.',
      });
    } finally {
      setPickingDec(false);
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
    if (sample.decision_id || sample.portfolio_item_id) {
      // A decision or evidence item is judged in the learner's Assess section.
      const { data: st } = await supabase
        .from('college_students')
        .select('id')
        .eq('user_id', sample.learner_user_id ?? '')
        .eq('college_id', plan.college_id ?? '')
        .maybeSingle();
      const sid = (st as { id?: string } | null)?.id;
      if (!sid) {
        toast({ title: 'Learner not found', description: 'This learner is no longer on the college roll.' });
        return;
      }
      navigate(`/college?section=student360&studentId=${sid}#assess`);
      return;
    }
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

  const verdictCounts = {
    agree: samples.filter((s) => s.verdict === 'agree').length,
    disagree: samples.filter((s) => s.verdict === 'disagree').length,
    refer: samples.filter((s) => s.verdict === 'refer').length,
    pending: samples.filter((s) => s.verdict === 'pending').length,
  };
  const decided = verdictCounts.agree + verdictCounts.disagree + verdictCounts.refer;
  const agreePct = decided > 0 ? Math.round((verdictCounts.agree / decided) * 100) : null;
  const sampleIds = new Set(samples.map((s) => s.id));
  const planFindings = allFindings.filter((f) => f.sample_id && sampleIds.has(f.sample_id));
  const raisedCount = Math.max(
    planFindings.length,
    samples.reduce((n, s) => n + (data.findingCountBySample.get(s.id) ?? 0), 0)
  );
  const closedCount = planFindings.filter((f) => !isFindingOpen(f)).length;
  const needsAction = verdictCounts.disagree + verdictCounts.refer;
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const flow: FlowStep[] = [
    {
      key: 'plan',
      label: 'Plan',
      value: `Target ${target}%`,
      sub: `${formatDate(plan.period_start)} to ${formatDate(plan.period_end)}`,
      state: 'done',
    },
    {
      key: 'sample',
      label: 'Sample',
      value: `${samples.length} of ${total}`,
      sub: onTrack ? `${sampledPct}% sampled, target met` : `${sampledPct}% sampled, below target`,
      state: onTrack ? 'done' : 'now',
      onClick: () => scrollTo(samples.length === 0 ? 'iqa-eligible' : 'iqa-samples'),
    },
    {
      key: 'verdict',
      label: 'Verdict',
      value: `${decided} given`,
      sub: verdictCounts.pending > 0 ? `${verdictCounts.pending} awaiting a verdict` : samples.length ? 'Every sample has a verdict' : 'Sample first',
      state: samples.length === 0 ? 'todo' : verdictCounts.pending > 0 ? 'now' : 'done',
      onClick: () => scrollTo('iqa-samples'),
    },
    {
      key: 'actions',
      label: 'Actions',
      value: `${raisedCount} raised`,
      sub: needsAction > 0 ? `${needsAction} disagree or refer back` : 'No disagreements',
      state: needsAction === 0 ? (decided > 0 ? 'done' : 'todo') : raisedCount >= needsAction ? 'done' : 'now',
      onClick: () => scrollTo('iqa-samples'),
    },
    {
      key: 'closure',
      label: 'Closure',
      value: `${closedCount} closed`,
      sub:
        raisedCount > 0
          ? `${Math.max(0, raisedCount - closedCount)} still open`
          : needsAction > 0
            ? 'Raise the actions first'
            : 'Nothing to close',
      state:
        raisedCount === 0
          ? needsAction === 0 && onTrack && verdictCounts.pending === 0 && samples.length > 0
            ? 'done'
            : 'todo'
          : closedCount >= raisedCount && raisedCount >= needsAction
            ? 'done'
            : 'now',
      onClick: () => navigate('/college/iqa'),
    },
  ];

  const pickButtons = (kind: 'obs' | 'otj' | 'dec') => {
    const pool = kind === 'obs' ? eligible.length : kind === 'dec' ? eligibleDecisions.length : eligibleOtj.length;
    const busy = kind === 'obs' ? pickingObs : kind === 'dec' ? pickingDec : pickingOtj;
    if (pool === 0 || !canIqa) return null;
    return (
      <div className="flex items-center gap-2">
        {(pool >= 10 ? [5, 10] : pool > 5 ? [5, pool] : [pool]).map((n) => (
          <button
            key={n}
            type="button"
            onClick={() =>
              kind === 'obs' ? pickRandomObservations(n) : kind === 'dec' ? pickRandomDecisions(n) : pickRandomOtj(n)
            }
            disabled={busy}
            className={COLLEGE_BTN}
            title={`Randomly pick ${n} unsampled ${kind === 'obs' ? 'observations' : 'OTJ entries'}`}
          >
            {busy ? 'Picking…' : n === pool ? `Sample all ${n}` : `Pick ${n} at random`}
          </button>
        ))}
      </div>
    );
  };

  return (
    <HubPage ground="landing">
      <HubMasthead
        section="College"
        title="Sampling plan"
        backTo="/college/iqa"
      />
      <HubBody pushContext="Get notified when IQA findings fall due and samples need a verdict">
        <CollegePageHeader
          eyebrow="IQA sampling plan"
          title={`${plan.qualification_code ?? 'All qualifications'}${plan.unit_code ? ` · ${plan.unit_code}` : ''}`}
          description={
            <>
              {formatDate(plan.period_start)} to {formatDate(plan.period_end)}
              {plan.iqa_name_snapshot ? `. IQA: ${plan.iqa_name_snapshot}` : ''}. Sample the assessor's decisions, give a verdict on each and raise any actions.
            </>
          }
          help={HELP}
          actions={
            <StatusPill tone={onTrack ? 'good' : 'warn'} className="h-9 px-3.5 text-[12.5px]">
              {onTrack ? 'On track' : 'Catching up'}
            </StatusPill>
          }
        />

        <IqaFlowStrip steps={flow} title="Where this plan is" />

        <AreaHero
          figures={[
            { label: 'Sampled', value: `${samples.length}/${total}`, sub: `${sampledPct}% of decisions`, good: onTrack, warn: !onTrack },
            { label: 'Target', value: `${target}%`, sub: onTrack ? 'Met' : `${Math.max(0, Math.ceil((target / 100) * total) - samples.length)} more to sample` },
            {
              label: 'Agreement',
              value: agreePct === null ? '—' : `${agreePct}%`,
              sub: `${verdictCounts.agree} of ${decided} verdicts agree`,
              warn: agreePct !== null && agreePct < 80,
              good: agreePct !== null && agreePct >= 90,
            },
            { label: 'Awaiting verdict', value: String(verdictCounts.pending), sub: 'Samples still to judge', warn: verdictCounts.pending > 0 },
          ]}
          chartTitle="Verdicts on this plan"
          chart={
            <SegmentBar
              emptyText="No samples yet. Pick from the lists below."
              segments={[
                { label: 'Agree', n: verdictCounts.agree, tone: 'good' },
                { label: 'Disagree', n: verdictCounts.disagree, tone: 'bad' },
                { label: 'Returned', n: verdictCounts.refer, tone: 'warn' },
                { label: 'Awaiting verdict', n: verdictCounts.pending, tone: 'neutral' },
              ]}
            />
          }
          side={
            <div className="flex justify-center">
              <Ring
                pct={total > 0 ? Math.min(100, (sampledPct / Math.max(1, target)) * 100) : 0}
                value={`${sampledPct}%`}
                label="Sampled against target"
                sub={`Target ${target}%`}
                warn={!onTrack}
                onClick={() => scrollTo('iqa-eligible')}
              />
            </div>
          }
        />

        {plan.notes && (
          <div className={COLLEGE_CARD}>
            <p className="text-[12px] font-medium text-white">Plan notes</p>
            <p className="mt-1 whitespace-pre-wrap text-[13.5px] leading-relaxed text-white">{plan.notes}</p>
          </div>
        )}

        {/* Samples — already in scope */}
        <motion.section initial="hidden" animate="visible" className="space-y-4">
          <CollegeSectionTitle
            id="iqa-samples"
            title={`In the sample · ${samples.length}`}
            sub="Give each a verdict. Disagree or returned opens an action for the assessor."
          />
          {samples.length === 0 ? (
            <CollegeEmpty
              title="Nothing sampled yet"
              body="Pick assessment decisions, observations or off-the-job entries from the lists below to add them to your sample, then mark each with a verdict."
              action={
                <button type="button" onClick={() => scrollTo('iqa-eligible')} className={COLLEGE_LINK}>
                  Go to the lists
                </button>
              }
            />
          ) : (
            <div className="grid grid-cols-1 items-stretch gap-3 xl:grid-cols-2">
              {samples.map((s) => (
                <SampleCard
                  key={s.id}
                  sample={s}
                  readOnly={!canIqa}
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
                      : s.decision_id || s.portfolio_item_id
                        ? (s.target_title_snapshot ?? 'Assessment decision')
                        : (s.observation_title_snapshot ?? 'Observation');
                    const rationale = s.comments?.trim() ? `Rationale: ${s.comments.trim()}` : '';
                    const description = [
                      `Raised from IQA sample, verdict: ${VERDICT_LABEL[s.verdict].toLowerCase()}`,
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

        {!canIqa ? (
          <p className="rounded-xl border border-white/[0.10] bg-white/[0.04] p-4 text-[13px] leading-relaxed text-white">
            You can read this plan. Only an IQA, a quality nominee or a manager can add samples or give verdicts.
          </p>
        ) : null}
        {/* ELE-1871: the assessor's decisions in the period, the core of the plan. */}
        <section className={cn('space-y-4', !canIqa && 'hidden')}>
          <CollegeSectionTitle
            title={`Assessment decisions to sample · ${eligibleDecisions.length}`}
            sub="Decisions this assessor recorded in the plan's period. Agree confirms the decision for the learner; returned sends it back to the assessor."
          />
          {pickButtons('dec')}
          {eligibleDecisions.length === 0 ? (
            <CollegeEmpty
              title="No decisions to sample"
              body={`No assessment decisions in this period${plan.assessor_id ? ' for this assessor' : ''}${plan.qualification_code ? ` on ${plan.qualification_code}` : ''}, or every one is already in the sample.`}
            />
          ) : (
            <>
              <div className={COLLEGE_LIST}>
                {eligibleDecisions.slice(0, visibleDecisions).map((d) => (
                  <EligibleDecisionRow key={d.id} dec={d} onAdd={() => handleAddDecision(d.id)} />
                ))}
              </div>
              {eligibleDecisions.length > visibleDecisions && (
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[12.5px] tabular-nums text-white">
                    Showing {Math.min(visibleDecisions, eligibleDecisions.length)} of {eligibleDecisions.length}
                  </p>
                  <button type="button" onClick={() => setVisibleDecisions((n) => n + 50)} className={COLLEGE_LINK}>
                    Load more
                  </button>
                </div>
              )}
            </>
          )}
        </section>

        <div id="iqa-eligible" className={cn('grid scroll-mt-20 grid-cols-1 items-start gap-8 xl:grid-cols-2 xl:gap-5', !canIqa && 'hidden')}>
          {/* Eligible observations — pickable */}
          <section className="space-y-4">
            <CollegeSectionTitle
              title={`Observations to sample · ${eligible.length}`}
              sub="Recorded in this plan's period and not yet sampled"
            />
            {pickButtons('obs')}
            {eligible.length === 0 ? (
              <CollegeEmpty
                title="No observations to sample"
                body={`None in this period${plan.assessor_id ? ' for this assessor' : ''}${plan.qualification_code ? ` on ${plan.qualification_code}` : ''}. Widen the plan's filters or wait for new observations to be recorded.`}
              />
            ) : (
              <>
                <div className={COLLEGE_LIST}>
                  {eligible.slice(0, visibleEligible).map((o) => (
                    <EligibleRow key={o.id} obs={o} onAdd={() => handleAdd(o.id)} />
                  ))}
                </div>
                {eligible.length > visibleEligible && (
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[12.5px] tabular-nums text-white">
                      Showing {Math.min(visibleEligible, eligible.length)} of {eligible.length}
                    </p>
                    <button type="button" onClick={() => setVisibleEligible((n) => n + 50)} className={COLLEGE_LINK}>
                      Load more
                    </button>
                  </div>
                )}
              </>
            )}
          </section>

          {/* Eligible OTJ entries — assessor-verified entries the IQA can sample
              to check the assessor's verdict. Only shows entries within the
              plan's period and (when set) verified by the plan's assessor. */}
          <section className="space-y-4">
            <CollegeSectionTitle
              title={`Off-the-job entries to sample · ${eligibleOtj.length}`}
              sub="Assessor-verified in this period. Check the assessor's sign-off was sound."
            />
            {pickButtons('otj')}
            {eligibleOtj.length === 0 ? (
              <CollegeEmpty
                title="No verified entries to sample"
                body={`No assessor-verified off-the-job entries in this period${plan.assessor_id ? ' for this assessor' : ''}. They appear here once the assessor signs off submissions.`}
              />
            ) : (
              <div className={COLLEGE_LIST}>
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
              <div className="flex items-center justify-between gap-3">
                <p className="text-[12.5px] tabular-nums text-white">
                  Showing {Math.min(visibleEligibleOtj, eligibleOtj.length)} of {eligibleOtj.length}
                </p>
                <button type="button" onClick={() => setVisibleEligibleOtj((n) => n + 50)} className={COLLEGE_LINK}>
                  Load more
                </button>
              </div>
            )}
          </section>
        </div>

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
      </HubBody>
    </HubPage>
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
  readOnly = false,
}: {
  sample: IqaSampleRow;
  /** Not an IQA here: show the verdict, hide the controls. */
  readOnly?: boolean;
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
      aria-label={`Sample ${sample.target_title_snapshot ?? sample.observation_title_snapshot ?? sample.otj_title_snapshot ?? 'untitled'}. Keyboard 1 to 4 sets the verdict`}
      className={cn(COLLEGE_CARD, 'flex h-full flex-col outline-none focus-visible:border-elec-yellow/60')}
    >
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <StatusPill tone={verdictTone}>{VERDICT_LABEL[sample.verdict]}</StatusPill>
            {linkedFindingCount > 0 && (
              <span
                className="inline-flex h-6 items-center rounded-full border border-orange-400/50 px-2.5 text-[11.5px] font-semibold text-white"
                title={`${linkedFindingCount} IQA finding${linkedFindingCount === 1 ? '' : 's'} raised from this sample`}
              >
                {linkedFindingCount} finding{linkedFindingCount === 1 ? '' : 's'}
              </span>
            )}
            <span className="text-[12px] text-white tabular-nums">
              Sampled {formatDate(sample.sampled_at)}
            </span>
            {sample.iqa_name_snapshot && (
              <>
                <span className="text-white">·</span>
                <span className="text-[12px] text-white">by {sample.iqa_name_snapshot}</span>
              </>
            )}
          </div>
          <h3 className="mt-1.5 text-[14px] font-medium text-white flex items-center gap-2">
            <span
              className={cn(
                'inline-flex items-center h-5 px-1.5 rounded-md border text-[10px] font-semibold uppercase tracking-[0.16em]',
                sample.otj_id
                  ? 'border-emerald-400/40 text-white'
                  : sample.decision_id || sample.portfolio_item_id
                    ? 'border-elec-yellow/50 text-white'
                    : 'border-sky-400/40 text-white'
              )}
            >
              {sample.otj_id ? 'OTJ' : sample.decision_id ? 'Decision' : sample.portfolio_item_id ? 'Evidence' : 'Observation'}
            </span>
            <span className="truncate">
              {sample.otj_id
                ? (sample.otj_title_snapshot ?? 'OTJ entry')
                : sample.decision_id || sample.portfolio_item_id
                  ? (sample.target_title_snapshot ?? 'Assessment decision')
                  : (sample.observation_title_snapshot ?? 'Observation')}
            </span>
          </h3>
          <div className="mt-0.5 text-[12px] text-white tabular-nums">
            {sample.otj_id ? 'Activity' : sample.decision_id ? 'Decided' : sample.portfolio_item_id ? 'Added' : 'Observed'}{' '}
            {formatDate(
              sample.otj_id
                ? sample.otj_date_snapshot
                : sample.decision_id || sample.portfolio_item_id
                  ? sample.target_date_snapshot
                  : sample.observation_date_snapshot
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
              disabled={readOnly}
              onClick={() => onSetVerdict(v, comments)}
              className={cn(
                'h-11 px-3.5 rounded-full text-[12.5px] font-medium border transition-colors touch-manipulation inline-flex items-center gap-1.5',
                active
                  ? tone === 'good'
                    ? 'bg-emerald-500/[0.18] border-emerald-400/60 text-white font-semibold'
                    : tone === 'bad'
                      ? 'bg-red-500/[0.18] border-red-400/60 text-white font-semibold'
                      : tone === 'warn'
                        ? 'bg-orange-500/[0.18] border-orange-400/60 text-white font-semibold'
                        : 'bg-white/[0.12] border-white/[0.4] text-white font-semibold'
                  : 'bg-white/[0.04] border-white/[0.12] text-white hover:border-white/[0.3]'
              )}
              title={`Set verdict (keyboard: ${VERDICT_SHORTCUT[v]})`}
            >
              <span
                aria-hidden
                className="hidden h-4 w-4 items-center justify-center rounded bg-white/[0.08] font-mono text-[10px] tabular-nums text-white lg:inline-flex"
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
          className={cn(COLLEGE_BTN, 'h-11')}
        >
          {sample.decision_id || sample.portfolio_item_id ? 'Open learner' : 'View evidence'}
        </button>
        {!readOnly && (sample.verdict === 'disagree' || sample.verdict === 'refer') && (
          <button
            type="button"
            onClick={onPromoteToFinding}
            className="inline-flex h-11 items-center rounded-xl border border-orange-400/60 px-4 text-[13px] font-semibold text-white transition-colors touch-manipulation hover:bg-orange-500/[0.12]"
            title="Raise an IQA finding from this sample"
          >
            Raise finding
          </button>
        )}
        {!readOnly && (
        <button
          type="button"
          onClick={onRemove}
          className="h-11 rounded-xl px-3 text-[13px] font-medium text-white transition-colors touch-manipulation hover:bg-red-500/[0.10]"
        >
          Remove
        </button>
        )}
      </div>

      <div className="mt-auto pt-3"><div className="border-t border-white/[0.06] pt-3">
        {readOnly ? (
          <p className="text-[13px] leading-relaxed text-white">{sample.comments || 'No verdict comment.'}</p>
        ) : editing ? (
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
                className="h-11 px-4 rounded-xl text-[12.5px] font-medium text-white transition-colors touch-manipulation"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={persistComments}
                className="h-11 px-4 rounded-xl bg-elec-yellow text-black text-[12.5px] font-semibold hover:opacity-90 transition-opacity touch-manipulation"
              >
                Save comment
              </button>
            </div>
          </>
        ) : sample.comments ? (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="-mx-2 min-h-11 w-full rounded-md px-2 py-1 text-left text-[13px] leading-relaxed text-white transition-colors hover:bg-white/[0.04] touch-manipulation"
          >
            {sample.comments}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="h-11 text-[12.5px] font-semibold text-elec-yellow touch-manipulation"
          >
            Add verdict comment
          </button>
        )}
      </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */

function EligibleOtjRow({ otj, onAdd }: { otj: EligibleOtjEntry; onAdd: () => void }) {
  const hours = otj.duration_minutes != null ? `${(otj.duration_minutes / 60).toFixed(1)}h` : '—';
  const unitCount = otj.unit_codes?.length ?? 0;
  return (
    <div className="px-5 sm:px-6 py-3.5 flex items-center gap-3">
      <div className="min-w-0 flex-1">
        <div className="text-[13px] font-medium text-white truncate flex items-center gap-2">
          <span className="inline-flex items-center h-5 px-1.5 rounded-md border border-emerald-400/40 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
            OTJ
          </span>
          <span className="truncate">{otj.title}</span>
        </div>
        <div className="mt-0.5 flex items-center flex-wrap gap-x-2 gap-y-0.5 text-[12px] text-white tabular-nums">
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
        className="shrink-0 h-11 px-4 rounded-xl border border-elec-yellow/60 text-[13px] font-semibold text-white hover:bg-elec-yellow/[0.12] transition-colors touch-manipulation"
      >
        Add to sample
      </button>
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */

function EligibleRow({ obs, onAdd }: { obs: EligibleObservation; onAdd: () => void }) {
  const acsCount = obs.acs_evidenced?.length ?? 0;
  return (
    <div className="px-5 sm:px-6 py-3.5 flex items-center gap-3">
      <div className="min-w-0 flex-1">
        <div className="text-[13px] font-medium text-white truncate">{obs.activity_title}</div>
        <div className="mt-0.5 flex items-center flex-wrap gap-x-2 gap-y-0.5 text-[12px] text-white tabular-nums">
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
        className="shrink-0 h-11 px-4 rounded-xl border border-elec-yellow/60 text-[13px] font-semibold text-white hover:bg-elec-yellow/[0.12] transition-colors touch-manipulation"
      >
        Add to sample
      </button>
    </div>
  );
}

/* ──────────────────────────────────────────────────────── */

const DECISION_LABEL: Record<EligibleDecision['decision'], string> = {
  passed: 'Passed',
  referred: 'Needs more',
  not_yet: 'Not yet',
};

function EligibleDecisionRow({ dec, onAdd }: { dec: EligibleDecision; onAdd: () => void }) {
  return (
    <div className="flex items-center gap-3 px-5 py-3.5 sm:px-6">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 truncate text-[13px] font-medium text-white">
          <span className="inline-flex h-5 items-center rounded-md border border-elec-yellow/50 px-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
            Decision
          </span>
          <span className="truncate">
            Unit {dec.unit_code} AC {dec.ac_code} · {DECISION_LABEL[dec.decision]}
          </span>
        </div>
        <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[12px] tabular-nums text-white">
          <span>{formatDate(dec.decided_at)}</span>
          {dec.student_name && (
            <>
              <span className="text-white">·</span>
              <span className="max-w-[160px] truncate">{dec.student_name}</span>
            </>
          )}
          {dec.assessor_name && (
            <>
              <span className="text-white">·</span>
              <span className="max-w-[160px] truncate">Assessor: {dec.assessor_name}</span>
            </>
          )}
          {dec.iqa_verdict && (
            <>
              <span className="text-white">·</span>
              <span>{dec.iqa_verdict === 'confirmed' ? 'Already confirmed' : 'Already returned'}</span>
            </>
          )}
        </div>
      </div>
      <button
        type="button"
        onClick={onAdd}
        className="h-11 shrink-0 touch-manipulation rounded-xl border border-elec-yellow/60 px-4 text-[13px] font-semibold text-white transition-colors hover:bg-elec-yellow/[0.12]"
      >
        Add to sample
      </button>
    </div>
  );
}
