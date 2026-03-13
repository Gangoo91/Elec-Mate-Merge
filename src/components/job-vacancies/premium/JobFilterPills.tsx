/**
 * JobFilterPills - Merged category + filter pills in a single scrollable row
 */

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { SlidersHorizontal, Check } from 'lucide-react';
import { pillVariants } from './animations/variants';

export interface JobFilters {
  category: string | null;
  jobTypes: string[];
  salaryRanges: string[];
  sources: string[];
}

interface JobFilterPillsProps {
  filters: JobFilters;
  onFiltersChange: (filters: JobFilters) => void;
  availableSources?: string[];
  className?: string;
}

const CATEGORIES = [
  { id: 'electrician', label: 'Electrician' },
  { id: 'solar', label: 'Solar' },
  { id: 'ev', label: 'EV Tech' },
  { id: 'apprentice', label: 'Apprentice' },
  { id: 'site-manager', label: 'Site Manager' },
];

const JOB_TYPES = [
  { id: 'permanent', label: 'Permanent' },
  { id: 'contract', label: 'Contract' },
  { id: 'temporary', label: 'Temporary' },
  { id: 'apprenticeship', label: 'Apprenticeship' },
];

const SALARY_RANGES = [
  { id: '20-30', label: '£20-30k' },
  { id: '30-40', label: '£30-40k' },
  { id: '40-50', label: '£40-50k' },
  { id: '50+', label: '£50k+' },
];

const DEFAULT_SOURCES = ['Reed', 'Adzuna', 'Apprenticeships', 'Indeed', 'TotalJobs'];

