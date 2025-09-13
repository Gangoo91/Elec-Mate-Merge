import { useState, useMemo, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface MaterialSmartSearchProps {
  value: string;
  onChange: (value: string) => void;
  materials: any[];
  placeholder?: string;
}

const MaterialSmartSearch = ({ value, onChange, materials, placeholder = "Search materials..." }: MaterialSmartSearchProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate smart suggestions based on input
  const suggestions = useMemo(() => {
    if (!value || value.length < 2) return [];

    const query = value.toLowerCase();
    const suggestionSet = new Set<string>();

    // Add matching material names
    materials.forEach(material => {
      if (material.name?.toLowerCase().includes(query)) {
        suggestionSet.add(material.name);
      }
    });

    // Add matching categories
    materials.forEach(material => {
      if (material.category?.toLowerCase().includes(query)) {
        suggestionSet.add(material.category);
      }
    });

    // Add matching suppliers
    materials.forEach(material => {
      if (material.supplier?.toLowerCase().includes(query)) {
        suggestionSet.add(material.supplier);
      }
    });

    // Add smart category suggestions for common terms
    const categoryMap: Record<string, string[]> = {
      'cement': ['Cement Bags', 'Ready-Mix', 'Portland Cement'],
      'steel': ['Rebar', 'Steel Beams', 'Structural Steel'],
      'cable': ['Twin & Earth', 'SWA Cable', 'Data Cable'],
      'wire': ['Single Core', 'Flex Cable', 'Control Wire'],
      'socket': ['Sockets', 'USB Sockets', 'Switched Sockets'],
      'switch': ['Light Switches', 'Dimmer Switches', 'Smart Switches'],
      'lighting': ['LED Downlights', 'Emergency Lighting', 'Battens'],
      'protection': ['MCBs', 'RCDs', 'SPDs'],
      'component': ['Consumer Units', 'Distribution Boards', 'Isolators'],
    };

    Object.entries(categoryMap).forEach(([term, categories]) => {
      if (query.includes(term)) {
        categories.forEach(cat => suggestionSet.add(cat));
      }
    });

    return Array.from(suggestionSet).slice(0, 8);
  }, [value, materials]);

  // Handle clicks outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (newValue: string) => {
    onChange(newValue);
    setShowSuggestions(newValue.length >= 2);
  };

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    setShowSuggestions(false);
    setIsFocused(false);
  };

  const handleClear = () => {
    onChange('');
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    if (value.length >= 2) {
      setShowSuggestions(true);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-elec-yellow/70" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={handleInputFocus}
          className={`pl-10 pr-10 h-12 bg-elec-card/50 border-elec-yellow/20 text-elec-light placeholder:text-muted-foreground focus:border-elec-yellow/40 focus:ring-elec-yellow/20 transition-all duration-200 ${
            isFocused ? 'ring-2 ring-elec-yellow/20' : ''
          }`}
        />
        {value && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-elec-yellow/10"
          >
            <X className="h-4 w-4 text-elec-yellow/70" />
          </Button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <Card className="absolute top-full left-0 right-0 z-50 mt-1 bg-elec-card border-elec-yellow/20 shadow-lg">
          <CardContent className="p-0">
            <div className="max-h-64 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left px-4 py-3 hover:bg-elec-yellow/10 transition-colors duration-150 border-b border-elec-yellow/10 last:border-b-0 text-elec-light"
                >
                  <div className="flex items-center gap-3">
                    <Search className="h-4 w-4 text-elec-yellow/50" />
                    <span className="text-sm">{suggestion}</span>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MaterialSmartSearch;