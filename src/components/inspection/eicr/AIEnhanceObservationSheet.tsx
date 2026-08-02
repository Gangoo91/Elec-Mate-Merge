/**
 * AIEnhanceObservationSheet
 * The AI assistant for EICR/EIC observations. Bottom sheet, h-[85vh].
 *
 * Three honest states:
 *   working  — staged progress driven by the hook's `progressStep` (no fake stages)
 *   ready    — the suggestions as reviewable cards, each with its own "Use this"
 *   failed   — the AI didn't come back; retry is right there
 *
 * Accept wiring is unchanged (onAcceptCode / onAcceptDescription /
 * onAcceptRecommendation / onAcceptRegulations / onAcceptAll / onRetry).
 */

import React, { useState, useEffect, useRef } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Loader2, Check, Copy, ArrowRight, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { copyToClipboard } from '@/utils/clipboard';
import { useToast } from '@/hooks/use-toast';
import { useHaptic } from '@/hooks/useHaptic';
import type { ObservationSuggestions } from '@/hooks/useEnhanceObservation';

interface AIEnhanceObservationSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isEnhancing: boolean;
  progressStep: 'idle' | 'searching' | 'analysing' | 'done';
  suggestions: ObservationSuggestions | null;
  currentCode: string;
  currentDescription: string;
  onAcceptCode: (code: 'C1' | 'C2' | 'C3' | 'FI') => void;
  onAcceptDescription: (description: string) => void;
  onAcceptRecommendation: (recommendation: string) => void;
  onAcceptRegulations: (regulation: string) => void;
  onAcceptAll: () => void;
  onRetry: () => void;
}

/* Solid, colour-coded — the same codes the observation card uses. Never washes. */
const codeColours: Record<string, string> = {
  C1: 'bg-red-600 border-red-600 text-white',
  C2: 'bg-orange-500 border-orange-500 text-black',
  C3: 'bg-elec-yellow border-elec-yellow text-black',
  FI: 'bg-blue-500 border-blue-500 text-white',
};

/* Mirrors the hook's progressStep exactly — no invented stages. */
const PROGRESS_STEPS = [
  { key: 'searching', label: 'Searching the BS 7671 regulations' },
  { key: 'analysing', label: 'Writing the observation' },
  { key: 'done', label: 'Ready to review' },
] as const;

const sectionCn = 'rounded-xl border border-white/[0.1] bg-white/[0.04] p-4';
const sectionHeadingCn = 'text-[12px] font-medium text-white';
const microLabelCn = 'text-[11px] font-medium text-white';
const quietChipCn =
  'inline-flex h-11 items-center gap-1.5 rounded-xl border border-white/[0.12] bg-white/[0.06] px-3.5 text-[13px] font-medium text-white transition-colors touch-manipulation hover:bg-white/[0.1] active:scale-[0.98]';

