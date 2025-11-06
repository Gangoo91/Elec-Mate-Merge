import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Search, Clipboard, Calendar } from "lucide-react";

interface ProjectManagerProcessingViewProps {
  progress: {
    stage: 'initializing' | 'parsing' | 'rag' | 'ai' | 'validation' | 'complete';
    message: string;
  } | null;
  startTime: number;
}

const STAGE_PERCENTAGES = {
  initializing: 0,
  parsing: 10,
  rag: 25,
  ai: 50,
  validation: 75,
  complete: 100
};

const ProjectManagerProcessingView = ({ progress, startTime }: ProjectManagerProcessingViewProps) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  const percentage = progress ? STAGE_PERCENTAGES[progress.stage] : 0;
  const estimatedTotal = 90; // seconds
  const remaining = Math.max(0, estimatedTotal - elapsedTime);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="p-6 bg-gradient-to-br from-pink-500/5 via-background to-background border-pink-500/20">
        <div className="flex items-start gap-4 mb-6">
          <div className="bg-gradient-to-br from-pink-400 to-pink-600 p-3 rounded-full animate-pulse">
            <Clipboard className="h-6 w-6 text-elec-dark" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-1">AI Project Manager</h3>
            <p className="text-sm text-muted-foreground">
              {progress?.message || 'Analysing project requirements...'}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-semibold text-pink-400">{percentage}%</span>
          </div>
          <Progress value={percentage} className="h-2" />
          <p className="text-xs text-muted-foreground">
            • {progress?.stage === 'initializing' && 'Starting up...'}
            {progress?.stage === 'parsing' && 'Understanding your project requirements...'}
            {progress?.stage === 'rag' && 'Searching BS 7671 project requirements...'}
            {progress?.stage === 'ai' && 'Generating detailed execution plan...'}
            {progress?.stage === 'validation' && 'Verifying resource allocation...'}
            {progress?.stage === 'complete' && 'Complete!'}
          </p>
        </div>

        {/* Generation Timeline */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-elec-gray/50 rounded-lg border border-pink-500/10">
          <div className="text-center">
            <div className="text-xs text-muted-foreground mb-1">Elapsed Time</div>
            <div className="text-lg font-semibold text-pink-400">{formatTime(elapsedTime)}</div>
          </div>
          <div className="text-center border-x border-pink-500/10">
            <div className="text-xs text-muted-foreground mb-1">Estimated Remaining</div>
            <div className="text-lg font-semibold text-foreground">{formatTime(remaining)}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-muted-foreground mb-1">Total Estimate</div>
            <div className="text-lg font-semibold text-muted-foreground">{formatTime(estimatedTotal)}</div>
          </div>
        </div>
      </Card>

      {/* What's Happening Section */}
      <Card className="p-6">
        <h4 className="font-semibold mb-4 flex items-center gap-2">
          <Clipboard className="h-5 w-5 text-pink-400" />
          What's Happening?
        </h4>
        <div className="space-y-3">
          <div className={`flex items-start gap-3 p-3 rounded-lg transition-all ${
            progress?.stage === 'parsing' || progress?.stage === 'rag' || progress?.stage === 'ai' || progress?.stage === 'validation' || progress?.stage === 'complete'
              ? 'bg-pink-500/10 border border-pink-500/20'
              : 'bg-elec-gray/30 border border-transparent'
          }`}>
            <Search className={`h-4 w-4 mt-0.5 ${
              progress?.stage === 'parsing' || progress?.stage === 'rag' || progress?.stage === 'ai' || progress?.stage === 'validation' || progress?.stage === 'complete'
                ? 'text-pink-400'
                : 'text-muted-foreground'
            }`} />
            <div>
              <div className="font-medium text-sm">Searching BS 7671 project requirements</div>
              <div className="text-xs text-muted-foreground mt-1">
                Finding relevant regulations, planning constraints, and compliance needs
              </div>
            </div>
          </div>

          <div className={`flex items-start gap-3 p-3 rounded-lg transition-all ${
            progress?.stage === 'ai' || progress?.stage === 'validation' || progress?.stage === 'complete'
              ? 'bg-pink-500/10 border border-pink-500/20'
              : 'bg-elec-gray/30 border border-transparent'
          }`}>
            <Clipboard className={`h-4 w-4 mt-0.5 ${
              progress?.stage === 'ai' || progress?.stage === 'validation' || progress?.stage === 'complete'
                ? 'text-pink-400'
                : 'text-muted-foreground'
            }`} />
            <div>
              <div className="font-medium text-sm">Analysing project scope and dependencies</div>
              <div className="text-xs text-muted-foreground mt-1">
                Identifying critical path, resource requirements, and risk factors
              </div>
            </div>
          </div>

          <div className={`flex items-start gap-3 p-3 rounded-lg transition-all ${
            progress?.stage === 'validation' || progress?.stage === 'complete'
              ? 'bg-pink-500/10 border border-pink-500/20'
              : 'bg-elec-gray/30 border border-transparent'
          }`}>
            <Calendar className={`h-4 w-4 mt-0.5 ${
              progress?.stage === 'validation' || progress?.stage === 'complete'
                ? 'text-pink-400'
                : 'text-muted-foreground'
            }`} />
            <div>
              <div className="font-medium text-sm">Generating detailed execution plan</div>
              <div className="text-xs text-muted-foreground mt-1">
                Creating phase breakdown, task sequences, and coordination strategies
              </div>
            </div>
          </div>

          <div className={`flex items-start gap-3 p-3 rounded-lg transition-all ${
            progress?.stage === 'complete'
              ? 'bg-pink-500/10 border border-pink-500/20'
              : 'bg-elec-gray/30 border border-transparent'
          }`}>
            <CheckCircle2 className={`h-4 w-4 mt-0.5 ${
              progress?.stage === 'complete'
                ? 'text-pink-400'
                : 'text-muted-foreground'
            }`} />
            <div>
              <div className="font-medium text-sm">Creating resource schedules and milestones</div>
              <div className="text-xs text-muted-foreground mt-1">
                Allocating labour, materials, and defining key project milestones
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProjectManagerProcessingView;
