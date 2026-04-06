import { useMediaQuery } from '@/hooks/use-media-query';
import { SmartTabs, SmartTab } from '@/components/ui/ui/smart-tabs';
import { FileText, Shield, Eye, Gauge, AlertTriangle } from 'lucide-react';
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
  const isMobile = useMediaQuery('(max-width: 640px)');
  const contentWrapperClass = 'space-y-4';

  const tabNavigationProps = {
    currentTabIndex, totalTabs, canNavigateNext, canNavigatePrevious,
    onNext, onPrevious, isCurrentTabComplete, progress,
    isLastTab: currentTabIndex === totalTabs - 1,
    onGenerate, isGenerating,
  };

  const wrap = (Component: React.ReactNode) => (
    <div className={contentWrapperClass}>
      {!isMobile ? <div className="eicr-section-card overflow-hidden">{Component}</div> : Component}
      <LPTabNavigation {...tabNavigationProps} />
    </div>
  );

  const smartTabs: SmartTab[] = [
    { value: 'certificate', label: 'Certificate & Site', shortLabel: 'Site', icon: <FileText className="h-4 w-4" />, content: wrap(<LPCertificateDetails formData={formData} onUpdate={onUpdate} />) },
    { value: 'installation', label: 'Installation', shortLabel: 'Install', icon: <Shield className="h-4 w-4" />, content: wrap(<LPInstallationDetails formData={formData} onUpdate={onUpdate} />) },
    { value: 'visual', label: 'Visual Inspection', shortLabel: 'Visual', icon: <Eye className="h-4 w-4" />, content: wrap(<LPVisualInspection formData={formData} onUpdate={onUpdate} />) },
    { value: 'testing', label: 'Test Schedule', shortLabel: 'Testing', icon: <Gauge className="h-4 w-4" />, content: wrap(<LPTestSchedule formData={formData} onUpdate={onUpdate} />) },
    { value: 'observations', label: 'Sign-off', shortLabel: 'Sign-off', icon: <AlertTriangle className="h-4 w-4" />, content: wrap(<LPObservations formData={formData} onUpdate={onUpdate} />) },
  ];

  return (
    <SmartTabs
      tabs={smartTabs}
      value={currentTab}
      onValueChange={(v) => onTabChange(v as LPTabValue)}
      className="space-y-4"
      breakpoint={3}
    />
  );
}
