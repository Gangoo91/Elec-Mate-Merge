
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Clock, FileText, Download } from 'lucide-react';
import { TestFlow, TestSession } from '@/types/inspection-testing';

interface TestResultsPanelProps {
  testFlow: TestFlow;
  session: TestSession | null;
  mode: 'electrician' | 'apprentice';
}

const TestResultsPanel = ({ testFlow, session, mode }: TestResultsPanelProps) => {
  if (!session) {
    return (
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle>Test Results</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Start a test session to view results</p>
        </CardContent>
      </Card>
    );
  }

  const completedSteps = session.results.filter(r => r.status === 'completed').length;
  const failedSteps = session.results.filter(r => r.status === 'failed').length;
  const totalSteps = testFlow.steps.length;
  const progressPercentage = (completedSteps / totalSteps) * 100;

  const getStepStatus = (stepId: string) => {
    const result = session.results.find(r => r.stepId === stepId);
    return result?.status || 'pending';
  };

  const getStepResult = (stepId: string) => {
    return session.results.find(r => r.stepId === stepId);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-400" />;
      case 'in-progress': return <Clock className="h-4 w-4 text-yellow-400" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const handleGenerateReport = () => {
    console.log('Generating test report for session:', session.id);
    // This would trigger report generation
  };

  return (
    <div className="space-y-4">
      {/* Progress Overview */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Test Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Overall Progress</span>
              <span>{completedSteps}/{totalSteps} Steps</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span>Passed: {completedSteps}</span>
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-red-400" />
              <span>Failed: {failedSteps}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Session Info */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Session Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div>
            <span className="font-medium">Location:</span> {session.installationDetails.location}
          </div>
          <div>
            <span className="font-medium">Circuit:</span> {session.installationDetails.circuitDescription}
          </div>
          <div>
            <span className="font-medium">Technician:</span> {session.technician.name}
          </div>
          <div>
            <span className="font-medium">Started:</span> {session.startTime.toLocaleString()}
          </div>
        </CardContent>
      </Card>

      {/* Step Results */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Step Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {testFlow.steps.map((step, index) => {
              const status = getStepStatus(step.id);
              const result = getStepResult(step.id);
              
              return (
                <div
                  key={step.id}
                  className="flex items-center justify-between p-3 border border-elec-yellow/10 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {getStatusIcon(status)}
                    <div>
                      <div className="font-medium text-sm">
                        Step {index + 1}: {step.title}
                      </div>
                      {result?.value && (
                        <div className="text-xs text-muted-foreground">
                          {result.value} {result.unit}
                        </div>
                      )}
                    </div>
                  </div>
                  <Badge
                    variant={status === 'completed' ? 'default' : 'secondary'}
                    className={
                      status === 'completed' ? 'bg-green-600' :
                      status === 'failed' ? 'bg-red-600' :
                      status === 'in-progress' ? 'bg-yellow-600' : ''
                    }
                  >
                    {status}
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      {mode === 'electrician' && (
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              onClick={handleGenerateReport}
              className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90"
              disabled={completedSteps === 0}
            >
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
            
            <Button
              variant="outline"
              className="w-full"
              disabled={completedSteps === 0}
            >
              <Download className="h-4 w-4 mr-2" />
              Export Results
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TestResultsPanel;
