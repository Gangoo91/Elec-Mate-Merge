/**
 * ChargerAutocomplete.tsx
 * Searchable EV charger picker — bottom sheet on mobile, popover on desktop.
 * No icons, clean dark design matching EICR/EIC pattern.
 */

import React, { useState, useMemo, useCallback } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { SwipeableBottomSheet } from '@/components/native/SwipeableBottomSheet';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  EV_CHARGERS,
  EVCharger,
  getChargerLabel,
  getPowerOptionsLabel,
  searchChargers,
} from '@/data/evChargerDatabase';

interface ChargerAutocompleteProps {
  value?: { make: string; model: string };
  onChange: (charger: EVCharger | null) => void;
  className?: string;
  disabled?: boolean;
}

export const ChargerAutocomplete: React.FC<ChargerAutocompleteProps> = ({
  value,
  onChange,
  className,
  disabled = false,
}) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const isMobile = useIsMobile();

  const filteredChargers = useMemo(() => {
    if (!searchQuery.trim()) return EV_CHARGERS.slice(0, 15);
    return searchChargers(searchQuery);
  }, [searchQuery]);

  const selectedCharger = useMemo(() => {
    if (!value?.make || !value?.model) return null;
    return EV_CHARGERS.find(
      (c) =>
        c.make.toLowerCase() === value.make.toLowerCase() &&
        c.model.toLowerCase() === value.model.toLowerCase()
    );
  }, [value]);

  const handleSelect = useCallback(
    (charger: EVCharger) => {
      onChange(charger);
      setOpen(false);
      setSearchQuery('');
    },
    [onChange]
  );

  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onChange(null);
      setSearchQuery('');
    },
    [onChange]
  );

  const displayLabel = selectedCharger
    ? getChargerLabel(selectedCharger)
    : value?.make && value?.model
      ? `${value.make} ${value.model}`
      : null;

  // Charger list item — clean card style
  const renderChargerItem = (charger: EVCharger, forMobile = false) => {
    const isSelected = selectedCharger?.id === charger.id;
    return (
      <div
        key={charger.id}
        onClick={() => handleSelect(charger)}
        className={cn(
          'group relative overflow-hidden rounded-xl cursor-pointer transition-all touch-manipulation active:scale-[0.98]',
          forMobile ? 'p-3.5' : 'p-2.5 mx-1',
          isSelected
            ? 'bg-elec-yellow/10 border border-elec-yellow/30'
            : 'bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06]'
        )}
      >
        {/* Accent line */}
        <div className={cn(
          'absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r opacity-0 group-hover:opacity-60 transition-opacity',
          isSelected ? 'from-elec-yellow to-amber-400 opacity-60' : 'from-elec-yellow/40 to-elec-yellow/10'
        )} />

        <div className="relative z-10">
          {/* Make + Model */}
          <div className="flex items-baseline gap-1.5 mb-1.5">
            <span className={cn('font-bold text-white', forMobile ? 'text-[15px]' : 'text-sm')}>
              {charger.make}
            </span>
            <span className={cn('text-white', forMobile ? 'text-[15px]' : 'text-sm')}>
              {charger.model}
            </span>
          </div>

          {/* Spec badges — no icons, just coloured text badges */}
          <div className={cn('flex items-center gap-1.5 flex-wrap', forMobile ? '' : '')}>
            <span className={cn(
              'font-bold px-1.5 py-0.5 rounded bg-elec-yellow/15 text-elec-yellow',
              forMobile ? 'text-[11px]' : 'text-[10px]'
            )}>
              {getPowerOptionsLabel(charger)}
            </span>
            <span className={cn(
              'font-medium px-1.5 py-0.5 rounded bg-white/[0.06] text-white',
              forMobile ? 'text-[11px]' : 'text-[10px]'
            )}>
              {charger.phases.includes(3) ? '1/3 Phase' : 'Single Phase'}
            </span>
            <span className={cn(
              'font-medium px-1.5 py-0.5 rounded bg-white/[0.06] text-white',
              forMobile ? 'text-[11px]' : 'text-[10px]'
            )}>
              {charger.socketType}
            </span>
            {charger.rcdIntegral && (
              <span className={cn(
                'font-bold px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400',
                forMobile ? 'text-[11px]' : 'text-[10px]'
              )}>
                RCD Built-in
              </span>
            )}
          </div>

          {/* Notes */}
          {charger.notes && (
            <p className={cn('text-white mt-1.5 line-clamp-1', forMobile ? 'text-[11px]' : 'text-[10px]')}>
              {charger.notes}
            </p>
          )}
        </div>
      </div>
    );
  };

  // Trigger button — clean, no icons
  const triggerButton = (
    <button
      type="button"
      disabled={disabled}
      onClick={isMobile ? () => setOpen(true) : undefined}
      className={cn(
        'w-full h-11 px-3 flex items-center justify-between rounded-lg text-left touch-manipulation active:scale-[0.98] transition-all',
        'bg-white/[0.06] border border-white/[0.08]',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <div className="flex-1 min-w-0">
        {displayLabel ? (
          <div>
            <span className="text-sm font-medium text-white truncate block">{displayLabel}</span>
            {selectedCharger && (
              <span className="text-[10px] text-elec-yellow">{getPowerOptionsLabel(selectedCharger)}</span>
            )}
          </div>
        ) : (
          <span className="text-sm text-white/40">Search UK chargers...</span>
        )}
      </div>
      {selectedCharger && (
        <button
          type="button"
          onClick={handleClear}
          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10 touch-manipulation flex-shrink-0"
        >
          <X className="h-3.5 w-3.5 text-white/40" />
        </button>
      )}
    </button>
  );

  // Mobile: SwipeableBottomSheet
  if (isMobile) {
    return (
      <>
        {triggerButton}
        <SwipeableBottomSheet
          open={open}
          onOpenChange={setOpen}
          title="Select EV Charger"
          contentClassName="p-0"
        >
          <div className="flex flex-col max-h-[70vh]">
            {/* Search */}
            <div className="px-4 py-3 border-b border-white/[0.06] sticky top-0 bg-background">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by make or model..."
                className="h-11 text-base bg-white/[0.06] border-white/[0.08] text-white placeholder:text-white/30"
                autoFocus
              />
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto momentum-scroll-y px-3 py-2">
              {filteredChargers.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-sm font-semibold text-white">No chargers found</p>
                  <p className="text-xs text-white mt-1">Try a different make or model</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredChargers.map((charger) => renderChargerItem(charger, true))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-white/[0.06] px-4 py-2.5">
              <p className="text-[10px] text-white text-center">
                {EV_CHARGERS.length} UK chargers · 2025/2026
              </p>
            </div>
          </div>
        </SwipeableBottomSheet>
      </>
    );
  }

  // Desktop: Popover
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{triggerButton}</PopoverTrigger>
      <PopoverContent
        className="w-[calc(100vw-2rem)] sm:w-[420px] p-0 bg-background border-white/[0.08] shadow-xl z-[100]"
        align="start"
        sideOffset={4}
      >
        <Command className="bg-background" shouldFilter={false}>
          <div className="px-3 py-2.5 border-b border-white/[0.06]">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chargers..."
              className="h-9 border-0 bg-transparent focus-visible:ring-0 px-0 text-base text-white placeholder:text-white/30"
              autoFocus
            />
          </div>

          <CommandList className="max-h-[320px]">
            {filteredChargers.length === 0 ? (
              <CommandEmpty className="py-6 text-center">
                <p className="text-white text-sm">No chargers found</p>
              </CommandEmpty>
            ) : (
              <CommandGroup className="py-2">
                {filteredChargers.map((charger) => {
                  const isSelected = selectedCharger?.id === charger.id;
                  return (
                    <CommandItem
                      key={charger.id}
                      value={charger.id}
                      onSelect={() => handleSelect(charger)}
                      className="mx-1 rounded-lg cursor-pointer py-0 px-0 hover:bg-transparent"
                    >
                      {renderChargerItem(charger, false)}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            )}
          </CommandList>

          <div className="border-t border-white/[0.06] px-3 py-2">
            <p className="text-[10px] text-white text-center">
              {EV_CHARGERS.length} UK chargers · 2025/2026
            </p>
          </div>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ChargerAutocomplete;
