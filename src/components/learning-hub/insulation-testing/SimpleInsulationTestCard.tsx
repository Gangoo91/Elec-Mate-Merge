
import React from 'react';
import { SmartTabs } from '@/components/ui/smart-tabs';
import InsulationTestProcedureCard from './InsulationTestProcedureCard';
import WhyTestSection from './WhyTestSection';
import HowToTestSection from './HowToTestSection';
import InsulationTablesSection from '../InsulationTablesSection';
import PracticalGuidanceSection from '../PracticalGuidanceSection';
import TestConnectionDiagram from './TestConnectionDiagram';
import TemperatureEffectsDiagram from './TemperatureEffectsDiagram';
import { HelpCircle, Settings, Table, BookOpen } from 'lucide-react';

const SimpleInsulationTestCard = () => {
  const smartTabs = [
    {
      value: "why-test",
      label: "Why Test?",
      icon: <HelpCircle className="h-4 w-4" />,
      content: <WhyTestSection />
    },
    {
      value: "how-test", 
      label: "How to Test",
      icon: <Settings className="h-4 w-4" />,
      content: <HowToTestSection />
    },
    {
      value: "tables",
      label: "IR Tables",
      icon: <Table className="h-4 w-4" />,
      content: <InsulationTablesSection />
    },
    {
      value: "guidance",
      label: "Practical Guide",
      icon: <BookOpen className="h-4 w-4" />,
      content: <PracticalGuidanceSection />
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8">
      <TestConnectionDiagram />
      <TemperatureEffectsDiagram />
      <InsulationTestProcedureCard />
      
      <SmartTabs 
        tabs={smartTabs}
        defaultValue="why-test"
        className="w-full"
        breakpoint={4}
      />
    </div>
  );
};

export default SimpleInsulationTestCard;
