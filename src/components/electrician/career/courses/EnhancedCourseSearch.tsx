import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, Filter, X, MapPin, Calendar, PoundSterling, 
  Clock, Users, TrendingUp, SlidersHorizontal, Star
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { courseCategories } from "@/components/apprentice/career/courses/enhancedCoursesData";
import { useIsMobile } from "@/hooks/use-mobile";

interface SearchFilters {
  searchQuery: string;
  category: string;
  level: string;
  location: string;
  priceRange: [number, number];
  duration: string;
  industryDemand: string;
  format: string;
  rating: number;
}

interface EnhancedCourseSearchProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onReset: () => void;
  totalResults: number;
  isSearching?: boolean;
  viewMode?: "grid" | "list" | "map";
}

const EnhancedCourseSearch = ({ 
  filters, 
  onFiltersChange, 
  onReset, 
  totalResults,
  isSearching = false,
  viewMode = "grid"
}: EnhancedCourseSearchProps) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const isMobile = useIsMobile();

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilter = (key: keyof SearchFilters) => {
    const defaultValues: SearchFilters = {
      searchQuery: "",
      category: "All Categories",
      level: "All Levels",
      location: "All Locations",
      priceRange: [0, 2000],
      duration: "Any Duration",
      industryDemand: "All",
      format: "All Formats",
      rating: 0
    };
    handleFilterChange(key, defaultValues[key]);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.searchQuery) count++;
    if (filters.category !== "All Categories") count++;
    if (filters.level !== "All Levels") count++;
    if (filters.location !== "All Locations") count++;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 2000) count++;
    if (filters.duration !== "Any Duration") count++;
    if (filters.industryDemand !== "All") count++;
    if (filters.format !== "All Formats") count++;
    if (filters.rating > 0) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();


  return (
    <div className="space-y-6">
      {/* Hero Search Section */}
      <div className="bg-gradient-to-r from-elec-dark via-elec-gray to-elec-dark border border-elec-yellow/20 rounded-xl p-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-white">Find Your Perfect Course</h2>
            <p className="text-white/80">Search through {totalResults} professional courses and training programmes</p>
          </div>
          
          {/* Main Search Bar */}
          <div className="relative">
            <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 ${isSearching ? 'animate-pulse text-elec-yellow' : 'text-white/60'}`} />
            <Input
              placeholder="Search courses, providers, locations, topics..."
              value={filters.searchQuery}
              onChange={(e) => handleFilterChange("searchQuery", e.target.value)}
              className={`pl-12 pr-12 h-12 text-lg bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-elec-yellow/50 focus:bg-white/15 ${isSearching ? 'border-elec-yellow/50' : ''}`}
              disabled={isSearching}
            />
            {isSearching && (
              <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin h-5 w-5 border-2 border-elec-yellow border-t-transparent rounded-full"></div>
              </div>
            )}
            {filters.searchQuery && !isSearching && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-white/20"
                onClick={() => clearFilter("searchQuery")}
              >
                <X className="h-4 w-4 text-white" />
              </Button>
            )}
          </div>

          {/* Quick Filter Buttons */}
          <div className="flex flex-wrap gap-2 justify-center">
            {courseCategories.slice(1, 6).map((category) => (
              <Button
                key={category}
                variant={filters.category === category ? "default" : "outline"}
                size="sm"
                onClick={() => handleFilterChange("category", filters.category === category ? "All Categories" : category)}
                className={filters.category === category ? 
                  "bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90" : 
                  "border-white/30 text-white hover:bg-white/10 hover:border-elec-yellow/50"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Advanced Filters Section */}
      <Card className="border-elec-yellow/20 bg-elec-gray/50">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Filter Controls */}
            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3">
              <Select value={filters.category} onValueChange={(value) => handleFilterChange("category", value)}>
                <SelectTrigger className="bg-background border-border/50 hover:border-elec-yellow/50 transition-colors">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border z-50">
                  {courseCategories.map((category) => (
                    <SelectItem key={category} value={category} className="hover:bg-elec-yellow/10">
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filters.level} onValueChange={(value) => handleFilterChange("level", value)}>
                <SelectTrigger className="bg-background border-border/50 hover:border-elec-yellow/50 transition-colors">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border z-50">
                  <SelectItem value="All Levels">All Levels</SelectItem>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.location} onValueChange={(value) => handleFilterChange("location", value)}>
                <SelectTrigger className="bg-background border-border/50 hover:border-elec-yellow/50 transition-colors">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border z-50">
                  <SelectItem value="All Locations">All Locations</SelectItem>
                  <SelectItem value="London">London</SelectItem>
                  <SelectItem value="Manchester">Manchester</SelectItem>
                  <SelectItem value="Birmingham">Birmingham</SelectItem>
                  <SelectItem value="Glasgow">Glasgow</SelectItem>
                  <SelectItem value="Cardiff">Cardiff</SelectItem>
                  <SelectItem value="Online">Online</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 transition-colors"
              >
                <Filter className="h-4 w-4 mr-2" />
                More Filters
                {activeFiltersCount > 3 && (
                  <Badge variant="secondary" className="ml-2 h-5 px-2 bg-elec-yellow text-elec-dark">
                    {activeFiltersCount - 3}
                  </Badge>
                )}
              </Button>
            </div>

            {/* Results & Clear */}
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30 text-sm px-3 py-1">
                {totalResults} courses
              </Badge>
              {activeFiltersCount > 0 && (
                <Button variant="outline" size="sm" onClick={onReset} className="hover:bg-destructive/10 hover:text-destructive">
                  <X className="h-4 w-4 mr-1" />
                  Clear ({activeFiltersCount})
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>


      {/* Advanced Filters Collapsible */}
      {showAdvancedFilters && (
        <Card className="border-elec-yellow/20 bg-elec-gray/30 animate-fade-in">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-white flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-elec-yellow" />
              Advanced Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Price Range */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium flex items-center gap-2 text-white">
                  <PoundSterling className="h-4 w-4 text-elec-yellow" />
                  Price Range
                </label>
                <span className="text-sm text-elec-yellow font-medium">
                  £{filters.priceRange[0]} - £{filters.priceRange[1]}
                </span>
              </div>
              <Slider
                value={filters.priceRange}
                onValueChange={(value) => handleFilterChange("priceRange", value)}
                max={2000}
                min={0}
                step={50}
                className="w-full"
              />
            </div>

            {/* Additional Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Select value={filters.duration} onValueChange={(value) => handleFilterChange("duration", value)}>
                <SelectTrigger className="bg-background border-border/50 hover:border-elec-yellow/50">
                  <Clock className="h-4 w-4 mr-2 text-elec-yellow" />
                  <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border z-50">
                  <SelectItem value="Any Duration">Any Duration</SelectItem>
                  <SelectItem value="1 day">1 day</SelectItem>
                  <SelectItem value="2 days">2 days</SelectItem>
                  <SelectItem value="3 days">3 days</SelectItem>
                  <SelectItem value="4 days">4 days</SelectItem>
                  <SelectItem value="5 days">5+ days</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.industryDemand} onValueChange={(value) => handleFilterChange("industryDemand", value)}>
                <SelectTrigger className="bg-background border-border/50 hover:border-elec-yellow/50">
                  <TrendingUp className="h-4 w-4 mr-2 text-elec-yellow" />
                  <SelectValue placeholder="Industry Demand" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border z-50">
                  <SelectItem value="All">All Demand Levels</SelectItem>
                  <SelectItem value="High">High Demand</SelectItem>
                  <SelectItem value="Medium">Medium Demand</SelectItem>
                  <SelectItem value="Low">Low Demand</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.format} onValueChange={(value) => handleFilterChange("format", value)}>
                <SelectTrigger className="bg-background border-border/50 hover:border-elec-yellow/50">
                  <Users className="h-4 w-4 mr-2 text-elec-yellow" />
                  <SelectValue placeholder="Format" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border z-50">
                  <SelectItem value="All Formats">All Formats</SelectItem>
                  <SelectItem value="Classroom">Classroom</SelectItem>
                  <SelectItem value="Online">Online</SelectItem>
                  <SelectItem value="Blended">Blended Learning</SelectItem>
                  <SelectItem value="Practical">Practical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Rating Filter */}
            <div className="space-y-3">
              <label className="text-sm font-medium flex items-center gap-2 text-white">
                <Star className="h-4 w-4 text-elec-yellow" />
                Minimum Rating
              </label>
              <div className="flex flex-wrap gap-2">
                {[0, 3, 4, 4.5].map((rating) => (
                  <Button
                    key={rating}
                    variant={filters.rating === rating ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFilterChange("rating", rating)}
                    className={filters.rating === rating ? 
                      "bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90" : 
                      "border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                    }
                  >
                    {rating === 0 ? "Any" : `${rating}+`}
                    {rating > 0 && <Star className="h-3 w-3 ml-1 fill-current" />}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <Card className="border-elec-yellow/20 bg-elec-yellow/5">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-2">
              {filters.searchQuery && (
                <Badge variant="outline" className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/40">
                  Search: "{filters.searchQuery}"
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-2 h-4 w-4 p-0 hover:bg-elec-yellow/20"
                    onClick={() => clearFilter("searchQuery")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {filters.category !== "All Categories" && (
                <Badge variant="outline" className="bg-blue-500/20 text-blue-300 border-blue-500/40">
                  {filters.category}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-2 h-4 w-4 p-0 hover:bg-blue-500/20"
                    onClick={() => clearFilter("category")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {filters.level !== "All Levels" && (
                <Badge variant="outline" className="bg-green-500/20 text-green-300 border-green-500/40">
                  {filters.level}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-2 h-4 w-4 p-0 hover:bg-green-500/20"
                    onClick={() => clearFilter("level")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {filters.location !== "All Locations" && (
                <Badge variant="outline" className="bg-purple-500/20 text-purple-300 border-purple-500/40">
                  <MapPin className="h-3 w-3 mr-1" />
                  {filters.location}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-2 h-4 w-4 p-0 hover:bg-purple-500/20"
                    onClick={() => clearFilter("location")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EnhancedCourseSearch;