import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  AlertCircle,
  Zap,
  Building2,
  ClipboardCheck,
  Sparkles
} from "lucide-react";
import { DesignInputs } from "@/types/installation-design";
import { cn } from "@/lib/utils";

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
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20">
          <ClipboardCheck className="h-5 w-5 text-elec-yellow" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">Review & Generate</h2>
          <p className="text-sm text-white/50">Confirm your design parameters</p>
        </div>
      </div>

      {/* Validation Status */}
      {hasIssues ? (
        <div
          className={cn(
            "flex items-start gap-3 p-4 rounded-xl border",
            "bg-red-500/10 border-red-500/30"
          )}
        >
          <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-white mb-0.5">Missing Information</h4>
            <p className="text-xs text-red-200">
              Please complete all required fields before generating the design
            </p>
          </div>
        </div>
      ) : (
        <div
          className={cn(
            "flex items-start gap-3 p-4 rounded-xl border",
            "bg-green-500/10 border-green-500/30"
          )}
        >
          <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-white mb-0.5">Ready to Generate</h4>
            <p className="text-xs text-green-300">
              All required information provided
            </p>
          </div>
        </div>
      )}

      {/* Project Summary */}
      <div
        className={cn(
          "p-4 rounded-xl",
          "bg-white/5 backdrop-blur border border-white/10"
        )}
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-elec-yellow/10">
            <Building2 className="h-4 w-4 text-elec-yellow" />
          </div>
          <h3 className="text-sm font-semibold text-white">Project Details</h3>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-white/50 mb-1">Project Name</p>
              <p className="text-sm font-medium text-white">
                {inputs.projectName || <span className="text-red-400">Not set</span>}
              </p>
            </div>
            <div>
              <p className="text-xs text-white/50 mb-1">Location</p>
              <p className="text-sm font-medium text-white">
                {inputs.location || <span className="text-red-400">Not set</span>}
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-2">
            <Badge className="bg-white/10 text-white/80 border-0 text-xs capitalize">
              {inputs.propertyType}
            </Badge>
            <Badge className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/20 text-xs">
              {inputs.phases === 'single' ? 'Single Phase' : '3-Phase'} {inputs.voltage}V
            </Badge>
            <Badge className="bg-white/10 text-white/80 border-0 text-xs">
              {inputs.earthingSystem}
            </Badge>
          </div>
        </div>
      </div>

      {/* Circuits Summary */}
      <div
        className={cn(
          "p-4 rounded-xl",
          "bg-white/5 backdrop-blur border border-white/10"
        )}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-elec-yellow/10">
              <Zap className="h-4 w-4 text-elec-yellow" />
            </div>
            <h3 className="text-sm font-semibold text-white">Circuits Overview</h3>
          </div>
          <Badge className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/20 text-xs">
            {inputs.circuits.length} Circuit{inputs.circuits.length !== 1 ? 's' : ''}
          </Badge>
        </div>

        <div className="space-y-3">
          {inputs.circuits.map((circuit, index) => (
            <div
              key={circuit.id}
              className={cn(
                "p-3 rounded-lg",
                "bg-white/5 border border-white/10"
              )}
            >
              <div className="flex items-center gap-2 mb-2">
                <Badge
                  variant="outline"
                  className="bg-white/5 text-white/60 border-white/10 text-xs px-2"
                >
                  #{index + 1}
                </Badge>
                <span className="font-semibold text-sm text-white flex-1 truncate">
                  {circuit.name || <span className="text-red-400">Unnamed Circuit</span>}
                </span>
                {!circuit.loadPower && (
                  <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div>
                  <span className="text-white/50">Power:</span>
                  <span className="ml-1.5 font-medium text-white">{circuit.loadPower}W</span>
                </div>
                <div>
                  <span className="text-white/50">Length:</span>
                  <span className="ml-1.5 font-medium text-white">
                    {circuit.cableLength ? `${circuit.cableLength}m` : 'Auto'}
                  </span>
                </div>
                <div>
                  <span className="text-white/50">Phase:</span>
                  <span className="ml-1.5 font-medium text-white">
                    {circuit.phases === 'single' ? '1Φ' : '3Φ'}
                  </span>
                </div>
                {circuit.specialLocation && circuit.specialLocation !== 'none' && (
                  <div>
                    <Badge
                      className="bg-orange-500/20 text-orange-300 border-0 text-xs capitalize"
                    >
                      {circuit.specialLocation}
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Warnings */}
      {missingData.length > 0 && (
        <div
          className={cn(
            "flex items-start gap-2 p-3 rounded-xl border",
            "bg-orange-500/10 border-orange-500/30"
          )}
        >
          <AlertCircle className="h-4 w-4 text-orange-400 shrink-0 mt-0.5" />
          <p className="text-xs text-orange-200">
            <span className="font-medium text-orange-300">Note:</span> {missingData.length} circuit{missingData.length > 1 ? 's' : ''} missing cable length.
            AI will estimate based on typical installations.
          </p>
        </div>
      )}

      {/* Expected Output */}
      <div
        className={cn(
          "p-4 rounded-xl",
          "bg-white/5 backdrop-blur border border-elec-yellow/20"
        )}
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-elec-yellow/10">
            <Sparkles className="h-4 w-4 text-elec-yellow" />
          </div>
          <h3 className="text-sm font-semibold text-white">What You'll Get</h3>
        </div>

        <div className="grid gap-2">
          {[
            'BS 7671 compliant cable sizing for each circuit',
            'Protection device selection (MCB/RCBO ratings and curves)',
            'Voltage drop calculations with compliance verification',
            'Earth fault loop impedance (Zs) calculations',
            'Detailed justifications referencing BS 7671 regulations',
            'Materials list with specifications',
            'Installation guidance and practical tips'
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-2.5 text-sm">
              <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
              <span className="text-white/80">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
