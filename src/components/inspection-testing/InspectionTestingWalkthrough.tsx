
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, CheckCircle, Clock, FileText } from 'lucide-react';
import { TestFlow } from '@/types/inspection-testing';
import { useTestFlowEngine } from '@/hooks/useTestFlowEngine';
import TestFlowSelector from './TestFlowSelector';
import SessionSetup from './SessionSetup';
import TestStepDisplay from './TestStepDisplay';
import TestResultsPanel from './TestResultsPanel';

interface InspectionTestingWalkthroughProps {
  mode: 'electrician' | 'apprentice';
  onComplete?: (report: any) => void;
}

const InspectionTestingWalkthrough = ({ mode, onComplete }: InspectionTestingWalkthroughProps) => {
  const [selectedFlow, setSelectedFlow] = useState<TestFlow | null>(null);
  const [isSetupComplete, setIsSetupComplete] = useState(false);

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
    setIsSetupComplete(false);
  };

  const handleSessionStart = (installationDetails: any, technician: any) => {
    startSession(installationDetails, technician);
    setIsSetupComplete(true);
  };

  const handleTestComplete = () => {
    const completedSession = completeSession();
    if (completedSession && onComplete) {
      onComplete(completedSession);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (!selectedFlow) {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Inspection & Testing Walkthrough</h2>
          <p className="text-muted-foreground">
            {mode === 'apprentice' 
              ? 'Learn electrical testing procedures with guided step-by-step instructions'
              : 'Professional testing procedures with validation and reporting'
            }
          </p>
        </div>
        <TestFlowSelector onSelectFlow={handleFlowSelection} mode={mode} />
      </div>
    );
  }

  if (!isSetupComplete) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              {selectedFlow.name}
              <Badge className={getDifficultyColor(selectedFlow.difficulty)}>
                {selectedFlow.difficulty}
              </Badge>
            </h2>
            <p className="text-muted-foreground">{selectedFlow.description}</p>
          </div>
          <Button variant="outline" onClick={() => setSelectedFlow(null)}>
            Change Test
          </Button>
        </div>
        <SessionSetup 
          testFlow={selectedFlow} 
          onStart={handleSessionStart}
          mode={mode}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Session Header */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                {selectedFlow.name}
                <Badge variant={isSessionActive ? "default" : "secondary"}>
                  {isSessionActive ? 'Active' : 'Paused'}
                </Badge>
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Step {currentStepIndex + 1} of {selectedFlow.steps.length}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={isSessionActive ? pauseSession : resumeSession}
              >
                <Clock className="h-4 w-4 mr-1" />
                {isSessionActive ? 'Pause' : 'Resume'}
              </Button>
              {isLastStep && (
                <Button onClick={handleTestComplete} className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Complete Test
                </Button>
              )}
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Test Step */}
        <div className="lg:col-span-2">
          {currentStep && (
            <TestStepDisplay
              step={currentStep}
              result={currentStepResult}
              onRecordResult={(result) => recordResult(currentStep.id, result)}
              mode={mode}
            />
          )}
          
          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={previousStep}
              disabled={isFirstStep}
            >
              Previous Step
            </Button>
            <Button
              onClick={nextStep}
              disabled={isLastStep}
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
            >
              Next Step
            </Button>
          </div>
        </div>

        {/* Results Panel */}
        <div>
          <TestResultsPanel
            testFlow={selectedFlow}
            session={session}
            mode={mode}
          />
        </div>
      </div>
    </div>
  );
};

export default InspectionTestingWalkthrough;
