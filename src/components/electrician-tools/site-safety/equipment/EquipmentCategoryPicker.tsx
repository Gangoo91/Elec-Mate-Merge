import { motion } from "framer-motion";
import {
  Plug,
  Zap,
  ArrowUpDown,
  Wrench,
  Shield,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type EquipmentCategory =
  | "pat-tester"
  | "test-equipment"
  | "ladders"
  | "power-tools"
  | "ppe"
  | "other";

interface CategoryOption {
  id: EquipmentCategory;
  label: string;
  icon: typeof Plug;
  color: string;
  bgColor: string;
  borderColor: string;
}

export const equipmentCategories: CategoryOption[] = [
  {
    id: "pat-tester",
    label: "PAT Tester",
    icon: Plug,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
  },
  {
    id: "test-equipment",
    label: "Test Equipment",
    icon: Zap,
    color: "text-elec-yellow",
    bgColor: "bg-elec-yellow/10",
    borderColor: "border-elec-yellow/30",
  },
  {
    id: "ladders",
    label: "Ladders",
    icon: ArrowUpDown,
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/30",
  },
  {
    id: "power-tools",
    label: "Power Tools",
    icon: Wrench,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
  },
  {
    id: "ppe",
    label: "PPE",
    icon: Shield,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
  },
  {
    id: "other",
    label: "Other",
    icon: Settings,
    color: "text-gray-400",
    bgColor: "bg-gray-500/10",
    borderColor: "border-gray-500/30",
  },
];

interface EquipmentCategoryPickerProps {
  value: EquipmentCategory | null;
  onChange: (category: EquipmentCategory) => void;
  error?: string;
}

export function EquipmentCategoryPicker({
  value,
  onChange,
  error,
}: EquipmentCategoryPickerProps) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-white/80">
        Category
      </label>

      <div className="grid grid-cols-3 gap-2.5">
        {equipmentCategories.map((category, index) => {
          const isSelected = value === category.id;
          const Icon = category.icon;

          return (
            <motion.button
              key={category.id}
              type="button"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05, type: "spring", stiffness: 200 }}
              onClick={() => onChange(category.id)}
              className={cn(
                "relative flex flex-col items-center gap-2 p-4 rounded-xl",
                "border-2 transition-all duration-200",
                "touch-manipulation min-h-[88px]",
                "active:scale-95",
                isSelected
                  ? cn(category.bgColor, category.borderColor)
                  : "bg-white/5 border-white/10 hover:border-white/20"
              )}
            >
              {/* Selection indicator */}
              {isSelected && (
                <motion.div
                  layoutId="selectedCategoryIndicator"
                  className={cn(
                    "absolute top-2 right-2 w-2 h-2 rounded-full",
                    category.color.replace("text-", "bg-")
                  )}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}

              {/* Icon */}
              <div
                className={cn(
                  "p-2.5 rounded-xl",
                  isSelected ? category.bgColor : "bg-white/5"
                )}
              >
                <Icon
                  className={cn(
                    "h-6 w-6",
                    isSelected ? category.color : "text-white/50"
                  )}
                />
              </div>

              {/* Label */}
              <span
                className={cn(
                  "text-xs font-medium text-center",
                  isSelected ? "text-white" : "text-white/50"
                )}
              >
                {category.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}
