import { useRef } from 'react';
import { LPTabValue } from '@/hooks/useLightningProtectionTabs';
import LPCertificateDetails from './LPCertificateDetails';
import LPInstallationDetails from './LPInstallationDetails';
import LPVisualInspection from './LPVisualInspection';
import LPTestSchedule from './LPTestSchedule';
import LPObservations from './LPObservations';
import LPTabNavigation from './LPTabNavigation';

/* eslint-disable @typescript-eslint/no-explicit-any */

interface Props {
  formData: any;
  onUpdate: (field: string, value: any) => void;
  currentTab: LPTabValue;
  onTabChange: (tab: LPTabValue) => void;
  currentTabIndex: number;
  totalTabs: number;
  canNavigateNext: boolean;
  canNavigatePrevious: boolean;
  onNext: () => void;
  onPrevious: () => void;
  isCurrentTabComplete: boolean;
  progress: number;
  onGenerate?: () => void;
  isGenerating?: boolean;
  reportId?: string | null;
}

const TAB_ORDER: LPTabValue[] = ['certificate', 'installation', 'visual', 'testing', 'observations'];

export default function LPFormTabs({
  formData, onUpdate, currentTab,
  currentTabIndex, totalTabs, canNavigateNext, canNavigatePrevious,
  onNext, onPrevious,
  onGenerate, isGenerating, reportId,
}: Props) {
  // Track direction so the step slide matches travel (forward vs back).
  const prevIndexRef = useRef(TAB_ORDER.indexOf(currentTab));
  const currentIndex = TAB_ORDER.indexOf(currentTab);
  const isBack = currentIndex < prevIndexRef.current;
  prevIndexRef.current = currentIndex;

  const content: Record<LPTabValue, React.ReactNode> = {
    certificate: <LPCertificateDetails formData={formData} onUpdate={onUpdate} />,
    installation: <LPInstallationDetails formData={formData} onUpdate={onUpdate} />,
    visual: <LPVisualInspection formData={formData} onUpdate={onUpdate} />,
    testing: <LPTestSchedule formData={formData} onUpdate={onUpdate} />,
    observations: <LPObservations formData={formData} onUpdate={onUpdate} />,
  };

  return (
    <>
      <div
        key={currentTab}
        className={isBack ? 'motion-safe:animate-mw-step-back' : 'motion-safe:animate-mw-step-in'}
      >
        {content[currentTab]}
      </div>
      <LPTabNavigation
        currentTabIndex={currentTabIndex}
        totalTabs={totalTabs}
        canNavigateNext={canNavigateNext}
        canNavigatePrevious={canNavigatePrevious}
        onNext={onNext}
        onPrevious={onPrevious}
        isLastTab={currentTabIndex === totalTabs - 1}
        onGenerate={onGenerate}
        isGenerating={isGenerating}
        reportId={reportId}
        formData={formData}
      />
    </>
  );
}
