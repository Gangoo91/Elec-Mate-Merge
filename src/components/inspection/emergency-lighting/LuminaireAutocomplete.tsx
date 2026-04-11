/**
 * LuminaireAutocomplete — searchable bottom sheet for selecting emergency luminaires from database
 */

import React, { useState, useMemo, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandInput,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { SwipeableBottomSheet } from '@/components/native/SwipeableBottomSheet';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  EmergencyLuminaire,
  getLuminairesGroupedByMake,
  searchLuminaires,
} from '@/data/emergencyLuminaireDatabase';

interface LuminaireAutocompleteProps {
  value?: { make: string; model: string } | null;
  onSelect: (luminaire: EmergencyLuminaire) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const LuminaireAutocomplete: React.FC<LuminaireAutocompleteProps> = ({
  value,
  onSelect,
  placeholder = 'Search luminaire...',
  className,
  disabled = false,
}) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const isMobile = useIsMobile();

  const luminairesGrouped = useMemo(() => getLuminairesGroupedByMake(), []);

  const filteredLuminaires = useMemo(() => {
    if (!searchQuery.trim()) return luminairesGrouped;
    const results = searchLuminaires(searchQuery);
    return results.reduce(
      (acc, lum) => {
        if (!acc[lum.make]) acc[lum.make] = [];
        acc[lum.make].push(lum);
        return acc;
      },
      {} as Record<string, EmergencyLuminaire[]>
    );
  }, [searchQuery, luminairesGrouped]);

  const handleSelect = useCallback(
    (luminaire: EmergencyLuminaire) => {
      onSelect(luminaire);
      setOpen(false);
      setSearchQuery('');
    },
    [onSelect]
  );

  const displayValue = value ? `${value.make} ${value.model}` : null;

  const triggerButton = (
    <button
      type="button"
      disabled={disabled}
      onClick={() => setOpen(true)}
      className={cn(
        'w-full h-11 rounded-lg bg-white/[0.06] border border-white/[0.08] px-3 flex items-center justify-between text-left touch-manipulation active:scale-[0.98]',
        displayValue ? 'text-white' : 'text-white',
        className
      )}
    >
      <span className="truncate text-sm">{displayValue || placeholder}</span>
      <span className="text-[10px] text-white shrink-0 ml-2">DB</span>
    </button>
  );

  const renderLuminaireItem = (luminaire: EmergencyLuminaire, forMobile = false) => {
    const isSelected = value?.make === luminaire.make && value?.model === luminaire.model;
    return (
      <div
        key={luminaire.id}
        onClick={() => handleSelect(luminaire)}
        className={cn(
          'rounded-lg cursor-pointer transition-colors touch-manipulation',
          forMobile ? 'px-4 py-3' : 'px-2 py-2',
          'hover:bg-elec-yellow/10 active:bg-elec-yellow/20',
          isSelected && 'bg-elec-yellow/10 border border-elec-yellow/20'
        )}
      >
        <div className="flex items-center justify-between">
          <p className={cn('font-medium text-white', forMobile ? 'text-sm' : 'text-xs')}>
            {luminaire.model}
          </p>
          <span
            className={cn(
              'text-[10px] font-medium px-1.5 py-0.5 rounded shrink-0',
              luminaire.luminaireType === 'exit-sign' || luminaire.luminaireType === 'exit-box'
                ? 'bg-green-500/15 text-green-400'
                : luminaire.luminaireType === 'bulkhead'
                  ? 'bg-blue-500/15 text-blue-400'
                  : luminaire.luminaireType === 'twin-spot'
                    ? 'bg-purple-500/15 text-purple-400'
                    : 'bg-amber-500/15 text-amber-400'
            )}
          >
            {luminaire.luminaireType}
          </span>
        </div>
        <p className={cn('text-white mt-0.5', forMobile ? 'text-xs' : 'text-[10px]')}>
          {luminaire.wattage}W · {luminaire.lightOutput}lm ·{' '}
          {luminaire.ratedDuration === 180 ? '3hr' : '1hr'} · {luminaire.ipRating}
        </p>
      </div>
    );
  };

  if (isMobile) {
    return (
      <>
        {triggerButton}
        <SwipeableBottomSheet
          open={open}
          onOpenChange={setOpen}
          title="Select Luminaire"
          contentClassName="p-0"
        >
          <div className="flex flex-col max-h-[75vh]">
            <div className="px-4 py-3 border-b border-white/[0.06] bg-background sticky top-0">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by make or model..."
                className="h-11 bg-white/[0.06] border-white/[0.08] text-white text-base"
              />
            </div>
            <div className="flex-1 overflow-y-auto">
              {Object.keys(filteredLuminaires).length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-sm text-white">No luminaires found</p>
                  <p className="text-xs text-white mt-1">Try a different search</p>
                </div>
              ) : (
                <div className="px-2 py-2">
                  {Object.entries(filteredLuminaires).map(([make, luminaires]) => (
                    <div key={make} className="mb-3">
                      <p className="px-3 py-1.5 text-[10px] font-semibold text-white uppercase tracking-wider">
                        {make}
                      </p>
                      <div className="space-y-1">
                        {luminaires.map((lum) => renderLuminaireItem(lum, true))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="border-t border-white/[0.06] px-4 py-2.5 bg-background">
              <p className="text-[10px] text-white text-center">
                Selecting auto-fills specs from database
              </p>
            </div>
          </div>
        </SwipeableBottomSheet>
      </>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{triggerButton}</PopoverTrigger>
      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] p-0 bg-[#1a1a1e] border-white/[0.08]"
        align="start"
      >
        <Command className="bg-transparent">
          <CommandInput
            placeholder="Search by make or model..."
            value={searchQuery}
            onValueChange={setSearchQuery}
            className="h-11"
          />
          <CommandList className="max-h-[300px]">
            <CommandEmpty>
              <div className="py-6 text-center text-sm text-white">No luminaire found</div>
            </CommandEmpty>
            {Object.entries(filteredLuminaires).map(([make, luminaires]) => (
              <CommandGroup key={make} heading={make}>
                {luminaires.map((lum) => (
                  <CommandItem
                    key={lum.id}
                    value={`${lum.make} ${lum.model}`}
                    onSelect={() => handleSelect(lum)}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-white truncate">{lum.model}</p>
                        <p className="text-[10px] text-white">
                          {lum.wattage}W · {lum.lightOutput}lm ·{' '}
                          {lum.ratedDuration === 180 ? '3hr' : '1hr'} · {lum.ipRating}
                        </p>
                      </div>
                      <span className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-white/[0.06] text-white shrink-0 ml-2">
                        {lum.luminaireType}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
        <div className="border-t border-white/[0.06] px-3 py-2">
          <p className="text-[10px] text-white">Selecting auto-fills specs from database</p>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default LuminaireAutocomplete;
