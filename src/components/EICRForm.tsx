import React, { Suspense, useState, useCallback, useEffect } from 'react';
import { EICRFormProvider, useEICRForm } from './eicr/EICRFormProvider';
import { SectionSkeleton } from '@/components/ui/page-skeleton';
import { draftStorage } from '@/utils/draftStorage';
import EICRFormHeader from './eicr/EICRFormHeader';
import EICRFormContent from './eicr/EICRFormContent';
import { BoardScannerOverlay } from './testing/BoardScannerOverlay';
import { getCableSizeForRating, getCpcForLive, BS_STANDARD_MAP } from '@/utils/circuitDefaults';
import { getMaxZsFromDeviceDetails } from '@/utils/zsCalculations';

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

  // Handle board scan completion - populate circuits
  // BoardPhotoCapture returns: { circuits, board, metadata, warnings, decisions }
  const handleBoardScanComplete = useCallback(
    (data: { board: any; circuits: any[]; metadata?: any; warnings?: string[] }) => {
      // Convert detected circuits to test results format matching TestResult type
      // BoardPhotoCapture already transforms circuits to: { position, label, device, rating, curve, ... }
      const newCircuits = data.circuits.map((circuit, index) => {
        const ratingAmps = circuit.rating || null;
        const deviceCategory = circuit.device || 'MCB';
        const deviceCurve = circuit.curve || 'B';

        // Get cable size from detected rating
        const liveSize = getCableSizeForRating(ratingAmps) || '2.5mm';
        const cpcSize = getCpcForLive(liveSize) || '1.5mm';

        // Get BS standard from device category
        const bsStandard = BS_STANDARD_MAP[deviceCategory] || 'MCB (BS EN 60898)';

        // Calculate Max Zs from detected device
        const maxZs = getMaxZsFromDeviceDetails(
          bsStandard,
          deviceCurve,
          ratingAmps?.toString() || '',
          circuit.label || ''
        );

        return {
          id: `circuit-${Date.now()}-${index}`,
          circuitNumber: circuit.position?.toString() || String(index + 1),
          circuitDesignation: `C${circuit.position?.toString() || String(index + 1)}`,
          circuitDescription: circuit.label || `Circuit ${index + 1}`,
          circuitType: '',
          type: '',
          // Use DETECTED device values
          protectiveDeviceType: deviceCategory,
          protectiveDeviceRating: ratingAmps?.toString() || '',
          protectiveDeviceCurve: deviceCurve,
          bsStandard: bsStandard,
          // Cable sizes from detected rating
          liveSize: liveSize,
          cpcSize: cpcSize,
          // Max Zs calculated from BS 7671 tables
          maxZs: maxZs?.toString() || '',
          phaseType: circuit.phase === '3P' ? '3P' : ('1P' as '1P' | '3P'),
          // RCD details if RCBO
          rcdBsStandard: deviceCategory === 'RCBO' ? 'RCBO (BS EN 61009)' : '',
          rcdType: deviceCategory === 'RCBO' ? 'A' : '',
          rcdRating: deviceCategory === 'RCBO' ? '30' : '',
          // Default test values - user must fill these
          r1r2: '',
          r2: '',
          zs: '',
          polarity: '',
          insulationTestVoltage: '500',
          insulationLiveNeutral: '',
          insulationLiveEarth: '',
          rcdOneX: '',
          autoFilled: true,
          notes: circuit.notes || '',
        };
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
    <div className="bg-background">
      {/* Header - matches EIC structure */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
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
      </div>

      {/* Main Content - matches EIC structure */}
      <main className="max-w-6xl mx-auto px-4 py-6 sm:px-6 lg:px-8 pb-20 sm:pb-6">
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
