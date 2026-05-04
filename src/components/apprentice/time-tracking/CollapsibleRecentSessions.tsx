import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useRealtimeTracking } from '@/hooks/time-tracking/useRealtimeTracking';
import { ChevronDown, MapPin, Calendar, FileText, Plus } from 'lucide-react';
import { format } from 'date-fns';

interface CollapsibleRecentSessionsProps {
  onAddToPortfolio?: (sessionId: string) => void;
}

const CollapsibleRecentSessions = ({ onAddToPortfolio }: CollapsibleRecentSessionsProps) => {
  const { sessions, isLoading } = useRealtimeTracking();
  const [isOpen, setIsOpen] = useState(false);

  // Filter to completed sessions only and limit to last 10
  const completedSessions = sessions
    .filter((session) => !session.is_active && session.duration)
    .slice(0, 10);

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const formatSessionDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy HH:mm');
    } catch {
      return dateString;
    }
  };

  if (isLoading) {
    return (
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
        <div className="animate-pulse space-y-2">
          <div className="h-4 bg-white/[0.04] rounded w-3/4" />
          <div className="h-3 bg-white/[0.04] rounded w-1/2" />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02]">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <button className="w-full p-4 flex items-center justify-between text-left touch-manipulation min-h-[44px]">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Recent training sessions
              </span>
              <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] font-mono">
                {completedSessions.length}
              </span>
            </div>
            <ChevronDown
              className={`h-4 w-4 text-white/55 transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="px-4 pb-4">
            {completedSessions.length === 0 ? (
              <p className="text-[14px] text-white/55 leading-relaxed py-4">
                No completed sessions yet. Start tracking your learning activities to see them here.
              </p>
            ) : (
              <div className="space-y-2">
                {completedSessions.map((session) => (
                  <div
                    key={session.id}
                    className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <h4 className="text-[14px] text-white truncate">
                            {session.activity_type}
                          </h4>
                          <span className="text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] font-mono">
                            {formatDuration(session.duration || 0)}
                          </span>
                        </div>

                        <div className="space-y-1 text-[11px] text-white/55">
                          <div className="flex items-center gap-1 font-mono">
                            <Calendar className="h-3 w-3" />
                            {formatSessionDate(session.start_time)}
                          </div>

                          {session.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {session.location}
                            </div>
                          )}

                          {session.course_slug && (
                            <div className="flex items-center gap-1">
                              <FileText className="h-3 w-3" />
                              {session.course_slug}
                            </div>
                          )}
                        </div>

                        {session.notes && (
                          <p className="text-[12px] text-white/70 mt-2 leading-relaxed">
                            {session.notes}
                          </p>
                        )}
                      </div>

                      {onAddToPortfolio && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onAddToPortfolio(session.id)}
                          className="h-8 w-8 p-0 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}

                {completedSessions.length >= 10 && (
                  <div className="text-center pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
                      onClick={() => {
                        // TODO: navigate to full sessions history view
                      }}
                    >
                      View all sessions
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default CollapsibleRecentSessions;
