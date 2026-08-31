import React, { useState, useMemo } from 'react';
import { TestResult } from '@/types/testResult';
import { checkRegulationCompliance, RegulationCheckResult } from '@/utils/autoRegChecker';
import EnhancedRegulationWarningDialog from './EnhancedRegulationWarningDialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface RegulationValidationControlsProps {
  testResults: TestResult[];
  showRegulationStatus: boolean;
  onToggleRegulationStatus: (show: boolean) => void;
  /**
   * ELE-1505 — decides which limits apply. Without it a TT installation is
   * judged against the TN tables and its electrode readings read as failures.
   */
  earthingArrangement?: string;
}

const chipOn = 'bg-elec-yellow border border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border border-white/[0.12] text-white font-medium';
const kbdCn =
  'rounded border border-white/[0.15] bg-white/[0.04] px-1.5 py-0.5 font-mono text-[10px] text-white';

const RegulationValidationControls: React.FC<RegulationValidationControlsProps> = ({
  testResults,
  showRegulationStatus,
  onToggleRegulationStatus,
  earthingArrangement,
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
      results.set(result.id, checkRegulationCompliance(result, earthingArrangement));
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
      const check = checkRegulationCompliance(result, earthingArrangement);
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
      const check = checkRegulationCompliance(result, earthingArrangement);
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

  // Solid status chip — no translucent washes.
  const summaryChipCn = allCompliant
    ? 'bg-green-500 text-black'
    : hasCritical
      ? 'bg-red-600 text-white'
      : stats.warningIssues > 0
        ? 'bg-amber-500 text-black'
        : 'bg-white/[0.08] text-white';

  return (
    <>
      <div className="rounded-2xl border border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04]">
        {/* Header — typography only */}
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/[0.1] p-4">
          <div className="min-w-0">
            <h3 className="text-[15px] font-semibold tracking-tight text-white">
              Regulation checks
            </h3>
            <p className="mt-0.5 text-[12px] font-medium text-white">BS 7671:2018+A4:2026</p>
          </div>

          <span
            className={cn(
              'inline-flex h-8 shrink-0 items-center rounded-full px-3 text-[12px] font-semibold tabular-nums',
              summaryChipCn
            )}
          >
            {stats.compliantCircuits}/{stats.totalCircuits} pass
          </span>
        </div>

        <div className="space-y-3 p-4">
          {/* Stats — four bright cards */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <div className="rounded-xl border border-white/[0.12] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-3">
              <p className="text-xl font-semibold leading-none tabular-nums text-white">
                {stats.totalCircuits}
              </p>
              <p className="mt-1.5 text-[12px] font-medium text-white">Circuits</p>
            </div>
            <div className="rounded-xl border border-white/[0.12] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-3">
              <p
                className={cn(
                  'text-xl font-semibold leading-none tabular-nums',
                  stats.compliantCircuits > 0 ? 'text-green-400' : 'text-white'
                )}
              >
                {stats.compliantCircuits}
              </p>
              <p className="mt-1.5 text-[12px] font-medium text-white">Compliant</p>
            </div>
            <div className="rounded-xl border border-white/[0.12] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-3">
              <p
                className={cn(
                  'text-xl font-semibold leading-none tabular-nums',
                  stats.criticalIssues > 0 ? 'text-red-400' : 'text-white'
                )}
              >
                {stats.criticalIssues}
              </p>
              <p className="mt-1.5 text-[12px] font-medium text-white">Critical</p>
            </div>
            <div className="rounded-xl border border-white/[0.12] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-3">
              <p
                className={cn(
                  'text-xl font-semibold leading-none tabular-nums',
                  stats.warningIssues > 0 ? 'text-amber-400' : 'text-white'
                )}
              >
                {stats.warningIssues}
              </p>
              <p className="mt-1.5 text-[12px] font-medium text-white">Warnings</p>
            </div>
          </div>

          {/* Top offending reg — left rule, no icons */}
          {topOffendingReg && (
            <div
              className={cn(
                'rounded-lg border-l-2 bg-white/[0.04] px-3 py-2 text-[12px] text-white',
                hasCritical ? 'border-l-red-500' : 'border-l-amber-400'
              )}
            >
              <span className="font-semibold tabular-nums">{topOffendingReg.count}×</span>{' '}
              <span className="font-semibold">{topOffendingReg.title}</span>
              <span> — {topOffendingReg.regulation}</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={analyseAllCircuits}
              disabled={testResults.length === 0}
              className="h-11 rounded-xl bg-elec-yellow px-5 text-[13px] font-semibold text-black transition-colors hover:bg-elec-yellow/90 disabled:bg-white/[0.08] disabled:text-white/70 touch-manipulation"
            >
              Validate all circuits
            </button>

            <button
              type="button"
              onClick={() => onToggleRegulationStatus(!showRegulationStatus)}
              aria-pressed={showRegulationStatus}
              className={cn(
                'h-11 rounded-xl px-4 text-[13px] transition-colors touch-manipulation',
                showRegulationStatus ? chipOn : chipOff
              )}
            >
              Row status
            </button>

            {/* Keyboard hints are meaningless on touch — pointer devices only */}
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  aria-label="Keyboard shortcuts"
                  className="hidden h-11 rounded-xl border border-white/[0.12] bg-white/[0.06] px-4 text-[13px] font-medium text-white transition-colors hover:bg-white/[0.10] touch-manipulation sm:inline-flex sm:items-center"
                >
                  Shortcuts
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-72 border border-white/10 bg-background p-3" align="end">
                <p className="mb-2 text-[13px] font-semibold text-white">Keyboard</p>
                <ul className="space-y-1.5 text-[12px] text-white">
                  <li className="flex items-center justify-between gap-3">
                    <span>Move between cells</span>
                    <kbd className={kbdCn}>Tab</kbd>
                  </li>
                  <li className="flex items-center justify-between gap-3">
                    <span>Next row</span>
                    <kbd className={kbdCn}>Enter</kbd>
                  </li>
                  <li className="flex items-center justify-between gap-3">
                    <span>Navigate cells</span>
                    <kbd className={kbdCn}>← ↑ ↓ →</kbd>
                  </li>
                  <li className="flex items-center justify-between gap-3">
                    <span>Copy / paste</span>
                    <kbd className={kbdCn}>right-click</kbd>
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
