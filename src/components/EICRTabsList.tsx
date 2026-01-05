
import React from 'react';
import { MobileTabsList, MobileTabsTrigger } from '@/components/ui/mobile-tabs';
import { TabsTrigger } from '@/components/ui/tabs';
import { EICRTabValue } from '@/hooks/useEICRTabs';
import { useIsMobile } from '@/hooks/use-mobile';

interface EICRTabsListProps {
  isMobile: boolean;
  currentTab: EICRTabValue;
  canAccessTab: (tabId: EICRTabValue) => boolean;
}

const EICRTabsList = ({ currentTab, canAccessTab }: EICRTabsListProps) => {
  const isMobile = useIsMobile();
  
  const tabs = [
    { value: 'details', label: 'Details', fullLabel: 'Installation Details' },
    { value: 'inspection', label: 'Inspect', fullLabel: 'Inspection' },
    { value: 'testing', label: 'Test', fullLabel: 'Testing' },
    { value: 'inspector', label: 'Inspector', fullLabel: 'Inspector' },
    { value: 'certificate', label: 'Cert', fullLabel: 'Certificate' }
  ];

  return (
    <MobileTabsList className="bg-muted">
      {tabs.map((tab) => (
        <MobileTabsTrigger
          key={tab.value}
          value={tab.value}
          disabled={!canAccessTab(tab.value as EICRTabValue)}
          className={isMobile ? 'text-xs px-2 min-w-[80px]' : ''}
        >
          {isMobile ? tab.label : tab.fullLabel}
        </MobileTabsTrigger>
      ))}
    </MobileTabsList>
  );
};

export default EICRTabsList;
