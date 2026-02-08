/**
 * AIEnhanceObservationSheet
 * Mobile: 85vh bottom sheet. Desktop: centred modal panel.
 * Follows CLAUDE.md: h-11 touch targets, touch-manipulation, UK English.
 */

import React, { useState, useEffect, useRef } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, Sparkles, Check, Copy, BookOpen, ArrowRight, RotateCcw, CircleCheck, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
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

const codeColours: Record<string, string> = {
  C1: 'bg-red-500/15 text-red-400 border-red-500/40',
  C2: 'bg-orange-500/15 text-orange-400 border-orange-500/40',
  C3: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/40',
  FI: 'bg-blue-500/15 text-blue-400 border-blue-500/40',
};

const PROGRESS_STEPS = [
  { key: 'searching', label: 'Searching BS 7671 regulations...' },
  { key: 'analysing', label: 'Analysing with AI...' },
  { key: 'done', label: 'Complete' },
] as const;

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
  const isMobile = useIsMobile();
  const [accepted, setAccepted] = useState<Set<string>>(new Set());
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Elapsed timer during enhancement
  useEffect(() => {
    if (isEnhancing) {
      setElapsedSeconds(0);
      timerRef.current = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
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
      await navigator.clipboard.writeText(text);
      toast({ title: 'Copied', description: `${label} copied to clipboard.` });
    } catch {
      toast({ title: 'Copy failed', description: 'Could not copy to clipboard.', variant: 'destructive' });
    }
  };

  const markAccepted = (field: string) => {
    setAccepted(prev => new Set(prev).add(field));
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
      const formatted = suggestions.regulationRefs.map(r => `${r.number}: ${r.title}`).join('; ');
      onAcceptRegulations(formatted);
      markAccepted('regulations');
    }
  };

  const handleAcceptAll = () => {
    onAcceptAll();

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
  const totalFields = (codeChanged ? 1 : 0) + 1 + (suggestions?.recommendation ? 1 : 0) + (suggestions?.regulationRefs?.length ? 1 : 0);

  /* ── Shared header ── */
  const headerContent = (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-base font-semibold text-white">
        <Sparkles className="h-5 w-5 text-elec-yellow" />
        AI Enhancement
      </div>
      <div className="flex items-center gap-2">
        {suggestions && !isEnhancing && (
          <Button
            variant="ghost"
            size="sm"
            className="h-9 px-3 text-xs text-white/70 hover:bg-white/10 touch-manipulation gap-1.5"
            onClick={onRetry}
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Retry
          </Button>
        )}
        {!isMobile && (
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white/70 hover:bg-white/10 transition-colors touch-manipulation"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );

  /* ── Shared body content ── */
  const bodyContent = (
    <div className="space-y-4">
      {/* Progress Steps */}
      {isEnhancing && (
        <div className="flex flex-col items-center justify-center py-10 gap-8">
          {/* Pulsing ring spinner */}
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-2 border-elec-yellow/20 flex items-center justify-center animate-ai-ring-pulse">
              <Loader2 className="h-7 w-7 animate-spin text-elec-yellow" />
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full max-w-xs">
            <div className="h-1 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-elec-yellow to-amber-400 animate-progress-fill transition-all"
                style={{
                  '--progress-width': `${(() => {
                    const stepIndex = PROGRESS_STEPS.findIndex(s => s.key === progressStep);
                    return stepIndex >= 0 ? ((stepIndex + 1) / PROGRESS_STEPS.length) * 100 : 0;
                  })()}%`
                } as React.CSSProperties}
              />
            </div>
          </div>

          {/* Steps */}
          <div className="w-full max-w-xs space-y-3">
            {PROGRESS_STEPS.map((step, i) => {
              const stepIndex = PROGRESS_STEPS.findIndex(s => s.key === progressStep);
              const isActive = step.key === progressStep;
              const isComplete = i < stepIndex;
              const isVisible = i <= stepIndex;
              return (
                <div
                  key={step.key}
                  className={cn(
                    'flex items-center gap-3 transition-all duration-300',
                    isVisible ? 'animate-step-appear' : 'opacity-0'
                  )}
                  style={isVisible ? { animationDelay: `${i * 100}ms` } : undefined}
                >
                  <div className={cn(
                    'w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500',
                    isComplete ? 'bg-green-500 scale-100' :
                    isActive ? 'bg-elec-yellow scale-110' :
                    'bg-white/10 scale-90'
                  )}>
                    {isComplete ? (
                      <Check className="h-4 w-4 text-white" />
                    ) : isActive ? (
                      <Loader2 className="h-4 w-4 animate-spin text-black" />
                    ) : (
                      <span className="text-[10px] text-white/50">{i + 1}</span>
                    )}
                  </div>
                  <span className={cn(
                    'text-sm font-medium transition-colors duration-300',
                    isActive ? 'text-white' :
                    isComplete ? 'text-white/70' :
                    'text-white/30'
                  )}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Timer */}
          <div className="flex items-center gap-2 text-xs text-white/40">
            <div className="w-1 h-1 rounded-full bg-elec-yellow animate-pulse" />
            <span>{elapsedSeconds}s / ~30s</span>
          </div>
        </div>
      )}

      {suggestions && !isEnhancing && (
        <>
          {/* Suggested Code */}
          <section className={cn(
            'rounded-xl p-4 border transition-all',
            accepted.has('code') ? 'bg-green-500/5 border-green-500/20' : 'bg-white/[0.03] border-white/10'
          )}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold text-white flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                Suggested Classification
              </h3>
              {accepted.has('code') && (
                <span className="flex items-center gap-1 text-[10px] text-green-400 font-medium">
                  <CircleCheck className="h-3 w-3" />
                  Applied
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              {codeChanged && (
                <>
                  <Badge variant="outline" className={cn('text-sm px-3 py-1', codeColours[currentCode] || 'bg-white/10 text-white')}>
                    {currentCode}
                  </Badge>
                  <ArrowRight className="h-4 w-4 text-white/50" />
                </>
              )}
              <Badge variant="outline" className={cn('text-sm px-3 py-1', codeColours[suggestions.suggestedCode])}>
                {suggestions.suggestedCode}
              </Badge>
              <span className="text-xs text-white/70 ml-1">
                {Math.round(suggestions.confidence * 100)}% confidence
              </span>
              {codeChanged && !accepted.has('code') && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-11 px-3 text-xs text-green-400 hover:bg-green-500/10 touch-manipulation ml-auto"
                  onClick={() => handleAcceptCode(suggestions.suggestedCode)}
                >
                  <Check className="h-3.5 w-3.5 mr-1" />
                  Accept
                </Button>
              )}
              {!codeChanged && (
                <span className="text-xs text-green-400 ml-auto flex items-center gap-1">
                  <Check className="h-3 w-3" />
                  Matches
                </span>
              )}
            </div>
          </section>

          {/* Enhanced Description */}
          <section className={cn(
            'rounded-xl p-4 border transition-all',
            accepted.has('description') ? 'bg-green-500/5 border-green-500/20' : 'bg-white/[0.03] border-white/10'
          )}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold text-white flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                Enhanced Description
              </h3>
              {accepted.has('description') && (
                <span className="flex items-center gap-1 text-[10px] text-green-400 font-medium">
                  <CircleCheck className="h-3 w-3" />
                  Applied
                </span>
              )}
            </div>
            <div className="space-y-3 text-left">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-white/50 mb-1">Current</p>
                <p className={cn(
                  'text-sm leading-relaxed text-left',
                  accepted.has('description') ? 'text-white/40 line-through' : 'text-white/70'
                )}>{currentDescription}</p>
              </div>
              <div className="border-t border-white/10 pt-3">
                <p className="text-[10px] uppercase tracking-wider text-elec-yellow mb-1">AI Enhanced</p>
                <p className="text-sm text-white leading-relaxed text-left">{suggestions.enhancedDescription}</p>
              </div>
            </div>
            {!accepted.has('description') && (
              <div className="flex gap-2 mt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-11 px-4 text-xs text-green-400 hover:bg-green-500/10 touch-manipulation"
                  onClick={() => handleAcceptDescription(suggestions.enhancedDescription)}
                >
                  <Check className="h-3.5 w-3.5 mr-1" />
                  Accept
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-11 px-4 text-xs text-white/70 hover:bg-white/10 touch-manipulation"
                  onClick={() => handleCopy(suggestions.enhancedDescription, 'Description')}
                >
                  <Copy className="h-3.5 w-3.5 mr-1" />
                  Copy
                </Button>
              </div>
            )}
          </section>

          {/* Client Explanation */}
          {suggestions.clientExplanation && (
            <section className="rounded-xl p-4 border border-white/10 bg-white/[0.03]">
              <h3 className="text-xs font-semibold text-white mb-3 flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                Client Explanation
              </h3>
              <p className="text-sm text-white leading-relaxed text-left">{suggestions.clientExplanation}</p>
              <div className="flex gap-2 mt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-11 px-4 text-xs text-white/70 hover:bg-white/10 touch-manipulation"
                  onClick={() => handleCopy(suggestions.clientExplanation, 'Client explanation')}
                >
                  <Copy className="h-3.5 w-3.5 mr-1" />
                  Copy to clipboard
                </Button>
              </div>
              <p className="text-[10px] text-white/40 mt-2">Use in client reports or emails — not written to the certificate.</p>
            </section>
          )}

          {/* Recommendation */}
          {suggestions.recommendation && (
            <section className={cn(
              'rounded-xl p-4 border transition-all',
              accepted.has('recommendation') ? 'bg-green-500/5 border-green-500/20' : 'bg-white/[0.03] border-white/10'
            )}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-semibold text-white flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  Recommended Remedial Action
                </h3>
                {accepted.has('recommendation') && (
                  <span className="flex items-center gap-1 text-[10px] text-green-400 font-medium">
                    <CircleCheck className="h-3 w-3" />
                    Applied
                  </span>
                )}
              </div>
              <p className="text-sm text-white leading-relaxed text-left">{suggestions.recommendation}</p>
              {!accepted.has('recommendation') && (
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-11 px-4 text-xs text-green-400 hover:bg-green-500/10 touch-manipulation"
                    onClick={() => handleAcceptRecommendation(suggestions.recommendation)}
                  >
                    <Check className="h-3.5 w-3.5 mr-1" />
                    Accept
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-11 px-4 text-xs text-white/70 hover:bg-white/10 touch-manipulation"
                    onClick={() => handleCopy(suggestions.recommendation, 'Recommendation')}
                  >
                    <Copy className="h-3.5 w-3.5 mr-1" />
                    Copy
                  </Button>
                </div>
              )}
            </section>
          )}

          {/* Regulation References */}
          {suggestions.regulationRefs.length > 0 && (
            <section className={cn(
              'rounded-xl p-4 border transition-all',
              accepted.has('regulations') ? 'bg-green-500/5 border-green-500/20' : 'bg-white/[0.03] border-white/10'
            )}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-semibold text-white flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5 text-elec-yellow" />
                  BS 7671 References
                </h3>
                {accepted.has('regulations') && (
                  <span className="flex items-center gap-1 text-[10px] text-green-400 font-medium">
                    <CircleCheck className="h-3 w-3" />
                    Applied
                  </span>
                )}
              </div>
              <div className="space-y-2">
                {suggestions.regulationRefs.map((ref, i) => (
                  <button
                    key={i}
                    type="button"
                    className="w-full text-left flex items-start gap-3 rounded-lg p-3 bg-white/[0.04] border border-white/10 touch-manipulation active:bg-white/10 transition-colors"
                    onClick={() => handleCopy(
                      `${ref.number}${ref.title ? ` — ${ref.title}` : ''}`,
                      `Regulation ${ref.number}`
                    )}
                  >
                    <span className="text-xs font-mono text-elec-yellow font-semibold flex-shrink-0 pt-0.5">{ref.number}</span>
                    <span className="text-xs text-white leading-relaxed flex-1">
                      {ref.title || ref.relevance}
                    </span>
                    <Copy className="h-3 w-3 text-white/30 flex-shrink-0 mt-0.5" />
                  </button>
                ))}
              </div>
              {!accepted.has('regulations') ? (
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-11 px-4 text-xs text-green-400 hover:bg-green-500/10 touch-manipulation"
                    onClick={handleAcceptRegulations}
                  >
                    <Check className="h-3.5 w-3.5 mr-1" />
                    Accept
                  </Button>
                </div>
              ) : (
                <p className="text-[10px] text-white/40 mt-3">Tap a reference to copy it.</p>
              )}
            </section>
          )}
        </>
      )}
    </div>
  );

  /* ── Shared footer ── */
  const footerContent = suggestions && !isEnhancing && (
    <div className="px-4 md:px-5 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] border-t border-white/10 bg-background flex-shrink-0">
      {accepted.size > 0 && accepted.size < totalFields && (
        <p className="text-[10px] text-white/50 text-center mb-2">
          {accepted.size} of {totalFields} applied — tap below to accept remaining
        </p>
      )}
      <Button
        className="w-full h-12 gap-2 bg-elec-yellow text-black font-semibold hover:bg-elec-yellow/90 active:scale-[0.98] transition-all touch-manipulation rounded-xl text-sm"
        onClick={handleAcceptAll}
      >
        <Sparkles className="h-4 w-4" />
        {accepted.size > 0 ? 'Accept Remaining' : 'Accept All Suggestions'}
      </Button>
    </div>
  );

  /* ── Desktop: centred modal panel ── */
  if (!isMobile) {
    if (!open) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in-0 duration-200"
          onClick={() => onOpenChange(false)}
        />

        {/* Panel */}
        <div className="relative z-10 w-full max-w-lg mx-4 max-h-[80vh] bg-background border border-white/10 rounded-2xl shadow-2xl shadow-black/50 flex flex-col animate-in fade-in-0 zoom-in-95 duration-200">
          {/* Header */}
          <div className="px-5 pt-5 pb-4 border-b border-white/10 flex-shrink-0">
            {headerContent}
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-5 py-4">
            {bodyContent}
          </div>

          {/* Footer */}
          {footerContent}
        </div>
      </div>
    );
  }

  /* ── Mobile: bottom sheet ── */
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-background">
          {/* Header */}
          <SheetHeader className="px-4 pt-4 pb-3 border-b border-white/10">
            {headerContent}
          </SheetHeader>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            {bodyContent}
          </div>

          {/* Footer */}
          {footerContent}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AIEnhanceObservationSheet;
