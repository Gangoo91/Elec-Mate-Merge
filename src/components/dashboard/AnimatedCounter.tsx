/**
 * AnimatedCounter
 *
 * Smooth number animation with spring physics for natural feel.
 * Supports locale formatting and currency prefixes.
 */

import { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

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

  // Spring animation for smooth counting
  const springValue = useSpring(0, {
    stiffness: 100,
    damping: 30,
    duration: duration * 1000,
  });

  useEffect(() => {
    springValue.set(value);
  }, [value, springValue]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayValue(latest);
    });

    return () => unsubscribe();
  }, [springValue]);

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
    <span className={className}>
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
      className={className}
    >
      {prefix}
      {value.toLocaleString('en-GB')}
      {suffix}
    </motion.span>
  );
}

export default AnimatedCounter;
