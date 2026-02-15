import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, CheckCircle2, Clock, AlertCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { KSBSummary, KSBItem } from '@/hooks/portfolio/usePortfolioExportData';

interface SharedKSBTabProps {
  ksbSummary: KSBSummary;
}

export default function SharedKSBTab({ ksbSummary }: SharedKSBTabProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 space-y-6"
    >
      <KSBSection title="Knowledge" items={ksbSummary.knowledge} />
      <KSBSection title="Behaviours" items={ksbSummary.behaviours} />
    </motion.div>
  );
}

function KSBSection({ title, items }: { title: string; items: KSBItem[] }) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggle = (code: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(code) ? next.delete(code) : next.add(code);
      return next;
    });
  };

  const completed = items.filter((k) => k.status === 'completed' || k.status === 'verified').length;

  if (items.length === 0) {
    return (
      <div>
        <h3 className="text-sm font-semibold text-white mb-2">{title}</h3>
        <p className="text-xs text-white">No KSBs defined</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        <span className="text-xs text-white">
          {completed}/{items.length} complete
        </span>
      </div>

      <div className="space-y-2">
        {items.map((ksb) => {
          const isExpanded = expanded.has(ksb.code);

          return (
            <div
              key={ksb.code}
              className="bg-white/5 rounded-xl border border-white/10 overflow-hidden"
            >
              <button
                onClick={() => toggle(ksb.code)}
                className="w-full flex items-center gap-3 p-3 text-left touch-manipulation"
              >
                <span className="text-sm text-yellow-400 font-mono font-bold shrink-0">
                  {ksb.code}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{ksb.title}</p>
                </div>
                <StatusBadge status={ksb.status} />
                {ksb.route !== 'core' && (
                  <span className="text-[10px] text-white px-1.5 py-0.5 rounded bg-purple-500/20 border border-purple-500/20 shrink-0 capitalize">
                    {ksb.route}
                  </span>
                )}
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4 text-white shrink-0" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-white shrink-0" />
                )}
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-white/10 p-3 space-y-2">
                      {ksb.delivering_units.length > 0 ? (
                        <>
                          <p className="text-[10px] text-white font-medium uppercase tracking-wide">
                            Delivering Units
                          </p>
                          {ksb.delivering_units.map((u, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-2 text-xs p-2 rounded-lg bg-white/3 border border-white/5"
                            >
                              <span className="text-yellow-400 font-mono shrink-0">
                                {u.unit_code}
                              </span>
                              <span className="text-white flex-1 truncate">
                                {u.unit_title}
                              </span>
                              <span
                                className={cn(
                                  'text-[10px] px-1.5 py-0.5 rounded shrink-0',
                                  u.mapping_type === 'primary'
                                    ? 'bg-yellow-400/20 text-yellow-400'
                                    : 'bg-white/10 text-white'
                                )}
                              >
                                {u.mapping_type}
                              </span>
                            </div>
                          ))}
                        </>
                      ) : (
                        <p className="text-xs text-white">No units mapped</p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const configs: Record<string, { icon: typeof CheckCircle2; colour: string; label: string }> = {
    completed: { icon: CheckCircle2, colour: 'text-green-400 bg-green-500/10 border-green-500/20', label: 'Complete' },
    verified: { icon: CheckCircle2, colour: 'text-green-400 bg-green-500/10 border-green-500/20', label: 'Verified' },
    in_progress: { icon: Clock, colour: 'text-blue-400 bg-blue-500/10 border-blue-500/20', label: 'In Progress' },
    evidence_submitted: { icon: Clock, colour: 'text-amber-400 bg-amber-500/10 border-amber-500/20', label: 'Evidence Submitted' },
    not_started: { icon: XCircle, colour: 'text-white bg-white/5 border-white/10', label: 'Not Started' },
  };

  const config = configs[status] || configs.not_started;
  const Icon = config.icon;

  return (
    <span className={cn('text-[10px] px-2 py-0.5 rounded-full border flex items-center gap-1 shrink-0', config.colour)}>
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  );
}
