import { Shield, Zap, AlertTriangle } from "lucide-react";

interface MobileCableJustificationProps {
  circuit: any;
}

export const MobileCableJustification = ({ circuit }: MobileCableJustificationProps) => {
  const structuredOutput = circuit.structuredOutput;
  
  if (!structuredOutput) return null;

  return (
    <div className="space-y-4">
      {/* Cable Size Justification */}
      <div className="bg-elec-card/50 border border-elec-yellow/20 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Zap className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-white mb-2">Cable Selection</h4>
            <p className="text-sm text-white/80 leading-relaxed">
              {structuredOutput.cableSelection?.justification || 
               `${circuit.cableSize}mm² cable selected to safely carry ${circuit.designCurrentIb}A design current with installation method ${circuit.installationMethod}. Final current-carrying capacity: ${circuit.cableCurrentIz}A.`}
            </p>
          </div>
        </div>
      </div>

      {/* Protection Device Justification */}
      <div className="bg-elec-card/50 border border-blue-500/20 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-white mb-2">Protection Device</h4>
            <p className="text-sm text-white/80 leading-relaxed">
              {structuredOutput.protectionDevice?.justification || 
               `${circuit.protectionDevice} (${circuit.protectionRating}A) provides overload and fault protection. Maximum Zs: ${circuit.maxZs}Ω.`}
            </p>
          </div>
        </div>
      </div>

      {/* RCD Requirements */}
      {structuredOutput.rcdRequirements && (
        <div className="bg-elec-card/50 border border-amber-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-white mb-2">RCD Protection</h4>
              <p className="text-sm text-white/80 leading-relaxed">
                {structuredOutput.rcdRequirements.justification}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
