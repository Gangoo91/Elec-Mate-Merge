import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
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
      <MobileSelectPicker
        value={statusFilter}
        onValueChange={onStatusFilterChange}
        options={[
          { value: 'all', label: 'All Statuses' },
          { value: 'pending', label: 'Pending' },
          { value: 'in-progress', label: 'In Progress' },
          { value: 'submitted', label: 'Submitted' },
          { value: 'overdue', label: 'Overdue' },
          { value: 'cancelled', label: 'Cancelled' },
        ]}
        placeholder="Filter by status"
        title="Status Filter"
        className="w-full sm:w-[180px]"
      />

      {/* Report Type Filter */}
      <MobileSelectPicker
        value={reportTypeFilter}
        onValueChange={onReportTypeFilterChange}
        options={[
          { value: 'all', label: 'All Types' },
          { value: 'eicr', label: 'EICR' },
          { value: 'eic', label: 'EIC' },
          { value: 'minor-works', label: 'Minor Works' },
        ]}
        placeholder="Filter by type"
        title="Report Type Filter"
        className="w-full sm:w-[180px]"
      />

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
