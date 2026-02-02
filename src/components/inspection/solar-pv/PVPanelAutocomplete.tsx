/**
 * PV Panel Autocomplete Component
 *
 * Searchable combobox for selecting solar panels with:
 * - Panels grouped by manufacturer
 * - Search across make/model/wattage
 * - Auto-fill badge showing populated fields
 * - Callback for applying panel defaults
 */

import * as React from 'react';
import { Check, ChevronsUpDown, Sparkles, Zap } from 'lucide-react';
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
  getPanelCount,
  type SolarPanel,
} from '@/data/solarPanelDatabase';

interface PVPanelAutocompleteProps {
  value?: string;
  onValueChange?: (panelId: string) => void;
  onPanelSelect?: (panel: SolarPanel | null) => void;
  placeholder?: string;
  className?: string;
  showAutoFillBadge?: boolean;
  disabled?: boolean;
}

export function PVPanelAutocomplete({
  value,
  onValueChange,
  onPanelSelect,
  placeholder = 'Select panel...',
  className,
  showAutoFillBadge = true,
  disabled = false,
}: PVPanelAutocompleteProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');

  // Get panels grouped by manufacturer
  const panelsGrouped = React.useMemo(() => getPanelsGroupedByManufacturer(), []);

  // Filter panels based on search
  const filteredPanels = React.useMemo(() => {
    if (!search.trim()) return null;
    return searchPanels(search);
  }, [search]);

  // Find panel by value (make + model string)
  const selectedPanel = React.useMemo(() => {
    if (!value) return null;
    // Search through all panels to find match
    const allPanels = Object.values(panelsGrouped).flat();
    return allPanels.find(p => `${p.make} ${p.model}` === value) || null;
  }, [value, panelsGrouped]);

  // Handle panel selection
  const handleSelect = React.useCallback((panel: SolarPanel) => {
    const newValue = `${panel.make} ${panel.model}`;
    const isDeselecting = value === newValue;

    onValueChange?.(isDeselecting ? '' : panel.id);
    onPanelSelect?.(isDeselecting ? null : panel);

    setOpen(false);
    setSearch('');
  }, [value, onValueChange, onPanelSelect]);

  // Format display value
  const displayValue = React.useMemo(() => {
    if (!selectedPanel) return placeholder;
    return `${selectedPanel.make} ${selectedPanel.model}`;
  }, [selectedPanel, placeholder]);

  // Check if panel has auto-fill data
  const hasAutoFill = React.useMemo(() => {
    if (!selectedPanel) return false;
    const defaults = getPanelDefaults(selectedPanel.id);
    return defaults !== null;
  }, [selectedPanel]);

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
                      onSelect={() => handleSelect(panel)}
                      className="bg-elec-gray hover:bg-gray-700 cursor-pointer text-foreground py-2"
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4 shrink-0',
                          selectedPanel?.id === panel.id ? 'opacity-100 text-elec-yellow' : 'opacity-0'
                        )}
                      />
                      <div className="flex flex-col flex-1 min-w-0">
                        <span className="font-medium truncate">
                          {panel.make} {panel.model}
                        </span>
                        <span className="text-xs text-gray-400 truncate">
                          {panel.wattage}W • {panel.efficiency}% • {panel.cellType}
                        </span>
                      </div>
                      <span className="ml-2 px-1.5 py-0.5 text-[10px] font-medium bg-amber-500/20 text-amber-400 rounded">
                        {panel.wattage}W
                      </span>
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
                        onSelect={() => handleSelect(panel)}
                        className="bg-elec-gray hover:bg-gray-700 cursor-pointer text-foreground py-2"
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4 shrink-0',
                            selectedPanel?.id === panel.id ? 'opacity-100 text-elec-yellow' : 'opacity-0'
                          )}
                        />
                        <div className="flex flex-col flex-1 min-w-0">
                          <span className="font-medium truncate">{panel.model}</span>
                          <span className="text-xs text-gray-400 truncate">
                            {panel.wattage}W • {panel.efficiency}%
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

              {/* Database footer */}
              <div className="p-2 text-xs text-gray-500 border-t border-white/10 text-center">
                {getPanelCount()} MCS-certified panels
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
            {panel.make} {panel.model}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            {panel.cellType} • {panel.cells} cells
          </p>
        </div>
        <span className="px-2 py-1 text-xs font-semibold bg-amber-500/20 text-amber-400 rounded">
          {panel.wattage}W
        </span>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
        <div>
          <span className="text-gray-400">Efficiency:</span>{' '}
          <span className="text-foreground">{panel.efficiency}%</span>
        </div>
        <div>
          <span className="text-gray-400">Voc:</span>{' '}
          <span className="text-foreground">{panel.voc}V</span>
        </div>
        <div>
          <span className="text-gray-400">Isc:</span>{' '}
          <span className="text-foreground">{panel.isc}A</span>
        </div>
        <div>
          <span className="text-gray-400">Vmp:</span>{' '}
          <span className="text-foreground">{panel.vmp}V</span>
        </div>
      </div>

      <div className="mt-2 flex items-center gap-2">
        {panel.mcsCertified && (
          <span className="flex items-center gap-1 text-green-400 text-xs">
            <Zap className="h-3 w-3" />
            MCS Certified
          </span>
        )}
        <span className="text-xs text-gray-500">
          {panel.warranty.product}yr product / {panel.warranty.performance}yr performance
        </span>
      </div>
    </div>
  );
}

export default PVPanelAutocomplete;
