import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle, Zap, Building, MapPin } from "lucide-react";
import { CircuitInput, DesignInputs } from "@/types/installation-design";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ReviewStepProps {
  inputs: DesignInputs;
}

export const ReviewStep = ({ inputs }: ReviewStepProps) => {
  const hasIssues = inputs.circuits.length === 0 || 
                     !inputs.projectName || 
                     !inputs.location ||
                     inputs.circuits.some(c => !c.name || !c.loadPower);

  const missingData = inputs.circuits.filter(c => !c.cableLength);

  return (
    <div className="space-y-3">
      {/* Validation Status */}
      {hasIssues ? (
        <Alert variant="destructive" className="p-2.5 sm:p-3">
          <AlertCircle className="h-3.5 w-3.5" />
          <AlertDescription className="text-xs">
            Please complete all required fields before generating the design
          </AlertDescription>
        </Alert>
      ) : (
        <Alert className="bg-green-500/10 border-green-500/30 p-2.5 sm:p-3">
          <CheckCircle2 className="h-3.5 w-3.5 text-green-400" />
          <AlertDescription className="text-xs text-green-300">
            All required information provided - ready to generate!
          </AlertDescription>
        </Alert>
      )}

      {/* Project Summary */}
      <Card className="p-4 sm:p-5">
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Building className="h-4 w-4 text-elec-yellow" />
          Project Details
        </h3>
        <div className="grid gap-3 text-xs sm:text-sm">
          <div>
            <p className="text-muted-foreground mb-0.5">Project Name:</p>
            <p className="font-medium text-foreground">{inputs.projectName || 'Not set'}</p>
          </div>
          <div>
            <p className="text-muted-foreground mb-0.5">Location:</p>
            <p className="font-medium text-foreground">{inputs.location || 'Not set'}</p>
          </div>
          <div className="pt-2 border-t border-border/20 flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Type:</span>
              <Badge variant="secondary" className="text-xs capitalize">{inputs.propertyType}</Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Supply:</span>
              <span className="font-medium text-foreground text-xs">
                {inputs.phases === 'single' ? 'Single' : '3-Phase'} {inputs.voltage}V
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Circuits Summary */}
      <Card className="p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Zap className="h-4 w-4 text-elec-yellow" />
            Circuits Overview
          </h3>
          <Badge variant="outline" className="text-xs">{inputs.circuits.length} Total</Badge>
        </div>
        
      <div className="space-y-0 divide-y divide-border/40">
        {inputs.circuits.map((circuit, index) => (
          <div key={circuit.id} className="py-3 first:pt-0">
            <div className="flex items-center gap-3 mb-2">
              <Badge variant="outline" className="text-xs shrink-0">#{index + 1}</Badge>
              <span className="font-semibold text-base text-foreground flex-1 truncate">
                {circuit.name || 'Unnamed Circuit'}
              </span>
              {!circuit.loadPower && (
                <AlertCircle className="h-4 w-4 text-destructive shrink-0" />
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm pl-8">
              <div>
                <span className="text-muted-foreground text-xs">Power:</span>
                <span className="font-medium text-foreground ml-1.5">{circuit.loadPower}W</span>
              </div>
              <div>
                <span className="text-muted-foreground text-xs">Length:</span>
                <span className="font-medium text-foreground ml-1.5">
                  {circuit.cableLength ? `${circuit.cableLength}m` : 'Auto'}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground text-xs">Phase:</span>
                <span className="font-medium text-foreground ml-1.5">
                  {circuit.phases === 'single' ? 'Single' : '3-Phase'}
                </span>
              </div>
              {circuit.specialLocation && circuit.specialLocation !== 'none' && (
                <div>
                  <span className="text-muted-foreground text-xs">Location:</span>
                  <Badge variant="warning" className="text-xs capitalize ml-1.5">
                    {circuit.specialLocation}
                  </Badge>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      </Card>

      {/* Warnings */}
      {missingData.length > 0 && (
        <Alert className="bg-amber-500/10 border-amber-500/30 p-2.5 sm:p-3">
          <AlertCircle className="h-3.5 w-3.5 text-amber-400" />
          <AlertDescription className="text-xs">
            <span className="text-amber-300 font-medium">Note:</span> {missingData.length} circuit{missingData.length > 1 ? 's' : ''} missing cable length. 
            AI will estimate based on typical installations.
          </AlertDescription>
        </Alert>
      )}

      {/* Expected Output */}
      <Card className="p-4 sm:p-5 bg-blue-500/5 border-blue-500/20">
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-green-400" />
          What You'll Get
        </h3>
      <div className="grid gap-2.5 text-sm text-left">
        <div className="flex items-start gap-2.5">
          <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
          <span className="text-foreground text-left">BS 7671 compliant cable sizing for each circuit</span>
        </div>
        <div className="flex items-start gap-2.5">
          <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
          <span className="text-foreground text-left">Protection device selection (MCB/RCBO ratings and curves)</span>
        </div>
        <div className="flex items-start gap-2.5">
          <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
          <span className="text-foreground text-left">Voltage drop calculations with compliance verification</span>
        </div>
        <div className="flex items-start gap-2.5">
          <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
          <span className="text-foreground text-left">Earth fault loop impedance (Zs) calculations</span>
        </div>
        <div className="flex items-start gap-2.5">
          <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
          <span className="text-foreground text-left">Detailed justifications referencing BS 7671 regulations</span>
        </div>
        <div className="flex items-start gap-2.5">
          <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
          <span className="text-foreground text-left">Materials list with specifications</span>
        </div>
        <div className="flex items-start gap-2.5">
          <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
          <span className="text-foreground text-left">Installation guidance and practical tips</span>
        </div>
      </div>
      </Card>
    </div>
  );
};
