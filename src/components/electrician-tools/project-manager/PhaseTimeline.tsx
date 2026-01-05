import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ChevronDown } from "lucide-react";
import { addDays, format } from "date-fns";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface Phase {
  phase: string;
  phaseName?: string;
  phaseNumber?: number;
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
        isCritical: phase.criticalPath || criticalPath.some(cp => 
          (phase.phaseName || phase.phase || '').toString().includes(cp)
        )
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
        {/* Day ruler - visible on all screens */}
        <div className="flex justify-between text-xs text-foreground/60 mb-2 px-1 overflow-x-auto">
          {Array.from({ length: Math.ceil(maxDay / 5) + 1 }).map((_, i) => (
            <div key={i} className="flex-shrink-0">Day {i * 5}</div>
          ))}
        </div>

        {timelineData.map((phase, idx) => {
          const isExpanded = expandedPhases[idx];
          const progress = (phase.actualStartDay / maxDay) * 100;
          const width = (phase.duration / maxDay) * 100;
          
          return (
            <div key={idx} className="space-y-3">
              {/* Phase header - redesigned */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  {/* Phase number badge */}
                  <div className={`flex items-center justify-center w-10 h-10 sm:w-8 sm:h-8 rounded-full text-sm sm:text-xs font-bold shadow-lg ${
                    phase.isCritical 
                      ? 'bg-gradient-to-br from-pink-500 to-pink-600 text-foreground' 
                      : 'bg-gradient-to-br from-elec-yellow to-yellow-400 text-gray-900'
                  }`}>
                    {idx + 1}
                  </div>
                  <span className={`font-semibold text-base sm:text-sm ${
                    phase.isCritical ? 'text-pink-400' : 'text-foreground'
                  }`}>
                    {phase.phaseName || phase.phase || `Phase ${idx + 1}`}
                  </span>
                  {phase.isCritical && (
                    <Badge variant="outline" className="px-2 py-1 bg-pink-400/20 text-pink-400 border-pink-400/40 text-xs sm:text-[10px] font-medium">
                      Critical
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-3 text-sm text-foreground/80">
                  <span className="font-semibold text-base sm:text-sm">{phase.duration}{phase.durationUnit?.[0] || 'd'}</span>
                  <span className="hidden sm:inline text-xs">
                    {format(phase.startDate, 'dd MMM')} → {format(phase.endDate, 'dd MMM')}
                  </span>
                </div>
              </div>

              {/* Timeline bar - ENHANCED */}
              <div className="relative h-20 sm:h-14 bg-muted/20 rounded-lg overflow-hidden border border-border/30">
                <div 
                  className={`absolute h-full ${
                    phase.isCritical 
                      ? 'bg-gradient-to-r from-pink-500 via-pink-400 to-pink-500' 
                      : 'bg-gradient-to-r from-elec-yellow via-yellow-400 to-elec-yellow'
                  } rounded-lg transition-all duration-300 flex items-center justify-between px-4 shadow-lg`}
                  style={{ 
                    left: `${progress}%`,
                    width: `${width}%`
                  }}
                >
                  {/* Phase info inside bar */}
                  <span className="text-sm sm:text-xs font-bold text-gray-900 truncate flex-1">
                    {(phase.phaseName || phase.phase || '').toString().split(' ').slice(0, 3).join(' ')}
                  </span>
                  
                  <div className="flex items-center gap-2 ml-2">
                    {/* Duration badge */}
                    <span className="px-2 py-1 bg-gray-900/20 rounded text-xs sm:text-[10px] font-bold text-gray-900 whitespace-nowrap">
                      {phase.duration}d
                    </span>
                    
                    {/* Task count badge */}
                    {phase.tasks && phase.tasks.length > 0 && (
                      <span className="px-2 py-1 bg-gray-900/20 rounded text-xs sm:text-[10px] font-bold text-gray-900 whitespace-nowrap">
                        {phase.tasks.length}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Progress percentage indicator */}
                <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-foreground/60 font-medium">
                  {Math.round(progress + width)}%
                </div>
              </div>

              {/* Task breakdown - expandable */}
              {phase.tasks && phase.tasks.length > 0 && (
                <Collapsible
                  open={isExpanded}
                  onOpenChange={(open) => setExpandedPhases(prev => ({ ...prev, [idx]: open }))}
                >
                  <CollapsibleTrigger className="w-full text-xs sm:text-sm text-pink-400 hover:text-pink-300 transition-colors flex items-center gap-2 justify-center touch-manipulation min-h-[48px] sm:min-h-[44px] rounded-lg hover:bg-pink-400/10">
                    <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    {isExpanded ? 'Hide tasks' : `View ${phase.tasks.length} tasks`}
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2 space-y-1">
                    {phase.tasks.slice(0, 5).map((task, taskIdx) => {
                      const taskText = typeof task === 'string' ? task : task.task || task.name || '';
                      return (
                        <div key={taskIdx} className="text-xs sm:text-sm text-foreground/80 pl-4 border-l-2 border-pink-400/30 py-1 leading-relaxed">
                          • {taskText}
                        </div>
                      );
                    })}
                    {phase.tasks.length > 5 && (
                      <div className="text-xs text-foreground/60 pl-4 italic">
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
        <div className="flex items-center gap-4 pt-3 border-t border-border/30 text-xs text-foreground/80">
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
