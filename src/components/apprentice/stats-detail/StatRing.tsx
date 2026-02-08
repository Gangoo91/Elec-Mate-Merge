/**
 * StatRing
 *
 * Animated circular progress ring using framer-motion pathLength.
 */

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StatRingProps {
  /** 0-100 */
  percent: number;
  /** Ring diameter in pixels */
  size?: number;
  /** Track colour (the unfilled part) */
  trackClass?: string;
  /** Ring colour */
  ringClass?: string;
  /** Stroke width in pixels */
  strokeWidth?: number;
  /** Content shown in the centre */
  children?: React.ReactNode;
}

export function StatRing({
  percent,
  size = 120,
  trackClass = 'stroke-white/10',
  ringClass = 'stroke-green-400',
  strokeWidth: strokeWidthProp,
  children,
}: StatRingProps) {
  const strokeWidth = strokeWidthProp ?? 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const centre = size / 2;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        {/* Track */}
        <circle
          cx={centre}
          cy={centre}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className={trackClass}
          strokeLinecap="round"
        />
        {/* Animated ring */}
        <motion.circle
          cx={centre}
          cy={centre}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className={ringClass}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - (circumference * Math.min(percent, 100)) / 100 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
        />
      </svg>
      {/* Centre content */}
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
}
