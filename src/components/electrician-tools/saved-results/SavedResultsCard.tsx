import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Archive, ChevronRight, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useSavedAgentResults, AgentType, AGENT_LABELS } from '@/hooks/useSavedAgentResults';
import { SavedResultsSheet } from './SavedResultsSheet';

// Short labels for badges
const SHORT_LABELS: Record<AgentType, string> = {
  'circuit-designer': 'designs',
  'cost-engineer': 'quotes',
  'health-safety': 'RAMS',
  'installer': 'methods',
  'maintenance': 'maint.',
};

export const SavedResultsCard: React.FC = () => {
  const { counts, totalCount, isLoading } = useSavedAgentResults();
  const [sheetOpen, setSheetOpen] = useState(false);

  // Get agent types that have results
  const activeTypes = (Object.keys(counts) as AgentType[]).filter(
    (type) => counts[type] > 0
  );

  // Don't render if no results and not loading
  if (!isLoading && totalCount === 0) {
    return null;
  }

  return (
    <>
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => setSheetOpen(true)}
        className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 rounded-2xl touch-manipulation"
      >
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-purple-500/30 rounded-2xl group active:bg-purple-500/25 transition-colors">
          <div className="p-4">
            <div className="flex items-center gap-3">
              {/* Icon */}
              <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600">
                {isLoading ? (
                  <Loader2 className="h-6 w-6 text-white animate-spin" />
                ) : (
                  <Archive className="h-6 w-6 text-white" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                {/* Title */}
                <h3 className="text-[15px] font-bold text-white">Saved Results</h3>
                {/* Count */}
                <p className="text-[13px] text-white/70">
                  {isLoading
                    ? 'Loading...'
                    : `${totalCount} completed job${totalCount !== 1 ? 's' : ''}`}
                </p>
              </div>

              {/* Arrow indicator */}
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-white/[0.08] flex items-center justify-center group-active:bg-white/[0.12] transition-colors">
                <ChevronRight className="h-4 w-4 text-white/70" />
              </div>
            </div>

            {/* Agent type badges */}
            {!isLoading && activeTypes.length > 0 && (
              <div className="flex gap-1.5 mt-3 flex-wrap">
                {activeTypes.slice(0, 4).map((type) => (
                  <Badge
                    key={type}
                    variant="secondary"
                    className="bg-white/[0.08] text-white/80 border-white/[0.1] text-[11px] px-2 py-0.5"
                  >
                    {counts[type]} {SHORT_LABELS[type]}
                  </Badge>
                ))}
                {activeTypes.length > 4 && (
                  <Badge
                    variant="secondary"
                    className="bg-white/[0.08] text-white/80 border-white/[0.1] text-[11px] px-2 py-0.5"
                  >
                    +{activeTypes.length - 4} more
                  </Badge>
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
