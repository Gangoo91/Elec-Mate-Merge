
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, CheckCircle, AlertTriangle, Circle, User, MapPin } from 'lucide-react';
import { TestSession, TestFlow } from '@/types/inspection-testing';

interface TestProgressSidebarProps {
  session: TestSession;
  testFlow: TestFlow;
  currentStepIndex: number;
  mode: 'electrician' | 'apprentice';
}

const TestProgressSidebar = ({ session, testFlow, currentStepIndex, mode }: TestProgressSidebarProps) => {
  const getStepIcon = (stepIndex: number, stepResult: any) => {
    if (stepIndex < currentStepIndex) {
      return stepResult?.status === 'completed' ? CheckCircle : AlertTriangle;
    } else if (stepIndex === currentStepIndex) {
      return Clock;
    } else {
      return Circle;
    }
  };

  const getStepIconColor = (stepIndex: number, stepResult: any) => {
    if (stepIndex < currentStepIndex) {
      return stepResult?.status === 'completed' ? 'text-green-400' : 'text-red-400';
    } else if (stepIndex === currentStepIndex) {
      return 'text-elec-yellow';
    } else {
      return 'text-gray-500';
    }
  };

  const getCompletedSteps = () => {
    return session.results.filter(result => result.status === 'completed').length;
  };

  const getFailedSteps = () => {
    return session.results.filter(result => result.status === 'failed').length;
  };

  const getSessionDuration = () => {
    const startTime = new Date(session.startTime);
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - startTime.getTime()) / (1000 * 60));
    return diffMinutes;
  };

  const progress = (getCompletedSteps() / testFlow.steps.length) * 100;

  return (
    <div className="space-y-4">
      {/* Session Overview */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Session Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-center">
              <div className="text-lg font-semibold text-green-400">{getCompletedSteps()}</div>
              <div className="text-muted-foreground">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-red-400">{getFailedSteps()}</div>
              <div className="text-muted-foreground">Failed</div>
            </div>
          </div>

          <div className="pt-2 border-t border-elec-yellow/20">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Session Time</span>
              <span>{getSessionDuration()} min</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Session Details */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Session Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4 text-elec-yellow" />
              <span className="font-medium">{session.technician.name}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{session.installationDetails.location}</span>
            </div>
          </div>

          {mode === 'apprentice' && session.technician.supervisorName && (
            <div className="pt-2 border-t border-elec-yellow/20">
              <div className="text-xs text-muted-foreground">Supervisor</div>
              <div className="text-sm font-medium">{session.technician.supervisorName}</div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Step Progress */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Testing Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {testFlow.steps.map((step, index) => {
              const stepResult = session.results.find(result => result.stepId === step.id);
              const Icon = getStepIcon(index, stepResult);
              const iconColor = getStepIconColor(index, stepResult);
              const isCurrentStep = index === currentStepIndex;

              return (
                <div
                  key={step.id}
                  className={`flex items-start gap-3 p-2 rounded-md transition-colors ${
                    isCurrentStep ? 'bg-elec-yellow/10 border border-elec-yellow/30' : ''
                  }`}
                >
                  <Icon className={`h-4 w-4 mt-0.5 flex-shrink-0 ${iconColor}`} />
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm font-medium truncate ${
                      isCurrentStep ? 'text-elec-yellow' : ''
                    }`}>
                      {step.title}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">
                        {step.estimatedTime}min
                      </span>
                      {stepResult && (
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            stepResult.status === 'completed' 
                              ? 'bg-green-500/20 text-green-300 border-green-500/30'
                              : stepResult.status === 'failed'
                              ? 'bg-red-500/20 text-red-300 border-red-500/30'
                              : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                          }`}
                        >
                          {stepResult.status}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestProgressSidebar;
