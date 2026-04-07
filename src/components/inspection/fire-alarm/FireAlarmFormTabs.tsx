import { SmartTabs, SmartTab } from '@/components/ui/smart-tabs';
import { Building2, Cpu, Grid3X3, Link2, FileCheck } from 'lucide-react';
import FAClientPremises from './tabs/FAClientPremises';
import FASystemPanel from './tabs/FASystemPanel';
import FAZonesDevices from './tabs/FAZonesDevices';
import FAEquipmentInterfaces from './tabs/FAEquipmentInterfaces';
import FADeclarations from './tabs/FADeclarations';
import FireAlarmTabNavigation from './FireAlarmTabNavigation';

interface FireAlarmFormTabsProps {
  currentTab: string;
  onTabChange: (value: string) => void;
  formData: Record<string, any>;
  onUpdate: (field: string, value: any) => void;
  tabNavigationProps: any;
  onGenerateCertificate: () => void;
  onCreateInvoice?: () => void;
  onSaveDraft: () => void;
  canGenerateCertificate?: boolean;
  onOpenEmailDialog?: () => void;
  canEmail?: boolean;
  // Keep unused props for backwards compat
  canAccessTab?: (tabId: any) => boolean;
}

const FireAlarmFormTabs: React.FC<FireAlarmFormTabsProps> = ({
  currentTab,
  onTabChange,
  formData,
  onUpdate,
  tabNavigationProps,
  onGenerateCertificate,
  onCreateInvoice,
  canGenerateCertificate = true,
  onOpenEmailDialog,
  canEmail = false,
}) => {
  const smartTabs: SmartTab[] = [
    {
      value: 'client',
      label: 'Client & Premises',
      shortLabel: 'Client',
      icon: <Building2 className="h-4 w-4" />,
      content: (
        <div className="space-y-4">
          <FAClientPremises formData={formData} onUpdate={onUpdate} />
          <FireAlarmTabNavigation {...tabNavigationProps} />
        </div>
      ),
    },
    {
      value: 'system',
      label: 'System & Panel',
      shortLabel: 'System',
      icon: <Cpu className="h-4 w-4" />,
      content: (
        <div className="space-y-4">
          <FASystemPanel formData={formData} onUpdate={onUpdate} />
          <FireAlarmTabNavigation {...tabNavigationProps} />
        </div>
      ),
    },
    {
      value: 'zones',
      label: 'Zones & Devices',
      shortLabel: 'Zones',
      icon: <Grid3X3 className="h-4 w-4" />,
      content: (
        <div className="space-y-4">
          <FAZonesDevices formData={formData} onUpdate={onUpdate} />
          <FireAlarmTabNavigation {...tabNavigationProps} />
        </div>
      ),
    },
    {
      value: 'equipment',
      label: 'Equipment',
      shortLabel: 'Equip',
      icon: <Link2 className="h-4 w-4" />,
      content: (
        <div className="space-y-4">
          <FAEquipmentInterfaces formData={formData} onUpdate={onUpdate} />
          <FireAlarmTabNavigation {...tabNavigationProps} />
        </div>
      ),
    },
    {
      value: 'declarations',
      label: 'Declarations',
      shortLabel: 'Sign',
      icon: <FileCheck className="h-4 w-4" />,
      content: (
        <div className="space-y-4">
          <FADeclarations formData={formData} onUpdate={onUpdate} />
          <FireAlarmTabNavigation
            {...tabNavigationProps}
            onGenerateCertificate={onGenerateCertificate}
            onCreateInvoice={onCreateInvoice}
            canGenerateCertificate={canGenerateCertificate}
            onOpenEmailDialog={onOpenEmailDialog}
            canEmail={canEmail}
          />
        </div>
      ),
    },
  ];

  // Calculate tab completion
  const completedTabs: Record<string, boolean> = {
    client: !!(formData.clientName && formData.premisesAddress),
    system: !!(formData.systemCategory && formData.systemMake),
    zones: !!((formData.zones?.length > 0) && (formData.detectors?.length > 0 || formData.sounders?.length > 0)),
    equipment: !!(formData.asFittedDrawingsProvided),
    declarations: !!(formData.installerSignature && formData.overallResult),
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

export default FireAlarmFormTabs;
