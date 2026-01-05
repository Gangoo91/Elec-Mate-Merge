import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface WorkerFilterPillsProps {
  filters: string[];
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
  workerCounts: Record<string, number>;
}

export function WorkerFilterPills({ 
  filters, 
  selectedFilter, 
  onFilterChange,
  workerCounts 
}: WorkerFilterPillsProps) {
  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex gap-2 pb-2">
        {filters.map((filter) => {
          const isActive = selectedFilter === filter;
          const count = workerCounts[filter] || 0;
          
          return (
            <button
              key={filter}
              onClick={() => onFilterChange(filter)}
              className={cn(
                "inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                "touch-manipulation active:scale-95",
                isActive 
                  ? "bg-elec-yellow text-elec-yellow-foreground shadow-md" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {filter}
              <Badge 
                variant="secondary" 
                className={cn(
                  "ml-0.5 h-5 min-w-[20px] px-1.5 text-xs font-semibold",
                  isActive 
                    ? "bg-elec-yellow-foreground/20 text-elec-yellow-foreground" 
                    : "bg-background/80"
                )}
              >
                {count}
              </Badge>
            </button>
          );
        })}
      </div>
      <ScrollBar orientation="horizontal" className="h-1.5" />
    </ScrollArea>
  );
}
