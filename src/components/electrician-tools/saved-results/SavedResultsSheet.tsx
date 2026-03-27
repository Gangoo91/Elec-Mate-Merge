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
  Sparkles,
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
import { cn } from '@/lib/utils';

interface SavedResultsSheetProps {
  open: boolean;
  onClose: () => void;
}

// Agent group configuration with per-agent colours
const AGENT_GROUPS: Array<{
  type: AgentType;
  icon: React.ComponentType<{ className?: string }>;
  colour: string;
  colourClasses: { bgLight: string; text: string; border: string; dot: string };
}> = [
  {
    type: 'circuit-designer',
    icon: Zap,
    colour: 'blue',
    colourClasses: {
      bgLight: 'bg-blue-500/10',
      text: 'text-blue-400',
      border: 'border-blue-500/20',
      dot: 'bg-blue-400',
    },
  },
  {
    type: 'cost-engineer',
    icon: Calculator,
    colour: 'green',
    colourClasses: {
      bgLight: 'bg-green-500/10',
      text: 'text-green-400',
      border: 'border-green-500/20',
      dot: 'bg-green-400',
    },
  },
  {
    type: 'health-safety',
    icon: Shield,
    colour: 'red',
    colourClasses: {
      bgLight: 'bg-red-500/10',
      text: 'text-red-400',
      border: 'border-red-500/20',
      dot: 'bg-red-400',
    },
  },
  {
    type: 'installer',
    icon: Wrench,
    colour: 'orange',
    colourClasses: {
      bgLight: 'bg-orange-500/10',
      text: 'text-orange-400',
      border: 'border-orange-500/20',
      dot: 'bg-orange-400',
    },
  },
  {
    type: 'maintenance',
    icon: Settings,
    colour: 'slate',
    colourClasses: {
      bgLight: 'bg-slate-400/10',
      text: 'text-slate-300',
      border: 'border-slate-400/20',
      dot: 'bg-slate-400',
    },
  },
];

export const SavedResultsSheet: React.FC<SavedResultsSheetProps> = ({ open, onClose }) => {
  const { results, counts, totalCount, isLoading, refetch, deleteResult } = useSavedAgentResults();
  const [expandedGroups, setExpandedGroups] = useState<Set<AgentType>>(
    new Set(['circuit-designer'])
  );
  const [isRefreshing, setIsRefreshing] = useState(false);

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
      if (next.has(type)) next.delete(type);
      else next.add(type);
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
          <SheetHeader className="px-5 pt-7 pb-4 border-b border-white/[0.06]">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-[18px] font-bold text-white flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-elec-yellow/10 ring-1 ring-elec-yellow/20 flex items-center justify-center">
                  <Archive className="h-4.5 w-4.5 text-elec-yellow" />
                </div>
                Saved Results
                {totalCount > 0 && (
                  <span className="text-[13px] font-normal text-white bg-white/[0.06] px-2 py-0.5 rounded-full">
                    {totalCount}
                  </span>
                )}
              </SheetTitle>

              <button
                onClick={handleRefresh}
                disabled={isRefreshing || isLoading}
                className="h-9 w-9 flex items-center justify-center rounded-lg text-white ring-1 ring-white/[0.12] hover:bg-white/[0.06] disabled:opacity-40 transition-colors touch-manipulation"
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
            <div className="p-4 space-y-3">
              {isLoading && totalCount === 0 ? (
                <div className="flex flex-col items-center py-16">
                  <Loader2 className="h-8 w-8 text-elec-yellow animate-spin mb-4" />
                  <p className="text-sm text-white">Loading saved results...</p>
                </div>
              ) : totalCount === 0 ? (
                <div className="flex flex-col items-center py-16">
                  <div className="w-16 h-16 rounded-2xl bg-elec-yellow/[0.06] ring-1 ring-elec-yellow/15 flex items-center justify-center mb-5">
                    <Sparkles className="h-8 w-8 text-elec-yellow" />
                  </div>
                  <h3 className="text-[17px] font-semibold text-white mb-1">No results yet</h3>
                  <p className="text-[13px] text-white text-center max-w-[260px]">
                    Start a consultation with any AI specialist to see your results here
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {AGENT_GROUPS.map(({ type, icon: Icon, colourClasses: cc }) => {
                    const agentResults = groupedResults[type];
                    const count = counts[type];
                    const isExpanded = expandedGroups.has(type);

                    if (count === 0) return null;

                    return (
                      <div
                        key={type}
                        className="rounded-xl ring-1 ring-white/[0.12] overflow-hidden"
                      >
                        {/* Group Header */}
                        <button
                          onClick={() => toggleGroup(type)}
                          className="w-full flex items-center gap-3 p-3.5 bg-white/[0.10] active:bg-white/[0.12] transition-colors touch-manipulation"
                        >
                          <div
                            className={cn(
                              'w-9 h-9 rounded-lg flex items-center justify-center ring-1',
                              cc.bgLight,
                              cc.border
                            )}
                          >
                            <Icon className={cn('h-4 w-4', cc.text)} />
                          </div>
                          <span className="flex-1 text-left text-[14px] font-semibold text-white">
                            {AGENT_LABELS[type]}
                          </span>
                          <span
                            className={cn(
                              'text-[11px] font-semibold px-2 py-0.5 rounded-full mr-1',
                              cc.bgLight,
                              cc.text
                            )}
                          >
                            {count}
                          </span>
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
                              <div className="p-2 space-y-1.5 border-t border-white/[0.10]">
                                {agentResults.map((result) => (
                                  <SavedResultItem
                                    key={result.id}
                                    result={result}
                                    onClose={onClose}
                                    onDelete={deleteResult}
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
