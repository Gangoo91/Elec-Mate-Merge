import { cn } from '@/lib/utils';
import type { Tone } from '@/components/college/primitives';

interface RiskBarProps {
  riskRating: number; // 1-25 scale
  size?: 'sm' | 'md';
}

// Convert risk rating (1-25) to level
const getRiskLevel = (rating: number): { level: number; label: string; color: string } => {
  if (rating >= 15) return { level: 4, label: 'Extreme', color: 'bg-red-500' };
  if (rating >= 9) return { level: 3, label: 'High', color: 'bg-orange-500' };
  if (rating >= 4) return { level: 2, label: 'Medium', color: 'bg-yellow-500' };
  return { level: 1, label: 'Low', color: 'bg-green-500' };
};

// The single colour dimension for the editorial views: risk severity → tone.
export function riskTone(riskRating: number): Tone {
  if (riskRating >= 15) return 'red';
  if (riskRating >= 9) return 'orange';
  if (riskRating >= 4) return 'amber';
  return 'green';
}

const RISK_PILL: Record<Tone, string> = {
  red: 'bg-red-500/10 text-red-400 border-red-500/25',
  orange: 'bg-orange-500/10 text-orange-400 border-orange-500/25',
  amber: 'bg-amber-500/10 text-amber-400 border-amber-500/25',
  green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25',
  blue: 'bg-blue-500/10 text-blue-400 border-blue-500/25',
  emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25',
  purple: 'bg-purple-500/10 text-purple-400 border-purple-500/25',
  yellow: 'bg-elec-yellow/10 text-elec-yellow border-elec-yellow/25',
  cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/25',
  indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/25',
};

// Small uppercase risk pill — matches the Site Safety status-pill pattern.
export function RiskPill({ riskRating }: { riskRating: number }) {
  const { label } = getRiskLevel(riskRating);
  const tone = riskTone(riskRating);
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-[0.12em] border whitespace-nowrap',
        RISK_PILL[tone]
      )}
    >
      {label}
    </span>
  );
}

export const RiskBar = ({ riskRating, size = 'md' }: RiskBarProps) => {
  const { level, label, color } = getRiskLevel(riskRating);
  const dotSize = size === 'sm' ? 'w-1 h-2.5' : 'w-1.5 h-3';

  return (
    <div className="flex flex-col items-center gap-1">
      <div className={cn('flex flex-col gap-0.5', size === 'sm' && 'gap-[2px]')}>
        {[4, 3, 2, 1].map((i) => (
          <div
            key={i}
            className={cn(
              'rounded-full transition-all duration-300',
              dotSize,
              i <= level ? color : 'bg-white/10'
            )}
          />
        ))}
      </div>
      <span
        className={cn(
          'uppercase tracking-wider font-medium',
          size === 'sm' ? 'text-[8px]' : 'text-[10px]',
          level === 4
            ? 'text-red-400'
            : level === 3
              ? 'text-orange-400'
              : level === 2
                ? 'text-yellow-400'
                : 'text-green-400'
        )}
      >
        {label}
      </span>
    </div>
  );
};

// Badge version for headers
export const RiskBadge = ({ riskRating }: { riskRating: number }) => {
  const { label, color } = getRiskLevel(riskRating);

  return (
    <div className={cn('px-2.5 py-1 rounded-full text-xs font-semibold', color, 'text-white')}>
      {label} Risk
    </div>
  );
};

export default RiskBar;
