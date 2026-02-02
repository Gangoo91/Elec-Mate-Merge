/**
 * Inverter Autocomplete Component
 *
 * Searchable combobox for selecting solar inverters with:
 * - Inverters grouped by manufacturer
 * - Search across make/model/power
 * - Auto-fill badge showing populated fields
 * - Callback for applying inverter defaults
 */

import * as React from 'react';
import { Check, ChevronsUpDown, Sparkles, Zap, Battery } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
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

  // Get inverters grouped by manufacturer
  const invertersGrouped = React.useMemo(() => getInvertersGroupedByManufacturer(), []);

  // Filter inverters based on search
  const filteredInverters = React.useMemo(() => {
    if (!search.trim()) return null;
    return searchInverters(search);
  }, [search]);

  // Find inverter by value (make + model string)
  const selectedInverter = React.useMemo(() => {
    if (!value) return null;
    // Search through all inverters to find match
    const allInverters = Object.values(invertersGrouped).flat();
    return allInverters.find(i => `${i.make} ${i.model}` === value) || null;
  }, [value, invertersGrouped]);

  // Handle inverter selection
  const handleSelect = React.useCallback((inverter: SolarInverter) => {
    const newValue = `${inverter.make} ${inverter.model}`;
    const isDeselecting = value === newValue;

    onValueChange?.(isDeselecting ? '' : inverter.id);
    onInverterSelect?.(isDeselecting ? null : inverter);

    setOpen(false);
    setSearch('');
  }, [value, onValueChange, onInverterSelect]);

  // Format display value
  const displayValue = React.useMemo(() => {
    if (!selectedInverter) return placeholder;
    return `${selectedInverter.make} ${selectedInverter.model}`;
  }, [selectedInverter, placeholder]);

  // Check if inverter has auto-fill data
  const hasAutoFill = React.useMemo(() => {
    if (!selectedInverter) return false;
    const defaults = getInverterDefaults(selectedInverter.id);
    return defaults !== null;
  }, [selectedInverter]);

  // Get type badge color
  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'hybrid': return 'bg-green-500/20 text-green-400';
      case 'micro': return 'bg-purple-500/20 text-purple-400';
      case 'central': return 'bg-orange-500/20 text-orange-400';
      default: return 'bg-blue-500/20 text-blue-400';
    }
  };

  return (
    <div className="relative">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className={cn(
              'w-full justify-between h-11 touch-manipulation',
              'bg-elec-gray border-white/30 text-foreground',
              'hover:bg-gray-700 hover:border-white/40',
              'focus:border-yellow-500 focus:ring-yellow-500',
              'data-[state=open]:border-elec-yellow data-[state=open]:ring-2',
              disabled && 'opacity-50 cursor-not-allowed',
              className
            )}
          >
            <span className={cn(
              'truncate',
              !selectedInverter && 'text-muted-foreground'
            )}>
              {displayValue}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[var(--radix-popover-trigger-width)] p-0 bg-elec-gray border border-white/20 shadow-lg z-[100]"
          align="start"
          sideOffset={4}
        >
          <Command className="bg-elec-gray" shouldFilter={false}>
            <CommandInput
              placeholder="Search inverters..."
              value={search}
              onValueChange={setSearch}
              className="border-none bg-elec-gray text-foreground placeholder:text-gray-400"
            />
            <CommandList className="bg-elec-gray max-h-[300px]">
              <CommandEmpty className="p-4 text-sm text-gray-400">
                No inverters found.
              </CommandEmpty>

              {/* Show search results if searching */}
              {filteredInverters && filteredInverters.length > 0 ? (
                <CommandGroup heading="Search Results" className="bg-elec-gray">
                  {filteredInverters.map((inverter) => (
                    <CommandItem
                      key={inverter.id}
                      value={inverter.id}
                      onSelect={() => handleSelect(inverter)}
                      className="bg-elec-gray hover:bg-gray-700 cursor-pointer text-foreground py-2"
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4 shrink-0',
                          selectedInverter?.id === inverter.id ? 'opacity-100 text-elec-yellow' : 'opacity-0'
                        )}
                      />
                      <div className="flex flex-col flex-1 min-w-0">
                        <span className="font-medium truncate">
                          {inverter.make} {inverter.model}
                        </span>
                        <span className="text-xs text-gray-400 truncate">
                          {inverter.ratedPowerAc}kW • {inverter.phases === 'three' ? '3Φ' : '1Φ'} • {inverter.mpptCount} MPPT
                        </span>
                      </div>
                      <div className="ml-2 flex items-center gap-1">
                        <span className={cn('px-1.5 py-0.5 text-[10px] font-medium rounded', getTypeBadgeColor(inverter.type))}>
                          {inverter.type}
                        </span>
                        {inverter.hybridCapable && (
                          <Battery className="h-3 w-3 text-green-400" />
                        )}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              ) : (
                /* Show grouped by manufacturer when not searching */
                Object.entries(invertersGrouped).map(([manufacturer, inverters]) => (
                  <CommandGroup key={manufacturer} heading={manufacturer} className="bg-elec-gray">
                    {inverters.map((inverter) => (
                      <CommandItem
                        key={inverter.id}
                        value={inverter.id}
                        onSelect={() => handleSelect(inverter)}
                        className="bg-elec-gray hover:bg-gray-700 cursor-pointer text-foreground py-2"
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4 shrink-0',
                            selectedInverter?.id === inverter.id ? 'opacity-100 text-elec-yellow' : 'opacity-0'
                          )}
                        />
                        <div className="flex flex-col flex-1 min-w-0">
                          <span className="font-medium truncate">{inverter.model}</span>
                          <span className="text-xs text-gray-400 truncate">
                            {inverter.ratedPowerAc}kW • {inverter.phases === 'three' ? '3Φ' : '1Φ'}
                          </span>
                        </div>
                        <div className="ml-2 flex items-center gap-1">
                          {inverter.hybridCapable && (
                            <Battery className="h-3 w-3 text-green-400" title="Hybrid capable" />
                          )}
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ))
              )}

              {/* Database footer */}
              <div className="p-2 text-xs text-gray-500 border-t border-white/10 text-center">
                {getInverterCount()} MCS-certified inverters
              </div>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Auto-fill badge - positioned above and to the right */}
      {showAutoFillBadge && hasAutoFill && (
        <div className="absolute -top-3 right-2 flex items-center gap-1 px-2 py-0.5 bg-background border border-elec-yellow/40 rounded-full text-[10px] font-semibold text-elec-yellow shadow-sm">
          <Sparkles className="h-3 w-3" />
          Auto-filled
        </div>
      )}
    </div>
  );
}

