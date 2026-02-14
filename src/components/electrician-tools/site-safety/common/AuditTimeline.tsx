import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import {
  Clock,
  ChevronDown,
  Plus,
  RefreshCw,
  ArrowRightLeft,
  Trash2,
  Timer,
  XCircle,
  CheckCircle2,
  ThumbsUp,
  ThumbsDown,
  Loader2,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useAuditTrail, type AuditRecordType, type AuditAction } from '@/hooks/useSafetyAuditTrail';

const ACTION_CONFIG: Record<
  AuditAction,
  { label: string; icon: React.ElementType; colour: string; bg: string }
> = {
  created: {
    label: 'Created',
    icon: Plus,
    colour: 'text-green-400',
    bg: 'bg-green-500/20',
  },
  updated: {
    label: 'Updated',
    icon: RefreshCw,
    colour: 'text-blue-400',
    bg: 'bg-blue-500/20',
  },
  status_changed: {
    label: 'Status Changed',
    icon: ArrowRightLeft,
    colour: 'text-amber-400',
    bg: 'bg-amber-500/20',
  },
  deleted: {
    label: 'Deleted',
    icon: Trash2,
    colour: 'text-red-400',
    bg: 'bg-red-500/20',
  },
  extended: {
    label: 'Extended',
    icon: Timer,
    colour: 'text-purple-400',
    bg: 'bg-purple-500/20',
  },
  closed: {
    label: 'Closed',
    icon: CheckCircle2,
    colour: 'text-green-400',
    bg: 'bg-green-500/20',
  },
  cancelled: {
    label: 'Cancelled',
    icon: XCircle,
    colour: 'text-red-400',
    bg: 'bg-red-500/20',
  },
  approved: {
    label: 'Approved',
    icon: ThumbsUp,
    colour: 'text-emerald-400',
    bg: 'bg-emerald-500/20',
  },
  rejected: {
    label: 'Rejected',
    icon: ThumbsDown,
    colour: 'text-red-400',
    bg: 'bg-red-500/20',
  },
};

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatStatusLabel(status: string | undefined): string {
  if (!status) return '—';
  return status.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

interface AuditTimelineProps {
  recordType: AuditRecordType;
  recordId: string | null;
  /** Render collapsed by default */
  defaultOpen?: boolean;
}

export function AuditTimeline({ recordType, recordId, defaultOpen = false }: AuditTimelineProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const { data: entries = [], isLoading } = useAuditTrail(recordType, recordId);

  if (!recordId) return null;

  return (
    <div className="rounded-xl bg-white/5 border border-white/10 overflow-hidden">
      {/* Toggle header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 touch-manipulation active:bg-white/5 transition-colors"
      >
        <span className="flex items-center gap-2 text-sm font-semibold text-white">
          <Clock className="w-4 h-4 text-elec-yellow" />
          Audit Trail
          {entries.length > 0 && (
            <Badge className="text-[10px] px-1.5 py-0 bg-white/10 text-white border-white/20">
              {entries.length}
            </Badge>
          )}
        </span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4 text-white" />
        </motion.div>
      </button>

      {/* Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4">
              <div className="h-px bg-white/10 mb-3" />

              {isLoading ? (
                <div className="flex items-center justify-center py-6">
                  <Loader2 className="w-5 h-5 text-white animate-spin" />
                </div>
              ) : entries.length === 0 ? (
                <p className="text-sm text-white text-center py-4">No history yet</p>
              ) : (
                <div className="space-y-0">
                  {entries.map((entry, index) => {
                    const config = ACTION_CONFIG[entry.action] || ACTION_CONFIG.updated;
                    const ActionIcon = config.icon;
                    const isLast = index === entries.length - 1;

                    return (
                      <div
                        key={entry.id}
                        className={`relative pl-7 pb-4 ${!isLast ? 'border-l-2 border-white/10 ml-2' : 'ml-2'}`}
                      >
                        {/* Timeline dot */}
                        <div
                          className={`absolute left-0 top-0 w-5 h-5 rounded-full ${config.bg} flex items-center justify-center -translate-x-[11px]`}
                        >
                          <ActionIcon className={`w-3 h-3 ${config.colour}`} />
                        </div>

                        {/* Content */}
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`text-xs font-semibold ${config.colour}`}>
                              {config.label}
                            </span>
                            {entry.action === 'status_changed' &&
                              entry.old_values?.status &&
                              entry.new_values?.status && (
                                <span className="text-xs text-white flex items-center gap-1">
                                  <Badge className="text-[10px] px-1.5 py-0 bg-white/10 text-white border-white/20">
                                    {formatStatusLabel(entry.old_values.status as string)}
                                  </Badge>
                                  <span>→</span>
                                  <Badge className="text-[10px] px-1.5 py-0 bg-white/10 text-white border-white/20">
                                    {formatStatusLabel(entry.new_values.status as string)}
                                  </Badge>
                                </span>
                              )}
                          </div>

                          <div className="text-[11px] text-white flex items-center gap-1.5">
                            <Clock className="w-3 h-3" />
                            {formatDate(entry.created_at)}
                          </div>

                          {entry.reason && (
                            <p className="text-xs text-white italic mt-1">{entry.reason}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AuditTimeline;
