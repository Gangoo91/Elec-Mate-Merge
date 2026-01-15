import React, { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
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
  const isMobile = useIsMobile();

  const selectedOption = options.find(o => o.value === value);

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
                  <span className="text-xs text-muted-foreground">{option.description}</span>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  // On mobile, use bottom sheet picker
  return (
    <>
      <button
        type="button"
        onClick={() => !disabled && setOpen(true)}
        disabled={disabled}
        className={cn(
          'flex items-center justify-between w-full h-11 px-3',
          'bg-background border border-input rounded-md',
          'touch-manipulation text-left',
          'transition-colors',
          disabled && 'opacity-50 cursor-not-allowed',
          !disabled && 'active:bg-muted/50',
          triggerClassName
        )}
      >
        <span className={cn(
          'truncate',
          !selectedOption && 'text-muted-foreground'
        )}>
          {selectedOption?.label || placeholder}
        </span>
        <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0 ml-2" />
      </button>

      <SwipeableBottomSheet
        open={open}
        onOpenChange={setOpen}
        title={title}
        contentClassName="pb-8"
      >
        <div className="space-y-1.5">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onValueChange(option.value);
                setOpen(false);
              }}
              className={cn(
                'w-full flex items-center justify-between',
                'min-h-[56px] px-4 py-3 rounded-xl',
                'touch-manipulation active:scale-[0.98]',
                'transition-all duration-150',
                value === option.value
                  ? 'bg-elec-yellow/20 text-elec-yellow border border-elec-yellow/30'
                  : 'bg-white/5 hover:bg-white/10 border border-transparent'
              )}
            >
              <div className="flex flex-col items-start text-left">
                <span className="text-base font-medium">{option.label}</span>
                {option.description && (
                  <span className="text-xs text-muted-foreground mt-0.5">{option.description}</span>
                )}
              </div>
              {value === option.value && (
                <Check className="h-5 w-5 flex-shrink-0 ml-3" />
              )}
            </button>
          ))}
        </div>
      </SwipeableBottomSheet>
    </>
  );
};

export default MobileSelectPicker;
