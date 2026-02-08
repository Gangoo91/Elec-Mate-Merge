/**
 * ActivityGrid
 *
 * 4-week (28-cell) activity heatmap. Each cell's colour intensity
 * reflects the activity count for that day.
 * Staggered framer-motion entrance animation.
 */

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export type ActivityVariant = 'orange' | 'green' | 'purple' | 'yellow';

const intensityMap: Record<ActivityVariant, string[]> = {
  orange: [
    'bg-white/[0.06]',
    'bg-orange-500/25',
    'bg-orange-500/50',
    'bg-orange-500/80',
  ],
  green: [
    'bg-white/[0.06]',
    'bg-green-500/25',
    'bg-green-500/50',
    'bg-green-500/80',
  ],
  purple: [
    'bg-white/[0.06]',
    'bg-purple-500/25',
    'bg-purple-500/50',
    'bg-purple-500/80',
  ],
  yellow: [
    'bg-white/[0.06]',
    'bg-elec-yellow/25',
    'bg-elec-yellow/50',
    'bg-elec-yellow/80',
  ],
};

function getIntensity(count: number): number {
  if (count === 0) return 0;
  if (count <= 1) return 1;
  if (count <= 3) return 2;
  return 3;
}

interface ActivityGridProps {
  /** Map of date string (YYYY-MM-DD) to activity count */
  activityMap: Record<string, number>;
  variant: ActivityVariant;
}

export function ActivityGrid({ activityMap, variant }: ActivityGridProps) {
  const colours = intensityMap[variant];

  // Build 28 days ending today
  const days: { date: string; count: number; label: string }[] = [];
  const today = new Date();
  for (let i = 27; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toLocaleDateString('en-CA'); // YYYY-MM-DD
    const dayLabel = d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
    days.push({
      date: dateStr,
      count: activityMap[dateStr] || 0,
      label: dayLabel,
    });
  }

  return (
    <div>
      <div className="grid grid-cols-7 gap-1.5">
        {/* Day labels */}
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
          <div key={i} className="text-[10px] text-white/40 text-center mb-0.5 font-medium">{d}</div>
        ))}
        {/* Cells */}
        {days.map((day, index) => {
          const intensity = getIntensity(day.count);
          return (
            <motion.div
              key={day.date}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.25, delay: index * 0.015, ease: 'easeOut' }}
              className={cn(
                'aspect-square rounded-[4px]',
                colours[intensity]
              )}
              title={`${day.label}: ${day.count} activities`}
            />
          );
        })}
      </div>
      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 28 * 0.015 + 0.1, duration: 0.3 }}
        className="flex items-center justify-between mt-3"
      >
        <span className="text-xs text-white/40">4 weeks ago</span>
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-white/40 mr-1">Less</span>
          {colours.map((c, i) => (
            <div key={i} className={cn('w-3 h-3 rounded-[3px]', c)} />
          ))}
          <span className="text-xs text-white/40 ml-1">More</span>
        </div>
        <span className="text-xs text-white/40">Today</span>
      </motion.div>
    </div>
  );
}
