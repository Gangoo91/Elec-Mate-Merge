import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface RAMSFilterPanelProps {
  statusFilter: string;
  dateFilter: string;
  locationFilter: string;
  locations: string[];
  onStatusChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export const RAMSFilterPanel = ({
  statusFilter,
  dateFilter,
  locationFilter,
  locations,
  onStatusChange,
  onDateChange,
  onLocationChange,
  onClearFilters,
  hasActiveFilters,
}: RAMSFilterPanelProps) => {
  return (
    <div className="space-y-3">
      {/* Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Status Filter */}
        <Select value={statusFilter} onValueChange={onStatusChange}>
          <SelectTrigger className="w-full sm:w-[180px] h-11">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>

        {/* Date Filter */}
        <Select value={dateFilter} onValueChange={onDateChange}>
          <SelectTrigger className="w-full sm:w-[180px] h-11">
            <SelectValue placeholder="All Time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="7days">Last 7 Days</SelectItem>
            <SelectItem value="30days">Last 30 Days</SelectItem>
            <SelectItem value="90days">Last 90 Days</SelectItem>
          </SelectContent>
        </Select>

        {/* Location Filter */}
        <Select value={locationFilter} onValueChange={onLocationChange}>
          <SelectTrigger className="w-full sm:w-[200px] h-11">
            <SelectValue placeholder="All Locations" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            {locations.map((loc) => (
              <SelectItem key={loc} value={loc}>
                {loc}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="h-11"
          >
            <X className="h-4 w-4 mr-2" />
            Clear Filters
          </Button>
        )}
      </div>

      {/* Active Filter Badges */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 items-center">
          <Filter className="h-3 w-3 text-white" />
          <span className="text-xs text-white">Active filters:</span>
          {statusFilter !== 'all' && (
            <Badge variant="secondary" className="text-xs">
              {statusFilter}
              <button
                onClick={() => onStatusChange('all')}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {dateFilter !== 'all' && (
            <Badge variant="secondary" className="text-xs">
              {dateFilter === '7days' ? 'Last 7 days' : 
               dateFilter === '30days' ? 'Last 30 days' : 
               'Last 90 days'}
              <button
                onClick={() => onDateChange('all')}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          {locationFilter !== 'all' && (
            <Badge variant="secondary" className="text-xs">
              {locationFilter}
              <button
                onClick={() => onLocationChange('all')}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};
