import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wrench, Clock, XCircle, Loader2, Search, BarChart3, FileText, CheckCircle, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { InstallationProjectDetails } from '@/types/installation-method';

interface InstallationProcessingViewProps {
  originalQuery?: string;
  projectDetails?: InstallationProjectDetails;
  progress: {
    stage: 'initializing' | 'rag' | 'ai' | 'generation' | 'validation' | 'complete';
    message: string;
  } | null;
  startTime: number;
  onCancel?: () => void;
  isCancelling?: boolean;
  onQuickMode?: () => void;
  qualityMetrics?: {
    overallConfidence: number;
    ragDataQuality: 'excellent' | 'good' | 'fair' | 'poor';
    bs7671Coverage: number;
    practicalWorkCoverage: number;
    stage: 'initializing' | 'rag' | 'ai' | 'generation' | 'validation' | 'complete';
  };
}

const STAGES = [
  { label: 'Preparing', icon: Zap },
  { label: 'Researching', icon: Search },
  { label: 'Analysing', icon: BarChart3 },
  { label: 'Generating', icon: FileText },
  { label: 'Validating', icon: CheckCircle },
  { label: 'Complete', icon: Wrench },
];

// Map stages to percentage values
const progressMap: Record<string, number> = {
  initializing: 10,
  rag: 25,
  ai: 50,
  generation: 70,
  validation: 90,
  complete: 100,
};

const ESTIMATED_TIME = 240; // 4 minutes

export const InstallationProcessingView = ({
  progress: agentProgress,
  onCancel,
  isCancelling = false,
}: InstallationProcessingViewProps) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  const progressValue = agentProgress ? progressMap[agentProgress.stage] : 0;
  const remainingTime = Math.max(0, ESTIMATED_TIME - elapsedTime);
  const currentStage = Math.min(Math.floor((progressValue / 100) * (STAGES.length - 1)), STAGES.length - 1);
  const CurrentIcon = STAGES[currentStage]?.icon || Wrench;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-[100dvh] bg-background flex flex-col overflow-hidden">
      <div className="flex-1 flex flex-col justify-center px-6 max-w-sm mx-auto w-full">
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
              <h2 className="text-lg font-bold text-white">Generating Installation Method</h2>
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
                  strokeDashoffset={2 * Math.PI * 52 - (progressValue / 100) * 2 * Math.PI * 52}
                  transform="rotate(-90 60 60)"
                  transition={{ duration: 0.5 }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-white tabular-nums">
                  {Math.round(progressValue)}
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
                Taking longer than usual. Complex installations may take up to 6 minutes.
              </p>
            </motion.div>
          )}

          {/* Cancel */}
          {onCancel && (
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
          )}
        </div>
      </div>
    </div>
  );
};
