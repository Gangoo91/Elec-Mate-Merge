import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface QuickStat {
  icon: LucideIcon;
  value: string | number;
  label: string;
  color?: "yellow" | "green" | "blue" | "orange" | "red" | "purple";
  onClick?: () => void;
}

interface QuickStatsProps {
  stats: QuickStat[];
  className?: string;
}

const colorMap = {
  yellow: {
    bg: "bg-elec-yellow/10",
    border: "border-elec-yellow/20",
    icon: "text-elec-yellow",
  },
  green: {
    bg: "bg-success/10",
    border: "border-success/20",
    icon: "text-success",
  },
  blue: {
    bg: "bg-info/10",
    border: "border-info/20",
    icon: "text-info",
  },
  orange: {
    bg: "bg-warning/10",
    border: "border-warning/20",
    icon: "text-warning",
  },
  red: {
    bg: "bg-destructive/10",
    border: "border-destructive/20",
    icon: "text-destructive",
  },
  purple: {
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    icon: "text-purple-500",
  },
};

export function QuickStats({ stats, className }: QuickStatsProps) {
  return (
    <div className={cn(
      "flex gap-2 overflow-x-auto hide-scrollbar pb-1",
      "-mx-4 px-4 md:mx-0 md:px-0",
      "snap-x snap-mandatory",
      className
    )}>
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const colors = colorMap[stat.color || "yellow"];

        return (
          <button
            key={index}
            onClick={stat.onClick}
            disabled={!stat.onClick}
            className={cn(
              "shrink-0 snap-start",
              "flex items-center gap-2.5 p-3 rounded-xl",
              "border transition-all duration-200",
              colors.bg,
              colors.border,
              stat.onClick && "cursor-pointer hover:scale-[1.02] active:scale-[0.98]",
              !stat.onClick && "cursor-default"
            )}
          >
            <div className={cn(
              "p-1.5 rounded-lg",
              colors.bg.replace("/10", "/20")
            )}>
              <Icon className={cn("h-4 w-4", colors.icon)} />
            </div>
            <div className="text-left">
              <p className="text-base sm:text-lg font-bold text-foreground leading-none">
                {stat.value}
              </p>
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 whitespace-nowrap">
                {stat.label}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}

// Alternative grid layout for fixed stats (non-scrolling)
export function QuickStatsGrid({ stats, className }: QuickStatsProps) {
  return (
    <div className={cn(
      "grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3",
      className
    )}>
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const colors = colorMap[stat.color || "yellow"];

        return (
          <button
            key={index}
            onClick={stat.onClick}
            disabled={!stat.onClick}
            className={cn(
              "flex items-center gap-2 p-3 rounded-xl",
              "border transition-all duration-200",
              colors.bg,
              colors.border,
              stat.onClick && "cursor-pointer hover:scale-[1.02] active:scale-[0.98]",
              !stat.onClick && "cursor-default"
            )}
          >
            <div className={cn(
              "p-1.5 rounded-lg shrink-0",
              colors.bg.replace("/10", "/20")
            )}>
              <Icon className={cn("h-4 w-4", colors.icon)} />
            </div>
            <div className="text-left min-w-0">
              <p className="text-sm sm:text-base font-bold text-foreground leading-none truncate">
                {stat.value}
              </p>
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 truncate">
                {stat.label}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
