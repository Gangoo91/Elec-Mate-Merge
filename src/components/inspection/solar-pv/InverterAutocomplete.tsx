/**
 * Inverter Autocomplete — Best-in-Class Mobile
 * Matches PVPanelAutocomplete pattern exactly
 */

import * as React from 'react';
import { Check, ChevronsUpDown, Sparkles, Zap, Battery, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { SwipeableBottomSheet } from '@/components/native/SwipeableBottomSheet';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  getInvertersGroupedByManufacturer,
  searchInverters,
  findInverterById,
  getInverterDefaults,
  getInverterCount,
  type SolarInverter,
} from '@/data/solarInverterDatabase';

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

  const displayValue = React.useMemo(() => {
    if (!selectedInverter) return placeholder;
    return `${selectedInverter.make} ${selectedInverter.model}`;
  }, [selectedInverter, placeholder]);

  const hasAutoFill = React.useMemo(() => {
    if (!selectedInverter) return false;
    return getInverterDefaults(selectedInverter.id) !== null;
  }, [selectedInverter]);

  // Trigger — matches PVPanelAutocomplete exactly
  const triggerButton = (
    <button
      type="button"
      role="combobox"
      aria-expanded={open}
      disabled={disabled}
      onClick={() => setOpen(true)}
      className={cn(
        'w-full h-12 text-sm px-3 rounded-xl',
        'bg-white/[0.06] border border-white/[0.08] text-white',
        'flex items-center justify-between gap-2',
        'focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 touch-manipulation',
        'hover:bg-white/[0.08] active:scale-[0.98] transition-all',
        !selectedInverter && 'text-white',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <span className="truncate text-left flex-1">{displayValue}</span>
      <ChevronsUpDown className="h-3.5 w-3.5 opacity-40 flex-shrink-0" />
    </button>
  );

  // Item renderer — card-style, no purple, matches panel pattern
  const renderItem = (inverter: SolarInverter, showMake = false, forMobile = false) => {
    const isSelected = selectedInverter?.id === inverter.id;
    return (
      <button
        key={inverter.id}
        type="button"
        onClick={() => handleSelect(inverter)}
        className={cn(
          'w-full text-left flex items-center gap-2.5 touch-manipulation active:scale-[0.98] transition-all',
          forMobile
            ? 'my-1 px-3 py-3 rounded-xl border'
            : 'px-2 py-2 rounded-lg',
          isSelected
            ? forMobile
              ? 'bg-elec-yellow/10 border-elec-yellow/20'
              : 'bg-elec-yellow/10'
            : forMobile
              ? 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]'
              : 'hover:bg-white/[0.04]'
        )}
      >
        <div
          className={cn(
            'w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all',
            isSelected ? 'bg-elec-yellow border-elec-yellow' : 'border-white/20'
          )}
        >
          {isSelected && <Check className="h-3 w-3 text-black" />}
        </div>
        <div className="flex flex-col flex-1 min-w-0">
          <span className={cn('font-medium truncate', isSelected ? 'text-elec-yellow' : 'text-white', forMobile && 'text-sm')}>
            {showMake ? `${inverter.make} ${inverter.model}` : inverter.model}
          </span>
          <span className="text-xs text-white/50 truncate">
            {inverter.ratedPowerAc}kW • {inverter.phases === 'three' ? '3Φ' : '1Φ'} • {inverter.mpptCount} MPPT
          </span>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0 ml-1">
          <span className="text-[8px] text-amber-400 bg-amber-500/15 px-1 py-0.5 rounded font-bold">
            {inverter.type}
          </span>
          {inverter.hybridCapable && (
            <Battery className="h-3 w-3 text-green-400 flex-shrink-0" />
          )}
          {inverter.mcsCertified && (
            <span className="text-[8px] text-green-400 bg-green-500/15 px-1 py-0.5 rounded font-bold">MCS</span>
          )}
        </div>
      </button>
    );
  };

  // Mobile: SwipeableBottomSheet — matches panel pattern exactly
  if (isMobile) {
    return (
      <div className="relative">
        {triggerButton}

        <SwipeableBottomSheet
          open={open}
          onOpenChange={setOpen}
          contentClassName="p-0"
        >
          <div className="flex flex-col max-h-[65vh]">
            {/* Header */}
            <div className="px-4 pt-1 pb-3 sticky top-0 bg-background z-10">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-bold text-white uppercase tracking-wider">
                  {filteredInverters ? `${filteredInverters.length} results` : `${getInverterCount()} inverters`}
                </p>
                {selectedInverter && (
                  <button
                    onClick={() => { onInverterSelect?.(null); onValueChange?.(''); setOpen(false); }}
                    className="text-[10px] text-red-400 font-medium touch-manipulation"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2.5 h-12 px-3 rounded-xl bg-white/[0.06] border border-white/[0.08]">
                <Search className="h-4 w-4 text-white flex-shrink-0" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by make, model, power..."
                  className="flex-1 bg-transparent text-base text-white placeholder:text-white outline-none"
                />
                {search && (
                  <button onClick={() => setSearch('')} className="w-6 h-6 rounded-full bg-white/[0.1] flex items-center justify-center touch-manipulation">
                    <X className="h-3 w-3 text-white" />
                  </button>
                )}
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto overscroll-contain momentum-scroll-y pb-6 px-4">
              {filteredInverters && filteredInverters.length > 0 ? (
                <div className="space-y-1">
                  {filteredInverters.map((inv) => renderItem(inv, true, true))}
                </div>
              ) : search.trim() ? (
                <div className="py-12 text-center">
                  <Zap className="h-8 w-8 mx-auto mb-2 text-white/20" />
                  <p className="text-sm text-white">No inverters found</p>
                </div>
              ) : (
                Object.entries(invertersGrouped).map(([manufacturer, inverters]) => (
                  <div key={manufacturer} className="mb-3">
                    <p className="py-2 text-[10px] font-bold text-white/50 uppercase tracking-wider sticky top-0 bg-background">
                      {manufacturer}
                    </p>
                    <div className="space-y-1">
                      {inverters.map((inv) => renderItem(inv, false, true))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </SwipeableBottomSheet>

        {showAutoFillBadge && hasAutoFill && (
          <div className="absolute -top-3 right-2 flex items-center gap-1 px-2 py-0.5 bg-background border border-elec-yellow/40 rounded-full text-xs font-semibold text-elec-yellow shadow-sm">
            <Sparkles className="h-3 w-3" />
            Auto-filled
          </div>
        )}
      </div>
    );
  }

  // Desktop: Popover
  return (
    <div className="relative">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>{triggerButton}</PopoverTrigger>
        <PopoverContent
          className="w-[var(--radix-popover-trigger-width)] p-0 bg-background border border-white/[0.1] rounded-xl shadow-xl z-[9999]"
          align="start"
          sideOffset={4}
        >
          <Command className="bg-background" shouldFilter={false}>
            <CommandInput
              placeholder="Search inverters..."
              value={search}
              onValueChange={setSearch}
              className="border-none bg-background text-white placeholder:text-white"
            />
            <CommandList className="bg-background max-h-[300px]">
              <CommandEmpty className="p-4 text-sm text-white">No inverters found.</CommandEmpty>

              {filteredInverters && filteredInverters.length > 0 ? (
                <CommandGroup heading="Search Results" className="bg-background">
                  {filteredInverters.map((inverter) => (
                    <CommandItem
                      key={inverter.id}
                      value={inverter.id}
                      onSelect={() => handleSelect(inverter)}
                      className="hover:bg-white/[0.04] cursor-pointer text-white py-2"
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4 shrink-0',
                          selectedInverter?.id === inverter.id ? 'opacity-100 text-elec-yellow' : 'opacity-0'
                        )}
                      />
                      <div className="flex flex-col flex-1 min-w-0">
                        <span className="font-medium truncate">{inverter.make} {inverter.model}</span>
                        <span className="text-xs text-white/50 truncate">
                          {inverter.ratedPowerAc}kW • {inverter.phases === 'three' ? '3Φ' : '1Φ'} • {inverter.mpptCount} MPPT
                        </span>
                      </div>
                      <span className="text-[9px] text-amber-400 bg-amber-500/15 px-1 py-0.5 rounded font-bold ml-2">
                        {inverter.type}
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              ) : (
                Object.entries(invertersGrouped).map(([manufacturer, inverters]) => (
                  <CommandGroup key={manufacturer} heading={manufacturer} className="bg-background">
                    {inverters.map((inverter) => (
                      <CommandItem
                        key={inverter.id}
                        value={inverter.id}
                        onSelect={() => handleSelect(inverter)}
                        className="hover:bg-white/[0.04] cursor-pointer text-white py-2"
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4 shrink-0',
                            selectedInverter?.id === inverter.id ? 'opacity-100 text-elec-yellow' : 'opacity-0'
                          )}
                        />
                        <div className="flex flex-col flex-1 min-w-0">
                          <span className="font-medium truncate">{inverter.model}</span>
                          <span className="text-xs text-white/50 truncate">
                            {inverter.ratedPowerAc}kW • {inverter.phases === 'three' ? '3Φ' : '1Φ'}
                          </span>
                        </div>
                        {inverter.hybridCapable && <Battery className="h-3 w-3 text-green-400 ml-1" />}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ))
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {showAutoFillBadge && hasAutoFill && (
        <div className="absolute -top-3 right-2 flex items-center gap-1 px-2 py-0.5 bg-background border border-elec-yellow/40 rounded-full text-xs font-semibold text-elec-yellow shadow-sm">
          <Sparkles className="h-3 w-3" />
          Auto-filled
        </div>
      )}
    </div>
  );
}

export default InverterAutocomplete;
