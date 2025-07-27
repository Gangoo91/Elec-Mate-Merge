import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ScrollbarFreeSelect,
  ScrollbarFreeSelectContent,
  ScrollbarFreeSelectItem,
  ScrollbarFreeSelectTrigger,
  ScrollbarFreeSelectValue,
} from "@/components/ui/scrollbar-free-select";

interface SelectOption {
  value: string;
  label: string;
}

interface SingleSelectWithAddProps {
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

export const SingleSelectWithAdd: React.FC<SingleSelectWithAddProps> = ({
  label,
  placeholder = "Select an option...",
  value,
  onValueChange,
  options,
  error,
  hint,
  disabled = false,
  className,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleAdd = () => {
    if (selectedOption && !value.includes(selectedOption)) {
      onValueChange([...value, selectedOption]);
      setSelectedOption("");
    }
  };

  const handleRemove = (itemValue: string) => {
    onValueChange(value.filter(v => v !== itemValue));
  };

  const availableOptions = options.filter(option => !value.includes(option.value));

  const getSelectedLabels = () => {
    return value
      .map(val => options.find(opt => opt.value === val)?.label)
      .filter(Boolean);
  };

  return (
    <div className={cn("space-y-3", className)}>
      {label && (
        <label className="text-sm font-semibold text-elec-light flex items-center gap-2">
          <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
          {label}
        </label>
      )}
      
      {/* Selected Items Display */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {getSelectedLabels().map((label, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-elec-yellow/20 text-elec-light border-elec-yellow/30 hover:bg-elec-yellow/30 px-3 py-1 text-sm"
            >
              {label}
              <button
                type="button"
                onClick={() => handleRemove(value[index])}
                className="ml-2 hover:bg-elec-yellow/40 rounded-full p-0.5 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Add New Section */}
      <div className="flex gap-2">
        <div className="flex-1">
          <ScrollbarFreeSelect
            value={selectedOption}
            onValueChange={setSelectedOption}
            disabled={disabled || availableOptions.length === 0}
          >
            <ScrollbarFreeSelectTrigger className="h-12">
              <ScrollbarFreeSelectValue 
                placeholder={availableOptions.length === 0 ? "All options selected" : placeholder} 
              />
            </ScrollbarFreeSelectTrigger>
            <ScrollbarFreeSelectContent>
              {availableOptions.map((option) => (
                <ScrollbarFreeSelectItem key={option.value} value={option.value}>
                  {option.label}
                </ScrollbarFreeSelectItem>
              ))}
            </ScrollbarFreeSelectContent>
          </ScrollbarFreeSelect>
        </div>
        
        <Button
          type="button"
          onClick={handleAdd}
          disabled={!selectedOption || disabled}
          className="h-12 px-4 bg-elec-yellow text-black hover:bg-elec-yellow/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

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