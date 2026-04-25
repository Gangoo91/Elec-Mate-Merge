/**
 * ComboboxCell — Best-in-class mobile selector.
 * SwipeableBottomSheet on mobile (swipe up to expand, swipe down to dismiss).
 * Popover on desktop.
 * Allows selecting from presets AND typing custom values.
 */

import React, { useState, useEffect, useRef } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ChevronDown, Check, Search, X } from 'lucide-react';
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
  compact?: boolean;
}

const ComboboxCell: React.FC<ComboboxCellProps> = ({
  value,
  onChange,
  options,
  placeholder = '',
  className,
  allowCustom = true,
  compact = false,
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const isMobile = useIsMobile();
  const scrollPosRef = useRef(0);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);
  const displayValue = selectedOption ? selectedOption.label : value;

  useEffect(() => {
    if (open) setSearch('');
  }, [open]);

  // Restore scroll position after closing
  useEffect(() => {
    if (!open && scrollPosRef.current > 0) {
      requestAnimationFrame(() => {
        window.scrollTo(0, scrollPosRef.current);
      });
    }
  }, [open]);

  // Delayed focus on mobile — let sheet animate in first
  useEffect(() => {
    if (open && isMobile) {
      const timer = setTimeout(() => searchInputRef.current?.focus(), 400);
      return () => clearTimeout(timer);
    }
  }, [open, isMobile]);

  const filtered = options.filter((opt) => {
    if (!search) return true;
    const s = search.toLowerCase();
    return opt.value.toLowerCase().includes(s) || opt.label.toLowerCase().includes(s);
  });

  const handleSelect = (val: string) => {
    onChange(val);
    setOpen(false);
  };

  const handleOpen = () => {
    scrollPosRef.current = window.scrollY;
    setOpen(true);
  };

  const isTableCell = compact;

  // Shared trigger button — ELE-830: polished in-cell look.
  // Filled cells get a subtle pill bg so they read as "set", empty cells feel
  // clearly unfilled. Chevron fades in on hover/focus so default state stays
  // clean on dense tables.
  const trigger = (
    <button
      type="button"
      onClick={handleOpen}
      title={displayValue || placeholder || undefined}
      className={cn(
        'group/combo w-full text-sm flex items-center justify-between gap-1.5 touch-manipulation transition-all',
        isTableCell
          ? cn(
              'h-8 px-2 rounded-md text-center outline-none',
              // Filled cells blend with the row — no resting pill. Hover/focus/open still highlight.
              value ? 'text-white bg-transparent' : 'text-white bg-transparent',
              open && 'bg-elec-yellow/[0.08] ring-1 ring-elec-yellow/40',
              'hover:bg-white/[0.05] focus-visible:bg-white/[0.05] focus-visible:ring-1 focus-visible:ring-elec-yellow/40'
            )
          : 'h-12 px-3 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 hover:bg-white/[0.08] active:scale-[0.98]',
        !value && !isTableCell && 'text-white',
        className
      )}
    >
      <span className="truncate text-left flex-1">{displayValue || placeholder}</span>
      <ChevronDown
        className={cn(
          'h-3 w-3 flex-shrink-0 transition-opacity',
          isTableCell
            ? value
              ? 'opacity-0 group-hover/combo:opacity-50 group-focus-visible/combo:opacity-60'
              : 'opacity-35 group-hover/combo:opacity-60'
            : 'opacity-40'
        )}
      />
    </button>
  );

  // Shared option item renderer.
  // Mobile: clean iOS-style flat row with tick on the right when selected.
  //         No per-option borders — a single-row divider separates items.
  // Desktop: dense Linear-style row with a leading check.
  const renderOption = (opt: ComboboxOption, forMobile = false) => {
    const selected = value === opt.value;
    if (forMobile) {
      return (
        <button
          key={opt.value}
          type="button"
          onClick={() => handleSelect(opt.value)}
          className={cn(
            'w-full text-left flex items-center justify-between gap-3 touch-manipulation active:scale-[0.99]',
            'px-4 py-3.5 border-b border-white/[0.05] last:border-b-0 transition-colors',
            selected
              ? 'bg-elec-yellow/[0.08]'
              : 'bg-transparent active:bg-white/[0.04]'
          )}
        >
          <span className={cn(
            'text-[15px] flex-1 min-w-0',
            selected ? 'text-elec-yellow font-semibold' : 'text-white'
          )}>
            {opt.label}
          </span>
          {selected && <Check className="h-4 w-4 text-elec-yellow flex-shrink-0" strokeWidth={2.5} />}
        </button>
      );
    }
    // Desktop — dense row, leading check column only visible when selected.
    // Native title gives a hover tooltip with the full label when truncated.
    return (
      <button
        key={opt.value}
        type="button"
        onClick={() => handleSelect(opt.value)}
        title={opt.label}
        className={cn(
          'group/option w-full text-left flex items-center gap-2 px-3 py-1.5 text-sm transition-colors',
          selected
            ? 'bg-elec-yellow/[0.08] text-elec-yellow'
            : 'text-white hover:bg-white/[0.05]'
        )}
      >
        <span className="w-4 flex-shrink-0 flex items-center justify-center">
          {selected && <Check className="h-3.5 w-3.5 text-elec-yellow" />}
        </span>
        <span className={cn('truncate', selected && 'font-medium')}>{opt.label}</span>
      </button>
    );
  };

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
          <div className="flex flex-col max-h-[70vh]">
            {/* Header — count + clear + compact search */}
            <div className="px-4 pt-2 pb-3 sticky top-0 bg-background z-10 border-b border-white/[0.05]">
              <div className="flex items-center justify-between mb-2.5">
                <p className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">
                  {options.length} {options.length === 1 ? 'option' : 'options'}
                </p>
                {value && (
                  <button
                    onClick={() => { onChange(''); setOpen(false); }}
                    className="text-[12px] text-red-400 font-medium touch-manipulation active:opacity-60"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2.5 h-11 px-3 rounded-xl bg-white/[0.06] border border-white/[0.08] focus-within:border-elec-yellow/40 focus-within:bg-white/[0.08] transition-colors">
                <Search className="h-4 w-4 text-white/50 flex-shrink-0" />
                <input
                  ref={searchInputRef}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={allowCustom ? 'Filter or type your own…' : 'Search…'}
                  className="flex-1 bg-transparent text-base text-white placeholder:text-white outline-none"
                />
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="w-6 h-6 rounded-full bg-white/[0.12] flex items-center justify-center touch-manipulation active:scale-95"
                    aria-label="Clear search"
                  >
                    <X className="h-3 w-3 text-white" />
                  </button>
                )}
              </div>
            </div>
            {/* Custom value pill — when typing something not in the list */}
            {allowCustom && search.trim() && !options.some((o) => o.value.toLowerCase() === search.toLowerCase()) && (
              <button
                type="button"
                onClick={() => handleSelect(search.trim())}
                className="mx-4 my-2 px-4 py-3 rounded-xl border border-elec-yellow/30 bg-elec-yellow/[0.08] text-sm text-elec-yellow font-medium touch-manipulation active:scale-[0.98] text-left flex items-center gap-2"
              >
                <span className="text-elec-yellow/60">+</span>
                <span>Use &ldquo;{search.trim()}&rdquo;</span>
              </button>
            )}
            {/* Options — flat list, dividers between rows */}
            <div className="flex-1 overflow-y-auto overscroll-contain momentum-scroll-y pb-6">
              {filtered.map((opt) => renderOption(opt, true))}
              {filtered.length === 0 && search.trim() && !allowCustom && (
                <p className="text-sm text-white/50 px-4 py-6 text-center">No matches found</p>
              )}
              {filtered.length === 0 && !search.trim() && (
                <p className="text-sm text-white/50 px-4 py-6 text-center">No options available</p>
              )}
            </div>
          </div>
        </SwipeableBottomSheet>
      </>
    );
  }

  // Desktop: dense popover styled for keyboard-heavy desktop use
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent
        className="min-w-[240px] max-w-[360px] w-[max(var(--radix-popover-trigger-width),240px)] p-0 z-[9999] bg-elec-dark border border-white/[0.08] rounded-lg shadow-2xl shadow-black/50"
        align="start"
        side="bottom"
        sideOffset={4}
      >
        {/* Search — compact */}
        <div className="px-2 pt-2 pb-1.5 border-b border-white/[0.06]">
          <div className="flex items-center gap-2 h-8 px-2 rounded-md bg-white/[0.04] border border-white/[0.05] focus-within:border-elec-yellow/40 focus-within:bg-white/[0.06] transition-colors">
            <Search className="h-3.5 w-3.5 text-white/50 flex-shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter..."
              className="flex-1 bg-transparent text-sm text-white placeholder:text-white outline-none"
              autoFocus
            />
          </div>
        </div>
        {/* Options — dense list */}
        <div className="max-h-[280px] overflow-y-auto py-1">
          {filtered.map((opt) => renderOption(opt))}
          {filtered.length === 0 && search.trim() && allowCustom && (
            <button
              type="button"
              onClick={() => handleSelect(search.trim())}
              className="w-full text-left flex items-center gap-2 px-3 py-1.5 text-sm text-elec-yellow hover:bg-white/[0.05] transition-colors"
            >
              <span className="w-4 flex-shrink-0 text-center text-elec-yellow/70">+</span>
              <span className="truncate">Use &quot;{search.trim()}&quot;</span>
            </button>
          )}
          {filtered.length === 0 && !search.trim() && (
            <p className="text-xs text-white/50 px-3 py-2">No options available</p>
          )}
          {filtered.length === 0 && search.trim() && !allowCustom && (
            <p className="text-xs text-white/50 px-3 py-2">No matches</p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ComboboxCell;
