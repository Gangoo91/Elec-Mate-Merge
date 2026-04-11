import { SmartTabs, SmartTab } from '@/components/ui/smart-tabs';
import { LPTabValue } from '@/hooks/useLightningProtectionTabs';
import LPCertificateDetails from './LPCertificateDetails';
import LPInstallationDetails from './LPInstallationDetails';
import LPVisualInspection from './LPVisualInspection';
import LPTestSchedule from './LPTestSchedule';
import LPObservations from './LPObservations';
import LPTabNavigation from './LPTabNavigation';

interface Props {
  formData: any;
  onUpdate: (field: string, value: any) => void;
  currentTab: LPTabValue;
  onTabChange: (tab: LPTabValue) => void;
  currentTabIndex: number;
  totalTabs: number;
  canNavigateNext: boolean;
  canNavigatePrevious: boolean;
  onNext: () => void;
  onPrevious: () => void;
  isCurrentTabComplete: boolean;
  progress: number;
  onGenerate?: () => void;
  isGenerating?: boolean;
}

export default function LPFormTabs({
  formData, onUpdate, currentTab, onTabChange,
  currentTabIndex, totalTabs, canNavigateNext, canNavigatePrevious,
  onNext, onPrevious, isCurrentTabComplete, progress,
  onGenerate, isGenerating,
}: Props) {
  const tabNavigationProps = {
    currentTabIndex, totalTabs, canNavigateNext, canNavigatePrevious,
    onNext, onPrevious, isCurrentTabComplete, progress,
    isLastTab: currentTabIndex === totalTabs - 1,
    onGenerate, isGenerating,
  };

  const smartTabs: SmartTab[] = [
    { value: 'certificate', label: 'Certificate', shortLabel: 'Cert', content: (<div className="space-y-6"><LPCertificateDetails formData={formData} onUpdate={onUpdate} /><LPTabNavigation {...tabNavigationProps} /></div>) },
    { value: 'installation', label: 'Installation', shortLabel: 'Install', content: (<div className="space-y-6"><LPInstallationDetails formData={formData} onUpdate={onUpdate} /><LPTabNavigation {...tabNavigationProps} /></div>) },
    { value: 'visual', label: 'Visual', shortLabel: 'Visual', content: (<div className="space-y-6"><LPVisualInspection formData={formData} onUpdate={onUpdate} /><LPTabNavigation {...tabNavigationProps} /></div>) },
    { value: 'testing', label: 'Testing', shortLabel: 'Tests', content: (<div className="space-y-6"><LPTestSchedule formData={formData} onUpdate={onUpdate} /><LPTabNavigation {...tabNavigationProps} /></div>) },
    { value: 'observations', label: 'Sign-off', shortLabel: 'Sign', content: (<div className="space-y-6"><LPObservations formData={formData} onUpdate={onUpdate} /><LPTabNavigation {...tabNavigationProps} /></div>) },
  ];

  return (
    <SmartTabs tabs={smartTabs} value={currentTab} onValueChange={(v) => onTabChange(v as LPTabValue)} className="space-y-4" />
  );
}
