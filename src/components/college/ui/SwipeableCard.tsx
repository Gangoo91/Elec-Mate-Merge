import { useState, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import { cn } from '@/lib/utils';

interface SwipeAction {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  className?: string;
}

interface SwipeableCardProps {
  children: React.ReactNode;
  leftActions?: SwipeAction[];
  rightActions?: SwipeAction[];
  className?: string;
  onTap?: () => void;
  onLongPress?: () => void;
  selected?: boolean;
}

/**
 * Wraps any card with swipe-to-reveal actions (like iOS Mail).
 * Swipe left → right actions appear. Swipe right → left actions appear.
 * Long press for selection mode.
 */
export function SwipeableCard({
  children,
  leftActions = [],
  rightActions = [],
  className,
  onTap,
  onLongPress,
  selected = false,
}: SwipeableCardProps) {
  const [offset, setOffset] = useState(0);
  const [isRevealed, setIsRevealed] = useState<'left' | 'right' | null>(null);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const didSwipe = useRef(false);

  const ACTION_WIDTH = 72;
  const leftWidth = leftActions.length * ACTION_WIDTH;
  const rightWidth = rightActions.length * ACTION_WIDTH;

  const handlers = useSwipeable({
    onSwiping: (e) => {
      didSwipe.current = true;
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
        longPressTimer.current = null;
      }

      let newOffset = e.deltaX;

      // Clamp offset
      if (rightActions.length === 0 && newOffset < 0) newOffset = 0;
      if (leftActions.length === 0 && newOffset > 0) newOffset = 0;
      if (newOffset < 0) newOffset = Math.max(newOffset, -rightWidth - 20);
      if (newOffset > 0) newOffset = Math.min(newOffset, leftWidth + 20);

      setOffset(newOffset);
    },
    onSwipedLeft: () => {
      if (rightActions.length > 0 && Math.abs(offset) > ACTION_WIDTH / 2) {
        setOffset(-rightWidth);
        setIsRevealed('right');
      } else {
        setOffset(0);
        setIsRevealed(null);
      }
    },
    onSwipedRight: () => {
      if (leftActions.length > 0 && offset > ACTION_WIDTH / 2) {
        setOffset(leftWidth);
        setIsRevealed('left');
      } else {
        setOffset(0);
        setIsRevealed(null);
      }
    },
    onSwiped: () => {
      setTimeout(() => {
        didSwipe.current = false;
      }, 100);
    },
    trackMouse: false,
    trackTouch: true,
    delta: 10,
    preventScrollOnSwipe: true,
  });

  const handleTouchStart = () => {
    if (onLongPress) {
      longPressTimer.current = setTimeout(() => {
        onLongPress();
        longPressTimer.current = null;
      }, 500);
    }
  };

  const handleTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const handleClick = () => {
    if (didSwipe.current) return;

    if (isRevealed) {
      setOffset(0);
      setIsRevealed(null);
      return;
    }

    onTap?.();
  };

  const resetSwipe = () => {
    setOffset(0);
    setIsRevealed(null);
  };

  return (
    <div className={cn('relative overflow-hidden rounded-lg', className)}>
      {/* Left actions (appear when swiped right) */}
      {leftActions.length > 0 && (
        <div className="absolute inset-y-0 left-0 flex">
          {leftActions.map((action, i) => (
            <button
              key={i}
              className={cn(
                'flex flex-col items-center justify-center touch-manipulation',
                action.className || 'bg-warning text-white'
              )}
              style={{ width: ACTION_WIDTH }}
              onClick={() => {
                action.onClick();
                resetSwipe();
              }}
            >
              {action.icon}
              <span className="text-[10px] mt-0.5 font-medium">{action.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Right actions (appear when swiped left) */}
      {rightActions.length > 0 && (
        <div className="absolute inset-y-0 right-0 flex">
          {rightActions.map((action, i) => (
            <button
              key={i}
              className={cn(
                'flex flex-col items-center justify-center touch-manipulation',
                action.className || 'bg-info text-white'
              )}
              style={{ width: ACTION_WIDTH }}
              onClick={() => {
                action.onClick();
                resetSwipe();
              }}
            >
              {action.icon}
              <span className="text-[10px] mt-0.5 font-medium">{action.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Main content */}
      <div
        {...handlers}
        className={cn(
          'relative z-10 transition-transform duration-200 ease-out',
          selected && 'ring-2 ring-elec-yellow ring-offset-2 ring-offset-background rounded-lg'
        )}
        style={{
          transform: `translateX(${offset}px)`,
          transition: offset === 0 || isRevealed ? 'transform 200ms ease-out' : 'none',
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={handleClick}
      >
        {children}
      </div>
    </div>
  );
}
