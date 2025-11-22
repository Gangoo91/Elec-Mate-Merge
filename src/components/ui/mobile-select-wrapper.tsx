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
  compact?: boolean;
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
  icon,
  compact = false
}: MobileSelectWrapperProps) {
  return (
    <div className={cn(compact ? "space-y-1.5" : "space-y-3")}>
      {label && (
        <Label className={cn(
          "flex items-center gap-2",
          compact 
            ? "text-xs font-medium text-muted-foreground" 
            : "text-sm font-semibold text-elec-light"
        )}>
          {!compact && <span className="w-1 h-4 bg-elec-yellow rounded-full"></span>}
          {label}
        </Label>
      )}
      
      <div className="relative group">
        <div className="relative">
          {icon && !compact && (
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-elec-yellow/70 z-10">
              {icon}
            </div>
          )}
          
          <Select value={value || undefined} onValueChange={onValueChange} disabled={disabled}>
            <SelectTrigger className={cn(
              compact ? "h-11" : "h-14",
              "bg-card border border-primary/30 rounded-xl text-elec-light",
              "hover:border-elec-yellow/40 focus:border-elec-yellow transition-all duration-200",
              compact ? "text-sm" : "text-base font-medium",
              icon && !compact ? "pl-12" : "pl-4",
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
                    {option.description && !compact && (
                      <div className="text-xs text-elec-light/60 mt-1">{option.description}</div>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {!compact && hint && !error && (
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