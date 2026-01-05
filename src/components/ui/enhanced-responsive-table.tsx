import React, { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface EnhancedResponsiveTableProps {
  children: React.ReactNode;
  className?: string;
  showIndicators?: boolean;
}

export const EnhancedResponsiveTable: React.FC<EnhancedResponsiveTableProps> = ({
  children,
  className,
  showIndicators = true,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftIndicator, setShowLeftIndicator] = useState(false);
  const [showRightIndicator, setShowRightIndicator] = useState(false);

  const checkScroll = () => {
    const element = scrollRef.current;
    if (!element) return;

    const { scrollLeft, scrollWidth, clientWidth } = element;
    
    setShowLeftIndicator(scrollLeft > 10);
    setShowRightIndicator(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const element = scrollRef.current;
    if (!element) return;

    element.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);

    return () => {
      element.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  return (
    <div className={cn('relative', className)}>
      {/* Left scroll indicator */}
      {showIndicators && showLeftIndicator && (
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background via-background/80 to-transparent pointer-events-none z-10 flex items-center">
          <ChevronLeft className="h-5 w-5 text-elec-yellow animate-pulse ml-1" />
        </div>
      )}

      {/* Scrollable container */}
      <div
        ref={scrollRef}
        className="overflow-x-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent touch-pan-x"
      >
        <div className="inline-block min-w-full align-middle">
          {children}
        </div>
      </div>

      {/* Right scroll indicator */}
      {showIndicators && showRightIndicator && (
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background via-background/80 to-transparent pointer-events-none z-10 flex items-center justify-end">
          <ChevronRight className="h-5 w-5 text-elec-yellow animate-pulse mr-1" />
        </div>
      )}
    </div>
  );
};

export default EnhancedResponsiveTable;
