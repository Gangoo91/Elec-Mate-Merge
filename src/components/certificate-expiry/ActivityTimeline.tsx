import { StatusHistoryEntry } from '@/types/expiryTypes';
import { format, parseISO } from 'date-fns';
import { Clock, AlertCircle, CheckCircle2, Calendar, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ActivityTimelineProps {
  history: StatusHistoryEntry[];
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'pending':
      return <Clock className="h-4 w-4 text-muted-foreground" />;
    case 'contacted':
      return <AlertCircle className="h-4 w-4 text-blue-500" />;
    case 'booked':
      return <Calendar className="h-4 w-4 text-amber-500" />;
    case 'completed':
      return <CheckCircle2 className="h-4 w-4 text-success" />;
    case 'cancelled':
      return <XCircle className="h-4 w-4 text-destructive" />;
    default:
      return <Clock className="h-4 w-4 text-muted-foreground" />;
  }
};

const getStatusLabel = (status: string): string => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};

export const ActivityTimeline = ({ history }: ActivityTimelineProps) => {
  if (!history || history.length === 0) {
    return (
      <div className="text-sm text-muted-foreground py-2">
        No status changes yet
      </div>
    );
  }

  // Sort by most recent first
  const sortedHistory = [...history].sort((a, b) => 
    new Date(b.changed_at).getTime() - new Date(a.changed_at).getTime()
  );

  return (
    <div className="space-y-3">
      {sortedHistory.map((entry, index) => (
        <div key={index} className="flex items-start gap-3 text-sm">
          <div className="mt-0.5">
            {getStatusIcon(entry.to)}
          </div>
          <div className="flex-1 space-y-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-muted-foreground text-xs sm:text-sm">Changed to</span>
              <Badge variant="outline" className="font-medium break-words">
                {getStatusLabel(entry.to)}
              </Badge>
              {entry.from && (
                <>
                  <span className="text-muted-foreground text-xs sm:text-sm">from</span>
                  <Badge variant="outline" className="opacity-60 break-words">
                    {getStatusLabel(entry.from)}
                  </Badge>
                </>
              )}
            </div>
            <p className="text-xs text-muted-foreground break-words">
              {format(parseISO(entry.changed_at), "dd MMM yyyy 'at' HH:mm")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
