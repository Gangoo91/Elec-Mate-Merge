
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Filter, X } from "lucide-react";
import { siteJargonCategories } from "@/data/apprentice/siteJargonData";

interface SearchAndFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedDifficulty: string;
  onDifficultyChange: (difficulty: string) => void;
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  availableTags: string[];
  totalTerms: number;
  filteredCount: number;
}

const JargonSearchAndFilter = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedDifficulty,
  onDifficultyChange,
  selectedTags,
  onTagsChange,
  availableTags,
  totalTerms,
  filteredCount
}: SearchAndFilterProps) => {
  const [showFilters, setShowFilters] = useState(false);

  const clearFilters = () => {
    onSearchChange("");
    onCategoryChange("all");
    onDifficultyChange("all");
    onTagsChange([]);
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter(t => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  const hasActiveFilters = searchTerm || selectedCategory !== "all" || selectedDifficulty !== "all" || selectedTags.length > 0;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search terms, definitions, or usage examples..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-12"
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSearchChange("")}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
          {hasActiveFilters && (
            <Badge variant="secondary" className="ml-1">
              Active
            </Badge>
          )}
        </Button>

        <div className="text-sm text-muted-foreground">
          Showing {filteredCount} of {totalTerms} terms
        </div>
      </div>

      {/* Expandable Filters */}
      {showFilters && (
        <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select value={selectedCategory} onValueChange={onCategoryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {siteJargonCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Difficulty Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Difficulty</label>
              <Select value={selectedDifficulty} onValueChange={onDifficultyChange}>
                <SelectTrigger>
                  <SelectValue placeholder="All levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tags Filter */}
          {availableTags.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Tags</label>
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary/80"
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Clear Filters */}
          {hasActiveFilters && (
            <div className="flex justify-end">
              <Button variant="outline" size="sm" onClick={clearFilters}>
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JargonSearchAndFilter;
