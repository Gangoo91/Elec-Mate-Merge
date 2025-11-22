import { AlertCircle, Cable, Wrench } from "lucide-react";
import {
  MobileAccordion,
  MobileAccordionContent,
  MobileAccordionItem,
  MobileAccordionTrigger,
} from "@/components/ui/mobile-accordion";

interface MobileInstallationGuidanceProps {
  circuit: any;
}

export const MobileInstallationGuidance = ({ circuit }: MobileInstallationGuidanceProps) => {
  const guidance = circuit.installationGuidance;
  
  if (!guidance) return null;

  const hasSafety = guidance.safetyConsiderations && Array.isArray(guidance.safetyConsiderations) && guidance.safetyConsiderations.length > 0;
  const hasRouting = guidance.cableRouting && Array.isArray(guidance.cableRouting) && guidance.cableRouting.length > 0;
  const hasTermination = guidance.terminationRequirements && Array.isArray(guidance.terminationRequirements) && guidance.terminationRequirements.length > 0;

  if (!hasSafety && !hasRouting && !hasTermination) return null;

  return (
    <MobileAccordion type="single" collapsible className="w-full">
      <MobileAccordionItem value="guidance">
        <MobileAccordionTrigger icon={<Wrench className="h-5 w-5" />}>
          Installation Guidance
        </MobileAccordionTrigger>
        <MobileAccordionContent>
          <div className="bg-elec-card border border-elec-yellow/10 rounded-b-lg p-4 space-y-4">
            {/* Safety Considerations */}
            {hasSafety && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="h-4 w-4 text-amber-400" />
                  <h5 className="font-semibold text-amber-400 text-sm">Safety Considerations</h5>
                </div>
                <ul className="space-y-2">
                  {guidance.safetyConsiderations.map((item: any, idx: number) => (
                    <li key={idx} className="text-sm text-white/80 pl-6 relative before:content-['•'] before:absolute before:left-2 before:text-amber-400">
                      {typeof item === 'string' ? item : (item.consideration || item)}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Cable Routing */}
            {hasRouting && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Cable className="h-4 w-4 text-blue-400" />
                  <h5 className="font-semibold text-blue-400 text-sm">Cable Routing</h5>
                </div>
                <ul className="space-y-2">
                  {guidance.cableRouting.map((item: any, idx: number) => (
                    <li key={idx} className="text-sm text-white/80 pl-6 relative before:content-['•'] before:absolute before:left-2 before:text-blue-400">
                      {typeof item === 'string' ? item : (item.step || item.method || item)}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Termination Requirements */}
            {hasTermination && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Wrench className="h-4 w-4 text-green-400" />
                  <h5 className="font-semibold text-green-400 text-sm">Termination Requirements</h5>
                </div>
                <ul className="space-y-2">
                  {guidance.terminationRequirements.map((item: any, idx: number) => (
                    <li key={idx} className="text-sm text-white/80 pl-6 relative before:content-['•'] before:absolute before:left-2 before:text-green-400">
                      {typeof item === 'string' ? item : (item.procedure || item.location || item)}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </MobileAccordionContent>
      </MobileAccordionItem>
    </MobileAccordion>
  );
};
