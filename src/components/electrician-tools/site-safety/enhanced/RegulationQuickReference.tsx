import { useState } from 'react';
import { ChevronDown, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface RegulationQuickReferenceProps {
  hazards: any[];
  onRegulationClick: (regulation: string) => void;
}

export const RegulationQuickReference = ({ hazards, onRegulationClick }: RegulationQuickReferenceProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Group hazards by regulation
  const regulationGroups = hazards.reduce((acc, hazard) => {
    if (hazard.bs7671References) {
      hazard.bs7671References.forEach((reg: string) => {
        if (!acc[reg]) {
          acc[reg] = [];
        }
        acc[reg].push(hazard);
      });
    }
    return acc;
  }, {} as Record<string, any[]>);

  const sortedRegulations = Object.entries(regulationGroups).sort(([a], [b]) => 
    a.localeCompare(b)
  );

  return (
    <div className="bg-elec-card/50 rounded-lg border border-border/50 p-4">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-elec-yellow" />
              <h3 className="text-sm font-semibold">BS7671 Quick Reference</h3>
              <Badge variant="outline" className="text-xs">
                {sortedRegulations.length} Regulations
              </Badge>
            </div>
            <ChevronDown 
              className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            />
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent className="mt-3">
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {sortedRegulations.map(([regulation, regHazards]) => (
              <button
                key={regulation}
                onClick={() => onRegulationClick(regulation)}
                className="w-full text-left bg-background/50 hover:bg-background/80 rounded-lg p-3 border border-border/30 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-xs text-elec-yellow mb-1">
                      {regulation}
                    </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {Array.isArray(regHazards) ? regHazards.length : 0} hazard{Array.isArray(regHazards) && regHazards.length !== 1 ? 's' : ''} reference this regulation
                        </div>
                      </div>
                      <Badge 
                        variant="outline" 
                        className="flex-shrink-0 text-xs"
                      >
                        {Array.isArray(regHazards) ? regHazards.length : 0}
                      </Badge>
                </div>
              </button>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
