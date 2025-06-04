
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Clock, AlertTriangle, FileText } from 'lucide-react';
import { TestSession, TestFlow } from '@/types/inspection-testing';

interface TestProgressTrackerProps {
  session: TestSession;
  flow: TestFlow;
  currentStepIndex: number;
}

const TestProgressTracker = ({ session, flow, currentStepIndex }: TestProgressTrackerProps) => {
  const getStepStatus = (stepIndex: number) => {
    if (stepIndex < currentStepIndex) return 'completed';
    if (stepIndex === currentStepIndex) return 'current';
    return 'pending';
  };

  const getStepResult = (stepId: string) => {
    return session.results.find(r => r.stepId === stepId);
  };

  const completedSteps = session.results.filter(r => r.status === 'completed').length;
  const failedSteps = session.results.filter(r => r.status === 'failed').length;
  const totalSteps = flow.steps.length;
  const progressPercentage = (completedSteps / totalSteps) * 100;

  const getStepIcon = (step: any, status: string) => {
    const result = getStepResult(step.id);
    
    if (result?.status === 'completed') return CheckCircle;
    if (result?.status === 'failed') return AlertTriangle;
    if (status === 'current') return Clock;
    return FileText;
  };

  const getStepColor = (step: any, status: string) => {
    const result = getStepResult(step.id);
    
    if (result?.status === 'completed') return 'text-green-400';
    if (result?.status === 'failed') return 'text-red-400';
    if (status === 'current') return 'text-elec-yellow';
    return 'text-muted-foreground';
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">Test Progress</CardTitle>
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Overall Progress</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-1" />
          <div className="flex justify-between text-xs">
            <span className="text-green-400">{completedSteps} completed</span>
            {failedSteps > 0 && (
              <span className="text-red-400">{failedSteps} failed</span>
            )}
            <span className="text-muted-foreground">{totalSteps - completedSteps} remaining</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 max-h-64 overflow-y-auto">
        {flow.steps.map((step, index) => {
          const status = getStepStatus(index);
          const Icon = getStepIcon(step, status);
          const result = getStepResult(step.id);
          
          return (
            <div 
              key={step.id}
              className={`flex items-center gap-2 p-2 rounded-lg text-xs ${
                status === 'current' ? 'bg-elec-yellow/10 border border-elec-yellow/30' : ''
              }`}
            >
              <Icon className={`h-3 w-3 ${getStepColor(step, status)}`} />
              <div className="flex-1 min-w-0">
                <div className={`font-medium truncate ${
                  status === 'current' ? 'text-elec-yellow' : ''
                }`}>
                  {step.title}
                </div>
                {result && (
                  <div className="text-xs text-muted-foreground">
                    {result.value && `${result.value}${result.unit || ''}`}
                    {result.notes && ` - ${result.notes.substring(0, 30)}...`}
                  </div>
                )}
              </div>
              <div className="flex gap-1">
                <Badge variant="outline" className="text-xs px-1 py-0">
                  {index + 1}
                </Badge>
                {result?.status === 'completed' && (
                  <Badge className="bg-green-500/20 text-green-300 text-xs px-1 py-0">
                    ✓
                  </Badge>
                )}
                {result?.status === 'failed' && (
                  <Badge className="bg-red-500/20 text-red-300 text-xs px-1 py-0">
                    ✗
                  </Badge>
                )}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default TestProgressTracker;
