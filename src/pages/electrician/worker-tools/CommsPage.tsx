/**
 * CommsPage — Worker Tools → Team comms (ELE-1959).
 *
 * A messaging inbox: every message from the office is a thread the worker can
 * reply in (privately to the office), open attachments in, and acknowledge
 * when — and only when — the office ticked "Must acknowledge".
 *
 * Phones: the list, and a thread opens full-screen with the composer pinned
 * above the keyboard. Desktop: list and thread side by side.
 * The open thread lives in ?thread=<id>, so notifications deep-link and the
 * back gesture closes it.
 */
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCheck, Hash, Loader2, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useWorkerSelfService } from '@/hooks/useWorkerSelfService';
import { useMyInbox } from '@/hooks/useTeamComms';
import type { WorkerThreadSummary } from '@/services/teamCommsService';
import { WorkerToolPage } from '@/pages/electrician/worker-tools/WorkerToolPage';
import { CommsThread } from '@/components/comms/CommsThread';
import { CommsListRow, RowChip } from '@/components/comms/CommsListRow';
import { listTime } from '@/components/comms/commsUi';
import { TeamChatSheet } from '@/components/comms/TeamChatSheet';
import { WT_COMMS_HELP } from '@/components/worker-tools/help/worker-help';

type Filter = 'all' | 'unread' | 'ack';

const needsAck = (t: WorkerThreadSummary) => t.requires_acknowledgement && !t.acknowledged_at;
const isUnread = (t: WorkerThreadSummary) => !t.read_at || t.unread_replies > 0;

