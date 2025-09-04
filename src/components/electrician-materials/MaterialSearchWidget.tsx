
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MapPin, Clock, Zap, Building2, Star, Truck, CheckCircle, PoundSterling, Leaf, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const MaterialSearchWidget = () => {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const quickSearches = [
    "Twin & Earth 2.5mm",
    "Consumer Units",
    "LED Downlights", 
    "MCB Type B",
    "RCD 30mA",
    "SWA Cable",
    "Emergency Lighting",
    "Fire Rated Downlights"
  ];

  const filterOptions = [
    { id: "in-stock", label: "In Stock", icon: CheckCircle, color: "text-green-400" },
    { id: "next-day", label: "Next Day", icon: Truck, color: "text-blue-400" },
    { id: "local", label: "Local Supplier", icon: MapPin, color: "text-purple-400" },
    { id: "trade-price", label: "Trade Price", icon: PoundSterling, color: "text-yellow-400" },
    { id: "brand-verified", label: "Verified", icon: Star, color: "text-orange-400" },
    { id: "eco-friendly", label: "Eco-Friendly", icon: Leaf, color: "text-green-400" }
  ];

  const popularLocations = [
    "London", "Manchester", "Birmingham", "Leeds", "Glasgow", "Bristol"
  ];

  const toggleFilter = (filterId: string) => {
    setSelectedFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(f => f !== filterId)
        : [...prev, filterId]
    );
  };

  const handleSearch = () => {
    console.log("Searching for:", { searchQuery, selectedFilters, selectedLocation });
    // Implementation would go here
  };

  return (
    <Card className="border-elec-yellow/20 bg-gradient-to-br from-elec-gray to-elec-gray/70 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg sm:text-xl flex items-center gap-2 text-white">
            <Search className="h-5 w-5 text-elec-yellow" />
            Material Search
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            className="text-elec-yellow hover:text-elec-yellow/80 text-xs"
          >
            {isAdvancedOpen ? "Simple" : "Advanced"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Main Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search electrical materials..." 
              className="pl-10 bg-elec-dark/50 border-elec-yellow/30 focus:border-elec-yellow/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1 h-8 w-8 p-0 text-muted-foreground hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <Button 
            onClick={handleSearch}
            className="bg-elec-yellow text-black hover:bg-elec-yellow/90 px-6 w-full sm:w-auto"
            size={isMobile ? "lg" : "default"}
          >
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>

        {/* Quick Searches */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-white flex items-center gap-2">
            <Zap className="h-4 w-4 text-elec-yellow" />
            Popular Searches:
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {quickSearches.map((search) => (
              <Button
                key={search}
                variant="outline"
                size="sm"
                className="text-xs border-elec-yellow/30 text-white hover:bg-elec-yellow/20 hover:text-elec-yellow transition-colors h-auto py-2 px-3 justify-start"
                onClick={() => setSearchQuery(search)}
              >
                {search}
              </Button>
            ))}
          </div>
        </div>

        {/* Filters - Show based on advanced toggle */}
        {isAdvancedOpen && (
          <div className="space-y-3 border-t border-elec-yellow/20 pt-4">
            <h4 className="text-sm font-medium text-white flex items-center gap-2">
              <Filter className="h-4 w-4 text-elec-yellow" />
              Advanced Filters:
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {filterOptions.map((filter) => (
                <Button
                  key={filter.id}
                  variant={selectedFilters.includes(filter.id) ? "default" : "outline"}
                  size="sm"
                  className={`text-xs h-auto py-2 px-3 flex items-center gap-2 ${
                    selectedFilters.includes(filter.id)
                      ? "bg-elec-yellow text-black hover:bg-elec-yellow/90"
                      : "border-elec-yellow/30 text-white hover:bg-elec-yellow/20 hover:text-elec-yellow"
                  }`}
                  onClick={() => toggleFilter(filter.id)}
                >
                  <filter.icon className={`h-3 w-3 ${filter.color}`} />
                  {filter.label}
                </Button>
              ))}
            </div>
            
            {/* Selected filters display */}
            {selectedFilters.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedFilters.map((filterId) => {
                  const filter = filterOptions.find(f => f.id === filterId);
                  return filter ? (
                    <Badge
                      key={filterId}
                      className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30 text-xs flex items-center gap-1"
                    >
                      <filter.icon className="h-3 w-3" />
                      {filter.label}
                      <X
                        className="h-3 w-3 cursor-pointer hover:text-white"
                        onClick={() => toggleFilter(filterId)}
                      />
                    </Badge>
                  ) : null;
                })}
              </div>
            )}
          </div>
        )}

        {/* Location Filter - Show based on advanced toggle */}
        {isAdvancedOpen && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-white flex items-center gap-2">
              <Building2 className="h-4 w-4 text-elec-yellow" />
              Preferred Location:
            </h4>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {popularLocations.map((location) => (
                <Button
                  key={location}
                  variant={selectedLocation === location ? "default" : "outline"}
                  size="sm"
                  className={`text-xs h-auto py-2 px-3 ${
                    selectedLocation === location
                      ? "bg-elec-yellow text-black hover:bg-elec-yellow/90"
                      : "border-elec-yellow/30 text-white hover:bg-elec-yellow/20 hover:text-elec-yellow"
                  }`}
                  onClick={() => setSelectedLocation(selectedLocation === location ? "" : location)}
                >
                  {location}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Quick Info Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-elec-yellow/20">
          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-elec-dark/30 p-3 rounded-lg">
            <MapPin className="h-4 w-4 text-elec-yellow" />
            <div>
              <div className="text-white font-medium">Local Suppliers</div>
              <div>Available nationwide</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-elec-dark/30 p-3 rounded-lg">
            <Clock className="h-4 w-4 text-elec-yellow" />
            <div>
              <div className="text-white font-medium">Fast Delivery</div>
              <div>Next day & same day options</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MaterialSearchWidget;
