import React, { memo, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';

interface FollowUpChipsProps {
  /** Array of follow-up questions */
  questions: string[];
  /** Called when a question is selected */
  onSelect: (question: string) => void;
  /** Custom className */
  className?: string;
  /** Whether to show scroll arrows on desktop */
  showScrollArrows?: boolean;
}

/**
 * FollowUpChips - Horizontal scrollable suggestion chips
 *
 * Features:
 * - Horizontal scroll on mobile
 * - Scroll arrows on desktop
 * - Haptic feedback on tap
 * - Smooth slide-up animation
 */
export const FollowUpChips = memo(function FollowUpChips({
  questions,
  onSelect,
  className,
  showScrollArrows = true,
}: FollowUpChipsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const haptic = useHaptic();

  const handleSelect = useCallback((question: string) => {
    haptic.selection();
    onSelect(question);
  }, [onSelect, haptic]);

  const scroll = useCallback((direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 200;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  }, []);

  if (!questions || questions.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.3 }}
      className={cn('space-y-2', className)}
    >
      {/* Label */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground px-1">
        <Sparkles className="w-3 h-3 text-elec-yellow" />
        <span>You might also ask:</span>
      </div>

      {/* Scrollable container */}
      <div className="relative group">
        {/* Left scroll arrow */}
        {showScrollArrows && (
          <button
            onClick={() => scroll('left')}
            className={cn(
              "absolute left-0 top-1/2 -translate-y-1/2 z-10",
              "w-8 h-8 rounded-full",
              "bg-background/90 backdrop-blur-sm border border-border/50",
              "flex items-center justify-center",
              "opacity-0 group-hover:opacity-100 transition-opacity",
              "shadow-lg",
              "hidden sm:flex"
            )}
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}

        {/* Chips container */}
        <div
          ref={scrollRef}
          className={cn(
            "flex gap-2 overflow-x-auto",
            "scrollbar-none",
            "px-1 pb-1",
            // Smooth scrolling on iOS
            "scroll-smooth",
            "-mx-1 px-1",
            // Snap scrolling
            "snap-x snap-mandatory"
          )}
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {questions.map((question, idx) => (
            <motion.button
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(question)}
              className={cn(
                "shrink-0 snap-start",
                "px-3 py-2 rounded-xl",
                "bg-gradient-to-r from-elec-blue/10 to-elec-yellow/10",
                "border border-elec-yellow/20",
                "text-xs sm:text-sm text-foreground/90",
                "hover:border-elec-yellow/50 hover:bg-elec-yellow/10",
                "active:bg-elec-yellow/20",
                "transition-all duration-200",
                "text-left",
                // Min width for touch targets
                "min-w-[180px] max-w-[280px]"
              )}
            >
              <span className="mr-1.5">💡</span>
              {question}
            </motion.button>
          ))}
        </div>

        {/* Right scroll arrow */}
        {showScrollArrows && (
          <button
            onClick={() => scroll('right')}
            className={cn(
              "absolute right-0 top-1/2 -translate-y-1/2 z-10",
              "w-8 h-8 rounded-full",
              "bg-background/90 backdrop-blur-sm border border-border/50",
              "flex items-center justify-center",
              "opacity-0 group-hover:opacity-100 transition-opacity",
              "shadow-lg",
              "hidden sm:flex"
            )}
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}

        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-background to-transparent pointer-events-none sm:hidden" />
        <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-background to-transparent pointer-events-none sm:hidden" />
      </div>
    </motion.div>
  );
});

export default FollowUpChips;
