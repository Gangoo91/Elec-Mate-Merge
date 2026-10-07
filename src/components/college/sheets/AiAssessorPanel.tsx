import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAiAssessor, type AiVerdict, type AiAcAnalysis } from '@/hooks/useAiAssessor';

/* ==========================================================================
   AiAssessorPanel — sits inside PortfolioSubmissionDrawer.
   "Draft an assessment from the evidence" (ELE-1929: named by what it does).
   The AI drafts; the assessor ticks that they have checked it, and it is
   KEPT AS A HELD DRAFT (portfolio_ai_feedback_drafts), never written onto the
   submission (ELE-1926). The learner cannot read it. It is offered in the
   decision sheet; when the assessor records a decision with it,
   record_ac_decisions copies it onto the submission with feedback_source
   'ai_draft_confirmed' and feedback_confirmed_at / by, and the learner sees
   "Drafted with AI, confirmed by <name> on <date>". Never auto-approved.
   ========================================================================== */

const VERDICT_TEXT: Record<AiVerdict, string> = {
  pass: 'text-emerald-400',
  partial: 'text-orange-300',
  refer: 'text-red-300',
  not_yet: 'text-orange-300',
};

const VERDICT_LABEL: Record<AiVerdict, string> = {
  pass: 'Pass',
  partial: 'Partial',
  refer: 'Refer',
  not_yet: 'Not yet',
};

const AC_STATUS_TEXT: Record<AiAcAnalysis['status'], string> = {
  evidenced: 'text-emerald-400',
  partial: 'text-orange-300',
  missing: 'text-red-300',
};

const AC_STATUS_LABEL: Record<AiAcAnalysis['status'], string> = {
  evidenced: 'Evidenced',
  partial: 'Partial',
  missing: 'Missing',
};

interface Props {
  submissionId: string;
  /** The learner's auth id: the held draft is filed against them. */
  learnerId: string | null;
  studentName: string;
  /** True when the submission already carries assessor feedback, which
   * applying the draft will overwrite — the panel warns before applying. */
  hasExistingFeedback?: boolean;
  onApplied?: () => void;
}

