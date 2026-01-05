import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, Filter, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { responsiveBody } from '@/styles/typography-utilities';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export interface FilterState {
  searchQuery: string;
  operationType: string[];
  status: string[];
  sortBy: 'newest' | 'oldest' | 'retries';
}

interface SyncFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  className?: string;
}

export const SyncFilters = ({ filters, onFiltersChange, className }: SyncFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const updateFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleArrayFilter = (
    key: 'operationType' | 'status',
    value: string
  ) => {
    const current = filters[key];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    updateFilter(key, updated);
  };

  const clearFilters = () => {
    onFiltersChange({
      searchQuery: '',
      operationType: [],
      status: [],
      sortBy: 'newest',
    });
  };

  const activeFilterCount = 
    (filters.searchQuery ? 1 : 0) +
    filters.operationType.length +
    filters.status.length +
    (filters.sortBy !== 'newest' ? 1 : 0);

  return (
    <div className={cn('space-y-3', className)}>
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by Report ID or type..."
          value={filters.searchQuery}
          onChange={(e) => updateFilter('searchQuery', e.target.value)}
          className="pl-10 pr-10"
        />
        {filters.searchQuery && (
          <button
            onClick={() => updateFilter('searchQuery', '')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap gap-2 items-center">
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-9">
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="ml-2 h-5 min-w-[20px] px-1">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>Operation Type</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={filters.operationType.includes('create')}
              onCheckedChange={() => toggleArrayFilter('operationType', 'create')}
            >
              Create
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.operationType.includes('update')}
              onCheckedChange={() => toggleArrayFilter('operationType', 'update')}
            >
              Update
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.operationType.includes('delete')}
              onCheckedChange={() => toggleArrayFilter('operationType', 'delete')}
            >
              Delete
            </DropdownMenuCheckboxItem>

            <DropdownMenuSeparator />
            
            <DropdownMenuLabel>Status</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={filters.status.includes('pending')}
              onCheckedChange={() => toggleArrayFilter('status', 'pending')}
            >
              Pending
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.status.includes('retrying')}
              onCheckedChange={() => toggleArrayFilter('status', 'retrying')}
            >
              Retrying
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.status.includes('failed')}
              onCheckedChange={() => toggleArrayFilter('status', 'failed')}
            >
              Failed
            </DropdownMenuCheckboxItem>

            <DropdownMenuSeparator />
            
            <DropdownMenuLabel>Sort By</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={filters.sortBy === 'newest'}
              onCheckedChange={() => updateFilter('sortBy', 'newest')}
            >
              Newest First
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.sortBy === 'oldest'}
              onCheckedChange={() => updateFilter('sortBy', 'oldest')}
            >
              Oldest First
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={filters.sortBy === 'retries'}
              onCheckedChange={() => updateFilter('sortBy', 'retries')}
            >
              Most Retries
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-9 text-muted-foreground"
          >
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}

        {/* Active Filter Badges */}
        <div className="flex flex-wrap gap-2 ml-auto">
          {filters.operationType.map((type) => (
            <Badge
              key={type}
              variant="secondary"
              className="cursor-pointer hover:bg-secondary/80"
              onClick={() => toggleArrayFilter('operationType', type)}
            >
              {type}
              <X className="h-3 w-3 ml-1" />
            </Badge>
          ))}
          {filters.status.map((status) => (
            <Badge
              key={status}
              variant="secondary"
              className="cursor-pointer hover:bg-secondary/80"
              onClick={() => toggleArrayFilter('status', status)}
            >
              {status}
              <X className="h-3 w-3 ml-1" />
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};
