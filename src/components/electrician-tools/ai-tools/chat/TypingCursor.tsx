import { memo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TypingCursorProps {
  /** Whether the cursor is visible */
  visible?: boolean;
  /** Custom className */
  className?: string;
  /** Cursor style variant */
  variant?: 'block' | 'line' | 'underscore';
  /** Colour variant */
  color?: 'primary' | 'muted';
}

/**
 * TypingCursor — Blinking cursor appended to streaming text.
 */
export const TypingCursor = memo(function TypingCursor({
  visible = true,
  className,
  variant = 'line',
  color = 'primary',
}: TypingCursorProps) {
  if (!visible) return null;

  const colorClasses = {
    primary: 'bg-elec-yellow',
    muted: 'bg-white/40',
  };

  const variantClasses = {
    block: 'w-2 h-5 rounded-sm',
    line: 'w-0.5 h-5 rounded-full',
    underscore: 'w-3 h-0.5 rounded-full',
  };

  return (
    <motion.span
      initial={{ opacity: 1 }}
      animate={{ opacity: [1, 0, 1] }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'steps(2)',
      }}
      className={cn(
        'inline-block align-middle ml-0.5',
        colorClasses[color],
        variantClasses[variant],
        className
      )}
      aria-hidden="true"
    />
  );
});

interface TypingIndicatorProps {
  /** Whether to show the indicator */
  visible?: boolean;
  /** Custom className */
  className?: string;
  /** Label text */
  label?: string;
}

/**
 * TypingIndicator — Three-dot "Composing" placeholder.
 *
 * Editorial eyebrow label + three pulsing dots. No icons.
 */
export const TypingIndicator = memo(function TypingIndicator({
  visible = true,
  className,
  label = 'Composing',
}: TypingIndicatorProps) {
  if (!visible) return null;

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/55">
        {label}
      </span>
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0.3, scale: 0.8 }}
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeInOut',
            }}
            className="w-1.5 h-1.5 rounded-full bg-elec-yellow"
          />
        ))}
      </div>
    </div>
  );
});

export default TypingCursor;
