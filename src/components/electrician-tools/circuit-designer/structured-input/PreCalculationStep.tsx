/**
 * Step 5: Pre-Calculation & Validation
 * Frontend pre-flight checks before calling AI agent
 */

import { CircuitInput } from '@/types/installation-design';
import { Progress } from '@/components/ui/progress';
import {
  validateCircuit,
  estimateMaterialCost,
  MaterialEstimate,
} from '@/utils/circuit-calculations';
import { cn } from '@/lib/utils';
import { Eyebrow } from '@/components/college/primitives';

interface PreCalculationStepProps {
  circuits: CircuitInput[];
  voltage: number;
  earthingSystem: 'TN-S' | 'TN-C-S' | 'TT';
}

export const PreCalculationStep = ({
  circuits,
  voltage,
  earthingSystem,
}: PreCalculationStepProps) => {
  // Run validations
  const validations = circuits.map((circuit) => ({
    circuit,
    validation: validateCircuit(circuit, voltage, earthingSystem),
  }));

  // Calculate material estimates
  const materialEstimates: MaterialEstimate[] = circuits
    .filter((c) => c.calculatedIb && c.cableLength)
    .map((c) =>
      estimateMaterialCost(
        c.calculatedIb!,
        c.cableLength!,
        c.protectionType && c.protectionType !== 'auto' ? c.protectionType : undefined
      )
    );

  const totalMaterialCost = materialEstimates.reduce((sum, est) => sum + est.totalEstimate, 0);

  const totalErrors = validations.reduce((sum, v) => sum + v.validation.errors.length, 0);
  const totalWarnings = validations.reduce((sum, v) => sum + v.validation.warnings.length, 0);

  // Calculate readiness score
  const fieldsProvided = circuits.reduce((sum, c) => {
    let count = 0;
    if (c.installMethod && c.installMethod !== 'auto') count++;
    if (c.protectionType && c.protectionType !== 'auto') count++;
    if (c.specialLocation === 'bathroom' && c.bathroomZone) count++;
    if (c.specialLocation === 'outdoor' && c.outdoorInstall) count++;
    return sum + count;
  }, 0);

  const maxPossibleFields = circuits.length * 2;
  const readinessScore =
    maxPossibleFields > 0 ? Math.round((fieldsProvided / maxPossibleFields) * 100) : 0;

  // Overall status label
  let overallStatusLabel = 'Pass';
  let overallStatusClass = 'text-emerald-400';
  if (totalErrors > 0) {
    overallStatusLabel = 'Fail';
    overallStatusClass = 'text-red-400';
  } else if (totalWarnings > 0) {
    overallStatusLabel = 'Warning';
    overallStatusClass = 'text-amber-400';
  }

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Section header — editorial */}
      <div className="space-y-2">
        <Eyebrow>05 · VALIDATE</Eyebrow>
        <h2 className="text-[26px] sm:text-[32px] lg:text-[36px] font-semibold tracking-tight leading-[1.1] text-white">
          Pre-flight check.
        </h2>
        <p className="text-[14px] leading-relaxed text-white/85 max-w-2xl">
          We've sanity-checked the inputs. Resolve anything below before the designer runs — issues
          here usually mean a derate or earthing rethink.
        </p>
      </div>

      {/* Headline summary strip — gridline pattern */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-black border border-white/[0.08] rounded-2xl overflow-hidden">
        <div className="bg-[hsl(0_0%_10%)] px-4 py-3 sm:px-6 sm:py-4">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">
            Status
          </div>
          <div
            className={cn(
              'mt-1 text-[13px] font-semibold uppercase tracking-[0.18em]',
              overallStatusClass
            )}
          >
            {overallStatusLabel}
          </div>
        </div>
        <div className="bg-[hsl(0_0%_10%)] px-4 py-3 sm:px-6 sm:py-4">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">
            Readiness
          </div>
          <div className="mt-1 text-[13px] font-semibold text-elec-yellow tabular-nums">
            {readinessScore}%
          </div>
        </div>
        <div className="bg-[hsl(0_0%_10%)] px-4 py-3 sm:px-6 sm:py-4">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">
            Errors
          </div>
          <div
            className={cn(
              'mt-1 text-[13px] font-semibold tabular-nums',
              totalErrors > 0 ? 'text-red-400' : 'text-white'
            )}
          >
            {totalErrors}
          </div>
        </div>
        <div className="bg-[hsl(0_0%_10%)] px-4 py-3 sm:px-6 sm:py-4">
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">
            Warnings
          </div>
          <div
            className={cn(
              'mt-1 text-[13px] font-semibold tabular-nums',
              totalWarnings > 0 ? 'text-amber-400' : 'text-white'
            )}
          >
            {totalWarnings}
          </div>
        </div>
      </div>

      {/* Readiness detail */}
      <div className="space-y-3">
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
            Designer readiness
          </span>
          <span className="text-[11px] text-white/50 tabular-nums">
            {fieldsProvided}/{maxPossibleFields} fields
          </span>
        </div>
        <div className="bg-[hsl(0_0%_10%)] border border-white/[0.10] rounded-2xl p-4 sm:p-5 space-y-3">
          <div className="flex items-baseline justify-between">
            <span className="text-[12.5px] text-white/70">Details provided</span>
            <span className="text-[20px] font-semibold text-elec-yellow tabular-nums">
              {readinessScore}%
            </span>
          </div>
          <Progress value={readinessScore} className="h-1.5" />
          <p className="text-[12px] leading-relaxed text-white/65">
            {readinessScore >= 80 && 'Excellent — the designer has the context it needs.'}
            {readinessScore >= 50 &&
              readinessScore < 80 &&
              'Good — most context provided, the designer will infer the rest.'}
            {readinessScore < 50 &&
              'Limited context — the designer will infer install method, protection and other details.'}
          </p>
        </div>
      </div>

      {/* Per-circuit validation cards */}
      <div className="space-y-3">
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/60">
            Per-circuit checks
          </span>
          <span className="text-[11px] text-white/50 tabular-nums">
            {circuits.length} circuit{circuits.length !== 1 ? 's' : ''}
          </span>
        </div>
        <div className="space-y-3 sm:space-y-4">
          {validations.map(({ circuit, validation }, index) => {
            const hasErrors = validation.errors.length > 0;
            const hasWarnings = validation.warnings.length > 0;
            const statusLabel = hasErrors ? 'Fail' : hasWarnings ? 'Warning' : 'Pass';
            const statusClass = hasErrors
              ? 'text-red-400'
              : hasWarnings
                ? 'text-amber-400'
                : 'text-emerald-400';
            const borderClass = hasErrors
              ? 'border-red-500/40'
              : hasWarnings
                ? 'border-amber-500/40'
                : 'border-white/[0.10]';

            return (
              <div
                key={circuit.id}
                className={cn(
                  'bg-[hsl(0_0%_10%)] border rounded-2xl p-4 sm:p-5 transition-all',
                  borderClass
                )}
              >
                {/* Circuit header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] tabular-nums text-white/50">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={cn(
                          'text-[11px] uppercase tracking-[0.18em] font-semibold',
                          statusClass
                        )}
                      >
                        {statusLabel}
                      </span>
                    </div>
                    <div className="mt-1.5 text-[16px] sm:text-[17px] font-semibold tracking-tight leading-[1.2] text-white truncate">
                      {circuit.name || 'Unnamed circuit'}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 shrink-0 justify-end">
                    {circuit.calculatedIb && (
                      <span className="text-[11px] uppercase tracking-[0.14em] tabular-nums text-elec-yellow border border-elec-yellow/30 bg-elec-yellow/[0.06] rounded-full px-2.5 py-0.5">
                        {circuit.calculatedIb.toFixed(1)} A
                      </span>
                    )}
                    {circuit.suggestedMCB && (
                      <span className="text-[11px] uppercase tracking-[0.14em] tabular-nums text-white border border-white/15 bg-white/[0.04] rounded-full px-2.5 py-0.5">
                        {circuit.suggestedMCB} A MCB
                      </span>
                    )}
                  </div>
                </div>

                {/* Errors & warnings */}
                {(hasErrors || hasWarnings) && (
                  <div className="space-y-2 mb-3">
                    {validation.errors.map((error, i) => (
                      <div key={`error-${i}`} className="flex items-start gap-2.5 text-[12.5px]">
                        <span className="text-[10px] uppercase tracking-[0.18em] font-semibold text-red-400 shrink-0 mt-0.5 w-12">
                          Fail
                        </span>
                        <span className="text-white/85 leading-relaxed flex-1">{error}</span>
                      </div>
                    ))}
                    {validation.warnings.map((warning, i) => (
                      <div key={`warning-${i}`} className="flex items-start gap-2.5 text-[12.5px]">
                        <span className="text-[10px] uppercase tracking-[0.18em] font-semibold text-amber-400 shrink-0 mt-0.5 w-12">
                          Warn
                        </span>
                        <span className="text-white/85 leading-relaxed flex-1">{warning}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Material estimate */}
                {circuit.calculatedIb && circuit.cableLength && materialEstimates[index] && (
                  <div className="pt-3 border-t border-white/[0.08]">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55 mb-2">
                      Estimate
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-baseline justify-between gap-3 text-[12.5px]">
                        <span className="text-white/70 truncate">
                          Cable {materialEstimates[index].cableSize}mm² ×{' '}
                          {materialEstimates[index].cableLength}m
                        </span>
                        <span className="font-medium text-white tabular-nums shrink-0">
                          £{materialEstimates[index].estimatedCableCost}
                        </span>
                      </div>
                      <div className="flex items-baseline justify-between gap-3 text-[12.5px]">
                        <span className="text-white/70 truncate">
                          Protection {materialEstimates[index].protectionDevice}
                        </span>
                        <span className="font-medium text-white tabular-nums shrink-0">
                          £{materialEstimates[index].estimatedDeviceCost}
                        </span>
                      </div>
                      <div className="flex items-baseline justify-between gap-3 pt-2 border-t border-white/[0.06] text-[12.5px]">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
                          Circuit total
                        </span>
                        <span className="font-semibold text-elec-yellow tabular-nums shrink-0">
                          £{materialEstimates[index].totalEstimate}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Total cost estimate */}
      {totalMaterialCost > 0 && (
        <div className="space-y-3">
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
            Materials total
          </span>
          <div className="grid grid-cols-2 gap-px bg-black border border-white/[0.08] rounded-2xl overflow-hidden">
            <div className="bg-[hsl(0_0%_10%)] px-4 py-3 sm:px-6 sm:py-4">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">
                Estimated materials
              </div>
              <div className="mt-1 text-[13px] font-semibold text-white">
                Pre-flight estimate only
              </div>
            </div>
            <div className="bg-[hsl(0_0%_10%)] px-4 py-3 sm:px-6 sm:py-4">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">
                Total
              </div>
              <div className="mt-1 text-[18px] sm:text-[20px] font-semibold text-elec-yellow tabular-nums">
                £{totalMaterialCost.toFixed(2)}
              </div>
            </div>
          </div>
          <p className="text-[12px] leading-relaxed text-white/60">
            Excludes labour, accessories and VAT. The designer will produce a detailed materials
            list.
          </p>
        </div>
      )}

      {/* Footer note */}
      <div className="bg-[hsl(0_0%_10%)] border border-white/[0.10] rounded-2xl p-4 sm:p-5">
        <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55 mb-1.5">
          Note
        </div>
        <p className="text-[12.5px] leading-relaxed text-white/75">
          The designer performs full BS 7671 compliant calculations including voltage drop, fault
          current and derating factors. The figures above are pre-flight estimates only.
        </p>
      </div>
    </div>
  );
};
