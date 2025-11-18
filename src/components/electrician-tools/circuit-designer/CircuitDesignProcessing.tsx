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

  // Determine message based on elapsed time
  const getStatusMessage = () => {
    if (elapsedTime < 30) return { icon: '📊', text: 'Analyzing circuits...' };
    if (elapsedTime < 60) return { icon: '📚', text: 'Searching BS 7671 regulations... (this may take a moment)' };
    if (elapsedTime < 90) return { icon: '🤖', text: 'AI designing your installation... (almost there)' };
    return { icon: '✅', text: 'Finalizing calculations... (complex designs take longer)' };
  };

  const statusMessage = getStatusMessage();

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
          <div className="text-4xl mb-3 animate-pulse">{statusMessage.icon}</div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {statusMessage.text}
          </h2>
          <p className="text-muted-foreground">
            Designing {circuitCount} circuit{circuitCount !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Elapsed Time Display */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 rounded-full">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <p className="text-lg font-semibold text-foreground">
              Elapsed: {elapsedTime}s
            </p>
          </div>
        </div>

        {/* Pulsing Loader */}
        <div className="flex justify-center mb-6">
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '200ms' }} />
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '400ms' }} />
          </div>
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
