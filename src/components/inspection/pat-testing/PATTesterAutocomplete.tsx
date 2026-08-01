/**
 * PAT Tester Autocomplete Component
 *
 * Searchable combobox for selecting PAT testing equipment with:
 * - Testers grouped by manufacturer
 * - Search across make/model
 * - Auto-fill make + model fields on selection
 * - Mobile: SwipeableBottomSheet  /  Desktop: Popover + Command
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

const searchInputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

// ----- PAT Tester Database (UK market) -----
export interface PATTesterModel {
  id: string;
  make: string;
  model: string;
  features?: string;
}

const PAT_TESTER_DATABASE: PATTesterModel[] = [
  // Megger
  { id: 'megger-pat120', make: 'Megger', model: 'PAT120', features: 'Basic' },
  { id: 'megger-pat150', make: 'Megger', model: 'PAT150', features: 'Basic + Earth' },
  { id: 'megger-pat320', make: 'Megger', model: 'PAT320', features: 'Downloadable' },
  { id: 'megger-pat410', make: 'Megger', model: 'PAT410', features: 'Bluetooth' },
  { id: 'megger-pat420', make: 'Megger', model: 'PAT420', features: 'Bluetooth + RCD' },
  { id: 'megger-pat450', make: 'Megger', model: 'PAT450', features: 'Top of range' },
  // Seaward
  { id: 'seaward-pt50', make: 'Seaward', model: 'PrimeTest 50', features: 'Entry level' },
  { id: 'seaward-pt100', make: 'Seaward', model: 'PrimeTest 100', features: 'Pass/Fail' },
  {
    id: 'seaward-pt250',
    make: 'Seaward',
    model: 'PrimeTest 250+',
    features: 'Bluetooth + Memory',
  },
  { id: 'seaward-a400', make: 'Seaward', model: 'Apollo 400+', features: 'Barcode + Bluetooth' },
  { id: 'seaward-a500', make: 'Seaward', model: 'Apollo 500', features: 'Touchscreen' },
  { id: 'seaward-a600', make: 'Seaward', model: 'Apollo 600', features: 'Advanced' },
  { id: 'seaward-a600p', make: 'Seaward', model: 'Apollo 600+', features: 'Top of range' },
  { id: 'seaward-hal102', make: 'Seaward', model: 'HAL102', features: 'Hi-pot' },
  { id: 'seaward-europa', make: 'Seaward', model: 'Europa Plus', features: 'Medical' },
  { id: 'seaward-supernova', make: 'Seaward', model: 'Supernova Elite', features: 'Multi-test' },
  // Kewtech
  { id: 'kewtech-ezypat', make: 'Kewtech', model: 'EZYPAT', features: 'Entry level' },
  { id: 'kewtech-ezypatp', make: 'Kewtech', model: 'EZYPAT Plus', features: 'With memory' },
  { id: 'kewtech-smartpat', make: 'Kewtech', model: 'SMARTPAT', features: 'Bluetooth' },
  { id: 'kewtech-kewpat', make: 'Kewtech', model: 'KEW PAT', features: 'Basic' },
  // Fluke
  { id: 'fluke-6200', make: 'Fluke', model: '6200-2', features: 'Standard' },
  { id: 'fluke-6500', make: 'Fluke', model: '6500-2', features: 'Advanced + Memory' },
  // Martindale
  { id: 'martindale-hp500', make: 'Martindale', model: 'HPAT500', features: 'Standard' },
  { id: 'martindale-hp500-2', make: 'Martindale', model: 'HPAT500/2', features: 'Updated' },
  { id: 'martindale-hp600', make: 'Martindale', model: 'HPAT600', features: 'Advanced' },
  { id: 'martindale-hp600-2', make: 'Martindale', model: 'HPAT600/2', features: 'Updated' },
  { id: 'martindale-pat500', make: 'Martindale', model: 'PAT500', features: 'Entry level' },
  // Metrel
  {
    id: 'metrel-3309',
    make: 'Metrel',
    model: 'MI 3309 BT',
    features: 'Bluetooth + Barcode',
  },
  {
    id: 'metrel-3360',
    make: 'Metrel',
    model: 'MI 3360 OmegaPAT XA',
    features: 'Top of range',
  },
  {
    id: 'metrel-3325',
    make: 'Metrel',
    model: 'MI 3325 MultiServicerXD',
    features: 'Multi-function',
  },
  // Robin / Amprobe
  { id: 'robin-5500', make: 'Robin', model: 'SmartPAT 5500', features: 'Advanced' },
  { id: 'robin-3500', make: 'Robin', model: 'SmartPAT 3500', features: 'Standard' },
  // Benning
  { id: 'benning-750a', make: 'Benning', model: 'ST 750 A', features: 'Standard' },
  { id: 'benning-755', make: 'Benning', model: 'ST 755', features: 'Advanced' },
  // HT Instruments
  { id: 'ht-sirius87', make: 'HT Instruments', model: 'Sirius 87', features: 'Standard' },
  { id: 'ht-sirius89', make: 'HT Instruments', model: 'Sirius 89', features: 'Advanced' },
  // Rigel
  { id: 'rigel-st60', make: 'Rigel', model: 'SafeTest 60', features: 'Medical' },
  { id: 'rigel-288', make: 'Rigel', model: '288+', features: 'Standard' },
  // TIS
  { id: 'tis-inspector', make: 'TIS', model: 'PAT Inspector', features: 'Entry level' },
  // Socket & See
  { id: 'socketsee-sol', make: 'Socket & See', model: 'SOL PAT', features: 'Solar powered' },
];

// Group by manufacturer
const getTestersGrouped = (): Record<string, PATTesterModel[]> => {
  const grouped: Record<string, PATTesterModel[]> = {};
  PAT_TESTER_DATABASE.forEach((t) => {
    if (!grouped[t.make]) grouped[t.make] = [];
    grouped[t.make].push(t);
  });
  return grouped;
};

// Search testers
const searchTesters = (query: string): PATTesterModel[] => {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return PAT_TESTER_DATABASE.filter(
    (t) =>
      t.make.toLowerCase().includes(q) ||
      t.model.toLowerCase().includes(q) ||
      t.features?.toLowerCase().includes(q)
  );
};

// Find by make + model (for matching current form values)
const findTesterByMakeModel = (make: string, model: string): PATTesterModel | null => {
  return (
    PAT_TESTER_DATABASE.find(
      (t) =>
        t.make.toLowerCase() === make.toLowerCase() && t.model.toLowerCase() === model.toLowerCase()
    ) || null
  );
};

interface PATTesterAutocompleteProps {
  /** Current make value from form */
  currentMake?: string;
  /** Current model value from form */
  currentModel?: string;
  /** Callback when a tester is selected — provides make + model to fill fields */
  onTesterSelect: (tester: { make: string; model: string }) => void;
  className?: string;
  disabled?: boolean;
}

