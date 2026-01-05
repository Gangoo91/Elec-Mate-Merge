import * as React from "react";
import { useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface SwipeAction {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  variant?: "default" | "destructive" | "success";
}

interface SwipeableRowProps {
  children: React.ReactNode;
  leftAction?: SwipeAction;
  rightAction?: SwipeAction;
  className?: string;
}

const variantStyles = {
  default: "bg-primary",
  destructive: "bg-destructive",
  success: "bg-success"
};

export function SwipeableRow({ 
  children, 
  leftAction, 
  rightAction, 
  className 
}: SwipeableRowProps) {
  const [translateX, setTranslateX] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const startX = useRef(0);
  const threshold = 80;

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    setIsAnimating(false);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const currentX = e.touches[0].clientX;
    let delta = currentX - startX.current;
    
    // Limit swipe distance and direction based on available actions
    if (delta > 0 && !leftAction) delta = 0;
    if (delta < 0 && !rightAction) delta = 0;
    
    // Apply resistance at edges
    const maxSwipe = threshold * 1.2;
    delta = Math.max(-maxSwipe, Math.min(maxSwipe, delta));
    
    setTranslateX(delta);
  }, [leftAction, rightAction]);

  const handleTouchEnd = useCallback(() => {
    setIsAnimating(true);
    
    if (translateX >= threshold && leftAction) {
      leftAction.onClick();
    } else if (translateX <= -threshold && rightAction) {
      rightAction.onClick();
    }
    
    setTranslateX(0);
  }, [translateX, leftAction, rightAction]);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Background Actions */}
      {leftAction && (
        <div className={cn(
          "absolute inset-y-0 left-0 flex items-center justify-start px-4",
          variantStyles[leftAction.variant || "default"]
        )}>
          <div className="flex flex-col items-center gap-1 text-primary-foreground">
            {leftAction.icon}
            <span className="text-[10px] font-medium">{leftAction.label}</span>
          </div>
        </div>
      )}
      
      {rightAction && (
        <div className={cn(
          "absolute inset-y-0 right-0 flex items-center justify-end px-4",
          variantStyles[rightAction.variant || "default"]
        )}>
          <div className="flex flex-col items-center gap-1 text-primary-foreground">
            {rightAction.icon}
            <span className="text-[10px] font-medium">{rightAction.label}</span>
          </div>
        </div>
      )}
      
      {/* Swipeable Content */}
      <div
        className={cn(
          "relative bg-card",
          isAnimating && "transition-transform duration-200 ease-out"
        )}
        style={{ transform: `translateX(${translateX}px)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {children}
      </div>
    </div>
  );
}
