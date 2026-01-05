
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SmartTabs } from '@/components/ui/smart-tabs';
import { RotateCcw, HelpCircle, Settings, BookOpen, TestTube } from 'lucide-react';
import { PolarityTestResult } from './polarity-testing/types';
import WhyTestSection from './polarity-testing/WhyTestSection';
import HowToTestSection from './polarity-testing/HowToTestSection';
import PracticalGuidanceSection from './polarity-testing/PracticalGuidanceSection';
import PracticeTestForm from './polarity-testing/PracticeTestForm';
import TestResultsList from './polarity-testing/TestResultsList';

const EnhancedPolarityTestCard = () => {
  const [testResults, setTestResults] = useState<PolarityTestResult[]>([]);
  const [currentTest, setCurrentTest] = useState<PolarityTestResult>({
    circuitRef: '',
    testMethod: 'dead',
    socketOutlets: 'pending',
    lightingPoints: 'pending',
    isolatorSwitches: 'pending',
    result: 'pending',
    notes: ''
  });

  const handleAddTest = () => {
    if (currentTest.circuitRef && 
        (currentTest.socketOutlets !== 'pending' || 
         currentTest.lightingPoints !== 'pending' || 
         currentTest.isolatorSwitches !== 'pending')) {
      
      // Determine overall result
      const hasFailures = currentTest.socketOutlets === 'fail' || 
                         currentTest.lightingPoints === 'fail' || 
                         currentTest.isolatorSwitches === 'fail';
      
      const result: PolarityTestResult = {
        ...currentTest,
        result: hasFailures ? 'fail' : 'pass'
      };

      setTestResults([...testResults, result]);
      setCurrentTest({
        circuitRef: '',
        testMethod: 'dead',
        socketOutlets: 'pending',
        lightingPoints: 'pending',
        isolatorSwitches: 'pending',
        result: 'pending',
        notes: ''
      });
    }
  };

  const handleRemoveTest = (index: number) => {
    setTestResults(testResults.filter((_, i) => i !== index));
  };

  const updateCurrentTest = (field: string, value: string) => {
    setCurrentTest({...currentTest, [field]: value});
  };

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
      value: "guidance",
      label: "Practical Guide",
      icon: <BookOpen className="h-4 w-4" />,
      content: <PracticalGuidanceSection />
    },
    {
      value: "practice",
      label: "Practice",
      icon: <TestTube className="h-4 w-4" />,
      content: (
        <div className="space-y-6">
          <PracticeTestForm
            currentTest={currentTest}
            onUpdateTest={updateCurrentTest}
            onAddTest={handleAddTest}
          />
          <TestResultsList
            testResults={testResults}
            onRemoveTest={handleRemoveTest}
          />
        </div>
      )
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-2 border-indigo-500/20">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-indigo-400 flex items-center gap-2 text-lg sm:text-xl md:text-2xl">
            <RotateCcw className="h-5 w-5 sm:h-6 sm:w-6" />
            Enhanced Polarity Testing Module
          </CardTitle>
          <CardDescription className="text-gray-300 text-sm sm:text-base">
            Comprehensive learning module for polarity verification - BS 7671 Regulation 612.6
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
    </div>
  );
};

export default EnhancedPolarityTestCard;
