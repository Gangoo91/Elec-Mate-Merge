import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

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
  { value: "Active", label: "Active", colour: "bg-success" },
  { value: "Pending", label: "Pending", colour: "bg-warning" },
  { value: "Completed", label: "Completed", colour: "bg-muted-foreground" },
  { value: "On Hold", label: "On Hold", colour: "bg-info" },
  { value: "Cancelled", label: "Cancelled", colour: "bg-destructive" },
];

export function JobFilterSheet({ 
  open, 
  onOpenChange, 
  filters, 
  onFiltersChange,
  maxJobValue 
}: JobFilterSheetProps) {
  
  const handleStatusToggle = (status: string) => {
    const newStatuses = filters.statuses.includes(status)
      ? filters.statuses.filter(s => s !== status)
      : [...filters.statuses, status];
    onFiltersChange({ ...filters, statuses: newStatuses });
  };

  const handleValueChange = (values: number[]) => {
    onFiltersChange({ 
      ...filters, 
      minValue: values[0], 
      maxValue: values[1] 
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
    filters.statuses.length + 
    (filters.minValue > 0 || filters.maxValue < maxJobValue ? 1 : 0);

  const formatValue = (val: number) => {
    if (val >= 1000) return `£${(val / 1000).toFixed(0)}k`;
    return `£${val}`;
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-auto max-h-[80vh] rounded-t-2xl">
        <SheetHeader className="text-left pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-lg font-semibold">Filter Jobs</SheetTitle>
            {activeFilterCount > 0 && (
              <Button variant="ghost" size="sm" onClick={handleClearAll} className="text-muted-foreground">
                <X className="h-4 w-4 mr-1" />
                Clear all
              </Button>
            )}
          </div>
          <SheetDescription>
            Narrow down your job list
          </SheetDescription>
        </SheetHeader>
        
        <div className="space-y-6 pb-6">
          {/* Status Filter */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Status
            </Label>
            <div className="flex flex-wrap gap-2">
              {STATUS_OPTIONS.map((option) => {
                const isSelected = filters.statuses.includes(option.value);
                return (
                  <button
                    key={option.value}
                    onClick={() => handleStatusToggle(option.value)}
                    className={`
                      flex items-center gap-2 px-3 py-2 rounded-lg border transition-all
                      ${isSelected 
                        ? 'border-elec-yellow bg-elec-yellow/10 text-foreground' 
                        : 'border-border bg-elec-gray text-muted-foreground hover:border-elec-yellow/50'
                      }
                    `}
                  >
                    <div className={`w-2 h-2 rounded-full ${option.colour}`} />
                    <span className="text-sm font-medium">{option.label}</span>
                    {isSelected && (
                      <X className="h-3 w-3 text-muted-foreground" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Value Range Filter */}
          <div className="space-y-4">
            <Label className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Value Range
            </Label>
            <div className="px-1">
              <Slider
                value={[filters.minValue, filters.maxValue]}
                onValueChange={handleValueChange}
                max={maxJobValue}
                step={1000}
                className="w-full"
              />
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-medium text-foreground">{formatValue(filters.minValue)}</span>
              <span className="font-medium text-foreground">{formatValue(filters.maxValue)}</span>
            </div>
          </div>
          
          {/* Apply Button */}
          <Button 
            onClick={() => onOpenChange(false)} 
            className="w-full h-12 font-semibold"
          >
            Apply Filters
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="ml-2 bg-background text-elec-yellow">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