/**
 * Inverter Info Display Component
 * Shows details about the selected inverter
 */
interface InverterInfoDisplayProps {
  inverterId: string | null;
  className?: string;
}

export function InverterInfoDisplay({ inverterId, className }: InverterInfoDisplayProps) {
  const inverter = React.useMemo(() => {
    if (!inverterId) return null;
    return findInverterById(inverterId);
  }, [inverterId]);

  if (!inverter) return null;

  return (
    <div className={cn(
      'p-3 bg-elec-gray/50 border border-white/10 rounded-lg text-sm',
      className
    )}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-medium text-foreground">
            {inverter.make} {inverter.model}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            {inverter.type} inverter • {inverter.phases === 'three' ? 'Three Phase' : 'Single Phase'}
          </p>
        </div>
        <span className="px-2 py-1 text-xs font-semibold bg-blue-500/20 text-blue-400 rounded">
          {inverter.ratedPowerAc}kW
        </span>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
        <div>
          <span className="text-gray-400">MPPT:</span>{' '}
          <span className="text-foreground">{inverter.mpptCount} inputs</span>
        </div>
        <div>
          <span className="text-gray-400">Efficiency:</span>{' '}
          <span className="text-foreground">{inverter.efficiency}%</span>
        </div>
        <div>
          <span className="text-gray-400">Max DC:</span>{' '}
          <span className="text-foreground">{inverter.maxInputVoltage}V</span>
        </div>
        <div>
          <span className="text-gray-400">Warranty:</span>{' '}
          <span className="text-foreground">{inverter.warranty} years</span>
        </div>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-2">
        {inverter.mcsCertified && (
          <span className="flex items-center gap-1 text-green-400 text-xs">
            <Zap className="h-3 w-3" />
            MCS
          </span>
        )}
        {inverter.g98g99Compliant && (
          <span className="text-xs text-gray-400">G98/G99</span>
        )}
        {inverter.hybridCapable && (
          <span className="flex items-center gap-1 text-green-400 text-xs">
            <Battery className="h-3 w-3" />
            Hybrid
          </span>
        )}
        {inverter.wifi && (
          <span className="text-xs text-gray-400">WiFi</span>
        )}
      </div>
    </div>
  );
}

export default InverterAutocomplete;
