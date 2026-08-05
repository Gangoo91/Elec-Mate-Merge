/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from 'react';
import FAG1ClientPremises from './tabs/FAG1ClientPremises';
import FAG1SystemDesign from './tabs/FAG1SystemDesign';
import FAG1DeviceDesign from './tabs/FAG1DeviceDesign';
import FAG1Declaration from './tabs/FAG1Declaration';
import FireAlarmTabNavigation from './FireAlarmTabNavigation';

interface Props {
  /** ELE-1477 — saved report id, for the footer's View PDF. */
  reportId?: string | null;
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
}

const TAB_ORDER = ['client', 'design', 'devices', 'declaration'];

const FireAlarmG1FormTabs: React.FC<Props> = ({
  reportId,
  currentTab,
  formData,
  onUpdate,
  tabNavigationProps,
  onGenerateCertificate,
  onCreateInvoice,
  canGenerateCertificate = true,
  onOpenEmailDialog,
  canEmail = false,
}) => {
  // Track direction so the step slide matches travel (forward vs back).
  const NEXT_LABELS = ['Continue to Design', 'Continue to Devices', 'Continue to Sign off'];

  const prevIndexRef = useRef(TAB_ORDER.indexOf(currentTab));
  const currentIndex = TAB_ORDER.indexOf(currentTab);
  const isBack = currentIndex < prevIndexRef.current;
  prevIndexRef.current = currentIndex;

  const content: Record<string, React.ReactNode> = {
    client: <FAG1ClientPremises formData={formData} onUpdate={onUpdate} />,
    design: <FAG1SystemDesign formData={formData} onUpdate={onUpdate} />,
    devices: <FAG1DeviceDesign formData={formData} onUpdate={onUpdate} />,
    declaration: <FAG1Declaration formData={formData} onUpdate={onUpdate} />,
  };

  const isLast = currentTab === 'declaration';

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
        previewReportType="fire-alarm-design"
        previewData={formData}
        previewReportId={reportId}
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

export default FireAlarmG1FormTabs;
