
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useMobileEnhanced } from "@/hooks/use-mobile-enhanced";

interface MobileOptimizedInputProps {
  id: string;
  label: string;
  type?: string;
  inputMode?: "search" | "text" | "email" | "tel" | "url" | "decimal" | "none" | "numeric";
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  description?: string;
  unit?: string;
  className?: string;
  required?: boolean;
}

const MobileOptimizedInput: React.FC<MobileOptimizedInputProps> = ({
  id,
  label,
  type = "text",
  inputMode,
  value,
  onChange,
  placeholder,
  description,
  unit,
  className,
  required = false
}) => {
  const { isMobile, touchSupport } = useMobileEnhanced();

  return (
    <div className="space-y-2">
      <Label 
        htmlFor={id} 
        className={cn(
          "text-base font-medium block",
          isMobile && "text-base"
        )}
      >
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </Label>
      
      <div className="relative">
        <Input
          id={id}
          type={type}
          inputMode={inputMode}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "bg-elec-dark border-elec-yellow/20",
            isMobile && "h-12 text-base",
            touchSupport && "touch-manipulation",
            unit && "pr-12",
            className
          )}
        />
        {unit && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
            {unit}
          </div>
        )}
      </div>
      
      {description && (
        <p className={cn(
          "text-muted-foreground leading-relaxed",
          isMobile ? "text-sm" : "text-xs"
        )}>
          {description}
        </p>
      )}
    </div>
  );
};

export default MobileOptimizedInput;
