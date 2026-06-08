import React, { Suspense, useState, useCallback, useEffect } from 'react';
import { EICRFormProvider, useEICRForm } from './eicr/EICRFormProvider';
import { SectionSkeleton } from '@/components/ui/page-skeleton';
import { draftStorage } from '@/utils/draftStorage';
import EICRFormHeader from './eicr/EICRFormHeader';
import EICRFormContent from './eicr/EICRFormContent';
import EICRLockBar from './eicr/EICRLockBar';
import DuplicatedFromBanner from './certificates/DuplicatedFromBanner';
import { cn } from '@/lib/utils';
import LastCertSuggestionCard from './certificates/LastCertSuggestionCard';
import EICRValidationPanel from './EICRValidationPanel';
import { useCertPrefill } from '@/hooks/useCertPrefill';
import { BoardScannerOverlay } from './testing/BoardScannerOverlay';
import { pickCableSize, getCpcForLive, BS_STANDARD_MAP } from '@/utils/circuitDefaults';
import { getMaxZsFromDeviceDetails, getMaxZsWithRcd } from '@/utils/zsCalculations';

// Tab value type
type TabValue = 'details' | 'inspection' | 'testing' | 'inspector' | 'certificate';
const TAB_ORDER: TabValue[] = ['details', 'inspection', 'testing', 'inspector', 'certificate'];

