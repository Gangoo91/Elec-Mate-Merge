import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, RotateCcw, X } from 'lucide-react';
import { accreditationCategories, accreditationLevels } from './enhancedAccreditationData';
import { cn } from '@/lib/utils';

export interface AccreditationSearchFilters {
  searchTerm: string;
  category: string;
  level: string;
  onlineOnly: boolean;
  maxCost: string;
  provider: string;
}

interface AccreditationSearchFormProps {
  onSearch: (filters: AccreditationSearchFilters) => void;
  onReset: () => void;
  resultsCount: number;
}

const AccreditationSearchForm = ({
  onSearch,
  onReset,
  resultsCount,
}: AccreditationSearchFormProps) => {
  const [filters, setFilters] = useState<AccreditationSearchFilters>({
    searchTerm: '',
    category: 'All Categories',
    level: 'All Levels',
    onlineOnly: false,
    maxCost: '',
    provider: '',
  });

  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleSearch = () => {
    onSearch(filters);
    updateActiveFilters();
  };

  const handleReset = () => {
    const resetFilters = {
      searchTerm: '',
      category: 'All Categories',
      level: 'All Levels',
      onlineOnly: false,
      maxCost: '',
      provider: '',
    };
    setFilters(resetFilters);
    setActiveFilters([]);
    onReset();
  };

  const updateActiveFilters = () => {
    const active: string[] = [];
    if (filters.searchTerm) active.push(`Search: "${filters.searchTerm}"`);
    if (filters.category !== 'All Categories') active.push(`Category: ${filters.category}`);
    if (filters.level !== 'All Levels') active.push(`Level: ${filters.level}`);
    if (filters.onlineOnly) active.push('Online Available');
    if (filters.maxCost) active.push(`Max Cost: ${filters.maxCost}`);
    if (filters.provider) active.push(`Provider: ${filters.provider}`);
    setActiveFilters(active);
  };

  const removeFilter = (filterToRemove: string) => {
    const newFilters = { ...filters };

    if (filterToRemove.startsWith('Search:')) {
      newFilters.searchTerm = '';
    } else if (filterToRemove.startsWith('Category:')) {
      newFilters.category = 'All Categories';
    } else if (filterToRemove.startsWith('Level:')) {
      newFilters.level = 'All Levels';
    } else if (filterToRemove === 'Online Available') {
      newFilters.onlineOnly = false;
    } else if (filterToRemove.startsWith('Max Cost:')) {
      newFilters.maxCost = '';
    } else if (filterToRemove.startsWith('Provider:')) {
      newFilters.provider = '';
    }

    setFilters(newFilters);
    onSearch(newFilters);
    updateActiveFilters();
  };

  const costRanges = ['All Costs', 'Under £200', '£200-£500', '£500-£1000', 'Over £1000'];
  const providers = ['All Providers', 'IET', 'ECA', 'NICEIC', 'IOSH', 'CITB', 'CompEx', 'MCS'];

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          {!filters.searchTerm && (
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/55 pointer-events-none" />
          )}
          <Input
            placeholder="Search accreditations, providers, or specialities..."
            value={filters.searchTerm}
            onChange={(e) => setFilters((prev) => ({ ...prev, searchTerm: e.target.value }))}
            className={cn(
              'h-11 text-base touch-manipulation bg-white/[0.03] border-white/10 text-white placeholder:text-white/40 focus:border-yellow-500 focus:ring-yellow-500',
              !filters.searchTerm && 'pl-10'
            )}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <Button
          onClick={handleSearch}
          className="h-11 bg-elec-yellow text-black hover:bg-elec-yellow/90 px-6 touch-manipulation"
        >
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Select
          value={filters.category}
          onValueChange={(value) => setFilters((prev) => ({ ...prev, category: value }))}
        >
          <SelectTrigger className="h-11 touch-manipulation bg-white/[0.03] border-white/10 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-elec-gray border-white/10">
            {accreditationCategories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.level}
          onValueChange={(value) => setFilters((prev) => ({ ...prev, level: value }))}
        >
          <SelectTrigger className="h-11 touch-manipulation bg-white/[0.03] border-white/10 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-elec-gray border-white/10">
            {accreditationLevels.map((level) => (
              <SelectItem key={level} value={level}>
                {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.maxCost}
          onValueChange={(value) => setFilters((prev) => ({ ...prev, maxCost: value }))}
        >
          <SelectTrigger className="h-11 touch-manipulation bg-white/[0.03] border-white/10 text-white">
            <SelectValue placeholder="Cost range" />
          </SelectTrigger>
          <SelectContent className="bg-elec-gray border-white/10">
            {costRanges.map((range) => (
              <SelectItem key={range} value={range}>
                {range}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.provider}
          onValueChange={(value) => setFilters((prev) => ({ ...prev, provider: value }))}
        >
          <SelectTrigger className="h-11 touch-manipulation bg-white/[0.03] border-white/10 text-white">
            <SelectValue placeholder="Provider" />
          </SelectTrigger>
          <SelectContent className="bg-elec-gray border-white/10">
            {providers.map((provider) => (
              <SelectItem key={provider} value={provider}>
                {provider}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <label className="flex items-center gap-2 text-[14px] text-white/85 cursor-pointer touch-manipulation">
          <input
            type="checkbox"
            checked={filters.onlineOnly}
            onChange={(e) => setFilters((prev) => ({ ...prev, onlineOnly: e.target.checked }))}
            className="w-4 h-4 rounded border-white/20 bg-white/[0.03] text-elec-yellow focus:ring-elec-yellow/50"
          />
          Online available only
        </label>

        <div className="flex items-center gap-3">
          <span className="text-[12px] text-white/55 font-mono">
            {resultsCount} {resultsCount === 1 ? 'result' : 'results'}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="h-9 border-white/10 bg-white/[0.03] text-white hover:bg-white/[0.06] touch-manipulation"
          >
            <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
            Reset
          </Button>
        </div>
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-white/[0.06]">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Active filters
          </span>
          {activeFilters.map((filter, idx) => (
            <span
              key={idx}
              className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] flex items-center gap-1.5"
            >
              {filter}
              <button
                onClick={() => removeFilter(filter)}
                className="hover:text-white text-white/55"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccreditationSearchForm;
