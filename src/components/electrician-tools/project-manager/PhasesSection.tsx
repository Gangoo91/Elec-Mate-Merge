import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { addDays, format } from "date-fns";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface Phase {
  phase: string;
  duration: number;
  durationUnit?: string;
  startDay?: string;
  description?: string;
  tasks?: Array<string | { task?: string; name?: string; duration?: string }>;
  dependencies?: string[];
  milestones?: string[];
  criticalPath?: boolean;
  practicalNotes?: string;
}

interface PhasesSectionProps {
  phases: Phase[];
  totalDuration?: number;
  totalDurationUnit?: string;
  phaseProgress: Record<string, boolean>;
  onTogglePhase: (phaseId: string) => void;
  startDate?: string;
}

const PhasesSection = ({
  phases,
  totalDuration,
  totalDurationUnit,
  phaseProgress,
  onTogglePhase,
  startDate
}: PhasesSectionProps) => {
  const [openPhases, setOpenPhases] = useState<Record<number, boolean>>({});

  if (!phases || phases.length === 0) return null;

  const calculateDate = (dayString?: string) => {
    if (!startDate || !dayString) return null;
    const dayNum = parseInt(dayString.replace('Day ', '')) - 1;
    return format(addDays(new Date(startDate), dayNum), 'EEE d MMM');
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Calendar className="h-5 w-5 text-pink-400" />
          Project Phases
          {totalDuration && (
            <span className="text-sm text-muted-foreground font-normal ml-auto">
              {totalDuration} {totalDurationUnit || 'days'}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {phases.map((phase, idx) => {
          const phaseId = `phase-${idx}`;
          const isComplete = phaseProgress[phaseId] || false;
          const isOpen = openPhases[idx];
          const calculatedDate = calculateDate(phase.startDay);

          return (
            <Collapsible
              key={idx}
              open={isOpen}
              onOpenChange={(open) => setOpenPhases(prev => ({ ...prev, [idx]: open }))}
            >
              <div 
                className={`rounded-lg border transition-all ${
                  isComplete 
                    ? 'bg-success/10 border-success/30' 
                    : phase.criticalPath 
                    ? 'border-pink-400/40 bg-pink-400/5' 
                    : 'border-border/40'
                }`}
              >
                <div className="p-4 sm:p-5">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={isComplete}
                      onCheckedChange={() => onTogglePhase(phaseId)}
                      className="mt-1"
                    />
                    <div className="flex-1 space-y-2">
                      {/* Phase Header */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className={`font-semibold flex items-center gap-2 flex-wrap ${
                            isComplete ? 'line-through text-muted-foreground' : ''
                          }`}>
                            {phase.phase}
                            {phase.criticalPath && !isComplete && (
                              <Badge variant="outline" className="text-xs bg-pink-400/20 border-pink-400/40">
                                Critical Path
                              </Badge>
                            )}
                            {isComplete && (
                              <CheckCircle2 className="h-4 w-4 text-success" />
                            )}
                          </div>
                          <div className="text-sm text-gray-400 mt-1 flex items-center gap-2 flex-wrap">
                            <span>Duration: {phase.duration} {phase.durationUnit || 'days'}</span>
                            {calculatedDate && (
                              <>
                                <span>•</span>
                                <span>Start: {calculatedDate}</span>
                              </>
                            )}
                            {!calculatedDate && phase.startDay && (
                              <>
                                <span>•</span>
                                <span>Start: {phase.startDay}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      {phase.description && (
                        <p className={`text-base leading-relaxed ${isComplete ? 'text-muted-foreground' : 'text-gray-300'}`}>
                          {phase.description}
                        </p>
                      )}

                      {/* Practical Notes */}
                      {phase.practicalNotes && (
                        <div className="p-3 sm:p-4 bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg">
                          <div className="flex items-start gap-2">
                            <span className="text-lg">💡</span>
                            <div className="text-sm text-gray-900 leading-relaxed">
                              <span className="font-semibold">WHY THIS ORDER: </span>
                              {phase.practicalNotes}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Key Actions - Show First 3 Tasks */}
                      {phase.tasks && phase.tasks.length > 0 && (
                        <div className="bg-card/50 rounded-lg p-3 sm:p-4 border border-border/40">
                          <h5 className="text-sm font-semibold text-gray-100 mb-2">Key Actions:</h5>
                          <ul className="space-y-2">
                            {phase.tasks.slice(0, 3).map((task, idx) => {
                              const taskText = typeof task === 'string' ? task : task.task || task.name || '';
                              const taskDuration = typeof task !== 'string' ? task.duration : null;
                              return (
                                <li key={idx} className="text-sm text-gray-300 leading-relaxed flex items-start gap-2">
                                  <span className="text-pink-400 mt-0.5 flex-shrink-0">→</span>
                                  <div className="flex-1 flex items-center justify-between gap-2">
                                    <span>{taskText}</span>
                                    {taskDuration && (
                                      <span className="text-xs text-muted-foreground whitespace-nowrap">({taskDuration})</span>
                                    )}
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                          {phase.tasks.length > 3 && (
                            <CollapsibleTrigger className="flex items-center gap-2 text-sm text-pink-400 hover:text-pink-500 transition-colors mt-3">
                              <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                              +{phase.tasks.length - 3} more actions
                            </CollapsibleTrigger>
                          )}
                        </div>
                      )}


                      {/* Dependencies & Milestones */}
                      {(phase.dependencies && phase.dependencies.length > 0) || (phase.milestones && phase.milestones.length > 0) ? (
                        <div className="flex items-center gap-3 flex-wrap text-sm">
                          {phase.dependencies && phase.dependencies.length > 0 && (
                            <div>
                              <span className="text-muted-foreground">Dependencies: </span>
                              <span>{phase.dependencies.join(', ')}</span>
                            </div>
                          )}
                          {phase.milestones && phase.milestones.length > 0 && (
                            <div>
                              <span className="text-muted-foreground">Milestones: </span>
                              <span>{phase.milestones.join(', ')}</span>
                            </div>
                          )}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  {/* Collapsible Tasks List - Additional Tasks */}
                  {phase.tasks && phase.tasks.length > 3 && (
                    <CollapsibleContent className="mt-3">
                      <div className="space-y-2 pl-6 sm:pl-9">
                        <div className="text-sm font-medium text-muted-foreground mb-2">Additional Tasks:</div>
                        {phase.tasks.slice(3).map((task, taskIdx) => {
                          const taskText = typeof task === 'string' ? task : task.task || task.name || '';
                          const taskDuration = typeof task !== 'string' ? task.duration : null;
                          
                          return (
                            <div 
                              key={taskIdx} 
                              className="text-sm pl-3 border-l-2 border-pink-400/30 py-1 flex items-start justify-between gap-2"
                            >
                              <span className="leading-relaxed">• {taskText}</span>
                              {taskDuration && (
                                <span className="text-xs text-muted-foreground whitespace-nowrap">({taskDuration})</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </CollapsibleContent>
                  )}
                </div>
              </div>
            </Collapsible>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default PhasesSection;