export function AiAssessorPanel({
  submissionId,
  learnerId,
  studentName,
  hasExistingFeedback = false,
  onApplied,
}: Props) {
  const ai = useAiAssessor();
  const { toast } = useToast();
  const [applying, setApplying] = useState(false);
  // ELE-1926: the AI text is a draft the assessor confirms before it is copied in.
  const [confirmed, setConfirmed] = useState(false);

  const handleAssess = () => {
    setConfirmed(false);
    void ai.assess(submissionId);
  };

  const handleApply = async () => {
    if (!ai.draft || !learnerId) return;
    setApplying(true);
    try {
      const { data: auth } = await supabase.auth.getUser();
      // One open draft per submission: a newer draft replaces the last.
      await supabase
        .from('portfolio_ai_feedback_drafts' as never)
        .update({ discarded_at: new Date().toISOString() } as never)
        .eq('submission_id', submissionId)
        .is('confirmed_at', null)
        .is('discarded_at', null);
      const d = ai.draft;
      const { error } = await supabase.from('portfolio_ai_feedback_drafts' as never).insert({
        learner_id: learnerId,
        submission_id: submissionId,
        created_by: auth.user?.id,
        source: 'ai_assessor',
        verdict: d.verdict,
        verdict_rationale: d.verdict_rationale,
        ac_analysis: d.ac_analysis,
        assessor_feedback: d.assessor_feedback,
        strengths_noted: d.strengths_noted,
        areas_for_improvement: d.areas_for_improvement,
        action_required: d.verdict === 'refer' || d.verdict === 'not_yet' ? d.verdict_rationale : null,
        checked_at: new Date().toISOString(),
      } as never);
      if (error) throw error;
      toast({
        title: 'Draft kept for your decision',
        description: `${studentName.split(' ')[0] || 'The learner'} cannot see it until you record a decision with it.`,
      });
      setConfirmed(false);
      ai.reset();
      onApplied?.();
    } catch (e) {
      toast({
        title: 'Could not keep the draft',
        description: (e as Error).message ?? 'Try again.',
        variant: 'destructive',
      });
    } finally {
      setApplying(false);
    }
  };

  const first = studentName.split(' ')[0];
  const shell =
    'rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025]';
  const quietBtn =
    'inline-flex h-11 items-center justify-center gap-1.5 rounded-xl border border-white/[0.14] px-3.5 text-[13px] font-semibold text-white transition-colors touch-manipulation hover:border-white/[0.3] disabled:opacity-40';
  const primaryBtn =
    'inline-flex h-11 items-center justify-center gap-1.5 rounded-xl bg-elec-yellow px-4 text-[13.5px] font-semibold text-black transition-opacity touch-manipulation hover:opacity-90 disabled:bg-white/[0.08] disabled:text-white';

  // ─── Idle ───
  if (ai.status === 'idle') {
    return (
      <div className={cn(shell, 'flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center')}>
        <div className="min-w-0 flex-1">
          <h3 className="text-[15px] font-semibold tracking-tight text-white">
            Draft an assessment from the evidence
          </h3>
          <p className="mt-1 text-[13px] leading-relaxed text-white">
            AI reads {first}&apos;s evidence and observations and drafts a verdict, criteria notes
            and feedback. It is a draft only: you read it, change what you need and make the
            decision yourself.
          </p>
        </div>
        <button type="button" onClick={handleAssess} className={cn(primaryBtn, 'shrink-0')}>
          Write a draft
        </button>
      </div>
    );
  }

  // ─── Streaming ───
  if (ai.status === 'streaming') {
    return (
      <div className={cn(shell, 'relative overflow-hidden')}>
        <div
          className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-elec-yellow to-transparent opacity-80"
          style={{ animation: 'shimmer 1.4s ease-in-out infinite' }}
        />
        <style>{`@keyframes shimmer { 0%,100% { transform: translateX(-30%); opacity: 0.4 } 50% { transform: translateX(30%); opacity: 1 } }`}</style>
        <div className="flex items-center gap-3 px-5 py-4">
          <div className="min-w-0 flex-1">
            <h3 className="text-[15px] font-semibold tracking-tight text-white">
              Writing a draft assessment…
            </h3>
            {ai.meta && (
              <p className="mt-1 text-[13px] tabular-nums text-white">
                Reading {ai.meta.evidence_count} evidence items
                {ai.meta.observation_count > 0
                  ? ` and ${ai.meta.observation_count} observations`
                  : ''}
              </p>
            )}
          </div>
          <button type="button" onClick={ai.stop} className={cn(quietBtn, 'shrink-0')}>
            Stop
          </button>
        </div>
      </div>
    );
  }

  // ─── Error ───
  if (ai.status === 'error') {
    return (
      <div className={cn(shell, 'flex items-center gap-3 border-red-500/30 px-5 py-4')}>
        <div className="min-w-0 flex-1">
          <h3 className="text-[15px] font-semibold tracking-tight text-red-300">
            The draft could not be written
          </h3>
          <p className="mt-1 text-[13px] leading-relaxed text-white">
            {ai.error ?? 'Something went wrong. Try again.'}
          </p>
        </div>
        <button type="button" onClick={handleAssess} className={cn(quietBtn, 'shrink-0')}>
          Try again
        </button>
      </div>
    );
  }

  // ─── Done ───
  if (ai.status === 'done' && ai.draft) {
    const d = ai.draft;
    return (
      <div className={cn(shell, 'overflow-hidden')}>
        <div className="flex flex-wrap items-start gap-3 border-b border-white/[0.08] px-5 py-4">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
              AI draft · not yet confirmed
            </p>
            <h3 className="mt-1 text-[15px] font-semibold tracking-tight text-white">
              Suggested verdict:{' '}
              <span className={VERDICT_TEXT[d.verdict]}>{VERDICT_LABEL[d.verdict]}</span>
            </h3>
            <p className="mt-1 text-[13px] leading-relaxed text-white">
              Written by AI from the evidence on file. Check every line against the evidence before
              you use it.
            </p>
          </div>
          <button type="button" onClick={ai.reset} className={cn(quietBtn, 'shrink-0')}>
            Discard
          </button>
        </div>

        <div className="space-y-5 px-5 py-4">
          {d.verdict_rationale && (
            <DraftBlock label="Why this verdict" text={d.verdict_rationale} />
          )}

          {d.ac_analysis.length > 0 && (
            <div>
              <h4 className="mb-2 text-sm font-semibold text-white">Assessment criteria</h4>
              <ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
                {d.ac_analysis.map((ac, i) => (
                  <li key={`${ac.ac_code}-${i}`} className="py-2.5 text-[13px] leading-snug">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono font-semibold tabular-nums text-white">
                        {ac.ac_code}
                      </span>
                      <span className={cn('text-[12px] font-semibold', AC_STATUS_TEXT[ac.status])}>
                        {AC_STATUS_LABEL[ac.status]}
                      </span>
                    </div>
                    <p className="mt-0.5 text-white">{ac.comment}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {d.strengths_noted && <DraftBlock label="Strengths" text={d.strengths_noted} />}
          {d.areas_for_improvement && (
            <DraftBlock label="Areas for development" text={d.areas_for_improvement} />
          )}
          {d.assessor_feedback && (
            <DraftBlock label="Feedback to the learner" text={d.assessor_feedback} />
          )}
        </div>

        <div className="space-y-3 border-t border-white/[0.08] px-5 py-4">
          <label className="flex cursor-pointer items-start gap-3 touch-manipulation">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="mt-0.5 h-5 w-5 shrink-0 accent-elec-yellow"
            />
            <span className="text-[13px] leading-relaxed text-white">
              I have read this AI draft and checked it against the evidence. Keeping it does not
              sign anything off or show it to the learner; it is offered when I record the decision.
            </span>
          </label>
          {hasExistingFeedback && (
            <p className="text-[13px] leading-relaxed text-orange-300">
              This submission already has feedback. If you record a decision with this draft, it replaces
              that feedback.
            </p>
          )}
          <div className="flex flex-wrap items-center gap-2">
            <button type="button" onClick={handleAssess} disabled={applying} className={quietBtn}>
              Write it again
            </button>
            <button
              type="button"
              onClick={handleApply}
              disabled={applying || !confirmed || !learnerId}
              className={cn(primaryBtn, 'ml-auto')}
            >
              {applying ? 'Keeping…' : 'Keep it for my decision'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

/* ──────────────────────────────────────────────────────── */

function DraftBlock({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <h4 className="mb-1 text-sm font-semibold text-white">{label}</h4>
      <p className="whitespace-pre-line text-[13px] leading-relaxed text-white">{text}</p>
    </div>
  );
}
