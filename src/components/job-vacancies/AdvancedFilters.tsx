import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { 
  Filter, 
  X, 
  Search,
  MapPin,
  BanknoteIcon,
  Calendar,
  Briefcase,
  Clock,
  Building2,
  Award,
  Sliders
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface FilterCriteria {
  keywords: string;
  location: string;
  radius: number;
  salaryMin: number;
  salaryMax: number;
  jobTypes: string[];
  companies: string[];
  postedWithin: string;
  experience: string[];
  skills: string[];
  remote: boolean;
  hasAccommodation: boolean;
  partTime: boolean;
  contract: boolean;
  apprenticeship: boolean;
}

interface AdvancedFiltersProps {
  filters: FilterCriteria;
  onFiltersChange: (filters: FilterCriteria) => void;
  onApplyFilters: () => void;
  onResetFilters: () => void;
  availableCompanies: string[];
  availableSkills: string[];
  isLoading: boolean;
}

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  filters,
  onFiltersChange,
  onApplyFilters,
  onResetFilters,
  availableCompanies,
  availableSkills,
  isLoading
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const jobTypes = [
    "Full-time",
    "Part-time", 
    "Contract",
    "Temporary",
    "Apprenticeship",
    "Permanent"
  ];

  const experienceLevels = [
    "Entry Level",
    "Apprentice",
    "1-2 years",
    "3-5 years",
    "5-10 years",
    "10+ years",
    "Senior Level"
  ];

  const postedWithinOptions = [
    { value: "1", label: "Last 24 hours" },
    { value: "3", label: "Last 3 days" },
    { value: "7", label: "Last week" },
    { value: "14", label: "Last 2 weeks" },
    { value: "30", label: "Last month" },
    { value: "all", label: "Any time" }
  ];

  const updateFilter = <K extends keyof FilterCriteria>(
    key: K,
    value: FilterCriteria[K]
  ) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleArrayFilter = <K extends keyof FilterCriteria>(
    key: K,
    value: string
  ) => {
    const currentArray = filters[key] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    updateFilter(key, newArray as FilterCriteria[K]);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.keywords) count++;
    if (filters.location) count++;
    if (filters.salaryMin > 0 || filters.salaryMax < 100000) count++;
    if (filters.jobTypes.length > 0) count++;
    if (filters.companies.length > 0) count++;
    if (filters.postedWithin !== "all") count++;
    if (filters.experience.length > 0) count++;
    if (filters.skills.length > 0) count++;
    if (filters.remote || filters.hasAccommodation) count++;
    return count;
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-card w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-elec-light">
            <Filter className="h-5 w-5 text-elec-yellow" />
            Advanced Filters
            {getActiveFiltersCount() > 0 && (
              <Badge className="bg-elec-yellow text-elec-dark">
                {getActiveFiltersCount()}
              </Badge>
            )}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-muted-foreground hover:text-elec-yellow"
          >
            <Sliders className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Quick Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Keywords */}
          <div className="space-y-2">
            <Label className="text-elec-yellow flex items-center gap-2">
              <Search className="h-4 w-4" />
              Keywords
            </Label>
            <Input
              placeholder="Job title, skills, company..."
              value={filters.keywords}
              onChange={(e) => updateFilter('keywords', e.target.value)}
              className="bg-elec-gray border-elec-yellow/30 text-elec-light"
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label className="text-elec-yellow flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Location
            </Label>
            <Input
              placeholder="City, postcode, or region..."
              value={filters.location}
              onChange={(e) => updateFilter('location', e.target.value)}
              className="bg-elec-gray border-elec-yellow/30 text-elec-light"
            />
          </div>
        </div>

        {/* Search Radius */}
        {filters.location && (
          <div className="space-y-3">
            <Label className="text-elec-yellow">
              Search Radius: {filters.radius} miles
            </Label>
            <Slider
              value={[filters.radius]}
              onValueChange={(value) => updateFilter('radius', value[0])}
              max={100}
              min={5}
              step={5}
              className="w-full"
            />
          </div>
        )}

        {isExpanded && (
          <div className="space-y-6 border-t border-elec-yellow/20 pt-6">
            {/* Salary Range */}
            <div className="space-y-3">
              <Label className="text-elec-yellow flex items-center gap-2">
                <BanknoteIcon className="h-4 w-4" />
                Salary Range
              </Label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  placeholder="Min £"
                  value={filters.salaryMin || ""}
                  onChange={(e) => updateFilter('salaryMin', parseInt(e.target.value) || 0)}
                  className="bg-elec-gray border-elec-yellow/30 text-elec-light"
                />
                <Input
                  type="number"
                  placeholder="Max £"
                  value={filters.salaryMax === 100000 ? "" : filters.salaryMax}
                  onChange={(e) => updateFilter('salaryMax', parseInt(e.target.value) || 100000)}
                  className="bg-elec-gray border-elec-yellow/30 text-elec-light"
                />
              </div>
            </div>

            {/* Job Types */}
            <div className="space-y-3">
              <Label className="text-elec-yellow flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Job Types
              </Label>
              <div className="flex flex-wrap gap-2">
                {jobTypes.map(type => (
                  <Badge
                    key={type}
                    variant={filters.jobTypes.includes(type) ? "default" : "outline"}
                    className={cn(
                      "cursor-pointer transition-colors",
                      filters.jobTypes.includes(type) 
                        ? "bg-elec-yellow text-elec-dark" 
                        : "border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                    )}
                    onClick={() => toggleArrayFilter('jobTypes', type)}
                  >
                    {type}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Posted Within */}
            <div className="space-y-2">
              <Label className="text-elec-yellow flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Posted Within
              </Label>
              <Select 
                value={filters.postedWithin} 
                onValueChange={(value) => updateFilter('postedWithin', value)}
              >
                <SelectTrigger className="bg-elec-gray border-elec-yellow/30 text-elec-light">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {postedWithinOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Experience Level */}
            <div className="space-y-3">
              <Label className="text-elec-yellow flex items-center gap-2">
                <Award className="h-4 w-4" />
                Experience Level
              </Label>
              <div className="flex flex-wrap gap-2">
                {experienceLevels.map(level => (
                  <Badge
                    key={level}
                    variant={filters.experience.includes(level) ? "default" : "outline"}
                    className={cn(
                      "cursor-pointer transition-colors",
                      filters.experience.includes(level) 
                        ? "bg-elec-yellow text-elec-dark" 
                        : "border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                    )}
                    onClick={() => toggleArrayFilter('experience', level)}
                  >
                    {level}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Companies */}
            {availableCompanies.length > 0 && (
              <div className="space-y-3">
                <Label className="text-elec-yellow flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Companies
                </Label>
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                  {availableCompanies.slice(0, 15).map(company => (
                    <Badge
                      key={company}
                      variant={filters.companies.includes(company) ? "default" : "outline"}
                      className={cn(
                        "cursor-pointer transition-colors",
                        filters.companies.includes(company) 
                          ? "bg-elec-yellow text-elec-dark" 
                          : "border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                      )}
                      onClick={() => toggleArrayFilter('companies', company)}
                    >
                      {company}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Options */}
            <div className="space-y-3">
              <Label className="text-elec-yellow">Additional Options</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={filters.remote}
                    onCheckedChange={(checked) => updateFilter('remote', !!checked)}
                  />
                  <label className="text-sm text-muted-foreground">Remote work available</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={filters.hasAccommodation}
                    onCheckedChange={(checked) => updateFilter('hasAccommodation', !!checked)}
                  />
                  <label className="text-sm text-muted-foreground">Accommodation provided</label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-elec-yellow/20">
          <Button
            onClick={onApplyFilters}
            disabled={isLoading}
            className="flex-1 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
          >
            {isLoading ? (
              <>
                <Clock className="mr-2 h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Apply Filters
              </>
            )}
          </Button>
          
          <Button
            variant="outline"
            onClick={onResetFilters}
            className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
          >
            <X className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvancedFilters;