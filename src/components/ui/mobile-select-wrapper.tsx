import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface SelectOption {
  value: string;
  label: string;
  description?: string;
}

interface MobileSelectWrapperProps {
  label?: string;
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  hint?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export function MobileSelectWrapper({
  label,
  value,
  onValueChange,
  options,
  placeholder,
  error,
  hint,
  disabled,
  icon
}: MobileSelectWrapperProps) {
  return (
    <div className="space-y-3">
      {label && (
        <Label className="text-sm font-semibold text-elec-light flex items-center gap-2">
          <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>
          {label}
        </Label>
      )}
      
      <div className="relative group">
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-elec-yellow/70 z-10">
              {icon}
            </div>
          )}
          
          <Select value={value || undefined} onValueChange={onValueChange} disabled={disabled}>
            <SelectTrigger className={cn(
              "h-14 bg-card border-2 border-elec-gray/50 rounded-xl text-elec-light",
              "hover:border-elec-yellow/40 focus:border-elec-yellow transition-all duration-200",
              "text-base font-medium",
              icon ? "pl-12" : "pl-4",
              error ? "border-destructive focus:border-destructive" : ""
            )}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="bg-card border-elec-yellow/30">
              {options.filter(option => option.value !== "").map((option) => (
                <SelectItem 
                  key={option.value} 
                  value={option.value}
                  className="text-elec-light hover:bg-elec-yellow/10 focus:bg-elec-yellow/10"
                >
                  <div>
                    <div className="font-medium">{option.label}</div>
                    {option.description && (
                      <div className="text-xs text-elec-light/60 mt-1">{option.description}</div>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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