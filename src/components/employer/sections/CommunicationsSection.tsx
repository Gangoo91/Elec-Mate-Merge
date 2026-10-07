/**
 * Employer Hub → Communications (ELE-1959).
 *
 * Every message is a thread. The office (owner, admins, office managers) sends
 * to everyone, a job's crew or chosen people; "Must acknowledge" is a real
 * toggle; the list shows "6 of 8 acknowledged" and the thread can chase the
 * rest (rate-limited in the database). Workers reply in the thread — the
 * office sees every reply and can answer everyone or one person privately.
 * Team chat (channels + DMs) opens from here too.
 *
 * Phones: list, then the thread full-screen with the composer pinned.
 * Desktop: list and thread side by side. Open thread = ?thread=<id>.
 */
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { BellRing, Eye, Hash, MessageSquare, Pin, PinOff, Plus, Search, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { PageFrame, PageHero, LoadingBlocks } from '@/components/employer/editorial';
import { HowItWorks, PageHelpButton, type PageHelpContent } from '@/components/hub/PageHelp';
import { usePinCommunication, useDeleteCommunication } from '@/hooks/useCommunications';
import { teamCommsKeys, useActingFirmId, useChase, useOfficeInbox } from '@/hooks/useTeamComms';
import { getRecipients, type OfficeThreadSummary } from '@/services/teamCommsService';
import { CommsThread } from '@/components/comms/CommsThread';
import { CommsListRow, RowChip } from '@/components/comms/CommsListRow';
import { chaseLockedUntil, chaseTargets, listTime } from '@/components/comms/commsUi';
import { OfficeComposeSheet } from '@/components/comms/OfficeComposeSheet';
import { ReceiptsSheet } from '@/components/comms/ReceiptsSheet';
import { TeamChatSheet } from '@/components/comms/TeamChatSheet';

const COMMS_HELP: PageHelpContent = {
  id: 'employer-comms',
  title: 'Team comms',
  what: 'Send announcements, job messages and safety alerts to your team, with a record of who read and acknowledged them. Each message is a thread the team can reply in.',
  steps: [
    {
      title: 'Send',
      body: 'New message → everyone, a job’s crew, or chosen people. Tick “Must acknowledge” when you need each person to confirm they have read it. Add photos or PDFs.',
    },
    {
      title: 'Watch it land',
      body: 'The list shows “6 of 8 acknowledged”. Open the message to see exactly who has read it, and chase the rest with one tap.',
    },
    {
      title: 'Talk it through',
      body: 'Replies from the team appear in the thread. Reply to everyone, or tap someone’s reply to answer just them.',
    },
  ],
  notes: [
    {
      title: 'Who sees what',
      body: 'A worker sees the message, your replies to everyone, and their own private conversation with the office. They never see each other’s replies. Someone who leaves the team loses access straight away.',
    },
    {
      title: 'Chasing',
      body: 'Chase sends a push and a bell to each person who has not acknowledged (or read) it. Once an hour at most, so nobody gets spammed.',
    },
    {
      title: 'Team chat',
      body: 'For everyday chat use Team chat (channels and direct messages). Use a Comms message when you need the record.',
    },
  ],
  tasks: [
    {
      title: 'Send a message or notice',
      steps: [
        'Tap New message.',
        'Who is it for? Pick Everyone, A job’s crew, or Choose people.',
        'Pick Announcement, Job message or Safety alert. A safety alert asks for acknowledgement unless you untick it.',
        'Tick Must acknowledge if each person has to confirm. Add a title, the message, and any photos or PDFs.',
        'Tap Send to … people.',
      ],
      who: 'Owner, admins and office managers.',
      tour: [
        { target: 'comms.new', caption: 'Tap New message.', opens: true },
        { target: 'comms.audience', caption: 'Pick who it is for: everyone, a job’s crew, or chosen people.' },
        { target: 'comms.send', caption: 'Fill in the title and message, then tap Send.' },
      ],
    },
    {
      title: 'See who has read it',
      steps: [
        'Tap the message in the list. Each row shows, for example, 6 of 8 acknowledged.',
        'Tap the bar at the top of the thread (it says Who) to see each person.',
      ],
      tour: [
        { target: 'comms.list', caption: 'Tap a message to open it.', opens: true },
        { target: 'comms.who', caption: 'Tap here to see exactly who has read it.' },
      ],
    },
    {
      title: 'Chase the people who have not read it',
      steps: [
        'Open the message.',
        'Tap Chase (it shows how many people are left).',
        'Each of them gets a push and a bell. You can chase once an hour.',
      ],
      who: 'Owner, admins and office managers.',
      tour: [
        { target: 'comms.filters', text: 'Awaiting sign-off', caption: 'Awaiting sign-off lists messages still waiting on people.', opens: true },
        { target: 'comms.list', caption: 'Tap the message.', opens: true },
        { target: 'comms.chase', caption: 'Tap Chase to nudge everyone who has not done it yet.' },
      ],
    },
    {
      title: 'Answer a reply',
      steps: [
        'Tap New replies to see threads with something new.',
        'Open the thread. Reply to everyone, or tap someone’s reply to answer just them.',
      ],
      tour: [{ target: 'comms.filters', text: 'New replies', caption: 'New replies shows threads with something new.' }],
    },
  ],
};

type Filter = 'all' | 'replies' | 'ack' | 'safety';

const audienceLabel = (t: OfficeThreadSummary) =>
  t.target_audience === 'all'
    ? `Everyone (${t.recipients_total})`
    : t.target_audience === 'job'
      ? `${t.job_title ?? 'Job'} crew (${t.recipients_total})`
      : `${t.recipients_total} ${t.recipients_total === 1 ? 'person' : 'people'}`;

const progress = (t: OfficeThreadSummary) => {
  const n = t.requires_acknowledgement ? t.ack_count : t.read_count;
  return { n, of: t.recipients_total, word: t.requires_acknowledgement ? 'acknowledged' : 'read' };
};

export const CommunicationsSection = () => {
  const qc = useQueryClient();
  const { data: firmId } = useActingFirmId();
  const { data: threads = [], isLoading } = useOfficeInbox(firmId);
  const pin = usePinCommunication();
  const del = useDeleteCommunication();
  const chase = useChase();

  const [params, setParams] = useSearchParams();
  const threadId = params.get('thread');
  const [filter, setFilter] = useState<Filter>('all');
  const [search, setSearch] = useState('');
  const [composeOpen, setComposeOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [receiptsOpen, setReceiptsOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const selected = threads.find((t) => t.id === threadId) ?? null;

  // Same key as the thread's own recipients query (deduped, realtime-refreshed).
  const recipientsQ = useQuery({
    queryKey: teamCommsKeys.recipients(selected?.id ?? ''),
    queryFn: () => getRecipients(selected!.id),
    enabled: !!selected,
  });
  const people = recipientsQ.data ?? [];

  const stats = useMemo(() => {
    const unreadReplies = threads.reduce((s, t) => s + t.unread_replies, 0);
    const awaiting = threads.filter(
      (t) => t.requires_acknowledgement && t.ack_count < t.recipients_total
    ).length;
    return {
      unreadReplies,
      awaiting,
      total: threads.length,
      safety: threads.filter((t) => t.type === 'alert').length,
    };
  }, [threads]);

  const shown = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = threads.filter((t) => {
      if (q && !`${t.title} ${t.content} ${t.last_reply_body ?? ''}`.toLowerCase().includes(q))
        return false;
      if (filter === 'replies') return t.unread_replies > 0;
      if (filter === 'ack') return t.requires_acknowledgement && t.ack_count < t.recipients_total;
      if (filter === 'safety') return t.type === 'alert';
      return true;
    });
    return [...list.filter((t) => t.is_pinned), ...list.filter((t) => !t.is_pinned)];
  }, [threads, filter, search]);

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

  const refreshInbox = () => qc.invalidateQueries({ queryKey: teamCommsKeys.office });

  const togglePin = (t: OfficeThreadSummary) =>
    pin.mutate(
      { id: t.id, isPinned: !t.is_pinned },
      {
        onSuccess: () => {
          refreshInbox();
          toast.success(t.is_pinned ? 'Unpinned' : 'Pinned to the top for everyone');
        },
        onError: (e) => toast.error(e instanceof Error ? e.message : 'Could not update'),
      }
    );

  const doDelete = (t: OfficeThreadSummary) =>
    del.mutate(t.id, {
      onSuccess: () => {
        setConfirmDelete(false);
        close();
        refreshInbox();
        toast.success('Message deleted');
      },
      onError: (e) => toast.error(e instanceof Error ? e.message : 'Could not delete'),
    });

  const doChase = (t: OfficeThreadSummary) =>
    chase.mutate(t.id, {
      onSuccess: (n) =>
        n > 0
          ? toast.success(`Reminder sent to ${n} ${n === 1 ? 'person' : 'people'}`)
          : toast.message('Nobody to chase'),
      onError: (e) => toast.error(e instanceof Error ? e.message : 'Could not chase'),
    });

  const preview = (t: OfficeThreadSummary) => {
    if (t.last_reply_body !== null && t.last_reply_kind) {
      const who = t.last_reply_kind === 'office' ? 'You' : t.last_reply_author || 'Team';
      return `${who}: ${t.last_reply_body || 'Sent an attachment'}`;
    }
    return t.content;
  };

  const filters: Array<[Filter, string, number]> = [
    ['all', 'All', stats.total],
    ['replies', 'New replies', threads.filter((t) => t.unread_replies > 0).length],
    ['ack', 'Awaiting sign-off', stats.awaiting],
    ['safety', 'Safety', stats.safety],
  ];

  const list = (
    <div className="space-y-3">
      <div className="flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.03] px-4">
        <Search className="h-4 w-4 shrink-0 text-white" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search messages and replies"
          className="h-11 w-full bg-transparent text-[16px] text-white placeholder:text-white/40 focus:outline-none sm:text-[14px]"
        />
      </div>
      <div
        data-help="comms.filters"
        className="-mx-4 flex gap-1.5 overflow-x-auto px-4 pb-0.5 [scrollbar-width:none] sm:mx-0 sm:px-0"
      >
        {filters.map(([k, label, n]) => (
          <button
            key={k}
            type="button"
            onClick={() => setFilter(k)}
            aria-pressed={filter === k}
            className={cn(
              'h-11 shrink-0 whitespace-nowrap rounded-full border px-4 text-[13px] touch-manipulation',
              filter === k
                ? 'border-elec-yellow bg-elec-yellow font-semibold text-black'
                : 'border-white/[0.12] bg-white/[0.05] font-medium text-white'
            )}
          >
            {label} <span className="tabular-nums">{n}</span>
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <div className="rounded-2xl border border-white/[0.1] bg-white/[0.03] px-5 py-10 text-center">
          <p className="text-[15px] font-semibold text-white">
            {threads.length === 0 ? 'No messages yet' : 'Nothing here'}
          </p>
          <p className="mx-auto mt-1.5 max-w-sm text-[13px] text-white">
            {threads.length === 0
              ? 'Send your first message to the team. They can reply, and you see who has read it.'
              : 'Try another filter.'}
          </p>
          {threads.length === 0 && (
            <button
              type="button"
              onClick={() => setComposeOpen(true)}
              className="mt-4 inline-flex h-11 items-center gap-2 rounded-full bg-elec-yellow px-5 text-[14px] font-semibold text-black touch-manipulation"
            >
              <Plus className="h-4 w-4" /> New message
            </button>
          )}
        </div>
      ) : (
        <div
          data-help="comms.list"
          className="-mx-4 divide-y divide-white/[0.07] border-y border-white/[0.08] sm:mx-0 sm:overflow-hidden sm:rounded-2xl sm:border"
        >
          {shown.map((t) => {
            const p = progress(t);
            const complete = p.of > 0 && p.n >= p.of;
            return (
              <CommsListRow
                key={t.id}
                type={t.type}
                title={t.title}
                preview={preview(t)}
                time={listTime(t.last_reply_at ?? t.created_at)}
                unread={t.unread_replies > 0}
                unreadCount={t.unread_replies}
                pinned={t.is_pinned}
                selected={t.id === threadId}
                onClick={() => open(t.id)}
                chips={
                  <>
                    <RowChip tone={complete ? 'green' : t.requires_acknowledgement ? 'amber' : 'neutral'}>
                      {p.n} of {p.of} {p.word}
                    </RowChip>
                    <RowChip>{audienceLabel(t)}</RowChip>
                    {t.reply_count > 0 && (
                      <RowChip>
                        {t.reply_count} {t.reply_count === 1 ? 'reply' : 'replies'}
                      </RowChip>
                    )}
                  </>
                }
              />
            );
          })}
        </div>
      )}
    </div>
  );

  // Office thread chrome: progress + chase strip, receipts, pin, delete.
  const sel = selected;
  const selProgress = sel ? progress(sel) : null;
  const targets = sel ? chaseTargets(people, sel.requires_acknowledgement) : [];
  const locked = sel ? chaseLockedUntil(sel.last_chased_at) : null;

  const thread = sel ? (
    <CommsThread
      mode="office"
      message={{ ...sel, audienceLabel: audienceLabel(sel) }}
      firmId={firmId}
      onBack={close}
      headerActions={
        <>
          <button
            type="button"
            onClick={() => togglePin(sel)}
            className="flex h-11 w-11 items-center justify-center rounded-full touch-manipulation hover:bg-white/[0.06]"
            aria-label={sel.is_pinned ? 'Unpin' : 'Pin to the top'}
          >
            {sel.is_pinned ? (
              <PinOff className="h-5 w-5 text-white" />
            ) : (
              <Pin className="h-5 w-5 text-white" />
            )}
          </button>
          <button
            type="button"
            onClick={() => setConfirmDelete(true)}
            className="flex h-11 w-11 items-center justify-center rounded-full touch-manipulation hover:bg-red-500/10"
            aria-label="Delete message"
          >
            <Trash2 className="h-5 w-5 text-white" />
          </button>
        </>
      }
      subheader={
        selProgress && (
          <div className="flex items-center gap-2 px-3 pb-2.5 lg:px-4">
            <button
              type="button"
              data-help="comms.who"
              onClick={() => setReceiptsOpen(true)}
              className="flex h-11 min-w-0 flex-1 items-center gap-2.5 rounded-xl border border-white/[0.1] bg-white/[0.04] px-3 text-left touch-manipulation hover:bg-white/[0.07]"
            >
              <Eye className="h-4 w-4 shrink-0 text-white" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-semibold text-white">
                  {selProgress.n} of {selProgress.of} {selProgress.word}
                </span>
                <span className="mt-1 block h-1.5 overflow-hidden rounded-full bg-white/[0.1]">
                  <span
                    className={cn(
                      'block h-full rounded-full',
                      selProgress.n >= selProgress.of ? 'bg-emerald-400' : 'bg-elec-yellow'
                    )}
                    style={{
                      width: `${selProgress.of ? Math.round((selProgress.n / selProgress.of) * 100) : 0}%`,
                    }}
                  />
                </span>
              </span>
              <span className="shrink-0 text-[12px] font-medium text-white">Who</span>
            </button>
            {targets.length > 0 && (
              <button
                type="button"
                data-help="comms.chase"
                onClick={() => doChase(sel)}
                disabled={chase.isPending || !!locked}
                title={locked ? 'Chased in the last hour' : undefined}
                className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-xl bg-elec-yellow px-3.5 text-[13px] font-semibold text-black touch-manipulation disabled:bg-white/[0.1] disabled:text-white"
              >
                <BellRing className="h-4 w-4" />
                {locked ? 'Chased' : `Chase ${targets.length}`}
              </button>
            )}
          </div>
        )
      }
    />
  ) : null;

  const heroActions = (
    <>
      <button
        type="button"
        data-help="comms.new"
        onClick={() => setComposeOpen(true)}
        className="inline-flex h-11 items-center gap-1.5 rounded-full bg-elec-yellow px-4 text-[14px] font-semibold text-black touch-manipulation sm:px-5"
      >
        <Plus className="h-4 w-4" /> New message
      </button>
      <button
        type="button"
        onClick={() => setChatOpen(true)}
        className="inline-flex h-11 items-center gap-1.5 rounded-full border border-white/[0.14] bg-white/[0.06] px-3.5 text-[14px] font-medium text-white touch-manipulation sm:px-4"
      >
        <Hash className="h-4 w-4" /> Team chat
      </button>
      <PageHelpButton help={COMMS_HELP} askContext={{ page: 'comms', tab: filter }} />
    </>
  );

  return (
    <PageFrame className="space-y-6 sm:space-y-8 lg:space-y-8">
      <PageHero
        eyebrow="People"
        title="Communications"
        description={
          stats.unreadReplies > 0 || stats.awaiting > 0
            ? [
                stats.unreadReplies > 0 &&
                  `${stats.unreadReplies} new ${stats.unreadReplies === 1 ? 'reply' : 'replies'}`,
                stats.awaiting > 0 &&
                  `${stats.awaiting} ${stats.awaiting === 1 ? 'message' : 'messages'} awaiting sign-off`,
              ]
                .filter(Boolean)
                .join(' · ')
            : 'Messages to your team with replies, read receipts and sign-off.'
        }
        tone="purple"
        actions={heroActions}
      />

      <HowItWorks help={COMMS_HELP} askContext={{ page: 'comms', tab: filter }} />

      {isLoading || !firmId ? (
        <LoadingBlocks />
      ) : (
        <>

          <div className="lg:grid lg:grid-cols-[minmax(340px,420px)_1fr] lg:gap-6">
            <div>{list}</div>
            {thread ? (
              <div className="fixed inset-0 z-[80] h-[100dvh] lg:sticky lg:inset-auto lg:top-20 lg:z-auto lg:h-[calc(100dvh-10rem)] lg:self-start lg:overflow-hidden lg:rounded-2xl lg:border lg:border-white/[0.1]">
                {thread}
              </div>
            ) : (
              <div className="hidden lg:sticky lg:top-20 lg:flex lg:h-[calc(100dvh-10rem)] lg:self-start lg:flex-col lg:items-center lg:justify-center lg:rounded-2xl lg:border lg:border-dashed lg:border-white/[0.12]">
                <MessageSquare className="h-8 w-8 text-white" />
                <p className="mt-3 text-[15px] font-semibold text-white">Pick a message</p>
                <p className="mt-1 text-[13px] text-white">
                  See replies, who has read it, and chase the rest.
                </p>
              </div>
            )}
          </div>
        </>
      )}

      <OfficeComposeSheet
        open={composeOpen}
        onOpenChange={setComposeOpen}
        firmId={firmId}
        onSent={(id) => open(id)}
      />
      <TeamChatSheet open={chatOpen} onOpenChange={setChatOpen} firmId={firmId} mode="office" />
      {sel && (
        <ReceiptsSheet
          open={receiptsOpen}
          onOpenChange={setReceiptsOpen}
          communicationId={sel.id}
          title={sel.title}
          requiresAck={sel.requires_acknowledgement}
          people={people}
          lastChasedAt={sel.last_chased_at}
        />
      )}

      <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <AlertDialogContent className="border-white/[0.1] bg-[hsl(0_0%_10%)]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete this message?</AlertDialogTitle>
            <AlertDialogDescription className="text-white">
              It disappears for everyone, with its replies and the record of who read and
              acknowledged it. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="h-11 touch-manipulation">Keep it</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => sel && doDelete(sel)}
              className="h-11 bg-red-600 text-white touch-manipulation hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PageFrame>
  );
};

export default CommunicationsSection;
