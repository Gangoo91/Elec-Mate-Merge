import React from 'react';
import { SmartTabs, SmartTab } from '@/components/ui/smart-tabs';
import { EVChargingTabValue } from '@/hooks/useEVChargingTabs';
import EVChargingInstallationDetails from './EVChargingInstallationDetails';
import EVChargingSupplyDetails from './EVChargingSupplyDetails';
import EVChargingTestSchedule from './EVChargingTestSchedule';
import EVChargingDeclarations from './EVChargingDeclarations';
import EVChargingTabNavigation from './EVChargingTabNavigation';
import { Car, Zap, TestTube, FileText } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface EVChargingFormTabsProps {
  currentTab: EVChargingTabValue;
  onTabChange: (value: string) => void;
  canAccessTab: (tabId: EVChargingTabValue) => boolean;
  formData: any;
  onUpdate: (field: string, value: any) => void;
  tabNavigationProps: {
    currentTab: EVChargingTabValue;
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

const EVChargingFormTabs: React.FC<EVChargingFormTabsProps> = ({
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
  const contentWrapperClass = cn(
    isMobile ? "" : "md:max-w-5xl mx-auto space-y-6"
  );

  const smartTabs: SmartTab[] = [
    {
      value: 'installation',
      label: 'Installation',
      icon: <Car className="h-4 w-4" />,
      content: (
        <div className={contentWrapperClass}>
          <EVChargingInstallationDetails formData={formData} onUpdate={onUpdate} />
          <EVChargingTabNavigation {...tabNavigationProps} />
        </div>
      ),
    },
    {
      value: 'supply',
      label: 'Supply',
      icon: <Zap className="h-4 w-4" />,
      content: (
        <div className={contentWrapperClass}>
          <EVChargingSupplyDetails formData={formData} onUpdate={onUpdate} />
          <EVChargingTabNavigation {...tabNavigationProps} />
        </div>
      ),
    },
    {
      value: 'testing',
      label: 'Testing',
      icon: <TestTube className="h-4 w-4" />,
      content: (
        <div className={contentWrapperClass}>
          <EVChargingTestSchedule formData={formData} onUpdate={onUpdate} />
          <EVChargingTabNavigation {...tabNavigationProps} />
        </div>
      ),
    },
    {
      value: 'declarations',
      label: 'Declarations',
      icon: <FileText className="h-4 w-4" />,
      content: (
        <div className={contentWrapperClass}>
          <EVChargingDeclarations formData={formData} onUpdate={onUpdate} />
          <EVChargingTabNavigation
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

export default EVChargingFormTabs;
