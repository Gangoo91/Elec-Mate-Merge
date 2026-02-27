import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Archive, ChevronRight, Loader2 } from 'lucide-react';
import { useSavedAgentResults, AgentType } from '@/hooks/useSavedAgentResults';
import { SavedResultsSheet } from './SavedResultsSheet';

// Short labels for badges
const SHORT_LABELS: Record<AgentType, string> = {
  'circuit-designer': 'designs',
  'cost-engineer': 'quotes',
  'health-safety': 'RAMS',
  installer: 'methods',
  maintenance: 'maint.',
};

export const SavedResultsCard: React.FC = () => {
  const { counts, totalCount, isLoading } = useSavedAgentResults();
  const [sheetOpen, setSheetOpen] = useState(false);

  // Get agent types that have results
  const activeTypes = (Object.keys(counts) as AgentType[]).filter((type) => counts[type] > 0);

  // Don't render if no results and not loading
  if (!isLoading && totalCount === 0) {
    return null;
  }

  return (
    <>
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => setSheetOpen(true)}
        className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50 rounded-xl touch-manipulation"
      >
        <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] active:bg-white/[0.08] transition-colors group">
          <div className="p-4">
            <div className="flex items-center gap-3">
              {/* Icon */}
              <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20 flex items-center justify-center">
                {isLoading ? (
                  <Loader2 className="h-5 w-5 text-elec-yellow animate-spin" />
                ) : (
                  <Archive className="h-5 w-5 text-elec-yellow" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                {/* Title */}
                <h3 className="text-[15px] font-semibold text-white">Saved Results</h3>
                {/* Count */}
                <p className="text-[13px] text-white">
                  {isLoading
                    ? 'Loading...'
                    : `${totalCount} completed job${totalCount !== 1 ? 's' : ''}`}
                </p>
              </div>

              {/* Arrow indicator */}
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-white/[0.04] flex items-center justify-center border border-white/[0.06] group-active:bg-white/[0.08] transition-colors">
                <ChevronRight className="h-4 w-4 text-white" />
              </div>
            </div>

            {/* Agent type badges */}
            {!isLoading && activeTypes.length > 0 && (
              <div className="flex gap-1.5 mt-3 flex-wrap">
                {activeTypes.slice(0, 4).map((type) => (
                  <span
                    key={type}
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-white/[0.04] text-white border border-white/5"
                  >
                    {counts[type]} {SHORT_LABELS[type]}
                  </span>
                ))}
                {activeTypes.length > 4 && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-white/[0.04] text-white border border-white/5">
                    +{activeTypes.length - 4} more
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.button>

      <SavedResultsSheet open={sheetOpen} onClose={() => setSheetOpen(false)} />
    </>
  );
};

export default SavedResultsCard;
