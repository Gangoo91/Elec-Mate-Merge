/**
 * ComboboxCell — Best-in-class mobile selector.
 * SwipeableBottomSheet on mobile (swipe up to expand, swipe down to dismiss).
 * Popover on desktop.
 * Allows selecting from presets AND typing custom values.
 */

import React, { useState, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ChevronsUpDown, Check, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { SwipeableBottomSheet } from '@/components/native/SwipeableBottomSheet';

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
  const isMobile = useIsMobile();

  const selectedOption = options.find((opt) => opt.value === value);
  const displayValue = selectedOption ? selectedOption.label : value;

  useEffect(() => {
    if (open) setSearch('');
  }, [open]);

  const filtered = options.filter((opt) => {
    if (!search) return true;
    const s = search.toLowerCase();
    return opt.value.toLowerCase().includes(s) || opt.label.toLowerCase().includes(s);
  });

  const handleSelect = (val: string) => {
    onChange(val);
    setOpen(false);
  };

  // Shared trigger button
  const trigger = (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className={cn(
        'w-full h-12 text-sm px-3 rounded-xl',
        'bg-white/[0.06] border border-white/[0.08] text-white',
        'flex items-center justify-between gap-2',
        'focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 touch-manipulation',
        'hover:bg-white/[0.08] active:scale-[0.98] transition-all',
        !value && 'text-white/40',
        className
      )}
    >
      <span className="truncate text-left flex-1">{displayValue || placeholder}</span>
      <ChevronsUpDown className="h-3.5 w-3.5 opacity-40 flex-shrink-0" />
    </button>
  );

  // Shared option item renderer
  const renderOption = (opt: ComboboxOption, forMobile = false) => (
    <button
      key={opt.value}
      type="button"
      onClick={() => handleSelect(opt.value)}
      className={cn(
        'w-full text-left flex items-center gap-3 touch-manipulation active:scale-[0.98] transition-all',
        forMobile ? 'mx-3 my-1 px-3.5 py-3 rounded-xl border' : 'px-4 py-3',
        value === opt.value
          ? forMobile ? 'bg-elec-yellow/10 border-elec-yellow/20' : 'bg-elec-yellow/10'
          : forMobile ? 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]' : 'hover:bg-white/[0.04]'
      )}
    >
      <div className={cn(
        'w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all',
        value === opt.value ? 'bg-elec-yellow border-elec-yellow' : 'border-white/20'
      )}>
        {value === opt.value && <Check className="h-3 w-3 text-black" />}
      </div>
      <span className={cn('text-sm', value === opt.value ? 'text-elec-yellow font-medium' : 'text-white')}>{opt.label}</span>
    </button>
  );

  // Mobile: SwipeableBottomSheet
  if (isMobile) {
    return (
      <>
        {trigger}
        <SwipeableBottomSheet
          open={open}
          onOpenChange={setOpen}
          contentClassName="p-0"
        >
          <div className="flex flex-col max-h-[65vh]">
            {/* Header */}
            <div className="px-4 pt-1 pb-3 sticky top-0 bg-background z-10">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-bold text-white uppercase tracking-wider">{options.length} options</p>
                {value && (
                  <button onClick={() => { onChange(''); setOpen(false); }} className="text-[10px] text-red-400 font-medium touch-manipulation">Clear</button>
                )}
              </div>
              {/* Search / custom input */}
              <div className="flex items-center gap-2.5 h-12 px-3 rounded-xl bg-white/[0.06] border border-white/[0.08]">
                <Search className="h-4 w-4 text-white flex-shrink-0" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={allowCustom ? "Filter or type your own..." : "Type to filter..."}
                  className="flex-1 bg-transparent text-base text-white placeholder:text-white/40 outline-none"
                  autoFocus
                />
                {search && (
                  <button onClick={() => setSearch('')} className="w-6 h-6 rounded-full bg-white/[0.1] flex items-center justify-center touch-manipulation">
                    <X className="h-3 w-3 text-white" />
                  </button>
                )}
              </div>
              {allowCustom && !search && (
                <p className="text-[10px] text-white mt-2 text-center">Select below or type your own value</p>
              )}
            </div>
            {/* Custom value button — shown when typing something not in the list */}
            {allowCustom && search.trim() && !options.some((o) => o.value.toLowerCase() === search.toLowerCase()) && (
              <div className="mx-3 mb-2">
                <button
                  type="button"
                  onClick={() => handleSelect(search.trim())}
                  className="w-full px-4 py-3 rounded-xl border border-elec-yellow/30 bg-elec-yellow/[0.08] text-sm text-elec-yellow font-medium touch-manipulation active:scale-[0.98] text-left"
                >
                  Use: "{search.trim()}"
                </button>
              </div>
            )}
            {/* Options */}
            <div className="flex-1 overflow-y-auto overscroll-contain momentum-scroll-y pb-6">
              {filtered.map((opt) => renderOption(opt, true))}
              {filtered.length === 0 && search.trim() && !allowCustom && (
                <p className="text-sm text-white px-4 py-4 text-center">No matches found</p>
              )}
              {filtered.length === 0 && !search.trim() && (
                <p className="text-sm text-white px-4 py-4 text-center">No options available</p>
              )}
            </div>
          </div>
        </SwipeableBottomSheet>
      </>
    );
  }

  // Desktop: popover
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 z-[9999] bg-background border border-white/[0.1] rounded-xl shadow-xl" align="start" side="bottom" sideOffset={4}>
        {/* Search */}
        <div className="px-3 py-2 border-b border-white/[0.06]">
          <div className="flex items-center gap-2 h-9 px-2 rounded-lg bg-white/[0.06]">
            <Search className="h-3.5 w-3.5 text-white flex-shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Type to filter..."
              className="flex-1 bg-transparent text-sm text-white placeholder:text-white/40 outline-none"
              autoFocus
            />
          </div>
        </div>
        {/* Options */}
        <div className="max-h-[240px] overflow-y-auto">
          {filtered.map(renderOption)}
          {filtered.length === 0 && search.trim() && allowCustom && (
            <button
              type="button"
              onClick={() => handleSelect(search.trim())}
              className="w-full text-left px-4 py-3 text-sm text-elec-yellow touch-manipulation hover:bg-white/[0.04]"
            >
              Use "{search.trim()}"
            </button>
          )}
          {filtered.length === 0 && !search.trim() && (
            <p className="text-sm text-white px-3 py-3">No options available</p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ComboboxCell;
