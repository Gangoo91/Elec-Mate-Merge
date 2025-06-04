
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, AlertTriangle, User, FileText } from 'lucide-react';
import { testFlows } from '@/data/inspection-testing/testFlows';
import { useTestFlowEngine } from '@/hooks/useTestFlowEngine';
import TestStepDisplay from './TestStepDisplay';
import TestFlowSelector from './TestFlowSelector';
import SessionSetupForm from './SessionSetupForm';
import TestProgressSidebar from './TestProgressSidebar';
import TestCompletionSummary from './TestCompletionSummary';
import { TestFlow, TestSession } from '@/types/inspection-testing';
import { useIsMobile } from '@/hooks/use-mobile';

interface InspectionTestingWalkthroughProps {
  mode: 'electrician' | 'apprentice';
  onComplete: (session: TestSession) => void;
}

const InspectionTestingWalkthrough = ({ mode, onComplete }: InspectionTestingWalkthroughProps) => {
  const [selectedFlow, setSelectedFlow] = useState<TestFlow | null>(null);
  const [showSetup, setShowSetup] = useState(false);
  const isMobile = useIsMobile();

  const {
    session,
    currentStep,
    currentStepIndex,
    currentStepResult,
    progress,
    isLastStep,
    isFirstStep,
    isSessionActive,
    startSession,
    recordResult,
    nextStep,
    previousStep,
    completeSession
  } = useTestFlowEngine(selectedFlow);

  const handleFlowSelection = (flow: TestFlow) => {
    setSelectedFlow(flow);
    setShowSetup(true);
  };

  const handleSessionStart = (installationDetails: any, technician: any) => {
    startSession(installationDetails, technician);
    setShowSetup(false);
  };

  const handleStepComplete = (result: any) => {
    if (!currentStep) return;
    
    recordResult(currentStep.id, result);
    
    // Auto-advance for successful completions
    if (result.status === 'completed' && !isLastStep) {
      setTimeout(() => {
        nextStep();
      }, 1000);
    }
  };

  const handleTestCompletion = () => {
    const completedSession = completeSession();
    if (completedSession) {
      onComplete(completedSession);
    }
  };

  // Flow selection view
  if (!selectedFlow) {
    return (
      <div className="space-y-6">
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-elec-yellow" />
              Select Testing Procedure
            </CardTitle>
            <p className="text-muted-foreground">
              Choose the appropriate testing procedure for your electrical installation work.
            </p>
          </CardHeader>
          <CardContent>
            <TestFlowSelector
              flows={testFlows}
              onSelectFlow={handleFlowSelection}
              mode={mode}
            />
          </CardContent>
        </Card>
      </div>
    );
  }

  // Session setup view
  if (showSetup && !session) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => {
              setSelectedFlow(null);
              setShowSetup(false);
            }}
          >
            ← Back to Selection
          </Button>
          <div>
            <h2 className="text-xl font-semibold">{selectedFlow.name}</h2>
            <p className="text-muted-foreground">{selectedFlow.description}</p>
          </div>
        </div>
        
        <SessionSetupForm
          testFlow={selectedFlow}
          onStartSession={handleSessionStart}
          mode={mode}
        />
      </div>
    );
  }

  // Testing session completion view
  if (session && session.status === 'completed') {
    return (
      <TestCompletionSummary
        session={session}
        testFlow={selectedFlow}
        onStartNew={() => {
          setSelectedFlow(null);
          setShowSetup(false);
        }}
        mode={mode}
      />
    );
  }

  // Active testing session view
  if (session && currentStep && isSessionActive) {
    return (
      <div className={`${isMobile ? 'space-y-4' : 'grid grid-cols-1 lg:grid-cols-4 gap-6'}`}>
        {/* Progress Sidebar */}
        <div className={isMobile ? 'order-2' : 'lg:col-span-1'}>
          <TestProgressSidebar
            session={session}
            testFlow={selectedFlow}
            currentStepIndex={currentStepIndex}
            mode={mode}
          />
        </div>

        {/* Main Testing Area */}
        <div className={`${isMobile ? 'order-1' : 'lg:col-span-3'} space-y-6`}>
          {/* Session Header */}
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-elec-yellow" />
                    {session.technician.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {session.installationDetails.location}
                  </p>
                </div>
                <Badge variant="outline" className="bg-green-900/30 border-green-500/30">
                  <Clock className="h-3 w-3 mr-1" />
                  Session Active
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Progress: Step {currentStepIndex + 1} of {selectedFlow.steps.length}</span>
                  <span>{Math.round(progress)}% Complete</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </CardHeader>
          </Card>

          {/* Current Test Step */}
          <TestStepDisplay
            step={currentStep}
            result={currentStepResult}
            onRecordResult={handleStepComplete}
            mode={mode}
          />

          {/* Navigation Controls */}
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardContent className="pt-6">
              <div className={`flex ${isMobile ? 'flex-col gap-3' : 'justify-between items-center'}`}>
                <Button
                  variant="outline"
                  onClick={previousStep}
                  disabled={isFirstStep}
                  className={isMobile ? 'w-full' : ''}
                >
                  ← Previous Step
                </Button>

                <div className="flex items-center gap-2">
                  {currentStepResult?.status === 'completed' && (
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  )}
                  {currentStepResult?.status === 'failed' && (
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                  )}
                  <span className="text-sm font-medium">
                    {currentStepResult?.status || 'Pending'}
                  </span>
                </div>

                {isLastStep ? (
                  <Button
                    onClick={handleTestCompletion}
                    disabled={!currentStepResult || currentStepResult.status !== 'completed'}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Complete Testing
                  </Button>
                ) : (
                  <Button
                    onClick={nextStep}
                    disabled={!currentStepResult || currentStepResult.status !== 'completed'}
                    className={isMobile ? 'w-full' : ''}
                  >
                    Next Step →
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Loading or error state
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardContent className="pt-6">
        <div className="text-center">
          <p className="text-muted-foreground">Initializing testing session...</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default InspectionTestingWalkthrough;
