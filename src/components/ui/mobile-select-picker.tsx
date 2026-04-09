import React, { useState, useRef } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { SwipeableBottomSheet } from '@/components/native/SwipeableBottomSheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export interface SelectOption {
  value: string;
  label: string;
  description?: string;
}

interface MobileSelectPickerProps {
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  title?: string;
  triggerClassName?: string;
  disabled?: boolean;
}

/**
 * Mobile-native select picker
 * - On mobile: Opens as a swipeable bottom sheet with large touch targets
 * - On desktop: Uses standard Radix Select dropdown
 */
export const MobileSelectPicker = ({
  value,
  onValueChange,
  options,
  placeholder = 'Select...',
  title,
  triggerClassName,
  disabled = false,
}: MobileSelectPickerProps) => {
  const [open, setOpen] = useState(false);
  const [customValue, setCustomValue] = useState('');
  const customInputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();

  const selectedOption = options.find((o) => o.value === value);

  // On desktop, use regular Radix Select
  if (!isMobile) {
    return (
      <Select value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger
          className={cn(
            'h-11 touch-manipulation bg-background border-input',
            'focus:border-elec-yellow focus:ring-elec-yellow',
            'data-[state=open]:border-elec-yellow data-[state=open]:ring-2',
            triggerClassName
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="z-[100] max-w-[calc(100vw-2rem)] bg-card border-border text-foreground">
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="min-h-[44px] touch-manipulation"
            >
              <div className="flex flex-col">
                <span>{option.label}</span>
                {option.description && (
                  <span className="text-xs text-white/60">{option.description}</span>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  // Check if current value is custom (not in options list)
  const isCustom = value && !options.some((o) => o.value === value);
  const displayLabel = selectedOption?.label || (isCustom ? value : placeholder);

  // On mobile, use bottom sheet picker
  return (
    <>
      <button
        type="button"
        onClick={() => !disabled && setOpen(true)}
        disabled={disabled}
        className={cn(
          'flex items-center justify-between w-full h-11 px-3',
          'bg-white/[0.06] border border-white/[0.08] rounded-lg',
          'touch-manipulation text-left text-white',
          'transition-colors',
          disabled && 'opacity-50 cursor-not-allowed',
          !disabled && 'active:bg-white/[0.08]',
          triggerClassName
        )}
      >
        <span className={cn('truncate', !selectedOption && !isCustom && 'text-white')}>
          {displayLabel}
        </span>
        <ChevronDown className="h-4 w-4 text-white flex-shrink-0 ml-2" />
      </button>

      <SwipeableBottomSheet
        open={open}
        onOpenChange={setOpen}
        title={title}
        contentClassName="pb-8 max-h-[80vh] overflow-y-auto"
      >
        <div className={cn(options.length > 4 ? 'grid grid-cols-2 gap-1' : 'space-y-1')}>
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onValueChange(option.value);
                setCustomValue('');
                setOpen(false);
              }}
              className={cn(
                'w-full flex items-center justify-between',
                'h-11 px-3 rounded-lg',
                'touch-manipulation active:scale-[0.98]',
                'transition-all duration-150',
                value === option.value
                  ? 'bg-elec-yellow/20 text-elec-yellow border border-elec-yellow/30'
                  : 'bg-white/[0.05] hover:bg-white/[0.08] border border-transparent'
              )}
            >
              <span className="text-xs font-medium truncate">{option.label}</span>
              {value === option.value && <Check className="h-3.5 w-3.5 flex-shrink-0 ml-1" />}
            </button>
          ))}
        </div>

        {/* Custom value input */}
        <div className="mt-3 pt-3 border-t border-white/[0.06]">
          <div className="flex gap-2">
            <Input
              ref={customInputRef}
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
              placeholder="Or type custom value..."
              className="h-11 text-sm bg-white/[0.06] border-white/[0.08] flex-1"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && customValue.trim()) {
                  onValueChange(customValue.trim());
                  setCustomValue('');
                  setOpen(false);
                }
              }}
            />
            <button
              type="button"
              disabled={!customValue.trim()}
              onClick={() => {
                if (customValue.trim()) {
                  onValueChange(customValue.trim());
                  setCustomValue('');
                  setOpen(false);
                }
              }}
              className="h-11 px-4 rounded-lg font-semibold text-xs bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow touch-manipulation active:scale-[0.98] disabled:opacity-30"
            >
              Use
            </button>
          </div>
        </div>
      </SwipeableBottomSheet>
    </>
  );
};

export default MobileSelectPicker;
