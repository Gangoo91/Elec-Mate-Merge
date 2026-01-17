
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, RotateCcw, X } from "lucide-react";
import { accreditationCategories, accreditationLevels } from "./enhancedAccreditationData";
import { cn } from "@/lib/utils";

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
    <Card className="bg-gradient-to-br from-elec-gray to-elec-card border-elec-yellow/20 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-elec-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <CardContent className="p-6 space-y-4 relative">
        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            {!filters.searchTerm && (
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40 pointer-events-none" />
            )}
            <Input
              placeholder="Search accreditations, providers, or specialities..."
              value={filters.searchTerm}
              onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
              className={cn("h-11 bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-elec-yellow/50", !filters.searchTerm && "pl-10")}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <Button
            onClick={handleSearch}
            className="h-11 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 px-6 touch-manipulation active:scale-95 transition-all"
          >
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>

        {/* Filter Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Select value={filters.category} onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}>
            <SelectTrigger className="h-11 bg-white/5 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-elec-gray border-white/20">
              {accreditationCategories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.level} onValueChange={(value) => setFilters(prev => ({ ...prev, level: value }))}>
            <SelectTrigger className="h-11 bg-white/5 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-elec-gray border-white/20">
              {accreditationLevels.map(level => (
                <SelectItem key={level} value={level}>{level}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.maxCost} onValueChange={(value) => setFilters(prev => ({ ...prev, maxCost: value }))}>
            <SelectTrigger className="h-11 bg-white/5 border-white/20 text-white">
              <SelectValue placeholder="Cost Range" />
            </SelectTrigger>
            <SelectContent className="bg-elec-gray border-white/20">
              {costRanges.map(range => (
                <SelectItem key={range} value={range}>{range}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.provider} onValueChange={(value) => setFilters(prev => ({ ...prev, provider: value }))}>
            <SelectTrigger className="h-11 bg-white/5 border-white/20 text-white">
              <SelectValue placeholder="Provider" />
            </SelectTrigger>
            <SelectContent className="bg-elec-gray border-white/20">
              {providers.map(provider => (
                <SelectItem key={provider} value={provider}>{provider}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Online Filter & Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
          <label className="flex items-center gap-3 text-sm text-white cursor-pointer p-2 rounded-lg hover:bg-white/5 transition-colors">
            <input
              type="checkbox"
              checked={filters.onlineOnly}
              onChange={(e) => setFilters(prev => ({ ...prev, onlineOnly: e.target.checked }))}
              className="w-4 h-4 rounded border-white/20 bg-white/5 text-elec-yellow focus:ring-elec-yellow/50"
            />
            Online Available Only
          </label>

          <div className="flex items-center gap-3">
            <span className="text-sm text-white/70">
              <span className="text-elec-yellow font-medium">{resultsCount}</span> {resultsCount === 1 ? 'result' : 'results'}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="h-9 border-white/20 hover:bg-white/10 touch-manipulation"
            >
              <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
              Reset
            </Button>
          </div>
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
            <span className="text-xs text-white/60">Active filters:</span>
            {activeFilters.map((filter, idx) => (
              <Badge
                key={idx}
                variant="outline"
                className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30 text-xs hover:bg-elec-yellow/20 transition-colors"
              >
                {filter}
                <button
                  onClick={() => removeFilter(filter)}
                  className="ml-1.5 hover:text-white transition-colors"
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
