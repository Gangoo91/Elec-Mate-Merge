import { cn } from '@/lib/utils';

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

export const RiskBar = ({ riskRating, size = 'md' }: RiskBarProps) => {
  const { level, label, color } = getRiskLevel(riskRating);
  const dotSize = size === 'sm' ? 'w-1 h-2.5' : 'w-1.5 h-3';

  return (
    <div className="flex flex-col items-center gap-1">
      <div className={cn("flex flex-col gap-0.5", size === 'sm' && 'gap-[2px]')}>
        {[4, 3, 2, 1].map(i => (
          <div
            key={i}
            className={cn(
              "rounded-full transition-all duration-300",
              dotSize,
              i <= level ? color : "bg-white/10"
            )}
          />
        ))}
      </div>
      <span className={cn(
        "uppercase tracking-wider font-medium",
        size === 'sm' ? "text-[8px]" : "text-[10px]",
        level === 4 ? "text-red-400" :
        level === 3 ? "text-orange-400" :
        level === 2 ? "text-yellow-400" :
        "text-green-400"
      )}>
        {label}
      </span>
    </div>
  );
};

// Badge version for headers
export const RiskBadge = ({ riskRating }: { riskRating: number }) => {
  const { label, color } = getRiskLevel(riskRating);

  return (
    <div className={cn(
      "px-2.5 py-1 rounded-full text-xs font-semibold",
      color,
      "text-white"
    )}>
      {label} Risk
    </div>
  );
};

export default RiskBar;
