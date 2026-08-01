/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from 'react';
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
  /** Database report id once autosave has created the report (route param may still be 'new') */
  savedReportId?: string | null;
  // Keep unused props for backwards compat
  canAccessTab?: (tabId: any) => boolean;
}

const TAB_ORDER = ['client', 'system', 'zones', 'equipment', 'declarations'];

const FireAlarmFormTabs: React.FC<FireAlarmFormTabsProps> = ({
  currentTab,
  formData,
  onUpdate,
  tabNavigationProps,
  onGenerateCertificate,
  onCreateInvoice,
  canGenerateCertificate = true,
  onOpenEmailDialog,
  canEmail = false,
  savedReportId,
}) => {
  // Track direction so the step slide matches travel (forward vs back).
  const NEXT_LABELS = ['Continue to System', 'Continue to Zones', 'Continue to Equipment', 'Continue to Sign off'];

  const prevIndexRef = useRef(TAB_ORDER.indexOf(currentTab));
  const currentIndex = TAB_ORDER.indexOf(currentTab);
  const isBack = currentIndex < prevIndexRef.current;
  prevIndexRef.current = currentIndex;

  const content: Record<string, React.ReactNode> = {
    client: <FAClientPremises formData={formData} onUpdate={onUpdate} />,
    system: <FASystemPanel formData={formData} onUpdate={onUpdate} />,
    zones: <FAZonesDevices formData={formData} onUpdate={onUpdate} />,
    equipment: <FAEquipmentInterfaces formData={formData} onUpdate={onUpdate} />,
    declarations: (
      <FADeclarations formData={formData} onUpdate={onUpdate} savedReportId={savedReportId} />
    ),
  };

  const isLast = currentTab === 'declarations';

  return (
    <>
      <div
        key={currentTab}
        className={
          isBack
            ? 'motion-safe:animate-mw-step-back'
            : 'motion-safe:animate-mw-step-in'
        }
      >
        {content[currentTab]}
      </div>
      <FireAlarmTabNavigation
        nextLabels={NEXT_LABELS}
        {...tabNavigationProps}
        onGenerateCertificate={
          isLast ? onGenerateCertificate : tabNavigationProps.onGenerateCertificate
        }
        onCreateInvoice={onCreateInvoice}
        canGenerateCertificate={canGenerateCertificate}
        onOpenEmailDialog={onOpenEmailDialog}
        canEmail={canEmail}
      />
    </>
  );
};

export default FireAlarmFormTabs;
