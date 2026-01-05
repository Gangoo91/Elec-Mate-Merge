
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, AlertTriangle, XCircle, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { TestResult } from '@/types/testResult';
import { checkRegulationCompliance, RegulationCheckResult } from '@/utils/autoRegChecker';
import EnhancedRegulationWarningDialog from './EnhancedRegulationWarningDialog';

interface RegulationValidationControlsProps {
  testResults: TestResult[];
  showRegulationStatus: boolean;
  onToggleRegulationStatus: (show: boolean) => void;
}

const RegulationValidationControls: React.FC<RegulationValidationControlsProps> = ({
  testResults,
  showRegulationStatus,
  onToggleRegulationStatus
}) => {
  const [showBatchDialog, setShowBatchDialog] = useState(false);
  const [batchResults, setBatchResults] = useState<Map<string, RegulationCheckResult>>(new Map());

  // Stable hash for memoization
  const resultsHash = useMemo(
    () => testResults.map(r => `${r.id}:${r.circuitDesignation}:${r.zs}:${r.maxZs}:${r.protectiveDeviceRating}`).join('|'),
    [testResults]
  );

  // Analyse all circuits for regulation compliance
  const analyseAllCircuits = () => {
    const results = new Map<string, RegulationCheckResult>();
    testResults.forEach(result => {
      results.set(result.id, checkRegulationCompliance(result));
    });
    setBatchResults(results);
    setShowBatchDialog(true);
  };

  // Get overall statistics - memoized to avoid recalculation on every render
  const stats = useMemo(() => {
    let totalIssues = 0;
    let criticalIssues = 0;
    let warningIssues = 0;
    let compliantCircuits = 0;

    testResults.forEach(result => {
      const check = checkRegulationCompliance(result);
      if (check.warnings.length === 0) {
        compliantCircuits++;
      } else {
        totalIssues += check.warnings.length;
        check.warnings.forEach(warning => {
          if (warning.severity === 'critical') {
            criticalIssues++;
          } else {
            warningIssues++;
          }
        });
      }
    });

    return {
      totalCircuits: testResults.length,
      compliantCircuits,
      totalIssues,
      criticalIssues,
      warningIssues
    };
  }, [resultsHash]);

  // Get all warnings for batch dialog
  const getAllWarnings = () => {
    const allWarnings: Array<{ circuitId: string; circuitDescription: string; warnings: any[] }> = [];
    
    batchResults.forEach((result, circuitId) => {
      if (result.warnings.length > 0) {
        const circuit = testResults.find(r => r.id === circuitId);
        allWarnings.push({
          circuitId,
          circuitDescription: circuit?.circuitDescription || `Circuit ${circuit?.circuitNumber}`,
          warnings: result.warnings
        });
      }
    });
    
    return allWarnings.flatMap(item => item.warnings);
  };

  return (
    <>
      <Card className="bg-gradient-to-r from-elec-gray/10 to-elec-gray/5 border-elec-yellow/30 shadow-lg">
        <CardHeader className="pb-3 bg-elec-gray/5 border-b border-elec-yellow/20">
          <CardTitle className="text-base flex items-center gap-2 text-elec-gray">
            <Shield className="h-4 w-4 text-elec-yellow" />
            BS 7671 Regulation Validation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-2">
          {/* Statistics Overview */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-foreground/70 uppercase tracking-wide">Compliance Overview</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 p-4 sm:p-5 bg-gradient-to-br from-emerald-500/20 to-green-500/10 rounded-xl border-2 border-emerald-400/50 shadow-lg shadow-emerald-500/20 hover:scale-[1.02] hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-200 touch-manipulation">
                <CheckCircle className="h-8 w-8 text-emerald-400 flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">{stats.compliantCircuits}/{stats.totalCircuits}</span>
                  <span className="text-xs text-foreground/90 font-medium tracking-wide">Compliant</span>
                </div>
              </div>
              
              {stats.criticalIssues > 0 && (
                <div className="flex items-center gap-3 p-4 sm:p-5 bg-gradient-to-br from-red-500/20 to-rose-500/10 rounded-xl border-2 border-red-400/50 shadow-lg shadow-red-500/20 hover:scale-[1.02] hover:shadow-xl hover:shadow-red-500/30 transition-all duration-200 touch-manipulation">
                  <XCircle className="h-8 w-8 text-red-400 flex-shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">{stats.criticalIssues}</span>
                    <span className="text-xs text-foreground/90 font-medium tracking-wide">Critical</span>
                  </div>
                </div>
              )}
              
              {stats.warningIssues > 0 && (
                <div className="flex items-center gap-3 p-4 sm:p-5 bg-gradient-to-br from-amber-500/20 to-yellow-500/10 rounded-xl border-2 border-amber-400/50 shadow-lg shadow-amber-500/20 hover:scale-[1.02] hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-200 touch-manipulation">
                  <AlertTriangle className="h-8 w-8 text-amber-400 flex-shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">{stats.warningIssues}</span>
                    <span className="text-xs text-foreground/90 font-medium tracking-wide">Warnings</span>
                  </div>
                </div>
              )}
              
              <div className="flex items-center gap-3 p-4 sm:p-5 bg-gradient-to-br from-blue-500/20 to-indigo-500/10 rounded-xl border-2 border-blue-400/50 shadow-lg shadow-blue-500/20 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-200 touch-manipulation">
                <div className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">{stats.totalIssues}</span>
                  <span className="text-xs text-foreground/90 font-medium tracking-wide">Total Issues</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Actions</h3>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={analyseAllCircuits}
                size="default"
                className="gap-2 bg-elec-yellow hover:bg-elec-yellow/90 text-elec-gray font-semibold shadow-md"
                disabled={testResults.length === 0}
              >
                <Shield className="h-4 w-4" />
                Validate All Circuits
              </Button>
              
              <Button
                onClick={() => onToggleRegulationStatus(!showRegulationStatus)}
                size="default"
                variant="outline"
                className="gap-2 border-elec-yellow text-foreground hover:bg-elec-yellow hover:text-elec-gray-dark font-semibold transition-all"
              >
                {showRegulationStatus ? (
                  <>
                    <EyeOff className="h-4 w-4" />
                    Hide Status
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4" />
                    Show Status
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Info Banner */}
          {showRegulationStatus && (
            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-2">
              <div className="flex items-start gap-3">
                <span className="text-elec-yellow text-lg">💡</span>
                <p className="text-sm text-foreground leading-relaxed">
                  Regulation status indicators are now visible in the table. Click the shield icon on circuits with issues to review details.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Batch Validation Dialog */}
      <EnhancedRegulationWarningDialog
        open={showBatchDialog}
        onOpenChange={setShowBatchDialog}
        warnings={getAllWarnings()}
        circuitDescription="All Circuits Analysis"
        onApprove={() => setShowBatchDialog(false)}
        onReject={() => setShowBatchDialog(false)}
      />
    </>
  );
};

export default RegulationValidationControls;
