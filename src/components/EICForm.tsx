import React, { Suspense, useState } from 'react';
import { EICFormProvider, useEICForm } from './eic/EICFormProvider';
import { useEICTabs, EICTabValue } from '@/hooks/useEICTabs';
import { useEICValidation } from '@/hooks/useEICValidation';
import { useCertPrefill } from '@/hooks/useCertPrefill';
import { SectionSkeleton } from '@/components/ui/page-skeleton';
import CertShellHeader, { type CertShellStep } from './inspection/shared/CertShellHeader';
import CertShellFooter, { certFooterNeutralButton } from './inspection/shared/CertShellFooter';
import type { SyncStatus } from '@/hooks/useReportSync';
import CertLockBar from './inspection/CertLockBar';
import DuplicatedFromBanner from './certificates/DuplicatedFromBanner';
import LastCertSuggestionCard from './certificates/LastCertSuggestionCard';
import EICTabContent from './eic/EICTabContent';
import StartNewEICRDialog from './StartNewEICRDialog';
import { BoardScannerOverlay } from './testing/BoardScannerOverlay';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { scrollToTopForStepChange } from '@/utils/scroll';

// v3 cert shell — five steps across the top, matching the MW/EV pattern.
const EIC_STEPS: CertShellStep[] = [
  { id: 'details', label: 'Details' },
  { id: 'inspection', label: 'Inspect' },
  { id: 'testing', label: 'Testing' },
  { id: 'declarations', label: 'Sign off' },
  { id: 'certificate', label: 'Issue' },
];

const NEXT_LABELS = [
  'Continue to Inspect',
  'Continue to Testing',
  'Continue to Sign off',
  'Continue to Issue',
];

