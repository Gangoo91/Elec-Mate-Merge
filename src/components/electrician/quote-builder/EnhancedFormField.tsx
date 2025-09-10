import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface BaseFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
}

interface InputFieldProps extends BaseFieldProps {
  type?: "text" | "email" | "tel" | "date";
}

interface TextareaFieldProps extends BaseFieldProps {
  rows?: number;
}

interface SelectFieldProps extends BaseFieldProps {
  options: { value: string; label: string }[];
}

const FieldWrapper = ({ 
  children, 
  label, 
  required, 
  error, 
  hint, 
  value, 
  className 
}: {
  children: React.ReactNode;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  value: string;
  className?: string;
}) => {
  const isValid = !error && value.trim().length > 0;
  const isEmpty = value.trim().length === 0;

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium flex items-center gap-2">
          {label}
          {required && <span className="text-destructive">*</span>}
        </Label>
        {!isEmpty && (
          <div className="flex items-center">
            {isValid ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <AlertCircle className="h-4 w-4 text-destructive" />
            )}
          </div>
        )}
      </div>
      {children}
      {error && (
        <div className="flex items-center gap-2 text-sm text-destructive">
          <AlertCircle className="h-3 w-3" />
          {error}
        </div>
      )}
      {hint && !error && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Info className="h-3 w-3" />
          {hint}
        </div>
      )}
    </div>
  );
};

export const EnhancedInputField = ({ 
  type = "text", 
  ...props 
}: InputFieldProps) => (
  <FieldWrapper {...props}>
    <Input
      type={type}
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      placeholder={props.placeholder}
      className={cn(
        "transition-all duration-200",
        props.error && "border-destructive focus:border-destructive",
        !props.error && props.value.trim().length > 0 && "border-green-600"
      )}
    />
  </FieldWrapper>
);

export const EnhancedTextareaField = ({ 
  rows = 3, 
  ...props 
}: TextareaFieldProps) => (
  <FieldWrapper {...props}>
    <Textarea
      rows={rows}
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      placeholder={props.placeholder}
      className={cn(
        "transition-all duration-200 resize-none",
        props.error && "border-destructive focus:border-destructive",
        !props.error && props.value.trim().length > 0 && "border-green-600"
      )}
    />
  </FieldWrapper>
);

export const EnhancedSelectField = ({ 
  options, 
  ...props 
}: SelectFieldProps) => (
  <FieldWrapper {...props}>
    <Select value={props.value} onValueChange={props.onChange}>
      <SelectTrigger className={cn(
        "transition-all duration-200",
        props.error && "border-destructive focus:border-destructive",
        !props.error && props.value.trim().length > 0 && "border-green-600"
      )}>
        <SelectValue placeholder={props.placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </FieldWrapper>
);