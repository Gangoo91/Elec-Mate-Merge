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
 * FollowUpChips — the "Ask next" list beneath an assistant answer.
 *
 * One card-surface list, not naked hairline rows: each question is a real
 * tappable object made of the same material as every other card, with the
 * volt arrow marking it as an action. The heading is the hub section style
 * (volt, sentence case) rather than another letterspaced eyebrow.
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
      className={cn('space-y-3 min-w-0', className)}
    >
      <h3 className="text-[15px] font-semibold tracking-tight text-elec-yellow">Ask next</h3>
      <div
        className={cn(
          'overflow-hidden rounded-2xl border border-white/[0.12]',
          'bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-white/[0.03]',
          'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]'
        )}
      >
        <div className="divide-y divide-white/[0.10]">
          {capped.map((question, idx) => {
            const isMobileHidden = idx >= mobileCap;
            return (
              <motion.button
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 + idx * 0.05 }}
                onClick={() => handleSelect(question)}
                className={cn(
                  'group flex w-full min-w-0 items-start gap-3 px-4 py-3 text-left',
                  'min-h-11 text-[13.5px] leading-snug text-white',
                  'transition-colors touch-manipulation [-webkit-tap-highlight-color:transparent]',
                  'hover:bg-white/[0.06] active:bg-white/[0.09]',
                  isMobileHidden ? 'hidden sm:flex' : 'flex'
                )}
                style={{ overflowWrap: 'anywhere', wordBreak: 'break-word' }}
              >
                <span
                  aria-hidden
                  className="mt-[1px] shrink-0 font-semibold text-elec-yellow transition-transform group-hover:translate-x-0.5"
                >
                  →
                </span>
                <span className="min-w-0 flex-1">{question}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
});

export default FollowUpChips;
