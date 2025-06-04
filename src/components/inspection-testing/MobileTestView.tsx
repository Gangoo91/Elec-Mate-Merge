
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TestTube, FileText, Clock, CheckCircle, AlertTriangle, Zap } from 'lucide-react';
import { TestFlow, TestSession } from '@/types/inspection-testing';
import { useIsMobile } from '@/hooks/use-mobile';
import TestStepDisplay from './TestStepDisplay';
import TestResultsPanel from './TestResultsPanel';
import ComprehensiveTestResults from './ComprehensiveTestResults';

interface MobileTestViewProps {
  testFlow: TestFlow;
  session: TestSession | null;
  currentStep: any;
  currentStepResult: any;
  progress: number;
  isLastStep: boolean;
  isFirstStep: boolean;
  isSessionActive: boolean;
  onRecordResult: (result: any) => void;
  onNextStep: () => void;
  onPreviousStep: () => void;
  onCompleteSession: () => void;
  onPauseSession: () => void;
  onResumeSession: () => void;
  mode: 'electrician' | 'apprentice';
}

const MobileTestView = ({
  testFlow,
  session,
  currentStep,
  currentStepResult,
  progress,
  isLastStep,
  isFirstStep,
  isSessionActive,
  onRecordResult,
  onNextStep,
  onPreviousStep,
  onCompleteSession,
  onPauseSession,
  onResumeSession,
  mode
}: MobileTestViewProps) => {
  const [activeTab, setActiveTab] = useState('test');
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  const isComprehensiveMode = testFlow?.isComprehensive || false;

  return (
    <div className="flex flex-col h-screen bg-elec-dark">
      {/* Mobile Header - More Compact */}
      <Card className="border-elec-yellow/20 bg-elec-gray rounded-none border-x-0 border-t-0 shadow-lg">
        <CardHeader className="pb-4 px-4 pt-4">
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0 pr-3">
                <CardTitle className="text-lg font-bold truncate flex items-center gap-2">
                  {testFlow.name}
                  {isComprehensiveMode && (
                    <Badge className="bg-elec-yellow text-black text-xs px-2 py-1">
                      <Zap className="h-3 w-3 mr-1" />
                      ALL
                    </Badge>
                  )}
                </CardTitle>
                <div className="flex items-center gap-3 mt-2">
                  <Badge 
                    variant={isSessionActive ? "default" : "secondary"} 
                    className="text-xs px-2 py-1"
                  >
                    {isSessionActive ? 'Active' : 'Paused'}
                  </Badge>
                  <span className="text-xs text-muted-foreground font-medium">
                    Step {(session?.currentStepIndex || 0) + 1} of {testFlow.steps.length}
                  </span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={isSessionActive ? onPauseSession : onResumeSession}
                className="shrink-0 h-8 w-8 p-0"
              >
                <Clock className="h-3 w-3" />
              </Button>
            </div>
            <Progress value={progress} className="h-2 bg-elec-dark" />
          </div>
        </CardHeader>
      </Card>

      {/* Mobile Tabs - Better Alignment */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-3 rounded-none bg-elec-gray border-b border-elec-yellow/20 h-12">
          <TabsTrigger value="test" className="text-xs font-medium flex items-center gap-1 px-2">
            <TestTube className="h-3 w-3" />
            <span className="hidden xs:inline">Test</span>
          </TabsTrigger>
          <TabsTrigger value="results" className="text-xs font-medium flex items-center gap-1 px-2">
            <FileText className="h-3 w-3" />
            <span className="hidden xs:inline">Results</span>
          </TabsTrigger>
          <TabsTrigger value="overview" className="text-xs font-medium flex items-center gap-1 px-2">
            <CheckCircle className="h-3 w-3" />
            <span className="hidden xs:inline">Overview</span>
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-hidden">
          <TabsContent value="test" className="h-full overflow-y-auto p-4 m-0 space-y-4">
            {currentStep && (
              <TestStepDisplay
                step={currentStep}
                result={currentStepResult}
                onRecordResult={onRecordResult}
                mode={mode}
              />
            )}
          </TabsContent>

          <TabsContent value="results" className="h-full overflow-y-auto p-4 m-0">
            {isComprehensiveMode && session ? (
              <ComprehensiveTestResults
                testFlow={testFlow}
                session={session}
              />
            ) : (
              <TestResultsPanel
                testFlow={testFlow}
                session={session}
                mode={mode}
              />
            )}
          </TabsContent>

          <TabsContent value="overview" className="h-full overflow-y-auto p-4 m-0">
            <ConsolidatedTestView testFlow={testFlow} session={session} />
          </TabsContent>
        </div>
      </Tabs>

      {/* Mobile Navigation - Better Styling */}
      <div className="border-t border-elec-yellow/20 bg-elec-gray p-4 shadow-lg">
        <div className="flex justify-between gap-3">
          <Button
            variant="outline"
            onClick={onPreviousStep}
            disabled={isFirstStep}
            className="flex-1 h-12 font-medium border-elec-yellow/30 hover:border-elec-yellow/50"
          >
            Previous
          </Button>
          
          {isLastStep ? (
            <Button 
              onClick={onCompleteSession} 
              className="flex-1 h-12 bg-green-600 hover:bg-green-700 font-medium shadow-md"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Complete
            </Button>
          ) : (
            <Button
              onClick={onNextStep}
              className="flex-1 h-12 bg-elec-yellow text-black hover:bg-elec-yellow/90 font-medium shadow-md"
            >
              Next Step
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const ConsolidatedTestView = ({ testFlow, session }: { testFlow: TestFlow; session: TestSession | null }) => {
  if (!session) return null;

  const completedSteps = session.results.filter(r => r.status === 'completed').length;
  const failedSteps = session.results.filter(r => r.status === 'failed').length;
  const totalSteps = testFlow.steps.length;

  return (
    <div className="space-y-6">
      {/* Summary Cards - Better Mobile Layout */}
      <Card className="border-elec-yellow/20 bg-elec-gray shadow-md">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            📊 Test Progress
            {testFlow.isComprehensive && (
              <Badge className="bg-elec-yellow text-black text-xs">
                <Zap className="h-3 w-3 mr-1" />
                COMPREHENSIVE
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-green-600/20 rounded-lg border border-green-600/30">
              <div className="text-2xl font-bold text-green-400">{completedSteps}</div>
              <div className="text-xs text-green-300 font-medium">Passed</div>
            </div>
            <div className="text-center p-4 bg-red-600/20 rounded-lg border border-red-600/30">
              <div className="text-2xl font-bold text-red-400">{failedSteps}</div>
              <div className="text-xs text-red-300 font-medium">Failed</div>
            </div>
          </div>
          
          <div className="text-center p-3 bg-blue-600/20 rounded-lg border border-blue-600/30">
            <div className="text-sm font-medium text-blue-300">
              {completedSteps + failedSteps} of {totalSteps} tests completed
            </div>
            <Progress 
              value={((completedSteps + failedSteps) / totalSteps) * 100} 
              className="h-2 mt-2 bg-blue-900/50" 
            />
          </div>
        </CardContent>
      </Card>

      {/* Test Steps List - Mobile Optimized */}
      <div className="space-y-3">
        {testFlow.steps.map((step, index) => {
          const result = session.results.find(r => r.stepId === step.id);
          const status = result?.status || 'pending';
          
          return (
            <Card key={step.id} className="border-elec-yellow/10 bg-elec-dark shadow-sm">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium leading-tight">
                        {index + 1}. {step.title}
                      </div>
                      {result?.value && (
                        <div className="text-xs text-muted-foreground mt-1">
                          Result: {result.value} {result.unit}
                        </div>
                      )}
                      {step.estimatedTime && (
                        <div className="flex items-center gap-1 mt-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{step.estimatedTime}min</span>
                        </div>
                      )}
                    </div>
                    <Badge
                      variant={status === 'completed' ? 'default' : 'secondary'}
                      className={`text-xs shrink-0 ${
                        status === 'completed' ? 'bg-green-600' :
                        status === 'failed' ? 'bg-red-600' :
                        status === 'in-progress' ? 'bg-yellow-600' : 'bg-gray-600'
                      }`}
                    >
                      {status}
                    </Badge>
                  </div>
                  
                  {result?.notes && (
                    <div className="text-xs text-muted-foreground bg-elec-gray/50 p-2 rounded border border-elec-yellow/10">
                      <strong>Notes:</strong> {result.notes}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default MobileTestView;
