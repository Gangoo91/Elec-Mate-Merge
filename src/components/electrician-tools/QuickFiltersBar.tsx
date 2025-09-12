import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface QuickFilter {
  id: string;
  label: string;
  count: number;
  active: boolean;
}

interface QuickFiltersBarProps {
  onFiltersChange?: (activeFilters: string[]) => void;
}

const QuickFiltersBar = ({ onFiltersChange }: QuickFiltersBarProps) => {
  const [filters, setFilters] = useState<QuickFilter[]>([
    { id: "on-sale", label: "On Sale", count: 127, active: false },
    { id: "in-stock", label: "In Stock", count: 890, active: false },
    { id: "next-day", label: "Next Day", count: 234, active: false },
    { id: "trade-price", label: "Trade Price", count: 567, active: false },
    { id: "high-rated", label: "4+ Stars", count: 445, active: false },
    { id: "screwfix", label: "Screwfix", count: 312, active: false },
    { id: "toolstation", label: "Toolstation", count: 289, active: false },
  ]);

  const toggleFilter = (filterId: string) => {
    const updatedFilters = filters.map(filter =>
      filter.id === filterId ? { ...filter, active: !filter.active } : filter
    );
    setFilters(updatedFilters);
    
    const activeFilters = updatedFilters.filter(f => f.active).map(f => f.id);
    onFiltersChange?.(activeFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = filters.map(filter => ({ ...filter, active: false }));
    setFilters(clearedFilters);
    onFiltersChange?.([]);
  };

  const activeCount = filters.filter(f => f.active).length;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground mr-2">Quick Filters:</span>
      
      {filters.map((filter) => (
        <Badge 
          key={filter.id}
          variant={filter.active ? "default" : "outline"}
          className={`cursor-pointer transition-all ${
            filter.active 
              ? "bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90" 
              : "border-elec-yellow/30 hover:bg-elec-yellow/10 text-elec-light"
          }`}
          onClick={() => toggleFilter(filter.id)}
        >
          {filter.label} ({filter.count})
        </Badge>
      ))}

      {activeCount > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearAllFilters}
          className="text-xs text-muted-foreground hover:text-elec-yellow ml-2"
        >
          <X className="h-3 w-3 mr-1" />
          Clear ({activeCount})
        </Button>
      )}
    </div>
  );
};

export default QuickFiltersBar;