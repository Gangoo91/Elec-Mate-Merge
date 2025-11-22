import { 
  MobileAccordion,
  MobileAccordionItem,
  MobileAccordionTrigger,
  MobileAccordionContent
} from '@/components/ui/mobile-accordion';
import { Wrench, AlertTriangle, Cable, Zap } from 'lucide-react';

interface MobileInstallationGuidanceSectionProps {
  circuit: any;
}

export const MobileInstallationGuidanceSection = ({ circuit }: MobileInstallationGuidanceSectionProps) => {
  // Extract installation guidance from various sources
  const installationGuidance = circuit.installationGuidance || {};
  const structuredOutput = circuit.structuredOutput || {};

  // Safety considerations
  const safetyConsiderations = Array.isArray(installationGuidance.safetyConsiderations)
    ? installationGuidance.safetyConsiderations
    : structuredOutput.safetyNotes 
      ? [structuredOutput.safetyNotes]
      : ['Follow BS 7671 safe isolation procedures before commencing work', 'Verify earthing and bonding arrangements', 'Ensure adequate circuit protection'];

  // Cable routing
  const cableRouting = Array.isArray(installationGuidance.cableRouting)
    ? installationGuidance.cableRouting
    : structuredOutput.installationGuidance
      ? [structuredOutput.installationGuidance]
      : ['Install cables in approved containment systems', 'Maintain segregation from other services', 'Avoid sharp bends and mechanical stress'];

  // Termination requirements
  const terminationRequirements = Array.isArray(installationGuidance.terminationRequirements)
    ? installationGuidance.terminationRequirements
    : ['Ensure all terminations are tight and secure', 'Use correct torque settings', 'Label all circuits clearly'];

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-elec-light px-1 flex items-center gap-2">
        <Wrench className="h-4 w-4 text-elec-yellow" />
        Installation Guidance
      </h3>

      <MobileAccordion type="multiple" className="space-y-2">
        {/* Safety Considerations */}
        <MobileAccordionItem 
          value="safety"
          className="border-l-4 border-red-500/50 rounded-lg overflow-hidden"
        >
          <MobileAccordionTrigger
            icon={<AlertTriangle className="h-5 w-5 text-red-400" />}
            className="bg-elec-gray/50 hover:bg-elec-gray/70"
          >
            <span className="text-sm font-medium">Safety Considerations</span>
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="p-4 bg-elec-dark/60 border-t border-elec-yellow/10">
              <ul className="space-y-2">
                {safetyConsiderations.map((item: any, idx: number) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-white/90">
                    <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <span>{typeof item === 'string' ? item : item.consideration || item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        {/* Cable Routing */}
        <MobileAccordionItem 
          value="routing"
          className="border-l-4 border-blue-500/50 rounded-lg overflow-hidden"
        >
          <MobileAccordionTrigger
            icon={<Cable className="h-5 w-5 text-blue-400" />}
            className="bg-elec-gray/50 hover:bg-elec-gray/70"
          >
            <span className="text-sm font-medium">Cable Routing</span>
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="p-4 bg-elec-dark/60 border-t border-elec-yellow/10">
              <ul className="space-y-2">
                {cableRouting.map((item: any, idx: number) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-white/90">
                    <Cable className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>{typeof item === 'string' ? item : item.step || item.method || item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>

        {/* Termination Requirements */}
        <MobileAccordionItem 
          value="termination"
          className="border-l-4 border-green-500/50 rounded-lg overflow-hidden"
        >
          <MobileAccordionTrigger
            icon={<Zap className="h-5 w-5 text-green-400" />}
            className="bg-elec-gray/50 hover:bg-elec-gray/70"
          >
            <span className="text-sm font-medium">Termination Requirements</span>
          </MobileAccordionTrigger>
          <MobileAccordionContent>
            <div className="p-4 bg-elec-dark/60 border-t border-elec-yellow/10">
              <ul className="space-y-2">
                {terminationRequirements.map((item: any, idx: number) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-white/90">
                    <Zap className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>{typeof item === 'string' ? item : item.procedure || item.location || item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>
      </MobileAccordion>
    </div>
  );
};
