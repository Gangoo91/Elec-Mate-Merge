/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from 'react';
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
  onOpenEmailDialog?: () => void;
  canEmail?: boolean;
  /** Real report id from page state — useParams stays 'new' after replaceState. */
  reportId?: string | null;
}

const TAB_ORDER = ['project', 'scope', 'tests', 'defects', 'declaration'];

const FireAlarmG6FormTabs: React.FC<Props> = ({
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
  const NEXT_LABELS = ['Continue to Scope', 'Continue to Tests', 'Continue to Defects', 'Continue to Sign off'];

  const prevIndexRef = useRef(TAB_ORDER.indexOf(currentTab));
  const currentIndex = TAB_ORDER.indexOf(currentTab);
  const isBack = currentIndex < prevIndexRef.current;
  prevIndexRef.current = currentIndex;

  const content: Record<string, React.ReactNode> = {
    project: <FAG6ProjectPrevious formData={formData} onUpdate={onUpdate} />,
    scope: <FAG6InspectionScope formData={formData} onUpdate={onUpdate} />,
    tests: <FAG6TestsSampling formData={formData} onUpdate={onUpdate} />,
    defects: <FAG6DefectsObservations formData={formData} onUpdate={onUpdate} reportId={reportId} />,
    declaration: <FAG6Declaration formData={formData} onUpdate={onUpdate} />,
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

export default FireAlarmG6FormTabs;
