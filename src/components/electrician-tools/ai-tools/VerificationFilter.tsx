import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, AlertCircle, List } from "lucide-react";

interface VerificationFilterProps {
  selectedFilter: 'all' | 'pass' | 'fail' | 'testing';
  onFilterChange: (filter: 'all' | 'pass' | 'fail' | 'testing') => void;
  counts: {
    all: number;
    pass: number;
    fail: number;
    testing: number;
  };
}

export const VerificationFilter = ({ selectedFilter, onFilterChange, counts }: VerificationFilterProps) => {
  const filters = [
    { id: 'all' as const, label: 'All Checks', icon: List, count: counts.all },
    { id: 'fail' as const, label: 'Failed', icon: XCircle, count: counts.fail, color: 'text-red-500' },
    { id: 'testing' as const, label: 'Testing Required', icon: AlertCircle, count: counts.testing, color: 'text-amber-500' },
    { id: 'pass' as const, label: 'Passed', icon: CheckCircle2, count: counts.pass, color: 'text-green-500' },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => {
        const Icon = filter.icon;
        const isSelected = selectedFilter === filter.id;
        
        return (
          <Button
            key={filter.id}
            variant={isSelected ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterChange(filter.id)}
            className={`touch-target ${!isSelected && filter.color ? filter.color : ''}`}
          >
            <Icon className="h-4 w-4 mr-2" />
            {filter.label}
            <span className={`ml-2 px-1.5 py-0.5 rounded-full text-xs ${
              isSelected ? 'bg-background/20' : 'bg-muted'
            }`}>
              {filter.count}
            </span>
          </Button>
        );
      })}
    </div>
  );
};
