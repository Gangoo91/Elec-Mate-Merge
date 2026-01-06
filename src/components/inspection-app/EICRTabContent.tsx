import React, { useState } from 'react';
import { MobileTabsContent } from '@/components/ui/mobile-tabs';
import { EICRTabValue } from '@/hooks/useEICRTabs';
import { useOrientation } from '@/hooks/useOrientation';
import EICRDetails from './EICRDetails';
import EICRInspectionChecklist from './EICRInspectionChecklist';
import EICRScheduleOfTests from './EICRScheduleOfTests';
import EICRInspectorDetails from './EICRInspectorDetails';
import { EICRCertificateTab } from './certificate-completion/EICRCertificateTab';
import EICRTabNavigation from './EICRTabNavigation';

interface EICRTabContentProps {
  tabValue: EICRTabValue;
  formData: any;
  onUpdate: (field: string, value: any) => void;
  isMobile: boolean;
  currentTab: EICRTabValue;
  currentTabIndex: number;
  totalTabs: number;
  canNavigateNext: () => boolean;
  canNavigatePrevious: () => boolean;
  navigateNext: () => void;
  navigatePrevious: () => void;
  getProgressPercentage: () => number;
  isCurrentTabComplete: () => boolean;
  currentTabHasRequiredFields: () => boolean;
  onToggleComplete: () => void;
}

const EICRTabContent = ({
  tabValue,
  formData,
  onUpdate,
  isMobile,
  currentTab,
  currentTabIndex,
  totalTabs,
  canNavigateNext,
  canNavigatePrevious,
  navigateNext,
  navigatePrevious,
  getProgressPercentage,
  isCurrentTabComplete,
  currentTabHasRequiredFields,
  onToggleComplete
}: EICRTabContentProps) => {
  const [isInspectorSectionOpen, setIsInspectorSectionOpen] = useState(true);

  const renderTabNavigation = () => {
    return (
      <EICRTabNavigation
        currentTab={currentTab}
        currentTabIndex={currentTabIndex}
        totalTabs={totalTabs}
        canNavigateNext={canNavigateNext()}
        canNavigatePrevious={canNavigatePrevious()}
        navigateNext={navigateNext}
        navigatePrevious={navigatePrevious}
        getProgressPercentage={getProgressPercentage}
        isCurrentTabComplete={isCurrentTabComplete()}
        currentTabHasRequiredFields={currentTabHasRequiredFields()}
        onToggleComplete={onToggleComplete}
      />
    );
  };

  const renderContent = () => {
    switch (tabValue) {
      case 'details':
        return <EICRDetails formData={formData} onUpdate={onUpdate} />;
      case 'inspection':
        return <EICRInspectionChecklist formData={formData} onUpdate={onUpdate} />;
      case 'testing':
        return <EICRScheduleOfTests formData={formData} onUpdate={onUpdate} />;
      case 'inspector':
        return <EICRInspectorDetails 
          formData={formData} 
          onUpdate={onUpdate}
          isOpen={isInspectorSectionOpen}
          onToggle={() => setIsInspectorSectionOpen(!isInspectorSectionOpen)}
        />;
      case 'certificate':
        return <EICRCertificateTab formData={formData} onUpdate={onUpdate} />;
      default:
        return null;
    }
  };

  const containerClasses = tabValue === 'testing' 
    ? "w-full max-w-none space-y-6" 
    : "md:max-w-6xl mx-auto space-y-6";

  return (
    <div className={containerClasses}>
      {renderContent()}
      {renderTabNavigation()}
    </div>
  );
};

export default EICRTabContent;