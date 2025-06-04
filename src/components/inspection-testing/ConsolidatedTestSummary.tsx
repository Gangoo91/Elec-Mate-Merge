
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, AlertTriangle, FileText, Download, Shield } from 'lucide-react';
import { TestFlow, TestSession } from '@/types/inspection-testing';
import { BS7671Validator } from './BS7671Validator';

interface ConsolidatedTestSummaryProps {
  testFlow: TestFlow;
  session: TestSession;
  onGenerateReport: () => void;
  onExportResults: () => void;
}

const ConsolidatedTestSummary = ({ 
  testFlow, 
  session, 
  onGenerateReport, 
  onExportResults 
}: ConsolidatedTestSummaryProps) => {
  const completedSteps = session.results.filter(r => r.status === 'completed').length;
  const failedSteps = session.results.filter(r => r.status === 'failed').length;
  const totalSteps = testFlow.steps.length;
  
  const complianceReport = BS7671Validator.getComplianceReport(testFlow, session);
  
  const getOverallStatus = () => {
    if (failedSteps > 0 || !complianceReport.overallCompliance) return 'fail';
    if (completedSteps === totalSteps) return 'pass';
    return 'incomplete';
  };

  const overallStatus = getOverallStatus();

  return (
    <div className="space-y-6">
      {/* Overall Status */}
      <Card className={`border-2 ${
        overallStatus === 'pass' ? 'border-green-500 bg-green-500/10' :
        overallStatus === 'fail' ? 'border-red-500 bg-red-500/10' :
        'border-yellow-500 bg-yellow-500/10'
      }`}>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            {overallStatus === 'pass' ? (
              <CheckCircle className="h-16 w-16 text-green-500" />
            ) : overallStatus === 'fail' ? (
              <XCircle className="h-16 w-16 text-red-500" />
            ) : (
              <AlertTriangle className="h-16 w-16 text-yellow-500" />
            )}
          </div>
          <CardTitle className="text-2xl">
            {overallStatus === 'pass' ? 'Tests Passed' :
             overallStatus === 'fail' ? 'Tests Failed' :
             'Tests Incomplete'}
          </CardTitle>
          <p className="text-muted-foreground">
            {testFlow.name} - {session.installationDetails.location}
          </p>
        </CardHeader>
      </Card>

      {/* Test Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-green-400">{completedSteps}</div>
            <div className="text-sm text-muted-foreground">Tests Passed</div>
          </CardContent>
        </Card>
        
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-red-400">{failedSteps}</div>
            <div className="text-sm text-muted-foreground">Tests Failed</div>
          </CardContent>
        </Card>
        
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-blue-400">{totalSteps - completedSteps - failedSteps}</div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </CardContent>
        </Card>
      </div>

      {/* BS 7671 Compliance */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-elec-yellow" />
            BS 7671 Compliance Report
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Critical Issues */}
          {complianceReport.criticalIssues.length > 0 && (
            <Alert className="bg-red-500/10 border-red-500/30">
              <XCircle className="h-4 w-4 text-red-400" />
              <AlertDescription>
                <strong>Critical Issues Found:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  {complianceReport.criticalIssues.map((issue, index) => (
                    <li key={index} className="text-red-200">{issue}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {/* Warnings */}
          {complianceReport.warnings.length > 0 && (
            <Alert className="bg-yellow-500/10 border-yellow-500/30">
              <AlertTriangle className="h-4 w-4 text-yellow-400" />
              <AlertDescription>
                <strong>Warnings:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  {complianceReport.warnings.map((warning, index) => (
                    <li key={index} className="text-yellow-200">{warning}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {/* Recommendations */}
          <Alert className="bg-blue-500/10 border-blue-500/30">
            <CheckCircle className="h-4 w-4 text-blue-400" />
            <AlertDescription>
              <strong>Recommendations:</strong>
              <ul className="list-disc list-inside mt-2 space-y-1">
                {complianceReport.recommendations.map((rec, index) => (
                  <li key={index} className="text-blue-200">{rec}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Detailed Results */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle>Detailed Test Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {testFlow.steps.map((step, index) => {
              const result = session.results.find(r => r.stepId === step.id);
              const validation = result ? BS7671Validator.validateTestStep(step, result) : null;
              
              return (
                <div key={step.id} className="flex items-center justify-between p-3 border border-elec-yellow/10 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{index + 1}. {step.title}</div>
                    {result?.value && (
                      <div className="text-sm text-muted-foreground">
                        Result: {result.value} {result.unit}
                      </div>
                    )}
                    {validation && validation.severity !== 'info' && (
                      <div className={`text-xs mt-1 ${
                        validation.severity === 'error' ? 'text-red-400' :
                        validation.severity === 'warning' ? 'text-yellow-400' :
                        'text-blue-400'
                      }`}>
                        {validation.message}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {validation && (
                      <div className="text-xs">
                        {validation.severity === 'error' ? (
                          <XCircle className="h-4 w-4 text-red-400" />
                        ) : validation.severity === 'warning' ? (
                          <AlertTriangle className="h-4 w-4 text-yellow-400" />
                        ) : (
                          <CheckCircle className="h-4 w-4 text-green-400" />
                        )}
                      </div>
                    )}
                    <Badge
                      variant={result?.status === 'completed' ? 'default' : 'secondary'}
                      className={
                        result?.status === 'completed' ? 'bg-green-600' :
                        result?.status === 'failed' ? 'bg-red-600' :
                        result?.status === 'in-progress' ? 'bg-yellow-600' : ''
                      }
                    >
                      {result?.status || 'pending'}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={onGenerateReport}
          className="flex-1 bg-elec-yellow text-black hover:bg-elec-yellow/90"
        >
          <FileText className="h-4 w-4 mr-2" />
          Generate BS 7671 Report
        </Button>
        
        <Button
          onClick={onExportResults}
          variant="outline"
          className="flex-1"
        >
          <Download className="h-4 w-4 mr-2" />
          Export Test Data
        </Button>
      </div>
    </div>
  );
};

export default ConsolidatedTestSummary;
