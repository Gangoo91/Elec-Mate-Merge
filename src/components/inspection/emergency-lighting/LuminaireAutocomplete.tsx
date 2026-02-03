/**
 * LuminaireAutocomplete Component
 *
 * A searchable combobox for selecting emergency luminaires from the database.
 * Groups luminaires by manufacturer and shows type icons.
 * On selection, calls the provided callback to auto-fill luminaire specs.
 */

import React, { useState, useMemo, useCallback } from 'react';
import { Check, ChevronsUpDown, Lightbulb, Search, Sparkles, X } from 'lucide-react';
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { SwipeableBottomSheet } from '@/components/native/SwipeableBottomSheet';
import { useIsMobile } from '@/hooks/use-mobile';
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
  const isMobile = useIsMobile();

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

  // Check if luminaire is selected
  const isLuminaireSelected = (luminaire: EmergencyLuminaire) => {
    return value?.make === luminaire.make && value?.model === luminaire.model;
  };

  // Trigger button shared between mobile and desktop
  const triggerButton = (
    <Button
      variant="outline"
      role="combobox"
      aria-expanded={open}
      disabled={disabled}
      onClick={isMobile ? () => setOpen(true) : undefined}
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
  );

  // Render luminaire item (shared renderer for mobile and desktop)
  const renderLuminaireItem = (luminaire: EmergencyLuminaire, forMobile = false) => {
    const isSelected = isLuminaireSelected(luminaire);
    return (
      <div
        key={luminaire.id}
        onClick={() => handleSelect(luminaire)}
        className={cn(
          "rounded-lg cursor-pointer transition-colors flex items-center",
          forMobile ? "px-4 py-4 min-h-[56px]" : "px-2 py-2",
          "hover:bg-elec-yellow/10 active:bg-elec-yellow/20",
          isSelected && "bg-elec-yellow/20"
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
          <div className="flex items-center gap-2 flex-wrap">
            <span className={cn("font-medium truncate", forMobile && "text-base")}>
              {luminaire.model}
            </span>
            <Badge
              variant="secondary"
              className={cn(
                "shrink-0",
                forMobile ? "text-xs" : "text-xs",
                getLuminaireTypeBadgeColor(luminaire.luminaireType)
              )}
            >
              {getLuminaireTypeIcon(luminaire.luminaireType)} {luminaire.luminaireType}
            </Badge>
          </div>
          <div className={cn(
            "text-muted-foreground flex items-center gap-2 flex-wrap",
            forMobile ? "text-sm mt-1" : "text-xs"
          )}>
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
    );
  };

  // Mobile: Use SwipeableBottomSheet
  if (isMobile) {
    return (
      <>
        {triggerButton}

        <SwipeableBottomSheet
          open={open}
          onOpenChange={setOpen}
          title="Select Emergency Luminaire"
          contentClassName="p-0"
        >
          <div className="flex flex-col max-h-[70vh]">
            {/* Search input */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-background sticky top-0">
              <Search className="h-5 w-5 text-muted-foreground shrink-0" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search luminaires..."
                className="h-11 border-0 bg-transparent focus-visible:ring-0 px-0 text-base"
                autoFocus
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchQuery('')}
                  className="h-9 w-9 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Luminaire list */}
            <div className="flex-1 overflow-y-auto momentum-scroll-y">
              {Object.keys(filteredLuminaires).length === 0 ? (
                <div className="py-12 text-center text-muted-foreground">
                  <Lightbulb className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p className="text-base">No luminaires found</p>
                  <p className="text-sm mt-1">Try a different search term</p>
                </div>
              ) : (
                <div className="px-2 py-2">
                  {Object.entries(filteredLuminaires).map(([make, luminaires]) => (
                    <div key={make} className="mb-4">
                      <p className="px-4 py-2 text-sm text-muted-foreground font-medium sticky top-0 bg-background">
                        {make}
                      </p>
                      <div className="space-y-1">
                        {luminaires.map((luminaire) => renderLuminaireItem(luminaire, true))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-border/50 px-4 py-3 bg-card/30">
              <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1">
                <Sparkles className="h-3 w-3 text-elec-yellow" />
                Selecting auto-fills specs from database
              </p>
            </div>
          </div>
        </SwipeableBottomSheet>
      </>
    );
  }

  // Desktop: Use Popover
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {triggerButton}
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
