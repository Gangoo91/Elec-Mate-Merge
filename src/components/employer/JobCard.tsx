import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Pill, type Tone } from './editorial';
import { cn } from '@/lib/utils';

export interface AssignedWorker {
  id: string;
  name: string;
  avatar_initials: string;
  photo_url?: string | null;
}

interface JobCardProps {
  title: string;
  client: string;
  location: string;
  status: string;
  progress: number;
  startDate: string;
  endDate: string;
  workersCount: number;
  value?: number | null;
  description?: string | null;
  assignedWorkers?: AssignedWorker[];
  onClick?: () => void;
  className?: string;
}

const statusToneMap: Record<string, Tone> = {
  Active: 'emerald',
  Pending: 'amber',
  Completed: 'cyan',
  'On Hold': 'blue',
  Cancelled: 'red',
};

const progressBarTone: Record<string, string> = {
  Active: 'bg-emerald-400',
  Pending: 'bg-amber-400',
  Completed: 'bg-cyan-400',
  'On Hold': 'bg-blue-400',
  Cancelled: 'bg-red-400',
};

export function JobCard({
  title,
  client,
  location,
  status,
  progress,
  startDate,
  endDate,
  workersCount,
  value,
  description,
  assignedWorkers = [],
  onClick,
  className,
}: JobCardProps) {
  const formatValue = (val: number | null | undefined) => {
    if (!val) return null;
    if (val >= 1000) {
      const kValue = val / 1000;
      return kValue % 1 === 0 ? `£${kValue}k` : `£${kValue.toFixed(1)}k`;
    }
    return `£${val.toLocaleString()}`;
  };

  const displayValue = formatValue(value);
  const hasValidDates = startDate !== '-' && endDate !== '-';
  const tone = statusToneMap[status] ?? 'amber';
  const barClass = progressBarTone[status] ?? 'bg-elec-yellow';

  const Inner = (
    <div className="p-5 space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="text-[14px] font-medium text-white truncate leading-tight">{title}</h3>
          <p className="mt-0.5 text-[11.5px] text-white truncate">{client}</p>
        </div>
        <Pill tone={tone}>{status}</Pill>
      </div>

      <div className="flex items-center justify-between gap-3 text-[12px] text-white">
        <span className="truncate">{location}</span>
        {displayValue && (
          <span className="text-[14px] font-semibold tabular-nums text-elec-yellow shrink-0">
            {displayValue}
          </span>
        )}
      </div>

      {description && (
        <p className="text-[12px] text-white line-clamp-2 leading-relaxed">{description}</p>
      )}

      <div className="pt-4 border-t border-white/[0.06] space-y-2">
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
            Progress
          </span>
          <span className="font-semibold tabular-nums text-white">{progress}%</span>
        </div>
        <div className="relative h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
          <div
            className={cn('h-full rounded-full transition-all duration-300', barClass)}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3 text-[11px] text-white">
        <div className="flex items-center gap-1.5 min-w-0">
          {hasValidDates && (
            <>
              <span className="tabular-nums truncate">{startDate}</span>
              {endDate !== startDate && (
                <>
                  <span>→</span>
                  <span className="tabular-nums truncate">{endDate}</span>
                </>
              )}
            </>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {assignedWorkers.length > 0 ? (
            <>
              <div className="flex -space-x-1.5">
                {assignedWorkers.slice(0, 3).map((worker) => (
                  <Avatar
                    key={worker.id}
                    className="h-6 w-6 border-2 border-[hsl(0_0%_12%)] ring-0"
                  >
                    {worker.photo_url ? (
                      <AvatarImage src={worker.photo_url} alt={worker.name} />
                    ) : null}
                    <AvatarFallback className="text-[8px] bg-white/[0.06] text-white font-medium">
                      {worker.avatar_initials}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
              {workersCount > 3 && (
                <span className="text-[11px] font-medium tabular-nums text-white">
                  +{workersCount - 3}
                </span>
              )}
            </>
          ) : (
            <span className="text-[11px] tabular-nums text-white">{workersCount} crew</span>
          )}
        </div>
      </div>
    </div>
  );

  const base =
    'group block w-full text-left bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden touch-manipulation';

  if (!onClick) {
    return <div className={cn(base, className)}>{Inner}</div>;
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        base,
        'cursor-pointer hover:bg-[hsl(0_0%_15%)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/60',
        className
      )}
    >
      {Inner}
    </button>
  );
}
