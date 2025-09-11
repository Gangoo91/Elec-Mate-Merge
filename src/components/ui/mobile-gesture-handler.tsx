import React, { useRef, useCallback } from "react";
import { useSwipeable } from "react-swipeable";
import { useMobileEnhanced } from "@/hooks/use-mobile-enhanced";

interface MobileGestureHandlerProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onTap?: () => void;
  onLongPress?: () => void;
  className?: string;
  disabled?: boolean;
}

export const MobileGestureHandler: React.FC<MobileGestureHandlerProps> = ({
  children,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  onTap,
  onLongPress,
  className,
  disabled = false
}) => {
  const { touchSupport } = useMobileEnhanced();
  const longPressTimer = useRef<NodeJS.Timeout>();
  const isLongPress = useRef(false);

  const handleTouchStart = useCallback(() => {
    if (!onLongPress || disabled) return;
    
    isLongPress.current = false;
    longPressTimer.current = setTimeout(() => {
      isLongPress.current = true;
      // Haptic feedback if available
      if ('vibrate' in navigator) {
        navigator.vibrate(50);
      }
      onLongPress();
    }, 500);
  }, [onLongPress, disabled]);

  const handleTouchEnd = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
    
    if (!isLongPress.current && onTap && !disabled) {
      // Light haptic feedback for tap
      if ('vibrate' in navigator) {
        navigator.vibrate(10);
      }
      onTap();
    }
  }, [onTap, disabled]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: onSwipeLeft && !disabled ? onSwipeLeft : undefined,
    onSwipedRight: onSwipeRight && !disabled ? onSwipeRight : undefined,
    onSwipedUp: onSwipeUp && !disabled ? onSwipeUp : undefined,
    onSwipedDown: onSwipeDown && !disabled ? onSwipeDown : undefined,
    trackMouse: false,
    trackTouch: touchSupport,
    preventScrollOnSwipe: false,
    delta: 60
  });

  if (!touchSupport || disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      {...swipeHandlers}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={className}
      style={{ touchAction: 'manipulation' }}
    >
      {children}
    </div>
  );
};