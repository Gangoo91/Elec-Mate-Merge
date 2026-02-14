import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  CheckCircle2,
  Shield,
  Wrench,
  FlaskConical,
  Lock,
  Eye,
  Loader2,
} from 'lucide-react';
import type { WeeklySummary } from '@/hooks/useWeeklySafetySummary';

interface WeeklyReportCardProps {
  summary: WeeklySummary | undefined;
  isLoading: boolean;
}

const TrendConfig = {
  improving: { icon: TrendingUp, colour: 'text-green-400', label: 'Improving' },
  declining: { icon: TrendingDown, colour: 'text-red-400', label: 'Declining' },
  stable: { icon: Minus, colour: 'text-white', label: 'Stable' },
};

export function WeeklyReportCard({ summary, isLoading }: WeeklyReportCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 flex items-center gap-3">
        <Loader2 className="h-4 w-4 text-white animate-spin" />
        <span className="text-sm text-white">Loading weekly report...</span>
      </div>
    );
  }

  if (!summary) return null;

  const trendInfo = TrendConfig[summary.trend];
  const TrendIcon = trendInfo.icon;

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

  const statRows = [
    {
      icon: AlertTriangle,
      label: 'Near Misses',
      value: `${summary.nearMisses.total} (${summary.nearMisses.open} open)`,
      colour: summary.nearMisses.open > 0 ? 'text-amber-400' : 'text-white',
    },
    {
      icon: CheckCircle2,
      label: 'Inspections',
      value: `${summary.inspections.passed}P / ${summary.inspections.failed}F (${summary.inspections.passRate}%)`,
      colour: summary.inspections.passRate >= 80 ? 'text-green-400' : 'text-amber-400',
    },
    {
      icon: Shield,
      label: 'Accidents',
      value: `${summary.accidents.total}${summary.accidents.riddorReportable > 0 ? ` (${summary.accidents.riddorReportable} RIDDOR)` : ''}`,
      colour: summary.accidents.total > 0 ? 'text-red-400' : 'text-green-400',
    },
    {
      icon: Wrench,
      label: 'Equipment',
      value: `${summary.equipment.overdue} overdue, ${summary.equipment.dueSoon} due soon`,
      colour: summary.equipment.overdue > 0 ? 'text-red-400' : 'text-white',
    },
    {
      icon: FlaskConical,
      label: 'COSHH',
      value: `${summary.coshh.overdueReviews} overdue, ${summary.coshh.upcomingReviews} upcoming`,
      colour: summary.coshh.overdueReviews > 0 ? 'text-amber-400' : 'text-white',
    },
    {
      icon: Lock,
      label: 'Permits',
      value: `${summary.permits.active} active`,
      colour: 'text-white',
    },
    {
      icon: Eye,
      label: 'Observations',
      value: `${summary.observations.total} (${summary.observations.positive} positive)`,
      colour: 'text-white',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: 0.2 }}
      className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] overflow-hidden"
    >
      {/* Header — always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between touch-manipulation"
      >
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-indigo-400" />
          <h3 className="text-sm font-bold text-white">Weekly Report</h3>
          <span className="text-[10px] text-white">
            {formatDate(summary.period.start)} — {formatDate(summary.period.end)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <TrendIcon className={`h-3.5 w-3.5 ${trendInfo.colour}`} />
            <span className={`text-[11px] font-semibold ${trendInfo.colour}`}>
              {trendInfo.label}
            </span>
          </div>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4 text-white" />
          ) : (
            <ChevronDown className="h-4 w-4 text-white" />
          )}
        </div>
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-3">
              {/* Score */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <span className="text-xs font-semibold text-white">Safety Score</span>
                <span
                  className={`text-lg font-bold ${
                    summary.safetyScore >= 80
                      ? 'text-green-400'
                      : summary.safetyScore >= 60
                        ? 'text-amber-400'
                        : 'text-red-400'
                  }`}
                >
                  {summary.safetyScore}/100
                </span>
              </div>

              {/* Stats */}
              <div className="space-y-1.5">
                {statRows.map((row) => {
                  const Icon = row.icon;
                  return (
                    <div
                      key={row.label}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/[0.02]"
                    >
                      <Icon className={`h-3.5 w-3.5 ${row.colour} flex-shrink-0`} />
                      <span className="text-xs text-white flex-1">{row.label}</span>
                      <span className={`text-xs font-semibold ${row.colour}`}>{row.value}</span>
                    </div>
                  );
                })}
              </div>

              {/* Highlights */}
              {summary.highlights.length > 0 && (
                <div className="space-y-1">
                  <h4 className="text-[10px] font-bold text-white uppercase tracking-wider">
                    Highlights
                  </h4>
                  {summary.highlights.map((h) => (
                    <div
                      key={h}
                      className="flex items-start gap-2 px-3 py-2 rounded-lg bg-green-500/5 border border-green-500/10"
                    >
                      <CheckCircle2 className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-white">{h}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Action Items */}
              {summary.actionItems.length > 0 && (
                <div className="space-y-1">
                  <h4 className="text-[10px] font-bold text-white uppercase tracking-wider">
                    Action Required
                  </h4>
                  {summary.actionItems.map((a) => (
                    <div
                      key={a}
                      className="flex items-start gap-2 px-3 py-2 rounded-lg bg-red-500/5 border border-red-500/10"
                    >
                      <AlertTriangle className="h-3 w-3 text-red-400 mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-white">{a}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default WeeklyReportCard;
