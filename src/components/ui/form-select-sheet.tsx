/**
 * FormSelectSheet — select control for the certificate forms.
 *
 * Mobile: native-feel bottom drawer (thumb-reachable, large targets).
 * Desktop: an anchored dropdown — a drawer sliding up over a desktop form
 * covers the fields you're working through and makes filling in slower
 * (founder call, 2026-08-02). Same options, same behaviour, both paths.
 */

import React, { useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, ChevronDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();

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

  const triggerClassName = cn(
    'w-full h-11 px-3 rounded-lg text-left text-base touch-manipulation',
    'bg-white/[0.06] border border-white/[0.08]',
    'flex items-center justify-between gap-2',
    'active:scale-[0.99] transition-all outline-none focus:outline-none focus-visible:outline-none',
    disabled && 'opacity-50 cursor-not-allowed',
    'text-white',
    className
  );

  const triggerInner = (
    <>
      <span className="truncate text-sm">
        {isCustomValue ? value : displayLabel || placeholder}
      </span>
      <ChevronDown className="h-4 w-4 text-white flex-shrink-0" />
    </>
  );

  /** Option rows — shared by the drawer and the dropdown so the two paths can
   * never drift apart. `dense` tightens them for the desktop dropdown. */
  const renderOptions = (dense: boolean) => {
    const rowCn = (isSelected: boolean) =>
      cn(
        'w-full px-4 flex items-center justify-between text-sm touch-manipulation transition-colors',
        dense ? 'h-10 rounded-lg' : 'h-11 border-b border-white/[0.04]',
        isSelected
          ? 'bg-elec-yellow font-semibold text-black'
          : 'text-white hover:bg-white/[0.06] active:bg-white/[0.05]'
      );

    const optionRow = (option: SelectOption) => {
      const isSelected = value === option.value;
      return (
        <button
          key={option.value}
          type="button"
          onClick={() => handleSelect(option.value)}
          className={rowCn(isSelected)}
        >
          <div className="flex min-w-0 flex-col items-start">
            <span className="truncate">{option.label}</span>
            {option.description && (
              <span className={cn('text-[10px]', isSelected ? 'text-black/70' : 'text-white/85')}>
                {option.description}
              </span>
            )}
          </div>
          {isSelected && <Check className="h-4 w-4 flex-shrink-0" />}
        </button>
      );
    };

    return (
      <>
        {/* Clear option */}
        <button
          type="button"
          onClick={() => handleSelect('__clear__')}
          className={cn(
            'w-full px-4 flex items-center text-sm text-white/85 touch-manipulation transition-colors hover:bg-white/[0.06]',
            dense ? 'h-10 rounded-lg' : 'h-11 border-b border-white/[0.04]'
          )}
        >
          Clear selection
        </button>

        {hasGroups
          ? Object.entries(groups).map(([groupName, groupOptions]) => (
              <div key={groupName}>
                {groupName !== '_default' && (
                  <div className="px-4 py-2">
                    <span className="text-[11px] font-semibold text-white/85">{groupName}</span>
                  </div>
                )}
                {groupOptions.map(optionRow)}
              </div>
            ))
          : options.map(optionRow)}

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
              'w-full px-4 flex items-center justify-between text-sm touch-manipulation transition-colors',
              dense ? 'h-10 rounded-lg' : 'h-11 border-b border-white/[0.04]',
              isCustomValue
                ? 'bg-elec-yellow font-semibold text-black'
                : 'text-white hover:bg-white/[0.06]'
            )}
          >
            <span>{customLabel}</span>
            {isCustomValue && <Check className="h-4 w-4 flex-shrink-0" />}
          </button>
        )}
      </>
    );
  };

  /** Custom-value entry — shared by both surfaces. */
  const customEntry = (
    <div className="space-y-3 p-4">
      <input
        type="text"
        value={customValue}
        onChange={(e) => setCustomValue(e.target.value)}
        placeholder="Enter custom value…"
        autoFocus
        className="h-11 w-full rounded-lg border border-white/[0.12] bg-white/[0.06] px-3 text-base text-white placeholder:text-white/25 caret-elec-yellow outline-none transition-colors focus:border-elec-yellow touch-manipulation"
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleCustomSubmit();
        }}
      />
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setCustomMode(false)}
          className="h-11 rounded-xl border border-white/[0.12] bg-white/[0.06] text-sm font-medium text-white touch-manipulation active:scale-[0.98]"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleCustomSubmit}
          disabled={!customValue.trim()}
          className="h-11 rounded-xl bg-elec-yellow text-sm font-semibold text-black touch-manipulation active:scale-[0.98] disabled:bg-white/[0.08] disabled:text-white/70"
        >
          Confirm
        </button>
      </div>
    </div>
  );

  // ── Desktop: anchored dropdown ──────────────────────────────────────────
  if (!isMobile) {
    return (
      <Popover
        open={open}
        onOpenChange={(next) => {
          if (disabled) return;
          setOpen(next);
          if (!next) setCustomMode(false);
        }}
      >
        <PopoverTrigger asChild>
          <button type="button" disabled={disabled} className={triggerClassName}>
            {triggerInner}
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          sideOffset={4}
          className="z-[9999] w-[max(var(--radix-popover-trigger-width),260px)] max-w-[min(92vw,420px)] overflow-hidden rounded-xl border border-white/[0.14] bg-[hsl(0_0%_16%)] p-0 shadow-[0_16px_40px_rgba(0,0,0,0.55)]"
        >
          {customMode ? (
            customEntry
          ) : (
            <div className="max-h-[320px] overflow-y-auto p-1">{renderOptions(true)}</div>
          )}
        </PopoverContent>
      </Popover>
    );
  }

  // ── Mobile: bottom drawer ───────────────────────────────────────────────
  return (
    <>
      <button
        type="button"
        onClick={() => {
          if (!disabled) {
            haptic.light();
            setOpen(true);
          }
        }}
        disabled={disabled}
        className={triggerClassName}
      >
        {triggerInner}
      </button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="bottom"
          hideCloseButton
          className="h-[85vh] overflow-hidden rounded-t-2xl p-0 outline-none focus:outline-none focus-visible:outline-none"
        >
          <div className="flex h-full flex-col bg-background">
            {/* Drag handle */}
            <div className="flex flex-shrink-0 justify-center pb-1 pt-2">
              <div className="h-1 w-10 rounded-full bg-white/20" />
            </div>
            {/* Header */}
            <div className="flex flex-shrink-0 items-center justify-between border-b border-white/[0.08] px-4 py-3">
              <h3 className="text-sm font-semibold text-white">{label || placeholder}</h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="flex h-11 w-11 items-center justify-center rounded-lg text-white touch-manipulation"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {customMode ? (
              customEntry
            ) : (
              <div className="flex-1 overflow-y-auto overscroll-contain pb-safe">
                {renderOptions(false)}
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default FormSelectSheet;
