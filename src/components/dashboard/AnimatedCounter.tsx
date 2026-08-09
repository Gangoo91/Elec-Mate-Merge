/**
 * AnimatedCounter
 *
 * Counts to a value over a fixed duration, easing out.
 * Supports locale formatting, currency prefixes, and tabular-nums.
 */

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  formatAsCurrency?: boolean;
}

export function AnimatedCounter({
  value,
  duration = 1,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
  formatAsCurrency = false,
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const previousValue = useRef(0);

  /*
    A fixed-duration tween, not a spring.

    This ran `useSpring(0, { stiffness: 100, damping: 30, duration })`, which
    had two faults. `duration` was inert — framer-motion ignores it whenever
    stiffness and damping are supplied — and, worse, the spring's default
    `restDelta` of 0.01 is an ABSOLUTE threshold. Settling on £3,376.77 meant
    converging to three parts per million through an overdamped decay, so the
    admin MRR figure spent about twenty-five seconds climbing and read £120,
    then £379, then £2,446 to anyone who glanced at it. On a page whose whole
    job is to state the money, the headline was wrong far longer than it was
    right.

    Scaling restDelta to the value does not fix it either: useSpring captures
    its config on first render, when `value` is still 0 because the query has
    not resolved, so the threshold stays pinned at its initial tiny value.

    An eased tween has no rest threshold to get wrong. It lands on exactly
    `value` after exactly `duration`, whatever the magnitude — and it animates
    from wherever the previous value was, so a refresh nudges the figure rather
    than replaying it from zero.
  */
  useEffect(() => {
    const from = previousValue.current;
    const to = value;
    previousValue.current = value;

    if (from === to) {
      setDisplayValue(to);
      return;
    }

    const ms = Math.max(0, duration * 1000);
    if (ms === 0) {
      setDisplayValue(to);
      return;
    }

    let frame = 0;
    const start = performance.now();
    // easeOutCubic: quick to become readable, gentle at the finish.
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / ms);
      setDisplayValue(from + (to - from) * ease(t));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [value, duration]);

  // Format the number
  const formatNumber = (num: number): string => {
    const rounded = Number(num.toFixed(decimals));

    if (formatAsCurrency) {
      // Format as currency with k suffix for thousands
      if (rounded >= 1000) {
        return `${(rounded / 1000).toFixed(1)}k`;
      }
      return rounded.toLocaleString('en-GB', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
    }

    return rounded.toLocaleString('en-GB', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  return (
    <span className={`tabular-nums tracking-tight ${className}`}>
      {prefix}
      {formatNumber(displayValue)}
      {suffix}
    </span>
  );
}

/**
 * Simple counter without spring animation
 * Use for smaller, less prominent numbers
 */
export function SimpleCounter({
  value,
  prefix = '',
  suffix = '',
  className = '',
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`tabular-nums tracking-tight ${className}`}
    >
      {prefix}
      {value.toLocaleString('en-GB')}
      {suffix}
    </motion.span>
  );
}

export default AnimatedCounter;
