/**
 * Inverter Autocomplete
 * Searchable inverter picker — bottom sheet on mobile, popover on desktop.
 * No icons, clean dark design matching the ChargerAutocomplete pattern.
 */

import * as React from 'react';
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
  getInvertersGroupedByManufacturer,
  searchInverters,
  getInverterDefaults,
  getInverterCount,
  type SolarInverter,
} from '@/data/solarInverterDatabase';

const searchInputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

interface InverterAutocompleteProps {
  value?: string;
  onValueChange?: (inverterId: string) => void;
  onInverterSelect?: (inverter: SolarInverter | null) => void;
  placeholder?: string;
  className?: string;
  showAutoFillBadge?: boolean;
  disabled?: boolean;
}

export function InverterAutocomplete({
  value,
  onValueChange,
  onInverterSelect,
  placeholder = 'Select inverter...',
  className,
  showAutoFillBadge = true,
  disabled = false,
}: InverterAutocompleteProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const isMobile = useIsMobile();

  const invertersGrouped = React.useMemo(() => getInvertersGroupedByManufacturer(), []);

  const filteredInverters = React.useMemo(() => {
    if (!search.trim()) return null;
    return searchInverters(search);
  }, [search]);

  const selectedInverter = React.useMemo(() => {
    if (!value) return null;
    const all = Object.values(invertersGrouped).flat();
    return all.find((i) => `${i.make} ${i.model}` === value) || null;
  }, [value, invertersGrouped]);

  const handleSelect = React.useCallback(
    (inverter: SolarInverter) => {
      const newValue = `${inverter.make} ${inverter.model}`;
      const isDeselecting = value === newValue;
      onValueChange?.(isDeselecting ? '' : inverter.id);
      onInverterSelect?.(isDeselecting ? null : inverter);
      setOpen(false);
      setSearch('');
    },
    [value, onValueChange, onInverterSelect]
  );

  const handleClear = React.useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onInverterSelect?.(null);
      onValueChange?.('');
      setSearch('');
    },
    [onInverterSelect, onValueChange]
  );

  const displayValue = React.useMemo(() => {
    if (!selectedInverter) return null;
    return `${selectedInverter.make} ${selectedInverter.model}`;
  }, [selectedInverter]);

  const hasAutoFill = React.useMemo(() => {
    if (!selectedInverter) return false;
    return getInverterDefaults(selectedInverter.id) !== null;
  }, [selectedInverter]);

  // Inverter list item — neutral surface, solid volt when selected
  const renderItem = (inverter: SolarInverter, forMobile = false) => {
    const isSelected = selectedInverter?.id === inverter.id;
    return (
      <div
        key={inverter.id}
        onClick={() => handleSelect(inverter)}
        className={cn(
          'rounded-xl cursor-pointer transition-all touch-manipulation active:scale-[0.98]',
          forMobile ? 'p-3.5' : 'p-2.5 mx-1',
          isSelected
            ? 'bg-elec-yellow border border-elec-yellow'
            : 'bg-white/[0.06] border border-white/[0.12] hover:bg-white/[0.09]'
        )}
      >
        {/* Make + Model */}
        <div className="flex items-baseline gap-1.5 mb-1.5">
          <span
            className={cn(
              'font-bold',
              isSelected ? 'text-black' : 'text-white',
              forMobile ? 'text-[15px]' : 'text-sm'
            )}
          >
            {inverter.make}
          </span>
          <span
            className={cn(
              isSelected ? 'text-black' : 'text-white',
              forMobile ? 'text-[15px]' : 'text-sm'
            )}
          >
            {inverter.model}
          </span>
        </div>

        {/* Spec badges — no icons, coloured text on neutral surfaces */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span
            className={cn(
              'font-bold px-1.5 py-0.5 rounded',
              isSelected ? 'bg-black/10 text-black' : 'bg-white/[0.06] text-elec-yellow',
              forMobile ? 'text-[11px]' : 'text-[10px]'
            )}
          >
            {inverter.ratedPowerAc}kW
          </span>
          <span
            className={cn(
              'font-medium px-1.5 py-0.5 rounded',
              isSelected ? 'bg-black/10 text-black' : 'bg-white/[0.06] text-white',
              forMobile ? 'text-[11px]' : 'text-[10px]'
            )}
          >
            {inverter.phases === 'three' ? 'Three Phase' : 'Single Phase'}
          </span>
          <span
            className={cn(
              'font-medium px-1.5 py-0.5 rounded',
              isSelected ? 'bg-black/10 text-black' : 'bg-white/[0.06] text-white',
              forMobile ? 'text-[11px]' : 'text-[10px]'
            )}
          >
            {inverter.mpptCount} MPPT
          </span>
          <span
            className={cn(
              'font-medium px-1.5 py-0.5 rounded',
              isSelected ? 'bg-black/10 text-black' : 'bg-white/[0.06] text-white',
              forMobile ? 'text-[11px]' : 'text-[10px]'
            )}
          >
            {inverter.type}
          </span>
          {inverter.hybridCapable && (
            <span
              className={cn(
                'font-bold px-1.5 py-0.5 rounded',
                isSelected ? 'bg-black/10 text-black' : 'bg-white/[0.06] text-emerald-400',
                forMobile ? 'text-[11px]' : 'text-[10px]'
              )}
            >
              Hybrid
            </span>
          )}
          {inverter.mcsCertified && (
            <span
              className={cn(
                'font-bold px-1.5 py-0.5 rounded',
                isSelected ? 'bg-black/10 text-black' : 'bg-white/[0.06] text-emerald-400',
                forMobile ? 'text-[11px]' : 'text-[10px]'
              )}
            >
              MCS
            </span>
          )}
        </div>
      </div>
    );
  };

  // Trigger button — clean, no icons
  const triggerButton = (
    <button
      type="button"
      role="combobox"
      aria-expanded={open}
      disabled={disabled}
      onClick={isMobile ? () => setOpen(true) : undefined}
      className={cn(
        'w-full h-11 px-3.5 flex items-center justify-between rounded-xl text-left touch-manipulation active:scale-[0.98] transition-all',
        'bg-white/[0.06] border border-white/[0.12] hover:bg-white/[0.09]',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <div className="flex-1 min-w-0">
        {displayValue ? (
          <div>
            <span className="text-sm font-medium text-white truncate block">{displayValue}</span>
            <span className="text-[10px] text-elec-yellow">
              {selectedInverter?.ratedPowerAc}kW · {selectedInverter?.mpptCount} MPPT
            </span>
          </div>
        ) : (
          <span className="text-sm text-white/80">{placeholder}</span>
        )}
      </div>
      {selectedInverter && (
        // Not a <button> — nested buttons are invalid DOM.
        <span
          role="button"
          tabIndex={0}
          aria-label="Clear selected inverter"
          onClick={handleClear}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleClear(e as unknown as React.MouseEvent);
            }
          }}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 touch-manipulation flex-shrink-0 text-white text-base leading-none"
        >
          &times;
        </span>
      )}
    </button>
  );

  const autoFillBadge = showAutoFillBadge && hasAutoFill && (
    <div className="absolute -top-3 right-2 px-2 py-0.5 bg-background border border-elec-yellow/40 rounded-full text-xs font-semibold text-elec-yellow shadow-sm">
      Auto-filled
    </div>
  );

  // Mobile: SwipeableBottomSheet
  if (isMobile) {
    return (
      <div className="relative">
        {triggerButton}
        {autoFillBadge}

        <SwipeableBottomSheet
          open={open}
          onOpenChange={setOpen}
          title="Select Inverter"
          contentClassName="p-0"
        >
          <div className="flex flex-col max-h-[70vh]">
            {/* Search */}
            <div className="px-4 pt-1 pb-3 sticky top-0 bg-background z-10">
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="e.g. SolarEdge, GivEnergy, Solis"
                className={searchInputCn}
              />
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto overscroll-contain momentum-scroll-y px-3 py-2 pb-6">
              {filteredInverters ? (
                filteredInverters.length > 0 ? (
                  <div className="space-y-2">
                    {filteredInverters.map((inv) => renderItem(inv, true))}
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <p className="text-sm font-semibold text-white">No inverters found</p>
                    <p className="text-[12px] text-white/80 mt-1">Try a different make or model</p>
                  </div>
                )
              ) : (
                Object.entries(invertersGrouped).map(([manufacturer, inverters]) => (
                  <div key={manufacturer} className="mb-3">
                    <p className="py-2 text-[12px] font-semibold text-white/80 sticky top-0 bg-background">
                      {manufacturer}
                    </p>
                    <div className="space-y-2">
                      {inverters.map((inv) => renderItem(inv, true))}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-white/[0.06] px-4 py-2.5">
              <p className="text-[11px] text-white/80 text-center">
                {getInverterCount()} inverters
              </p>
            </div>
          </div>
        </SwipeableBottomSheet>
      </div>
    );
  }

  // Desktop: Popover
  return (
    <div className="relative">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>{triggerButton}</PopoverTrigger>
        <PopoverContent
          className="w-[calc(100vw-2rem)] sm:w-[420px] p-0 bg-background border-white/[0.08] shadow-xl z-[100]"
          align="start"
          sideOffset={4}
        >
          <Command className="bg-background" shouldFilter={false}>
            <div className="px-3 pt-1 pb-2.5">
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="e.g. SolarEdge, GivEnergy, Solis"
                className={searchInputCn}
              />
            </div>

            <CommandList className="max-h-[320px]">
              {filteredInverters ? (
                filteredInverters.length > 0 ? (
                  <CommandGroup className="py-2">
                    {filteredInverters.map((inverter) => (
                      <CommandItem
                        key={inverter.id}
                        value={inverter.id}
                        onSelect={() => handleSelect(inverter)}
                        className="mx-1 rounded-lg cursor-pointer py-0 px-0 hover:bg-transparent"
                      >
                        {renderItem(inverter)}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ) : (
                  <CommandEmpty className="py-6 text-center">
                    <p className="text-white text-sm">No inverters found</p>
                  </CommandEmpty>
                )
              ) : (
                Object.entries(invertersGrouped).map(([manufacturer, inverters]) => (
                  <CommandGroup key={manufacturer} heading={manufacturer} className="py-2">
                    {inverters.map((inverter) => (
                      <CommandItem
                        key={inverter.id}
                        value={inverter.id}
                        onSelect={() => handleSelect(inverter)}
                        className="mx-1 rounded-lg cursor-pointer py-0 px-0 hover:bg-transparent"
                      >
                        {renderItem(inverter)}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ))
              )}
            </CommandList>

            <div className="border-t border-white/[0.06] px-3 py-2">
              <p className="text-[11px] text-white/80 text-center">
                {getInverterCount()} inverters
              </p>
            </div>
          </Command>
        </PopoverContent>
      </Popover>
      {autoFillBadge}
    </div>
  );
}

export default InverterAutocomplete;
