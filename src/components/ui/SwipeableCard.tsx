import React, { useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface SwipeAction {
  /** Icon or element to show */
  icon: React.ReactNode;
  /** Background color class (e.g., 'bg-red-500' or 'bg-red-500/20') */
  bgColor: string;
  /** Text color class (e.g., 'text-white' or 'text-red-400'). Defaults to 'text-white' */
  textColor?: string;
  /** Action handler */
  onAction: () => void;
  /** Label for accessibility */
  label: string;
}

interface SwipeableCardProps {
  children: React.ReactNode;
  /** Left swipe action (delete, archive, etc.) */
  leftAction?: SwipeAction;
  /** Right swipe action (photo, edit, etc.) */
  rightAction?: SwipeAction;
  /** Swipe threshold in pixels to trigger action */
  threshold?: number;
  /** Minimum drag distance before swipe starts (prevents accidental swipes) */
  dragStartThreshold?: number;
  /** Additional class names */
  className?: string;
  /** Disable swipe interactions */
  disabled?: boolean;
}

/**
 * SwipeableCard - Touch-optimized card with swipe actions
 * Reveals action buttons on swipe left/right
 * Uses direct DOM manipulation for scroll-friendly performance (no React re-renders during drag)
 */
export const SwipeableCard: React.FC<SwipeableCardProps> = ({
  children,
  leftAction,
  rightAction,
  threshold = 100,
  dragStartThreshold = 20,
  className = '',
  disabled = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const leftRevealRef = useRef<HTMLDivElement>(null);
  const rightRevealRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const currentTranslateRef = useRef(0);
  const isDraggingRef = useRef(false);
  const hasStartedDragRef = useRef(false);
  const isScrollingRef = useRef(false);

  const applyTransform = useCallback((translateX: number) => {
    if (cardRef.current) {
      cardRef.current.style.transform = `translateX(${translateX}px)`;
    }
    if (leftRevealRef.current) {
      leftRevealRef.current.style.opacity = String(Math.min(Math.abs(translateX) / threshold, 1));
    }
    if (rightRevealRef.current) {
      rightRevealRef.current.style.opacity = String(Math.min(translateX / threshold, 1));
    }
    currentTranslateRef.current = translateX;
  }, [threshold]);

  const resetTransform = useCallback((animated = true) => {
    if (cardRef.current) {
      if (animated) {
        cardRef.current.style.transition = 'transform 200ms ease-out';
        requestAnimationFrame(() => {
          applyTransform(0);
          // Remove transition after animation
          setTimeout(() => {
            if (cardRef.current) {
              cardRef.current.style.transition = '';
            }
          }, 200);
        });
      } else {
        cardRef.current.style.transition = '';
        applyTransform(0);
      }
    }
  }, [applyTransform]);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (disabled) return;
      startXRef.current = e.touches[0].clientX;
      startYRef.current = e.touches[0].clientY;
      isDraggingRef.current = true;
      hasStartedDragRef.current = false;
      isScrollingRef.current = false;
      // Remove any transition during active drag
      if (cardRef.current) {
        cardRef.current.style.transition = '';
      }
    },
    [disabled]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDraggingRef.current || disabled) return;
      const currentX = e.touches[0].clientX;
      const diffX = currentX - startXRef.current;
      const diffY = e.touches[0].clientY - startYRef.current;

      // If we haven't determined scroll direction yet, check it
      if (!hasStartedDragRef.current && !isScrollingRef.current) {
        // If vertical movement is greater, this is a scroll - ignore horizontal
        if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 10) {
          isScrollingRef.current = true;
          return;
        }
        // Only start horizontal drag after crossing threshold
        if (Math.abs(diffX) < dragStartThreshold) {
          return;
        }
        hasStartedDragRef.current = true;
      }

      // If scrolling vertically, don't handle swipe
      if (isScrollingRef.current) return;

      // Limit swipe distance with resistance
      const maxSwipe = 120;
      let newTranslateX = diffX;

      // Apply resistance at edges
      if (Math.abs(diffX) > maxSwipe) {
        const overflow = Math.abs(diffX) - maxSwipe;
        const resistance = 0.3;
        newTranslateX = diffX > 0
          ? maxSwipe + overflow * resistance
          : -(maxSwipe + overflow * resistance);
      }

      // Only allow swipe in directions that have actions
      if (newTranslateX < 0 && !leftAction) newTranslateX = 0;
      if (newTranslateX > 0 && !rightAction) newTranslateX = 0;

      // Direct DOM update - no React state, no re-render
      applyTransform(newTranslateX);
    },
    [disabled, leftAction, rightAction, dragStartThreshold, applyTransform]
  );

  const handleTouchEnd = useCallback(() => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    hasStartedDragRef.current = false;
    isScrollingRef.current = false;

    const translateX = currentTranslateRef.current;
    const swipeDistance = Math.abs(translateX);

    // If swiped past threshold, trigger action
    if (swipeDistance >= threshold) {
      if (translateX < 0 && leftAction) {
        // Snap to reveal then trigger
        if (cardRef.current) {
          cardRef.current.style.transition = 'transform 200ms ease-out';
        }
        applyTransform(-120);
        setTimeout(() => {
          leftAction.onAction();
          resetTransform(true);
        }, 200);
        return;
      } else if (translateX > 0 && rightAction) {
        if (cardRef.current) {
          cardRef.current.style.transition = 'transform 200ms ease-out';
        }
        applyTransform(120);
        setTimeout(() => {
          rightAction.onAction();
          resetTransform(true);
        }, 200);
        return;
      }
    }

    // Snap back
    resetTransform(true);
  }, [threshold, leftAction, rightAction, applyTransform, resetTransform]);

  return (
    <div className={cn('relative overflow-hidden rounded-lg', className)}>
      {/* Left action reveal (swipe right) */}
      {rightAction && (
        <div
          ref={rightRevealRef}
          className={cn(
            'absolute inset-y-0 left-0 flex items-center justify-start px-4 w-24',
            rightAction.bgColor
          )}
          style={{ opacity: 0 }}
        >
          <div className={cn("flex flex-col items-center gap-1", rightAction.textColor || 'text-white')}>
            {rightAction.icon}
            <span className="text-xs font-medium">{rightAction.label}</span>
          </div>
        </div>
      )}

      {/* Right action reveal (swipe left) */}
      {leftAction && (
        <div
          ref={leftRevealRef}
          className={cn(
            'absolute inset-y-0 right-0 flex items-center justify-end px-4 w-24',
            leftAction.bgColor
          )}
          style={{ opacity: 0 }}
        >
          <div className={cn("flex flex-col items-center gap-1", leftAction.textColor || 'text-white')}>
            {leftAction.icon}
            <span className="text-xs font-medium">{leftAction.label}</span>
          </div>
        </div>
      )}

      {/* Main card content */}
      <div
        ref={cardRef}
        className="relative bg-card touch-pan-y"
        style={{ willChange: 'transform' }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {children}
      </div>
    </div>
  );
};

export default SwipeableCard;
