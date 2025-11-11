import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Search, Clipboard, Calendar, Check, Clock } from "lucide-react";

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

        {/* Generation Timeline - Mobile Optimized */}
        <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3 sm:gap-4 p-4 bg-elec-gray/50 rounded-lg border border-pink-500/10">
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-pink-400 flex-shrink-0" />
            <div className="flex-1">
              <div className="text-xs text-muted-foreground">Elapsed Time</div>
              <div className="text-2xl font-bold text-pink-400">{formatTime(elapsedTime)}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-foreground flex-shrink-0" />
            <div className="flex-1">
              <div className="text-xs text-muted-foreground">Remaining</div>
              <div className="text-2xl font-bold text-foreground">{formatTime(remaining)}</div>
            </div>
          </div>
        </div>
      </Card>

      {/* What's Happening Section - Compact Timeline */}
      <Card className="p-4 sm:p-6">
        <h4 className="text-base font-semibold mb-4 flex items-center gap-2 text-left">
          <Clipboard className="h-5 w-5 text-pink-400" />
          What's Happening?
        </h4>
        <ol className="space-y-0 relative">
          {/* Step 1 */}
          <li className={`flex items-start gap-3 py-3 border-b border-border/40 transition-all ${
            progress?.stage === 'parsing' || progress?.stage === 'rag' || progress?.stage === 'ai' || progress?.stage === 'validation' || progress?.stage === 'complete'
              ? 'border-l-4 border-l-green-500 pl-3 bg-green-500/5'
              : 'pl-3'
          }`}>
            <div className="flex-shrink-0 mt-0.5">
              {(progress?.stage === 'parsing' || progress?.stage === 'rag' || progress?.stage === 'ai' || progress?.stage === 'validation' || progress?.stage === 'complete') ? (
                <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center animate-scale-in">
                  <Check className="h-3 w-3 text-white" />
                </div>
              ) : (
                <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/40" />
              )}
            </div>
            <div className="flex-1 min-w-0 text-left">
              <div className="font-medium text-sm">Searching BS 7671...</div>
              <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                Finding regulations & compliance needs
              </div>
            </div>
          </li>

          {/* Step 2 */}
          <li className={`flex items-start gap-3 py-3 border-b border-border/40 transition-all ${
            progress?.stage === 'ai' || progress?.stage === 'validation' || progress?.stage === 'complete'
              ? 'border-l-4 border-l-green-500 pl-3 bg-green-500/5'
              : progress?.stage === 'rag'
              ? 'border-l-4 border-l-pink-500 pl-3 bg-pink-500/10 animate-pulse'
              : 'pl-3'
          }`}>
            <div className="flex-shrink-0 mt-0.5">
              {(progress?.stage === 'ai' || progress?.stage === 'validation' || progress?.stage === 'complete') ? (
                <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center animate-scale-in">
                  <Check className="h-3 w-3 text-white" />
                </div>
              ) : progress?.stage === 'rag' ? (
                <div className="h-5 w-5 rounded-full bg-pink-500 flex items-center justify-center animate-pulse">
                  <Search className="h-3 w-3 text-elec-dark" />
                </div>
              ) : (
                <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/40" />
              )}
            </div>
            <div className="flex-1 min-w-0 text-left">
              <div className="font-medium text-sm">Analysing scope...</div>
              <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                Identifying critical path & risk factors
              </div>
            </div>
          </li>

          {/* Step 3 */}
          <li className={`flex items-start gap-3 py-3 border-b border-border/40 transition-all ${
            progress?.stage === 'validation' || progress?.stage === 'complete'
              ? 'border-l-4 border-l-green-500 pl-3 bg-green-500/5'
              : progress?.stage === 'ai'
              ? 'border-l-4 border-l-pink-500 pl-3 bg-pink-500/10 animate-pulse'
              : 'pl-3'
          }`}>
            <div className="flex-shrink-0 mt-0.5">
              {(progress?.stage === 'validation' || progress?.stage === 'complete') ? (
                <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center animate-scale-in">
                  <Check className="h-3 w-3 text-white" />
                </div>
              ) : progress?.stage === 'ai' ? (
                <div className="h-5 w-5 rounded-full bg-pink-500 flex items-center justify-center animate-pulse">
                  <Clipboard className="h-3 w-3 text-elec-dark" />
                </div>
              ) : (
                <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/40" />
              )}
            </div>
            <div className="flex-1 min-w-0 text-left">
              <div className="font-medium text-sm">Generating plan...</div>
              <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                Creating phase breakdown & task sequences
              </div>
            </div>
          </li>

          {/* Step 4 */}
          <li className={`flex items-start gap-3 py-3 transition-all ${
            progress?.stage === 'complete'
              ? 'border-l-4 border-l-green-500 pl-3 bg-green-500/5'
              : progress?.stage === 'validation'
              ? 'border-l-4 border-l-pink-500 pl-3 bg-pink-500/10 animate-pulse'
              : 'pl-3'
          }`}>
            <div className="flex-shrink-0 mt-0.5">
              {progress?.stage === 'complete' ? (
                <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center animate-scale-in">
                  <Check className="h-3 w-3 text-white" />
                </div>
              ) : progress?.stage === 'validation' ? (
                <div className="h-5 w-5 rounded-full bg-pink-500 flex items-center justify-center animate-pulse">
                  <Calendar className="h-3 w-3 text-elec-dark" />
                </div>
              ) : (
                <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/40" />
              )}
            </div>
            <div className="flex-1 min-w-0 text-left">
              <div className="font-medium text-sm">Creating schedules...</div>
              <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                Allocating resources & defining milestones
              </div>
            </div>
          </li>
        </ol>
      </Card>
    </div>
  );
};

export default ProjectManagerProcessingView;
