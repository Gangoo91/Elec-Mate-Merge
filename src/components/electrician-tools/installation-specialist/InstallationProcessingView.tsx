import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Loader2, Wrench } from 'lucide-react';

interface InstallationProcessingViewProps {
  progress: { stage: number; percent: number; message: string } | null;
}

export const InstallationProcessingView = ({ progress }: InstallationProcessingViewProps) => {
  const stages = [
    'Analysing installation requirements...',
    'Consulting BS 7671 knowledge base...',
    'Generating step-by-step method...',
    'Extracting tools and materials...',
    'Finalising safety notes...'
  ];

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <Card className="p-6 sm:p-8 max-w-2xl w-full mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Wrench className="h-8 w-8 text-primary animate-pulse" />
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
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                    isCurrent ? 'bg-primary/5 border border-primary/20' : ''
                  }`}
                >
                  {isComplete ? (
                    <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0" />
                  ) : isCurrent ? (
                    <Loader2 className="h-5 w-5 text-primary animate-spin flex-shrink-0" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-muted flex-shrink-0" />
                  )}
                  <span
                    className={`text-sm ${
                      isComplete ? 'text-muted-foreground line-through' : isCurrent ? 'font-medium text-foreground' : 'text-muted-foreground'
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
        </div>
      </Card>
    </div>
  );
};
