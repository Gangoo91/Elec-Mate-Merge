/**
 * PV Panel Autocomplete
 * Searchable solar panel picker — bottom sheet on mobile, popover on desktop.
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
  getPanelsGroupedByManufacturer,
  searchPanels,
  findPanelById,
  getPanelDefaults,
  getPanelCount,
  type SolarPanel,
} from '@/data/solarPanelDatabase';

const searchInputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

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

  const handleClear = React.useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onPanelSelect?.(null);
      onValueChange?.('');
      setSearch('');
    },
    [onPanelSelect, onValueChange]
  );

  // Format display value
  const displayValue = React.useMemo(() => {
    if (!selectedPanel) return null;
    return `${selectedPanel.make} ${selectedPanel.model}`;
  }, [selectedPanel]);

  // Check if panel has auto-fill data
  const hasAutoFill = React.useMemo(() => {
    if (!selectedPanel) return false;
    const defaults = getPanelDefaults(selectedPanel.id);
    return defaults !== null;
  }, [selectedPanel]);

  // Panel list item — neutral surface, solid volt when selected
  const renderPanelItem = (panel: SolarPanel, forMobile = false) => {
    const isSelected = selectedPanel?.id === panel.id;
    return (
      <div
        key={panel.id}
        onClick={() => handleSelect(panel)}
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
            {panel.make}
          </span>
          <span
            className={cn(
              isSelected ? 'text-black' : 'text-white',
              forMobile ? 'text-[15px]' : 'text-sm'
            )}
          >
            {panel.model}
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
            {panel.wattage}W
          </span>
          <span
            className={cn(
              'font-medium px-1.5 py-0.5 rounded',
              isSelected ? 'bg-black/10 text-black' : 'bg-white/[0.06] text-white',
              forMobile ? 'text-[11px]' : 'text-[10px]'
            )}
          >
            {panel.efficiency}%
          </span>
          <span
            className={cn(
              'font-medium px-1.5 py-0.5 rounded',
              isSelected ? 'bg-black/10 text-black' : 'bg-white/[0.06] text-white',
              forMobile ? 'text-[11px]' : 'text-[10px]'
            )}
          >
            {panel.cellType}
          </span>
          {panel.mcsCertified && (
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
          {panel.yearIntroduced && panel.yearIntroduced >= 2024 && (
            <span
              className={cn(
                'font-bold px-1.5 py-0.5 rounded',
                isSelected ? 'bg-black/10 text-black' : 'bg-white/[0.06] text-elec-yellow',
                forMobile ? 'text-[11px]' : 'text-[10px]'
              )}
            >
              New
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
              {selectedPanel?.wattage}W · {selectedPanel?.efficiency}%
            </span>
          </div>
        ) : (
          <span className="text-sm text-white/80">{placeholder}</span>
        )}
      </div>
      {selectedPanel && (
        // Not a <button> — nested buttons are invalid DOM.
        <span
          role="button"
          tabIndex={0}
          aria-label="Clear selected panel"
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
          title="Select Panel"
          contentClassName="p-0"
        >
          <div className="flex flex-col max-h-[70vh]">
            {/* Search */}
            <div className="px-4 pt-1 pb-3 sticky top-0 bg-background z-10">
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="e.g. Longi, JA Solar, 440"
                className={searchInputCn}
              />
            </div>

            {/* Panel list */}
            <div className="flex-1 overflow-y-auto overscroll-contain momentum-scroll-y px-3 py-2 pb-6">
              {filteredPanels ? (
                filteredPanels.length > 0 ? (
                  <div className="space-y-2">
                    {filteredPanels.map((panel) => renderPanelItem(panel, true))}
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <p className="text-sm font-semibold text-white">No panels found</p>
                    <p className="text-[12px] text-white/80 mt-1">Try a different make or model</p>
                  </div>
                )
              ) : (
                Object.entries(panelsGrouped).map(([manufacturer, panels]) => (
                  <div key={manufacturer} className="mb-3">
                    <p className="py-2 text-[12px] font-semibold text-white/80 sticky top-0 bg-background">
                      {manufacturer}
                    </p>
                    <div className="space-y-2">
                      {panels.map((panel) => renderPanelItem(panel, true))}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-white/[0.06] px-4 py-2.5">
              <p className="text-[11px] text-white/80 text-center">
                {getPanelCount()} MCS-certified panels
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
                placeholder="e.g. Longi, JA Solar, 440"
                className={searchInputCn}
              />
            </div>

            <CommandList className="max-h-[320px]">
              {filteredPanels ? (
                filteredPanels.length > 0 ? (
                  <CommandGroup className="py-2">
                    {filteredPanels.map((panel) => (
                      <CommandItem
                        key={panel.id}
                        value={panel.id}
                        onSelect={() => handleSelect(panel)}
                        className="mx-1 rounded-lg cursor-pointer py-0 px-0 hover:bg-transparent"
                      >
                        {renderPanelItem(panel)}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ) : (
                  <CommandEmpty className="py-6 text-center">
                    <p className="text-white text-sm">No panels found</p>
                  </CommandEmpty>
                )
              ) : (
                Object.entries(panelsGrouped).map(([manufacturer, panels]) => (
                  <CommandGroup key={manufacturer} heading={manufacturer} className="py-2">
                    {panels.map((panel) => (
                      <CommandItem
                        key={panel.id}
                        value={panel.id}
                        onSelect={() => handleSelect(panel)}
                        className="mx-1 rounded-lg cursor-pointer py-0 px-0 hover:bg-transparent"
                      >
                        {renderPanelItem(panel)}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ))
              )}
            </CommandList>

            <div className="border-t border-white/[0.06] px-3 py-2">
              <p className="text-[11px] text-white/80 text-center">
                {getPanelCount()} MCS-certified panels
              </p>
            </div>
          </Command>
        </PopoverContent>
      </Popover>
      {autoFillBadge}
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
    <div className={cn('rounded-xl bg-white/[0.05] px-3.5 py-3 text-sm', className)}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-medium text-white">
            {panel.make} {panel.model}
          </p>
          <p className="text-[12px] text-white/80 mt-0.5">
            {panel.cellType} · {panel.cells} cells
          </p>
        </div>
        <span className="px-2 py-1 text-xs font-semibold bg-white/[0.06] text-elec-yellow rounded">
          {panel.wattage}W
        </span>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-2 text-[12px]">
        <div>
          <span className="text-white/80">Efficiency:</span>{' '}
          <span className="text-white">{panel.efficiency}%</span>
        </div>
        <div>
          <span className="text-white/80">Voc:</span>{' '}
          <span className="text-white">{panel.voc}V</span>
        </div>
        <div>
          <span className="text-white/80">Isc:</span>{' '}
          <span className="text-white">{panel.isc}A</span>
        </div>
        <div>
          <span className="text-white/80">Vmp:</span>{' '}
          <span className="text-white">{panel.vmp}V</span>
        </div>
      </div>

      <div className="mt-2 flex items-center gap-3">
        {panel.mcsCertified && (
          <span className="text-emerald-400 text-[12px] font-semibold">MCS Certified</span>
        )}
        <span className="text-[12px] text-white/80">
          {panel.warranty.product}yr product / {panel.warranty.performance}yr performance
        </span>
      </div>
    </div>
  );
}

export default PVPanelAutocomplete;
