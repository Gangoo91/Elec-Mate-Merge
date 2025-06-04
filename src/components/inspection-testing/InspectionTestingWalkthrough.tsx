
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, ArrowRight, CheckCircle, AlertTriangle, Play, Pause, RotateCcw, FileText } from 'lucide-react';
import { TestFlow, TestSession } from '@/types/inspection-testing';
import { useTestFlowEngine } from '@/hooks/useTestFlowEngine';
import { ukEicrTestFlows } from '@/data/inspection-testing/ukEicrTestFlows';
import SimplifiedTestFlowSelector from './SimplifiedTestFlowSelector';
import TestStepDisplay from './TestStepDisplay';
import GuidedWorkflow from './GuidedWorkflow';
import SessionSetup from './SessionSetup';
import { EICRProvider } from '@/contexts/EICRContext';
import { Link } from 'react-router-dom';

interface InspectionTestingWalkthroughProps {
  mode: 'electrician' | 'apprentice';
  onComplete: (session: TestSession) => void;
}

const InspectionTestingWalkthrough = ({ mode, onComplete }: InspectionTestingWalkthroughProps) => {
  const [selectedFlow, setSelectedFlow] = useState<TestFlow | null>(null);
  const [showGuidedWorkflow, setShowGuidedWorkflow] = useState(true);
  const [eicrIntegrationEnabled, setEicrIntegrationEnabled] = useState(false);
  
  // Use UK-specific EICR test flows
  const allTestFlows = ukEicrTestFlows;
  
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
    console.log('Selected UK EICR test flow:', flow);
  };

  const handleStartSession = (installationDetails: any, technician: any, enableEicr: boolean = false) => {
    setEicrIntegrationEnabled(enableEicr);
    startSession(installationDetails, technician);
    console.log('UK EICR session started with details:', { installationDetails, technician, enableEicr });
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
    setEicrIntegrationEnabled(false);
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

  const getEstimatedTotalTime = () => {
    if (!selectedFlow) return 0;
    return selectedFlow.steps.reduce((total, step) => total + step.estimatedTime, 0);
  };

  const renderContent = () => {
    // No flow selected - show simplified flow selector
    if (!selectedFlow) {
      return (
        <SimplifiedTestFlowSelector
          flows={allTestFlows}
          onSelectFlow={handleFlowSelection}
          mode={mode}
        />
      );
    }

    // Flow selected but no session - show session setup
    if (!session) {
      return (
        <div className="space-y-6">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2">
                    {selectedFlow.name}
                    <Badge variant="outline" className="text-xs">
                      ~{getEstimatedTotalTime()} minutes total
                    </Badge>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">{selectedFlow.description}</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => setSelectedFlow(null)}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Selection
                </Button>
              </div>
            </CardHeader>
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
                  <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs">
                    BS 7671:2018+A2:2022
                  </Badge>
                  {eicrIntegrationEnabled && (
                    <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30 text-xs">
                      EICR Enabled
                    </Badge>
                  )}
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {currentStep?.title || 'Loading...'}
                </p>
              </div>
              <div className="flex gap-2">
                {eicrIntegrationEnabled && (
                  <Link to="/electrician-tools/eicr-reports">
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      View EICR Dashboard
                    </Button>
                  </Link>
                )}
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
            
            {/* Enhanced Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Step {currentStepIndex + 1} of {selectedFlow.steps.length}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Estimated time: ~{currentStep?.estimatedTime || 0} min</span>
                <span>Total estimated: ~{getEstimatedTotalTime()} min</span>
              </div>
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

        {/* UK Compliance Notice */}
        <Alert className="bg-blue-500/10 border-blue-500/30">
          <AlertTriangle className="h-4 w-4 text-blue-400" />
          <AlertDescription className="text-blue-200">
            <strong>UK Compliance:</strong> This EICR testing procedure follows BS 7671:2018+A2:2022 requirements. 
            {eicrIntegrationEnabled && ' All test results will be automatically classified using C1, C2, C3, and FI fault codes in accordance with IET Guidance Note 3.'} 
            Ensure you hold appropriate qualifications before conducting electrical testing.
          </AlertDescription>
        </Alert>

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
                {isLastStep ? 'Complete EICR' : 'Next Step'}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <EICRProvider>
      {renderContent()}
    </EICRProvider>
  );
};

export default InspectionTestingWalkthrough;
