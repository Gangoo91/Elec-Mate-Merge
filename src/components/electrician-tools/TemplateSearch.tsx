
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, X } from "lucide-react";
import { DocumentTemplate } from "@/services/documentTemplateService";

interface TemplateSearchProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: TemplateFilters) => void;
  totalCount: number;
  filteredCount: number;
}

export interface TemplateFilters {
  category: string;
  difficulty: string;
  ukSpecific: boolean;
  regulationCompliant: string;
}

const TemplateSearch = ({ onSearch, onFilterChange, totalCount, filteredCount }: TemplateSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<TemplateFilters>({
    category: "all",
    difficulty: "all",
    ukSpecific: false,
    regulationCompliant: "all"
  });
  const [showFilters, setShowFilters] = useState(false);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  const handleFilterChange = (key: keyof TemplateFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters: TemplateFilters = {
      category: "all",
      difficulty: "all",
      ukSpecific: false,
      regulationCompliant: "all"
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters = filters.category !== "all" || 
                          filters.difficulty !== "all" || 
                          filters.ukSpecific || 
                          filters.regulationCompliant !== "all";

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search templates by name, description, or category..."
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10 pr-20"
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
        >
          <Filter className="h-4 w-4 mr-1" />
          Filters
          {hasActiveFilters && (
            <Badge variant="secondary" className="ml-2 px-1.5 py-0.5 text-xs">
              {Object.values(filters).filter(v => v && v !== "all").length}
            </Badge>
          )}
        </Button>
      </div>

      {/* Clear filters button - only show when filters are active */}
      {hasActiveFilters && (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-xs"
          >
            <X className="h-3 w-3 mr-1" />
            Clear filters
          </Button>
        </div>
      )}

      {/* Filters Panel */}
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-elec-gray/30 rounded-lg border border-elec-yellow/20">
          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Select value={filters.category} onValueChange={(value) => handleFilterChange("category", value)}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="invoicing">Invoicing & Quotes</SelectItem>
                <SelectItem value="certification">Certificates</SelectItem>
                <SelectItem value="health_safety">Health & Safety</SelectItem>
                <SelectItem value="compliance">Compliance</SelectItem>
                <SelectItem value="contracts">Contracts</SelectItem>
                <SelectItem value="business">Business</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Difficulty Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Difficulty</label>
            <Select value={filters.difficulty} onValueChange={(value) => handleFilterChange("difficulty", value)}>
              <SelectTrigger>
                <SelectValue placeholder="All Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* UK Specific Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">UK Specific</label>
            <Select 
              value={filters.ukSpecific ? "true" : "false"} 
              onValueChange={(value) => handleFilterChange("ukSpecific", value === "true")}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Templates" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="false">All Templates</SelectItem>
                <SelectItem value="true">UK Specific Only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Regulation Compliance Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Regulations</label>
            <Select value={filters.regulationCompliant} onValueChange={(value) => handleFilterChange("regulationCompliant", value)}>
              <SelectTrigger>
                <SelectValue placeholder="All Regulations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regulations</SelectItem>
                <SelectItem value="BS 7671">BS 7671</SelectItem>
                <SelectItem value="VAT Regulations">VAT Regulations</SelectItem>
                <SelectItem value="CDM Regulations 2015">CDM Regulations</SelectItem>
                <SelectItem value="Health and Safety at Work Act 1974">HASAWA 1974</SelectItem>
                <SelectItem value="Part P Building Regulations">Part P</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateSearch;
