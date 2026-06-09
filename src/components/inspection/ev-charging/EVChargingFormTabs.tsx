import React from 'react';
import { SmartTabs, SmartTab } from '@/components/ui/smart-tabs';
import { EVChargingTabValue } from '@/hooks/useEVChargingTabs';
import EVChargingInstallationDetails from './EVChargingInstallationDetails';
import EVChargingSupplyDetails from './EVChargingSupplyDetails';
import EVChargingTestSchedule from './EVChargingTestSchedule';
import EVChargingDeclarations from './EVChargingDeclarations';
import EVChargingTabNavigation from './EVChargingTabNavigation';

interface EVChargingFormTabsProps {
  currentTab: EVChargingTabValue;
  onTabChange: (value: string) => void;
  canAccessTab: (tabId: EVChargingTabValue) => boolean;
  completedTabs?: Record<string, boolean>;
  formData: any;
  onUpdate: (field: string, value: any) => void;
  customerId?: string;
  onCustomerIdChange?: (id: string | undefined) => void;
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
    whatsApp?: {
      type: string;
      id: string;
      recipientPhone: string;
      recipientName: string;
      documentLabel: string;
    };
  };
  onGenerateCertificate: () => void;
  onSaveDraft: () => void;
  canGenerateCertificate?: boolean;
  reportId?: string | null;
}

const EVChargingFormTabs: React.FC<EVChargingFormTabsProps> = ({
  currentTab,
  onTabChange,
  canAccessTab,
  completedTabs,
  formData,
  onUpdate,
  customerId,
  onCustomerIdChange,
  tabNavigationProps,
  onGenerateCertificate,
  onSaveDraft,
  canGenerateCertificate = true,
  reportId,
}) => {
  const smartTabs: SmartTab[] = [
    {
      value: 'installation',
      label: 'Install',
      shortLabel: 'Install',
      content: (
        <div className="pt-2 pb-48 sm:px-4 mx-auto w-full lg:max-w-6xl xl:max-w-7xl">
          <EVChargingInstallationDetails formData={formData} onUpdate={onUpdate} customerId={customerId} onCustomerIdChange={onCustomerIdChange} />
          <EVChargingTabNavigation {...tabNavigationProps} />
        </div>
      ),
    },
    {
      value: 'supply',
      label: 'Supply',
      shortLabel: 'Supply',
      content: (
        <div className="pt-2 pb-48 sm:px-4 mx-auto w-full lg:max-w-6xl xl:max-w-7xl">
          <EVChargingSupplyDetails formData={formData} onUpdate={onUpdate} />
          <EVChargingTabNavigation {...tabNavigationProps} />
        </div>
      ),
    },
    {
      value: 'testing',
      label: 'Test',
      shortLabel: 'Test',
      content: (
        <div className="pt-2 pb-48 sm:px-4">
          <EVChargingTestSchedule formData={formData} onUpdate={onUpdate} />
          <EVChargingTabNavigation {...tabNavigationProps} />
        </div>
      ),
    },
    {
      value: 'declarations',
      label: 'Declare',
      shortLabel: 'Sign',
      content: (
        <div className="pt-2 pb-48 sm:px-4 mx-auto w-full lg:max-w-6xl xl:max-w-7xl">
          <EVChargingDeclarations formData={formData} onUpdate={onUpdate} />
          <EVChargingTabNavigation
            {...tabNavigationProps}
            onGenerateCertificate={onGenerateCertificate}
            canGenerateCertificate={canGenerateCertificate}
            whatsApp={tabNavigationProps.whatsApp}
            reportId={reportId}
            formData={formData}
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
      completedTabs={completedTabs}
      showProgress
    />
  );
};

export default EVChargingFormTabs;
