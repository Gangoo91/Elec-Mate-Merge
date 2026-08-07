import React, { Suspense, useState, useCallback, useEffect } from 'react';
import { EICRFormProvider, useEICRForm } from './eicr/EICRFormProvider';
import { useEICRTabs, EICRTabValue } from '@/hooks/useEICRTabs';
import { useEICRValidation } from '@/hooks/useEICRValidation';
import { useQsReviewStatus } from '@/hooks/useQsReview';
import { useCertPrefill } from '@/hooks/useCertPrefill';
import { SectionSkeleton } from '@/components/ui/page-skeleton';
import { draftStorage } from '@/utils/draftStorage';
import CertShellHeader, { type CertShellStep } from './inspection/shared/CertShellHeader';
import CertShellFooter, { certFooterNeutralButton } from './inspection/shared/CertShellFooter';
import type { SyncStatus } from '@/hooks/useReportSync';
import CertLockBar from './inspection/CertLockBar';
import DuplicatedFromBanner from './certificates/DuplicatedFromBanner';
import LastCertSuggestionCard from './certificates/LastCertSuggestionCard';
import EICRTabContent from './EICRTabContent';
import StartNewEICRDialog from './StartNewEICRDialog';
import { BoardScannerOverlay } from './testing/BoardScannerOverlay';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { pickCableSize, getCpcForLive, BS_STANDARD_MAP } from '@/utils/circuitDefaults';
import { getMaxZsWithRcd } from '@/utils/zsCalculations';
import { scrollToTopForStepChange } from '@/utils/scroll';
import { focusValidationField } from '@/utils/focusValidationField';

// v3 cert shell — five steps across the top, matching the MW/EIC pattern.
const EICR_STEPS: CertShellStep[] = [
  { id: 'details', label: 'Details' },
  { id: 'inspection', label: 'Inspect' },
  { id: 'testing', label: 'Testing' },
  { id: 'inspector', label: 'Sign off' },
  { id: 'certificate', label: 'Issue' },
];

const NEXT_LABELS = [
  'Continue to Inspect',
  'Continue to Testing',
  'Continue to Sign off',
  'Continue to Issue',
];

