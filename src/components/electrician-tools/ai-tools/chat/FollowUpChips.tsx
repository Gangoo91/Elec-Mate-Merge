import { memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';

interface FollowUpChipsProps {
  /** Array of follow-up questions */
  questions: string[];
  /** Called when a question is selected */
  onSelect: (question: string) => void;
  /** Custom className */
  className?: string;
  /** Max chips to render on mobile (desktop shows all up to the hard cap of 4) */
  mobileCap?: number;
  /** Hard cap applied on all breakpoints */
  cap?: number;
}

/**
 * FollowUpChips — Small pill row rendered beneath an assistant message.
 *
 * Editorial, text-only. Max 3 chips on mobile, 4 on desktop.
 * Chips match the college primitive tone (`bg-white/[0.04]`,
 * `border-white/[0.08]`, rounded-full).
 */
export const FollowUpChips = memo(function FollowUpChips({
  questions,
  onSelect,
  className,
  mobileCap = 3,
  cap = 4,
}: FollowUpChipsProps) {
  const haptic = useHaptic();

  const handleSelect = useCallback(
    (question: string) => {
      haptic.selection();
      onSelect(question);
    },
    [onSelect, haptic]
  );

  if (!questions || questions.length === 0) return null;

  const capped = questions.slice(0, cap);

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.25 }}
      className={cn('space-y-2 min-w-0', className)}
    >
      <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/55">
        You might also ask
      </div>
      {/* Stacked rows on mobile (chip pills on desktop). Each row wraps text,
          clamps to the container width, and can't push the page sideways. */}
      <div className="flex flex-col gap-1.5 sm:flex-row sm:flex-wrap sm:gap-2 min-w-0">
        {capped.map((question, idx) => {
          const isMobileHidden = idx >= mobileCap;
          return (
            <motion.button
              key={idx}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 + idx * 0.05 }}
              onClick={() => handleSelect(question)}
              className={cn(
                'group w-full sm:w-auto max-w-full min-w-0 text-left',
                'text-[13px] leading-snug text-white/90 hover:text-white',
                'bg-transparent sm:bg-white/[0.04] sm:hover:bg-white/[0.08]',
                'border-0 sm:border sm:border-white/[0.08] sm:rounded-full',
                'border-t border-white/[0.06] sm:border-t-0',
                'px-0 py-2.5 sm:px-3.5 sm:py-1.5 transition-colors touch-manipulation',
                'flex items-start gap-2 sm:gap-0',
                isMobileHidden && 'hidden sm:inline-flex'
              )}
              style={{ overflowWrap: 'anywhere', wordBreak: 'break-word' }}
            >
              <span className="sm:hidden text-elec-yellow/70 mt-[2px]">→</span>
              <span className="flex-1 min-w-0">{question}</span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
});

export default FollowUpChips;
