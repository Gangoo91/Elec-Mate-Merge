import { useRef, useEffect, useState, useCallback } from 'react';

interface SwipeableOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  threshold?: number;
  velocityThreshold?: number;
  trackMouse?: boolean;
  preventScrollOnHorizontal?: boolean;
  onSwipeStart?: () => void;
  onSwipeEnd?: () => void;
  onSwipeMove?: (deltaX: number, deltaY: number, velocity: number) => void;
}

interface SwipeState {
  isSwiping: boolean;
  direction: 'left' | 'right' | 'up' | 'down' | null;
  deltaX: number;
  deltaY: number;
  velocity: number;
}

export const useSwipeable = ({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  threshold = 50,
  velocityThreshold = 0.5,
  trackMouse = false,
  preventScrollOnHorizontal = false,
  onSwipeStart,
  onSwipeEnd,
  onSwipeMove,
}: SwipeableOptions) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [swipeState, setSwipeState] = useState<SwipeState>({
    isSwiping: false,
    direction: null,
    deltaX: 0,
    deltaY: 0,
    velocity: 0,
  });

  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const touchEndY = useRef<number>(0);
  const startTime = useRef<number>(0);
  const isTracking = useRef<boolean>(false);

  const getDirection = useCallback((diffX: number, diffY: number): 'left' | 'right' | 'up' | 'down' | null => {
    const absX = Math.abs(diffX);
    const absY = Math.abs(diffY);

    if (absX < threshold && absY < threshold) return null;

    if (absX > absY) {
      return diffX > 0 ? 'left' : 'right';
    } else {
      return diffY > 0 ? 'up' : 'down';
    }
  }, [threshold]);

  const handleStart = useCallback((clientX: number, clientY: number) => {
    touchStartX.current = clientX;
    touchStartY.current = clientY;
    touchEndX.current = clientX;
    touchEndY.current = clientY;
    startTime.current = Date.now();
    isTracking.current = true;

    setSwipeState({
      isSwiping: true,
      direction: null,
      deltaX: 0,
      deltaY: 0,
      velocity: 0,
    });

    onSwipeStart?.();
  }, [onSwipeStart]);

  const handleMove = useCallback((clientX: number, clientY: number, e?: Event) => {
    if (!isTracking.current) return;

    touchEndX.current = clientX;
    touchEndY.current = clientY;

    const diffX = touchStartX.current - touchEndX.current;
    const diffY = touchStartY.current - touchEndY.current;
    const duration = (Date.now() - startTime.current) / 1000;
    const distance = Math.sqrt(diffX * diffX + diffY * diffY);
    const velocity = duration > 0 ? distance / duration : 0;
    const direction = getDirection(diffX, diffY);

    // Prevent scroll when swiping horizontally (useful for carousels)
    // Guard with cancelable check to avoid Android intervention warnings
    if (preventScrollOnHorizontal && Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 10) {
      if (e && 'cancelable' in e && e.cancelable) {
        e.preventDefault();
      }
    }

    setSwipeState({
      isSwiping: true,
      direction,
      deltaX: -diffX,
      deltaY: -diffY,
      velocity,
    });

    onSwipeMove?.(diffX, diffY, velocity);
  }, [getDirection, preventScrollOnHorizontal, onSwipeMove]);

  const handleEnd = useCallback(() => {
    if (!isTracking.current) return;
    isTracking.current = false;

    const diffX = touchStartX.current - touchEndX.current;
    const diffY = touchStartY.current - touchEndY.current;
    const duration = (Date.now() - startTime.current) / 1000;
    const distance = Math.sqrt(diffX * diffX + diffY * diffY);
    const velocity = duration > 0 ? distance / duration : 0;

    // Check velocity threshold for quick swipes (can trigger with smaller distance)
    const isVelocitySwipe = velocity > velocityThreshold * 1000;
    const effectiveThreshold = isVelocitySwipe ? threshold * 0.5 : threshold;

    const absX = Math.abs(diffX);
    const absY = Math.abs(diffY);

    if (absX > absY) {
      // Horizontal swipe
      if (absX > effectiveThreshold) {
        if (diffX > 0 && onSwipeLeft) {
          onSwipeLeft();
        } else if (diffX < 0 && onSwipeRight) {
          onSwipeRight();
        }
      }
    } else {
      // Vertical swipe
      if (absY > effectiveThreshold) {
        if (diffY > 0 && onSwipeUp) {
          onSwipeUp();
        } else if (diffY < 0 && onSwipeDown) {
          onSwipeDown();
        }
      }
    }

    setSwipeState({
      isSwiping: false,
      direction: null,
      deltaX: 0,
      deltaY: 0,
      velocity: 0,
    });

    onSwipeEnd?.();

    touchStartX.current = 0;
    touchStartY.current = 0;
    touchEndX.current = 0;
    touchEndY.current = 0;
    startTime.current = 0;
  }, [threshold, velocityThreshold, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, onSwipeEnd]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Touch event handlers
    const handleTouchStart = (e: TouchEvent) => {
      handleStart(e.touches[0].clientX, e.touches[0].clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      handleMove(e.touches[0].clientX, e.touches[0].clientY, e);
    };

    const handleTouchEnd = () => {
      handleEnd();
    };

    // Mouse event handlers (optional)
    const handleMouseDown = (e: MouseEvent) => {
      if (!trackMouse) return;
      handleStart(e.clientX, e.clientY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!trackMouse || !isTracking.current) return;
      handleMove(e.clientX, e.clientY);
    };

    const handleMouseUp = () => {
      if (!trackMouse) return;
      handleEnd();
    };

    const handleMouseLeave = () => {
      if (!trackMouse || !isTracking.current) return;
      handleEnd();
    };

    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: !preventScrollOnHorizontal });
    element.addEventListener('touchend', handleTouchEnd);

    if (trackMouse) {
      element.addEventListener('mousedown', handleMouseDown);
      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseup', handleMouseUp);
      element.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);

      if (trackMouse) {
        element.removeEventListener('mousedown', handleMouseDown);
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseup', handleMouseUp);
        element.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [handleStart, handleMove, handleEnd, trackMouse, preventScrollOnHorizontal]);

  return { ref: elementRef, ...swipeState };
};
