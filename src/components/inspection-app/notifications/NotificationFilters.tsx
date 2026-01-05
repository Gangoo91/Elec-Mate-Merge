import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { NotificationStatus } from '@/hooks/useNotifications';

interface NotificationFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: NotificationStatus | 'all';
  onStatusFilterChange: (status: NotificationStatus | 'all') => void;
  reportTypeFilter: string;
  onReportTypeFilterChange: (type: string) => void;
  onClearFilters: () => void;
}

export const NotificationFilters = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  reportTypeFilter,
  onReportTypeFilterChange,
  onClearFilters,
}: NotificationFiltersProps) => {
  const hasActiveFilters = searchQuery || statusFilter !== 'all' || reportTypeFilter !== 'all';

  return (
    <div className="space-y-3 sm:space-y-0 sm:flex sm:items-center gap-2 sm:gap-3">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <Input
          placeholder="Search certificates, work description, authority..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 min-h-[48px] sm:min-h-[40px] text-sm sm:text-base"
        />
      </div>

      {/* Status Filter */}
      <Select value={statusFilter} onValueChange={onStatusFilterChange}>
        <SelectTrigger className="w-full sm:w-[180px] min-h-[48px] sm:min-h-[40px]">
          <Filter className="w-4 h-4 mr-2 flex-shrink-0" />
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all" className="min-h-[44px] sm:min-h-[36px]">All Statuses</SelectItem>
          <SelectItem value="pending" className="min-h-[44px] sm:min-h-[36px]">Pending</SelectItem>
          <SelectItem value="in-progress" className="min-h-[44px] sm:min-h-[36px]">In Progress</SelectItem>
          <SelectItem value="submitted" className="min-h-[44px] sm:min-h-[36px]">Submitted</SelectItem>
          <SelectItem value="overdue" className="min-h-[44px] sm:min-h-[36px]">Overdue</SelectItem>
          <SelectItem value="cancelled" className="min-h-[44px] sm:min-h-[36px]">Cancelled</SelectItem>
        </SelectContent>
      </Select>

      {/* Report Type Filter */}
      <Select value={reportTypeFilter} onValueChange={onReportTypeFilterChange}>
        <SelectTrigger className="w-full sm:w-[180px] min-h-[48px] sm:min-h-[40px]">
          <SelectValue placeholder="Filter by type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all" className="min-h-[44px] sm:min-h-[36px]">All Types</SelectItem>
          <SelectItem value="eicr" className="min-h-[44px] sm:min-h-[36px]">EICR</SelectItem>
          <SelectItem value="eic" className="min-h-[44px] sm:min-h-[36px]">EIC</SelectItem>
          <SelectItem value="minor-works" className="min-h-[44px] sm:min-h-[36px]">Minor Works</SelectItem>
        </SelectContent>
      </Select>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button 
          variant="outline" 
          onClick={onClearFilters} 
          size="sm"
          className="w-full sm:w-auto min-h-[48px] sm:min-h-[36px]"
        >
          Clear
        </Button>
      )}
    </div>
  );
};
