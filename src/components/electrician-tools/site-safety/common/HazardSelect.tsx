import { useState } from "react";
import { Check, Search, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
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
import { Badge } from "@/components/ui/badge";
import { hazardCategories, commonHazards } from "@/data/hazards";

interface HazardSelectProps {
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  showQuickPicks?: boolean;
}

export function HazardSelect({ 
  value, 
  onValueChange, 
  placeholder = "Select hazard...", 
  className,
  showQuickPicks = true 
}: HazardSelectProps) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const filteredHazards = hazardCategories.flatMap(category => 
    category.hazards.map(hazard => ({
      value: hazard,
      label: hazard,
      category: category.name,
      categoryColor: category.color
    }))
  );

  const handleSelect = (selectedValue: string) => {
    onValueChange(selectedValue);
    setOpen(false);
    setSearchValue("");
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between bg-background/80 backdrop-blur-sm border-elec-yellow/20 hover:border-elec-yellow/40"
          >
            <div className="flex items-center gap-2 flex-1 text-left">
              <Search className="h-4 w-4 text-muted-foreground" />
              <span className={cn(
                "truncate",
                !value && "text-muted-foreground"
              )}>
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
              placeholder="Search hazards..." 
              className="border-none bg-transparent text-foreground"
            />
            <CommandList className="max-h-80">
              <CommandEmpty>No hazards found.</CommandEmpty>
              
              {/* Quick Pick Common Hazards - Conditional */}
              {showQuickPicks && (
                <CommandGroup heading="Quick Pick - Common Hazards">
                  {commonHazards.map((hazard) => (
                    <CommandItem
                      key={`common-${hazard}`}
                      onSelect={() => handleSelect(hazard)}
                      className="cursor-pointer hover:bg-muted/50"
                    >
                      <div className="flex items-center gap-2">
                        <Check
                          className={cn(
                            "h-4 w-4",
                            value === hazard ? "opacity-100" : "opacity-0"
                          )}
                        />
                        <span className="text-sm font-medium">{hazard}</span>
                        <Badge variant="secondary" className="ml-auto text-xs">
                          Common
                        </Badge>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {/* Hazard Categories */}
              {hazardCategories.map((category) => (
                <CommandGroup key={category.id} heading={category.name}>
                  {category.hazards.map((hazard) => (
                    <CommandItem
                      key={hazard}
                      onSelect={() => handleSelect(hazard)}
                      className="cursor-pointer hover:bg-muted/50"
                    >
                      <div className="flex items-center gap-2 w-full">
                        <Check
                          className={cn(
                            "h-4 w-4",
                            value === hazard ? "opacity-100" : "opacity-0"
                          )}
                        />
                        <span className="flex-1 text-sm">{hazard}</span>
                        <category.icon className={cn("h-4 w-4", category.color)} />
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
  );
}