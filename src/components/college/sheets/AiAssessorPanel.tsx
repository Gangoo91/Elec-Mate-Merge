import { useState } from 'react';
import { Wand2, RotateCw, Check, X, Square } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Pill, type Tone } from '@/components/college/primitives';
import {
  useAiAssessor,
  type AiVerdict,
  type AiAcAnalysis,
} from '@/hooks/useAiAssessor';

/* ==========================================================================
   AiAssessorPanel — sits inside PortfolioSubmissionDrawer.
   Sleek, restrained, modern. The AI drafts; the human always reviews and
   signs off — never auto-approved.
   ========================================================================== */

const VERDICT_TONE: Record<AiVerdict, Tone> = {
  pass: 'emerald',
  partial: 'amber',
  refer: 'red',
  not_yet: 'blue',
};

const VERDICT_LABEL: Record<AiVerdict, string> = {
  pass: 'Pass',
  partial: 'Partial',
  refer: 'Refer',
  not_yet: 'Not yet',
};

const AC_STATUS_DOT: Record<AiAcAnalysis['status'], string> = {
  evidenced: 'bg-emerald-400',
  partial: 'bg-amber-400',
  missing: 'bg-red-400',
};

const AC_STATUS_LABEL: Record<AiAcAnalysis['status'], string> = {
  evidenced: 'Evidenced',
  partial: 'Partial',
  missing: 'Missing',
};

interface Props {
  submissionId: string;
  studentName: string;
  onApplied?: () => void;
}

