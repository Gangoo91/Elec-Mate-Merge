import { cn } from '@/lib/utils';

type StatusType =
  | 'active'
  | 'pending'
  | 'completed'
  | 'expired'
  | 'warning'
  | 'inactive'
  | 'approved'
  | 'rejected';

interface StatusBadgeProps {
  status: StatusType | string;
  className?: string;
}

const statusStyles: Record<StatusType, string> = {
  active: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  completed: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  approved: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  pending: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  warning: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  expired: 'bg-red-500/20 text-red-400 border-red-500/30',
  rejected: 'bg-red-500/20 text-red-400 border-red-500/30',
  inactive: 'bg-white/[0.06] text-white border-white/[0.08]',
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const normalizedStatus = status.toLowerCase() as StatusType;
  const style = statusStyles[normalizedStatus] || statusStyles.inactive;

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize',
        style,
        className
      )}
    >
      {status}
    </span>
  );
}
