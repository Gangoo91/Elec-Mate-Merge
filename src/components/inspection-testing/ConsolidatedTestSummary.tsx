
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TestFlow, TestResult } from '@/types/inspection-testing';
import { CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';

interface ConsolidatedTestSummaryProps {
  testFlow: TestFlow;
  results: TestResult[];
  onGenerateReport?: () => void;
}

const ConsolidatedTestSummary: React.FC<ConsolidatedTestSummaryProps> = ({
  testFlow,
  results,
  onGenerateReport
}) => {
  const totalSteps = testFlow.steps.length;
  const completedSteps = results.filter(r => r.status === 'completed').length;
  const failedSteps = results.filter(r => r.status === 'failed').length;
  const progress = (completedSteps / totalSteps) * 100;

  const getOverallStatus = () => {
    if (completedSteps === totalSteps) {
      return failedSteps > 0 ? 'completed-with-failures' : 'completed-pass';
    }
    return 'in-progress';
  };

  const overallStatus = getOverallStatus();

  return (
    <Card className="border-elec-yellow/30 bg-elec-gray">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{testFlow.title || testFlow.id} - Test Summary</span>
          <Badge variant={overallStatus === 'completed-pass' ? 'default' : 'destructive'}>
            {overallStatus === 'completed-pass' && <CheckCircle className="h-4 w-4 mr-1" />}
            {overallStatus === 'completed-with-failures' && <XCircle className="h-4 w-4 mr-1" />}
            {overallStatus === 'in-progress' && <Clock className="h-4 w-4 mr-1" />}
            {overallStatus === 'completed-pass' ? 'PASS' : 
             overallStatus === 'completed-with-failures' ? 'FAIL' : 'IN PROGRESS'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Overall Progress</span>
            <span>{completedSteps}/{totalSteps} steps completed</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{completedSteps}</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">{failedSteps}</div>
            <div className="text-sm text-muted-foreground">Failed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-400">{totalSteps - completedSteps - failedSteps}</div>
            <div className="text-sm text-muted-foreground">Remaining</div>
          </div>
        </div>

        {failedSteps > 0 && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <span className="font-medium text-red-400">Failed Tests Require Attention</span>
            </div>
            <div className="text-sm text-red-200">
              {failedSteps} test{failedSteps > 1 ? 's' : ''} did not meet the required standards. 
              Review and address these issues before proceeding.
            </div>
          </div>
        )}

        {overallStatus === 'completed-pass' && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span className="font-medium text-green-400">All Tests Completed Successfully</span>
            </div>
            <div className="text-sm text-green-200">
              The installation has passed all required tests and is compliant with BS 7671 regulations.
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ConsolidatedTestSummary;
