import { useState, useRef } from "react";
import { Archive, Copy, MoreHorizontal, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileCardSwipeActionsProps {
  children: React.ReactNode;
  onArchive?: () => void;
  onCopy?: () => void;
  onMove?: () => void;
  className?: string;
}

export function MobileCardSwipeActions({ 
  children, 
  onArchive, 
  onCopy, 
  onMove,
  className 
}: MobileCardSwipeActionsProps) {
  const [translateX, setTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const currentX = useRef(0);
  
  const SWIPE_THRESHOLD = 80;
  const MAX_SWIPE = 100;
  
  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    currentX.current = e.touches[0].clientX;
    setIsDragging(true);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    currentX.current = e.touches[0].clientX;
    const diff = currentX.current - startX.current;
    
    // Limit swipe distance
    const clampedDiff = Math.max(-MAX_SWIPE, Math.min(MAX_SWIPE, diff));
    setTranslateX(clampedDiff);
  };
  
  const handleTouchEnd = () => {
    setIsDragging(false);
    
    // Check if swipe exceeded threshold
    if (translateX <= -SWIPE_THRESHOLD) {
      // Swipe left - show archive
      if (navigator.vibrate) navigator.vibrate(30);
      onArchive?.();
    } else if (translateX >= SWIPE_THRESHOLD) {
      // Swipe right - show copy
      if (navigator.vibrate) navigator.vibrate(30);
      onCopy?.();
    }
    
    // Reset position
    setTranslateX(0);
  };

  const leftOpacity = Math.min(translateX / SWIPE_THRESHOLD, 1);
  const rightOpacity = Math.min(-translateX / SWIPE_THRESHOLD, 1);

  return (
    <div className={cn("relative overflow-hidden rounded-lg", className)}>
      {/* Left action (revealed on swipe right) */}
      <div 
        className="absolute inset-y-0 left-0 w-24 flex items-center justify-center bg-elec-yellow"
        style={{ opacity: leftOpacity }}
      >
        <div className="flex flex-col items-center gap-1 text-elec-dark">
          <Copy className="h-5 w-5" />
          <span className="text-xs font-medium">Copy</span>
        </div>
      </div>
      
      {/* Right action (revealed on swipe left) */}
      <div 
        className="absolute inset-y-0 right-0 w-24 flex items-center justify-center bg-warning"
        style={{ opacity: rightOpacity }}
      >
        <div className="flex flex-col items-center gap-1 text-warning-foreground">
          <Archive className="h-5 w-5" />
          <span className="text-xs font-medium">Archive</span>
        </div>
      </div>
      
      {/* Main content */}
      <div
        className={cn(
          "relative bg-background transition-transform",
          !isDragging && "duration-200"
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
