import { Clock, Check, DollarSign, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatCompactCurrency, type ExpenseStats, type ExpenseStatus } from '@/hooks/useExpenses';

interface ExpenseStatsBarProps {
  stats: ExpenseStats;
  activeStatus?: ExpenseStatus;
  onStatusClick?: (status: ExpenseStatus | undefined) => void;
  className?: string;
}

const statConfig: {
  key: keyof Omit<ExpenseStats, 'total'>;
  label: string;
  status: ExpenseStatus;
  icon: React.ElementType;
  gradient: string;
  iconBg: string;
}[] = [
  {
    key: 'pending',
    label: 'Pending',
    status: 'Pending',
    icon: Clock,
    gradient: 'from-amber-500/20 to-orange-500/10',
    iconBg: 'bg-amber-500/20 text-amber-500',
  },
  {
    key: 'approved',
    label: 'Approved',
    status: 'Approved',
    icon: Check,
    gradient: 'from-green-500/20 to-emerald-500/10',
    iconBg: 'bg-green-500/20 text-green-500',
  },
  {
    key: 'paid',
    label: 'Paid',
    status: 'Paid',
    icon: DollarSign,
    gradient: 'from-blue-500/20 to-cyan-500/10',
    iconBg: 'bg-blue-500/20 text-blue-500',
  },
  {
    key: 'rejected',
    label: 'Rejected',
    status: 'Rejected',
    icon: X,
    gradient: 'from-red-500/20 to-rose-500/10',
    iconBg: 'bg-red-500/20 text-red-500',
  },
];

export function ExpenseStatsBar({
  stats,
  activeStatus,
  onStatusClick,
  className,
}: ExpenseStatsBarProps) {
  return (
    <div
      className={cn(
        'flex gap-3 overflow-x-auto hide-scrollbar pb-1',
        '-mx-4 px-4 md:mx-0 md:px-0',
        'md:grid md:grid-cols-4',
        className
      )}
    >
      {statConfig.map(({ key, label, status, icon: Icon, gradient, iconBg }) => {
        const data = stats[key];
        const isActive = activeStatus === status;
        const isClickable = !!onStatusClick;

        return (
          <div
            key={key}
            role={isClickable ? 'button' : undefined}
            tabIndex={isClickable ? 0 : undefined}
            className={cn(
              'shrink-0 w-36 md:w-auto',
              'bg-gradient-to-br border rounded-2xl overflow-hidden',
              gradient,
              'transition-colors',
              isClickable && 'cursor-pointer hover:bg-[hsl(0_0%_14%)] active:scale-[0.98] touch-manipulation',
              isActive ? 'ring-2 ring-elec-yellow border-elec-yellow/50' : 'border-white/[0.06]'
            )}
            onClick={() => {
              if (onStatusClick) {
                onStatusClick(isActive ? undefined : status);
              }
            }}
            onKeyDown={(e) => {
              if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                onStatusClick?.(isActive ? undefined : status);
              }
            }}
          >
            <div className="p-3 md:p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className={cn('p-1.5 rounded-lg', iconBg)}>
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-xs font-medium text-white">{label}</span>
              </div>
              <div className="space-y-0.5">
                <p className="text-xl md:text-2xl font-bold text-white">
                  {formatCompactCurrency(data.total)}
                </p>
                <p className="text-xs text-white">
                  {data.count} {data.count === 1 ? 'claim' : 'claims'}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Compact version for electrician view (3 stats)
export function MyExpenseStatsBar({
  stats,
  className,
}: {
  stats: ExpenseStats;
  className?: string;
}) {
  const myStatConfig = [
    {
      key: 'pending' as const,
      label: 'Pending',
      icon: Clock,
      gradient: 'from-amber-500/20 to-orange-500/10',
      iconBg: 'bg-amber-500/20 text-amber-500',
    },
    {
      key: 'approved' as const,
      label: 'Approved',
      icon: Check,
      gradient: 'from-green-500/20 to-emerald-500/10',
      iconBg: 'bg-green-500/20 text-green-500',
    },
    {
      key: 'paid' as const,
      label: 'Paid',
      icon: DollarSign,
      gradient: 'from-blue-500/20 to-cyan-500/10',
      iconBg: 'bg-blue-500/20 text-blue-500',
    },
  ];

  return (
    <div
      className={cn(
        'flex gap-3 overflow-x-auto hide-scrollbar pb-1',
        '-mx-4 px-4 md:mx-0 md:px-0',
        'md:grid md:grid-cols-3',
        className
      )}
    >
      {myStatConfig.map(({ key, label, icon: Icon, gradient, iconBg }) => {
        const data = stats[key];

        return (
          <div
            key={key}
            className={cn(
              'shrink-0 w-32 md:w-auto',
              'bg-gradient-to-br border border-white/[0.06] rounded-2xl overflow-hidden',
              gradient
            )}
          >
            <div className="p-3 md:p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className={cn('p-1.5 rounded-lg', iconBg)}>
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-xs font-medium text-white">{label}</span>
              </div>
              <div className="space-y-0.5">
                <p className="text-xl md:text-2xl font-bold text-white">
                  {formatCompactCurrency(data.total)}
                </p>
                <p className="text-xs text-white">
                  {data.count} {data.count === 1 ? 'claim' : 'claims'}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ExpenseStatsBar;
