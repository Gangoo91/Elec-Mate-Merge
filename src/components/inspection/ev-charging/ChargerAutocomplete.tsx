/**
 * ChargerAutocomplete.tsx
 *
 * Searchable combobox for selecting EV charger make/model from the database.
 * Auto-fills charger specifications on selection.
 */

import React, { useState, useMemo, useCallback } from 'react';
import { Check, ChevronsUpDown, Zap, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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

  // Filter chargers based on search query
  const filteredChargers = useMemo(() => {
    if (!searchQuery.trim()) {
      return EV_CHARGERS.slice(0, 15); // Show first 15 when empty
    }
    return searchChargers(searchQuery);
  }, [searchQuery]);

  // Find currently selected charger
  const selectedCharger = useMemo(() => {
    if (!value?.make || !value?.model) return null;
    return EV_CHARGERS.find(
      (c) =>
        c.make.toLowerCase() === value.make.toLowerCase() &&
        c.model.toLowerCase() === value.model.toLowerCase()
    );
  }, [value]);

  // Handle charger selection
  const handleSelect = useCallback(
    (charger: EVCharger) => {
      onChange(charger);
      setOpen(false);
      setSearchQuery('');
    },
    [onChange]
  );

  // Handle clear selection
  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onChange(null);
      setSearchQuery('');
    },
    [onChange]
  );

  // Get display label
  const displayLabel = selectedCharger
    ? getChargerLabel(selectedCharger)
    : value?.make && value?.model
      ? `${value.make} ${value.model}`
      : null;

  // Shared charger list item renderer
  const renderChargerItem = (charger: EVCharger, forMobile = false) => {
    const isSelected = selectedCharger?.id === charger.id;
    return (
      <div
        key={charger.id}
        onClick={() => handleSelect(charger)}
        className={cn(
          'rounded-xl cursor-pointer transition-all touch-manipulation',
          forMobile ? 'p-3.5' : 'p-2.5 mx-1',
          isSelected
            ? 'bg-elec-yellow/15 border border-elec-yellow/30'
            : 'border border-transparent hover:bg-white/5 active:bg-white/10'
        )}
      >
        <div className="flex items-start gap-3 w-full">
          <div
            className={cn(
              'rounded-xl flex items-center justify-center shrink-0',
              forMobile ? 'w-11 h-11' : 'w-8 h-8 mt-0.5',
              isSelected ? 'bg-elec-yellow/25' : 'bg-white/[0.06]'
            )}
          >
            {isSelected ? (
              <Check className={cn('text-elec-yellow', forMobile ? 'h-5 w-5' : 'h-4 w-4')} />
            ) : (
              <Zap className={cn('text-white', forMobile ? 'h-5 w-5' : 'h-4 w-4')} />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-1.5">
              <span className={cn('font-semibold text-white', forMobile ? 'text-[15px]' : 'text-sm')}>
                {charger.make}
              </span>
              <span className={cn('text-white', forMobile ? 'text-[15px]' : 'text-sm')}>
                {charger.model}
              </span>
            </div>

            <div className={cn('flex items-center gap-1.5 flex-wrap', forMobile ? 'mt-1.5' : 'mt-1')}>
              <Badge
                variant="outline"
                className={cn(
                  'px-2 py-0.5 border-elec-yellow/40 text-elec-yellow font-medium',
                  forMobile ? 'text-xs' : 'text-[10px]'
                )}
              >
                {getPowerOptionsLabel(charger)}
              </Badge>
              <Badge
                variant="outline"
                className={cn(
                  'px-2 py-0.5 border-white/20 text-white',
                  forMobile ? 'text-xs' : 'text-[10px]'
                )}
              >
                {charger.phases.includes(3) ? '1/3 Phase' : 'Single Phase'}
              </Badge>
              <Badge
                variant="outline"
                className={cn(
                  'px-2 py-0.5 border-white/20 text-white',
                  forMobile ? 'text-xs' : 'text-[10px]'
                )}
              >
                {charger.socketType}
              </Badge>
              {charger.rcdIntegral && (
                <Badge
                  variant="outline"
                  className={cn(
                    'px-2 py-0.5 border-green-500/40 text-green-400 font-medium',
                    forMobile ? 'text-xs' : 'text-[10px]'
                  )}
                >
                  RCD Built-in
                </Badge>
              )}
            </div>

            {charger.notes && (
              <p className={cn('text-white mt-1 line-clamp-1', forMobile ? 'text-xs' : 'text-[10px]')}>
                {charger.notes}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Trigger button (shared between mobile and desktop)
  const triggerButton = (
    <Button
      variant="outline"
      role="combobox"
      aria-expanded={open}
      disabled={disabled}
      onClick={isMobile ? () => setOpen(true) : undefined}
      className={cn(
        'w-full justify-between h-12 touch-manipulation',
        'bg-elec-gray border-white/30 text-foreground',
        'hover:bg-elec-gray/80 hover:border-elec-yellow',
        'focus:border-elec-yellow focus:ring-elec-yellow',
        'data-[state=open]:border-elec-yellow data-[state=open]:ring-2',
        !displayLabel && 'text-white',
        className
      )}
    >
      <div className="flex items-center gap-2.5 flex-1 min-w-0">
        {selectedCharger ? (
          <>
            <div className="h-7 w-7 rounded-lg bg-elec-yellow/20 flex items-center justify-center shrink-0">
              <Zap className="h-3.5 w-3.5 text-elec-yellow" />
            </div>
            <div className="flex flex-col items-start min-w-0 flex-1">
              <span className="text-sm font-medium text-white truncate w-full text-left">
                {displayLabel}
              </span>
              <span className="text-xs text-elec-yellow">
                {getPowerOptionsLabel(selectedCharger)}
              </span>
            </div>
          </>
        ) : (
          <>
            <Search className="h-4 w-4 shrink-0 text-white" />
            <span className="text-sm">Search UK chargers...</span>
          </>
        )}
      </div>
      <div className="flex items-center gap-1 shrink-0">
        {selectedCharger && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleClear(e);
            }}
            className="h-9 w-9 flex items-center justify-center hover:bg-white/10 rounded-full touch-manipulation"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        <ChevronsUpDown className="h-4 w-4 opacity-50" />
      </div>
    </Button>
  );

  // Mobile: Use SwipeableBottomSheet
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
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06] bg-background sticky top-0">
              <Search className="h-5 w-5 text-white shrink-0" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search UK chargers..."
                className="h-11 border-0 bg-transparent focus-visible:ring-0 px-0 text-base text-white placeholder:text-white/40"
                autoFocus
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchQuery('')}
                  className="h-9 w-9 p-0 touch-manipulation"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Charger list */}
            <div className="flex-1 overflow-y-auto momentum-scroll-y px-3 py-2">
              {filteredChargers.length === 0 ? (
                <div className="py-12 text-center">
                  <Zap className="h-12 w-12 mx-auto mb-3 text-white/20" />
                  <p className="text-base text-white">No chargers found</p>
                  <p className="text-sm text-white mt-1">Try searching by make or model</p>
                </div>
              ) : (
                <div className="space-y-1.5">
                  {filteredChargers.map((charger) => renderChargerItem(charger, true))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-white/[0.06] px-4 py-3 bg-card/30">
              <p className="text-xs text-white text-center">
                {EV_CHARGERS.length} UK chargers in database (2025/2026)
              </p>
            </div>
          </div>
        </SwipeableBottomSheet>
      </>
    );
  }

  // Desktop: Use Popover
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{triggerButton}</PopoverTrigger>

      <PopoverContent
        className="w-[calc(100vw-2rem)] sm:w-[420px] p-0 bg-background border-border shadow-xl z-[100]"
        align="start"
        sideOffset={4}
      >
        <Command className="bg-background" shouldFilter={false}>
          <div className="flex items-center gap-2 px-3 py-2.5 border-b border-white/[0.06]">
            <Search className="h-4 w-4 text-white shrink-0" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Type to search UK chargers..."
              className="h-9 border-0 bg-transparent focus-visible:ring-0 px-0 text-base"
              autoFocus
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery('')}
                className="h-7 w-7 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>

          <CommandList className="max-h-[320px]">
            {filteredChargers.length === 0 ? (
              <CommandEmpty className="py-6 text-center">
                <Zap className="h-8 w-8 mx-auto mb-2 text-white/20" />
                <p className="text-white">No chargers found</p>
                <p className="text-xs text-white mt-1">Try searching by make or model</p>
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
                      className={cn(
                        'mx-1 rounded-lg cursor-pointer py-2.5',
                        'hover:bg-white/5',
                        isSelected && 'bg-elec-yellow/15'
                      )}
                    >
                      <div className="flex items-start gap-3 w-full">
                        <div
                          className={cn(
                            'w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5',
                            isSelected ? 'bg-elec-yellow/25' : 'bg-white/[0.06]'
                          )}
                        >
                          {isSelected ? (
                            <Check className="h-4 w-4 text-elec-yellow" />
                          ) : (
                            <Zap className="h-4 w-4 text-white" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-1.5">
                            <span className="font-semibold text-white text-sm">{charger.make}</span>
                            <span className="text-white text-sm">{charger.model}</span>
                          </div>

                          <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                            <Badge
                              variant="outline"
                              className="text-[10px] px-1.5 py-0 border-elec-yellow/40 text-elec-yellow font-medium"
                            >
                              {getPowerOptionsLabel(charger)}
                            </Badge>
                            <span className="text-[10px] text-white">
                              {charger.phases.includes(3) ? '1/3 Phase' : 'Single Phase'}
                            </span>
                            <span className="text-[10px] text-white">
                              {charger.socketType}
                            </span>
                            {charger.rcdIntegral && (
                              <Badge
                                variant="outline"
                                className="text-[10px] px-1.5 py-0 border-green-500/40 text-green-400"
                              >
                                RCD Built-in
                              </Badge>
                            )}
                          </div>

                          {charger.notes && (
                            <p className="text-[10px] text-white mt-1 line-clamp-1">
                              {charger.notes}
                            </p>
                          )}
                        </div>
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            )}
          </CommandList>

          <div className="border-t border-white/[0.06] px-3 py-2 bg-card/30">
            <p className="text-[10px] text-white text-center">
              {EV_CHARGERS.length} UK chargers in database (2025/2026)
            </p>
          </div>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ChargerAutocomplete;
