import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';
import { scrollToTopForStepChange } from '@/utils/scroll';
import { CertPreviewSheet } from './CertPreviewSheet';
import { ReportPdfViewer } from '@/components/reports/ReportPdfViewer';

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
  /**
   * ELE-1477 — supply both to get a Preview button on the last step. Living
   * here rather than in each cert means every certificate on the shared shell
   * gains a preview from one line, instead of ~14 near-identical wirings.
   */
  previewReportType?: string;
  previewData?: Record<string, unknown>;
  /**
   * Saved report id. When present a "View PDF" button appears alongside
   * Preview, opening the same ReportPdfViewer the QS review flow uses — it
   * generates the real certificate on demand, so this is the exact document
   * the customer receives, branding and template included. Absent on a cert
   * that has never been saved, since there is nothing to render yet.
   */
  previewReportId?: string | null;
}

/** Neutral footer button recipe for lastStepActions children. */
export const certFooterNeutralButton =
  'h-12 flex-1 rounded-xl border border-white/[0.12] bg-white/[0.04] text-[14px] font-medium text-white transition-colors hover:bg-white/[0.08] disabled:opacity-40 touch-manipulation active:scale-[0.98] lg:flex-none lg:px-6 outline-none focus:outline-none focus-visible:outline-none';

/**
 * Slide the footer away while the user is typing so it never covers a field.
 *
 * ELE-1579 — "occasionally the navigation buttons in bottom right disappear".
 *
 * This used to decide on `focusout`'s `relatedTarget`: stay hidden if focus
 * moved to another text field, show again otherwise. Two ways that leaves the
 * footer stuck off-screen with no way back:
 *
 *  - **A focused field is unmounted.** Removing a focused element does not
 *    reliably fire `focusout` at all. The schedule of tests re-renders rows
 *    constantly — autosave, validation, adding a circuit — so an input can
 *    vanish mid-edit and `typing` is simply never cleared. The user is left
 *    with no Back and no Continue until they happen to focus and blur another
 *    field, which is exactly the "occasionally" in the report.
 *  - **`relatedTarget` is null** in more cases than it looks: clicking blank
 *    page space, focus leaving the document, some sheet/portal dismissals.
 *
 * Derived from `document.activeElement` instead, which is authoritative — it
 * describes what IS focused rather than what an event guessed was about to be.
 * Re-synced on a deferred tick (during focusout the active element has not
 * settled yet) and on visibility change, so returning to the tab re-evaluates
 * rather than trusting stale state.
 */
const useTypingFocus = () => {
  const [typing, setTyping] = useState(false);
  useEffect(() => {
    const isTextEntry = (el: Element | null): boolean =>
      el instanceof HTMLElement &&
      (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable);

    let timer: ReturnType<typeof setTimeout> | undefined;
    const sync = () => {
      clearTimeout(timer);
      // Deferred: on focusout the active element is transiently <body>, and on
      // an unmount it settles a tick later. Reading immediately would flicker.
      //
      // setTimeout, NOT requestAnimationFrame. rAF does not fire at all while
      // the tab is backgrounded or throttled, so switching apps mid-form —
      // which is routine on a phone, checking a photo or a message — would
      // leave the footer frozen in whatever state it was in. A timer still
      // runs. (Caught testing this: the reproduction reported "visible" on
      // every step because the driving tab wasn't painting.)
      timer = setTimeout(() => setTyping(isTextEntry(document.activeElement)), 0);
    };

    document.addEventListener('focusin', sync);
    document.addEventListener('focusout', sync);
    document.addEventListener('visibilitychange', sync);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('focusin', sync);
      document.removeEventListener('focusout', sync);
      document.removeEventListener('visibilitychange', sync);
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
  previewReportType,
  previewData,
  previewReportId,
}) => {
  const haptic = useHaptic();
  const [showPreview, setShowPreview] = useState(false);
  const canPreview = !!previewReportType && !!previewData;
  const [showPdf, setShowPdf] = useState(false);
  const canViewPdf = !!previewReportId;
  const typing = useTypingFocus();
  // ELE-1464 — shared utility. Instant, not smooth: a ~300ms smooth scroll
  // races the 260ms step-in animation and produces the jolt reported on the
  // EICR. See src/utils/scroll.ts.
  const scrollToTop = () => scrollToTopForStepChange();

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
                {canPreview && (
                  <button
                    type="button"
                    onClick={() => {
                      haptic.light();
                      setShowPreview(true);
                    }}
                    className={certFooterNeutralButton}
                  >
                    Preview
                  </button>
                )}
                {canViewPdf && (
                  <button
                    type="button"
                    onClick={() => {
                      haptic.light();
                      setShowPdf(true);
                    }}
                    className={certFooterNeutralButton}
                  >
                    View PDF
                  </button>
                )}
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

      {canViewPdf && (
        <ReportPdfViewer
          reportId={previewReportId as string}
          open={showPdf}
          onOpenChange={setShowPdf}
        />
      )}
      {canPreview && (
        <CertPreviewSheet
          open={showPreview}
          onOpenChange={setShowPreview}
          reportType={previewReportType as string}
          data={previewData as Record<string, unknown>}
          reportId={previewReportId}
        />
      )}
    </div>
  );
};

export default CertShellFooter;
