import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type RiskLevel = "low" | "medium" | "high";

interface RiskLevelSliderProps {
  value: RiskLevel;
  onChange: (level: RiskLevel) => void;
  error?: string;
}

const riskLevels: { id: RiskLevel; label: string; color: string }[] = [
  { id: "low", label: "Low", color: "emerald" },
  { id: "medium", label: "Medium", color: "amber" },
  { id: "high", label: "High", color: "red" },
];

const colorMap = {
  emerald: {
    bg: "bg-emerald-500",
    track: "bg-emerald-500/30",
    text: "text-emerald-400",
    border: "border-emerald-500/30",
    glow: "shadow-emerald-500/20",
  },
  amber: {
    bg: "bg-amber-500",
    track: "bg-amber-500/30",
    text: "text-amber-400",
    border: "border-amber-500/30",
    glow: "shadow-amber-500/20",
  },
  red: {
    bg: "bg-red-500",
    track: "bg-red-500/30",
    text: "text-red-400",
    border: "border-red-500/30",
    glow: "shadow-red-500/20",
  },
};

export function RiskLevelSlider({
  value,
  onChange,
  error,
}: RiskLevelSliderProps) {
  const currentIndex = riskLevels.findIndex((r) => r.id === value);
  const currentLevel = riskLevels[currentIndex];
  const colors = colorMap[currentLevel.color as keyof typeof colorMap];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-white/80">
          Risk Level
        </label>
        <motion.span
          key={value}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn("text-sm font-semibold", colors.text)}
        >
          {currentLevel.label}
        </motion.span>
      </div>

      {/* Slider Track */}
      <div className="relative h-14 flex items-center">
        {/* Background track */}
        <div className="absolute inset-x-0 h-2 rounded-full bg-white/10" />

        {/* Colored progress track */}
        <motion.div
          className={cn("absolute left-0 h-2 rounded-full", colors.bg)}
          initial={false}
          animate={{
            width: `${((currentIndex + 1) / riskLevels.length) * 100}%`,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />

        {/* Thumb buttons */}
        <div className="relative w-full flex justify-between px-0">
          {riskLevels.map((level, index) => {
            const isActive = level.id === value;
            const isPast = index <= currentIndex;
            const levelColors = colorMap[level.color as keyof typeof colorMap];

            return (
              <button
                key={level.id}
                type="button"
                onClick={() => onChange(level.id)}
                className={cn(
                  "relative flex flex-col items-center gap-2",
                  "touch-manipulation",
                  "focus:outline-none"
                )}
              >
                {/* Dot/Thumb */}
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className={cn(
                    "w-8 h-8 rounded-full border-2 transition-all",
                    "flex items-center justify-center",
                    isActive
                      ? cn(levelColors.bg, "border-white shadow-lg", levelColors.glow)
                      : isPast
                        ? cn(levelColors.bg, levelColors.border)
                        : "bg-white/10 border-white/20"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeRiskThumb"
                      className="w-3 h-3 bg-white rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.div>

                {/* Label */}
                <span
                  className={cn(
                    "text-xs font-medium",
                    isActive ? colors.text : "text-white/40"
                  )}
                >
                  {level.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Description */}
      <motion.div
        key={value}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "p-3 rounded-xl border",
          colors.track,
          colors.border
        )}
      >
        <p className={cn("text-sm", colors.text)}>
          {value === "low" && "Low risk - Standard precautions apply"}
          {value === "medium" && "Medium risk - Additional safety measures required"}
          {value === "high" && "High risk - Strict controls and supervision needed"}
        </p>
      </motion.div>

      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}
