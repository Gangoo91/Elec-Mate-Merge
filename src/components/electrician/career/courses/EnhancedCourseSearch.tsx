import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileButton } from "@/components/ui/mobile-button";
import { MobileInput } from "@/components/ui/mobile-input";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, Filter, X, MapPin, Calendar, PoundSterling, 
  Clock, Users, TrendingUp, SlidersHorizontal, Star,
  ChevronDown, ChevronUp
} from "lucide-react";
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
}

const EnhancedCourseSearch = ({ 
  filters, 
  onFiltersChange, 
  onReset, 
  totalResults 
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
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader className={`${isMobile ? 'pb-3 p-4' : 'pb-4'}`}>
        <div className={`flex ${isMobile ? 'flex-col gap-3' : 'flex-col sm:flex-row sm:items-center sm:justify-between gap-4'}`}>
          <CardTitle className={`flex items-center gap-2 ${isMobile ? 'text-base' : 'text-lg'}`}>
            <Search className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} text-elec-yellow`} />
            {isMobile ? 'Search Courses' : 'Search & Filter Courses'}
          </CardTitle>
          <div className={`flex items-center ${isMobile ? 'justify-between' : 'gap-2'}`}>
            <Badge variant="outline" className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30">
              {totalResults} results
            </Badge>
            {activeFiltersCount > 0 && (
              <MobileButton 
                variant="outline" 
                size={isMobile ? "sm" : "sm"} 
                onClick={onReset}
                className={isMobile ? 'h-8 px-2 text-xs' : ''}
              >
                <X className="h-3 w-3 mr-1" />
                Clear {isMobile ? `(${activeFiltersCount})` : `All (${activeFiltersCount})`}
              </MobileButton>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className={`space-y-${isMobile ? '3' : '4'} ${isMobile ? 'p-4' : ''}`}>
        {/* Search Bar */}
        {isMobile ? (
          <MobileInput
            placeholder="Search courses, providers, topics..."
            value={filters.searchQuery}
            onChange={(value) => handleFilterChange("searchQuery", value)}
          />
        ) : (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses, providers, topics..."
              value={filters.searchQuery}
              onChange={(e) => handleFilterChange("searchQuery", e.target.value)}
              className="pl-10 bg-background/50"
            />
            {filters.searchQuery && (
              <MobileButton
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                onClick={() => clearFilter("searchQuery")}
              >
                <X className="h-3 w-3" />
              </MobileButton>
            )}
          </div>
        )}

        {/* Quick Filters */}
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-2' : 'grid-cols-2 sm:grid-cols-4 gap-3'}`}>
          {isMobile ? (
            <>
              <MobileSelectWrapper
                placeholder="Category"
                value={filters.category}
                onValueChange={(value) => handleFilterChange("category", value)}
                options={courseCategories.map(cat => ({ value: cat, label: cat }))}
              />
              <MobileSelectWrapper
                placeholder="Level"
                value={filters.level}
                onValueChange={(value) => handleFilterChange("level", value)}
                options={[
                  { value: "All Levels", label: "All Levels" },
                  { value: "Beginner", label: "Beginner" },
                  { value: "Intermediate", label: "Intermediate" },
                  { value: "Advanced", label: "Advanced" }
                ]}
              />
              <MobileSelectWrapper
                placeholder="Location"
                value={filters.location}
                onValueChange={(value) => handleFilterChange("location", value)}
                options={[
                  { value: "All Locations", label: "All Locations" },
                  { value: "London", label: "London" },
                  { value: "Manchester", label: "Manchester" },
                  { value: "Birmingham", label: "Birmingham" },
                  { value: "Glasgow", label: "Glasgow" },
                  { value: "Cardiff", label: "Cardiff" },
                  { value: "Online", label: "Online" }
                ]}
              />
            </>
          ) : (
            <>
              <Select value={filters.category} onValueChange={(value) => handleFilterChange("category", value)}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {courseCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filters.level} onValueChange={(value) => handleFilterChange("level", value)}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="All Levels">All Levels</SelectItem>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.location} onValueChange={(value) => handleFilterChange("location", value)}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="All Locations">All Locations</SelectItem>
                  <SelectItem value="London">London</SelectItem>
                  <SelectItem value="Manchester">Manchester</SelectItem>
                  <SelectItem value="Birmingham">Birmingham</SelectItem>
                  <SelectItem value="Glasgow">Glasgow</SelectItem>
                  <SelectItem value="Cardiff">Cardiff</SelectItem>
                  <SelectItem value="Online">Online</SelectItem>
                </SelectContent>
              </Select>
            </>
          )}

          <MobileButton
            variant="outline"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 flex items-center justify-center gap-2"
          >
            <SlidersHorizontal className="h-4 w-4" />
            {isMobile ? "Filters" : "Advanced"}
            {showAdvancedFilters ? (
              <ChevronUp className="h-3 w-3" />
            ) : (
              <ChevronDown className="h-3 w-3" />
            )}
            {activeFiltersCount > 3 && (
              <Badge variant="secondary" className="ml-1 h-4 px-1 text-xs">
                {activeFiltersCount - 3}
              </Badge>
            )}
          </MobileButton>
        </div>

        {/* Advanced Filters */}
        {showAdvancedFilters && (
          <div className="border-t border-elec-yellow/10 pt-4 space-y-4">
            {/* Price Range */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium flex items-center gap-2">
                  <PoundSterling className="h-4 w-4 text-elec-yellow" />
                  Price Range
                </label>
                <span className="text-sm text-muted-foreground">
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Select value={filters.duration} onValueChange={(value) => handleFilterChange("duration", value)}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="Any Duration">Any Duration</SelectItem>
                  <SelectItem value="1 day">1 day</SelectItem>
                  <SelectItem value="2 days">2 days</SelectItem>
                  <SelectItem value="3 days">3 days</SelectItem>
                  <SelectItem value="4 days">4 days</SelectItem>
                  <SelectItem value="5 days">5+ days</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.industryDemand} onValueChange={(value) => handleFilterChange("industryDemand", value)}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="Industry Demand" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="All">All Demand Levels</SelectItem>
                  <SelectItem value="High">High Demand</SelectItem>
                  <SelectItem value="Medium">Medium Demand</SelectItem>
                  <SelectItem value="Low">Low Demand</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.format} onValueChange={(value) => handleFilterChange("format", value)}>
                <SelectTrigger className="bg-background/50">
                  <SelectValue placeholder="Format" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="All Formats">All Formats</SelectItem>
                  <SelectItem value="Classroom">Classroom</SelectItem>
                  <SelectItem value="Online">Online</SelectItem>
                  <SelectItem value="Blended">Blended Learning</SelectItem>
                  <SelectItem value="Practical">Practical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Rating Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Star className="h-4 w-4 text-elec-yellow" />
                Minimum Rating
              </label>
              <div className="flex gap-2">
                 {[0, 3, 4, 4.5].map((rating) => (
                  <MobileButton
                    key={rating}
                    variant={filters.rating === rating ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleFilterChange("rating", rating)}
                    className={filters.rating === rating ? 
                      "bg-elec-yellow text-elec-dark" : 
                      "border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                    }
                  >
                    {rating === 0 ? "Any" : `${rating}+`}
                    {rating > 0 && <Star className="h-3 w-3 ml-1 fill-current" />}
                  </MobileButton>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Active Filters Display */}
        {activeFiltersCount > 0 && (
          <div className="border-t border-elec-yellow/10 pt-4">
            <div className="flex flex-wrap gap-2">
              {filters.searchQuery && (
                <Badge variant="outline" className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30">
                  Search: "{filters.searchQuery}"
                  <MobileButton
                    variant="ghost"
                    size="sm"
                    className="ml-1 h-4 w-4 p-0"
                    onClick={() => clearFilter("searchQuery")}
                  >
                    <X className="h-3 w-3" />
                  </MobileButton>
                </Badge>
              )}
              {filters.category !== "All Categories" && (
                <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30">
                  {filters.category}
                  <MobileButton
                    variant="ghost"
                    size="sm"
                    className="ml-1 h-4 w-4 p-0"
                    onClick={() => clearFilter("category")}
                  >
                    <X className="h-3 w-3" />
                  </MobileButton>
                </Badge>
              )}
              {filters.level !== "All Levels" && (
                <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30">
                  {filters.level}
                  <MobileButton
                    variant="ghost"
                    size="sm"
                    className="ml-1 h-4 w-4 p-0"
                    onClick={() => clearFilter("level")}
                  >
                    <X className="h-3 w-3" />
                  </MobileButton>
                </Badge>
              )}
              {filters.location !== "All Locations" && (
                <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/30">
                  <MapPin className="h-3 w-3 mr-1" />
                  {filters.location}
                  <MobileButton
                    variant="ghost"
                    size="sm"
                    className="ml-1 h-4 w-4 p-0"
                    onClick={() => clearFilter("location")}
                  >
                    <X className="h-3 w-3" />
                  </MobileButton>
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedCourseSearch;