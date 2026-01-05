
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SmartTabs } from '@/components/ui/smart-tabs';
import { ArrowLeft, Shield, Zap, AlertTriangle, CheckCircle2, Calculator, BookOpen, TestTube2 } from 'lucide-react';
import ContinuityTestProcedureCard from './continuity-testing/ContinuityTestProcedureCard';
import ContinuityWhyTestSection from './continuity-testing/ContinuityWhyTestSection';
import ContinuityHowToTestSection from './continuity-testing/ContinuityHowToTestSection';
import ContinuityTablesSection from './continuity-testing/ContinuityTablesSection';
import ContinuityPracticalGuidanceSection from './continuity-testing/ContinuityPracticalGuidanceSection';
import ContinuityRegulationRequirementsCard from './continuity-testing/ContinuityRegulationRequirementsCard';
import ContinuityTestDiagram from './continuity-testing/ContinuityTestDiagram';

interface ContinuityTestingProcedureProps {
  onBack: () => void;
}

const ContinuityTestingProcedure = ({ onBack }: ContinuityTestingProcedureProps) => {  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6 sm:mb-8">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="border-elec-yellow text-elec-yellow hover:bg-elec-yellow hover:text-black min-h-[44px] touch-manipulation"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Back to Testing Procedures</span>
          <span className="sm:hidden">Back</span>
        </Button>
      </div>

      <div className="text-center space-y-3 mb-8">
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3">
          <Zap className="h-6 w-6 sm:h-8 sm:w-8 text-elec-yellow" />
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">Continuity of Protective Conductors Testing</h1>
        </div>
        <p className="text-sm sm:text-base lg:text-lg text-gray-300 max-w-3xl mx-auto">
          Comprehensive BS 7671 compliant testing procedure for protective conductor continuity with practical guidance, real-world scenarios, and professional development focus.
        </p>
      </div>

      {/* Test diagram */}
      <ContinuityTestDiagram />
      
      {/* Tabbed content sections */}
      <SmartTabs 
        tabs={[
          {
            value: "why-test",
            label: "Why Test?",
            icon: <Shield className="h-4 w-4" />,
            content: <ContinuityWhyTestSection />
          },
          {
            value: "how-test",
            label: "How to Test",
            icon: <TestTube2 className="h-4 w-4" />,
            content: <ContinuityHowToTestSection />
          },
          {
            value: "tables",
            label: "Values & Tables",
            icon: <Calculator className="h-4 w-4" />,
            content: <ContinuityTablesSection />
          },
          {
            value: "guidance",
            label: "Practical Guide",
            icon: <BookOpen className="h-4 w-4" />,
            content: <ContinuityPracticalGuidanceSection />
          }
        ]}
        defaultValue="why-test"
        className="w-full"
        breakpoint={4}
      />

      {/* Main procedure card */}
      <ContinuityTestProcedureCard />

      {/* Regulation requirements */}
      <ContinuityRegulationRequirementsCard />

      {/* Safety Alert */}
      <Card className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border-2 border-red-500/20">
        <CardHeader>
          <CardTitle className="text-red-400 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Critical Safety Reminder
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-gray-300">
            <p>• Always ensure complete isolation before commencing any continuity testing</p>
            <p>• Use appropriate test equipment compliant with current safety standards</p>
            <p>• Never assume previous test results are still valid - always retest</p>
            <p>• Be aware of parallel paths that may affect test results</p>
            <p>• Record all results accurately for compliance and safety documentation</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContinuityTestingProcedure;
