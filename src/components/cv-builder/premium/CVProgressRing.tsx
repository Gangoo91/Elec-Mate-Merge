/**
 * CVProgressRing - Animated circular progress indicator
 * Shows CV completion percentage with spring animation
 */

import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { Check, Sparkles } from "lucide-react";
import { progressSpringConfig } from "./animations/variants";

interface CVProgressRingProps {
  progress: number; // 0-100
  size?: number;
  strokeWidth?: number;
  showPercentage?: boolean;
  showCelebration?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const CVProgressRing = ({
  progress,
  size = 120,
  strokeWidth = 8,
  showPercentage = true,
  showCelebration = true,
  className,
  children,
}: CVProgressRingProps) => {
  const [displayProgress, setDisplayProgress] = useState(0);
  const [showComplete, setShowComplete] = useState(false);

  // Calculate SVG parameters
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  // Spring animation for progress
  const springProgress = useSpring(0, progressSpringConfig);
  const strokeDashoffset = useTransform(
    springProgress,
    [0, 100],
    [circumference, 0]
  );

  // Update spring value when progress changes
  useEffect(() => {
    springProgress.set(progress);
  }, [progress, springProgress]);

  // Subscribe to spring value for display
  useEffect(() => {
    const unsubscribe = springProgress.on("change", (value) => {
      setDisplayProgress(Math.round(value));
    });
    return unsubscribe;
  }, [springProgress]);

  // Show celebration when complete
  useEffect(() => {
    if (progress >= 100 && showCelebration) {
      setShowComplete(true);
    } else {
      setShowComplete(false);
    }
  }, [progress, showCelebration]);

  // Get color based on progress
  const getProgressColor = () => {
    if (progress >= 100) return "stroke-emerald-500";
    if (progress >= 75) return "stroke-blue-500";
    if (progress >= 50) return "stroke-cyan-500";
    if (progress >= 25) return "stroke-amber-500";
    return "stroke-white/30";
  };

  const getTextColor = () => {
    if (progress >= 100) return "text-emerald-400";
    if (progress >= 75) return "text-blue-400";
    if (progress >= 50) return "text-cyan-400";
    if (progress >= 25) return "text-amber-400";
    return "text-white/60";
  };

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      {/* Background ring */}
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-white/10"
        />

        {/* Progress */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className={cn("transition-colors duration-500", getProgressColor())}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset,
          }}
        />

        {/* Glow effect for high progress */}
        {progress >= 75 && (
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth + 4}
            strokeLinecap="round"
            className={cn(
              "opacity-30 blur-sm",
              progress >= 100 ? "stroke-emerald-500" : "stroke-blue-500"
            )}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset,
            }}
          />
        )}
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {showComplete ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="flex flex-col items-center"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center mb-1">
              <Check className="h-6 w-6 text-emerald-400" />
            </div>
            <span className="text-xs font-medium text-emerald-400">Complete!</span>
          </motion.div>
        ) : showPercentage ? (
          <div className="flex flex-col items-center">
            <motion.span
              className={cn("text-2xl font-bold", getTextColor())}
              key={displayProgress}
            >
              {displayProgress}%
            </motion.span>
            {children || (
              <span className="text-xs text-white/50 mt-0.5">Complete</span>
            )}
          </div>
        ) : (
          children
        )}
      </div>

      {/* Celebration sparkles */}
      {showComplete && showCelebration && (
        <>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute -top-2 -right-2"
          >
            <Sparkles className="h-5 w-5 text-amber-400" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute -bottom-1 -left-1"
          >
            <Sparkles className="h-4 w-4 text-emerald-400" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="absolute top-0 -left-2"
          >
            <Sparkles className="h-3 w-3 text-blue-400" />
          </motion.div>
        </>
      )}
    </div>
  );
};

// Mini version for inline use
export const MiniProgressRing = ({
  progress,
  size = 32,
  className,
}: {
  progress: number;
  size?: number;
  className?: string;
}) => {
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg
      width={size}
      height={size}
      className={cn("transform -rotate-90", className)}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className="text-white/10"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className={cn(
          "transition-all duration-500",
          progress >= 100 ? "text-emerald-500" : "text-blue-500"
        )}
      />
    </svg>
  );
};

export default CVProgressRing;
