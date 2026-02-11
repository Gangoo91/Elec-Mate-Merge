import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
  count?: number;
}

interface BriefingFilterTabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

export function BriefingFilterTabs({
  tabs,
  activeTab,
  onChange,
  className,
}: BriefingFilterTabsProps) {
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
              "px-3 py-2.5 rounded-lg text-sm font-medium",
              "transition-colors duration-200",
              "touch-manipulation min-h-[44px]",
              isActive ? "text-white" : "text-white/50 hover:text-white/70"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="activeTabBg"
                className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-400/10 rounded-lg border border-yellow-400/30"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
            {tab.count !== undefined && tab.count > 0 && (
              <span
                className={cn(
                  "relative z-10 min-w-[20px] h-5 flex items-center justify-center",
                  "px-1.5 rounded-full text-xs font-bold",
                  isActive
                    ? "bg-elec-yellow text-black"
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

// Horizontal scrolling filter pills variant
interface FilterPill {
  id: string;
  label: string;
  count?: number;
  color?: "default" | "yellow" | "green" | "blue" | "amber" | "red";
}

interface BriefingFilterPillsProps {
  pills: FilterPill[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

export function BriefingFilterPills({
  pills,
  activeId,
  onChange,
  className,
}: BriefingFilterPillsProps) {
  const colorMap = {
    default: {
      active: "bg-white/20 text-white border-white/30",
      inactive: "bg-white/5 text-white/50 border-white/10",
    },
    yellow: {
      active: "bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30",
      inactive: "bg-white/5 text-white/50 border-white/10",
    },
    green: {
      active: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      inactive: "bg-white/5 text-white/50 border-white/10",
    },
    blue: {
      active: "bg-blue-500/20 text-blue-400 border-blue-500/30",
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
        const isActive = pill.id === activeId;
        const colors = colorMap[pill.color || "default"];
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
            {pill.count !== undefined && pill.count > 0 && (
              <span
                className={cn(
                  "min-w-[18px] h-[18px] flex items-center justify-center",
                  "px-1 rounded-full text-xs font-bold",
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
