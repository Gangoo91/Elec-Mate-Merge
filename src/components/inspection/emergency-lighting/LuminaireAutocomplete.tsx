/**
 * LuminaireAutocomplete Component
 *
 * A searchable combobox for selecting emergency luminaires from the database.
 * Groups luminaires by manufacturer and shows type icons.
 * On selection, calls the provided callback to auto-fill luminaire specs.
 */

import React, { useState, useMemo, useCallback } from 'react';
import { Check, ChevronsUpDown, Lightbulb, Search, Sparkles } from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';
import {
  EmergencyLuminaire,
  getLuminairesGroupedByMake,
  searchLuminaires,
} from '@/data/emergencyLuminaireDatabase';

interface LuminaireAutocompleteProps {
  value?: { make: string; model: string } | null;
  onSelect: (luminaire: EmergencyLuminaire) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

// Luminaire type icons/badges
const getLuminaireTypeIcon = (type: string) => {
  switch (type) {
    case 'bulkhead':
      return '⬜';
    case 'twin-spot':
      return '🔦';
    case 'recessed':
      return '⭕';
    case 'downlight':
      return '💡';
    case 'exit-sign':
      return '🚪';
    case 'exit-box':
      return '📦';
    case 'strip':
      return '➖';
    case 'surface':
      return '⬛';
    default:
      return '💡';
  }
};

const getLuminaireTypeBadgeColor = (type: string) => {
  switch (type) {
    case 'bulkhead':
      return 'bg-blue-500/20 text-blue-400';
    case 'twin-spot':
      return 'bg-purple-500/20 text-purple-400';
    case 'recessed':
    case 'downlight':
      return 'bg-amber-500/20 text-amber-400';
    case 'exit-sign':
    case 'exit-box':
      return 'bg-green-500/20 text-green-400';
    case 'strip':
    case 'surface':
      return 'bg-cyan-500/20 text-cyan-400';
    default:
      return 'bg-gray-500/20 text-gray-400';
  }
};

const LuminaireAutocomplete: React.FC<LuminaireAutocompleteProps> = ({
  value,
  onSelect,
  placeholder = 'Search luminaire...',
  className,
  disabled = false,
}) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Get luminaires grouped by manufacturer
  const luminairesGrouped = useMemo(() => getLuminairesGroupedByMake(), []);

  // Filter luminaires based on search query
  const filteredLuminaires = useMemo(() => {
    if (!searchQuery.trim()) {
      return luminairesGrouped;
    }
    const results = searchLuminaires(searchQuery);
    // Re-group filtered results
    return results.reduce((acc, luminaire) => {
      if (!acc[luminaire.make]) {
        acc[luminaire.make] = [];
      }
      acc[luminaire.make].push(luminaire);
      return acc;
    }, {} as Record<string, EmergencyLuminaire[]>);
  }, [searchQuery, luminairesGrouped]);

  const handleSelect = useCallback((luminaire: EmergencyLuminaire) => {
    onSelect(luminaire);
    setOpen(false);
    setSearchQuery('');
  }, [onSelect]);

  // Display value
  const displayValue = value
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
            "w-full h-11 justify-between text-left font-normal",
            "bg-elec-gray border-white/30 hover:bg-elec-gray/80",
            "focus:border-elec-yellow focus:ring-elec-yellow",
            "touch-manipulation",
            !displayValue && "text-muted-foreground",
            className
          )}
        >
          <div className="flex items-center gap-2 truncate">
            {displayValue ? (
              <>
                <Sparkles className="h-4 w-4 text-elec-yellow shrink-0" />
                <span className="truncate">{displayValue}</span>
              </>
            ) : (
              <>
                <Search className="h-4 w-4 shrink-0" />
                <span>{placeholder}</span>
              </>
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] p-0 bg-background border-border"
        align="start"
      >
        <Command className="bg-background">
          <CommandInput
            placeholder="Search by make or model..."
            value={searchQuery}
            onValueChange={setSearchQuery}
            className="h-11"
          />
          <CommandList className="max-h-[300px]">
            <CommandEmpty>
              <div className="py-6 text-center text-sm">
                <Lightbulb className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No luminaire found.</p>
                <p className="text-muted-foreground text-xs mt-1">
                  Try a different search term
                </p>
              </div>
            </CommandEmpty>

            {Object.entries(filteredLuminaires).map(([make, luminaires]) => (
              <CommandGroup key={make} heading={make}>
                {luminaires.map((luminaire) => (
                  <CommandItem
                    key={luminaire.id}
                    value={`${luminaire.make} ${luminaire.model}`}
                    onSelect={() => handleSelect(luminaire)}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <Check
                        className={cn(
                          "h-4 w-4 shrink-0",
                          value?.make === luminaire.make && value?.model === luminaire.model
                            ? "opacity-100 text-elec-yellow"
                            : "opacity-0"
                        )}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium truncate">
                            {luminaire.model}
                          </span>
                          <Badge
                            variant="secondary"
                            className={cn(
                              "text-xs shrink-0",
                              getLuminaireTypeBadgeColor(luminaire.luminaireType)
                            )}
                          >
                            {getLuminaireTypeIcon(luminaire.luminaireType)} {luminaire.luminaireType}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center gap-2">
                          <span>{luminaire.wattage}W</span>
                          <span>•</span>
                          <span>{luminaire.lightOutput}lm</span>
                          <span>•</span>
                          <span>{luminaire.ratedDuration === 180 ? '3hr' : '1hr'}</span>
                          <span>•</span>
                          <span>{luminaire.ipRating}</span>
                        </div>
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>

        {/* Auto-fill hint */}
        <div className="border-t border-border px-3 py-2 bg-muted/30">
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-elec-yellow" />
            Selecting auto-fills specs from database
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default LuminaireAutocomplete;
