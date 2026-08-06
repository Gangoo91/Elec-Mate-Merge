import React from 'react';
import { InputHTMLAttributes, forwardRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface CalculatorInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string;
  unit?: string;
  hint?: string;
  error?: string;
  onChange?: (value: string) => void;
}

/**
 * The calculator field style — the underline language from the design system.
 *
 * ⚠️ These MUST be utility classes passed through `cn()`, not an `@apply`'d
 * class in index.css. The base shadcn <Input> carries its own utilities
 * (`rounded-lg bg-input border border-border/50 placeholder:text-white`), and a
 * component-layer class loses to them every time — a `.calculator-input` rule
 * was doing exactly nothing here, and the fields still rendered as filled
 * rounded boxes with a placeholder the same colour as a real value. `cn()` uses
 * tailwind-merge, so utilities listed here beat the base component's.
 *
 * `md:text-base` is deliberate: the base sets `md:text-sm`, and anything under
 * 16px makes iOS zoom the viewport when the field is focused.
 */
const FIELD =
  'h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 ' +
  'text-base md:text-base font-medium text-white placeholder:text-white/25 ' +
  'caret-elec-yellow transition-colors hover:border-white/[0.3] ' +
  'focus:border-elec-yellow focus:outline-none focus:ring-0 focus-visible:ring-0 ' +
  '[color-scheme:dark] touch-manipulation';

export const CalculatorInput = forwardRef<HTMLInputElement, CalculatorInputProps>(
  ({ label, unit, hint, error, onChange, className, id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="space-y-1.5">
        <Label htmlFor={inputId} className="text-sm font-medium text-white">
          {label}
        </Label>
        <div className="relative">
          <Input
            ref={ref}
            id={inputId}
            onChange={(e) => onChange?.(e.target.value)}
            className={cn(
              FIELD,
              unit && 'pr-14',
              error && 'border-b-red-500/60 focus:border-b-red-500/60',
              className
            )}
            {...props}
          />
          {unit && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-white pointer-events-none">
              {unit}
            </span>
          )}
        </div>
        {hint && !error && <p className="text-xs text-white">{hint}</p>}
        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>
    );
  }
);

CalculatorInput.displayName = 'CalculatorInput';

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
  placeholder = 'Select...',
  hint,
  error,
  disabled,
  className,
}: CalculatorSelectProps) => {
  const selectId = label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="space-y-1.5">
      <Label htmlFor={selectId} className="text-sm font-medium text-white">
        {label}
      </Label>
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger
          id={selectId}
          className={cn(
            FIELD,
            error && 'border-b-red-500/60',
            className
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-card/95 backdrop-blur-xl border-white/10 rounded-xl shadow-xl shadow-black/20 p-1">
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="text-white focus:bg-white/10 focus:text-white rounded-lg transition-colors duration-150 cursor-pointer"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {hint && !error && <p className="text-xs text-white">{hint}</p>}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
};

// Number input with local draft state (preserves trailing decimal — ELE-14)
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
  // Local string state prevents parseFloat stripping trailing dot (ELE-14)
  const [draft, setDraft] = React.useState(value === '' || value === 0 ? '' : String(value));

  React.useEffect(() => {
    // Sync when parent resets value externally
    const str = value === '' || value === 0 ? '' : String(value);
    setDraft(str);
  }, [value]);

  const handleChange = (inputValue: string) => {
    if (inputValue === '' || /^\d*\.?\d*$/.test(inputValue)) {
      setDraft(inputValue);
    }
  };

  const handleBlur = () => {
    const num = parseFloat(draft);
    if (!isNaN(num)) {
      if (min !== undefined && num < min) {
        onChange(min);
        setDraft(String(min));
        return;
      }
      if (max !== undefined && num > max) {
        onChange(max);
        setDraft(String(max));
        return;
      }
      onChange(num);
    } else {
      onChange(0);
      setDraft('');
    }
  };

  return (
    <div className="space-y-1.5">
      <Label htmlFor={inputId} className="text-sm font-medium text-white">
        {label}
      </Label>
      <div className="relative">
        <Input
          id={inputId}
          type="text"
          inputMode="decimal"
          value={draft}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={handleBlur}
          className={cn(
            FIELD,
            '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
            unit && 'pr-14',
            error && 'border-b-red-500/60 focus:border-b-red-500/60',
            className
          )}
          {...props}
        />
        {unit && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-white pointer-events-none">
            {unit}
          </span>
        )}
      </div>
      {hint && !error && <p className="text-xs text-white">{hint}</p>}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
};
