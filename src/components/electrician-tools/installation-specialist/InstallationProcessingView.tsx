import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Loader2, Wrench } from 'lucide-react';
import { GenerationTimer } from '../site-safety/ai-rams/GenerationTimer';

interface InstallationProcessingViewProps {
  progress: {
    stage: 'initializing' | 'parsing' | 'rag' | 'ai' | 'validation' | 'complete';
    message: string;
  } | null;
  startTime: number;
  onCancel?: () => void;
  onQuickMode?: () => void;
}

export const InstallationProcessingView = ({ progress, startTime, onCancel, onQuickMode }: InstallationProcessingViewProps) => {
  const stages = [
    { key: 'initializing', label: 'Starting up...', percent: 0 },
    { key: 'parsing', label: 'Understanding installation requirements...', percent: 20 },
    { key: 'rag', label: 'Searching BS 7671 installation methods...', percent: 40 },
    { key: 'ai', label: 'Generating step-by-step procedures...', percent: 70 },
    { key: 'validation', label: 'Verifying regulation compliance...', percent: 90 },
    { key: 'complete', label: 'Complete!', percent: 100 }
  ];

  const currentStageIndex = stages.findIndex(s => s.key === progress?.stage);
  const currentPercent = currentStageIndex >= 0 ? stages[currentStageIndex].percent : 0;

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <Card className="p-6 sm:p-8 max-w-2xl w-full mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center">
              <Wrench className="h-8 w-8 text-blue-400 animate-pulse" />
            </div>
            <GenerationTimer isRunning={true} />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-foreground">Generating Installation Method</h2>
          <p className="text-muted-foreground">
            Creating step-by-step installation guidance with BS 7671 compliance
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">{progress?.message || 'Initialising...'}</span>
              <span className="text-sm text-muted-foreground">{currentPercent}%</span>
            </div>
            <Progress value={currentPercent} className="h-2 bg-blue-500/20" />
          </div>

          {/* What's Happening Section */}
          <div className="bg-blue-500/5 rounded-lg p-4 border border-blue-500/20">
            <h3 className="text-sm font-semibold text-foreground mb-2">What's Happening?</h3>
            <p className="text-sm text-muted-foreground">{progress?.message || 'Initialising...'}</p>
          </div>

          <div className="space-y-2">
            {stages.map((stage, index) => {
              const isComplete = currentStageIndex > index;
              const isCurrent = currentStageIndex === index;

              return (
                <div
                  key={stage.key}
                  className={`flex items-start gap-3 p-2.5 rounded-lg transition-all ${
                    isCurrent ? 'bg-blue-500/5 border border-blue-500/20' : ''
                  }`}
                >
                  {isComplete ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  ) : isCurrent ? (
                    <Loader2 className="h-5 w-5 text-blue-400 animate-spin flex-shrink-0 mt-0.5" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-muted flex-shrink-0 mt-0.5" />
                  )}
                  <span
                    className={`text-sm text-left flex-1 ${
                      isComplete ? 'text-muted-foreground line-through' : 
                      isCurrent ? 'font-medium text-foreground' : 
                      'text-muted-foreground'
                    }`}
                  >
                    {stage.label}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="text-center text-sm text-muted-foreground pt-4">
            Estimated time: 3–5 minutes
          </div>

          {(onCancel || onQuickMode) && (
            <div className="flex gap-2 justify-center pt-4">
              {onCancel && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={onCancel}
                  className="min-h-[44px] touch-manipulation"
                >
                  Cancel
                </Button>
              )}
              {onQuickMode && (
                <Button 
                  variant="default" 
                  size="sm" 
                  onClick={onQuickMode}
                  className="min-h-[44px] touch-manipulation"
                >
                  Switch to Quick Mode
                </Button>
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
