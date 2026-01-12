import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Sparkles,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  X,
  RotateCcw,
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
  error?: string | null;
  isError?: boolean;
  onCancel: () => void;
  onRetry?: () => void;
}

// Analysis stages for visual progress (simplified for single Gemini call)
const STAGES = [
  { id: 'connecting', label: 'Connecting' },
  { id: 'analyzing', label: 'Analysing' },
  { id: 'complete', label: 'Complete' },
];

/**
 * Native-style analysis screen with circular progress
 * Shows board image during analysis with scanning effect
 */
export const AnalyzingScreen: React.FC<AnalyzingScreenProps> = ({
  images,
  progress,
  stage,
  stageMessage,
  board,
  circuits,
  warnings,
  error,
  isError,
  onCancel,
  onRetry,
}) => {
  // Get current stage index
  const currentStageIndex = STAGES.findIndex(s =>
    stage.toLowerCase().includes(s.id.toLowerCase())
  );

  // Calculate circular progress
  const radius = 70;
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
      <main className="flex-1 flex flex-col items-center justify-center p-4 overflow-y-auto">
        {/* Error display */}
        {isError && error ? (
          <div className="w-full max-w-sm">
            <div className="p-4 rounded-xl border border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/30">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-6 w-6 text-red-500 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold text-red-700 dark:text-red-300">Analysis Failed</p>
                  <p className="text-sm text-red-600 dark:text-red-400 mt-1">{error}</p>
                </div>
              </div>
              {onRetry && (
                <Button
                  onClick={onRetry}
                  className="w-full mt-4 gap-2 touch-manipulation"
                  size="lg"
                >
                  <RotateCcw className="h-4 w-4" />
                  Try Again
                </Button>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* Circular progress - smaller to make room for image */}
            <div className="relative w-36 h-36 mb-4">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                {/* Background circle */}
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  className="text-muted"
                />
                {/* Progress circle */}
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  className="text-primary transition-all duration-500 ease-out"
                />
              </svg>
              {/* Center content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Sparkles className="h-8 w-8 text-primary animate-pulse mb-1" />
                <span className="text-2xl font-bold">{Math.round(progress)}%</span>
              </div>
            </div>

            {/* Stage message */}
            <p className="text-base font-medium text-center mb-3">{stageMessage}</p>

            {/* Board image with scanning overlay */}
            {images.length > 0 && (
              <div className="relative w-full max-w-xs aspect-[4/3] rounded-xl overflow-hidden bg-muted mb-4">
                <img
                  src={images[0]}
                  alt="Board being analysed"
                  className="w-full h-full object-cover"
                />
                {/* Scanning line effect */}
                <div
                  className="absolute left-0 right-0 h-1 bg-primary shadow-lg shadow-primary/50"
                  style={{
                    top: `${Math.min(progress, 95)}%`,
                    transition: 'top 0.5s ease-out',
                  }}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
                {/* Progress badge */}
                <Badge className="absolute bottom-2 right-2 bg-black/60 text-white">
                  {Math.round(progress)}% analysed
                </Badge>
              </div>
            )}

            {/* Stage dots */}
            <div className="flex items-center gap-2 mb-4">
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
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 mb-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="font-medium text-green-700 dark:text-green-300">
                  {circuits.length} circuit{circuits.length !== 1 ? 's' : ''} found
                </span>
              </div>
            )}

            {/* Board info preview */}
            {board && (
              <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
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
              <div className="w-full max-w-xs p-3 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20">
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
          </>
        )}
      </main>

      {/* Footer - only show cancel if not in error state */}
      {!isError && (
        <footer className="p-4 border-t border-border shrink-0" style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
          <Button
            variant="outline"
            onClick={onCancel}
            className="w-full h-12 touch-manipulation"
          >
            Cancel Analysis
          </Button>
        </footer>
      )}
    </div>
  );
};

export default AnalyzingScreen;
