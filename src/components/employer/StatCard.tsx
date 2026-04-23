import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  iconColor?: string;
}

export function StatCard({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: _Icon,
  iconColor: _iconColor,
}: StatCardProps) {
  void _Icon;
  void _iconColor;

  const changeClass =
    changeType === 'positive'
      ? 'text-emerald-400'
      : changeType === 'negative'
        ? 'text-red-400'
        : 'text-white';

  return (
    <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden touch-manipulation">
      <div className="p-5 sm:p-6 flex flex-col items-start">
        <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white truncate">
          {title}
        </div>
        <div className="mt-3 sm:mt-4 text-[30px] sm:text-4xl lg:text-[44px] font-semibold tabular-nums tracking-[-0.02em] leading-none text-white">
          {value}
        </div>
        {change && (
          <div className={cn('mt-2.5 text-[11px] font-medium tabular-nums', changeClass)}>
            {change}
          </div>
        )}
      </div>
    </div>
  );
}
