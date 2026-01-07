import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TabItem {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

interface PremiumTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export function PremiumTabs({
  tabs,
  activeTab,
  onTabChange,
  className,
}: PremiumTabsProps) {
  return (
    <div
      className={cn(
        "relative flex w-full rounded-xl p-1",
        "bg-white/5 border border-white/10",
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "relative flex-1 flex items-center justify-center gap-2",
              "px-4 py-3 rounded-lg",
              "text-sm font-medium",
              "transition-colors duration-200",
              "min-h-[48px]",
              isActive ? "text-black" : "text-white/60 hover:text-white/80"
            )}
          >
            {/* Background indicator */}
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-elec-yellow rounded-lg"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}

            {/* Content */}
            <span className="relative z-10 flex items-center gap-2">
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
              {tab.count !== undefined && tab.count > 0 && (
                <Badge
                  variant="secondary"
                  className={cn(
                    "text-xs px-1.5 py-0 h-5 min-w-[20px] flex items-center justify-center",
                    isActive
                      ? "bg-black/20 text-black"
                      : "bg-white/10 text-white/70"
                  )}
                >
                  {tab.count > 99 ? "99+" : tab.count}
                </Badge>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
