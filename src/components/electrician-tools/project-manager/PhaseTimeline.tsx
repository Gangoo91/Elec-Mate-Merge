import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ArrowRight } from "lucide-react";
import { addDays, format } from "date-fns";
import { useMemo } from "react";

interface Phase {
  phase: string;
  duration: number;
  durationUnit?: string;
  startDay?: string;
  criticalPath?: boolean;
  tasks?: Array<string | { task?: string; name?: string }>;
}

interface PhaseTimelineProps {
  phases: Phase[];
  startDate?: string;
  criticalPath?: string[];
}

const PhaseTimeline = ({ phases, startDate, criticalPath = [] }: PhaseTimelineProps) => {
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
      <CardContent>
        {/* Mobile-optimized timeline */}
        <div className="space-y-3">
          {timelineData.map((phase, idx) => {
            const progress = (phase.actualStartDay / maxDay) * 100;
            const width = (phase.duration / maxDay) * 100;
            
            return (
              <div key={idx} className="relative">
                {/* Phase header */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div className={`font-semibold text-sm ${phase.isCritical ? 'text-pink-400' : ''}`}>
                        {phase.phase}
                      </div>
                      {phase.isCritical && (
                        <ArrowRight className="h-3 w-3 text-pink-400" />
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {format(phase.startDate, 'EEE d MMM')} - {format(phase.endDate, 'EEE d MMM')}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground whitespace-nowrap">
                    {phase.duration} {phase.durationUnit || 'days'}
                  </div>
                </div>
                
                {/* Timeline bar */}
                <div className="relative h-8 bg-muted/30 rounded-lg overflow-hidden">
                  <div 
                    className={`absolute h-full ${
                      phase.isCritical 
                        ? 'bg-gradient-to-r from-pink-400 to-pink-500' 
                        : 'bg-gradient-to-r from-elec-yellow to-elec-yellow/80'
                    } rounded-lg transition-all duration-300`}
                    style={{ 
                      left: `${progress}%`,
                      width: `${width}%`
                    }}
                  >
                    <div className="absolute inset-0 bg-white/10 animate-pulse" />
                  </div>
                  
                  {/* Task count indicator */}
                  {phase.tasks && phase.tasks.length > 0 && (
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-white/80 font-medium z-10">
                      {phase.tasks.length} tasks
                    </div>
                  )}
                </div>
                
                {/* Day markers */}
                <div className="flex justify-between text-xs text-muted-foreground mt-1 px-1">
                  <span>Day {phase.actualStartDay + 1}</span>
                  <span>Day {phase.actualStartDay + phase.duration}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-6 pt-4 border-t border-border/40 flex-wrap">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-6 h-3 bg-gradient-to-r from-pink-400 to-pink-500 rounded" />
            <span className="text-muted-foreground">Critical Path</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-6 h-3 bg-gradient-to-r from-elec-yellow to-elec-yellow/80 rounded" />
            <span className="text-muted-foreground">Standard Phase</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PhaseTimeline;
