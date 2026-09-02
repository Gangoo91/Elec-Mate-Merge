import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { labelCn, selectTriggerCn } from '@/components/forms/fieldStyles';

interface SelectOption {
  value: string;
  label: string;
  description?: string;
}

interface MobileSelectWrapperProps {
  label?: string;
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  hint?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  compact?: boolean;
}

export function MobileSelectWrapper({
  label,
  value,
  onValueChange,
  options,
  placeholder,
  error,
  hint,
  disabled,
  icon,
  compact = false,
}: MobileSelectWrapperProps) {
  return (
    <div>
      {label && <Label className={labelCn}>{label}</Label>}

      <div className="relative group">
        <div className="relative">
          {icon && !compact && (
            <div className="absolute left-1 top-1/2 z-10 -translate-y-1/2 text-elec-yellow">
              {icon}
            </div>
          )}

          <Select value={value || undefined} onValueChange={onValueChange} disabled={disabled}>
            <SelectTrigger
              className={cn(
                selectTriggerCn,
                'w-full',
                icon && !compact && 'pl-8',
                error && '!border-red-400'
              )}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className="border-white/[0.12] bg-[hsl(0_0%_10%)] text-white">
              {options
                .filter((option) => option.value !== '')
                .map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="min-h-11 text-white focus:bg-white/[0.08] focus:text-white"
                  >
                    <div>
                      <div className="font-medium">{option.label}</div>
                      {option.description && !compact && (
                        <div className="mt-1 text-xs text-white">{option.description}</div>
                      )}
                    </div>
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {!compact && hint && !error && (
        <p className="mt-1.5 text-[11.5px] leading-snug text-white">{hint}</p>
      )}
      {error && (
        <p className="mt-1.5 text-[11.5px] leading-snug text-red-300 animate-fade-in">{error}</p>
      )}
    </div>
  );
}
