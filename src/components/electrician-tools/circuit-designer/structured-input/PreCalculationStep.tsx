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
import { StepHeader, Section, ItemCard, Fact, Hint } from './wizardUi';

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

  // Overall status
  let overallStatusLabel = 'Pass';
  let overallTone: 'good' | 'warn' | 'bad' = 'good';
  if (totalErrors > 0) {
    overallStatusLabel = 'Fail';
    overallTone = 'bad';
  } else if (totalWarnings > 0) {
    overallStatusLabel = 'Warning';
    overallTone = 'warn';
  }

  return (
    <div className="space-y-8">
      <StepHeader
        title="Pre-flight check"
        description="We've sanity-checked the inputs. Resolve anything below before the designer runs. Issues here usually mean a derate or an earthing rethink."
      />

      {/* Headline figures */}
      <div className="grid grid-cols-4 gap-3 border-y border-white/[0.10] py-4">
        <Fact label="Status" value={overallStatusLabel} tone={overallTone} />
        <Fact label="Readiness" value={`${readinessScore}%`} />
        <Fact label="Errors" value={totalErrors} tone={totalErrors > 0 ? 'bad' : undefined} />
        <Fact
          label="Warnings"
          value={totalWarnings}
          tone={totalWarnings > 0 ? 'warn' : undefined}
        />
      </div>

      {/* Readiness detail */}
      <Section title="Designer readiness" aside={`${fieldsProvided}/${maxPossibleFields} fields`}>
        <div className="space-y-2">
          <div className="flex items-baseline justify-between">
            <span className="text-[13px] text-white">Details provided</span>
            <span className="text-[15px] font-semibold tabular-nums text-white">
              {readinessScore}%
            </span>
          </div>
          <Progress value={readinessScore} className="h-1.5" />
          <Hint>
            {readinessScore >= 80 && 'Excellent. The designer has the context it needs.'}
            {readinessScore >= 50 &&
              readinessScore < 80 &&
              'Good. Most context provided, the designer will infer the rest.'}
            {readinessScore < 50 &&
              'Limited context. The designer will infer install method, protection and other details.'}
          </Hint>
        </div>
      </Section>

      {/* Per-circuit validation cards */}
      <Section
        title="Per-circuit checks"
        aside={`${circuits.length} circuit${circuits.length !== 1 ? 's' : ''}`}
      >
        <div className="space-y-3">
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
              ? 'border-red-500/40 sm:border-red-500/40'
              : hasWarnings
                ? 'border-amber-500/40 sm:border-amber-500/40'
                : '';

            return (
              <ItemCard key={circuit.id} className={borderClass}>
                {/* Circuit header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <h4 className="truncate text-[15px] font-semibold text-white">
                      {index + 1}. {circuit.name || 'Unnamed circuit'}
                    </h4>
                    <p className="mt-0.5 text-[13px] text-white">
                      <span className={cn('font-semibold', statusClass)}>{statusLabel}</span>
                      {circuit.calculatedIb && (
                        <span className="tabular-nums"> · {circuit.calculatedIb.toFixed(1)} A</span>
                      )}
                      {circuit.suggestedMCB && (
                        <span className="tabular-nums"> · {circuit.suggestedMCB} A MCB</span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Errors & warnings */}
                {(hasErrors || hasWarnings) && (
                  <ul className="mt-3 space-y-2">
                    {validation.errors.map((error, i) => (
                      <li key={`error-${i}`} className="flex items-start gap-2.5 text-[13px]">
                        <span className="w-14 shrink-0 font-semibold text-red-400">Fail</span>
                        <span className="flex-1 leading-relaxed text-white">{error}</span>
                      </li>
                    ))}
                    {validation.warnings.map((warning, i) => (
                      <li key={`warning-${i}`} className="flex items-start gap-2.5 text-[13px]">
                        <span className="w-14 shrink-0 font-semibold text-amber-400">Warning</span>
                        <span className="flex-1 leading-relaxed text-white">{warning}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Material estimate */}
                {circuit.calculatedIb && circuit.cableLength && materialEstimates[index] && (
                  <div className="mt-3 space-y-1.5 border-t border-white/[0.08] pt-3 text-[13px]">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="truncate text-white">
                        Cable {materialEstimates[index].cableSize}mm² ×{' '}
                        {materialEstimates[index].cableLength}m
                      </span>
                      <span className="shrink-0 tabular-nums text-white">
                        £{materialEstimates[index].estimatedCableCost}
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="truncate text-white">
                        Protection {materialEstimates[index].protectionDevice}
                      </span>
                      <span className="shrink-0 tabular-nums text-white">
                        £{materialEstimates[index].estimatedDeviceCost}
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between gap-3 font-semibold">
                      <span className="text-white">Circuit total</span>
                      <span className="shrink-0 tabular-nums text-white">
                        £{materialEstimates[index].totalEstimate}
                      </span>
                    </div>
                  </div>
                )}
              </ItemCard>
            );
          })}
        </div>
      </Section>

      {/* Total cost estimate */}
      {totalMaterialCost > 0 && (
        <Section title="Materials total">
          <div className="flex items-baseline justify-between gap-3 border-y border-white/[0.10] py-4">
            <span className="text-[14px] text-white">Estimated materials, pre-flight only</span>
            <span className="text-[20px] font-semibold tabular-nums text-white">
              £{totalMaterialCost.toFixed(2)}
            </span>
          </div>
          <Hint>
            Excludes labour, accessories and VAT. The designer will produce a detailed materials
            list.
          </Hint>
        </Section>
      )}

      {/* Footer note */}
      <div className="rounded-xl border border-white/[0.12] bg-white/[0.05] px-4 py-3">
        <div className="text-[13px] font-semibold text-white">Note</div>
        <p className="mt-1 text-[13px] leading-relaxed text-white">
          The designer performs full BS 7671 compliant calculations including voltage drop, fault
          current and derating factors. The figures above are pre-flight estimates only.
        </p>
      </div>
    </div>
  );
};
