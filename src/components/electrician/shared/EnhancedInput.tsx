import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RequiredFieldTooltip } from "@/components/ui/required-field-tooltip";
import { cn } from "@/lib/utils";

interface EnhancedInputProps {
  id: string;
  label: string;
  type?: "text" | "email" | "tel" | "number";
  inputMode?: "search" | "text" | "email" | "tel" | "url" | "decimal" | "none" | "numeric";
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  helpText?: string;
  unit?: string;
  className?: string;
  error?: string;
  pattern?: string;
}

export const EnhancedInput: React.FC<EnhancedInputProps> = ({
  id,
  label,
  type = "text",
  inputMode,
  value,
  onChange,
  placeholder,
  required = false,
  helpText,
  unit,
  className,
  error,
  pattern
}) => {
  // Auto-set inputMode based on type if not explicitly provided
  const effectiveInputMode = inputMode || (
    type === "email" ? "email" :
    type === "tel" ? "tel" :
    type === "number" ? "numeric" :
    "text"
  );

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Label htmlFor={id} className="text-base font-medium">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
        {helpText && <RequiredFieldTooltip content={helpText} />}
      </div>
      
      <div className="relative">
        <Input
          id={id}
          type={type}
          inputMode={effectiveInputMode}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          pattern={pattern}
          className={cn(
            "h-14 touch-manipulation",
            unit && "pr-12",
            error && "border-destructive focus-visible:border-destructive",
            className
          )}
        />
        {unit && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">
            {unit}
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
      
      {!error && placeholder && (
        <p className="text-xs text-muted-foreground">
          Example: {placeholder}
        </p>
      )}
    </div>
  );
};
