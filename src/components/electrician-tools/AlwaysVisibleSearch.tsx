import { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AlwaysVisibleSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
}

const AlwaysVisibleSearch = ({ 
  searchTerm, 
  onSearchChange, 
  placeholder = "Search tools, brands, model numbers..." 
}: AlwaysVisibleSearchProps) => {
  const [suggestions] = useState([
    "Multifunction tester", "Cordless drill", "Wire strippers", "LED work light", 
    "Cable detector", "Socket tester", "Inspection torch", "Screwdriver set"
  ]);

  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(searchTerm.toLowerCase()) && 
    suggestion.toLowerCase() !== searchTerm.toLowerCase()
  );

  const handleSearchChange = (value: string) => {
    onSearchChange(value);
    setShowSuggestions(value.length > 0);
  };

  const handleSuggestionClick = (suggestion: string) => {
    onSearchChange(suggestion);
    setShowSuggestions(false);
  };

  const clearSearch = () => {
    onSearchChange("");
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder={placeholder}
          className="pl-10 pr-10 h-12 text-base bg-elec-card border-elec-yellow/30 focus:border-elec-yellow"
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          onFocus={() => setShowSuggestions(searchTerm.length > 0)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1 h-10 w-10 p-0 hover:bg-elec-yellow/10"
            onClick={clearSearch}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Auto-suggestions dropdown */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-elec-card border border-elec-yellow/30 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {filteredSuggestions.slice(0, 6).map((suggestion, index) => (
            <button
              key={index}
              className="w-full text-left px-4 py-3 hover:bg-elec-yellow/10 transition-colors border-b border-elec-yellow/10 last:border-b-0"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-elec-yellow/70" />
                <span className="text-sm">{suggestion}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlwaysVisibleSearch;