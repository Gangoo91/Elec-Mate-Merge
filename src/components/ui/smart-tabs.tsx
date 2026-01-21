
import React, { useRef, useEffect } from 'react';
import { MobileTabs, MobileTabsList, MobileTabsTrigger, MobileTabsContent } from '@/components/ui/mobile-tabs';
import { useIsMobile } from '@/hooks/use-mobile';
import { useHaptics } from '@/hooks/useHaptics';
import { cn } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';

export interface SmartTab {
  value: string;
  label: string;
  shortLabel?: string; // Optional shorter label for mobile
  icon?: React.ReactNode;
  content: React.ReactNode;
  /** Optional - whether this tab is completed */
  isComplete?: boolean;
}

interface SmartTabsProps {
  tabs: SmartTab[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  breakpoint?: number; // Deprecated - we always show all tabs now
  /** Optional - map of tab values to completion status */
  completedTabs?: Record<string, boolean>;
  /** Optional - show overall progress bar */
  showProgress?: boolean;
}

export const SmartTabs = ({
  tabs,
  defaultValue,
  value,
  onValueChange,
  className,
  completedTabs = {},
  showProgress = false
}: SmartTabsProps) => {
  const isMobile = useIsMobile();
  const haptics = useHaptics();
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);

  // Always call useState hook to maintain hook order consistency
  const [currentValue, setCurrentValue] = React.useState(defaultValue || tabs[0]?.value || '');
  const activeValue = value ?? currentValue;

  const handleValueChange = (newValue: string) => {
    haptics.tap();
    setCurrentValue(newValue);
    onValueChange?.(newValue);
  };

  // Check if tab is complete (from tab prop or completedTabs map)
  const isTabComplete = (tab: SmartTab): boolean => {
    return tab.isComplete || completedTabs[tab.value] || false;
  };

  // Calculate progress percentage
  const completedCount = tabs.filter(tab => isTabComplete(tab)).length;
  const progressPercent = Math.round((completedCount / tabs.length) * 100);

  // Auto-scroll to active tab on mobile
  useEffect(() => {
    if (isMobile && activeTabRef.current && scrollRef.current) {
      const container = scrollRef.current;
      const activeTab = activeTabRef.current;
      const containerWidth = container.offsetWidth;
      const tabLeft = activeTab.offsetLeft;
      const tabWidth = activeTab.offsetWidth;

      // Center the active tab in the viewport
      const scrollPosition = tabLeft - (containerWidth / 2) + (tabWidth / 2);
      container.scrollTo({ left: scrollPosition, behavior: 'smooth' });
    }
  }, [activeValue, isMobile]);

  const activeTab = tabs.find(tab => tab.value === activeValue);
  const currentIndex = tabs.findIndex(tab => tab.value === activeValue);

  return (
    <div className={cn("w-full", className)}>
      {/* Best-in-class tab strip - always horizontal, scrollable on mobile */}
      <div className="-mx-4 sm:mx-0">
        {/* Progress bar */}
        {showProgress && (
          <div className="px-4 sm:px-0 pb-2">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>{completedCount} of {tabs.length} sections complete</span>
              <span className="text-elec-yellow font-medium">{progressPercent}%</span>
            </div>
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-elec-yellow transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Horizontal scrollable tab strip - edge-to-edge on mobile */}
        <div
          ref={scrollRef}
          className={cn(
            "flex overflow-x-auto scrollbar-hide",
            isMobile ? "gap-1.5 px-4 pb-3" : "gap-2"
          )}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {tabs.map((tab, index) => {
            const tabComplete = isTabComplete(tab);
            const isActive = tab.value === activeValue;
            const displayLabel = isMobile ? (tab.shortLabel || tab.label.split(' ')[0]) : tab.label;

            return (
              <button
                key={tab.value}
                ref={isActive ? activeTabRef : null}
                onClick={() => handleValueChange(tab.value)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2.5 rounded-lg font-medium transition-all duration-200 touch-manipulation whitespace-nowrap shrink-0",
                  "active:scale-95",
                  isActive
                    ? "bg-elec-yellow text-black shadow-lg shadow-elec-yellow/20"
                    : tabComplete
                    ? "bg-green-500/10 text-green-400 border border-green-500/30"
                    : "bg-card/50 text-muted-foreground hover:text-foreground hover:bg-card border border-transparent",
                  isMobile ? "text-sm h-11 min-w-[70px]" : "text-sm h-10"
                )}
              >
                {/* Step number badge */}
                <span className={cn(
                  "flex items-center justify-center h-5 w-5 rounded-full text-xs font-bold shrink-0",
                  isActive
                    ? "bg-black/20 text-black"
                    : tabComplete
                    ? "bg-green-500/20 text-green-400"
                    : "bg-white/10 text-current"
                )}>
                  {tabComplete && !isActive ? (
                    <CheckCircle className="h-3 w-3" />
                  ) : (
                    index + 1
                  )}
                </span>
                <span>{displayLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab content */}
      <div className="mt-4">
        {activeTab?.content}
      </div>
    </div>
  );
};
