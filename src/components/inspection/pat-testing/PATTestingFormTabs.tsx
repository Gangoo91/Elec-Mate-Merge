import React from 'react';
import { SmartTabs, SmartTab } from '@/components/ui/smart-tabs';
import { PATTestingTabValue } from '@/hooks/usePATTestingTabs';
import PATTestingClientDetails from './PATTestingClientDetails';
import PATTestingApplianceList from './PATTestingApplianceList';
import PATTestingDeclarations from './PATTestingDeclarations';
import PATTestingTabNavigation from './PATTestingTabNavigation';
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
    whatsApp?: {
      type: string;
      id: string;
      recipientPhone: string;
      recipientName: string;
      documentLabel: string;
    };
  };
  onGenerateCertificate: () => void;
  onCreateInvoice?: () => void;
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
  formData,
  onUpdate,
  tabNavigationProps,
  onGenerateCertificate,
  onCreateInvoice,
  canGenerateCertificate = true,
  activeApplianceId,
  onOpenAppliance,
  onCloseAppliance,
  copiedApplianceData,
  onCopyApplianceData,
}) => {
  const smartTabs: SmartTab[] = [
    {
      value: 'client',
      label: 'Client',
      shortLabel: 'Client',
      content: (
        <div className="pt-2 pb-48 sm:px-4">
          <PATTestingClientDetails formData={formData} onUpdate={onUpdate} />
          <PATTestingTabNavigation {...tabNavigationProps} />
        </div>
      ),
    },
    {
      value: 'appliances',
      label: 'Items',
      shortLabel: 'Items',
      content: (
        <div className="pt-2 pb-48 sm:px-4">
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
      label: 'Sign',
      shortLabel: 'Sign',
      content: (
        <div className="pt-2 pb-48 sm:px-4">
          <PATTestingDeclarations formData={formData} onUpdate={onUpdate} />
          <PATTestingTabNavigation
            {...tabNavigationProps}
            onGenerateCertificate={onGenerateCertificate}
            onCreateInvoice={onCreateInvoice}
            canGenerateCertificate={canGenerateCertificate}
          />
        </div>
      ),
    },
  ];

  return (
    <SmartTabs
      tabs={smartTabs}
      value={currentTab}
      onValueChange={onTabChange}
    />
  );
};

export default PATTestingFormTabs;
