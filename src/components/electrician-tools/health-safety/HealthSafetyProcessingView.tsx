import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Shield, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface HealthSafetyProcessingViewProps {
  progress: number;
  currentStep: string;
  onCancel: () => void;
}

export const HealthSafetyProcessingView = ({ 
  progress, 
  currentStep, 
  onCancel 
}: HealthSafetyProcessingViewProps) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const estimatedTotal = 120; // 2 minutes estimate
  const estimatedRemaining = Math.max(0, estimatedTotal - elapsedTime);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Agent Card */}
      <Card className="overflow-hidden border-orange-500/20 bg-gradient-to-br from-orange-500/10 via-background to-background">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 ${progress < 100 ? 'animate-pulse' : ''}`}>
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Health & Safety Advisor</h3>
                <p className="text-sm text-muted-foreground">
                  {progress < 100 ? 'Analysing safety requirements...' : 'Complete'}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onCancel}
              className="text-muted-foreground hover:text-destructive touch-manipulation"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            
            <div className="pt-2 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-orange-400 rounded-full animate-pulse"></span>
                {currentStep || 'Processing...'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline Card */}
      <Card>
        <CardContent className="p-6">
          <h4 className="font-semibold mb-4">Generation Timeline</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Elapsed Time</span>
              <span className="font-mono">{formatTime(elapsedTime)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Estimated Remaining</span>
              <span className="font-mono">{formatTime(estimatedRemaining)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Estimate</span>
              <span className="font-mono">{formatTime(estimatedTotal)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* What's Happening */}
      <Card className="bg-muted/50">
        <CardContent className="p-6">
          <h4 className="font-semibold mb-3">What's Happening?</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-orange-400 mt-1">•</span>
              <span>Analysing your project requirements against BS 7671 and HSE regulations</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-400 mt-1">•</span>
              <span>Identifying electrical hazards and calculating risk scores</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-400 mt-1">•</span>
              <span>Generating control measures and safe systems of work</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-400 mt-1">•</span>
              <span>Creating PPE requirements and emergency procedures</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
