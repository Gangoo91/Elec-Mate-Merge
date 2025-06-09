
import { useState } from "react";
import { Search, Filter, SlidersHorizontal, MapPin, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const ToolSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const popularSearches = [
    "Multifunction tester", "Cordless drill", "Wire strippers", "LED work light", 
    "Cable detector", "Socket tester", "Inspection torch", "Screwdriver set"
  ];

  const quickFilters = [
    { label: "On Sale", count: 127, active: false },
    { label: "In Stock", count: 890, active: true },
    { label: "Next Day", count: 234, active: false },
    { label: "Trade Price", count: 567, active: false },
    { label: "4+ Stars", count: 445, active: false }
  ];

  return (
    <div className="space-y-4">
      {/* Main Search Bar */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search tools, brands, model numbers..." 
                  className="pl-10 h-12 text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="border-elec-yellow/30 hover:bg-elec-yellow/10"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Button className="bg-elec-yellow text-black hover:bg-elec-yellow/90 px-6">
                Search
              </Button>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            {quickFilters.map((filter, index) => (
              <Badge 
                key={index}
                variant={filter.active ? "default" : "outline"}
                className={`cursor-pointer transition-all ${
                  filter.active 
                    ? "bg-elec-yellow text-black" 
                    : "border-elec-yellow/30 hover:bg-elec-yellow/10"
                }`}
              >
                {filter.label} ({filter.count})
              </Badge>
            ))}
          </div>

          {/* Advanced Filters (Collapsible) */}
          {showFilters && (
            <div className="mt-4 p-4 bg-elec-dark/50 rounded-lg border border-elec-yellow/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-white mb-2 block">Category</label>
                  <select className="w-full p-2 bg-elec-dark border border-elec-yellow/30 rounded text-white">
                    <option>All Categories</option>
                    <option>Testing Equipment</option>
                    <option>Power Tools</option>
                    <option>Hand Tools</option>
                    <option>PPE & Safety</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-white mb-2 block">Price Range</label>
                  <select className="w-full p-2 bg-elec-dark border border-elec-yellow/30 rounded text-white">
                    <option>Any Price</option>
                    <option>Under £50</option>
                    <option>£50 - £200</option>
                    <option>£200 - £500</option>
                    <option>Over £500</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-white mb-2 block">Supplier</label>
                  <select className="w-full p-2 bg-elec-dark border border-elec-yellow/30 rounded text-white">
                    <option>All Suppliers</option>
                    <option>Screwfix</option>
                    <option>Toolstation</option>
                    <option>RS Components</option>
                    <option>CEF</option>
                  </select>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="border-elec-yellow/30">
                  Clear Filters
                </Button>
                <Button size="sm" className="bg-elec-yellow text-black">
                  Apply Filters
                </Button>
              </div>
            </div>
          )}

          {/* Popular Searches */}
          <div className="mt-4">
            <p className="text-sm text-muted-foreground mb-2">Popular searches:</p>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => setSearchQuery(search)}
                  className="text-xs px-3 py-1 bg-elec-dark/50 hover:bg-elec-yellow/10 border border-elec-yellow/20 rounded-full text-muted-foreground hover:text-elec-yellow transition-colors"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search Results Summary */}
      {searchQuery && (
        <div className="flex items-center justify-between p-3 bg-elec-gray/50 rounded-lg border border-elec-yellow/20">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Found <strong className="text-elec-yellow">247 tools</strong> matching "{searchQuery}"
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Sort by:</span>
            <select className="text-xs bg-elec-dark border border-elec-yellow/30 rounded px-2 py-1 text-white">
              <option>Best Match</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Customer Rating</option>
              <option>Newest First</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolSearch;
