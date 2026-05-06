/**
 * ModernCoursesFilters — editorial filter toolbar.
 *
 * Toolbar (filters toggle / sort select / clear / count / funding glyph),
 * collapsible advanced panel with three selects (level / format / demand),
 * active-filter chip row. Drops the per-filter colour palette (blue/purple/
 * green) for uniform editorial styling.
 */

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
  { value: 'rating', label: 'Top rated' },
  { value: 'demand', label: 'Demand' },
  { value: 'title', label: 'A–Z' },
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

  const handleFilterChange = (key: keyof CourseFilters, value: string) =>
    onFiltersChange({ ...filters, [key]: value });

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

  const pillIdle =
    'text-white/85 border-white/15 hover:border-white/30 bg-transparent';
  const pillActive = 'text-elec-yellow border-elec-yellow/40 bg-elec-yellow/[0.08]';

  return (
    <div className="space-y-2">
      {/* Toolbar */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={cn(
            'inline-flex items-center gap-1.5 rounded-full px-3 h-9 text-[11px] font-semibold uppercase tracking-[0.12em] border transition-colors touch-manipulation',
            showAdvanced || activeFiltersCount > 0 ? pillActive : pillIdle
          )}
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Filters
          {activeFiltersCount > 0 && (
            <span className="inline-flex items-center justify-center bg-elec-yellow text-black text-[9px] font-bold rounded-full h-4 min-w-[16px] px-1 tabular-nums">
              {activeFiltersCount}
            </span>
          )}
          <ChevronDown
            className={cn('h-3 w-3 transition-transform', showAdvanced && 'rotate-180')}
          />
        </button>

        <Select
          value={filters.sortBy}
          onValueChange={(value) => handleFilterChange('sortBy', value)}
        >
          <SelectTrigger
            className={cn(
              'h-9 w-auto gap-1.5 rounded-full px-3 text-[11px] font-semibold uppercase tracking-[0.12em] touch-manipulation [&>svg:last-child]:hidden',
              pillIdle
            )}
          >
            <ArrowUpDown className="h-3 w-3 shrink-0" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[hsl(0_0%_11%)] border-white/[0.10]">
            {sortOptions.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="text-white hover:bg-white/10 text-[13px]"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {activeFiltersCount > 0 && (
          <button
            type="button"
            onClick={clearAllFilters}
            className="inline-flex items-center gap-1 rounded-full px-2.5 h-9 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/65 hover:text-red-300 transition-colors touch-manipulation"
          >
            <X className="h-3 w-3" />
            Clear
          </button>
        )}

        <div className="flex-1" />

        <span className="text-[11px] tabular-nums text-white/85 shrink-0">
          <span className="font-semibold text-elec-yellow">{resultCount}</span> result
          {resultCount === 1 ? '' : 's'}
        </span>

        {onFundingCalculator && (
          <button
            type="button"
            onClick={onFundingCalculator}
            aria-label="Funding calculator"
            title="Funding calculator"
            className="h-9 w-9 shrink-0 inline-flex items-center justify-center rounded-full border border-white/15 hover:border-elec-yellow/40 hover:text-elec-yellow text-white/85 touch-manipulation transition-colors"
          >
            <PoundSterling className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Advanced panel */}
      <AnimatePresence>
        {showAdvanced && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.18 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-3 rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              <FilterSelect
                value={filters.level || 'all'}
                onChange={(v) => handleFilterChange('level', v === 'all' ? '' : v)}
                placeholder="Level"
                allLabel="All levels"
                options={levels}
              />
              <FilterSelect
                value={filters.format || 'all'}
                onChange={(v) => handleFilterChange('format', v === 'all' ? '' : v)}
                placeholder="Format"
                allLabel="All formats"
                options={formats}
              />
              <FilterSelect
                value={filters.location || 'all'}
                onChange={(v) => handleFilterChange('location', v === 'all' ? '' : v)}
                placeholder="Demand"
                allLabel="All demand"
                options={['High', 'Medium', 'Low']}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active filter chips */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {(['category', 'level', 'format', 'location'] as const).map((key) => {
            const value = filters[key];
            if (!value) return null;
            return (
              <button
                key={key}
                type="button"
                onClick={() => handleFilterChange(key, '')}
                className="inline-flex items-center gap-1 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-elec-yellow border border-elec-yellow/40 bg-elec-yellow/[0.08] rounded-full px-2.5 py-1 touch-manipulation"
              >
                {value}
                <X className="h-3 w-3" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

const FilterSelect = ({
  value,
  onChange,
  placeholder,
  allLabel,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  allLabel: string;
  options: string[];
}) => (
  <Select value={value} onValueChange={onChange}>
    <SelectTrigger className="h-11 bg-white/[0.04] border-white/[0.10] text-white text-[13px] touch-manipulation rounded-xl focus-visible:border-elec-yellow/50">
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent className="bg-[hsl(0_0%_11%)] border-white/[0.10]">
      <SelectItem value="all" className="text-white hover:bg-white/10 text-[13px]">
        {allLabel}
      </SelectItem>
      {options.map((option) => (
        <SelectItem
          key={option}
          value={option}
          className="text-white hover:bg-white/10 text-[13px]"
        >
          {option}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

export default ModernCoursesFilters;
