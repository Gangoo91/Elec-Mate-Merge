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
        <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-accent/50 transition-colors touch-manipulation">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Quick Start Templates</h3>
            <Badge variant="secondary" className="text-xs">{templates.length} available</Badge>
          </div>
          <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <div className="p-4 pt-0 grid sm:grid-cols-2 gap-3">
            {templates.map(template => (
              <Card key={template.id} className="p-4 hover:border-primary/50 transition-colors">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{template.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => onSelectPreset(template)}
                    className="gap-1 shrink-0"
                  >
                    <Plus className="h-4 w-4" />
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-1 mt-3">
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
