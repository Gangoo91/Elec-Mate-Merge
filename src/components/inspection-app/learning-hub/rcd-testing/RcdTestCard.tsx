
import React from 'react';
import { Shield, Zap, TestTube2, BookOpen } from 'lucide-react';
import { SmartTabs } from '@/components/ui/smart-tabs';
import WhyTestSection from './WhyTestSection';
import HowToTestSection from './HowToTestSection';
import PracticalGuidanceSection from './PracticalGuidanceSection';
import RcdTestDiagram from './RcdTestDiagram';

const RcdTestCard = () => {
  const smartTabs = [
    {
      value: "why-test",
      label: "Why Test RCDs?",
      icon: <Shield className="h-4 w-4" />,
      content: <WhyTestSection />
    },
    {
      value: "how-to-test", 
      label: "How to Test",
      icon: <TestTube2 className="h-4 w-4" />,
      content: <HowToTestSection />
    },
    {
      value: "practical-guidance",
      label: "Practical Guidance",
      icon: <BookOpen className="h-4 w-4" />,
      content: <PracticalGuidanceSection />
    }
  ];

  return (
    <div className="bg-card rounded-lg p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-elec-yellow" />
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">RCD Testing</h2>
          <p className="text-sm sm:text-base text-white">Residual Current Device testing procedures and guidance</p>
        </div>
      </div>

      <RcdTestDiagram />

      <SmartTabs 
        tabs={smartTabs}
        defaultValue="why-test"
        className="w-full"
        breakpoint={4}
      />
    </div>
  );
};

export default RcdTestCard;
