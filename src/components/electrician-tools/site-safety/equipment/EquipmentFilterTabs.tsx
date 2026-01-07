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
        "flex p-1 bg-white/5 rounded-xl border border-white/10",
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
              "relative flex-1 flex items-center justify-center gap-1.5",
              "px-2 py-2.5 rounded-lg text-sm font-medium",
              "transition-colors duration-200",
              "touch-manipulation min-h-[44px]",
              isActive ? "text-white" : "text-white/50 hover:text-white/70"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="activeEquipmentTabBg"
                className="absolute inset-0 bg-white/10 rounded-lg"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10 truncate">{tab.label}</span>
            {tab.count > 0 && (
              <span
                className={cn(
                  "relative z-10 min-w-[20px] h-5 flex items-center justify-center",
                  "px-1.5 rounded-full text-xs font-bold",
                  isActive
                    ? getActiveCountColor(tab.color)
                    : "bg-white/10 text-white/60"
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
