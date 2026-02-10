import { useState, useRef, useCallback, type ReactNode } from "react";
import { RefreshCw } from "lucide-react";

interface PullToRefreshProps {
  onRefresh: () => Promise<void> | void;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}

const PULL_THRESHOLD = 70;
const MAX_PULL = 120;

export default function PullToRefresh({
  onRefresh,
  children,
  className = "",
  disabled = false,
}: PullToRefreshProps) {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const startY = useRef(0);
  const pulling = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (disabled || isRefreshing) return;
      const scrollTop = containerRef.current?.scrollTop ?? window.scrollY;
      if (scrollTop > 5) return;
      startY.current = e.touches[0].clientY;
      pulling.current = true;
    },
    [disabled, isRefreshing],
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!pulling.current || disabled || isRefreshing) return;
      const diff = e.touches[0].clientY - startY.current;
      if (diff < 0) {
        pulling.current = false;
        setPullDistance(0);
        return;
      }
      // Resistance curve — harder to pull the further you go
      const distance = Math.min(MAX_PULL, diff * 0.4);
      setPullDistance(distance);
    },
    [disabled, isRefreshing],
  );

  const handleTouchEnd = useCallback(async () => {
    if (!pulling.current) return;
    pulling.current = false;

    if (pullDistance >= PULL_THRESHOLD && !isRefreshing) {
      setIsRefreshing(true);
      setPullDistance(PULL_THRESHOLD * 0.6);
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
        setPullDistance(0);
      }
    } else {
      setPullDistance(0);
    }
  }, [pullDistance, isRefreshing, onRefresh]);

  const progress = Math.min(1, pullDistance / PULL_THRESHOLD);

  return (
    <div
      ref={containerRef}
      className={className}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pull indicator */}
      <div
        className="flex items-center justify-center overflow-hidden transition-[height] duration-200 ease-out"
        style={{ height: pullDistance > 0 || isRefreshing ? `${pullDistance}px` : 0 }}
      >
        <div
          className="flex items-center justify-center"
          style={{
            opacity: Math.max(0.2, progress),
            transform: `rotate(${progress * 360}deg)`,
          }}
        >
          <RefreshCw
            className={`h-5 w-5 text-muted-foreground ${isRefreshing ? "animate-spin" : ""}`}
          />
        </div>
      </div>
      {children}
    </div>
  );
}
