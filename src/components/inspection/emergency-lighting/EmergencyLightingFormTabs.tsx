import React from 'react';
import { SmartTabs, SmartTab } from '@/components/ui/smart-tabs';
import { EmergencyLightingTabValue } from '@/hooks/useEmergencyLightingTabs';
import EmergencyLightingInstallationDetails from './EmergencyLightingInstallationDetails';
import EmergencyLightingLuminaireSchedule from './EmergencyLightingLuminaireSchedule';
import EmergencyLightingTestResults from './EmergencyLightingTestResults';
import EmergencyLightingDeclarations from './EmergencyLightingDeclarations';
import EmergencyLightingTabNavigation from './EmergencyLightingTabNavigation';
import type { EmergencyLightingFormData } from '@/types/emergency-lighting';

interface EmergencyLightingFormTabsProps {
  currentTab: EmergencyLightingTabValue;
  onTabChange: (value: string) => void;
  canAccessTab: (tabId: EmergencyLightingTabValue) => boolean;
  formData: EmergencyLightingFormData;
  onUpdate: (
    field: string,
    value: EmergencyLightingFormData[keyof EmergencyLightingFormData]
  ) => void;
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
    whatsApp?: {
      type: string;
      id: string;
      recipientPhone: string;
      recipientName: string;
      documentLabel: string;
    };
    reportId?: string | null;
    formData?: EmergencyLightingFormData;
  };
  onGenerateCertificate: () => void;
  onSaveDraft: () => void;
  canGenerateCertificate?: boolean;
}

const EmergencyLightingFormTabs: React.FC<EmergencyLightingFormTabsProps> = ({
  currentTab,
  onTabChange,
  formData,
  onUpdate,
  tabNavigationProps,
  onGenerateCertificate,
  canGenerateCertificate = true,
}) => {
  const smartTabs: SmartTab[] = [
    {
      value: 'installation',
      label: 'Installation',
      shortLabel: 'Install',
      content: (
        <div className="space-y-6">
          <EmergencyLightingInstallationDetails formData={formData} onUpdate={onUpdate} />
          <EmergencyLightingTabNavigation {...tabNavigationProps} />
        </div>
      ),
    },
    {
      value: 'luminaires',
      label: 'Luminaires',
      shortLabel: 'Lights',
      content: (
        <div className="space-y-6">
          <EmergencyLightingLuminaireSchedule formData={formData} onUpdate={onUpdate} />
          <EmergencyLightingTabNavigation {...tabNavigationProps} />
        </div>
      ),
    },
    {
      value: 'testing',
      label: 'Testing',
      shortLabel: 'Test',
      content: (
        <div className="space-y-6">
          <EmergencyLightingTestResults formData={formData} onUpdate={onUpdate} />
          <EmergencyLightingTabNavigation {...tabNavigationProps} />
        </div>
      ),
    },
    {
      value: 'declarations',
      label: 'Declarations',
      shortLabel: 'Sign',
      content: (
        <div className="space-y-6">
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
    <SmartTabs
      tabs={smartTabs}
      value={currentTab}
      onValueChange={onTabChange}
      className="space-y-4"
    />
  );
};

export default EmergencyLightingFormTabs;
