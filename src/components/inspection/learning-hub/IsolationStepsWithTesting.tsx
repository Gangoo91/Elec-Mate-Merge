
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, Shield, TestTube } from 'lucide-react';
import PracticalIsolationStepCard from './PracticalIsolationStepCard';
import TestingPhase from './TestingPhase';

interface IsolationStep {
  id: number;
  title: string;
  description: string;
  regulation: string;
  completed: boolean;
  critical: boolean;
  practicalGuidance: string[];
  safetyNotes: string[];
  testingRequired?: boolean;
  testingInstructions?: string;
}

interface TestReading {
  phase: string;
  liveToNeutral: string;
  liveToEarth: string;
  neutralToEarth: string;
  valid: boolean;
}

interface IsolationStepsWithTestingProps {
  isolationSteps: IsolationStep[];
  testReadings: TestReading[];
  onStepToggle: (stepId: number) => void;
  onTestReadingChange: (phaseIndex: number, field: keyof Omit<TestReading, 'phase' | 'valid'>, value: string) => void;
  onProceed: () => void;
}

const IsolationStepsWithTesting = ({ 
  isolationSteps, 
  testReadings, 
  onStepToggle, 
  onTestReadingChange, 
  onProceed 
}: IsolationStepsWithTestingProps) => {
  const completedSteps = isolationSteps.filter(step => step.completed).length;
  const totalSteps = isolationSteps.length;
  const progressPercentage = (completedSteps / totalSteps) * 100;
  
  const criticalStepsCompleted = isolationSteps.filter(step => step.critical && step.completed).length;
  const totalCriticalSteps = isolationSteps.filter(step => step.critical).length;
  const allTestsValid = testReadings.every(reading => reading.valid);
  
  const testingStep = isolationSteps.find(step => step.testingRequired);
  const showTesting = testingStep?.completed || false;
  const canProceed = criticalStepsCompleted === totalCriticalSteps && allTestsValid;

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border-2 border-red-500/20">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Safe Isolation Procedure with Integrated Testing
          </CardTitle>
          <CardDescription className="text-gray-300">
            Follow the step-by-step procedure with practical guidance and complete testing when required
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-foreground">Progress: {completedSteps}/{totalSteps} steps</span>
              <span className="text-elec-yellow">{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="w-full" />
          </div>
          
          <div className="space-y-4">
            {isolationSteps.map((step) => (
              <PracticalIsolationStepCard
                key={step.id}
                step={step}
                onToggle={onStepToggle}
              />
            ))}
          </div>

          {showTesting && (
            <div className="mt-8">
              <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-elec-yellow flex items-center gap-2">
                    <TestTube className="h-5 w-5" />
                    Three-Phase Testing (Step 5 Validation)
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Record test readings to validate the installation is dead
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TestingPhase
                    testReadings={testReadings}
                    onTestReadingChange={onTestReadingChange}
                    onProceed={() => {}} // No separate proceed needed
                  />
                </CardContent>
              </Card>
            </div>
          )}

          <div className="mt-6 p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-orange-400" />
              <span className="font-medium text-orange-400">Procedure Status</span>
            </div>
            <p className="text-gray-300 text-sm">
              Critical steps: {criticalStepsCompleted}/{totalCriticalSteps} completed
              {showTesting && ` • Testing: ${allTestsValid ? 'Valid' : 'Incomplete'}`}
            </p>
          </div>

          <Button 
            onClick={onProceed}
            className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90 mt-4"
            disabled={!canProceed}
          >
            Generate Isolation Certificate
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default IsolationStepsWithTesting;
