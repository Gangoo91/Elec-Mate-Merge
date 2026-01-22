import { useRef, useState, useCallback, useEffect, RefObject } from 'react';

interface UsePullToRefreshOptions {
  onRefresh: () => Promise<void>;
  threshold?: number;
  resistance?: number;
  disabled?: boolean;
}

interface UsePullToRefreshReturn {
  containerRef: RefObject<HTMLDivElement>;
  pullDistance: number;
  isRefreshing: boolean;
  isPulling: boolean;
  progress: number;
}

export const usePullToRefresh = ({
  onRefresh,
  threshold = 80,
  resistance = 2.5,
  disabled = false,
}: UsePullToRefreshOptions): UsePullToRefreshReturn => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isPulling, setIsPulling] = useState(false);

  const startY = useRef(0);
  const currentY = useRef(0);

  const progress = Math.min(pullDistance / threshold, 1);

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      if (disabled || isRefreshing) return;

      const container = containerRef.current;
      if (!container) return;

      // Only enable pull-to-refresh when scrolled to top
      if (container.scrollTop > 0) return;

      startY.current = e.touches[0].clientY;
      setIsPulling(true);
    },
    [disabled, isRefreshing]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isPulling || disabled || isRefreshing) return;

      const container = containerRef.current;
      if (!container) return;

      // Only allow pull when at top
      if (container.scrollTop > 0) {
        setPullDistance(0);
        return;
      }

      currentY.current = e.touches[0].clientY;
      const diff = currentY.current - startY.current;

      if (diff > 0) {
        // Apply resistance for rubber-band effect
        const distance = diff / resistance;
        setPullDistance(distance);

        // Prevent scroll when pulling (only if event is cancelable)
        if (distance > 10 && e.cancelable) {
          e.preventDefault();
        }
      }
    },
    [isPulling, disabled, isRefreshing, resistance]
  );

  const handleTouchEnd = useCallback(async () => {
    if (!isPulling) return;

    setIsPulling(false);

    if (pullDistance >= threshold && !isRefreshing) {
      setIsRefreshing(true);
      setPullDistance(threshold * 0.6); // Keep partial pull during refresh

      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
        setPullDistance(0);
      }
    } else {
      setPullDistance(0);
    }

    startY.current = 0;
    currentY.current = 0;
  }, [isPulling, pullDistance, threshold, isRefreshing, onRefresh]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    // CRITICAL: Must be passive: false to allow preventDefault() on Android
    // Android Chrome 60+ silently ignores preventDefault() on passive listeners
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  return {
    containerRef,
    pullDistance,
    isRefreshing,
    isPulling,
    progress,
  };
};
