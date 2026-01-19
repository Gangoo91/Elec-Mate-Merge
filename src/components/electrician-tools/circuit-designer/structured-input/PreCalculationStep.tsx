/**
 * Step 5: Pre-Calculation & Validation
 * Frontend pre-flight checks before calling AI agent
 */

import { CircuitInput } from "@/types/installation-design";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Zap,
  Cable,
  Shield,
  PoundSterling,
  Info,
  Gauge
} from "lucide-react";
import { validateCircuit, estimateMaterialCost, MaterialEstimate } from "@/utils/circuit-calculations";
import { cn } from "@/lib/utils";

interface PreCalculationStepProps {
  circuits: CircuitInput[];
  voltage: number;
  earthingSystem: 'TN-S' | 'TN-C-S' | 'TT';
}

export const PreCalculationStep = ({ circuits, voltage, earthingSystem }: PreCalculationStepProps) => {

  // Run validations
  const validations = circuits.map(circuit => ({
    circuit,
    validation: validateCircuit(circuit, voltage, earthingSystem),
  }));

  // Calculate material estimates
  const materialEstimates: MaterialEstimate[] = circuits
    .filter(c => c.calculatedIb && c.cableLength)
    .map(c => estimateMaterialCost(
      c.calculatedIb!,
      c.cableLength!,
      c.protectionType && c.protectionType !== 'auto' ? c.protectionType : undefined
    ));

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
  const readinessScore = maxPossibleFields > 0 ? Math.round((fieldsProvided / maxPossibleFields) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20">
          <Gauge className="h-5 w-5 text-elec-yellow" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">Pre-Flight Check</h2>
          <p className="text-sm text-white/50">Validating before AI processing</p>
        </div>
      </div>

      {/* AI Processing Readiness */}
      <div
        className={cn(
          "p-4 rounded-xl",
          "bg-white/5 backdrop-blur border border-elec-yellow/20"
        )}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-elec-yellow/10">
            <Zap className="h-5 w-5 text-elec-yellow" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-white">AI Processing Readiness</h3>
            <p className="text-xs text-white/60">More details = faster AI processing time</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/70">Details Provided</span>
            <span className="text-2xl font-bold text-elec-yellow">{readinessScore}%</span>
          </div>
          <Progress value={readinessScore} className="h-2" />
          <p className="text-xs text-white/60">
            {readinessScore >= 80 && "Excellent! AI will process this very quickly"}
            {readinessScore >= 50 && readinessScore < 80 && "Good! AI will have most details it needs"}
            {readinessScore < 50 && "AI will need to infer some details (may take longer)"}
          </p>
        </div>
      </div>

      {/* Validation Status */}
      {totalErrors === 0 && totalWarnings === 0 && (
        <div
          className={cn(
            "flex items-start gap-3 p-4 rounded-xl border",
            "bg-green-500/10 border-green-500/30"
          )}
        >
          <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-white mb-0.5">All Circuits Valid</h4>
            <p className="text-xs text-green-300">Ready to generate BS 7671 compliant design</p>
          </div>
        </div>
      )}

      {totalWarnings > 0 && (
        <div
          className={cn(
            "flex items-start gap-3 p-4 rounded-xl border",
            "bg-orange-500/10 border-orange-500/30"
          )}
        >
          <AlertTriangle className="h-5 w-5 text-orange-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-white mb-0.5">
              Warnings ({totalWarnings})
            </h4>
            <p className="text-xs text-orange-200">
              Review warnings below - design will proceed with assumptions
            </p>
          </div>
        </div>
      )}

      {totalErrors > 0 && (
        <div
          className={cn(
            "flex items-start gap-3 p-4 rounded-xl border",
            "bg-red-500/10 border-red-500/30"
          )}
        >
          <XCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-white mb-0.5">
              Validation Errors ({totalErrors})
            </h4>
            <p className="text-xs text-red-200">
              Please fix errors before generating design
            </p>
          </div>
        </div>
      )}

      {/* Circuit Validation Cards */}
      <div className="space-y-3">
        {validations.map(({ circuit, validation }, index) => (
          <div
            key={circuit.id}
            className={cn(
              "p-4 rounded-xl",
              "bg-white/5 backdrop-blur border",
              validation.isValid ? "border-white/10" : "border-red-500/30",
              "transition-all duration-ios-fast"
            )}
          >
            {/* Circuit Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                {validation.isValid ? (
                  <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-400 shrink-0" />
                )}
                <span className="font-semibold text-sm text-white truncate">
                  {circuit.name || 'Unnamed Circuit'}
                </span>
              </div>
              <div className="flex gap-2 shrink-0">
                {circuit.calculatedIb && (
                  <Badge className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30 text-xs">
                    {circuit.calculatedIb.toFixed(1)}A
                  </Badge>
                )}
                {circuit.suggestedMCB && (
                  <Badge className="bg-white/10 text-white/80 border-white/20 text-xs">
                    {circuit.suggestedMCB}A MCB
                  </Badge>
                )}
              </div>
            </div>

            {/* Errors & Warnings */}
            {(validation.errors.length > 0 || validation.warnings.length > 0) && (
              <div className="space-y-2 mb-3">
                {validation.errors.map((error, i) => (
                  <div key={`error-${i}`} className="flex items-start gap-2 text-xs">
                    <XCircle className="h-3.5 w-3.5 mt-0.5 text-red-400 shrink-0" />
                    <span className="text-red-300">{error}</span>
                  </div>
                ))}
                {validation.warnings.map((warning, i) => (
                  <div key={`warning-${i}`} className="flex items-start gap-2 text-xs">
                    <AlertTriangle className="h-3.5 w-3.5 mt-0.5 text-orange-400 shrink-0" />
                    <span className="text-orange-200">{warning}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Material Estimate */}
            {circuit.calculatedIb && circuit.cableLength && materialEstimates[index] && (
              <div className="pt-3 border-t border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-xs text-white/70">
                  <Cable className="h-3.5 w-3.5 text-elec-yellow shrink-0" />
                  <span className="flex-1 truncate">
                    Cable: {materialEstimates[index].cableSize}mm² × {materialEstimates[index].cableLength}m
                  </span>
                  <span className="font-medium text-white shrink-0">
                    £{materialEstimates[index].estimatedCableCost}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/70">
                  <Shield className="h-3.5 w-3.5 text-elec-yellow shrink-0" />
                  <span className="flex-1 truncate">
                    Protection: {materialEstimates[index].protectionDevice}
                  </span>
                  <span className="font-medium text-white shrink-0">
                    £{materialEstimates[index].estimatedDeviceCost}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-elec-yellow pt-2 border-t border-white/5">
                  <PoundSterling className="h-3.5 w-3.5 shrink-0" />
                  <span className="flex-1">Circuit Total</span>
                  <span className="shrink-0">£{materialEstimates[index].totalEstimate}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Total Cost Estimate */}
      {totalMaterialCost > 0 && (
        <div
          className={cn(
            "p-4 rounded-xl",
            "bg-white/5 backdrop-blur border border-elec-yellow/20"
          )}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-elec-yellow/10">
                <PoundSterling className="h-5 w-5 text-elec-yellow" />
              </div>
              <span className="text-base font-semibold text-white">Estimated Materials</span>
            </div>
            <span className="text-2xl font-bold text-elec-yellow">
              £{totalMaterialCost.toFixed(2)}
            </span>
          </div>
          <p className="text-xs text-white/50 mt-3 pl-14">
            Excludes labour, accessories, and VAT. AI will provide detailed materials list.
          </p>
        </div>
      )}

      {/* Info Footer */}
      <div
        className={cn(
          "flex items-start gap-2 p-3 rounded-xl border",
          "bg-white/5 backdrop-blur border-blue-500/30"
        )}
      >
        <Info className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
        <p className="text-xs leading-relaxed text-blue-200">
          AI will perform full BS 7671 compliance calculations including voltage drop, fault current, and derating factors.
          These estimates are for pre-flight validation only.
        </p>
      </div>
    </div>
  );
};
