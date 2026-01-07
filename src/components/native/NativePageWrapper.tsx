import React, { ReactNode, useCallback } from 'react';
import { motion, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePullToRefresh } from '@/hooks/use-pull-to-refresh';
import { useCollapsingHeader } from '@/hooks/use-collapsing-header';
import { cn } from '@/lib/utils';

interface NativePageWrapperProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  headerColor?: 'yellow' | 'blue' | 'green' | 'purple' | 'orange';
  showBackButton?: boolean;
  onBack?: () => void;
  onRefresh?: () => Promise<void>;
  collapsingHeader?: boolean;
  headerActions?: ReactNode;
  className?: string;
  contentClassName?: string;
  headerMaxHeight?: number;
  headerMinHeight?: number;
}

const colorClasses = {
  yellow: {
    icon: 'bg-elec-yellow/10 text-elec-yellow',
    accent: 'text-elec-yellow',
  },
  blue: {
    icon: 'bg-info/10 text-info',
    accent: 'text-info',
  },
  green: {
    icon: 'bg-success/10 text-success',
    accent: 'text-success',
  },
  purple: {
    icon: 'bg-purple-500/10 text-purple-500',
    accent: 'text-purple-500',
  },
  orange: {
    icon: 'bg-orange-500/10 text-orange-500',
    accent: 'text-orange-500',
  },
};

export const NativePageWrapper: React.FC<NativePageWrapperProps> = ({
  children,
  title,
  subtitle,
  icon,
  headerColor = 'yellow',
  showBackButton = true,
  onBack,
  onRefresh,
  collapsingHeader = true,
  headerActions,
  className,
  contentClassName,
  headerMaxHeight = 120,
  headerMinHeight = 56,
}) => {
  const navigate = useNavigate();
  const colors = colorClasses[headerColor];

  const handleBack = useCallback(() => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  }, [onBack, navigate]);

  const handleRefresh = useCallback(async () => {
    if (onRefresh) {
      await onRefresh();
    }
  }, [onRefresh]);

  const {
    headerRef,
    contentRef,
    scrollProgress,
    headerHeight,
    titleScale,
    subtitleOpacity,
    isCollapsed,
  } = useCollapsingHeader({
    maxHeight: headerMaxHeight,
    minHeight: headerMinHeight,
    scrollThreshold: 80,
  });

  const {
    containerRef,
    pullDistance,
    isRefreshing,
    progress,
  } = usePullToRefresh({
    onRefresh: handleRefresh,
    disabled: !onRefresh,
  });

  // Merge refs for pull-to-refresh container and scroll content
  const setRefs = useCallback(
    (el: HTMLDivElement | null) => {
      (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
      (contentRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
    },
    [containerRef, contentRef]
  );

  const iconOpacity = useTransform(scrollProgress, [0, 0.5], [1, 0]);
  const inlineTitleOpacity = useTransform(scrollProgress, [0.5, 1], [0, 1]);

  return (
    <div className={cn('min-h-screen bg-background flex flex-col', className)}>
      {/* Collapsing Header */}
      <motion.header
        ref={headerRef}
        style={collapsingHeader ? { height: headerHeight } : undefined}
        className={cn(
          'header-collapsible bg-background/80 backdrop-blur-xl border-b border-white/[0.06]',
          !collapsingHeader && 'py-4'
        )}
      >
        <div className="h-full max-w-7xl mx-auto px-4 flex flex-col justify-end">
          {/* Top row - back button and inline title (visible when collapsed) */}
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              {showBackButton && (
                <button
                  onClick={handleBack}
                  className="touch-target flex items-center justify-center -ml-2 rounded-xl hover:bg-white/5 active:scale-95 transition-all"
                >
                  <ArrowLeft className="h-5 w-5 text-muted-foreground" />
                </button>
              )}

              {/* Inline title (visible when collapsed) */}
              {collapsingHeader && (
                <motion.div
                  style={{ opacity: inlineTitleOpacity }}
                  className="flex items-center gap-2"
                >
                  {icon && (
                    <div className={cn('p-1.5 rounded-lg', colors.icon)}>
                      {React.cloneElement(icon as React.ReactElement, {
                        className: 'h-4 w-4',
                      })}
                    </div>
                  )}
                  <span className="header-title-inline text-foreground">
                    {title}
                  </span>
                </motion.div>
              )}
            </div>

            {headerActions && (
              <div className="flex items-center gap-2">{headerActions}</div>
            )}
          </div>

          {/* Large title row (hidden when collapsed) */}
          {collapsingHeader && (
            <motion.div
              style={{ opacity: subtitleOpacity, scale: titleScale }}
              className="pb-3 origin-left"
            >
              <div className="flex items-center gap-3">
                {icon && (
                  <motion.div
                    style={{ opacity: iconOpacity }}
                    className={cn('p-2.5 rounded-xl', colors.icon)}
                  >
                    {React.cloneElement(icon as React.ReactElement, {
                      className: 'h-6 w-6',
                    })}
                  </motion.div>
                )}
                <div>
                  <h1 className="header-title-large text-foreground">{title}</h1>
                  {subtitle && (
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {subtitle}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Non-collapsing header content */}
          {!collapsingHeader && (
            <div className="flex items-center gap-3">
              {icon && (
                <div className={cn('p-2.5 rounded-xl', colors.icon)}>
                  {React.cloneElement(icon as React.ReactElement, {
                    className: 'h-6 w-6',
                  })}
                </div>
              )}
              <div>
                <h1 className="text-xl font-bold text-foreground">{title}</h1>
                {subtitle && (
                  <p className="text-sm text-muted-foreground">{subtitle}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </motion.header>

      {/* Pull-to-refresh indicator */}
      <AnimatePresence>
        {(pullDistance > 0 || isRefreshing) && onRefresh && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: Math.min(pullDistance, 80),
              opacity: Math.min(progress, 1),
            }}
            exit={{ height: 0, opacity: 0 }}
            className="flex items-center justify-center overflow-hidden bg-background"
          >
            <div
              className={cn(
                'refresh-spinner',
                isRefreshing ? 'refreshing' : 'pulling'
              )}
              style={
                !isRefreshing
                  ? ({ '--pull-progress': progress } as React.CSSProperties)
                  : undefined
              }
            />
            {isRefreshing && (
              <Loader2 className="h-5 w-5 text-elec-yellow animate-spin ml-2" />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scrollable content */}
      <div
        ref={setRefs}
        className={cn(
          'flex-1 overflow-y-auto momentum-scroll-y',
          contentClassName
        )}
      >
        <div className="max-w-7xl mx-auto px-4 py-6 pb-safe space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default NativePageWrapper;
