import { format, parseISO } from 'date-fns';
import { CheckSquare, MapPin, Clock, ChevronRight, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { OverdueTask, JobDueAlert } from '@/hooks/useTaskAlerts';

interface OverdueTasksCardProps {
  tasks: OverdueTask[];
  onNavigate?: () => void;
}

interface JobDueCardProps {
  job: JobDueAlert;
  onNavigate?: () => void;
}

const priorityColour: Record<string, string> = {
  urgent: 'text-red-400',
  high: 'text-orange-400',
  normal: 'text-amber-400',
  low: 'text-muted-foreground',
};

export function OverdueTasksCard({ tasks, onNavigate }: OverdueTasksCardProps) {
  const hasUrgent = tasks.some((t) => t.priority === 'urgent' || t.priority === 'high');
  const preview = tasks.slice(0, 3);
  const remaining = tasks.length - preview.length;

  return (
    <button
      onClick={onNavigate}
      className={cn(
        'w-full text-left rounded-2xl border p-4 transition-all active:scale-[0.98]',
        hasUrgent ? 'border-red-500/40 bg-red-500/10' : 'border-orange-500/40 bg-orange-500/10'
      )}
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className={cn(
            'w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0',
            hasUrgent ? 'bg-red-500/20 text-red-400' : 'bg-orange-500/20 text-orange-400'
          )}
        >
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-foreground">
            {tasks.length} overdue {tasks.length === 1 ? 'task' : 'tasks'}
          </p>
        </div>
        <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
      </div>

      <div className="space-y-2">
        {preview.map((task) => (
          <div key={task.id} className="flex items-center gap-2 pl-1">
            <CheckSquare className={cn('w-3.5 h-3.5 flex-shrink-0', priorityColour[task.priority] || 'text-muted-foreground')} />
            <span className="text-xs text-foreground truncate flex-1">{task.title}</span>
            <span className="text-xs text-muted-foreground flex-shrink-0 ml-1">
              {task.daysOverdue === 0 ? 'today' : `${task.daysOverdue}d ago`}
            </span>
          </div>
        ))}
        {remaining > 0 && (
          <p className="text-xs text-muted-foreground pl-1">+{remaining} more</p>
        )}
      </div>
    </button>
  );
}

export function JobDueCard({ job, onNavigate }: JobDueCardProps) {
  const timeStr = format(parseISO(job.startAt), 'HH:mm');
  const label = job.isToday ? 'Today' : 'Tomorrow';

  return (
    <button
      onClick={onNavigate}
      className={cn(
        'w-full text-left rounded-2xl border p-4 transition-all active:scale-[0.98]',
        job.isToday
          ? 'border-primary/40 bg-primary/10'
          : 'border-blue-500/40 bg-blue-500/10'
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            'w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0',
            job.isToday ? 'bg-primary/20 text-primary' : 'bg-blue-500/20 text-blue-400'
          )}
        >
          <Clock className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-sm font-semibold text-foreground truncate">{job.title}</span>
            <span
              className={cn(
                'text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0',
                job.isToday
                  ? 'bg-primary/20 text-primary'
                  : 'bg-blue-500/20 text-blue-400'
              )}
            >
              {label}
            </span>
          </div>
          {job.location && (
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-muted-foreground flex-shrink-0" />
              <p className="text-xs text-muted-foreground truncate">{job.location}</p>
            </div>
          )}
        </div>

        <span
          className={cn(
            'text-sm font-bold flex-shrink-0',
            job.isToday ? 'text-primary' : 'text-blue-400'
          )}
        >
          {timeStr}
        </span>
      </div>
    </button>
  );
}
