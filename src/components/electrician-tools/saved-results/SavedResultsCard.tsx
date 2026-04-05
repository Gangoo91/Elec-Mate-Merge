import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Archive, ChevronRight, Loader2 } from 'lucide-react';
import { useSavedAgentResults, AgentType } from '@/hooks/useSavedAgentResults';
import { SavedResultsSheet } from './SavedResultsSheet';

const SHORT_LABELS: Record<AgentType, string> = {
  'circuit-designer': 'designs',
  'cost-engineer': 'quotes',
  'health-safety': 'RAMS',
  installer: 'methods',
  maintenance: 'maint.',
};

const PILL_COLOURS: Record<AgentType, { bg: string; text: string }> = {
  'circuit-designer': { bg: 'bg-blue-500/10', text: 'text-blue-400' },
  'cost-engineer': { bg: 'bg-elec-yellow/10', text: 'text-elec-yellow' },
  'health-safety': { bg: 'bg-orange-500/10', text: 'text-orange-400' },
  installer: { bg: 'bg-blue-400/10', text: 'text-blue-300' },
  maintenance: { bg: 'bg-emerald-500/10', text: 'text-emerald-400' },
};

export const SavedResultsCard: React.FC = () => {
  const { counts, totalCount, isLoading } = useSavedAgentResults();
  const [sheetOpen, setSheetOpen] = useState(false);

  const activeTypes = (Object.keys(counts) as AgentType[]).filter((type) => counts[type] > 0);

  if (!isLoading && totalCount === 0) {
    return null;
  }

  return (
    <>
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => setSheetOpen(true)}
        className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50 rounded-2xl touch-manipulation group"
      >
        <div className="relative glass-premium rounded-2xl overflow-hidden transition-all duration-200 group-hover:border-white/20">
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-elec-yellow via-amber-400 to-elec-yellow opacity-40" />

          <div className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20 flex items-center justify-center">
                {isLoading ? (
                  <Loader2 className="h-5 w-5 text-elec-yellow animate-spin" />
                ) : (
                  <Archive className="h-5 w-5 text-elec-yellow" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-[15px] font-semibold text-white">Saved Results</h3>
                <p className="text-[13px] text-white">
                  {isLoading
                    ? 'Loading...'
                    : `${totalCount} completed job${totalCount !== 1 ? 's' : ''}`}
                </p>
              </div>

              <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-white/[0.05] flex items-center justify-center border border-white/[0.08] group-hover:bg-white/[0.10] transition-all">
                <ChevronRight className="h-4 w-4 text-white group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>

            {!isLoading && activeTypes.length > 0 && (
              <div className="flex gap-1.5 mt-3 flex-wrap">
                {activeTypes.slice(0, 4).map((type) => {
                  const colours = PILL_COLOURS[type];
                  return (
                    <span
                      key={type}
                      className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium ${colours.bg} ${colours.text}`}
                    >
                      {counts[type]} {SHORT_LABELS[type]}
                    </span>
                  );
                })}
                {activeTypes.length > 4 && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-white/[0.05] text-white">
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
