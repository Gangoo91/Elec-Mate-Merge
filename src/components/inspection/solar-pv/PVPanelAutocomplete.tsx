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
import { Check, ChevronsUpDown, Sparkles, Zap, Search, X } from 'lucide-react';
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
  const isMobile = useIsMobile();

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
    return allPanels.find((p) => `${p.make} ${p.model}` === value) || null;
  }, [value, panelsGrouped]);

  // Handle panel selection
  const handleSelect = React.useCallback(
    (panel: SolarPanel) => {
      const newValue = `${panel.make} ${panel.model}`;
      const isDeselecting = value === newValue;

      onValueChange?.(isDeselecting ? '' : panel.id);
      onPanelSelect?.(isDeselecting ? null : panel);

      setOpen(false);
      setSearch('');
    },
    [value, onValueChange, onPanelSelect]
  );

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

  // Trigger button shared between mobile and desktop
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
        !selectedPanel && 'text-white',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <span className="truncate text-left flex-1">{displayValue}</span>
      <ChevronsUpDown className="h-3.5 w-3.5 opacity-40 flex-shrink-0" />
    </button>
  );

  // Render panel item — card-style for mobile, compact for desktop
  const renderPanelItem = (panel: SolarPanel, showMake = false, forMobile = false) => {
    const isSelected = selectedPanel?.id === panel.id;
    return (
      <button
        key={panel.id}
        type="button"
        onClick={() => handleSelect(panel)}
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
            {showMake ? `${panel.make} ${panel.model}` : panel.model}
          </span>
          <span className="text-xs text-white/50 truncate">
            {panel.wattage}W • {panel.efficiency}% • {panel.cellType}
          </span>
        </div>
        {(panel.mcsCertified || (panel.yearIntroduced && panel.yearIntroduced >= 2024)) && (
          <div className="flex items-center gap-1 flex-shrink-0 ml-1">
            {panel.mcsCertified && (
              <span className="text-[8px] text-green-400 bg-green-500/15 px-1 py-0.5 rounded font-bold">MCS</span>
            )}
            {panel.yearIntroduced && panel.yearIntroduced >= 2024 && (
              <span className="text-[8px] text-elec-yellow bg-elec-yellow/15 px-1 py-0.5 rounded font-bold">NEW</span>
            )}
          </div>
        )}
      </button>
    );
  };

  // Mobile: Use SwipeableBottomSheet
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
                  {filteredPanels ? `${filteredPanels.length} results` : `${getPanelCount()} panels`}
                </p>
                {selectedPanel && (
                  <button
                    onClick={() => { onPanelSelect?.(null); onValueChange?.(''); setOpen(false); }}
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
                  placeholder="Search by make, model, wattage..."
                  className="flex-1 bg-transparent text-base text-white placeholder:text-white outline-none"
                />
                {search && (
                  <button onClick={() => setSearch('')} className="w-6 h-6 rounded-full bg-white/[0.1] flex items-center justify-center touch-manipulation">
                    <X className="h-3 w-3 text-white" />
                  </button>
                )}
              </div>
            </div>

            {/* Panel list */}
            <div className="flex-1 overflow-y-auto overscroll-contain momentum-scroll-y pb-6 px-4">
              {filteredPanels && filteredPanels.length > 0 ? (
                <div className="space-y-1">
                  {filteredPanels.map((panel) => renderPanelItem(panel, true, true))}
                </div>
              ) : search.trim() ? (
                <div className="py-12 text-center">
                  <Zap className="h-8 w-8 mx-auto mb-2 text-white/20" />
                  <p className="text-sm text-white">No panels found</p>
                </div>
              ) : (
                Object.entries(panelsGrouped).map(([manufacturer, panels]) => (
                  <div key={manufacturer} className="mb-3">
                    <p className="py-2 text-[10px] font-bold text-white/50 uppercase tracking-wider sticky top-0 bg-background">
                      {manufacturer}
                    </p>
                    <div className="space-y-1">
                      {panels.map((panel) => renderPanelItem(panel, false, true))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </SwipeableBottomSheet>

        {/* Auto-fill badge */}
        {showAutoFillBadge && hasAutoFill && (
          <div className="absolute -top-3 right-2 flex items-center gap-1 px-2 py-0.5 bg-background border border-elec-yellow/40 rounded-full text-xs font-semibold text-elec-yellow shadow-sm">
            <Sparkles className="h-3 w-3" />
            Auto-filled
          </div>
        )}
      </div>
    );
  }

  // Desktop: Use Popover
  return (
    <div className="relative">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>{triggerButton}</PopoverTrigger>
        <PopoverContent
          className="w-[var(--radix-popover-trigger-width)] p-0 bg-background border border-white/20 shadow-lg z-[100]"
          align="start"
          sideOffset={4}
        >
          <Command className="bg-background" shouldFilter={false}>
            <CommandInput
              placeholder="Search panels..."
              value={search}
              onValueChange={setSearch}
              className="border-none bg-background text-white placeholder:text-white"
            />
            <CommandList className="bg-background max-h-[300px]">
              <CommandEmpty className="p-4 text-sm text-white">No panels found.</CommandEmpty>

              {/* Show search results if searching */}
              {filteredPanels && filteredPanels.length > 0 ? (
                <CommandGroup heading="Search Results" className="bg-background">
                  {filteredPanels.map((panel) => (
                    <CommandItem
                      key={panel.id}
                      value={panel.id}
                      onSelect={() => handleSelect(panel)}
                      className="bg-background hover:bg-white/10 cursor-pointer text-white py-2"
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4 shrink-0',
                          selectedPanel?.id === panel.id
                            ? 'opacity-100 text-elec-yellow'
                            : 'opacity-0'
                        )}
                      />
                      <div className="flex flex-col flex-1 min-w-0">
                        <span className="font-medium truncate">
                          {panel.make} {panel.model}
                        </span>
                        <span className="text-xs text-white truncate">
                          {panel.wattage}W • {panel.efficiency}% • {panel.cellType}
                        </span>
                      </div>
                      <span className="ml-2 px-1.5 py-0.5 text-xs font-medium bg-amber-500/20 text-amber-400 rounded">
                        {panel.wattage}W
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              ) : (
                /* Show grouped by manufacturer when not searching */
                Object.entries(panelsGrouped).map(([manufacturer, panels]) => (
                  <CommandGroup key={manufacturer} heading={manufacturer} className="bg-background">
                    {panels.map((panel) => (
                      <CommandItem
                        key={panel.id}
                        value={panel.id}
                        onSelect={() => handleSelect(panel)}
                        className="bg-background hover:bg-white/10 cursor-pointer text-white py-2"
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4 shrink-0',
                            selectedPanel?.id === panel.id
                              ? 'opacity-100 text-elec-yellow'
                              : 'opacity-0'
                          )}
                        />
                        <div className="flex flex-col flex-1 min-w-0">
                          <span className="font-medium truncate">{panel.model}</span>
                          <span className="text-xs text-white truncate">
                            {panel.wattage}W • {panel.efficiency}%
                          </span>
                        </div>
                        {panel.yearIntroduced && panel.yearIntroduced >= 2024 && (
                          <span className="ml-2 px-1.5 py-0.5 text-xs font-medium bg-elec-yellow/20 text-elec-yellow rounded">
                            NEW
                          </span>
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ))
              )}

              {/* Database footer */}
              <div className="p-2 text-xs text-white border-t border-white/10 text-center">
                {getPanelCount()} MCS-certified panels
              </div>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Auto-fill badge - positioned above and to the right */}
      {showAutoFillBadge && hasAutoFill && (
        <div className="absolute -top-3 right-2 flex items-center gap-1 px-2 py-0.5 bg-background border border-elec-yellow/40 rounded-full text-xs font-semibold text-elec-yellow shadow-sm">
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
    <div className={cn('p-3 bg-background/50 border border-white/10 rounded-lg text-sm', className)}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-medium text-white">
            {panel.make} {panel.model}
          </p>
          <p className="text-xs text-white mt-0.5">
            {panel.cellType} • {panel.cells} cells
          </p>
        </div>
        <span className="px-2 py-1 text-xs font-semibold bg-amber-500/20 text-amber-400 rounded">
          {panel.wattage}W
        </span>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
        <div>
          <span className="text-white">Efficiency:</span>{' '}
          <span className="text-white">{panel.efficiency}%</span>
        </div>
        <div>
          <span className="text-white">Voc:</span>{' '}
          <span className="text-white">{panel.voc}V</span>
        </div>
        <div>
          <span className="text-white">Isc:</span>{' '}
          <span className="text-white">{panel.isc}A</span>
        </div>
        <div>
          <span className="text-white">Vmp:</span>{' '}
          <span className="text-white">{panel.vmp}V</span>
        </div>
      </div>

      <div className="mt-2 flex items-center gap-2">
        {panel.mcsCertified && (
          <span className="flex items-center gap-1 text-green-400 text-xs">
            <Zap className="h-3 w-3" />
            MCS Certified
          </span>
        )}
        <span className="text-xs text-white">
          {panel.warranty.product}yr product / {panel.warranty.performance}yr performance
        </span>
      </div>
    </div>
  );
}

export default PVPanelAutocomplete;
