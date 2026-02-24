import React from 'react';
import { SmartTabs, SmartTab } from '@/components/ui/smart-tabs';
import { PATTestingTabValue } from '@/hooks/usePATTestingTabs';
import PATTestingClientDetails from './PATTestingClientDetails';
import PATTestingApplianceList from './PATTestingApplianceList';
import PATTestingDeclarations from './PATTestingDeclarations';
import PATTestingTabNavigation from './PATTestingTabNavigation';
import { User, Plug, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Appliance } from '@/types/pat-testing';

interface PATTestingFormTabsProps {
  currentTab: PATTestingTabValue;
  onTabChange: (value: string) => void;
  canAccessTab: (tabId: PATTestingTabValue) => boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpdate: (field: string, value: any) => void;
  tabNavigationProps: {
    currentTab: PATTestingTabValue;
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
  activeApplianceId: string | null;
  onOpenAppliance: (id: string) => void;
  onCloseAppliance: () => void;
  copiedApplianceData: Partial<Appliance> | null;
  onCopyApplianceData: (data: Partial<Appliance>) => void;
}

const PATTestingFormTabs: React.FC<PATTestingFormTabsProps> = ({
  currentTab,
  onTabChange,
  canAccessTab,
  formData,
  onUpdate,
  tabNavigationProps,
  onGenerateCertificate,
  onSaveDraft,
  canGenerateCertificate = true,
  activeApplianceId,
  onOpenAppliance,
  onCloseAppliance,
  copiedApplianceData,
  onCopyApplianceData,
}) => {
  const isMobile = useIsMobile();

  const smartTabs: SmartTab[] = [
    {
      value: 'client',
      label: 'Client',
      icon: <User className="h-4 w-4" />,
      content: (
        <div className={cn(isMobile ? '' : 'md:max-w-6xl mx-auto space-y-6')}>
          <PATTestingClientDetails formData={formData} onUpdate={onUpdate} />
          <PATTestingTabNavigation {...tabNavigationProps} />
        </div>
      ),
    },
    {
      value: 'appliances',
      label: 'Appliances',
      icon: <Plug className="h-4 w-4" />,
      content: (
        <div className={cn(isMobile ? '' : 'md:max-w-6xl mx-auto space-y-6')}>
          <PATTestingApplianceList
            formData={formData}
            onUpdate={onUpdate}
            activeApplianceId={activeApplianceId}
            onOpenAppliance={onOpenAppliance}
            onCloseAppliance={onCloseAppliance}
            copiedApplianceData={copiedApplianceData}
            onCopyApplianceData={onCopyApplianceData}
          />
          <PATTestingTabNavigation {...tabNavigationProps} />
        </div>
      ),
    },
    {
      value: 'declarations',
      label: 'Summary',
      icon: <FileText className="h-4 w-4" />,
      content: (
        <div className={cn(isMobile ? '' : 'md:max-w-6xl mx-auto space-y-6')}>
          <PATTestingDeclarations formData={formData} onUpdate={onUpdate} />
          <PATTestingTabNavigation
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

export default PATTestingFormTabs;
