import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { UnitSection } from '@/hooks/portfolio/usePortfolioExportData';

interface SharedUnitsTabProps {
  units: UnitSection[];
}

export default function SharedUnitsTab({ units }: SharedUnitsTabProps) {
  const [expandedUnits, setExpandedUnits] = useState<Set<string>>(new Set());
  const [expandedLOs, setExpandedLOs] = useState<Set<string>>(new Set());

  const toggleUnit = (code: string) => {
    setExpandedUnits((prev) => {
      const next = new Set(prev);
      next.has(code) ? next.delete(code) : next.add(code);
      return next;
    });
  };

  const toggleLO = (key: string) => {
    setExpandedLOs((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  if (units.length === 0) {
    return (
      <div className="p-4 text-center">
        <p className="text-white font-medium">No units found</p>
        <p className="text-sm text-white mt-1">
          No qualification requirements have been mapped yet.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 space-y-3"
    >
      <p className="text-xs text-white font-medium">{units.length} Units</p>

      {units.map((unit) => {
        const isExpanded = expandedUnits.has(unit.unit_code);
        const totalACs = unit.learning_outcomes.reduce(
          (s, lo) => s + lo.assessment_criteria.length,
          0
        );
        const metACs = unit.learning_outcomes.reduce(
          (s, lo) => s + lo.assessment_criteria.filter((ac) => ac.is_met).length,
          0
        );
        const pct = totalACs > 0 ? Math.round((metACs / totalACs) * 100) : 0;

        return (
          <div
            key={unit.unit_code}
            className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden"
          >
            {/* Unit header */}
            <button
              onClick={() => toggleUnit(unit.unit_code)}
              className="w-full flex items-center gap-3 p-4 text-left touch-manipulation"
            >
              <span className="text-sm text-yellow-400 font-mono shrink-0">
                {unit.unit_code}
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white text-sm truncate">
                  {unit.unit_title}
                </p>
                <p className="text-xs text-white mt-0.5">
                  {metACs}/{totalACs} ACs met &middot; {pct}%
                </p>
              </div>
              {/* Mini progress bar */}
              <div className="w-12 h-1.5 bg-white/10 rounded-full shrink-0 overflow-hidden">
                <div
                  className={cn(
                    'h-full rounded-full transition-all',
                    pct === 100 ? 'bg-green-400' : pct > 0 ? 'bg-yellow-400' : 'bg-white/20'
                  )}
                  style={{ width: `${pct}%` }}
                />
              </div>
              {isExpanded ? (
                <ChevronUp className="h-5 w-5 text-white shrink-0" />
              ) : (
                <ChevronDown className="h-5 w-5 text-white shrink-0" />
              )}
            </button>

            {/* Expanded LOs */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-white/10 p-3 space-y-2">
                    {unit.learning_outcomes.map((lo) => {
                      const loKey = `${unit.unit_code}-${lo.lo_number}`;
                      const loExpanded = expandedLOs.has(loKey);
                      const loMetCount = lo.assessment_criteria.filter((ac) => ac.is_met).length;

                      return (
                        <div key={loKey} className="rounded-lg bg-white/3 border border-white/5 overflow-hidden">
                          <button
                            onClick={() => toggleLO(loKey)}
                            className="w-full flex items-center gap-2 p-3 text-left touch-manipulation"
                          >
                            <span className="text-xs text-yellow-400 font-mono shrink-0">
                              LO{lo.lo_number}
                            </span>
                            <p className="text-xs text-white flex-1 line-clamp-2">
                              {lo.lo_text}
                            </p>
                            <span className="text-[10px] text-white shrink-0">
                              {loMetCount}/{lo.assessment_criteria.length}
                            </span>
                            {loExpanded ? (
                              <ChevronUp className="h-4 w-4 text-white shrink-0" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-white shrink-0" />
                            )}
                          </button>

                          <AnimatePresence>
                            {loExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.15 }}
                                className="overflow-hidden"
                              >
                                <div className="border-t border-white/5 p-2 space-y-1">
                                  {lo.assessment_criteria.map((ac, idx) => (
                                    <div
                                      key={idx}
                                      className={cn(
                                        'flex items-start gap-2 p-2 rounded-lg text-xs',
                                        ac.is_met
                                          ? 'bg-green-500/10 border border-green-500/20'
                                          : 'bg-red-500/10 border border-red-500/20'
                                      )}
                                    >
                                      {ac.is_met ? (
                                        <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
                                      ) : (
                                        <XCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                                      )}
                                      <p className="text-white flex-1">{ac.ac_text}</p>
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </motion.div>
  );
}
