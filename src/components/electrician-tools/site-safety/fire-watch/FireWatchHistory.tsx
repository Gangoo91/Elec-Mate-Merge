import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  ChevronDown,
  Clock,
  Flame,
  FileDown,
  Loader2,
  RotateCcw,
  Search,
  X,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { type FireWatchRecord, type FireWatchChecklistItem } from '@/hooks/useFireWatchRecords';
import { useSafetyPDFExport } from '@/hooks/useSafetyPDFExport';
import { SafetyEmptyState } from '../common/SafetyEmptyState';
import { SafetySkeletonLoader } from '../common/SafetySkeletonLoader';

interface FireWatchHistoryProps {
  records: FireWatchRecord[];
  isLoading: boolean;
  onStartNewWatch?: () => void;
}

const STATUS_CONFIG: Record<
  FireWatchRecord['status'],
  { label: string; bg: string; text: string; border: string }
> = {
  completed: {
    label: 'Completed',
    bg: 'bg-green-500/15',
    text: 'text-green-400',
    border: 'border-green-500/30',
  },
  active: {
    label: 'Active',
    bg: 'bg-amber-500/15',
    text: 'text-amber-400',
    border: 'border-amber-500/30',
  },
  extended: {
    label: 'Extended',
    bg: 'bg-blue-500/15',
    text: 'text-blue-400',
    border: 'border-blue-500/30',
  },
};

