
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, ArrowRight, CheckCircle, AlertTriangle, Play, Pause, RotateCcw } from 'lucide-react';
import { TestFlow, TestSession } from '@/types/inspection-testing';
import { useTestFlowEngine } from '@/hooks/useTestFlowEngine';
import { enhancedTestFlows } from '@/data/inspection-testing/enhancedTestFlows';
import { expandedTestFlows } from '@/data/inspection-testing/expandedTestFlows';
import EnhancedTestFlowSelector from './EnhancedTestFlowSelector';
import TestStepDisplay from './TestStepDisplay';
import GuidedWorkflow from './GuidedWorkflow';
import SessionSetup from './SessionSetup';

interface InspectionTestingWalkthroughProps {
  mode: 'electrician' | 'apprentice';
  onComplete: (session: TestSession) => void;
}

const InspectionTestingWalkthrough = ({ mode, onComplete }: InspectionTestingWalkthroughProps) => {
  const [selectedFlow, setSelectedFlow] = useState<TestFlow | null>(null);
  const [showGuidedWorkflow, setShowGuidedWorkflow] = useState(true);
  
  // Combine enhanced and expanded test flows
  const allTestFlows = [...enhancedTestFlows, ...expandedTestFlows];
  
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
    completeSession,
    pauseSession,
    resumeSession
  } = useTestFlowEngine(selectedFlow);

  const handleFlowSelection = (flow: TestFlow) => {
    setSelectedFlow(flow);
    console.log('Selected test flow:', flow);
  };

  const handleStartSession = (installationDetails: any, technician: any) => {
    startSession(installationDetails, technician);
    console.log('Session started with details:', { installationDetails, technician });
  };

  const handleStepCompletion = () => {
    if (isLastStep) {
      const completedSession = completeSession();
      if (completedSession) {
        onComplete(completedSession);
      }
    } else {
      nextStep();
    }
  };

  const handleRestart = () => {
    setSelectedFlow(null);
    setShowGuidedWorkflow(true);
  };

  const getSessionStatusInfo = () => {
    if (!session) return null;
    
    const completedSteps = session.results.filter(r => r.status === 'completed').length;
    const failedSteps = session.results.filter(r => r.status === 'failed').length;
    const totalSteps = selectedFlow?.steps.length || 0;
    
    return {
      completed: completedSteps,
      failed: failedSteps,
      total: totalSteps,
      remaining: totalSteps - completedSteps - failedSteps
    };
  };

  const sessionInfo = getSessionStatusInfo();

  // No flow selected - show flow selector
  if (!selectedFlow) {
    return (
      <div className="space-y-6">
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Select Testing Procedure
              <Badge variant="outline" className="ml-auto">
                {mode === 'apprentice' ? 'Learning Mode' : 'Professional Mode'}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Choose a testing procedure to begin. Each procedure includes detailed step-by-step guidance
              {mode === 'apprentice' ? ' with educational content to help you learn' : ' for professional compliance'}.
            </p>
          </CardContent>
        </Card>

        <EnhancedTestFlowSelector
          flows={allTestFlows}
          onSelectFlow={handleFlowSelection}
          mode={mode}
        />
      </div>
    );
  }

  // Flow selected but no session - show session setup
  if (!session) {
    return (
      <div className="space-y-6">
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{selectedFlow.name}</CardTitle>
              <Button variant="outline" size="sm" onClick={() => setSelectedFlow(null)}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Selection
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{selectedFlow.description}</p>
          </CardContent>
        </Card>

        <SessionSetup
          flow={selectedFlow}
          onStartSession={handleStartSession}
          mode={mode}
        />
      </div>
    );
  }

  // Active session - show testing interface
  return (
    <div className="space-y-6">
      {/* Session Header */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <CardTitle className="flex items-center gap-2">
                {selectedFlow.name}
                <Badge variant="outline" className="text-xs">
                  {session.status === 'in-progress' ? 'Active' : session.status}
                </Badge>
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {currentStep?.title || 'Loading...'}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleRestart}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Restart
              </Button>
              {isSessionActive ? (
                <Button variant="outline" size="sm" onClick={pauseSession}>
                  <Pause className="h-4 w-4 mr-2" />
                  Pause
                </Button>
              ) : (
                <Button variant="outline" size="sm" onClick={resumeSession}>
                  <Play className="h-4 w-4 mr-2" />
                  Resume
                </Button>
              )}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Step {currentStepIndex + 1} of {selectedFlow.steps.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Session Stats */}
          {sessionInfo && (
            <div className="flex gap-4 text-xs">
              <div className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3 text-green-400" />
                <span>{sessionInfo.completed} Completed</span>
              </div>
              {sessionInfo.failed > 0 && (
                <div className="flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3 text-red-400" />
                  <span>{sessionInfo.failed} Failed</span>
                </div>
              )}
              <div className="text-muted-foreground">
                {sessionInfo.remaining} Remaining
              </div>
            </div>
          )}
        </CardHeader>
      </Card>

      {/* Main Content Area */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column: Current Step */}
        <div className="lg:col-span-2 space-y-6">
          {currentStep && (
            <TestStepDisplay
              step={currentStep}
              result={currentStepResult}
              onRecordResult={(result) => recordResult(currentStep.id, result)}
              mode={mode}
            />
          )}
        </div>

        {/* Right Column: Guided Workflow */}
        {showGuidedWorkflow && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Guided Workflow</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowGuidedWorkflow(!showGuidedWorkflow)}
              >
                {showGuidedWorkflow ? 'Hide' : 'Show'}
              </Button>
            </div>
            <GuidedWorkflow
              currentStep={currentStep}
              session={session}
              mode={mode}
            />
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={previousStep}
              disabled={isFirstStep}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous Step
            </Button>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                {currentStepResult?.status === 'completed' ? 
                  'Step completed - ready to proceed' : 
                  'Complete current step to continue'
                }
              </p>
            </div>

            <Button
              onClick={handleStepCompletion}
              disabled={!currentStepResult || currentStepResult.status !== 'completed'}
              className="flex items-center gap-2 bg-elec-yellow text-black hover:bg-elec-yellow/90"
            >
              {isLastStep ? 'Complete Testing' : 'Next Step'}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InspectionTestingWalkthrough;
