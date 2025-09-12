import { useState, useEffect, useMemo } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, Filter, ChevronDown, MapPin, Clock, Star } from 'lucide-react';
import { useIsMobile } from "@/hooks/use-mobile";

interface EnhancedToolSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onFiltersChange?: (filters: ToolFilters) => void;
  totalResults?: number;
}

interface ToolFilters {
  brand: string;
  priceRange: [number, number];
  availability: string;
  supplier: string;
  category: string;
  voltage: string;
  powerSource: string;
}

const toolBrands = [
  'All Brands', 'DeWalt', 'Makita', 'Milwaukee', 'Bosch', 'Festool', 'Ryobi', 'Black & Decker',
  'Hilti', 'Metabo', 'Parkside', 'Draper', 'Silverline', 'Faithfull', 'Stanley'
];

const suppliers = [
  'All Suppliers', 'Screwfix', 'Toolstation', 'CEF', 'TLC Direct', 'Electrical Direct', 'RS Components'
];

const availabilityOptions = [
  'All Stock', 'In Stock', 'Next Day Delivery', 'Same Day Collection', 'Pre-Order'
];

const voltageOptions = [
  'All Voltages', '12V', '18V', '20V', '24V', '110V', '230V', 'Cordless', 'Mains Powered'
];

const quickFilters = [
  'Cordless Tools', 'Test Equipment', 'Safety Gear', 'Hand Tools', 'Power Drills', 'Multimeters'
];

const popularSearches = [
  'impact driver', 'multimeter', 'voltage tester', 'drill bits', 'safety boots', 'hard hat',
  'wire strippers', 'socket tester', 'led torch', 'tool bag'
];

const autoSuggestions = {
  'screw': ['Screwdrivers', 'Screws & Fixings', 'Screwfix supplier'],
  'drill': ['Drill Bits', 'Cordless Drills', 'SDS Drills', 'Hammer Drills'],
  'test': ['Test Equipment', 'Voltage Testers', 'Socket Testers', 'Multimeters'],
  'led': ['LED Torches', 'LED Work Lights', 'LED Inspection Lights'],
  'safety': ['Safety Boots', 'Hard Hats', 'Safety Glasses', 'Hi-Vis Vests']
};

