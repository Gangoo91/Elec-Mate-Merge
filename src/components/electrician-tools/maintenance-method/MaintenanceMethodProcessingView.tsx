import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMobileEnhanced } from '@/hooks/use-mobile-enhanced';
import { cn } from '@/lib/utils';

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
  const { isMobile } = useMobileEnhanced();

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className={cn("pt-6 space-y-6", isMobile && "px-4")}>
        <div className="flex items-center justify-center gap-3">
          <Loader2 className="h-6 w-6 animate-spin text-elec-yellow" />
          <h3 className={cn(
            "font-semibold text-foreground",
            isMobile ? "text-base" : "text-lg"
          )}>
            Generating Maintenance Instructions
          </h3>
        </div>

        <div className="space-y-2">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-elec-yellow transition-all duration-300"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground text-center">
            {progress}% complete
          </p>
        </div>

        {currentStep && (
          <p className={cn(
            "text-center text-muted-foreground",
            isMobile ? "text-sm" : "text-sm"
          )}>
            {currentStep}
          </p>
        )}

        {onCancel && (
          <div className="flex justify-center pt-2">
            <Button
              variant="outline"
              size={isMobile ? "default" : "sm"}
              onClick={onCancel}
              className="active:scale-95 transition-all"
            >
              Cancel Generation
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
