import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Clock, XCircle, Loader2, CircuitBoard, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DesignProgress } from "@/hooks/useAIDesigner";

interface DesignProcessingViewDesktopProps {
  progress: DesignProgress | null;
  userRequest?: string;
  totalCircuits?: number;
  onCancel?: () => void;
  retryMessage?: string | null;
}

const STAGES = [
  { name: 'Preparing', icon: '⚡' },
  { name: 'Analysing', icon: '📋' },
  { name: 'Checking Regs', icon: '📚' },
  { name: 'Designing', icon: '🤖' },
  { name: 'Validating', icon: '✓' },
  { name: 'Complete', icon: '✨' }
];

const TIPS = [
  "BS 7671 requires appropriate overcurrent protection for all circuits",
  "Voltage drop: max 3% for lighting, 5% for other circuits",
  "RCDs mandatory for socket outlets ≤32A in domestic premises",
  "Zs must not exceed the max for the protective device"
];

export const DesignProcessingViewDesktop = ({
  progress,
  userRequest,
  totalCircuits = 0,
  onCancel,
  retryMessage
}: DesignProcessingViewDesktopProps) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime] = useState(Date.now());
  const [currentTip, setCurrentTip] = useState(0);
  const [showBurst, setShowBurst] = useState(false);
  const prevStageRef = useRef(0);

  const currentStage = Math.min(progress?.stage || 0, 6);
  const currentPercent = progress?.percent || 0;

  // Track stage changes for burst animation
  useEffect(() => {
    if (currentStage > prevStageRef.current) {
      setShowBurst(true);
      setTimeout(() => setShowBurst(false), 600);
    }
    prevStageRef.current = currentStage;
  }, [currentStage]);

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

  const estimatedCompleted = totalCircuits > 0
    ? Math.floor((currentPercent / 100) * totalCircuits)
    : 0;

  const EXPECTED_TOTAL_SECONDS = 240;
  const estimatedTimeRemaining = Math.max(0, EXPECTED_TOTAL_SECONDS - elapsedTime);

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
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-elec-yellow/5 blur-[100px]"
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Subtle Circuit Grid */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(47 100% 50%) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(47 100% 50%) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Main Content - Desktop optimized with max-w-xl */}
      <div className="relative z-10 flex-1 flex flex-col justify-evenly px-6 py-8 max-w-xl mx-auto w-full">

        {/* Header Section */}
        <div className="text-center space-y-4">
          {/* Animated Icon */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Floating Particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full bg-elec-yellow/40"
                  animate={{
                    scale: [0.5, 1, 0.5],
                    opacity: [0.2, 0.6, 0.2],
                  }}
                  transition={{
                    duration: 2 + i * 0.3,
                    repeat: Infinity,
                    delay: i * 0.4,
                  }}
                  style={{
                    top: `${36 + 50 * Math.sin((i * Math.PI * 2) / 6)}px`,
                    left: `${36 + 50 * Math.cos((i * Math.PI * 2) / 6)}px`,
                    transform: 'translate(-50%, -50%)'
                  }}
                />
              ))}

              {/* Stage Transition Burst Effect */}
              <AnimatePresence>
                {showBurst && (
                  <motion.div
                    initial={{ scale: 1, opacity: 0.8 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 rounded-full border-2 border-elec-yellow"
                    style={{ width: 72, height: 72 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                )}
              </AnimatePresence>

              <motion.div
                className="absolute inset-0 rounded-full border border-elec-yellow/20"
                style={{ width: 88, height: 88, margin: -8 }}
                animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border border-elec-yellow/10"
                style={{ width: 100, height: 100, margin: -14 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="w-[72px] h-[72px] rounded-full bg-elec-yellow/10 flex items-center justify-center"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Zap className="h-10 w-10 text-elec-yellow drop-shadow-[0_0_10px_rgba(247,208,44,0.4)]" />
                </motion.div>
              </motion.div>
              <motion.div
                className="absolute inset-0 rounded-full bg-elec-yellow/20"
                animate={{ scale: [1, 1.3], opacity: [0.3, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ width: 72, height: 72 }}
              />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white">AI Circuit Design</h2>
            <p className="text-sm text-white/50 mt-1">BS 7671 compliant installation</p>
          </div>
        </div>

        {/* Progress Section */}
        <div className="space-y-4">
          {/* Large Percentage */}
          <div className="text-center">
            <motion.span
              className="text-6xl font-bold text-elec-yellow tabular-nums"
              key={Math.round(currentPercent)}
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
            >
              {Math.round(currentPercent)}
            </motion.span>
            <span className="text-3xl font-bold text-elec-yellow/60">%</span>
          </div>

          {/* Progress Bar */}
          <div className="relative">
            <div className="h-3 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-elec-yellow/80 via-elec-yellow to-elec-yellow/80 rounded-full relative"
                style={{ width: `${currentPercent}%` }}
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
              className="absolute -bottom-1 left-0 h-4 bg-elec-yellow/20 blur-md rounded-full transition-all duration-300"
              style={{ width: `${currentPercent}%` }}
            />
          </div>

          {/* Stage Dots */}
          <div className="flex justify-center gap-2">
            {STAGES.map((stage, idx) => (
              <motion.div
                key={idx}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all duration-300",
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

          {/* Current Stage Name */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStage}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-center"
            >
              <span className="text-base font-medium text-white">
                {STAGES[currentStage]?.icon} {STAGES[currentStage]?.name}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Stats Row */}
        <div className="flex items-center justify-center gap-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Clock className="h-4 w-4 text-white/40" />
              <span className="text-xs text-white/40">Elapsed</span>
            </div>
            <p className="text-xl font-bold text-white tabular-nums">
              {formatTime(elapsedTime)}
            </p>
          </div>

          {totalCircuits > 0 && (
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <CircuitBoard className="h-4 w-4 text-white/40" />
                <span className="text-xs text-white/40">Circuits</span>
              </div>
              <p className="text-xl font-bold text-white">
                <span className="text-elec-yellow">{estimatedCompleted}</span>
                <span className="text-white/40">/{totalCircuits}</span>
              </p>
            </div>
          )}

          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Loader2 className="h-4 w-4 text-white/40 animate-spin" />
              <span className="text-xs text-white/40">Remaining</span>
            </div>
            <p className="text-xl font-bold text-white tabular-nums">
              ~{formatTime(estimatedTimeRemaining)}
            </p>
          </div>
        </div>

        {/* Tip Card */}
        <div className={cn(
          "p-4 rounded-xl",
          "bg-gradient-to-br from-amber-950/30 to-black/20 border border-amber-800/20"
        )}>
          <div className="flex items-start gap-3">
            <Sparkles className="h-4 w-4 text-elec-yellow shrink-0 mt-0.5" />
            <AnimatePresence mode="wait">
              <motion.p
                key={currentTip}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm text-white/50 leading-relaxed"
              >
                {TIPS[currentTip]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* Warning Messages */}
        {retryMessage && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20"
          >
            <p className="text-xs text-amber-200 text-center">{retryMessage}</p>
          </motion.div>
        )}

        {/* Cancel Button */}
        {onCancel && (
          <button
            onClick={onCancel}
            className="w-full py-3 text-sm text-white/40 hover:text-red-400 hover:bg-red-500/5 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <XCircle className="h-4 w-4" />
            Cancel Design
          </button>
        )}
      </div>
    </div>
  );
};
