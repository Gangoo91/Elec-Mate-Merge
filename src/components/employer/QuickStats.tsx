import { LucideIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export interface QuickStat {
  icon: LucideIcon;
  value: string | number;
  label: string;
  color?: "yellow" | "green" | "blue" | "orange" | "red" | "purple";
  onClick?: () => void;
  isLoading?: boolean;
  pulse?: boolean;
  suffix?: string;
}

interface QuickStatsProps {
  stats: QuickStat[];
  className?: string;
}

const colorMap = {
  yellow: {
    bg: "from-elec-yellow/15 to-elec-yellow/5",
    border: "border-elec-yellow/30",
    borderHover: "hover:border-elec-yellow/50",
    icon: "text-elec-yellow",
    iconBg: "bg-elec-yellow/20",
    value: "text-elec-yellow",
    shadow: "hover:shadow-elec-yellow/10",
  },
  green: {
    bg: "from-green-500/15 to-green-500/5",
    border: "border-green-500/30",
    borderHover: "hover:border-green-500/50",
    icon: "text-green-400",
    iconBg: "bg-green-500/20",
    value: "text-green-400",
    shadow: "hover:shadow-green-500/10",
  },
  blue: {
    bg: "from-blue-500/15 to-blue-500/5",
    border: "border-blue-500/30",
    borderHover: "hover:border-blue-500/50",
    icon: "text-blue-400",
    iconBg: "bg-blue-500/20",
    value: "text-blue-400",
    shadow: "hover:shadow-blue-500/10",
  },
  orange: {
    bg: "from-orange-500/15 to-orange-500/5",
    border: "border-orange-500/30",
    borderHover: "hover:border-orange-500/50",
    icon: "text-orange-400",
    iconBg: "bg-orange-500/20",
    value: "text-orange-400",
    shadow: "hover:shadow-orange-500/10",
  },
  red: {
    bg: "from-red-500/15 to-red-500/5",
    border: "border-red-500/30",
    borderHover: "hover:border-red-500/50",
    icon: "text-red-400",
    iconBg: "bg-red-500/20",
    value: "text-red-400",
    shadow: "hover:shadow-red-500/10",
  },
  purple: {
    bg: "from-purple-500/15 to-purple-500/5",
    border: "border-purple-500/30",
    borderHover: "hover:border-purple-500/50",
    icon: "text-purple-400",
    iconBg: "bg-purple-500/20",
    value: "text-purple-400",
    shadow: "hover:shadow-purple-500/10",
  },
};

// Horizontal scrollable stats (mobile-friendly)
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
              "relative shrink-0 snap-start",
              "flex items-center gap-3 p-3 rounded-xl",
              "bg-gradient-to-br border-2 transition-all duration-200",
              "backdrop-blur-sm",
              colors.bg,
              colors.border,
              stat.onClick && cn(
                "cursor-pointer",
                colors.borderHover,
                colors.shadow,
                "hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
              ),
              !stat.onClick && "cursor-default"
            )}
          >
            {/* Pulse indicator */}
            {stat.pulse && !stat.isLoading && (
              <div className="absolute top-1.5 right-1.5">
                <span className="relative flex h-2 w-2">
                  <span className={cn(
                    "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                    stat.color === "red" ? "bg-red-500" : "bg-orange-500"
                  )} />
                  <span className={cn(
                    "relative inline-flex rounded-full h-2 w-2",
                    stat.color === "red" ? "bg-red-500" : "bg-orange-500"
                  )} />
                </span>
              </div>
            )}

            <div className={cn(
              "p-2 rounded-lg",
              colors.iconBg
            )}>
              <Icon className={cn("h-4 w-4", colors.icon)} />
            </div>
            <div className="text-left">
              {stat.isLoading ? (
                <Skeleton className="h-5 w-10 mb-1" />
              ) : (
                <p className={cn(
                  "text-lg font-bold leading-none tabular-nums",
                  colors.value
                )}>
                  {stat.value}{stat.suffix}
                </p>
              )}
              <p className="text-[10px] text-muted-foreground mt-0.5 whitespace-nowrap font-medium">
                {stat.label}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}

// Grid layout for stats (centered cards)
export function QuickStatsGrid({ stats, className }: QuickStatsProps) {
  return (
    <div className={cn(
      "grid gap-2 sm:gap-3",
      stats.length === 2 && "grid-cols-2",
      stats.length === 3 && "grid-cols-3",
      stats.length >= 4 && "grid-cols-2 sm:grid-cols-4",
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
              "relative flex flex-col items-center p-3 sm:p-4 rounded-xl text-center",
              "bg-gradient-to-br border-2 transition-all duration-200",
              "backdrop-blur-sm",
              colors.bg,
              colors.border,
              stat.onClick && cn(
                "cursor-pointer",
                colors.borderHover,
                colors.shadow,
                "hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
              ),
              !stat.onClick && "cursor-default"
            )}
          >
            {/* Pulse indicator */}
            {stat.pulse && !stat.isLoading && (
              <div className="absolute top-2 right-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className={cn(
                    "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                    stat.color === "red" ? "bg-red-500" : "bg-orange-500"
                  )} />
                  <span className={cn(
                    "relative inline-flex rounded-full h-2.5 w-2.5",
                    stat.color === "red" ? "bg-red-500" : "bg-orange-500"
                  )} />
                </span>
              </div>
            )}

            <div className={cn(
              "p-2 sm:p-2.5 rounded-xl mb-2",
              colors.iconBg
            )}>
              <Icon className={cn("h-5 w-5", colors.icon)} />
            </div>
            {stat.isLoading ? (
              <Skeleton className="h-7 w-10 mb-1" />
            ) : (
              <p className={cn(
                "text-xl sm:text-2xl font-bold tabular-nums",
                colors.value
              )}>
                {stat.value}{stat.suffix}
              </p>
            )}
            <p className="text-[10px] sm:text-xs text-muted-foreground font-medium mt-0.5">
              {stat.label}
            </p>
          </button>
        );
      })}
    </div>
  );
}

// Compact inline stats (for tight spaces)
export function QuickStatsCompact({ stats, className }: QuickStatsProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const colors = colorMap[stat.color || "yellow"];

        return (
          <div
            key={index}
            onClick={stat.onClick}
            className={cn(
              "relative inline-flex items-center gap-2 px-3 py-2 rounded-lg",
              "bg-gradient-to-br border transition-all duration-200",
              colors.bg,
              colors.border,
              stat.onClick && cn(
                "cursor-pointer",
                colors.borderHover,
                "hover:scale-[1.02] active:scale-[0.98]"
              )
            )}
          >
            {stat.pulse && !stat.isLoading && (
              <span className="absolute -top-0.5 -right-0.5 h-2 w-2">
                <span className={cn(
                  "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                  stat.color === "red" ? "bg-red-500" : "bg-orange-500"
                )} />
                <span className={cn(
                  "relative inline-flex rounded-full h-2 w-2",
                  stat.color === "red" ? "bg-red-500" : "bg-orange-500"
                )} />
              </span>
            )}
            <Icon className={cn("h-4 w-4", colors.icon)} />
            {stat.isLoading ? (
              <Skeleton className="h-4 w-6" />
            ) : (
              <span className={cn("text-sm font-bold tabular-nums", colors.value)}>
                {stat.value}{stat.suffix}
              </span>
            )}
            <span className="text-xs text-muted-foreground">{stat.label}</span>
          </div>
        );
      })}
    </div>
  );
}

export default QuickStats;
