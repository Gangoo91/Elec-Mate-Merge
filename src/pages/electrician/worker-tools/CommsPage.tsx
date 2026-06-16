/**
 * CommsPage — routed Worker Tools page for team communications.
 *
 * Replaces the old CommsSheet bottom sheet. Workers view and acknowledge team
 * communications (messages, alerts, announcements) from the employer. The shell
 * (WorkerToolPage) renders the masthead, hero and team-access guard; this page
 * owns its own list/detail views, loading + empty states and filter tabs.
 *
 * Data layer (useWorkerSelfService hooks, mutations, query keys) is carried over
 * unchanged from CommsSheet — only the chrome and UX have changed.
 */

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDistanceToNow, parseISO } from 'date-fns';
import {
  MessageSquare,
  ChevronLeft,
  AlertTriangle,
  Megaphone,
  Pin,
  Check,
  CheckCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useWorkerSelfService } from '@/hooks/useWorkerSelfService';
import { useRealtimeInvalidate } from '@/hooks/useRealtimeInvalidate';
import {
  Communication,
  CommunicationPriority,
  CommunicationType,
} from '@/services/communicationService';
import {
  StatStrip,
  Pill,
  Divider,
  EmptyState,
  LoadingState,
  PrimaryButton,
  SplitLayout,
  type Tone,
} from '@/components/employer/editorial';
import { WorkerToolPage } from '@/pages/electrician/worker-tools/WorkerToolPage';

type CommsStep = 'list' | 'detail';
type CommsFilter = 'all' | 'unread' | 'action';

type CommWithRecipient = Communication & {
  recipient: { read_at: string | null; acknowledged_at: string | null };
};

const priorityTone = (priority: CommunicationPriority): Tone | null => {
  switch (priority) {
    case 'urgent':
      return 'red';
    case 'high':
      return 'amber';
    default:
      return null;
  }
};

const getTypeIcon = (type: CommunicationType) => {
  switch (type) {
    case 'announcement':
      return Megaphone;
    case 'alert':
      return AlertTriangle;
    case 'message':
    default:
      return MessageSquare;
  }
};

const getTypeTone = (type: CommunicationType, priority: CommunicationPriority): Tone => {
  if (priority === 'urgent') return 'red';
  if (priority === 'high') return 'amber';

  switch (type) {
    case 'announcement':
      return 'yellow';
    case 'alert':
      return 'amber';
    case 'message':
    default:
      return 'blue';
  }
};

const toneIconBg: Record<Tone, string> = {
  blue: 'bg-blue-500/10 text-blue-400',
  emerald: 'bg-emerald-500/10 text-emerald-400',
  amber: 'bg-amber-500/10 text-amber-400',
  purple: 'bg-purple-500/10 text-purple-400',
  yellow: 'bg-elec-yellow/10 text-elec-yellow',
  green: 'bg-green-500/10 text-green-400',
  orange: 'bg-orange-500/10 text-orange-400',
  red: 'bg-red-500/10 text-red-400',
  cyan: 'bg-cyan-500/10 text-cyan-400',
  indigo: 'bg-indigo-500/10 text-indigo-400',
};

const needsAcknowledgement = (priority: CommunicationPriority) =>
  priority === 'urgent' || priority === 'high';

