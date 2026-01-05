
import React from 'react';
import { SmartTabs, SmartTab } from '@/components/ui/smart-tabs';
import { useEICRTabs } from '@/hooks/useEICRTabs';
import { useIsMobile } from '@/hooks/use-mobile';
import EICRTabContent from './EICRTabContent';
import { FileText, Search, TestTube, User, FileCheck } from 'lucide-react';

interface EICRFormTabsProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

const EICRFormTabs = ({ formData, onUpdate }: EICRFormTabsProps) => {
  const isMobile = useIsMobile();
  const { 
    currentTab, 
    setCurrentTab, 
    canAccessTab, 
    navigateNext,
    navigatePrevious,
    currentTabIndex,
    totalTabs,
    canNavigateNext,
    canNavigatePrevious,
    getProgressPercentage,
    isCurrentTabComplete,
    currentTabHasRequiredFields,
    toggleTabComplete
  } = useEICRTabs(formData);

  const handleTabChange = (value: string) => {
    setCurrentTab(value as any);
  };

  const handleToggleComplete = () => {
    toggleTabComplete(currentTab, onUpdate);
  };

  const tabContentProps = {
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
    onToggleComplete: handleToggleComplete
  };

  const smartTabs: SmartTab[] = [
    {
      value: "details",
      label: "Installation Details", 
      icon: <FileText className="h-4 w-4" />,
      content: <EICRTabContent tabValue="details" {...tabContentProps} />
    },
    {
      value: "inspection",
      label: "Inspection",
      icon: <Search className="h-4 w-4" />,
      content: <EICRTabContent tabValue="inspection" {...tabContentProps} />
    },
    {
      value: "testing", 
      label: "Testing",
      icon: <TestTube className="h-4 w-4" />,
      content: <EICRTabContent tabValue="testing" {...tabContentProps} />
    },
    {
      value: "inspector",
      label: "Inspector Details",
      icon: <User className="h-4 w-4" />,
      content: <EICRTabContent tabValue="inspector" {...tabContentProps} />
    },
    {
      value: "certificate",
      label: "Certificate",
      icon: <FileCheck className="h-4 w-4" />,
      content: <EICRTabContent tabValue="certificate" {...tabContentProps} />
    }
  ];

  return (
    <div className="space-y-2 sm:space-y-4">
      <SmartTabs
        tabs={smartTabs}
        value={currentTab} 
        onValueChange={handleTabChange}
        className="w-full"
        breakpoint={4} // Use dropdown when more than 4 tabs
      />
    </div>
  );
};

export default EICRFormTabs;
