
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, CheckCircle, Clock, FileText, Zap } from 'lucide-react';
import { TestFlow } from '@/types/inspection-testing';
import { useTestFlowEngine } from '@/hooks/useTestFlowEngine';
import { useIsMobile } from '@/hooks/use-mobile';
import TestFlowSelector from './TestFlowSelector';
import SessionSetup from './SessionSetup';
import TestStepDisplay from './TestStepDisplay';
import TestResultsPanel from './TestResultsPanel';
import MobileTestView from './MobileTestView';
import ConsolidatedTestSummary from './ConsolidatedTestSummary';
import ComprehensiveTestResults from './ComprehensiveTestResults';

interface InspectionTestingWalkthroughProps {
  mode: 'electrician' | 'apprentice';
  onComplete?: (report: any) => void;
}

const InspectionTestingWalkthrough = ({ mode, onComplete }: InspectionTestingWalkthroughProps) => {
  const [selectedFlow, setSelectedFlow] = useState<TestFlow | null>(null);
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
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
    completeSession,
    pauseSession,
    resumeSession
  } = useTestFlowEngine(selectedFlow);

  const handleFlowSelection = (flow: TestFlow) => {
    setSelectedFlow(flow);
    setIsSetupComplete(false);
    setShowSummary(false);
  };

  const handleSessionStart = (installationDetails: any, technician: any) => {
    startSession(installationDetails, technician);
    setIsSetupComplete(true);
  };

  const handleTestComplete = () => {
    const completedSession = completeSession();
    setShowSummary(true);
    if (completedSession && onComplete) {
      onComplete(completedSession);
    }
  };

  const handleGenerateReport = () => {
    console.log('Generating BS 7671 compliance report');
    // This would generate a comprehensive report
  };

  const handleExportResults = () => {
    console.log('Exporting test results');
    // This would export the test data
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  // Check if this is comprehensive testing
  const isComprehensiveMode = selectedFlow?.isComprehensive || false;

  // Flow selection screen
  if (!selectedFlow) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center space-y-6 mb-8">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Inspection & Testing Walkthrough
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
                {mode === 'apprentice' 
                  ? 'Learn electrical testing procedures with guided step-by-step instructions'
                  : 'Professional testing procedures with validation and reporting'
                }
              </p>
            </div>
          </div>
          <TestFlowSelector onSelectFlow={handleFlowSelection} mode={mode} />
        </div>
      </div>
    );
  }

  // Setup screen
  if (!isSetupComplete) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <h2 className="text-2xl sm:text-3xl font-bold flex flex-wrap items-center gap-3">
                    <span className="break-words">{selectedFlow.name}</span>
                    <div className="flex flex-wrap gap-2">
                      <Badge className={`${getDifficultyColor(selectedFlow.difficulty)} flex-shrink-0`}>
                        {selectedFlow.difficulty}
                      </Badge>
                      {isComprehensiveMode && (
                        <Badge className="bg-elec-yellow text-black flex-shrink-0">
                          <Zap className="h-3 w-3 mr-1" />
                          COMPREHENSIVE
                        </Badge>
                      )}
                    </div>
                  </h2>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mt-2">
                    {selectedFlow.description}
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedFlow(null)} 
                  className="flex-shrink-0 w-full lg:w-auto"
                >
                  Change Test
                </Button>
              </div>
            </div>
            <SessionSetup 
              testFlow={selectedFlow} 
              onStart={handleSessionStart}
              mode={mode}
            />
          </div>
        </div>
      </div>
    );
  }

  // Summary screen
  if (showSummary && session) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <h2 className="text-2xl sm:text-3xl font-bold flex flex-wrap items-center gap-3">
                <span>Test Complete</span>
                {isComprehensiveMode && (
                  <Badge className="bg-elec-yellow text-black flex-shrink-0">
                    <Zap className="h-3 w-3 mr-1" />
                    COMPREHENSIVE
                  </Badge>
                )}
              </h2>
              <Button 
                variant="outline" 
                onClick={() => setShowSummary(false)} 
                className="flex-shrink-0 w-full lg:w-auto"
              >
                Back to Test
              </Button>
            </div>
            <ConsolidatedTestSummary
              testFlow={selectedFlow}
              session={session}
              onGenerateReport={handleGenerateReport}
              onExportResults={handleExportResults}
            />
          </div>
        </div>
      </div>
    );
  }

  // Mobile view
  if (isMobile) {
    return (
      <MobileTestView
        testFlow={selectedFlow}
        session={session}
        currentStep={currentStep}
        currentStepResult={currentStepResult}
        progress={progress}
        isLastStep={isLastStep}
        isFirstStep={isFirstStep}
        isSessionActive={isSessionActive}
        onRecordResult={(result) => recordResult(currentStep?.id || '', result)}
        onNextStep={nextStep}
        onPreviousStep={previousStep}
        onCompleteSession={handleTestComplete}
        onPauseSession={pauseSession}
        onResumeSession={resumeSession}
        mode={mode}
      />
    );
  }

  // Desktop view - enhanced for comprehensive mode
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
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
                    {isComprehensiveMode && (
                      <Badge className="bg-elec-yellow text-black">
                        <Zap className="h-3 w-3 mr-1" />
                        ALL TESTS
                      </Badge>
                    )}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Step {currentStepIndex + 1} of {selectedFlow.steps.length}
                    {isComprehensiveMode && ` • Comprehensive BS 7671 Testing`}
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

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Main Test Step */}
            <div className="xl:col-span-2">
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
            <div className="xl:col-span-1">
              {isComprehensiveMode && session ? (
                <ComprehensiveTestResults
                  testFlow={selectedFlow}
                  session={session}
                />
              ) : (
                <TestResultsPanel
                  testFlow={selectedFlow}
                  session={session}
                  mode={mode}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InspectionTestingWalkthrough;
