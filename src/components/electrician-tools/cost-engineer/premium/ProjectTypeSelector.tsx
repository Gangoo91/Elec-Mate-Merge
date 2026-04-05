import { motion } from 'framer-motion';
import { Home, Building2, Factory } from 'lucide-react';
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
  },
];

export function ProjectTypeSelector({ value, onChange, disabled }: ProjectTypeSelectorProps) {
  return (
    <div className="space-y-3">
      <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
        Project Type
      </h2>

      <div className="grid grid-cols-3 gap-3">
        {PROJECT_TYPES.map((type, index) => {
          const isSelected = value === type.value;
          const Icon = type.icon;

          return (
            <motion.button
              key={type.value}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, type: 'spring', stiffness: 300, damping: 24 }}
              whileTap={{ scale: disabled ? 1 : 0.98 }}
              onClick={() => !disabled && onChange(type.value)}
              disabled={disabled}
              className={cn(
                'relative glass-premium rounded-2xl p-4 flex flex-col items-center justify-center gap-2.5 min-h-[100px]',
                'transition-all duration-200 touch-manipulation overflow-hidden',
                isSelected && 'border-elec-yellow/40',
                disabled && 'opacity-50 cursor-not-allowed'
              )}
              style={isSelected ? { boxShadow: '0 0 30px -10px rgba(250,204,21,0.3)' } : undefined}
            >
              {/* Selected accent line */}
              {isSelected && (
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-elec-yellow via-amber-400 to-elec-yellow" />
              )}

              <div
                className={cn(
                  'p-2.5 rounded-xl transition-all',
                  isSelected
                    ? 'bg-elec-yellow/15 border border-elec-yellow/25'
                    : 'bg-white/[0.05] border border-white/[0.08]'
                )}
              >
                <Icon
                  className={cn('h-5 w-5', isSelected ? 'text-elec-yellow' : 'text-white')}
                />
              </div>
              <div className="text-center">
                <span
                  className={cn(
                    'text-sm font-semibold block',
                    isSelected ? 'text-elec-yellow' : 'text-white/60'
                  )}
                >
                  {type.label}
                </span>
                <span className="text-[10px] text-white mt-0.5 block">{type.description}</span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
