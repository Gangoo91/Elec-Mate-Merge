import { useNavigate } from 'react-router-dom';
import { CalendarClock, MapPin, User, AlertTriangle, ChevronRight, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { ExpiryReminder } from '@/types/expiryTypes';
import { differenceInDays, parseISO, format } from 'date-fns';

interface CertExpiryCardProps {
  reminder: ExpiryReminder;
}

const getUrgency = (expiryDate: string): 'overdue' | 'urgent' | 'warning' | 'safe' => {
  const days = differenceInDays(parseISO(expiryDate), new Date());
  if (days < 0) return 'overdue';
  if (days <= 14) return 'urgent';
  if (days <= 30) return 'warning';
  return 'safe';
};

const urgencyStyles = {
  overdue: {
    card: 'border-red-500/40 bg-gradient-to-br from-card to-red-500/10',
    banner: 'bg-red-500/20 text-red-400',
    countdown: 'bg-red-500/20 text-red-400',
    icon: 'text-red-400',
    badge: 'bg-red-500/15 text-red-400 border-red-500/30',
  },
  urgent: {
    card: 'border-orange-500/40 bg-gradient-to-br from-card to-orange-500/10',
    banner: 'bg-orange-500/20 text-orange-400',
    countdown: 'bg-orange-500/20 text-orange-400',
    icon: 'text-orange-400',
    badge: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
  },
  warning: {
    card: 'border-amber-500/30 bg-gradient-to-br from-card to-amber-500/5',
    banner: '',
    countdown: 'bg-amber-500/15 text-amber-400',
    icon: 'text-amber-400',
    badge: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  },
  safe: {
    card: 'border-blue-500/20 bg-gradient-to-br from-card to-blue-500/5',
    banner: '',
    countdown: 'bg-blue-500/15 text-blue-400',
    icon: 'text-blue-400',
    badge: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  },
};

const statusLabel: Record<string, string> = {
  pending: 'Not contacted',
  viewed: 'Viewed',
  contacted: 'Contacted',
  booked: 'Booked',
  completed: 'Done',
};

export const CertExpiryCard = ({ reminder }: CertExpiryCardProps) => {
  const navigate = useNavigate();
  const urgency = getUrgency(reminder.expiry_date);
  const styles = urgencyStyles[urgency];
  const daysLeft = differenceInDays(parseISO(reminder.expiry_date), new Date());
  const formattedExpiry = format(parseISO(reminder.expiry_date), 'd MMM yyyy');

  const countdownLabel =
    daysLeft < 0
      ? `Overdue by ${Math.abs(daysLeft)} day${Math.abs(daysLeft) !== 1 ? 's' : ''}`
      : daysLeft === 0
        ? 'Due today!'
        : `${daysLeft} day${daysLeft !== 1 ? 's' : ''} left`;

  return (
    <Card
      className={cn(
        'overflow-hidden shadow-md transition-all cursor-pointer active:scale-[0.99]',
        styles.card
      )}
      onClick={() => navigate('/electrician-tools/certificate-expiry')}
    >
      {/* Urgency banner — only for overdue / urgent */}
      {(urgency === 'overdue' || urgency === 'urgent') && (
        <div className={cn('px-4 py-2 flex items-center gap-2', styles.banner)}>
          <AlertTriangle
            className={cn('w-3.5 h-3.5', styles.icon, urgency === 'overdue' && 'animate-pulse')}
          />
          <span className="text-xs font-bold uppercase tracking-wide">
            {urgency === 'overdue' ? 'EICR Overdue — Action Required' : 'Re-Inspection Due Soon'}
          </span>
        </div>
      )}

      <div className="p-4 space-y-3">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            {/* Icon */}
            <div
              className={cn(
                'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
                urgency === 'overdue'
                  ? 'bg-red-500/15'
                  : urgency === 'urgent'
                    ? 'bg-orange-500/15'
                    : urgency === 'warning'
                      ? 'bg-amber-500/15'
                      : 'bg-blue-500/15'
              )}
            >
              <CalendarClock className={cn('w-5 h-5', styles.icon)} />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-sm text-foreground">Re-Inspection Due</span>
                <Badge
                  variant="outline"
                  className={cn('text-[10px] px-1.5 py-0', styles.badge)}
                >
                  {statusLabel[reminder.reminder_status] ?? reminder.reminder_status}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                {reminder.certificate_number}
              </p>
            </div>
          </div>

          <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
        </div>

        {/* Client & address */}
        <div className="rounded-xl bg-card/50 border border-border/30 px-3 py-2.5 space-y-1.5">
          {reminder.client_name && (
            <div className="flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              <span className="text-sm font-medium text-foreground truncate">
                {reminder.client_name}
              </span>
            </div>
          )}
          {reminder.installation_address && (
            <div className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <span className="text-xs text-muted-foreground leading-tight truncate">
                {reminder.installation_address}
              </span>
            </div>
          )}
        </div>

        {/* Countdown chip */}
        <div
          className={cn(
            'rounded-xl px-4 py-3 flex items-center justify-between',
            styles.countdown
          )}
        >
          <div className="flex items-center gap-2.5">
            <Clock className={cn('w-4 h-4', styles.icon)} />
            <div>
              <p className="text-[10px] font-medium opacity-70">
                {daysLeft < 0 ? 'Expired' : 'Expires'}
              </p>
              <p className="text-sm font-semibold">{formattedExpiry}</p>
            </div>
          </div>
          <div className="text-right">
            <span className={cn('text-xl font-bold tabular-nums', styles.icon)}>
              {Math.abs(daysLeft)}
            </span>
            <span className="text-[10px] block opacity-70">
              {daysLeft < 0 ? 'days late' : 'days'}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};
