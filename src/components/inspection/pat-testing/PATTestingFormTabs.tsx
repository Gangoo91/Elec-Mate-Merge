import React, { useRef } from 'react';
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
    onOpenEmailDialog?: () => void;
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

const TAB_ORDER: PATTestingTabValue[] = ['client', 'appliances', 'declarations'];

const PATTestingFormTabs: React.FC<PATTestingFormTabsProps> = ({
  currentTab,
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
  // Track direction so the step slide matches travel (forward vs back).
  const prevIndexRef = useRef(TAB_ORDER.indexOf(currentTab));
  const currentIndex = TAB_ORDER.indexOf(currentTab);
  const isBack = currentIndex < prevIndexRef.current;
  prevIndexRef.current = currentIndex;

  const content: Record<PATTestingTabValue, React.ReactNode> = {
    client: <PATTestingClientDetails formData={formData} onUpdate={onUpdate} />,
    appliances: (
      <PATTestingApplianceList
        formData={formData}
        onUpdate={onUpdate}
        activeApplianceId={activeApplianceId}
        onOpenAppliance={onOpenAppliance}
        onCloseAppliance={onCloseAppliance}
        copiedApplianceData={copiedApplianceData}
        onCopyApplianceData={onCopyApplianceData}
      />
    ),
    declarations: <PATTestingDeclarations formData={formData} onUpdate={onUpdate} />,
  };

  const isLast = currentTab === 'declarations';

  return (
    <>
      <div
        key={currentTab}
        className={
          isBack ? 'motion-safe:animate-mw-step-back' : 'motion-safe:animate-mw-step-in'
        }
      >
        {content[currentTab]}
      </div>
      <PATTestingTabNavigation
        {...tabNavigationProps}
        onGenerateCertificate={
          isLast ? onGenerateCertificate : tabNavigationProps.onGenerateCertificate
        }
        onCreateInvoice={onCreateInvoice}
        canGenerateCertificate={canGenerateCertificate}
      />
    </>
  );
};

export default PATTestingFormTabs;
