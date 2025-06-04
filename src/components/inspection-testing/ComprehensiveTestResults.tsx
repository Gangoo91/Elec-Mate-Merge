
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, AlertTriangle, Clock } from 'lucide-react';
import { TestSession, TestFlow, ComprehensiveTestResults as TestResultsType } from '@/types/inspection-testing';
import { BS7671Validator } from './BS7671Validator';

interface ComprehensiveTestResultsProps {
  testFlow: TestFlow;
  session: TestSession;
}

const ComprehensiveTestResults = ({ testFlow, session }: ComprehensiveTestResultsProps) => {
  // Group results by test type
  const groupedResults: TestResultsType = {
    continuity: session.results.filter(r => r.stepId.includes('continuity')),
    insulationResistance: session.results.filter(r => r.stepId.includes('insulation')),
    polarity: session.results.filter(r => r.stepId.includes('polarity')),
    earthFaultLoop: session.results.filter(r => r.stepId.includes('loop') || r.stepId.includes('impedance')),
    rcdTest: session.results.filter(r => r.stepId.includes('rcd')),
    functionalTest: session.results.filter(r => r.stepId.includes('functional')),
    visualInspection: session.results.filter(r => r.stepId.includes('visual'))
  };

  const testCategories = [
    { key: 'visualInspection', title: 'Visual Inspection', icon: '👁️', color: 'bg-blue-500' },
    { key: 'continuity', title: 'Continuity Testing', icon: '🔗', color: 'bg-green-500' },
    { key: 'insulationResistance', title: 'Insulation Resistance', icon: '⚡', color: 'bg-yellow-500' },
    { key: 'polarity', title: 'Polarity Testing', icon: '🔄', color: 'bg-purple-500' },
    { key: 'earthFaultLoop', title: 'Earth Fault Loop', icon: '🌍', color: 'bg-orange-500' },
    { key: 'rcdTest', title: 'RCD Testing', icon: '🛡️', color: 'bg-red-500' },
    { key: 'functionalTest', title: 'Functional Testing', icon: '⚙️', color: 'bg-indigo-500' }
  ];

  const getStatusForCategory = (categoryKey: keyof TestResultsType) => {
    const results = groupedResults[categoryKey];
    if (results.length === 0) return 'pending';
    
    const hasFailures = results.some(r => r.status === 'failed');
    const allCompleted = results.every(r => r.status === 'completed');
    
    if (hasFailures) return 'failed';
    if (allCompleted) return 'completed';
    return 'in-progress';
  };

  const getProgressForCategory = (categoryKey: keyof TestResultsType) => {
    const categorySteps = testFlow.steps.filter(step => {
      if (categoryKey === 'visualInspection') return step.id.includes('visual');
      if (categoryKey === 'continuity') return step.id.includes('continuity');
      if (categoryKey === 'insulationResistance') return step.id.includes('insulation');
      if (categoryKey === 'polarity') return step.id.includes('polarity');
      if (categoryKey === 'earthFaultLoop') return step.id.includes('loop') || step.id.includes('impedance');
      if (categoryKey === 'rcdTest') return step.id.includes('rcd');
      if (categoryKey === 'functionalTest') return step.id.includes('functional');
      return false;
    });

    const completedResults = groupedResults[categoryKey].filter(r => 
      r.status === 'completed' || r.status === 'failed'
    );

    return categorySteps.length > 0 ? (completedResults.length / categorySteps.length) * 100 : 0;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'failed': return <XCircle className="h-5 w-5 text-red-500" />;
      case 'in-progress': return <Clock className="h-5 w-5 text-yellow-500" />;
      default: return <AlertTriangle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'failed': return 'bg-red-500';
      case 'in-progress': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  // Calculate overall compliance
  const overallCompliance = BS7671Validator.getComplianceReport(testFlow, session);

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📊 Comprehensive Test Progress
            <Badge className={overallCompliance.overallCompliance ? 'bg-green-500' : 'bg-red-500'}>
              {overallCompliance.overallCompliance ? 'Compliant' : 'Non-Compliant'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-3 bg-green-600/20 rounded-lg">
                <div className="text-2xl font-bold text-green-400">
                  {session.results.filter(r => r.status === 'completed').length}
                </div>
                <div className="text-xs text-green-300">Completed</div>
              </div>
              <div className="p-3 bg-red-600/20 rounded-lg">
                <div className="text-2xl font-bold text-red-400">
                  {session.results.filter(r => r.status === 'failed').length}
                </div>
                <div className="text-xs text-red-300">Failed</div>
              </div>
              <div className="p-3 bg-yellow-600/20 rounded-lg">
                <div className="text-2xl font-bold text-yellow-400">
                  {overallCompliance.criticalIssues.length}
                </div>
                <div className="text-xs text-yellow-300">Critical Issues</div>
              </div>
              <div className="p-3 bg-blue-600/20 rounded-lg">
                <div className="text-2xl font-bold text-blue-400">
                  {overallCompliance.warnings.length}
                </div>
                <div className="text-xs text-blue-300">Warnings</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testCategories.map((category) => {
          const status = getStatusForCategory(category.key as keyof TestResultsType);
          const progress = getProgressForCategory(category.key as keyof TestResultsType);
          const results = groupedResults[category.key as keyof TestResultsType];

          return (
            <Card key={category.key} className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{category.icon}</span>
                    <CardTitle className="text-sm">{category.title}</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(status)}
                    <Badge className={getStatusColor(status)}>
                      {status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <Progress value={progress} className="h-2" />
                <div className="text-xs text-muted-foreground">
                  {results.length} test{results.length !== 1 ? 's' : ''} 
                  {results.length > 0 && ` • ${Math.round(progress)}% complete`}
                </div>
                
                {/* Show latest result value if available */}
                {results.length > 0 && results[results.length - 1].value && (
                  <div className="text-sm">
                    Latest: {results[results.length - 1].value} {results[results.length - 1].unit}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Detailed Results List */}
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
                    <div className="font-medium text-sm">{index + 1}. {step.title}</div>
                    {result?.value && (
                      <div className="text-xs text-muted-foreground">
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
                      className={`text-xs ${
                        result?.status === 'completed' ? 'bg-green-600' :
                        result?.status === 'failed' ? 'bg-red-600' :
                        result?.status === 'in-progress' ? 'bg-yellow-600' : ''
                      }`}
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
    </div>
  );
};

export default ComprehensiveTestResults;