const EICRFormInner = ({ onBack }: { onBack: () => void }) => {
  const {
    formData,
    updateFormData,
    currentReportId,
    showStartNewDialog,
    setShowStartNewDialog,
    handleManualSave,
    confirmStartNew,
    confirmDuplicate,
    syncState,
    cloudStatus,
    isOnline,
    isLoadingReport,
    isLocked,
    lockedAt,
    editVersion,
    lockReport,
    amendReport,
    databaseId,
    hasVersions,
    openReport,
    onTabChange,
  } = useEICRForm();

  // Board scan state
  const [showBoardScan, setShowBoardScan] = useState(false);

  // Tabs hook — navigation state only; completeness comes from useEICRValidation
  const {
    currentTab,
    setCurrentTab,
    currentTabIndex,
    totalTabs,
    canNavigateNext,
    canNavigatePrevious,
    navigateNext,
    navigatePrevious,
  } = useEICRTabs();

  // Field-based progress + per-field missing list (tab metadata included) —
  // the header ring renders it; tapping the ring opens the missing-items sheet.
  const eicrValidation = useEICRValidation(formData);
  const [showMissingSheet, setShowMissingSheet] = useState(false);
  // Set when a "Go" closes the sheet, so the close handler knows not to restore
  // focus over the field we are about to land on.
  const jumpingToFieldRef = React.useRef(false);
  // ELE-1487 — the field to land on once the step has actually rendered.
  // Focusing straight from the click races three things at once: the sheet's
  // close animation, its focus trap, and React remounting the step. Holding the
  // intent in state and acting in an effect means we focus a node that exists
  // and is staying put.
  const [pendingFocusField, setPendingFocusField] = useState<string | null>(null);

  useEffect(() => {
    if (!pendingFocusField) return;
    const timer = window.setTimeout(() => {
      void focusValidationField(pendingFocusField).finally(() => setPendingFocusField(null));
    }, 280);
    return () => window.clearTimeout(timer);
  }, [pendingFocusField, currentTab]);
  // A QS-approved cert is complete by definition — don't let an in-editor
  // completeness recompute leave an approved cert un-generatable (ELE-1183).
  // EICRSummary's generate handler still runs the QS content-hash gate.
  const { data: qsReviewStatus } = useQsReviewStatus(currentReportId || undefined);
  const canGenerate = eicrValidation.isValid || qsReviewStatus?.status === 'approved';

  // The shell footer's Generate/Email/Invoice call into the Issue tab's real
  // handlers (MW/EIC pattern) — EICRSummary registers them on mount.
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
  const handleTabChange = useCallback(
    (tab: string) => {
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
      setCurrentTab(tab as EICRTabValue);
    },
    // setCurrentTab is stable enough for this usage; the hook recreates it per
    // render but it only wraps setState + the provider callback.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onTabChange]
  );

  // The provider speaks the old useCloudSync string status; the shell header
  // reads useReportSync's { cloud } shape. 'queued' covers unsaved/pending
  // states → neutral 'Save' word; only a genuine 'synced' shows 'Saved'.
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
  // from the user's most recent EICR at the same address. User applies on tap.
  const prefillAddress =
    (formData.installationAddress as string) || (formData.clientAddress as string) || '';
  const {
    suggestion: lastCertSuggestion,
    dismiss: dismissLastCert,
    buildPatch,
  } = useCertPrefill(prefillAddress, 'eicr', {
    excludeReportId: currentReportId || undefined,
  });

  const handleApplyLastCert = () => {
    const patch = buildPatch();
    Object.entries(patch).forEach(([key, value]) => updateFormData(key, value));
    dismissLastCert();
  };

  // Handle board scan completion - populate circuits
  // BoardPhotoCapture returns: { circuits, board, metadata, warnings, decisions }
  const handleBoardScanComplete = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (data: { board: any; circuits: any[]; metadata?: any; warnings?: string[] }) => {
      // Convert detected circuits to test results format matching TestResult type
      // BoardPhotoCapture already transforms circuits to: { position, label, device, rating, curve, ... }
      const newCircuits = data.circuits.flatMap((circuit, index) => {
        // Accept both legacy `device: 'MCB'` (string) and new
        // `device: { category: 'MCB', ... }` (object) shapes.
        const deviceCategory: string =
          (typeof circuit.device === 'string' ? circuit.device : circuit.device?.category) || 'MCB';
        const ratingAmps =
          circuit.rating ??
          (typeof circuit.device === 'object' ? circuit.device?.rating_amps : null) ??
          null;
        const deviceCurve =
          circuit.curve ??
          (typeof circuit.device === 'object' ? circuit.device?.curve : null) ??
          'B';
        const isSpare = /spare/i.test(deviceCategory);

        // Get cable size — smart, circuit-type-aware. A 40A shower lands as
        // 6/10mm², a 32A ring final as 2.5mm², a 32A radial as 4mm².
        const liveSize =
          pickCableSize(ratingAmps, {
            description: circuit.label || '',
          }) || '2.5mm';
        const cpcSize = getCpcForLive(liveSize) || '1.5mm';

        // Get BS standard from device category
        const bsStandard = BS_STANDARD_MAP[deviceCategory] || 'MCB (BS EN 60898)';

        // Calculate Max Zs from detected device — RCD-aware (if the AI
        // detected an RCBO, the RCD limit of 1667Ω (30mA) applies per
        // BS 7671 Reg 411.5.3 instead of the overcurrent table).
        const maxZsLookup = getMaxZsWithRcd({
          bsStandard,
          curve: deviceCurve,
          rating: ratingAmps?.toString() || '',
          protectiveDeviceType: deviceCategory,
          rcdRating: /rcbo/i.test(deviceCategory) ? '30mA' : null,
          circuitDescription: circuit.label || '',
        });
        const maxZs = maxZsLookup.maxZs;

        const NA = isSpare ? 'N/A' : '';
        const wayNumber: number =
          (circuit.position as number) ?? (circuit.wayNumber as number) ?? index + 1;
        const isThreePhase = circuit.phase === '3P';

        // Common shape per row — varies only for 3P expansion below.
        const baseRow = {
          circuitDescription: isSpare ? 'Spare' : circuit.label || `Circuit ${wayNumber}`,
          circuitType: '',
          type: '',
          protectiveDeviceType: isSpare ? '' : deviceCategory,
          protectiveDeviceRating: isSpare ? '' : ratingAmps?.toString() || '',
          protectiveDeviceCurve: isSpare ? '' : deviceCurve,
          bsStandard: isSpare ? '' : bsStandard,
          liveSize: isSpare ? '' : liveSize,
          cpcSize: isSpare ? '' : cpcSize,
          maxZs: isSpare ? '' : maxZs?.toString() || '',
          wayNumber,
          isSpare,
          rcdBsStandard: isSpare
            ? ''
            : deviceCategory === 'RCBO' || deviceCategory === 'RCD'
              ? 'BS EN 61009'
              : '',
          rcdType: isSpare
            ? ''
            : ((circuit.device?.rcd_type as string | undefined) ??
              (deviceCategory === 'RCBO' ? 'A' : '')),
          rcdRating: isSpare
            ? ''
            : (circuit.device?.i_delta_n_mA?.toString() ??
              (deviceCategory === 'RCBO' ? '30' : '')),
          r1r2: NA,
          r2: NA,
          zs: NA,
          polarity: NA,
          insulationTestVoltage: isSpare ? 'N/A' : '500',
          insulationLiveNeutral: NA,
          insulationLiveEarth: NA,
          rcdOneX: NA,
          autoFilled: true,
          notes: circuit.notes || (isSpare ? 'Spare way — no circuit fitted' : ''),
        };

        // ── Three-phase: expand into THREE rows (one per phase) ──
        // This is how the schedule of tests for 3P installations is laid out:
        // each phase gets its own row for IR / Zs / RCD test readings.
        if (isThreePhase) {
          return (['L1', 'L2', 'L3'] as const).map((phase, i) => ({
            ...baseRow,
            id: `circuit-${Date.now()}-${index}-${phase}`,
            circuitNumber: `${wayNumber}.${i + 1}`,
            circuitDesignation: `Way ${wayNumber} ${phase}`,
            phaseType: '3P' as const,
            phaseAssignment: phase,
          }));
        }

        // ── Single-phase: one row, with optional phase letter on 3P boards ──
        const rawPhase =
          circuit.phaseAssignment ?? circuit.phase_assignment ?? circuit.phaseDesignation;
        const phaseLetter: 'L1' | 'L2' | 'L3' | null =
          rawPhase === 'L1' || rawPhase === 'L2' || rawPhase === 'L3' ? rawPhase : null;
        return [
          {
            ...baseRow,
            id: `circuit-${Date.now()}-${index}`,
            circuitNumber: String(wayNumber),
            circuitDesignation: phaseLetter ? `Way ${wayNumber} ${phaseLetter}` : `Way ${wayNumber}`,
            phaseType: '1P' as const,
            phaseAssignment: phaseLetter,
          },
        ];
      });

      // Merge with existing circuits or replace
      const existingCircuits = formData.scheduleOfTests || [];
      updateFormData('scheduleOfTests', [...existingCircuits, ...newCircuits]);

      // Store board info - BoardPhotoCapture returns: { make, model, mainSwitch, spd, totalWays, ... }
      if (data.board) {
        updateFormData('boardBrand', data.board.make || '');
        updateFormData('boardModel', data.board.model || '');
        updateFormData('mainSwitchRating', data.board.mainSwitch || '');
        updateFormData('spdStatus', data.board.spd || '');
      }

      setShowBoardScan(false);
      // Stay on testing tab after scan completes
      setCurrentTab('testing');
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formData.scheduleOfTests, updateFormData]
  );

  // ALWAYS save to localStorage before unload - never lose data
  // Also attempt cloud sync and warn user if data hasn't synced
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Locked certs are immutable — writing a draft here only produces a
      // misleading "recovered unsaved changes" toast on reopen.
      if (isLocked) return;
      // CRITICAL: Save current form data to localStorage immediately
      // This is synchronous and fast - ensures data is never lost
      if (formData && currentReportId) {
        draftStorage.saveDraft('eicr', currentReportId, formData);
      } else if (formData && (formData.clientName || formData.installationAddress)) {
        // For new reports, save to 'new' key
        draftStorage.saveDraft('eicr', null, formData);
      }

      // Check if we have unsynced changes to the cloud
      const hasUnsyncedChanges = syncState.status !== 'synced';
      const hasMeaningfulData = formData.clientName || formData.installationAddress;

      if (hasUnsyncedChanges && hasMeaningfulData) {
        // ALWAYS warn the user if data hasn't synced to cloud
        e.preventDefault();
        e.returnValue =
          'Your certificate has NOT been saved to the cloud. If you leave, you may lose your work on other devices.';
        return;
      }

      // Legacy check for syncing state
      const isCurrentlySyncing = syncState.status === 'syncing' || syncState.queuedChanges > 0;
      if (isCurrentlySyncing) {
        e.preventDefault();
        e.returnValue = 'Your certificate is still saving. Are you sure you want to leave?';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [formData, currentReportId, syncState.status, syncState.queuedChanges, isLocked]);

  // Step ticks derive from useEICRValidation so the header ticks, the progress
  // ring and the missing-items sheet can never disagree. Legacy certs saved
  // with a manual completedSections flag still tick (read-path tolerance).
  const legacyCompleted = (formData.completedSections || {}) as Record<string, boolean>;
  const completedTabs: Record<string, boolean> = Object.fromEntries(
    EICR_STEPS.map((step) => [
      step.id,
      legacyCompleted[step.id] === true ||
        !eicrValidation.errors.some((e) => e.tab === step.id),
    ])
  );

  if (isLoadingReport) {
    return (
      <div className="flex items-center justify-center p-8 min-h-[400px]">
        <div className="text-center space-y-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-elec-yellow mx-auto"></div>
          <p className="text-white">Loading report data...</p>
        </div>
      </div>
    );
  }

  // If board scan is open, render full-screen scanner overlay
  if (showBoardScan) {
    return (
      <BoardScannerOverlay
        onAnalysisComplete={handleBoardScanComplete}
        onClose={() => setShowBoardScan(false)}
        title="Scan distribution board"
      />
    );
  }

  const certNumber = formData.certificateNumber as string | undefined;

  return (
    <div className="bg-background min-h-screen prevent-shortcuts">
      {/* v3 shell header — back · title/cert no · save word · progress ring · step tabs */}
      <CertShellHeader
        onBack={onBack}
        title="EICR"
        subtitle={certNumber ? `${certNumber} · BS 7671` : null}
        isSaving={syncState.status === 'syncing'}
        onManualSave={handleManualSave}
        syncStatus={shellSyncStatus}
        progressPercent={eicrValidation.completionPercentage}
        onProgressTap={() => setShowMissingSheet(true)}
        steps={EICR_STEPS}
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
          Same arithmetic as MinorWorksForm/EICForm. Read-only when locked. */}
      <main
        className={cn(
          '-mx-3 px-4 py-4 sm:mx-auto sm:px-4 lg:px-8',
          // Issue carries the two-row footer (Back/Email/Invoice + Generate
          // stacked on mobile) — needs extra clearance.
          currentTab === 'certificate' ? 'pb-48 sm:pb-40 lg:pb-28' : 'pb-32 sm:pb-24',
          isLocked && 'pointer-events-none select-none opacity-95'
        )}
        aria-disabled={isLocked || undefined}
      >
        {/* Current step — keyed so each change replays the lateral slide. */}
        <div
          key={currentTab}
          className={cn(
            /*
             * The schedule of tests is a 34-column table around 3,700px wide.
             * Capping its step at 1,600px on a wide monitor left it scrolling
             * horizontally with several hundred pixels sitting empty beside it
             * — the reading you get is "this table does not fit", when the
             * screen had the room and the cap was refusing it.
             *
             * Every other step is a form, and those keep the cap: an unbounded
             * line length across a 2,500px display is worse than a narrow one.
             */
            currentTab !== 'testing' && 'lg:max-w-[1600px]',
            // …and let it out of the page gutter too. The step sits inside a
            // <main> carrying lg:px-8, so even uncapped the table gave up 64px
            // to padding it does not need — the schedule is its own bordered
            // surface and reads better flush.
            currentTab === 'testing' && 'lg:-mx-8',
            isNavigatingBack ? 'motion-safe:animate-mw-step-back' : 'motion-safe:animate-mw-step-in'
          )}
        >
          <EICRTabContent
            tabValue={currentTab}
            formData={formData}
            onUpdate={updateFormData}
            onOpenBoardScan={() => setShowBoardScan(true)}
            actionsRef={pdfActionsRef}
          />
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
          onGenerate={() => pdfActionsRef.current?.generate()}
          canGenerate={canGenerate}
          generateLabel="Generate certificate"
          previewReportType="eicr"
          previewReportId={currentReportId}
          previewData={formData}
          lastStepActions={
            <>
              {/* ELE-1460 — Email + Invoice live here, not duplicated inside
                  the Issue tab. Handlers registered by EICRSummary. */}
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
        hasUnsavedChanges={syncState.status === 'syncing' || syncState.queuedChanges > 0}
      />

      {/* Tap-the-ring — what's still missing, grouped by step, jump straight there */}
      <Sheet open={showMissingSheet} onOpenChange={setShowMissingSheet}>
        <SheetContent
          side="bottom"
          className="h-[85vh] rounded-t-2xl border-white/[0.1] p-0 overflow-hidden"
          // ELE-1487 — when a "Go" has sent us to a field, Radix must not pull
          // focus back to the progress ring as it closes. Closing any other way
          // keeps the default restore, which is the correct behaviour for a
          // keyboard user who simply dismissed the sheet.
          onCloseAutoFocus={(e) => {
            if (jumpingToFieldRef.current) {
              e.preventDefault();
              jumpingToFieldRef.current = false;
            }
          }}
        >
          <div className="flex h-full flex-col bg-background">
            <div className="border-b border-white/[0.08] px-4 pb-3 pt-4">
              <h2 className="text-base font-bold text-white">
                {eicrValidation.errors.length === 0 ? 'Ready to issue' : 'Still to complete'}
              </h2>
              {/* Full white — white/60 renders grey, which this app does not use. */}
              <p className="text-[12px] font-medium text-white tabular-nums">
                {eicrValidation.completionPercentage}% complete
                {eicrValidation.errors.length > 0 &&
                  ` · ${eicrValidation.errors.length} required ${
                    eicrValidation.errors.length === 1 ? 'field' : 'fields'
                  } remaining`}
              </p>
            </div>
            <div className="flex-1 space-y-5 overflow-y-auto px-4 py-4">
              {eicrValidation.errors.length === 0 ? (
                <p className="text-sm text-white/85">
                  Everything required is filled in. Head to Issue to generate the report.
                </p>
              ) : (
                EICR_STEPS.map((step) => {
                  const items = eicrValidation.errors.filter((e) => e.tab === step.id);
                  if (items.length === 0) return null;
                  return (
                    <div key={step.id}>
                      {/* ELE-1487 — a count per section, so the work is visible
                          without opening every group. */}
                      <div className="mb-2 flex items-baseline justify-between">
                        <h3 className="text-[13px] font-semibold text-white">{step.label}</h3>
                        <span className="text-[11.5px] font-semibold text-white tabular-nums">
                          {items.length}
                        </span>
                      </div>
                      <div className="space-y-1.5">
                        {items.map((item) => (
                          <button
                            key={item.field}
                            type="button"
                            onClick={() => {
                              // ELE-1487 — switching tab is not arriving. Change
                              // step, then scroll to the field, focus it and
                              // flash it. The step remounts, so the helper polls
                              // for the target rather than guessing a delay.
                              jumpingToFieldRef.current = true;
                              setShowMissingSheet(false);
                              handleTabChange(step.id);
                              setPendingFocusField(item.field);
                            }}
                            className="flex min-h-11 w-full items-center justify-between gap-3 rounded-xl border border-white/[0.1] bg-white/[0.04] px-3.5 py-2 text-left text-sm font-medium text-white touch-manipulation transition-transform active:scale-[0.99]"
                          >
                            <span className="truncate">{item.message}</span>
                            <span className="shrink-0 text-[11.5px] font-semibold text-elec-yellow">
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

const EICRForm = ({
  onBack,
  initialReportId,
}: {
  onBack: () => void;
  initialReportId?: string | null;
}) => {
  return (
    <EICRFormProvider initialReportId={initialReportId}>
      <Suspense fallback={<SectionSkeleton />}>
        <EICRFormInner onBack={onBack} />
      </Suspense>
    </EICRFormProvider>
  );
};

export default EICRForm;
