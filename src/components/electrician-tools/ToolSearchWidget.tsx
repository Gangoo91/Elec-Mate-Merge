import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MapPin, Clock, Zap, Building2, Battery, Wrench } from "lucide-react";

interface ToolSearchWidgetProps {
  onSearch?: (query: string, filters: string[], location: string) => void;
}

const ToolSearchWidget = ({ onSearch }: ToolSearchWidgetProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState("");

  const quickSearches = [
    "18V Drill",
    "Socket Tester",
    "Cable Strippers",
    "Multimeter",
    "Cordless Saw",
    "Test Equipment",
    "Safety Boots",
    "Tool Storage"
  ];

  const filterOptions = [
    { id: "in-stock", label: "In Stock", icon: "📦" },
    { id: "cordless", label: "Cordless", icon: "🔋" },
    { id: "18v-system", label: "18V System", icon: "⚡" },
    { id: "professional", label: "Professional", icon: "🔧" },
    { id: "trade-price", label: "Trade Price", icon: "💷" },
    { id: "brand-verified", label: "Brand Verified", icon: "✓" }
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
    onSearch?.(searchQuery, selectedFilters, selectedLocation);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2 text-white">
          <Search className="h-5 w-5 text-elec-yellow" />
          Advanced Tool Search
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Search Bar */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by tool name, brand, model, or type..." 
              className="pl-10 bg-elec-dark/50 border-elec-yellow/30"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button 
            onClick={handleSearch}
            className="bg-elec-yellow text-black hover:bg-elec-yellow/90 px-6"
          >
            Search
          </Button>
        </div>

        {/* Quick Searches */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-white flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Quick Searches:
          </h4>
          <div className="flex flex-wrap gap-2">
            {quickSearches.map((search) => (
              <Badge 
                key={search}
                variant="outline" 
                className="cursor-pointer hover:bg-elec-yellow/20 border-elec-yellow/30 text-white hover:text-elec-yellow transition-colors"
                onClick={() => setSearchQuery(search)}
              >
                {search}
              </Badge>
            ))}
          </div>
        </div>

        {/* Tool-Specific Filters */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-white flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Tool Filters:
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {filterOptions.map((filter) => (
              <Badge 
                key={filter.id}
                variant={selectedFilters.includes(filter.id) ? "default" : "outline"}
                className={`cursor-pointer transition-all text-center justify-center py-2 ${
                  selectedFilters.includes(filter.id)
                    ? "bg-elec-yellow text-black hover:bg-elec-yellow/90"
                    : "hover:bg-elec-yellow/20 border-elec-yellow/30 text-white hover:text-elec-yellow"
                }`}
                onClick={() => toggleFilter(filter.id)}
              >
                <span className="mr-1">{filter.icon}</span>
                {filter.label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Supplier Location Filter */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-white flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Preferred Location:
          </h4>
          <div className="flex flex-wrap gap-2">
            {popularLocations.map((location) => (
              <Badge 
                key={location}
                variant={selectedLocation === location ? "default" : "outline"}
                className={`cursor-pointer transition-colors ${
                  selectedLocation === location
                    ? "bg-elec-yellow text-black"
                    : "hover:bg-elec-yellow/20 border-elec-yellow/30 text-white hover:text-elec-yellow"
                }`}
                onClick={() => setSelectedLocation(selectedLocation === location ? "" : location)}
              >
                {location}
              </Badge>
            ))}
          </div>
        </div>

        {/* Tool Info */}
        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-elec-yellow/20">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3 text-elec-yellow" />
            <span>Local tool suppliers</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-3 w-3 text-elec-yellow" />
            <span>Same day tool collection</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ToolSearchWidget;