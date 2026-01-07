import { useState } from 'react';
import { Filter, X, Check, RotateCcw } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  EXPENSE_CATEGORIES,
  type ExpenseFilters,
  type ExpenseStatus,
  type ExpenseCategory,
} from '@/hooks/useExpenses';

interface ExpenseFilterSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: ExpenseFilters;
  onFiltersChange: (filters: ExpenseFilters) => void;
  employees?: { id: string; name: string }[];
}

const STATUS_OPTIONS: { value: ExpenseStatus; label: string }[] = [
  { value: 'Pending', label: 'Pending' },
  { value: 'Approved', label: 'Approved' },
  { value: 'Paid', label: 'Paid' },
  { value: 'Rejected', label: 'Rejected' },
];

const DATE_RANGE_OPTIONS = [
  { value: 'all', label: 'All time' },
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This week' },
  { value: 'month', label: 'This month' },
  { value: 'quarter', label: 'This quarter' },
];

export function ExpenseFilterSheet({
  open,
  onOpenChange,
  filters,
  onFiltersChange,
  employees = [],
}: ExpenseFilterSheetProps) {
  const isMobile = useIsMobile();
  const [localFilters, setLocalFilters] = useState<ExpenseFilters>(filters);
  const [dateRange, setDateRange] = useState('all');

  // Count active filters
  const activeFilterCount = [
    localFilters.status,
    localFilters.category,
    localFilters.employeeId,
    localFilters.hasReceipt !== undefined,
    dateRange !== 'all',
  ].filter(Boolean).length;

  const handleStatusToggle = (status: ExpenseStatus) => {
    const current = Array.isArray(localFilters.status) ? localFilters.status : localFilters.status ? [localFilters.status] : [];
    const newStatus = current.includes(status)
      ? current.filter((s) => s !== status)
      : [...current, status];
    setLocalFilters({
      ...localFilters,
      status: newStatus.length > 0 ? newStatus : undefined,
    });
  };

  const handleCategoryToggle = (category: ExpenseCategory) => {
    const current = Array.isArray(localFilters.category) ? localFilters.category : localFilters.category ? [localFilters.category] : [];
    const newCategory = current.includes(category)
      ? current.filter((c) => c !== category)
      : [...current, category];
    setLocalFilters({
      ...localFilters,
      category: newCategory.length > 0 ? newCategory : undefined,
    });
  };

  const handleDateRangeChange = (value: string) => {
    setDateRange(value);
    const now = new Date();
    let dateFrom: Date | undefined;

    switch (value) {
      case 'today':
        dateFrom = new Date(now.setHours(0, 0, 0, 0));
        break;
      case 'week':
        dateFrom = new Date(now.setDate(now.getDate() - 7));
        break;
      case 'month':
        dateFrom = new Date(now.setMonth(now.getMonth() - 1));
        break;
      case 'quarter':
        dateFrom = new Date(now.setMonth(now.getMonth() - 3));
        break;
      default:
        dateFrom = undefined;
    }

    setLocalFilters({
      ...localFilters,
      dateFrom,
      dateTo: value === 'all' ? undefined : new Date(),
    });
  };

  const handleReset = () => {
    setLocalFilters({});
    setDateRange('all');
  };

  const handleApply = () => {
    onFiltersChange(localFilters);
    onOpenChange(false);
  };

  const isStatusSelected = (status: ExpenseStatus) => {
    const current = localFilters.status;
    if (!current) return false;
    return Array.isArray(current) ? current.includes(status) : current === status;
  };

  const isCategorySelected = (category: ExpenseCategory) => {
    const current = localFilters.category;
    if (!current) return false;
    return Array.isArray(current) ? current.includes(category) : current === category;
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side={isMobile ? 'bottom' : 'right'}
        className={cn(
          "flex flex-col",
          isMobile ? "h-[85vh] rounded-t-2xl" : "w-[400px]"
        )}
      >
        <SheetHeader className="pb-4 border-b border-border">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-elec-yellow" />
              Filters
              {activeFilterCount > 0 && (
                <Badge className="bg-elec-yellow text-black">
                  {activeFilterCount}
                </Badge>
              )}
            </SheetTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              Reset
            </Button>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4 space-y-6">
          {/* Status Filter */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Status</Label>
            <div className="flex flex-wrap gap-2">
              {STATUS_OPTIONS.map(({ value, label }) => (
                <Badge
                  key={value}
                  variant="outline"
                  className={cn(
                    "cursor-pointer transition-all px-3 py-1.5",
                    isStatusSelected(value)
                      ? "bg-elec-yellow/20 border-elec-yellow text-elec-yellow"
                      : "hover:bg-muted"
                  )}
                  onClick={() => handleStatusToggle(value)}
                >
                  {isStatusSelected(value) && <Check className="h-3 w-3 mr-1" />}
                  {label}
                </Badge>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Category</Label>
            <div className="flex flex-wrap gap-2">
              {EXPENSE_CATEGORIES.map(({ id, label }) => (
                <Badge
                  key={id}
                  variant="outline"
                  className={cn(
                    "cursor-pointer transition-all px-3 py-1.5",
                    isCategorySelected(id)
                      ? "bg-elec-yellow/20 border-elec-yellow text-elec-yellow"
                      : "hover:bg-muted"
                  )}
                  onClick={() => handleCategoryToggle(id)}
                >
                  {isCategorySelected(id) && <Check className="h-3 w-3 mr-1" />}
                  {label}
                </Badge>
              ))}
            </div>
          </div>

          {/* Employee Filter */}
          {employees.length > 0 && (
            <div className="space-y-3">
              <Label className="text-sm font-medium">Employee</Label>
              <Select
                value={localFilters.employeeId || 'all'}
                onValueChange={(value) =>
                  setLocalFilters({
                    ...localFilters,
                    employeeId: value === 'all' ? undefined : value,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="All employees" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All employees</SelectItem>
                  {employees.map((emp) => (
                    <SelectItem key={emp.id} value={emp.id}>
                      {emp.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Date Range Filter */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Date Range</Label>
            <Select value={dateRange} onValueChange={handleDateRangeChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DATE_RANGE_OPTIONS.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Receipt Filter */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <Label className="text-sm font-medium cursor-pointer">
              Has receipt attached
            </Label>
            <Switch
              checked={localFilters.hasReceipt === true}
              onCheckedChange={(checked) =>
                setLocalFilters({
                  ...localFilters,
                  hasReceipt: checked ? true : undefined,
                })
              }
            />
          </div>
        </div>

        <SheetFooter className="pt-4 border-t border-border pb-safe">
          <div className="flex gap-3 w-full">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 bg-elec-yellow text-black hover:bg-elec-yellow/90"
              onClick={handleApply}
            >
              Apply Filters
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default ExpenseFilterSheet;
