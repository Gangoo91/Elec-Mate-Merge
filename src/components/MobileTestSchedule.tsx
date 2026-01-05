
import React, { useState, useEffect } from 'react';
import MobileTestTypeSection from './MobileTestTypeSection';
import PhoneRotationPrompt from './PhoneRotationPrompt';
import MobileTestScheduleHeader from './MobileTestScheduleHeader';
import MobileTestScheduleEmpty from './MobileTestScheduleEmpty';
import MobileTestTypeCard from './MobileTestTypeCard';
import { testTypes } from '@/constants/testTypes';
import { useToast } from '@/hooks/use-toast';

interface MobileTestScheduleProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

const MobileTestSchedule = ({ formData, onUpdate }: MobileTestScheduleProps) => {
  const { toast } = useToast();
  const [showRotationPrompt, setShowRotationPrompt] = useState(false);
  const [currentTestType, setCurrentTestType] = useState<string | null>(null);
  const [completedTests, setCompletedTests] = useState<Set<string>>(new Set());

  const circuits = formData.circuits || [];

  // Check if device should be rotated for testing
  useEffect(() => {
    const handleOrientationChange = () => {
      if (currentTestType && window.innerHeight > window.innerWidth) {
        setShowRotationPrompt(true);
      } else {
        setShowRotationPrompt(false);
      }
    };

    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleOrientationChange);
    
    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', handleOrientationChange);
    };
  }, [currentTestType]);

  // Calculate overall progress
  const calculateProgress = () => {
    if (circuits.length === 0) return 0;
    
    const totalTests = circuits.length * testTypes.length;
    const completedTestsCount = Array.from(completedTests).length;
    
    return Math.round((completedTestsCount / totalTests) * 100);
  };

  const handleStartTestType = (testTypeId: string) => {
    setCurrentTestType(testTypeId);
    
    // Show rotation prompt for landscape testing
    if (window.innerHeight > window.innerWidth) {
      setShowRotationPrompt(true);
    }
  };

  const handleTestComplete = (testTypeId: string, circuitId: string) => {
    const testKey = `${testTypeId}-${circuitId}`;
    setCompletedTests(prev => new Set([...prev, testKey]));
    
    toast({
      title: "Test completed",
      description: `${testTypes.find(t => t.id === testTypeId)?.name} completed for circuit`,
    });
  };

  const handleBackToOverview = () => {
    setCurrentTestType(null);
    setShowRotationPrompt(false);
  };

  if (showRotationPrompt) {
    return (
      <PhoneRotationPrompt 
        onContinuePortrait={() => setShowRotationPrompt(false)}
        testTypeName={testTypes.find(t => t.id === currentTestType)?.name || ''}
      />
    );
  }

  if (currentTestType) {
    const testType = testTypes.find(t => t.id === currentTestType);
    if (!testType) return null;

    return (
      <MobileTestTypeSection
        testType={testType}
        circuits={circuits}
        formData={formData}
        onUpdate={onUpdate}
        onBack={handleBackToOverview}
        onTestComplete={handleTestComplete}
        completedTests={completedTests}
      />
    );
  }

  const progress = calculateProgress();
  const totalTests = circuits.length * testTypes.length;

  return (
    <div className="space-y-4 pb-20">
      <MobileTestScheduleHeader
        progress={progress}
        completedTestsCount={completedTests.size}
        totalTests={totalTests}
        circuits={circuits}
      />

      {circuits.length === 0 ? (
        <MobileTestScheduleEmpty />
      ) : (
        <div className="space-y-3">
          {testTypes.map((testType) => (
            <MobileTestTypeCard
              key={testType.id}
              testType={testType}
              circuits={circuits}
              completedTests={completedTests}
              onStartTest={handleStartTestType}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileTestSchedule;
