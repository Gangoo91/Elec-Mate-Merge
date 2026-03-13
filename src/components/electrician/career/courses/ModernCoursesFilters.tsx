import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, SlidersHorizontal, ArrowUpDown, PoundSterling } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { EnhancedCareerCourse } from '@/components/apprentice/career/courses/enhancedCoursesData';

export interface CourseFilters {
  searchTerm: string;
  category: string;
  level: string;
  format: string;
  location: string;
  sortBy: string;
}

interface ModernCoursesFiltersProps {
  courses: EnhancedCareerCourse[];
  filters: CourseFilters;
  onFiltersChange: (filters: CourseFilters) => void;
  onReset: () => void;
  resultCount: number;
  onFundingCalculator?: () => void;
}

const sortOptions = [
  { value: 'rating', label: 'Top Rated' },
  { value: 'demand', label: 'Demand' },
  { value: 'title', label: 'A-Z' },
  { value: 'duration', label: 'Shortest' },
  { value: 'price', label: 'Price' },
];

const ModernCoursesFilters = ({
  courses,
  filters,
  onFiltersChange,
  onReset,
  resultCount,
  onFundingCalculator,
}: ModernCoursesFiltersProps) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Extract unique values for filter options
  const levels = Array.from(new Set(courses.map((c) => c.level))).sort();
  const formats = Array.from(new Set(courses.map((c) => c.format.split(',')[0].trim()))).sort();

  const handleFilterChange = (key: keyof CourseFilters, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      searchTerm: '',
      category: '',
      level: '',
      format: '',
      location: '',
      sortBy: 'rating',
    });
    onReset();
  };

  const activeFiltersCount = [
    filters.category,
    filters.level,
    filters.format,
    filters.location,
  ].filter(Boolean).length;

  return (
    <motion.div
      id="courses-filters"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="space-y-3"
    >
      {/* Filter Controls Row */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Advanced Filters Toggle */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="h-11 bg-white/5 border-white/10 text-white hover:text-white hover:bg-white/10 gap-2 touch-manipulation active:scale-[0.98]"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge className="bg-blue-500 text-white text-[10px] px-1.5 ml-1">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>

        {/* Sort Dropdown */}
        <Select
          value={filters.sortBy}
          onValueChange={(value) => handleFilterChange('sortBy', value)}
        >
          <SelectTrigger className="h-11 w-[7.5rem] bg-white/5 border-white/10 text-white text-sm touch-manipulation">
            <ArrowUpDown className="h-3 w-3 mr-1 flex-shrink-0" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-elec-gray border-white/10">
            {sortOptions.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="text-white hover:bg-white/10"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Clear Filters */}
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="h-11 text-white hover:text-white hover:bg-white/10 gap-1 touch-manipulation active:scale-[0.98]"
          >
            <X className="h-3 w-3" />
            Clear
          </Button>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Results Count */}
        <span className="text-sm text-white flex-shrink-0">
          <span className="font-bold text-blue-400">{resultCount}</span>{' '}
          {resultCount === 1 ? 'course' : 'courses'}
        </span>

        {/* Funding Calculator Button */}
        {onFundingCalculator && (
          <button
            onClick={onFundingCalculator}
            className="h-11 w-11 flex-shrink-0 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 touch-manipulation active:scale-95"
          >
            <PoundSterling className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Advanced Filters Panel */}
      {showAdvanced && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-white/5 rounded-xl border border-white/10"
        >
          {/* Level Filter */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-white">Level</label>
            <Select
              value={filters.level || 'all'}
              onValueChange={(value) => handleFilterChange('level', value === 'all' ? '' : value)}
            >
              <SelectTrigger className="h-11 bg-white/5 border-white/10 text-white text-sm touch-manipulation">
                <SelectValue placeholder="All Levels" />
              </SelectTrigger>
              <SelectContent className="bg-elec-gray border-white/10">
                <SelectItem value="all" className="text-white hover:bg-white/10">
                  All Levels
                </SelectItem>
                {levels.map((level) => (
                  <SelectItem key={level} value={level} className="text-white hover:bg-white/10">
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Format Filter */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-white">Format</label>
            <Select
              value={filters.format || 'all'}
              onValueChange={(value) => handleFilterChange('format', value === 'all' ? '' : value)}
            >
              <SelectTrigger className="h-11 bg-white/5 border-white/10 text-white text-sm touch-manipulation">
                <SelectValue placeholder="All Formats" />
              </SelectTrigger>
              <SelectContent className="bg-elec-gray border-white/10">
                <SelectItem value="all" className="text-white hover:bg-white/10">
                  All Formats
                </SelectItem>
                {formats.map((format) => (
                  <SelectItem key={format} value={format} className="text-white hover:bg-white/10">
                    {format}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Demand Filter */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-white">Demand</label>
            <Select
              value={filters.location || 'all'}
              onValueChange={(value) =>
                handleFilterChange('location', value === 'all' ? '' : value)
              }
            >
              <SelectTrigger className="h-11 bg-white/5 border-white/10 text-white text-sm touch-manipulation">
                <SelectValue placeholder="All Demand" />
              </SelectTrigger>
              <SelectContent className="bg-elec-gray border-white/10">
                <SelectItem value="all" className="text-white hover:bg-white/10">
                  All Demand
                </SelectItem>
                <SelectItem value="High" className="text-white hover:bg-white/10">
                  High Demand
                </SelectItem>
                <SelectItem value="Medium" className="text-white hover:bg-white/10">
                  Medium Demand
                </SelectItem>
                <SelectItem value="Low" className="text-white hover:bg-white/10">
                  Low Demand
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>
      )}

      {/* Active Filter Badges */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.category && (
            <Badge className="bg-blue-500/20 text-blue-300 border-0 gap-1">
              {filters.category}
              <X
                className="h-3 w-3 cursor-pointer hover:text-white"
                onClick={() => handleFilterChange('category', '')}
              />
            </Badge>
          )}
          {filters.level && (
            <Badge className="bg-purple-500/20 text-purple-300 border-0 gap-1">
              {filters.level}
              <X
                className="h-3 w-3 cursor-pointer hover:text-white"
                onClick={() => handleFilterChange('level', '')}
              />
            </Badge>
          )}
          {filters.format && (
            <Badge className="bg-green-500/20 text-green-300 border-0 gap-1">
              {filters.format}
              <X
                className="h-3 w-3 cursor-pointer hover:text-white"
                onClick={() => handleFilterChange('format', '')}
              />
            </Badge>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default ModernCoursesFilters;
