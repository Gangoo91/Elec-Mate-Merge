import { Card } from '@/components/ui/card';
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

  const getStatusMessage = () => {
    if (elapsedTime < 30) return { emoji: '📊', text: 'Analysing project requirements...' };
    if (elapsedTime < 60) return { emoji: '⚠️', text: 'Identifying electrical hazards...' };
    if (elapsedTime < 120) return { emoji: '🦺', text: 'Generating control measures...' };
    if (elapsedTime < 180) return { emoji: '📋', text: 'Creating safety documentation...' };
    return { emoji: '✅', text: 'Finalising... (complex assessments take longer)' };
  };

  const { emoji: statusEmoji, text: statusMessage } = getStatusMessage();

  return (
    <div className="animate-fade-in">
      <Card className="p-6 sm:p-8 bg-card border-border">
        {/* Animated Shield Icon with Glow */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-xl animate-pulse" />
            <Shield className="w-16 h-16 sm:w-20 sm:h-20 text-orange-400 animate-pulse relative z-10" />
          </div>
        </div>

        {/* Dynamic Status Message with Emoji */}
        <div className="text-center mb-4 sm:mb-6">
          <div className="text-3xl sm:text-4xl mb-3 animate-pulse">{statusEmoji}</div>
          <h2 className="text-lg sm:text-2xl font-bold text-foreground mb-2 px-2">
            {statusMessage}
          </h2>
          <p className="text-sm text-muted-foreground">
            Generating safety documentation
          </p>
        </div>

        {/* Elapsed Time in Pill Badge */}
        <div className="text-center mb-4 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-orange-500/10 rounded-full">
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
            <p className="text-base sm:text-lg font-semibold text-foreground">
              Elapsed: {formatTime(elapsedTime)}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4 sm:mb-6 px-2">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Pulsing Loader Dots */}
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="flex gap-2">
            <div 
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-orange-400 rounded-full animate-pulse" 
              style={{ animationDelay: '0ms' }} 
            />
            <div 
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-orange-400 rounded-full animate-pulse" 
              style={{ animationDelay: '200ms' }} 
            />
            <div 
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-orange-400 rounded-full animate-pulse" 
              style={{ animationDelay: '400ms' }} 
            />
          </div>
        </div>

        {/* Single Info Tip */}
        <div className="p-3 sm:p-4 bg-muted/50 rounded-lg mb-4 sm:mb-6">
          <p className="text-xs sm:text-sm text-muted-foreground text-center text-left">
            🦺 Analysing BS 7671 requirements and generating hazard assessments
          </p>
        </div>

        {/* Cancel Button */}
        <div className="text-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onCancel} 
            className="text-muted-foreground hover:text-destructive touch-manipulation"
          >
            <X className="h-4 w-4 mr-2" /> Cancel
          </Button>
        </div>
      </Card>
    </div>
  );
};
