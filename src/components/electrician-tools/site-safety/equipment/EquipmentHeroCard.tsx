import { useState, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { Wrench, CheckCircle, AlertTriangle, AlertCircle, Plus, ShieldCheck, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface StatItem {
  label: string;
  value: number;
  icon: typeof Wrench;
  color: 'yellow' | 'green' | 'amber' | 'red';
}

interface EquipmentHeroCardProps {
  totalEquipment: number;
  goodCount: number;
  attentionCount: number;
  overdueCount: number;
  warrantyAlertCount?: number;
  onAddEquipment: () => void;
  onWarrantyAlertTap?: () => void;
}

function AnimatedCounter({ value }: { value: number }) {
  const spring = useSpring(0, { stiffness: 100, damping: 30 });
  const display = useTransform(spring, (current) => Math.round(current).toLocaleString());
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    spring.set(value);
    const unsubscribe = display.on('change', (v) => setDisplayValue(v));
    return () => unsubscribe();
  }, [value, spring, display]);

  return <span className="tabular-nums">{displayValue}</span>;
}

function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  const colorMap = {
    yellow: 'from-elec-yellow/25 to-elec-yellow/5 border-elec-yellow/30 text-elec-yellow',
    green: 'from-emerald-500/25 to-emerald-500/5 border-emerald-500/30 text-emerald-500',
    amber: 'from-amber-500/25 to-amber-500/5 border-amber-500/30 text-amber-500',
    red: 'from-red-500/25 to-red-500/5 border-red-500/30 text-red-500',
  };

  const iconBgMap = {
    yellow: 'bg-elec-yellow/20 text-elec-yellow',
    green: 'bg-emerald-500/20 text-emerald-500',
    amber: 'bg-amber-500/20 text-amber-500',
    red: 'bg-red-500/20 text-red-500',
  };

  const Icon = stat.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, type: 'spring', stiffness: 200 }}
      className={cn(
        'relative overflow-hidden rounded-xl p-2.5',
        'bg-gradient-to-br border',
        'backdrop-blur-sm',
        colorMap[stat.color]
      )}
    >
      <div className="flex flex-col items-center text-center gap-1">
        <div className={cn('p-1.5 rounded-lg', iconBgMap[stat.color])}>
          <Icon className="h-3.5 w-3.5" />
        </div>
        <p className="text-lg font-bold text-white leading-none">
          <AnimatedCounter value={stat.value} />
        </p>
        <p className="text-[9px] text-white uppercase tracking-wide">{stat.label}</p>
      </div>
    </motion.div>
  );
}

export function EquipmentHeroCard({
  totalEquipment,
  goodCount,
  attentionCount,
  overdueCount,
  warrantyAlertCount = 0,
  onAddEquipment,
  onWarrantyAlertTap,
}: EquipmentHeroCardProps) {
  const stats: StatItem[] = [
    {
      label: 'Total',
      value: totalEquipment,
      icon: Wrench,
      color: 'yellow',
    },
    {
      label: 'Good',
      value: goodCount,
      icon: CheckCircle,
      color: 'green',
    },
    {
      label: 'Attention',
      value: attentionCount,
      icon: AlertTriangle,
      color: 'amber',
    },
    {
      label: 'Overdue',
      value: overdueCount,
      icon: AlertCircle,
      color: 'red',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'relative overflow-hidden rounded-2xl',
        'bg-gradient-to-br from-slate-800/60 via-background to-background',
        'border border-white/10'
      )}
    >
      {/* Gradient accent line */}
      <div className="h-0.5 bg-gradient-to-r from-elec-yellow via-amber-400 to-elec-yellow" />

      {/* Background decoration - ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-elec-yellow/5 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-emerald-500/5 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-3 space-y-3">
        {/* Header - compact */}
        <div className="flex items-center gap-2.5">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="p-2 rounded-lg bg-gradient-to-br from-elec-yellow/30 to-amber-500/10 border border-elec-yellow/30"
          >
            <Wrench className="h-5 w-5 text-elec-yellow" />
          </motion.div>
          <div className="flex-1 min-w-0">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-base font-bold text-white"
            >
              Equipment Tracker
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white text-[10px]"
            >
              Track PPE & safety equipment
            </motion.p>
          </div>
        </div>

        {/* Stats Grid - 4 columns on mobile */}
        <div className="grid grid-cols-4 gap-1.5">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>

        {/* Warranty Alert Banner */}
        {warrantyAlertCount > 0 && (
          <motion.button
            type="button"
            onClick={onWarrantyAlertTap}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="w-full flex items-center gap-2 px-3 rounded-lg bg-amber-500/10 border border-amber-500/20 min-h-[44px] touch-manipulation active:scale-[0.98] transition-transform"
          >
            <ShieldCheck className="h-4 w-4 text-amber-400 flex-shrink-0" />
            <span className="text-xs font-medium text-amber-400 flex-1 text-left">
              {warrantyAlertCount} warranty {warrantyAlertCount === 1 ? 'alert' : 'alerts'}
            </span>
            <ChevronRight className="h-4 w-4 text-amber-400 flex-shrink-0" />
          </motion.button>
        )}

        {/* CTA Button - compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            onClick={onAddEquipment}
            className={cn(
              'w-full h-11 text-sm font-semibold rounded-xl',
              'bg-elec-yellow text-black hover:bg-elec-yellow/90',
              'shadow-lg shadow-elec-yellow/25',
              'transition-all duration-300',
              'active:scale-[0.98]'
            )}
          >
            <Plus className="h-4 w-4 mr-1.5" />
            Add Equipment
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
