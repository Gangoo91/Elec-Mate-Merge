import React from 'react';
import { EICTabValue } from '@/hooks/useEICTabs';
import { motion, AnimatePresence } from 'framer-motion';
import EICStepIndicator from './EICStepIndicator';
import EICInstallationDetails from './EICInstallationDetails';
import EICScheduleOfInspections from './EICScheduleOfInspections';
import EICScheduleOfTesting from './EICScheduleOfTesting';
import EICDeclarations from './EICDeclarations';
import EICCertificateTab from './EICCertificateTab';
import EICTabNavigation from './EICTabNavigation';
import EICObservationsSection from './EICObservationsSection';
import EICValidationPanel from './EICValidationPanel';
import { EICObservation } from '@/hooks/useEICObservations';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface EICFormTabsProps {
  currentTab: EICTabValue;
  onTabChange: (value: string) => void;
  canAccessTab: (tabId: EICTabValue) => boolean;
  isTabComplete: (tabId: EICTabValue) => boolean;
  formData: any;
  onUpdate: (field: string, value: any) => void;
  tabNavigationProps: {
    currentTab: EICTabValue;
    currentTabIndex: number;
    totalTabs: number;
    canNavigateNext: boolean;
    canNavigatePrevious: boolean;
    navigateNext: () => void;
    navigatePrevious: () => void;
    getProgressPercentage: () => number;
    isCurrentTabComplete: boolean;
    currentTabHasRequiredFields: boolean;
    onToggleComplete: () => void;
    onGenerateCertificate?: () => void;
    canGenerateCertificate?: boolean;
  };
  observationsProps: {
    observations: EICObservation[];
    reportId: string;
    onAddObservation: () => string;
    onUpdateObservation: (id: string, field: keyof EICObservation, value: any) => void;
    onRemoveObservation: (id: string) => void;
    onAutoCreateObservation: (inspectionItem: { id: string; item: string; clause: string }) => string;
    onNavigateToObservations: () => void;
    onSyncToInspectionItem?: (inspectionItemId: string, newOutcome: string) => void;
  };
  onGenerateCertificate: () => void;
  onSaveDraft: () => void;
  canGenerateCertificate?: boolean;
}

const EICFormTabs: React.FC<EICFormTabsProps> = ({
  currentTab,
  onTabChange,
  canAccessTab,
  isTabComplete,
  formData,
  onUpdate,
  tabNavigationProps,
  observationsProps,
  onGenerateCertificate,
  onSaveDraft,
  canGenerateCertificate = true
}) => {
  const isMobile = useIsMobile();

  const handleTabChange = (tab: EICTabValue) => {
    onTabChange(tab);
  };

  // Render tab content based on current tab
  const renderTabContent = () => {
    switch (currentTab) {
      case 'details':
        return (
          <div className={cn("space-y-6", isMobile ? "" : "md:max-w-5xl mx-auto")}>
            <EICInstallationDetails formData={formData} onUpdate={onUpdate} />
            <EICTabNavigation {...tabNavigationProps} />
          </div>
        );
      case 'inspection':
        return (
          <div className={cn("space-y-6", isMobile ? "" : "md:max-w-6xl mx-auto")}>
            <EICScheduleOfInspections
              formData={formData}
              onUpdate={onUpdate}
            />
            <EICObservationsSection
              observations={observationsProps.observations}
              reportId={observationsProps.reportId}
              onAddObservation={observationsProps.onAddObservation}
              onUpdateObservation={observationsProps.onUpdateObservation}
              onRemoveObservation={observationsProps.onRemoveObservation}
              onSyncToInspectionItem={observationsProps.onSyncToInspectionItem}
              className="mt-6"
            />
            <EICTabNavigation {...tabNavigationProps} />
          </div>
        );
      case 'testing':
        return (
          <div className="w-full max-w-none space-y-6">
            <EICScheduleOfTesting formData={formData} onUpdate={onUpdate} />
            <EICTabNavigation {...tabNavigationProps} />
          </div>
        );
      case 'declarations':
        return (
          <div className={cn("space-y-6", isMobile ? "" : "md:max-w-5xl mx-auto")}>
            <EICDeclarations formData={formData} onUpdate={onUpdate} />
            <EICTabNavigation {...tabNavigationProps} />
          </div>
        );
      case 'certificate':
        return (
          <div className={cn("space-y-6", isMobile ? "" : "md:max-w-5xl mx-auto")}>
            <EICCertificateTab
              formData={formData}
              onUpdate={onUpdate}
              reportId={observationsProps.reportId}
              onGenerateCertificate={onGenerateCertificate}
              onSaveDraft={onSaveDraft}
              canGenerateCertificate={canGenerateCertificate}
            />
            <EICValidationPanel formData={formData} />
            <EICTabNavigation {...tabNavigationProps} showGenerate />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={cn("space-y-4 sm:space-y-6", isMobile && "-mx-4")}>
      {/* Step Indicator */}
      <div className={cn(isMobile && "px-4")}>
        <EICStepIndicator
          currentTab={currentTab}
          onTabChange={handleTabChange}
          isTabComplete={isTabComplete}
        />
      </div>

      {/* Tab Content with Animation - edge-to-edge on mobile */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className={cn(isMobile && "px-4")}
        >
          {renderTabContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default EICFormTabs;
