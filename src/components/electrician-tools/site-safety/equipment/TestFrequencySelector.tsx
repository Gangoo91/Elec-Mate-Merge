import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type FrequencyOption = 90 | 180 | 365 | 730 | "custom";

interface FrequencyChoice {
  value: FrequencyOption;
  label: string;
  shortLabel: string;
}

const frequencies: FrequencyChoice[] = [
  { value: 90, label: "3 months", shortLabel: "3mo" },
  { value: 180, label: "6 months", shortLabel: "6mo" },
  { value: 365, label: "12 months", shortLabel: "12mo" },
  { value: 730, label: "24 months", shortLabel: "24mo" },
];

interface TestFrequencySelectorProps {
  value: number;
  onChange: (days: number) => void;
  error?: string;
}

export function TestFrequencySelector({
  value,
  onChange,
  error,
}: TestFrequencySelectorProps) {
  // Find if current value matches a preset
  const currentPreset = frequencies.find(f => f.value === value);

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-white/80">
        Test Frequency
      </label>

      <div className="flex p-1 bg-white/5 rounded-xl border border-white/10">
        {frequencies.map((freq) => {
          const isSelected = value === freq.value;
          return (
            <button
              key={freq.value}
              type="button"
              onClick={() => onChange(freq.value as number)}
              className={cn(
                "relative flex-1 px-2 py-2.5 rounded-lg",
                "text-sm font-medium text-center",
                "transition-colors duration-200",
                "touch-manipulation min-h-[44px]",
                isSelected ? "text-white" : "text-white/50 hover:text-white/70"
              )}
            >
              {isSelected && (
                <motion.div
                  layoutId="activeFrequencyBg"
                  className="absolute inset-0 bg-elec-yellow/20 border border-elec-yellow/30 rounded-lg"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{freq.shortLabel}</span>
            </button>
          );
        })}
      </div>

      {/* Display full label */}
      {currentPreset && (
        <p className="text-xs text-white/40 text-center">
          Equipment will be due for testing every {currentPreset.label}
        </p>
      )}

      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}
