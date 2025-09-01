import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface MobileInputWrapperProps {
  label?: string;
  placeholder?: string;
  value: string | number;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
  disabled?: boolean;
  type?: string;
  step?: string;
  min?: string;
  max?: string;
  icon?: React.ReactNode;
  unit?: string;
}

export function MobileInputWrapper({
  label,
  placeholder,
  value,
  onChange,
  error,
  hint,
  disabled,
  type = "text",
  step,
  min,
  max,
  icon,
  unit
}: MobileInputWrapperProps) {
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
          
          <Input
            type={type}
            step={step}
            min={min}
            max={max}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(
              "h-14 bg-elec-gray border-2 border-elec-gray/50 rounded-xl text-elec-light",
              "hover:border-elec-yellow/40 focus:border-elec-yellow transition-all duration-200",
              "placeholder:text-elec-light/60 text-base font-medium",
              icon ? "pl-12" : "pl-4",
              unit ? "pr-16" : "pr-4",
              error ? "border-destructive focus:border-destructive" : ""
            )}
          />
          
          {unit && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-elec-yellow/70 font-medium text-sm">
              {unit}
            </div>
          )}
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