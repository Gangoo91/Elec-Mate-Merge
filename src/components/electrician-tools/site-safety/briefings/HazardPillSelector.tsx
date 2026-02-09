import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  Plus,
  X,
  Zap,
  Flame,
  ArrowUp,
  HardHat,
  Minimize2,
  Package,
  FlaskConical,
  Volume2,
  Droplet,
  Truck,
  Cog,
  AlertOctagon,
  AlertTriangle,
  ShieldAlert,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { IOSInput } from '@/components/ui/ios-input';

interface Hazard {
  id: string;
  label: string;
  icon: string;
  color: string;
}

const defaultHazards: Hazard[] = [
  { id: 'electrical', label: 'Electrical', icon: 'zap', color: 'yellow' },
  { id: 'fire', label: 'Fire', icon: 'flame', color: 'red' },
  { id: 'heights', label: 'Heights', icon: 'arrow-up', color: 'purple' },
  { id: 'falling-objects', label: 'Falling Objects', icon: 'hard-hat', color: 'amber' },
  { id: 'confined-space', label: 'Confined Space', icon: 'minimize', color: 'blue' },
  { id: 'manual-handling', label: 'Manual Handling', icon: 'package', color: 'green' },
  { id: 'hazardous-substances', label: 'Hazardous Subs', icon: 'flask', color: 'pink' },
  { id: 'noise', label: 'Noise', icon: 'volume-2', color: 'orange' },
  { id: 'wet-slippery', label: 'Wet/Slippery', icon: 'droplet', color: 'cyan' },
  { id: 'vehicles', label: 'Vehicles', icon: 'truck', color: 'gray' },
  { id: 'machinery', label: 'Machinery', icon: 'cog', color: 'slate' },
  { id: 'asbestos', label: 'Asbestos', icon: 'alert-octagon', color: 'rose' },
];

const iconMap: Record<string, ReactNode> = {
  zap: <Zap className="h-5 w-5" />,
  flame: <Flame className="h-5 w-5" />,
  'arrow-up': <ArrowUp className="h-5 w-5" />,
  'hard-hat': <HardHat className="h-5 w-5" />,
  minimize: <Minimize2 className="h-5 w-5" />,
  package: <Package className="h-5 w-5" />,
  flask: <FlaskConical className="h-5 w-5" />,
  'volume-2': <Volume2 className="h-5 w-5" />,
  droplet: <Droplet className="h-5 w-5" />,
  truck: <Truck className="h-5 w-5" />,
  cog: <Cog className="h-5 w-5" />,
  'alert-octagon': <AlertOctagon className="h-5 w-5" />,
  'alert-triangle': <AlertTriangle className="h-5 w-5" />,
};

const colorMap: Record<
  string,
  { bg: string; bgSolid: string; border: string; text: string; ring: string; iconBg: string }
> = {
  yellow: {
    bg: 'bg-elec-yellow/10',
    bgSolid: 'bg-elec-yellow/20',
    border: 'border-elec-yellow/40',
    text: 'text-elec-yellow',
    ring: 'ring-elec-yellow/30',
    iconBg: 'bg-elec-yellow/20',
  },
  red: {
    bg: 'bg-red-500/10',
    bgSolid: 'bg-red-500/20',
    border: 'border-red-500/40',
    text: 'text-red-400',
    ring: 'ring-red-500/30',
    iconBg: 'bg-red-500/20',
  },
  purple: {
    bg: 'bg-purple-500/10',
    bgSolid: 'bg-purple-500/20',
    border: 'border-purple-500/40',
    text: 'text-purple-400',
    ring: 'ring-purple-500/30',
    iconBg: 'bg-purple-500/20',
  },
  amber: {
    bg: 'bg-amber-500/10',
    bgSolid: 'bg-amber-500/20',
    border: 'border-amber-500/40',
    text: 'text-amber-400',
    ring: 'ring-amber-500/30',
    iconBg: 'bg-amber-500/20',
  },
  blue: {
    bg: 'bg-blue-500/10',
    bgSolid: 'bg-blue-500/20',
    border: 'border-blue-500/40',
    text: 'text-blue-400',
    ring: 'ring-blue-500/30',
    iconBg: 'bg-blue-500/20',
  },
  green: {
    bg: 'bg-emerald-500/10',
    bgSolid: 'bg-emerald-500/20',
    border: 'border-emerald-500/40',
    text: 'text-emerald-400',
    ring: 'ring-emerald-500/30',
    iconBg: 'bg-emerald-500/20',
  },
  pink: {
    bg: 'bg-pink-500/10',
    bgSolid: 'bg-pink-500/20',
    border: 'border-pink-500/40',
    text: 'text-pink-400',
    ring: 'ring-pink-500/30',
    iconBg: 'bg-pink-500/20',
  },
  orange: {
    bg: 'bg-orange-500/10',
    bgSolid: 'bg-orange-500/20',
    border: 'border-orange-500/40',
    text: 'text-orange-400',
    ring: 'ring-orange-500/30',
    iconBg: 'bg-orange-500/20',
  },
  cyan: {
    bg: 'bg-cyan-500/10',
    bgSolid: 'bg-cyan-500/20',
    border: 'border-cyan-500/40',
    text: 'text-cyan-400',
    ring: 'ring-cyan-500/30',
    iconBg: 'bg-cyan-500/20',
  },
  gray: {
    bg: 'bg-gray-500/10',
    bgSolid: 'bg-gray-500/20',
    border: 'border-gray-500/40',
    text: 'text-gray-400',
    ring: 'ring-gray-500/30',
    iconBg: 'bg-gray-500/20',
  },
  slate: {
    bg: 'bg-slate-500/10',
    bgSolid: 'bg-slate-500/20',
    border: 'border-slate-500/40',
    text: 'text-slate-400',
    ring: 'ring-slate-500/30',
    iconBg: 'bg-slate-500/20',
  },
  rose: {
    bg: 'bg-rose-500/10',
    bgSolid: 'bg-rose-500/20',
    border: 'border-rose-500/40',
    text: 'text-rose-400',
    ring: 'ring-rose-500/30',
    iconBg: 'bg-rose-500/20',
  },
};