const JobFilterPills = ({
  filters,
  onFiltersChange,
  availableSources = DEFAULT_SOURCES,
  className,
}: JobFilterPillsProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showRightFade, setShowRightFade] = useState(true);

  const activeCount =
    (filters.category ? 1 : 0) +
    filters.jobTypes.length +
    filters.salaryRanges.length +
    filters.sources.length;

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowRightFade(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener('scroll', handleScroll);
      handleScroll();
      return () => ref.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const toggleCategory = (id: string) => {
    onFiltersChange({
      ...filters,
      category: filters.category === id ? null : id,
    });
  };

  const toggleJobType = (id: string) => {
    const newTypes = filters.jobTypes.includes(id)
      ? filters.jobTypes.filter((t) => t !== id)
      : [...filters.jobTypes, id];
    onFiltersChange({ ...filters, jobTypes: newTypes });
  };

  const toggleSalaryRange = (id: string) => {
    const newRanges = filters.salaryRanges.includes(id)
      ? filters.salaryRanges.filter((r) => r !== id)
      : [...filters.salaryRanges, id];
    onFiltersChange({ ...filters, salaryRanges: newRanges });
  };

  const toggleSource = (id: string) => {
    const newSources = filters.sources.includes(id)
      ? filters.sources.filter((s) => s !== id)
      : [...filters.sources, id];
    onFiltersChange({ ...filters, sources: newSources });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      category: null,
      jobTypes: [],
      salaryRanges: [],
      sources: [],
    });
  };

  const sourceOptions = availableSources.map((s) => ({ id: s, label: s }));

  let pillIndex = 0;

  return (
    <div className={cn('relative', className)}>
      {/* Scrollable row */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-1 px-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Filter icon + badge count (tap to clear) */}
          <button
            onClick={activeCount > 0 ? clearAllFilters : undefined}
            className={cn(
              'flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-lg touch-manipulation',
              activeCount > 0
                ? 'bg-amber-500/20 border border-amber-500/40'
                : 'bg-white/5 border border-white/10'
            )}
          >
            <div className="relative">
              <SlidersHorizontal className={cn('h-4 w-4', activeCount > 0 ? 'text-amber-400' : 'text-white')} />
              {activeCount > 0 && (
                <Badge className="absolute -top-2.5 -right-2.5 h-4 min-w-[16px] px-1 bg-amber-500 text-black border-0 text-[9px] font-bold flex items-center justify-center">
                  {activeCount}
                </Badge>
              )}
            </div>
          </button>

          {/* Separator */}
          <div className="w-px h-5 bg-white/10 flex-shrink-0" />

          {/* Category pills */}
          {CATEGORIES.map((cat) => {
            const isSelected = filters.category === cat.id;
            const idx = pillIndex++;
            return (
              <motion.button
                key={cat.id}
                variants={pillVariants}
                initial="initial"
                animate="animate"
                whileTap="tap"
                custom={idx}
                onClick={() => toggleCategory(cat.id)}
                className={cn(
                  'flex-shrink-0 px-3 py-2 rounded-full text-xs font-medium',
                  'border transition-all duration-200 touch-manipulation whitespace-nowrap',
                  isSelected
                    ? 'bg-blue-500/30 border-blue-500/50 text-blue-300'
                    : 'bg-white/5 border-white/10 text-white'
                )}
              >
                {cat.label}
              </motion.button>
            );
          })}

          {/* Separator */}
          <div className="w-px h-5 bg-white/10 flex-shrink-0" />

          {/* Job type pills */}
          {JOB_TYPES.map((type) => {
            const isSelected = filters.jobTypes.includes(type.id);
            const idx = pillIndex++;
            return (
              <motion.button
                key={type.id}
                variants={pillVariants}
                initial="initial"
                animate="animate"
                whileTap="tap"
                custom={idx}
                onClick={() => toggleJobType(type.id)}
                className={cn(
                  'flex-shrink-0 px-3 py-2 rounded-full text-xs font-medium',
                  'border transition-all duration-200 touch-manipulation whitespace-nowrap',
                  isSelected
                    ? 'bg-amber-500/30 border-amber-500/50 text-amber-300'
                    : 'bg-white/5 border-white/10 text-white'
                )}
              >
                {isSelected && <Check className="h-3 w-3 mr-1 inline" />}
                {type.label}
              </motion.button>
            );
          })}

          {/* Separator */}
          <div className="w-px h-5 bg-white/10 flex-shrink-0" />

          {/* Salary range pills */}
          {SALARY_RANGES.map((range) => {
            const isSelected = filters.salaryRanges.includes(range.id);
            const idx = pillIndex++;
            return (
              <motion.button
                key={range.id}
                variants={pillVariants}
                initial="initial"
                animate="animate"
                whileTap="tap"
                custom={idx}
                onClick={() => toggleSalaryRange(range.id)}
                className={cn(
                  'flex-shrink-0 px-3 py-2 rounded-full text-xs font-medium',
                  'border transition-all duration-200 touch-manipulation whitespace-nowrap',
                  isSelected
                    ? 'bg-emerald-500/30 border-emerald-500/50 text-emerald-300'
                    : 'bg-white/5 border-white/10 text-white'
                )}
              >
                {isSelected && <Check className="h-3 w-3 mr-1 inline" />}
                {range.label}
              </motion.button>
            );
          })}

          {/* Separator */}
          <div className="w-px h-5 bg-white/10 flex-shrink-0" />

          {/* Source pills */}
          {sourceOptions.map((source) => {
            const isSelected = filters.sources.includes(source.id);
            const idx = pillIndex++;
            return (
              <motion.button
                key={source.id}
                variants={pillVariants}
                initial="initial"
                animate="animate"
                whileTap="tap"
                custom={idx}
                onClick={() => toggleSource(source.id)}
                className={cn(
                  'flex-shrink-0 px-3 py-2 rounded-full text-xs font-medium',
                  'border transition-all duration-200 touch-manipulation whitespace-nowrap',
                  isSelected
                    ? 'bg-purple-500/30 border-purple-500/50 text-purple-300'
                    : 'bg-white/5 border-white/10 text-white'
                )}
              >
                {isSelected && <Check className="h-3 w-3 mr-1 inline" />}
                {source.label}
              </motion.button>
            );
          })}
        </div>

        {/* Right fade gradient (always visible when scrollable) */}
        {showRightFade && (
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        )}
      </div>
    </div>
  );
};

export default JobFilterPills;
