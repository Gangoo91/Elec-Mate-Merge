import { format, parseISO } from 'date-fns';
import { Wrench, FlaskConical, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { EquipmentAlert } from '@/hooks/useSafetyEquipmentAlerts';

interface SafetyEquipmentCardProps {
  alert: EquipmentAlert;
  onNavigate?: () => void;
}

const urgencyConfig = {
  overdue: {
    border: 'border-red-500/40',
    bg: 'bg-red-500/10',
    badge: 'bg-red-500/20 text-red-400',
    chip: 'bg-red-500/20 text-red-400',
    pulse: true,
  },
  urgent: {
    border: 'border-orange-500/40',
    bg: 'bg-orange-500/10',
    badge: 'bg-orange-500/20 text-orange-400',
    chip: 'bg-orange-500/20 text-orange-400',
    pulse: true,
  },
  warning: {
    border: 'border-amber-500/40',
    bg: 'bg-amber-500/10',
    badge: 'bg-amber-500/20 text-amber-400',
    chip: 'bg-amber-500/20 text-amber-400',
    pulse: false,
  },
};

function countdown(days: number): string {
  if (days < 0) return `${Math.abs(days)}d overdue`;
  if (days === 0) return 'Due today';
  if (days === 1) return '1 day left';
  return `${days} days left`;
}

export function SafetyEquipmentCard({ alert, onNavigate }: SafetyEquipmentCardProps) {
  const config = urgencyConfig[alert.urgency];
  const Icon = alert.alertType === 'calibration' ? FlaskConical : Wrench;
  const typeLabel = alert.alertType === 'calibration' ? 'Calibration' : 'Inspection';

  return (
    <button
      onClick={onNavigate}
      className={cn(
        'w-full text-left rounded-2xl border p-4 transition-all active:scale-[0.98]',
        config.border,
        config.bg
      )}
    >
      {config.pulse && (
        <div
          className={cn(
            'text-xs font-semibold px-3 py-1 rounded-t-xl -mx-4 -mt-4 mb-3 text-center animate-pulse',
            alert.urgency === 'overdue'
              ? 'bg-red-500/30 text-red-300'
              : 'bg-orange-500/30 text-orange-300'
          )}
        >
          {alert.urgency === 'overdue' ? '⚠️ Overdue — equipment may be non-compliant' : '⏰ Due soon'}
        </div>
      )}

      <div className="flex items-start gap-3">
        <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0', config.badge)}>
          <Icon className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            <span className="text-sm font-semibold text-foreground truncate">{alert.name}</span>
            <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium', config.badge)}>
              {typeLabel}
            </span>
            {alert.category && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-muted/40 text-muted-foreground">
                {alert.category}
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            {alert.daysUntilDue < 0
              ? `${typeLabel} overdue since ${format(parseISO(alert.dueDate), 'dd MMM yyyy')}`
              : `${typeLabel} due ${format(parseISO(alert.dueDate), 'dd MMM yyyy')}`}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <span className={cn('text-xs font-bold px-2 py-1 rounded-full', config.chip)}>
            {countdown(alert.daysUntilDue)}
          </span>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
    </button>
  );
}
