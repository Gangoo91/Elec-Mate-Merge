import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Archive,
  ChevronDown,
  ChevronRight,
  Zap,
  Calculator,
  Shield,
  Wrench,
  Settings,
  RefreshCw,
  Loader2,
} from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SavedResultItem } from './SavedResultItem';
import {
  useSavedAgentResults,
  AgentType,
  SavedAgentResult,
  AGENT_LABELS,
} from '@/hooks/useSavedAgentResults';

interface SavedResultsSheetProps {
  open: boolean;
  onClose: () => void;
}

// Agent group configuration
const AGENT_GROUPS: Array<{
  type: AgentType;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  { type: 'circuit-designer', icon: Zap },
  { type: 'cost-engineer', icon: Calculator },
  { type: 'health-safety', icon: Shield },
  { type: 'installer', icon: Wrench },
  { type: 'maintenance', icon: Settings },
];

export const SavedResultsSheet: React.FC<SavedResultsSheetProps> = ({ open, onClose }) => {
  const { results, counts, totalCount, isLoading, refetch } = useSavedAgentResults();
  const [expandedGroups, setExpandedGroups] = useState<Set<AgentType>>(
    new Set(['circuit-designer']) // Default first group open
  );
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Group results by agent type
  const groupedResults = useMemo(() => {
    const groups: Record<AgentType, SavedAgentResult[]> = {
      'circuit-designer': [],
      'cost-engineer': [],
      'health-safety': [],
      installer: [],
      maintenance: [],
    };

    results.forEach((result) => {
      groups[result.agentType].push(result);
    });

    return groups;
  }, [results]);

  const toggleGroup = (type: AgentType) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(type)) {
        next.delete(type);
      } else {
        next.add(type);
      }
      return next;
    });
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent
        side="bottom"
        className="h-[85vh] p-0 rounded-t-2xl overflow-hidden bg-background border-white/[0.08]"
      >
        <div className="flex flex-col h-full">
          {/* Drag Handle */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-white/20" />

          {/* Header */}
          <SheetHeader className="px-4 pt-6 pb-3 border-b border-white/[0.08]">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-lg font-semibold text-white flex items-center gap-2">
                <Archive className="h-5 w-5 text-elec-yellow" />
                Saved Results
                {totalCount > 0 && (
                  <span className="text-sm font-normal text-white">({totalCount})</span>
                )}
              </SheetTitle>

              <button
                onClick={handleRefresh}
                disabled={isRefreshing || isLoading}
                className="h-11 w-11 flex items-center justify-center rounded-lg text-white hover:bg-white/[0.08] disabled:opacity-40 transition-colors touch-manipulation"
              >
                {isRefreshing || isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
              </button>
            </div>
          </SheetHeader>

          {/* Content */}
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-2">
              {isLoading && totalCount === 0 ? (
                // Loading state
                <div className="flex flex-col items-center py-16">
                  <Loader2 className="h-8 w-8 text-elec-yellow animate-spin mb-4" />
                  <p className="text-sm text-white">Loading saved results...</p>
                </div>
              ) : totalCount === 0 ? (
                // Empty state
                <div className="flex flex-col items-center py-16">
                  <div className="w-20 h-20 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-5">
                    <Archive className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">No Saved Results Yet</h3>
                  <p className="text-sm text-white text-center max-w-xs">
                    Complete an agent consultation to see your results here
                  </p>
                </div>
              ) : (
                // Results grouped by agent
                <div className="space-y-2">
                  {AGENT_GROUPS.map(({ type, icon: Icon }) => {
                    const agentResults = groupedResults[type];
                    const count = counts[type];
                    const isExpanded = expandedGroups.has(type);

                    if (count === 0) return null;

                    return (
                      <div
                        key={type}
                        className="rounded-xl border border-white/[0.06] overflow-hidden"
                      >
                        {/* Group Header */}
                        <button
                          onClick={() => toggleGroup(type)}
                          className="w-full flex items-center gap-3 p-3 bg-white/[0.02] active:bg-white/[0.06] transition-colors touch-manipulation h-12"
                        >
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-elec-yellow/10 border border-elec-yellow/20">
                            <Icon className="h-4 w-4 text-elec-yellow" />
                          </div>
                          <span className="flex-1 text-left text-sm font-medium text-white">
                            {AGENT_LABELS[type]}
                          </span>
                          <span className="text-xs text-white mr-2">({count})</span>
                          {isExpanded ? (
                            <ChevronDown className="h-4 w-4 text-white" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-white" />
                          )}
                        </button>

                        {/* Group Content */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2, ease: 'easeInOut' }}
                              className="overflow-hidden"
                            >
                              <div className="p-2 space-y-2 bg-white/[0.01]">
                                {agentResults.map((result) => (
                                  <SavedResultItem
                                    key={result.id}
                                    result={result}
                                    onClose={onClose}
                                  />
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SavedResultsSheet;
