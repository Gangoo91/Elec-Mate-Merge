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
}

export function HazardSelect({
  value,
  onValueChange,
  placeholder = "Select or search hazards...",
  className
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
    <div className={cn("space-y-3", className)}>
      {/* Quick Pick Common Hazards */}
      <div>
        <div className="text-sm font-medium text-muted-foreground mb-2">
          Quick Pick - Common Hazards:
        </div>
        <div className="flex flex-wrap gap-2">
          {commonHazards.slice(0, 6).map((hazard) => (
            <Button
              key={hazard}
              variant="outline"
              size="sm"
              onClick={() => handleSelect(hazard)}
              className="h-7 text-xs border-elec-yellow/30 hover:bg-elec-yellow/10"
            >
              {hazard}
            </Button>
          ))}
        </div>
      </div>

      {/* Dropdown Selector */}
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
          className="w-[400px] p-0 bg-background/95 backdrop-blur-sm border-elec-yellow/20" 
          align="start"
          style={{ zIndex: 9999 }}
        >
          <Command className="bg-transparent">
            <CommandInput 
              placeholder="Search hazards..." 
              value={searchValue}
              onValueChange={setSearchValue}
              className="border-none focus:ring-0"
            />
            <CommandList className="max-h-[300px]">
              <CommandEmpty>No hazards found.</CommandEmpty>
              
              {/* Common Hazards Group */}
              <CommandGroup heading="Common Hazards">
                {commonHazards
                  .filter(hazard => 
                    hazard.toLowerCase().includes(searchValue.toLowerCase())
                  )
                  .map((hazard) => (
                    <CommandItem
                      key={hazard}
                      onSelect={() => handleSelect(hazard)}
                      className="cursor-pointer"
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === hazard ? "opacity-100" : "opacity-0"
                        )}
                      />
                      <span className="flex-1">{hazard}</span>
                      <Badge variant="outline" className="text-xs">
                        Common
                      </Badge>
                    </CommandItem>
                  ))}
              </CommandGroup>

              {/* Category Groups */}
              {hazardCategories.map((category) => {
                const categoryHazards = category.hazards.filter(hazard =>
                  hazard.toLowerCase().includes(searchValue.toLowerCase())
                );
                
                if (categoryHazards.length === 0) return null;

                return (
                  <CommandGroup key={category.id} heading={category.name}>
                    {categoryHazards.map((hazard) => (
                      <CommandItem
                        key={hazard}
                        onSelect={() => handleSelect(hazard)}
                        className="cursor-pointer"
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === hazard ? "opacity-100" : "opacity-0"
                          )}
                        />
                        <span className="flex-1">{hazard}</span>
                        <category.icon className={cn("h-3 w-3", category.color)} />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                );
              })}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}