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
import { Check, ChevronsUpDown, Sparkles, Search, X, Zap } from 'lucide-react';
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
    return 'Select PAT tester...';
  }, [currentMake, currentModel]);

  const hasValue = !!currentMake;

  // Trigger button
  const triggerButton = (
    <Button
      variant="outline"
      role="combobox"
      aria-expanded={open}
      disabled={disabled}
      onClick={isMobile ? () => setOpen(true) : undefined}
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
      <span className={cn('truncate', !hasValue && 'text-muted-foreground')}>{displayValue}</span>
      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
    </Button>
  );

  // Render tester item
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
          'rounded-lg cursor-pointer transition-colors flex items-center',
          forMobile ? 'px-4 py-4 min-h-[56px]' : 'px-2 py-2',
          'hover:bg-elec-yellow/10 active:bg-elec-yellow/20',
          isSelected && 'bg-elec-yellow/20'
        )}
      >
        <Check
          className={cn(
            'shrink-0',
            forMobile ? 'mr-3 h-5 w-5' : 'mr-2 h-4 w-4',
            isSelected ? 'opacity-100 text-elec-yellow' : 'opacity-0'
          )}
        />
        <div className="flex flex-col flex-1 min-w-0">
          <span className={cn('font-medium truncate text-white', forMobile && 'text-base')}>
            {showManufacturer ? `${tester.make} ${tester.model}` : tester.model}
          </span>
          {tester.features && (
            <span className={cn('text-white truncate', forMobile ? 'text-sm' : 'text-xs')}>
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
          title="Select PAT Tester"
          contentClassName="p-0"
        >
          <div className="flex flex-col max-h-[70vh]">
            {/* Search */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-background sticky top-0">
              <Search className="h-5 w-5 text-white shrink-0" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search testers..."
                className="h-11 border-0 bg-transparent focus-visible:ring-0 px-0 text-base"
                autoFocus
              />
              {search && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearch('')}
                  className="h-9 w-9 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto momentum-scroll-y">
              {filteredTesters && filteredTesters.length > 0 ? (
                <div className="px-2 py-2">
                  <p className="px-4 py-2 text-sm text-white font-medium">Search Results</p>
                  <div className="space-y-1">
                    {filteredTesters.map((tester) => renderTesterItem(tester, true, true))}
                  </div>
                </div>
              ) : search.trim() ? (
                <div className="py-12 text-center text-white">
                  <Zap className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p className="text-base">No testers found</p>
                  <p className="text-sm mt-1">Try a different search term</p>
                </div>
              ) : (
                <div className="px-2 py-2">
                  {Object.entries(testersGrouped).map(([manufacturer, testers]) => (
                    <div key={manufacturer} className="mb-4">
                      <p className="px-4 py-2 text-sm text-white font-medium sticky top-0 bg-background">
                        {manufacturer}
                      </p>
                      <div className="space-y-1">
                        {testers.map((tester) => renderTesterItem(tester, false, true))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-border/50 px-4 py-3 bg-card/30">
              <p className="text-xs text-white text-center flex items-center justify-center gap-1">
                <Sparkles className="h-3 w-3 text-elec-yellow" />
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
          className="w-[var(--radix-popover-trigger-width)] p-0 bg-elec-gray border border-white/20 shadow-lg z-[100]"
          align="start"
          sideOffset={4}
        >
          <Command className="bg-elec-gray" shouldFilter={false}>
            <CommandInput
              placeholder="Search testers..."
              value={search}
              onValueChange={setSearch}
              className="border-none bg-elec-gray text-foreground placeholder:text-gray-400"
            />
            <CommandList className="bg-elec-gray max-h-[300px]">
              <CommandEmpty className="p-4 text-sm text-white">No testers found.</CommandEmpty>

              {filteredTesters && filteredTesters.length > 0 ? (
                <CommandGroup heading="Search Results" className="bg-elec-gray">
                  {filteredTesters.map((tester) => (
                    <CommandItem
                      key={tester.id}
                      value={tester.id}
                      onSelect={() => handleSelect(tester)}
                      className="bg-elec-gray hover:bg-gray-700 cursor-pointer text-foreground py-2"
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4 shrink-0',
                          selectedTester?.id === tester.id
                            ? 'opacity-100 text-elec-yellow'
                            : 'opacity-0'
                        )}
                      />
                      <div className="flex flex-col flex-1 min-w-0">
                        <span className="font-medium truncate text-white">
                          {tester.make} {tester.model}
                        </span>
                        {tester.features && (
                          <span className="text-xs text-white truncate">{tester.features}</span>
                        )}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              ) : (
                Object.entries(testersGrouped).map(([manufacturer, testers]) => (
                  <CommandGroup key={manufacturer} heading={manufacturer} className="bg-elec-gray">
                    {testers.map((tester) => (
                      <CommandItem
                        key={tester.id}
                        value={tester.id}
                        onSelect={() => handleSelect(tester)}
                        className="bg-elec-gray hover:bg-gray-700 cursor-pointer text-foreground py-2"
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4 shrink-0',
                            selectedTester?.id === tester.id
                              ? 'opacity-100 text-elec-yellow'
                              : 'opacity-0'
                          )}
                        />
                        <div className="flex flex-col flex-1 min-w-0">
                          <span className="font-medium truncate text-white">{tester.model}</span>
                          {tester.features && (
                            <span className="text-xs text-white truncate">{tester.features}</span>
                          )}
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ))
              )}
            </CommandList>
          </Command>

          {/* Footer */}
          <div className="border-t border-border px-3 py-2 bg-muted/30">
            <p className="text-xs text-white flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-elec-yellow" />
              Selecting fills make &amp; model fields
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default PATTesterAutocomplete;
