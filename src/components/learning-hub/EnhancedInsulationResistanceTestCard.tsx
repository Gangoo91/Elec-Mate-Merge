
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SmartTabs } from '@/components/ui/smart-tabs';
import { Zap, HelpCircle, Settings, Atom, Table } from 'lucide-react';
import WhyTestSection from './insulation-testing/WhyTestSection';
import HowToTestSection from './insulation-testing/HowToTestSection';
import ScienceSection from './insulation-testing/ScienceSection';
import InsulationTablesSection from './InsulationTablesSection';
import PracticalGuidanceSection from './PracticalGuidanceSection';
import InsulationRegulationRequirementsCard from './insulation-testing/InsulationRegulationRequirementsCard';

const EnhancedInsulationResistanceTestCard = () => {
  const smartTabs = [
    {
      value: "why",
      label: "Why Test?",
      icon: <HelpCircle className="h-4 w-4" />,
      content: <WhyTestSection />
    },
    {
      value: "how",
      label: "How to Test",
      icon: <Settings className="h-4 w-4" />,
      content: <HowToTestSection />
    },
    {
      value: "science",
      label: "The Science",
      icon: <Atom className="h-4 w-4" />,
      content: <ScienceSection />
    },
    {
      value: "tables",
      label: "IR Tables",
      icon: <Table className="h-4 w-4" />,
      content: <InsulationTablesSection />
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-2 border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center gap-2">
            <Zap className="h-6 w-6" />
            Enhanced Insulation Resistance Testing Module
          </CardTitle>
          <CardDescription className="text-white">
            Comprehensive learning module for insulation resistance testing with temperature correction - BS 7671 Regulation 612.3
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SmartTabs 
            tabs={smartTabs}
            defaultValue="why" 
            className="w-full"
            breakpoint={4}
          />
        </CardContent>
      </Card>

      <PracticalGuidanceSection />
      <InsulationRegulationRequirementsCard />
    </div>
  );
};

export default EnhancedInsulationResistanceTestCard;
