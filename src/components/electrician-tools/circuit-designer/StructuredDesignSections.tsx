import { Card } from '@/components/ui/card';
import { 
  FileText, Zap, Cable, Shield, CheckCircle2, 
  MessageSquare, Wrench, AlertTriangle, ClipboardCheck 
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface StructuredDesignSectionsProps {
  sections: {
    circuitSummary: string;
    loadDetails: string;
    cableSelectionBreakdown: string;
    protectiveDeviceSelection: string;
    complianceConfirmation: string;
    designJustification: string;
    safetyNotes: string;
    testingCommissioningGuidance: string;
  };
}

interface SectionConfig {
  key: keyof StructuredDesignSectionsProps['sections'];
  title: string;
  icon: LucideIcon;
}

export const StructuredDesignSections = ({ sections }: StructuredDesignSectionsProps) => {
  const sectionOrder: SectionConfig[] = [
    { key: 'circuitSummary', title: '1. Circuit Summary', icon: FileText },
    { key: 'loadDetails', title: '2. Load Details', icon: Zap },
    { key: 'cableSelectionBreakdown', title: '3. Cable Selection & Calculation Breakdown', icon: Cable },
    { key: 'protectiveDeviceSelection', title: '4. Protective Device Selection', icon: Shield },
    { key: 'complianceConfirmation', title: '5. Compliance Confirmation', icon: CheckCircle2 },
    { key: 'designJustification', title: '6. Design Justification', icon: MessageSquare },
    { key: 'testingCommissioningGuidance', title: '7. Testing & Commissioning', icon: ClipboardCheck },
    { key: 'safetyNotes', title: '8. Safety Notes', icon: AlertTriangle }
  ];

  return (
    <div className="space-y-4">
      {sectionOrder.map(({ key, title, icon: Icon }) => (
        <Card key={key} className="bg-card border-elec-yellow/20 hover:border-elec-yellow/30 transition-all">
          <div className="p-4 sm:p-5">
            <h4 className="text-base sm:text-lg font-bold text-elec-light flex items-center gap-2 mb-3">
              <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-elec-yellow" />
              {title}
            </h4>
            <div className="prose prose-invert prose-sm max-w-none">
              <p className="text-sm sm:text-base text-white whitespace-pre-wrap leading-relaxed text-left">
                {sections[key]}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
