import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Sparkles,
  CheckCircle,
  AlertTriangle,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface BoardInfo {
  brand: string;
  model: string;
  main_switch_rating: number | null;
  spd_status: string;
}

interface DetectedCircuit {
  index: number;
  label_text: string;
  device: {
    category: string;
    rating_amps: number | null;
  };
  phase: '1P' | '3P';
  confidence: 'high' | 'medium' | 'low';
}

interface AnalyzingScreenProps {
  images: string[];
  progress: number;
  stage: string;
  stageMessage: string;
  board: BoardInfo | null;
  circuits: DetectedCircuit[];
  warnings: string[];
  onCancel: () => void;
}

// Analysis stages for visual progress
const STAGES = [
  { id: 'connecting', label: 'Connecting' },
  { id: 'gemini', label: 'Reading labels' },
  { id: 'claude', label: 'Analysing' },
  { id: 'openai', label: 'Verifying' },
  { id: 'complete', label: 'Complete' },
];

/**
 * Native-style analysis screen with circular progress
 * Clean, focused design with real-time updates
 */
export const AnalyzingScreen: React.FC<AnalyzingScreenProps> = ({
  images,
  progress,
  stage,
  stageMessage,
  board,
  circuits,
  warnings,
  onCancel,
}) => {
  // Get current stage index
  const currentStageIndex = STAGES.findIndex(s =>
    stage.toLowerCase().includes(s.id.toLowerCase())
  );

  // Calculate circular progress
  const radius = 88;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * progress / 100);

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header - minimal */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
        <div className="w-10" />
        <h2 className="font-semibold text-lg">Analysing</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onCancel}
          className="text-muted-foreground touch-manipulation"
        >
          <X className="h-5 w-5" />
        </Button>
      </header>

      {/* Main content - centered */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 overflow-y-auto">
        {/* Large circular progress */}
        <div className="relative w-48 h-48 mb-8">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
            {/* Background circle */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-muted"
            />
            {/* Progress circle */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="text-primary transition-all duration-500 ease-out"
            />
          </svg>
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Sparkles className="h-10 w-10 text-primary animate-pulse mb-2" />
            <span className="text-3xl font-bold">{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Stage message */}
        <p className="text-lg font-medium text-center mb-2">{stageMessage}</p>

        {/* Stage dots */}
        <div className="flex items-center gap-2 mb-8">
          {STAGES.map((s, index) => {
            const isComplete = index < currentStageIndex || (index === currentStageIndex && stage.includes('complete'));
            const isCurrent = index === currentStageIndex && !stage.includes('complete');

            return (
              <div
                key={s.id}
                className={cn(
                  'h-2 w-2 rounded-full transition-all duration-300',
                  isComplete && 'bg-green-500',
                  isCurrent && 'bg-primary w-6',
                  !isComplete && !isCurrent && 'bg-muted-foreground/30'
                )}
              />
            );
          })}
        </div>

        {/* Live results */}
        {circuits.length > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 mb-4">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span className="font-medium text-green-700 dark:text-green-300">
              {circuits.length} circuit{circuits.length !== 1 ? 's' : ''} found
            </span>
          </div>
        )}

        {/* Board info preview */}
        {board && (
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="secondary" className="gap-1">
              {board.brand}
            </Badge>
            {board.main_switch_rating && (
              <Badge variant="outline">{board.main_switch_rating}A Main</Badge>
            )}
          </div>
        )}

        {/* Warnings */}
        {warnings.length > 0 && (
          <div className="mt-6 mx-4 p-3 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
              <div className="space-y-1">
                {warnings.map((warning, i) => (
                  <p key={i} className="text-sm text-amber-700 dark:text-amber-300">
                    {warning}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="p-4 border-t border-border shrink-0" style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
        <Button
          variant="outline"
          onClick={onCancel}
          className="w-full h-12 touch-manipulation"
        >
          Cancel Analysis
        </Button>
      </footer>
    </div>
  );
};

export default AnalyzingScreen;
