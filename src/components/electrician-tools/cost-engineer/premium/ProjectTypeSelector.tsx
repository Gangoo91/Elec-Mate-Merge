import { motion } from 'framer-motion';
import { Home, Building2, Factory, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

type ProjectType = 'domestic' | 'commercial' | 'industrial';

interface ProjectTypeSelectorProps {
  value: ProjectType;
  onChange: (type: ProjectType) => void;
  disabled?: boolean;
}

const PROJECT_TYPES = [
  {
    value: 'domestic' as const,
    label: 'Domestic',
    description: 'Homes & flats',
    icon: Home,
  },
  {
    value: 'commercial' as const,
    label: 'Commercial',
    description: 'Shops & offices',
    icon: Building2,
  },
  {
    value: 'industrial' as const,
    label: 'Industrial',
    description: 'Factories & warehouses',
    icon: Factory,
  }
];

export function ProjectTypeSelector({ value, onChange, disabled }: ProjectTypeSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-white/70">Project Type</label>

      <div className="grid grid-cols-3 gap-2">
        {PROJECT_TYPES.map((type, index) => {
          const isSelected = value === type.value;
          const Icon = type.icon;

          return (
            <motion.button
              key={type.value}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileTap={{ scale: disabled ? 1 : 0.98 }}
              onClick={() => !disabled && onChange(type.value)}
              disabled={disabled}
              className={cn(
                "relative flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-200 touch-manipulation min-h-[88px]",
                isSelected ? [
                  "bg-elec-yellow/10 border-elec-yellow/40",
                ] : [
                  "bg-white/[0.03] border-white/10",
                  "hover:bg-white/[0.06] hover:border-white/20"
                ],
                disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              {/* Selected indicator */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                  className="absolute top-2 right-2"
                >
                  <div className="w-4 h-4 rounded-full bg-elec-yellow flex items-center justify-center">
                    <Check className="h-2.5 w-2.5 text-black" />
                  </div>
                </motion.div>
              )}

              {/* Icon */}
              <div
                className={cn(
                  "p-2 rounded-lg mb-1.5 transition-all duration-200",
                  isSelected
                    ? "bg-elec-yellow/20"
                    : "bg-white/5"
                )}
              >
                <Icon
                  className={cn(
                    "h-5 w-5 transition-colors duration-200",
                    isSelected ? "text-elec-yellow" : "text-white/50"
                  )}
                />
              </div>

              {/* Label */}
              <span
                className={cn(
                  "text-xs font-semibold transition-colors duration-200",
                  isSelected ? "text-white" : "text-white/60"
                )}
              >
                {type.label}
              </span>

              {/* Description */}
              <span className={cn(
                "text-[10px] mt-0.5 transition-colors duration-200",
                isSelected ? "text-white/50" : "text-white/30"
              )}>
                {type.description}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
