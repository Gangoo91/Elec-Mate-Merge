import { Badge } from '@/components/ui/badge';
import { NotificationStatus } from '@/hooks/useNotifications';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: NotificationStatus;
  className?: string;
}

const STATUS_STYLES = {
  pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  'in-progress': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  submitted: 'bg-green-500/10 text-green-400 border-green-500/20',
  overdue: 'bg-red-500/10 text-red-400 border-red-500/20 animate-pulse',
  cancelled: 'bg-neutral-500/10 text-neutral-400 border-neutral-500/20',
};

const STATUS_LABELS = {
  pending: 'Pending',
  'in-progress': 'In Progress',
  submitted: 'Submitted',
  overdue: 'Overdue',
  cancelled: 'Cancelled',
};

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  return (
    <Badge
      variant="outline"
      className={cn(STATUS_STYLES[status], className)}
    >
      {STATUS_LABELS[status]}
    </Badge>
  );
};
