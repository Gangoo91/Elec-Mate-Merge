import { useRef, useEffect, ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
  icon?: LucideIcon;
}

interface HorizontalTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
  children?: ReactNode;
}

const HorizontalTabs = ({
  tabs,
  activeTab,
  onTabChange,
  className,
  children,
}: HorizontalTabsProps) => {
  const tabsRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);

  // Scroll active tab into view when it changes
  useEffect(() => {
    if (activeTabRef.current && tabsRef.current) {
      const container = tabsRef.current;
      const activeElement = activeTabRef.current;
      const containerWidth = container.offsetWidth;
      const elementLeft = activeElement.offsetLeft;
      const elementWidth = activeElement.offsetWidth;

      // Center the active tab in the container
      const scrollPosition = elementLeft - containerWidth / 2 + elementWidth / 2;
      container.scrollTo({ left: scrollPosition, behavior: "smooth" });
    }
  }, [activeTab]);

  return (
    <div className={cn("space-y-4", className)}>
      {/* Tabs Container */}
      <div className="relative">
        {/* Gradient fade indicators */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#1a1a1a] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#1a1a1a] to-transparent z-10 pointer-events-none" />

        {/* Scrollable tabs */}
        <div
          ref={tabsRef}
          className="flex gap-2 overflow-x-auto scrollbar-hide px-1 py-1 -mx-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                ref={isActive ? activeTabRef : null}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap",
                  "text-sm font-medium transition-all duration-200",
                  "touch-manipulation active:scale-[0.97]",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/50",
                  isActive
                    ? "bg-yellow-400 text-black"
                    : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10"
                )}
              >
                {Icon && (
                  <Icon
                    className={cn(
                      "h-4 w-4 flex-shrink-0",
                      isActive ? "text-black" : "text-yellow-400"
                    )}
                  />
                )}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      {children && <div className="animate-fade-in">{children}</div>}
    </div>
  );
};

export default HorizontalTabs;
