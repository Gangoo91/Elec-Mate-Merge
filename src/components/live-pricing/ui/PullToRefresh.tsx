import { useState, useRef, ReactNode, useCallback } from "react";
import { RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}

const PULL_THRESHOLD = 80;
const MAX_PULL = 120;

const PullToRefresh = ({
  onRefresh,
  children,
  className,
  disabled = false
}: PullToRefreshProps) => {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const touchStartY = useRef(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (disabled || isRefreshing) return;

    // Only activate if at top of scroll
    const scrollTop = contentRef.current?.scrollTop || 0;
    if (scrollTop > 0) return;

    touchStartY.current = e.touches[0].clientY;
    setIsActive(true);
  }, [disabled, isRefreshing]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isActive || disabled || isRefreshing) return;

    const scrollTop = contentRef.current?.scrollTop || 0;
    if (scrollTop > 0) {
      setPullDistance(0);
      return;
    }

    const currentY = e.touches[0].clientY;
    const diff = currentY - touchStartY.current;

    if (diff > 0) {
      // Apply resistance to pull
      const resistance = 0.4;
      const distance = Math.min(diff * resistance, MAX_PULL);
      setPullDistance(distance);

      // Prevent native scroll when pulling down
      if (distance > 10) {
        e.preventDefault();
      }
    }
  }, [isActive, disabled, isRefreshing]);

  const handleTouchEnd = useCallback(async () => {
    if (!isActive || disabled) {
      setPullDistance(0);
      setIsActive(false);
      return;
    }

    if (pullDistance >= PULL_THRESHOLD && !isRefreshing) {
      setIsRefreshing(true);
      setPullDistance(PULL_THRESHOLD);

      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
        setPullDistance(0);
      }
    } else {
      setPullDistance(0);
    }

    setIsActive(false);
  }, [isActive, pullDistance, isRefreshing, onRefresh, disabled]);

  const progress = Math.min(pullDistance / PULL_THRESHOLD, 1);
  const shouldTrigger = pullDistance >= PULL_THRESHOLD;

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Pull indicator */}
      <div
        className={cn(
          "absolute left-0 right-0 flex items-center justify-center z-10",
          "transition-opacity duration-200",
          (pullDistance > 0 || isRefreshing) ? "opacity-100" : "opacity-0"
        )}
        style={{
          top: 0,
          height: pullDistance > 0 ? `${pullDistance}px` : isRefreshing ? `${PULL_THRESHOLD}px` : 0,
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
              "h-5 w-5 text-yellow-400 transition-transform duration-200",
              isRefreshing && "animate-spin",
            )}
            style={{
              transform: !isRefreshing ? `rotate(${progress * 360}deg)` : undefined
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="h-full overflow-y-auto"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          transform: pullDistance > 0 || isRefreshing
            ? `translateY(${isRefreshing ? PULL_THRESHOLD : pullDistance}px)`
            : undefined,
          transition: isActive ? 'none' : 'transform 0.2s ease-out',
        }}
      >
        {children}
      </div>

      {/* Release hint */}
      {pullDistance > 0 && !isRefreshing && (
        <div
          className={cn(
            "absolute top-2 left-0 right-0 flex justify-center",
            "text-xs font-medium transition-all duration-200",
            shouldTrigger ? "text-yellow-400" : "text-white/50"
          )}
        >
          {shouldTrigger ? "Release to refresh" : "Pull to refresh"}
        </div>
      )}
    </div>
  );
};

export default PullToRefresh;
