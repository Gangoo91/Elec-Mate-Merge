
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CircuitTestSession, CircuitTestResult } from '@/types/circuit-testing';
import { Play, Pause, SkipForward, SkipBack, CheckCircle, XCircle } from 'lucide-react';

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
  const handleStartSession = () => {
    console.log('Start Session button clicked');
    onStartSession(
      {
        location: 'Test Location',
        type: 'Domestic',
        description: 'Circuit testing session'
      },
      {
        name: 'Test Technician',
        qualifications: 'Qualified Electrician',
        company: 'Test Company'
      }
    );
  };

  const handleMarkComplete = (stepId: string) => {
    console.log('Mark Complete button clicked for step:', stepId);
    onRecordResult(stepId, { 
      status: 'completed',
      notes: 'Test completed successfully'
    });
  };

  const handleMarkFailed = (stepId: string) => {
    console.log('Mark Failed button clicked for step:', stepId);
    onRecordResult(stepId, { 
      status: 'failed',
      notes: 'Test failed - requires attention'
    });
  };

  const handleNextStep = () => {
    console.log('Next Step button clicked');
    onNextStep();
  };

  const handlePreviousStep = () => {
    console.log('Previous Step button clicked');
    onPreviousStep();
  };

  const handleCompleteSession = () => {
    console.log('Complete Session button clicked');
    onCompleteSession();
  };

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
            onClick={handleStartSession}
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
  const currentResult = session.results.find(r => r.stepId === currentStep?.id);

  if (!currentStep) {
    return (
      <Card className="border-red-500/20 bg-red-500/5">
        <CardContent className="p-6">
          <p className="text-red-400">Error: No current step found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>
              Step {session.currentStepIndex + 1} of {session.steps.length}: {currentStep.title}
            </span>
            {currentResult && (
              <span className={`text-sm px-2 py-1 rounded ${
                currentResult.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                currentResult.status === 'failed' ? 'bg-red-500/20 text-red-400' :
                'bg-gray-500/20 text-gray-400'
              }`}>
                {currentResult.status}
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{currentStep.description}</p>
          
          {currentStep.estimatedTime && (
            <p className="text-sm text-muted-foreground mb-4">
              Estimated Time: {currentStep.estimatedTime}
            </p>
          )}

          {currentStep.safetyWarnings && currentStep.safetyWarnings.length > 0 && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded">
              <h4 className="font-medium text-red-400 mb-2">Safety Warnings:</h4>
              <ul className="text-sm text-red-300 list-disc list-inside space-y-1">
                {currentStep.safetyWarnings.map((warning, index) => (
                  <li key={index}>{warning}</li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="space-y-2 mb-6">
            <h4 className="font-medium">Instructions:</h4>
            <ol className="list-decimal list-inside space-y-1">
              {currentStep.instructions.map((instruction, index) => (
                <li key={index} className="text-sm text-muted-foreground">
                  {instruction}
                </li>
              ))}
            </ol>
          </div>

          {currentStep.acceptableLimits && (
            <div className="mb-6 p-3 bg-blue-500/10 border border-blue-500/20 rounded">
              <h4 className="font-medium text-blue-400 mb-2">Acceptable Limits:</h4>
              <p className="text-sm text-blue-300">
                {currentStep.acceptableLimits.min && `Min: ${currentStep.acceptableLimits.min} ${currentStep.acceptableLimits.unit}`}
                {currentStep.acceptableLimits.max && `Max: ${currentStep.acceptableLimits.max} ${currentStep.acceptableLimits.unit}`}
              </p>
            </div>
          )}

          <div className="flex gap-2">
            <Button
              onClick={() => handleMarkComplete(currentStep.id)}
              className="bg-green-600 hover:bg-green-700"
              disabled={currentResult?.status === 'completed'}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark Complete
            </Button>
            <Button
              onClick={() => handleMarkFailed(currentStep.id)}
              variant="destructive"
              disabled={currentResult?.status === 'failed'}
            >
              <XCircle className="h-4 w-4 mr-2" />
              Mark Failed
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          onClick={handlePreviousStep}
          disabled={isFirstStep}
          variant="outline"
        >
          <SkipBack className="h-4 w-4 mr-2" />
          Previous
        </Button>
        
        {isLastStep ? (
          <Button
            onClick={handleCompleteSession}
            className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
          >
            Complete Session
          </Button>
        ) : (
          <Button
            onClick={handleNextStep}
            variant="outline"
          >
            Next
            <SkipForward className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>

      {session.results.length > 0 && (
        <Card className="border-gray-500/20 bg-gray-500/5">
          <CardHeader>
            <CardTitle className="text-sm">Session Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div>Completed: {session.results.filter(r => r.status === 'completed').length}</div>
              <div>Failed: {session.results.filter(r => r.status === 'failed').length}</div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CircuitTestingInterface;
