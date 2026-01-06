import React, { Suspense, useState, useCallback } from 'react';
import { EICRFormProvider, useEICRForm } from './eicr/EICRFormProvider';
import EICRFormHeader from './eicr/EICRFormHeader';
import EICRFormContent from './eicr/EICRFormContent';
import { BoardScanFlow } from './testing/BoardScanFlow';

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

  // Handle board scan completion - populate circuits
  const handleBoardScanComplete = useCallback((data: {
    board: any;
    circuits: any[];
    images: string[];
  }) => {
    // Convert detected circuits to test results format matching TestResult type
    const newCircuits = data.circuits.map((circuit, index) => ({
      id: `circuit-${Date.now()}-${index}`,
      circuitNumber: circuit.index?.toString() || String(index + 1),
      circuitDesignation: `C${circuit.index?.toString() || String(index + 1)}`,
      circuitDescription: circuit.label_text || `Circuit ${index + 1}`,
      circuitType: circuit.circuit_type || '',
      type: circuit.circuit_type || '',
      protectiveDeviceType: circuit.device?.type || 'MCB',
      protectiveDeviceRating: circuit.device?.rating_amps?.toString() || '',
      protectiveDeviceCurve: circuit.device?.curve || '',
      phaseType: circuit.phase === '3P' ? '3P' : '1P' as '1P' | '3P',
      // Default test values
      r1r2: '',
      r2: '',
      zs: '',
      rcdRating: '',
      rcdType: '',
      polarity: '',
      insulationTestVoltage: '500V',
      insulationLiveNeutral: '',
      insulationLiveEarth: '',
      autoFilled: true,
      notes: `AI detected circuit - please verify`,
    }));

    // Merge with existing circuits or replace
    const existingCircuits = formData.scheduleOfTests || [];
    updateFormData('scheduleOfTests', [...existingCircuits, ...newCircuits]);

    // Store board info
    if (data.board) {
      updateFormData('boardBrand', data.board.brand || '');
      updateFormData('boardModel', data.board.model || '');
      updateFormData('mainSwitchRating', data.board.main_switch_rating || '');
      updateFormData('spdStatus', data.board.spd_status || '');
    }

    // Store board images
    if (data.images?.length > 0) {
      updateFormData('boardImages', data.images);
    }

    setShowBoardScan(false);
  }, [formData.scheduleOfTests, updateFormData]);

  // Warn before closing tab if there are unsynchronised changes
  React.useEffect(() => {
    const hasUnsaved = syncState.status === 'syncing' || syncState.queuedChanges > 0;
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsaved) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [syncState.status, syncState.queuedChanges]);


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
  if (formData.inspectionItems?.length > 0) completedSections.add(1);
  if (formData.scheduleOfTests?.length > 0) completedSections.add(2);
  if (formData.inspectorName && formData.inspectorSignature) completedSections.add(3);

  // If board scan is open, render full-screen scanner
  if (showBoardScan) {
    return (
      <BoardScanFlow
        onComplete={handleBoardScanComplete}
        onCancel={() => setShowBoardScan(false)}
        hints={{
          board_type: formData.installationType === 'commercial' ? 'commercial' : 'domestic',
          is_three_phase: formData.supplyType === 'TN-S' || formData.phases === 'three',
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-sidebar">
      <div className="px-3 sm:px-4 py-3 space-y-3 prevent-shortcuts">
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
          currentTab={0}
          completedSections={completedSections}
          onOpenBoardScan={() => setShowBoardScan(true)}
        />

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
        />
      </div>
    </div>
  );
};

const EICRForm = ({ onBack, initialReportId }: { onBack: () => void; initialReportId?: string | null }) => {
  return (
    <EICRFormProvider initialReportId={initialReportId}>
      <Suspense fallback={<div className="flex items-center justify-center p-8">Loading...</div>}>
        <EICRFormInner onBack={onBack} />
      </Suspense>
    </EICRFormProvider>
  );
};

export default EICRForm;
