import React, { useRef, useEffect } from 'react';
import {
  MobileTabs,
  MobileTabsList,
  MobileTabsTrigger,
  MobileTabsContent,
} from '@/components/ui/mobile-tabs';
import { useIsMobile } from '@/hooks/use-mobile';
import { useHaptic } from '@/hooks/useHaptic';
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
  showProgress = false,
}: SmartTabsProps) => {
  const isMobile = useIsMobile();
  const haptic = useHaptic();
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);

  // Always call useState hook to maintain hook order consistency
  const [currentValue, setCurrentValue] = React.useState(defaultValue || tabs[0]?.value || '');
  const activeValue = value ?? currentValue;

  const handleValueChange = (newValue: string) => {
    haptic.light();
    setCurrentValue(newValue);
    onValueChange?.(newValue);
  };

  // Check if tab is complete (from tab prop or completedTabs map)
  const isTabComplete = (tab: SmartTab): boolean => {
    return tab.isComplete || completedTabs[tab.value] || false;
  };

  // Calculate progress percentage
  const completedCount = tabs.filter((tab) => isTabComplete(tab)).length;
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
      const scrollPosition = tabLeft - containerWidth / 2 + tabWidth / 2;
      container.scrollTo({ left: scrollPosition, behavior: 'smooth' });
    }
  }, [activeValue, isMobile]);

  const activeTab = tabs.find((tab) => tab.value === activeValue);
  const currentIndex = tabs.findIndex((tab) => tab.value === activeValue);

  return (
    <div className={cn('w-full', className)}>
      {/* Best-in-class tab strip - always horizontal, scrollable on mobile */}
      <div className="-mx-4 sm:mx-0">
        {/* Progress bar */}
        {showProgress && (
          <div className="px-4 sm:px-0 pb-2">
            <div className="flex justify-between text-[10px] text-white mb-1">
              <span>{completedCount}/{tabs.length} sections</span>
              <span className="font-medium">{progressPercent}%</span>
            </div>
            <div className="h-1 bg-white/[0.12] rounded-full overflow-hidden">
              <div
                className="h-full bg-elec-yellow rounded-full"
                style={{ width: `${progressPercent}%`, transition: 'width 300ms ease-out' }}
              />
            </div>
          </div>
        )}

        {/* Tab strip — equal width grid on mobile */}
        <div
          ref={scrollRef}
          className={cn(
            isMobile ? `grid gap-1 px-2 pb-2 ${tabs.length <= 2 ? 'grid-cols-2' : tabs.length <= 3 ? 'grid-cols-3' : tabs.length <= 4 ? 'grid-cols-4' : 'grid-cols-5'}` : 'flex gap-2 overflow-x-auto scrollbar-hide'
          )}
          style={isMobile ? undefined : { scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {tabs.map((tab, index) => {
            const tabComplete = isTabComplete(tab);
            const isActive = tab.value === activeValue;
            const displayLabel = isMobile ? tab.shortLabel || tab.label.split(' ')[0] : tab.label;

            return (
              <button
                key={tab.value}
                ref={isActive ? activeTabRef : null}
                onClick={() => handleValueChange(tab.value)}
                className={cn(
                  'flex items-center justify-center gap-1 rounded-lg font-semibold touch-manipulation',
                  'active:scale-[0.98] transition-all duration-150',
                  isActive
                    ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                    : tabComplete
                      ? 'bg-green-500/10 text-green-400 border border-green-500/30'
                      : 'bg-white/[0.05] text-white border border-white/[0.08]',
                  isMobile
                    ? 'text-[11px] h-9 px-1 min-w-0'
                    : 'text-sm h-10 px-3 py-2.5 shrink-0'
                )}
              >
                {/* Step number */}
                <span
                  className={cn(
                    'flex items-center justify-center rounded-full font-bold shrink-0',
                    isMobile ? 'h-4 w-4 text-[9px]' : 'h-[18px] w-[18px] text-[11px]',
                    isActive
                      ? 'bg-elec-yellow/30 text-elec-yellow'
                      : tabComplete
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-white/[0.08] text-current'
                  )}
                >
                  {tabComplete && !isActive ? <CheckCircle className="h-2.5 w-2.5" /> : index + 1}
                </span>
                <span className="truncate">{displayLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab content */}
      <div className="mt-2">{activeTab?.content}</div>
    </div>
  );
};
