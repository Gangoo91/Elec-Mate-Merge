import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronDown, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { riskConsequences } from "@/data/hazards";

interface RiskSelectProps {
  selectedHazard?: string;
  value?: string;
  onValueChange: (value: string) => void;
  onControlMeasuresChange?: (controlMeasures: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function RiskSelect({ 
  selectedHazard, 
  value, 
  onValueChange, 
  onControlMeasuresChange,
  placeholder = "Select potential consequence...", 
  className 
}: RiskSelectProps) {
  const [open, setOpen] = useState(false);

  // Filter risks based on selected hazard
  const availableRisks = selectedHazard 
    ? riskConsequences.filter(risk => risk.applicableHazards?.includes(selectedHazard))
    : riskConsequences;

  const handleSelect = (selectedValue: string) => {
    onValueChange(selectedValue);
    setOpen(false);
    
    // Auto-suggest control measures if callback provided
    if (onControlMeasuresChange) {
      const selectedRisk = riskConsequences.find(risk => risk.consequence === selectedValue);
      if (selectedRisk) {
        onControlMeasuresChange(selectedRisk.suggestedControls || []);
      }
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between bg-background/80 backdrop-blur-sm border-elec-yellow/20 text-left font-normal",
            !value && "text-muted-foreground",
            className
          )}
        >
          <div className="flex items-center gap-2 truncate">
            <AlertTriangle className="h-4 w-4 text-orange-400 flex-shrink-0" />
            <span className="truncate">
              {value || placeholder}
            </span>
          </div>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-full p-0 bg-background/95 backdrop-blur-sm border-elec-yellow/20 z-50" 
        align="start"
        style={{ width: "var(--radix-popover-trigger-width)" }}
      >
        <Command className="bg-transparent">
          <CommandInput 
            placeholder="Search risks..." 
            className="border-none bg-transparent text-foreground"
          />
          <CommandList className="max-h-60">
            <CommandEmpty>No risks found.</CommandEmpty>
            
            {selectedHazard ? (
              <CommandGroup heading={`Risks for: ${selectedHazard}`}>
                {availableRisks.map((risk) => (
                  <CommandItem
                    key={risk.id}
                    onSelect={() => handleSelect(risk.consequence)}
                    className="cursor-pointer hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-2 w-full">
                      <Check
                        className={cn(
                          "h-4 w-4",
                          value === risk.consequence ? "opacity-100" : "opacity-0"
                        )}
                      />
                      <div className="flex-1">
                        <div className="text-sm font-medium">{risk.consequence}</div>
                        <div className="text-xs text-muted-foreground">
                          {risk.suggestedControls?.length || 0} suggested control measures
                        </div>
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            ) : (
              <CommandGroup heading="All Available Risks">
                {availableRisks.map((risk) => (
                  <CommandItem
                    key={risk.id}
                    onSelect={() => handleSelect(risk.consequence)}
                    className="cursor-pointer hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-2 w-full">
                      <Check
                        className={cn(
                          "h-4 w-4",
                          value === risk.consequence ? "opacity-100" : "opacity-0"
                        )}
                      />
                      <div className="flex-1">
                        <div className="text-sm font-medium">{risk.consequence}</div>
                        <div className="text-xs text-muted-foreground">
                          Risk Level: {risk.severity}x{risk.likelihood} = {risk.riskRating}
                        </div>
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}