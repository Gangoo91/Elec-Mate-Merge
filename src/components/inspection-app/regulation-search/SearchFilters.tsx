
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X } from 'lucide-react';

interface SearchFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterPart: string;
  setFilterPart: (part: string) => void;
  filterDifficulty: string;
  setFilterDifficulty: (difficulty: string) => void;
  filterCategory: string;
  setFilterCategory: (category: string) => void;
  filterFrequency: string;
  setFilterFrequency: (frequency: string) => void;
  resultCount: number;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  filterPart,
  setFilterPart,
  filterDifficulty,
  setFilterDifficulty,
  filterCategory,
  setFilterCategory,
  filterFrequency,
  setFilterFrequency,
  resultCount
}) => {
  const clearAllFilters = () => {
    setSearchTerm('');
    setFilterPart('all');
    setFilterDifficulty('all');
    setFilterCategory('all');
    setFilterFrequency('all');
  };

  const hasActiveFilters = searchTerm || filterPart !== 'all' || filterDifficulty !== 'all' || 
                          filterCategory !== 'all' || filterFrequency !== 'all';

  return (
    <div className="space-y-4">
      {/* Main Search */}
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/70" />
        <Input
          type="text"
          placeholder="Search regulations, keywords, or numbers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-muted border-border text-foreground placeholder-white/70"
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSearchTerm('')}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 text-white/70 hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Filter Row - Mobile Optimized */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-white/70" />
          <span className="text-sm text-white/70 font-medium">Filters:</span>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        <MobileSelectPicker
          value={filterPart}
          onValueChange={setFilterPart}
          options={[
            { value: 'all', label: 'All Parts' },
            { value: '1', label: 'Part 1' },
            { value: '4', label: 'Part 4' },
            { value: '5', label: 'Part 5' },
            { value: '6', label: 'Part 6' },
            { value: '7', label: 'Part 7' },
          ]}
          placeholder="Part"
          title="Filter by Part"
        />

        <MobileSelectPicker
          value={filterDifficulty}
          onValueChange={setFilterDifficulty}
          options={[
            { value: 'all', label: 'All Levels' },
            { value: 'beginner', label: 'Beginner' },
            { value: 'intermediate', label: 'Intermediate' },
            { value: 'advanced', label: 'Advanced' },
          ]}
          placeholder="Difficulty"
          title="Filter by Difficulty"
        />

        <MobileSelectPicker
          value={filterCategory}
          onValueChange={setFilterCategory}
          options={[
            { value: 'all', label: 'All Categories' },
            { value: 'testing', label: 'Testing' },
            { value: 'protection', label: 'Protection' },
            { value: 'installation', label: 'Installation' },
            { value: 'special-locations', label: 'Special Locations' },
            { value: 'earthing', label: 'Earthing' },
            { value: 'cables', label: 'Cables' },
            { value: 'equipment', label: 'Equipment' },
          ]}
          placeholder="Category"
          title="Filter by Category"
        />

        <MobileSelectPicker
          value={filterFrequency}
          onValueChange={setFilterFrequency}
          options={[
            { value: 'all', label: 'All' },
            { value: 'common', label: 'Common' },
            { value: 'frequent', label: 'Frequent' },
            { value: 'occasional', label: 'Occasional' },
          ]}
          placeholder="Frequency"
          title="Filter by Frequency"
        />

        <div className="col-span-2 md:col-span-1">
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllFilters}
              className="w-full border-white/20 text-white/80 hover:bg-white/10"
            >
              <X className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          )}
        </div>
        </div>
      </div>

      {/* Active Filters Display - Mobile Optimized */}
      {hasActiveFilters && (
        <div className="space-y-2">
          <span className="text-sm text-white/70 block">Active filters:</span>
          <div className="flex flex-wrap gap-2">
            {searchTerm && (
              <Badge variant="outline" className="border-elec-yellow text-elec-yellow">
                Search: {searchTerm}
              </Badge>
            )}
            {filterPart !== 'all' && (
              <Badge variant="outline" className="border-blue-400 text-blue-400">
                Part {filterPart}
              </Badge>
            )}
            {filterDifficulty !== 'all' && (
              <Badge variant="outline" className="border-green-400 text-green-400">
                {filterDifficulty}
              </Badge>
            )}
            {filterCategory !== 'all' && (
              <Badge variant="outline" className="border-purple-400 text-purple-400">
                {filterCategory.replace('-', ' ')}
              </Badge>
            )}
            {filterFrequency !== 'all' && (
              <Badge variant="outline" className="border-orange-400 text-orange-400">
                {filterFrequency}
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Results Counter */}
      <div className="text-center">
        <p className="text-white/70 text-sm">
          Found {resultCount} regulation{resultCount !== 1 ? 's' : ''}
          {searchTerm && ` matching "${searchTerm}"`}
        </p>
      </div>
    </div>
  );
};

export default SearchFilters;
