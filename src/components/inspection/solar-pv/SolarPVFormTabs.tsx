import React from 'react';
import { SmartTabs, SmartTab } from '@/components/ui/smart-tabs';
import { SolarPVTabValue } from '@/hooks/useSolarPVTabs';
import SolarPVInstallationDetails from './SolarPVInstallationDetails';
import SolarPVSystemDesign from './SolarPVSystemDesign';
import SolarPVGridConnection from './SolarPVGridConnection';
import SolarPVTestSchedule from './SolarPVTestSchedule';
import SolarPVDeclarations from './SolarPVDeclarations';
import SolarPVTabNavigation from './SolarPVTabNavigation';
import { Building2, Cpu, Zap, TestTube, FileText } from 'lucide-react';
import { SolarPVFormData } from '@/types/solar-pv';

interface SolarPVFormTabsProps {
  currentTab: SolarPVTabValue;
  onTabChange: (value: string) => void;
  canAccessTab: (tabId: SolarPVTabValue) => boolean;
  formData: SolarPVFormData;
  onUpdate: (field: string, value: any) => void;
  tabNavigationProps: {
    currentTab: SolarPVTabValue;
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
}

const SolarPVFormTabs: React.FC<SolarPVFormTabsProps> = ({
  currentTab,
  onTabChange,
  canAccessTab,
  formData,
  onUpdate,
  tabNavigationProps,
  onGenerateCertificate,
  onCreateInvoice,
  onSaveDraft,
  canGenerateCertificate = true,
}) => {
  const contentWrapperClass = 'pb-24 sm:pb-8';

  const smartTabs: SmartTab[] = [
    {
      value: 'installation',
      label: 'Installation',
      shortLabel: 'Install',
      icon: <Building2 className="h-4 w-4" />,
      content: (
        <div className={contentWrapperClass}>
          <SolarPVInstallationDetails formData={formData} onUpdate={onUpdate} />
          <SolarPVTabNavigation {...tabNavigationProps} />
        </div>
      ),
    },
    {
      value: 'system',
      label: 'System Design',
      shortLabel: 'System',
      icon: <Cpu className="h-4 w-4" />,
      content: (
        <div className={contentWrapperClass}>
          <SolarPVSystemDesign formData={formData} onUpdate={onUpdate} />
          <SolarPVTabNavigation {...tabNavigationProps} />
        </div>
      ),
    },
    {
      value: 'grid',
      label: 'Grid Connection',
      shortLabel: 'Grid',
      icon: <Zap className="h-4 w-4" />,
      content: (
        <div className={contentWrapperClass}>
          <SolarPVGridConnection formData={formData} onUpdate={onUpdate} />
          <SolarPVTabNavigation {...tabNavigationProps} />
        </div>
      ),
    },
    {
      value: 'testing',
      label: 'Testing',
      shortLabel: 'Test',
      icon: <TestTube className="h-4 w-4" />,
      content: (
        <div className={contentWrapperClass}>
          <SolarPVTestSchedule formData={formData} onUpdate={onUpdate} />
          <SolarPVTabNavigation {...tabNavigationProps} />
        </div>
      ),
    },
    {
      value: 'signoff',
      label: 'Sign-Off',
      shortLabel: 'Sign',
      icon: <FileText className="h-4 w-4" />,
      content: (
        <div className={contentWrapperClass}>
          <SolarPVDeclarations formData={formData} onUpdate={onUpdate} />
          <SolarPVTabNavigation
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

export default SolarPVFormTabs;
