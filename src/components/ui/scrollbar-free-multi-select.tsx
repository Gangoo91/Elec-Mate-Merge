import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Check, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectOption {
  value: string;
  label: string;
}

interface ScrollbarFreeMultiSelectProps {
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

export const ScrollbarFreeMultiSelect: React.FC<ScrollbarFreeMultiSelectProps> = ({
  label,
  placeholder = "Select options...",
  value,
  onValueChange,
  options,
  error,
  hint,
  disabled = false,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleItemSelect = (itemValue: string) => {
    if (itemValue === "N/A") {
      onValueChange([]);
      setIsOpen(false);
      return;
    }

    const newValue = value.includes(itemValue)
      ? value.filter(v => v !== itemValue)
      : [...value, itemValue];
    
    onValueChange(newValue);
  };

  const removeBadge = (itemValue: string) => {
    onValueChange(value.filter(v => v !== itemValue));
  };

  const getSelectedLabels = () => {
    return value
      .map(val => options.find(opt => opt.value === val)?.label)
      .filter(Boolean);
  };

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="text-sm font-semibold text-elec-light flex items-center gap-2">
          <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
          {label}
        </label>
      )}
      
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            disabled={disabled}
            className={cn(
              "flex h-auto min-h-[48px] w-full items-center justify-between rounded-xl border-2 border-elec-gray/50 bg-elec-card px-4 py-3 text-base font-medium ring-offset-background placeholder:text-elec-light/60 focus:border-elec-yellow focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50 text-elec-light hover:border-elec-yellow/40 transition-all duration-200",
              error && "border-red-500",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            <div className="flex flex-wrap gap-1.5 flex-1">
              {value.length === 0 ? (
                <span className="text-elec-light/60">{placeholder}</span>
              ) : (
                getSelectedLabels().map((label, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-elec-yellow/20 text-elec-light border-elec-yellow/30 hover:bg-elec-yellow/30 px-2 py-1 text-xs"
                  >
                    {label}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        const selectedValue = value[index];
                        if (selectedValue) removeBadge(selectedValue);
                      }}
                      className="ml-1 hover:bg-elec-yellow/40 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))
              )}
            </div>
            <ChevronDown className="h-4 w-4 opacity-50 ml-2 flex-shrink-0" />
          </button>
        </PopoverTrigger>
        
        <PopoverContent className="w-full p-0 bg-elec-card border-elec-gray/50 shadow-xl z-50">
          <div className="max-h-[200px] overflow-y-auto scrollbar-none">
            <div
              className="p-3 text-sm text-elec-light hover:bg-elec-yellow/20 cursor-pointer border-b border-elec-gray/20 transition-colors"
              onClick={() => handleItemSelect("N/A")}
            >
              <div className="flex items-center">
                <div className="w-5 h-5 mr-3 flex items-center justify-center flex-shrink-0">
                  {value.length === 0 && <Check className="h-4 w-4" />}
                </div>
                <span className="flex-1 text-left">None selected</span>
              </div>
            </div>
            
            {options.map((option, index) => (
              <div
                key={option.value}
                className="p-3 text-sm text-elec-light hover:bg-elec-yellow/20 cursor-pointer transition-colors"
                onClick={() => handleItemSelect(option.value)}
              >
                <div className="flex items-start">
                  <div className="w-5 h-5 mr-3 flex items-center justify-center flex-shrink-0 mt-0.5">
                    {value.includes(option.value) && <Check className="h-4 w-4" />}
                  </div>
                  <span className="flex-1 text-left leading-tight">{option.label}</span>
                </div>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      
      {hint && !error && (
        <p className="text-xs text-elec-light/70 flex items-center gap-1">
          <span className="w-1 h-1 bg-elec-yellow/60 rounded-full"></span>
          {hint}
        </p>
      )}
      {error && (
        <p className="text-xs text-red-400 flex items-center gap-1">
          <span className="w-1 h-1 bg-red-400 rounded-full"></span>
          {error}
        </p>
      )}
    </div>
  );
};