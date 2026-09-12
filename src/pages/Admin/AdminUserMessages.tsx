import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNowStrict } from 'date-fns';
import { useAdminUsersBase } from '@/hooks/useAdminUsersBase';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar as ShadAvatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import {
  RefreshCw,
  ArrowLeft,
  Search,
  Users,
  CheckCheck,
  PenSquare,
  Archive,
  ArchiveRestore,
  Mail,
  Trash2,
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { useHaptic } from '@/hooks/useHaptic';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import PullToRefresh from '@/components/admin/PullToRefresh';
import MessageUserSheet from '@/components/admin/MessageUserSheet';
import ChatThread from '@/components/messaging/ChatThread';
import { SwipeableRow } from '@/components/ui/swipeable-row';
import {
  Segmented,
  Panel,
  RoundAvatar,
  GOOD,
  SERIOUS,
} from '@/components/admin/overview/primitives';
import {
  useAdminInbox,
  useArchiveConversation,
  useDeleteMessages,
  sortAdminConversations,
  ADMIN_INBOX_QUERY_KEY,
  type AdminConversation,
} from '@/hooks/useAdminInbox';
import {
  PageFrame,
  Eyebrow,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Avatar,
  Pill,
  EmptyState,
  LoadingBlocks,
  IconButton,
  type Tone,
} from '@/components/admin/editorial';

function relativeTime(date: Date): string {
  const now = Date.now();
  const diff = now - date.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'now';
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks}w`;
  const months = Math.floor(days / 30);
  return `${months}mo`;
}

function roleToTone(role: string | null | undefined): Tone {
  switch (role) {
    case 'apprentice':
      return 'purple';
    case 'employer':
      return 'blue';
    case 'electrician':
    default:
      return 'yellow';
  }
}

/** Waiting time in words: "4h", "3 days", "2 months". */
function waitLabel(ms: number): string {
  const mins = Math.floor(ms / 60000);
  if (mins < 60) return `${Math.max(1, mins)}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 14) return `${days} day${days === 1 ? '' : 's'}`;
  if (days < 60) return `${Math.floor(days / 7)} weeks`;
  return `${Math.floor(days / 30)} months`;
}

/* Ordered least to most severe. Validated dark-surface steps — the same set
   used across the admin pages, with amber and red carrying the age. */
const MSG_SERIES = ['#199E70', '#3987E5', '#FAB219', '#E66767'] as const;

/**
 * The list is grouped by how long people have waited, and the group header is
 * the thing that says so.
 *
 * Wait age used to be stated four separate times on one screen — a stacked bar
 * in the hero, a rail of age filter tabs, a coloured spine on every row, and
 * the wait figure itself. Three of those are redundant. A group heading labels
 * itself, so the tabs and the spine both go: you read OVER A MONTH · 4 once and
 * every row beneath it inherits the meaning, which is also why the rows can now
 * be quieter than they were.
 *
 * Order is worst-first. Answered threads sit at the bottom under their own
 * heading rather than being a filter you have to go looking for.
 */
const WAIT_GROUPS = [
  { key: 'older', label: 'Waiting over a month', fill: MSG_SERIES[3] },
  { key: 'month', label: 'Waiting over a week', fill: MSG_SERIES[2] },
  { key: 'week', label: 'Waiting a few days', fill: MSG_SERIES[1] },
  { key: 'day', label: 'Came in today', fill: MSG_SERIES[0] },
  { key: 'answered', label: 'Answered', fill: 'rgba(255,255,255,0.26)' },
] as const;

type WaitGroupKey = (typeof WAIT_GROUPS)[number]['key'];