export default function CommsPage() {
  const { employee, employeeId, communications, isLoadingComms, markAsRead, acknowledgeMessage } =
    useWorkerSelfService();

  // Live: an employer sending a message (a new recipient row for this worker) —
  // or any change to one of this worker's recipient rows — refreshes the page
  // instantly, with no manual reload.
  useRealtimeInvalidate(
    'worker-comms',
    [{ table: 'employer_communication_recipients', filter: `employee_id=eq.${employeeId}` }],
    [
      ['my-communications', employeeId],
      ['communications', 'unread', employeeId],
    ],
    Boolean(employeeId)
  );

  const [step, setStep] = useState<CommsStep>('list');
  const [filter, setFilter] = useState<CommsFilter>('all');
  const [selectedComm, setSelectedComm] = useState<CommWithRecipient | null>(null);
  const [isAcknowledging, setIsAcknowledging] = useState(false);

  // Glanceable summary derived from the SAME list data the rows render, so the
  // counts stay in sync with the visible rows after markAsRead/acknowledge
  // (the separately-keyed unreadCount can lag behind the list).
  const summary = useMemo(() => {
    const total = communications.length;
    const unread = communications.filter((c) => !c.recipient.read_at).length;
    const actionPending = communications.filter(
      (c) => needsAcknowledgement(c.priority) && !c.recipient.acknowledged_at
    ).length;
    return { total, unread, actionPending };
  }, [communications]);

  // Filtered + pinned-first ordering.
  const filteredComms = useMemo(() => {
    switch (filter) {
      case 'unread':
        return communications.filter((c) => !c.recipient.read_at);
      case 'action':
        return communications.filter(
          (c) => needsAcknowledgement(c.priority) && !c.recipient.acknowledged_at
        );
      case 'all':
      default:
        return communications;
    }
  }, [communications, filter]);

  const pinnedComms = useMemo(() => filteredComms.filter((c) => c.is_pinned), [filteredComms]);
  const otherComms = useMemo(() => filteredComms.filter((c) => !c.is_pinned), [filteredComms]);

  const handleSelectComm = async (comm: CommWithRecipient) => {
    setSelectedComm(comm);
    setStep('detail');

    // Mark as read if not already
    if (!comm.recipient.read_at && employeeId) {
      try {
        await markAsRead.mutateAsync({
          communicationId: comm.id,
          employeeId,
        });
      } catch {
        // Silent fail for read marking
      }
    }
  };

  const handleBack = () => {
    setStep('list');
    setSelectedComm(null);
  };

  const handleAcknowledge = async () => {
    if (!selectedComm || !employeeId) return;

    setIsAcknowledging(true);
    try {
      await acknowledgeMessage.mutateAsync({
        communicationId: selectedComm.id,
        employeeId,
      });
      toast.success('Message acknowledged');
      setSelectedComm((prev) =>
        prev
          ? {
              ...prev,
              recipient: { ...prev.recipient, acknowledged_at: new Date().toISOString() },
            }
          : null
      );
    } catch {
      toast.error('Failed to acknowledge message');
    } finally {
      setIsAcknowledging(false);
    }
  };

  const showDetail = step === 'detail' && !!selectedComm;

  // Hero copy stays anchored on the list summary so the masthead reads the same
  // whether the desktop detail panel is occupied or the mobile detail step is
  // open (the list remains visible alongside the detail on lg).
  const heroDescription =
    summary.unread > 0
      ? `${summary.unread} unread message${summary.unread !== 1 ? 's' : ''}${
          summary.actionPending > 0
            ? ` · ${summary.actionPending} need${
                summary.actionPending !== 1 ? '' : 's'
              } acknowledgement`
            : ''
        }`
      : 'Messages, alerts and announcements from your employer.';

  const filters: { value: CommsFilter; label: string; count: number }[] = [
    { value: 'all', label: 'All', count: summary.total },
    { value: 'unread', label: 'Unread', count: summary.unread },
    { value: 'action', label: 'Action', count: summary.actionPending },
  ];

  const renderCommButton = (comm: CommWithRecipient) => {
    const Icon = getTypeIcon(comm.type);
    const tone = getTypeTone(comm.type, comm.priority);
    const pTone = priorityTone(comm.priority);
    const isUnread = !comm.recipient.read_at;
    const needsAck = needsAcknowledgement(comm.priority);
    const isAcked = !!comm.recipient.acknowledged_at;

    return (
      <button
        key={comm.id}
        type="button"
        onClick={() => handleSelectComm(comm)}
        className={cn(
          'group w-full min-h-[44px] p-4 rounded-xl border transition-colors touch-manipulation text-left active:scale-[0.99]',
          isUnread
            ? 'bg-elec-yellow/[0.06] border-elec-yellow/25 hover:bg-elec-yellow/[0.09]'
            : 'bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.08]'
        )}
      >
        <div className="flex items-start gap-3">
          <div
            className={cn(
              'h-9 w-9 rounded-lg flex items-center justify-center shrink-0',
              toneIconBg[tone]
            )}
          >
            <Icon className="h-4 w-4" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {isUnread && (
                <span aria-hidden className="h-2 w-2 rounded-full bg-elec-yellow shrink-0" />
              )}
              {comm.is_pinned && <Pin className="h-3 w-3 text-elec-yellow shrink-0" />}
              <p
                className={cn(
                  'text-[14px] truncate',
                  isUnread ? 'font-semibold text-white' : 'font-medium text-white/90'
                )}
              >
                {comm.title}
              </p>
            </div>

            <p className="text-[12.5px] text-white/70 line-clamp-2 mb-2 leading-relaxed">
              {comm.content}
            </p>

            <div className="flex items-center justify-between gap-2">
              <p className="text-[11px] text-white/45 tabular-nums">
                {formatDistanceToNow(parseISO(comm.created_at), { addSuffix: true })}
              </p>

              <div className="flex items-center gap-1.5 shrink-0">
                {pTone && (
                  <Pill tone={pTone} className="capitalize">
                    {comm.priority}
                  </Pill>
                )}
                {needsAck &&
                  (isAcked ? (
                    <Pill tone="emerald">
                      <CheckCheck className="h-3 w-3 mr-1" />
                      Acknowledged
                    </Pill>
                  ) : (
                    <Pill tone="amber">Needs ack</Pill>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </button>
    );
  };

  // Detail body — shared between the mobile detail step and the persistent
  // lg detail panel. `withBack` toggles the mobile-only back affordance.
  const renderDetailBody = (comm: CommWithRecipient, withBack: boolean) => {
    const ackPending = needsAcknowledgement(comm.priority) && !comm.recipient.acknowledged_at;

    return (
      <div className="space-y-5">
        {/* Back to list (mobile only — lg keeps the list beside the detail) */}
        {withBack && (
          <button
            type="button"
            onClick={handleBack}
            className="lg:hidden inline-flex items-center gap-1 -ml-1 h-11 pr-3 text-[13px] font-medium text-white/70 hover:text-white touch-manipulation"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to all messages
          </button>
        )}

        {/* Title */}
        <h3 className="text-[20px] sm:text-[24px] font-semibold tracking-tight text-white leading-tight">
          {comm.title}
        </h3>

        {/* Type and priority pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <Pill tone={getTypeTone(comm.type, comm.priority)}>
            <span className="capitalize">{comm.type}</span>
          </Pill>
          {priorityTone(comm.priority) && (
            <Pill tone={priorityTone(comm.priority)!} className="capitalize">
              {comm.priority}
            </Pill>
          )}
          {comm.is_pinned && (
            <Pill tone="yellow">
              <Pin className="h-3 w-3 mr-1" />
              Pinned
            </Pill>
          )}
        </div>

        {/* Meta */}
        <div className="flex items-center gap-2 flex-wrap text-[12px] text-white/55">
          <span className="tabular-nums">
            {formatDistanceToNow(parseISO(comm.created_at), { addSuffix: true })}
          </span>
          {comm.recipient.read_at && (
            <>
              <span aria-hidden>·</span>
              <span className="flex items-center gap-1 text-emerald-400">
                <Check className="h-3 w-3" />
                Read
              </span>
            </>
          )}
          {comm.recipient.acknowledged_at && (
            <>
              <span aria-hidden>·</span>
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCheck className="h-3 w-3" />
                Acknowledged
              </span>
            </>
          )}
        </div>

        {/* Content */}
        <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
          <p className="text-[14px] text-white whitespace-pre-wrap leading-relaxed">
            {comm.content}
          </p>
        </div>

        {/* Acknowledged confirmation (when no action remains) */}
        {needsAcknowledgement(comm.priority) && comm.recipient.acknowledged_at && (
          <div className="rounded-xl bg-emerald-500/[0.08] border border-emerald-500/20 px-4 py-3 flex items-center gap-2.5">
            <CheckCheck className="h-4 w-4 text-emerald-400 shrink-0" />
            <p className="text-[12.5px] text-emerald-300">You have acknowledged this message.</p>
          </div>
        )}

        {/* Acknowledge action */}
        {ackPending && (
          <PrimaryButton onClick={handleAcknowledge} disabled={isAcknowledging} fullWidth size="lg">
            {isAcknowledging ? (
              <>
                <span className="h-4 w-4 mr-2 rounded-full border-2 border-black/40 border-t-transparent animate-spin" />
                Acknowledging…
              </>
            ) : (
              <>
                <CheckCheck className="h-5 w-5 mr-2" />
                Acknowledge message
              </>
            )}
          </PrimaryButton>
        )}
      </div>
    );
  };

  // The message list panel (summary + filter tabs + rows). Spans the full width
  // on mobile; sits in the left column of the lg master-detail split. The desktop
  // and mobile copies are both mounted (one CSS-hidden), so the active-filter
  // pill needs a distinct layoutId per copy to avoid framer-motion sharing the
  // shared-layout animation across the two trees.
  const renderListPanel = (pillLayoutId: string) => (
    <div className="space-y-6">
      {/* Glanceable summary — spans full width, responsive grid */}
      <StatStrip
        columns={3}
        stats={[
          { label: 'Total', value: summary.total },
          {
            label: 'Unread',
            value: summary.unread,
            accent: summary.unread > 0,
          },
          {
            label: 'Action',
            value: summary.actionPending,
            tone: summary.actionPending > 0 ? 'amber' : undefined,
          },
        ]}
      />

      {/* Filter tabs */}
      <div className="flex items-center gap-1 p-1 bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-full">
        {filters.map((f) => {
          const isActive = filter === f.value;
          return (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              aria-pressed={isActive}
              className={cn(
                'relative flex-1 h-11 rounded-full text-[12.5px] font-medium whitespace-nowrap transition-colors touch-manipulation',
                isActive ? 'text-black' : 'text-white/70 hover:text-white'
              )}
            >
              {isActive && (
                <motion.span
                  layoutId={pillLayoutId}
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  className="absolute inset-0 bg-elec-yellow rounded-full"
                />
              )}
              <span className="relative z-10">
                {f.label}
                <span
                  className={cn(
                    'ml-1.5 tabular-nums text-[11px]',
                    isActive ? 'text-black/60' : 'text-white/50'
                  )}
                >
                  {f.count}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Empty filter result */}
      {filteredComms.length === 0 ? (
        <EmptyState
          title={
            filter === 'unread'
              ? 'All caught up'
              : filter === 'action'
                ? 'Nothing needs your action'
                : 'No messages'
          }
          description={
            filter === 'unread'
              ? 'You have read every message.'
              : filter === 'action'
                ? 'No high-priority messages are awaiting acknowledgement.'
                : undefined
          }
        />
      ) : (
        <div className="space-y-2">
          {pinnedComms.length > 0 && (
            <>
              <Divider label="Pinned" />
              {pinnedComms.map(renderCommButton)}
              {otherComms.length > 0 && <Divider label="Recent" />}
            </>
          )}
          {otherComms.map(renderCommButton)}
        </div>
      )}
    </div>
  );

  // The right-hand detail panel (lg only). Shows the selected message or a
  // placeholder prompting the user to pick one.
  const detailPanel = (
    <div className="lg:sticky lg:top-20">
      {selectedComm ? (
        renderDetailBody(selectedComm, false)
      ) : (
        <EmptyState
          title="Select a message"
          description="Choose a message from the list to read it here."
        />
      )}
    </div>
  );

  return (
    <WorkerToolPage eyebrow="Messages" title="Team Comms" description={heroDescription}>
      {isLoadingComms ? (
        <LoadingState />
      ) : communications.length === 0 ? (
        <EmptyState
          title="No messages yet"
          description="Updates, alerts and announcements from your employer will appear here."
        />
      ) : (
        <>
          {/* Desktop master-detail: list left, detail right. */}
          <div className="hidden lg:block">
            <SplitLayout
              ratio="3-2"
              primary={renderListPanel('comms-filter-pill-lg')}
              secondary={detailPanel}
            />
          </div>

          {/* Mobile: single-column list → detail view (existing step state). */}
          <div className="lg:hidden">
            <AnimatePresence mode="wait" initial={false}>
              {!showDetail ? (
                <motion.div
                  key="list"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderListPanel('comms-filter-pill-mobile')}
                </motion.div>
              ) : (
                <motion.div
                  key="detail"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderDetailBody(selectedComm!, true)}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </>
      )}
    </WorkerToolPage>
  );
}