export function PATTesterAutocomplete({
  currentMake = '',
  currentModel = '',
  onTesterSelect,
  className,
  disabled = false,
}: PATTesterAutocompleteProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const isMobile = useIsMobile();

  const testersGrouped = React.useMemo(() => getTestersGrouped(), []);

  const filteredTesters = React.useMemo(() => {
    if (!search.trim()) return null;
    return searchTesters(search);
  }, [search]);

  // Match current form values to a tester in the database
  const selectedTester = React.useMemo(() => {
    if (!currentMake) return null;
    return findTesterByMakeModel(currentMake, currentModel);
  }, [currentMake, currentModel]);

  const handleSelect = React.useCallback(
    (tester: PATTesterModel) => {
      onTesterSelect({ make: tester.make, model: tester.model });
      setOpen(false);
      setSearch('');
    },
    [onTesterSelect]
  );

  const displayValue = React.useMemo(() => {
    if (currentMake && currentModel) return `${currentMake} ${currentModel}`;
    if (currentMake) return currentMake;
    return null;
  }, [currentMake, currentModel]);

  // Trigger button — neutral surface, no icons
  const triggerButton = (
    <button
      type="button"
      role="combobox"
      aria-expanded={open}
      disabled={disabled}
      onClick={isMobile ? () => setOpen(true) : undefined}
      className={cn(
        'flex h-11 w-full items-center justify-between rounded-xl px-3.5 text-left touch-manipulation active:scale-[0.98] transition-all',
        'bg-white/[0.06] border border-white/[0.12] hover:bg-white/[0.09]',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {displayValue ? (
        <span className="truncate text-sm font-medium text-white">{displayValue}</span>
      ) : (
        <span className="truncate text-sm text-white/80">Select PAT tester...</span>
      )}
    </button>
  );

  // Render tester item — neutral surface, solid volt when selected
  const renderTesterItem = (
    tester: PATTesterModel,
    showManufacturer = false,
    forMobile = false
  ) => {
    const isSelected = selectedTester?.id === tester.id;
    return (
      <div
        key={tester.id}
        onClick={() => handleSelect(tester)}
        className={cn(
          'rounded-xl cursor-pointer transition-all touch-manipulation active:scale-[0.98]',
          forMobile ? 'px-3.5 py-3.5 min-h-[56px]' : 'px-2.5 py-2',
          isSelected
            ? 'bg-elec-yellow border border-elec-yellow'
            : 'bg-white/[0.06] border border-white/[0.12] hover:bg-white/[0.09]'
        )}
      >
        <div className="flex min-w-0 flex-col">
          <span
            className={cn(
              'truncate font-medium',
              isSelected ? 'text-black' : 'text-white',
              forMobile && 'text-base'
            )}
          >
            {showManufacturer ? `${tester.make} ${tester.model}` : tester.model}
          </span>
          {tester.features && (
            <span
              className={cn(
                'truncate',
                isSelected ? 'text-black/70' : 'text-white/80',
                forMobile ? 'text-sm' : 'text-xs'
              )}
            >
              {tester.features}
            </span>
          )}
        </div>
      </div>
    );
  };

  // Mobile: SwipeableBottomSheet
  if (isMobile) {
    return (
      <div className="relative">
        {triggerButton}

        <SwipeableBottomSheet
          open={open}
          onOpenChange={setOpen}
          title="Select PAT tester"
          contentClassName="p-0"
        >
          <div className="flex flex-col max-h-[70vh]">
            {/* Search */}
            <div className="flex items-center gap-2 px-4 pt-1 pb-3 bg-background sticky top-0">
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search testers..."
                className={searchInputCn}
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  aria-label="Clear search"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-base text-white/80 touch-manipulation active:scale-[0.98]"
                >
                  &times;
                </button>
              )}
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto momentum-scroll-y px-3 py-2">
              {filteredTesters && filteredTesters.length > 0 ? (
                <div>
                  <p className="px-1 py-2 text-sm font-medium text-white/80">Search results</p>
                  <div className="space-y-2">
                    {filteredTesters.map((tester) => renderTesterItem(tester, true, true))}
                  </div>
                </div>
              ) : search.trim() ? (
                <div className="py-12 text-center">
                  <p className="text-base font-semibold text-white">No testers found</p>
                  <p className="mt-1 text-sm text-white/80">Try a different search term</p>
                </div>
              ) : (
                <div>
                  {Object.entries(testersGrouped).map(([manufacturer, testers]) => (
                    <div key={manufacturer} className="mb-4">
                      <p className="px-1 py-2 text-sm font-medium text-white/80 sticky top-0 bg-background">
                        {manufacturer}
                      </p>
                      <div className="space-y-2">
                        {testers.map((tester) => renderTesterItem(tester, false, true))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-white/[0.06] px-4 py-3 bg-background">
              <p className="text-xs text-white/80 text-center">
                Selecting fills make &amp; model fields
              </p>
            </div>
          </div>
        </SwipeableBottomSheet>
      </div>
    );
  }

  // Desktop: Popover + Command
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
                placeholder="Search testers..."
                className={searchInputCn}
              />
            </div>
            <CommandList className="bg-background max-h-[300px]">
              <CommandEmpty className="p-4 text-sm text-white">No testers found.</CommandEmpty>

              {filteredTesters && filteredTesters.length > 0 ? (
                <CommandGroup
                  heading="Search results"
                  className="bg-background [&_[cmdk-group-heading]]:text-white/80"
                >
                  {filteredTesters.map((tester) => (
                    <CommandItem
                      key={tester.id}
                      value={tester.id}
                      onSelect={() => handleSelect(tester)}
                      className="mb-1 cursor-pointer rounded-xl p-0 hover:bg-transparent"
                    >
                      <div className="w-full">{renderTesterItem(tester, true, false)}</div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              ) : (
                Object.entries(testersGrouped).map(([manufacturer, testers]) => (
                  <CommandGroup
                    key={manufacturer}
                    heading={manufacturer}
                    className="bg-background [&_[cmdk-group-heading]]:text-white/80"
                  >
                    {testers.map((tester) => (
                      <CommandItem
                        key={tester.id}
                        value={tester.id}
                        onSelect={() => handleSelect(tester)}
                        className="mb-1 cursor-pointer rounded-xl p-0 hover:bg-transparent"
                      >
                        <div className="w-full">{renderTesterItem(tester, false, false)}</div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ))
              )}
            </CommandList>
          </Command>

          {/* Footer */}
          <div className="border-t border-white/[0.06] px-3 py-2">
            <p className="text-[11px] text-white/80 text-center">
              Selecting fills make & model fields
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default PATTesterAutocomplete;
