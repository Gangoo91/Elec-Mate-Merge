import { useState } from 'react';
import { Filter, Check, RotateCcw } from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  EXPENSE_CATEGORIES,
  type ExpenseFilters,
  type ExpenseStatus,
  type ExpenseCategory,
} from '@/hooks/useExpenses';
import {
  SheetShell,
  Field,
  FormCard,
  PrimaryButton,
  SecondaryButton,
  selectTriggerClass,
  selectContentClass,
} from '@/components/employer/editorial';

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
    const current = Array.isArray(localFilters.status)
      ? localFilters.status
      : localFilters.status
        ? [localFilters.status]
        : [];
    const newStatus = current.includes(status)
      ? current.filter((s) => s !== status)
      : [...current, status];
    setLocalFilters({
      ...localFilters,
      status: newStatus.length > 0 ? newStatus : undefined,
    });
  };

  const handleCategoryToggle = (category: ExpenseCategory) => {
    const current = Array.isArray(localFilters.category)
      ? localFilters.category
      : localFilters.category
        ? [localFilters.category]
        : [];
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
          'flex flex-col p-0 overflow-hidden bg-[hsl(0_0%_8%)] border-white/[0.08]',
          isMobile ? 'h-[85vh] rounded-t-2xl' : 'w-[400px]'
        )}
      >
        <SheetShell
          eyebrow="Filters"
          title={
            <span className="inline-flex items-center gap-2">
              <Filter className="h-5 w-5 text-elec-yellow" />
              Filters
              {activeFilterCount > 0 && (
                <Badge className="bg-elec-yellow text-black">{activeFilterCount}</Badge>
              )}
            </span>
          }
          footer={
            <>
              <SecondaryButton fullWidth onClick={() => onOpenChange(false)}>
                Cancel
              </SecondaryButton>
              <PrimaryButton fullWidth onClick={handleApply}>
                Apply filters
              </PrimaryButton>
            </>
          }
        >
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleReset}
              className="text-[12px] font-medium text-white hover:text-elec-yellow transition-colors inline-flex items-center gap-1 touch-manipulation"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
          </div>

          {/* Status Filter */}
          <FormCard eyebrow="Status">
            <div className="flex flex-wrap gap-2">
              {STATUS_OPTIONS.map(({ value, label }) => {
                const selected = isStatusSelected(value);
                return (
                  <button
                    key={value}
                    type="button"
                    className={cn(
                      'inline-flex items-center h-8 px-3 rounded-full text-[12px] font-medium transition-colors touch-manipulation',
                      selected
                        ? 'bg-elec-yellow text-black'
                        : 'bg-white/[0.06] text-white border border-white/[0.1] hover:bg-white/[0.1]'
                    )}
                    onClick={() => handleStatusToggle(value)}
                  >
                    {selected && <Check className="h-3 w-3 mr-1" />}
                    {label}
                  </button>
                );
              })}
            </div>
          </FormCard>

          {/* Category Filter */}
          <FormCard eyebrow="Category">
            <div className="flex flex-wrap gap-2">
              {EXPENSE_CATEGORIES.map(({ id, label }) => {
                const selected = isCategorySelected(id);
                return (
                  <button
                    key={id}
                    type="button"
                    className={cn(
                      'inline-flex items-center h-8 px-3 rounded-full text-[12px] font-medium transition-colors touch-manipulation',
                      selected
                        ? 'bg-elec-yellow text-black'
                        : 'bg-white/[0.06] text-white border border-white/[0.1] hover:bg-white/[0.1]'
                    )}
                    onClick={() => handleCategoryToggle(id)}
                  >
                    {selected && <Check className="h-3 w-3 mr-1" />}
                    {label}
                  </button>
                );
              })}
            </div>
          </FormCard>

          {/* Employee Filter */}
          {employees.length > 0 && (
            <FormCard eyebrow="Employee">
              <Field label="Filter by employee">
                <Select
                  value={localFilters.employeeId || 'all'}
                  onValueChange={(value) =>
                    setLocalFilters({
                      ...localFilters,
                      employeeId: value === 'all' ? undefined : value,
                    })
                  }
                >
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="All employees" />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    <SelectItem value="all">All employees</SelectItem>
                    {employees.map((emp) => (
                      <SelectItem key={emp.id} value={emp.id}>
                        {emp.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </FormCard>
          )}

          {/* Date Range Filter */}
          <FormCard eyebrow="Date range">
            <Field label="Period">
              <Select value={dateRange} onValueChange={handleDateRangeChange}>
                <SelectTrigger className={selectTriggerClass}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className={selectContentClass}>
                  {DATE_RANGE_OPTIONS.map(({ value, label }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </FormCard>

          {/* Receipt Filter */}
          <FormCard eyebrow="Receipt">
            <div className="flex items-center justify-between">
              <label className="text-[13px] text-white cursor-pointer">
                Has receipt attached
              </label>
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
          </FormCard>
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}

export default ExpenseFilterSheet;
