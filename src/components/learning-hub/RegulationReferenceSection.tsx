
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { SmartTabs } from '@/components/ui/smart-tabs';
import { ArrowLeft } from 'lucide-react';
import QuickReferenceTools from './regulation-reference/QuickReferenceTools';
import TestingStandardsSection from './regulation-reference/TestingStandardsSection';
import SafetyComplianceSection from './regulation-reference/SafetyComplianceSection';
import PracticalGuidance from './regulation-reference/PracticalGuidance';
import KeyRegulationsGrid from './regulation-reference/KeyRegulationsGrid';
import RecentUpdatesSection from './regulation-reference/RecentUpdatesSection';

interface RegulationReferenceSectionProps {
  onBack: () => void;
}

const RegulationReferenceSection = ({ onBack }: RegulationReferenceSectionProps) => {
  const smartTabs = [
    {
      value: "quick-ref",
      label: "Quick Reference",
      content: <QuickReferenceTools />
    },
    {
      value: "testing", 
      label: "Testing Standards",
      content: <TestingStandardsSection />
    },
    {
      value: "safety",
      label: "Safety & Compliance", 
      content: <SafetyComplianceSection />
    },
    {
      value: "guidance",
      label: "Practical Guidance",
      content: <PracticalGuidance />
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 px-3 sm:px-4">
      {/* Header */}
      <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="border-elec-yellow text-elec-yellow hover:bg-elec-yellow hover:text-black transition-all duration-200 min-h-[44px] touch-manipulation"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Back to Apprentice Hub</span>
          <span className="sm:hidden">Back</span>
        </Button>
      </div>

      {/* Simple Header */}
      <div className="text-center space-y-3 sm:space-y-4 mb-6 sm:mb-8 md:mb-12 px-2 sm:px-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">BS7671 Practical Reference</h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
          The regulations that matter most to your daily work as an electrician. 
          Quick access to testing standards, safety requirements, and compliance guidance.
        </p>
      </div>

      {/* Main Content Tabs */}
      <SmartTabs 
        tabs={smartTabs}
        defaultValue="quick-ref"
        className="w-full"
      />

      {/* Key Regulations Grid */}
      <KeyRegulationsGrid />

      {/* Recent Updates */}
      <RecentUpdatesSection />
    </div>
  );
};

export default RegulationReferenceSection;
