
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Filter, X } from "lucide-react";
import { educationCategories, studyModes } from "./enhancedEducationData";

interface EducationSearchFormProps {
  onSearch: (filters: SearchFilters) => void;
  onReset: () => void;
}

export interface SearchFilters {
  searchTerm: string;
  category: string;
  studyMode: string;
  location: string;
  level: string;
  fundingType: string;
  maxCost: string;
}

const EducationSearchForm = ({ onSearch, onReset }: EducationSearchFormProps) => {
  const [filters, setFilters] = useState<SearchFilters>({
    searchTerm: "",
    category: "",
    studyMode: "",
    location: "",
    level: "",
    fundingType: "",
    maxCost: ""
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onSearch(newFilters);
  };

  const handleReset = () => {
    const resetFilters: SearchFilters = {
      searchTerm: "",
      category: "",
      studyMode: "",
      location: "",
      level: "",
      fundingType: "",
      maxCost: ""
    };
    setFilters(resetFilters);
    onReset();
  };

  const activeFilterCount = Object.values(filters).filter(value => value !== "").length;

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses, institutions, or qualifications..."
              value={filters.searchTerm}
              onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Quick Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={filters.category} onValueChange={(value) => handleFilterChange("category", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {educationCategories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filters.studyMode} onValueChange={(value) => handleFilterChange("studyMode", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Study mode" />
              </SelectTrigger>
              <SelectContent>
                {studyModes.map((mode) => (
                  <SelectItem key={mode} value={mode}>{mode}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Location or region"
                value={filters.location}
                onChange={(e) => handleFilterChange("location", e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Advanced Filters Toggle */}
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-elec-yellow hover:text-amber-400"
            >
              <Filter className="mr-2 h-4 w-4" />
              Advanced Filters {showAdvanced ? "▲" : "▼"}
            </Button>

            {activeFilterCount > 0 && (
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-elec-yellow/10 text-elec-yellow">
                  {activeFilterCount} active filter{activeFilterCount !== 1 ? 's' : ''}
                </Badge>
                <Button variant="ghost" size="sm" onClick={handleReset}>
                  <X className="h-4 w-4" />
                  Clear all
                </Button>
              </div>
            )}
          </div>

          {/* Advanced Filters */}
          {showAdvanced && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-elec-yellow/20">
              <Select value={filters.level} onValueChange={(value) => handleFilterChange("level", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Education level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Level 4">Level 4 (HNC)</SelectItem>
                  <SelectItem value="Level 5">Level 5 (HND/Foundation)</SelectItem>
                  <SelectItem value="Level 6">Level 6 (Bachelor's)</SelectItem>
                  <SelectItem value="Level 7">Level 7 (Master's)</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.fundingType} onValueChange={(value) => handleFilterChange("fundingType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Funding type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Student Finance">Student Finance</SelectItem>
                  <SelectItem value="Advanced Learner Loan">Advanced Learner Loan</SelectItem>
                  <SelectItem value="Employer Sponsorship">Employer Sponsorship</SelectItem>
                  <SelectItem value="Scholarships">Scholarships</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.maxCost} onValueChange={(value) => handleFilterChange("maxCost", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Maximum cost" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="£3000">Under £3,000</SelectItem>
                  <SelectItem value="£6000">Under £6,000</SelectItem>
                  <SelectItem value="£10000">Under £10,000</SelectItem>
                  <SelectItem value="unlimited">Any cost</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EducationSearchForm;
