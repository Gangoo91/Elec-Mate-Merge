import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  TrendingUp,
  TrendingDown,
  Calendar,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import type { SafetyDashboardStats } from "@/hooks/useSafetyDashboardStats";

interface WeeklySummaryCardProps {
  stats: SafetyDashboardStats;
  weekOverWeekChange?: number;
}

export function WeeklySummaryCard({
  stats,
  weekOverWeekChange = 0,
}: WeeklySummaryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Calculate quick wins
  const quickWins: string[] = [];
  if (stats.totalPhotosThisWeek === 0) {
    quickWins.push("Take a safety photo to boost your score");
  }
  if (stats.equipmentOverdue > 0) {
    quickWins.push(
      `Check ${stats.equipmentOverdue} overdue equipment item${stats.equipmentOverdue > 1 ? "s" : ""}`
    );
  }
  if (stats.coshhOverdueReviews > 0) {
    quickWins.push(
      `Review ${stats.coshhOverdueReviews} overdue COSHH assessment${stats.coshhOverdueReviews > 1 ? "s" : ""}`
    );
  }
  if (stats.completedBriefingsThisMonth === 0) {
    quickWins.push("Schedule a team briefing this month");
  }

  // Outstanding items
  const outstandingItems = stats.equipmentOverdue + stats.coshhOverdueReviews;

  // Actions this week
  const actionsThisWeek = stats.totalPhotosThisWeek + stats.completedBriefingsThisMonth;

  const TrendIcon = weekOverWeekChange <= 0 ? TrendingDown : TrendingUp;
  const trendColour = weekOverWeekChange <= 0 ? "text-green-400" : "text-red-400";
  const trendLabel =
    weekOverWeekChange === 0
      ? "No change"
      : weekOverWeekChange < 0
        ? `${Math.abs(weekOverWeekChange)} fewer incidents`
        : `${weekOverWeekChange} more incidents`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: 0.2 }}
      className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] overflow-hidden"
    >
      {/* Collapsed header — always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between touch-manipulation"
      >
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-cyan-400" />
          <h3 className="text-sm font-bold text-white">Weekly Summary</h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <TrendIcon className={`h-3.5 w-3.5 ${trendColour}`} />
            <span className={`text-[11px] font-semibold ${trendColour}`}>
              {trendLabel}
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
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-3">
              {/* Summary stats */}
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <div className="flex items-center gap-1.5 mb-1">
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-400" />
                    <span className="text-[10px] text-white font-medium">
                      Actions This Week
                    </span>
                  </div>
                  <span className="text-lg font-bold text-white">
                    {actionsThisWeek}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <div className="flex items-center gap-1.5 mb-1">
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
                    <span className="text-[10px] text-white font-medium">
                      Outstanding
                    </span>
                  </div>
                  <span className="text-lg font-bold text-white">
                    {outstandingItems}
                  </span>
                </div>
              </div>

              {/* Quick wins */}
              {quickWins.length > 0 && (
                <div className="space-y-1.5">
                  <h4 className="text-[10px] font-bold text-white uppercase tracking-wider">
                    Quick Wins
                  </h4>
                  {quickWins.map((win) => (
                    <div
                      key={win}
                      className="flex items-start gap-2 px-3 py-2 rounded-lg bg-elec-yellow/5 border border-elec-yellow/10"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-1.5 flex-shrink-0" />
                      <span className="text-xs text-white">{win}</span>
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

export default WeeklySummaryCard;
