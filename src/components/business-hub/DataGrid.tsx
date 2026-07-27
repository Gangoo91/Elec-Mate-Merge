import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DataItem {
  label: string;
  value: string;
  sublabel?: string;
  icon?: LucideIcon;
}

interface DataGridProps {
  items: DataItem[];
  columns?: 2 | 3 | 4;
  className?: string;
}

const DataGrid = ({ items, columns = 4, className }: DataGridProps) => {
  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 sm:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-4',
  };

  return (
    <div className={cn('grid gap-3 sm:gap-4 max-w-5xl mx-auto', gridCols[columns], className)}>
      {items.map((item, index) => {
        return (
          <div
            key={index}
            className={cn(
              'p-4 sm:p-5 rounded-xl sm:rounded-2xl',
              'bg-[hsl(0_0%_12%)] border border-white/[0.08]',
              'text-left'
            )}
          >
            <p className="text-[22px] font-bold text-white tabular-nums leading-none tracking-tight">
              {item.value}
            </p>
            <p className="text-[12px] text-white/80 mt-2 font-medium">{item.label}</p>
            {item.sublabel && <p className="text-[11px] text-white/50 mt-0.5">{item.sublabel}</p>}
          </div>
        );
      })}
    </div>
  );
};

export default DataGrid;