export function AiAssessorPanel({ submissionId, studentName, onApplied }: Props) {
  const ai = useAiAssessor();
  const { toast } = useToast();
  const [applying, setApplying] = useState(false);

  const handleAssess = () => {
    void ai.assess(submissionId);
  };

  const handleApply = async () => {
    if (!ai.draft) return;
    setApplying(true);
    try {
      const { error } = await supabase
        .from('portfolio_submissions')
        .update({
          assessor_feedback: ai.draft.assessor_feedback,
          strengths_noted: ai.draft.strengths_noted,
          areas_for_improvement: ai.draft.areas_for_improvement,
          action_required:
            ai.draft.verdict === 'refer' || ai.draft.verdict === 'not_yet'
              ? ai.draft.verdict_rationale
              : null,
          last_feedback_at: new Date().toISOString(),
        })
        .eq('id', submissionId);
      if (error) throw error;
      toast({
        title: 'Draft applied',
        description: 'Review and sign off when ready.',
      });
      ai.reset();
      onApplied?.();
    } catch (e) {
      toast({
        title: 'Could not apply',
        description: (e as Error).message ?? 'Try again.',
        variant: 'destructive',
      });
    } finally {
      setApplying(false);
    }
  };

  // ─── Idle ───
  if (ai.status === 'idle') {
    return (
      <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] px-5 py-4 flex items-center gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
              AI Assessor
            </span>
            <span className="inline-flex items-center h-4 px-1.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-[9px] font-medium tracking-[0.06em] uppercase text-white/85">
              Beta
            </span>
          </div>
          <p className="mt-1 text-[12.5px] text-white/85 leading-relaxed">
            Drafts a verdict and feedback for {studentName.split(' ')[0]} from the
            evidence on file. You review and sign off.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAssess}
          className="h-10 px-4 rounded-full bg-elec-yellow text-black text-[12.5px] font-semibold hover:bg-elec-yellow/90 active:scale-[0.98] transition-all touch-manipulation flex-shrink-0 inline-flex items-center gap-1.5"
        >
          <Wand2 className="h-3.5 w-3.5" strokeWidth={2.5} />
          Draft assessment
        </button>
      </div>
    );
  }

  // ─── Streaming ───
  if (ai.status === 'streaming') {
    return (
      <div className="relative rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] overflow-hidden">
        {/* Animated thin progress line */}
        <div
          className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-elec-yellow to-transparent opacity-80"
          style={{ animation: 'shimmer 1.4s ease-in-out infinite' }}
        />
        <style>{`@keyframes shimmer { 0%,100% { transform: translateX(-30%); opacity: 0.4 } 50% { transform: translateX(30%); opacity: 1 } }`}</style>

        <div className="px-5 py-4 flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                AI Assessor
              </span>
              <span className="text-[10.5px] text-white/85 tabular-nums">
                Drafting…
              </span>
            </div>
            {ai.meta && (
              <div className="mt-1 text-[11px] text-white/85 tabular-nums">
                Reading {ai.meta.evidence_count} evidence items
                {ai.meta.observation_count > 0
                  ? ` · ${ai.meta.observation_count} observations`
                  : ''}
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={ai.stop}
            className="h-9 px-3 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11.5px] font-medium text-white/85 hover:text-white hover:border-white/[0.18] transition-colors touch-manipulation inline-flex items-center gap-1.5"
          >
            <Square className="h-3 w-3" fill="currentColor" />
            Stop
          </button>
        </div>
      </div>
    );
  }

  // ─── Error ───
  if (ai.status === 'error') {
    return (
      <div className="rounded-2xl border border-red-500/[0.2] bg-[hsl(0_0%_12%)] px-5 py-4 flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-red-300">
            AI Assessor failed
          </div>
          <p className="mt-1 text-[12.5px] text-white/85 leading-relaxed">
            {ai.error ?? 'Something went wrong. Try again.'}
          </p>
        </div>
        <button
          type="button"
          onClick={handleAssess}
          className="h-9 px-3 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11.5px] font-medium text-white/85 hover:text-white hover:border-white/[0.18] transition-colors touch-manipulation inline-flex items-center gap-1.5 flex-shrink-0"
        >
          <RotateCw className="h-3 w-3" />
          Retry
        </button>
      </div>
    );
  }

  // ─── Done ───
  if (ai.status === 'done' && ai.draft) {
    const d = ai.draft;
    return (
      <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-white/[0.06] flex items-center gap-3 flex-wrap">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                AI Assessor draft
              </span>
              <Pill tone={VERDICT_TONE[d.verdict]}>{VERDICT_LABEL[d.verdict]}</Pill>
            </div>
            <div className="mt-0.5 text-[11px] text-white/85">
              Suggested — review before signing off
            </div>
          </div>
          <button
            type="button"
            onClick={ai.reset}
            className="h-7 px-2.5 rounded-full text-[10.5px] font-medium text-white/85 hover:text-white transition-colors touch-manipulation inline-flex items-center gap-1"
          >
            <X className="h-3 w-3" />
            Discard
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 space-y-4">
          {d.verdict_rationale && (
            <DraftBlock label="Rationale" text={d.verdict_rationale} />
          )}

          {d.ac_analysis.length > 0 && (
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white mb-2">
                AC analysis
              </div>
              <ul className="space-y-1.5">
                {d.ac_analysis.map((ac, i) => (
                  <li
                    key={`${ac.ac_code}-${i}`}
                    className="flex items-start gap-2 text-[12px] leading-snug"
                  >
                    <span
                      aria-hidden
                      className={cn(
                        'mt-1.5 inline-block h-1.5 w-1.5 rounded-full flex-shrink-0',
                        AC_STATUS_DOT[ac.status]
                      )}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-white tabular-nums text-[11.5px]">
                          {ac.ac_code}
                        </span>
                        <span
                          className={cn(
                            'text-[10px] uppercase tracking-[0.12em]',
                            ac.status === 'evidenced'
                              ? 'text-emerald-300/85'
                              : ac.status === 'partial'
                                ? 'text-amber-300/85'
                                : 'text-red-300/85'
                          )}
                        >
                          {AC_STATUS_LABEL[ac.status]}
                        </span>
                      </div>
                      <p className="mt-0.5 text-white/85 text-[11.5px]">{ac.comment}</p>
                    </div>
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
            <DraftBlock label="Draft feedback" text={d.assessor_feedback} />
          )}
        </div>

        {/* Footer actions */}
        <div className="px-5 py-3 border-t border-white/[0.06] flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={handleAssess}
            disabled={applying}
            className="h-9 px-3.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11.5px] font-medium text-white/85 hover:text-white hover:border-white/[0.18] transition-colors touch-manipulation inline-flex items-center gap-1.5"
          >
            <RotateCw className="h-3 w-3" />
            Re-draft
          </button>
          <div className="ml-auto" />
          <button
            type="button"
            onClick={handleApply}
            disabled={applying}
            className="h-9 px-4 rounded-full bg-elec-yellow text-black text-[12.5px] font-semibold hover:bg-elec-yellow/90 active:scale-[0.98] disabled:opacity-50 transition-all touch-manipulation inline-flex items-center gap-1.5"
          >
            <Check className="h-3.5 w-3.5" strokeWidth={3} />
            {applying ? 'Applying…' : 'Apply to submission'}
          </button>
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
      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white mb-1.5">
        {label}
      </div>
      <p className="text-[12.5px] text-white/85 leading-relaxed whitespace-pre-line">{text}</p>
    </div>
  );
}
