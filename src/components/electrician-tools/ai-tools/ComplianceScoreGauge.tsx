/**
 * ComplianceScoreGauge — editorial compliance overview gauge.
 *
 * Drops the green/red/amber flood backgrounds and inline icons. Three-cell
 * stat strip (pass / fail / testing) with semantic text accents only,
 * bar trio with elec-yellow primary + semantic toned bars, prominent
 * tabular-num overall score.
 */

import { Progress } from '@/components/ui/progress';
import { Eyebrow } from '@/components/college/primitives';
import { cn } from '@/lib/utils';

interface ComplianceScoreGaugeProps {
  passCount: number;
  failCount: number;
  requiresTestingCount: number;
  totalChecks: number;
}

export const ComplianceScoreGauge = ({
  passCount,
  failCount,
  requiresTestingCount,
  totalChecks,
}: ComplianceScoreGaugeProps) => {
  const passPercentage = totalChecks > 0 ? Math.round((passCount / totalChecks) * 100) : 0;
  const failPercentage = totalChecks > 0 ? Math.round((failCount / totalChecks) * 100) : 0;
  const testingPercentage =
    totalChecks > 0 ? Math.round((requiresTestingCount / totalChecks) * 100) : 0;

  const status =
    failCount > 0
      ? { label: 'Action required', tone: 'text-red-300 border-red-500/40 bg-red-500/[0.08]' }
      : requiresTestingCount > 0
        ? {
            label: 'Testing required',
            tone: 'text-amber-300 border-amber-500/40 bg-amber-500/[0.08]',
          }
        : {
            label: 'Compliant',
            tone: 'text-emerald-300 border-emerald-500/40 bg-emerald-500/[0.08]',
          };

  return (
    <section className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-5 sm:p-6">
      {/* Header */}
      <div className="flex items-baseline justify-between gap-3 flex-wrap">
        <Eyebrow>COMPLIANCE OVERVIEW</Eyebrow>
        <span
          className={cn(
            'inline-flex items-center text-[10px] font-semibold uppercase tracking-[0.14em] border rounded-md px-1.5 py-0.5',
            status.tone
          )}
        >
          {status.label}
        </span>
      </div>

      {/* Stat strip */}
      <dl className="mt-4 grid grid-cols-3 gap-3 text-center">
        <Cell value={passCount} label="Passed" tone="text-emerald-300" />
        <Cell value={failCount} label="Failed" tone="text-red-300" />
        <Cell value={requiresTestingCount} label="Testing" tone="text-amber-300" />
      </dl>

      {/* Bars */}
      <div className="mt-5 pt-4 border-t border-white/[0.06] space-y-3">
        <Bar label="Pass rate" value={passPercentage} tone="text-emerald-300" />
        {failCount > 0 && (
          <Bar label="Failures" value={failPercentage} tone="text-red-300" />
        )}
        {requiresTestingCount > 0 && (
          <Bar label="Requires testing" value={testingPercentage} tone="text-amber-300" />
        )}
      </div>

      {/* Overall */}
      <div className="mt-5 pt-4 border-t border-white/[0.06]">
        <Eyebrow>OVERALL SCORE</Eyebrow>
        <div className="mt-1.5 flex items-baseline gap-2">
          <span className="text-[34px] sm:text-[40px] font-semibold tabular-nums text-elec-yellow">
            {passPercentage}%
          </span>
          <span className="text-[11.5px] text-white/65">of checks passed</span>
        </div>
      </div>
    </section>
  );
};

const Cell = ({ value, label, tone }: { value: number; label: string; tone: string }) => (
  <div>
    <dd className={cn('text-[24px] font-semibold tabular-nums', tone)}>{value}</dd>
    <dt className="mt-0.5 text-[10px] uppercase tracking-[0.14em] font-semibold text-white/65">
      {label}
    </dt>
  </div>
);

const Bar = ({ label, value, tone }: { label: string; value: number; tone: string }) => (
  <div>
    <div className="flex items-baseline justify-between gap-2">
      <span className="text-[10.5px] uppercase tracking-[0.14em] font-semibold text-white/65">
        {label}
      </span>
      <span className={cn('text-[11.5px] font-semibold tabular-nums', tone)}>{value}%</span>
    </div>
    <Progress value={value} className="mt-1.5 h-1.5" />
  </div>
);
