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
              "h-14 bg-card border border-muted/40 rounded-xl",
              "hover:border-elec-yellow/40 focus-visible:ring-2 focus-visible:ring-elec-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-all duration-200",
              "text-foreground placeholder:text-muted-foreground",
              "text-sm font-normal overflow-hidden",
              error ? "border-destructive focus-visible:ring-destructive" : ""
            )}
          >
            <MobileSelectValue 
              placeholder={placeholder} 
              className="text-sm font-normal text-foreground truncate"
            />
          </MobileSelectTrigger>
          <MobileSelectContent className="bg-card border border-muted/40 shadow-2xl z-[9999] max-w-[calc(100vw-2rem)]">
            {options.filter(option => option.value && option.value.trim() !== '').map((option) => (
              <MobileSelectItem 
                key={option.value} 
                value={option.value}
                className="text-foreground hover:bg-muted/50 focus:bg-muted/50 text-sm"
              >
                <span className="text-sm truncate">{option.label}</span>
              </MobileSelectItem>
            ))}
          </MobileSelectContent>
        </MobileSelect>
        
      </div>
      
      {hint && !error && (
        <p className="text-xs text-muted-foreground flex items-center gap-1">
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