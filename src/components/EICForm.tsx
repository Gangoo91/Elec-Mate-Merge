import React, { Suspense } from 'react';
import { EICFormProvider, useEICForm } from './eic/EICFormProvider';
import { useEICTabs, EICTabValue } from '@/hooks/useEICTabs';
import { SectionSkeleton } from '@/components/ui/page-skeleton';
import EICFormHeader from './eic/EICFormHeader';
import EICFormTabs from './eic/EICFormTabs';
import StartNewEICRDialog from './StartNewEICRDialog';
import { BoardScannerOverlay } from './testing/BoardScannerOverlay';
import { Loader2 } from 'lucide-react';

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
        <div className="text-center space-y-3">
          <Loader2 className="h-8 w-8 text-elec-yellow animate-spin mx-auto" />
          <div>
            <h3 className="text-sm font-semibold text-white">Loading Design</h3>
            <p className="text-xs text-white mt-1">Pre-filling circuits...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Header — EICR pattern */}
      <div className="bg-background">
        <div className="px-2 py-2.5">
          <EICFormHeader
            onBack={onBack}
            isSaving={isSaving}
            onManualSave={handleManualSave}
            formData={formData}
            syncState={syncState}
            isOnline={isOnline}
            isAuthenticated={isAuthenticated}
          />
        </div>
        <div className="h-[1px] bg-gradient-to-r from-elec-yellow/40 via-elec-yellow/20 to-transparent" />
      </div>

      {/* Main Content — full-width mobile */}
      <main className="py-4 pb-48 sm:px-4 sm:pb-8">
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
