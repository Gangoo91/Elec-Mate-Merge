
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, AlertTriangle, FileText } from 'lucide-react';
import type { ComprehensiveTestResults as ComprehensiveTestResultsType, TestResult } from '@/types/inspection-testing';

interface ComprehensiveTestResultsProps {
  results: ComprehensiveTestResultsType;
}

const ComprehensiveTestResults = ({ results }: ComprehensiveTestResultsProps) => {
  // Sample data structure that matches the interface
  const sampleResults: ComprehensiveTestResultsType = {
    sessionId: results.sessionId || 'sample-session',
    testType: results.testType || 'comprehensive',
    overallResult: results.overallResult || 'incomplete',
    results: results.results || [],
    faults: results.faults || [],
    recommendations: results.recommendations || [],
    generatedAt: results.generatedAt || new Date(),
    visualInspection: results.visualInspection || [],
    continuity: results.continuity || [],
    insulationResistance: results.insulationResistance || [],
    polarity: results.polarity || [],
    earthFaultLoop: results.earthFaultLoop || [],
    rcdTest: results.rcdTest || [],
    functionalTest: results.functionalTest || []
  };

  const getTestCategoryResults = (category: keyof ComprehensiveTestResultsType) => {
    const categoryResults = sampleResults[category];
    if (!Array.isArray(categoryResults)) return { passed: 0, failed: 0, total: 0, results: [] };
    
    const passed = categoryResults.filter((r: TestResult) => r.status === 'completed' && r.isWithinLimits).length;
    const failed = categoryResults.filter((r: TestResult) => r.status === 'failed' || !r.isWithinLimits).length;
    const total = categoryResults.length;
    
    return { passed, failed, total, results: categoryResults };
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'visualInspection':
        return '👁️';
      case 'continuity':
        return '🔗';
      case 'insulationResistance':
        return '⚡';
      case 'polarity':
        return '🔄';
      case 'earthFaultLoop':
        return '🌍';
      case 'rcdTest':
        return '🛡️';
      case 'functionalTest':
        return '⚙️';
      default:
        return '📋';
    }
  };

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'visualInspection':
        return 'Visual Inspection';
      case 'continuity':
        return 'Continuity Testing';
      case 'insulationResistance':
        return 'Insulation Resistance';
      case 'polarity':
        return 'Polarity Testing';
      case 'earthFaultLoop':
        return 'Earth Fault Loop';
      case 'rcdTest':
        return 'RCD Testing';
      case 'functionalTest':
        return 'Functional Testing';
      default:
        return category;
    }
  };

  const categoryResults = Object.keys(sampleResults)
    .filter(key => Array.isArray(sampleResults[key as keyof ComprehensiveTestResultsType]))
    .map(category => ({
      category,
      ...getTestCategoryResults(category as keyof ComprehensiveTestResultsType)
    }));

  const overallStats = {
    totalTests: sampleResults.results.length,
    passedTests: sampleResults.results.filter(r => r.status === 'completed' && r.isWithinLimits).length,
    failedTests: sampleResults.results.filter(r => r.status === 'failed' || !r.isWithinLimits).length,
    totalFaults: sampleResults.faults.length,
    totalRecommendations: sampleResults.recommendations.length
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/30 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-elec-yellow" />
            Comprehensive Test Results Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{overallStats.passedTests}</div>
              <div className="text-sm text-muted-foreground">Tests Passed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">{overallStats.failedTests}</div>
              <div className="text-sm text-muted-foreground">Tests Failed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-elec-yellow">{overallStats.totalTests}</div>
              <div className="text-sm text-muted-foreground">Total Tests</div>
            </div>
          </div>

          <div className="flex items-center justify-center mb-4">
            <Badge 
              variant={sampleResults.overallResult === 'pass' ? 'default' : 'destructive'}
              className="text-lg px-4 py-2"
            >
              {sampleResults.overallResult === 'pass' && <CheckCircle className="h-4 w-4 mr-2" />}
              {sampleResults.overallResult === 'fail' && <XCircle className="h-4 w-4 mr-2" />}
              {sampleResults.overallResult === 'incomplete' && <AlertTriangle className="h-4 w-4 mr-2" />}
              Overall Result: {sampleResults.overallResult.toUpperCase()}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categoryResults.map(({ category, passed, failed, total }) => (
          <Card key={category} className="border-elec-yellow/20 bg-elec-gray/80">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">{getCategoryIcon(category)}</span>
                <h3 className="font-medium text-white">{getCategoryTitle(category)}</h3>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-green-400">Passed:</span>
                  <span>{passed}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-red-400">Failed:</span>
                  <span>{failed}</span>
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span>Total:</span>
                  <span>{total}</span>
                </div>
                
                {total > 0 && (
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(passed / total) * 100}%` }}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {sampleResults.faults.length > 0 && (
        <Card className="border-red-500/30 bg-red-500/10">
          <CardHeader>
            <CardTitle className="text-red-400">Faults Identified</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {sampleResults.faults.map((fault, index) => (
                <Alert key={index} className="border-red-500/30">
                  <XCircle className="h-4 w-4" />
                  <AlertDescription>
                    {typeof fault === 'string' ? fault : JSON.stringify(fault)}
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {sampleResults.recommendations.length > 0 && (
        <Card className="border-yellow-500/30 bg-yellow-500/10">
          <CardHeader>
            <CardTitle className="text-yellow-400">Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {sampleResults.recommendations.map((rec, index) => (
                <Alert key={index} className="border-yellow-500/30">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>{rec}</AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="border-elec-yellow/20 bg-elec-gray/50">
        <CardContent className="p-4">
          <div className="text-center text-sm text-muted-foreground">
            Report generated on {sampleResults.generatedAt.toLocaleDateString()} at {sampleResults.generatedAt.toLocaleTimeString()}
            <br />
            Session ID: {sampleResults.sessionId}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComprehensiveTestResults;
