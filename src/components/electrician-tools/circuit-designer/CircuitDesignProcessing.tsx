import { useEffect, useState } from 'react';
import { Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface CircuitDesignProcessingProps {
  circuitCount: number;
  estimatedTime: number; // in seconds
}

const PROCESSING_STAGES = [
  { label: 'Analyzing circuits...', duration: 3000, icon: '📊' },
  { label: 'Searching BS 7671 regulations...', duration: 5000, icon: '📚' },
  { label: 'AI designing your installation...', duration: 17000, icon: '🤖' },
  { label: 'Finalizing calculations...', duration: 2000, icon: '✅' }
];

export const CircuitDesignProcessing = ({ circuitCount, estimatedTime }: CircuitDesignProcessingProps) => {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const stageTimer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(stageTimer);
  }, []);

  useEffect(() => {
    let cumulativeTime = 0;
    for (let i = 0; i < PROCESSING_STAGES.length; i++) {
      cumulativeTime += PROCESSING_STAGES[i].duration;
      if (elapsedTime * 1000 < cumulativeTime) {
        setCurrentStageIndex(i);
        break;
      }
    }
  }, [elapsedTime]);

  const currentStage = PROCESSING_STAGES[currentStageIndex];
  const progress = Math.min((elapsedTime / estimatedTime) * 100, 95);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 animate-fade-in">
      <Card className="p-8 bg-card border-border">
        {/* Animated Lightning Bolt */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
            <Zap className="w-20 h-20 text-primary animate-pulse relative z-10" strokeWidth={2} />
          </div>
        </div>

        {/* Current Stage */}
        <div className="text-center mb-6">
          <div className="text-4xl mb-3">{currentStage.icon}</div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {currentStage.label}
          </h2>
          <p className="text-muted-foreground">
            Designing {circuitCount} circuit{circuitCount !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-3 mb-4 overflow-hidden">
          <div 
            className="bg-primary h-full rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Time Estimate */}
        <div className="text-center text-sm text-muted-foreground">
          <p>Estimated time: ~{estimatedTime} seconds</p>
          <p className="mt-1">Elapsed: {elapsedTime}s</p>
        </div>

        {/* Stage Indicators */}
        <div className="grid grid-cols-4 gap-2 mt-6">
          {PROCESSING_STAGES.map((stage, index) => (
            <div
              key={index}
              className={`h-1 rounded-full transition-all duration-500 ${
                index <= currentStageIndex ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>

        {/* Info Text */}
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground text-center">
            💡 Our AI is calculating cable sizes, protection devices, and ensuring BS 7671 compliance
          </p>
        </div>
      </Card>
    </div>
  );
};
