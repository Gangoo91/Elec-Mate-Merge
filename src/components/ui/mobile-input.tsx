import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

export interface MobileInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  unit?: string;
  clearError?: () => void;
}

const MobileInput = React.forwardRef<HTMLInputElement, MobileInputProps>(
  ({ className, type, label, error, hint, unit, clearError, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    
    return (
      <div className="space-y-2">
        {label && (
          <Label 
            htmlFor={inputId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </Label>
        )}
        <div className="relative">
          <input
            type={type}
            id={inputId}
            className={cn(
              "flex h-12 w-full rounded-md border border-primary/30 bg-card px-3 py-2 text-sm",
              "ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium",
              "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2",
              "focus-visible:ring-elec-yellow focus-visible:ring-offset-2 disabled:cursor-not-allowed",
              "disabled:opacity-50 transition-colors",
              // Mobile-specific improvements
              "touch-manipulation text-base", // Prevent zoom on iOS
              unit && "pr-12", // Add right padding if unit exists
              error && "border-destructive focus-visible:ring-destructive",
              className
            )}
            ref={ref}
            onChange={(e) => {
              if (clearError) clearError();
              props.onChange?.(e);
            }}
            {...props}
          />
          {unit && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              {unit}
            </div>
          )}
        </div>
        {hint && !error && (
          <p className="text-xs text-muted-foreground">{hint}</p>
        )}
        {error && (
          <p className="text-xs text-destructive animate-fade-in">{error}</p>
        )}
      </div>
    );
  }
);
MobileInput.displayName = "MobileInput";

export { MobileInput };