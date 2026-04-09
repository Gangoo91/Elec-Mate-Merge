import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface KPICardProps {
  label: string;
  value: string | number;
  href?: string;
  accent: string;
  valueColor: string;
  isLoading?: boolean;
  onClick?: () => void;
}

function KPICard({ label, value, href, accent, valueColor, isLoading, onClick }: KPICardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) onClick();
    else if (href) navigate(href);
  };

  return (
    <button
      onClick={handleClick}
      className="group relative overflow-hidden card-surface-interactive rounded-xl active:scale-[0.97] transition-all touch-manipulation text-left"
    >
      <div className={cn('absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r opacity-40 group-hover:opacity-100 transition-opacity', accent)} />
      <div className="relative z-10 p-3">
        {isLoading ? (
          <>
            <Skeleton className="h-3 w-16 mb-1.5 bg-white/[0.06]" />
            <Skeleton className="h-5 w-12 bg-white/[0.06]" />
          </>
        ) : (
          <>
            <span className="text-[11px] font-medium text-white leading-tight block">{label}</span>
            <span className={cn('text-xl font-bold leading-tight mt-1 block', valueColor)}>
              {value}
            </span>
          </>
        )}
      </div>
    </button>
  );
}

interface DashboardStatsBarProps {
  inProgressCount: number;
  partPDueCount: number;
  expiringCount: number;
  completedCount: number;
  overduePartP?: boolean;
  isLoading?: boolean;
  onStatClick?: (stat: 'in-progress' | 'part-p' | 'expiring') => void;
}

const DashboardStatsBar = ({
  inProgressCount,
  partPDueCount,
  expiringCount,
  completedCount,
  overduePartP = false,
  isLoading = false,
  onStatClick,
}: DashboardStatsBarProps) => {
  const allClear = inProgressCount === 0 && partPDueCount === 0 && expiringCount === 0;

  if (allClear && !isLoading) {
    return (
      <div className="relative overflow-hidden card-surface-interactive rounded-xl">
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-emerald-500 via-emerald-400 to-green-400 opacity-50" />
        <div className="relative z-10 p-4">
          <p className="text-sm font-bold text-emerald-400">All Clear</p>
          <p className="text-xs text-white mt-0.5">No outstanding items</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <KPICard
        label="In Progress"
        value={inProgressCount}
        accent={inProgressCount > 0 ? 'from-amber-500 via-amber-400 to-yellow-400' : 'from-white/20 to-white/5'}
        valueColor={inProgressCount > 0 ? 'text-amber-400' : 'text-white'}
        isLoading={isLoading}
        onClick={() => onStatClick?.('in-progress')}
      />
      <KPICard
        label="Part P Due"
        value={partPDueCount}
        accent={overduePartP ? 'from-red-500 via-rose-400 to-pink-400' : partPDueCount > 0 ? 'from-amber-500 via-amber-400 to-yellow-400' : 'from-white/20 to-white/5'}
        valueColor={overduePartP ? 'text-red-400' : partPDueCount > 0 ? 'text-amber-400' : 'text-white'}
        isLoading={isLoading}
        onClick={() => onStatClick?.('part-p')}
      />
      <KPICard
        label="Expiring"
        value={expiringCount}
        accent={expiringCount > 0 ? 'from-orange-500 via-amber-400 to-yellow-400' : 'from-white/20 to-white/5'}
        valueColor={expiringCount > 0 ? 'text-orange-400' : 'text-white'}
        isLoading={isLoading}
        onClick={() => onStatClick?.('expiring')}
      />
      <KPICard
        label="Completed"
        value={completedCount}
        accent={completedCount > 0 ? 'from-emerald-500 via-emerald-400 to-green-400' : 'from-white/20 to-white/5'}
        valueColor={completedCount > 0 ? 'text-emerald-400' : 'text-white'}
        isLoading={isLoading}
        onClick={() => onStatClick?.('in-progress')}
      />
    </div>
  );
};

export default DashboardStatsBar;