const EICFormInner = ({ onBack }: { onBack: () => void }) => {
  const {
    formData,
    updateFormData,
    isSaving,
    hasUnsavedChanges,
    handleManualSave,
    handleGenerateCertificate,
    syncState,
    cloudStatus,
    isOnline,
    onTabChange,
    showStartNewDialog,
    setShowStartNewDialog,
    confirmStartNew,
    confirmDuplicate,
    observationsProps,
    showBoardScan,
    setShowBoardScan,
    handleBoardScanComplete,
    isLoadingDesign,
    currentReportId,
    isLocked,
    lockedAt,
    editVersion,
    lockReport,
    amendReport,
    databaseId,
    hasVersions,
    openReport,
  } = useEICForm();

  // Tabs hook — navigation state only; completeness comes from useEICValidation
  const {
    currentTab,
    setCurrentTab,
    currentTabIndex,
    totalTabs,
    canNavigateNext,
    canNavigatePrevious,
    navigateNext,
    navigatePrevious,
  } = useEICTabs();

  // Field-based progress + per-field missing list (tab metadata included) —
  // the header ring renders it; tapping the ring opens the missing-items sheet.
  const eicValidation = useEICValidation(formData);
  const [showMissingSheet, setShowMissingSheet] = useState(false);

  // Real generation gate — the provider's canGenerateCertificate is hardcoded
  // true, so the shell gates on useEICValidation (single source of truth):
  // footer Generate, CertLockBar's Issue and the in-tab actions all agree.
  const canGenerate = eicValidation.isValid;

  // The shell footer's Generate must produce the actual PDF (MW pattern —
  // MinorWorksForm's pdfActionsRef). The Issue tab registers its in-tab
  // generate here; until the ref is populated we fall back to the provider's
  // status/notification flow (the real PDF flow calls it too, post-render).
  const pdfActionsRef = React.useRef<{
    generate: () => void;
    email: () => void;
    invoice: () => void;
  } | null>(null);

  // Slide direction for the step transition — back navigation slides the other way.
  const prevTabIndexRef = React.useRef(currentTabIndex);
  const isNavigatingBack = currentTabIndex < prevTabIndexRef.current;
  React.useEffect(() => {
    prevTabIndexRef.current = currentTabIndex;
  }, [currentTabIndex]);

  // Every route into a step behaves identically — header tabs and footer nav
  // both flush the sync hook and land at the top of the step.
  const handleTabChange = (tab: string) => {
      // Instant, and BEFORE the step swaps.
      //
      // `behavior: 'smooth'` here fought the step's own slide-in: the keyed
      // content was replaced at once, the 260ms translateX played, and the
      // window animated its scroll separately over a longer duration — two
      // motions at different speeds, which reads as a jolt. Worse when the new
      // step is shorter, because the browser clamps the scroll instantly first
      // and then smooth-scrolls the remainder.
      //
      // The explicit `behavior` beats the global `scroll-behavior: smooth` in
      // index.css, so this really is instant. Scrolling first means the new
      // step mounts already at the top and only the slide animates.
      scrollToTopForStepChange();
    onTabChange?.();
    setCurrentTab(tab as EICTabValue);
  };

  // The provider still speaks the old useCloudSync string status; the shell
  // header reads useReportSync's { cloud } shape. useCloudSync collapses
  // 'offline' into 'queued', so the provider's isOnline flag carries the
  // offline state instead (MW parity — MWShellHeader takes isOnline). 'queued'
  // otherwise covers unsaved/pending states, which must read as the neutral
  // 'Save' word — only a genuine 'synced' shows the green 'Saved'.
  // ELE-1446 — pass the RAW cloud state through. This previously mapped
  // 'queued' to 'unsaved' because the header had no word for queued, so work
  // that failed to reach the cloud looked identical to a never-saved draft.
  // The header now says "Pending" for queued and uses queuedChanges for the
  // count, so flattening here would throw that away.
  const shellSyncStatus = (
    cloudStatus
      ? { ...cloudStatus, cloud: !isOnline ? 'offline' : cloudStatus.cloud }
      : { cloud: !isOnline ? 'offline' : 'unsaved' }
  ) as SyncStatus;

  // Last-cert prompt — soft suggestion to copy supply / earthing / BS amendment
  // from the user's most recent EIC at the same address. User applies on tap.
  const prefillAddress =
    (formData.installationAddress as string) || (formData.clientAddress as string) || '';
  const {
    suggestion: lastCertSuggestion,
    dismiss: dismissLastCert,
    buildPatch,
  } = useCertPrefill(prefillAddress, 'eic');

  const handleApplyLastCert = () => {
    const patch = buildPatch();
    Object.entries(patch).forEach(([key, value]) => updateFormData(key, value));
    dismissLastCert();
  };

  // Step ticks derive from useEICValidation so the header ticks, the progress
  // ring and the missing-items sheet can never disagree. Legacy certs saved
  // with a manual completedSections flag still tick (read-path tolerance).
  const legacyCompleted = (formData.completedSections || {}) as Record<string, boolean>;
  const completedTabs: Record<string, boolean> = Object.fromEntries(
    EIC_STEPS.map((step) => [
      step.id,
      legacyCompleted[step.id] === true ||
        eicValidation.tabComplete[step.id as keyof typeof eicValidation.tabComplete],
    ])
  );

  const contentProps = {
    formData,
    onUpdate: updateFormData,
    observationsProps,
    onGenerateCertificate: handleGenerateCertificate,
    onSaveDraft: handleManualSave,
    canGenerateCertificate: canGenerate,
    actionsRef: pdfActionsRef,
  };

  // Full-screen board scanner overlay
  if (showBoardScan) {
    return (
      <BoardScannerOverlay
        onAnalysisComplete={handleBoardScanComplete}
        onClose={() => setShowBoardScan(false)}
        title="Scan distribution board"
      />
    );
  }

  // Loading state for design pre-population
  if (isLoadingDesign) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center space-y-3">
          <Loader2 className="h-8 w-8 text-elec-yellow animate-spin mx-auto" />
          <div>
            <h3 className="text-sm font-semibold text-white">Loading design</h3>
            <p className="text-xs text-white mt-1">Pre-filling circuits...</p>
          </div>
        </div>
      </div>
    );
  }

  const certNumber = formData.certificateNumber as string | undefined;

  return (
    <div className="bg-background min-h-screen prevent-shortcuts">
      {/* v3 shell header — back · title/cert no · save word · progress ring · step tabs */}
      <CertShellHeader
        onBack={onBack}
        title="EIC"
        subtitle={certNumber ? `${certNumber} · BS 7671` : null}
        isSaving={isSaving}
        onManualSave={handleManualSave}
        syncStatus={shellSyncStatus}
        progressPercent={eicValidation.completionPercentage}
        onProgressTap={() => setShowMissingSheet(true)}
        steps={EIC_STEPS}
        currentTab={currentTab}
        onTabChange={handleTabChange}
        completedTabs={completedTabs}
      />

      {/* ELE-1037 — lock / version bar (Issue & lock, read-only, Amend) */}
      <CertLockBar
        isLocked={isLocked}
        lockedAt={lockedAt}
        editVersion={editVersion}
        canIssue={!isLocked && !!currentReportId && canGenerate}
        onLock={lockReport}
        onAmend={amendReport}
        databaseId={databaseId}
        hasVersions={hasVersions}
        onOpenVersion={openReport}
      />

      {/* ELE-881 — provenance banner */}
      {formData.duplicatedFrom && (
        <DuplicatedFromBanner
          sourceCertNumber={formData.duplicatedFrom}
          onDismiss={() => updateFormData('duplicatedFrom', '')}
        />
      )}

      {/* Last cert at this address — soft suggestion to copy supply/earthing data forward */}
      {!isLocked && lastCertSuggestion && (
        <div className="px-4 pt-3 lg:px-8">
          <LastCertSuggestionCard
            suggestion={lastCertSuggestion}
            onApply={handleApplyLastCert}
            onDismiss={dismissLastCert}
          />
        </div>
      )}

      {/* Main content — counters Layout px-3 on mobile (-mx-3) then re-applies
          px-4 so the tab interiors' -mx-4 cards land truly edge-to-edge.
          Same arithmetic as MinorWorksForm. Read-only when the cert is locked. */}
      <main
        className={cn(
          '-mx-3 px-4 py-4 sm:mx-auto sm:px-4 lg:px-8',
          // Issue carries the two-row footer (Back + Generate stacked on mobile)
          // — needs extra clearance. Same arithmetic as MinorWorksForm; the
          // footer no longer renders its own spacer.
          currentTab === 'certificate' ? 'pb-48 sm:pb-40 lg:pb-28' : 'pb-32 sm:pb-24',
          isLocked && 'pointer-events-none select-none opacity-95'
        )}
        aria-disabled={isLocked || undefined}
      >
        {/* Current step — keyed so each change replays the lateral slide. */}
        <div
          key={currentTab}
          className={cn(
            'lg:max-w-[1600px]',
            isNavigatingBack ? 'motion-safe:animate-mw-step-back' : 'motion-safe:animate-mw-step-in'
          )}
        >
          <EICTabContent tabValue={currentTab} {...contentProps} />
        </div>
      </main>

      {/* v3 shell footer — single sticky step bar replaces per-tab inline nav */}
      {!isLocked && (
        <CertShellFooter
          currentIndex={currentTabIndex}
          totalSteps={totalTabs}
          canPrevious={canNavigatePrevious()}
          canNext={canNavigateNext()}
          onPrevious={() => {
      // Instant, and BEFORE the step swaps.
      //
      // `behavior: 'smooth'` here fought the step's own slide-in: the keyed
      // content was replaced at once, the 260ms translateX played, and the
      // window animated its scroll separately over a longer duration — two
      // motions at different speeds, which reads as a jolt. Worse when the new
      // step is shorter, because the browser clamps the scroll instantly first
      // and then smooth-scrolls the remainder.
      //
      // The explicit `behavior` beats the global `scroll-behavior: smooth` in
      // index.css, so this really is instant. Scrolling first means the new
      // step mounts already at the top and only the slide animates.
      scrollToTopForStepChange();
            navigatePrevious();
            onTabChange?.();
          }}
          onNext={() => {
      // Instant, and BEFORE the step swaps.
      //
      // `behavior: 'smooth'` here fought the step's own slide-in: the keyed
      // content was replaced at once, the 260ms translateX played, and the
      // window animated its scroll separately over a longer duration — two
      // motions at different speeds, which reads as a jolt. Worse when the new
      // step is shorter, because the browser clamps the scroll instantly first
      // and then smooth-scrolls the remainder.
      //
      // The explicit `behavior` beats the global `scroll-behavior: smooth` in
      // index.css, so this really is instant. Scrolling first means the new
      // step mounts already at the top and only the slide animates.
      scrollToTopForStepChange();
            navigateNext();
            onTabChange?.();
          }}
          nextLabels={NEXT_LABELS}
          isLastStep={currentTab === 'certificate'}
          onGenerate={() => {
            // Real PDF flow (MW pattern): the Issue tab's actions register
            // generate() on the ref; it renders the PDF then calls the
            // provider's handleGenerateCertificate for status/notifications.
            if (pdfActionsRef.current) pdfActionsRef.current.generate();
            else handleGenerateCertificate();
          }}
          canGenerate={canGenerate}
          generateLabel="Generate certificate"
          previewReportType="eic"
          previewReportId={currentReportId}
          previewData={formData}
          lastStepActions={
            <>
              {/* ELE-1460 — Email + Invoice live here, not duplicated inside
                  the Issue tab. Handlers registered by EICCertificateActions. */}
              <button
                type="button"
                onClick={() => pdfActionsRef.current?.email()}
                disabled={!canGenerate}
                className={certFooterNeutralButton}
              >
                Email
              </button>
              <button
                type="button"
                onClick={() => pdfActionsRef.current?.invoice()}
                disabled={!canGenerate}
                className={certFooterNeutralButton}
              >
                Invoice
              </button>
            </>
          }
        />
      )}


      <StartNewEICRDialog
        isOpen={showStartNewDialog}
        onClose={() => setShowStartNewDialog(false)}
        onConfirm={confirmStartNew}
        onDuplicate={confirmDuplicate}
        hasUnsavedChanges={hasUnsavedChanges}
      />

      {/* Tap-the-ring — what's still missing, grouped by step, jump straight there */}
      <Sheet open={showMissingSheet} onOpenChange={setShowMissingSheet}>
        <SheetContent
          side="bottom"
          className="h-[85vh] rounded-t-2xl border-white/[0.1] p-0 overflow-hidden"
        >
          <div className="flex h-full flex-col bg-background">
            <div className="border-b border-white/[0.08] px-4 pb-3 pt-4">
              <h2 className="text-base font-bold text-white">
                {eicValidation.errors.length === 0 ? 'Ready to issue' : 'Still to complete'}
              </h2>
              <p className="text-[12px] text-white/60 tabular-nums">
                {eicValidation.completionPercentage}% complete
                {eicValidation.errors.length > 0 &&
                  ` · ${eicValidation.errors.length} required ${
                    eicValidation.errors.length === 1 ? 'field' : 'fields'
                  } remaining`}
              </p>
            </div>
            <div className="flex-1 space-y-5 overflow-y-auto px-4 py-4">
              {eicValidation.errors.length === 0 ? (
                <p className="text-sm text-white/85">
                  Everything required is filled in. Head to Issue to generate the certificate.
                </p>
              ) : (
                EIC_STEPS.map((step) => {
                  const items = eicValidation.errors.filter(
                    (e) => (e.tab || 'certificate') === step.id
                  );
                  if (items.length === 0) return null;
                  return (
                    <div key={step.id}>
                      <h3 className="mb-2 text-[13px] font-semibold text-white">{step.label}</h3>
                      <div className="space-y-1.5">
                        {items.map((item) => (
                          <button
                            key={item.field}
                            type="button"
                            onClick={() => {
                              setShowMissingSheet(false);
                              handleTabChange(step.id);
                            }}
                            className="flex h-11 w-full items-center justify-between rounded-xl border border-white/[0.1] bg-white/[0.04] px-3.5 text-left text-sm font-medium text-white touch-manipulation transition-transform active:scale-[0.99]"
                          >
                            <span className="truncate">{item.message}</span>
                            <span className="ml-3 shrink-0 text-[11.5px] font-semibold text-elec-yellow">
                              Go
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

const EICForm = ({
  onBack,
  initialReportId,
  designId,
}: {
  onBack: () => void;
  initialReportId?: string | null;
  designId?: string | null;
}) => (
  <EICFormProvider initialReportId={initialReportId} designId={designId}>
    <Suspense fallback={<SectionSkeleton />}>
      <EICFormInner onBack={onBack} />
    </Suspense>
  </EICFormProvider>
);

export default EICForm;
