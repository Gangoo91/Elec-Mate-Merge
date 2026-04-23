import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

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
  workerCounts,
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
                'inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[12.5px] font-medium transition-all duration-200',
                'touch-manipulation active:scale-95',
                isActive
                  ? 'bg-elec-yellow text-black'
                  : 'bg-[hsl(0_0%_12%)] text-white hover:bg-[hsl(0_0%_15%)] border border-white/[0.08]'
              )}
            >
              {filter}
              <span
                className={cn(
                  'ml-0.5 h-5 min-w-[20px] px-1.5 text-[11px] font-semibold tabular-nums rounded-full inline-flex items-center justify-center',
                  isActive ? 'bg-black/15 text-black' : 'bg-white/[0.08] text-white'
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
      <ScrollBar orientation="horizontal" className="h-1.5" />
    </ScrollArea>
  );
}
