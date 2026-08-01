import { Badge } from '@/components/ui/badge';
import { NotificationStatus } from '@/hooks/useNotifications';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: NotificationStatus;
  className?: string;
}

const STATUS_STYLES = {
  pending: 'bg-white/[0.06] text-white/70 border-white/[0.12]',
  'in-progress': 'bg-white/[0.06] text-white/70 border-white/[0.12]',
  submitted: 'bg-green-500/10 text-green-400 border-green-500/20',
  overdue: 'bg-red-500/10 text-red-400 border-red-500/20',
  cancelled: 'bg-white/[0.05] text-white/45 border-white/[0.1]',
};

const STATUS_LABELS = {
  pending: 'Pending',
  'in-progress': 'In progress',
  submitted: 'Submitted',
  overdue: 'Overdue',
  cancelled: 'Cancelled',
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  return (
    <Badge variant="outline" className={cn(STATUS_STYLES[status], className)}>
      {STATUS_LABELS[status]}
    </Badge>
  );
};
