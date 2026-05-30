import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { type FireWatchRecord, type FireWatchChecklistItem } from '@/hooks/useFireWatchRecords';
import { useSafetyPDFExport } from '@/hooks/useSafetyPDFExport';
import { SafetyDocumentShare } from '../common/SafetyDocumentShare';
import {
  FilterBar,
  EmptyState,
  LoadingState,
  Eyebrow,
  ListCard,
  ListRow,
  PrimaryButton,
  SecondaryButton,
  type Tone,
} from '@/components/college/primitives';

interface FireWatchHistoryProps {
  records: FireWatchRecord[];
  isLoading: boolean;
  onStartNewWatch?: () => void;
}

// One colour dimension = status. Completed = done (green), active = live
// watch in progress (amber), extended = continued watch (blue).
const STATUS_LABEL: Record<FireWatchRecord['status'], string> = {
  completed: 'Completed',
  active: 'Active',
  extended: 'Extended',
};

function statusTone(status: FireWatchRecord['status']): Tone | undefined {
  if (status === 'completed') return 'green';
  if (status === 'active') return 'amber';
  if (status === 'extended') return 'blue';
  return undefined;
}

const STATUS_PILL: Record<'green' | 'amber' | 'blue' | 'neutral', string> = {
  green: 'bg-green-500/10 text-green-400 border-green-500/25',
  amber: 'bg-amber-500/10 text-amber-400 border-amber-500/25',
  blue: 'bg-blue-500/10 text-blue-400 border-blue-500/25',
  neutral: 'bg-white/[0.05] text-white/55 border-white/10',
};

function StatusPill({ status }: { status: FireWatchRecord['status'] }) {
  const key = (statusTone(status) as 'green' | 'amber' | 'blue') ?? 'neutral';
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-[0.12em] border whitespace-nowrap',
        STATUS_PILL[key]
      )}
    >
      {STATUS_LABEL[status]}
    </span>
  );
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

function RecordRow({
  record,
  onStartNewWatch,
}: {
  record: FireWatchRecord;
  onStartNewWatch?: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const { exportPDF, isExporting, exportingId } = useSafetyPDFExport();

  const checklist: FireWatchChecklistItem[] = Array.isArray(record.checklist)
    ? record.checklist
    : [];
  const checkedCount = checklist.filter((c) => c.checked).length;
  const exporting = isExporting && exportingId === record.id;

  const timeLabel = `${formatTimeGB(record.start_time)}${
    record.end_time ? ` – ${formatTimeGB(record.end_time)}` : ''
  }`;

  return (
    <div>
      <ListRow
        onClick={() => setExpanded((prev) => !prev)}
        accent={statusTone(record.status)}
        title={timeLabel}
        subtitle={`${record.duration_minutes} min · ${checkedCount}/${checklist.length} checks`}
        trailing={
          <div className="flex items-center gap-2">
            <StatusPill status={record.status} />
            <motion.span
              aria-hidden
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-white/45 text-[13px] leading-none"
            >
              ⌄
            </motion.span>
          </div>
        }
      />

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 sm:px-6 pb-5 pt-1 space-y-3">
              <Eyebrow>Fire watch checklist</Eyebrow>
              {checklist.length === 0 ? (
                <p className="text-[12.5px] text-white/55">No checklist data recorded.</p>
              ) : (
                <div className="space-y-1.5">
                  {checklist.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[hsl(0_0%_9%)] border border-white/[0.06]"
                    >
                      <span
                        className={cn(
                          'h-5 w-5 rounded-full border flex items-center justify-center shrink-0 text-[11px] leading-none',
                          item.checked
                            ? 'bg-emerald-500 border-emerald-500 text-black'
                            : 'border-white/25 text-transparent'
                        )}
                        aria-hidden
                      >
                        ✓
                      </span>
                      <span className="text-[13px] text-white/90">{item.label}</span>
                    </div>
                  ))}
                </div>
              )}

              {record.completed_by && (
                <p className="text-[12px] text-white/55">Completed by {record.completed_by}</p>
              )}

              <div className="flex flex-wrap gap-2 pt-1">
                {onStartNewWatch && (
                  <SecondaryButton onClick={onStartNewWatch}>Start new watch</SecondaryButton>
                )}
                <PrimaryButton
                  disabled={exporting}
                  onClick={() => exportPDF('fire-watch', record.id)}
                >
                  {exporting ? 'Exporting…' : 'Export PDF'}
                </PrimaryButton>
                <SecondaryButton onClick={() => setShowShare(true)}>Share</SecondaryButton>
              </div>

              <SafetyDocumentShare
                open={showShare}
                onClose={() => setShowShare(false)}
                pdfType="fire-watch"
                recordId={record.id}
                documentTitle={`Fire Watch Record — ${record.completed_by || 'Unknown'}`}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
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
      { value: 'all', label: 'All', count: records.length },
      { value: 'completed', label: 'Completed', count: completedCount },
      { value: 'active', label: 'Active', count: activeCount },
      { value: 'extended', label: 'Extended', count: extendedCount },
    ];
  }, [records]);

  if (isLoading) {
    return <LoadingState />;
  }

  if (records.length === 0) {
    return (
      <EmptyState
        title="No fire watch records yet"
        description="Completed fire watch records will appear here. Start a fire watch from the Timer tab to create your first defensible record."
        {...(onStartNewWatch ? { action: 'Start a fire watch', onAction: onStartNewWatch } : {})}
      />
    );
  }

  const grouped = groupByDate(filteredRecords);

  return (
    <div className="space-y-5">
      <FilterBar
        tabs={filterTabs}
        activeTab={statusFilter}
        onTabChange={setStatusFilter}
        search={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search records…"
      />

      {filteredRecords.length === 0 ? (
        <EmptyState
          title="No matching records"
          description="Try a different status tab or clear your search."
          action="Clear filters"
          onAction={() => {
            setSearchQuery('');
            setStatusFilter('all');
          }}
        />
      ) : (
        Array.from(grouped.entries()).map(([dateLabel, dateRecords]) => (
          <div key={dateLabel} className="space-y-2.5">
            <Eyebrow>{dateLabel}</Eyebrow>
            <ListCard>
              {dateRecords.map((record) => (
                <RecordRow
                  key={record.id}
                  record={record}
                  onStartNewWatch={onStartNewWatch}
                />
              ))}
            </ListCard>
          </div>
        ))
      )}
    </div>
  );
}

export default FireWatchHistory;
