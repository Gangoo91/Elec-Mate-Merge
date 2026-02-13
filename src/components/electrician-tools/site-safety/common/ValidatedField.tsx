import React from "react";
import { CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { FieldValidation } from "@/hooks/useFieldValidation";

interface ValidatedFieldProps {
  name: string;
  label: string;
  validation: FieldValidation;
  placeholder?: string;
  type?: "text" | "number" | "date" | "time" | "email" | "tel";
  multiline?: boolean;
  required?: boolean;
  inputMode?: "text" | "numeric" | "email" | "tel";
  className?: string;
}

export function ValidatedField({
  name,
  label,
  validation,
  placeholder,
  type = "text",
  multiline = false,
  required = false,
  inputMode,
  className,
}: ValidatedFieldProps) {
  const field = validation.fields[name];
  const hasError = field?.touched && field?.error;
  const showValid = field?.touched && field?.valid && field?.value.trim();

  const inputClasses = `h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500 ${
    hasError
      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
      : showValid
      ? "border-green-500/50 focus:border-green-500 focus:ring-green-500/20"
      : ""
  }`;

  const textareaClasses = `touch-manipulation text-base min-h-[120px] focus:ring-2 focus:ring-elec-yellow/20 border-white/30 focus:border-yellow-500 ${
    hasError
      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
      : showValid
      ? "border-green-500/50 focus:border-green-500 focus:ring-green-500/20"
      : ""
  }`;

  return (
    <div className={className} ref={validation.registerRef(name)}>
      <div className="flex items-center justify-between mb-1">
        <label className="block text-sm font-medium text-white">
          {label}
          {required && <span className="text-red-400 ml-0.5">*</span>}
        </label>
        {showValid && (
          <CheckCircle2 className="h-3.5 w-3.5 text-green-400" />
        )}
      </div>

      {multiline ? (
        <Textarea
          value={field?.value ?? ""}
          onChange={(e) => validation.setValue(name, e.target.value)}
          onBlur={() => validation.setTouched(name)}
          placeholder={placeholder}
          className={textareaClasses}
        />
      ) : (
        <Input
          type={type}
          inputMode={inputMode}
          value={field?.value ?? ""}
          onChange={(e) => validation.setValue(name, e.target.value)}
          onBlur={() => validation.setTouched(name)}
          placeholder={placeholder}
          className={inputClasses}
        />
      )}

      {hasError && (
        <p className="text-xs text-red-400 mt-1">{field.error}</p>
      )}
    </div>
  );
}

export default ValidatedField;
