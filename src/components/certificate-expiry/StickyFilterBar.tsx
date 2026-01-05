import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
          <Select value={timeRange} onValueChange={onTimeRangeChange}>
            <SelectTrigger className={cn("flex-1 bg-card border-border text-foreground", isMobile && "min-h-[48px] text-base")}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="overdue">Overdue</SelectItem>
              <SelectItem value="30">Next 30 Days</SelectItem>
              <SelectItem value="60">Next 60 Days</SelectItem>
              <SelectItem value="90">Next 90 Days</SelectItem>
              <SelectItem value="all">All</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={onStatusFilterChange}>
            <SelectTrigger className={cn("flex-1 bg-card border-border text-foreground", isMobile && "min-h-[48px] text-base")}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="viewed">Viewed</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="booked">Booked</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
