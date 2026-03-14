import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, SlidersHorizontal, ArrowUpDown, PoundSterling, ChevronDown } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { EnhancedCareerCourse } from '@/components/apprentice/career/courses/enhancedCoursesData';
import { cn } from '@/lib/utils';

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
    <div className="space-y-2">
      {/* Compact toolbar */}
      <div className="flex items-center gap-1.5">
        {/* Filters toggle */}
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={cn(
            'flex items-center gap-1.5 rounded-full px-3 h-9 text-xs font-semibold transition-all touch-manipulation active:scale-95',
            showAdvanced || activeFiltersCount > 0
              ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
              : 'bg-white/[0.06] text-white border border-white/[0.08]'
          )}
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Filters
          {activeFiltersCount > 0 && (
            <span className="bg-blue-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
          <ChevronDown
            className={cn('h-3 w-3 transition-transform', showAdvanced && 'rotate-180')}
          />
        </button>

        {/* Sort pill */}
        <Select
          value={filters.sortBy}
          onValueChange={(value) => handleFilterChange('sortBy', value)}
        >
          <SelectTrigger className="h-9 w-auto gap-1.5 rounded-full px-3 bg-white/[0.06] border-white/[0.08] text-white text-xs font-semibold touch-manipulation [&>svg:last-child]:hidden">
            <ArrowUpDown className="h-3 w-3 shrink-0" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1a1c] border-white/10">
            {sortOptions.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="text-white hover:bg-white/10 text-sm"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Clear all */}
        {activeFiltersCount > 0 && (
          <button
            onClick={clearAllFilters}
            className="flex items-center gap-1 rounded-full px-2.5 h-9 text-xs font-medium text-white touch-manipulation active:scale-95"
          >
            <X className="h-3 w-3" />
            Clear
          </button>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Result count */}
        <span className="text-xs text-white shrink-0">
          <span className="font-bold text-blue-400">{resultCount}</span> results
        </span>

        {/* Funding calculator */}
        {onFundingCalculator && (
          <button
            onClick={onFundingCalculator}
            className="h-9 w-9 flex-shrink-0 flex items-center justify-center rounded-full bg-green-500/10 border border-green-500/20 text-green-400 touch-manipulation active:scale-95"
            title="Funding Calculator"
          >
            <PoundSterling className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Advanced filters panel */}
      <AnimatePresence>
        {showAdvanced && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.15 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-3 gap-2 p-3 bg-white/[0.03] rounded-xl border border-white/[0.06]">
              <Select
                value={filters.level || 'all'}
                onValueChange={(value) => handleFilterChange('level', value === 'all' ? '' : value)}
              >
                <SelectTrigger className="h-11 bg-white/[0.06] border-white/[0.08] text-white text-xs touch-manipulation rounded-lg">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1c] border-white/10">
                  <SelectItem value="all" className="text-white hover:bg-white/10 text-sm">
                    All Levels
                  </SelectItem>
                  {levels.map((level) => (
                    <SelectItem
                      key={level}
                      value={level}
                      className="text-white hover:bg-white/10 text-sm"
                    >
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={filters.format || 'all'}
                onValueChange={(value) =>
                  handleFilterChange('format', value === 'all' ? '' : value)
                }
              >
                <SelectTrigger className="h-11 bg-white/[0.06] border-white/[0.08] text-white text-xs touch-manipulation rounded-lg">
                  <SelectValue placeholder="Format" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1c] border-white/10">
                  <SelectItem value="all" className="text-white hover:bg-white/10 text-sm">
                    All Formats
                  </SelectItem>
                  {formats.map((format) => (
                    <SelectItem
                      key={format}
                      value={format}
                      className="text-white hover:bg-white/10 text-sm"
                    >
                      {format}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={filters.location || 'all'}
                onValueChange={(value) =>
                  handleFilterChange('location', value === 'all' ? '' : value)
                }
              >
                <SelectTrigger className="h-11 bg-white/[0.06] border-white/[0.08] text-white text-xs touch-manipulation rounded-lg">
                  <SelectValue placeholder="Demand" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1c] border-white/10">
                  <SelectItem value="all" className="text-white hover:bg-white/10 text-sm">
                    All Demand
                  </SelectItem>
                  <SelectItem value="High" className="text-white hover:bg-white/10 text-sm">
                    High Demand
                  </SelectItem>
                  <SelectItem value="Medium" className="text-white hover:bg-white/10 text-sm">
                    Medium
                  </SelectItem>
                  <SelectItem value="Low" className="text-white hover:bg-white/10 text-sm">
                    Low
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active filter chips */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {filters.category && (
            <button
              onClick={() => handleFilterChange('category', '')}
              className="flex items-center gap-1 bg-blue-500/15 text-blue-400 border border-blue-500/25 rounded-full px-2.5 py-1 text-[11px] font-semibold touch-manipulation active:scale-95"
            >
              {filters.category}
              <X className="h-3 w-3" />
            </button>
          )}
          {filters.level && (
            <button
              onClick={() => handleFilterChange('level', '')}
              className="flex items-center gap-1 bg-purple-500/15 text-purple-400 border border-purple-500/25 rounded-full px-2.5 py-1 text-[11px] font-semibold touch-manipulation active:scale-95"
            >
              {filters.level}
              <X className="h-3 w-3" />
            </button>
          )}
          {filters.format && (
            <button
              onClick={() => handleFilterChange('format', '')}
              className="flex items-center gap-1 bg-green-500/15 text-green-400 border border-green-500/25 rounded-full px-2.5 py-1 text-[11px] font-semibold touch-manipulation active:scale-95"
            >
              {filters.format}
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ModernCoursesFilters;
