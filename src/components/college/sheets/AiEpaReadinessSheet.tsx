import { useEffect, useRef } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Wand2, RotateCw, Check, Square, X, ShieldCheck, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  SheetShell,
  PrimaryButton,
  SecondaryButton,
  DestructiveButton,
} from '@/components/college/primitives';
import { useAiEpaReadiness } from '@/hooks/useAiEpaReadiness';
import type { EpaJudgement } from '@/hooks/useEpaReadiness';

/* ==========================================================================
   AiEpaReadinessSheet — streams the AI EPA verdict, then surfaces:
     • verdict + predicted grade + confidence ring
     • strengths + blockers
     • recommended actions (with grade lever)
     • what-if counterfactuals
     • BS 7671 citations (each with ref + snippet + applies_to)
   Tutor can co-sign or override (those buttons live in the parent section).
   ========================================================================== */

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  collegeStudentId: string | null;
  studentName: string;
  /** When the AI returns a verdict, the parent refresh is invoked. */
  onSaved?: (judgement: EpaJudgement) => void;
}

const PHASE_LABELS: Record<string, string> = {
  loading_signals: 'Reading cross-hub signals',
  retrieving_bs7671: 'Pulling relevant BS 7671 facets',
  reasoning: 'Reasoning over the evidence',
  persisting: 'Recording verdict',
};

