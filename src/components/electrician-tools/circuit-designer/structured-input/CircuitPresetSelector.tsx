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
          <div className="p-2.5 sm:p-4 pt-0 grid gap-3 sm:grid-cols-2">
            {templates.map(template => (
              <Card key={template.id} className="p-3 sm:p-4 hover:border-primary/50 transition-colors">
                <div className="flex items-center justify-between gap-1.5 sm:gap-2 mb-1.5">
                  <div className="flex-1 min-w-0 pr-1">
                    <h4 className="font-semibold text-sm sm:text-base text-foreground truncate">{template.name}</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-2">{template.description}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => onSelectPreset(template)}
                    className="gap-1 shrink-0 min-h-[40px] min-w-[40px] px-2.5 sm:px-3 flex items-center justify-center"
                  >
                    <Plus className="h-4 w-4 flex-shrink-0" />
                    <span className="hidden sm:inline">Add</span>
                  </Button>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {template.circuits.slice(0, 3).map((c, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {c.name}
                    </Badge>
                  ))}
                  {template.circuits.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{template.circuits.length - 3} more
                    </Badge>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};
