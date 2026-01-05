import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Sparkles,
  CheckCircle,
  Circle,
  Loader2,
  Zap,
  X,
  AlertTriangle,
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
  { id: 'connecting', label: 'Connecting to AI' },
  { id: 'gemini', label: 'Reading labels' },
  { id: 'claude', label: 'Analyzing components' },
  { id: 'openai', label: 'Verifying results' },
  { id: 'complete', label: 'Complete' },
];

/**
 * Animated analysis screen showing AI processing progress
 * Real-time updates as circuits are detected
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

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Sparkles className="h-5 w-5 text-primary animate-pulse" />
          </div>
          <div>
            <h2 className="font-semibold">Analyzing Board</h2>
            <p className="text-sm text-muted-foreground">{stageMessage}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onCancel}
          className="text-muted-foreground"
        >
          <X className="h-5 w-5" />
        </Button>
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Image preview with overlay */}
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-muted max-w-lg mx-auto">
          <img
            src={images[0]}
            alt="Board being analyzed"
            className="w-full h-full object-cover"
          />
          {/* Scanning overlay effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent animate-pulse" />
          <div
            className="absolute left-0 right-0 h-1 bg-primary/80 shadow-lg shadow-primary/50"
            style={{
              top: `${progress}%`,
              transition: 'top 0.5s ease-out',
            }}
          />
          {/* Progress badge */}
          <Badge className="absolute bottom-3 right-3 bg-black/60 text-white">
            {Math.round(progress)}% analyzed
          </Badge>
        </div>

        {/* Progress bar */}
        <div className="max-w-lg mx-auto">
          <Progress value={progress} className="h-2" />
        </div>

        {/* Stage indicators */}
        <Card className="max-w-lg mx-auto">
          <CardContent className="py-4">
            <div className="space-y-3">
              {STAGES.map((s, index) => {
                const isComplete = index < currentStageIndex ||
                  (index === currentStageIndex && stage.includes('complete'));
                const isCurrent = index === currentStageIndex && !stage.includes('complete');
                const isPending = index > currentStageIndex;

                return (
                  <div
                    key={s.id}
                    className={cn(
                      'flex items-center gap-3 transition-opacity',
                      isPending && 'opacity-40'
                    )}
                  >
                    {isComplete ? (
                      <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                    ) : isCurrent ? (
                      <Loader2 className="h-5 w-5 text-primary shrink-0 animate-spin" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground shrink-0" />
                    )}
                    <span className={cn(
                      'text-sm',
                      isComplete && 'text-green-600 dark:text-green-400',
                      isCurrent && 'text-foreground font-medium',
                      isPending && 'text-muted-foreground'
                    )}>
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Live results preview */}
        {(board || circuits.length > 0) && (
          <Card className="max-w-lg mx-auto">
            <CardContent className="py-4 space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                Live Results
              </h3>

              {/* Board info */}
              {board && (
                <div className="p-3 rounded-lg bg-muted/50 space-y-1">
                  <p className="text-sm font-medium">
                    {board.brand} {board.model}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {board.main_switch_rating && (
                      <Badge variant="outline">{board.main_switch_rating}A Main</Badge>
                    )}
                    {board.spd_status && board.spd_status !== 'unknown' && (
                      <Badge variant="outline" className={cn(
                        board.spd_status === 'present' && 'border-green-500 text-green-600'
                      )}>
                        SPD: {board.spd_status}
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Circuits preview */}
              {circuits.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    {circuits.length} circuit{circuits.length !== 1 ? 's' : ''} detected
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {circuits.slice(0, 12).map((circuit) => (
                      <Badge
                        key={circuit.index}
                        variant="secondary"
                        className={cn(
                          'text-xs',
                          circuit.confidence === 'high' && 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
                          circuit.confidence === 'medium' && 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
                          circuit.confidence === 'low' && 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                        )}
                      >
                        C{circuit.index}
                        {circuit.device.rating_amps && ` ${circuit.device.rating_amps}A`}
                      </Badge>
                    ))}
                    {circuits.length > 12 && (
                      <Badge variant="outline" className="text-xs">
                        +{circuits.length - 12} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Warnings */}
        {warnings.length > 0 && (
          <Card className="max-w-lg mx-auto border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20">
            <CardContent className="py-3">
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
            </CardContent>
          </Card>
        )}
      </main>

      {/* Footer */}
      <footer className="p-4 border-t border-border">
        <Button
          variant="outline"
          onClick={onCancel}
          className="w-full"
        >
          Cancel Analysis
        </Button>
      </footer>
    </div>
  );
};

export default AnalyzingScreen;
