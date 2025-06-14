
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CircuitTestSession, CircuitTestResult } from '@/types/circuit-testing';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';

interface CircuitTestingInterfaceProps {
  session: CircuitTestSession | null;
  onStartSession: (installationDetails: any, technician: any) => void;
  onRecordResult: (stepId: string, result: Omit<CircuitTestResult, 'stepId' | 'timestamp'>) => void;
  onNextStep: () => void;
  onPreviousStep: () => void;
  onCompleteSession: () => void;
}

const CircuitTestingInterface: React.FC<CircuitTestingInterfaceProps> = ({
  session,
  onStartSession,
  onRecordResult,
  onNextStep,
  onPreviousStep,
  onCompleteSession
}) => {
  if (!session) {
    return (
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle>Start Circuit Testing Session</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            No active testing session. Start a new session to begin circuit testing.
          </p>
          <Button 
            onClick={() => onStartSession({}, {})} 
            className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
          >
            <Play className="h-4 w-4 mr-2" />
            Start Testing Session
          </Button>
        </CardContent>
      </Card>
    );
  }

  const currentStep = session.steps[session.currentStepIndex];
  const isFirstStep = session.currentStepIndex === 0;
  const isLastStep = session.currentStepIndex === session.steps.length - 1;

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle>
            Step {session.currentStepIndex + 1} of {session.steps.length}: {currentStep?.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{currentStep?.description}</p>
          
          <div className="space-y-2 mb-6">
            <h4 className="font-medium">Instructions:</h4>
            <ol className="list-decimal list-inside space-y-1">
              {currentStep?.instructions.map((instruction, index) => (
                <li key={index} className="text-sm text-muted-foreground">
                  {instruction}
                </li>
              ))}
            </ol>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => onRecordResult(currentStep.id, { status: 'completed' })}
              className="bg-green-600 hover:bg-green-700"
            >
              Mark Complete
            </Button>
            <Button
              onClick={() => onRecordResult(currentStep.id, { status: 'failed' })}
              variant="destructive"
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
          <SkipBack className="h-4 w-4 mr-2" />
          Previous
        </Button>
        
        {isLastStep ? (
          <Button
            onClick={onCompleteSession}
            className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
          >
            Complete Session
          </Button>
        ) : (
          <Button
            onClick={onNextStep}
            variant="outline"
          >
            Next
            <SkipForward className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default CircuitTestingInterface;
