/**
 * Equipment category picker.
 *
 * Selection is a SOLID volt fill, matching the chip pattern the design system
 * specifies for a small set of single-choice options. It used to carry six
 * per-category hues, which fought the module's stated rule that status is the
 * only colour dimension — and one of them was broken outright: "Test Equipment"
 * had `bgColor: 'border border-elec-yellow/35'`, a BORDER declaration sitting in
 * the background slot (the residue of a global find-and-replace of a volt wash).
 * Selecting it therefore produced no fill at all, and the border it did emit was
 * then overridden by the separate `borderColor`, so that one tile alone had no
 * selected state a user could see.
 *
 * `color` is retained on the option because other screens read it; the picker no
 * longer uses it.
 */

import { motion } from 'framer-motion';
import { Plug, Zap, ArrowUpDown, Wrench, Shield, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

export type EquipmentCategory =
  'pat-tester' | 'test-equipment' | 'ladders' | 'power-tools' | 'ppe' | 'other';

interface CategoryOption {
  id: EquipmentCategory;
  label: string;
  icon: typeof Plug;
}

export const equipmentCategories: CategoryOption[] = [
  { id: 'pat-tester', label: 'PAT tester', icon: Plug },
  { id: 'test-equipment', label: 'Test equipment', icon: Zap },
  { id: 'ladders', label: 'Ladders', icon: ArrowUpDown },
  { id: 'power-tools', label: 'Power tools', icon: Wrench },
  { id: 'ppe', label: 'PPE', icon: Shield },
  { id: 'other', label: 'Other', icon: Settings },
];

interface EquipmentCategoryPickerProps {
  value: EquipmentCategory | null;
  onChange: (category: EquipmentCategory) => void;
  error?: string;
}

export function EquipmentCategoryPicker({ value, onChange, error }: EquipmentCategoryPickerProps) {
  return (
    <div className="space-y-2">
      <label className="mb-1 block text-[12px] font-medium text-white">Category</label>

      <div className="grid grid-cols-3 gap-1.5">
        {equipmentCategories.map((category, index) => {
          const isSelected = value === category.id;
          const Icon = category.icon;

          return (
            <motion.button
              key={category.id}
              type="button"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.03, type: 'spring', stiffness: 200 }}
              onClick={() => onChange(category.id)}
              aria-pressed={isSelected}
              className={cn(
                'relative flex min-h-[76px] flex-col items-center justify-center gap-1.5 rounded-xl p-3',
                'border transition-colors duration-150 touch-manipulation',
                // Press feel across the hub is scale plus brightness, never a dim.
                'active:scale-[0.96] active:brightness-110 [-webkit-tap-highlight-color:transparent]',
                isSelected
                  ? 'border-elec-yellow bg-elec-yellow text-black'
                  : 'border-white/[0.1] bg-white/[0.05] text-white'
              )}
            >
              <Icon className={cn('h-5 w-5', isSelected ? 'text-black' : 'text-white')} />
              <span
                className={cn(
                  'text-center text-[10.5px] leading-tight',
                  isSelected ? 'font-semibold text-black' : 'font-medium text-white'
                )}
              >
                {category.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
