import { Badge } from '@/components/ui/badge';
import { Calendar, AlertCircle, Clock, CheckCircle } from 'lucide-react';
import { differenceInDays, isPast, isToday, format } from 'date-fns';
import { cn } from '@/lib/utils';

interface DueDateBadgeProps {
  endDate: string | null;
  isCompleted?: boolean;
  className?: string;
}

export function DueDateBadge({ endDate, isCompleted, className }: DueDateBadgeProps) {
  if (!endDate) return null;

  const date = new Date(endDate);
  const today = new Date();
  const daysUntilDue = differenceInDays(date, today);

  // Completed on time or completed in general
  if (isCompleted) {
    return (
      <Badge
        variant="outline"
        className={cn('gap-1 text-xs bg-green-500/10 text-green-400 border-green-500/30', className)}
      >
        <CheckCircle className="h-3 w-3" />
        Done
      </Badge>
    );
  }

  // Overdue
  if (isPast(date) && !isToday(date)) {
    return (
      <Badge
        variant="outline"
        className={cn(
          'gap-1 text-xs bg-red-500/10 text-red-400 border-red-500/30',
          className
        )}
      >
        <AlertCircle className="h-3 w-3" />
        Overdue
      </Badge>
    );
  }

  // Due today
  if (isToday(date)) {
    return (
      <Badge
        variant="outline"
        className={cn(
          'gap-1 text-xs bg-red-500/10 text-red-400 border-red-500/30',
          className
        )}
      >
        <Clock className="h-3 w-3" />
        Due Today
      </Badge>
    );
  }

  // Due within 3 days
  if (daysUntilDue <= 3) {
    return (
      <Badge
        variant="outline"
        className={cn('gap-1 text-xs bg-amber-500/10 text-amber-400 border-amber-500/30', className)}
      >
        <Calendar className="h-3 w-3" />
        {daysUntilDue === 1 ? 'Tomorrow' : `${daysUntilDue} days`}
      </Badge>
    );
  }

  // Due later (show date)
  return (
    <Badge
      variant="outline"
      className={cn('gap-1 text-xs bg-white/[0.06] text-white border-white/[0.1]', className)}
    >
      <Calendar className="h-3 w-3" />
      {format(date, 'd MMM')}
    </Badge>
  );
}
