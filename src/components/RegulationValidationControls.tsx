import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Shield, AlertTriangle, XCircle, CheckCircle, Eye, EyeOff, Keyboard } from 'lucide-react';
import { TestResult } from '@/types/testResult';
import { checkRegulationCompliance, RegulationCheckResult } from '@/utils/autoRegChecker';
import EnhancedRegulationWarningDialog from './EnhancedRegulationWarningDialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface RegulationValidationControlsProps {
  testResults: TestResult[];
  showRegulationStatus: boolean;
  onToggleRegulationStatus: (show: boolean) => void;
}

const RegulationValidationControls: React.FC<RegulationValidationControlsProps> = ({
  testResults,
  showRegulationStatus,
  onToggleRegulationStatus,
}) => {
  const [showBatchDialog, setShowBatchDialog] = useState(false);
  const [batchResults, setBatchResults] = useState<Map<string, RegulationCheckResult>>(new Map());

  // Stable hash for memoization
  const resultsHash = useMemo(
    () =>
      testResults
        .map(
          (r) => `${r.id}:${r.circuitDesignation}:${r.zs}:${r.maxZs}:${r.protectiveDeviceRating}`
        )
        .join('|'),
    [testResults]
  );

  // Analyse all circuits for regulation compliance
  const analyseAllCircuits = () => {
    const results = new Map<string, RegulationCheckResult>();
    testResults.forEach((result) => {
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

    testResults.forEach((result) => {
      const check = checkRegulationCompliance(result);
      if (check.warnings.length === 0) {
        compliantCircuits++;
      } else {
        totalIssues += check.warnings.length;
        check.warnings.forEach((warning) => {
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
      warningIssues,
    };
  }, [resultsHash]);

  // Get all warnings for batch dialog
  const getAllWarnings = () => {
    const allWarnings: Array<{ circuitId: string; circuitDescription: string; warnings: any[] }> =
      [];

    batchResults.forEach((result, circuitId) => {
      if (result.warnings.length > 0) {
        const circuit = testResults.find((r) => r.id === circuitId);
        allWarnings.push({
          circuitId,
          circuitDescription: circuit?.circuitDescription || `Circuit ${circuit?.circuitNumber}`,
          warnings: result.warnings,
        });
      }
    });

    return allWarnings.flatMap((item) => item.warnings);
  };

  // ELE-830: top offending reg — surface it inline so users know WHAT to fix.
  const topOffendingReg = useMemo(() => {
    if (stats.totalIssues === 0) return null;
    const regCounts = new Map<string, { count: number; title: string }>();
    testResults.forEach((result) => {
      const check = checkRegulationCompliance(result);
      check.warnings.forEach((w) => {
        const key = w.regulation || w.title;
        const prev = regCounts.get(key);
        regCounts.set(key, { count: (prev?.count || 0) + 1, title: w.title });
      });
    });
    const sorted = Array.from(regCounts.entries()).sort((a, b) => b[1].count - a[1].count);
    return sorted[0] ? { ...sorted[0][1], regulation: sorted[0][0] } : null;
  }, [resultsHash]);

  const allCompliant = stats.totalIssues === 0 && stats.totalCircuits > 0;
  const hasCritical = stats.criticalIssues > 0;
  const headlineTone = allCompliant
    ? { dot: 'bg-green-400', text: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30' }
    : hasCritical
      ? { dot: 'bg-red-500', text: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30' }
      : stats.warningIssues > 0
        ? { dot: 'bg-amber-400', text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' }
        : { dot: 'bg-white/30', text: 'text-white/70', bg: 'bg-white/[0.03]', border: 'border-white/10' };

  return (
    <>
      <div className="regulation-card">
        {/* ELE-830 redesign — no icons, pure typography + status pill */}
        <div className={cn('flex flex-wrap items-center gap-4 p-4 border-b', headlineTone.border)}>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-elec-yellow mb-1">
              Regulation validation
            </p>
            <h3 className="text-base font-bold text-white leading-tight">
              BS 7671 A4:2026 · Automated compliance
            </h3>
          </div>

          {/* Headline status pill */}
          <div
            className={cn(
              'inline-flex items-center gap-2 px-3 py-1.5 rounded-full border',
              headlineTone.bg,
              headlineTone.border
            )}
          >
            <span className={cn('relative flex h-2 w-2')}>
              <span
                className={cn(
                  'absolute inset-0 rounded-full opacity-75',
                  headlineTone.dot,
                  allCompliant && 'animate-pulse'
                )}
              />
              <span className={cn('relative h-2 w-2 rounded-full', headlineTone.dot)} />
            </span>
            <span className={cn('text-[11px] font-bold uppercase tracking-wider', headlineTone.text)}>
              {allCompliant
                ? `${stats.totalCircuits}/${stats.totalCircuits} Compliant`
                : `${stats.compliantCircuits}/${stats.totalCircuits} Compliant`}
            </span>
          </div>
        </div>

        <div className="p-4 space-y-3">
          {/* Stats strip — tighter, no loose boxes */}
          <div className="flex items-stretch rounded-xl bg-white/[0.02] border border-white/[0.08] overflow-hidden">
            <div className="flex-1 flex flex-col items-center justify-center px-4 py-2.5 border-r border-white/[0.08]">
              <span className="text-lg font-bold text-white tabular-nums leading-none">
                {stats.totalCircuits}
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-white/60 mt-1">
                Circuits
              </span>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center px-4 py-2.5 border-r border-white/[0.08]">
              <span className="text-lg font-bold text-green-400 tabular-nums leading-none">
                {stats.compliantCircuits}
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-white/60 mt-1">
                Compliant
              </span>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center px-4 py-2.5 border-r border-white/[0.08]">
              <span
                className={cn(
                  'text-lg font-bold tabular-nums leading-none',
                  stats.criticalIssues > 0 ? 'text-red-400' : 'text-white/40'
                )}
              >
                {stats.criticalIssues}
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-white/60 mt-1">
                Critical
              </span>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center px-4 py-2.5">
              <span
                className={cn(
                  'text-lg font-bold tabular-nums leading-none',
                  stats.warningIssues > 0 ? 'text-amber-400' : 'text-white/40'
                )}
              >
                {stats.warningIssues}
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-white/60 mt-1">
                Warnings
              </span>
            </div>
          </div>

          {/* Top offending reg — text-only left-rule accent, no icons */}
          {topOffendingReg && (
            <div
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 border-l-2',
                hasCritical
                  ? 'bg-red-500/[0.06] border-l-red-400'
                  : 'bg-amber-500/[0.06] border-l-amber-400'
              )}
            >
              <div className="min-w-0 flex-1 text-[12px] text-white">
                <span className="font-bold tabular-nums">{topOffendingReg.count}×</span>{' '}
                <span className="font-semibold">{topOffendingReg.title}</span>
                <span className="text-white/60"> — {topOffendingReg.regulation}</span>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <Button
                onClick={analyseAllCircuits}
                className="h-10 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold rounded-full px-5 active:scale-95 transition-all"
                disabled={testResults.length === 0}
              >
                Validate all circuits
              </Button>

              {/* Inline toggle — no icons, pill with switch-style knob */}
              <button
                type="button"
                onClick={() => onToggleRegulationStatus(!showRegulationStatus)}
                className={cn(
                  'h-10 inline-flex items-center gap-2.5 pl-1 pr-4 rounded-full border transition-all touch-manipulation',
                  showRegulationStatus
                    ? 'bg-elec-yellow/10 border-elec-yellow/40 text-elec-yellow'
                    : 'bg-white/[0.03] border-white/15 text-white/80 hover:bg-white/[0.06]'
                )}
                aria-pressed={showRegulationStatus}
              >
                <span
                  className={cn(
                    'w-10 h-6 rounded-full flex items-center transition-colors shrink-0 relative',
                    showRegulationStatus ? 'bg-elec-yellow/30' : 'bg-white/[0.08]'
                  )}
                >
                  <span
                    className={cn(
                      'absolute w-5 h-5 rounded-full transition-all',
                      showRegulationStatus ? 'left-[18px] bg-elec-yellow' : 'left-[2px] bg-white/70'
                    )}
                  />
                </span>
                <span className="text-[13px] font-semibold">
                  {showRegulationStatus ? 'Row status on' : 'Row status off'}
                </span>
              </button>
            </div>

            {/* Keyboard hints — text "?" affordance, no icon */}
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="h-9 px-3 rounded-full border border-white/15 bg-white/[0.03] text-[12px] font-bold text-white/70 hover:text-white hover:bg-white/[0.06] transition-colors"
                  aria-label="Keyboard shortcuts"
                  title="Keyboard shortcuts"
                >
                  Shortcuts
                </button>
              </PopoverTrigger>
              <PopoverContent
                className="w-72 p-3 bg-background border border-white/10"
                align="end"
              >
                <p className="text-[11px] font-bold uppercase tracking-wider text-elec-yellow mb-2">
                  Keyboard
                </p>
                <ul className="space-y-1.5 text-[12px] text-white/85">
                  <li className="flex items-center justify-between">
                    <span>Move between cells</span>
                    <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/10 text-[10px] font-mono">
                      Tab
                    </kbd>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Next row</span>
                    <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/10 text-[10px] font-mono">
                      Enter
                    </kbd>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Navigate cells</span>
                    <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/10 text-[10px] font-mono">
                      ← ↑ ↓ →
                    </kbd>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Copy / paste</span>
                    <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/10 text-[10px] font-mono">
                      right-click
                    </kbd>
                  </li>
                </ul>
              </PopoverContent>
            </Popover>
          </div>
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
