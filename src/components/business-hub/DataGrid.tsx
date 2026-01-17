import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

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
    2: "grid-cols-2",
    3: "grid-cols-2 sm:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-4",
  };

  return (
    <div className={cn("grid gap-3 sm:gap-4 max-w-5xl mx-auto", gridCols[columns], className)}>
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <div
            key={index}
            className={cn(
              "p-4 sm:p-5 rounded-xl sm:rounded-2xl",
              "bg-white/[0.03] border border-white/10",
              "text-center",
              "touch-manipulation active:scale-[0.98] active:bg-white/[0.06] transition-all"
            )}
          >
            {Icon && (
              <div className="flex justify-center mb-2 sm:mb-3">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                </div>
              </div>
            )}
            <p className="text-2xl font-bold text-white">{item.value}</p>
            <p className="text-sm text-white/80 mt-1 font-medium">{item.label}</p>
            {item.sublabel && (
              <p className="text-xs text-white mt-1">{item.sublabel}</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DataGrid;
