import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Loader2, Wrench } from 'lucide-react';
import { GenerationTimer } from '../site-safety/ai-rams/GenerationTimer';

interface InstallationProcessingViewProps {
  progress: { stage: number; percent: number; message: string } | null;
  isGenerating: boolean;
  onCancel?: () => void;
  onQuickMode?: () => void;
}

export const InstallationProcessingView = ({ progress, isGenerating, onCancel, onQuickMode }: InstallationProcessingViewProps) => {
  const stages = [
    'Analysing installation requirements...',
    'Checking BS 7671 regulations...',
    'Creating step-by-step instructions...',
    'Listing tools and materials...',
    'Adding safety notes and checks...'
  ];

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <Card className="p-6 sm:p-8 max-w-2xl w-full mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Wrench className="h-8 w-8 text-primary animate-pulse" />
            </div>
            <GenerationTimer isRunning={isGenerating} />
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
              <span className="text-sm text-muted-foreground">{progress?.percent || 0}%</span>
            </div>
            <Progress value={progress?.percent || 0} className="h-2" />
          </div>

          <div className="space-y-2">
            {stages.map((stage, index) => {
              const isComplete = progress && progress.stage > index + 1;
              const isCurrent = progress && progress.stage === index + 1;

              return (
                <div
                  key={index}
                  className={`flex items-start gap-3 p-2.5 rounded-lg transition-all ${
                    isCurrent ? 'bg-primary/5 border border-primary/20' : ''
                  }`}
                >
                  {isComplete ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  ) : isCurrent ? (
                    <Loader2 className="h-5 w-5 text-elec-yellow animate-spin flex-shrink-0 mt-0.5" />
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
                    {stage}
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
