
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, Clock, FileText, Download, RotateCcw } from 'lucide-react';
import { TestSession, TestFlow } from '@/types/inspection-testing';
import { BS7671Validator } from './BS7671Validator';
import { useIsMobile } from '@/hooks/use-mobile';

interface TestCompletionSummaryProps {
  session: TestSession;
  testFlow: TestFlow;
  onStartNew: () => void;
  mode: 'electrician' | 'apprentice';
}

const TestCompletionSummary = ({ session, testFlow, onStartNew, mode }: TestCompletionSummaryProps) => {
  const isMobile = useIsMobile();

  const getSessionStats = () => {
    const completed = session.results.filter(r => r.status === 'completed').length;
    const failed = session.results.filter(r => r.status === 'failed').length;
    const total = testFlow.steps.length;
    
    return { completed, failed, total };
  };

  const getSessionDuration = () => {
    if (!session.endTime) return 0;
    const start = new Date(session.startTime);
    const end = new Date(session.endTime);
    return Math.floor((end.getTime() - start.getTime()) / (1000 * 60));
  };

  const getComplianceReport = () => {
    return BS7671Validator.getComplianceReport(testFlow, session);
  };

  const stats = getSessionStats();
  const duration = getSessionDuration();
  const complianceReport = getComplianceReport();

  const handleGenerateReport = () => {
    // This would generate and download a PDF report
    console.log('Generating test report...');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-xl">
                <CheckCircle className="h-6 w-6 text-green-400" />
                Testing Session Complete
              </CardTitle>
              <p className="text-muted-foreground mt-1">
                {testFlow.name} completed at {session.installationDetails.location}
              </p>
            </div>
            <Badge 
              className={`${
                complianceReport.overallCompliance 
                  ? 'bg-green-500/20 text-green-300 border-green-500/30'
                  : 'bg-red-500/20 text-red-300 border-red-500/30'
              }`}
              variant="outline"
            >
              {complianceReport.overallCompliance ? 'COMPLIANT' : 'NON-COMPLIANT'}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-3'} gap-6`}>
        {/* Session Summary */}
        <div className="lg:col-span-2 space-y-6">
          {/* Statistics */}
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-lg">Session Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} gap-4`}>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{stats.completed}</div>
                  <div className="text-sm text-muted-foreground">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400">{stats.failed}</div>
                  <div className="text-sm text-muted-foreground">Failed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-elec-yellow">{stats.total}</div>
                  <div className="text-sm text-muted-foreground">Total Steps</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{duration}</div>
                  <div className="text-sm text-muted-foreground">Minutes</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Compliance Report */}
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-lg">BS 7671 Compliance Report</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Critical Issues */}
              {complianceReport.criticalIssues.length > 0 && (
                <div>
                  <h4 className="font-medium text-red-400 mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Critical Issues ({complianceReport.criticalIssues.length})
                  </h4>
                  <ul className="space-y-1">
                    {complianceReport.criticalIssues.map((issue, index) => (
                      <li key={index} className="text-sm text-red-300 bg-red-500/10 p-2 rounded">
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Warnings */}
              {complianceReport.warnings.length > 0 && (
                <div>
                  <h4 className="font-medium text-yellow-400 mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Warnings ({complianceReport.warnings.length})
                  </h4>
                  <ul className="space-y-1">
                    {complianceReport.warnings.map((warning, index) => (
                      <li key={index} className="text-sm text-yellow-300 bg-yellow-500/10 p-2 rounded">
                        {warning}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Success Message */}
              {complianceReport.overallCompliance && (
                <div className="bg-green-500/10 p-4 rounded-md">
                  <div className="flex items-center gap-2 text-green-400 font-medium mb-2">
                    <CheckCircle className="h-4 w-4" />
                    Installation Compliant
                  </div>
                  <p className="text-sm text-green-300">
                    All testing results are within BS 7671 requirements. The electrical installation 
                    has passed the comprehensive testing procedure.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Test Results Details */}
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-lg">Detailed Test Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {session.results.map((result, index) => {
                  const step = testFlow.steps.find(s => s.id === result.stepId);
                  if (!step) return null;

                  return (
                    <div key={result.stepId} className="flex items-center justify-between p-3 bg-elec-dark/50 rounded-md">
                      <div className="flex-1">
                        <div className="font-medium">{step.title}</div>
                        {result.value && (
                          <div className="text-sm text-muted-foreground">
                            {result.value} {result.unit}
                          </div>
                        )}
                        {result.notes && (
                          <div className="text-xs text-muted-foreground mt-1">
                            {result.notes}
                          </div>
                        )}
                      </div>
                      <Badge 
                        className={`${
                          result.status === 'completed' 
                            ? 'bg-green-500/20 text-green-300 border-green-500/30'
                            : 'bg-red-500/20 text-red-300 border-red-500/30'
                        }`}
                        variant="outline"
                      >
                        {result.status}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions Sidebar */}
        <div className="space-y-4">
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-lg">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                onClick={handleGenerateReport}
                className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90"
              >
                <Download className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
              
              <Button 
                variant="outline"
                onClick={onStartNew}
                className="w-full"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Start New Session
              </Button>
            </CardContent>
          </Card>

          {/* Session Info */}
          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardHeader>
              <CardTitle className="text-base">Session Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <div className="text-muted-foreground">Technician</div>
                <div className="font-medium">{session.technician.name}</div>
              </div>
              
              <div>
                <div className="text-muted-foreground">Location</div>
                <div className="font-medium">{session.installationDetails.location}</div>
              </div>
              
              <div>
                <div className="text-muted-foreground">Started</div>
                <div className="font-medium">
                  {new Date(session.startTime).toLocaleString()}
                </div>
              </div>
              
              {session.endTime && (
                <div>
                  <div className="text-muted-foreground">Completed</div>
                  <div className="font-medium">
                    {new Date(session.endTime).toLocaleString()}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TestCompletionSummary;
