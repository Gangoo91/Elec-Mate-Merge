
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
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
      <div className="regulation-card">
        {/* Header */}
        <div className="regulation-header">
          <div className="p-2 rounded-lg bg-elec-yellow/20">
            <Shield className="h-5 w-5 text-elec-yellow" />
          </div>
          <div>
            <h3 className="regulation-title">BS 7671 Regulation Validation</h3>
            <p className="text-xs text-white/50">Automated compliance checking</p>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Compliant */}
            <div className="regulation-stat regulation-stat-success">
              <CheckCircle className="h-6 w-6 text-emerald-400 flex-shrink-0" />
              <div>
                <span className="regulation-stat-value">{stats.compliantCircuits}/{stats.totalCircuits}</span>
                <span className="regulation-stat-label block">Compliant</span>
              </div>
            </div>

            {/* Critical Issues */}
            {stats.criticalIssues > 0 && (
              <div className="regulation-stat regulation-stat-error">
                <XCircle className="h-6 w-6 text-red-400 flex-shrink-0" />
                <div>
                  <span className="regulation-stat-value">{stats.criticalIssues}</span>
                  <span className="regulation-stat-label block">Critical</span>
                </div>
              </div>
            )}

            {/* Warnings */}
            {stats.warningIssues > 0 && (
              <div className="regulation-stat regulation-stat-warning">
                <AlertTriangle className="h-6 w-6 text-amber-400 flex-shrink-0" />
                <div>
                  <span className="regulation-stat-value">{stats.warningIssues}</span>
                  <span className="regulation-stat-label block">Warnings</span>
                </div>
              </div>
            )}

            {/* Total Issues */}
            <div className="regulation-stat">
              <div>
                <span className="regulation-stat-value">{stats.totalIssues}</span>
                <span className="regulation-stat-label block">Total Issues</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={analyseAllCircuits}
              className="h-11 gap-2 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold active:scale-95 transition-all"
              disabled={testResults.length === 0}
            >
              <Shield className="h-4 w-4" />
              Validate All Circuits
            </Button>

            <Button
              onClick={() => onToggleRegulationStatus(!showRegulationStatus)}
              variant="outline"
              className="h-11 gap-2 border-white/20 text-white hover:bg-white/10 font-medium active:scale-95 transition-all"
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

          {/* Info Banner */}
          {showRegulationStatus && (
            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-xl p-3">
              <div className="flex items-start gap-3">
                <span className="text-elec-yellow text-lg">💡</span>
                <p className="text-sm text-white/80 leading-relaxed">
                  Regulation status indicators are now visible in the table. Click the shield icon on circuits with issues to review details.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

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
