import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MaintenanceMethodProcessingViewProps {
  progress: number;
  currentStep: string | null;
  onCancel?: () => void;
}

export const MaintenanceMethodProcessingView = ({
  progress,
  currentStep,
  onCancel
}: MaintenanceMethodProcessingViewProps) => {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="pt-6 space-y-6">
        <div className="flex items-center justify-center gap-3">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <h3 className="text-lg font-semibold">
            Generating Maintenance Instructions
          </h3>
        </div>

        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground text-center">
            {progress}% complete
          </p>
        </div>

        {currentStep && (
          <p className="text-sm text-center text-muted-foreground">
            {currentStep}
          </p>
        )}

        {onCancel && (
          <div className="flex justify-center pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onCancel}
            >
              Cancel Generation
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
