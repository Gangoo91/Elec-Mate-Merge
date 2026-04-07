/* eslint-disable @typescript-eslint/no-explicit-any */
import { SmartTabs, SmartTab } from '@/components/ui/smart-tabs';
import { Building2, Search, ClipboardCheck, AlertTriangle, PenTool } from 'lucide-react';
import FAG6ProjectPrevious from './tabs/FAG6ProjectPrevious';
import FAG6InspectionScope from './tabs/FAG6InspectionScope';
import FAG6TestsSampling from './tabs/FAG6TestsSampling';
import FAG6DefectsObservations from './tabs/FAG6DefectsObservations';
import FAG6Declaration from './tabs/FAG6Declaration';
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

const FireAlarmG6FormTabs: React.FC<Props> = ({
  currentTab,
  onTabChange,
  formData,
  onUpdate,
  tabNavigationProps,
  onGenerateCertificate,
  onCreateInvoice,
  canGenerateCertificate = true,
}) => {
  const pt = formData.panelTests || {};
  const smartTabs: SmartTab[] = [
    {
      value: 'project',
      label: 'Project',
      shortLabel: 'Project',
      icon: <Building2 className="h-4 w-4" />,
      content: (
        <div className="space-y-4">
          <FAG6ProjectPrevious formData={formData} onUpdate={onUpdate} />
          <FireAlarmTabNavigation {...tabNavigationProps} />
        </div>
      ),
    },
    {
      value: 'scope',
      label: 'Scope',
      shortLabel: 'Scope',
      icon: <Search className="h-4 w-4" />,
      content: (
        <div className="space-y-4">
          <FAG6InspectionScope formData={formData} onUpdate={onUpdate} />
          <FireAlarmTabNavigation {...tabNavigationProps} />
        </div>
      ),
    },
    {
      value: 'tests',
      label: 'Tests',
      shortLabel: 'Tests',
      icon: <ClipboardCheck className="h-4 w-4" />,
      content: (
        <div className="space-y-4">
          <FAG6TestsSampling formData={formData} onUpdate={onUpdate} />
          <FireAlarmTabNavigation {...tabNavigationProps} />
        </div>
      ),
    },
    {
      value: 'defects',
      label: 'Defects',
      shortLabel: 'Defects',
      icon: <AlertTriangle className="h-4 w-4" />,
      content: (
        <div className="space-y-4">
          <FAG6DefectsObservations formData={formData} onUpdate={onUpdate} />
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
          <FAG6Declaration formData={formData} onUpdate={onUpdate} />
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
    project: !!(formData.clientName && formData.premisesAddress),
    scope: !!formData.extentOfInspection,
    tests: !!(pt.powerOnTest && pt.zoneIndicators),
    defects: true,
    declaration: !!(formData.inspectorSignature && formData.overallResult),
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

export default FireAlarmG6FormTabs;
