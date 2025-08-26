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
      {/* Main Search Section */}
      <Card className="border-elec-yellow/20 bg-card/95 backdrop-blur-sm">
        <CardContent className="p-6">
          {/* Search Bar with Enhanced Styling */}
          <div className="relative mb-6">
            <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 ${isSearching ? 'animate-pulse text-elec-yellow' : 'text-muted-foreground'}`} />
            <Input
              placeholder="What course are you looking for? e.g. 'Electrical Installation'"
              value={filters.searchQuery}
              onChange={(e) => handleFilterChange("searchQuery", e.target.value)}
              className={`pl-12 pr-12 h-12 text-base bg-background/80 border-2 transition-colors ${isSearching ? 'border-elec-yellow/50' : 'border-border hover:border-elec-yellow/30'}`}
              disabled={isSearching}
            />
            {isSearching && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin h-5 w-5 border-2 border-elec-yellow border-t-transparent rounded-full"></div>
              </div>
            )}
            {filters.searchQuery && !isSearching && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-destructive/10"
                onClick={() => clearFilter("searchQuery")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Filter Controls Row */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            {/* Primary Filters */}
            <div className="flex flex-wrap gap-3 flex-1">
              <div className="min-w-[140px]">
                <Select value={filters.category} onValueChange={(value) => handleFilterChange("category", value)}>
                  <SelectTrigger className="h-10 bg-background/80 border-border hover:border-elec-yellow/30 transition-colors">
                    <SelectValue placeholder="Categories" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover/95 backdrop-blur-sm border-border/50 shadow-lg">
                    {courseCategories.map((category) => (
                      <SelectItem key={category} value={category} className="hover:bg-elec-yellow/10">
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="min-w-[120px]">
                <Select value={filters.level} onValueChange={(value) => handleFilterChange("level", value)}>
                  <SelectTrigger className="h-10 bg-background/80 border-border hover:border-elec-yellow/30 transition-colors">
                    <SelectValue placeholder="Levels" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover/95 backdrop-blur-sm border-border/50 shadow-lg">
                    <SelectItem value="All Levels">All Levels</SelectItem>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="min-w-[140px]">
                <Select value={filters.location} onValueChange={(value) => handleFilterChange("location", value)}>
                  <SelectTrigger className="h-10 bg-background/80 border-border hover:border-elec-yellow/30 transition-colors">
                    <SelectValue placeholder="Locations" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover/95 backdrop-blur-sm border-border/50 shadow-lg">
                    <SelectItem value="All Locations">All Locations</SelectItem>
                    <SelectItem value="London">London</SelectItem>
                    <SelectItem value="Manchester">Manchester</SelectItem>
                    <SelectItem value="Birmingham">Birmingham</SelectItem>
                    <SelectItem value="Glasgow">Glasgow</SelectItem>
                    <SelectItem value="Cardiff">Cardiff</SelectItem>
                    <SelectItem value="Online">Online</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className={`h-10 px-4 border-elec-yellow/40 text-elec-yellow hover:bg-elec-yellow/10 transition-colors ${showAdvancedFilters ? 'bg-elec-yellow/10' : ''}`}
              >
                <Filter className="h-4 w-4 mr-2" />
                {isMobile ? "Filters" : "Advanced Filters"}
                {activeFiltersCount > 3 && (
                  <Badge variant="secondary" className="ml-2 h-5 px-2 bg-elec-yellow/20 text-elec-yellow">
                    {activeFiltersCount - 3}
                  </Badge>
                )}
              </Button>

              {activeFiltersCount > 0 && (
                <Button 
                  variant="outline" 
                  onClick={onReset}
                  className="h-10 px-4 border-destructive/40 text-destructive hover:bg-destructive/10"
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear ({activeFiltersCount})
                </Button>
              )}

              <div className="flex items-center gap-2">
                <Badge variant="outline" className="h-8 px-3 bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30 font-medium">
                  {totalResults} courses
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Filters Panel */}
      {showAdvancedFilters && (
        <Card className="border-elec-yellow/20 bg-card/95 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <SlidersHorizontal className="h-5 w-5 text-elec-yellow" />
              Advanced Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Price Range Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium flex items-center gap-2">
                  <PoundSterling className="h-4 w-4 text-elec-yellow" />
                  Price Range
                </label>
                <div className="text-sm font-mono bg-background/80 px-3 py-1 rounded-md border">
                  £{filters.priceRange[0]} - £{filters.priceRange[1]}
                </div>
              </div>
              <div className="px-2">
                <Slider
                  value={filters.priceRange}
                  onValueChange={(value) => handleFilterChange("priceRange", value)}
                  max={2000}
                  min={0}
                  step={50}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>£0</span>
                  <span>£2,000+</span>
                </div>
              </div>
            </div>

            {/* Additional Filter Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4 text-elec-yellow" />
                  Duration
                </label>
                <Select value={filters.duration} onValueChange={(value) => handleFilterChange("duration", value)}>
                  <SelectTrigger className="bg-background/80 border-border hover:border-elec-yellow/30">
                    <SelectValue placeholder="Any Duration" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover/95 backdrop-blur-sm border-border/50">
                    <SelectItem value="Any Duration">Any Duration</SelectItem>
                    <SelectItem value="1 day">1 Day</SelectItem>
                    <SelectItem value="2 days">2 Days</SelectItem>
                    <SelectItem value="3 days">3 Days</SelectItem>
                    <SelectItem value="4 days">4 Days</SelectItem>
                    <SelectItem value="5 days">5+ Days</SelectItem>
                    <SelectItem value="1 week">1 Week</SelectItem>
                    <SelectItem value="2 weeks">2 Weeks</SelectItem>
                    <SelectItem value="1 month">1 Month+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-elec-yellow" />
                  Industry Demand
                </label>
                <Select value={filters.industryDemand} onValueChange={(value) => handleFilterChange("industryDemand", value)}>
                  <SelectTrigger className="bg-background/80 border-border hover:border-elec-yellow/30">
                    <SelectValue placeholder="All Levels" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover/95 backdrop-blur-sm border-border/50">
                    <SelectItem value="All">All Demand Levels</SelectItem>
                    <SelectItem value="High">High Demand</SelectItem>
                    <SelectItem value="Medium">Medium Demand</SelectItem>
                    <SelectItem value="Low">Low Demand</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Users className="h-4 w-4 text-elec-yellow" />
                  Course Format
                </label>
                <Select value={filters.format} onValueChange={(value) => handleFilterChange("format", value)}>
                  <SelectTrigger className="bg-background/80 border-border hover:border-elec-yellow/30">
                    <SelectValue placeholder="All Formats" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover/95 backdrop-blur-sm border-border/50">
                    <SelectItem value="All Formats">All Formats</SelectItem>
                    <SelectItem value="Classroom">Classroom</SelectItem>
                    <SelectItem value="Online">Online</SelectItem>
                    <SelectItem value="Blended">Blended Learning</SelectItem>
                    <SelectItem value="Practical">Practical/Hands-on</SelectItem>
                    <SelectItem value="Workshop">Workshop</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Rating Filter Section */}
            <div className="space-y-3">
              <label className="text-sm font-medium flex items-center gap-2">
                <Star className="h-4 w-4 text-elec-yellow fill-current" />
                Minimum Rating
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: 0, label: "Any", description: "All courses" },
                  { value: 3, label: "3+", description: "Good & above" },
                  { value: 4, label: "4+", description: "Very good & above" },
                  { value: 4.5, label: "4.5+", description: "Excellent only" }
                ].map((rating) => (
                  <Button
                    key={rating.value}
                    variant={filters.rating === rating.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFilterChange("rating", rating.value)}
                    className={`flex items-center gap-1 h-9 px-3 transition-all ${
                      filters.rating === rating.value ? 
                        "bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90" : 
                        "border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 hover:border-elec-yellow/50"
                    }`}
                    title={rating.description}
                  >
                    {rating.label}
                    {rating.value > 0 && (
                      <Star className="h-3 w-3 fill-current" />
                    )}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <Card className="border-elec-yellow/20 bg-card/95 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-sm font-medium text-muted-foreground">Active Filters:</span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onReset}
                className="h-7 px-2 text-xs text-destructive hover:bg-destructive/10"
              >
                Clear All
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.searchQuery && (
                <Badge variant="outline" className="h-7 bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30 hover:bg-elec-yellow/20 transition-colors">
                  <Search className="h-3 w-3 mr-1" />
                  "{filters.searchQuery}"
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-1 h-4 w-4 p-0 hover:bg-elec-yellow/30"
                    onClick={() => clearFilter("searchQuery")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {filters.category !== "All Categories" && (
                <Badge variant="outline" className="h-7 bg-blue-500/10 text-blue-400 border-blue-500/30 hover:bg-blue-500/20 transition-colors">
                  <Filter className="h-3 w-3 mr-1" />
                  {filters.category}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-1 h-4 w-4 p-0 hover:bg-blue-500/30"
                    onClick={() => clearFilter("category")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {filters.level !== "All Levels" && (
                <Badge variant="outline" className="h-7 bg-green-500/10 text-green-400 border-green-500/30 hover:bg-green-500/20 transition-colors">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {filters.level}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-1 h-4 w-4 p-0 hover:bg-green-500/30"
                    onClick={() => clearFilter("level")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {filters.location !== "All Locations" && (
                <Badge variant="outline" className="h-7 bg-purple-500/10 text-purple-400 border-purple-500/30 hover:bg-purple-500/20 transition-colors">
                  <MapPin className="h-3 w-3 mr-1" />
                  {filters.location}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-1 h-4 w-4 p-0 hover:bg-purple-500/30"
                    onClick={() => clearFilter("location")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {(filters.priceRange[0] > 0 || filters.priceRange[1] < 2000) && (
                <Badge variant="outline" className="h-7 bg-orange-500/10 text-orange-400 border-orange-500/30 hover:bg-orange-500/20 transition-colors">
                  <PoundSterling className="h-3 w-3 mr-1" />
                  £{filters.priceRange[0]} - £{filters.priceRange[1]}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-1 h-4 w-4 p-0 hover:bg-orange-500/30"
                    onClick={() => clearFilter("priceRange")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {filters.duration !== "Any Duration" && (
                <Badge variant="outline" className="h-7 bg-cyan-500/10 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/20 transition-colors">
                  <Clock className="h-3 w-3 mr-1" />
                  {filters.duration}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-1 h-4 w-4 p-0 hover:bg-cyan-500/30"
                    onClick={() => clearFilter("duration")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {filters.rating > 0 && (
                <Badge variant="outline" className="h-7 bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20 transition-colors">
                  <Star className="h-3 w-3 mr-1 fill-current" />
                  {filters.rating}+ Stars
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-1 h-4 w-4 p-0 hover:bg-amber-500/30"
                    onClick={() => clearFilter("rating")}
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