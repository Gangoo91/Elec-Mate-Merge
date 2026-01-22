/**
 * DashboardContainer
 *
 * Max-width container wrapper for the dashboard with proper background
 * that matches the sidebar color exactly.
 *
 * Now enhanced with pull-to-refresh and collapsing header support
 * for a native mobile app feel.
 */

import React, { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePullToRefresh } from '@/hooks/use-pull-to-refresh';

interface DashboardContainerProps {
  children: React.ReactNode;
  className?: string;
  onRefresh?: () => Promise<void>;
}

export const DashboardContainer: React.FC<DashboardContainerProps> = ({
  children,
  className,
  onRefresh,
}) => {
  const handleRefresh = useCallback(async () => {
    if (onRefresh) {
      await onRefresh();
    } else {
      // Default refresh: reload page data
      await new Promise(resolve => setTimeout(resolve, 1000));
      window.location.reload();
    }
  }, [onRefresh]);

  const {
    containerRef,
    pullDistance,
    isRefreshing,
    progress,
  } = usePullToRefresh({
    onRefresh: handleRefresh,
    threshold: 80,
    resistance: 2.5,
  });

  return (
    <div
      className={cn(
        // Full height with sidebar-matching background
        'min-h-screen flex flex-col',
        // Background matches sidebar exactly: hsl(240, 5.9%, 10%)
        'bg-[hsl(240,5.9%,10%)]',
        className
      )}
    >
      {/* Pull-to-refresh indicator */}
      <AnimatePresence>
        {(pullDistance > 0 || isRefreshing) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: Math.min(pullDistance, 80),
              opacity: Math.min(progress, 1),
            }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center overflow-hidden bg-background shrink-0"
          >
            <div className="flex items-center gap-2">
              {isRefreshing ? (
                <Loader2 className="h-5 w-5 text-elec-yellow animate-spin" />
              ) : (
                <div
                  className="w-5 h-5 border-2 border-elec-yellow/30 border-t-elec-yellow rounded-full"
                  style={{
                    transform: `rotate(${progress * 360}deg)`,
                    transition: 'transform 0.1s ease-out',
                  }}
                />
              )}
              <span className="text-xs text-muted-foreground">
                {isRefreshing ? 'Refreshing...' : progress >= 1 ? 'Release to refresh' : 'Pull to refresh'}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scrollable content */}
      <div
        ref={containerRef}
        className="flex-1 momentum-scroll-y"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className={cn(
            // Max-width constraint with centering
            'mx-auto max-w-6xl',
            // Horizontal padding for mobile
            'px-4 sm:px-0',
            // Vertical spacing
            'py-4 md:py-6 lg:py-8',
            // Safe area padding for mobile (notch devices)
            'pb-safe'
          )}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardContainer;
