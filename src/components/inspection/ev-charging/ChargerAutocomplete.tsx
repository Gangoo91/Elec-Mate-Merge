/**
 * ChargerAutocomplete.tsx
 *
 * Searchable combobox for selecting EV charger make/model from the database.
 * Auto-fills charger specifications on selection.
 */

import React, { useState, useMemo, useCallback } from 'react';
import { Check, ChevronsUpDown, Zap, Search, X, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
  EV_CHARGERS,
  EVCharger,
  getChargerLabel,
  getPowerOptionsLabel,
  searchChargers
} from '@/data/evChargerDatabase';

interface ChargerAutocompleteProps {
  value?: { make: string; model: string };
  onChange: (charger: EVCharger | null) => void;
  className?: string;
  disabled?: boolean;
}

export const ChargerAutocomplete: React.FC<ChargerAutocompleteProps> = ({
  value,
  onChange,
  className,
  disabled = false
}) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter chargers based on search query
  const filteredChargers = useMemo(() => {
    if (!searchQuery.trim()) {
      return EV_CHARGERS.slice(0, 15); // Show first 15 when empty
    }
    return searchChargers(searchQuery);
  }, [searchQuery]);

  // Find currently selected charger
  const selectedCharger = useMemo(() => {
    if (!value?.make || !value?.model) return null;
    return EV_CHARGERS.find(
      c => c.make.toLowerCase() === value.make.toLowerCase() &&
           c.model.toLowerCase() === value.model.toLowerCase()
    );
  }, [value]);

  // Handle charger selection
  const handleSelect = useCallback((charger: EVCharger) => {
    onChange(charger);
    setOpen(false);
    setSearchQuery('');
  }, [onChange]);

  // Handle clear selection
  const handleClear = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
    setSearchQuery('');
  }, [onChange]);

  // Get display label
  const displayLabel = selectedCharger
    ? getChargerLabel(selectedCharger)
    : value?.make && value?.model
    ? `${value.make} ${value.model}`
    : null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            "w-full justify-between h-11 touch-manipulation",
            "bg-elec-gray border-white/30 text-foreground",
            "hover:bg-elec-gray/80 hover:border-elec-yellow",
            "focus:border-elec-yellow focus:ring-elec-yellow",
            "data-[state=open]:border-elec-yellow data-[state=open]:ring-2",
            !displayLabel && "text-muted-foreground",
            className
          )}
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {selectedCharger ? (
              <>
                <Zap className="h-4 w-4 text-elec-yellow shrink-0" />
                <span className="truncate">{displayLabel}</span>
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-elec-yellow/20 text-elec-yellow shrink-0">
                  {getPowerOptionsLabel(selectedCharger)}
                </Badge>
              </>
            ) : (
              <>
                <Search className="h-4 w-4 shrink-0" />
                <span>Search chargers...</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-1 shrink-0">
            {selectedCharger && (
              <div
                role="button"
                onClick={handleClear}
                className="p-1 hover:bg-white/10 rounded"
              >
                <X className="h-3 w-3" />
              </div>
            )}
            <ChevronsUpDown className="h-4 w-4 opacity-50" />
          </div>
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-[calc(100vw-2rem)] sm:w-[400px] p-0 bg-background border-border shadow-xl z-[100]"
        align="start"
        sideOffset={4}
      >
        <Command className="bg-background" shouldFilter={false}>
          <div className="flex items-center gap-2 px-3 py-2 border-b border-border/50">
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Type to search UK chargers..."
              className="h-9 border-0 bg-transparent focus-visible:ring-0 px-0 text-base"
              autoFocus
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery('')}
                className="h-7 w-7 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>

          <CommandList className="max-h-[300px]">
            {filteredChargers.length === 0 ? (
              <CommandEmpty className="py-6 text-center text-muted-foreground">
                <Zap className="h-8 w-8 mx-auto mb-2 opacity-30" />
                <p>No chargers found</p>
                <p className="text-xs mt-1">Try searching by make or model</p>
              </CommandEmpty>
            ) : (
              <CommandGroup className="py-2">
                <div className="px-2 pb-2 flex items-center gap-2 text-[10px] text-muted-foreground">
                  <Sparkles className="h-3 w-3 text-elec-yellow" />
                  <span>Auto-fills specs when selected</span>
                </div>
                {filteredChargers.map((charger) => {
                  const isSelected = selectedCharger?.id === charger.id;
                  return (
                    <CommandItem
                      key={charger.id}
                      value={charger.id}
                      onSelect={() => handleSelect(charger)}
                      className={cn(
                        "mx-1 rounded-lg cursor-pointer py-2.5",
                        "hover:bg-elec-yellow/10",
                        isSelected && "bg-elec-yellow/20"
                      )}
                    >
                      <div className="flex items-start gap-3 w-full">
                        <div className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5",
                          isSelected ? "bg-elec-yellow/30" : "bg-card"
                        )}>
                          {isSelected ? (
                            <Check className="h-4 w-4 text-elec-yellow" />
                          ) : (
                            <Zap className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-medium text-foreground">
                              {charger.make}
                            </span>
                            <span className="text-foreground/80">
                              {charger.model}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 mt-1 flex-wrap">
                            <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-elec-yellow/30 text-elec-yellow">
                              {getPowerOptionsLabel(charger)}
                            </Badge>
                            <span className="text-[10px] text-muted-foreground">
                              {charger.phases.includes(3) ? '1/3 Phase' : 'Single Phase'}
                            </span>
                            <span className="text-[10px] text-muted-foreground">
                              {charger.socketType}
                            </span>
                            {charger.rcdIntegral && (
                              <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-green-500/30 text-green-400">
                                RCD Built-in
                              </Badge>
                            )}
                          </div>

                          {charger.notes && (
                            <p className="text-[10px] text-muted-foreground mt-1 line-clamp-1">
                              {charger.notes}
                            </p>
                          )}
                        </div>
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            )}
          </CommandList>

          <div className="border-t border-border/50 px-3 py-2 bg-card/30">
            <p className="text-[10px] text-muted-foreground text-center">
              {EV_CHARGERS.length} UK chargers in database (2025/2026)
            </p>
          </div>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ChargerAutocomplete;
