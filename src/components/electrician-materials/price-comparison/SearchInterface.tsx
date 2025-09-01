import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, RefreshCw } from "lucide-react";
import { MobileButton } from "@/components/ui/mobile-button";
import { MobileInputWrapper } from "@/components/ui/mobile-input-wrapper";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { useIsMobile } from "@/hooks/use-mobile";

const COMMON_PRODUCTS = [
  "Twin & Earth Cable 2.5mm", "Twin & Earth Cable 1.5mm", "SWA Cable 4mm", "SWA Cable 2.5mm",
  "MCB 32A", "MCB 20A", "MCB 16A", "MCB 6A", "RCD 30mA", "RCD 100mA",
  "Consumer Unit 10 Way", "Consumer Unit 18 Way", "Isolator Switch", "Circuit Breaker",
  "LED Downlight 6W", "LED Downlight 9W", "Emergency Light", "Batten Light 4ft",
  "Cable Clips", "Cable Gland 20mm", "Conduit 20mm", "Trunking 50x50",
  "Junction Box", "Weatherproof Box", "Socket Outlet", "Light Switch"
];

const CATEGORIES = [
  { value: "all", label: "All Categories" },
  { value: "cables", label: "Cables" },
  { value: "components", label: "Components" },
  { value: "lighting", label: "Lighting" },
  { value: "protection", label: "Protection" },
  { value: "accessories", label: "Accessories" }
];

const SUPPLIERS = [
  { value: "all", label: "All Suppliers" },
  { value: "screwfix", label: "Screwfix" },
  { value: "cef", label: "CEF" },
  { value: "rs", label: "RS Components" },
  { value: "toolstation", label: "Toolstation" }
];

interface SearchInterfaceProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedSupplier: string;
  setSelectedSupplier: (supplier: string) => void;
  isLoading: boolean;
  onSearch: () => void;
  onClearSelection?: () => void;
  showingPreSelected: boolean;
}

export const SearchInterface = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedSupplier,
  setSelectedSupplier,
  isLoading,
  onSearch,
  onClearSelection,
  showingPreSelected
}: SearchInterfaceProps) => {
  const isMobile = useIsMobile();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    
    if (value.length > 1) {
      const filtered = COMMON_PRODUCTS.filter(product =>
        product.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (suggestion: string) => {
    setSearchQuery(suggestion);
    setSuggestions([]);
    setShowSuggestions(false);
    searchInputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Show clear button for pre-selected items */}
          {showingPreSelected && onClearSelection && (
            <div className="flex items-center justify-between p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <span className="text-sm text-blue-400">Showing selected materials from category</span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onClearSelection}
                className="text-blue-400 border-blue-500/30 hover:bg-blue-500/20"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Clear & Search New
              </Button>
            </div>
          )}

          {/* Search Input with Autocomplete */}
          <div className="relative">
            {isMobile ? (
              <div className="relative">
                <MobileInputWrapper 
                  label="Search Materials"
                  placeholder="e.g., Twin & Earth Cable 2.5mm, MCB 32A..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  icon={<Search className="h-4 w-4" />}
                />
              </div>
            ) : (
              <div className="relative">
                <Input
                  ref={searchInputRef}
                  placeholder="Search materials (e.g., Twin & Earth Cable 2.5mm, MCB 32A...)"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-10 h-12"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
            )}

            {/* Autocomplete Suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 z-50 bg-elec-gray border border-elec-yellow/20 rounded-lg mt-1 shadow-lg">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className="w-full text-left px-4 py-2 hover:bg-elec-yellow/10 transition-colors first:rounded-t-lg last:rounded-b-lg"
                    onClick={() => selectSuggestion(suggestion)}
                  >
                    <span className="text-sm text-white">{suggestion}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Filters */}
          <div className={`${isMobile ? 'space-y-3' : 'flex gap-4'}`}>
            {isMobile ? (
              <>
                <MobileSelectWrapper 
                  label="Category"
                  placeholder="Select category..."
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                  options={CATEGORIES}
                />

                <MobileSelectWrapper 
                  label="Supplier"
                  placeholder="Select supplier..."
                  value={selectedSupplier}
                  onValueChange={setSelectedSupplier}
                  options={SUPPLIERS}
                />
              </>
            ) : (
              <>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map(category => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedSupplier} onValueChange={setSelectedSupplier}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SUPPLIERS.map(supplier => (
                      <SelectItem key={supplier.value} value={supplier.value}>
                        {supplier.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </>
            )}
          </div>

          {/* Search Button */}
          {isMobile ? (
            <MobileButton
              onClick={onSearch}
              disabled={isLoading}
              className="w-full bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Search Materials
                </>
              )}
            </MobileButton>
          ) : (
            <Button
              onClick={onSearch}
              disabled={isLoading}
              className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 h-12 px-8"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                  Searching Materials...
                </>
              ) : (
                <>
                  <Search className="h-5 w-5 mr-2" />
                  Search Materials
                </>
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};