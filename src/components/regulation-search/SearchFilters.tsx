
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X } from 'lucide-react';
import { cn } from '@/lib/utils';

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
        {!searchTerm && (
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        )}
        <Input
          type="text"
          placeholder="Search regulations, keywords, or numbers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={cn("bg-muted border-border text-foreground placeholder-gray-400", !searchTerm && "pl-10")}
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSearchTerm('')}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 text-gray-400 hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Filter Row - Mobile Optimized */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-400 font-medium">Filters:</span>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        <Select value={filterPart} onValueChange={setFilterPart}>
          <SelectTrigger className="bg-muted border-border text-foreground">
            <SelectValue placeholder="Part" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Parts</SelectItem>
            <SelectItem value="1">Part 1</SelectItem>
            <SelectItem value="4">Part 4</SelectItem>
            <SelectItem value="5">Part 5</SelectItem>
            <SelectItem value="6">Part 6</SelectItem>
            <SelectItem value="7">Part 7</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
          <SelectTrigger className="bg-muted border-border text-foreground">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="bg-muted border-border text-foreground">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="testing">Testing</SelectItem>
            <SelectItem value="protection">Protection</SelectItem>
            <SelectItem value="installation">Installation</SelectItem>
            <SelectItem value="special-locations">Special Locations</SelectItem>
            <SelectItem value="earthing">Earthing</SelectItem>
            <SelectItem value="cables">Cables</SelectItem>
            <SelectItem value="equipment">Equipment</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterFrequency} onValueChange={setFilterFrequency}>
          <SelectTrigger className="bg-muted border-border text-foreground">
            <SelectValue placeholder="Frequency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="common">Common</SelectItem>
            <SelectItem value="frequent">Frequent</SelectItem>
            <SelectItem value="occasional">Occasional</SelectItem>
          </SelectContent>
        </Select>

        <div className="col-span-2 md:col-span-1">
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllFilters}
              className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
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
          <span className="text-sm text-gray-400 block">Active filters:</span>
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
        <p className="text-gray-400 text-sm">
          Found {resultCount} regulation{resultCount !== 1 ? 's' : ''}
          {searchTerm && ` matching "${searchTerm}"`}
        </p>
      </div>
    </div>
  );
};

export default SearchFilters;
