import { motion } from 'framer-motion';
import { Calculator, Sparkles } from 'lucide-react';

interface ProcessingRingProps {
  progress: number;
  estimatedCost?: number | null;
  showCostPreview?: boolean;
}

export function ProcessingRing({ progress, estimatedCost, showCostPreview = true }: ProcessingRingProps) {
  const size = 160;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="relative flex flex-col items-center"
    >
      {/* Glow effect behind ring */}
      <motion.div
        className="absolute w-40 h-40 rounded-full bg-elec-yellow/20 blur-2xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Progress Ring */}
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            className="stroke-white/10"
            fill="none"
          />

          {/* Progress circle with gradient */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            className="stroke-elec-yellow"
            fill="none"
            strokeLinecap="round"
            style={{
              strokeDasharray: circumference,
            }}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />

          {/* Animated glow on progress head */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth + 4}
            className="stroke-elec-yellow/30"
            fill="none"
            strokeLinecap="round"
            style={{
              strokeDasharray: `${strokeWidth} ${circumference}`,
            }}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            className="relative"
            animate={{ rotate: progress < 100 ? [0, 360] : 0 }}
            transition={{ duration: 8, repeat: progress < 100 ? Infinity : 0, ease: "linear" }}
          >
            <div className="p-3 rounded-xl bg-gradient-to-br from-elec-yellow/30 to-amber-500/20 border border-elec-yellow/30">
              <Calculator className="h-6 w-6 text-elec-yellow" />
            </div>
            {progress < 100 && (
              <motion.div
                className="absolute -top-1 -right-1"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Sparkles className="h-3 w-3 text-elec-yellow" />
              </motion.div>
            )}
          </motion.div>

          <motion.span
            key={Math.floor(progress)}
            initial={{ scale: 1.1, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-3xl font-bold text-elec-yellow tabular-nums mt-2"
          >
            {Math.round(progress)}%
          </motion.span>
        </div>
      </div>

      {/* Estimated cost preview */}
      {showCostPreview && estimatedCost !== undefined && estimatedCost !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center"
        >
          <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Estimated Quote</p>
          <motion.div
            key={estimatedCost}
            initial={{ scale: 1.05, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-2xl font-bold text-white"
          >
            £{estimatedCost.toLocaleString()}
          </motion.div>
          <p className="text-white/30 text-xs mt-1">Building...</p>
        </motion.div>
      )}
    </motion.div>
  );
}
