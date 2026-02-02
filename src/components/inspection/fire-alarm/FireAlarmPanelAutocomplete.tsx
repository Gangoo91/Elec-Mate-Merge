/**
 * Fire Alarm Panel Autocomplete Component
 *
 * Searchable combobox for selecting fire alarm panels with:
 * - Panels grouped by manufacturer
 * - Search across make/model/protocol
 * - Auto-fill badge showing populated fields
 * - Callback for applying panel defaults
 */

import * as React from 'react';
import { Check, ChevronsUpDown, Zap, Sparkles } from 'lucide-react';
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
  getPanelsGroupedByManufacturer,
  searchPanels,
  findPanelById,
  getPanelDefaults,
  type FireAlarmPanel,
} from '@/data/fireAlarmEquipmentDatabase';

interface FireAlarmPanelAutocompleteProps {
  value?: string;
  onValueChange?: (panelId: string) => void;
  onPanelSelect?: (panel: FireAlarmPanel | null, defaults: {
    networkType: string;
    zonesCount: number;
    loopCapacity: number;
    protocol: string;
  } | null) => void;
  placeholder?: string;
  className?: string;
  showAutoFillBadge?: boolean;
  disabled?: boolean;
}

export function FireAlarmPanelAutocomplete({
  value,
  onValueChange,
  onPanelSelect,
  placeholder = 'Select panel...',
  className,
  showAutoFillBadge = true,
  disabled = false,
}: FireAlarmPanelAutocompleteProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');

  // Get panels grouped by manufacturer
  const panelsGrouped = React.useMemo(() => getPanelsGroupedByManufacturer(), []);

  // Filter panels based on search
  const filteredPanels = React.useMemo(() => {
    if (!search.trim()) return null;
    return searchPanels(search);
  }, [search]);

  // Get selected panel
  const selectedPanel = React.useMemo(() => {
    if (!value) return null;
    return findPanelById(value);
  }, [value]);

  // Handle panel selection
  const handleSelect = React.useCallback((panelId: string) => {
    const newValue = panelId === value ? '' : panelId;
    onValueChange?.(newValue);

    if (newValue) {
      const panel = findPanelById(newValue);
      const defaults = getPanelDefaults(newValue);
      onPanelSelect?.(panel, defaults);
    } else {
      onPanelSelect?.(null, null);
    }

    setOpen(false);
    setSearch('');
  }, [value, onValueChange, onPanelSelect]);

  // Format display value
  const displayValue = React.useMemo(() => {
    if (!selectedPanel) return placeholder;
    return `${selectedPanel.manufacturer} ${selectedPanel.model}`;
  }, [selectedPanel, placeholder]);

  // Check if panel has auto-fill data
  const hasAutoFill = React.useMemo(() => {
    if (!value) return false;
    const defaults = getPanelDefaults(value);
    return defaults !== null;
  }, [value]);

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
              !selectedPanel && 'text-muted-foreground'
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
              placeholder="Search panels..."
              value={search}
              onValueChange={setSearch}
              className="border-none bg-elec-gray text-foreground placeholder:text-gray-400"
            />
            <CommandList className="bg-elec-gray max-h-[300px]">
              <CommandEmpty className="p-4 text-sm text-gray-400">
                No panels found.
              </CommandEmpty>

              {/* Show search results if searching */}
              {filteredPanels && filteredPanels.length > 0 ? (
                <CommandGroup heading="Search Results" className="bg-elec-gray">
                  {filteredPanels.map((panel) => (
                    <CommandItem
                      key={panel.id}
                      value={panel.id}
                      onSelect={handleSelect}
                      className="bg-elec-gray hover:bg-gray-700 cursor-pointer text-foreground py-2"
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4 shrink-0',
                          value === panel.id ? 'opacity-100 text-elec-yellow' : 'opacity-0'
                        )}
                      />
                      <div className="flex flex-col flex-1 min-w-0">
                        <span className="font-medium truncate">
                          {panel.manufacturer} {panel.model}
                        </span>
                        <span className="text-xs text-gray-400 truncate">
                          {panel.type} • {panel.protocol || 'Conventional'}
                          {panel.loops && ` • ${panel.loops} loops`}
                        </span>
                      </div>
                      {panel.yearIntroduced && panel.yearIntroduced >= 2024 && (
                        <span className="ml-2 px-1.5 py-0.5 text-[10px] font-medium bg-elec-yellow/20 text-elec-yellow rounded">
                          NEW
                        </span>
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ) : (
                /* Show grouped by manufacturer when not searching */
                Object.entries(panelsGrouped).map(([manufacturer, panels]) => (
                  <CommandGroup key={manufacturer} heading={manufacturer} className="bg-elec-gray">
                    {panels.map((panel) => (
                      <CommandItem
                        key={panel.id}
                        value={panel.id}
                        onSelect={handleSelect}
                        className="bg-elec-gray hover:bg-gray-700 cursor-pointer text-foreground py-2"
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4 shrink-0',
                            value === panel.id ? 'opacity-100 text-elec-yellow' : 'opacity-0'
                          )}
                        />
                        <div className="flex flex-col flex-1 min-w-0">
                          <span className="font-medium truncate">{panel.model}</span>
                          <span className="text-xs text-gray-400 truncate">
                            {panel.type}
                            {panel.zones && ` • ${panel.zones} zones`}
                            {panel.loops && ` • ${panel.loops} loops`}
                          </span>
                        </div>
                        {panel.yearIntroduced && panel.yearIntroduced >= 2024 && (
                          <span className="ml-2 px-1.5 py-0.5 text-[10px] font-medium bg-elec-yellow/20 text-elec-yellow rounded">
                            NEW
                          </span>
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ))
              )}
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
 * Panel Info Display Component
 * Shows details about the selected panel
 */
interface PanelInfoDisplayProps {
  panelId: string | null;
  className?: string;
}

export function PanelInfoDisplay({ panelId, className }: PanelInfoDisplayProps) {
  const panel = React.useMemo(() => {
    if (!panelId) return null;
    return findPanelById(panelId);
  }, [panelId]);

  if (!panel) return null;

  return (
    <div className={cn(
      'p-3 bg-elec-gray/50 border border-white/10 rounded-lg text-sm',
      className
    )}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-medium text-foreground">
            {panel.manufacturer} {panel.model}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            {panel.type} • {panel.protocol || 'Conventional Protocol'}
          </p>
        </div>
        {panel.yearIntroduced && (
          <span className="text-xs text-gray-500">
            Since {panel.yearIntroduced}
          </span>
        )}
      </div>

      <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
        {panel.zones && (
          <div>
            <span className="text-gray-400">Zones:</span>{' '}
            <span className="text-foreground">{panel.zones}</span>
          </div>
        )}
        {panel.loops && (
          <div>
            <span className="text-gray-400">Loops:</span>{' '}
            <span className="text-foreground">{panel.loops}</span>
          </div>
        )}
        {panel.devices && (
          <div>
            <span className="text-gray-400">Devices:</span>{' '}
            <span className="text-foreground">{panel.devices}</span>
          </div>
        )}
        {panel.networkable && (
          <div className="flex items-center gap-1 text-green-400">
            <Zap className="h-3 w-3" />
            Networkable
          </div>
        )}
      </div>

      {panel.features && panel.features.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {panel.features.slice(0, 4).map((feature, i) => (
            <span
              key={i}
              className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] text-gray-400"
            >
              {feature}
            </span>
          ))}
          {panel.features.length > 4 && (
            <span className="px-1.5 py-0.5 text-[10px] text-gray-500">
              +{panel.features.length - 4} more
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default FireAlarmPanelAutocomplete;
