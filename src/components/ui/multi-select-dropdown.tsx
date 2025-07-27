import React, { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SelectOption {
  value: string;
  label: string;
}

interface MultiSelectDropdownProps {
  label?: string;
  placeholder?: string;
  value: string[];
  onValueChange: (value: string[]) => void;
  options: SelectOption[];
  error?: string;
  hint?: string;
  disabled?: boolean;
  className?: string;
}

export function MultiSelectDropdown({
  label,
  placeholder = "Select items...",
  value,
  onValueChange,
  options,
  error,
  hint,
  disabled,
  className
}: MultiSelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleItemSelect = (itemValue: string) => {
    if (itemValue === "N/A") {
      onValueChange([]);
    } else if (value.includes(itemValue)) {
      onValueChange(value.filter(v => v !== itemValue));
    } else {
      onValueChange([...value, itemValue]);
    }
  };

  const removeBadge = (itemValue: string) => {
    onValueChange(value.filter(v => v !== itemValue));
  };

  const selectedItems = options.filter(option => value.includes(option.value));

  return (
    <div className={cn("space-y-3", className)}>
      {label && (
        <Label className="text-sm font-semibold text-elec-light flex items-center gap-2">
          <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
          {label}
        </Label>
      )}
      
      <div className="relative group">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={isOpen}
              className={cn(
                "h-auto min-h-14 bg-elec-card border-2 border-elec-gray/50 rounded-xl",
                "hover:border-elec-yellow/40 focus:border-elec-yellow transition-all duration-200",
                "group-hover:shadow-lg group-hover:shadow-elec-yellow/10",
                "text-elec-light placeholder:text-elec-light/60 p-3 justify-start",
                "w-full text-left font-normal",
                error ? "border-destructive focus:border-destructive" : ""
              )}
              disabled={disabled}
            >
              <div className="flex flex-col items-start w-full">
                {selectedItems.length > 0 ? (
                  <div className="flex flex-wrap gap-1 w-full">
                    {selectedItems.map((item) => (
                      <Badge 
                        key={item.value} 
                        variant="secondary" 
                        className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30 text-xs flex items-center gap-1"
                      >
                        <span className="text-xs">{item.label}</span>
                        <X 
                          className="h-3 w-3 cursor-pointer hover:text-elec-yellow/70" 
                          onClick={(e) => {
                            e.stopPropagation();
                            removeBadge(item.value);
                          }}
                        />
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <span className="text-elec-light/60 text-sm">{placeholder}</span>
                )}
                <ChevronDown className="h-4 w-4 shrink-0 opacity-50 ml-auto" />
              </div>
            </Button>
          </PopoverTrigger>
          
          <PopoverContent className="w-full p-0 bg-elec-gray border-elec-gray/50 shadow-xl z-50">
            <div className="max-h-64 overflow-y-auto custom-scrollbar mobile-scroll-container">
              <div
                className="p-3 text-sm text-elec-light hover:bg-elec-yellow/20 cursor-pointer border-b border-elec-gray/20"
                onClick={() => handleItemSelect("N/A")}
              >
                N/A
              </div>
              {options.map((option) => (
                <div
                  key={option.value}
                  className={cn(
                    "p-3 text-sm text-elec-light hover:bg-elec-yellow/20 cursor-pointer flex items-center justify-between",
                    value.includes(option.value) ? "bg-elec-yellow/10" : ""
                  )}
                  onClick={() => handleItemSelect(option.value)}
                >
                  <span className="text-sm">{option.label}</span>
                  {value.includes(option.value) && (
                    <div className="w-2 h-2 bg-elec-yellow rounded-full"></div>
                  )}
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
        
        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/5 to-elec-yellow/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
      
      {hint && !error && (
        <p className="text-xs text-elec-light/70 flex items-center gap-1">
          <span className="w-1 h-1 bg-elec-yellow/60 rounded-full"></span>
          {hint}
        </p>
      )}
      {error && (
        <p className="text-xs text-destructive animate-fade-in flex items-center gap-1">
          <span className="w-1 h-1 bg-destructive rounded-full"></span>
          {error}
        </p>
      )}
    </div>
  );
}