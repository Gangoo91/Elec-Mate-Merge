import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, Calendar, AlertCircle, Package } from "lucide-react";
import { format, addDays } from "date-fns";

interface PhaseCardProps {
  phase: any;
  phaseNumber: number;
  startDate: string;
  onViewDetails: () => void;
  isActive?: boolean;
}

export const PhaseCard = ({ phase, phaseNumber, startDate, onViewDetails, isActive }: PhaseCardProps) => {
  const baseDate = new Date(startDate);
  const phaseStartDay = phase.startDay ? parseInt(phase.startDay.replace('Day ', '')) - 1 : (phaseNumber - 1) * 3;
  const phaseStart = addDays(baseDate, phaseStartDay);
  const phaseEnd = addDays(phaseStart, phase.duration || 1);
  
  const isCritical = phase.criticalPath || false;
  const taskCount = phase.tasks?.length || 0;
  const phaseName = phase.phaseName || phase.phase || `Phase ${phaseNumber}`;

  return (
    <Card className={`relative transition-all duration-300 touch-manipulation ${
      isActive 
        ? 'ring-2 ring-elec-yellow shadow-xl scale-[1.02]' 
        : 'hover:shadow-lg hover:scale-[1.01]'
    } ${isCritical ? 'border-pink-500/40 bg-pink-500/5' : 'border-border'}`}>
      <div className="p-4 sm:p-5 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Phase Number Badge */}
            <div className={`flex items-center justify-center w-12 h-12 sm:w-10 sm:h-10 rounded-full text-base sm:text-sm font-bold shadow-lg ${
              isCritical 
                ? 'bg-gradient-to-br from-pink-500 to-pink-600 text-foreground' 
                : 'bg-gradient-to-br from-elec-yellow to-yellow-400 text-gray-900'
            }`}>
              {phaseNumber}
            </div>
            
            <div>
              <h3 className={`font-bold text-base sm:text-lg leading-tight ${
                isCritical ? 'text-pink-400' : 'text-foreground'
              }`}>
                {phaseName}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs px-2 py-0.5">
                  {phase.duration || 1} {phase.durationUnit || 'days'}
                </Badge>
                {isCritical && (
                  <Badge variant="outline" className="bg-pink-500/20 text-pink-400 border-pink-500/40 text-xs px-2 py-0.5">
                    Critical Path
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Dates */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{format(phaseStart, 'dd MMM yyyy')} → {format(phaseEnd, 'dd MMM yyyy')}</span>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
            <Package className="h-4 w-4 text-elec-yellow" />
            <div>
              <div className="text-xs text-muted-foreground">Tasks</div>
              <div className="text-sm font-semibold">{taskCount}</div>
            </div>
          </div>
          {phase.materials && (
            <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
              <AlertCircle className="h-4 w-4 text-amber-400" />
              <div>
                <div className="text-xs text-muted-foreground">Materials</div>
                <div className="text-sm font-semibold">{phase.materials.length || 0}</div>
              </div>
            </div>
          )}
        </div>

        {/* Tasks Preview */}
        {taskCount > 0 && (
          <div className="space-y-1">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Key Tasks
            </div>
            <div className="space-y-1">
              {phase.tasks.slice(0, 3).map((task: any, idx: number) => {
                const taskText = typeof task === 'string' ? task : task.task || task.name || '';
                return (
                  <div key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-elec-yellow mt-1">•</span>
                    <span className="flex-1 line-clamp-1">{taskText}</span>
                  </div>
                );
              })}
              {taskCount > 3 && (
                <div className="text-xs text-muted-foreground italic">
                  +{taskCount - 3} more tasks...
                </div>
              )}
            </div>
          </div>
        )}

        {/* View Details Button */}
        <Button
          onClick={onViewDetails}
          className="w-full touch-manipulation bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 font-semibold h-11"
        >
          View Phase Details
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};
