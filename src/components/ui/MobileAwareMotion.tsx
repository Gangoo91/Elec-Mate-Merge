/**
 * MobileAwareMotion - Animation components that adapt to mobile devices
 *
 * Problem: Complex framer-motion animations cause jank on mobile Safari
 * Solution: Simpler CSS transitions on mobile, full animations on desktop
 *
 * Features:
 * - Detects mobile devices and reduced motion preferences
 * - Falls back to CSS transitions on mobile for 60fps performance
 * - Maintains full animations on desktop for visual richness
 */

import React, { ReactNode } from 'react';
import { AnimatePresence, AnimatePresenceProps, motion, MotionProps } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

/**
 * Hook to check if user prefers reduced motion
 */
export const useReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Hook to determine if we should use simplified animations
 */
export const useShouldReduceAnimations = (): boolean => {
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  return isMobile || prefersReducedMotion;
};

interface MobileAwareAnimatePresenceProps extends Omit<AnimatePresenceProps, 'children'> {
  children: ReactNode;
  /** Override mobile detection */
  forceFull?: boolean;
  /** CSS class for mobile fallback */
  mobileClassName?: string;
}

/**
 * MobileAwareAnimatePresence - AnimatePresence that falls back to CSS on mobile
 *
 * On mobile/reduced motion: Uses CSS opacity transition
 * On desktop: Uses full framer-motion AnimatePresence
 */
export const MobileAwareAnimatePresence: React.FC<MobileAwareAnimatePresenceProps> = ({
  children,
  forceFull = false,
  mobileClassName = 'transition-opacity duration-150',
  ...props
}) => {
  const shouldReduce = useShouldReduceAnimations();

  if (shouldReduce && !forceFull) {
    return (
      <div className={mobileClassName}>
        {children}
      </div>
    );
  }

  return (
    <AnimatePresence {...props}>
      {children}
    </AnimatePresence>
  );
};

interface MobileAwareMotionDivProps extends MotionProps {
  children: ReactNode;
  /** Override mobile detection */
  forceFull?: boolean;
  /** CSS class for mobile fallback */
  mobileClassName?: string;
  className?: string;
}

/**
 * MobileAwareMotionDiv - motion.div that falls back to regular div on mobile
 *
 * On mobile/reduced motion: Renders as a regular div with CSS transitions
 * On desktop: Uses full framer-motion animations
 */
export const MobileAwareMotionDiv: React.FC<MobileAwareMotionDivProps> = ({
  children,
  forceFull = false,
  mobileClassName = 'transition-all duration-200',
  className,
  ...motionProps
}) => {
  const shouldReduce = useShouldReduceAnimations();

  if (shouldReduce && !forceFull) {
    return (
      <div className={cn(mobileClassName, className)}>
        {children}
      </div>
    );
  }

  return (
    <motion.div className={className} {...motionProps}>
      {children}
    </motion.div>
  );
};

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

/**
 * FadeIn - Simple fade-in animation that adapts to mobile
 *
 * On mobile: Instant render with opacity transition
 * On desktop: Staggered fade-in with motion
 */
export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.3,
  className,
}) => {
  const shouldReduce = useShouldReduceAnimations();

  if (shouldReduce) {
    return (
      <div
        className={cn('animate-in fade-in duration-150', className)}
        style={{ animationDelay: `${delay * 100}ms` }}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface SlideInProps {
  children: ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  delay?: number;
  duration?: number;
  className?: string;
}

/**
 * SlideIn - Slide-in animation that adapts to mobile
 */
export const SlideIn: React.FC<SlideInProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.3,
  className,
}) => {
  const shouldReduce = useShouldReduceAnimations();

  const getInitialPosition = () => {
    switch (direction) {
      case 'left': return { x: -20, y: 0 };
      case 'right': return { x: 20, y: 0 };
      case 'up': return { x: 0, y: 20 };
      case 'down': return { x: 0, y: -20 };
    }
  };

  if (shouldReduce) {
    return (
      <div className={cn('animate-in fade-in duration-150', className)}>
        {children}
      </div>
    );
  }

  const initial = getInitialPosition();

  return (
    <motion.div
      initial={{ opacity: 0, ...initial }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay, duration }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default {
  MobileAwareAnimatePresence,
  MobileAwareMotionDiv,
  FadeIn,
  SlideIn,
  useReducedMotion,
  useShouldReduceAnimations,
};
