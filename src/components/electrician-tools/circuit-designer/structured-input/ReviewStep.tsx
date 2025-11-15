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
    <div className="space-y-4">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Review & Generate</h2>
        <p className="text-sm sm:text-base text-muted-foreground">Check your design before generation</p>
      </div>

      {/* Validation Status */}
      {hasIssues ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Please complete all required fields before generating the design
          </AlertDescription>
        </Alert>
      ) : (
        <Alert className="bg-green-500/10 border-green-500/30">
          <CheckCircle2 className="h-4 w-4 text-green-400" />
          <AlertDescription className="text-green-400">
            All required information provided - ready to generate!
          </AlertDescription>
        </Alert>
      )}

      {/* Project Summary */}
      <Card className="p-5">
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <Building className="h-5 w-5 text-primary" />
          Project Details
        </h3>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-muted-foreground">Project Name:</span>
            <p className="font-semibold">{inputs.projectName || 'Not set'}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Location:</span>
            <p className="font-semibold">{inputs.location || 'Not set'}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Installation Type:</span>
            <Badge variant="secondary" className="capitalize">{inputs.propertyType}</Badge>
          </div>
          <div>
            <span className="text-muted-foreground">Supply:</span>
            <p className="font-semibold">
              {inputs.phases === 'single' ? 'Single Phase' : 'Three Phase'} - {inputs.voltage}V
            </p>
          </div>
        </div>
      </Card>

      {/* Circuits Summary */}
      <Card className="p-5">
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          Circuits Overview
          <Badge className="ml-auto">{inputs.circuits.length} Total</Badge>
        </h3>
        
        <div className="space-y-2 max-h-[400px] overflow-y-auto">
          {inputs.circuits.map((circuit, index) => (
            <Card key={circuit.id} className="p-3 bg-accent/30">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs">#{index + 1}</Badge>
                    <span className="font-semibold text-sm">{circuit.name || 'Unnamed Circuit'}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <span>{circuit.loadPower}W</span>
                    {circuit.cableLength && <span>• {circuit.cableLength}m cable</span>}
                    <span>• {circuit.phases === 'single' ? 'Single' : '3-Phase'}</span>
                    {circuit.specialLocation && circuit.specialLocation !== 'none' && (
                      <Badge variant="secondary" className="text-xs capitalize">
                        {circuit.specialLocation}
                      </Badge>
                    )}
                  </div>
                </div>
                {!circuit.loadPower && (
                  <AlertCircle className="h-4 w-4 text-destructive shrink-0" />
                )}
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* Warnings */}
      {missingData.length > 0 && (
        <Alert className="bg-amber-500/10 border-amber-500/30">
          <AlertCircle className="h-4 w-4 text-amber-400" />
          <AlertDescription>
            <span className="text-amber-400 font-semibold">Note:</span> {missingData.length} circuit{missingData.length > 1 ? 's' : ''} missing cable length. 
            AI will estimate based on typical installations, but results will be less accurate.
          </AlertDescription>
        </Alert>
      )}

      {/* Expected Output */}
      <Card className="p-5 bg-blue-500/5 border-blue-500/20">
        <h3 className="font-semibold mb-3">What You'll Get:</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
            <span>BS 7671 compliant cable sizing for each circuit</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
            <span>Protection device selection (MCB/RCBO ratings and curves)</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
            <span>Voltage drop calculations with compliance verification</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
            <span>Earth fault loop impedance (Zs) calculations</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
            <span>Detailed justifications referencing BS 7671 regulations</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
            <span>Materials list with specifications</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
            <span>Installation guidance and practical tips</span>
          </li>
        </ul>
      </Card>
    </div>
  );
};
