/**
 * ComboboxCell — Type-to-filter dropdown for schedule of tests table cells.
 * Allows both selecting from presets AND typing custom values.
 * Uses Popover + Command (cmdk) for desktop, same on mobile.
 */

import React, { useState, useRef, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ComboboxOption {
  value: string;
  label: string;
}

interface ComboboxCellProps {
  value: string;
  onChange: (value: string) => void;
  options: ComboboxOption[];
  placeholder?: string;
  className?: string;
  allowCustom?: boolean;
}

const ComboboxCell: React.FC<ComboboxCellProps> = ({
  value,
  onChange,
  options,
  placeholder = '',
  className,
  allowCustom = true,
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Find the label for the current value
  const selectedOption = options.find((opt) => opt.value === value);
  const displayValue = selectedOption ? selectedOption.label : value;

  // Reset search when opening
  useEffect(() => {
    if (open) setSearch('');
  }, [open]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            'w-full h-11 text-sm px-2 border border-input bg-background text-foreground rounded-md',
            'flex items-center justify-between gap-1',
            'focus:ring-2 focus:ring-primary touch-manipulation',
            'hover:bg-muted/20 active:bg-muted/30 transition-colors',
            !value && 'text-muted-foreground',
            className
          )}
        >
          <span className="truncate text-center flex-1">{displayValue || placeholder}</span>
          <ChevronsUpDown className="h-3 w-3 opacity-40 flex-shrink-0" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[220px] p-0 z-[9999]" align="start" side="bottom" sideOffset={4}>
        <Command shouldFilter={false}>
          <CommandInput
            ref={inputRef}
            placeholder={`Type to filter...`}
            value={search}
            onValueChange={setSearch}
            className="h-10 text-sm"
          />
          <CommandList className="max-h-[200px]">
            <CommandEmpty>
              {allowCustom && search.trim() ? (
                <button
                  type="button"
                  className="w-full px-3 py-2 text-sm text-left text-elec-yellow hover:bg-muted/30 touch-manipulation"
                  onClick={() => {
                    onChange(search.trim());
                    setOpen(false);
                  }}
                >
                  Use "{search.trim()}"
                </button>
              ) : (
                <p className="text-sm text-muted-foreground px-3 py-2">No matches</p>
              )}
            </CommandEmpty>
            <CommandGroup>
              {options
                .filter((opt) => {
                  if (!search) return true;
                  const s = search.toLowerCase();
                  return opt.value.toLowerCase().includes(s) || opt.label.toLowerCase().includes(s);
                })
                .map((opt) => (
                  <CommandItem
                    key={opt.value}
                    value={opt.value}
                    onSelect={() => {
                      onChange(opt.value);
                      setOpen(false);
                    }}
                    className={cn(
                      'text-sm py-2.5 touch-manipulation cursor-pointer',
                      value === opt.value && 'bg-primary/10 text-primary font-medium'
                    )}
                  >
                    {opt.label}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
          {allowCustom &&
            search.trim() &&
            !options.some((o) => o.value.toLowerCase() === search.toLowerCase()) && (
              <div className="border-t border-border px-2 py-1.5">
                <button
                  type="button"
                  className="w-full px-2 py-1.5 text-xs text-left text-elec-yellow hover:bg-muted/20 rounded touch-manipulation"
                  onClick={() => {
                    onChange(search.trim());
                    setOpen(false);
                  }}
                >
                  Use custom: "{search.trim()}"
                </button>
              </div>
            )}
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ComboboxCell;
