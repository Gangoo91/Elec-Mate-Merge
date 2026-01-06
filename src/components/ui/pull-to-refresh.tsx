import { ReactNode, useState, useCallback, useRef, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: ReactNode;
  isRefreshing?: boolean;
  disabled?: boolean;
}

const PULL_THRESHOLD = 80;
const MAX_PULL = 120;

export function PullToRefresh({
  onRefresh,
  children,
  isRefreshing = false,
  disabled = false
}: PullToRefreshProps) {
  const [pullDistance, setPullDistance] = useState(0);
  const [isPulling, setIsPulling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);

  // Check if we're at the top of the scroll container
  const isAtTop = useCallback(() => {
    if (!containerRef.current) return false;
    return window.scrollY <= 0;
  }, []);

  // Reset pull state
  const resetPull = useCallback(() => {
    setPullDistance(0);
    setIsPulling(false);
  }, []);

  // Handle refresh trigger
  const triggerRefresh = useCallback(async () => {
    if (isRefreshing || disabled) return;

    try {
      await onRefresh();
    } finally {
      resetPull();
    }
  }, [onRefresh, isRefreshing, disabled, resetPull]);

  const handlers = useSwipeable({
    onSwipeStart: (e) => {
      if (isAtTop() && !isRefreshing && !disabled) {
        setIsPulling(true);
        startY.current = e.initial[1];
      }
    },
    onSwiping: (e) => {
      if (!isPulling || isRefreshing || disabled) return;

      // Only allow downward swipes when at top
      if (e.dir === "Down" && isAtTop()) {
        const distance = Math.min(e.deltaY, MAX_PULL);
        setPullDistance(Math.max(0, distance));
      }
    },
    onSwipedDown: () => {
      if (!isPulling || isRefreshing || disabled) return;

      if (pullDistance >= PULL_THRESHOLD) {
        triggerRefresh();
      } else {
        resetPull();
      }
    },
    onTouchEndOrOnMouseUp: () => {
      if (!isRefreshing && pullDistance < PULL_THRESHOLD) {
        resetPull();
      }
    },
    trackMouse: false,
    trackTouch: true,
    delta: 10,
    preventScrollOnSwipe: false,
  });

  // Reset when refreshing completes
  useEffect(() => {
    if (!isRefreshing && pullDistance > 0) {
      resetPull();
    }
  }, [isRefreshing, pullDistance, resetPull]);

  // Calculate visual feedback
  const progress = Math.min(pullDistance / PULL_THRESHOLD, 1);
  const rotation = progress * 180;
  const opacity = Math.min(progress * 1.5, 1);
  const thresholdReached = pullDistance >= PULL_THRESHOLD;

  // Only show on mobile (touch devices)
  const isTouchDevice = typeof window !== 'undefined' && 'ontouchstart' in window;

  if (!isTouchDevice) {
    return <>{children}</>;
  }

  return (
    <div
      ref={containerRef}
      {...handlers}
      className="relative min-h-full"
    >
      {/* Pull indicator */}
      <AnimatePresence>
        {(isPulling || isRefreshing) && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{
              opacity: isRefreshing ? 1 : opacity,
              y: isRefreshing ? 0 : Math.min(pullDistance * 0.5, 40) - 40
            }}
            exit={{ opacity: 0, y: -40 }}
            className="absolute left-0 right-0 top-0 z-50 flex flex-col items-center justify-center py-4"
          >
            <motion.div
              animate={{
                rotate: isRefreshing ? 360 : rotation,
              }}
              transition={isRefreshing ? {
                repeat: Infinity,
                duration: 1,
                ease: "linear"
              } : {
                duration: 0
              }}
              className={`p-2 rounded-full ${
                thresholdReached || isRefreshing
                  ? 'bg-elec-yellow/20'
                  : 'bg-white/10'
              }`}
            >
              <RefreshCw
                className={`h-5 w-5 transition-colors ${
                  thresholdReached || isRefreshing
                    ? 'text-elec-yellow'
                    : 'text-white/60'
                }`}
              />
            </motion.div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`mt-2 text-xs font-medium transition-colors ${
                thresholdReached || isRefreshing
                  ? 'text-elec-yellow'
                  : 'text-white/60'
              }`}
            >
              {isRefreshing
                ? 'Refreshing...'
                : thresholdReached
                  ? 'Release to refresh'
                  : 'Pull to refresh'}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content with pull offset */}
      <motion.div
        animate={{
          y: isRefreshing ? 60 : isPulling ? Math.min(pullDistance * 0.5, 60) : 0
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
