import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ChevronDown } from "lucide-react";
import { addDays, format } from "date-fns";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface Phase {
  phase: string;
  duration: number;
  durationUnit?: string;
  startDay?: string;
  criticalPath?: boolean;
  tasks?: Array<string | { task?: string; name?: string; duration?: string }>;
}

interface PhaseTimelineProps {
  phases: Phase[];
  startDate?: string;
  criticalPath?: string[];
}

const PhaseTimeline = ({ phases, startDate, criticalPath = [] }: PhaseTimelineProps) => {
  const [expandedPhases, setExpandedPhases] = useState<Record<number, boolean>>({});

  if (!phases || phases.length === 0) return null;

  const timelineData = useMemo(() => {
    const baseDate = startDate ? new Date(startDate) : new Date();
    let currentDay = 0;
    
    return phases.map((phase, idx) => {
      const phaseStartDay = phase.startDay ? parseInt(phase.startDay.replace('Day ', '')) - 1 : currentDay;
      const phaseDuration = phase.duration || 1;
      const phaseStart = addDays(baseDate, phaseStartDay);
      const phaseEnd = addDays(phaseStart, phaseDuration);
      
      currentDay = phaseStartDay + phaseDuration;
      
      return {
        ...phase,
        actualStartDay: phaseStartDay,
        startDate: phaseStart,
        endDate: phaseEnd,
        isCritical: phase.criticalPath || criticalPath.some(cp => phase.phase.includes(cp))
      };
    });
  }, [phases, startDate, criticalPath]);

  const maxDay = Math.max(...timelineData.map(p => p.actualStartDay + p.duration));

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Calendar className="h-5 w-5 text-pink-400" />
          Project Timeline
          <div className="text-xs text-muted-foreground font-normal ml-auto">
            Total: {maxDay} days
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-3">
        {/* Day ruler - visible on larger screens */}
        <div className="hidden sm:flex justify-between text-xs text-muted-foreground mb-2 px-1">
          {Array.from({ length: Math.ceil(maxDay / 5) + 1 }).map((_, i) => (
            <div key={i}>Day {i * 5}</div>
          ))}
        </div>

        {timelineData.map((phase, idx) => {
          const isExpanded = expandedPhases[idx];
          const progress = (phase.actualStartDay / maxDay) * 100;
          const width = (phase.duration / maxDay) * 100;
          
          return (
            <div key={idx} className="space-y-2">
              {/* Phase Header - Stack on mobile */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-base sm:text-sm">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`font-medium ${phase.isCritical ? 'text-pink-400' : 'text-gray-100'}`}>
                    {phase.phase}
                  </span>
                  {phase.isCritical && (
                    <Badge variant="outline" className="text-xs bg-pink-400/20 border-pink-400/40">
                      Critical
                    </Badge>
                  )}
                  <span className="text-sm text-gray-400">
                    ({phase.duration} {phase.durationUnit || 'days'})
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {format(phase.startDate, 'dd MMM')} → {format(phase.endDate, 'dd MMM')}
                </div>
              </div>

              {/* Timeline bar - TALLER on mobile, info inside */}
              <div className="relative h-16 sm:h-12 bg-muted/30 rounded-lg overflow-hidden">
                <div 
                  className={`absolute h-full ${
                    phase.isCritical 
                      ? 'bg-gradient-to-r from-pink-400 to-pink-500' 
                      : 'bg-gradient-to-r from-elec-yellow to-elec-yellow/80'
                  } rounded-lg transition-all duration-300 flex items-center px-3 sm:px-4`}
                  style={{ 
                    left: `${progress}%`,
                    width: `${width}%`
                  }}
                >
                  {/* Show info INSIDE the bar */}
                  <div className="flex items-center justify-between w-full text-xs sm:text-[11px] font-medium text-gray-900">
                    <span className="truncate flex-1">{phase.phase.substring(0, 30)}</span>
                    <span className="ml-2 whitespace-nowrap">{phase.duration}{phase.durationUnit?.[0] || 'd'}</span>
                  </div>
                </div>
              </div>

              {/* Task breakdown - expandable */}
              {phase.tasks && phase.tasks.length > 0 && (
                <Collapsible
                  open={isExpanded}
                  onOpenChange={(open) => setExpandedPhases(prev => ({ ...prev, [idx]: open }))}
                >
                  <CollapsibleTrigger className="text-xs sm:text-sm text-pink-400 hover:text-pink-500 mt-2 flex items-center gap-1 touch-manipulation min-h-[44px] sm:min-h-0">
                    <ChevronDown className={`h-3 w-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    View {phase.tasks.length} task{phase.tasks.length !== 1 ? 's' : ''}
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2 space-y-1">
                    {phase.tasks.slice(0, 5).map((task, taskIdx) => {
                      const taskText = typeof task === 'string' ? task : task.task || task.name || '';
                      return (
                        <div key={taskIdx} className="text-xs sm:text-sm text-gray-400 pl-4 border-l-2 border-pink-400/30 py-1 leading-relaxed">
                          • {taskText}
                        </div>
                      );
                    })}
                    {phase.tasks.length > 5 && (
                      <div className="text-xs text-muted-foreground pl-4 italic">
                        +{phase.tasks.length - 5} more tasks...
                      </div>
                    )}
                  </CollapsibleContent>
                </Collapsible>
              )}
            </div>
          );
        })}

        {/* Legend */}
        <div className="flex items-center gap-4 pt-3 border-t border-border/30 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-r from-pink-400 to-pink-500" />
            <span>Critical Path</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-gradient-to-r from-elec-yellow to-elec-yellow/80" />
            <span>Standard Phase</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PhaseTimeline;
