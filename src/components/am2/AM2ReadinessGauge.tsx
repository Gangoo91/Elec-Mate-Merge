/**
 * AM2ReadinessGauge
 *
 * Animated circular SVG gauge with spring physics.
 * Arc fills red → amber → green, number counts up, subtle glow behind.
 */

import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import type { AM2ReadinessStatus } from '@/hooks/am2/useAM2Readiness';

interface AM2ReadinessGaugeProps {
  score: number;
  status: AM2ReadinessStatus;
  size?: number;
  strokeWidth?: number;
}

const STATUS_CONFIG: Record<AM2ReadinessStatus, { colour: string; glow: string; label: string }> = {
  ready: {
    colour: '#22c55e',
    glow: 'rgba(34, 197, 94, 0.25)',
    label: 'Likely Competent',
  },
  nearly_ready: {
    colour: '#3b82f6',
    glow: 'rgba(59, 130, 246, 0.25)',
    label: 'Nearly There',
  },
  needs_work: {
    colour: '#f59e0b',
    glow: 'rgba(245, 158, 11, 0.25)',
    label: 'Moderate Risk',
  },
  not_ready: {
    colour: '#ef4444',
    glow: 'rgba(239, 68, 68, 0.25)',
    label: 'High Risk',
  },
};

export function AM2ReadinessGauge({
  score,
  status,
  size = 200,
  strokeWidth = 10,
}: AM2ReadinessGaugeProps) {
  const config = STATUS_CONFIG[status];
  const [displayScore, setDisplayScore] = useState(0);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // 270-degree arc (75% of full circle), gap at the bottom
  const arcLength = circumference * 0.75;
  const targetOffset = arcLength - (arcLength * score) / 100;

  // Spring-animated score counter
  const springValue = useSpring(0, { stiffness: 40, damping: 18 });

  useEffect(() => {
    springValue.set(score);
  }, [score, springValue]);

  useEffect(() => {
    return springValue.on('change', (v) => {
      setDisplayScore(Math.round(v));
    });
  }, [springValue]);

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {/* Glow effect behind the arc */}
      <div
        className="absolute inset-4 rounded-full blur-2xl transition-all duration-700"
        style={{ background: `radial-gradient(circle, ${config.glow} 0%, transparent 70%)` }}
      />

      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="relative z-10">
        {/* Gradient definition */}
        <defs>
          <linearGradient id="gauge-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={config.colour} stopOpacity="0.6" />
            <stop offset="100%" stopColor={config.colour} stopOpacity="1" />
          </linearGradient>
          {/* Glow filter */}
          <filter id="gauge-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeLinecap="round"
          transform={`rotate(135 ${size / 2} ${size / 2})`}
        />

        {/* Animated fill arc */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#gauge-gradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeLinecap="round"
          filter="url(#gauge-glow)"
          transform={`rotate(135 ${size / 2} ${size / 2})`}
          initial={{ strokeDashoffset: arcLength }}
          animate={{ strokeDashoffset: targetOffset }}
          transition={{
            type: 'spring',
            stiffness: 30,
            damping: 15,
            delay: 0.3,
          }}
        />

        {/* Tick marks at 0%, 50%, 100% positions */}
        {[0, 0.5, 1].map((pct) => {
          const angle = 135 + 270 * pct;
          const rad = (angle * Math.PI) / 180;
          const outerR = radius + strokeWidth / 2 + 4;
          const innerR = radius + strokeWidth / 2 + 8;
          return (
            <line
              key={pct}
              x1={size / 2 + outerR * Math.cos(rad)}
              y1={size / 2 + outerR * Math.sin(rad)}
              x2={size / 2 + innerR * Math.cos(rad)}
              y2={size / 2 + innerR * Math.sin(rad)}
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          );
        })}
      </svg>

      {/* Centre content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
        <span className="text-5xl font-bold tabular-nums" style={{ color: config.colour }}>
          {displayScore}
        </span>
        <span className="text-[11px] text-white/50 mt-0.5 font-medium tracking-wide">/ 100</span>
        <span
          className="text-xs font-semibold mt-2 tracking-tight"
          style={{ color: config.colour }}
        >
          {config.label}
        </span>
      </div>
    </div>
  );
}

export default AM2ReadinessGauge;
