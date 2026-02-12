/**
 * AM2RigOverview v2
 *
 * Phase 1 screen: 7 circuit cards with completion badges
 * and an overall progress ring. Tap a card to enter testing.
 *
 * Fixed: uses static Tailwind classes (no dynamic interpolation).
 */

import { cn } from '@/lib/utils';
import {
  CircleDot,
  Zap,
  Lightbulb,
  Settings,
  Bell,
  Globe,
  Droplets,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import { AM2_RIG_CIRCUITS } from '@/data/am2RigCircuits';
import type { CircuitProgress } from '@/types/am2-testing-simulator';

interface AM2RigOverviewProps {
  circuitProgress: Record<number, CircuitProgress>;
  overallProgress: number;
  onSelectCircuit: (circuitId: number) => void;
}

const CIRCUIT_ICONS: Record<number, typeof Zap> = {
  1: CircleDot,
  2: Zap,
  3: Lightbulb,
  4: Settings,
  5: Bell,
  6: Globe,
  7: Droplets,
};

/** Static Tailwind class pairs — dynamic interpolation breaks purging */
const CIRCUIT_STYLES: Record<number, { iconBg: string; iconText: string }> = {
  1: { iconBg: 'bg-cyan-500/15', iconText: 'text-cyan-400' },
  2: { iconBg: 'bg-amber-500/15', iconText: 'text-amber-400' },
  3: { iconBg: 'bg-yellow-500/15', iconText: 'text-yellow-400' },
  4: { iconBg: 'bg-red-500/15', iconText: 'text-red-400' },
  5: { iconBg: 'bg-orange-500/15', iconText: 'text-orange-400' },
  6: { iconBg: 'bg-blue-500/15', iconText: 'text-blue-400' },
  7: { iconBg: 'bg-purple-500/15', iconText: 'text-purple-400' },
};

function ProgressRing({ progress }: { progress: number }) {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg width="72" height="72" className="-rotate-90">
        <circle
          cx="36"
          cy="36"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="4"
        />
        <circle
          cx="36"
          cy="36"
          r={radius}
          fill="none"
          stroke="#22d3ee"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
      </svg>
      <span className="absolute text-lg font-bold text-white">{progress}%</span>
    </div>
  );
}

export function AM2RigOverview({
  circuitProgress,
  overallProgress,
  onSelectCircuit,
}: AM2RigOverviewProps) {
  return (
    <div className="px-4 py-4 space-y-4">
      {/* Header with progress ring */}
      <div className="flex items-center gap-4">
        <ProgressRing progress={overallProgress} />
        <div>
          <h2 className="text-lg font-bold text-white">AM2 Rig Circuits</h2>
          <p className="text-xs text-white/50">Tap a circuit to begin testing</p>
        </div>
      </div>

      {/* Circuit cards */}
      <div className="space-y-2">
        {AM2_RIG_CIRCUITS.map((circuit) => {
          const progress = circuitProgress[circuit.id];
          const Icon = CIRCUIT_ICONS[circuit.id] || Zap;
          const styles = CIRCUIT_STYLES[circuit.id] || {
            iconBg: 'bg-white/10',
            iconText: 'text-white/60',
          };
          const completedCount = progress?.completedTests.length || 0;
          const totalCount = progress?.totalTests || circuit.requiredTests.length;
          const status = progress?.status || 'untested';

          return (
            <button
              key={circuit.id}
              onClick={() => onSelectCircuit(circuit.id)}
              className={cn(
                'w-full flex items-center gap-3 p-3 rounded-xl border transition-all touch-manipulation h-[72px]',
                'bg-white/[0.03] hover:bg-white/[0.06] active:scale-[0.98]',
                status === 'complete'
                  ? 'border-green-500/30'
                  : status === 'partial'
                    ? 'border-amber-500/20'
                    : 'border-white/5'
              )}
            >
              {/* Icon */}
              <div
                className={cn(
                  'w-11 h-11 rounded-lg flex items-center justify-center shrink-0',
                  styles.iconBg
                )}
              >
                <Icon className={cn('w-5 h-5', styles.iconText)} />
              </div>

              {/* Info */}
              <div className="flex-1 text-left min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white truncate">
                    {circuit.id}. {circuit.name}
                  </span>
                  {status === 'complete' && (
                    <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                  )}
                </div>
                <p className="text-[11px] text-white/40 truncate">
                  {circuit.mcbRating}A Type {circuit.mcbType} — {circuit.cableType}
                  {circuit.hasRcd ? ` — ${circuit.rcdRating}mA RCD` : ''}
                </p>
              </div>

              {/* Progress badge + arrow */}
              <div className="shrink-0 flex items-center gap-1.5">
                <span
                  className={cn(
                    'text-xs font-mono font-semibold',
                    status === 'complete'
                      ? 'text-green-400'
                      : status === 'partial'
                        ? 'text-amber-400'
                        : 'text-white/20'
                  )}
                >
                  {completedCount}/{totalCount}
                </span>
                <ChevronRight className="w-4 h-4 text-white/20" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