const AIEnhanceObservationSheet: React.FC<AIEnhanceObservationSheetProps> = ({
  open,
  onOpenChange,
  isEnhancing,
  progressStep,
  suggestions,
  currentCode,
  currentDescription,
  onAcceptCode,
  onAcceptDescription,
  onAcceptRecommendation,
  onAcceptRegulations,
  onAcceptAll,
  onRetry,
}) => {
  const { toast } = useToast();
  const haptic = useHaptic();
  const [accepted, setAccepted] = useState<Set<string>>(new Set());
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Elapsed timer during enhancement
  useEffect(() => {
    if (isEnhancing) {
      setElapsedSeconds(0);
      timerRef.current = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isEnhancing]);

  // Reset accepted state when new suggestions arrive
  useEffect(() => {
    if (suggestions) {
      setAccepted(new Set());
    }
  }, [suggestions]);

  const handleCopy = async (text: string, label: string) => {
    try {
      await copyToClipboard(text);
      haptic.light();
      toast({ title: 'Copied', description: `${label} copied to clipboard.` });
    } catch {
      toast({
        title: 'Copy failed',
        description: 'Could not copy to clipboard.',
        variant: 'destructive',
      });
    }
  };

  const markAccepted = (field: string) => {
    haptic.light();
    setAccepted((prev) => new Set(prev).add(field));
  };

  const handleAcceptCode = (code: 'C1' | 'C2' | 'C3' | 'FI') => {
    onAcceptCode(code);
    markAccepted('code');
  };

  const handleAcceptDescription = (desc: string) => {
    onAcceptDescription(desc);
    markAccepted('description');
  };

  const handleAcceptRecommendation = (rec: string) => {
    onAcceptRecommendation(rec);
    markAccepted('recommendation');
  };

  const handleAcceptRegulations = () => {
    if (suggestions?.regulationRefs?.length) {
      const formatted = suggestions.regulationRefs.map((r) => `${r.number}: ${r.title}`).join('; ');
      onAcceptRegulations(formatted);
      markAccepted('regulations');
    }
  };

  const handleAcceptAll = () => {
    onAcceptAll();
    haptic.success();

    // Count what actually changed
    let count = 0;
    if (suggestions) {
      if (suggestions.suggestedCode !== currentCode) count++;
      count++; // description always updates
      if (suggestions.recommendation) count++;
      if (suggestions.regulationRefs?.length > 0) count++;
    }

    toast({
      title: 'Suggestions applied',
      description: `${count} field${count !== 1 ? 's' : ''} updated on your observation.`,
    });

    onOpenChange(false);
  };

  const codeChanged = suggestions && currentCode !== suggestions.suggestedCode;
  const totalFields =
    (codeChanged ? 1 : 0) +
    1 +
    (suggestions?.recommendation ? 1 : 0) +
    (suggestions?.regulationRefs?.length ? 1 : 0);

  const stepIndex = PROGRESS_STEPS.findIndex((s) => s.key === progressStep);
  const failed = !isEnhancing && !suggestions;

  /* ── Applied marker ── */
  const appliedChip = (
    <span className="inline-flex items-center gap-1 rounded-md bg-green-500 px-2 py-0.5 text-[10px] font-bold text-black">
      <Check className="h-3 w-3" />
      Applied
    </span>
  );

  /* ── Working ── */
  const workingContent = (
    <div className={cn(sectionCn, 'space-y-5')}>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-elec-yellow/40 animate-ai-ring-pulse">
          <Loader2 className="h-5 w-5 animate-spin text-elec-yellow" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold tracking-tight text-white">
            Writing your observation
          </p>
          <p className="text-[12px] text-white/85">
            {elapsedSeconds}s — this usually takes about 30s
          </p>
        </div>
      </div>

      {/* Volt progress */}
      <div className="h-1 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-elec-yellow transition-[width] duration-500 ease-out"
          style={{
            width: `${stepIndex >= 0 ? ((stepIndex + 1) / PROGRESS_STEPS.length) * 100 : 5}%`,
          }}
        />
      </div>

      {/* Stages */}
      <div className="space-y-3">
        {PROGRESS_STEPS.map((step, i) => {
          const isActive = step.key === progressStep;
          const isComplete = stepIndex > -1 && i < stepIndex;
          return (
            <div
              key={step.key}
              className={cn(
                'flex items-center gap-3',
                i <= Math.max(stepIndex, 0) ? 'animate-step-appear' : 'opacity-45'
              )}
            >
              <div
                className={cn(
                  'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold transition-colors duration-300',
                  isComplete || isActive
                    ? 'bg-elec-yellow text-black'
                    : 'border border-white/[0.14] text-white'
                )}
              >
                {isComplete ? (
                  <Check className="h-4 w-4" />
                ) : isActive ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  i + 1
                )}
              </div>
              <span className="text-sm font-medium text-white">{step.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );

  /* ── Failed / nothing to show ── */
  const failedContent = (
    <div className={cn(sectionCn, 'space-y-3')}>
      <p className="text-sm font-semibold tracking-tight text-white">Couldn&apos;t reach the AI</p>
      <p className="text-[13px] leading-relaxed text-white/85">
        Nothing came back this time. Your observation hasn&apos;t been changed — try again, or carry
        on writing it yourself.
      </p>
      <div className="flex flex-wrap gap-2 pt-1">
        <button
          type="button"
          onClick={() => {
            haptic.light();
            onRetry();
          }}
          className="inline-flex h-11 items-center gap-1.5 rounded-xl bg-elec-yellow px-4 text-[13px] font-semibold text-black transition-colors touch-manipulation active:scale-[0.98]"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Try again
        </button>
        <button type="button" onClick={() => onOpenChange(false)} className={quietChipCn}>
          Close
        </button>
      </div>
    </div>
  );

  /* ── Ready — reviewable suggestion cards ── */
  const readyContent = suggestions && (
    // 2-up on desktop — a single stacked column left the wide sheet mostly
    // empty (Andrew). Prose blocks span both columns so lines stay readable.
    <div className="mx-auto w-full max-w-5xl space-y-4 lg:grid lg:grid-cols-2 lg:items-start lg:gap-4 lg:space-y-0">
      {/* Classification */}
      <section className={sectionCn}>
        <div className="mb-3 flex items-center justify-between gap-2">
          <h3 className={sectionHeadingCn}>Suggested classification</h3>
          {accepted.has('code') && appliedChip}
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          {codeChanged && (
            <>
              <span
                className={cn(
                  'rounded-md border px-2.5 py-1 text-[13px] font-bold',
                  codeColours[currentCode] || 'border-white/[0.12] bg-white/[0.06] text-white'
                )}
              >
                {currentCode}
              </span>
              <ArrowRight className="h-4 w-4 text-white" />
            </>
          )}
          <span
            className={cn(
              'rounded-md border px-2.5 py-1 text-[13px] font-bold',
              codeColours[suggestions.suggestedCode]
            )}
          >
            {suggestions.suggestedCode}
          </span>
          <span className="text-[12px] text-white/85">
            {Math.round(suggestions.confidence * 100)}% confident
          </span>
        </div>
        {codeChanged
          ? !accepted.has('code') && (
              <button
                type="button"
                className={cn(quietChipCn, 'mt-3')}
                onClick={() => handleAcceptCode(suggestions.suggestedCode)}
              >
                <Check className="h-3.5 w-3.5" />
                Use this code
              </button>
            )
          : !accepted.has('code') && (
              <p className="mt-3 text-[12px] text-white/85">Matches the code you already picked.</p>
            )}
      </section>

      {/* Description */}
      <section className={cn(sectionCn, 'lg:col-span-2')}>
        <div className="mb-3 flex items-center justify-between gap-2">
          <h3 className={sectionHeadingCn}>Observation wording</h3>
          {accepted.has('description') && appliedChip}
        </div>
        <div className="space-y-3">
          <div>
            <p className={cn(microLabelCn, 'mb-1')}>What you wrote</p>
            <p
              className={cn(
                'text-[13px] leading-relaxed text-white/85',
                accepted.has('description') && 'line-through'
              )}
            >
              {currentDescription}
            </p>
          </div>
          <div className="border-t border-white/[0.1] pt-3">
            <p className={cn(microLabelCn, 'mb-1')}>AI version</p>
            <p className="text-sm leading-relaxed text-white">{suggestions.enhancedDescription}</p>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {!accepted.has('description') && (
            <button
              type="button"
              className={quietChipCn}
              onClick={() => handleAcceptDescription(suggestions.enhancedDescription)}
            >
              <Check className="h-3.5 w-3.5" />
              Use this
            </button>
          )}
          <button
            type="button"
            className={quietChipCn}
            onClick={() => handleCopy(suggestions.enhancedDescription, 'Description')}
          >
            <Copy className="h-3.5 w-3.5" />
            Copy
          </button>
        </div>
      </section>

      {/* Recommendation */}
      {suggestions.recommendation && (
        <section className={cn(sectionCn, 'lg:col-span-2')}>
          <div className="mb-3 flex items-center justify-between gap-2">
            <h3 className={sectionHeadingCn}>Recommended remedial action</h3>
            {accepted.has('recommendation') && appliedChip}
          </div>
          <p className="text-sm leading-relaxed text-white">{suggestions.recommendation}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {!accepted.has('recommendation') && (
              <button
                type="button"
                className={quietChipCn}
                onClick={() => handleAcceptRecommendation(suggestions.recommendation)}
              >
                <Check className="h-3.5 w-3.5" />
                Use this
              </button>
            )}
            <button
              type="button"
              className={quietChipCn}
              onClick={() => handleCopy(suggestions.recommendation, 'Recommendation')}
            >
              <Copy className="h-3.5 w-3.5" />
              Copy
            </button>
          </div>
        </section>
      )}

      {/* BS 7671 references — reg-number chip + readable title, same idiom as
          the stored references on the observation card. */}
      {suggestions.regulationRefs.length > 0 && (
        <section className={sectionCn}>
          <div className="mb-3 flex items-center justify-between gap-2">
            <h3 className={sectionHeadingCn}>BS 7671 references</h3>
            {accepted.has('regulations') && appliedChip}
          </div>
          <div className="space-y-2">
            {suggestions.regulationRefs.map((ref, i) => {
              const num = (ref.number || '').trim();
              const body = (ref.title || ref.relevance || '').trim();
              // Only render the prefix as a reg-number chip when it looks like
              // one — otherwise (messy AI prose) render it readably, never as a
              // monospace wall that overflows the row (ELE-1188).
              const isRegNumber = num.length > 0 && num.length <= 22;
              return (
                <button
                  key={i}
                  type="button"
                  className="flex min-h-11 w-full items-start gap-2 rounded-lg py-2 text-left transition-colors touch-manipulation active:bg-white/[0.06]"
                  onClick={() =>
                    handleCopy(`${num}${body ? ` — ${body}` : ''}`, `Regulation ${num}`)
                  }
                >
                  {isRegNumber ? (
                    <>
                      <span className="h-fit shrink-0 rounded border border-elec-yellow/30 px-1.5 py-0.5 font-mono text-[11px] text-elec-yellow">
                        {num}
                      </span>
                      {body && (
                        <span className="min-w-0 flex-1 break-words text-xs leading-relaxed text-white/85">
                          {body}
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="min-w-0 flex-1 break-words text-xs leading-relaxed text-white/85">
                      {body ? `${num} — ${body}` : num}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {!accepted.has('regulations') && (
              <button type="button" className={quietChipCn} onClick={handleAcceptRegulations}>
                <Check className="h-3.5 w-3.5" />
                Use these
              </button>
            )}
            <p className="text-[12px] text-white/85">Tap a reference to copy it.</p>
          </div>
        </section>
      )}

      {/* Client explanation — never written to the certificate */}
      {suggestions.clientExplanation && (
        <section className={sectionCn}>
          <h3 className={cn(sectionHeadingCn, 'mb-3')}>Plain-English version for the client</h3>
          <p className="text-sm leading-relaxed text-white">{suggestions.clientExplanation}</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button
              type="button"
              className={quietChipCn}
              onClick={() => handleCopy(suggestions.clientExplanation, 'Client explanation')}
            >
              <Copy className="h-3.5 w-3.5" />
              Copy
            </button>
            <p className="text-[12px] text-white/85">
              For emails and reports — not the certificate.
            </p>
          </div>
        </section>
      )}
    </div>
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[85vh] overflow-hidden rounded-t-2xl p-0 outline-none focus:outline-none"
      >
        <div className="flex h-full flex-col bg-background">
          {/* Header — pr-14 keeps the title clear of the sheet's close button */}
          <SheetHeader className="flex-shrink-0 space-y-0 border-b border-white/[0.08] px-4 pb-3 pr-14 pt-4 text-left">
            <SheetTitle className="text-base font-semibold tracking-tight text-white">
              AI assistant
            </SheetTitle>
            <p className="text-[12px] text-white/85">
              Grounded in the BS 7671 regulations — review every suggestion before you use it.
            </p>
            {suggestions && !isEnhancing && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    haptic.light();
                    onRetry();
                  }}
                  className={quietChipCn}
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Rewrite
                </button>
              </div>
            )}
          </SheetHeader>

          {/* Body */}
          <div
            className={cn(
              'flex-1 overflow-y-auto px-4 py-4',
              // Working/failed states are short — centre them in the sheet
              // rather than stranding them above a screen of black.
              (isEnhancing || failed) && 'flex flex-col items-center justify-center'
            )}
          >
            <div className={cn('w-full', (isEnhancing || failed) && 'max-w-xl')}>
              {isEnhancing ? workingContent : failed ? failedContent : readyContent}
            </div>
          </div>

          {/* Footer — the one primary action */}
          {suggestions && !isEnhancing && (
            <div className="flex-shrink-0 border-t border-white/[0.08] bg-background px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
              {accepted.size > 0 && accepted.size < totalFields && (
                <p className="mb-2 text-[12px] text-white/85">
                  {accepted.size} of {totalFields} applied
                </p>
              )}
              <button
                type="button"
                className="h-12 w-full rounded-xl bg-elec-yellow text-sm font-semibold text-black transition-all touch-manipulation active:scale-[0.98]"
                onClick={handleAcceptAll}
              >
                {accepted.size > 0 ? 'Use the rest' : 'Use everything'}
              </button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AIEnhanceObservationSheet;
