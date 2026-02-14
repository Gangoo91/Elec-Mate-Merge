import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FlaskConical, AlertTriangle, Clock, ChevronDown, ChevronUp, RefreshCw } from 'lucide-react';
import type { COSHHAssessment } from '@/hooks/useCOSHH';

interface COSHHAlertsCardProps {
  overdueAssessments: COSHHAssessment[];
  upcomingAssessments: COSHHAssessment[];
  onTap?: () => void;
  onRenew?: (assessment: COSHHAssessment) => void;
}

function daysUntil(dateStr: string): number {
  const now = new Date();
  const target = new Date(dateStr);
  return Math.ceil((target.getTime() - now.getTime()) / 86400000);
}

const RISK_COLOURS: Record<string, string> = {
  low: 'bg-green-500/15 text-green-300',
  medium: 'bg-amber-500/15 text-amber-300',
  high: 'bg-orange-500/15 text-orange-300',
  'very-high': 'bg-red-500/15 text-red-300',
};

export function COSHHAlertsCard({
  overdueAssessments,
  upcomingAssessments,
  onTap,
  onRenew,
}: COSHHAlertsCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const totalAlerts = overdueAssessments.length + upcomingAssessments.length;

  if (totalAlerts === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: 0.1 }}
      className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-white/[0.01] overflow-hidden"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between touch-manipulation"
      >
        <div className="flex items-center gap-2">
          <FlaskConical className="h-4 w-4 text-green-400" />
          <h3 className="text-sm font-bold text-white">COSHH Reviews</h3>
          <span className="px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 text-[10px] font-bold">
            {totalAlerts}
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 text-white" />
        ) : (
          <ChevronDown className="h-4 w-4 text-white" />
        )}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-2">
              {overdueAssessments.map((item) => {
                const days = Math.abs(daysUntil(item.review_date));
                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-2.5 rounded-xl border border-red-500/20 bg-red-500/5"
                  >
                    <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-white truncate">
                        {item.substance_name}
                      </p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${RISK_COLOURS[item.risk_rating] || ''}`}
                        >
                          {item.risk_rating}
                        </span>
                        <span className="text-[10px] text-white">{days}d overdue</span>
                      </div>
                    </div>
                    {onRenew && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRenew(item);
                        }}
                        className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20 text-elec-yellow text-[10px] font-semibold touch-manipulation active:scale-[0.97]"
                      >
                        <RefreshCw className="h-3 w-3" />
                        Renew
                      </button>
                    )}
                  </div>
                );
              })}

              {upcomingAssessments.map((item) => {
                const days = daysUntil(item.review_date);
                return (
                  <button
                    key={item.id}
                    onClick={() => onTap?.()}
                    className="w-full flex items-center gap-3 p-2.5 rounded-xl border border-amber-500/20 bg-amber-500/5 touch-manipulation active:bg-amber-500/10 transition-colors"
                  >
                    <Clock className="h-4 w-4 text-amber-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0 text-left">
                      <p className="text-xs font-semibold text-white truncate">
                        {item.substance_name}
                      </p>
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${RISK_COLOURS[item.risk_rating] || ''}`}
                      >
                        {item.risk_rating}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-amber-300 flex-shrink-0">
                      {days}d left
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
