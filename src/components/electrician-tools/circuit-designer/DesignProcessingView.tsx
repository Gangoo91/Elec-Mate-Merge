import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { DesignProgress } from '@/hooks/useAIDesigner';
import { Zap, Clock, CircuitBoard, XCircle, Sparkles } from 'lucide-react';
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
  { name: 'Initialising', description: 'Preparing design service', icon: '⚡' },
  { name: 'Analysing', description: 'Understanding requirements', icon: '📋' },
  { name: 'Regulations', description: 'Querying BS 7671 database', icon: '📚' },
  { name: 'Designing', description: 'AI circuit calculations', icon: '🤖' },
  { name: 'Validating', description: 'Compliance verification', icon: '✓' },
  { name: 'Finalising', description: 'Generating documentation', icon: '📄' },
  { name: 'Complete', description: 'Transferring to browser', icon: '✨' }
];

// Rotating tips during processing
const TIPS = [
  "BS 7671 requires all circuits to have appropriate overcurrent protection",
  "Voltage drop must not exceed 3% for lighting or 5% for other circuits",
  "RCDs are mandatory for socket outlets up to 32A in domestic premises",
  "Cable sizing considers current capacity, voltage drop, and fault current",
  "Earth fault loop impedance (Zs) must not exceed the maximum for the protective device",
  "Diversity factors reduce the design current for domestic installations",
  "Installation methods affect cable current-carrying capacity significantly"
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
    }, 8000);
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
  const isTakingLong = elapsedTime > 150;

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
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0a0a0f] to-black flex flex-col items-center justify-center px-4 py-8 pb-safe">
      {/* Animated Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-elec-yellow/5 blur-[100px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto space-y-8">
        {/* Animated Icon */}
        <div className="flex justify-center">
          <div className="relative">
            {/* Outer ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-elec-yellow/20"
              style={{ width: 120, height: 120, margin: -10 }}
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            {/* Middle ring */}
            <motion.div
              className="absolute inset-0 rounded-full border border-elec-yellow/30"
              style={{ width: 100, height: 100 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            {/* Inner glow */}
            <motion.div
              className="w-[100px] h-[100px] rounded-full bg-elec-yellow/10 flex items-center justify-center"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Zap className="h-12 w-12 text-elec-yellow drop-shadow-[0_0_15px_rgba(247,208,44,0.5)]" />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-white">
            Designing Your Installation
          </h1>
          <p className="text-sm text-white/50">
            BS 7671 compliant circuit design
          </p>
        </div>

        {/* Large Progress Percentage */}
        <div className="text-center">
          <motion.span
            className="text-6xl font-bold text-elec-yellow tabular-nums"
            key={Math.round(displayPercent)}
            initial={{ scale: 1.1, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {Math.round(displayPercent)}
          </motion.span>
          <span className="text-3xl font-bold text-elec-yellow/60">%</span>
        </div>

        {/* Premium Progress Bar */}
        <div className="relative">
          <div className="h-2 bg-white/5 rounded-full overflow-hidden backdrop-blur">
            <motion.div
              className="h-full bg-gradient-to-r from-elec-yellow/80 via-elec-yellow to-elec-yellow/80 rounded-full relative"
              style={{ width: `${displayPercent}%` }}
              transition={{ duration: 0.3 }}
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </div>
          {/* Glow under progress bar */}
          <div
            className="absolute -bottom-2 left-0 h-4 bg-elec-yellow/20 blur-md rounded-full transition-all duration-300"
            style={{ width: `${displayPercent}%` }}
          />
        </div>

        {/* Stage Indicator */}
        <div className="flex justify-center gap-1.5">
          {STAGES.map((_, idx) => (
            <motion.div
              key={idx}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                idx < currentStage
                  ? "bg-elec-yellow"
                  : idx === currentStage
                  ? "bg-elec-yellow shadow-[0_0_8px_rgba(247,208,44,0.8)]"
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-center space-y-1"
          >
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl">{STAGES[currentStage]?.icon}</span>
              <span className="text-lg font-semibold text-white">
                {STAGES[currentStage]?.name}
              </span>
            </div>
            <p className="text-sm text-white/50">
              {STAGES[currentStage]?.description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className={cn(
            "p-4 rounded-xl",
            "bg-white/5 backdrop-blur border border-white/10"
          )}>
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-white/40" />
              <span className="text-xs text-white/40">Elapsed</span>
            </div>
            <p className="text-xl font-bold text-white tabular-nums">
              {formatTime(elapsedTime)}
            </p>
          </div>

          {totalCircuits > 0 && (
            <div className={cn(
              "p-4 rounded-xl",
              "bg-white/5 backdrop-blur border border-white/10"
            )}>
              <div className="flex items-center gap-2 mb-2">
                <CircuitBoard className="h-4 w-4 text-white/40" />
                <span className="text-xs text-white/40">Circuits</span>
              </div>
              <p className="text-xl font-bold text-white">
                <span className="text-elec-yellow">{estimatedCompleted}</span>
                <span className="text-white/40">/{totalCircuits}</span>
              </p>
            </div>
          )}
        </div>

        {/* Estimated Time Remaining */}
        <div className="text-center">
          <p className="text-xs text-white/40">
            ~{formatTime(estimatedTimeRemaining)} remaining
          </p>
        </div>

        {/* Rotating Tips */}
        <div className={cn(
          "p-4 rounded-xl",
          "bg-white/5 backdrop-blur border border-white/10"
        )}>
          <div className="flex items-start gap-3">
            <Sparkles className="h-4 w-4 text-elec-yellow shrink-0 mt-0.5" />
            <AnimatePresence mode="wait">
              <motion.p
                key={currentTip}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-xs text-white/60 leading-relaxed"
              >
                {TIPS[currentTip]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* Taking Longer Message */}
        {(isProgressStalled || isTakingLong) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "p-3 rounded-xl",
              "bg-amber-500/10 border border-amber-500/20"
            )}
          >
            <p className="text-xs text-amber-200 text-center">
              Taking a bit longer than usual. Complex installations may take up to 5 minutes.
            </p>
          </motion.div>
        )}

        {/* Retry Message */}
        {retryMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "p-3 rounded-xl",
              "bg-amber-500/10 border border-amber-500/20"
            )}
          >
            <p className="text-xs text-amber-200 text-center">
              <span className="font-semibold">Recovery Mode:</span> {retryMessage}
            </p>
          </motion.div>
        )}

        {/* Cancel Button */}
        {onCancel && (
          <div className="pt-4">
            <Button
              variant="ghost"
              onClick={onCancel}
              className={cn(
                "w-full h-12 rounded-xl",
                "bg-white/5 border border-white/10",
                "hover:bg-red-500/10 hover:border-red-500/20",
                "text-white/60 hover:text-red-300",
                "transition-all duration-300",
                "touch-manipulation"
              )}
            >
              <XCircle className="h-4 w-4 mr-2" />
              Cancel Design
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
