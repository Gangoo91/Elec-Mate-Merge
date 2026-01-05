import React, { Suspense } from 'react';
import { EICRFormProvider, useEICRForm } from './eicr/EICRFormProvider';
import EICRFormHeader from './eicr/EICRFormHeader';
import EICRFormContent from './eicr/EICRFormContent';

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

  return (
    <div className="min-h-screen mobile-safe-area">
      <div className="space-y-6 md:space-y-8 animate-fade-in px-4 sm:px-6 md:px-8 pb-8 md:pb-12 max-w-7xl mx-auto pt-4 md:pt-6 prevent-shortcuts">
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
