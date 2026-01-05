
import React from 'react';
import { SmartTabs } from '@/components/ui/smart-tabs';
import PfcTestProcedureCard from './PfcTestProcedureCard';
import WhyTestSection from './WhyTestSection';
import HowToTestSection from './HowToTestSection';
import PfcTablesSection from './PfcTablesSection';
import PracticalGuidanceSection from './PracticalGuidanceSection';

const SimplePfcTestCard = () => {
  const smartTabs = [
    {
      value: "why-test",
      label: "Why Test?",
      content: <WhyTestSection />
    },
    {
      value: "how-test",
      label: "How to Test", 
      content: <HowToTestSection />
    },
    {
      value: "tables",
      label: "PFC Tables",
      content: <PfcTablesSection />
    },
    {
      value: "guidance", 
      label: "Practical Guide",
      content: <PracticalGuidanceSection />
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8">
      <PfcTestProcedureCard />
      
      <SmartTabs 
        tabs={smartTabs}
        defaultValue="why-test"
        className="w-full"
        breakpoint={4}
      />
    </div>
  );
};

export default SimplePfcTestCard;
