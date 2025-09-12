import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { 
  Search, 
  Filter, 
  Mic, 
  Clock, 
  Package, 
  MapPin, 
  Star, 
  Truck,
  CheckCircle,
  X,
  ChevronDown
} from 'lucide-react';

interface SearchSuggestion {
  type: 'product' | 'category' | 'brand' | 'supplier';
  text: string;
  icon: React.ReactNode;
  path?: string;
}

const EnhancedMaterialSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [isVoiceSearch, setIsVoiceSearch] = useState(false);

  const quickFilters = [
    { id: 'in-stock', label: 'In Stock', icon: <Package className="h-3 w-3" /> },
    { id: 'next-day', label: 'Next Day', icon: <Truck className="h-3 w-3" /> },
    { id: 'trade-price', label: 'Trade Price', icon: <Star className="h-3 w-3" /> },
    { id: 'local', label: 'Local Stock', icon: <MapPin className="h-3 w-3" /> },
    { id: 'bs7671', label: 'BS7671', icon: <CheckCircle className="h-3 w-3" /> },
    { id: 'ce-marked', label: 'CE Marked', icon: <CheckCircle className="h-3 w-3" /> }
  ];

  const popularBrands = [
    'Schneider', 'Hager', 'MK Electric', 'BG Electrical', 'Crabtree', 
    'Legrand', 'Wylex', 'Contactum', 'Dimplex', 'Greenbrook'
  ];

  const suppliers = [
    'Screwfix', 'CEF', 'Toolstation', 'ElectricalDirect', 
    'TLC Electrical', 'Rexel', 'Edmundson', 'Newey & Eyre'
  ];

  const locations = [
    'London', 'Manchester', 'Birmingham', 'Leeds', 'Glasgow', 
    'Bristol', 'Liverpool', 'Newcastle', 'Sheffield', 'Nottingham'
  ];

  const recentSearches = [
    'twin earth 2.5mm',
    'consumer unit 10 way',
    'led downlights',
    'mcb type b 32a',
    'rcd 30ma'
  ];

  // Auto-suggestions based on search query
  useEffect(() => {
    if (searchQuery.length > 2) {
      const newSuggestions: SearchSuggestion[] = [];
      
      // Product suggestions
      if (searchQuery.toLowerCase().includes('screw')) {
        newSuggestions.push(
          { type: 'product', text: 'Screwdrivers', icon: <Package className="h-4 w-4" />, path: '/tools/screwdrivers' },
          { type: 'product', text: 'Screws & Fixings', icon: <Package className="h-4 w-4" />, path: '/materials/fixings' },
          { type: 'supplier', text: 'Screwfix', icon: <MapPin className="h-4 w-4" />, path: '/suppliers/screwfix' }
        );
      }
      
      if (searchQuery.toLowerCase().includes('led')) {
        newSuggestions.push(
          { type: 'product', text: 'LED Downlights', icon: <Package className="h-4 w-4" /> },
          { type: 'product', text: 'LED Strip Lighting', icon: <Package className="h-4 w-4" /> },
          { type: 'product', text: 'LED Battens', icon: <Package className="h-4 w-4" /> }
        );
      }

      if (searchQuery.toLowerCase().includes('mcb')) {
        newSuggestions.push(
          { type: 'product', text: 'MCB Type B', icon: <Package className="h-4 w-4" /> },
          { type: 'product', text: 'MCB Type C', icon: <Package className="h-4 w-4" /> },
          { type: 'category', text: 'Circuit Protection', icon: <Filter className="h-4 w-4" /> }
        );
      }

      setSuggestions(newSuggestions.slice(0, 8));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const toggleFilter = (filterId: string) => {
    setSelectedFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(f => f !== filterId)
        : [...prev, filterId]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const toggleSupplier = (supplier: string) => {
    setSelectedSuppliers(prev => 
      prev.includes(supplier) 
        ? prev.filter(s => s !== supplier)
        : [...prev, supplier]
    );
  };

  const clearAllFilters = () => {
    setSelectedFilters([]);
    setSelectedBrands([]);
    setSelectedSuppliers([]);
    setSelectedLocation('');
    setPriceRange([0, 1000]);
  };

  const handleVoiceSearch = () => {
    setIsVoiceSearch(true);
    // Voice search implementation would go here
    setTimeout(() => setIsVoiceSearch(false), 2000);
  };

  const totalActiveFilters = selectedFilters.length + selectedBrands.length + selectedSuppliers.length + (selectedLocation ? 1 : 0);

  return (
    <div className="sticky top-16 z-40 bg-background/95 backdrop-blur border-b border-elec-yellow/20 pb-4">
      <div className="container space-y-4">
        {/* Main Search Bar */}
        <div className="relative">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for materials, tools, brands, or product codes..."
                className="pl-10 pr-12 h-12 text-base bg-background border-elec-yellow/30 focus:border-elec-yellow"
                onFocus={() => setShowSuggestions(suggestions.length > 0)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-2 h-8 w-8 p-0"
                onClick={handleVoiceSearch}
                disabled={isVoiceSearch}
              >
                <Mic className={`h-4 w-4 ${isVoiceSearch ? 'animate-pulse text-red-500' : 'text-muted-foreground'}`} />
              </Button>
            </div>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="h-12 px-4 border-elec-yellow/30">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  {totalActiveFilters > 0 && (
                    <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 text-xs">
                      {totalActiveFilters}
                    </Badge>
                  )}
                  <ChevronDown className="h-3 w-3 ml-2" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-96 p-0" align="end">
                <div className="p-4 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Advanced Filters</h3>
                    {totalActiveFilters > 0 && (
                      <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                        Clear All
                      </Button>
                    )}
                  </div>

                  {/* Price Range */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Price Range</h4>
                    <div className="px-2">
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={1000}
                        step={10}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>£{priceRange[0]}</span>
                        <span>£{priceRange[1]}+</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Brands */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Brands</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {popularBrands.slice(0, 8).map((brand) => (
                        <Badge
                          key={brand}
                          variant={selectedBrands.includes(brand) ? "default" : "outline"}
                          className="cursor-pointer justify-center py-1"
                          onClick={() => toggleBrand(brand)}
                        >
                          {brand}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Suppliers */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Suppliers</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {suppliers.slice(0, 6).map((supplier) => (
                        <Badge
                          key={supplier}
                          variant={selectedSuppliers.includes(supplier) ? "default" : "outline"}
                          className="cursor-pointer justify-center py-1"
                          onClick={() => toggleSupplier(supplier)}
                        >
                          {supplier}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Button size="lg" className="h-12 px-6 bg-elec-yellow text-black hover:bg-elec-yellow/90">
              Search
            </Button>
          </div>

          {/* Auto-suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <Card className="absolute top-full left-0 right-0 mt-1 z-50 border-elec-yellow/20">
              <CardContent className="p-0">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 hover:bg-muted cursor-pointer border-b last:border-b-0"
                    onClick={() => {
                      setSearchQuery(suggestion.text);
                      setShowSuggestions(false);
                    }}
                  >
                    {suggestion.icon}
                    <span className="flex-1">{suggestion.text}</span>
                    <Badge variant="outline" className="text-xs">
                      {suggestion.type}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-2">
          {quickFilters.map((filter) => (
            <Badge
              key={filter.id}
              variant={selectedFilters.includes(filter.id) ? "default" : "outline"}
              className="cursor-pointer hover:bg-elec-yellow/20 transition-colors"
              onClick={() => toggleFilter(filter.id)}
            >
              {filter.icon}
              <span className="ml-1">{filter.label}</span>
            </Badge>
          ))}
        </div>

        {/* Recent Searches */}
        {searchQuery === '' && (
          <div className="flex items-center gap-2 flex-wrap">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Recent:</span>
            {recentSearches.map((search) => (
              <Badge
                key={search}
                variant="secondary"
                className="cursor-pointer hover:bg-elec-yellow/20"
                onClick={() => setSearchQuery(search)}
              >
                {search}
              </Badge>
            ))}
          </div>
        )}

        {/* Active Filters Display */}
        {totalActiveFilters > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {selectedFilters.map((filter) => (
              <Badge key={filter} variant="secondary" className="gap-1">
                {quickFilters.find(f => f.id === filter)?.label}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => toggleFilter(filter)}
                />
              </Badge>
            ))}
            {selectedBrands.map((brand) => (
              <Badge key={brand} variant="secondary" className="gap-1">
                {brand}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => toggleBrand(brand)}
                />
              </Badge>
            ))}
            {selectedSuppliers.map((supplier) => (
              <Badge key={supplier} variant="secondary" className="gap-1">
                {supplier}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => toggleSupplier(supplier)}
                />
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedMaterialSearch;