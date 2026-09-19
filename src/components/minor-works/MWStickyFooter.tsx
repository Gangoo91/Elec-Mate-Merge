import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';
import { CertPreviewSheet } from '@/components/inspection/shared/CertPreviewSheet';
import { ReportPdfViewer } from '@/components/reports/ReportPdfViewer';

interface MWStickyFooterProps {
  /**
   * ELE-1477 — supply to get a Preview button in the sign-off row. Minor Works
   * has its own footer rather than CertShellFooter, so the sheet is mounted
   * here instead of inherited.
   */
  previewData?: Record<string, unknown>;
  /**
   * ELE-1750 — saved report id. When present a "View PDF" button appears
   * beside Preview and opens the real certificate.
   *
   * This is the half Minor Works never had. `CertShellFooter` — which every
   * other certificate on the shared shell uses — offers BOTH: Preview shows
   * the data, View PDF renders the actual document through PDFMonkey. Minor
   * Works has its own footer and only ever carried Preview, so the only thing
   * a user could open was the data layout.
   *
   * That is exactly what Craig Soper reported: "not as a PDF like if I was
   * doing an EICR." He was right, and it was never a rendering fault — the
   * button that shows the PDF simply did not exist on this certificate.
   */
  previewReportId?: string | null;
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
  previewReportId,
  currentTabIndex,
  totalTabs,
  canNavigatePrevious,
  navigateNext,
  navigatePrevious,
  onEmail,
  onInvoice,
  previewData,
  onGenerate,
}) => {
  const haptic = useHaptic();
  const [showPreview, setShowPreview] = React.useState(false);
  const [showPdf, setShowPdf] = React.useState(false);
  // A certificate that has never been saved has nothing to render, so the
  // button stays away rather than opening a viewer with no document.
  const canViewPdf = !!previewReportId;
  const typing = useTypingFocus();
  const isLastTab = currentTabIndex === totalTabs - 1;
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      {previewData && (
        <CertPreviewSheet
          open={showPreview}
          onOpenChange={setShowPreview}
          reportType="minor-works"
          data={previewData}
          // Without this the preview cannot fetch observation photos or a QS
          // countersignature, and silently shows the cert without them.
          reportId={previewReportId}
        />
      )}
      {canViewPdf && (
        <ReportPdfViewer
          reportId={previewReportId as string}
          open={showPdf}
          onOpenChange={setShowPdf}
        />
      )}
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
          <span className="hidden text-[11.5px] text-white tabular-nums lg:block">
            {currentTabIndex + 1} of {totalTabs}
          </span>
          {/*
            Five actions now share this row on the Sign off step — Back,
            Preview, View PDF, Email, Invoice. At `flex-1` on a 375px phone
            that leaves each about 65px and the longer labels get crushed, so
            the row wraps instead: a minimum width forces a tidy second line
            rather than five squeezed buttons. Desktop is unaffected — the
            buttons are `lg:flex-none` there and sit on one line.
          */}
          <div className="flex flex-wrap gap-2 lg:flex-nowrap lg:ml-auto">
            {canNavigatePrevious && (
              <button
                onClick={() => {
                  haptic.light();
                  navigatePrevious();
                  scrollToTop();
                }}
                className="h-[52px] min-w-[96px] flex-1 rounded-xl bg-white/[0.09] border border-white/[0.14] text-sm font-semibold text-white touch-manipulation active:scale-[0.97] transition-transform lg:min-w-0 lg:flex-none lg:px-5"
              >
                Back
              </button>
            )}
            {previewData && (
              <button
                type="button"
                onClick={() => {
                  haptic.light();
                  setShowPreview(true);
                }}
                className="h-[52px] min-w-[96px] flex-1 rounded-xl bg-white/[0.09] border border-white/[0.14] text-sm font-semibold text-white touch-manipulation active:scale-[0.97] transition-transform lg:min-w-0 lg:flex-none lg:px-5"
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
                className="h-[52px] min-w-[96px] flex-1 rounded-xl bg-white/[0.09] border border-white/[0.14] text-sm font-semibold text-white touch-manipulation active:scale-[0.97] transition-transform lg:min-w-0 lg:flex-none lg:px-5"
              >
                View PDF
              </button>
            )}
            {onEmail && (
              <button
                onClick={() => {
                  haptic.light();
                  onEmail();
                }}
                className="h-[52px] min-w-[96px] flex-1 rounded-xl bg-white/[0.09] border border-white/[0.14] text-sm font-semibold text-white touch-manipulation active:scale-[0.97] transition-transform lg:min-w-0 lg:flex-none lg:px-5"
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
                className="h-[52px] min-w-[96px] flex-1 rounded-xl bg-white/[0.09] border border-white/[0.14] text-sm font-semibold text-white touch-manipulation active:scale-[0.97] transition-transform lg:min-w-0 lg:flex-none lg:px-5"
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
          <span className="text-[11.5px] text-white tabular-nums min-w-[46px]">
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
            <span className="flex-1 text-right text-[11.5px] text-white">
              Complete the declaration above to issue
            </span>
          )}
        </div>
      )}
    </div>
    </>
  );
};

export default MWStickyFooter;
