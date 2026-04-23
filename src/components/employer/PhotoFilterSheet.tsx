import { useState, useEffect } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, X, Check, Eye, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PhotoCategory } from '@/data/employerMockData';
import {
  inputClass,
  checkboxClass,
  PrimaryButton,
  SecondaryButton,
} from './editorial';

const categories: PhotoCategory[] = ['Before', 'During', 'After', 'Completion', 'Issue'];

const categoryColors: Record<PhotoCategory, string> = {
  Before: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  During: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  After: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  Completion: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  Issue: 'bg-red-500/20 text-red-400 border-red-500/30',
};

const categoryEmoji: Record<PhotoCategory, string> = {
  Before: '🔵',
  During: '🟡',
  After: '🟢',
  Completion: '🟣',
  Issue: '🔴',
};

interface JobOption {
  value: string;
  label: string;
  count: number;
}

interface FilterState {
  categories: string[];
  jobs: string[];
  showApproved: boolean | null;
  showShared: boolean | null;
}

interface PhotoFilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  jobOptions: JobOption[];
  categoryCounts: Record<string, number>;
}

export function PhotoFilterSheet({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  jobOptions,
  categoryCounts,
}: PhotoFilterSheetProps) {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);
  const [jobSearch, setJobSearch] = useState('');

  // Sync with external filters when sheet opens
  useEffect(() => {
    if (isOpen) {
      setLocalFilters(filters);
      setJobSearch('');
    }
  }, [isOpen, filters]);

  const filteredJobs = jobOptions.filter((job) =>
    job.label.toLowerCase().includes(jobSearch.toLowerCase())
  );

  const toggleCategory = (category: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const toggleJob = (jobId: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      jobs: prev.jobs.includes(jobId)
        ? prev.jobs.filter((j) => j !== jobId)
        : [...prev.jobs, jobId],
    }));
  };

  const handleApply = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const handleClear = () => {
    const clearedFilters: FilterState = {
      categories: [],
      jobs: [],
      showApproved: null,
      showShared: null,
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
    onClose();
  };

  const hasActiveFilters =
    localFilters.categories.length > 0 ||
    localFilters.jobs.length > 0 ||
    localFilters.showApproved !== null ||
    localFilters.showShared !== null;

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="max-h-[85vh] bg-[hsl(0_0%_8%)] border-t border-white/[0.06]">
        <DrawerHeader className="border-b border-white/[0.06] pb-4">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-lg font-semibold text-white">
              Filter Photos
            </DrawerTitle>
            <DrawerClose asChild>
              <button
                type="button"
                className="h-8 w-8 flex items-center justify-center rounded-full text-white hover:bg-white/[0.06] touch-manipulation"
              >
                <X className="h-4 w-4" />
              </button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        <ScrollArea className="flex-1 px-4">
          <div className="py-4 space-y-6">
            {/* Categories Section */}
            <div>
              <h3 className="text-[11px] font-semibold text-white mb-3 uppercase tracking-[0.18em]">
                Category
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const isSelected = localFilters.categories.includes(category);
                  const count = categoryCounts[category] || 0;
                  return (
                    <button
                      key={category}
                      onClick={() => toggleCategory(category)}
                      className={cn(
                        'flex items-center gap-2 px-3 py-2 rounded-full border transition-all touch-manipulation',
                        isSelected
                          ? categoryColors[category]
                          : 'bg-white/[0.04] border-white/[0.08] text-white hover:bg-white/[0.08]'
                      )}
                    >
                      <span>{categoryEmoji[category]}</span>
                      <span className="text-sm font-medium">{category}</span>
                      <Badge
                        variant="secondary"
                        className="h-5 px-1.5 text-[10px] bg-black/50 text-white"
                      >
                        {count}
                      </Badge>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Status Filters */}
            <div>
              <h3 className="text-[11px] font-semibold text-white mb-3 uppercase tracking-[0.18em]">
                Status
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() =>
                    setLocalFilters((prev) => ({
                      ...prev,
                      showApproved: prev.showApproved === true ? null : true,
                    }))
                  }
                  className={cn(
                    'flex items-center gap-2 px-3 py-3 rounded-full border transition-all touch-manipulation',
                    localFilters.showApproved === true
                      ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400'
                      : 'bg-white/[0.04] border-white/[0.08] text-white hover:bg-white/[0.08]'
                  )}
                >
                  <Check className="h-4 w-4" />
                  <span className="text-sm font-medium">Approved</span>
                </button>
                <button
                  onClick={() =>
                    setLocalFilters((prev) => ({
                      ...prev,
                      showShared: prev.showShared === true ? null : true,
                    }))
                  }
                  className={cn(
                    'flex items-center gap-2 px-3 py-3 rounded-full border transition-all touch-manipulation',
                    localFilters.showShared === true
                      ? 'bg-blue-500/20 border-blue-500/30 text-blue-400'
                      : 'bg-white/[0.04] border-white/[0.08] text-white hover:bg-white/[0.08]'
                  )}
                >
                  <Eye className="h-4 w-4" />
                  <span className="text-sm font-medium">Shared</span>
                </button>
              </div>
            </div>

            {/* Jobs Section */}
            <div>
              <h3 className="text-[11px] font-semibold text-white mb-3 uppercase tracking-[0.18em]">
                Job
              </h3>

              {jobOptions.length > 5 && (
                <div className="relative mb-3">
                  {!jobSearch && (
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white pointer-events-none z-10" />
                  )}
                  <Input
                    placeholder="Search jobs..."
                    value={jobSearch}
                    onChange={(e) => setJobSearch(e.target.value)}
                    className={cn(inputClass, !jobSearch && 'pl-9')}
                  />
                </div>
              )}

              <div className="space-y-1 max-h-48 overflow-y-auto">
                {filteredJobs.map((job) => {
                  const isSelected = localFilters.jobs.includes(job.value);
                  return (
                    <button
                      key={job.value}
                      onClick={() => toggleJob(job.value)}
                      className={cn(
                        'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all touch-manipulation text-left',
                        isSelected
                          ? 'bg-elec-yellow/10 border border-elec-yellow/30'
                          : 'bg-white/[0.04] hover:bg-white/[0.08] border border-transparent'
                      )}
                    >
                      <Checkbox checked={isSelected} className={cn(checkboxClass, 'pointer-events-none')} />
                      <span className="flex-1 text-sm font-medium text-white truncate">
                        {job.label}
                      </span>
                      <Badge variant="secondary" className="h-5 px-1.5 text-[10px] bg-white/[0.06] text-white">
                        {job.count}
                      </Badge>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </ScrollArea>

        <DrawerFooter className="border-t border-white/[0.06] pt-4 gap-2">
          <PrimaryButton onClick={handleApply} size="lg" fullWidth>
            Apply Filters
          </PrimaryButton>
          {hasActiveFilters && (
            <SecondaryButton onClick={handleClear} size="lg" fullWidth>
              Clear All
            </SecondaryButton>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