function formatDateGB(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function formatTimeGB(dateStr: string): string {
  return new Date(dateStr).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

function groupDateKey(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function groupByDate(records: FireWatchRecord[]): Map<string, FireWatchRecord[]> {
  const grouped = new Map<string, FireWatchRecord[]>();
  for (const record of records) {
    const key = groupDateKey(record.created_at);
    const existing = grouped.get(key) ?? [];
    existing.push(record);
    grouped.set(key, existing);
  }
  return grouped;
}

function ChecklistSummary({ checklist }: { checklist: FireWatchChecklistItem[] }) {
  const total = checklist.length;
  const checked = checklist.filter((c) => c.checked).length;
  return (
    <span className="text-sm text-white">
      {checked}/{total} checks
    </span>
  );
}

function RecordCard({
  record,
  index,
  onStartNewWatch,
}: {
  record: FireWatchRecord;
  index: number;
  onStartNewWatch?: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const { exportPDF, isExporting, exportingId } = useSafetyPDFExport();
  const status = STATUS_CONFIG[record.status];
  const checklist: FireWatchChecklistItem[] = Array.isArray(record.checklist)
    ? record.checklist
    : [];
  const checkedCount = checklist.filter((c) => c.checked).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
      className="rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden"
    >
      {/* Summary row - tap to expand */}
      <button
        onClick={() => setExpanded((prev) => !prev)}
        className="w-full flex items-center gap-3 p-4 touch-manipulation active:bg-white/[0.03] transition-colors"
      >
        <div className="flex-1 text-left space-y-1">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-orange-400 shrink-0" />
            <span className="text-sm font-medium text-white">
              {formatTimeGB(record.start_time)}
              {record.end_time ? ` - ${formatTimeGB(record.end_time)}` : ''}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-white">{record.duration_minutes} min</span>
            <ChecklistSummary checklist={checklist} />
          </div>
        </div>

        {/* Status badge */}
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${status.bg} ${status.text} ${status.border}`}
        >
          {status.label}
        </span>

        <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-5 h-5 text-white" />
        </motion.div>
      </button>

      {/* Expanded checklist detail */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-2 border-t border-white/10 pt-3">
              <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                Checklist
              </h4>
              {checklist.length === 0 ? (
                <p className="text-sm text-white">No checklist data recorded.</p>
              ) : (
                checklist.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 py-2 px-3 rounded-lg bg-white/[0.03]"
                  >
                    <div
                      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 ${
                        item.checked
                          ? 'bg-green-500 border-green-500'
                          : 'border-white/30 bg-transparent'
                      }`}
                    >
                      {item.checked && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <span className="text-sm text-white">{item.label}</span>
                  </div>
                ))
              )}

              {/* Completed info */}
              {record.completed_by && (
                <p className="text-sm text-white pt-1">Completed by: {record.completed_by}</p>
              )}

              {/* Action buttons */}
              <div className="flex gap-2 mt-2">
                {onStartNewWatch && (
                  <button
                    onClick={onStartNewWatch}
                    className="flex-1 h-11 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-sm touch-manipulation active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Start New Watch
                  </button>
                )}
                <button
                  onClick={() => exportPDF('fire-watch', record.id)}
                  disabled={isExporting && exportingId === record.id}
                  className="flex-1 h-11 rounded-xl bg-elec-yellow text-black font-bold text-sm touch-manipulation active:scale-[0.98] transition-all disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-2"
                >
                  {isExporting && exportingId === record.id ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Exporting...
                    </>
                  ) : (
                    <>
                      <FileDown className="w-4 h-4" />
                      Export PDF
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FireWatchHistory({ records, isLoading, onStartNewWatch }: FireWatchHistoryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const matchesSearch =
        !searchQuery ||
        record.completed_by?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.duration_minutes?.toString().includes(searchQuery);
      const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [records, searchQuery, statusFilter]);

  const filterTabs = useMemo(() => {
    const completedCount = records.filter((r) => r.status === 'completed').length;
    const activeCount = records.filter((r) => r.status === 'active').length;
    const extendedCount = records.filter((r) => r.status === 'extended').length;
    return [
      { key: 'all', label: 'All', count: records.length },
      { key: 'completed', label: 'Completed', count: completedCount },
      { key: 'active', label: 'Active', count: activeCount },
      { key: 'extended', label: 'Extended', count: extendedCount },
    ];
  }, [records]);

  if (isLoading) {
    return <SafetySkeletonLoader variant="card" count={3} />;
  }

  if (records.length === 0) {
    return (
      <SafetyEmptyState
        icon={Flame}
        heading="No Fire Watch Records"
        description="Completed fire watch records will appear here. Start a fire watch from the Timer tab to create your first record."
        tip="Records are stored securely in the cloud"
      />
    );
  }

  const grouped = groupByDate(filteredRecords);

  return (
    <div className="space-y-6 pb-8">
      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white" />
        <Input
          placeholder="Search records..."
          className="pl-8 pr-8 h-9 bg-white/5 border-0 focus:ring-1 focus:ring-elec-yellow/50 text-sm touch-manipulation rounded-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 hover:bg-white/10 rounded-full touch-manipulation"
            onClick={() => setSearchQuery('')}
          >
            <X className="h-3.5 w-3.5 text-white" />
          </button>
        )}
      </div>

      {/* Filter chips */}
      <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
        {filterTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setStatusFilter(tab.key)}
            className={`h-9 px-3 rounded-full text-xs font-medium whitespace-nowrap touch-manipulation transition-all ${
              statusFilter === tab.key
                ? 'bg-elec-yellow text-black'
                : 'bg-white/5 text-white border border-white/10'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Empty search state */}
      {filteredRecords.length === 0 ? (
        <div className="py-8 text-center">
          <Search className="w-8 h-8 text-white mx-auto mb-3" />
          <p className="text-sm font-medium text-white">No matching records found</p>
          <p className="text-sm text-white mt-1">Try adjusting your search or filters</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setStatusFilter('all');
            }}
            className="mt-3 h-9 px-4 rounded-full bg-white/5 border border-white/10 text-sm text-white font-medium touch-manipulation transition-all active:scale-95"
          >
            Clear filters
          </button>
        </div>
      ) : (
        Array.from(grouped.entries()).map(([dateLabel, dateRecords]) => (
          <div key={dateLabel} className="space-y-3">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
              {dateLabel}
            </h3>
            <div className="space-y-2">
              {dateRecords.map((record, idx) => (
                <RecordCard
                  key={record.id}
                  record={record}
                  index={idx}
                  onStartNewWatch={onStartNewWatch}
                />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default FireWatchHistory;
