import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wrench, Clock, XCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { InstallationProjectDetails } from "@/types/installation-method";

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
  { name: 'Init', icon: '⚡' },
  { name: 'Search', icon: '🔍' },
  { name: 'Analyse', icon: '📊' },
  { name: 'Generate', icon: '🔧' },
  { name: 'Validate', icon: '✓' },
  { name: 'Done', icon: '✨' }
];

// Map stages to percentage values
const progressMap: Record<string, number> = {
  'initializing': 10,
  'rag': 25,
  'ai': 50,
  'generation': 70,
  'validation': 90,
  'complete': 100
};

const ESTIMATED_TIME = 240; // 4 minutes

export const InstallationProcessingView = ({
  progress: agentProgress,
  onCancel,
  isCancelling = false
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
  const currentStage = Math.floor((progressValue / 100) * (STAGES.length - 1));

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-[100dvh] bg-gradient-to-b from-black via-[#0a0a0f] to-black flex flex-col overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-elec-yellow/5 blur-[80px]"
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-evenly px-4 py-6 max-w-md mx-auto w-full">

        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <div className="relative">
              <motion.div
                className="absolute inset-0 rounded-full border border-elec-yellow/20"
                style={{ width: 72, height: 72, margin: -6 }}
                animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border border-elec-yellow/10"
                style={{ width: 84, height: 84, margin: -12 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="w-[60px] h-[60px] rounded-full bg-elec-yellow/10 flex items-center justify-center"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Wrench className="h-8 w-8 text-elec-yellow drop-shadow-[0_0_10px_rgba(247,208,44,0.4)]" />
                </motion.div>
              </motion.div>
              <motion.div
                className="absolute inset-0 rounded-full bg-elec-yellow/20"
                animate={{ scale: [1, 1.3], opacity: [0.3, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ width: 60, height: 60 }}
              />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Generating Installation Method</h2>
            <p className="text-xs text-white/50 mt-1">Analysing BS 7671 requirements</p>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-3">
          <div className="text-center">
            <motion.span
              className="text-5xl font-bold text-elec-yellow tabular-nums"
              key={Math.round(progressValue)}
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
            >
              {Math.round(progressValue)}
            </motion.span>
            <span className="text-2xl font-bold text-elec-yellow/60">%</span>
          </div>

          <div className="relative">
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-elec-yellow/80 via-elec-yellow to-elec-yellow/80 rounded-full relative"
                style={{ width: `${progressValue}%` }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            </div>
            <div
              className="absolute -bottom-1 left-0 h-3 bg-elec-yellow/20 blur-md rounded-full transition-all duration-300"
              style={{ width: `${progressValue}%` }}
            />
          </div>

          {/* Stage Dots */}
          <div className="flex justify-center gap-1.5">
            {STAGES.map((stage, idx) => (
              <motion.div
                key={idx}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  idx < currentStage
                    ? "bg-elec-yellow"
                    : idx === currentStage
                    ? "bg-elec-yellow shadow-[0_0_6px_rgba(247,208,44,0.8)]"
                    : "bg-white/10"
                )}
                animate={idx === currentStage ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 1, repeat: Infinity }}
              />
            ))}
          </div>

          {/* Current Stage */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStage}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-center"
            >
              <span className="text-sm font-medium text-white">
                {STAGES[currentStage]?.icon} {STAGES[currentStage]?.name}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Stats Row */}
        <div className="flex items-center justify-center gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Clock className="h-3 w-3 text-white/40" />
              <span className="text-[10px] text-white/40">Elapsed</span>
            </div>
            <p className="text-lg font-bold text-white tabular-nums">
              {formatTime(elapsedTime)}
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Loader2 className="h-3 w-3 text-white/40 animate-spin" />
              <span className="text-[10px] text-white/40">Remaining</span>
            </div>
            <p className="text-lg font-bold text-white tabular-nums">
              ~{formatTime(remainingTime)}
            </p>
          </div>
        </div>

        {/* Overdue Warning */}
        {elapsedTime > ESTIMATED_TIME && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20"
          >
            <p className="text-[10px] text-amber-200 text-center">
              Taking longer than usual. Complex installations may take up to 6 minutes.
            </p>
          </motion.div>
        )}

        {/* Cancel Button */}
        {onCancel && (
          <button
            onClick={onCancel}
            disabled={isCancelling}
            className="w-full py-3 text-xs text-white/40 hover:text-red-400 hover:bg-red-500/5 rounded-xl transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
          >
            {isCancelling ? (
              <><Loader2 className="w-3 h-3 animate-spin" /> Cancelling...</>
            ) : (
              <><XCircle className="w-3 h-3" /> Cancel</>
            )}
          </button>
        )}
      </div>
    </div>
  );
};