export default function AdminUserMessages() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const haptic = useHaptic();
  const [search, setSearch] = useState('');
  // ELE-1416 — hold only the partner id, never a snapshot of the conversation.
  // Previously this stored the whole AdminConversation object captured when
  // the thread was opened. Sending a reply invalidated the query and refetched
  // the LIST, but the open thread kept rendering the stale captured `messages`
  // array — so the "Reply sent" toast fired and the reply never appeared.
  // Deriving from live query data means the thread updates on every refetch.
  const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(null);
  /*
    Archived threads were unreachable.

    `useAdminInbox` has always taken a view, but this page only ever asked for
    'inbox' — so archiving put a conversation somewhere with no way back. You
    could hide a support thread for ever and never find it again.
  */
  const [view, setView] = useState<'inbox' | 'archived'>('inbox');
  const [composeOpen, setComposeOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<{
    id: string;
    full_name?: string;
    email?: string;
    role?: string;
  } | null>(null);

  // ELE-1415/1417 — grouping moved to the shared useAdminInbox hook so the
  // admin page and the user-side Messages sheet read the same conversations.
  const { data: conversations, isLoading, refetch, isFetching } = useAdminInbox(true, view);

  /*
    Search reaches into the view you are not looking at.

    "Did I already answer someone about this?" is the commonest reason to
    search a support inbox, and the answer is nearly always in Archived — which
    the search could not see, because the query is keyed per view. This fetches
    the other side only while a search is actually running, and reports the
    count rather than merging the results, so the list you are reading stays
    the list you asked for.
  */
  const searching = search.trim().length >= 2;
  const { data: otherViewConversations } = useAdminInbox(
    searching,
    view === 'inbox' ? 'archived' : 'inbox'
  );

  const isMobile = useIsMobile();
  const archive = useArchiveConversation();
  const remove = useDeleteMessages();

  /*
    Delete, kept clearly apart from archive.

    Archive means "handled, out of my inbox" and is reversible from the Archived
    tab. Delete means "this should not be here": it sets `deleted_at`, so the
    thread vanishes from every surface at once, and the only way back is the
    Undo on the toast. The row survives because a support thread is the record
    of what somebody reported.
  */
  const deleteConversation = (conv: AdminConversation) => {
    const ids = conv.messages.map((m) => m.id);
    const name = conv.partner?.full_name || 'Conversation';
    if (selectedPartnerId === conv.partnerId) setSelectedPartnerId(null);
    remove.mutate(
      { messageIds: ids, deleted: true },
      {
        onSuccess: () =>
          toast({
            title: `${name} deleted`,
            description: `${ids.length} message${ids.length === 1 ? '' : 's'} removed from every view.`,
            action: (
              <ToastAction
                altText="Undo delete"
                onClick={() => remove.mutate({ messageIds: ids, deleted: false })}
              >
                Undo
              </ToastAction>
            ),
          }),
        onError: (e: Error) =>
          toast({ title: 'Could not delete', description: e.message, variant: 'destructive' }),
      }
    );
  };

  // Swipe-to-archive, matching the Messages-sheet inbox. This page previously
  // had no way at all to clear a conversation — a thread you had dealt with sat
  // in the list for ever, so old items kept resurfacing and the queue never
  // emptied. Archiving hides the row; it does not delete, so a mis-swipe on a
  // phone costs nothing and the support record survives.
  const unarchiveConversation = (conv: AdminConversation) => {
    const ids = conv.messages.map((m) => m.id);
    const name = conv.partner?.full_name || 'Conversation';
    archive.mutate(
      { messageIds: ids, archived: false },
      {
        onSuccess: () => toast({ title: `${name} back in the inbox` }),
        onError: (e: Error) =>
          toast({ title: 'Could not restore', description: e.message, variant: 'destructive' }),
      }
    );
  };

  /*
    Clear a whole filtered set at once.

    Thirteen threads were answered by email months ago and each needs the same
    two-word verdict; doing that one swipe at a time is why the queue never got
    emptied in the first place. Undo restores the lot.
  */
  const markAllAnswered = () => {
    const convs = filteredConversations;
    const ids = convs.flatMap((c) => c.messages.map((m) => m.id));
    if (!ids.length) return;
    setSelectedPartnerId(null);
    archive.mutate(
      { messageIds: ids, archived: true },
      {
        onSuccess: () =>
          toast({
            title: `${convs.length} thread${convs.length === 1 ? '' : 's'} marked answered`,
            description: 'Moved to Archived. Nothing was deleted.',
            action: (
              <ToastAction
                altText="Undo"
                onClick={() => archive.mutate({ messageIds: ids, archived: false })}
              >
                Undo
              </ToastAction>
            ),
          }),
        onError: (e: Error) =>
          toast({ title: 'Could not update', description: e.message, variant: 'destructive' }),
      }
    );
  };

  /*
    Reply by email, and let the app know it happened.

    The whole reason this queue read "15 open" with a seven-month-old thread at
    the top is that replies go out from a mail client and nothing writes them
    back. Fighting that habit by demanding replies go through the in-app
    composer would just leave the queue wrong in a different way.

    So: hand the mail client a pre-filled draft — right person, thread subject,
    their message quoted — and mark the thread answered on the way out. The
    reply still happens in Gmail; the app finally learns that it did.
  */
  const replyByEmail = (conv: AdminConversation) => {
    // profiles has no email column — it lives on auth.users, and
    // `admin-get-users` (already cached here for the compose picker) is the one
    // place that joins the two.
    const email = emailByUserId.get(conv.partnerId);
    if (!email) {
      toast({
        title: 'No email address',
        description: 'This account has no email to reply to.',
        variant: 'destructive',
      });
      return;
    }
    const name = conv.partner?.full_name?.split(' ')[0] || 'there';
    const last = conv.lastMessage;
    const quoted = (last?.message ?? '')
      .split('\n')
      .map((line) => `> ${line}`)
      .join('\n');
    const subject = last?.subject?.trim() ? `Re: ${last.subject}` : 'Your Elec-Mate message';
    const body = `Hi ${name},\n\n\n\nYou wrote:\n${quoted}\n\nThanks\nAndrew\nFounder, Elec-Mate`;
    window.open(
      `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
      '_self'
    );
    archiveConversation(conv);
  };

  const archiveConversation = (conv: AdminConversation) => {
    const ids = conv.messages.map((m) => m.id);
    const name = conv.partner?.full_name || 'Conversation';
    if (selectedPartnerId === conv.partnerId) setSelectedPartnerId(null);
    archive.mutate(
      { messageIds: ids, archived: true },
      {
        onSuccess: () =>
          toast({
            title: `${name} marked answered`,
            description: 'Moved to Archived. Nothing was deleted.',
            action: (
              <ToastAction
                altText="Undo archive"
                onClick={() => archive.mutate({ messageIds: ids, archived: false })}
              >
                Undo
              </ToastAction>
            ),
          }),
        onError: (e: Error) =>
          toast({ title: 'Could not archive', description: e.message, variant: 'destructive' }),
      }
    );
  };

  /*
    Compose search never returned anybody.

    It selected `id, full_name, email, role` from `profiles` and filtered on
    `email.ilike` — but there is no email column on profiles; it lives on
    auth.users. PostgREST answered 42703 every time, `data` came back null, and
    the query swallowed it with `|| []`, so the picker showed "No users found"
    for every search and you could not start a conversation with anyone.

    `admin-get-users` is the one place that joins the two, and the admin app
    already has it cached, so this filters that rather than issuing a query
    that cannot succeed.
  */
  const { data: allAdminUsers } = useAdminUsersBase();
  const emailByUserId = useMemo(
    () => new Map((allAdminUsers ?? []).map((u) => [u.id, u.email])),
    [allAdminUsers]
  );

  /*
    Who you are actually replying to.

    A name and a role pill was everything this page knew about the person, so a
    paying customer who was in the app yesterday and someone who reported a
    crash in February and never came back looked identical. Of the ten open
    threads, seven are live paying customers and three have churned — which is
    the difference between an urgent reply and a post-mortem.

    `useAdminUsersBase` already carries subscribed / tier / last_sign_in and is
    already loaded on this page for the compose picker, so this is free.
  */
  const partnerContext = useMemo(() => {
    const m = new Map<
      string,
      { paying: boolean; tier?: string; lastSeen?: string | null; joined?: string }
    >();
    (allAdminUsers ?? []).forEach((u) =>
      m.set(u.id, {
        paying: !!u.subscribed,
        tier: u.subscription_tier,
        lastSeen: u.last_sign_in,
        joined: u.created_at,
      })
    );
    return m;
  }, [allAdminUsers]);

  /** How many open threads are from someone still paying. */
  const payingOpen = useMemo(
    () =>
      (conversations ?? []).filter(
        (c) => c.awaitingReply && partnerContext.get(c.partnerId)?.paying
      ).length,
    [conversations, partnerContext]
  );
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (q.length < 2) return [];
    return (allAdminUsers ?? [])
      .filter(
        (u) =>
          u.full_name?.toLowerCase().includes(q) ||
          u.email?.toLowerCase().includes(q) ||
          u.username?.toLowerCase().includes(q)
      )
      .slice(0, 10)
      .map((u) => ({
        id: u.id,
        full_name: u.full_name ?? undefined,
        email: u.email,
        role: u.role,
      }));
  }, [allAdminUsers, searchQuery]);

  const markAsReadMutation = useMutation({
    mutationFn: async (messageIds: string[]) => {
      // No recipient filter: inbound rows may be addressed to another admin's
      // id, and any admin reading the thread settles it for the whole team.
      // RLS "Admins can update messages" scopes this to admins.
      const { error } = await supabase
        .from('admin_messages')
        .update({ read_at: new Date().toISOString() })
        .in('id', messageIds);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-user-messages'] });
    },
    onError: (error: Error) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  const sendReplyMutation = useMutation({
    mutationFn: async ({ recipientId, message }: { recipientId: string; message: string }) => {
      const { error } = await supabase.from('admin_messages').insert({
        sender_id: user?.id,
        recipient_id: recipientId,
        subject: 'Reply',
        message,
        message_type: 'in_app',
      });

      if (error) throw error;

      // Notification (push + email fallback) is handled server-side by the
      // `notify-message` edge function via a trigger on admin_messages INSERT —
      // reliable regardless of this client, no double-send here.
    },
    onSuccess: () => {
      haptic.success();
      // ChatThread owns the draft and clears it on send.
      queryClient.invalidateQueries({ queryKey: ADMIN_INBOX_QUERY_KEY });
    },
    onError: (error) => {
      haptic.error();
      toast({
        title: 'Failed to send',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // ELE-1416 — resolved from live query data on every render, so a reply that
  // lands via invalidateQueries appears in the open thread immediately.
  const selectedConversation =
    conversations?.find((c) => c.partnerId === selectedPartnerId) ?? null;

  const handleOpenConversation = (conv: AdminConversation) => {
    setSelectedPartnerId(conv.partnerId);

    const unreadIds = conv.messages
      .filter((m) => !!m.recipient?.admin_role && !m.read_at)
      .map((m) => m.id);

    if (unreadIds.length > 0) {
      markAsReadMutation.mutate(unreadIds);
    }
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const stats = useMemo(() => {
    if (!conversations) {
      return {
        unread: 0,
        unreadConversations: 0,
        today: 0,
        thisWeek: 0,
        total: 0,
        awaiting: 0,
        oldestWaitMs: 0,
        oldestWaitName: null as string | null,
      };
    }
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const weekAgo = now.getTime() - 7 * 24 * 60 * 60 * 1000;

    let unread = 0;
    let today = 0;
    let thisWeek = 0;
    let total = 0;
    // ELE-1415 — conversations where the user spoke last, i.e. people actually
    // waiting on us. Counted per conversation, not per message.
    let awaiting = 0;

    conversations.forEach((conv) => {
      unread += conv.unreadCount;
      if (conv.awaitingReply) awaiting += 1;
      conv.messages.forEach((m) => {
        total += 1;
        const t = new Date(m.created_at).getTime();
        if (t >= startOfDay) today += 1;
        if (t >= weekAgo) thisWeek += 1;
      });
    });

    /*
      How long the longest-waiting person has been waiting.

      The page led with "Today 0 · This week 0" while fourteen people were
      queued and the oldest had been waiting three months. Two of the four
      headline cells were structurally zero — they count messages received in
      the last 24 hours and 7 days, so on any quiet day they read nought and
      the queue behind them was invisible. Age of the oldest unanswered thread
      is the number that actually says how bad it is.
    */
    let oldestWaitMs = 0;
    let oldestWaitName: string | null = null;
    conversations.forEach((conv) => {
      if (!conv.awaitingReply) return;
      const last = conv.messages[conv.messages.length - 1];
      if (!last) return;
      const waited = Date.now() - new Date(last.created_at).getTime();
      if (waited > oldestWaitMs) {
        oldestWaitMs = waited;
        oldestWaitName = conv.partner?.full_name ?? null;
      }
    });

    // Conversations, not messages — see the tab counts below for why.
    const unreadConversations = conversations.filter((c) => c.unreadCount > 0).length;

    return {
      unread,
      unreadConversations,
      today,
      thisWeek,
      total,
      awaiting,
      oldestWaitMs,
      oldestWaitName,
    };
  }, [conversations]);

  /*
    How long someone has been waiting, in words, and banded by severity.

    Everything on this page rendered the age of a thread as small grey text on
    the right ("3mo"), identical for a message sent an hour ago and one sent in
    May, on the one screen where the age IS the problem.
  */
  /*
    How long the person at the other end has been waiting.

    One definition, used by the hero bar, the filter rail and the row — before
    this the rail split on read-state and the hero split on age, so the two
    halves of the page measured different things.
  */
  const waitBucketOf = (conv: AdminConversation): WaitGroupKey => {
    if (!conv.awaitingReply) return 'answered';
    const last = conv.messages[conv.messages.length - 1];
    if (!last) return 'answered';
    const waited = Date.now() - new Date(last.created_at).getTime();
    if (waited < 86400000) return 'day';
    if (waited < 7 * 86400000) return 'week';
    if (waited < 30 * 86400000) return 'month';
    return 'older';
  };

  // Search the whole thread, not just the last message — the thing you
  // remember is rarely the most recent line. Shared so the count for the other
  // view cannot drift from the list you can see.
  const matchesSearch = (conv: AdminConversation, q: string) =>
    !q ||
    !!conv.partner?.full_name?.toLowerCase().includes(q) ||
    conv.messages.some((m) => m.message?.toLowerCase().includes(q));

  const otherViewMatches = useMemo(() => {
    if (!searching) return 0;
    const q = search.trim().toLowerCase();
    return (otherViewConversations ?? []).filter((c) => matchesSearch(c, q)).length;
  }, [otherViewConversations, search, searching]);

  const filteredConversations = useMemo(() => {
    if (!conversations) return [];
    const searchLower = search.toLowerCase();

    const filtered = conversations.filter((conv) => matchesSearch(conv, searchLower));

    // ELE-1415 — the list had no sort at all, so ordering fell out of Map
    // insertion. Shared sort: needs answering, then unopened, then recency.
    return sortAdminConversations(filtered);
  }, [conversations, search]);

  /*
    The list, cut into wait-age sections in worst-first order.

    Empty sections are dropped rather than rendered as a heading with nothing
    under it, so on a quiet day the page is short instead of being four labels
    and a blank.
  */
  const grouped = useMemo(() => {
    // Archived threads are done with. "Waiting over a month" is the wrong
    // thing to say about something you have deliberately put away, so that
    // view stays one flat list.
    if (view === 'archived') {
      return filteredConversations.length
        ? [{ key: 'archived', label: 'Put away', fill: 'rgba(255,255,255,0.26)', rows: filteredConversations }]
        : [];
    }
    return WAIT_GROUPS.map((g) => ({
      ...g,
      rows: filteredConversations.filter((c) => waitBucketOf(c) === g.key),
    })).filter((g) => g.rows.length > 0);
  }, [filteredConversations, view]);

  return (
    <PullToRefresh
      onRefresh={async () => {
        await refetch();
      }}
    >
      <PageFrame className="space-y-5 sm:space-y-6">
        {/* Title row — same shape as the dashboard, Trials and Revenue. */}
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-[22px] font-semibold leading-7 tracking-[-0.02em] text-white lg:text-[26px] lg:leading-[30px]">
              Messages
            </h1>
            <div className="mt-0.5 flex items-center gap-2 text-[12px] text-white">
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: stats.awaiting > 0 ? SERIOUS : GOOD }}
              />
              {stats.awaiting > 0
                ? `${stats.awaiting} open`
                : 'Everything answered'}
            </div>
          </div>
          <IconButton onClick={() => refetch()} aria-label="Refresh" disabled={isFetching}>
            <RefreshCw className={cn('h-4 w-4', isFetching && 'animate-spin')} />
          </IconButton>
        </div>

        {/*
          The queue, and how long the worst of it has been waiting.

          The four cells read Awaiting 14 / Unread 9 / Today 0 / This week 0 —
          two of them structurally zero, because they count messages arriving in
          the last 24 hours and 7 days, so on any quiet day the most prominent
          figures on the page are noughts while fourteen people sit unanswered
          and the oldest has waited three months. Age of the longest wait is the
          number that says how bad it is, so it leads.
        */}
        <Panel tone="accent">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-10">
            <div className="min-w-0">
              <Eyebrow>Open threads</Eyebrow>
              <div className="mt-3 text-[44px] font-semibold leading-[46px] tracking-[-0.03em] text-white lg:text-[56px] lg:leading-[56px]">
                {stats.awaiting}
              </div>
              <div className="mt-2 text-[13px] text-white">
                {stats.awaiting === 0
                  ? 'Nothing open. Everything has been marked answered.'
                  : stats.oldestWaitName
                    ? `Oldest open thread: ${stats.oldestWaitName}, ${waitLabel(stats.oldestWaitMs)}.`
                    : `Oldest open thread ${waitLabel(stats.oldestWaitMs)}.`}
              </div>
              {/*
                The page cannot see a reply sent from a mail client.

                Users message in-app; the replies go out from Gmail. Travis
                Wheat was answered within two hours of writing and this page
                counted him as four months unanswered, because nothing writes
                that reply back to admin_messages. Saying "waiting on a reply"
                was stating something the data cannot support — these are
                threads nobody has marked answered, which is a different claim.
              */}
              {stats.awaiting > 0 && (
                <div className="mt-1.5 text-[12px] leading-[17px] text-white">
                  Replies sent by email are not visible here — mark a thread answered to take it
                  out of the queue.
                </div>
              )}

            </div>

            {/*
              Raised cards, not holes. `bg-[hsl(0_0%_9%)]` is darker than the
              panel behind it, so a hairline grid of it read as four near-black
              rectangles punched into the surface — the same inversion fixed on
              the revenue page. Elevation runs the other way.
            */}
            <div className="grid grid-cols-2 gap-2.5 self-start">
              {[
                {
                  label: 'Open',
                  value: stats.awaiting,
                  sub: 'not marked answered',
                  accent: true,
                  to: 'list',
                },
                {
                  label: 'Unopened',
                  value: stats.unreadConversations,
                  sub: `${stats.unread} message${stats.unread === 1 ? '' : 's'}`,
                  to: 'list',
                },
                {
                  label: 'Longest wait',
                  value: stats.awaiting > 0 ? waitLabel(stats.oldestWaitMs) : '—',
                  sub: 'oldest still open',
                  // The card names the problem, so it takes you to it. It used
                  // to switch a filter tab; the list is sectioned now, so it
                  // scrolls to the section instead — nothing gets hidden to
                  // show you something.
                  to: 'group-older',
                },
                {
                  // "Conversations 15 · 33 messages" restated the All tab two
                  // inches away. How many of the open ones are paying customers
                  // is the thing that decides what you answer first.
                  label: 'Still paying',
                  value: payingOpen,
                  sub: `of ${stats.awaiting} open`,
                  to: 'list',
                },
              ].map((c) => (
                <button
                  key={c.label}
                  onClick={() =>
                    document
                      .getElementById(c.to)
                      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }
                  className="touch-manipulation rounded-xl border border-white/[0.08] bg-white/[0.035] px-4 py-3.5 text-left transition-colors hover:bg-white/[0.06]"
                >
                  <div
                    className={cn(
                      'text-[22px] font-semibold leading-none sm:text-[26px]',
                      c.accent && stats.awaiting > 0 ? 'text-elec-yellow' : 'text-white'
                    )}
                  >
                    {c.value}
                  </div>
                  <div className="mt-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
                    {c.label}
                  </div>
                  <div className="mt-1 text-[11px] text-white">{c.sub}</div>
                </button>
              ))}
            </div>
          </div>
        </Panel>

        {isLoading ? (
          <LoadingBlocks />
        ) : (
          /*
            The panel always renders, even with nothing in it.

            An empty result used to replace the whole block with "No messages —
            when users contact support, threads appear here", which took the
            toolbar with it. Search for something with no hits and the search
            box you had just typed into disappeared, so there was no way to
            clear it short of reloading the page — and the copy was wrong
            anyway, since there were ten messages, just none matching. The
            empty state now sits inside the list and says which of the three
            things actually happened.
          */
          <Panel id="list">
            {/*
              One control row where there were four.

              Between the hero and the first message sat a filter rail, a
              section head titled "Inbox", a line reading "10 shown" next to a
              "Mark 10 answered" button, and then an Inbox/Archived segment —
              so the word Inbox appeared twice, the count three times, and a
              bulk action that clears threads you have not read was the second
              thing a thumb reached. All of it collapses to this: where you are,
              what is in it, and a way to search.
            */}
            <div className="flex items-center gap-2">
              <Segmented<'inbox' | 'archived'>
                className="shrink-0"
                options={[
                  // No counts here: `useAdminInbox` fetches one view at a
                  // time, so an archived tally would need a second query to
                  // say something the group headings below already say.
                  { key: 'inbox', label: 'Inbox' },
                  { key: 'archived', label: 'Archived' },
                ]}
                value={view}
                onChange={(v) => {
                  setView(v);
                  setSelectedPartnerId(null);
                }}
              />
              <div className="relative min-w-0 flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/45" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search"
                  aria-label="Search conversations"
                  className="h-11 w-full touch-manipulation rounded-[10px] border border-white/[0.09] bg-white/[0.04] pl-9 pr-3 text-[13px] text-white placeholder:text-white/40 focus:border-white/25 focus:outline-none sm:h-9"
                />
              </div>
              <button
                type="button"
                onClick={() => setComposeOpen(true)}
                aria-label="Compose message"
                className="flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center rounded-[10px] border border-white/[0.09] text-white transition-colors hover:bg-white/[0.06] sm:h-9 sm:w-9"
              >
                <PenSquare className="h-4 w-4" />
              </button>
            </div>
            {searching && otherViewMatches > 0 && (
              <button
                type="button"
                onClick={() => {
                  setView(view === 'inbox' ? 'archived' : 'inbox');
                  setSelectedPartnerId(null);
                }}
                className="mt-2 flex h-11 w-full touch-manipulation items-center gap-2 rounded-[10px] border border-white/[0.09] bg-white/[0.03] px-3 text-left text-[12px] text-white transition-colors hover:bg-white/[0.06] sm:h-9"
              >
                <Search className="h-3.5 w-3.5 shrink-0 text-white/50" />
                <span className="min-w-0 truncate">
                  <span className="font-semibold">{otherViewMatches}</span>{' '}
                  {otherViewMatches === 1 ? 'match' : 'matches'} in{' '}
                  {view === 'inbox' ? 'Archived' : 'Inbox'}
                </span>
                <span className="ml-auto shrink-0 font-semibold text-white/70">Show</span>
              </button>
            )}
            {grouped.length === 0 && (
              <div className="px-1 py-10 text-center">
                <p className="text-[13.5px] font-semibold text-white">
                  {searching
                    ? 'Nothing matches that'
                    : view === 'archived'
                      ? 'Nothing archived yet'
                      : 'Inbox is clear'}
                </p>
                <p className="mx-auto mt-1.5 max-w-[34ch] text-[12px] text-white/70">
                  {searching
                    ? `No ${view === 'archived' ? 'archived thread' : 'conversation'} mentions "${search.trim()}".`
                    : view === 'archived'
                      ? 'Threads you mark answered are filed here.'
                      : 'Nothing is waiting on a reply.'}
                </p>
                {searching && (
                  <button
                    type="button"
                    onClick={() => setSearch('')}
                    className="mt-3 h-11 touch-manipulation rounded-lg border border-white/[0.12] px-4 text-[12px] font-semibold text-white transition-colors hover:bg-white/[0.06] sm:h-9"
                  >
                    Clear search
                  </button>
                )}
              </div>
            )}
            <div className="mt-1">
              {grouped.map((group) => (
                <div key={group.key} id={`group-${group.key}`} className="scroll-mt-32">
                  {/*
                    The section heading carries the age, so no row below it has
                    to. It is what replaced the filter rail and the coloured
                    spine that used to run down every row.
                  */}
                  <div className="mt-4 flex items-center gap-2 border-b border-white/[0.07] pb-1.5 first:mt-2">
                    <span
                      aria-hidden
                      className="h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: group.fill }}
                    />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
                      {group.label}
                    </span>
                    <span className="text-[11px] tabular-nums text-white/55">
                      {group.rows.length}
                    </span>
                  </div>
                  {group.rows.map((conv) => {
                const unread = conv.unreadCount > 0;
                /*
                  Waiting time, sized and coloured by how bad it is.

                  It rendered as "3mo" in 11px grey on the right — identical
                  weight to "1w" and to a thread answered this morning — on the
                  one page where the age of the thing IS the problem.
                */
                const waitedMs = conv.awaitingReply
                  ? Date.now() - new Date(conv.lastMessage.created_at).getTime()
                  : 0;
                /*
                  Urgency is stated once, on the wait figure.

                  It was also a 3px spine down the left of every row, which is
                  the same fact twice and left the list looking barred. The
                  section heading above the row now says how old it is; within
                  a section this just separates a five-month wait from a
                  five-week one.
                */
                const waitColour = !conv.awaitingReply
                  ? 'rgba(255,255,255,0.5)'
                  : waitedMs > 30 * 86400000
                    ? SERIOUS
                    : waitedMs > 7 * 86400000
                      ? '#e0a52e'
                      : 'rgba(255,255,255,0.85)';
                const role = conv.partner?.role;
                const partnerCtx = partnerContext.get(conv.partnerId);
                const preview =
                  conv.lastMessage.message.length > 150
                    ? conv.lastMessage.message.slice(0, 147) + '…'
                    : conv.lastMessage.message;

                return (
                  <SwipeableRow
                    key={conv.partnerId}
                    /*
                      Opaque on a phone, transparent everywhere else.

                      The swipe layer sits BEHIND the sliding panel, so a
                      transparent panel showed "Delete" and "Answered" under
                      every row permanently — it was `bg-transparent` back when
                      ListRow painted its own surface. It only needs a fill
                      where the gesture exists: on desktop the actions are not
                      rendered at all, and leaving it transparent there keeps
                      the panel's gradient unbroken.

                      #2a2a2a, not something darker. The panel computes to about
                      rgb(40,40,40) here, so a #1a1a1a row read as a hole
                      punched in the surface — the same inversion Andrew caught
                      on the revenue page. Elevation runs lighter.
                    */
                    contentClassName={isMobile ? 'bg-[#2a2a2a]' : 'bg-transparent'}
                    // Touch-only, same as the Messages-sheet inbox — wiring a
                    // swipe on desktop just adds a gesture a mouse can't do.
                    /*
                      Swipe right archives (or restores, in the Archived tab);
                      swipe left deletes. Delete is the further, more deliberate
                      gesture on purpose — archive is the one you want ten times
                      a day, delete is the one you want to be sure about.
                    */
                    rightAction={
                      isMobile
                        ? view === 'archived'
                          ? {
                              icon: <ArchiveRestore className="h-4 w-4" />,
                              label: 'Restore',
                              onClick: () => unarchiveConversation(conv),
                            }
                          : {
                              icon: <Archive className="h-4 w-4" />,
                              label: 'Answered',
                              onClick: () => archiveConversation(conv),
                            }
                        : undefined
                    }
                    leftAction={
                      isMobile
                        ? {
                            icon: <Trash2 className="h-4 w-4" />,
                            label: 'Delete',
                            onClick: () => deleteConversation(conv),
                            variant: 'destructive',
                          }
                        : undefined
                    }
                  >
                    <div className="group/row relative border-b border-white/[0.06]">
                    <button
                      type="button"
                      onClick={() => handleOpenConversation(conv)}
                      className="flex w-full touch-manipulation gap-3 py-2.5 pr-1 text-left transition-colors hover:bg-white/[0.03] active:bg-white/[0.06]"
                    >
                      <span className="mt-0.5 shrink-0">
                        <RoundAvatar initials={getInitials(conv.partner?.full_name)} />
                      </span>

                      <span className="min-w-0 flex-1">
                        {/* 1 — who, and how long they have waited */}
                        <span className="flex items-baseline gap-2">
                          <span
                            className={cn(
                              'min-w-0 flex-1 truncate text-[14px] leading-[19px] text-white',
                              conv.awaitingReply || unread ? 'font-semibold' : 'font-medium'
                            )}
                          >
                            {conv.partner?.full_name || 'Unknown User'}
                          </span>
                          {unread && (
                            <span className="flex h-[18px] min-w-[18px] shrink-0 items-center justify-center rounded-full bg-elec-yellow px-1 text-[10px] font-bold tabular-nums text-black">
                              {conv.unreadCount}
                            </span>
                          )}
                          <span
                            className={cn(
                              'shrink-0 text-[12px] font-semibold tabular-nums transition-opacity',
                              !isMobile && 'group-hover/row:opacity-0'
                            )}
                            style={{ color: waitColour }}
                          >
                            {conv.awaitingReply
                              ? waitLabel(waitedMs)
                              : relativeTime(new Date(conv.lastMessage.created_at))}
                          </span>
                        </span>

                        {/* 2 — what they actually said. The reason you are here. */}
                        <span className="mt-1 block text-[13px] leading-[18px] text-white [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden">
                          {!conv.awaitingReply && conv.hasAdminReply && (
                            <span className="text-white/70">You: </span>
                          )}
                          {preview}
                        </span>

                        {/* 3 — who they are to the business */}
                        <span className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] leading-4 text-white">
                          {partnerCtx && (
                            <span
                              className="rounded px-1.5 py-px font-semibold"
                              style={
                                partnerCtx.paying
                                  ? { background: 'rgba(25,158,112,0.16)', color: '#3ecf8e' }
                                  : { background: 'rgba(255,255,255,0.07)', color: '#ffffff' }
                              }
                            >
                              {partnerCtx.paying ? 'Paying' : 'Lapsed'}
                            </span>
                          )}
                          {role && <span className="capitalize">{role}</span>}
                          {partnerCtx?.lastSeen && (
                            <span className="text-white/70">
                              seen {relativeTime(new Date(partnerCtx.lastSeen))}
                            </span>
                          )}
                          {/*
                            The preview is the LAST message, which on a running
                            thread can be "cheers" while the actual question is
                            three messages up. Saying how many there are stops
                            a long thread reading as a one-liner.
                          */}
                          {conv.messages.length > 1 && (
                            <span className="text-white/70">
                              {conv.messages.length} in thread
                            </span>
                          )}
                        </span>
                      </span>
                    </button>
                    {/*
                      Row actions for a mouse.

                      Clearing the queue was a phone-only ability: `rightAction`
                      and `leftAction` are gated on `isMobile`, so on a laptop
                      the only way to mark a thread answered was to open it,
                      scroll the sheet and find the button. These sit where the
                      wait figure is and fade it out on hover — same spot, never
                      both at once, no layout shift, and by the time you are
                      reaching for them you have already read the age.
                    */}
                    {!isMobile && (
                      <div className="absolute right-1 top-2 flex items-center gap-1 opacity-0 transition-opacity focus-within:opacity-100 group-hover/row:opacity-100">
                        <button
                          type="button"
                          aria-label={view === 'archived' ? 'Restore' : 'Mark answered'}
                          title={view === 'archived' ? 'Restore to inbox' : 'Mark answered'}
                          onClick={() =>
                            view === 'archived'
                              ? unarchiveConversation(conv)
                              : archiveConversation(conv)
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.12] bg-[#2f2f2f] text-white transition-colors hover:bg-[#3a3a3a]"
                        >
                          {view === 'archived' ? (
                            <ArchiveRestore className="h-3.5 w-3.5" />
                          ) : (
                            <Archive className="h-3.5 w-3.5" />
                          )}
                        </button>
                        <button
                          type="button"
                          aria-label="Delete conversation"
                          title="Delete conversation"
                          onClick={() => deleteConversation(conv)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.12] bg-[#2f2f2f] text-white transition-colors hover:border-[#E66767]/40 hover:bg-[#3a2a2a] hover:text-[#E66767]"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )}
                    </div>
                  </SwipeableRow>
                );
                  })}
                </div>
              ))}
              {/*
                Bulk clear lives at the foot, after the list.

                As a button above the rows it was the second thing your thumb
                reached, on an action that empties threads you have not read.
                Below them it is still one tap, but only once you have scrolled
                past what it would clear.
              */}
              {view === 'inbox' && stats.awaiting > 0 && !search && (
                <div className="mt-4 border-t border-white/[0.07] pt-3">
                  <button
                    type="button"
                    onClick={markAllAnswered}
                    disabled={archive.isPending}
                    className="h-11 touch-manipulation text-[12px] font-semibold text-white/70 transition-colors hover:text-white disabled:opacity-50"
                  >
                    Mark all {stats.awaiting} answered
                  </button>
                </div>
              )}
            </div>
          </Panel>
        )}

        <Sheet open={!!selectedConversation} onOpenChange={() => setSelectedPartnerId(null)}>
          <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl p-0 border-0">
            <div className="flex flex-col h-full bg-background">
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-12 h-1.5 rounded-full bg-white/20" />
              </div>

              <SheetHeader className="px-4 py-3 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-11 w-11 rounded-xl shrink-0 touch-manipulation"
                    onClick={() => setSelectedPartnerId(null)}
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <ShadAvatar className="h-11 w-11 rounded-xl border border-white/10">
                    <AvatarImage src={selectedConversation?.partner?.avatar_url || undefined} />
                    <AvatarFallback className="rounded-xl bg-white/[0.06] text-white font-semibold text-sm">
                      {getInitials(selectedConversation?.partner?.full_name)}
                    </AvatarFallback>
                  </ShadAvatar>
                  <div className="flex-1 min-w-0">
                    <SheetTitle className="text-left text-base font-semibold text-white">
                      {selectedConversation?.partner?.full_name || 'Unknown User'}
                    </SheetTitle>
                    <div className="flex items-center gap-2 mt-0.5">
                      <p className="text-[11px] text-white">
                        {selectedConversation?.messages.length}{' '}
                        {selectedConversation?.messages.length === 1 ? 'message' : 'messages'}
                      </p>
                      {(() => {
                        const ctx = selectedConversation
                          ? partnerContext.get(selectedConversation.partnerId)
                          : undefined;
                        if (!ctx) return null;
                        return (
                          <>
                            <Pill tone={ctx.paying ? 'emerald' : 'blue'}>
                              {ctx.paying ? `Paying${ctx.tier ? ` · ${ctx.tier}` : ''}` : 'Lapsed'}
                            </Pill>
                            {ctx.lastSeen && (
                              <p className="text-[11px] text-white">
                                seen {formatDistanceToNowStrict(new Date(ctx.lastSeen))} ago
                              </p>
                            )}
                          </>
                        );
                      })()}
                      {selectedConversation?.partner?.role && (
                        <Pill
                          tone={roleToTone(selectedConversation.partner.role)}
                          className="capitalize"
                        >
                          {selectedConversation.partner.role}
                        </Pill>
                      )}
                    </div>
                  </div>
                  {/*
                    Swipe is touch-only, so on a desktop these were the only
                    thing standing between "read a thread" and "no way to clear
                    it". Archive is the quiet one; delete is separated and
                    marked, because they mean different things.
                  */}
                  {selectedConversation && (
                    <div className="flex shrink-0 items-center gap-1">
                      {view !== 'archived' && emailByUserId.get(selectedConversation.partnerId) && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-11 gap-1.5 rounded-xl px-3 text-[12px] font-semibold touch-manipulation"
                          onClick={() => replyByEmail(selectedConversation)}
                        >
                          <Mail className="h-4 w-4" />
                          <span className="hidden sm:inline">Reply by email</span>
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-11 w-11 rounded-xl touch-manipulation"
                        aria-label={
                          view === 'archived' ? 'Restore to inbox' : 'Mark answered'
                        }
                        title={view === 'archived' ? 'Restore to inbox' : 'Mark answered'}
                        onClick={() =>
                          view === 'archived'
                            ? unarchiveConversation(selectedConversation)
                            : archiveConversation(selectedConversation)
                        }
                      >
                        {view === 'archived' ? (
                          <ArchiveRestore className="h-5 w-5" />
                        ) : (
                          <Archive className="h-5 w-5" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-11 w-11 rounded-xl text-red-400 touch-manipulation hover:text-red-300"
                        aria-label="Delete conversation"
                        title="Delete"
                        onClick={() => deleteConversation(selectedConversation)}
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  )}
                </div>
              </SheetHeader>

              {/*
                Who you are actually talking to.

                The header said "3 messages · Paying · Electrician" and nothing
                else, so every reply was written blind: no email, no idea
                whether this was someone who joined last week or has been paying
                since April, and no way to reach the rest of their record
                without leaving the page and searching for them by hand. These
                are the four facts that change what you write back.
              */}
              {(() => {
                if (!selectedConversation) return null;
                const ctx = partnerContext.get(selectedConversation.partnerId);
                const email = emailByUserId.get(selectedConversation.partnerId);
                const opened = selectedConversation.messages[0];
                return (
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 border-b border-white/[0.06] bg-white/[0.02] px-4 py-2.5 text-[11.5px] text-white">
                    {email && (
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard?.writeText(email);
                          toast({ title: 'Email copied', description: email });
                        }}
                        className="flex min-w-0 touch-manipulation items-center gap-1.5 text-white transition-colors hover:text-elec-yellow"
                        title="Copy email address"
                      >
                        <Mail className="h-3 w-3 shrink-0" />
                        <span className="truncate">{email}</span>
                      </button>
                    )}
                    {ctx?.joined && (
                      <span className="text-white/70">
                        joined {formatDistanceToNowStrict(new Date(ctx.joined))} ago
                      </span>
                    )}
                    {opened && (
                      <span className="text-white/70">
                        first wrote {formatDistanceToNowStrict(new Date(opened.created_at))} ago
                      </span>
                    )}
                    {email && (
                      // `Link`, not `<a href>`: a plain anchor is a full page
                      // load, and this app takes the better part of half a
                      // minute to boot the admin shell from cold.
                      <Link
                        to={`/admin/users?q=${encodeURIComponent(email)}`}
                        onClick={() => setSelectedPartnerId(null)}
                        className="ml-auto flex shrink-0 touch-manipulation items-center gap-1 font-semibold text-white transition-colors hover:text-elec-yellow"
                      >
                        Full record
                        <ArrowLeft className="h-3 w-3 rotate-180" />
                      </Link>
                    )}
                  </div>
                );
              })()}

              {/* ELE-1417 — thread + composer now come from the shared
                  ChatThread so the admin and user sides cannot drift apart. */}
              <ChatThread
                messages={(selectedConversation?.messages ?? []).map((m) => ({
                  id: m.id,
                  body: m.message,
                  createdAt: m.created_at,
                  // Own SIDE, not "me": the inbox is shared by several admins.
                  isOwn: m.sender_id !== selectedConversation?.partnerId,
                  // Attribute a colleague's reply so it does not read as yours.
                  authorLabel:
                    m.sender_id !== selectedConversation?.partnerId && m.sender_id !== user?.id
                      ? (m.sender?.full_name ?? 'Team')
                      : undefined,
                }))}
                // mutateAsync so ChatThread can mark the bubble if it fails.
                onSend={(body) => {
                  if (!selectedConversation) return;
                  return sendReplyMutation.mutateAsync({
                    recipientId: selectedConversation.partnerId,
                    message: body,
                  });
                }}
                isSending={sendReplyMutation.isPending}
                placeholder="Write a reply…"
                emptyState={
                  <p className="text-[13.5px] text-white">No messages in this conversation yet.</p>
                }
              />
            </div>
          </SheetContent>
        </Sheet>

        <Sheet open={composeOpen} onOpenChange={setComposeOpen}>
          <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl p-0 border-0">
            <div className="flex flex-col h-full bg-background">
              <div className="flex justify-center pt-3 pb-1">
                <div className="mx-auto w-12 h-1.5 rounded-full bg-white/20" />
              </div>
              <div className="px-5 pb-4">
                <div className="flex items-center gap-2.5 mb-4">
                  <PenSquare className="h-4 w-4 text-elec-yellow" />
                  <h3 className="text-lg font-semibold text-white">New message</h3>
                </div>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white" />
                  <Input
                    placeholder="Search users by name or email…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-11 pl-11 pr-4 bg-[hsl(0_0%_12%)] border-white/[0.08] rounded-full text-[13px] text-white touch-manipulation focus:border-elec-yellow/60 placeholder:text-white/25"
                    autoFocus
                  />
                </div>
              </div>
              <ScrollArea className="flex-1 px-5 pb-5">
                {searchQuery.length < 2 ? (
                  <EmptyState
                    title="Find a user"
                    description="Type at least 2 characters to search by name or email."
                  />
                ) : searchResults?.length === 0 ? (
                  <EmptyState
                    title="No users found"
                    description={`Nothing matches "${searchQuery}".`}
                  />
                ) : (
                  <ListCard>
                    <ListBody>
                      {searchResults?.map((resultUser) => (
                        <ListRow
                          key={resultUser.id}
                          lead={<Avatar initials={getInitials(resultUser.full_name)} />}
                          title={resultUser.full_name || 'Unknown User'}
                          subtitle={resultUser.email}
                          trailing={
                            resultUser.role ? (
                              <Pill tone={roleToTone(resultUser.role)} className="capitalize">
                                {resultUser.role}
                              </Pill>
                            ) : undefined
                          }
                          onClick={() => {
                            setSelectedUser(resultUser);
                            setComposeOpen(false);
                            setSearchQuery('');
                          }}
                        />
                      ))}
                    </ListBody>
                  </ListCard>
                )}
              </ScrollArea>
            </div>
          </SheetContent>
        </Sheet>

        <MessageUserSheet
          open={!!selectedUser}
          onOpenChange={(open) => {
            if (!open) setSelectedUser(null);
          }}
          user={selectedUser}
        />
      </PageFrame>
    </PullToRefresh>
  );
}
