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
        <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Calendar className="h-5 w-5 text-elec-yellow" />
          Project Timescales
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Summary Badge */}
        <div className="flex items-center justify-between p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
          <div>
            <p className="text-sm text-muted-foreground">Total Duration</p>
            <p className="text-xl font-bold text-foreground">{timescales.startToFinish}</p>
          </div>
          <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30 text-lg px-3 py-1">
            {timescales.totalDays} days
          </Badge>
        </div>

        {/* Phases Breakdown */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Phase Breakdown
          </h4>
          {timescales.phases.map((phase, idx) => (
            <div 
              key={idx}
              className="p-3 rounded-lg bg-elec-dark/40 border border-elec-yellow/10 hover:border-elec-yellow/30 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-elec-yellow font-bold text-sm">{idx + 1}.</span>
                    <p className="font-medium text-foreground">{phase.phase}</p>
                  </div>
                  <p className="text-sm text-muted-foreground ml-6">{phase.description}</p>
                </div>
                <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow shrink-0 ml-2">
                  {phase.days} day{phase.days !== 1 ? 's' : ''}
                </Badge>
              </div>
              
              {/* Visual Progress Bar */}
              <div className="ml-6 mt-2">
                <div className="h-2 bg-elec-dark/60 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-elec-yellow/40 rounded-full"
                    style={{ width: `${(phase.days / timescales.totalDays) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Critical Path */}
        {timescales.criticalPath && (
          <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/30">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-foreground mb-1">Critical Path</p>
                <p className="text-xs text-muted-foreground">{timescales.criticalPath}</p>
              </div>
            </div>
          </div>
        )}

        {/* Assumptions */}
        {timescales.assumptions && timescales.assumptions.length > 0 && (
          <div className="pt-3 border-t border-elec-yellow/10">
            <p className="text-xs font-semibold text-muted-foreground mb-2">Assumptions:</p>
            <ul className="space-y-1">
              {timescales.assumptions.map((assumption, idx) => (
                <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                  <span className="text-elec-yellow mt-0.5">•</span>
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
