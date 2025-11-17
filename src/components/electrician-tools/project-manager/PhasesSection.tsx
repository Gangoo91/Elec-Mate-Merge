import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, CheckCircle2, Lightbulb } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { addDays, format } from "date-fns";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

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
                className={`rounded-lg border p-5 sm:p-6 transition-all duration-200 ${
                  isComplete 
                    ? 'bg-success/10 border-success/30' 
                    : phase.criticalPath 
                    ? 'border-l-4 border-l-pink-400 border-border/20 bg-transparent' 
                    : 'border-border/20 bg-transparent'
                }`}
              >
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={isComplete}
                    onCheckedChange={() => onTogglePhase(phaseId)}
                    className="mt-1"
                  />
                  <div className="flex-1 space-y-4">
                    {/* Phase Header */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className={`font-semibold flex items-center gap-2 flex-wrap ${
                          isComplete ? 'line-through text-muted-foreground' : ''
                        }`}>
                          <span className="text-base sm:text-lg">{phase.phase}</span>
                          {phase.criticalPath && !isComplete && (
                            <Badge variant="outline" className="text-xs bg-pink-400/20 border-pink-400/40 text-pink-400">
                              Critical Path
                            </Badge>
                          )}
                          {isComplete && (
                            <CheckCircle2 className="h-4 w-4 text-success" />
                          )}
                        </div>
                        <div className="flex items-center gap-3 mt-1 text-sm text-gray-400">
                          <span>{phase.duration} {phase.durationUnit || 'days'}</span>
                          {calculatedDate && (
                            <>
                              <span>•</span>
                              <span>Starts {calculatedDate}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    {phase.description && (
                      <p className="text-base leading-relaxed text-gray-300">
                        {phase.description}
                      </p>
                    )}

                    {/* Practical Notes - NO DUPLICATE TEXT */}
                    {phase.practicalNotes && (
                      <div className="bg-elec-yellow/10 border border-elec-yellow/20 rounded-lg p-4 sm:p-5 flex gap-3">
                        <Lightbulb className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
                        <p className="text-sm sm:text-base text-gray-100 leading-relaxed">
                          {phase.practicalNotes.replace(/^WHY THIS ORDER[:\s]*/i, '')}
                        </p>
                      </div>
                    )}

                    {/* Key Actions - ENHANCED WITH MORE INFO */}
                    {phase.tasks && phase.tasks.length > 0 && (
                      <div className="bg-card/50 rounded-lg p-4 sm:p-5 border border-border/40">
                        <h5 className="text-sm sm:text-base font-semibold text-gray-100 mb-4 flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-pink-400" />
                          Key Actions
                        </h5>
                        <ul className="space-y-4">
                          {phase.tasks.slice(0, 3).map((task, idx) => {
                            const taskText = typeof task === 'string' ? task : task.task || task.name || '';
                            const taskDuration = typeof task !== 'string' ? task.duration : null;
                            
                            // Extract valuable information
                            const hasSupplier = /CEF|TLC|Screwfix|Toolstation|wholesaler/i.test(taskText);
                            const hasOrder = /order|purchase|buy/i.test(taskText);
                            const hasInstall = /install|fit|mount/i.test(taskText);
                            const hasTest = /test|inspect|verify/i.test(taskText);
                            const hasWarning = /asap|urgent|critical|before|must/i.test(taskText);

                            return (
                              <li key={idx} className="flex gap-3 text-sm sm:text-base text-gray-300 leading-relaxed items-start border-l-2 border-pink-400/30 pl-4">
                                <span className="flex-shrink-0 mt-1">
                                  {hasOrder && '📦'}
                                  {hasInstall && '🔧'}
                                  {hasTest && '✓'}
                                  {!hasOrder && !hasInstall && !hasTest && '→'}
                                </span>
                                <div className="flex-1">
                                  <span className={hasWarning ? 'font-medium text-elec-yellow' : ''}>
                                    {taskText}
                                  </span>
                                  {(taskDuration || hasSupplier || hasWarning) && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                      {taskDuration && (
                                        <span className="px-2 py-1 bg-muted/50 text-xs text-muted-foreground rounded">
                                          {taskDuration}
                                        </span>
                                      )}
                                      {hasSupplier && (
                                        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">
                                          Supplier order
                                        </span>
                                      )}
                                      {hasWarning && (
                                        <span className="px-2 py-1 bg-elec-yellow/20 text-elec-yellow text-xs rounded flex items-center gap-1">
                                          <span>⚠️</span> Priority
                                        </span>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                        {phase.tasks.length > 3 && (
                          <CollapsibleTrigger className="w-full mt-4 text-sm text-pink-400 hover:text-pink-300 transition-colors flex items-center gap-2 justify-center touch-manipulation min-h-[48px] sm:min-h-[44px] rounded-lg hover:bg-pink-400/10">
                            <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                            {isOpen ? 'Show less' : `Show ${phase.tasks.length - 3} more actions`}
                          </CollapsibleTrigger>
                        )}
                      </div>
                    )}

                    {/* Dependencies & Milestones */}
                    {(phase.dependencies && phase.dependencies.length > 0) || (phase.milestones && phase.milestones.length > 0) ? (
                      <div className="flex items-center gap-3 flex-wrap text-sm text-gray-400">
                        {phase.dependencies && phase.dependencies.length > 0 && (
                          <div>
                            <span className="font-medium">Dependencies: </span>
                            {phase.dependencies.join(', ')}
                          </div>
                        )}
                        {phase.milestones && phase.milestones.length > 0 && (
                          <div>
                            <span className="font-medium">Milestones: </span>
                            {phase.milestones.join(', ')}
                          </div>
                        )}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              {/* Collapsible Additional Tasks - Outside main card */}
              {phase.tasks && phase.tasks.length > 3 && (
                <CollapsibleContent>
                  <div className="bg-card/50 rounded-lg p-4 sm:p-5 border border-border/40 mt-3 ml-11">
                    <ul className="space-y-3">
                      {phase.tasks.slice(3).map((task, idx) => {
                        const taskText = typeof task === 'string' ? task : task.task || task.name || '';
                        const taskDuration = typeof task !== 'string' ? task.duration : null;
                        const hasSupplier = /CEF|TLC|Screwfix|Toolstation|wholesaler/i.test(taskText);
                        const hasWarning = /asap|urgent|critical|before|must/i.test(taskText);

                        return (
                          <li key={idx} className="flex gap-3 text-sm sm:text-base text-gray-300 leading-relaxed items-start">
                            <span className="text-pink-400 mt-1 flex-shrink-0">•</span>
                            <div className="flex-1">
                              <span className={hasWarning ? 'font-medium text-elec-yellow' : ''}>
                                {taskText}
                              </span>
                              {(taskDuration || hasSupplier) && (
                                <div className="flex flex-wrap gap-2 mt-1">
                                  {taskDuration && (
                                    <span className="px-2 py-0.5 bg-muted/50 text-xs text-muted-foreground rounded">
                                      {taskDuration}
                                    </span>
                                  )}
                                  {hasSupplier && (
                                    <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded">
                                      Supplier
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </CollapsibleContent>
              )}
            </Collapsible>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default PhasesSection;
