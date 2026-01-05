import * as React from 'react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export interface CircuitDescriptionCategory {
  category: string;
  items: string[];
}

interface AutocompleteInputProps {
  value: string;
  onChange: (value: string) => void;
  suggestions: string[] | CircuitDescriptionCategory[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export const AutocompleteInput = React.forwardRef<HTMLInputElement, AutocompleteInputProps>(
  ({ value, onChange, suggestions, placeholder, className, disabled }, ref) => {
    const [open, setOpen] = React.useState(false);
    const [inputValue, setInputValue] = React.useState(value);

    // Sync input value with prop value
    React.useEffect(() => {
      setInputValue(value);
    }, [value]);

    // Check if suggestions are categorized
    const isCategorized = suggestions.length > 0 && typeof suggestions[0] === 'object' && 'category' in suggestions[0];

    // Filter suggestions based on input
    const filteredSuggestions = React.useMemo(() => {
      const query = inputValue?.toLowerCase() || '';
      
      if (isCategorized) {
        const categorized = suggestions as CircuitDescriptionCategory[];
        
        if (!query || query.length < 1) {
          // Show first 5 categories when empty
          return categorized.slice(0, 5);
        }
        
        // Filter items within categories
        return categorized
          .map((category) => ({
            category: category.category,
            items: category.items.filter((item) =>
              item.toLowerCase().includes(query)
            ),
          }))
          .filter((category) => category.items.length > 0);
      } else {
        // Flat array handling (backwards compatibility)
        const flat = suggestions as string[];
        if (!query || query.length < 1) {
          return flat.slice(0, 10);
        }
        return flat.filter((suggestion) =>
          suggestion.toLowerCase().includes(query)
        );
      }
    }, [inputValue, suggestions, isCategorized]);

    const handleSelect = (selectedValue: string) => {
      setInputValue(selectedValue);
      onChange(selectedValue);
      setOpen(false);
    };

    const handleInputChange = (newValue: string) => {
      setInputValue(newValue);
      onChange(newValue);
      if (!open && newValue.length > 0) {
        setOpen(true);
      }
    };

    const handleBlur = () => {
      // Delay to allow click events on suggestions
      setTimeout(() => {
        setOpen(false);
      }, 200);
    };

    const hasResults = isCategorized 
      ? (filteredSuggestions as CircuitDescriptionCategory[]).some(cat => cat.items.length > 0)
      : filteredSuggestions.length > 0;

    return (
      <Popover open={open && !disabled} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <input
            ref={ref}
            type="text"
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={() => !disabled && setOpen(true)}
            onBlur={handleBlur}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(
              'flex h-9 w-full rounded-md border-2 border-elec-gray bg-elec-gray hover:bg-elec-gray px-3 py-1 text-sm text-foreground shadow-sm',
              'font-sans font-[450] tracking-[0.005em] leading-[1.5]',
              'will-change-[contents] transform-gpu backface-visibility-hidden',
              'transition-[background-color,border-color,box-shadow,transform] duration-200 ease-out',
              'file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground',
              'placeholder:text-foreground/70 placeholder:transition-colors placeholder:duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow focus:bg-elec-gray focus:scale-[1.002]',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'touch-manipulation',
              'selection:bg-primary/20 selection:text-foreground',
              'caret-elec-yellow',
              className
            )}
          />
        </PopoverTrigger>
        {hasResults && (
          <PopoverContent
            className="p-0 w-[var(--radix-popover-trigger-width)] z-[70]"
            align="start"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <Command>
              <CommandInput className="hidden" value={inputValue} />
              <CommandList className="max-h-[200px] md:max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-elec-gray-light scrollbar-track-transparent pr-2">
                {!hasResults && (
                  <CommandEmpty className="py-6 text-center text-sm text-foreground/60">
                    No circuit descriptions found.
                  </CommandEmpty>
                )}
                {isCategorized ? (
                  // Render categorized suggestions
                  (filteredSuggestions as CircuitDescriptionCategory[]).map((category) => (
                    <CommandGroup 
                      key={category.category}
                      heading={category.category}
                      className="px-2 py-2"
                    >
                      {category.items.map((item) => (
                        <CommandItem
                          key={item}
                          value={item}
                          onSelect={() => handleSelect(item)}
                          className="cursor-pointer min-h-[44px] md:min-h-[36px] px-3 py-2 text-foreground hover:bg-elec-gray-light data-[selected='true']:bg-elec-gray-light data-[selected='true']:text-foreground rounded-md"
                        >
                          {item}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  ))
                ) : (
                  // Render flat suggestions (backwards compatibility)
                  <CommandGroup className="px-2 py-2">
                    {(filteredSuggestions as string[]).map((suggestion) => (
                      <CommandItem
                        key={suggestion}
                        value={suggestion}
                        onSelect={() => handleSelect(suggestion)}
                        className="cursor-pointer min-h-[44px] md:min-h-[36px] px-3 py-2 text-foreground hover:bg-elec-gray-light data-[selected='true']:bg-elec-gray-light data-[selected='true']:text-foreground rounded-md"
                      >
                        {suggestion}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </CommandList>
            </Command>
          </PopoverContent>
        )}
      </Popover>
    );
  }
);

AutocompleteInput.displayName = 'AutocompleteInput';
