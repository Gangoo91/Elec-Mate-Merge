/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from 'react';
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
  onOpenEmailDialog?: () => void;
  canEmail?: boolean;
  /** Saved database report id — threaded to tabs so photo upload works on new certs. */
  reportId?: string;
}

const TAB_ORDER = ['project', 'tests', 'sound', 'handover', 'declaration'];

const FireAlarmG3FormTabs: React.FC<Props> = ({
  currentTab,
  formData,
  onUpdate,
  tabNavigationProps,
  onGenerateCertificate,
  onCreateInvoice,
  canGenerateCertificate = true,
  onOpenEmailDialog,
  canEmail = false,
  reportId,
}) => {
  // Track direction so the step slide matches travel (forward vs back).
  const NEXT_LABELS = ['Continue to Tests', 'Continue to Sound', 'Continue to Handover', 'Continue to Sign off'];

  const prevIndexRef = useRef(TAB_ORDER.indexOf(currentTab));
  const currentIndex = TAB_ORDER.indexOf(currentTab);
  const isBack = currentIndex < prevIndexRef.current;
  prevIndexRef.current = currentIndex;

  const content: Record<string, React.ReactNode> = {
    project: <FAG3ProjectReference formData={formData} onUpdate={onUpdate} />,
    tests: <FAG3CommissioningTests formData={formData} onUpdate={onUpdate} />,
    sound: <FAG3SoundEnvironment formData={formData} onUpdate={onUpdate} />,
    handover: <FAG3Handover formData={formData} onUpdate={onUpdate} reportId={reportId} />,
    declaration: <FAG3Declaration formData={formData} onUpdate={onUpdate} />,
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

export default FireAlarmG3FormTabs;
