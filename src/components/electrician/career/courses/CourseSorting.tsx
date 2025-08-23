
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowUpDown, ArrowUp, ArrowDown, Calendar, Star, 
  PoundSterling, TrendingUp, Users, Clock 
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface SortOption {
  key: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  direction: "asc" | "desc";
}

export const sortOptions: SortOption[] = [
  { key: "relevance", label: "Relevance", icon: TrendingUp, direction: "desc" },
  { key: "rating", label: "Rating", icon: Star, direction: "desc" },
  { key: "price-low", label: "Price (Low to High)", icon: PoundSterling, direction: "asc" },
  { key: "price-high", label: "Price (High to Low)", icon: PoundSterling, direction: "desc" },
  { key: "duration", label: "Duration", icon: Clock, direction: "asc" },
  { key: "demand", label: "Industry Demand", icon: TrendingUp, direction: "desc" },
  { key: "future-proof", label: "Future Proofing", icon: TrendingUp, direction: "desc" },
  { key: "title", label: "Alphabetical", icon: ArrowUpDown, direction: "asc" },
  { key: "provider", label: "Provider", icon: Users, direction: "asc" },
  { key: "next-date", label: "Next Available Date", icon: Calendar, direction: "asc" }
];

interface CourseSortingProps {
  currentSort: string;
  onSortChange: (sortKey: string) => void;
  totalResults: number;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
}

const CourseSorting = ({ 
  currentSort, 
  onSortChange, 
  totalResults, 
  viewMode, 
  onViewModeChange 
}: CourseSortingProps) => {
  const currentSortOption = sortOptions.find(option => option.key === currentSort);

  return (
    <div className="flex flex-col gap-4 p-3 sm:p-4 border border-elec-yellow/20 rounded-lg bg-elec-gray/50">
      {/* Top row - Sort controls */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <span className="text-sm font-medium whitespace-nowrap">Sort by:</span>
        
        {/* Desktop: Button Group */}
        <div className="hidden lg:flex gap-2 flex-wrap">
          {sortOptions.slice(0, 4).map((option) => {
            const Icon = option.icon;
            const isActive = currentSort === option.key;
            
            return (
              <Button
                key={option.key}
                variant={isActive ? "default" : "outline"}
                size="sm"
                onClick={() => onSortChange(option.key)}
                className={isActive ? 
                  "bg-elec-yellow text-elec-dark" : 
                  "border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
                }
              >
                <Icon className="h-3 w-3 mr-1" />
                <span className="hidden xl:inline">{option.label}</span>
                <span className="xl:hidden">{option.label.split(' ')[0]}</span>
                {isActive && (
                  <span className="ml-1">
                    {option.direction === "asc" ? 
                      <ArrowUp className="h-3 w-3" /> : 
                      <ArrowDown className="h-3 w-3" />
                    }
                  </span>
                )}
              </Button>
            );
          })}
          
          {/* More Options Dropdown */}
          <Select value={currentSort} onValueChange={onSortChange}>
            <SelectTrigger className="w-28 bg-background/50">
              <SelectValue placeholder="More..." />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              {sortOptions.slice(4).map((option) => {
                const Icon = option.icon;
                return (
                  <SelectItem key={option.key} value={option.key}>
                    <div className="flex items-center gap-2">
                      <Icon className="h-3 w-3" />
                      {option.label}
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        {/* Mobile/Tablet: Single Dropdown */}
        <div className="lg:hidden flex-1 min-w-0">
          <Select value={currentSort} onValueChange={onSortChange}>
            <SelectTrigger className="bg-background/50 w-full">
              <SelectValue placeholder="Select sort option" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              {sortOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <SelectItem key={option.key} value={option.key}>
                    <div className="flex items-center gap-2">
                      <Icon className="h-3 w-3" />
                      {option.label}
                      {option.direction === "asc" ? 
                        <ArrowUp className="h-3 w-3 ml-auto" /> : 
                        <ArrowDown className="h-3 w-3 ml-auto" />
                      }
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Bottom row - Results and view controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <Badge variant="outline" className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30 whitespace-nowrap">
            {totalResults} courses
          </Badge>
          
          {currentSortOption && (
            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
              <span>Sorted by {currentSortOption.label}</span>
              {currentSortOption.direction === "asc" ? 
                <ArrowUp className="h-3 w-3" /> : 
                <ArrowDown className="h-3 w-3" />
              }
            </div>
          )}
        </div>

        {/* View Mode Toggle */}
        <div className="flex border border-elec-yellow/20 rounded overflow-hidden self-start sm:self-auto">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewModeChange("grid")}
            className={`rounded-none border-none px-3 ${
              viewMode === "grid" ? 
                "bg-elec-yellow text-elec-dark" : 
                "text-elec-yellow hover:bg-elec-yellow/10"
            }`}
          >
            <div className="grid grid-cols-2 gap-0.5 h-3 w-3">
              <div className="bg-current rounded-sm"></div>
              <div className="bg-current rounded-sm"></div>
              <div className="bg-current rounded-sm"></div>
              <div className="bg-current rounded-sm"></div>
            </div>
            <span className="ml-2 hidden sm:inline">Grid</span>
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewModeChange("list")}
            className={`rounded-none border-none px-3 ${
              viewMode === "list" ? 
                "bg-elec-yellow text-elec-dark" : 
                "text-elec-yellow hover:bg-elec-yellow/10"
            }`}
          >
            <div className="space-y-0.5 h-3 w-3">
              <div className="h-0.5 w-full bg-current rounded-sm"></div>
              <div className="h-0.5 w-full bg-current rounded-sm"></div>
              <div className="h-0.5 w-full bg-current rounded-sm"></div>
            </div>
            <span className="ml-2 hidden sm:inline">List</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseSorting;
