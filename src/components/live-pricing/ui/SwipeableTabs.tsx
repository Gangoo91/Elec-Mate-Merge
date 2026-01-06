import { useState, useRef, ReactNode } from "react";
import { RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
  icon: ReactNode;
}

interface SwipeableTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  children: ReactNode[];
  className?: string;
  onRefresh?: () => Promise<void>;
  isRefreshing?: boolean;
}

const PULL_THRESHOLD = 80;

const SwipeableTabs = ({
  tabs,
  activeTab,
  onTabChange,
  children,
  className,
  onRefresh,
  isRefreshing = false
}: SwipeableTabsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);
  const [pullDistance, setPullDistance] = useState(0);
  const [isPulling, setIsPulling] = useState(false);

  const minSwipeDistance = 50;
  const activeIndex = tabs.findIndex(tab => tab.id === activeTab);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });

    // Check if at top for pull-to-refresh
    const scrollTop = containerRef.current?.scrollTop || 0;
    if (scrollTop <= 0 && onRefresh) {
      setIsPulling(true);
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    const currentX = e.targetTouches[0].clientX;
    const currentY = e.targetTouches[0].clientY;
    setTouchEnd({ x: currentX, y: currentY });

    // Handle pull-to-refresh
    if (isPulling && touchStart && onRefresh && !isRefreshing) {
      const scrollTop = containerRef.current?.scrollTop || 0;
      if (scrollTop <= 0) {
        const diff = currentY - touchStart.y;
        if (diff > 0) {
          const resistance = 0.4;
          setPullDistance(Math.min(diff * resistance, 120));
        }
      }
    }
  };

  const onTouchEnd = async () => {
    // Handle pull-to-refresh
    if (pullDistance >= PULL_THRESHOLD && onRefresh && !isRefreshing) {
      await onRefresh();
    }
    setPullDistance(0);
    setIsPulling(false);

    // Handle horizontal swipe for tab change
    if (!touchStart || !touchEnd) return;

    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = Math.abs(touchStart.y - touchEnd.y);

    // Only trigger horizontal swipe if mostly horizontal
    if (distanceY < minSwipeDistance) {
      const isLeftSwipe = distanceX > minSwipeDistance;
      const isRightSwipe = distanceX < -minSwipeDistance;

      if (isLeftSwipe && activeIndex < tabs.length - 1) {
        onTabChange(tabs[activeIndex + 1].id);
      }
      if (isRightSwipe && activeIndex > 0) {
        onTabChange(tabs[activeIndex - 1].id);
      }
    }
  };

  const pullProgress = Math.min(pullDistance / PULL_THRESHOLD, 1);
  const shouldTrigger = pullDistance >= PULL_THRESHOLD;

  return (
    <div className={cn("flex flex-col", className)}>
      {/* Pull-to-refresh indicator */}
      {onRefresh && (pullDistance > 0 || isRefreshing) && (
        <div
          className="flex items-center justify-center overflow-hidden transition-all duration-200"
          style={{
            height: isRefreshing ? `${PULL_THRESHOLD}px` : `${pullDistance}px`,
          }}
        >
          <div
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-full",
              "bg-yellow-400/20 border border-yellow-400/30",
              "transition-all duration-200",
              shouldTrigger && "bg-yellow-400/30 scale-110"
            )}
          >
            <RefreshCw
              className={cn(
                "h-5 w-5 text-yellow-400 transition-transform",
                isRefreshing && "animate-spin"
              )}
              style={{
                transform: !isRefreshing ? `rotate(${pullProgress * 360}deg)` : undefined
              }}
            />
          </div>
        </div>
      )}

      {/* Content Area - Simple show/hide approach */}
      <div
        ref={containerRef}
        className="flex-1 min-h-0 overflow-y-auto"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {children.map((child, index) => (
          <div
            key={tabs[index]?.id || index}
            className={cn(
              "min-h-full",
              activeIndex === index ? "block" : "hidden"
            )}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Bottom Tab Bar - Fixed on mobile */}
      <nav className="sticky bottom-0 left-0 right-0 bg-neutral-900/95 backdrop-blur-lg border-t border-white/10 safe-area-bottom z-50">
        <div className="flex items-center justify-around h-14 sm:h-16 max-w-lg mx-auto">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "relative flex flex-col items-center justify-center flex-1 h-full px-2 py-1",
                  "touch-manipulation transition-colors duration-200",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/50",
                  isActive
                    ? "text-yellow-400"
                    : "text-white/50 hover:text-white/70 active:text-white/80"
                )}
              >
                <div className={cn(
                  "transition-transform duration-200",
                  isActive && "scale-110"
                )}>
                  {tab.icon}
                </div>
                <span className={cn(
                  "text-xs mt-1 font-medium truncate max-w-full",
                  isActive ? "text-yellow-400" : "text-white/50"
                )}>
                  {tab.label}
                </span>
                {isActive && (
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-yellow-400 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default SwipeableTabs;
