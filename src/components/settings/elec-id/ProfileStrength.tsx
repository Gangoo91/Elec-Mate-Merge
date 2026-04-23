import React, { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface ProfileStrengthItem {
  id: string;
  label: string;
  description: string;
  points: number;
  completed: boolean;
  action?: () => void;
}

interface ProfileStrengthProps {
  items: ProfileStrengthItem[];
  currentTier: 'basic' | 'verified' | 'premium';
  className?: string;
}

const TIER_CONFIG = {
  basic: { label: 'Basic', color: 'text-white', minPoints: 0 },
  verified: { label: 'Verified', color: 'text-blue-400', minPoints: 50 },
  premium: { label: 'Premium', color: 'text-elec-yellow', minPoints: 80 },
};

const MILESTONES = [
  { points: 25, label: 'Getting started', reward: 'Basic listing' },
  { points: 50, label: 'Verified', reward: 'Verified badge' },
  { points: 75, label: 'Almost premium', reward: 'Priority search' },
  { points: 100, label: 'Premium', reward: 'Top listing + employer alerts' },
];

export function ProfileStrength({ items, currentTier, className }: ProfileStrengthProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  const totalPoints = items.reduce((sum, item) => sum + item.points, 0);
  const earnedPoints = items
    .filter((item) => item.completed)
    .reduce((sum, item) => sum + item.points, 0);
  const percentage = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;

  const tier = TIER_CONFIG[currentTier];

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(percentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  const nextMilestone = MILESTONES.find((m) => earnedPoints < m.points);
  const pointsToNext = nextMilestone ? nextMilestone.points - earnedPoints : 0;

  return (
    <div
      className={cn(
        'bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden p-5 space-y-4',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
            Profile strength
          </div>
          <div className="mt-1 text-base font-semibold text-white">
            Boost your visibility
          </div>
        </div>
        <span
          className={cn(
            'inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-full border bg-white/[0.04] border-white/[0.06]',
            tier.color
          )}
        >
          {tier.label}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative w-20 h-20">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 42}`}
              strokeDashoffset={`${2 * Math.PI * 42 * (1 - animatedProgress / 100)}`}
              className="text-elec-yellow transition-all duration-700 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-semibold text-white tabular-nums">{percentage}%</span>
          </div>
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-semibold text-white tabular-nums">{earnedPoints}</span>
            <span className="text-sm text-white">/ {totalPoints} pts</span>
          </div>
          {nextMilestone && (
            <p className="text-sm text-white">
              {pointsToNext} pts to{' '}
              <span className="font-medium text-white">{nextMilestone.label}</span>
            </p>
          )}
        </div>
      </div>

      <Progress value={animatedProgress} className="h-2" />

      <div className="space-y-2 pt-2">
        <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
          Actions
        </div>
        {items.map((item) => (
          <div
            key={item.id}
            className={cn(
              'flex items-center gap-3 p-3 rounded-xl border transition-all',
              item.completed
                ? 'bg-emerald-500/10 border-emerald-500/20'
                : 'bg-white/[0.04] border-white/[0.06]'
            )}
          >
            <span
              aria-hidden
              className={cn(
                'inline-block h-2 w-2 rounded-full shrink-0',
                item.completed ? 'bg-emerald-400' : 'bg-white/40'
              )}
            />

            <div className="flex-1 min-w-0">
              <p className={cn('font-medium text-sm', item.completed ? 'text-emerald-400' : 'text-white')}>
                {item.label}
              </p>
              <p className="text-xs text-white truncate">{item.description}</p>
            </div>

            <span
              className={cn(
                'inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-full border',
                item.completed
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  : 'bg-elec-yellow/10 text-elec-yellow border-elec-yellow/20'
              )}
            >
              +{item.points}
            </span>

            {!item.completed && item.action && (
              <button
                onClick={item.action}
                className="h-11 px-3 rounded-lg text-[12px] font-medium text-elec-yellow hover:bg-white/[0.04] touch-manipulation"
              >
                →
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileStrength;
