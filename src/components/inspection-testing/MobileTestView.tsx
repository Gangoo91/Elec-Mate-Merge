
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TestFlow, TestResult } from '@/types/inspection-testing';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface MobileTestViewProps {
  testFlow: TestFlow;
  currentStepIndex: number;
  results: TestResult[];
  onNextStep: () => void;
  onPreviousStep: () => void;
  onRecordResult: (result: Omit<TestResult, 'stepId' | 'timestamp'>) => void;
}

const MobileTestView: React.FC<MobileTestViewProps> = ({
  testFlow,
  currentStepIndex,
  results,
  onNextStep,
  onPreviousStep,
  onRecordResult
}) => {
  const currentStep = testFlow.steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === testFlow.steps.length - 1;

  if (!currentStep) {
    return (
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">No test step available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-lg">
            {testFlow.title} - Step {currentStepIndex + 1}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {currentStep.title}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm">{currentStep.description}</p>
          
          <div className="space-y-2">
            <h4 className="font-medium">Instructions:</h4>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              {currentStep.instructions.map((instruction, index) => (
                <li key={index} className="text-muted-foreground">
                  {instruction}
                </li>
              ))}
            </ol>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              onClick={() => onRecordResult({ status: 'completed' })}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              Mark Complete
            </Button>
            <Button
              onClick={() => onRecordResult({ status: 'failed' })}
              variant="destructive"
              className="flex-1"
            >
              Mark Failed
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          onClick={onPreviousStep}
          disabled={isFirstStep}
          variant="outline"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <Button
          onClick={onNextStep}
          disabled={isLastStep}
          variant="outline"
        >
          Next
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default MobileTestView;
