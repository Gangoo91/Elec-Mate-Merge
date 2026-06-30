import React, { Suspense } from 'react';
import { EICFormProvider, useEICForm } from './eic/EICFormProvider';
import { useEICTabs, EICTabValue } from '@/hooks/useEICTabs';
import { useCertPrefill } from '@/hooks/useCertPrefill';
import { SectionSkeleton } from '@/components/ui/page-skeleton';
import EICFormHeader from './eic/EICFormHeader';
import CertLockBar from './inspection/CertLockBar';
import DuplicatedFromBanner from './certificates/DuplicatedFromBanner';
import LastCertSuggestionCard from './certificates/LastCertSuggestionCard';
import EICFormTabs from './eic/EICFormTabs';
import StartNewEICRDialog from './StartNewEICRDialog';
import { BoardScannerOverlay } from './testing/BoardScannerOverlay';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

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

  // Last-cert prompt — soft suggestion to copy supply / earthing / BS amendment
  // from the user's most recent EIC at the same address. User applies on tap.
  const prefillAddress =
    (formData.installationAddress as string) ||
    (formData.clientAddress as string) ||
    '';
  const { suggestion: lastCertSuggestion, dismiss: dismissLastCert, buildPatch } =
    useCertPrefill(prefillAddress, 'eic');

  const handleApplyLastCert = () => {
    const patch = buildPatch();
    Object.entries(patch).forEach(([key, value]) => updateFormData(key, value));
    dismissLastCert();
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

      {/* ELE-1037 — lock / version bar (Issue & lock, read-only, Amend) */}
      <CertLockBar
        isLocked={isLocked}
        lockedAt={lockedAt}
        editVersion={editVersion}
        canIssue={!isLocked && !!currentReportId && canGenerateCertificate()}
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
        <div className="px-4 pt-3">
          <LastCertSuggestionCard
            suggestion={lastCertSuggestion}
            onApply={handleApplyLastCert}
            onDismiss={dismissLastCert}
          />
        </div>
      )}

      {/* Main Content — full-width mobile. Pad bottom to clear the fixed nav bar. */}
      <main className="py-4 pb-8 sm:px-4 sm:pb-8">
        {/* Locked certificates are read-only — autosave is already gated in the
            provider; this stops on-screen edits. */}
        <div
          className={cn(isLocked && 'pointer-events-none select-none opacity-95')}
          aria-disabled={isLocked || undefined}
        >
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
          onJumpToTab={(tab) => setCurrentTab(tab as EICTabValue)}
        />
        </div>
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
