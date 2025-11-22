import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StickyBottomBarProps {
  children: ReactNode;
  className?: string;
}

export const StickyBottomBar = ({ children, className }: StickyBottomBarProps) => {
  return (
    <>
      {/* Desktop - inline */}
      <div className="hidden sm:block">
        {children}
      </div>
      
      {/* Mobile - sticky bottom */}
      <div className={cn(
        "fixed bottom-0 left-0 right-0 z-50 sm:hidden",
        "bg-background/80 backdrop-blur-lg border-t border-border",
        "p-3 pb-safe animate-slide-up",
        "shadow-[0_-4px_12px_rgba(0,0,0,0.1)]",
        className
      )}>
        <div className="container mx-auto px-3">
          {children}
        </div>
      </div>
      
      {/* Spacer for mobile to prevent content being hidden behind sticky bar */}
      <div className="h-20 sm:hidden" />
    </>
  );
};
