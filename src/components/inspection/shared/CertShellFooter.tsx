import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';

interface CertShellFooterProps {
  currentIndex: number;
  totalSteps: number;
  canPrevious: boolean;
  canNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
  /** Labels for the Continue button per step index (length totalSteps - 1). */
  nextLabels: string[];
  isLastStep: boolean;
  onGenerate?: () => void;
  canGenerate?: boolean;
  generateLabel?: string;
  /** Cert-specific neutral actions rendered beside Back on the last step
      (e.g. Email / Invoice buttons). Style them with certFooterNeutralButton. */
  lastStepActions?: React.ReactNode;
}

/** Neutral footer button recipe for lastStepActions children. */
export const certFooterNeutralButton =
  'h-12 flex-1 rounded-xl border border-white/[0.12] bg-white/[0.04] text-[14px] font-medium text-white transition-colors hover:bg-white/[0.08] disabled:opacity-40 touch-manipulation active:scale-[0.98] lg:flex-none lg:px-6 outline-none focus:outline-none focus-visible:outline-none';

/** Slide the footer away while the user is typing so it never covers a field. */
const useTypingFocus = () => {
  const [typing, setTyping] = useState(false);
  useEffect(() => {
    const isTextEntry = (el: EventTarget | null): boolean =>
      el instanceof HTMLElement &&
      (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable);
    const onFocusIn = (e: FocusEvent) => {
      if (isTextEntry(e.target)) setTyping(true);
    };
    const onFocusOut = (e: FocusEvent) => {
      if (!isTextEntry(e.relatedTarget)) setTyping(false);
    };
    document.addEventListener('focusin', onFocusIn);
    document.addEventListener('focusout', onFocusOut);
    return () => {
      document.removeEventListener('focusin', onFocusIn);
      document.removeEventListener('focusout', onFocusOut);
    };
  }, []);
  return typing;
};

/**
 * Shared certificate shell footer — fixed bottom bar with Back + solid volt
 * Continue (labelled with the next step), swapping to Generate + cert-specific
 * actions on the last step. Proven on Minor Works and EV Charging.
 */
const CertShellFooter: React.FC<CertShellFooterProps> = ({
  currentIndex,
  totalSteps,
  canPrevious,
  canNext,
  onPrevious,
  onNext,
  nextLabels,
  isLastStep,
  onGenerate,
  canGenerate = true,
  generateLabel = 'Generate certificate',
  lastStepActions,
}) => {
  const haptic = useHaptic();
  const typing = useTypingFocus();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // No spacer here — consumers carry their own bottom padding on <main>
  // (pb-32/pb-36/pb-48), matching the MW ground truth (MWStickyFooter).
  return (
    <div
      className={cn(
        'fixed bottom-0 right-0 z-40 border-t border-white/[0.08] bg-background/95 backdrop-blur-md transition-transform duration-200',
        typing && 'translate-y-full'
      )}
      style={{ left: 'var(--sidebar-width, 0px)' }}
    >
        <div className="mx-auto flex flex-col gap-2 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 lg:max-w-[1600px] lg:flex-row lg:items-center lg:px-8">
          <span className="hidden text-[12px] tabular-nums text-white/80 lg:block">
            Step {currentIndex + 1} of {totalSteps}
          </span>
          {isLastStep ? (
            <>
              <div className="flex gap-2 lg:ml-auto">
                <button
                  onClick={() => {
                    haptic.light();
                    onPrevious();
                    scrollToTop();
                  }}
                  disabled={!canPrevious}
                  className={certFooterNeutralButton}
                >
                  Back
                </button>
                {lastStepActions}
              </div>
              <button
                onClick={() => {
                  haptic.medium();
                  onGenerate?.();
                }}
                disabled={!canGenerate}
                className="h-12 w-full rounded-xl bg-elec-yellow text-[15px] font-semibold text-black transition-transform hover:bg-elec-yellow/90 disabled:bg-elec-yellow disabled:opacity-50 touch-manipulation active:scale-[0.99] lg:w-auto lg:px-10 outline-none focus:outline-none focus-visible:outline-none"
              >
                {generateLabel}
              </button>
            </>
          ) : (
            <div className="flex w-full gap-2 lg:ml-auto lg:w-auto">
              <button
                onClick={() => {
                  haptic.light();
                  onPrevious();
                  scrollToTop();
                }}
                disabled={!canPrevious}
                className={certFooterNeutralButton}
              >
                Back
              </button>
              <button
                onClick={() => {
                  haptic.medium();
                  onNext();
                  scrollToTop();
                }}
                disabled={!canNext}
                className="h-12 flex-[2] rounded-xl bg-elec-yellow text-[15px] font-semibold text-black transition-transform hover:bg-elec-yellow/90 disabled:opacity-50 touch-manipulation active:scale-[0.99] lg:flex-none lg:px-10 outline-none focus:outline-none focus-visible:outline-none"
              >
                {nextLabels[currentIndex] || 'Continue'}
              </button>
            </div>
          )}
        </div>
    </div>
  );
};

export default CertShellFooter;
