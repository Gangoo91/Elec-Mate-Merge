/**
 * Step 5: Pre-Calculation & Validation
 * Frontend pre-flight checks before calling AI agent
 */

import { CircuitInput } from "@/types/installation-design";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Zap, 
  Cable, 
  Shield,
  DollarSign,
  Info
} from "lucide-react";
import { validateCircuit, estimateMaterialCost, MaterialEstimate } from "@/utils/circuit-calculations";

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
  
  const maxPossibleFields = circuits.length * 2; // installMethod + protectionType for each
  const readinessScore = Math.round((fieldsProvided / maxPossibleFields) * 100);

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-elec-light mb-2">Pre-Flight Check</h2>
        <p className="text-elec-light/70">
          Validating circuits and estimating materials before AI processing
        </p>
      </div>

      {/* Readiness Score */}
      <Card className="bg-gradient-to-br from-elec-yellow/10 to-primary/10 border-elec-yellow/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-elec-light flex items-center gap-2">
            <Zap className="h-5 w-5 text-elec-yellow" />
            AI Processing Readiness
          </CardTitle>
          <CardDescription className="text-elec-light/60">
            More details = faster AI processing time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-elec-light/70">Details Provided</span>
              <span className="text-elec-yellow font-bold">{readinessScore}%</span>
            </div>
            <Progress value={readinessScore} className="h-2" />
            <p className="text-xs text-elec-light/60">
              {readinessScore >= 80 && "Excellent! AI will process this very quickly ⚡"}
              {readinessScore >= 50 && readinessScore < 80 && "Good! AI will have most details it needs"}
              {readinessScore < 50 && "AI will need to infer some details (may take longer)"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Validation Summary */}
      {totalErrors > 0 && (
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertTitle>Validation Errors ({totalErrors})</AlertTitle>
          <AlertDescription>
            Please fix errors before generating design
          </AlertDescription>
        </Alert>
      )}

      {totalWarnings > 0 && (
        <Alert className="bg-amber-500/10 border-amber-500/30 text-amber-200">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Warnings ({totalWarnings})</AlertTitle>
          <AlertDescription className="text-amber-200/80">
            Review warnings below - design will proceed with assumptions
          </AlertDescription>
        </Alert>
      )}

      {totalErrors === 0 && totalWarnings === 0 && (
        <Alert className="bg-green-500/10 border-green-500/30 text-green-200">
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>All Circuits Valid</AlertTitle>
          <AlertDescription className="text-green-200/80">
            Ready to generate BS 7671 compliant design
          </AlertDescription>
        </Alert>
      )}

      {/* Circuit-by-Circuit Validation */}
      <div className="space-y-3">
        {validations.map(({ circuit, validation }, index) => (
          <Card key={circuit.id} className="bg-card border-elec-yellow/20">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base text-elec-light flex items-center gap-2">
                  {validation.isValid ? (
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                  ) : (
                    <XCircle className="h-4 w-4 text-destructive" />
                  )}
                  {circuit.name}
                </CardTitle>
                <div className="flex gap-2">
                  {circuit.calculatedIb && (
                    <Badge variant="outline" className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30 text-xs">
                      {circuit.calculatedIb.toFixed(1)}A
                    </Badge>
                  )}
                  {circuit.suggestedMCB && (
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 text-xs">
                      {circuit.suggestedMCB}A MCB
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>

            {(validation.errors.length > 0 || validation.warnings.length > 0) && (
              <CardContent className="space-y-2">
                
                {/* Errors */}
                {validation.errors.map((error, i) => (
                  <div key={`error-${i}`} className="flex items-start gap-2 text-sm text-destructive">
                    <XCircle className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>{error}</span>
                  </div>
                ))}

                {/* Warnings */}
                {validation.warnings.map((warning, i) => (
                  <div key={`warning-${i}`} className="flex items-start gap-2 text-sm text-amber-200">
                    <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>{warning}</span>
                  </div>
                ))}

                {/* Material Estimate */}
                {circuit.calculatedIb && circuit.cableLength && materialEstimates[index] && (
                  <div className="mt-3 pt-3 border-t border-border/20 space-y-1 text-xs text-elec-light/70">
                    <div className="flex items-center gap-2">
                      <Cable className="h-3 w-3 text-elec-yellow" />
                      <span>Est. Cable: {materialEstimates[index].cableSize}mm² × {materialEstimates[index].cableLength}m ≈ £{materialEstimates[index].estimatedCableCost}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-3 w-3 text-elec-yellow" />
                      <span>Protection: {materialEstimates[index].protectionDevice} ≈ £{materialEstimates[index].estimatedDeviceCost}</span>
                    </div>
                    <div className="flex items-center gap-2 font-semibold text-elec-yellow">
                      <DollarSign className="h-3 w-3" />
                      <span>Circuit Total: £{materialEstimates[index].totalEstimate}</span>
                    </div>
                  </div>
                )}

              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {/* Total Cost Estimate */}
      {totalMaterialCost > 0 && (
        <Card className="bg-gradient-to-br from-primary/10 to-elec-yellow/10 border-primary/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-elec-yellow" />
                <span className="text-lg font-semibold text-elec-light">Estimated Materials Cost</span>
              </div>
              <span className="text-2xl font-bold text-elec-yellow">£{totalMaterialCost.toFixed(2)}</span>
            </div>
            <p className="text-xs text-elec-light/60 mt-2">
              Excludes labour, accessories, and VAT. AI will provide detailed materials list.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Info Footer */}
      <Alert className="bg-elec-yellow/10 border-elec-yellow/30">
        <Info className="h-4 w-4 text-elec-yellow" />
        <AlertDescription className="text-elec-light/80 text-sm">
          AI will perform full BS 7671 compliance calculations including voltage drop, fault current, and derating factors.
          These estimates are for pre-flight validation only.
        </AlertDescription>
      </Alert>
    </div>
  );
};
