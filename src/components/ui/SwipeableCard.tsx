import React, { useState, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface SwipeAction {
  /** Icon or element to show */
  icon: React.ReactNode;
  /** Background color class (e.g., 'bg-red-500') */
  bgColor: string;
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
  /** Additional class names */
  className?: string;
  /** Disable swipe interactions */
  disabled?: boolean;
}

/**
 * SwipeableCard - Touch-optimized card with swipe actions
 * Reveals action buttons on swipe left/right
 * Best-in-class mobile UX pattern
 */
export const SwipeableCard: React.FC<SwipeableCardProps> = ({
  children,
  leftAction,
  rightAction,
  threshold = 80,
  className = '',
  disabled = false,
}) => {
  const [translateX, setTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const currentXRef = useRef(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (disabled) return;
      startXRef.current = e.touches[0].clientX;
      currentXRef.current = e.touches[0].clientX;
      setIsDragging(true);
    },
    [disabled]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging || disabled) return;
      currentXRef.current = e.touches[0].clientX;
      const diff = currentXRef.current - startXRef.current;

      // Limit swipe distance with resistance
      const maxSwipe = 120;
      let newTranslateX = diff;

      // Apply resistance at edges
      if (Math.abs(diff) > maxSwipe) {
        const overflow = Math.abs(diff) - maxSwipe;
        const resistance = 0.3;
        newTranslateX = diff > 0
          ? maxSwipe + overflow * resistance
          : -(maxSwipe + overflow * resistance);
      }

      // Only allow swipe in directions that have actions
      if (newTranslateX < 0 && !leftAction) newTranslateX = 0;
      if (newTranslateX > 0 && !rightAction) newTranslateX = 0;

      setTranslateX(newTranslateX);
    },
    [isDragging, disabled, leftAction, rightAction]
  );

  const handleTouchEnd = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);

    const swipeDistance = Math.abs(translateX);

    // If swiped past threshold, trigger action
    if (swipeDistance >= threshold) {
      if (translateX < 0 && leftAction) {
        // Swiped left - trigger left action
        setTranslateX(-120); // Snap to reveal
        setTimeout(() => {
          leftAction.onAction();
          setTranslateX(0);
        }, 200);
      } else if (translateX > 0 && rightAction) {
        // Swiped right - trigger right action
        setTranslateX(120);
        setTimeout(() => {
          rightAction.onAction();
          setTranslateX(0);
        }, 200);
      }
    } else {
      // Snap back
      setTranslateX(0);
    }
  }, [isDragging, translateX, threshold, leftAction, rightAction]);

  // Also handle mouse events for desktop testing
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (disabled) return;
      startXRef.current = e.clientX;
      currentXRef.current = e.clientX;
      setIsDragging(true);

      const handleMouseMove = (e: MouseEvent) => {
        currentXRef.current = e.clientX;
        const diff = currentXRef.current - startXRef.current;

        const maxSwipe = 120;
        let newTranslateX = diff;

        if (Math.abs(diff) > maxSwipe) {
          const overflow = Math.abs(diff) - maxSwipe;
          const resistance = 0.3;
          newTranslateX = diff > 0
            ? maxSwipe + overflow * resistance
            : -(maxSwipe + overflow * resistance);
        }

        if (newTranslateX < 0 && !leftAction) newTranslateX = 0;
        if (newTranslateX > 0 && !rightAction) newTranslateX = 0;

        setTranslateX(newTranslateX);
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [disabled, leftAction, rightAction]
  );

  // Reset on mouse up
  const handleMouseUp = useCallback(() => {
    const swipeDistance = Math.abs(translateX);

    if (swipeDistance >= threshold) {
      if (translateX < 0 && leftAction) {
        setTranslateX(-120);
        setTimeout(() => {
          leftAction.onAction();
          setTranslateX(0);
        }, 200);
      } else if (translateX > 0 && rightAction) {
        setTranslateX(120);
        setTimeout(() => {
          rightAction.onAction();
          setTranslateX(0);
        }, 200);
      }
    } else {
      setTranslateX(0);
    }
  }, [translateX, threshold, leftAction, rightAction]);

  return (
    <div className={cn('relative overflow-hidden rounded-lg', className)}>
      {/* Left action reveal (swipe right) */}
      {rightAction && (
        <div
          className={cn(
            'absolute inset-y-0 left-0 flex items-center justify-start px-4 w-24',
            rightAction.bgColor
          )}
          style={{
            opacity: Math.min(translateX / threshold, 1),
          }}
        >
          <div className="flex flex-col items-center gap-1 text-white">
            {rightAction.icon}
            <span className="text-xs font-medium">{rightAction.label}</span>
          </div>
        </div>
      )}

      {/* Right action reveal (swipe left) */}
      {leftAction && (
        <div
          className={cn(
            'absolute inset-y-0 right-0 flex items-center justify-end px-4 w-24',
            leftAction.bgColor
          )}
          style={{
            opacity: Math.min(Math.abs(translateX) / threshold, 1),
          }}
        >
          <div className="flex flex-col items-center gap-1 text-white">
            {leftAction.icon}
            <span className="text-xs font-medium">{leftAction.label}</span>
          </div>
        </div>
      )}

      {/* Main card content */}
      <div
        ref={cardRef}
        className={cn(
          'relative bg-card touch-pan-y',
          isDragging ? 'cursor-grabbing' : 'cursor-grab',
          !isDragging && 'transition-transform duration-200 ease-out'
        )}
        style={{
          transform: `translateX(${translateX}px)`,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        {children}
      </div>
    </div>
  );
};

export default SwipeableCard;
