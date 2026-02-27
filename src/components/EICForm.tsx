import React, { Suspense, useState } from 'react';
import { EICFormProvider, useEICForm } from './eic/EICFormProvider';
import { useEICTabs, EICTabValue } from '@/hooks/useEICTabs';
import { SectionSkeleton } from '@/components/ui/page-skeleton';
import EICFormHeader from './eic/EICFormHeader';
import EICFormTabs from './eic/EICFormTabs';
import StartNewEICRDialog from './StartNewEICRDialog';
import { BoardScannerOverlay } from './testing/BoardScannerOverlay';
import { CircuitBoard } from 'lucide-react';

const EICFormInner = ({ onBack }: { onBack: () => void }) => {
  const {
    formData,
    updateFormData,
    isSaving,
    hasUnsavedChanges,
    handleManualSave,
    handleStartNew,
    handleGenerateCertificate,
    syncState,
    isOnline,
    isAuthenticated,
    syncNow,
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
    canGenerateCertificate,
  } = useEICForm();

  // Tabs hook — lives in the inner component so tab state is local to the UI
  const {
    currentTab,
    setCurrentTab,
    currentTabIndex,
    totalTabs,
    canAccessTab,
    hasRequiredFields,
    isTabComplete,
    toggleTabComplete,
    canNavigateNext,
    canNavigatePrevious,
    navigateNext,
    navigatePrevious,
    getProgressPercentage,
  } = useEICTabs(formData);

  const handleTabChange = (value: string) => {
    setCurrentTab(value as EICTabValue);
  };

  const handleToggleComplete = () => {
    toggleTabComplete(currentTab, updateFormData);
  };

  const tabNavigationProps = {
    currentTab,
    currentTabIndex,
    totalTabs,
    canNavigateNext: canNavigateNext(),
    canNavigatePrevious: canNavigatePrevious(),
    navigateNext,
    navigatePrevious,
    getProgressPercentage,
    isCurrentTabComplete: isTabComplete(currentTab),
    currentTabHasRequiredFields: hasRequiredFields(currentTab),
    onToggleComplete: handleToggleComplete,
    onGenerateCertificate: handleGenerateCertificate,
    canGenerateCertificate: canGenerateCertificate(),
  };

  // Full-screen board scanner overlay
  if (showBoardScan) {
    return (
      <BoardScannerOverlay
        onAnalysisComplete={handleBoardScanComplete}
        onClose={() => setShowBoardScan(false)}
        title="Scan Distribution Board"
      />
    );
  }

  // Loading state for design pre-population
  if (isLoadingDesign) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center space-y-4">
          <div className="p-4 rounded-full bg-elec-yellow/10 inline-flex">
            <CircuitBoard className="h-8 w-8 text-elec-yellow animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Loading Design</h3>
            <p className="text-sm text-muted-foreground">
              Pre-filling circuits from Circuit Designer...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <div className="px-4 py-3 sm:px-6 lg:px-8">
        <EICFormHeader
          onBack={onBack}
          isSaving={isSaving}
          onManualSave={handleManualSave}
          onStartNew={handleStartNew}
          formData={formData}
          syncState={syncState}
          isOnline={isOnline}
          isAuthenticated={isAuthenticated}
          onSyncNow={syncNow}
        />
      </div>

      <main className="px-4 py-6 sm:px-6 lg:px-8 pb-20 sm:pb-6">
        <EICFormTabs
          currentTab={currentTab}
          onTabChange={handleTabChange}
          canAccessTab={canAccessTab}
          isTabComplete={isTabComplete}
          formData={formData}
          onUpdate={updateFormData}
          tabNavigationProps={tabNavigationProps}
          observationsProps={observationsProps}
          onGenerateCertificate={handleGenerateCertificate}
          onSaveDraft={handleManualSave}
          canGenerateCertificate={canGenerateCertificate()}
          onSyncOnTabChange={onTabChange}
        />
      </main>

      <StartNewEICRDialog
        isOpen={showStartNewDialog}
        onClose={() => setShowStartNewDialog(false)}
        onConfirm={confirmStartNew}
        onDuplicate={confirmDuplicate}
        hasUnsavedChanges={hasUnsavedChanges}
      />
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
