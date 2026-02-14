import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Wrench, AlertTriangle, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import type { SafetyEquipment } from '@/hooks/useSafetyEquipment';

interface EquipmentAlertsCardProps {
  overdueItems: SafetyEquipment[];
  dueSoonItems: SafetyEquipment[];
  onTap?: () => void;
}

function daysUntil(dateStr: string): number {
  const now = new Date();
  const target = new Date(dateStr);
  return Math.ceil((target.getTime() - now.getTime()) / 86400000);
}

export function EquipmentAlertsCard({
  overdueItems,
  dueSoonItems,
  onTap,
}: EquipmentAlertsCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const totalAlerts = overdueItems.length + dueSoonItems.length;

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
          <Wrench className="h-4 w-4 text-cyan-400" />
          <h3 className="text-sm font-bold text-white">Equipment Alerts</h3>
          <span className="px-1.5 py-0.5 rounded-full bg-red-500/15 text-red-300 text-[10px] font-bold">
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
              {overdueItems.map((item) => {
                const days = Math.abs(daysUntil(item.next_inspection || item.calibration_due || ''));
                return (
                  <button
                    key={item.id}
                    onClick={() => onTap?.()}
                    className="w-full flex items-center gap-3 p-2.5 rounded-xl border border-red-500/20 bg-red-500/5 touch-manipulation active:bg-red-500/10 transition-colors"
                  >
                    <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0 text-left">
                      <p className="text-xs font-semibold text-white truncate">{item.name}</p>
                      <p className="text-[10px] text-white">{item.category}</p>
                    </div>
                    <span className="text-[10px] font-bold text-red-300 flex-shrink-0">
                      {days}d overdue
                    </span>
                  </button>
                );
              })}

              {dueSoonItems.map((item) => {
                const days = daysUntil(item.next_inspection || item.calibration_due || '');
                return (
                  <button
                    key={item.id}
                    onClick={() => onTap?.()}
                    className="w-full flex items-center gap-3 p-2.5 rounded-xl border border-amber-500/20 bg-amber-500/5 touch-manipulation active:bg-amber-500/10 transition-colors"
                  >
                    <Clock className="h-4 w-4 text-amber-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0 text-left">
                      <p className="text-xs font-semibold text-white truncate">{item.name}</p>
                      <p className="text-[10px] text-white">{item.category}</p>
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
