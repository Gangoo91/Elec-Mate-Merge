import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type EquipmentFilterId = "all" | "good" | "attention" | "overdue";

interface Tab {
  id: EquipmentFilterId;
  label: string;
  count: number;
  color?: "default" | "green" | "amber" | "red";
}

interface EquipmentFilterTabsProps {
  tabs: Tab[];
  activeTab: EquipmentFilterId;
  onChange: (tabId: EquipmentFilterId) => void;
  className?: string;
}

export function EquipmentFilterTabs({
  tabs,
  activeTab,
  onChange,
  className,
}: EquipmentFilterTabsProps) {
  return (
    <div
      className={cn(
        "flex gap-1.5 overflow-x-auto scrollbar-hide",
        "-mx-2 px-2", // Edge bleed for native feel
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "relative flex items-center justify-center gap-1",
              "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap",
              "transition-all duration-200",
              "touch-manipulation min-h-[36px]",
              "active:scale-[0.96]",
              isActive
                ? "bg-elec-yellow text-black"
                : "bg-white/5 text-white/60 border border-white/[0.08]"
            )}
          >
            <span>{tab.label}</span>
            {tab.count > 0 && (
              <span
                className={cn(
                  "min-w-[16px] h-4 flex items-center justify-center",
                  "px-1 rounded-full text-[10px] font-bold",
                  isActive
                    ? "bg-black/20 text-black"
                    : "bg-white/10 text-white/50"
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function getActiveCountColor(color?: string) {
  switch (color) {
    case "green":
      return "bg-emerald-500 text-white";
    case "amber":
      return "bg-amber-500 text-black";
    case "red":
      return "bg-red-500 text-white";
    default:
      return "bg-elec-yellow text-black";
  }
}

// Horizontal scrolling filter pills variant
interface EquipmentFilterPillsProps {
  activeFilter: EquipmentFilterId;
  counts: {
    all: number;
    good: number;
    attention: number;
    overdue: number;
  };
  onChange: (id: EquipmentFilterId) => void;
  className?: string;
}

export function EquipmentFilterPills({
  activeFilter,
  counts,
  onChange,
  className,
}: EquipmentFilterPillsProps) {
  const pills: Array<{
    id: EquipmentFilterId;
    label: string;
    count: number;
    color: "default" | "green" | "amber" | "red";
  }> = [
    { id: "all", label: "All", count: counts.all, color: "default" },
    { id: "good", label: "Good", count: counts.good, color: "green" },
    { id: "attention", label: "Attention", count: counts.attention, color: "amber" },
    { id: "overdue", label: "Overdue", count: counts.overdue, color: "red" },
  ];

  const colorMap = {
    default: {
      active: "bg-white/20 text-white border-white/30",
      inactive: "bg-white/5 text-white/50 border-white/10",
    },
    green: {
      active: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      inactive: "bg-white/5 text-white/50 border-white/10",
    },
    amber: {
      active: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      inactive: "bg-white/5 text-white/50 border-white/10",
    },
    red: {
      active: "bg-red-500/20 text-red-400 border-red-500/30",
      inactive: "bg-white/5 text-white/50 border-white/10",
    },
  };

  return (
    <div
      className={cn(
        "flex gap-2 overflow-x-auto pb-2 scrollbar-hide",
        "-mx-4 px-4 md:mx-0 md:px-0",
        className
      )}
    >
      {pills.map((pill) => {
        const isActive = pill.id === activeFilter;
        const colors = colorMap[pill.color];
        return (
          <button
            key={pill.id}
            onClick={() => onChange(pill.id)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-2 rounded-full",
              "text-sm font-medium whitespace-nowrap",
              "border transition-all duration-200",
              "touch-manipulation min-h-[44px]",
              "active:scale-95",
              isActive ? colors.active : colors.inactive
            )}
          >
            {pill.label}
            {pill.count > 0 && (
              <span
                className={cn(
                  "min-w-[18px] h-[18px] flex items-center justify-center",
                  "px-1 rounded-full text-[10px] font-bold",
                  isActive ? "bg-white/20" : "bg-white/10"
                )}
              >
                {pill.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
