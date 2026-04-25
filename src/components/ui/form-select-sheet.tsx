/**
 * FormSelectSheet — Native-feel bottom drawer select for EICR forms
 * Replaces shadcn Select dropdowns with a mobile-first bottom sheet
 * Follows existing EICR sheet patterns (h-11 targets, elec-yellow accent)
 */

import React, { useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Check, ChevronDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';

export interface SelectOption {
  value: string;
  label: string;
  group?: string;
  description?: string;
}

interface FormSelectSheetProps {
  value: string;
  onValueChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  label?: string;
  allowCustom?: boolean;
  customLabel?: string;
  className?: string;
  disabled?: boolean;
}

const FormSelectSheet: React.FC<FormSelectSheetProps> = ({
  value,
  onValueChange,
  options,
  placeholder = 'Select',
  label,
  allowCustom = false,
  customLabel = 'Other (specify)',
  className,
  disabled = false,
}) => {
  const [open, setOpen] = useState(false);
  const [customMode, setCustomMode] = useState(false);
  const [customValue, setCustomValue] = useState('');
  const haptic = useHaptic();

  // Find current display label
  const selectedOption = options.find((o) => o.value === value);
  const displayLabel = selectedOption?.label || value || '';

  // Check if current value is a custom one (not in the options list)
  const isCustomValue = value && !selectedOption && value !== '__clear__';

  // Group options if any have group property
  const groups = options.reduce<Record<string, SelectOption[]>>((acc, opt) => {
    const group = opt.group || '_default';
    if (!acc[group]) acc[group] = [];
    acc[group].push(opt);
    return acc;
  }, {});
  const hasGroups = Object.keys(groups).length > 1 || !groups['_default'];

  const handleSelect = (optionValue: string) => {
    haptic.light();
    if (optionValue === '__clear__') {
      onValueChange('');
    } else {
      onValueChange(optionValue);
    }
    setCustomMode(false);
    setOpen(false);
  };

  const handleCustomSubmit = () => {
    if (customValue.trim()) {
      haptic.light();
      onValueChange(customValue.trim());
      setCustomMode(false);
      setCustomValue('');
      setOpen(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => {
          if (!disabled) {
            haptic.light();
            setOpen(true);
          }
        }}
        disabled={disabled}
        className={cn(
          'w-full h-11 px-3 rounded-lg text-left text-base touch-manipulation',
          'bg-white/[0.06] border border-white/[0.08]',
          'flex items-center justify-between gap-2',
          'active:scale-[0.99] transition-all',
          disabled && 'opacity-50 cursor-not-allowed',
          !displayLabel && 'text-white',
          displayLabel && 'text-white',
          className
        )}
      >
        <span className="truncate text-sm">
          {isCustomValue ? value : displayLabel || placeholder}
        </span>
        <ChevronDown className="h-4 w-4 text-white flex-shrink-0" />
      </button>

      {/* Bottom Sheet */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="bottom"
          hideCloseButton
          className="p-0 rounded-t-2xl overflow-hidden h-[85vh]"
        >
          <div className="flex flex-col h-full bg-background">
            {/* Drag handle */}
            <div className="flex justify-center pt-2 pb-1 flex-shrink-0">
              <div className="h-1 w-10 rounded-full bg-white/20" />
            </div>
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] flex-shrink-0">
              <h3 className="text-sm font-semibold text-white">
                {label || placeholder}
              </h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white touch-manipulation"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Custom Input Mode */}
            {customMode ? (
              <div className="p-4 space-y-3">
                <input
                  type="text"
                  value={customValue}
                  onChange={(e) => setCustomValue(e.target.value)}
                  placeholder="Enter custom value..."
                  autoFocus
                  className="w-full h-11 px-3 rounded-lg text-base bg-white/[0.06] border border-white/[0.08] text-white placeholder:text-white/30 focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow touch-manipulation"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleCustomSubmit();
                  }}
                />
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setCustomMode(false)}
                    className="h-11 rounded-lg text-sm font-medium bg-white/[0.05] border border-white/[0.08] text-white touch-manipulation active:scale-[0.98]"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleCustomSubmit}
                    className="h-11 rounded-lg text-sm font-semibold bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow touch-manipulation active:scale-[0.98]"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            ) : (
              /* Options List */
              <div className="overflow-y-auto flex-1 pb-safe">
                {/* Clear option */}
                <button
                  type="button"
                  onClick={() => handleSelect('__clear__')}
                  className="w-full h-11 px-4 flex items-center justify-between text-sm text-white/50 border-b border-white/[0.04] touch-manipulation active:bg-white/[0.05]"
                >
                  <span>Clear selection</span>
                </button>

                {/* Grouped or flat options */}
                {hasGroups
                  ? Object.entries(groups).map(([groupName, groupOptions]) => (
                      <div key={groupName}>
                        {groupName !== '_default' && (
                          <div className="px-4 py-2 bg-white/[0.02]">
                            <span className="text-[10px] font-semibold text-white uppercase tracking-wider">
                              {groupName}
                            </span>
                          </div>
                        )}
                        {groupOptions.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => handleSelect(option.value)}
                            className={cn(
                              'w-full h-11 px-4 flex items-center justify-between text-sm border-b border-white/[0.04] touch-manipulation active:bg-white/[0.05] transition-colors',
                              value === option.value
                                ? 'text-elec-yellow bg-elec-yellow/5'
                                : 'text-white'
                            )}
                          >
                            <div className="flex flex-col items-start">
                              <span>{option.label}</span>
                              {option.description && (
                                <span className="text-[10px] text-white">
                                  {option.description}
                                </span>
                              )}
                            </div>
                            {value === option.value && (
                              <Check className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                            )}
                          </button>
                        ))}
                      </div>
                    ))
                  : options.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleSelect(option.value)}
                        className={cn(
                          'w-full h-11 px-4 flex items-center justify-between text-sm border-b border-white/[0.04] touch-manipulation active:bg-white/[0.05] transition-colors',
                          value === option.value
                            ? 'text-elec-yellow bg-elec-yellow/5'
                            : 'text-white'
                        )}
                      >
                        <div className="flex flex-col items-start">
                          <span>{option.label}</span>
                          {option.description && (
                            <span className="text-[10px] text-white">
                              {option.description}
                            </span>
                          )}
                        </div>
                        {value === option.value && (
                          <Check className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                        )}
                      </button>
                    ))}

                {/* Custom option */}
                {allowCustom && (
                  <button
                    type="button"
                    onClick={() => {
                      haptic.light();
                      setCustomMode(true);
                      setCustomValue(isCustomValue ? value : '');
                    }}
                    className={cn(
                      'w-full h-11 px-4 flex items-center justify-between text-sm border-b border-white/[0.04] touch-manipulation active:bg-white/[0.05]',
                      isCustomValue
                        ? 'text-elec-yellow bg-elec-yellow/5'
                        : 'text-amber-400/80'
                    )}
                  >
                    <span>{customLabel}</span>
                    {isCustomValue && (
                      <Check className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                    )}
                  </button>
                )}
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default FormSelectSheet;
