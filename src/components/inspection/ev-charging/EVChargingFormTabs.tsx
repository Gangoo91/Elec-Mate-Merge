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
  const isMobile = useIsMobile();

  // Mobile: no max-width, no horizontal spacing - edge-to-edge
  // Desktop: constrained width inside a single premium card
  // pb-24 on mobile ensures content isn't hidden behind sticky nav
  const contentWrapperClass = cn(isMobile ? 'pb-24' : 'md:max-w-6xl mx-auto space-y-6');

  const smartTabs: SmartTab[] = [
    {
      value: 'installation',
      label: 'Installation',
      icon: <Car className="h-4 w-4" />,
      content: (
        <div className={contentWrapperClass}>
          {!isMobile ? (
            <div className="eicr-section-card overflow-hidden">
              <EVChargingInstallationDetails formData={formData} onUpdate={onUpdate} customerId={customerId} onCustomerIdChange={onCustomerIdChange} />
            </div>
          ) : (
            <EVChargingInstallationDetails formData={formData} onUpdate={onUpdate} customerId={customerId} onCustomerIdChange={onCustomerIdChange} />
          )}
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
          {!isMobile ? (
            <div className="eicr-section-card overflow-hidden">
              <EVChargingSupplyDetails formData={formData} onUpdate={onUpdate} />
            </div>
          ) : (
            <EVChargingSupplyDetails formData={formData} onUpdate={onUpdate} />
          )}
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
          {!isMobile ? (
            <div className="eicr-section-card overflow-hidden">
              <EVChargingTestSchedule formData={formData} onUpdate={onUpdate} />
            </div>
          ) : (
            <EVChargingTestSchedule formData={formData} onUpdate={onUpdate} />
          )}
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
          {!isMobile ? (
            <div className="eicr-section-card overflow-hidden">
              <EVChargingDeclarations formData={formData} onUpdate={onUpdate} />
            </div>
          ) : (
            <EVChargingDeclarations formData={formData} onUpdate={onUpdate} />
          )}
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
