import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { DesignProgress } from '@/hooks/useAIDesigner';
import { Zap, Clock, CircuitBoard, XCircle, Sparkles, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DesignProcessingViewProps {
  progress: DesignProgress | null;
  retryMessage?: string | null;
  onCancel?: () => void;
  userRequest?: string;
  totalCircuits?: number;
}

// Stage configuration
const STAGES = [
  { name: 'Init', icon: '⚡' },
  { name: 'Analyse', icon: '📋' },
  { name: 'Regs', icon: '📚' },
  { name: 'Design', icon: '🤖' },
  { name: 'Validate', icon: '✓' },
  { name: 'Finalise', icon: '📄' },
  { name: 'Done', icon: '✨' }
];

// Rotating tips during processing
const TIPS = [
  "BS 7671 requires appropriate overcurrent protection for all circuits",
  "Voltage drop: max 3% for lighting, 5% for other circuits",
  "RCDs mandatory for socket outlets ≤32A in domestic premises",
  "Zs must not exceed the max for the protective device"
];

export const DesignProcessingView = ({
  progress,
  retryMessage,
  onCancel,
  userRequest,
  totalCircuits = 0
}: DesignProcessingViewProps) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime] = useState(Date.now());
  const [displayPercent, setDisplayPercent] = useState(0);
  const [lastProgressChange, setLastProgressChange] = useState(Date.now());
  const [currentTip, setCurrentTip] = useState(0);
  const lastProgressRef = useRef(0);

  const currentStage = Math.min(progress?.stage || 0, 6);
  const currentPercent = progress?.percent || 0;

  // Track elapsed time
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  // Rotate tips
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip(prev => (prev + 1) % TIPS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Track progress changes
  useEffect(() => {
    if (currentPercent !== lastProgressRef.current) {
      lastProgressRef.current = currentPercent;
      setLastProgressChange(Date.now());
    }
  }, [currentPercent]);

  // Smooth progress animation
  useEffect(() => {
    const diff = currentPercent - displayPercent;
    if (Math.abs(diff) > 0) {
      const increment = diff / 20;
      const interval = setInterval(() => {
        setDisplayPercent(prev => {
          const next = prev + increment;
          if (Math.abs(currentPercent - next) < Math.abs(increment)) {
            clearInterval(interval);
            return currentPercent;
          }
          return next;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [currentPercent, displayPercent]);

  const secondsSinceProgressChange = Math.floor((Date.now() - lastProgressChange) / 1000);
  const isProgressStalled = secondsSinceProgressChange > 30 && elapsedTime > 90;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}:${secs.toString().padStart(2, '0')}` : `0:${secs.toString().padStart(2, '0')}`;
  };

  const estimatedCompleted = totalCircuits > 0
    ? Math.floor((currentPercent / 100) * totalCircuits)
    : 0;

  const EXPECTED_TOTAL_SECONDS = 240;
  const estimatedTimeRemaining = Math.max(0, EXPECTED_TOTAL_SECONDS - elapsedTime);

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

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-evenly px-4 py-6 max-w-md mx-auto w-full">

        {/* Header Section */}
        <div className="text-center space-y-3">
          {/* Animated Icon */}
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
                  <Zap className="h-8 w-8 text-elec-yellow drop-shadow-[0_0_10px_rgba(247,208,44,0.4)]" />
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
            <h2 className="text-xl font-bold text-white">Designing Installation</h2>
            <p className="text-xs text-white/50 mt-1">BS 7671 compliant</p>
          </div>
        </div>

        {/* Progress Section */}
        <div className="space-y-3">
          {/* Large Percentage */}
          <div className="text-center">
            <motion.span
              className="text-5xl font-bold text-elec-yellow tabular-nums"
              key={Math.round(displayPercent)}
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
            >
              {Math.round(displayPercent)}
            </motion.span>
            <span className="text-2xl font-bold text-elec-yellow/60">%</span>
          </div>

          {/* Progress Bar */}
          <div className="relative">
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-elec-yellow/80 via-elec-yellow to-elec-yellow/80 rounded-full relative"
                style={{ width: `${displayPercent}%` }}
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
              style={{ width: `${displayPercent}%` }}
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

          {/* Current Stage Name */}
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

          {totalCircuits > 0 && (
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <CircuitBoard className="h-3 w-3 text-white/40" />
                <span className="text-[10px] text-white/40">Circuits</span>
              </div>
              <p className="text-lg font-bold text-white">
                <span className="text-elec-yellow">{estimatedCompleted}</span>
                <span className="text-white/40">/{totalCircuits}</span>
              </p>
            </div>
          )}

          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Loader2 className="h-3 w-3 text-white/40 animate-spin" />
              <span className="text-[10px] text-white/40">Remaining</span>
            </div>
            <p className="text-lg font-bold text-white tabular-nums">
              ~{formatTime(estimatedTimeRemaining)}
            </p>
          </div>
        </div>

        {/* Tip Card - Compact */}
        <div className={cn(
          "p-3 rounded-xl",
          "bg-white/5 border border-white/10"
        )}>
          <div className="flex items-start gap-2">
            <Sparkles className="h-3 w-3 text-elec-yellow shrink-0 mt-0.5" />
            <AnimatePresence mode="wait">
              <motion.p
                key={currentTip}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-[11px] text-white/50 leading-relaxed"
              >
                {TIPS[currentTip]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* Warning Messages */}
        {(isProgressStalled || retryMessage) && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20"
          >
            <p className="text-[10px] text-amber-200 text-center">
              {retryMessage || "Taking longer than usual. Complex installations may take up to 5 minutes."}
            </p>
          </motion.div>
        )}

        {/* Cancel Button */}
        {onCancel && (
          <button
            onClick={onCancel}
            className="w-full py-3 text-xs text-white/40 hover:text-red-400 hover:bg-red-500/5 rounded-xl transition-all flex items-center justify-center gap-1.5"
          >
            <XCircle className="h-3 h-3" />
            Cancel Design
          </button>
        )}
      </div>
    </div>
  );
};
