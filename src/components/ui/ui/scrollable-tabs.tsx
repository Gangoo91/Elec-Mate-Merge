
import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScrollableTabsProps {
  children: React.ReactNode;
  className?: string;
  showScrollButtons?: boolean;
}

export const ScrollableTabsList = ({ 
  children, 
  className, 
  showScrollButtons = true 
}: ScrollableTabsProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  const checkScrollButtons = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    setShowButtons(scrollWidth > clientWidth);
  };

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener('resize', checkScrollButtons);
    return () => window.removeEventListener('resize', checkScrollButtons);
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      {showScrollButtons && showButtons && canScrollLeft && (
        <Button
          variant="outline"
          size="sm"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 p-0 bg-background/80 backdrop-blur-sm border-border/50"
          onClick={scrollLeft}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}
      
      <div
        ref={scrollContainerRef}
        className={cn(
          "flex overflow-x-auto scrollbar-hide gap-2 px-1",
          showScrollButtons && showButtons && canScrollLeft && "pl-10",
          showScrollButtons && showButtons && canScrollRight && "pr-10",
          "min-w-max",
          className
        )}
        onScroll={checkScrollButtons}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {children}
      </div>
      
      {showScrollButtons && showButtons && canScrollRight && (
        <Button
          variant="outline"
          size="sm"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 p-0 bg-background/80 backdrop-blur-sm border-border/50"
          onClick={scrollRight}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export const ScrollableTabsTrigger = ({ 
  children, 
  className, 
  ...props 
}: React.ComponentProps<'button'> & { className?: string }) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        "hover:bg-muted/50 min-w-0 flex-shrink-0",
        // Mobile optimizations
        "touch-manipulation select-none",
        "min-h-[44px] md:min-h-[40px]", // 44px minimum touch target on mobile
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
