import { 
  MobileAccordion,
  MobileAccordionItem,
  MobileAccordionTrigger,
  MobileAccordionContent
} from '@/components/ui/mobile-accordion';
import { Badge } from '@/components/ui/badge';
import { Cable, Shield, Zap, Lock, AlertTriangle, Sparkles } from 'lucide-react';

interface JustificationSection {
  title: string;
  content: string;
  icon: React.ReactNode;
  badge?: string;
  borderColor?: string;
}

interface MobileJustificationAccordionProps {
  sections: JustificationSection[];
}

export const MobileJustificationAccordion = ({ sections }: MobileJustificationAccordionProps) => {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-elec-light px-1 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-elec-yellow" />
        Detailed Justifications
      </h3>
      
      <MobileAccordion type="multiple" className="space-y-2">
        {sections.map((section, idx) => (
          <MobileAccordionItem 
            key={idx} 
            value={`section-${idx}`}
            className={`border-l-4 ${section.borderColor || 'border-elec-yellow/50'} rounded-lg overflow-hidden`}
          >
            <MobileAccordionTrigger
              icon={section.icon}
              className="bg-elec-gray/50 hover:bg-elec-gray/70"
            >
              <span className="text-sm font-medium">{section.title}</span>
            </MobileAccordionTrigger>
            <MobileAccordionContent>
              <div className="p-4 bg-elec-dark/60 border-t border-elec-yellow/10">
                <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-wrap">
                  {section.content}
                </p>
              </div>
            </MobileAccordionContent>
          </MobileAccordionItem>
        ))}
      </MobileAccordion>
    </div>
  );
};

