import React from 'react';
import { X, Check } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface RAMSFilterSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  statusFilter: string;
  dateFilter: string;
  locationFilter: string;
  locations: string[];
  onStatusChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onClearFilters: () => void;
  onApply: () => void;
  hasActiveFilters: boolean;
}

const STATUS_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'draft', label: 'Draft' },
  { value: 'approved', label: 'Approved' },
  { value: 'pending', label: 'Pending' },
];

const DATE_OPTIONS = [
  { value: 'all', label: 'All Time' },
  { value: '7days', label: 'Last 7 Days' },
  { value: '30days', label: 'Last 30 Days' },
  { value: '90days', label: 'Last 90 Days' },
];

export const RAMSFilterSheet: React.FC<RAMSFilterSheetProps> = ({
  open,
  onOpenChange,
  statusFilter,
  dateFilter,
  locationFilter,
  locations,
  onStatusChange,
  onDateChange,
  onLocationChange,
  onClearFilters,
  onApply,
  hasActiveFilters,
}) => {
  const handleApply = () => {
    onApply();
    onOpenChange(false);
  };

  const handleClear = () => {
    onClearFilters();
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="rounded-t-3xl bg-elec-dark border-white/[0.08] max-h-[85vh]"
      >
        {/* Handle bar */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-white/20" />

        <SheetHeader className="text-left pt-4 pb-2">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-lg font-semibold text-white">
              Filter Documents
            </SheetTitle>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="text-elec-yellow hover:text-elec-yellow/80 hover:bg-elec-yellow/10 h-8 px-3 text-sm"
              >
                Clear All
              </Button>
            )}
          </div>
        </SheetHeader>

        <div className="space-y-6 py-4 overflow-y-auto">
          {/* Status Filter */}
          <div>
            <label className="text-xs text-white uppercase tracking-wider font-medium">
              Status
            </label>
            <div className="grid grid-cols-4 gap-2 mt-3">
              {STATUS_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => onStatusChange(option.value)}
                  className={cn(
                    "py-2.5 px-3 rounded-xl text-sm font-medium transition-all",
                    "border active:scale-[0.97]",
                    statusFilter === option.value
                      ? "bg-elec-yellow text-black border-elec-yellow"
                      : "bg-white/[0.03] text-white border-white/[0.06] hover:border-white/[0.12]"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Date Range Filter */}
          <div>
            <label className="text-xs text-white uppercase tracking-wider font-medium">
              Date Range
            </label>
            <div className="flex flex-wrap gap-2 mt-3">
              {DATE_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => onDateChange(option.value)}
                  className={cn(
                    "py-2 px-4 rounded-full text-sm font-medium transition-all",
                    "border active:scale-[0.97]",
                    dateFilter === option.value
                      ? "bg-elec-yellow text-black border-elec-yellow"
                      : "bg-white/[0.03] text-white border-white/[0.06] hover:border-white/[0.12]"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Location Filter */}
          {locations.length > 0 && (
            <div>
              <label className="text-xs text-white uppercase tracking-wider font-medium">
                Location
              </label>
              <ScrollArea className="h-40 mt-3 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                <div className="p-1">
                  <button
                    onClick={() => onLocationChange('all')}
                    className={cn(
                      "w-full text-left py-3 px-4 rounded-lg text-sm transition-all",
                      "flex items-center justify-between",
                      locationFilter === 'all'
                        ? "bg-elec-yellow/10 text-elec-yellow"
                        : "text-white hover:bg-white/[0.05]"
                    )}
                  >
                    <span>All Locations</span>
                    {locationFilter === 'all' && <Check className="h-4 w-4" />}
                  </button>
                  {locations.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => onLocationChange(loc)}
                      className={cn(
                        "w-full text-left py-3 px-4 rounded-lg text-sm transition-all",
                        "flex items-center justify-between",
                        locationFilter === loc
                          ? "bg-elec-yellow/10 text-elec-yellow"
                          : "text-white hover:bg-white/[0.05]"
                      )}
                    >
                      <span className="truncate">{loc}</span>
                      {locationFilter === loc && <Check className="h-4 w-4 shrink-0" />}
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-4 pb-2 border-t border-white/[0.06]">
          <Button
            onClick={handleApply}
            className="w-full h-14 bg-elec-yellow text-black hover:bg-elec-yellow/90 rounded-xl font-semibold text-base"
          >
            Apply Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default RAMSFilterSheet;