const EICRFormInner = ({ onBack }: { onBack: () => void }) => {
  const {
    formData,
    updateFormData,
    currentReportId,
    showStartNewDialog,
    setShowStartNewDialog,
    handleStartNew,
    confirmStartNew,
    confirmDuplicate,
    handleLoadSavePoint,
    handleManualSave,
    syncState,
    isOnline,
    isAuthenticated,
    isLoadingReport,
    isLocked,
    lockedAt,
    editVersion,
    lockReport,
    amendReport,
  } = useEICRForm();

  // Board scan state
  const [showBoardScan, setShowBoardScan] = useState(false);

  // Lifted tab state - controlled from header
  const [currentTab, setCurrentTab] = useState<TabValue>('details');
  const currentTabIndex = TAB_ORDER.indexOf(currentTab);

  // Handle tab change from header clicks
  const handleTabChange = useCallback((index: number) => {
    if (index >= 0 && index < TAB_ORDER.length) {
      setCurrentTab(TAB_ORDER[index]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  // Handle tab change from SmartTabs
  const handleTabValueChange = useCallback((value: string) => {
    setCurrentTab(value as TabValue);
  }, []);

  // Last-cert prompt — soft suggestion to copy supply / earthing / BS amendment
  // from the user's most recent EICR at the same address.
  const prefillAddress =
    (formData.installationAddress as string) ||
    (formData.clientAddress as string) ||
    '';
  const { suggestion: lastCertSuggestion, dismiss: dismissLastCert, buildPatch } =
    useCertPrefill(prefillAddress, 'eicr', { excludeReportId: currentReportId || undefined });

  const handleApplyLastCert = () => {
    const patch = buildPatch();
    Object.entries(patch).forEach(([key, value]) => updateFormData(key, value));
    dismissLastCert();
  };

  // Handle board scan completion - populate circuits
  // BoardPhotoCapture returns: { circuits, board, metadata, warnings, decisions }
  const handleBoardScanComplete = useCallback(
    (data: { board: any; circuits: any[]; metadata?: any; warnings?: string[] }) => {
      // Convert detected circuits to test results format matching TestResult type
      // BoardPhotoCapture already transforms circuits to: { position, label, device, rating, curve, ... }
      const newCircuits = data.circuits.flatMap((circuit, index) => {
        // Accept both legacy `device: 'MCB'` (string) and new
        // `device: { category: 'MCB', ... }` (object) shapes.
        const deviceCategory: string =
          (typeof circuit.device === 'string'
            ? circuit.device
            : circuit.device?.category) || 'MCB';
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
    [formData.scheduleOfTests, updateFormData]
  );

  // ALWAYS save to localStorage before unload - never lose data
  // Also attempt cloud sync and warn user if data hasn't synced
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // CRITICAL: Save current form data to localStorage immediately
      // This is synchronous and fast - ensures data is never lost
      if (formData && currentReportId) {
        draftStorage.saveDraft('eicr', currentReportId, formData);
        console.log('[EICR] Saved draft on beforeunload');
      } else if (formData && (formData.clientName || formData.installationAddress)) {
        // For new reports, save to 'new' key
        draftStorage.saveDraft('eicr', null, formData);
        console.log('[EICR] Saved new draft on beforeunload');
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
  }, [formData, currentReportId, syncState.status, syncState.queuedChanges]);

  if (isLoadingReport) {
    return (
      <div className="flex items-center justify-center p-8 min-h-[400px]">
        <div className="text-center space-y-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading report data...</p>
        </div>
      </div>
    );
  }

  // Calculate section completion for progress
  const completedSections = new Set<number>();
  if (formData.clientName && formData.installationAddress) completedSections.add(0);
  if (formData.inspectionItems?.some((item: any) => item.outcome && item.outcome !== ''))
    completedSections.add(1);
  // Tests tab is complete only if circuits have actual test data filled in
  const hasCompletedTests = formData.scheduleOfTests?.some(
    (test: any) => test.zs || test.polarity || test.insulationResistance || test.insulationLiveEarth
  );
  if (hasCompletedTests) completedSections.add(2);
  if (formData.inspectorName && formData.inspectorSignature) completedSections.add(3);

  // If board scan is open, render full-screen scanner overlay
  if (showBoardScan) {
    return (
      <BoardScannerOverlay
        onAnalysisComplete={handleBoardScanComplete}
        onClose={() => setShowBoardScan(false)}
        title="Scan Distribution Board"
      />
    );
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Header — fire alarm pattern */}
      <div className="bg-background">
        <div className="px-2 py-2.5">
          <EICRFormHeader
            onBack={onBack}
            currentReportId={currentReportId}
            hasUnsavedChanges={syncState.status === 'syncing' || syncState.queuedChanges > 0}
            isSaving={syncState.status === 'syncing'}
            lastSaveTime={syncState.lastSyncTime}
            onStartNew={handleStartNew}
            onManualSave={handleManualSave}
            formData={formData}
            syncStatus={syncState.status}
            lastSyncTime={syncState.lastSyncTime}
            isOnline={isOnline}
            isAuthenticated={isAuthenticated}
            currentTab={currentTabIndex}
            completedSections={completedSections}
            onOpenBoardScan={() => setShowBoardScan(true)}
            onTabChange={handleTabChange}
          />
        </div>
        <div className="h-[1px] bg-gradient-to-r from-elec-yellow/40 via-elec-yellow/20 to-transparent" />
      </div>

      {/* ELE-1037 — lock / version bar (Issue & lock, read-only, Amend) */}
      <EICRLockBar
        isLocked={isLocked}
        lockedAt={lockedAt}
        editVersion={editVersion}
        canIssue={
          !isLocked &&
          !!currentReportId &&
          !!formData.inspectorName &&
          !!formData.inspectorSignature
        }
        onLock={lockReport}
        onAmend={amendReport}
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
        <div className="px-4 pt-3">
          <LastCertSuggestionCard
            suggestion={lastCertSuggestion}
            onApply={handleApplyLastCert}
            onDismiss={dismissLastCert}
          />
        </div>
      )}

      {/* Main Content — always full-width; the single-column tabs (Details /
          Inspector / Certificate) centre themselves at the content level, so
          the Testing & Inspection tables reliably get the full width. */}
      <main className="py-4 pb-48 sm:px-4 sm:pb-8">
        {/* Validation panel — always visible, tap a row to jump to that tab */}
        <div className="px-4 mb-3 sm:px-0">
          <EICRValidationPanel
            formData={formData}
            onJumpToTab={(tab) => setCurrentTab(tab)}
            isLastTab={currentTabIndex === TAB_ORDER.length - 1}
          />
        </div>
        {/* When the certificate is locked the form body is read-only — autosave
            is already gated off in the provider; this stops on-screen edits. */}
        <div
          className={cn(isLocked && 'pointer-events-none select-none opacity-95')}
          aria-disabled={isLocked || undefined}
        >
          <EICRFormContent
            formData={formData}
            onUpdate={updateFormData}
            hasDraft={false}
            draftTimestamp={0}
            onLoadDraft={() => {}}
            onStartNewFromDraft={() => {}}
            hasUnsavedChanges={syncState.status === 'syncing' || syncState.queuedChanges > 0}
            showStartNewDialog={showStartNewDialog}
            onCloseStartNewDialog={() => setShowStartNewDialog(false)}
            onConfirmStartNew={confirmStartNew}
            onConfirmDuplicate={confirmDuplicate}
            onOpenBoardScan={() => setShowBoardScan(true)}
            currentTab={currentTab}
            onTabChange={handleTabValueChange}
          />
        </div>
      </main>
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
