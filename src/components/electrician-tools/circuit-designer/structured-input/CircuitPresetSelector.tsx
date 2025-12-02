import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CircuitPreset } from "@/types/installation-design";
import { DOMESTIC_TEMPLATES, COMMERCIAL_TEMPLATES, INDUSTRIAL_TEMPLATES } from "@/lib/circuit-templates";
import { FileText, Plus } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface CircuitPresetSelectorProps {
  installationType: 'domestic' | 'commercial' | 'industrial';
  onSelectPreset: (preset: CircuitPreset) => void;
}

export const CircuitPresetSelector = ({ installationType, onSelectPreset }: CircuitPresetSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const templates = 
    installationType === 'domestic' ? DOMESTIC_TEMPLATES :
    installationType === 'commercial' ? COMMERCIAL_TEMPLATES :
    INDUSTRIAL_TEMPLATES;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="overflow-hidden border-primary/20">
        <CollapsibleTrigger className="w-full p-4 min-h-[56px] flex items-center justify-between hover:bg-accent/50 transition-colors touch-manipulation">
          <div className="flex items-center gap-2 flex-wrap">
            <FileText className="h-5 w-5 text-primary flex-shrink-0" />
            <h3 className="font-semibold text-sm sm:text-base">Quick Start Templates</h3>
            <Badge variant="secondary" className="text-xs">{templates.length} available</Badge>
          </div>
          <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <div className="p-3 sm:p-4 pt-0 grid gap-4 sm:grid-cols-2">
            {templates.map(template => (
              <Card key={template.id} className="p-4 hover:border-primary/50 transition-all touch-manipulation relative border-l-4 border-l-elec-yellow/40">
                <div className="flex flex-col gap-3">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-base sm:text-sm text-foreground leading-tight">{template.name}</h4>
                    <p className="text-xs text-foreground/80 mt-1.5 line-clamp-2">{template.description}</p>
                    
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {template.circuits.slice(0, 3).map((c, i) => (
                        <Badge key={i} variant="outline" className="text-xs font-medium">
                          {c.name}
                        </Badge>
                      ))}
                      {template.circuits.length > 3 && (
                        <Badge variant="outline" className="text-xs font-medium">
                          +{template.circuits.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => onSelectPreset(template)}
                    className="gap-2 shrink-0 w-full min-h-[44px] justify-center font-semibold"
                  >
                    <Plus className="h-4 w-4 flex-shrink-0" />
                    <span>Add Template</span>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};
