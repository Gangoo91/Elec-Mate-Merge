import { useState, useEffect } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, X, Check, Eye, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { PhotoCategory } from "@/data/employerMockData";

const categories: PhotoCategory[] = ["Before", "During", "After", "Completion", "Issue"];

const categoryColors: Record<PhotoCategory, string> = {
  Before: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  During: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  After: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Completion: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  Issue: "bg-red-500/20 text-red-400 border-red-500/30"
};

const categoryEmoji: Record<PhotoCategory, string> = {
  Before: "🔵",
  During: "🟡",
  After: "🟢",
  Completion: "🟣",
  Issue: "🔴"
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
  categoryCounts
}: PhotoFilterSheetProps) {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);
  const [jobSearch, setJobSearch] = useState("");

  // Sync with external filters when sheet opens
  useEffect(() => {
    if (isOpen) {
      setLocalFilters(filters);
      setJobSearch("");
    }
  }, [isOpen, filters]);

  const filteredJobs = jobOptions.filter(job =>
    job.label.toLowerCase().includes(jobSearch.toLowerCase())
  );

  const toggleCategory = (category: string) => {
    setLocalFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const toggleJob = (jobId: string) => {
    setLocalFilters(prev => ({
      ...prev,
      jobs: prev.jobs.includes(jobId)
        ? prev.jobs.filter(j => j !== jobId)
        : [...prev.jobs, jobId]
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
      showShared: null
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
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="border-b border-border/50 pb-4">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-lg font-semibold">Filter Photos</DrawerTitle>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        <ScrollArea className="flex-1 px-4">
          <div className="py-4 space-y-6">
            {/* Categories Section */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">
                Category
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => {
                  const isSelected = localFilters.categories.includes(category);
                  const count = categoryCounts[category] || 0;
                  return (
                    <button
                      key={category}
                      onClick={() => toggleCategory(category)}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-lg border transition-all touch-feedback",
                        isSelected
                          ? categoryColors[category]
                          : "bg-muted/30 border-border/50 text-muted-foreground hover:bg-muted/50"
                      )}
                    >
                      <span>{categoryEmoji[category]}</span>
                      <span className="text-sm font-medium">{category}</span>
                      <Badge variant="secondary" className="h-5 px-1.5 text-[10px] bg-background/50">
                        {count}
                      </Badge>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Status Filters */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">
                Status
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setLocalFilters(prev => ({
                    ...prev,
                    showApproved: prev.showApproved === true ? null : true
                  }))}
                  className={cn(
                    "flex items-center gap-2 px-3 py-3 rounded-lg border transition-all touch-feedback",
                    localFilters.showApproved === true
                      ? "bg-success/20 border-success/30 text-success"
                      : "bg-muted/30 border-border/50 text-muted-foreground hover:bg-muted/50"
                  )}
                >
                  <Check className="h-4 w-4" />
                  <span className="text-sm font-medium">Approved</span>
                </button>
                <button
                  onClick={() => setLocalFilters(prev => ({
                    ...prev,
                    showShared: prev.showShared === true ? null : true
                  }))}
                  className={cn(
                    "flex items-center gap-2 px-3 py-3 rounded-lg border transition-all touch-feedback",
                    localFilters.showShared === true
                      ? "bg-info/20 border-info/30 text-info"
                      : "bg-muted/30 border-border/50 text-muted-foreground hover:bg-muted/50"
                  )}
                >
                  <Eye className="h-4 w-4" />
                  <span className="text-sm font-medium">Shared</span>
                </button>
              </div>
            </div>

            {/* Jobs Section */}
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">
                Job
              </h3>
              
              {jobOptions.length > 5 && (
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search jobs..."
                    value={jobSearch}
                    onChange={(e) => setJobSearch(e.target.value)}
                    className="pl-9 h-10 bg-muted/30 border-border/50"
                  />
                </div>
              )}

              <div className="space-y-1 max-h-48 overflow-y-auto">
                {filteredJobs.map(job => {
                  const isSelected = localFilters.jobs.includes(job.value);
                  return (
                    <button
                      key={job.value}
                      onClick={() => toggleJob(job.value)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all touch-feedback text-left",
                        isSelected
                          ? "bg-elec-yellow/10 border border-elec-yellow/30"
                          : "bg-muted/20 hover:bg-muted/40"
                      )}
                    >
                      <Checkbox checked={isSelected} className="pointer-events-none" />
                      <span className="flex-1 text-sm font-medium text-foreground truncate">
                        {job.label}
                      </span>
                      <Badge variant="secondary" className="h-5 px-1.5 text-[10px]">
                        {job.count}
                      </Badge>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </ScrollArea>

        <DrawerFooter className="border-t border-border/50 pt-4 gap-2">
          <Button onClick={handleApply} className="w-full h-12">
            Apply Filters
          </Button>
          {hasActiveFilters && (
            <Button variant="outline" onClick={handleClear} className="w-full h-12">
              Clear All
            </Button>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
