import { Input } from '@/components/ui/input';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface StickyFilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  timeRange: string;
  onTimeRangeChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  searchInputRef?: React.RefObject<HTMLInputElement>;
}

export const StickyFilterBar = ({
  searchQuery,
  onSearchChange,
  timeRange,
  onTimeRangeChange,
  statusFilter,
  onStatusFilterChange,
  searchInputRef,
}: StickyFilterBarProps) => {
  const isMobile = useIsMobile();

  return (
    <div
      className={cn(
        "bg-gradient-to-br from-neutral-900 to-neutral-800 border-b border-border transition-all duration-200",
        isMobile && "sticky top-0 z-40 shadow-lg"
      )}
    >
      <div className="p-4 sm:p-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400 pointer-events-none" />
          <Input
            ref={searchInputRef}
            placeholder="Search certificates..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className={cn(
              "pl-10 bg-card border-border text-foreground placeholder:text-neutral-500",
              isMobile && "min-h-[48px] text-base"
            )}
            aria-label="Search certificates"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <MobileSelectPicker
            value={timeRange}
            onValueChange={onTimeRangeChange}
            options={[
              { value: 'overdue', label: 'Overdue' },
              { value: '30', label: 'Next 30 Days' },
              { value: '60', label: 'Next 60 Days' },
              { value: '90', label: 'Next 90 Days' },
              { value: 'all', label: 'All' },
            ]}
            placeholder="Time Range"
            title="Time Range"
            className="flex-1"
          />

          <MobileSelectPicker
            value={statusFilter}
            onValueChange={onStatusFilterChange}
            options={[
              { value: 'all', label: 'All Statuses' },
              { value: 'pending', label: 'Pending' },
              { value: 'viewed', label: 'Viewed' },
              { value: 'contacted', label: 'Contacted' },
              { value: 'booked', label: 'Booked' },
              { value: 'completed', label: 'Completed' },
            ]}
            placeholder="Status"
            title="Status Filter"
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );
};
