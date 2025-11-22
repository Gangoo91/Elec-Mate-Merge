import { FileCheck, Shield, AlertTriangle } from "lucide-react";
import {
  MobileAccordion,
  MobileAccordionContent,
  MobileAccordionItem,
  MobileAccordionTrigger,
} from "@/components/ui/mobile-accordion";

interface MobileComplianceDetailsProps {
  circuit: any;
}

export const MobileComplianceDetails = ({ circuit }: MobileComplianceDetailsProps) => {
  const structuredOutput = circuit.structuredOutput;
  
  if (!structuredOutput) return null;

  const hasFaultCurrent = structuredOutput.faultCurrentAnalysis;
  const hasEarthing = structuredOutput.earthingRequirements;
  const hasSpecialLocations = structuredOutput.specialLocationCompliance;

  if (!hasFaultCurrent && !hasEarthing && !hasSpecialLocations) return null;

  return (
    <MobileAccordion type="single" collapsible className="w-full">
      <MobileAccordionItem value="compliance">
        <MobileAccordionTrigger icon={<FileCheck className="h-5 w-5" />}>
          Compliance Details
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          <div className="bg-elec-card border border-elec-yellow/10 rounded-b-lg p-4 space-y-4">
            {/* Fault Current Analysis */}
            {hasFaultCurrent && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400" />
                  <h5 className="font-semibold text-amber-400 text-sm">Fault Current Analysis</h5>
                </div>
                <p className="text-sm text-white/80 leading-relaxed">
                  {structuredOutput.faultCurrentAnalysis.summary || structuredOutput.faultCurrentAnalysis}
                </p>
              </div>
            )}

            {/* Earthing Requirements */}
            {hasEarthing && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-green-400" />
                  <h5 className="font-semibold text-green-400 text-sm">Earthing Requirements</h5>
                </div>
                <p className="text-sm text-white/80 leading-relaxed">
                  {structuredOutput.earthingRequirements.summary || structuredOutput.earthingRequirements}
                </p>
              </div>
            )}

            {/* Special Locations */}
            {hasSpecialLocations && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FileCheck className="h-4 w-4 text-blue-400" />
                  <h5 className="font-semibold text-blue-400 text-sm">Special Location Compliance</h5>
                </div>
                <p className="text-sm text-white/80 leading-relaxed">
                  {structuredOutput.specialLocationCompliance.summary || structuredOutput.specialLocationCompliance}
                </p>
              </div>
            )}
          </div>
        </MobileAccordionContent>
      </MobileAccordionItem>
    </MobileAccordion>
  );
};
