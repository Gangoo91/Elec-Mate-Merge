import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KPICardProps {
  label: string;
  value: string | number;
  href?: string;
  highlight: 'green' | 'amber' | 'red' | 'orange' | 'neutral';
  isLoading?: boolean;
  onClick?: () => void;
}

const highlightClasses: Record<KPICardProps['highlight'], string> = {
  green: 'border-emerald-500/30 bg-emerald-500/10',
  amber: 'border-amber-500/30 bg-amber-500/10',
  red: 'border-red-500/30 bg-red-500/10',
  orange: 'border-orange-500/30 bg-orange-500/10',
  neutral: 'border-white/10 bg-white/5',
};

const valueColourClasses: Record<KPICardProps['highlight'], string> = {
  green: 'text-emerald-400',
  amber: 'text-amber-400',
  red: 'text-red-400',
  orange: 'text-orange-400',
  neutral: 'text-white',
};

function KPICard({ label, value, href, highlight, isLoading, onClick }: KPICardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      navigate(href);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        'flex flex-col items-start justify-center rounded-xl border px-3 py-2 h-14',
        'touch-manipulation active:scale-[0.97] transition-all',
        highlightClasses[highlight]
      )}
    >
      {isLoading ? (
        <>
          <Skeleton className="h-3 w-16 mb-1.5" />
          <Skeleton className="h-5 w-12" />
        </>
      ) : (
        <>
          <span className="text-[11px] font-medium text-white leading-tight">{label}</span>
          <span className={cn('text-base font-bold leading-tight', valueColourClasses[highlight])}>
            {value}
          </span>
        </>
      )}
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
      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3">
        <CheckCircle2 className="h-5 w-5 text-emerald-400" />
        <div>
          <p className="text-sm font-semibold text-white">All Clear</p>
          <p className="text-xs text-emerald-400">No outstanding items</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      <KPICard
        label="In Progress"
        value={inProgressCount}
        highlight={inProgressCount > 0 ? 'amber' : 'neutral'}
        isLoading={isLoading}
        onClick={() => onStatClick?.('in-progress')}
      />
      <KPICard
        label="Part P Due"
        value={partPDueCount}
        highlight={overduePartP ? 'red' : partPDueCount > 0 ? 'amber' : 'neutral'}
        isLoading={isLoading}
        onClick={() => onStatClick?.('part-p')}
      />
      <KPICard
        label="Expiring"
        value={expiringCount}
        highlight={expiringCount > 0 ? 'orange' : 'neutral'}
        isLoading={isLoading}
        onClick={() => onStatClick?.('expiring')}
      />
      <KPICard
        label="Completed"
        value={completedCount}
        highlight={completedCount > 0 ? 'green' : 'neutral'}
        isLoading={isLoading}
        onClick={() => onStatClick?.('in-progress')}
      />
    </div>
  );
};

export default DashboardStatsBar;
