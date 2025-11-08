import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, AlertTriangle } from "lucide-react";

interface Phase {
  phase: string;
  days: number;
  description: string;
}

interface TimescalesData {
  phases: Phase[];
  totalDays: number;
  totalWeeks?: number;
  workingDaysPerWeek?: number;
  startToFinish: string;
  criticalPath?: string;
  assumptions?: string[];
}

interface TimescalesPanelProps {
  timescales: TimescalesData;
}

const TimescalesPanel = ({ timescales }: TimescalesPanelProps) => {
  return (
    <Card className="border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="mobile-heading text-foreground flex items-center gap-2">
          <Calendar className="h-6 w-6 text-elec-yellow" />
          Project Timescales
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Summary Badge */}
        <div className="p-5 rounded-xl bg-gradient-to-br from-elec-yellow/10 to-elec-dark/50 border-2 border-elec-yellow/30">
          <p className="mobile-text text-elec-light mb-2 font-semibold">Total Duration</p>
          <div className="flex items-center justify-between">
            <p className="text-xl sm:text-2xl font-bold text-foreground leading-tight">{timescales.startToFinish}</p>
            <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30 text-lg px-4 py-2 font-bold tabular-nums">
              {timescales.totalDays} days
            </Badge>
          </div>
        </div>

        {/* Phases Breakdown */}
        <div className="space-y-3">
          <h4 className="mobile-text font-bold text-foreground flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Phase Breakdown
          </h4>
          {timescales.phases.map((phase, idx) => {
            const phasePercentage = (phase.days / timescales.totalDays) * 100;
            
            return (
              <div 
                key={idx}
                className="p-5 rounded-xl bg-elec-dark/40 border-2 border-elec-yellow/10 space-y-3"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-elec-yellow font-bold text-base">{idx + 1}.</span>
                      <h4 className="mobile-text font-bold text-foreground">{phase.phase}</h4>
                    </div>
                    <p className="mobile-small-text text-elec-light leading-relaxed font-medium ml-6">{phase.description}</p>
                  </div>
                  <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow mobile-small-text font-bold shrink-0 tabular-nums">
                    {phase.days} days
                  </Badge>
                </div>
                
                {/* Progress bar */}
                <div className="space-y-2 ml-6">
                  <div className="h-3 sm:h-2 bg-elec-dark/60 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-elec-yellow to-elec-yellow/70 rounded-full transition-all"
                      style={{ width: `${phasePercentage}%` }}
                    />
                  </div>
                  <p className="mobile-small-text text-elec-light/70 font-medium tabular-nums">
                    {Math.round(phasePercentage)}% of total project
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Critical Path */}
        {timescales.criticalPath && (
          <div className="p-4 rounded-xl bg-orange-500/10 border-2 border-orange-500/30">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-orange-400 shrink-0 mt-0.5" />
              <div>
                <p className="mobile-text font-bold text-foreground mb-2">Critical Path</p>
                <p className="mobile-small-text text-elec-light leading-relaxed font-medium">{timescales.criticalPath}</p>
              </div>
            </div>
          </div>
        )}

        {/* Assumptions */}
        {timescales.assumptions && timescales.assumptions.length > 0 && (
          <div className="p-4 rounded-xl bg-elec-dark/40 border-2 border-elec-yellow/10">
            <p className="mobile-text font-bold text-foreground mb-3">Assumptions:</p>
            <ul className="space-y-2">
              {timescales.assumptions.map((assumption, idx) => (
                <li key={idx} className="mobile-small-text text-elec-light flex items-start gap-2 leading-relaxed font-medium">
                  <span className="text-elec-yellow mt-0.5 font-bold">•</span>
                  <span>{assumption}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TimescalesPanel;
