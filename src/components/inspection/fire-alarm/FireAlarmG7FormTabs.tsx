/* eslint-disable @typescript-eslint/no-explicit-any */
import { SmartTabs, SmartTab } from '@/components/ui/smart-tabs';
import { Building2, Wrench, ClipboardCheck, PenTool } from 'lucide-react';
import FAG7ProjectOriginal from './tabs/FAG7ProjectOriginal';
import FAG7ModificationDetails from './tabs/FAG7ModificationDetails';
import FAG7Testing from './tabs/FAG7Testing';
import FAG7Declaration from './tabs/FAG7Declaration';
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

const FireAlarmG7FormTabs: React.FC<Props> = ({
  currentTab,
  onTabChange,
  formData,
  onUpdate,
  tabNavigationProps,
  onGenerateCertificate,
  onCreateInvoice,
  canGenerateCertificate = true,
}) => {
  const smartTabs: SmartTab[] = [
    {
      value: 'project',
      label: 'Project',
      shortLabel: 'Project',
      icon: <Building2 className="h-4 w-4" />,
      content: (
        <div className="space-y-4">
          <FAG7ProjectOriginal formData={formData} onUpdate={onUpdate} />
          <FireAlarmTabNavigation {...tabNavigationProps} />
        </div>
      ),
    },
    {
      value: 'modification',
      label: 'Modification',
      shortLabel: 'Mod.',
      icon: <Wrench className="h-4 w-4" />,
      content: (
        <div className="space-y-4">
          <FAG7ModificationDetails formData={formData} onUpdate={onUpdate} />
          <FireAlarmTabNavigation {...tabNavigationProps} />
        </div>
      ),
    },
    {
      value: 'testing',
      label: 'Testing',
      shortLabel: 'Tests',
      icon: <ClipboardCheck className="h-4 w-4" />,
      content: (
        <div className="space-y-4">
          <FAG7Testing formData={formData} onUpdate={onUpdate} />
          <FireAlarmTabNavigation {...tabNavigationProps} />
        </div>
      ),
    },
    {
      value: 'declaration',
      label: 'Declaration',
      shortLabel: 'Sign',
      icon: <PenTool className="h-4 w-4" />,
      content: (
        <div className="space-y-4">
          <FAG7Declaration formData={formData} onUpdate={onUpdate} />
          <FireAlarmTabNavigation
            {...tabNavigationProps}
            onGenerateCertificate={onGenerateCertificate}
            onCreateInvoice={onCreateInvoice}
            canGenerateCertificate={canGenerateCertificate}
          />
        </div>
      ),
    },
  ];

  const completedTabs: Record<string, boolean> = {
    project: !!(formData.clientName && formData.premisesAddress && formData.originalCertRef),
    modification: !!formData.modificationDescription,
    testing: !!formData.modifiedDevicesTested,
    declaration: !!(formData.modifierSignature && formData.overallResult),
  };

  return (
    <SmartTabs
      tabs={smartTabs}
      value={currentTab}
      onValueChange={onTabChange}
      className="space-y-4"
      completedTabs={completedTabs}
    />
  );
};

export default FireAlarmG7FormTabs;
