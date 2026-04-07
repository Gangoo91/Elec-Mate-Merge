/* eslint-disable @typescript-eslint/no-explicit-any */
import { SmartTabs, SmartTab } from '@/components/ui/smart-tabs';
import { Building2, PenTool, Grid3X3, FileCheck } from 'lucide-react';
import FAG1ClientPremises from './tabs/FAG1ClientPremises';
import FAG1SystemDesign from './tabs/FAG1SystemDesign';
import FAG1DeviceDesign from './tabs/FAG1DeviceDesign';
import FAG1Declaration from './tabs/FAG1Declaration';
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

const FireAlarmG1FormTabs: React.FC<Props> = ({
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
      value: 'client',
      label: 'Client & Premises',
      shortLabel: 'Client',
      icon: <Building2 className="h-4 w-4" />,
      content: (
        <div className="space-y-4">
          <FAG1ClientPremises formData={formData} onUpdate={onUpdate} />
          <FireAlarmTabNavigation {...tabNavigationProps} />
        </div>
      ),
    },
    {
      value: 'design',
      label: 'System Design',
      shortLabel: 'Design',
      icon: <PenTool className="h-4 w-4" />,
      content: (
        <div className="space-y-4">
          <FAG1SystemDesign formData={formData} onUpdate={onUpdate} />
          <FireAlarmTabNavigation {...tabNavigationProps} />
        </div>
      ),
    },
    {
      value: 'devices',
      label: 'Device Design',
      shortLabel: 'Devices',
      icon: <Grid3X3 className="h-4 w-4" />,
      content: (
        <div className="space-y-4">
          <FAG1DeviceDesign formData={formData} onUpdate={onUpdate} />
          <FireAlarmTabNavigation {...tabNavigationProps} />
        </div>
      ),
    },
    {
      value: 'declaration',
      label: 'Declaration',
      shortLabel: 'Sign',
      icon: <FileCheck className="h-4 w-4" />,
      content: (
        <div className="space-y-4">
          <FAG1Declaration formData={formData} onUpdate={onUpdate} />
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
    client: !!(formData.clientName && formData.premisesAddress && formData.fraReference),
    design: !!(formData.systemCategory && formData.designBasis && formData.categoryJustification),
    devices: !!(
      formData.zones?.length > 0 &&
      (formData.plannedOpticalSmoke || formData.plannedHeat || formData.plannedMultiSensor)
    ),
    declaration: !!(formData.designerSignature && formData.designerName),
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

export default FireAlarmG1FormTabs;
