import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CircuitPreset } from "@/types/installation-design";
import { DOMESTIC_TEMPLATES, COMMERCIAL_TEMPLATES, INDUSTRIAL_TEMPLATES } from "@/lib/circuit-templates";
import { FileText, Plus, ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";
import { cn } from "@/lib/utils";

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
      <div
        className={cn(
          "overflow-hidden rounded-xl",
          "bg-gradient-to-br from-elec-yellow/[0.06] to-white/[0.02]",
          "border border-elec-yellow/25"
        )}
      >
        <CollapsibleTrigger
          className={cn(
            "w-full p-4 min-h-[56px] flex items-center justify-between",
            "hover:bg-elec-yellow/10 transition-all duration-ios-fast",
            "touch-manipulation active:bg-elec-yellow/15"
          )}
        >
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="p-1.5 rounded-lg bg-elec-yellow/15 border border-elec-yellow/20">
              <FileText className="h-4 w-4 text-elec-yellow flex-shrink-0" />
            </div>
            <h3 className="font-semibold text-sm sm:text-base text-white">Quick Start Templates</h3>
            <Badge
              variant="secondary"
              className="text-xs bg-elec-yellow/10 border border-elec-yellow/20 text-elec-yellow"
            >
              {templates.length} available
            </Badge>
          </div>
          <ChevronDown
            className={cn(
              "h-5 w-5 text-elec-yellow/60 transition-transform duration-ios-normal flex-shrink-0",
              isOpen && "rotate-180"
            )}
          />
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="p-3 sm:p-4 pt-0 grid gap-3 sm:grid-cols-2">
            {templates.map(template => (
              <div
                key={template.id}
                className={cn(
                  "p-4 rounded-xl",
                  "bg-white/[0.04] border border-elec-yellow/15",
                  "hover:border-elec-yellow/35 hover:bg-elec-yellow/[0.06]",
                  "transition-all duration-ios-fast",
                  "touch-manipulation"
                )}
              >
                <div className="flex flex-col gap-3">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-base sm:text-sm text-white leading-tight">
                      {template.name}
                    </h4>
                    <p className="text-xs text-white/60 mt-1.5 line-clamp-2">
                      {template.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {template.circuits.slice(0, 3).map((c, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="text-xs font-medium border-elec-yellow/20 text-white/70 bg-elec-yellow/[0.05]"
                        >
                          {c.name}
                        </Badge>
                      ))}
                      {template.circuits.length > 3 && (
                        <Badge
                          variant="outline"
                          className="text-xs font-medium border-elec-yellow/30 text-elec-yellow bg-elec-yellow/10"
                        >
                          +{template.circuits.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onSelectPreset(template)}
                    className={cn(
                      "gap-2 shrink-0 w-full h-11 justify-center font-semibold rounded-xl",
                      "bg-elec-yellow/10 border border-elec-yellow/25",
                      "text-elec-yellow",
                      "hover:bg-elec-yellow/20 hover:border-elec-yellow/40",
                      "active:scale-[0.98]",
                      "transition-all duration-ios-fast",
                      "touch-manipulation"
                    )}
                  >
                    <Plus className="h-4 w-4 flex-shrink-0" />
                    <span>Add Template</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
};
