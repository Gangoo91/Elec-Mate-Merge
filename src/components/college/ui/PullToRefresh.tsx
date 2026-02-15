import { useState, useRef, useCallback } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
  className?: string;
}

/**
 * Pull-to-refresh wrapper. Drag down from the top of the list to trigger a refresh.
 * Shows a spinner while refreshing, then snaps back.
 */
export function PullToRefresh({ onRefresh, children, className }: PullToRefreshProps) {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const touchStart = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const THRESHOLD = 60;

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (containerRef.current && containerRef.current.scrollTop === 0) {
      touchStart.current = e.touches[0].clientY;
    } else {
      touchStart.current = 0;
    }
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (isRefreshing || touchStart.current === 0) return;

      const delta = e.touches[0].clientY - touchStart.current;
      if (delta > 0) {
        // Apply diminishing returns for a rubbery feel
        const dampened = Math.min(delta * 0.4, 100);
        setPullDistance(dampened);
      }
    },
    [isRefreshing]
  );

  const handleTouchEnd = useCallback(async () => {
    if (pullDistance >= THRESHOLD && !isRefreshing) {
      setIsRefreshing(true);
      setPullDistance(THRESHOLD * 0.6);
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
        setPullDistance(0);
      }
    } else {
      setPullDistance(0);
    }
    touchStart.current = 0;
  }, [pullDistance, isRefreshing, onRefresh]);

  return (
    <div
      ref={containerRef}
      className={cn('relative', className)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pull indicator */}
      <div
        className="flex items-center justify-center overflow-hidden transition-all duration-200"
        style={{
          height: pullDistance,
          opacity: Math.min(pullDistance / THRESHOLD, 1),
        }}
      >
        <Loader2
          className={cn(
            'h-5 w-5 text-elec-yellow transition-transform duration-200',
            isRefreshing && 'animate-spin',
            pullDistance >= THRESHOLD && !isRefreshing && 'scale-125'
          )}
          style={{
            transform: isRefreshing ? undefined : `rotate(${(pullDistance / THRESHOLD) * 360}deg)`,
          }}
        />
      </div>

      {children}
    </div>
  );
}