export const EnhancedToolSearch = ({ 
  searchQuery, 
  onSearchChange, 
  onFiltersChange, 
  totalResults = 0 
}: EnhancedToolSearchProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filters, setFilters] = useState<ToolFilters>({
    brand: 'All Brands',
    priceRange: [0, 1000],
    availability: 'All Stock',
    supplier: 'All Suppliers',
    category: 'All Categories',
    voltage: 'All Voltages',
    powerSource: 'All Types'
  });

  const isMobile = useIsMobile();

  // Generate suggestions based on search query
  useEffect(() => {
    if (searchQuery.length > 1) {
      const query = searchQuery.toLowerCase();
      const newSuggestions: string[] = [];
      
      Object.entries(autoSuggestions).forEach(([key, values]) => {
        if (key.includes(query)) {
          newSuggestions.push(...values);
        }
      });
      
      // Add brand suggestions
      toolBrands.forEach(brand => {
        if (brand.toLowerCase().includes(query) && brand !== 'All Brands') {
          newSuggestions.push(brand);
        }
      });
      
      setSuggestions(newSuggestions.slice(0, 6));
      setShowSuggestions(newSuggestions.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleFilterChange = (key: keyof ToolFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters: ToolFilters = {
      brand: 'All Brands',
      priceRange: [0, 1000],
      availability: 'All Stock',
      supplier: 'All Suppliers',
      category: 'All Categories',
      voltage: 'All Voltages',
      powerSource: 'All Types'
    };
    setFilters(clearedFilters);
    onFiltersChange?.(clearedFilters);
  };

  const hasActiveFilters = useMemo(() => {
    return filters.brand !== 'All Brands' || 
           filters.supplier !== 'All Suppliers' || 
           filters.availability !== 'All Stock' ||
           filters.voltage !== 'All Voltages' ||
           filters.priceRange[0] > 0 || 
           filters.priceRange[1] < 1000;
  }, [filters]);

  return (
    <div className="space-y-4">
      {/* Main Search Bar */}
      <Card className="p-4 bg-background/50 border-border/50">
        <div className="relative">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tools, brands, or models..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-12 h-12 text-base"
              onFocus={() => setShowSuggestions(suggestions.length > 0)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="absolute right-1 top-1 h-10 px-3"
            >
              <Filter className="h-4 w-4" />
              {hasActiveFilters && (
                <Badge variant="destructive" className="ml-1 px-1 py-0 text-xs h-4 min-w-4">
                  !
                </Badge>
              )}
            </Button>
          </div>

          {/* Auto-suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <Card className="absolute top-full left-0 right-0 mt-2 z-50 p-2 bg-background border-border/50">
              <div className="space-y-1">
                {suggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-sm"
                    onClick={() => {
                      onSearchChange(suggestion);
                      setShowSuggestions(false);
                    }}
                  >
                    <Search className="h-3 w-3 mr-2 text-muted-foreground" />
                    {suggestion}
                  </Button>
                ))}
              </div>
            </Card>
          )}
        </div>
      </Card>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2">
        {quickFilters.map((filter) => (
          <Button
            key={filter}
            variant="outline"
            size="sm"
            onClick={() => onSearchChange(filter)}
            className="text-xs"
          >
            {filter}
          </Button>
        ))}
      </div>

      {/* Advanced Filters */}
      <Collapsible open={showFilters} onOpenChange={setShowFilters}>
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            <span className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Advanced Filters
              {hasActiveFilters && (
                <Badge variant="secondary" className="ml-2">
                  Active
                </Badge>
              )}
            </span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <Card className="p-4 mt-2 space-y-4 bg-background/30">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Brand Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Brand</label>
                <Select value={filters.brand} onValueChange={(value) => handleFilterChange('brand', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border/50">
                    {toolBrands.map((brand) => (
                      <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Supplier Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Supplier</label>
                <Select value={filters.supplier} onValueChange={(value) => handleFilterChange('supplier', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border/50">
                    {suppliers.map((supplier) => (
                      <SelectItem key={supplier} value={supplier}>{supplier}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Availability Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  <MapPin className="h-4 w-4 inline mr-1" />
                  Availability
                </label>
                <Select value={filters.availability} onValueChange={(value) => handleFilterChange('availability', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border/50">
                    {availabilityOptions.map((option) => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Voltage Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Voltage/Power</label>
                <Select value={filters.voltage} onValueChange={(value) => handleFilterChange('voltage', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border/50">
                    {voltageOptions.map((voltage) => (
                      <SelectItem key={voltage} value={voltage}>{voltage}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-3">
              <label className="text-sm font-medium">
                Price Range: £{filters.priceRange[0]} - £{filters.priceRange[1]}
              </label>
              <Slider
                value={filters.priceRange}
                onValueChange={(value) => handleFilterChange('priceRange', value)}
                max={1000}
                min={0}
                step={25}
                className="w-full"
              />
            </div>

            {/* Filter Actions */}
            <div className="flex justify-between">
              <Button variant="outline" size="sm" onClick={clearFilters}>
                Clear Filters
              </Button>
              <Button size="sm" onClick={() => setShowFilters(false)}>
                Apply Filters
              </Button>
            </div>
          </Card>
        </CollapsibleContent>
      </Collapsible>

      {/* Popular Searches */}
      {!searchQuery && (
        <Card className="p-4 bg-muted/30">
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Popular Searches
          </h3>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((search) => (
              <Button
                key={search}
                variant="ghost"
                size="sm"
                onClick={() => onSearchChange(search)}
                className="text-xs bg-background/50 hover:bg-background"
              >
                {search}
              </Button>
            ))}
          </div>
        </Card>
      )}

      {/* Search Results Summary */}
      {searchQuery && (
        <div className="flex items-center justify-between py-2">
          <p className="text-sm text-muted-foreground">
            {totalResults} tools found for "{searchQuery}"
          </p>
          <Select defaultValue="relevance">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-background border-border/50">
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};