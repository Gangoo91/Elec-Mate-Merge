/**
 * JobFilterPills — editorial filter row.
 *
 * Single horizontally-scrolling row of pills. Drops the per-group colour
 * palette (blue / amber / emerald / purple) for a unified elec-yellow
 * selected state — group identity comes from a small uppercase label that
 * sits above the strip on wider screens, not from colour.
 */

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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

const pillBase =
  'flex-shrink-0 inline-flex items-center gap-1 px-3 py-2 rounded-full text-[11px] font-semibold uppercase tracking-[0.12em] border transition-colors duration-200 touch-manipulation whitespace-nowrap';
const pillIdle = 'text-white/85 border-white/15 hover:border-white/30 bg-transparent';
const pillSelected = 'text-elec-yellow border-elec-yellow/40 bg-elec-yellow/[0.08]';

const Separator = () => (
  <div className="w-px h-5 bg-white/[0.08] shrink-0" aria-hidden />
);

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
    if (!ref) return;
    ref.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => ref.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleCategory = (id: string) =>
    onFiltersChange({ ...filters, category: filters.category === id ? null : id });

  const toggleJobType = (id: string) => {
    const next = filters.jobTypes.includes(id)
      ? filters.jobTypes.filter((t) => t !== id)
      : [...filters.jobTypes, id];
    onFiltersChange({ ...filters, jobTypes: next });
  };

  const toggleSalaryRange = (id: string) => {
    const next = filters.salaryRanges.includes(id)
      ? filters.salaryRanges.filter((r) => r !== id)
      : [...filters.salaryRanges, id];
    onFiltersChange({ ...filters, salaryRanges: next });
  };

  const toggleSource = (id: string) => {
    const next = filters.sources.includes(id)
      ? filters.sources.filter((s) => s !== id)
      : [...filters.sources, id];
    onFiltersChange({ ...filters, sources: next });
  };

  const clearAllFilters = () =>
    onFiltersChange({ category: null, jobTypes: [], salaryRanges: [], sources: [] });

  let pillIndex = 0;
  const renderPill = (
    id: string,
    label: string,
    selected: boolean,
    onClick: () => void,
    showCheck = false
  ) => {
    const idx = pillIndex++;
    return (
      <motion.button
        key={id}
        type="button"
        variants={pillVariants}
        initial="initial"
        animate="animate"
        whileTap="tap"
        custom={idx}
        onClick={onClick}
        className={cn(pillBase, selected ? pillSelected : pillIdle)}
      >
        {showCheck && selected && <Check className="h-3 w-3" />}
        {label}
      </motion.button>
    );
  };

  return (
    <div className={cn('relative', className)}>
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-1 px-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Filter glyph + active count (tap to clear) */}
          <button
            type="button"
            onClick={activeCount > 0 ? clearAllFilters : undefined}
            aria-label={activeCount > 0 ? 'Clear filters' : 'Filters'}
            className={cn(
              'shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-full border touch-manipulation transition-colors',
              activeCount > 0
                ? 'text-elec-yellow border-elec-yellow/40 bg-elec-yellow/[0.08]'
                : 'text-white/85 border-white/15 hover:border-white/30 bg-transparent'
            )}
          >
            <div className="relative">
              <SlidersHorizontal className="h-4 w-4" />
              {activeCount > 0 && (
                <span className="absolute -top-2 -right-2.5 h-4 min-w-[16px] px-1 rounded-full bg-elec-yellow text-black text-[9px] font-bold tabular-nums flex items-center justify-center">
                  {activeCount}
                </span>
              )}
            </div>
          </button>

          <Separator />

          {CATEGORIES.map((cat) =>
            renderPill(cat.id, cat.label, filters.category === cat.id, () =>
              toggleCategory(cat.id)
            )
          )}

          <Separator />

          {JOB_TYPES.map((type) =>
            renderPill(
              type.id,
              type.label,
              filters.jobTypes.includes(type.id),
              () => toggleJobType(type.id),
              true
            )
          )}

          <Separator />

          {SALARY_RANGES.map((range) =>
            renderPill(
              range.id,
              range.label,
              filters.salaryRanges.includes(range.id),
              () => toggleSalaryRange(range.id),
              true
            )
          )}

          <Separator />

          {availableSources.map((source) =>
            renderPill(
              source,
              source,
              filters.sources.includes(source),
              () => toggleSource(source),
              true
            )
          )}
        </div>

        {showRightFade && (
          <div
            className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-[hsl(0_0%_8%)] to-transparent pointer-events-none"
            aria-hidden
          />
        )}
      </div>
    </div>
  );
};

export default JobFilterPills;
