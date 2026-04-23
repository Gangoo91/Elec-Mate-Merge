import React, { useState } from 'react';
import { TestResult } from '@/types/testResult';
import {
  validateTestResult,
  getOverallCompliance,
} from '@/utils/testValidation';
import { checkRegulationCompliance } from '@/utils/regulationChecker';
import EnhancedRegulationWarningDialog from './EnhancedRegulationWarningDialog';
import { Eyebrow } from '@/components/college/primitives';
import { cn } from '@/lib/utils';

interface TestAnalyticsProps {
  testResults: TestResult[];
  /**
   * System earthing arrangement (TT / TN-S / TN-C-S) from the cert. Passed to
   * validators so TT circuits use RCD-based Zs limits. ELE-830 follow-up.
   */
  earthingArrangement?: string;
}

/**
 * Infer circuit type from description + rating. Kept as-is; the redesign is
 * purely visual (college primitives pattern: monochrome, no icons, hairline
 * dividers, big numerals).
 */
function inferCircuitType(result: TestResult): string {
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
}

const TestAnalytics = ({ testResults, earthingArrangement }: TestAnalyticsProps) => {
  const [showRegulationDialog, setShowRegulationDialog] = useState(false);
  const [allRegulationWarnings, setAllRegulationWarnings] = useState<any[]>([]);

  const analytics = React.useMemo(() => {
    const validations = testResults.map((result) => {
      const v = validateTestResult(result, earthingArrangement);
      return {
        result,
        validation: v,
        compliance: getOverallCompliance(v),
      };
    });

    const totalCircuits = testResults.length;
    const passCircuits = validations.filter((v) => v.compliance.status === 'pass').length;
    const warningCircuits = validations.filter((v) => v.compliance.status === 'warning').length;
    const failCircuits = validations.filter((v) => v.compliance.status === 'fail').length;

    const passPercentage = totalCircuits > 0 ? (passCircuits / totalCircuits) * 100 : 0;
    const completionPercentage =
      (testResults.filter(
        (r) => r.r1r2 && r.insulationLiveNeutral && r.polarity && r.zs && r.functionalTesting
      ).length /
        Math.max(totalCircuits, 1)) *
      100;

    const criticalIssues = validations.flatMap((v) => v.compliance.criticalIssues);

    const circuitTypes = testResults.reduce(
      (acc, result) => {
        const type = inferCircuitType(result);
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    return {
      totalCircuits,
      passCircuits,
      warningCircuits,
      failCircuits,
      passPercentage,
      completionPercentage,
      criticalIssues,
      circuitTypes,
      validations,
    };
  }, [testResults, earthingArrangement]);

  const handleValidateAll = () => {
    const allWarnings = testResults.flatMap((result) => {
      const check = checkRegulationCompliance(result, earthingArrangement);
      return check.warnings;
    });
    setAllRegulationWarnings(allWarnings);
    setShowRegulationDialog(true);
  };

  const stats = [
    { label: 'Total', value: analytics.totalCircuits, toneClass: 'text-white' },
    { label: 'Pass', value: analytics.passCircuits, toneClass: 'text-green-400' },
    { label: 'Warn', value: analytics.warningCircuits, toneClass: 'text-amber-400' },
    { label: 'Fail', value: analytics.failCircuits, toneClass: 'text-red-400' },
  ];

  const sortedCircuitTypes = Object.entries(analytics.circuitTypes).sort(
    ([, a], [, b]) => b - a
  );

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

      <div className="space-y-8">
        {/* Section header — college editorial pattern */}
        <div className="flex items-end justify-between gap-4">
          <div>
            <Eyebrow>Analytics</Eyebrow>
            <h2 className="mt-1.5 text-xl sm:text-2xl lg:text-[26px] font-semibold text-white tracking-tight leading-tight">
              Test Results
            </h2>
          </div>
          <button
            onClick={handleValidateAll}
            className="text-[12px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors shrink-0 touch-manipulation"
          >
            Validate all →
          </button>
        </div>

        {/* 4-cell hairline stat strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="bg-[hsl(0_0%_12%)] px-5 py-6 sm:px-6 sm:py-7 lg:px-7 lg:py-8 flex flex-col items-start"
            >
              <Eyebrow>
                {String(i + 1).padStart(2, '0')} · {stat.label}
              </Eyebrow>
              <span
                className={cn(
                  'mt-3 sm:mt-4 font-semibold tabular-nums tracking-tight leading-none',
                  'text-4xl sm:text-5xl lg:text-6xl',
                  stat.toneClass
                )}
              >
                {stat.value}
              </span>
            </div>
          ))}
        </div>

        {/* Progress pair — hairline card with two stacked rows */}
        <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] divide-y divide-white/[0.06]">
          <ProgressRow
            eyebrow="01 · Compliance"
            label="Regulation compliance rate"
            percent={analytics.passPercentage}
            barClass="bg-gradient-to-r from-green-500 to-emerald-400"
          />
          <ProgressRow
            eyebrow="02 · Completion"
            label="Circuits fully tested"
            percent={analytics.completionPercentage}
            barClass="bg-gradient-to-r from-elec-yellow to-amber-400"
          />
        </div>

        {/* Critical issues — red-accent editorial panel, no icons */}
        {analytics.criticalIssues.length > 0 && (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/[0.04] overflow-hidden">
            <div className="flex items-end justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5 border-b border-red-500/20">
              <div>
                <Eyebrow className="text-red-300/70">Issues</Eyebrow>
                <h3 className="mt-1 text-base sm:text-lg font-semibold text-white tracking-tight">
                  {analytics.criticalIssues.length} critical{' '}
                  {analytics.criticalIssues.length === 1 ? 'issue' : 'issues'}
                </h3>
              </div>
              <button
                onClick={handleValidateAll}
                className="text-[12px] font-medium text-red-300 hover:text-red-200 transition-colors shrink-0 touch-manipulation"
              >
                View all →
              </button>
            </div>
            <ul className="divide-y divide-red-500/10">
              {analytics.criticalIssues.slice(0, 5).map((issue, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 px-5 py-3 sm:px-6 text-sm text-white/90 leading-relaxed"
                >
                  <span className="text-[10px] font-semibold tabular-nums text-red-400/80 pt-1 tracking-wider">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span>{issue}</span>
                </li>
              ))}
              {analytics.criticalIssues.length > 5 && (
                <li className="px-5 py-3 sm:px-6">
                  <button
                    onClick={handleValidateAll}
                    className="text-[12px] font-medium text-red-300 hover:text-red-200 transition-colors"
                  >
                    + {analytics.criticalIssues.length - 5} more →
                  </button>
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Circuit type distribution — hairline divided rows */}
        {sortedCircuitTypes.length > 0 && (
          <div>
            <div className="mb-4">
              <Eyebrow>Distribution</Eyebrow>
              <h3 className="mt-1.5 text-lg font-semibold text-white tracking-tight">
                Circuit types
              </h3>
            </div>
            <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] divide-y divide-white/[0.06]">
              {sortedCircuitTypes.map(([type, count], i) => {
                const percent = (count / analytics.totalCircuits) * 100;
                return (
                  <div
                    key={type}
                    className="px-5 py-4 sm:px-6 sm:py-5 flex items-center gap-5"
                  >
                    <span className="text-[10px] font-medium tabular-nums text-white/50 tracking-wider shrink-0 w-5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="text-sm font-medium text-white truncate">{type}</span>
                        <span className="text-[11px] tabular-nums text-white/50 shrink-0">
                          {count} {count === 1 ? 'circuit' : 'circuits'} ·{' '}
                          <span className="text-white/80 font-medium">{percent.toFixed(1)}%</span>
                        </span>
                      </div>
                      <div className="h-px bg-white/5 relative overflow-hidden rounded-full">
                        <div
                          className="absolute inset-y-0 left-0 bg-elec-yellow/70 rounded-full"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

/**
 * ProgressRow — shared row for Compliance Rate + Testing Completion.
 * College editorial style: eyebrow + label + big tabular percentage, hairline bar.
 */
function ProgressRow({
  eyebrow,
  label,
  percent,
  barClass,
}: {
  eyebrow: string;
  label: string;
  percent: number;
  barClass: string;
}) {
  return (
    <div className="px-5 py-5 sm:px-7 sm:py-6 space-y-3">
      <div className="flex items-end justify-between gap-4">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <p className="mt-1 text-sm text-white">{label}</p>
        </div>
        <span className="text-2xl sm:text-3xl font-semibold tabular-nums tracking-tight leading-none text-white">
          {percent.toFixed(1)}
          <span className="text-sm text-white/60 ml-1">%</span>
        </span>
      </div>
      <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
        <div
          className={cn('h-full rounded-full transition-all duration-500', barClass)}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

export default TestAnalytics;
