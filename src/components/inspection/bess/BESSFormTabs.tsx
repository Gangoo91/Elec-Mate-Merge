import React, { useRef } from 'react';
import { BESSTabValue } from '@/hooks/useBESSTabs';
import BESSInstallationDetails from './BESSInstallationDetails';
import BESSSystemDesign from './BESSSystemDesign';
import BESSElectricalSafety from './BESSElectricalSafety';
import BESSTestResults from './BESSTestResults';
import BESSDeclarations from './BESSDeclarations';
import BESSTabNavigation from './BESSTabNavigation';

/* eslint-disable @typescript-eslint/no-explicit-any */

interface Props {
  formData: any;
  onUpdate: (field: string, value: any) => void;
  currentTab: BESSTabValue;
  onTabChange: (tab: BESSTabValue) => void;
  currentTabIndex: number;
  totalTabs: number;
  canNavigateNext: boolean;
  canNavigatePrevious: boolean;
  onNext: () => void;
  onPrevious: () => void;
  isCurrentTabComplete: boolean;
  progress: number;
  customerId?: string;
  onCustomerIdChange?: (id: string | undefined) => void;
  onGenerate?: () => void;
  isGenerating?: boolean;
  reportId?: string;
  onSaveFirst?: () => Promise<void>;
}

const TAB_ORDER: BESSTabValue[] = ['installation', 'system-design', 'electrical', 'testing', 'declarations'];

export default function BESSFormTabs({
  formData, onUpdate, currentTab,
  currentTabIndex, totalTabs, canNavigateNext, canNavigatePrevious,
  onNext, onPrevious, isCurrentTabComplete, progress,
  customerId, onCustomerIdChange, onGenerate, isGenerating, reportId, onSaveFirst,
}: Props) {
  // Track direction so the step slide matches travel (forward vs back).
  const prevIndexRef = useRef(TAB_ORDER.indexOf(currentTab));
  const currentIndex = TAB_ORDER.indexOf(currentTab);
  const isBack = currentIndex < prevIndexRef.current;
  prevIndexRef.current = currentIndex;

  const content: Record<BESSTabValue, React.ReactNode> = {
    installation: (
      <BESSInstallationDetails
        formData={formData}
        onUpdate={onUpdate}
        customerId={customerId}
        onCustomerIdChange={onCustomerIdChange}
      />
    ),
    'system-design': <BESSSystemDesign formData={formData} onUpdate={onUpdate} />,
    electrical: <BESSElectricalSafety formData={formData} onUpdate={onUpdate} />,
    testing: <BESSTestResults formData={formData} onUpdate={onUpdate} />,
    declarations: (
      <BESSDeclarations
        formData={formData}
        onUpdate={onUpdate}
        reportId={reportId}
        onSaveFirst={onSaveFirst}
      />
    ),
  };

  return (
    <>
      <div
        key={currentTab}
        className={isBack ? 'motion-safe:animate-mw-step-back' : 'motion-safe:animate-mw-step-in'}
      >
        {content[currentTab]}
      </div>
      <BESSTabNavigation
        currentTabIndex={currentTabIndex}
        totalTabs={totalTabs}
        canNavigateNext={canNavigateNext}
        canNavigatePrevious={canNavigatePrevious}
        onNext={onNext}
        onPrevious={onPrevious}
        isCurrentTabComplete={isCurrentTabComplete}
        progress={progress}
        isLastTab={currentTabIndex === totalTabs - 1}
        onGenerate={onGenerate}
        isGenerating={isGenerating}
        reportId={reportId}
        formData={formData}
      />
    </>
  );
}
