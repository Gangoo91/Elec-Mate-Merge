
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TestTube, FileText, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { TestFlow, TestSession } from '@/types/inspection-testing';
import { useIsMobile } from '@/hooks/use-mobile';
import TestStepDisplay from './TestStepDisplay';
import TestResultsPanel from './TestResultsPanel';

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

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Mobile Header */}
      <Card className="border-elec-yellow/20 bg-elec-gray rounded-none border-x-0 border-t-0">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg truncate">{testFlow.name}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={isSessionActive ? "default" : "secondary"} className="text-xs">
                  {isSessionActive ? 'Active' : 'Paused'}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  Step {(session?.currentStepIndex || 0) + 1}/{testFlow.steps.length}
                </span>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={isSessionActive ? onPauseSession : onResumeSession}
            >
              <Clock className="h-3 w-3" />
            </Button>
          </div>
          <Progress value={progress} className="h-1.5 mt-2" />
        </CardHeader>
      </Card>

      {/* Mobile Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-3 rounded-none bg-elec-gray">
          <TabsTrigger value="test" className="text-xs">
            <TestTube className="h-3 w-3 mr-1" />
            Test
          </TabsTrigger>
          <TabsTrigger value="results" className="text-xs">
            <FileText className="h-3 w-3 mr-1" />
            Results
          </TabsTrigger>
          <TabsTrigger value="overview" className="text-xs">
            <CheckCircle className="h-3 w-3 mr-1" />
            Overview
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-hidden">
          <TabsContent value="test" className="h-full overflow-y-auto p-4 m-0">
            {currentStep && (
              <div className="space-y-4">
                <TestStepDisplay
                  step={currentStep}
                  result={currentStepResult}
                  onRecordResult={onRecordResult}
                  mode={mode}
                />
              </div>
            )}
          </TabsContent>

          <TabsContent value="results" className="h-full overflow-y-auto p-4 m-0">
            <TestResultsPanel
              testFlow={testFlow}
              session={session}
              mode={mode}
            />
          </TabsContent>

          <TabsContent value="overview" className="h-full overflow-y-auto p-4 m-0">
            <ConsolidatedTestView testFlow={testFlow} session={session} />
          </TabsContent>
        </div>
      </Tabs>

      {/* Mobile Navigation */}
      <div className="border-t border-elec-yellow/20 bg-elec-gray p-4">
        <div className="flex justify-between gap-2">
          <Button
            variant="outline"
            onClick={onPreviousStep}
            disabled={isFirstStep}
            className="flex-1"
          >
            Previous
          </Button>
          
          {isLastStep ? (
            <Button 
              onClick={onCompleteSession} 
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              Complete
            </Button>
          ) : (
            <Button
              onClick={onNextStep}
              className="flex-1 bg-elec-yellow text-black hover:bg-elec-yellow/90"
            >
              Next
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

  return (
    <div className="space-y-4">
      <Card className="border-elec-yellow/20 bg-elec-dark">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Test Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-3 bg-green-600/20 rounded-lg">
              <div className="text-2xl font-bold text-green-400">{completedSteps}</div>
              <div className="text-xs text-green-300">Passed</div>
            </div>
            <div className="p-3 bg-red-600/20 rounded-lg">
              <div className="text-2xl font-bold text-red-400">{failedSteps}</div>
              <div className="text-xs text-red-300">Failed</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-2">
        {testFlow.steps.map((step, index) => {
          const result = session.results.find(r => r.stepId === step.id);
          const status = result?.status || 'pending';
          
          return (
            <Card key={step.id} className="border-elec-yellow/10 bg-elec-dark">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">
                      {index + 1}. {step.title}
                    </div>
                    {result?.value && (
                      <div className="text-xs text-muted-foreground">
                        {result.value} {result.unit}
                      </div>
                    )}
                  </div>
                  <Badge
                    variant={status === 'completed' ? 'default' : 'secondary'}
                    className={`text-xs ${
                      status === 'completed' ? 'bg-green-600' :
                      status === 'failed' ? 'bg-red-600' :
                      status === 'in-progress' ? 'bg-yellow-600' : ''
                    }`}
                  >
                    {status}
                  </Badge>
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
