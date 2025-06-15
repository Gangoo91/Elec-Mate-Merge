
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MapPin, Clock } from "lucide-react";

const MaterialSearchWidget = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const quickSearches = [
    "Twin & Earth 2.5mm",
    "Consumer Units",
    "LED Downlights",
    "MCB Type B",
    "RCD 30mA",
    "SWA Cable"
  ];

  const filterOptions = [
    "In Stock",
    "Next Day Delivery",
    "Local Supplier",
    "Trade Price",
    "Brand Verified"
  ];

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Search className="h-5 w-5 text-elec-yellow" />
          Advanced Material Search
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by product name, code, or description..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
            Search
          </Button>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-white">Quick Searches:</h4>
          <div className="flex flex-wrap gap-2">
            {quickSearches.map((search) => (
              <Badge 
                key={search}
                variant="outline" 
                className="cursor-pointer hover:bg-elec-yellow/20 border-elec-yellow/30"
                onClick={() => setSearchQuery(search)}
              >
                {search}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-white flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters:
          </h4>
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((filter) => (
              <Badge 
                key={filter}
                variant={selectedFilters.includes(filter) ? "default" : "outline"}
                className={`cursor-pointer transition-colors ${
                  selectedFilters.includes(filter)
                    ? "bg-elec-yellow text-black"
                    : "hover:bg-elec-yellow/20 border-elec-yellow/30"
                }`}
                onClick={() => toggleFilter(filter)}
              >
                {filter}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>Local suppliers available</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>Same day collection</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MaterialSearchWidget;
