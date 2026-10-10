import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  isFollowUpDue,
  type FireWatchRecord,
  type FireWatchChecklistItem,
} from '@/hooks/useFireWatchRecords';
import { FollowUpCheckSheet } from './FollowUpCheckSheet';
import { useSafetyPDFExport } from '@/hooks/useSafetyPDFExport';
import { useSparkProjects } from '@/hooks/useSparkProjects';
import { SafetyDocumentShare } from '../common/SafetyDocumentShare';
import {
  FilterBar,
  EmptyState,
  LoadingState,
  Eyebrow,
  PrimaryButton,
  SecondaryButton,
  type Tone,
} from '@/components/college/primitives';
import { SafetyListCard, SafetyListRow } from '../common/SafetyList';
import { FirmRecordBar } from '../common/FirmRecordBar';
import { useFirmRecordAccess } from '../common/SafetyScope';

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
  // Not "completed" — the hour of watch is done but the HSG168 two-hour check
  // is still outstanding, and the record says so until it is signed off.
  awaiting_follow_up: '2h check due',
  extended: 'Extended',
};

function statusTone(status: FireWatchRecord['status']): Tone | undefined {
  if (status === 'completed') return 'green';
  if (status === 'active') return 'amber';
  if (status === 'awaiting_follow_up') return 'amber';
  if (status === 'extended') return 'blue';
  return undefined;
}

const STATUS_PILL: Record<'green' | 'amber' | 'blue' | 'neutral', string> = {
  // Neutral surface with coloured text, matching Permit to Work and Safe
  // Isolation. Blue is not in the palette; extended reads plain white.
  green: 'bg-white/[0.05] text-emerald-400 border-white/10',
  amber: 'bg-white/[0.05] text-amber-400 border-white/10',
  blue: 'bg-white/[0.05] text-white border-white/10',
  neutral: 'bg-white/[0.05] text-white border-white/10',
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
  // A record still waiting on its two-hour check opens by itself — that check
  // is the one thing on it that needs doing.
  const [expanded, setExpanded] = useState(record.status === 'awaiting_follow_up');
  const [showShare, setShowShare] = useState(false);
  const [showFollowUp, setShowFollowUp] = useState(false);
  // Employer Hub: a worker's shared watch is read and countersigned, not changed.
  const access = useFirmRecordAccess(record);
  const { exportPDF, isExporting, exportingId } = useSafetyPDFExport();
  const { projects: jobs = [] } = useSparkProjects('active');
  const linkedJobTitle = record.job_id
    ? (jobs.find((j) => j.id === record.job_id)?.title ?? null)
    : null;

  const checklist: FireWatchChecklistItem[] = Array.isArray(record.checklist)
    ? record.checklist
    : [];
  const checkedCount = checklist.filter((c) => c.checked).length;
  const exporting = isExporting && exportingId === record.id;
  const followUpDue = isFollowUpDue(record);

  const timeLabel = `${formatTimeGB(record.start_time)}${
    record.end_time ? ` – ${formatTimeGB(record.end_time)}` : ''
  }`;

  return (
    <div>
      <SafetyListRow
        onClick={() => setExpanded((prev) => !prev)}
        accent={statusTone(record.status)}
        title={timeLabel}
        subtitle={`${record.location ? `${record.location} · ` : ''}${record.duration_minutes} min · ${checkedCount}/${checklist.length} checks`}
        trailing={
          <div className="flex items-center gap-2">
            <StatusPill status={record.status} />
            <motion.span
              aria-hidden
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-white text-[13px] leading-none"
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
              <FirmRecordBar
                table="fire_watch_records"
                row={record}
                invalidate={[['fire-watch-records']]}
              />

              {/* The outstanding two-hour check is the one thing on this record
                  that still needs doing, so it sits above the history rather
                  than below it. */}
              {record.status === 'awaiting_follow_up' && (
                <div className="space-y-2 rounded-xl border border-amber-500/30 bg-white/[0.03] p-3">
                  <p className="text-[12.5px] leading-relaxed text-white">
                    {followUpDue
                      ? 'The two-hour check is due now. Re-inspect the area, including voids and the far side of any partition worked on.'
                      : `The two-hour check falls due at ${
                          record.follow_up_due_at ? formatTimeGB(record.follow_up_due_at) : '—'
                        }.`}
                  </p>
                  {access.canEdit && (
                    <SecondaryButton fullWidth onClick={() => setShowFollowUp(true)}>
                      {followUpDue ? 'Do the two-hour check' : 'Record it early'}
                    </SecondaryButton>
                  )}
                </div>
              )}

              {record.follow_up_completed_at && (
                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                  <p className="text-[12.5px] leading-relaxed text-white">
                    Two-hour check{' '}
                    <span
                      className={
                        record.follow_up_all_clear === false ? 'text-red-400' : 'text-emerald-400'
                      }
                    >
                      {record.follow_up_all_clear === false ? 'found signs of fire' : 'all clear'}
                    </span>{' '}
                    — {formatTimeGB(record.follow_up_completed_at)}
                    {record.follow_up_by ? `, ${record.follow_up_by}` : ''}
                  </p>
                  {record.follow_up_notes && (
                    <p className="mt-1 text-[12px] leading-relaxed text-white">
                      {record.follow_up_notes}
                    </p>
                  )}
                </div>
              )}

              <Eyebrow>Fire watch checklist</Eyebrow>
              {checklist.length === 0 ? (
                <p className="text-[12.5px] text-white">No checklist data recorded.</p>
              ) : (
                <div className="space-y-1.5">
                  {checklist.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06]"
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
                      <span className="text-[13px] text-white">{item.label}</span>
                    </div>
                  ))}
                </div>
              )}

              {record.job_id && (
                <p className="text-[12px] text-white">
                  Project: {linkedJobTitle || 'Linked project'}
                </p>
              )}

              {record.completed_by && (
                <p className="text-[12px] text-white">Completed by {record.completed_by}</p>
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

      {/* Mounted outside the collapse so collapsing the row cannot unmount a
          half-filled sign-off. */}
      {access.canEdit && (
        <FollowUpCheckSheet
          record={record}
          open={showFollowUp}
          onClose={() => setShowFollowUp(false)}
        />
      )}
    </div>
  );
}

