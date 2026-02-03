import React from 'react';
import { SmartTabs, SmartTab } from '@/components/ui/smart-tabs';
import { FireAlarmTabValue } from '@/hooks/useFireAlarmTabs';
import FireAlarmInstallationDetails from './FireAlarmInstallationDetails';
import FireAlarmSystemDesign from './FireAlarmSystemDesign';
import FireAlarmTestSchedule from './FireAlarmTestSchedule';
import FireAlarmDeclarations from './FireAlarmDeclarations';
import FireAlarmTabNavigation from './FireAlarmTabNavigation';
import { Building2, Settings, TestTube, FileText } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface FireAlarmFormTabsProps {
  currentTab: FireAlarmTabValue;
  onTabChange: (value: string) => void;
  canAccessTab: (tabId: FireAlarmTabValue) => boolean;
  formData: any;
  onUpdate: (field: string, value: any) => void;
  tabNavigationProps: {
    currentTab: FireAlarmTabValue;
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

const FireAlarmFormTabs: React.FC<FireAlarmFormTabsProps> = ({
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

  // Mobile: no max-width, no horizontal spacing - edge-to-edge
  // Desktop: constrained width with spacing
  // pb-24 on mobile ensures content isn't hidden behind sticky nav
  const contentWrapperClass = cn(
    isMobile ? "pb-24" : "md:max-w-5xl mx-auto space-y-6"
  );

  const smartTabs: SmartTab[] = [
    {
      value: 'installation',
      label: 'Installation',
      icon: <Building2 className="h-4 w-4" />,
      content: (
        <div className={contentWrapperClass}>
          <FireAlarmInstallationDetails formData={formData} onUpdate={onUpdate} />
          <FireAlarmTabNavigation {...tabNavigationProps} />
        </div>
      ),
    },
    {
      value: 'system',
      label: 'System Design',
      icon: <Settings className="h-4 w-4" />,
      content: (
        <div className={contentWrapperClass}>
          <FireAlarmSystemDesign formData={formData} onUpdate={onUpdate} />
          <FireAlarmTabNavigation {...tabNavigationProps} />
        </div>
      ),
    },
    {
      value: 'testing',
      label: 'Testing',
      icon: <TestTube className="h-4 w-4" />,
      content: (
        <div className={contentWrapperClass}>
          <FireAlarmTestSchedule formData={formData} onUpdate={onUpdate} />
          <FireAlarmTabNavigation {...tabNavigationProps} />
        </div>
      ),
    },
    {
      value: 'declarations',
      label: 'Declarations',
      icon: <FileText className="h-4 w-4" />,
      content: (
        <div className={contentWrapperClass}>
          <FireAlarmDeclarations formData={formData} onUpdate={onUpdate} />
          <FireAlarmTabNavigation
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

export default FireAlarmFormTabs;
