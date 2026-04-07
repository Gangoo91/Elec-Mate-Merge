import { SmartTabs, SmartTab } from '@/components/ui/smart-tabs';
import { Building2, ClipboardCheck, Volume2, FileCheck, PenTool } from 'lucide-react';
import FAG3ProjectReference from './tabs/FAG3ProjectReference';
import FAG3CommissioningTests from './tabs/FAG3CommissioningTests';
import FAG3SoundEnvironment from './tabs/FAG3SoundEnvironment';
import FAG3Handover from './tabs/FAG3Handover';
import FAG3Declaration from './tabs/FAG3Declaration';
import FireAlarmTabNavigation from './FireAlarmTabNavigation';

interface Props {
  currentTab: string;
  onTabChange: (value: string) => void;
  formData: Record<string, any>;
  onUpdate: (field: string, value: any) => void;
  tabNavigationProps: any;
  onGenerateCertificate: () => void;
  onCreateInvoice?: () => void;
  onSaveDraft: () => void;
  canGenerateCertificate?: boolean;
}

const FireAlarmG3FormTabs: React.FC<Props> = ({
  currentTab, onTabChange, formData, onUpdate, tabNavigationProps,
  onGenerateCertificate, onCreateInvoice, canGenerateCertificate = true,
}) => {
  const pt = formData.panelTests || {};
  const smartTabs: SmartTab[] = [
    {
      value: 'project', label: 'Project', shortLabel: 'Project', icon: <Building2 className="h-4 w-4" />,
      content: <div className="space-y-4"><FAG3ProjectReference formData={formData} onUpdate={onUpdate} /><FireAlarmTabNavigation {...tabNavigationProps} /></div>,
    },
    {
      value: 'tests', label: 'Tests', shortLabel: 'Tests', icon: <ClipboardCheck className="h-4 w-4" />,
      content: <div className="space-y-4"><FAG3CommissioningTests formData={formData} onUpdate={onUpdate} /><FireAlarmTabNavigation {...tabNavigationProps} /></div>,
    },
    {
      value: 'sound', label: 'Sound & Env', shortLabel: 'Sound', icon: <Volume2 className="h-4 w-4" />,
      content: <div className="space-y-4"><FAG3SoundEnvironment formData={formData} onUpdate={onUpdate} /><FireAlarmTabNavigation {...tabNavigationProps} /></div>,
    },
    {
      value: 'handover', label: 'Handover', shortLabel: 'Hand.', icon: <FileCheck className="h-4 w-4" />,
      content: <div className="space-y-4"><FAG3Handover formData={formData} onUpdate={onUpdate} /><FireAlarmTabNavigation {...tabNavigationProps} /></div>,
    },
    {
      value: 'declaration', label: 'Declaration', shortLabel: 'Sign', icon: <PenTool className="h-4 w-4" />,
      content: <div className="space-y-4"><FAG3Declaration formData={formData} onUpdate={onUpdate} /><FireAlarmTabNavigation {...tabNavigationProps} onGenerateCertificate={onGenerateCertificate} onCreateInvoice={onCreateInvoice} canGenerateCertificate={canGenerateCertificate} /></div>,
    },
  ];

  const pw = formData.powerTests || {};
  const ft = formData.faultTests || {};
  const completedTabs: Record<string, boolean> = {
    project: !!(formData.clientName && formData.premisesAddress),
    tests: !!(pt.powerOnTest && pt.zoneIndicators && pt.faultIndicators && pt.silenceFacility && pt.resetFunction && pt.eventLog && pt.remoteSignalling && pw.mainsSupply && pw.batteryCondition && ft.openCircuit && ft.shortCircuit),
    sound: !!((formData.soundLevelReadings || []).length > 0),
    handover: !!(formData.handoverAsBuiltDrawings && formData.handoverLogBook),
    declaration: !!(formData.commissionerSignature && formData.overallResult),
  };

  return <SmartTabs tabs={smartTabs} value={currentTab} onValueChange={onTabChange} className="space-y-4" completedTabs={completedTabs} />;
};

export default FireAlarmG3FormTabs;
