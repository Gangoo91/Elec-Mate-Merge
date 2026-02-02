import React from 'react';
import { SmartTabs, SmartTab } from '@/components/ui/smart-tabs';
import { EmergencyLightingTabValue } from '@/hooks/useEmergencyLightingTabs';
import EmergencyLightingInstallationDetails from './EmergencyLightingInstallationDetails';
import EmergencyLightingLuminaireSchedule from './EmergencyLightingLuminaireSchedule';
import EmergencyLightingTestResults from './EmergencyLightingTestResults';
import EmergencyLightingDeclarations from './EmergencyLightingDeclarations';
import EmergencyLightingTabNavigation from './EmergencyLightingTabNavigation';
import { Building2, Lightbulb, TestTube, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface EmergencyLightingFormTabsProps {
  currentTab: EmergencyLightingTabValue;
  onTabChange: (value: string) => void;
  canAccessTab: (tabId: EmergencyLightingTabValue) => boolean;
  formData: any;
  onUpdate: (field: string, value: any) => void;
  tabNavigationProps: {
    currentTab: EmergencyLightingTabValue;
    currentTabIndex: number;
    totalTabs: number;
    canNavigateNext: boolean;
    canNavigatePrevious: boolean;
    navigateNext: () => void;
    navigatePrevious: () => void;
    getProgressPercentage: () => number;
    isCurrentTabComplete: boolean;
    onGenerateCertificate?: () => void;
    canGenerateCertificate?: boolean;
  };
  onGenerateCertificate: () => void;
  onSaveDraft: () => void;
  canGenerateCertificate?: boolean;
}

const EmergencyLightingFormTabs: React.FC<EmergencyLightingFormTabsProps> = ({
  currentTab,
  onTabChange,
  canAccessTab,
  formData,
  onUpdate,
  tabNavigationProps,
  onGenerateCertificate,
  onSaveDraft,
  canGenerateCertificate = true,
}) => {
  const isMobile = useIsMobile();

  const smartTabs: SmartTab[] = [
    {
      value: 'installation',
      label: 'Installation',
      icon: <Building2 className="h-4 w-4" />,
      content: (
        <div className={cn(isMobile ? "" : "md:max-w-5xl mx-auto space-y-6")}>
          <EmergencyLightingInstallationDetails formData={formData} onUpdate={onUpdate} />
          <EmergencyLightingTabNavigation {...tabNavigationProps} />
        </div>
      ),
    },
    {
      value: 'luminaires',
      label: 'Luminaires',
      icon: <Lightbulb className="h-4 w-4" />,
      content: (
        <div className={cn(isMobile ? "" : "md:max-w-5xl mx-auto space-y-6")}>
          <EmergencyLightingLuminaireSchedule formData={formData} onUpdate={onUpdate} />
          <EmergencyLightingTabNavigation {...tabNavigationProps} />
        </div>
      ),
    },
    {
      value: 'testing',
      label: 'Testing',
      icon: <TestTube className="h-4 w-4" />,
      content: (
        <div className={cn(isMobile ? "" : "md:max-w-5xl mx-auto space-y-6")}>
          <EmergencyLightingTestResults formData={formData} onUpdate={onUpdate} />
          <EmergencyLightingTabNavigation {...tabNavigationProps} />
        </div>
      ),
    },
    {
      value: 'declarations',
      label: 'Declarations',
      icon: <FileText className="h-4 w-4" />,
      content: (
        <div className={cn(isMobile ? "" : "md:max-w-5xl mx-auto space-y-6")}>
          <EmergencyLightingDeclarations formData={formData} onUpdate={onUpdate} />
          <EmergencyLightingTabNavigation
            {...tabNavigationProps}
            onGenerateCertificate={onGenerateCertificate}
            canGenerateCertificate={canGenerateCertificate}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-2 sm:space-y-4">
      <SmartTabs
        tabs={smartTabs}
        value={currentTab}
        onValueChange={onTabChange}
        className="space-y-4"
        breakpoint={3}
      />
    </div>
  );
};

export default EmergencyLightingFormTabs;