interface HazardPillSelectorProps {
  value: string[];
  onChange: (hazards: string[]) => void;
  error?: string;
}

export function HazardPillSelector({ value, onChange, error }: HazardPillSelectorProps) {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customHazard, setCustomHazard] = useState('');
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
      const id = `custom-${customHazard.toLowerCase().replace(/\s+/g, '-')}`;
      const newHazard: Hazard = {
        id,
        label: customHazard.trim(),
        icon: 'alert-triangle',
        color: 'gray',
      };
      setCustomHazards([...customHazards, newHazard]);
      onChange([...value, id]);
      setCustomHazard('');
      setShowCustomInput(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-4.5 w-4.5 text-elec-yellow" />
          <label className="text-sm font-semibold text-white">Select applicable hazards</label>
        </div>
        <motion.span
          key={value.length}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={cn(
            'text-xs font-medium px-2.5 py-1 rounded-full',
            value.length > 0 ? 'bg-elec-yellow/20 text-elec-yellow' : 'bg-white/10 text-white/50'
          )}
        >
          {value.length} selected
        </motion.span>
      </div>

      {/* Hazard Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
        {allHazards.map((hazard, index) => {
          const isSelected = value.includes(hazard.id);
          const colors = colorMap[hazard.color] || colorMap.gray;
          const icon = iconMap[hazard.icon] || iconMap['alert-triangle'];

          return (
            <motion.button
              key={hazard.id}
              type="button"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03, duration: 0.2 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => toggleHazard(hazard.id)}
              className={cn(
                'relative flex flex-col items-center gap-2 p-3.5 rounded-xl',
                'border transition-all duration-200',
                'touch-manipulation min-h-[80px]',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50',
                isSelected
                  ? cn(colors.bgSolid, colors.border, 'ring-1', colors.ring, 'shadow-lg')
                  : 'bg-white/[0.04] border-white/10 hover:bg-white/[0.08] hover:border-white/20'
              )}
            >
              {/* Selected checkmark badge */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                    className={cn(
                      'absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full',
                      'flex items-center justify-center',
                      'bg-elec-yellow text-black shadow-md'
                    )}
                  >
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Icon */}
              <div
                className={cn(
                  'flex items-center justify-center w-9 h-9 rounded-lg transition-colors duration-200',
                  isSelected ? cn(colors.iconBg, colors.text) : 'bg-white/[0.06] text-white/40'
                )}
              >
                {icon}
              </div>

              {/* Label */}
              <span
                className={cn(
                  'text-xs font-medium text-center leading-tight transition-colors duration-200',
                  isSelected ? colors.text : 'text-white/60'
                )}
              >
                {hazard.label}
              </span>
            </motion.button>
          );
        })}

        {/* Add Custom Card */}
        {!showCustomInput && (
          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={() => setShowCustomInput(true)}
            className={cn(
              'flex flex-col items-center justify-center gap-2 p-3.5 rounded-xl',
              'border border-dashed border-white/15 min-h-[80px]',
              'text-white/40 hover:text-white/60 hover:bg-white/[0.04] hover:border-white/25',
              'touch-manipulation transition-all duration-200'
            )}
          >
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/[0.06]">
              <Plus className="h-5 w-5" />
            </div>
            <span className="text-xs font-medium">Custom</span>
          </motion.button>
        )}
      </div>

      {/* Custom hazard input */}
      <AnimatePresence>
        {showCustomInput && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="flex gap-2 mt-1">
              <div className="flex-1">
                <IOSInput
                  placeholder="Enter custom hazard"
                  value={customHazard}
                  onChange={(e) => setCustomHazard(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
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
                  setCustomHazard('');
                }}
                className="h-[50px] px-3 text-white/50 hover:text-white hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}

export { defaultHazards };
