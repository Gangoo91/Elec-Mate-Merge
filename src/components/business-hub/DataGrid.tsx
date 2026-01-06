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
    <div className={cn("grid gap-4 max-w-4xl mx-auto", gridCols[columns], className)}>
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <div
            key={index}
            className={cn(
              "p-5 rounded-2xl",
              "bg-white/[0.03] border border-white/10",
              "text-center",
              "hover:bg-white/[0.05] transition-colors"
            )}
          >
            {Icon && (
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
                  <Icon className="h-6 w-6 text-yellow-400" />
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