export default function CommsPage() {
  const { employee, employeeId } = useWorkerSelfService();
  const firmId = (employee as { employer_id?: string | null } | null | undefined)?.employer_id ?? null;
  const { data: threads = [], isLoading } = useMyInbox(employeeId);

  const [params, setParams] = useSearchParams();
  const threadId = params.get('thread');
  const [filter, setFilter] = useState<Filter>('all');
  const [chatOpen, setChatOpen] = useState(false);

  const counts = useMemo(
    () => ({
      all: threads.length,
      unread: threads.filter(isUnread).length,
      ack: threads.filter(needsAck).length,
    }),
    [threads]
  );

  const shown = useMemo(() => {
    const list =
      filter === 'unread'
        ? threads.filter(isUnread)
        : filter === 'ack'
          ? threads.filter(needsAck)
          : threads;
    // Pinned first, then most recent activity (server order).
    return [...list.filter((t) => t.is_pinned), ...list.filter((t) => !t.is_pinned)];
  }, [threads, filter]);

  const selected = threads.find((t) => t.id === threadId) ?? null;

  const open = (id: string) => {
    const next = new URLSearchParams(params);
    next.set('thread', id);
    setParams(next, { replace: !!threadId });
  };
  const close = () => {
    const next = new URLSearchParams(params);
    next.delete('thread');
    setParams(next, { replace: true });
  };

  const description =
    counts.ack > 0
      ? `${counts.ack} ${counts.ack === 1 ? 'message needs' : 'messages need'} your acknowledgement.`
      : counts.unread > 0
        ? `${counts.unread} unread.`
        : 'Messages from the office. Reply in any message to ask a question.';

  const preview = (t: WorkerThreadSummary) => {
    if (t.last_reply_body !== null && t.last_reply_kind) {
      const who = t.last_reply_kind === 'worker' ? 'You' : t.sent_by_name || 'Office';
      return `${who}: ${t.last_reply_body || 'Sent an attachment'}`;
    }
    return t.content;
  };

  const list = (
    <div className="space-y-3">
      <div
        className="flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.03] p-1"
        data-help="wt-comms.filters"
      >
        {(
          [
            ['all', 'All', counts.all],
            ['unread', 'Unread', counts.unread],
            ['ack', 'To acknowledge', counts.ack],
          ] as const
        ).map(([key, label, n]) => (
          <button
            key={key}
            type="button"
            onClick={() => setFilter(key)}
            aria-pressed={filter === key}
            className={cn(
              'h-11 flex-1 whitespace-nowrap rounded-full px-2 text-[13px] font-medium touch-manipulation transition-colors',
              filter === key ? 'bg-elec-yellow text-black' : 'text-white hover:bg-white/[0.06]'
            )}
          >
            {label}
            <span className={cn('ml-1 tabular-nums', filter === key ? 'text-black' : 'text-white')}>
              {n}
            </span>
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <div className="rounded-2xl border border-white/[0.1] bg-white/[0.03] px-5 py-8 text-center">
          <p className="text-[15px] font-semibold text-white">
            {filter === 'ack'
              ? 'Nothing to acknowledge'
              : filter === 'unread'
                ? 'All caught up'
                : 'No messages yet'}
          </p>
          <p className="mt-1.5 text-[13px] text-white">
            {filter === 'all'
              ? 'Announcements, safety alerts and job messages from the office land here.'
              : 'You have read everything that needs you.'}
          </p>
        </div>
      ) : (
        <div
          className="-mx-4 divide-y divide-white/[0.07] border-y border-white/[0.08] sm:mx-0 sm:overflow-hidden sm:rounded-2xl sm:border"
          data-help="wt-comms.list"
        >
          {shown.map((t) => (
            <CommsListRow
              key={t.id}
              type={t.type}
              title={t.title}
              preview={preview(t)}
              time={listTime(t.last_reply_at ?? t.created_at)}
              unread={isUnread(t)}
              unreadCount={t.unread_replies}
              pinned={t.is_pinned}
              selected={t.id === threadId}
              onClick={() => open(t.id)}
              chips={
                needsAck(t) ? (
                  <RowChip tone="amber">Please acknowledge</RowChip>
                ) : t.requires_acknowledgement && t.acknowledged_at ? (
                  <RowChip tone="green">
                    <CheckCheck className="h-3 w-3" /> Acknowledged
                  </RowChip>
                ) : t.job_title ? (
                  <RowChip>{t.job_title}</RowChip>
                ) : undefined
              }
            />
          ))}
        </div>
      )}
    </div>
  );

  const thread = selected ? (
    <CommsThread
      mode="worker"
      message={selected}
      firmId={firmId}
      myEmployeeId={selected.employee_id}
      myAcknowledgedAt={selected.acknowledged_at}
      onBack={close}
    />
  ) : null;

  return (
    <WorkerToolPage
      eyebrow="Messages"
      title="Team comms"
      description={description}
      help={WT_COMMS_HELP}
      actions={
        <button
          type="button"
          data-help="wt-comms.chat"
          onClick={() => setChatOpen(true)}
          className="inline-flex h-11 items-center gap-2 rounded-full border border-white/[0.14] bg-white/[0.06] px-4 text-[13.5px] font-medium text-white touch-manipulation hover:bg-white/[0.1]"
        >
          <Hash className="h-4 w-4" />
          Team chat
        </button>
      }
    >
      {isLoading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-white" />
        </div>
      ) : (
        <div className="lg:grid lg:grid-cols-[minmax(320px,400px)_1fr] lg:gap-6">
          <div>{list}</div>

          {/* Thread: full-screen layer on phones, a panel beside the list on desktop. */}
          {thread ? (
            <div
              data-help="wt-comms.thread"
              className="fixed inset-0 z-[80] h-[100dvh] lg:sticky lg:inset-auto lg:top-16 lg:z-auto lg:h-[max(540px,calc(100dvh-19rem))] lg:self-start lg:overflow-hidden lg:rounded-2xl lg:border lg:border-white/[0.1]"
            >
              {thread}
            </div>
          ) : (
            <div className="hidden lg:sticky lg:top-16 lg:flex lg:h-[max(540px,calc(100dvh-19rem))] lg:self-start lg:flex-col lg:items-center lg:justify-center lg:rounded-2xl lg:border lg:border-dashed lg:border-white/[0.12]">
              <MessageSquare className="h-8 w-8 text-white" />
              <p className="mt-3 text-[15px] font-semibold text-white">Pick a message</p>
              <p className="mt-1 text-[13px] text-white">Read it, reply, and acknowledge here.</p>
            </div>
          )}
        </div>
      )}

      <TeamChatSheet open={chatOpen} onOpenChange={setChatOpen} firmId={firmId} mode="worker" />
    </WorkerToolPage>
  );
}
