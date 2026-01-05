
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TestResult } from '@/types/testResult';
import { validateTestResult, getOverallCompliance, TestValidationResults } from '@/utils/testValidation';
import { CircleCheck, AlertTriangle, CircleX, TrendingUp, Zap, Shield, CheckCircle, Lightbulb, Plug, HelpCircle, Flame, Droplets, Car } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { checkRegulationCompliance } from '@/utils/regulationChecker';
import EnhancedRegulationWarningDialog from './EnhancedRegulationWarningDialog';

interface TestAnalyticsProps {
  testResults: TestResult[];
}

const TestAnalytics = ({ testResults }: TestAnalyticsProps) => {
  const [showRegulationDialog, setShowRegulationDialog] = useState(false);
  const [allRegulationWarnings, setAllRegulationWarnings] = useState<any[]>([]);

  // Helper to infer circuit type from description and rating
  const inferCircuitType = (result: TestResult): string => {
    if (result.type && result.type !== 'Unknown') return result.type;
    
    const desc = result.circuitDescription?.toLowerCase() || '';
    if (desc.includes('light')) return 'Lighting';
    if (desc.includes('socket') || desc.includes('power')) return 'Sockets';
    if (desc.includes('cooker') || desc.includes('oven')) return 'Cooker';
    if (desc.includes('shower')) return 'Shower';
    if (desc.includes('ev') || desc.includes('car') || desc.includes('charge')) return 'EV Charger';
    
    const rating = parseInt(result.protectiveDeviceRating || '0');
    if (rating === 6 || rating === 10) return 'Lighting';
    if (rating === 32 || rating === 20) return 'Sockets';
    if (rating >= 40 && rating <= 50) return 'Cooker/Shower';
    
    return 'Other Circuits';
  };

  // Calculate overall statistics
  const analytics = React.useMemo(() => {
    const validations = testResults.map(result => ({
      result,
      validation: validateTestResult(result),
      compliance: getOverallCompliance(validateTestResult(result))
    }));

    const totalCircuits = testResults.length;
    const passCircuits = validations.filter(v => v.compliance.status === 'pass').length;
    const warningCircuits = validations.filter(v => v.compliance.status === 'warning').length;
    const failCircuits = validations.filter(v => v.compliance.status === 'fail').length;

    const passPercentage = totalCircuits > 0 ? (passCircuits / totalCircuits) * 100 : 0;
    const completionPercentage = testResults.filter(r => 
      r.r1r2 && r.insulationLiveNeutral && r.polarity && r.zs && r.functionalTesting
    ).length / Math.max(totalCircuits, 1) * 100;

    const criticalIssues = validations.flatMap(v => v.compliance.criticalIssues);

    // Circuit type distribution with smart inference
    const circuitTypes = testResults.reduce((acc, result) => {
      const type = inferCircuitType(result);
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalCircuits,
      passCircuits,
      warningCircuits,
      failCircuits,
      passPercentage,
      completionPercentage,
      criticalIssues,
      circuitTypes,
      validations
    };
  }, [testResults]);

  const handleValidateAll = () => {
    const allWarnings = testResults.flatMap(result => {
      const check = checkRegulationCompliance(result);
      return check.warnings;
    });
    setAllRegulationWarnings(allWarnings);
    setShowRegulationDialog(true);
  };

  return (
    <>
      <EnhancedRegulationWarningDialog
        open={showRegulationDialog}
        onOpenChange={setShowRegulationDialog}
        warnings={allRegulationWarnings}
        circuitDescription="All Circuits"
        onApprove={() => setShowRegulationDialog(false)}
        onReject={() => setShowRegulationDialog(false)}
      />
    <div className="space-y-4">
      <Card>
        <CardHeader className="p-3 md:p-6">
          <CardTitle className="flex items-center gap-2 text-sm md:text-base">
            <TrendingUp className="h-4 w-4 md:h-5 md:w-5" />
            Test Results Analytics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 md:space-y-6 p-3 md:p-6">
          {/* Overall Status Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
            <div className="flex items-center gap-2 p-2 md:p-3 bg-blue-600 text-foreground rounded-lg">
              <div className="p-1.5 md:p-2 bg-blue-500 rounded-full">
                <Zap className="h-3 w-3 md:h-4 md:w-4 text-foreground" />
              </div>
              <div>
                <div className="text-xl md:text-2xl font-bold">{analytics.totalCircuits}</div>
                <div className="text-xs md:text-sm text-blue-100">Total</div>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 md:p-3 bg-green-600 text-foreground rounded-lg">
              <div className="p-1.5 md:p-2 bg-green-500 rounded-full">
                <CircleCheck className="h-3 w-3 md:h-4 md:w-4 text-foreground" />
              </div>
              <div>
                <div className="text-xl md:text-2xl font-bold">{analytics.passCircuits}</div>
                <div className="text-xs md:text-sm text-green-100">Pass</div>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 md:p-3 bg-amber-600 text-foreground rounded-lg">
              <div className="p-1.5 md:p-2 bg-amber-500 rounded-full">
                <AlertTriangle className="h-3 w-3 md:h-4 md:w-4 text-foreground" />
              </div>
              <div>
                <div className="text-xl md:text-2xl font-bold">{analytics.warningCircuits}</div>
                <div className="text-xs md:text-sm text-amber-100">Warnings</div>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 md:p-3 bg-red-600 text-foreground rounded-lg">
              <div className="p-1.5 md:p-2 bg-red-500 rounded-full">
                <CircleX className="h-3 w-3 md:h-4 md:w-4 text-foreground" />
              </div>
              <div>
                <div className="text-xl md:text-2xl font-bold">{analytics.failCircuits}</div>
                <div className="text-xs md:text-sm text-red-100">Failures</div>
              </div>
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="space-y-3 md:space-y-4">
            <div>
              <div className="flex items-center justify-between text-sm md:text-base font-medium mb-2">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-400" />
                  <span>Compliance Rate</span>
                </div>
                <span className="text-base md:text-lg font-bold text-foreground">{analytics.passPercentage.toFixed(1)}%</span>
              </div>
              <Progress value={analytics.passPercentage} className="h-2 md:h-3 [&>div]:bg-gradient-to-r [&>div]:from-green-500 [&>div]:to-emerald-400" />
            </div>

            <div>
              <div className="flex items-center justify-between text-sm md:text-base font-medium mb-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-400" />
                  <span>Testing Completion</span>
                </div>
                <span className="text-base md:text-lg font-bold text-foreground">{analytics.completionPercentage.toFixed(1)}%</span>
              </div>
              <Progress value={analytics.completionPercentage} className="h-2 md:h-3 [&>div]:bg-gradient-to-r [&>div]:from-blue-500 [&>div]:to-cyan-400" />
            </div>
          </div>

          {/* Critical Issues */}
          {analytics.criticalIssues.length > 0 && (
            <div className="p-4 md:p-6 bg-gradient-to-br from-red-500/20 to-rose-500/10 border-2 border-red-400/60 rounded-xl shadow-lg shadow-red-500/20">
              <div className="flex items-center justify-between gap-2 mb-2 md:mb-3">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 md:h-5 md:w-5 text-red-400" />
                  <span className="text-base md:text-lg font-semibold text-red-50">Critical Issues</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleValidateAll}
                  className="h-9 px-4 text-sm md:h-10 md:px-5 md:text-base bg-red-500/20 border-red-400/40 text-red-50 hover:bg-red-500/30 hover:border-red-400/60"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  View All
                </Button>
              </div>
              <ul className="text-sm md:text-base text-red-100 space-y-2 md:space-y-3 leading-relaxed">
                {analytics.criticalIssues.slice(0, 5).map((issue, index) => (
                  <li key={index} className="flex items-start gap-2 hover:bg-red-500/10 -mx-2 px-2 py-1 rounded-md transition-colors">
                    <span className="text-red-300 mt-0.5">•</span>
                    <span>{issue}</span>
                  </li>
                ))}
                {analytics.criticalIssues.length > 5 && (
                  <li>
                    <Button
                      variant="link"
                      size="sm"
                      onClick={handleValidateAll}
                      className="h-auto p-0 text-red-300 hover:text-red-200 font-medium text-sm"
                    >
                      ... and {analytics.criticalIssues.length - 5} more issues (tap to view)
                    </Button>
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* Validate All Button for Mobile */}
          {analytics.criticalIssues.length === 0 && (
            <div className="md:hidden">
              <Button 
                variant="outline" 
                onClick={handleValidateAll}
                className="w-full"
              >
                <Shield className="h-4 w-4 mr-2" />
                Validate All Circuits
              </Button>
            </div>
          )}

          {/* Circuit Type Distribution */}
          {Object.keys(analytics.circuitTypes).length > 0 && (
            <div>
              <h4 className="text-base md:text-lg font-semibold text-foreground flex items-center gap-2 mb-3">
                <Zap className="h-4 w-4 text-elec-yellow" />
                Circuit Types
              </h4>
              <div className="grid grid-cols-1 gap-2 md:gap-3">
                {Object.entries(analytics.circuitTypes).map(([type, count]) => {
                  const percentage = ((count / analytics.totalCircuits) * 100).toFixed(1);
                  const getTypeIcon = () => {
                    const lowerType = type.toLowerCase();
                    if (lowerType.includes('lighting') || lowerType.includes('light')) return Lightbulb;
                    if (lowerType.includes('socket') || lowerType.includes('power')) return Plug;
                    if (lowerType.includes('cooker') || lowerType.includes('oven')) return Flame;
                    if (lowerType.includes('shower')) return Droplets;
                    if (lowerType.includes('ev') || lowerType.includes('charger')) return Car;
                    if (lowerType.includes('other')) return Zap;
                    return HelpCircle;
                  };
                  const TypeIcon = getTypeIcon();
                  
                  const getGradientClass = () => {
                    const lowerType = type.toLowerCase();
                    if (lowerType.includes('lighting') || lowerType.includes('light')) 
                      return 'bg-gradient-to-r from-elec-yellow to-amber-400';
                    if (lowerType.includes('socket') || lowerType.includes('power')) 
                      return 'bg-gradient-to-r from-blue-500 to-cyan-400';
                    if (lowerType.includes('cooker') || lowerType.includes('oven')) 
                      return 'bg-gradient-to-r from-orange-500 to-red-400';
                    if (lowerType.includes('shower')) 
                      return 'bg-gradient-to-r from-cyan-500 to-blue-400';
                    if (lowerType.includes('ev') || lowerType.includes('charger')) 
                      return 'bg-gradient-to-r from-green-500 to-emerald-400';
                    if (lowerType.includes('other'))
                      return 'bg-gradient-to-r from-purple-500 to-pink-400';
                    return 'bg-gradient-to-r from-neutral-400 to-neutral-500';
                  };

                  return (
                    <div 
                      key={type} 
                      className="bg-gradient-to-br from-neutral-700 to-neutral-800 border border-border rounded-lg p-3 hover:border-elec-yellow/50 hover:shadow-lg hover:shadow-elec-yellow/10 transition-all"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <TypeIcon className="h-4 w-4 text-elec-yellow" />
                          <span className="text-sm md:text-base font-medium text-foreground">{type}</span>
                        </div>
                        <div className="bg-gradient-to-br from-elec-yellow/20 to-amber-500/10 border-2 border-elec-yellow/50 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center">
                          <span className="text-lg md:text-xl font-bold text-elec-yellow">{count}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="w-full bg-background/50 rounded-full h-3 md:h-4 overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${getGradientClass()}`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <div className="text-sm text-neutral-400 text-right">{percentage}%</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
    </>
  );
};

export default TestAnalytics;
