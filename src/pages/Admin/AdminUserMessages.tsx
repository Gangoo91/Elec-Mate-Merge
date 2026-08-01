import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar as ShadAvatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { RefreshCw, ArrowLeft, Search, Users, CheckCheck, PenSquare, Archive } from 'lucide-react';
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
  useAdminInbox,
  useArchiveConversation,
  sortAdminConversations,
  ADMIN_INBOX_QUERY_KEY,
  type AdminConversation,
} from '@/hooks/useAdminInbox';
import {
  PageFrame,
  PageHero,
  StatStrip,
  FilterBar,
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

export default function AdminUserMessages() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const haptic = useHaptic();
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'read' | 'sent'>('all');
  // ELE-1416 — hold only the partner id, never a snapshot of the conversation.
  // Previously this stored the whole AdminConversation object captured when
  // the thread was opened. Sending a reply invalidated the query and refetched
  // the LIST, but the open thread kept rendering the stale captured `messages`
  // array — so the "Reply sent" toast fired and the reply never appeared.
  // Deriving from live query data means the thread updates on every refetch.
  const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(null);
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
  const { data: conversations, isLoading, refetch, isFetching } = useAdminInbox();

  const isMobile = useIsMobile();
  const archive = useArchiveConversation();

  // Swipe-to-archive, matching the Messages-sheet inbox. This page previously
  // had no way at all to clear a conversation — a thread you had dealt with sat
  // in the list for ever, so old items kept resurfacing and the queue never
  // emptied. Archiving hides the row; it does not delete, so a mis-swipe on a
  // phone costs nothing and the support record survives.
  const archiveConversation = (conv: AdminConversation) => {
    const ids = conv.messages.map((m) => m.id);
    const name = conv.partner?.full_name || 'Conversation';
    if (selectedPartnerId === conv.partnerId) setSelectedPartnerId(null);
    archive.mutate(
      { messageIds: ids, archived: true },
      {
        onSuccess: () =>
          toast({
            title: `${name} archived`,
            description: 'Hidden from the inbox. Nothing was deleted.',
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

  const { data: searchResults } = useQuery({
    queryKey: ['user-search', searchQuery],
    queryFn: async () => {
      if (searchQuery.length < 2) return [];
      const { data } = await supabase
        .from('profiles')
        .select('id, full_name, email, role')
        .or(`full_name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%`)
        .limit(10);
      return data || [];
    },
    enabled: searchQuery.length >= 2,
  });

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
      return { unread: 0, today: 0, thisWeek: 0, total: 0, awaiting: 0 };
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

    return { unread, today, thisWeek, total, awaiting };
  }, [conversations]);

  const filteredConversations = useMemo(() => {
    if (!conversations) return [];
    const searchLower = search.toLowerCase();

    const filtered = conversations.filter((conv) => {
      if (searchLower) {
        // Search the whole thread, not just the last message — the thing you
        // remember is rarely the most recent line.
        const matchesSearch =
          conv.partner?.full_name?.toLowerCase().includes(searchLower) ||
          conv.messages.some((m) => m.message?.toLowerCase().includes(searchLower));
        if (!matchesSearch) return false;
      }

      switch (activeTab) {
        case 'unread':
          return conv.unreadCount > 0;
        case 'read':
          return conv.unreadCount === 0 && conv.hasInboundToAdmin;
        case 'sent':
          return conv.hasAdminReply;
        case 'all':
        default:
          return true;
      }
    });

    // ELE-1415 — the list had no sort at all, so ordering fell out of Map
    // insertion. Shared sort: needs answering, then unopened, then recency.
    return sortAdminConversations(filtered);
  }, [conversations, search, activeTab, user?.id]);

  const tabs = useMemo(
    () => [
      { value: 'all', label: 'All', count: conversations?.length ?? 0 },
      { value: 'unread', label: 'Unread', count: stats.unread },
      {
        value: 'read',
        label: 'Read',
        count: conversations?.filter((c) => c.unreadCount === 0 && c.hasInboundToAdmin).length ?? 0,
      },
      {
        value: 'sent',
        label: 'Sent',
        count: conversations?.filter((c) => c.hasAdminReply).length ?? 0,
      },
    ],
    [conversations, stats.unread, user?.id]
  );

  return (
    <PullToRefresh
      onRefresh={async () => {
        await refetch();
      }}
    >
      <PageFrame>
        <PageHero
          eyebrow="Inbox"
          title="Messages"
          description="Support requests and direct messages from users."
          tone="yellow"
          actions={
            <IconButton onClick={() => refetch()} aria-label="Refresh" disabled={isFetching}>
              <RefreshCw className={cn('h-4 w-4', isFetching && 'animate-spin')} />
            </IconButton>
          }
        />

        <StatStrip
          columns={4}
          stats={[
            {
              label: 'Awaiting reply',
              value: stats.awaiting,
              tone: 'yellow',
              sub: stats.awaiting === 0 ? 'All answered' : 'User spoke last',
            },
            {
              label: 'Unread',
              value: stats.unread,
              sub: stats.unread === 0 ? 'All opened' : 'Not yet opened',
            },
            {
              label: 'Today',
              value: stats.today,
              sub: 'Last 24 hours',
            },
            {
              label: 'This Week',
              value: stats.thisWeek,
              sub: 'Last 7 days',
            },
          ]}
        />

        <FilterBar
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={(v) => setActiveTab(v as typeof activeTab)}
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search conversations…"
        />

        {isLoading ? (
          <LoadingBlocks />
        ) : filteredConversations.length === 0 ? (
          <EmptyState
            title="No messages"
            description="When users contact support, threads appear here."
            action="Compose message"
            onAction={() => setComposeOpen(true)}
          />
        ) : (
          <ListCard>
            <ListCardHeader
              tone="yellow"
              title="Inbox"
              meta={
                stats.unread > 0 ? (
                  <Pill tone="yellow">{stats.unread} unread</Pill>
                ) : (
                  <Pill tone="emerald">Up to date</Pill>
                )
              }
              action="Compose"
              onAction={() => setComposeOpen(true)}
            />
            <ListBody>
              {filteredConversations.map((conv) => {
                const unread = conv.unreadCount > 0;
                const role = conv.partner?.role;
                const preview =
                  conv.lastMessage.message.length > 140
                    ? conv.lastMessage.message.slice(0, 137) + '…'
                    : conv.lastMessage.message;

                return (
                  <SwipeableRow
                    key={conv.partnerId}
                    contentClassName="bg-transparent"
                    // Touch-only, same as the Messages-sheet inbox — wiring a
                    // swipe on desktop just adds a gesture a mouse can't do.
                    rightAction={
                      isMobile
                        ? {
                            icon: <Archive className="h-4 w-4" />,
                            label: 'Archive',
                            onClick: () => archiveConversation(conv),
                            variant: 'destructive',
                          }
                        : undefined
                    }
                  >
                    <ListRow
                      // ELE-1415 — the accent marks "needs you", not merely
                      // "unopened". A thread you have read but not answered still
                      // has someone waiting at the other end of it.
                      accent={conv.awaitingReply || unread ? 'yellow' : undefined}
                      lead={<Avatar initials={getInitials(conv.partner?.full_name)} />}
                      // Everything lives in title/subtitle, nothing in `trailing`.
                      // ListRow's trailing slot is shrink-0 while the text block is
                      // flex-1 min-w-0, so pills in trailing ate the whole row on a
                      // phone and the name and preview collapsed to nothing.
                      title={
                        <span className="flex items-baseline gap-2">
                          <span
                            className={cn(
                              'truncate',
                              conv.awaitingReply || unread ? 'font-semibold' : ''
                            )}
                          >
                            {conv.partner?.full_name || 'Unknown User'}
                          </span>
                          {unread && (
                            <span className="shrink-0 min-w-[18px] h-[18px] px-1 rounded-full bg-elec-yellow text-black text-[10px] font-bold tabular-nums flex items-center justify-center">
                              {conv.unreadCount}
                            </span>
                          )}
                          <span className="ml-auto shrink-0 text-[11px] tabular-nums text-white/55">
                            {relativeTime(new Date(conv.lastMessage.created_at))}
                          </span>
                        </span>
                      }
                      subtitle={
                        <span className="flex items-baseline gap-1.5">
                          {conv.awaitingReply && (
                            <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.12em] text-elec-yellow">
                              Awaiting
                            </span>
                          )}
                          <span
                            className={cn(
                              'truncate',
                              conv.awaitingReply ? 'text-white' : 'text-white/70'
                            )}
                          >
                            {/* Say who spoke last, or your own reply reads as theirs. */}
                            {!conv.awaitingReply && conv.hasAdminReply && (
                              <span className="text-white/45">You: </span>
                            )}
                            {preview}
                          </span>
                          {role && (
                            <span className="ml-auto shrink-0 hidden sm:inline text-[10px] uppercase tracking-[0.12em] text-white/45 capitalize">
                              {role}
                            </span>
                          )}
                        </span>
                      }
                      onClick={() => handleOpenConversation(conv)}
                    />
                  </SwipeableRow>
                );
              })}
            </ListBody>
          </ListCard>
        )}

        <Sheet open={!!selectedConversation} onOpenChange={() => setSelectedPartnerId(null)}>
          <SheetContent side="bottom" className="h-[92vh] rounded-t-3xl p-0 border-0">
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
                </div>
              </SheetHeader>

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
                  <p className="text-[13.5px] text-white/60">
                    No messages in this conversation yet.
                  </p>
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
                    className="h-11 pl-11 pr-4 bg-[hsl(0_0%_12%)] border-white/[0.08] rounded-full text-[13px] text-white touch-manipulation focus:border-elec-yellow/60 placeholder:text-white/35"
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