// Helper to build justification sections from circuit data
export const buildJustificationSections = (circuit: any): JustificationSection[] => {
  const sections: JustificationSection[] = [];
  const justifications = circuit.justifications;

  // Cable Size Justification - Use justifications.cableSize
  const cableSizeContent = justifications?.cableSize && justifications.cableSize !== 'No specific justification provided.' 
    ? justifications.cableSize 
    : `${circuit.cableSize}mm² / ${circuit.cpcSize}mm² cable selected to safely carry ${circuit.calculations?.Ib?.toFixed(1)}A design current with adequate voltage drop performance (${circuit.calculations?.voltageDrop?.percent?.toFixed(2)}% actual vs ${circuit.calculations?.voltageDrop?.limit}% limit).`;
  
  sections.push({
    title: 'Cable Size Selection',
    content: cableSizeContent,
    icon: <Cable className="h-5 w-5 text-blue-400" />,
    badge: `${circuit.cableSize}mm² / ${circuit.cpcSize}mm² CPC`,
    borderColor: 'border-blue-500/50'
  });

  // Protection Device Justification - Use justifications.protection
  const protectionContent = justifications?.protection && justifications.protection !== 'No specific justification provided.'
    ? justifications.protection 
    : `${circuit.protectionDevice?.rating || circuit.breakerRating}A Type ${circuit.protectionDevice?.curve || 'B'} ${circuit.protectionDevice?.type || 'MCB'} provides adequate protection and discrimination for this ${circuit.loadType} circuit, with earth fault loop impedance (${circuit.calculations?.zs?.toFixed(2)}Ω) below maximum permitted (${circuit.calculations?.maxZs?.toFixed(2)}Ω).`;
  
  sections.push({
    title: 'Protection Device',
    content: protectionContent,
    icon: <Shield className="h-5 w-5 text-green-400" />,
    badge: `${circuit.protectionDevice?.rating || circuit.breakerRating}A Type ${circuit.protectionDevice?.curve || 'B'}`,
    borderColor: 'border-green-500/50'
  });

  // RCD Protection - Use justifications.rcd
  if (circuit.rcdProtected && justifications?.rcd) {
    sections.push({
      title: 'RCD Protection',
      content: justifications.rcd,
      icon: <Lock className="h-5 w-5 text-blue-400" />,
      badge: '30mA RCD Required',
      borderColor: 'border-blue-500/50'
    });
  }

  // Diversity - Use circuit.diversityJustification
  if (circuit.diversityFactor && circuit.diversityFactor < 1.0 && circuit.diversityJustification) {
    sections.push({
      title: 'Diversity Applied',
      content: circuit.diversityJustification,
      icon: <Zap className="h-5 w-5 text-orange-400" />,
      badge: `${(circuit.diversityFactor * 100).toFixed(0)}% Diversity Factor`,
      borderColor: 'border-orange-500/50'
    });
  }

  // Fault Current Analysis - Use circuit.faultCurrentAnalysis
  if (circuit.faultCurrentAnalysis) {
    const faultContent = [
      `PSCC at Circuit: ${circuit.faultCurrentAnalysis.psccAtCircuit}kA`,
      `Device Breaking Capacity: ${circuit.faultCurrentAnalysis.deviceBreakingCapacity}kA`,
      `\nStatus: ${circuit.faultCurrentAnalysis.compliant ? '✓ Compliant' : '✗ Non-Compliant'}`,
      `\n${circuit.faultCurrentAnalysis.marginOfSafety}`,
      `\nRegulation: ${circuit.faultCurrentAnalysis.regulation}`
    ].join('\n');
    
    sections.push({
      title: 'Fault Current Analysis',
      content: faultContent,
      icon: <AlertTriangle className="h-5 w-5 text-red-400" />,
      badge: `${circuit.faultCurrentAnalysis.psccAtCircuit}kA`,
      borderColor: circuit.faultCurrentAnalysis.compliant ? 'border-green-500/50' : 'border-red-500/50'
    });
  }

  // Earthing Requirements - Use circuit.earthingRequirements
  if (circuit.earthingRequirements) {
    const earthingContent = [
      `CPC Size: ${circuit.earthingRequirements.cpcSize}`,
      `Supplementary Bonding: ${circuit.earthingRequirements.supplementaryBonding ? 'Required' : 'Not Required'}`,
      circuit.earthingRequirements.bondingConductorSize ? `Bonding Conductor: ${circuit.earthingRequirements.bondingConductorSize}` : '',
      `\n${circuit.earthingRequirements.justification}`,
      `\nRegulation: ${circuit.earthingRequirements.regulation}`
    ].filter(Boolean).join('\n');
    
    sections.push({
      title: 'Earthing Requirements',
      content: earthingContent,
      icon: <Shield className="h-5 w-5 text-green-400" />,
      badge: `${circuit.earthingRequirements.cpcSize}`,
      borderColor: 'border-green-500/50'
    });
  }

  // Special Location Compliance
  if (circuit.specialLocationCompliance?.isSpecialLocation) {
    const specialLocContent = [
      circuit.specialLocationCompliance.locationType ? `Location Type: ${circuit.specialLocationCompliance.locationType}` : '',
      circuit.specialLocationCompliance.requirements || '',
      circuit.specialLocationCompliance.additionalProtection || ''
    ].filter(Boolean).join('\n\n');
    
    if (specialLocContent) {
      sections.push({
        title: 'Special Location',
        content: specialLocContent,
        icon: <AlertTriangle className="h-5 w-5 text-orange-400" />,
        badge: circuit.specialLocationCompliance.locationType || 'Required',
        borderColor: 'border-orange-500/50'
      });
    }
  }

  // Design Warnings
  if (circuit.warnings && circuit.warnings.length > 0) {
    const warningsContent = circuit.warnings
      .map((warning: string, idx: number) => `${idx + 1}. ${warning}`)
      .join('\n\n');
    
    sections.push({
      title: 'Design Warnings',
      content: warningsContent,
      icon: <AlertTriangle className="h-5 w-5 text-red-400" />,
      badge: `${circuit.warnings.length} Warning${circuit.warnings.length > 1 ? 's' : ''}`,
      borderColor: 'border-red-500/50'
    });
  }

  return sections;
};
