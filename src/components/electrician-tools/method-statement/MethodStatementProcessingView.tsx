import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Clock, XCircle, Loader2, CheckCircle2, Shield, Zap, Search, FileCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MethodStatementProcessingViewProps {
  overallProgress: number;
  currentStep: string;
  elapsedTime: number;
  estimatedTimeRemaining: number;
  onCancel?: () => void;
  isCancelling?: boolean;
  jobDescription: string;
}

const STAGES = [
  { name: 'Init', icon: Zap, description: 'Setting up' },
  { name: 'Risks', icon: Shield, description: 'Analysing hazards' },
  { name: 'Regs', icon: Search, description: 'BS 7671 check' },
  { name: 'Build', icon: FileText, description: 'Creating steps' },
  { name: 'Check', icon: FileCheck, description: 'Quality review' },
  { name: 'Done', icon: CheckCircle2, description: 'Complete' }
];

export const MethodStatementProcessingView: React.FC<MethodStatementProcessingViewProps> = ({
  overallProgress,
  currentStep,
  elapsedTime,
  estimatedTimeRemaining,
  onCancel,
  isCancelling = false
}) => {
  const currentStageIndex = Math.min(
    Math.floor((overallProgress / 100) * (STAGES.length - 1)),
    STAGES.length - 1
  );

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentStage = STAGES[currentStageIndex];
  const CurrentIcon = currentStage.icon;

  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-background via-background to-emerald-950/10 flex flex-col">
      {/* Animated Background - Subtle for mobile performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full bg-emerald-500/5 blur-[80px]"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.4, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center px-5 py-8 max-w-sm mx-auto w-full">

        {/* Main Icon - Compact for mobile */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            {/* Pulsing ring */}
            <motion.div
              className="absolute inset-0 rounded-2xl border-2 border-emerald-500/20"
              style={{ width: 88, height: 88, margin: -8 }}
              animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            {/* Icon container */}
            <motion.div
              className="w-[72px] h-[72px] rounded-2xl bg-gradient-to-br from-emerald-500/30 to-emerald-600/20 border border-emerald-500/40 flex items-center justify-center shadow-lg shadow-emerald-500/20"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                key={currentStageIndex}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <CurrentIcon className="h-9 w-9 text-emerald-400" />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Title & Stage - Centered */}
        <div className="text-center space-y-1.5 mb-6">
          <h2 className="text-xl font-bold text-white">Generating Method Statement</h2>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStageIndex}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="flex items-center justify-center gap-2"
            >
              <span className="text-sm font-medium text-emerald-400">{currentStage.name}</span>
              <span className="text-sm text-white/40">·</span>
              <span className="text-sm text-white/50">{currentStage.description}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Section */}
        <div className="space-y-4 mb-6">
          {/* Progress Number */}
          <div className="text-center">
            <motion.span
              className="text-5xl font-black text-white tabular-nums"
              key={Math.round(overallProgress)}
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
            >
              {Math.round(overallProgress)}
            </motion.span>
            <span className="text-2xl font-bold text-emerald-400/60">%</span>
          </div>

          {/* Progress Bar */}
          <div className="relative">
            <div className="h-3 bg-white/5 rounded-full overflow-hidden border border-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500 rounded-full relative"
                style={{ width: `${overallProgress}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            </div>
            <div
              className="absolute -bottom-0.5 left-0 h-3 bg-emerald-500/30 blur-md rounded-full transition-all"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>

        {/* Stage Indicators - Compact horizontal */}
        <div className="flex justify-between items-center mb-6 px-2">
          {STAGES.map((stage, idx) => {
            const StageIcon = stage.icon;
            const isComplete = idx < currentStageIndex;
            const isCurrent = idx === currentStageIndex;
            return (
              <motion.div
                key={idx}
                className={cn(
                  "transition-all duration-300",
                  isComplete && "opacity-100",
                  isCurrent && "opacity-100",
                  !isComplete && !isCurrent && "opacity-30"
                )}
                animate={isCurrent ? { scale: [1, 1.15, 1] } : {}}
                transition={{ duration: 1, repeat: isCurrent ? Infinity : 0 }}
              >
                <div className={cn(
                  "w-9 h-9 rounded-xl flex items-center justify-center transition-all",
                  isComplete && "bg-emerald-500/30 text-emerald-400",
                  isCurrent && "bg-emerald-500/40 text-emerald-300 shadow-md shadow-emerald-500/30",
                  !isComplete && !isCurrent && "bg-white/5 text-white/30"
                )}>
                  {isComplete ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <StageIcon className="h-4 w-4" />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Time Stats - Compact row */}
        <div className="flex items-center justify-center gap-6 mb-6 p-3 rounded-xl bg-white/[0.03] border border-white/10">
          <div className="text-center">
            <p className="text-[10px] text-white/40 uppercase tracking-wide">Elapsed</p>
            <p className="text-lg font-bold text-white tabular-nums">
              {formatTime(elapsedTime)}
            </p>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="text-center">
            <p className="text-[10px] text-white/40 uppercase tracking-wide">Remaining</p>
            <p className="text-lg font-bold text-white tabular-nums">
              ~{formatTime(estimatedTimeRemaining)}
            </p>
          </div>
        </div>

        {/* Current Step Message */}
        {currentStep && (
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-4"
          >
            <p className="text-xs text-white/50 flex items-center justify-center gap-2">
              <Loader2 className="h-3 w-3 animate-spin text-emerald-400" />
              {currentStep}
            </p>
          </motion.div>
        )}

        {/* Overdue Warning */}
        {elapsedTime > 240 && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-4"
          >
            <p className="text-xs text-amber-300 text-center">
              Taking longer than usual. Complex jobs may take up to 5 minutes.
            </p>
          </motion.div>
        )}

        {/* Cancel Button - Touch friendly */}
        {onCancel && (
          <button
            onClick={onCancel}
            disabled={isCancelling}
            className="w-full h-12 text-sm text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 touch-manipulation active:scale-[0.98]"
          >
            {isCancelling ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Cancelling...
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4" />
                Cancel
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};
