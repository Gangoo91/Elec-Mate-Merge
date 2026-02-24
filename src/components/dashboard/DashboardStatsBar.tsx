import { motion } from 'framer-motion';
import { Activity, Bell, Calendar, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardStatsBarProps {
  inProgressCount: number;
  partPDueCount: number;
  expiringCount: number;
  overduePartP?: boolean;
  onStatClick?: (stat: 'in-progress' | 'part-p' | 'expiring') => void;
}

const DashboardStatsBar = ({
  inProgressCount,
  partPDueCount,
  expiringCount,
  overduePartP = false,
  onStatClick,
}: DashboardStatsBarProps) => {
  const allClear = inProgressCount === 0 && partPDueCount === 0 && expiringCount === 0;

  if (allClear) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <div className="p-4 rounded-2xl bg-green-500/15 border border-green-500/20 flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 text-green-400" />
          <div>
            <p className="text-sm font-semibold text-white">All Clear</p>
            <p className="text-xs text-green-400">No outstanding items</p>
          </div>
        </div>
      </motion.div>
    );
  }

  const allStats = [
    {
      key: 'in-progress' as const,
      label: 'In Progress',
      count: inProgressCount,
      icon: Activity,
      dotColor: 'bg-blue-400',
      labelColor: 'text-blue-400',
      bg: 'bg-blue-500/15',
      border: 'border-blue-500/20',
    },
    {
      key: 'part-p' as const,
      label: 'Part P Due',
      count: partPDueCount,
      icon: Bell,
      dotColor: overduePartP ? 'bg-red-400' : 'bg-amber-400',
      labelColor: overduePartP ? 'text-red-400' : 'text-amber-400',
      bg: overduePartP ? 'bg-red-500/15' : 'bg-amber-500/15',
      border: overduePartP ? 'border-red-500/20' : 'border-amber-500/20',
    },
    {
      key: 'expiring' as const,
      label: 'Expiring',
      count: expiringCount,
      icon: Calendar,
      dotColor: 'bg-orange-400',
      labelColor: 'text-orange-400',
      bg: 'bg-orange-500/15',
      border: 'border-orange-500/20',
    },
  ];

  const stats = allStats;

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="grid grid-cols-3 gap-2 sm:gap-3"
    >
      {stats.map((stat) => (
        <button
          key={stat.key}
          onClick={() => onStatClick?.(stat.key)}
          className={cn(
            'p-3 sm:p-4 rounded-2xl text-left touch-manipulation transition-all active:scale-[0.97]',
            stat.bg,
            'border',
            stat.border
          )}
        >
          <div className="flex items-center gap-1.5 mb-1">
            <div className={cn('w-2 h-2 rounded-full', stat.dotColor)} />
            <span className="text-xl sm:text-2xl font-bold text-white">{stat.count}</span>
          </div>
          <span className={cn('text-[11px] sm:text-xs font-medium', stat.labelColor)}>
            {stat.label}
          </span>
        </button>
      ))}
    </motion.div>
  );
};

export default DashboardStatsBar;
