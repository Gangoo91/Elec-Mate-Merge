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
import { Check, ChevronsUpDown, Zap, Sparkles, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  type FireAlarmPanel,
} from '@/data/fireAlarmEquipmentDatabase';

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

  // Trigger button shared between mobile and desktop
  const triggerButton = (
    <Button
      variant="outline"
      role="combobox"
      aria-expanded={open}
      disabled={disabled}
      onClick={isMobile ? () => setOpen(true) : undefined}
      className={cn(
        'w-full justify-between h-12 touch-manipulation text-base',
        'bg-white/[0.06] border-white/[0.08] text-white',
        'hover:bg-white/[0.08] hover:border-white/[0.12]',
        'focus:border-yellow-500 focus:ring-yellow-500',
        'data-[state=open]:border-elec-yellow data-[state=open]:ring-2',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <span className={cn('truncate', !selectedPanel && 'text-white')}>
        {displayValue}
      </span>
      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-40" />
    </Button>
  );

  // Render panel item (shared renderer for mobile and desktop)
  const renderPanelItem = (panel: FireAlarmPanel, showManufacturer = false, forMobile = false) => {
    const isSelected = value === panel.id;
    return (
      <div
        key={panel.id}
        onClick={() => handleSelect(panel.id)}
        className={cn(
          'rounded-xl cursor-pointer transition-all flex items-center gap-3 border',
          forMobile ? 'px-4 py-3.5 min-h-[60px]' : 'px-3 py-2.5',
          'active:scale-[0.98] touch-manipulation',
          isSelected
            ? 'bg-elec-yellow/10 border-elec-yellow/30'
            : 'bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.06]'
        )}
      >
        <div className={cn(
          'w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all',
          isSelected ? 'bg-elec-yellow border-elec-yellow' : 'border-white/30'
        )}>
          {isSelected && <Check className="h-3 w-3 text-black" />}
        </div>
        <div className="flex flex-col flex-1 min-w-0 gap-1">
          <span className={cn('font-semibold truncate text-white', forMobile ? 'text-base' : 'text-sm')}>
            {showManufacturer ? `${panel.manufacturer} ${panel.model}` : panel.model}
          </span>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-medium uppercase tracking-wide px-1.5 py-0.5 rounded bg-white/[0.08] text-white">
              {panel.type || 'Conventional'}
            </span>
            {panel.protocol && (
              <span className="text-[10px] font-medium uppercase tracking-wide px-1.5 py-0.5 rounded bg-red-500/10 text-red-400">
                {panel.protocol}
              </span>
            )}
            {panel.loops && (
              <span className="text-[10px] text-white">{panel.loops} loops</span>
            )}
            {panel.zones && (
              <span className="text-[10px] text-white">{panel.zones} zones</span>
            )}
          </div>
        </div>
        {panel.yearIntroduced && panel.yearIntroduced >= 2024 && (
          <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide bg-green-500/20 text-green-400 rounded-full flex-shrink-0">
            New
          </span>
        )}
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
          title="Select Fire Alarm Panel"
          contentClassName="p-0"
        >
          <div className="flex flex-col max-h-[70vh]">
            {/* Search input */}
            <div className="px-4 py-3 border-b border-white/[0.06] bg-background sticky top-0 z-10">
              <div className="flex items-center gap-2.5 h-12 px-3 rounded-xl bg-white/[0.06] border border-white/[0.08]">
                <Search className="h-4 w-4 text-white flex-shrink-0" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by make, model, or protocol..."
                  className="flex-1 bg-transparent text-base text-white placeholder:text-white outline-none"
                />
                {search && (
                  <button onClick={() => setSearch('')} className="w-6 h-6 rounded-full bg-white/[0.1] flex items-center justify-center touch-manipulation">
                    <X className="h-3 w-3 text-white" />
                  </button>
                )}
              </div>
              <p className="text-[10px] text-white mt-2 text-center uppercase tracking-wider">
                <Sparkles className="h-3 w-3 inline mr-1 text-elec-yellow" />
                Select a panel to auto-fill make, model, network type & zones
              </p>
            </div>

            {/* Panel list */}
            <div className="flex-1 overflow-y-auto momentum-scroll-y px-3 py-3">
              {filteredPanels && filteredPanels.length > 0 ? (
                <div className="space-y-2">
                  <p className="text-[10px] font-medium text-white uppercase tracking-wider px-1 mb-2">
                    Search Results ({filteredPanels.length})
                  </p>
                  {filteredPanels.map((panel) => renderPanelItem(panel, true, true))}
                </div>
              ) : search.trim() ? (
                <div className="py-12 text-center">
                  <Zap className="h-10 w-10 mx-auto mb-3 text-white/20" />
                  <p className="text-sm font-medium text-white">No panels found</p>
                  <p className="text-xs text-white mt-1">Try a different search term</p>
                </div>
              ) : (
                <div className="space-y-5">
                  {Object.entries(panelsGrouped).map(([manufacturer, panels]) => (
                    <div key={manufacturer}>
                      <div className="flex items-center gap-2 mb-2 px-1">
                        <div className="h-[2px] w-4 rounded-full bg-red-500/40" />
                        <p className="text-[10px] font-bold text-white uppercase tracking-wider">{manufacturer}</p>
                        <span className="text-[10px] text-white bg-white/[0.08] px-1.5 py-0.5 rounded">{panels.length}</span>
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
              <CommandEmpty className="p-4 text-sm text-white">No panels found.</CommandEmpty>

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
                        <span className="text-xs text-white truncate">
                          {panel.type} • {panel.protocol || 'Conventional'}
                          {panel.loops && ` • ${panel.loops} loops`}
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
                          <span className="text-xs text-white truncate">
                            {panel.type}
                            {panel.zones && ` • ${panel.zones} zones`}
                            {panel.loops && ` • ${panel.loops} loops`}
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
      <p className="font-semibold text-foreground text-base">
        {panel.manufacturer} {panel.model}
      </p>
      <p className="text-sm text-white">
        {specs.join(' · ')}
      </p>
      {panel.features && panel.features.length > 0 && (
        <p className="text-xs text-white">
          {panel.features.join(' · ')}
        </p>
      )}
    </div>
  );
}

export default FireAlarmPanelAutocomplete;
