import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';

interface MWStickyFooterProps {
  currentTabIndex: number;
  totalTabs: number;
  canNavigatePrevious: boolean;
  navigateNext: () => void;
  navigatePrevious: () => void;
  /** Sign off step actions — issue from the thumb zone (EV parity). */
  onEmail?: () => void;
  onInvoice?: () => void;
  onGenerate?: () => void;
}

const NEXT_LABELS = ['Continue to Circuit', 'Continue to Testing', 'Continue to Sign off'];

/**
 * Steps out of the way while the user is typing — a fixed bottom bar sitting on
 * top of the on-screen keyboard is the fastest way to make a form feel broken
 * on a phone. Tracks focus on text-entry elements only; taps on buttons and
 * chips keep the bar visible.
 */
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
      // Only clear when focus is not moving to another text-entry element.
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
 * Single fixed footer for the Minor Works shell — replaces the per-tab inline
 * navigation. Step count, Back, and a labelled Continue. On the final tab the
 * footer steps aside: the PDF/issue actions in the declaration tab take over.
 */
const MWStickyFooter: React.FC<MWStickyFooterProps> = ({
  currentTabIndex,
  totalTabs,
  canNavigatePrevious,
  navigateNext,
  navigatePrevious,
  onEmail,
  onInvoice,
  onGenerate,
}) => {
  const haptic = useHaptic();
  const typing = useTypingFocus();
  const isLastTab = currentTabIndex === totalTabs - 1;
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div
      className={cn(
        'fixed bottom-0 right-0 z-40 px-4 pt-8 pointer-events-none',
        'lg:px-8',
        'bg-gradient-to-t from-background via-background/95 to-transparent',
        'transition-[transform,opacity] duration-200 motion-reduce:transition-none',
        typing && 'translate-y-full opacity-0'
      )}
      style={{
        left: 'var(--sidebar-width, 0px)',
        paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 16px)',
      }}
      aria-hidden={typing || undefined}
    >
      {isLastTab && onGenerate ? (
        /* Sign off — the issue actions live in the thumb zone (EV parity):
           Back · Email · Invoice on one row, Generate full width below. */
        <div className="flex flex-col gap-2 pointer-events-auto lg:max-w-[1600px] lg:flex-row lg:items-center">
          <span className="hidden text-[11.5px] text-white/80 tabular-nums lg:block">
            {currentTabIndex + 1} of {totalTabs}
          </span>
          <div className="flex gap-2 lg:ml-auto">
            {canNavigatePrevious && (
              <button
                onClick={() => {
                  haptic.light();
                  navigatePrevious();
                  scrollToTop();
                }}
                className="h-[52px] flex-1 rounded-xl bg-white/[0.09] border border-white/[0.14] text-sm font-semibold text-white touch-manipulation active:scale-[0.97] transition-transform lg:flex-none lg:px-5"
              >
                Back
              </button>
            )}
            {onEmail && (
              <button
                onClick={() => {
                  haptic.light();
                  onEmail();
                }}
                className="h-[52px] flex-1 rounded-xl bg-white/[0.09] border border-white/[0.14] text-sm font-semibold text-white touch-manipulation active:scale-[0.97] transition-transform lg:flex-none lg:px-5"
              >
                Email
              </button>
            )}
            {onInvoice && (
              <button
                onClick={() => {
                  haptic.light();
                  onInvoice();
                }}
                className="h-[52px] flex-1 rounded-xl bg-white/[0.09] border border-white/[0.14] text-sm font-semibold text-white touch-manipulation active:scale-[0.97] transition-transform lg:flex-none lg:px-5"
              >
                Invoice
              </button>
            )}
          </div>
          <button
            onClick={() => {
              haptic.medium();
              onGenerate();
            }}
            className={cn(
              'h-[52px] w-full rounded-xl bg-elec-yellow text-black text-[15px] font-bold',
              'lg:w-auto lg:px-10',
              'touch-manipulation active:scale-[0.97] transition-transform',
              'shadow-[0_6px_22px_rgba(245,184,28,0.25)]'
            )}
          >
            Generate certificate
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3 pointer-events-auto lg:max-w-[1600px]">
          <span className="text-[11.5px] text-white/80 tabular-nums min-w-[46px]">
            {currentTabIndex + 1} of {totalTabs}
          </span>
          {canNavigatePrevious && (
            <button
              onClick={() => {
                haptic.light();
                navigatePrevious();
                scrollToTop();
              }}
              className="h-[52px] px-5 rounded-xl bg-white/[0.09] border border-white/[0.14] text-sm font-semibold text-white touch-manipulation active:scale-[0.97] transition-transform lg:ml-auto"
            >
              Back
            </button>
          )}
          {!isLastTab && (
            <button
              onClick={() => {
                haptic.medium();
                navigateNext();
                scrollToTop();
              }}
              className={cn(
                'flex-1 h-[52px] rounded-xl bg-elec-yellow text-black text-[15px] font-bold',
                'lg:flex-none lg:px-14',
                !canNavigatePrevious && 'lg:ml-auto',
                'touch-manipulation active:scale-[0.97] transition-transform',
                'shadow-[0_6px_22px_rgba(245,184,28,0.25)]'
              )}
            >
              {NEXT_LABELS[currentTabIndex] || 'Continue'}
            </button>
          )}
          {isLastTab && (
            <span className="flex-1 text-right text-[11.5px] text-white/80">
              Complete the declaration above to issue
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default MWStickyFooter;
