import React, { useRef } from 'react';
import { EVChargingTabValue } from '@/hooks/useEVChargingTabs';
import EVChargingInstallationDetails from './EVChargingInstallationDetails';
import EVChargingSupplyDetails from './EVChargingSupplyDetails';
import EVChargingTestSchedule from './EVChargingTestSchedule';
import EVChargingDeclarations from './EVChargingDeclarations';
import EVChargingTabNavigation from './EVChargingTabNavigation';

/* eslint-disable @typescript-eslint/no-explicit-any */

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

const TAB_ORDER: EVChargingTabValue[] = ['installation', 'supply', 'testing', 'declarations'];

const EVChargingFormTabs: React.FC<EVChargingFormTabsProps> = ({
  currentTab,
  completedTabs,
  formData,
  onUpdate,
  customerId,
  onCustomerIdChange,
  tabNavigationProps,
  onGenerateCertificate,
  canGenerateCertificate = true,
  reportId,
}) => {
  // Track direction so the step slide matches travel (forward vs back).
  const prevIndexRef = useRef(TAB_ORDER.indexOf(currentTab));
  const currentIndex = TAB_ORDER.indexOf(currentTab);
  const isBack = currentIndex < prevIndexRef.current;
  prevIndexRef.current = currentIndex;

  const content: Record<EVChargingTabValue, React.ReactNode> = {
    installation: (
      <EVChargingInstallationDetails
        formData={formData}
        onUpdate={onUpdate}
        customerId={customerId}
        onCustomerIdChange={onCustomerIdChange}
      />
    ),
    supply: <EVChargingSupplyDetails formData={formData} onUpdate={onUpdate} />,
    testing: <EVChargingTestSchedule formData={formData} onUpdate={onUpdate} />,
    declarations: <EVChargingDeclarations formData={formData} onUpdate={onUpdate} />,
  };

  const isLast = currentTab === 'declarations';

  return (
    <>
      <div
        key={currentTab}
        className={
          isBack
            ? 'motion-safe:animate-mw-step-back'
            : 'motion-safe:animate-mw-step-in'
        }
      >
        {content[currentTab]}
      </div>
      <EVChargingTabNavigation
        {...tabNavigationProps}
        onGenerateCertificate={isLast ? onGenerateCertificate : tabNavigationProps.onGenerateCertificate}
        canGenerateCertificate={canGenerateCertificate}
        reportId={reportId}
        formData={formData}
      />
    </>
  );
};

export default EVChargingFormTabs;
