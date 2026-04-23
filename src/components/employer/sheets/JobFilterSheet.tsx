import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { X } from 'lucide-react';
import {
  SheetShell,
  FormCard,
  PrimaryButton,
  SecondaryButton,
  Pill,
  fieldLabelClass,
} from '@/components/employer/editorial';
import { cn } from '@/lib/utils';

export interface JobFilters {
  statuses: string[];
  minValue: number;
  maxValue: number;
}

interface JobFilterSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: JobFilters;
  onFiltersChange: (filters: JobFilters) => void;
  maxJobValue: number;
}

const STATUS_OPTIONS = [
  { value: 'Active', label: 'Active', dot: 'bg-green-400' },
  { value: 'Pending', label: 'Pending', dot: 'bg-amber-400' },
  { value: 'Completed', label: 'Completed', dot: 'bg-white/40' },
  { value: 'On Hold', label: 'On Hold', dot: 'bg-cyan-400' },
  { value: 'Cancelled', label: 'Cancelled', dot: 'bg-red-400' },
];

export function JobFilterSheet({
  open,
  onOpenChange,
  filters,
  onFiltersChange,
  maxJobValue,
}: JobFilterSheetProps) {
  const handleStatusToggle = (status: string) => {
    const newStatuses = filters.statuses.includes(status)
      ? filters.statuses.filter((s) => s !== status)
      : [...filters.statuses, status];
    onFiltersChange({ ...filters, statuses: newStatuses });
  };

  const handleValueChange = (values: number[]) => {
    onFiltersChange({
      ...filters,
      minValue: values[0],
      maxValue: values[1],
    });
  };

  const handleClearAll = () => {
    onFiltersChange({
      statuses: [],
      minValue: 0,
      maxValue: maxJobValue,
    });
  };

  const activeFilterCount =
    filters.statuses.length + (filters.minValue > 0 || filters.maxValue < maxJobValue ? 1 : 0);

  const formatValue = (val: number) => {
    if (val >= 1000) return `£${(val / 1000).toFixed(0)}k`;
    return `£${val}`;
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[85vh] p-0 overflow-hidden bg-[hsl(0_0%_8%)]"
      >
        <SheetShell
          eyebrow="Filters"
          title="Filter jobs"
          description="Narrow down your job list by status and value."
          footer={
            <>
              <SecondaryButton onClick={handleClearAll} fullWidth>
                <X className="h-4 w-4 mr-1" />
                Clear all
              </SecondaryButton>
              <PrimaryButton onClick={() => onOpenChange(false)} fullWidth>
                Apply{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
              </PrimaryButton>
            </>
          }
        >
          <FormCard eyebrow="Status">
            <div className="flex flex-wrap gap-2">
              {STATUS_OPTIONS.map((option) => {
                const isSelected = filters.statuses.includes(option.value);
                return (
                  <button
                    key={option.value}
                    onClick={() => handleStatusToggle(option.value)}
                    className={cn(
                      'inline-flex items-center gap-2 px-3 py-2 rounded-full border text-[12.5px] font-medium transition-colors touch-manipulation',
                      isSelected
                        ? 'bg-elec-yellow/15 border-elec-yellow/60 text-white'
                        : 'bg-[hsl(0_0%_9%)] border-white/[0.08] text-white hover:bg-white/[0.06]'
                    )}
                  >
                    <span className={cn('w-1.5 h-1.5 rounded-full', option.dot)} />
                    {option.label}
                    {isSelected && <X className="h-3 w-3 text-white" />}
                  </button>
                );
              })}
            </div>
          </FormCard>

          <FormCard eyebrow="Value range">
            <div className="space-y-4">
              <label className={fieldLabelClass}>Set minimum and maximum project value</label>
              <Slider
                value={[filters.minValue, filters.maxValue]}
                onValueChange={handleValueChange}
                max={maxJobValue}
                step={1000}
                className="w-full"
              />
              <div className="flex justify-between items-center">
                <Pill tone="yellow">{formatValue(filters.minValue)}</Pill>
                <span className="text-[11px] text-white">to</span>
                <Pill tone="yellow">{formatValue(filters.maxValue)}</Pill>
              </div>
            </div>
          </FormCard>
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}
