import { InputHTMLAttributes, forwardRef, SelectHTMLAttributes } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface CalculatorInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string;
  unit?: string;
  hint?: string;
  error?: string;
  onChange?: (value: string) => void;
}

export const CalculatorInput = forwardRef<HTMLInputElement, CalculatorInputProps>(
  ({ label, unit, hint, error, onChange, className, id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label
            htmlFor={inputId}
            className="text-sm font-medium text-white/80"
          >
            {label}
          </Label>
          {unit && (
            <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-white/10 text-white/60">
              {unit}
            </span>
          )}
        </div>
        <Input
          ref={ref}
          id={inputId}
          onChange={(e) => onChange?.(e.target.value)}
          className={cn(
            "calculator-input h-12 bg-white/5 border-white/10 rounded-xl",
            "text-base placeholder:text-white/30",
            "focus:border-white/20 focus:ring-1 focus:ring-white/10",
            "transition-all duration-200",
            error && "border-red-500/50 focus:border-red-500/50",
            className
          )}
          {...props}
        />
        {hint && !error && (
          <p className="text-xs text-white/40">{hint}</p>
        )}
        {error && (
          <p className="text-xs text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

CalculatorInput.displayName = "CalculatorInput";

// Select component for calculator dropdowns
interface CalculatorSelectOption {
  value: string;
  label: string;
}

interface CalculatorSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: CalculatorSelectOption[];
  placeholder?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export const CalculatorSelect = ({
  label,
  value,
  onChange,
  options,
  placeholder = "Select...",
  hint,
  error,
  disabled,
  className
}: CalculatorSelectProps) => {
  const selectId = label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="space-y-1.5">
      <Label
        htmlFor={selectId}
        className="text-sm font-medium text-white/80"
      >
        {label}
      </Label>
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger
          id={selectId}
          className={cn(
            "calculator-input h-12 bg-white/5 border-white/10 rounded-xl",
            "text-base",
            "focus:ring-1 focus:ring-white/10",
            "transition-all duration-200",
            error && "border-red-500/50",
            className
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-card border-white/10 rounded-xl">
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="text-white/80 focus:bg-white/10 focus:text-white rounded-lg"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {hint && !error && (
        <p className="text-xs text-white/40">{hint}</p>
      )}
      {error && (
        <p className="text-xs text-red-400">{error}</p>
      )}
    </div>
  );
};

// Number input with increment/decrement buttons
interface CalculatorNumberInputProps extends Omit<CalculatorInputProps, 'type' | 'onChange'> {
  value: number | string;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

export const CalculatorNumberInput = ({
  label,
  unit,
  hint,
  error,
  value,
  onChange,
  min,
  max,
  step = 1,
  className,
  ...props
}: CalculatorNumberInputProps) => {
  const inputId = label.toLowerCase().replace(/\s+/g, '-');

  const handleChange = (inputValue: string) => {
    const num = parseFloat(inputValue);
    if (!isNaN(num)) {
      if (min !== undefined && num < min) return onChange(min);
      if (max !== undefined && num > max) return onChange(max);
      onChange(num);
    } else if (inputValue === '') {
      onChange(0);
    }
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <Label
          htmlFor={inputId}
          className="text-sm font-medium text-white/80"
        >
          {label}
        </Label>
        {unit && (
          <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-white/10 text-white/60">
            {unit}
          </span>
        )}
      </div>
      <Input
        id={inputId}
        type="number"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        min={min}
        max={max}
        step={step}
        className={cn(
          "calculator-input h-12 bg-white/5 border-white/10 rounded-xl",
          "text-base placeholder:text-white/30",
          "focus:border-white/20 focus:ring-1 focus:ring-white/10",
          "transition-all duration-200",
          "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
          error && "border-red-500/50 focus:border-red-500/50",
          className
        )}
        {...props}
      />
      {hint && !error && (
        <p className="text-xs text-white/40">{hint}</p>
      )}
      {error && (
        <p className="text-xs text-red-400">{error}</p>
      )}
    </div>
  );
};
