import { motion } from 'framer-motion';
import { BarChart3, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import type { SafetyScoreBreakdown } from '@/hooks/useSafetyTrends';

interface ScoreBreakdownCardProps {
  breakdown: SafetyScoreBreakdown[];
}

const STATUS_CONFIG = {
  good: { icon: CheckCircle2, colour: 'text-green-400', barColour: 'bg-green-400' },
  warning: { icon: AlertTriangle, colour: 'text-amber-400', barColour: 'bg-amber-400' },
  critical: { icon: XCircle, colour: 'text-red-400', barColour: 'bg-red-400' },
};

export function ScoreBreakdownCard({ breakdown }: ScoreBreakdownCardProps) {
  const totalScore = breakdown.reduce((sum, b) => sum + b.score, 0);
  const maxPossible = breakdown.reduce((sum, b) => sum + b.maxScore, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: 0.15 }}
      className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] overflow-hidden"
    >
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-purple-400" />
            <h3 className="text-sm font-bold text-white">Score Breakdown</h3>
          </div>
          <span className="text-sm font-bold text-white">
            {totalScore}/{maxPossible}
          </span>
        </div>

        <div className="space-y-2.5">
          {breakdown.map((item) => {
            const config = STATUS_CONFIG[item.status];
            const Icon = config.icon;
            const percentage = item.maxScore > 0 ? (item.score / item.maxScore) * 100 : 0;

            return (
              <div key={item.factor} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Icon className={`h-3 w-3 ${config.colour}`} />
                    <span className="text-xs text-white">{item.factor}</span>
                  </div>
                  <span className="text-xs font-bold text-white">
                    {item.score}/{item.maxScore}
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${config.barColour}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
