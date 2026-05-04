import { useState } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, Filter, X } from 'lucide-react';
import { siteJargonCategories } from '@/data/apprentice/siteJargonData';
import { cn } from '@/lib/utils';

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
  filteredCount,
}: SearchAndFilterProps) => {
  const [showFilters, setShowFilters] = useState(false);

  const clearFilters = () => {
    onSearchChange('');
    onCategoryChange('all');
    onDifficultyChange('all');
    onTagsChange([]);
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter((t) => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  const hasActiveFilters =
    searchTerm ||
    selectedCategory !== 'all' ||
    selectedDifficulty !== 'all' ||
    selectedTags.length > 0;

  return (
    <div className="space-y-4">
      <div className="relative">
        {!searchTerm && (
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/55 pointer-events-none" />
        )}
        <Input
          placeholder="Search terms, definitions, or usage examples..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className={cn(
            'h-11 pr-12 text-base touch-manipulation border-white/15 focus:border-elec-yellow focus:ring-elec-yellow',
            !searchTerm && 'pl-10'
          )}
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSearchChange('')}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-white/[0.05]"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="h-9 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
          {hasActiveFilters && (
            <span className="text-[10px] uppercase tracking-[0.18em] text-elec-yellow ml-1">
              Active
            </span>
          )}
        </Button>

        <span className="text-[12px] text-white/55">
          {filteredCount} of {totalTerms} terms
        </span>
      </div>

      {showFilters && (
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Category
              </span>
              <Select value={selectedCategory} onValueChange={onCategoryChange}>
                <SelectTrigger className="h-11 touch-manipulation">
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  {siteJargonCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Difficulty
              </span>
              <Select value={selectedDifficulty} onValueChange={onDifficultyChange}>
                <SelectTrigger className="h-11 touch-manipulation">
                  <SelectValue placeholder="All levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All levels</SelectItem>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {availableTags.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Tags
              </span>
              <div className="flex flex-wrap gap-1.5">
                {availableTags.map((tag) => {
                  const active = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={cn(
                        'text-[12px] px-2 py-0.5 rounded-md border touch-manipulation transition-colors',
                        active
                          ? 'bg-elec-yellow text-black border-elec-yellow'
                          : 'text-white/85 border-white/10 bg-white/[0.03] hover:bg-white/[0.05]'
                      )}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {hasActiveFilters && (
            <div className="flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="h-9 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default JargonSearchAndFilter;
