
import React, { useState } from 'react';
import { SmartTabs } from '@/components/ui/smart-tabs';
import { ZsTestResult } from './types';
import ZsTestProcedureCard from './ZsTestProcedureCard';
import ZsTemperatureCorrectionCard from './ZsTemperatureCorrectionCard';
import ZsReferenceValuesCard from './ZsReferenceValuesCard';
import ZsRegulationRequirementsCard from './ZsRegulationRequirementsCard';
import WhyTestSection from './WhyTestSection';
import HowToTestSection from './HowToTestSection';
import ZsTablesSection from './ZsTablesSection';
import PracticalGuidanceSection from './PracticalGuidanceSection';

const SimpleZsTestCard = () => {
  const [currentTest, setCurrentTest] = useState<ZsTestResult>({
    circuitRef: '',
    testMethod: 'live',
    protectiveDevice: '',
    deviceRating: 0,
    zsReading: '',
    zsMaxPermitted: '',
    temperature: '20',
    correctedZs: '',
    result: 'pending',
    notes: ''
  });

  const calculateTemperatureCorrection = (zs: number, testTemp: number, maxTemp: number = 70): number => {
    const factor = (230 + maxTemp) / (230 + testTemp);
    return zs * factor;
  };

  const updateCurrentTest = (field: string, value: string) => {
    setCurrentTest({...currentTest, [field]: value});
  };

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
      label: "Zs Tables", 
      content: <ZsTablesSection />
    },
    {
      value: "guidance",
      label: "Practical Guide",
      content: (
        <div className="space-y-4 sm:space-y-6">
          <PracticalGuidanceSection />
          <ZsTemperatureCorrectionCard currentTest={currentTest} />
        </div>
      )
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8">
      <ZsTestProcedureCard />
      
      <SmartTabs 
        tabs={smartTabs}
        defaultValue="why-test"
        className="w-full"
        breakpoint={4}
      />

      <ZsRegulationRequirementsCard />
    </div>
  );
};

export default SimpleZsTestCard;
