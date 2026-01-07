import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { IOSInput } from "@/components/ui/ios-input";

interface Hazard {
  id: string;
  label: string;
  icon: string;
  color: string;
}

const defaultHazards: Hazard[] = [
  { id: "electrical", label: "Electrical", icon: "zap", color: "yellow" },
  { id: "fire", label: "Fire", icon: "flame", color: "red" },
  { id: "heights", label: "Heights", icon: "arrow-up", color: "purple" },
  { id: "falling-objects", label: "Falling Objects", icon: "hard-hat", color: "amber" },
  { id: "confined-space", label: "Confined Space", icon: "minimize", color: "blue" },
  { id: "manual-handling", label: "Manual Handling", icon: "package", color: "green" },
  { id: "hazardous-substances", label: "Hazardous Subs", icon: "flask", color: "pink" },
  { id: "noise", label: "Noise", icon: "volume-2", color: "orange" },
  { id: "wet-slippery", label: "Wet/Slippery", icon: "droplet", color: "cyan" },
  { id: "vehicles", label: "Vehicles", icon: "truck", color: "gray" },
  { id: "machinery", label: "Machinery", icon: "cog", color: "slate" },
  { id: "asbestos", label: "Asbestos", icon: "alert-octagon", color: "rose" },
];

const colorMap: Record<string, { bg: string; border: string; text: string }> = {
  yellow: { bg: "bg-elec-yellow/20", border: "border-elec-yellow/30", text: "text-elec-yellow" },
  red: { bg: "bg-red-500/20", border: "border-red-500/30", text: "text-red-400" },
  purple: { bg: "bg-purple-500/20", border: "border-purple-500/30", text: "text-purple-400" },
  amber: { bg: "bg-amber-500/20", border: "border-amber-500/30", text: "text-amber-400" },
  blue: { bg: "bg-blue-500/20", border: "border-blue-500/30", text: "text-blue-400" },
  green: { bg: "bg-emerald-500/20", border: "border-emerald-500/30", text: "text-emerald-400" },
  pink: { bg: "bg-pink-500/20", border: "border-pink-500/30", text: "text-pink-400" },
  orange: { bg: "bg-orange-500/20", border: "border-orange-500/30", text: "text-orange-400" },
  cyan: { bg: "bg-cyan-500/20", border: "border-cyan-500/30", text: "text-cyan-400" },
  gray: { bg: "bg-gray-500/20", border: "border-gray-500/30", text: "text-gray-400" },
  slate: { bg: "bg-slate-500/20", border: "border-slate-500/30", text: "text-slate-400" },
  rose: { bg: "bg-rose-500/20", border: "border-rose-500/30", text: "text-rose-400" },
};

interface HazardPillSelectorProps {
  value: string[];
  onChange: (hazards: string[]) => void;
  error?: string;
}

export function HazardPillSelector({
  value,
  onChange,
  error,
}: HazardPillSelectorProps) {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customHazard, setCustomHazard] = useState("");
  const [customHazards, setCustomHazards] = useState<Hazard[]>([]);

  const allHazards = [...defaultHazards, ...customHazards];

  const toggleHazard = (hazardId: string) => {
    if (value.includes(hazardId)) {
      onChange(value.filter((id) => id !== hazardId));
    } else {
      onChange([...value, hazardId]);
    }
  };

  const addCustomHazard = () => {
    if (customHazard.trim()) {
      const id = `custom-${customHazard.toLowerCase().replace(/\s+/g, "-")}`;
      const newHazard: Hazard = {
        id,
        label: customHazard.trim(),
        icon: "alert-triangle",
        color: "gray",
      };
      setCustomHazards([...customHazards, newHazard]);
      onChange([...value, id]);
      setCustomHazard("");
      setShowCustomInput(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-white/80">
          Select applicable hazards
        </label>
        <span className="text-xs text-white/50">
          {value.length} selected
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {allHazards.map((hazard, index) => {
          const isSelected = value.includes(hazard.id);
          const colors = colorMap[hazard.color] || colorMap.gray;

          return (
            <motion.button
              key={hazard.id}
              type="button"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleHazard(hazard.id)}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-2 rounded-full",
                "text-sm font-medium border transition-all duration-200",
                "touch-manipulation min-h-[44px]",
                isSelected
                  ? cn(colors.bg, colors.border, colors.text)
                  : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
              )}
            >
              <AnimatePresence mode="wait">
                {isSelected && (
                  <motion.span
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "auto", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <Check className="h-3.5 w-3.5" />
                  </motion.span>
                )}
              </AnimatePresence>
              {hazard.label}
            </motion.button>
          );
        })}

        {/* Add Custom Button */}
        {!showCustomInput && (
          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCustomInput(true)}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-2 rounded-full",
              "text-sm font-medium border border-dashed",
              "border-white/20 text-white/50 hover:bg-white/5",
              "touch-manipulation min-h-[44px]"
            )}
          >
            <Plus className="h-3.5 w-3.5" />
            Custom
          </motion.button>
        )}
      </div>

      {/* Custom hazard input */}
      <AnimatePresence>
        {showCustomInput && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="flex gap-2 mt-2">
              <div className="flex-1">
                <IOSInput
                  placeholder="Enter custom hazard"
                  value={customHazard}
                  onChange={(e) => setCustomHazard(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addCustomHazard();
                    }
                  }}
                />
              </div>
              <Button
                type="button"
                onClick={addCustomHazard}
                disabled={!customHazard.trim()}
                className="h-[50px] px-4 bg-elec-yellow text-black hover:bg-elec-yellow/90"
              >
                Add
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setShowCustomInput(false);
                  setCustomHazard("");
                }}
                className="h-[50px] px-3 text-white/50 hover:text-white hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}

export { defaultHazards };
