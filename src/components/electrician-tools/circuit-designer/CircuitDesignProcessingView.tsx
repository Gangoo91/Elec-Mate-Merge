import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Loader2, Zap, XCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface CircuitDesignProcessingViewProps {
  progress: number;
  currentStep: string;
  onCancel?: () => void;
  isCancelling?: boolean;
}

export const CircuitDesignProcessingView: React.FC<CircuitDesignProcessingViewProps> = ({
  progress,
  currentStep,
  onCancel,
  isCancelling
}) => {
  // Determine phase based on progress
  const getPhaseInfo = () => {
    if (progress < 15) return { icon: '🔍', label: 'Analyzing circuits', color: 'bg-blue-500' };
    if (progress < 90) return { icon: '🤖', label: 'Designing circuits', color: 'bg-primary' };
    if (progress < 95) return { icon: '✅', label: 'Validating design', color: 'bg-green-500' };
    return { icon: '🎯', label: 'Finalizing', color: 'bg-accent' };
  };

  const phase = getPhaseInfo();

  return (
    <div className="min-h-screen bg-elec-dark flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/50 animate-pulse">
              <Zap className="h-10 w-10 text-white" />
            </div>
            
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                AI Circuit Designer
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Generating BS 7671 compliant designs
              </p>
            </div>
          </div>

          {/* Progress */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="text-sm">
                <span className="text-2xl mr-2">{phase.icon}</span>
                {phase.label}
              </Badge>
              <span className="text-lg font-bold text-foreground">
                {progress}%
              </span>
            </div>
            
            <Progress value={progress} className="h-3" />
            
            {currentStep && (
              <p className="text-sm text-muted-foreground text-center">
                {currentStep}
              </p>
            )}
          </div>

          {/* Phase Indicators */}
          <div className="grid grid-cols-4 gap-2 pt-4">
            {[
              { label: 'Analyze', range: [0, 15] },
              { label: 'Design', range: [15, 90] },
              { label: 'Validate', range: [90, 95] },
              { label: 'Finalize', range: [95, 100] }
            ].map((item, idx) => {
              const isActive = progress >= item.range[0] && progress < item.range[1];
              const isComplete = progress >= item.range[1];
              
              return (
                <div 
                  key={idx}
                  className={`text-center p-2 rounded-lg border transition-all ${
                    isActive 
                      ? 'border-primary bg-primary/10 text-primary' 
                      : isComplete
                      ? 'border-green-500/50 bg-green-500/10 text-green-500'
                      : 'border-border/50 text-muted-foreground'
                  }`}
                >
                  <div className="text-xs font-medium">
                    {isComplete ? '✓' : isActive ? <Loader2 className="h-3 w-3 animate-spin mx-auto" /> : '○'}
                  </div>
                  <div className="text-xs mt-1">{item.label}</div>
                </div>
              );
            })}
          </div>

          {/* Cancel Button */}
          {onCancel && (
            <div className="pt-4 flex justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={onCancel}
                disabled={isCancelling}
                className="gap-2"
              >
                {isCancelling ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Cancelling...
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4" />
                    Cancel Generation
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Info Footer */}
          <div className="pt-4 border-t border-border/50 text-center">
            <p className="text-xs text-muted-foreground">
              This may take 2-3 minutes for complex designs
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
