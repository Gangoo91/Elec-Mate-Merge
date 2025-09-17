import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";

interface CourseSearchFilters {
  searchTerm: string;
  category: string;
  level: string;
  format: string;
  location: string;
  provider: string;
  maxPrice: string;
  duration: string;
  sortBy: string;
}

interface CourseSearchFormProps {
  onSearch: (filters: CourseSearchFilters) => void;
  onReset: () => void;
}

const CourseSearchForm = ({ onSearch, onReset }: CourseSearchFormProps) => {
  const [filters, setFilters] = useState<CourseSearchFilters>({
    searchTerm: "",
    category: "",
    level: "",
    format: "",
    location: "",
    provider: "",
    maxPrice: "",
    duration: "",
    sortBy: "relevance"
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleFilterChange = (key: keyof CourseSearchFilters, value: string) => {
    const newFilters = { ...filters, [key]: value === "all" ? "" : value };
    setFilters(newFilters);
    onSearch(newFilters);
  };

  const handleReset = () => {
    const resetFilters: CourseSearchFilters = {
      searchTerm: "",
      category: "",
      level: "",
      format: "",
      location: "",
      provider: "",
      maxPrice: "",
      duration: "",
      sortBy: "relevance"
    };
    setFilters(resetFilters);
    onReset();
  };

  const getActiveFilterCount = () => {
    return Object.entries(filters).filter(([key, value]) => 
      key !== 'sortBy' && value.length > 0
    ).length;
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <Card className="w-full bg-elec-card border-elec-yellow/10">
      <CardContent className="p-6 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-4 w-4" />
          <Input
            placeholder="Search courses, providers, or keywords..."
            value={filters.searchTerm}
            onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
            className="pl-10 bg-background/50 border-elec-yellow/20 text-white placeholder-white/60"
          />
        </div>

        {/* Quick Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
            <SelectTrigger className="bg-background/50 border-elec-yellow/20">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Electrical Installation">Electrical Installation</SelectItem>
              <SelectItem value="Inspection & Testing">Inspection & Testing</SelectItem>
              <SelectItem value="Renewable Energy">Renewable Energy</SelectItem>
              <SelectItem value="Industrial Systems">Industrial Systems</SelectItem>
              <SelectItem value="Health & Safety">Health & Safety</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.format} onValueChange={(value) => handleFilterChange('format', value)}>
            <SelectTrigger className="bg-background/50 border-elec-yellow/20">
              <SelectValue placeholder="Study Mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Formats</SelectItem>
              <SelectItem value="Online">Online</SelectItem>
              <SelectItem value="In-Person">In-Person</SelectItem>
              <SelectItem value="Hybrid">Hybrid</SelectItem>
              <SelectItem value="Part-time">Part-time</SelectItem>
              <SelectItem value="Full-time">Full-time</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.location} onValueChange={(value) => handleFilterChange('location', value)}>
            <SelectTrigger className="bg-background/50 border-elec-yellow/20">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="London">London</SelectItem>
              <SelectItem value="Manchester">Manchester</SelectItem>
              <SelectItem value="Birmingham">Birmingham</SelectItem>
              <SelectItem value="Leeds">Leeds</SelectItem>
              <SelectItem value="Glasgow">Glasgow</SelectItem>
              <SelectItem value="Bristol">Bristol</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Advanced Filters Toggle */}
        <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
          <div className="flex items-center justify-between">
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="text-elec-yellow hover:text-elec-yellow/80 p-0">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Advanced Filters
                <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            <div className="flex items-center gap-2">
              {activeFilterCount > 0 && (
                <>
                  <Badge variant="secondary" className="bg-elec-yellow/10 text-elec-yellow">
                    {activeFilterCount} active
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleReset}
                    className="text-white/60 hover:text-white p-1"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          </div>

          <CollapsibleContent className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Select value={filters.level} onValueChange={(value) => handleFilterChange('level', value)}>
                <SelectTrigger className="bg-background/50 border-elec-yellow/20">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                  <SelectItem value="Level 2">Level 2</SelectItem>
                  <SelectItem value="Level 3">Level 3</SelectItem>
                  <SelectItem value="Level 4">Level 4</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.provider} onValueChange={(value) => handleFilterChange('provider', value)}>
                <SelectTrigger className="bg-background/50 border-elec-yellow/20">
                  <SelectValue placeholder="Provider Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Providers</SelectItem>
                  <SelectItem value="College">College</SelectItem>
                  <SelectItem value="Training Centre">Training Centre</SelectItem>
                  <SelectItem value="University">University</SelectItem>
                  <SelectItem value="Private Provider">Private Provider</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.maxPrice} onValueChange={(value) => handleFilterChange('maxPrice', value)}>
                <SelectTrigger className="bg-background/50 border-elec-yellow/20">
                  <SelectValue placeholder="Max Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Price</SelectItem>
                  <SelectItem value="500">Under £500</SelectItem>
                  <SelectItem value="1000">Under £1,000</SelectItem>
                  <SelectItem value="2000">Under £2,000</SelectItem>
                  <SelectItem value="5000">Under £5,000</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.duration} onValueChange={(value) => handleFilterChange('duration', value)}>
                <SelectTrigger className="bg-background/50 border-elec-yellow/20">
                  <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Duration</SelectItem>
                  <SelectItem value="1">1 day</SelectItem>
                  <SelectItem value="3">Up to 3 days</SelectItem>
                  <SelectItem value="7">Up to 1 week</SelectItem>
                  <SelectItem value="30">Up to 1 month</SelectItem>
                  <SelectItem value="90">Up to 3 months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default CourseSearchForm;