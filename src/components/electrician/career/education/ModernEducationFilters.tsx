import { useState } from "react";
import { Search, Filter, X, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { LiveEducationData } from "@/hooks/useLiveEducationData";

export interface EducationFilters {
  searchTerm: string;
  category: string;
  level: string;
  studyMode: string;
  location: string;
  sortBy: string;
}

interface ModernEducationFiltersProps {
  programmes: LiveEducationData[];
  onFiltersChange: (filters: EducationFilters) => void;
  onReset: () => void;
  resultCount: number;
}

const ModernEducationFilters = ({ programmes, onFiltersChange, onReset, resultCount }: ModernEducationFiltersProps) => {
  const [filters, setFilters] = useState<EducationFilters>({
    searchTerm: "",
    category: "",
    level: "",
    studyMode: "",
    location: "",
    sortBy: "rating"
  });
  const [isExpanded, setIsExpanded] = useState(false);

  // Extract unique values for filter options
  const categories = Array.from(new Set(programmes.map(p => p.category))).sort();
  const levels = Array.from(new Set(programmes.map(p => p.level))).sort();
  const studyModes = Array.from(new Set(programmes.map(p => p.studyMode))).sort();
  const locations = Array.from(new Set(programmes.flatMap(p => p.locations))).sort();

  const handleFilterChange = (key: keyof EducationFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilter = (key: keyof EducationFilters) => {
    handleFilterChange(key, "");
  };

  const clearAllFilters = () => {
    const resetFilters: EducationFilters = {
      searchTerm: "",
      category: "",
      level: "",
      studyMode: "",
      location: "",
      sortBy: "rating"
    };
    setFilters(resetFilters);
    onFiltersChange(resetFilters);
    onReset();
  };

  const activeFiltersCount = Object.entries(filters).filter(([key, value]) => 
    key !== 'sortBy' && value !== ""
  ).length;

  const sortOptions = [
    { value: "rating", label: "Highest Rated" },
    { value: "employment", label: "Best Employment Rate" },
    { value: "title", label: "Alphabetical" },
    { value: "duration", label: "Shortest Duration" },
    { value: "fees", label: "Lowest Fees" },
  ];

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-4 w-4" />
        <Input
          placeholder="Search programmes, institutions, or topics..."
          value={filters.searchTerm}
          onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
          className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-elec-yellow/50 focus:ring-elec-yellow/20"
        />
        {filters.searchTerm && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => clearFilter("searchTerm")}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 text-white/60 hover:text-white hover:bg-white/10"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      {/* Filter Controls Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:border-elec-yellow/30">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge className="ml-2 bg-elec-yellow text-elec-dark text-xs px-1.5 py-0.5">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </CollapsibleTrigger>
          </Collapsible>

          {/* Sort By */}
          <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange("sortBy", value)}>
            <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent className="bg-background border-border">
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Results Count */}
        <div className="text-sm text-white/80">
          <span className="font-medium">{resultCount}</span> {resultCount === 1 ? 'programme' : 'programmes'}
        </div>
      </div>

      {/* Filter Options */}
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-white/5 rounded-lg border border-white/10">
            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Category</label>
              <Select value={filters.category} onValueChange={(value) => handleFilterChange("category", value)}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white text-sm">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent className="bg-background border-border">
                  <SelectItem value="">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Level Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Level</label>
              <Select value={filters.level} onValueChange={(value) => handleFilterChange("level", value)}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white text-sm">
                  <SelectValue placeholder="All Levels" />
                </SelectTrigger>
                <SelectContent className="bg-background border-border">
                  <SelectItem value="">All Levels</SelectItem>
                  {levels.map((level) => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Study Mode Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Study Mode</label>
              <Select value={filters.studyMode} onValueChange={(value) => handleFilterChange("studyMode", value)}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white text-sm">
                  <SelectValue placeholder="All Modes" />
                </SelectTrigger>
                <SelectContent className="bg-background border-border">
                  <SelectItem value="">All Modes</SelectItem>
                  {studyModes.map((mode) => (
                    <SelectItem key={mode} value={mode}>{mode}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Location</label>
              <Select value={filters.location} onValueChange={(value) => handleFilterChange("location", value)}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white text-sm">
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent className="bg-background border-border max-h-48">
                  <SelectItem value="">All Locations</SelectItem>
                  {locations.slice(0, 20).map((location) => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active Filters Display */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-white/80">Active filters:</span>
              {filters.category && (
                <Badge variant="secondary" className="bg-elec-yellow/20 text-elec-yellow">
                  Category: {filters.category}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => clearFilter("category")}
                    className="ml-1 h-4 w-4 p-0 hover:bg-transparent"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {filters.level && (
                <Badge variant="secondary" className="bg-elec-yellow/20 text-elec-yellow">
                  Level: {filters.level}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => clearFilter("level")}
                    className="ml-1 h-4 w-4 p-0 hover:bg-transparent"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {filters.studyMode && (
                <Badge variant="secondary" className="bg-elec-yellow/20 text-elec-yellow">
                  Mode: {filters.studyMode}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => clearFilter("studyMode")}
                    className="ml-1 h-4 w-4 p-0 hover:bg-transparent"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {filters.location && (
                <Badge variant="secondary" className="bg-elec-yellow/20 text-elec-yellow">
                  Location: {filters.location}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => clearFilter("location")}
                    className="ml-1 h-4 w-4 p-0 hover:bg-transparent"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-white/60 hover:text-white hover:bg-white/10"
              >
                Clear all
              </Button>
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default ModernEducationFilters;