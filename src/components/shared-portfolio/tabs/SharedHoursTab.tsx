import { motion } from 'framer-motion';
import { Clock, Target, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { OTJHours } from '@/hooks/portfolio/usePortfolioExportData';

interface SharedHoursTabProps {
  otjHours: OTJHours;
}

export default function SharedHoursTab({ otjHours }: SharedHoursTabProps) {
  const { current, target, percentage } = otjHours;
  const pct = Math.min(percentage, 100);
  const isComplete = percentage >= 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 space-y-6"
    >
      {/* Main stat */}
      <div className="bg-white/5 rounded-2xl border border-white/10 p-6 text-center">
        <p className={cn('text-5xl font-bold', isComplete ? 'text-green-400' : 'text-yellow-400')}>
          {percentage}%
        </p>
        <p className="text-sm text-white mt-2">Off-the-Job Training Completion</p>

        {/* Progress bar */}
        <div className="mt-4 h-3 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className={cn('h-full rounded-full', isComplete ? 'bg-green-400' : 'bg-yellow-400')}
          />
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white/5 rounded-xl border border-white/10 p-4 text-center">
          <Target className="h-5 w-5 text-white mx-auto mb-2" />
          <p className="text-lg font-bold text-white">{target}</p>
          <p className="text-[10px] text-white">Target Hours</p>
        </div>
        <div className="bg-white/5 rounded-xl border border-white/10 p-4 text-center">
          <Clock className="h-5 w-5 text-yellow-400 mx-auto mb-2" />
          <p className="text-lg font-bold text-yellow-400">{current}</p>
          <p className="text-[10px] text-white">Current Hours</p>
        </div>
        <div className="bg-white/5 rounded-xl border border-white/10 p-4 text-center">
          <TrendingUp className="h-5 w-5 text-white mx-auto mb-2" />
          <p className="text-lg font-bold text-white">{Math.max(target - current, 0)}</p>
          <p className="text-[10px] text-white">Hours Remaining</p>
        </div>
      </div>

      {/* Info note */}
      <div className="bg-blue-500/10 rounded-xl border border-blue-500/20 p-4">
        <p className="text-xs text-blue-400">
          Off-the-job training must make up at least 20% of the apprentice's contracted working hours
          over the duration of the programme. This includes college attendance, online learning,
          mentoring, and portfolio work.
        </p>
      </div>
    </motion.div>
  );
}
