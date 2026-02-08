import React, { memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
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
 * FollowUpChips - Clickable follow-up suggestions
 *
 * Features:
 * - Vertical stack layout for readability
 * - Subtle border with yellow accent on hover
 * - Haptic feedback on tap
 * - Smooth staggered entrance animation
 * - Arrow indicator for clickability
 */
export const FollowUpChips = memo(function FollowUpChips({
  questions,
  onSelect,
  className,
}: FollowUpChipsProps) {
  const haptic = useHaptic();

  const handleSelect = useCallback((question: string) => {
    haptic.selection();
    onSelect(question);
  }, [onSelect, haptic]);

  if (!questions || questions.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.3 }}
      className={cn('space-y-2.5', className)}
    >
      {/* Label */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground/80 px-0.5">
        <Sparkles className="w-3 h-3 text-elec-yellow/70" />
        <span>You might also ask</span>
      </div>

      {/* Stacked chips */}
      <div className="flex flex-col gap-2">
        {questions.map((question, idx) => (
          <motion.button
            key={idx}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + idx * 0.08 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect(question)}
            className={cn(
              "group relative w-full text-left",
              "px-4 py-3 rounded-xl",
              "bg-card/60 backdrop-blur-sm",
              "border border-border/40",
              "hover:border-elec-yellow/40 hover:bg-card/80",
              "active:bg-elec-yellow/5",
              "transition-all duration-200",
              "touch-manipulation",
              "flex items-start gap-3"
            )}
          >
            <ArrowRight className="w-3.5 h-3.5 mt-0.5 shrink-0 text-elec-yellow/50 group-hover:text-elec-yellow group-hover:translate-x-0.5 transition-all" />
            <span className="text-sm text-foreground/80 group-hover:text-foreground leading-snug transition-colors">
              {question}
            </span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
});

export default FollowUpChips;
