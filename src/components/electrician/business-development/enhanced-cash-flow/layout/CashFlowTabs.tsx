import { cn } from "@/lib/utils";
import { Settings, TrendingUp, Calendar, Lightbulb } from "lucide-react";

export type CashFlowTabId = "setup" | "scenarios" | "projections" | "insights";

interface CashFlowTabsProps {
  activeTab: CashFlowTabId;
  onTabChange: (tab: CashFlowTabId) => void;
  className?: string;
}

const tabs: { id: CashFlowTabId; label: string; icon: typeof Settings }[] = [
  { id: "setup", label: "Setup", icon: Settings },
  { id: "scenarios", label: "Scenarios", icon: TrendingUp },
  { id: "projections", label: "Projections", icon: Calendar },
  { id: "insights", label: "Insights", icon: Lightbulb },
];

export const CashFlowTabs = ({ activeTab, onTabChange, className }: CashFlowTabsProps) => {
  return (
    <div className={cn("overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0", className)}>
      <div className="flex gap-2 min-w-max sm:min-w-0">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 touch-manipulation min-h-[44px]",
                isActive
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  : "bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white/80 active:scale-[0.98]"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
