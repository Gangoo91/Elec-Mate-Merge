import { SmartTabs, SmartTab } from '@/components/ui/smart-tabs';
import { BESSTabValue } from '@/hooks/useBESSTabs';
import BESSInstallationDetails from './BESSInstallationDetails';
import BESSSystemDesign from './BESSSystemDesign';
import BESSElectricalSafety from './BESSElectricalSafety';
import BESSTestResults from './BESSTestResults';
import BESSDeclarations from './BESSDeclarations';
import BESSTabNavigation from './BESSTabNavigation';

interface Props {
  formData: any;
  onUpdate: (field: string, value: any) => void;
  currentTab: BESSTabValue;
  onTabChange: (tab: BESSTabValue) => void;
  currentTabIndex: number;
  totalTabs: number;
  canNavigateNext: boolean;
  canNavigatePrevious: boolean;
  onNext: () => void;
  onPrevious: () => void;
  isCurrentTabComplete: boolean;
  progress: number;
  customerId?: string;
  onCustomerIdChange?: (id: string | undefined) => void;
  onGenerate?: () => void;
  isGenerating?: boolean;
  reportId?: string;
  onSaveFirst?: () => Promise<void>;
}

export default function BESSFormTabs({
  formData, onUpdate, currentTab, onTabChange,
  currentTabIndex, totalTabs, canNavigateNext, canNavigatePrevious,
  onNext, onPrevious, isCurrentTabComplete, progress,
  customerId, onCustomerIdChange, onGenerate, isGenerating, reportId, onSaveFirst,
}: Props) {
  const tabNavigationProps = {
    currentTabIndex, totalTabs, canNavigateNext, canNavigatePrevious,
    onNext, onPrevious, isCurrentTabComplete, progress,
    isLastTab: currentTabIndex === totalTabs - 1,
    onGenerate, isGenerating,
  };

  const smartTabs: SmartTab[] = [
    { value: 'installation', label: 'Installation', shortLabel: 'Install', content: (<div className="space-y-6"><BESSInstallationDetails formData={formData} onUpdate={onUpdate} customerId={customerId} onCustomerIdChange={onCustomerIdChange} /><BESSTabNavigation {...tabNavigationProps} /></div>) },
    { value: 'system-design', label: 'System Design', shortLabel: 'Design', content: (<div className="space-y-6"><BESSSystemDesign formData={formData} onUpdate={onUpdate} /><BESSTabNavigation {...tabNavigationProps} /></div>) },
    { value: 'electrical', label: 'Electrical & Safety', shortLabel: 'Electrical', content: (<div className="space-y-6"><BESSElectricalSafety formData={formData} onUpdate={onUpdate} /><BESSTabNavigation {...tabNavigationProps} /></div>) },
    { value: 'testing', label: 'Test Results', shortLabel: 'Testing', content: (<div className="space-y-6"><BESSTestResults formData={formData} onUpdate={onUpdate} /><BESSTabNavigation {...tabNavigationProps} /></div>) },
    { value: 'declarations', label: 'Declarations', shortLabel: 'Sign', content: (<div className="space-y-6"><BESSDeclarations formData={formData} onUpdate={onUpdate} reportId={reportId} onSaveFirst={onSaveFirst} /><BESSTabNavigation {...tabNavigationProps} /></div>) },
  ];

  return (
    <SmartTabs tabs={smartTabs} value={currentTab} onValueChange={(v) => onTabChange(v as BESSTabValue)} className="space-y-4" />
  );
}
