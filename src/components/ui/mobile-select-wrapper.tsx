import React from 'react';
import {
  MobileSelect,
  MobileSelectContent,
  MobileSelectItem,
  MobileSelectTrigger,
  MobileSelectValue,
} from "@/components/ui/mobile-select";
import { Label } from "@/components/ui/label";

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
    <div className="space-y-2">
      {label && (
        <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
        </Label>
      )}
      <MobileSelect value={value} onValueChange={onValueChange} disabled={disabled}>
        <MobileSelectTrigger className={error ? "border-destructive focus:ring-destructive" : ""}>
          <MobileSelectValue placeholder={placeholder} />
        </MobileSelectTrigger>
        <MobileSelectContent>
          {options.map((option) => (
            <MobileSelectItem key={option.value} value={option.value}>
              {option.label}
            </MobileSelectItem>
          ))}
        </MobileSelectContent>
      </MobileSelect>
      {hint && !error && (
        <p className="text-xs text-muted-foreground">{hint}</p>
      )}
      {error && (
        <p className="text-xs text-destructive animate-fade-in">{error}</p>
      )}
    </div>
  );
}