/**
 * One outstanding check. Employer Hub: a worker's shared watch is listed so the
 * firm can see it, but only the worker can sign the check off.
 */
function FollowUpDueRow({ record: r, onOpen }: { record: FireWatchRecord; onOpen: () => void }) {
  const access = useFirmRecordAccess(r);
  const due = isFollowUpDue(r);
  return (
    <SafetyListRow
      onClick={access.canEdit ? onOpen : undefined}
      accent={due ? 'red' : 'amber'}
      title={r.location || `Watch started ${formatTimeGB(r.start_time)}`}
      subtitle={
        due
          ? 'Due now — re-inspect the area, voids and the far side of any partition'
          : `Due at ${r.follow_up_due_at ? formatTimeGB(r.follow_up_due_at) : '—'}`
      }
      trailing={
        <span className={cn('text-[12px] font-semibold', due ? 'text-red-400' : 'text-amber-400')}>
          {access.canEdit ? (due ? 'Do it now' : 'Record') : 'Worker to check'}
        </span>
      }
    />
  );
}

/**
 * Two-hour checks still outstanding, for the top of the Timer tab. They used
 * to live only inside a collapsed row on the History tab, so the one fire
 * watch task with a deadline was two taps and a scroll away from view.
 */
export function FollowUpsDue({ records }: { records: FireWatchRecord[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const pending = records
    .filter((r) => r.status === 'awaiting_follow_up' && !r.follow_up_completed_at)
    .sort((a, b) => (a.follow_up_due_at || '').localeCompare(b.follow_up_due_at || ''));
  if (pending.length === 0) return null;
  const openRecord = pending.find((r) => r.id === openId) ?? null;
  return (
    <section className="space-y-2">
      <h2 className="text-[15px] font-semibold tracking-tight text-white">
        Two-hour check{pending.length !== 1 ? 's' : ''} outstanding · {pending.length}
      </h2>
      <SafetyListCard>
        {pending.map((r) => (
          <FollowUpDueRow key={r.id} record={r} onOpen={() => setOpenId(r.id)} />
        ))}
      </SafetyListCard>
      {openRecord && (
        <FollowUpCheckSheet
          key={openRecord.id}
          record={openRecord}
          open={!!openRecord}
          onClose={() => setOpenId(null)}
        />
      )}
    </section>
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
        record.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.duration_minutes?.toString().includes(searchQuery);
      const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [records, searchQuery, statusFilter]);

  const filterTabs = useMemo(() => {
    const completedCount = records.filter((r) => r.status === 'completed').length;
    const activeCount = records.filter((r) => r.status === 'active').length;
    const extendedCount = records.filter((r) => r.status === 'extended').length;
    const followUpCount = records.filter((r) => r.status === 'awaiting_follow_up').length;
    return [
      { value: 'all', label: 'All', count: records.length },
      // Was missing: the one status that still needs action had no tab.
      ...(followUpCount > 0
        ? [{ value: 'awaiting_follow_up', label: '2h check due', count: followUpCount }]
        : []),
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
        touch
        title="No fire watch records yet"
        description="Each watch you time is saved here with its checklist, check-ins, sign-off and the two-hour check, ready to export as a PDF for the client or principal contractor."
        {...(onStartNewWatch ? { action: 'Start a fire watch', onAction: onStartNewWatch } : {})}
      />
    );
  }

  const grouped = groupByDate(filteredRecords);

  return (
    <div className="space-y-5">
      <FilterBar
        touch
        tabs={filterTabs}
        activeTab={statusFilter}
        onTabChange={setStatusFilter}
        search={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search records…"
      />

      {filteredRecords.length === 0 ? (
        <EmptyState
          touch
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
            <SafetyListCard>
              {dateRecords.map((record) => (
                <RecordRow key={record.id} record={record} onStartNewWatch={onStartNewWatch} />
              ))}
            </SafetyListCard>
          </div>
        ))
      )}
    </div>
  );
}

export default FireWatchHistory;
