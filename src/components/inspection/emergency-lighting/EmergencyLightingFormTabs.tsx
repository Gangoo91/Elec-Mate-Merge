import React, { useRef } from 'react';
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

const TAB_ORDER: EmergencyLightingTabValue[] = [
  'installation',
  'luminaires',
  'testing',
  'declarations',
];

const EmergencyLightingFormTabs: React.FC<EmergencyLightingFormTabsProps> = ({
  currentTab,
  formData,
  onUpdate,
  tabNavigationProps,
  onGenerateCertificate,
  canGenerateCertificate = true,
}) => {
  // Track direction so the step slide matches travel (forward vs back).
  const prevIndexRef = useRef(TAB_ORDER.indexOf(currentTab));
  const currentIndex = TAB_ORDER.indexOf(currentTab);
  const isBack = currentIndex < prevIndexRef.current;
  prevIndexRef.current = currentIndex;

  const content: Record<EmergencyLightingTabValue, React.ReactNode> = {
    installation: <EmergencyLightingInstallationDetails formData={formData} onUpdate={onUpdate} />,
    luminaires: <EmergencyLightingLuminaireSchedule formData={formData} onUpdate={onUpdate} />,
    testing: <EmergencyLightingTestResults formData={formData} onUpdate={onUpdate} />,
    declarations: <EmergencyLightingDeclarations formData={formData} onUpdate={onUpdate} />,
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
      <EmergencyLightingTabNavigation
        {...tabNavigationProps}
        onUpdate={onUpdate}
        onGenerateCertificate={
          isLast ? onGenerateCertificate : tabNavigationProps.onGenerateCertificate
        }
        canGenerateCertificate={canGenerateCertificate}
      />
    </>
  );
};

export default EmergencyLightingFormTabs;
