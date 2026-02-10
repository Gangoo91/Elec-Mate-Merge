/**
 * XPProgressRing
 *
 * Circular progress indicator showing:
 * - Inner ring: XP earned today / daily goal
 * - Level badge in centre
 * - XP count below
 * - Subtle animation on XP gain
 */

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface XPProgressRingProps {
  xpToday: number;
  dailyGoal: number;
  level: number;
  levelTitle: string;
  totalXP: number;
  /** Size in px — default 120 */
  size?: number;
  /** Whether to show the level badge in centre */
  showLevel?: boolean;
  /** Compact mode for inline use */
  compact?: boolean;
  /** Callback when ring is tapped */
  onTap?: () => void;
}

export function XPProgressRing({
  xpToday,
  dailyGoal,
  level,
  levelTitle,
  totalXP,
  size = 120,
  showLevel = true,
  compact = false,
  onTap,
}: XPProgressRingProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const progress = Math.min((xpToday / dailyGoal) * 100, 100);
  const goalMet = xpToday >= dailyGoal;

  // Animate progress on mount and change
  useEffect(() => {
    const timer = setTimeout(() => setAnimatedProgress(progress), 100);
    return () => clearTimeout(timer);
  }, [progress]);

  const strokeWidth = compact ? 4 : 6;
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedProgress / 100) * circumference;
  const centre = size / 2;

  return (
    <button
      onClick={onTap}
      className={cn(
        'flex flex-col items-center gap-1.5 touch-manipulation',
        onTap && 'active:scale-95 transition-transform'
      )}
      disabled={!onTap}
      aria-label={`Level ${level}: ${xpToday} of ${dailyGoal} XP today`}
    >
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
        >
          {/* Background ring */}
          <circle
            cx={centre}
            cy={centre}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-white/[0.06]"
          />
          {/* Progress ring */}
          <circle
            cx={centre}
            cy={centre}
            r={radius}
            fill="none"
            stroke="url(#xp-gradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-700 ease-out"
          />
          {/* Gradient definition */}
          <defs>
            <linearGradient id="xp-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={goalMet ? '#22c55e' : '#facc15'} />
              <stop offset="100%" stopColor={goalMet ? '#16a34a' : '#f59e0b'} />
            </linearGradient>
          </defs>
        </svg>

        {/* Centre content */}
        {showLevel && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={cn(
              'font-bold',
              compact ? 'text-lg' : 'text-2xl',
              goalMet ? 'text-green-400' : 'text-elec-yellow'
            )}>
              {level}
            </span>
            {!compact && (
              <span className="text-[10px] text-white/90 font-medium uppercase tracking-wider">
                Level
              </span>
            )}
          </div>
        )}

        {/* Goal met indicator */}
        {goalMet && (
          <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/30 animate-bounce">
            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>

      {/* XP text below ring */}
      {!compact && (
        <div className="text-center">
          <div className="text-sm font-semibold text-white">
            <span className={goalMet ? 'text-green-400' : 'text-elec-yellow'}>
              {xpToday}
            </span>
            <span className="text-white/90"> / {dailyGoal} XP</span>
          </div>
          <div className="text-[11px] text-white/70">{levelTitle}</div>
        </div>
      )}
    </button>
  );
}

export default XPProgressRing;
