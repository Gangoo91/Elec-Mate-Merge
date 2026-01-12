import React, { useMemo } from 'react';
import { EICTabValue } from '@/hooks/useEICTabs';
import { useIsMobile } from '@/hooks/use-mobile';
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

// Animation variants for tab transitions
const tabVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 20 : -20,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -20 : 20,
    opacity: 0
  })
};

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
  const [direction, setDirection] = React.useState(0);
  const prevTabRef = React.useRef(currentTab);

  // Track tab change direction for animation
  React.useEffect(() => {
    const tabs: EICTabValue[] = ['details', 'inspection', 'testing', 'declarations', 'certificate'];
    const prevIndex = tabs.indexOf(prevTabRef.current);
    const currIndex = tabs.indexOf(currentTab);
    setDirection(currIndex > prevIndex ? 1 : -1);
    prevTabRef.current = currentTab;
  }, [currentTab]);

  const handleTabChange = (tab: EICTabValue) => {
    onTabChange(tab);
  };

  // Render tab content based on current tab
  const renderTabContent = () => {
    switch (currentTab) {
      case 'details':
        return (
          <div className="md:max-w-5xl mx-auto space-y-6">
            <EICInstallationDetails formData={formData} onUpdate={onUpdate} />
            <EICTabNavigation {...tabNavigationProps} />
          </div>
        );
      case 'inspection':
        return (
          <div className="md:max-w-6xl mx-auto space-y-6">
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
          <div className="md:max-w-5xl mx-auto space-y-6">
            <EICDeclarations formData={formData} onUpdate={onUpdate} />
            <EICTabNavigation {...tabNavigationProps} />
          </div>
        );
      case 'certificate':
        return (
          <div className="md:max-w-5xl mx-auto space-y-6">
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
    <div className="space-y-4 sm:space-y-6">
      {/* Step Indicator */}
      <EICStepIndicator
        currentTab={currentTab}
        onTabChange={handleTabChange}
        isTabComplete={isTabComplete}
      />

      {/* Tab Content with Animation */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentTab}
          custom={direction}
          variants={tabVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
        >
          {renderTabContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default EICFormTabs;
