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
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
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
  };
  onGenerateCertificate: () => void;
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
      icon: <FileText className="h-4 w-4" />,
      content: (
        <div className={contentWrapperClass}>
          <SolarPVDeclarations formData={formData} onUpdate={onUpdate} />
          <SolarPVTabNavigation
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

export default SolarPVFormTabs;
