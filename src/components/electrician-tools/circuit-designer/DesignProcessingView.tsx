import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { DesignProgress } from '@/hooks/useAIDesigner';
import { CheckCircle2, Loader2 } from 'lucide-react';

interface DesignProcessingViewProps {
  progress: DesignProgress | null;
  retryMessage?: string | null;
}

export const DesignProcessingView = ({ progress, retryMessage }: DesignProcessingViewProps) => {
  const stages = [
    'Understanding your requirements...',
    'Extracting circuits from description...',
    'Searching BS 7671 for circuit types...',
    'AI is designing circuits...',
    'Validating compliance...',
    'Finalising documentation...',
    'Downloading design data...'
  ];

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Card className="p-8 max-w-2xl w-full">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Generating Your Design</h2>
          <p className="text-muted-foreground">
            Our AI is analysing circuits and checking BS 7671 18th Edition compliance
          </p>
        </div>

        {retryMessage && (
          <div className="mb-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
            <p className="text-sm text-amber-600 dark:text-amber-400 flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              {retryMessage}
            </p>
          </div>
        )}

        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">{progress?.message || 'Initialising...'}</span>
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
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                    isCurrent ? 'bg-primary/5 border border-primary/20' : ''
                  }`}
                >
                  {isComplete ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  ) : isCurrent ? (
                    <Loader2 className="h-5 w-5 text-primary animate-spin flex-shrink-0" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-muted flex-shrink-0" />
                  )}
                  <span
                    className={`text-sm ${
                      isComplete ? 'text-muted-foreground line-through' : isCurrent ? 'font-medium' : 'text-muted-foreground'
                    }`}
                  >
                    {stage}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="text-center text-sm text-muted-foreground pt-4">
            Estimated time: 1–7 minutes depending on design complexity
          </div>
        </div>
      </Card>
    </div>
  );
};
