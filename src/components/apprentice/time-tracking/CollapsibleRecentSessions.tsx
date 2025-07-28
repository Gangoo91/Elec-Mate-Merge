import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { useRealtimeTracking } from "@/hooks/time-tracking/useRealtimeTracking";
import { 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  MapPin, 
  Calendar,
  FileText,
  Plus
} from "lucide-react";
import { format } from "date-fns";

interface CollapsibleRecentSessionsProps {
  onAddToPortfolio?: (sessionId: string) => void;
}

const CollapsibleRecentSessions = ({ onAddToPortfolio }: CollapsibleRecentSessionsProps) => {
  const { sessions, isLoading } = useRealtimeTracking();
  const [isOpen, setIsOpen] = useState(false);

  // Filter to completed sessions only and limit to last 10
  const completedSessions = sessions
    .filter(session => !session.is_active && session.duration)
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
      <Card className="bg-elec-gray border-elec-yellow/20">
        <CardContent className="p-4">
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-elec-yellow/20 rounded w-3/4" />
            <div className="h-3 bg-elec-yellow/20 rounded w-1/2" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-elec-gray border-elec-yellow/20">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="pb-3 cursor-pointer hover:bg-elec-yellow/5 transition-colors">
            <CardTitle className="text-elec-light flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-elec-yellow" />
                Recent Training Sessions
                <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
                  {completedSessions.length}
                </Badge>
              </div>
              {isOpen ? (
                <ChevronUp className="h-4 w-4 text-elec-light/70" />
              ) : (
                <ChevronDown className="h-4 w-4 text-elec-light/70" />
              )}
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="pt-0">
            {completedSessions.length === 0 ? (
              <div className="text-center py-6">
                <Clock className="h-8 w-8 text-elec-light/30 mx-auto mb-2" />
                <p className="text-elec-light/70 text-sm">No completed sessions yet</p>
                <p className="text-elec-light/50 text-xs mt-1">
                  Start tracking your learning activities to see them here
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {completedSessions.map((session) => (
                  <div
                    key={session.id}
                    className="bg-elec-dark/30 rounded-lg p-3 border border-elec-yellow/10 hover:border-elec-yellow/20 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium text-elec-light text-sm truncate">
                            {session.activity_type}
                          </h4>
                          <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow text-xs">
                            {formatDuration(session.duration || 0)}
                          </Badge>
                        </div>
                        
                        <div className="space-y-1 text-xs text-elec-light/60">
                          <div className="flex items-center gap-1">
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
                          <p className="text-xs text-elec-light/70 mt-2 bg-elec-dark/50 rounded p-2">
                            {session.notes}
                          </p>
                        )}
                      </div>
                      
                      {onAddToPortfolio && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onAddToPortfolio(session.id)}
                          className="ml-2 h-8 w-8 p-0 border-elec-yellow/30 hover:bg-elec-yellow/10"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                
                {completedSessions.length >= 10 && (
                  <div className="text-center">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => {
                        // This could navigate to a full sessions history view
                        console.log('View all sessions');
                      }}
                    >
                      View All Sessions
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default CollapsibleRecentSessions;