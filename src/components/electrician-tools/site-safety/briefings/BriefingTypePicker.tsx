import { motion } from "framer-motion";
import {
  HardHat,
  Zap,
  Wrench,
  Flame,
  ArrowUp,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type BriefingType =
  | "site-induction"
  | "electrical"
  | "toolbox-talk"
  | "hot-works"
  | "height-work"
  | "custom";

interface BriefingTypeOption {
  id: BriefingType;
  label: string;
  description: string;
  icon: typeof HardHat;
  color: string;
}

const briefingTypes: BriefingTypeOption[] = [
  {
    id: "site-induction",
    label: "Induction",
    description: "Site induction briefing",
    icon: HardHat,
    color: "from-amber-500/20 to-amber-500/5 border-amber-500/30 text-amber-400",
  },
  {
    id: "electrical",
    label: "Electrical",
    description: "Electrical safety briefing",
    icon: Zap,
    color: "from-elec-yellow/20 to-elec-yellow/5 border-elec-yellow/30 text-elec-yellow",
  },
  {
    id: "toolbox-talk",
    label: "Toolbox",
    description: "Daily toolbox talk",
    icon: Wrench,
    color: "from-blue-500/20 to-blue-500/5 border-blue-500/30 text-blue-400",
  },
  {
    id: "hot-works",
    label: "Hot Works",
    description: "Hot works permit briefing",
    icon: Flame,
    color: "from-red-500/20 to-red-500/5 border-red-500/30 text-red-400",
  },
  {
    id: "height-work",
    label: "Heights",
    description: "Working at heights",
    icon: ArrowUp,
    color: "from-purple-500/20 to-purple-500/5 border-purple-500/30 text-purple-400",
  },
  {
    id: "custom",
    label: "Custom",
    description: "Create your own",
    icon: Settings,
    color: "from-white/10 to-white/5 border-white/20 text-white",
  },
];

interface BriefingTypePickerProps {
  value?: BriefingType;
  onChange: (type: BriefingType) => void;
  error?: string;
}

export function BriefingTypePicker({
  value,
  onChange,
  error,
}: BriefingTypePickerProps) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-white">
        Select Briefing Type
      </label>

      <div className="grid grid-cols-3 gap-2.5">
        {briefingTypes.map((type, index) => {
          const isSelected = value === type.id;
          const Icon = type.icon;

          return (
            <motion.button
              key={type.id}
              type="button"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onChange(type.id)}
              className={cn(
                "relative flex flex-col items-center justify-center p-4",
                "rounded-xl border transition-all duration-200",
                "touch-manipulation min-h-[88px]",
                "active:scale-95",
                isSelected
                  ? cn("bg-gradient-to-br", type.color)
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              )}
            >
              {isSelected && (
                <motion.div
                  layoutId="selectedType"
                  className="absolute inset-0 rounded-xl ring-2 ring-elec-yellow"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Icon
                className={cn(
                  "h-6 w-6 mb-1.5",
                  isSelected ? "" : "text-white"
                )}
              />
              <span
                className={cn(
                  "text-sm font-medium",
                  isSelected ? "text-white" : "text-white"
                )}
              >
                {type.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      {error && (
        <p className="text-sm text-red-400 mt-1">{error}</p>
      )}
    </div>
  );
}

export { briefingTypes };
