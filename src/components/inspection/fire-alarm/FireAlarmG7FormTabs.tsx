/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from 'react';
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
  onOpenEmailDialog?: () => void;
  canEmail?: boolean;
  /** Saved report id — threaded to tabs so photo uploads work before a reload. */
  reportId?: string;
}

const TAB_ORDER = ['project', 'modification', 'testing', 'declaration'];

const FireAlarmG7FormTabs: React.FC<Props> = ({
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
  const NEXT_LABELS = ['Continue to Modification', 'Continue to Testing', 'Continue to Sign off'];

  const prevIndexRef = useRef(TAB_ORDER.indexOf(currentTab));
  const currentIndex = TAB_ORDER.indexOf(currentTab);
  const isBack = currentIndex < prevIndexRef.current;
  prevIndexRef.current = currentIndex;

  const content: Record<string, React.ReactNode> = {
    project: <FAG7ProjectOriginal formData={formData} onUpdate={onUpdate} />,
    modification: <FAG7ModificationDetails formData={formData} onUpdate={onUpdate} />,
    testing: <FAG7Testing formData={formData} onUpdate={onUpdate} reportId={reportId} />,
    declaration: <FAG7Declaration formData={formData} onUpdate={onUpdate} />,
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

export default FireAlarmG7FormTabs;
