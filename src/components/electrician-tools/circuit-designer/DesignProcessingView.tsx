import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { DesignProgress } from '@/hooks/useAIDesigner';
import { CheckCircle2, Loader2 } from 'lucide-react';

interface DesignProcessingViewProps {
  progress: DesignProgress | null;
}

export const DesignProcessingView = ({ progress }: DesignProcessingViewProps) => {
  const stages = [
    'Understanding your requirements...',
    'Searching BS 7671 for circuit types...',
    'AI is designing circuits...',
    'Validating compliance...',
    'Finalising design...'
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
            Estimated time: 1–3 minutes
          </div>
        </div>
      </Card>
    </div>
  );
};
