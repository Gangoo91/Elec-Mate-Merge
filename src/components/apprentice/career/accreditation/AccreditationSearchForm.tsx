
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, RotateCcw, X } from "lucide-react";
import { accreditationCategories, accreditationLevels } from "./enhancedAccreditationData";

export interface AccreditationSearchFilters {
  searchTerm: string;
  category: string;
  level: string;
  onlineOnly: boolean;
  maxCost: string;
  provider: string;
}

interface AccreditationSearchFormProps {
  onSearch: (filters: AccreditationSearchFilters) => void;
  onReset: () => void;
  resultsCount: number;
}

const AccreditationSearchForm = ({ onSearch, onReset, resultsCount }: AccreditationSearchFormProps) => {
  const [filters, setFilters] = useState<AccreditationSearchFilters>({
    searchTerm: "",
    category: "All Categories",
    level: "All Levels", 
    onlineOnly: false,
    maxCost: "",
    provider: ""
  });

  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleSearch = () => {
    onSearch(filters);
    updateActiveFilters();
  };

  const handleReset = () => {
    const resetFilters = {
      searchTerm: "",
      category: "All Categories",
      level: "All Levels",
      onlineOnly: false,
      maxCost: "",
      provider: ""
    };
    setFilters(resetFilters);
    setActiveFilters([]);
    onReset();
  };

  const updateActiveFilters = () => {
    const active: string[] = [];
    if (filters.searchTerm) active.push(`Search: "${filters.searchTerm}"`);
    if (filters.category !== "All Categories") active.push(`Category: ${filters.category}`);
    if (filters.level !== "All Levels") active.push(`Level: ${filters.level}`);
    if (filters.onlineOnly) active.push("Online Available");
    if (filters.maxCost) active.push(`Max Cost: ${filters.maxCost}`);
    if (filters.provider) active.push(`Provider: ${filters.provider}`);
    setActiveFilters(active);
  };

  const removeFilter = (filterToRemove: string) => {
    const newFilters = { ...filters };
    
    if (filterToRemove.startsWith("Search:")) {
      newFilters.searchTerm = "";
    } else if (filterToRemove.startsWith("Category:")) {
      newFilters.category = "All Categories";
    } else if (filterToRemove.startsWith("Level:")) {
      newFilters.level = "All Levels";
    } else if (filterToRemove === "Online Available") {
      newFilters.onlineOnly = false;
    } else if (filterToRemove.startsWith("Max Cost:")) {
      newFilters.maxCost = "";
    } else if (filterToRemove.startsWith("Provider:")) {
      newFilters.provider = "";
    }
    
    setFilters(newFilters);
    onSearch(newFilters);
    updateActiveFilters();
  };

  const costRanges = [
    "All Costs",
    "Under £200",
    "£200-£500", 
    "£500-£1000",
    "Over £1000"
  ];

  const providers = [
    "All Providers",
    "IET",
    "ECA", 
    "NICEIC",
    "IOSH",
    "CITB",
    "CompEx",
    "MCS"
  ];

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardContent className="p-6 space-y-4">
        {/* Search Bar */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search accreditations, providers, or specialities..."
              value={filters.searchTerm}
              onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
              className="pl-10 bg-elec-dark border-elec-yellow/20 text-white"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <Button 
            onClick={handleSearch}
            className="bg-elec-yellow text-elec-dark hover:bg-amber-400 px-6"
          >
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>

        {/* Filter Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <Select value={filters.category} onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}>
            <SelectTrigger className="bg-elec-dark border-elec-yellow/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {accreditationCategories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.level} onValueChange={(value) => setFilters(prev => ({ ...prev, level: value }))}>
            <SelectTrigger className="bg-elec-dark border-elec-yellow/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {accreditationLevels.map(level => (
                <SelectItem key={level} value={level}>{level}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.maxCost} onValueChange={(value) => setFilters(prev => ({ ...prev, maxCost: value }))}>
            <SelectTrigger className="bg-elec-dark border-elec-yellow/20 text-white">
              <SelectValue placeholder="Cost Range" />
            </SelectTrigger>
            <SelectContent>
              {costRanges.map(range => (
                <SelectItem key={range} value={range}>{range}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.provider} onValueChange={(value) => setFilters(prev => ({ ...prev, provider: value }))}>
            <SelectTrigger className="bg-elec-dark border-elec-yellow/20 text-white">
              <SelectValue placeholder="Provider" />
            </SelectTrigger>
            <SelectContent>
              {providers.map(provider => (
                <SelectItem key={provider} value={provider}>{provider}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Online Filter & Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <input
                type="checkbox"
                checked={filters.onlineOnly}
                onChange={(e) => setFilters(prev => ({ ...prev, onlineOnly: e.target.checked }))}
                className="rounded border-elec-yellow/20"
              />
              Online Available Only
            </label>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {resultsCount} {resultsCount === 1 ? 'result' : 'results'}
            </span>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleReset}
              className="border-elec-yellow/30 hover:bg-elec-yellow/10"
            >
              <RotateCcw className="mr-1 h-3 w-3" />
              Reset
            </Button>
          </div>
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-muted-foreground">Active filters:</span>
            {activeFilters.map((filter, idx) => (
              <Badge 
                key={idx}
                variant="outline" 
                className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30 text-xs"
              >
                {filter}
                <button
                  onClick={() => removeFilter(filter)}
                  className="ml-1 hover:text-white"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AccreditationSearchForm;
