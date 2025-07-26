import React from 'react';
import {
  MobileSelect,
  MobileSelectContent,
  MobileSelectItem,
  MobileSelectTrigger,
  MobileSelectValue,
} from "@/components/ui/mobile-select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface SelectOption {
  value: string;
  label: string;
}

interface MobileSelectWrapperProps {
  label?: string;
  placeholder?: string;
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  error?: string;
  hint?: string;
  disabled?: boolean;
}

export function MobileSelectWrapper({
  label,
  placeholder,
  value,
  onValueChange,
  options,
  error,
  hint,
  disabled
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
        <MobileSelect value={value} onValueChange={onValueChange} disabled={disabled}>
          <MobileSelectTrigger 
            className={cn(
              "h-14 bg-elec-card border-2 border-elec-gray/50 rounded-xl",
              "hover:border-elec-yellow/40 focus:border-elec-yellow transition-all duration-200",
              "group-hover:shadow-lg group-hover:shadow-elec-yellow/10",
              "text-elec-light placeholder:text-elec-light/60",
              "text-sm font-normal overflow-hidden",
              error ? "border-destructive focus:border-destructive" : ""
            )}
          >
            <MobileSelectValue 
              placeholder={placeholder} 
              className="text-sm font-normal text-elec-light truncate"
            />
          </MobileSelectTrigger>
          <MobileSelectContent className="bg-elec-card border-elec-gray/50 shadow-xl z-50">
            {options.map((option) => (
              <MobileSelectItem 
                key={option.value} 
                value={option.value}
                className="text-elec-light hover:bg-elec-yellow/20 focus:bg-elec-yellow/20 text-sm"
              >
                <span className="text-sm truncate">{option.label}</span>
              </MobileSelectItem>
            ))}
          </MobileSelectContent>
        </MobileSelect>
        
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