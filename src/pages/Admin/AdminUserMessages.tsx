import { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Avatar as ShadAvatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import {
  Send,
  RefreshCw,
  Loader2,
  ArrowLeft,
  Search,
  Users,
  CheckCheck,
  PenSquare,
} from 'lucide-react';
import { format } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import { useHaptic } from '@/hooks/useHaptic';
import { cn } from '@/lib/utils';
import PullToRefresh from '@/components/admin/PullToRefresh';
import MessageUserSheet from '@/components/admin/MessageUserSheet';
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

interface AdminMessage {
  id: string;
  sender_id: string;
  recipient_id: string;
  subject: string;
  message: string;
  message_type: 'email' | 'in_app' | 'both';
  read_at: string | null;
  created_at: string;
}

interface AdminMessageRow extends AdminMessage {
  sender: {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
    role: string | null;
    admin_role: string | null;
  } | null;
  recipient: {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
    role: string | null;
    admin_role: string | null;
  } | null;
}

interface ConversationPartner {
  partnerId: string;
  partner: {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
    role: string | null;
  } | null;
  lastMessage: AdminMessage;
  unreadCount: number;
  messages: AdminMessage[];
}

export default function AdminUserMessages() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const haptic = useHaptic();
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'read' | 'sent'>('all');
  const [selectedConversation, setSelectedConversation] =
    useState<ConversationPartner | null>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [composeOpen, setComposeOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<{
    id: string;
    full_name?: string;
    email?: string;
    role?: string;
  } | null>(null);

  const {
    data: conversations,
    isLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['admin-user-messages'],
    queryFn: async () => {
      if (!user?.id) return [];

      const { data, error } = await supabase
        .from('admin_messages')
        .select(
          `
          id,
          sender_id,
          recipient_id,
          subject,
          message,
          message_type,
          read_at,
          created_at,
          sender:profiles!admin_messages_sender_id_fkey(id, full_name, avatar_url, role, admin_role),
          recipient:profiles!admin_messages_recipient_id_fkey(id, full_name, avatar_url, role, admin_role)
        `
        )
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching messages:', error);
        return [];
      }

      const conversationMap = new Map<string, ConversationPartner>();

      (data as AdminMessageRow[] | null)?.forEach((msg) => {
        const senderIsAdmin = !!msg.sender?.admin_role || msg.sender_id === user.id;
        const partnerId = senderIsAdmin ? msg.recipient_id : msg.sender_id;
        const partner = senderIsAdmin ? msg.recipient : msg.sender;

        if (partner?.admin_role) {
          return;
        }

        if (!conversationMap.has(partnerId)) {
          conversationMap.set(partnerId, {
            partnerId,
            partner,
            lastMessage: msg,
            unreadCount: 0,
            messages: [],
          });
        }

        const conv = conversationMap.get(partnerId)!;
        conv.messages.push(msg);

        if (msg.recipient_id === user.id && !msg.read_at) {
          conv.unreadCount++;
        }
      });

      conversationMap.forEach((conv) => {
        conv.messages.sort(
          (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      });

      return Array.from(conversationMap.values());
    },
    enabled: !!user?.id,
    staleTime: 10 * 1000,
    refetchInterval: 30 * 1000,
  });

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
      const { error } = await supabase
        .from('admin_messages')
        .update({ read_at: new Date().toISOString() })
        .in('id', messageIds)
        .eq('recipient_id', user?.id);

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

      supabase.functions
        .invoke('send-push-notification', {
          body: {
            userId: recipientId,
            title: 'New message from Elec-Mate',
            body: message.length > 100 ? message.substring(0, 97) + '...' : message,
            type: 'job',
            data: { senderId: user?.id, isAdminMessage: true },
          },
        })
        .catch(() => {});
    },
    onSuccess: () => {
      haptic.success();
      queryClient.invalidateQueries({ queryKey: ['admin-user-messages'] });
      setReplyMessage('');
      toast({ title: 'Reply sent' });
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

  const handleOpenConversation = (conv: ConversationPartner) => {
    setSelectedConversation(conv);

    const unreadIds = conv.messages
      .filter((m) => m.recipient_id === user?.id && !m.read_at)
      .map((m) => m.id);

    if (unreadIds.length > 0) {
      markAsReadMutation.mutate(unreadIds);
    }
  };

  const handleSendReply = () => {
    if (!replyMessage.trim() || !selectedConversation) return;

    sendReplyMutation.mutate({
      recipientId: selectedConversation.partnerId,
      message: replyMessage.trim(),
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendReply();
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
      return { unread: 0, today: 0, thisWeek: 0, total: 0 };
    }
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const weekAgo = now.getTime() - 7 * 24 * 60 * 60 * 1000;

    let unread = 0;
    let today = 0;
    let thisWeek = 0;
    let total = 0;

    conversations.forEach((conv) => {
      unread += conv.unreadCount;
      conv.messages.forEach((m) => {
        total += 1;
        const t = new Date(m.created_at).getTime();
        if (t >= startOfDay) today += 1;
        if (t >= weekAgo) thisWeek += 1;
      });
    });

    return { unread, today, thisWeek, total };
  }, [conversations]);

  const filteredConversations = useMemo(() => {
    if (!conversations) return [];
    const searchLower = search.toLowerCase();

    return conversations.filter((conv) => {
      if (searchLower) {
        const matchesSearch =
          conv.partner?.full_name?.toLowerCase().includes(searchLower) ||
          conv.lastMessage.message?.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      switch (activeTab) {
        case 'unread':
          return conv.unreadCount > 0;
        case 'read':
          return conv.unreadCount === 0 && conv.messages.some((m) => m.recipient_id === user?.id);
        case 'sent':
          return conv.messages.some((m) => m.sender_id === user?.id);
        case 'all':
        default:
          return true;
      }
    });
  }, [conversations, search, activeTab, user?.id]);

  const tabs = useMemo(
    () => [
      { value: 'all', label: 'All', count: conversations?.length ?? 0 },
      { value: 'unread', label: 'Unread', count: stats.unread },
      {
        value: 'read',
        label: 'Read',
        count:
          conversations?.filter(
            (c) =>
              c.unreadCount === 0 && c.messages.some((m) => m.recipient_id === user?.id)
          ).length ?? 0,
      },
      {
        value: 'sent',
        label: 'Sent',
        count:
          conversations?.filter((c) => c.messages.some((m) => m.sender_id === user?.id))
            .length ?? 0,
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
            <IconButton
              onClick={() => refetch()}
              aria-label="Refresh"
              disabled={isFetching}
            >
              <RefreshCw className={cn('h-4 w-4', isFetching && 'animate-spin')} />
            </IconButton>
          }
        />

        <StatStrip
          columns={4}
          stats={[
            {
              label: 'Unread',
              value: stats.unread,
              tone: 'yellow',
              sub: stats.unread === 0 ? 'All caught up' : 'Awaiting reply',
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
            {
              label: 'Total',
              value: stats.total,
              sub: 'All-time messages',
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
                const roleTone = roleToTone(role);
                const preview =
                  conv.lastMessage.message.length > 140
                    ? conv.lastMessage.message.slice(0, 137) + '…'
                    : conv.lastMessage.message;

                return (
                  <ListRow
                    key={conv.partnerId}
                    accent={unread ? 'yellow' : undefined}
                    lead={
                      <Avatar
                        initials={getInitials(conv.partner?.full_name)}
                      />
                    }
                    title={
                      <span className={unread ? 'font-semibold' : ''}>
                        {conv.partner?.full_name || 'Unknown User'}
                      </span>
                    }
                    subtitle={preview}
                    trailing={
                      <>
                        {role && (
                          <Pill tone={roleTone} className="capitalize">
                            {role}
                          </Pill>
                        )}
                        {unread && (
                          <Pill tone="yellow">{conv.unreadCount}</Pill>
                        )}
                        <span className="text-[11px] text-white tabular-nums">
                          {relativeTime(new Date(conv.lastMessage.created_at))}
                        </span>
                      </>
                    }
                    onClick={() => handleOpenConversation(conv)}
                  />
                );
              })}
            </ListBody>
          </ListCard>
        )}

        <Sheet
          open={!!selectedConversation}
          onOpenChange={() => setSelectedConversation(null)}
        >
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
                    onClick={() => setSelectedConversation(null)}
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
                        {selectedConversation?.messages.length} messages
                      </p>
                      {selectedConversation?.partner?.role && (
                        <Pill tone={roleToTone(selectedConversation.partner.role)} className="capitalize">
                          {selectedConversation.partner.role}
                        </Pill>
                      )}
                    </div>
                  </div>
                </div>
              </SheetHeader>

              <ScrollArea className="flex-1 px-4 py-4">
                <div className="space-y-3">
                  {selectedConversation?.messages.map((msg, index) => {
                    const isFromUser = msg.sender_id === selectedConversation.partnerId;
                    const showDate =
                      index === 0 ||
                      new Date(msg.created_at).toDateString() !==
                        new Date(
                          selectedConversation.messages[index - 1].created_at
                        ).toDateString();

                    return (
                      <div key={msg.id}>
                        {showDate && (
                          <div className="flex justify-center my-4">
                            <span className="text-[10px] uppercase tracking-[0.18em] text-white font-semibold bg-white/[0.04] border border-white/[0.06] px-3 py-1 rounded-full">
                              {format(new Date(msg.created_at), 'd MMM yyyy')}
                            </span>
                          </div>
                        )}
                        <div
                          className={cn(
                            'flex',
                            isFromUser ? 'justify-start' : 'justify-end'
                          )}
                        >
                          <div
                            className={cn(
                              'max-w-[80%] rounded-2xl px-4 py-2.5 border',
                              isFromUser
                                ? 'bg-white/[0.04] border-white/[0.06] text-white rounded-bl-md'
                                : 'bg-elec-yellow text-black border-elec-yellow rounded-br-md'
                            )}
                          >
                            <p className="text-[14.5px] leading-relaxed whitespace-pre-wrap">
                              {msg.message}
                            </p>
                            <div
                              className={cn(
                                'flex items-center gap-1.5 mt-1.5',
                                isFromUser ? 'justify-start' : 'justify-end'
                              )}
                            >
                              <span
                                className={cn(
                                  'text-[10px] tabular-nums',
                                  isFromUser ? 'text-white' : 'text-black/60'
                                )}
                              >
                                {format(new Date(msg.created_at), 'h:mm a')}
                              </span>
                              {!isFromUser && msg.read_at && (
                                <CheckCheck className="h-3 w-3 text-black/60" />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>

              <div className="p-4 border-t border-white/[0.06] bg-[hsl(0_0%_10%)]">
                <div className="flex gap-2">
                  <Input
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your reply…"
                    disabled={sendReplyMutation.isPending}
                    className="flex-1 h-11 rounded-full bg-[hsl(0_0%_12%)] border-white/[0.08] text-[13px] text-white touch-manipulation focus:border-elec-yellow/60 placeholder:text-white/35"
                  />
                  <Button
                    onClick={handleSendReply}
                    disabled={!replyMessage.trim() || sendReplyMutation.isPending}
                    size="icon"
                    className="h-11 w-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black shrink-0 rounded-full"
                  >
                    {sendReplyMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
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
                          lead={
                            <Avatar
                              initials={getInitials(resultUser.full_name)}
                            />
                          }
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
