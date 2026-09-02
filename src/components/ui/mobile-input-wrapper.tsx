import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { inputCn, labelCn } from '@/components/forms/fieldStyles';

interface MobileInputWrapperProps {
  label?: string;
  placeholder?: string;
  value: string | number;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
  disabled?: boolean;
  type?: string;
  inputMode?: 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
  step?: string;
  min?: string;
  max?: string;
  icon?: React.ReactNode;
  unit?: string;
  className?: string;
}

export function MobileInputWrapper({
  label,
  placeholder,
  value,
  onChange,
  error,
  hint,
  disabled,
  type = 'text',
  inputMode = 'text',
  step,
  min,
  max,
  icon,
  unit,
  className,
}: MobileInputWrapperProps) {
  return (
    <div className={cn(className)}>
      {label && <Label className={labelCn}>{label}</Label>}

      <div className="relative group">
        <div className="relative">
          {icon && (
            <div className="absolute left-1 top-1/2 z-10 -translate-y-1/2 text-elec-yellow">
              {icon}
            </div>
          )}

          <Input
            type={type}
            inputMode={inputMode}
            step={step}
            min={min}
            max={max}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            autoComplete="off"
            className={cn(inputCn, icon && 'pl-8', unit && 'pr-14', error && '!border-red-400')}
          />

          {unit && (
            <div className="absolute right-1 top-1/2 -translate-y-1/2 text-sm font-medium text-white">
              {unit}
            </div>
          )}
        </div>
      </div>

      {hint && !error && <p className="mt-1.5 text-[11.5px] leading-snug text-white">{hint}</p>}
      {error && (
        <p className="mt-1.5 text-[11.5px] leading-snug text-red-300 animate-fade-in">{error}</p>
      )}
    </div>
  );
}
