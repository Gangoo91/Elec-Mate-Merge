import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Clock, XCircle, Loader2, AlertCircle, RefreshCw, Search, BarChart3, FileText, CheckCircle, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface HealthSafetyProcessingViewProps {
  progress: number;
  currentStep: string;
  onCancel: () => void;
  isCancelling?: boolean;
  status?: 'processing' | 'failed';
  error?: string | null;
  onRetry?: () => void;
}

const STAGES = [
  { label: 'Preparing', icon: Zap },
  { label: 'Researching', icon: Search },
  { label: 'Analysing', icon: BarChart3 },
  { label: 'Generating', icon: FileText },
  { label: 'Validating', icon: CheckCircle },
  { label: 'Complete', icon: Shield },
];

const ESTIMATED_TIME = 180;

export const HealthSafetyProcessingView = ({
  progress,
  currentStep,
  onCancel,
  isCancelling = false,
  status = 'processing',
  error,
  onRetry,
}: HealthSafetyProcessingViewProps) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  const remainingTime = Math.max(0, ESTIMATED_TIME - elapsedTime);
  const currentStage = Math.min(Math.floor((progress / 100) * (STAGES.length - 1)), STAGES.length - 1);
  const CurrentIcon = STAGES[currentStage]?.icon || Shield;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-[100dvh] bg-background flex flex-col overflow-hidden">
      <div className="flex-1 flex flex-col justify-center px-6 max-w-sm mx-auto w-full">
        {/* Error State */}
        {status === 'failed' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center space-y-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
              <AlertCircle className="h-8 w-8 text-red-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Generation Failed</h3>
              <p className="text-sm text-white">
                {error || 'An unexpected error occurred. Please try again.'}
              </p>
            </div>
            <div className="flex gap-3 w-full">
              {onRetry && (
                <Button
                  onClick={onRetry}
                  className="flex-1 h-12 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold touch-manipulation active:scale-[0.98]"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
              )}
              <Button
                onClick={onCancel}
                variant="ghost"
                className="flex-1 h-12 rounded-xl text-white hover:text-white hover:bg-white/10 touch-manipulation"
              >
                Cancel
              </Button>
            </div>
          </motion.div>
        )}

        {/* Processing State */}
        {status !== 'failed' && (
          <div className="space-y-8">
            {/* Icon + Title */}
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <motion.div
                  className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <CurrentIcon className="h-7 w-7 text-emerald-400" />
                </motion.div>
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Generating Safety Assessment</h2>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentStage}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="text-sm text-white mt-1"
                  >
                    {STAGES[currentStage]?.label}...
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            {/* Progress Ring + Percentage */}
            <div className="flex justify-center">
              <div className="relative">
                <svg width="120" height="120" viewBox="0 0 120 120">
                  {/* Track */}
                  <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
                  {/* Progress */}
                  <motion.circle
                    cx="60" cy="60" r="52" fill="none"
                    stroke="#22c55e"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 52}
                    strokeDashoffset={2 * Math.PI * 52 - (progress / 100) * 2 * Math.PI * 52}
                    transform="rotate(-90 60 60)"
                    transition={{ duration: 0.5 }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-white tabular-nums">
                    {Math.round(progress)}
                  </span>
                  <span className="text-xs text-white">%</span>
                </div>
              </div>
            </div>

            {/* Stage Steps */}
            <div className="flex items-center justify-between px-2">
              {STAGES.map((stage, idx) => {
                const StageIcon = stage.icon;
                const isComplete = idx < currentStage;
                const isCurrent = idx === currentStage;
                return (
                  <div key={idx} className="flex flex-col items-center gap-1.5">
                    <div
                      className={cn(
                        'w-8 h-8 rounded-lg flex items-center justify-center transition-all',
                        isComplete ? 'bg-emerald-500/20 text-emerald-400' :
                        isCurrent ? 'bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30' :
                        'bg-white/[0.04] text-white/30'
                      )}
                    >
                      <StageIcon className="h-3.5 w-3.5" />
                    </div>
                    <span className={cn(
                      'text-[9px] font-medium',
                      isComplete || isCurrent ? 'text-white' : 'text-white/30'
                    )}>
                      {stage.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Time Stats */}
            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <Clock className="h-3 w-3 text-white" />
                  <span className="text-[10px] text-white font-medium">Elapsed</span>
                </div>
                <p className="text-lg font-bold text-white tabular-nums">
                  {formatTime(elapsedTime)}
                </p>
              </div>
              <div className="w-px h-8 bg-white/[0.08]" />
              <div className="text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <Loader2 className="h-3 w-3 text-white animate-spin" />
                  <span className="text-[10px] text-white font-medium">Remaining</span>
                </div>
                <p className="text-lg font-bold text-white tabular-nums">
                  ~{formatTime(remainingTime)}
                </p>
              </div>
            </div>

            {/* Overdue Warning */}
            {elapsedTime > ESTIMATED_TIME && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl bg-amber-500/10 border border-amber-500/20 px-4 py-2.5"
              >
                <p className="text-[11px] text-white text-center">
                  Taking longer than usual. Complex assessments may take up to 5 minutes.
                </p>
              </motion.div>
            )}

            {/* Cancel */}
            <button
              onClick={onCancel}
              disabled={isCancelling}
              className="w-full h-11 rounded-xl text-sm text-white bg-white/[0.04] ring-1 ring-white/[0.08] flex items-center justify-center gap-2 touch-manipulation active:scale-[0.98] active:bg-white/[0.08] transition-all disabled:opacity-50"
            >
              {isCancelling ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Cancelling...
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4" /> Cancel
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
