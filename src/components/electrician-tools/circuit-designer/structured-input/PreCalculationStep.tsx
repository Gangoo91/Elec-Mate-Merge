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
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-1">Pre-Flight Check</h2>
        <p className="text-sm text-foreground">
          Validating circuits and estimating materials before AI processing
        </p>
      </div>

      {/* AI Processing Readiness */}
      <Card className="border-elec-yellow/20 bg-elec-card mb-3">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-elec-yellow/10 flex items-center justify-center shrink-0">
              <Zap className="h-4 w-4 text-elec-yellow" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-foreground">AI Processing Readiness</h3>
              <p className="text-xs text-foreground/80">More details = faster AI processing time</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-foreground/70">Details Provided</span>
              <span className="text-elec-yellow font-bold text-lg">{readinessScore}%</span>
            </div>
            <Progress value={readinessScore} className="h-2" />
            <p className="text-xs text-foreground">
              {readinessScore >= 80 && "⚡ Excellent! AI will process this very quickly"}
              {readinessScore >= 50 && readinessScore < 80 && "✓ Good! AI will have most details it needs"}
              {readinessScore < 50 && "AI will need to infer some details (may take longer)"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Validation Status */}
      {totalErrors === 0 && totalWarnings === 0 && (
        <Alert className="bg-green-500/10 border-green-500/30 mb-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0" />
            <div className="flex-1 min-w-0">
              <AlertTitle className="text-sm font-semibold text-foreground mb-0.5">All Circuits Valid</AlertTitle>
              <AlertDescription className="text-xs text-foreground/90">
                Ready to generate BS 7671 compliant design
              </AlertDescription>
            </div>
          </div>
        </Alert>
      )}

      {totalWarnings > 0 && (
        <Alert className="bg-amber-500/10 border-amber-500/30 mb-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
            <div className="flex-1 min-w-0">
              <AlertTitle className="text-sm font-semibold text-foreground mb-0.5">
                Warnings ({totalWarnings})
              </AlertTitle>
              <AlertDescription className="text-xs text-foreground/90">
                Review warnings below - design will proceed with assumptions
              </AlertDescription>
            </div>
          </div>
        </Alert>
      )}

      {totalErrors > 0 && (
        <Alert variant="destructive" className="mb-3">
          <div className="flex items-center gap-2">
            <XCircle className="h-4 w-4 shrink-0" />
            <div className="flex-1 min-w-0">
              <AlertTitle className="text-sm font-semibold mb-0.5">
                Validation Errors ({totalErrors})
              </AlertTitle>
              <AlertDescription className="text-xs">
                Please fix errors before generating design
              </AlertDescription>
            </div>
          </div>
        </Alert>
      )}

      {/* Circuit Validation Cards */}
      <div className="space-y-2">
        {validations.map(({ circuit, validation }, index) => (
          <Card key={circuit.id} className="border-elec-yellow/10 bg-elec-card">
            <CardContent className="p-3">
              {/* Circuit Header */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {validation.isValid ? (
                    <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0" />
                  ) : (
                    <XCircle className="h-4 w-4 text-destructive shrink-0" />
                  )}
                  <span className="font-semibold text-sm text-foreground truncate">
                    {circuit.name}
                  </span>
                </div>
                <div className="flex gap-1.5 shrink-0">
                  {circuit.calculatedIb && (
                    <Badge variant="outline" className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30 text-[10px] px-1.5 py-0.5">
                      {circuit.calculatedIb.toFixed(1)}A
                    </Badge>
                  )}
                  {circuit.suggestedMCB && (
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 text-[10px] px-1.5 py-0.5">
                      {circuit.suggestedMCB}A MCB
                    </Badge>
                  )}
                </div>
              </div>

              {/* Errors & Warnings */}
              {(validation.errors.length > 0 || validation.warnings.length > 0) && (
                <div className="space-y-1.5">
                  {validation.errors.map((error, i) => (
                    <div key={`error-${i}`} className="flex items-start gap-2 text-xs text-destructive">
                      <XCircle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                      <span className="flex-1">{error}</span>
                    </div>
                  ))}
                  {validation.warnings.map((warning, i) => (
                    <div key={`warning-${i}`} className="flex items-start gap-2 text-xs text-amber-300">
                      <AlertTriangle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                      <span className="flex-1 text-left">{warning}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Material Estimate */}
              {circuit.calculatedIb && circuit.cableLength && materialEstimates[index] && (
                <div className="mt-2.5 pt-2.5 border-t border-border/20 space-y-1 text-[11px]">
                  <div className="flex items-center gap-2 text-foreground/80">
                    <Cable className="h-3 w-3 text-elec-yellow shrink-0" />
                    <span className="flex-1 truncate">
                      Cable: {materialEstimates[index].cableSize}mm² × {materialEstimates[index].cableLength}m
                    </span>
                    <span className="font-medium text-foreground shrink-0">
                      £{materialEstimates[index].estimatedCableCost}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground/80">
                    <Shield className="h-3 w-3 text-elec-yellow shrink-0" />
                    <span className="flex-1 truncate">
                      Protection: {materialEstimates[index].protectionDevice}
                    </span>
                    <span className="font-medium text-foreground shrink-0">
                      £{materialEstimates[index].estimatedDeviceCost}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 font-semibold text-elec-yellow pt-1 border-t border-border/10">
                    <DollarSign className="h-3 w-3 shrink-0" />
                    <span className="flex-1">Circuit Total</span>
                    <span className="shrink-0">£{materialEstimates[index].totalEstimate}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Total Cost Estimate */}
      {totalMaterialCost > 0 && (
        <Card className="border-primary/20 bg-elec-card mt-3">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-elec-yellow/10 flex items-center justify-center">
                  <DollarSign className="h-4 w-4 text-elec-yellow" />
                </div>
                <span className="text-base font-semibold text-foreground">Estimated Materials Cost</span>
              </div>
              <span className="text-xl sm:text-2xl font-bold text-elec-yellow">
                £{totalMaterialCost.toFixed(2)}
              </span>
            </div>
            <p className="text-xs text-foreground/80 mt-2 pl-10">
              Excludes labour, accessories, and VAT. AI will provide detailed materials list.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Info Footer */}
      <Alert className="bg-elec-yellow/5 border-elec-yellow/20 mt-3">
        <div className="flex items-start gap-2">
          <Info className="h-4 w-4 text-elec-yellow shrink-0 mt-0.5" />
          <AlertDescription className="text-xs text-foreground/90">
            AI will perform full BS 7671 compliance calculations including voltage drop, fault current, and derating factors.
            These estimates are for pre-flight validation only.
          </AlertDescription>
        </div>
      </Alert>
    </div>
  );
};
