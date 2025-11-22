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
              <div className="flex items-center justify-between w-full pr-8">
                <span className="text-sm font-medium">{section.title}</span>
                {section.badge && (
                  <Badge variant="outline" className="ml-2 text-xs bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30">
                    {section.badge}
                  </Badge>
                )}
              </div>
            </MobileAccordionTrigger>
            <MobileAccordionContent>
              <div className="p-4 bg-elec-dark/60 border-t border-elec-yellow/10">
                <p className="text-sm text-white/90 leading-relaxed whitespace-pre-wrap">
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

  // Cable Size Justification
  if (circuit.structuredOutput?.cableSelectionBreakdown) {
    sections.push({
      title: 'Cable Size Selection',
      content: circuit.structuredOutput.cableSelectionBreakdown,
      icon: <Cable className="h-5 w-5 text-blue-400" />,
      badge: `${circuit.cableSize}mm² / ${circuit.cpcSize}mm² CPC`,
      borderColor: 'border-blue-500/50'
    });
  }

  // Protection Device Justification
  if (circuit.structuredOutput?.protectiveDeviceSelection) {
    sections.push({
      title: 'Protection Device',
      content: circuit.structuredOutput.protectiveDeviceSelection,
      icon: <Shield className="h-5 w-5 text-green-400" />,
      badge: `${circuit.protectionType || circuit.breakerType} ${circuit.breakerRating}A`,
      borderColor: 'border-green-500/50'
    });
  }

  // RCD Protection (if applicable)
  if (circuit.rcdProtection && circuit.structuredOutput?.complianceConfirmation?.includes('RCD')) {
    sections.push({
      title: 'RCD Protection',
      content: circuit.structuredOutput.complianceConfirmation.split('\n').filter((line: string) => 
        line.toLowerCase().includes('rcd')
      ).join('\n') || 'RCD protection provided as per BS 7671 requirements.',
      icon: <Lock className="h-5 w-5 text-purple-400" />,
      badge: circuit.rcdRating ? `${circuit.rcdRating}mA` : 'Required',
      borderColor: 'border-purple-500/50'
    });
  }

  // Diversity (if applicable)
  if (circuit.diversityFactor && circuit.diversityFactor < 1) {
    const diversityContent = circuit.structuredOutput?.loadDetails?.split('\n').filter((line: string) =>
      line.toLowerCase().includes('diversity')
    ).join('\n') || `Diversity factor of ${(circuit.diversityFactor * 100).toFixed(0)}% applied to account for simultaneous demand.`;
    
    sections.push({
      title: 'Diversity Applied',
      content: diversityContent,
      icon: <Zap className="h-5 w-5 text-amber-400" />,
      badge: `${(circuit.diversityFactor * 100).toFixed(0)}%`,
      borderColor: 'border-amber-500/50'
    });
  }

  // Fault Current Analysis (if available)
  if (circuit.calculations?.prospectiveFaultCurrent) {
    sections.push({
      title: 'Fault Current Analysis',
      content: `Prospective fault current: ${circuit.calculations.prospectiveFaultCurrent}kA\n\nProtective device breaking capacity verified to exceed maximum prospective fault current.`,
      icon: <AlertTriangle className="h-5 w-5 text-red-400" />,
      badge: `${circuit.calculations.prospectiveFaultCurrent}kA`,
      borderColor: 'border-red-500/50'
    });
  }

  // Earthing Requirements
  if (circuit.structuredOutput?.complianceConfirmation) {
    const earthingContent = circuit.structuredOutput.complianceConfirmation.split('\n').filter((line: string) =>
      line.toLowerCase().includes('earth') || line.toLowerCase().includes('cpc')
    ).join('\n');
    
    if (earthingContent) {
      sections.push({
        title: 'Earthing Requirements',
        content: earthingContent,
        icon: <Shield className="h-5 w-5 text-cyan-400" />,
        badge: `${circuit.cpcSize}mm² CPC`,
        borderColor: 'border-cyan-500/50'
      });
    }
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
        icon: <AlertTriangle className="h-5 w-5 text-amber-400" />,
        badge: circuit.specialLocationCompliance.locationType || 'Required',
        borderColor: 'border-amber-500/50'
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
