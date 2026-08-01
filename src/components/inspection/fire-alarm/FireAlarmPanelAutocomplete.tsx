/**
 * Fire Alarm Panel Autocomplete Component
 *
 * Searchable combobox for selecting fire alarm panels with:
 * - Panels grouped by manufacturer
 * - Search across make/model/protocol
 * - Auto-fill badge showing populated fields
 * - Callback for applying panel defaults
 *
 * Bottom sheet on mobile, popover on desktop — no icons, matching the
 * EV charging autocomplete pattern.
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
  type FireAlarmPanel,
} from '@/data/fireAlarmEquipmentDatabase';

const searchInputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

interface FireAlarmPanelAutocompleteProps {
  value?: string;
  onValueChange?: (panelId: string) => void;
  onPanelSelect?: (
    panel: FireAlarmPanel | null,
    defaults: {
      networkType: string;
      zonesCount: number;
      loopCapacity: number;
      protocol: string;
    } | null
  ) => void;
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
  const isMobile = useIsMobile();

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
  const handleSelect = React.useCallback(
    (panelId: string) => {
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
    },
    [value, onValueChange, onPanelSelect]
  );

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

  // Trigger button shared between mobile and desktop — clean, no icons
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
      <span
        className={cn(
          'truncate text-sm',
          selectedPanel ? 'font-medium text-white' : 'text-white/80'
        )}
      >
        {displayValue}
      </span>
    </button>
  );

  // Render panel item (shared renderer for mobile and desktop) — neutral
  // surface, solid volt when selected
  const renderPanelItem = (panel: FireAlarmPanel, showManufacturer = false, forMobile = false) => {
    const isSelected = value === panel.id;
    return (
      <div
        key={panel.id}
        onClick={() => handleSelect(panel.id)}
        className={cn(
          'rounded-xl cursor-pointer transition-all touch-manipulation active:scale-[0.98]',
          forMobile ? 'p-3.5' : 'p-2.5 mx-1',
          isSelected
            ? 'bg-elec-yellow border border-elec-yellow'
            : 'bg-white/[0.06] border border-white/[0.12] hover:bg-white/[0.09]'
        )}
      >
        {/* Make + model */}
        <div className="flex items-center gap-2 mb-1.5">
          <span
            className={cn(
              'font-semibold truncate',
              isSelected ? 'text-black' : 'text-white',
              forMobile ? 'text-[15px]' : 'text-sm'
            )}
          >
            {showManufacturer ? `${panel.manufacturer} ${panel.model}` : panel.model}
          </span>
          {panel.yearIntroduced && panel.yearIntroduced >= 2024 && (
            <span
              className={cn(
                'font-bold px-1.5 py-0.5 rounded flex-shrink-0',
                isSelected ? 'bg-black/10 text-black' : 'bg-white/[0.06] text-green-400',
                forMobile ? 'text-[11px]' : 'text-[10px]'
              )}
            >
              New
            </span>
          )}
        </div>

        {/* Spec badges — no icons, coloured text on neutral surfaces */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span
            className={cn(
              'font-bold px-1.5 py-0.5 rounded',
              isSelected ? 'bg-black/10 text-black' : 'bg-white/[0.06] text-elec-yellow',
              forMobile ? 'text-[11px]' : 'text-[10px]'
            )}
          >
            {panel.type || 'Conventional'}
          </span>
          {panel.protocol && (
            <span
              className={cn(
                'font-medium px-1.5 py-0.5 rounded',
                isSelected ? 'bg-black/10 text-black' : 'bg-white/[0.06] text-red-400',
                forMobile ? 'text-[11px]' : 'text-[10px]'
              )}
            >
              {panel.protocol}
            </span>
          )}
          {panel.loops && (
            <span
              className={cn(
                forMobile ? 'text-[11px]' : 'text-[10px]',
                isSelected ? 'text-black/70' : 'text-white/85'
              )}
            >
              {panel.loops} loops
            </span>
          )}
          {panel.zones && (
            <span
              className={cn(
                forMobile ? 'text-[11px]' : 'text-[10px]',
                isSelected ? 'text-black/70' : 'text-white/85'
              )}
            >
              {panel.zones} zones
            </span>
          )}
        </div>
      </div>
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
          title="Select fire alarm panel"
          contentClassName="p-0"
        >
          <div className="flex flex-col max-h-[70vh]">
            {/* Search input */}
            <div className="px-4 pt-1 pb-3 sticky top-0 z-10 bg-background">
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by make, model or protocol"
                className={searchInputCn}
              />
              <p className="text-[11px] text-white/80 mt-2 text-center">
                Select a panel to auto-fill make, model, network type and zones
              </p>
            </div>

            {/* Panel list */}
            <div className="flex-1 overflow-y-auto momentum-scroll-y px-3 py-2">
              {filteredPanels && filteredPanels.length > 0 ? (
                <div className="space-y-2">
                  <p className="text-[11px] font-semibold text-white/80 px-1 mb-2">
                    Search results ({filteredPanels.length})
                  </p>
                  {filteredPanels.map((panel) => renderPanelItem(panel, true, true))}
                </div>
              ) : search.trim() ? (
                <div className="py-12 text-center">
                  <p className="text-sm font-semibold text-white">No panels found</p>
                  <p className="text-xs text-white/85 mt-1">Try a different search term</p>
                </div>
              ) : (
                <div className="space-y-5">
                  {Object.entries(panelsGrouped).map(([manufacturer, panels]) => (
                    <div key={manufacturer}>
                      <div className="flex items-center gap-2 mb-2 px-1">
                        <p className="text-[11px] font-semibold text-white/80">{manufacturer}</p>
                        <span className="text-[10px] text-white/85 bg-white/[0.08] px-1.5 py-0.5 rounded">
                          {panels.length}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {panels.map((panel) => renderPanelItem(panel, false, true))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </SwipeableBottomSheet>

        {/* Auto-fill badge */}
        {showAutoFillBadge && hasAutoFill && (
          <div className="absolute -top-3 right-2 px-2 py-0.5 bg-background border border-elec-yellow/40 rounded-full text-xs font-semibold text-elec-yellow shadow-sm">
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
          className="w-[var(--radix-popover-trigger-width)] p-0 bg-background border-white/[0.08] shadow-xl z-[100]"
          align="start"
          sideOffset={4}
        >
          <Command className="bg-background" shouldFilter={false}>
            <div className="px-3 pt-1 pb-2.5">
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by make, model or protocol"
                className={searchInputCn}
              />
            </div>
            <CommandList className="max-h-[300px]">
              <CommandEmpty className="py-6 text-center">
                <p className="text-white text-sm">No panels found.</p>
              </CommandEmpty>

              {/* Show search results if searching */}
              {filteredPanels && filteredPanels.length > 0 ? (
                <CommandGroup heading="Search results" className="py-2">
                  {filteredPanels.map((panel) => (
                    <CommandItem
                      key={panel.id}
                      value={panel.id}
                      onSelect={handleSelect}
                      className="mx-1 rounded-lg cursor-pointer py-0 px-0 hover:bg-transparent"
                    >
                      {renderPanelItem(panel, true, false)}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ) : (
                /* Show grouped by manufacturer when not searching */
                Object.entries(panelsGrouped).map(([manufacturer, panels]) => (
                  <CommandGroup key={manufacturer} heading={manufacturer} className="py-2">
                    {panels.map((panel) => (
                      <CommandItem
                        key={panel.id}
                        value={panel.id}
                        onSelect={handleSelect}
                        className="mx-1 rounded-lg cursor-pointer py-0 px-0 hover:bg-transparent"
                      >
                        {renderPanelItem(panel, false, false)}
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
        <div className="absolute -top-3 right-2 px-2 py-0.5 bg-background border border-elec-yellow/40 rounded-full text-xs font-semibold text-elec-yellow shadow-sm">
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

  const specs = [
    panel.type,
    panel.protocol,
    panel.zones && `${panel.zones} zones`,
    panel.loops && `${panel.loops} loops`,
    panel.devices && `${panel.devices} devices`,
    panel.networkable && 'Networkable',
  ].filter(Boolean);

  return (
    <div className={cn('space-y-1.5', className)}>
      <p className="font-semibold text-white text-base">
        {panel.manufacturer} {panel.model}
      </p>
      <p className="text-sm text-white/80">{specs.join(' · ')}</p>
      {panel.features && panel.features.length > 0 && (
        <p className="text-xs text-white/80">{panel.features.join(' · ')}</p>
      )}
    </div>
  );
}

export default FireAlarmPanelAutocomplete;
