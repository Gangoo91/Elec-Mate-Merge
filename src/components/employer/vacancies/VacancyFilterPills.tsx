import { motion } from "framer-motion";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface FilterOption<T extends string> {
  value: T;
  label: string;
  count: number;
  color?: "yellow" | "blue" | "purple" | "cyan" | "emerald" | "green" | "red" | "gray" | "amber";
}

interface VacancyFilterPillsProps<T extends string> {
  options: FilterOption<T>[];
  selected: T;
  onSelect: (value: T) => void;
  className?: string;
}

const colorConfig = {
  yellow: {
    active: "bg-elec-yellow text-black border-elec-yellow",
    inactive: "bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30 hover:bg-elec-yellow/20",
    count: "bg-black/20",
  },
  blue: {
    active: "bg-blue-500 text-white border-blue-500",
    inactive: "bg-blue-500/10 text-blue-400 border-blue-500/30 hover:bg-blue-500/20",
    count: "bg-white/20",
  },
  purple: {
    active: "bg-purple-500 text-white border-purple-500",
    inactive: "bg-purple-500/10 text-purple-400 border-purple-500/30 hover:bg-purple-500/20",
    count: "bg-white/20",
  },
  cyan: {
    active: "bg-cyan-500 text-white border-cyan-500",
    inactive: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/20",
    count: "bg-white/20",
  },
  emerald: {
    active: "bg-emerald-500 text-white border-emerald-500",
    inactive: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20",
    count: "bg-white/20",
  },
  green: {
    active: "bg-green-500 text-white border-green-500",
    inactive: "bg-green-500/10 text-green-400 border-green-500/30 hover:bg-green-500/20",
    count: "bg-white/20",
  },
  red: {
    active: "bg-red-500 text-white border-red-500",
    inactive: "bg-red-500/10 text-red-400 border-red-500/30 hover:bg-red-500/20",
    count: "bg-white/20",
  },
  gray: {
    active: "bg-gray-500 text-white border-gray-500",
    inactive: "bg-gray-500/10 text-gray-400 border-gray-500/30 hover:bg-gray-500/20",
    count: "bg-white/20",
  },
  amber: {
    active: "bg-amber-500 text-black border-amber-500",
    inactive: "bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20",
    count: "bg-black/20",
  },
};

export function VacancyFilterPills<T extends string>({
  options,
  selected,
  onSelect,
  className,
}: VacancyFilterPillsProps<T>) {
  return (
    <ScrollArea className={cn("w-full", className)}>
      <div className="flex gap-2 pb-2">
        {options.map((option, index) => {
          const isActive = selected === option.value;
          const color = option.color || "yellow";
          const config = colorConfig[color];

          return (
            <motion.button
              key={option.value}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onSelect(option.value)}
              className={cn(
                "relative flex items-center gap-2 px-4 py-2.5",
                "rounded-full border text-sm font-medium",
                "transition-all duration-200",
                "shrink-0 min-h-[44px]",
                "touch-manipulation",
                isActive ? config.active : config.inactive
              )}
            >
              <span>{option.label}</span>
              {option.count > 0 && (
                <span
                  className={cn(
                    "px-2 py-0.5 rounded-full text-xs font-semibold",
                    isActive ? config.count : "bg-white/10"
                  )}
                >
                  {option.count}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>
      <ScrollBar orientation="horizontal" className="h-1" />
    </ScrollArea>
  );
}

// Pre-configured filter pills for common use cases
export const candidateStatusColors: Record<string, FilterOption<string>["color"]> = {
  all: "yellow",
  New: "blue",
  Reviewing: "amber",
  Shortlisted: "purple",
  Interviewed: "cyan",
  Offered: "emerald",
  Hired: "green",
  Rejected: "red",
};

export const vacancyStatusColors: Record<string, FilterOption<string>["color"]> = {
  all: "yellow",
  Open: "emerald",
  Closed: "gray",
  Draft: "amber",
};

export const elecIdTierColors: Record<string, FilterOption<string>["color"]> = {
  all: "yellow",
  basic: "gray",
  verified: "blue",
  premium: "amber",
};