export function AiEpaReadinessSheet({
  open,
  onOpenChange,
  collegeStudentId,
  studentName,
  onSaved,
}: Props) {
  const ai = useAiEpaReadiness();
  const autoStartedRef = useRef(false);

  useEffect(() => {
    if (open && !autoStartedRef.current && collegeStudentId) {
      autoStartedRef.current = true;
      void ai.generate(collegeStudentId);
    }
    if (!open) {
      autoStartedRef.current = false;
      ai.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, collegeStudentId]);

  useEffect(() => {
    if (ai.status === 'done' && ai.judgement) {
      onSaved?.(ai.judgement);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ai.status]);

  const regenerate = () => {
    if (!collegeStudentId) return;
    ai.reset();
    autoStartedRef.current = true;
    void ai.generate(collegeStudentId);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent hideCloseButton
        side="bottom"
        className="h-[94vh] sm:max-w-3xl sm:mx-auto p-0 rounded-t-2xl overflow-hidden border-white/10"
      >
        <SheetShell
          eyebrow="AI EPA Examiner"
          title={`AI verdict for ${studentName.split(' ')[0]}`}
          description="Reasoned, evidence-grounded second opinion. Citations point to BS 7671 regulations. Tutor co-signs or overrides."
          footer={
            ai.status === 'done' ? (
              <>
                <SecondaryButton onClick={regenerate} fullWidth>
                  <RotateCw className="h-3.5 w-3.5 mr-1.5" />
                  Re-run
                </SecondaryButton>
                <PrimaryButton onClick={() => onOpenChange(false)} fullWidth>
                  <Check className="h-3.5 w-3.5 mr-1.5" strokeWidth={3} />
                  Done
                </PrimaryButton>
              </>
            ) : ai.status === 'streaming' ? (
              <DestructiveButton onClick={ai.stop} fullWidth>
                <Square className="h-3 w-3 mr-1.5" fill="currentColor" />
                Stop
              </DestructiveButton>
            ) : ai.status === 'error' ? (
              <>
                <SecondaryButton onClick={() => onOpenChange(false)} fullWidth>
                  Cancel
                </SecondaryButton>
                <PrimaryButton onClick={regenerate} fullWidth>
                  <RotateCw className="h-3.5 w-3.5 mr-1.5" />
                  Retry
                </PrimaryButton>
              </>
            ) : (
              <SecondaryButton onClick={() => onOpenChange(false)} fullWidth>
                Cancel
              </SecondaryButton>
            )
          }
        >
          {ai.status === 'streaming' && <StreamingState phaseLabel={PHASE_LABELS[ai.statusPhase ?? ''] ?? 'Working…'} signalsKnown={!!ai.signals} facetsPulled={ai.facetsPulled} />}
          {ai.status === 'error' && <ErrorState message={ai.error} />}
          {ai.status === 'done' && ai.judgement && <VerdictView judgement={ai.judgement} />}
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}

/* ────────────────────────────────────────────────────────
   Streaming state
   ──────────────────────────────────────────────────────── */

function StreamingState({
  phaseLabel,
  signalsKnown,
  facetsPulled,
}: {
  phaseLabel: string;
  signalsKnown: boolean;
  facetsPulled: number | null;
}) {
  return (
    <div className="space-y-4">
      <div className="relative rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] overflow-hidden">
        <div
          className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-elec-yellow to-transparent opacity-80"
          style={{ animation: 'shimmer 1.4s ease-in-out infinite' }}
        />
        <style>{`@keyframes shimmer { 0%,100% { transform: translateX(-30%); opacity: 0.4 } 50% { transform: translateX(30%); opacity: 1 } }`}</style>
        <div className="px-5 py-5 flex items-center gap-3">
          <Wand2 className="h-5 w-5 text-elec-yellow" />
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
              {phaseLabel}
            </div>
            <div className="mt-0.5 text-[12px] text-white/85">
              {signalsKnown ? 'Signals captured.' : 'Reading AC coverage, observations, OTJ, portfolio, mocks…'}
              {facetsPulled != null && ` · ${facetsPulled} BS 7671 facets retrieved.`}
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-3 animate-pulse">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="rounded-2xl border border-white/[0.04] bg-[hsl(0_0%_12%)] px-5 py-4">
            <div className="h-2.5 w-1/4 rounded bg-white/[0.06]" />
            <div className="mt-2 h-2 w-3/4 rounded bg-white/[0.04]" />
            <div className="mt-1.5 h-2 w-2/3 rounded bg-white/[0.04]" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ErrorState({ message }: { message: string | null }) {
  return (
    <div className="rounded-2xl border border-red-500/[0.2] bg-[hsl(0_0%_12%)] px-5 py-4 flex items-center gap-3">
      <div className="p-2 rounded-xl bg-red-500/15 flex-shrink-0">
        <X className="h-5 w-5 text-red-300" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-red-300">
          AI verdict failed
        </div>
        <p className="mt-1 text-[12.5px] text-white/85 leading-relaxed">
          {message ?? 'Something went wrong. Try again.'}
        </p>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────
   Verdict view
   ──────────────────────────────────────────────────────── */

const VERDICT_TONE: Record<string, { ring: string; pill: string; label: string }> = {
  ready: {
    ring: 'stroke-emerald-400',
    pill: 'bg-emerald-500/15 text-emerald-200 border-emerald-400/40',
    label: 'Ready',
  },
  almost: {
    ring: 'stroke-amber-400',
    pill: 'bg-amber-500/15 text-amber-200 border-amber-400/40',
    label: 'Almost',
  },
  not_yet: {
    ring: 'stroke-orange-400',
    pill: 'bg-orange-500/15 text-orange-200 border-orange-400/40',
    label: 'Not yet',
  },
  refer: {
    ring: 'stroke-red-400',
    pill: 'bg-red-500/15 text-red-200 border-red-400/40',
    label: 'Refer',
  },
};

function VerdictView({ judgement }: { judgement: EpaJudgement }) {
  const tone = VERDICT_TONE[judgement.verdict] ?? VERDICT_TONE.almost;
  const conf = judgement.confidence ?? 0;
  return (
    <div className="space-y-4">
      {/* Hero */}
      <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] px-5 py-5 flex items-center gap-5 flex-wrap">
        <div className="relative h-[88px] w-[88px] flex-shrink-0">
          <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
            <circle cx="18" cy="18" r="15.5" fill="none" strokeWidth="2.5" className="stroke-white/[0.08]" />
            <circle
              cx="18"
              cy="18"
              r="15.5"
              fill="none"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={`${(conf / 100) * 97.4} 97.4`}
              className={cn('transition-all duration-500', tone.ring)}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-[18px] font-semibold text-white tabular-nums leading-none">
              {conf}<span className="text-[11px] text-white/65">%</span>
            </div>
            <div className="text-[9.5px] uppercase tracking-[0.14em] text-white/50 mt-0.5">confidence</div>
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <span className={cn('inline-flex items-center h-6 px-2.5 rounded-full border text-[11px] font-semibold tracking-[0.06em] uppercase', tone.pill)}>
            {tone.label}
          </span>
          {judgement.predicted_grade && (
            <span className="ml-2 inline-flex items-center h-6 px-2.5 rounded-full bg-elec-yellow/[0.14] border border-elec-yellow/30 text-[11px] font-semibold tracking-[0.06em] uppercase text-elec-yellow">
              {judgement.predicted_grade}
            </span>
          )}
          {judgement.rationale && (
            <p className="mt-3 text-[13px] text-white/85 leading-relaxed">{judgement.rationale}</p>
          )}
        </div>
      </div>

      {/* Strengths + blockers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <ListBox
          tone="emerald"
          icon={<ShieldCheck className="h-3.5 w-3.5" />}
          label="Strengths"
          items={judgement.strengths ?? []}
        />
        <ListBox
          tone="amber"
          icon={<AlertTriangle className="h-3.5 w-3.5" />}
          label="Blockers"
          items={judgement.blockers ?? []}
        />
      </div>

      {/* Recommended actions */}
      {judgement.recommended_actions?.length ? (
        <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] overflow-hidden">
          <div className="px-5 py-3 border-b border-white/[0.06] text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Recommended actions
          </div>
          <ul className="divide-y divide-white/[0.04]">
            {judgement.recommended_actions.map((a, i) => (
              <li key={i} className="px-5 py-3 flex items-start gap-3">
                <div className="text-[11px] text-white/45 tabular-nums mt-0.5 w-5">{i + 1}.</div>
                <div className="min-w-0 flex-1">
                  <div className="text-[12.5px] text-white">{a.action}</div>
                  <div className="mt-0.5 text-[10.5px] text-white/55 tabular-nums">
                    {a.target_date ? `Target: ${a.target_date}` : 'No target date'}
                    {a.lever_to_grade && (
                      <>
                        <span className="text-white/25 mx-1.5">·</span>
                        <span className="text-elec-yellow/85">→ {a.lever_to_grade}</span>
                      </>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* What if */}
      {judgement.what_if?.length ? (
        <div className="rounded-2xl border border-elec-yellow/[0.18] bg-elec-yellow/[0.03] px-5 py-4">
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85 mb-2">
            What would change the verdict
          </div>
          <ul className="space-y-2">
            {judgement.what_if.map((w, i) => (
              <li key={i} className="text-[12.5px] text-white/85 leading-snug">
                <span className="text-white">{w.change}</span>
                <span className="text-white/55"> → {w.new_grade}</span>
                {w.new_confidence != null && <span className="text-white/45 tabular-nums"> ({w.new_confidence}%)</span>}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* Citations */}
      {judgement.citations?.length ? (
        <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] overflow-hidden">
          <div className="px-5 py-3 border-b border-white/[0.06] text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            BS 7671 citations
          </div>
          <ul className="divide-y divide-white/[0.04]">
            {judgement.citations.map((c, i) => (
              <li key={i} className="px-5 py-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center h-5 px-1.5 rounded-md bg-blue-500/[0.12] border border-blue-500/30 text-[10px] font-semibold tracking-[0.06em] uppercase text-blue-200">
                    {c.ref}
                  </span>
                  <span className="text-[10.5px] text-white/55">applies to: {c.applies_to}</span>
                </div>
                {c.snippet && (
                  <p className="mt-1.5 text-[12px] text-white/85 leading-snug">{c.snippet}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function ListBox({
  tone,
  icon,
  label,
  items,
}: {
  tone: 'emerald' | 'amber';
  icon: React.ReactNode;
  label: string;
  items: string[];
}) {
  if (!items.length) return null;
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] px-5 py-4">
      <div
        className={cn(
          'text-[10px] font-medium uppercase tracking-[0.18em] mb-2 inline-flex items-center gap-1.5',
          tone === 'emerald' ? 'text-emerald-300/85' : 'text-amber-300/85'
        )}
      >
        {icon}
        {label}
      </div>
      <ul className="space-y-1.5">
        {items.map((it, i) => (
          <li key={i} className="text-[12.5px] text-white/85 leading-snug pl-3 relative">
            <span
              aria-hidden
              className={cn(
                'absolute left-0 top-[7px] inline-block h-1 w-1 rounded-full',
                tone === 'emerald' ? 'bg-emerald-400/85' : 'bg-amber-400/85'
              )}
            />
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}
