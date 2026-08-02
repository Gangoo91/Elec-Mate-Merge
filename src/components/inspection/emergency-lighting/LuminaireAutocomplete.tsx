/**
 * LuminaireAutocomplete — searchable bottom sheet for selecting emergency luminaires from database
 */

import React, { useState, useMemo, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { useHaptic } from '@/hooks/useHaptic';
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

// Paper-form underline input — matches every other field in the cert.
const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none [color-scheme:dark] touch-manipulation';

/** Human labels for the stored kebab-case type — the raw value was being
 * printed straight onto the badge ("twin-spot"). */
const TYPE_LABELS: Record<string, string> = {
  bulkhead: 'Bulkhead',
  'twin-spot': 'Twin spot',
  recessed: 'Recessed',
  surface: 'Surface mount',
  downlight: 'Downlight',
  'exit-sign': 'Exit sign',
  'exit-box': 'Exit box',
  strip: 'Strip light',
};
const typeLabel = (type: string) => TYPE_LABELS[type] || type;

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
  const haptic = useHaptic();

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
        'w-full h-11 rounded-xl bg-white/[0.06] border border-white/[0.12] px-3 flex items-center justify-between gap-2 text-left text-white touch-manipulation active:scale-[0.98] disabled:opacity-50',
        className
      )}
    >
      <span className={cn('truncate text-sm', !displayValue && 'text-white/25 font-normal')}>
        {displayValue || placeholder}
      </span>
      <ChevronDown className="h-4 w-4 shrink-0 text-white" />
    </button>
  );

  /** One database row. Selected is SOLID volt — translucent volt/colour washes
   * read brown on this surface, so the type badge is a neutral chip with plain
   * white text rather than a per-type coloured wash. */
  const renderLuminaireItem = (luminaire: EmergencyLuminaire, forMobile = false) => {
    const isSelected = value?.make === luminaire.make && value?.model === luminaire.model;
    return (
      <button
        key={luminaire.id}
        type="button"
        onClick={() => handleSelect(luminaire)}
        className={cn(
          'w-full text-left rounded-xl border transition-colors touch-manipulation active:scale-[0.99]',
          forMobile ? 'px-3.5 py-3' : 'px-3 py-2',
          isSelected
            ? 'bg-elec-yellow border-elec-yellow'
            : 'bg-white/[0.05] border-white/[0.12]'
        )}
      >
        <div className="flex items-center justify-between gap-2">
          <p
            className={cn(
              'font-medium truncate',
              forMobile ? 'text-sm' : 'text-xs',
              isSelected ? 'text-black font-semibold' : 'text-white'
            )}
          >
            {luminaire.model}
          </p>
          <span
            className={cn(
              'text-[11px] font-medium px-2 py-0.5 rounded-full shrink-0 border',
              isSelected
                ? 'border-black/25 text-black'
                : 'border-white/[0.12] bg-white/[0.06] text-white'
            )}
          >
            {typeLabel(luminaire.luminaireType)}
          </span>
        </div>
        <p
          className={cn(
            'mt-0.5 tabular-nums',
            forMobile ? 'text-xs' : 'text-[11px]',
            isSelected ? 'text-black/70' : 'text-white/85'
          )}
        >
          {luminaire.wattage}W · {luminaire.lightOutput}lm ·{' '}
          {luminaire.ratedDuration === 180 ? '3hr' : '1hr'} · {luminaire.ipRating}
        </p>
      </button>
    );
  };

  if (isMobile) {
    return (
      <>
        {triggerButton}
        <SwipeableBottomSheet
          open={open}
          onOpenChange={setOpen}
          title="Select luminaire"
          contentClassName="p-0"
        >
          <div
            className="flex flex-col max-h-[75vh]"
            onPointerDown={(e) => {
              if ((e.target as HTMLElement).closest('button')) haptic.light();
            }}
          >
            <div className="px-4 pt-1 pb-3 border-b border-white/[0.08] bg-background sticky top-0 z-10">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by make or model…"
                className={inputCn}
              />
            </div>
            <div className="flex-1 overflow-y-auto">
              {Object.keys(filteredLuminaires).length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-sm font-medium text-white">No luminaires found</p>
                  <p className="text-xs text-white/85 mt-1">Try a different search</p>
                </div>
              ) : (
                <div className="px-4 pb-2">
                  {Object.entries(filteredLuminaires).map(([make, luminaires], groupIndex) => (
                    <div key={make}>
                      {/* Make heading — rule above, plain type. The old
                          uppercase tracked eyebrow was the superseded style. */}
                      <div
                        className={cn(
                          'pt-4 pb-2',
                          groupIndex > 0 && 'border-t border-white/[0.1] mt-2'
                        )}
                      >
                        <h3 className="text-sm font-semibold text-white">{make}</h3>
                      </div>
                      <div className="space-y-2">
                        {luminaires.map((lum) => renderLuminaireItem(lum, true))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="border-t border-white/[0.08] px-4 py-2.5 bg-background">
              <p className="text-xs text-white/85 text-center">
                Selecting auto-fills specs from the database
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
          <p className="text-xs text-white/85">Selecting auto-fills specs from the database</p>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default LuminaireAutocomplete;
