 
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import {
  MessageSquare,
  Send,
  RefreshCw,
  Loader2,
  Inbox,
  Clock,
  CheckCheck,
  ArrowLeft,
  Search,
  Users,
  Sparkles,
  ChevronRight,
  PenSquare,
  X,
  Mail,
} from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import { useHaptic } from '@/hooks/useHaptic';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import PullToRefresh from '@/components/admin/PullToRefresh';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import MessageUserSheet from '@/components/admin/MessageUserSheet';
import { AnimatedCounter } from '@/components/dashboard/AnimatedCounter';

/* ── Animation variants matching AdminUsers / AdminDashboard ── */
const sectionVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.35, ease: 'easeOut' },
  }),
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0 },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.2, ease: 'easeOut' } },
};

/* ── Compact relative time helper ── */
function relativeTime(date: Date): string {
  const now = Date.now();
  const diff = now - date.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks}w ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

/* ── Role colour helpers ── */
function getRoleBorderColour(role: string | null | undefined): string {
  switch (role) {
    case 'apprentice':
      return 'border-l-purple-400';
    case 'employer':
      return 'border-l-blue-400';
    case 'electrician':
    default:
      return 'border-l-yellow-400';
  }
}

function getRoleBadgeClasses(role: string | null | undefined): string {
  switch (role) {
    case 'apprentice':
      return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
    case 'employer':
      return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    case 'electrician':
    default:
      return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
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
  const [selectedConversation, setSelectedConversation] = useState<ConversationPartner | null>(
    null
  );
  const [replyMessage, setReplyMessage] = useState('');
  const [composeOpen, setComposeOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<{
    id: string;
    full_name?: string;
    email?: string;
    role?: string;
  } | null>(null);

  // Fetch all admin messages and group by conversation partner
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

      // Group by conversation partner (non-admin user)
      const conversationMap = new Map<string, ConversationPartner>();

      (data as AdminMessageRow[] | null)?.forEach((msg) => {
        // Determine who the non-admin partner is (check admin_role field)
        const senderIsAdmin = !!msg.sender?.admin_role || msg.sender_id === user.id;
        const partnerId = senderIsAdmin ? msg.recipient_id : msg.sender_id;
        const partner = senderIsAdmin ? msg.recipient : msg.sender;

        // Skip if partner is also an admin (admin-to-admin messages)
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

        // Count unread messages TO admin (from user)
        if (msg.recipient_id === user.id && !msg.read_at) {
          conv.unreadCount++;
        }
      });

      // Sort messages within each conversation chronologically
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

  // Search users for compose
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

  // Filter conversations by search
  const filteredConversations = conversations?.filter((conv) => {
    if (!search) return true;
    const searchLower = search.toLowerCase();
    return (
      conv.partner?.full_name?.toLowerCase().includes(searchLower) ||
      conv.lastMessage.message?.toLowerCase().includes(searchLower)
    );
  });

  // Mark messages as read
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

  // Send reply
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

      // Fire-and-forget push notification to user
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
        .catch(() => {}); // fire-and-forget, never block the UI
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

  // Handle opening a conversation
  const handleOpenConversation = (conv: ConversationPartner) => {
    setSelectedConversation(conv);

    // Mark unread messages as read
    const unreadIds = conv.messages
      .filter((m) => m.recipient_id === user?.id && !m.read_at)
      .map((m) => m.id);

    if (unreadIds.length > 0) {
      markAsReadMutation.mutate(unreadIds);
    }
  };

  // Handle sending reply
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

  // Stats
  const totalUnread = conversations?.reduce((sum, c) => sum + c.unreadCount, 0) || 0;
  const totalMessages = conversations?.reduce((sum, c) => sum + c.messages.length, 0) || 0;

  // Get initials helper
  const getInitials = (name: string | null | undefined) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <PullToRefresh
      onRefresh={async () => {
        await refetch();
      }}
    >
      <div className="pb-20">
        <AdminPageHeader
          title="Messages"
          subtitle={totalUnread > 0 ? `${totalUnread} unread` : 'User conversations'}
          icon={MessageSquare}
          iconColor="text-amber-400"
          iconBg="bg-amber-500/10 border-amber-500/20"
          accentColor="from-amber-500 via-yellow-400 to-amber-500"
          onRefresh={() => refetch()}
          isRefreshing={isFetching}
          actions={
            <Button
              onClick={() => setComposeOpen(true)}
              size="icon"
              className="h-11 w-11 rounded-xl touch-manipulation bg-gradient-to-br from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black shadow-lg shadow-amber-500/20"
            >
              <PenSquare className="h-4.5 w-4.5" />
            </Button>
          }
        />

        {/* ── Search Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="relative mb-4"
        >
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 !text-white" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search conversations..."
            className="h-11 pl-10 pr-10 bg-white/[0.04] !border-white/[0.08] rounded-xl text-sm touch-manipulation focus:!border-yellow-500 placeholder:!text-white"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 h-7 w-7 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 touch-manipulation"
            >
              <X className="h-3.5 w-3.5 !text-white" />
            </button>
          )}
        </motion.div>

        {/* ── Conversations ── */}
        {isLoading ? (
          <div className="space-y-[1px] rounded-2xl overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white/[0.03] p-4 animate-pulse">
                <div className="flex items-start gap-3">
                  <div className="h-12 w-12 rounded-full bg-white/[0.06] shrink-0" />
                  <div className="flex-1 space-y-2 pt-1">
                    <div className="flex justify-between">
                      <div className="h-4 w-24 bg-white/[0.06] rounded" />
                      <div className="h-3 w-10 bg-white/[0.06] rounded" />
                    </div>
                    <div className="h-3 w-full bg-white/[0.06] rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredConversations?.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 px-4"
          >
            <div className="relative mb-5">
              <div className="w-20 h-20 rounded-full bg-white/[0.04] flex items-center justify-center">
                <Inbox className="h-10 w-10 !text-white" />
              </div>
            </div>
            <h3 className="text-base font-semibold !text-white mb-1">No messages yet</h3>
            <p className="text-sm !text-white text-center max-w-[240px]">
              Messages from users will appear here
            </p>
            <Button
              onClick={() => setComposeOpen(true)}
              className="mt-5 h-11 rounded-xl touch-manipulation gap-2 bg-gradient-to-br from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-black font-semibold shadow-lg shadow-amber-500/20 px-5"
            >
              <PenSquare className="h-4 w-4" />
              Start a conversation
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="rounded-2xl overflow-hidden border border-white/[0.06]"
          >
            {filteredConversations?.map((conv, index) => (
              <motion.div
                key={conv.partnerId}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.04, duration: 0.2 }}
              >
                <button
                  onClick={() => handleOpenConversation(conv)}
                  className={cn(
                    'w-full text-left touch-manipulation transition-colors duration-150',
                    'active:bg-white/[0.08]',
                    index > 0 && 'border-t border-white/[0.04]',
                    conv.unreadCount > 0
                      ? 'bg-amber-500/[0.04]'
                      : 'bg-white/[0.02] hover:bg-white/[0.05]'
                  )}
                >
                  <div className="p-4 flex items-start gap-3">
                    {/* Avatar */}
                    <div className="relative shrink-0 mt-0.5">
                      <Avatar className="h-12 w-12 rounded-full border-2 border-white/[0.08]">
                        <AvatarImage src={conv.partner?.avatar_url || undefined} />
                        <AvatarFallback
                          className={cn(
                            'rounded-full text-sm font-bold',
                            conv.partner?.role === 'apprentice'
                              ? 'bg-purple-500/20 text-purple-300'
                              : conv.partner?.role === 'employer'
                                ? 'bg-blue-500/20 text-blue-300'
                                : 'bg-amber-500/20 text-amber-300'
                          )}
                        >
                          {getInitials(conv.partner?.full_name)}
                        </AvatarFallback>
                      </Avatar>
                      {conv.unreadCount > 0 && (
                        <div className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-500 px-1 text-[10px] font-bold text-black ring-2 ring-background">
                          {conv.unreadCount}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 space-y-1">
                      {/* Name + time */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <p
                            className={cn(
                              'text-[15px] truncate !text-white',
                              conv.unreadCount > 0 ? 'font-bold' : 'font-medium'
                            )}
                          >
                            {conv.partner?.full_name || 'Unknown User'}
                          </p>
                          {conv.partner?.role && (
                            <span
                              className={cn(
                                'shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded-md capitalize',
                                conv.partner.role === 'apprentice'
                                  ? 'bg-purple-500/15 text-purple-400'
                                  : conv.partner.role === 'employer'
                                    ? 'bg-blue-500/15 text-blue-400'
                                    : 'bg-amber-500/15 text-amber-400'
                              )}
                            >
                              {conv.partner.role}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="text-[11px] !text-white font-medium">
                            {relativeTime(new Date(conv.lastMessage.created_at))}
                          </span>
                          <ChevronRight className="h-4 w-4 !text-white" />
                        </div>
                      </div>

                      {/* Message preview */}
                      <p
                        className={cn(
                          'text-[13px] line-clamp-2 leading-snug',
                          conv.unreadCount > 0 ? '!text-white font-medium' : '!text-white'
                        )}
                      >
                        {conv.lastMessage.message}
                      </p>

                      {/* Message count */}
                      {conv.messages.length > 1 && (
                        <p className="text-[11px] !text-white font-medium">
                          {conv.messages.length} messages
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* ── Conversation Detail Sheet ── */}
        <Sheet open={!!selectedConversation} onOpenChange={() => setSelectedConversation(null)}>
          <SheetContent side="bottom" className="h-[92vh] rounded-t-3xl p-0 border-0">
            <div className="flex flex-col h-full bg-background">
              {/* Drag Handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-12 h-1.5 rounded-full bg-white/20" />
              </div>

              {/* Header */}
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
                  <Avatar className="h-11 w-11 rounded-2xl border-2 border-white/10">
                    <AvatarImage src={selectedConversation?.partner?.avatar_url || undefined} />
                    <AvatarFallback className="rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-600 text-white font-semibold text-sm">
                      {getInitials(selectedConversation?.partner?.full_name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <SheetTitle className="text-left text-base font-semibold">
                      {selectedConversation?.partner?.full_name || 'Unknown User'}
                    </SheetTitle>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-white">
                        {selectedConversation?.messages.length} messages
                      </p>
                      {selectedConversation?.partner?.role && (
                        <Badge
                          variant="outline"
                          className={cn(
                            'text-[10px] px-1.5 py-0 h-4 capitalize',
                            getRoleBadgeClasses(selectedConversation.partner.role)
                          )}
                        >
                          {selectedConversation.partner.role}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </SheetHeader>

              {/* Messages */}
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
                            <span className="text-[11px] text-white bg-white/[0.06] border border-white/10 px-3 py-1 rounded-full">
                              {format(new Date(msg.created_at), 'd MMM yyyy')}
                            </span>
                          </div>
                        )}
                        <div className={cn('flex', isFromUser ? 'justify-start' : 'justify-end')}>
                          <div
                            className={cn(
                              'max-w-[80%] rounded-2xl px-4 py-2.5 shadow-sm',
                              isFromUser
                                ? 'bg-white/[0.06] text-white rounded-bl-md'
                                : 'bg-gradient-to-br from-amber-500 to-yellow-600 text-white rounded-br-md'
                            )}
                          >
                            <p className="text-[15px] leading-relaxed whitespace-pre-wrap">
                              {msg.message}
                            </p>
                            <div
                              className={cn(
                                'flex items-center gap-1.5 mt-1',
                                isFromUser ? 'justify-start' : 'justify-end'
                              )}
                            >
                              <span className="text-xs text-white">
                                {format(new Date(msg.created_at), 'h:mm a')}
                              </span>
                              {!isFromUser && msg.read_at && (
                                <CheckCheck className="h-3.5 w-3.5 text-white" />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>

              {/* Reply Input */}
              <div className="p-4 border-t border-white/[0.06] bg-white/[0.03] backdrop-blur-sm">
                <div className="flex gap-2">
                  <Input
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your reply..."
                    disabled={sendReplyMutation.isPending}
                    className="flex-1 h-12 rounded-xl bg-white/[0.06] border-white/10 text-base touch-manipulation focus:border-yellow-500 placeholder:!text-white"
                  />
                  <Button
                    onClick={handleSendReply}
                    disabled={!replyMessage.trim() || sendReplyMutation.isPending}
                    size="icon"
                    className="h-12 w-12 bg-gradient-to-br from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white shrink-0 rounded-xl shadow-lg shadow-amber-500/25"
                  >
                    {sendReplyMutation.isPending ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Send className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* ── Compose New Message Sheet ── */}
        <Sheet open={composeOpen} onOpenChange={setComposeOpen}>
          <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl p-0 border-0">
            <div className="flex flex-col h-full bg-background">
              <div className="flex justify-center pt-3 pb-1">
                <div className="mx-auto w-12 h-1.5 rounded-full bg-white/20" />
              </div>
              <div className="px-5 pb-4">
                <h3 className="text-lg font-semibold text-white mb-4">New Message</h3>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white" />
                  <Input
                    placeholder="Search users by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-13 pl-11 pr-4 bg-card/80 border-white/[0.06] rounded-2xl text-base touch-manipulation focus:border-yellow-500 placeholder:!text-white"
                    autoFocus
                  />
                </div>
              </div>
              <ScrollArea className="flex-1 px-5">
                {searchQuery.length < 2 ? (
                  <div className="flex flex-col items-center justify-center py-16 px-4">
                    <div className="w-16 h-16 rounded-2xl bg-white/[0.06] flex items-center justify-center mb-4">
                      <Search className="h-8 w-8 text-white" />
                    </div>
                    <p className="text-sm text-white text-center">
                      Type at least 2 characters to search for users
                    </p>
                  </div>
                ) : searchResults?.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 px-4">
                    <div className="w-16 h-16 rounded-2xl bg-white/[0.06] flex items-center justify-center mb-4">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <p className="text-sm text-white text-center">
                      No users found matching "{searchQuery}"
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {searchResults?.map((resultUser) => (
                      <button
                        key={resultUser.id}
                        onClick={() => {
                          setSelectedUser(resultUser);
                          setComposeOpen(false);
                          setSearchQuery('');
                        }}
                        className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.06] touch-manipulation min-h-[44px] active:scale-[0.98] transition-all duration-150"
                      >
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-yellow-500/20 flex items-center justify-center text-sm font-semibold text-amber-400 shrink-0">
                          {resultUser.full_name?.[0]?.toUpperCase() || '?'}
                        </div>
                        <div className="text-left flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">
                            {resultUser.full_name || 'Unknown User'}
                          </p>
                          <p className="text-xs text-white truncate">{resultUser.email}</p>
                        </div>
                        {resultUser.role && (
                          <Badge
                            variant="outline"
                            className={cn(
                              'text-xs capitalize shrink-0',
                              getRoleBadgeClasses(resultUser.role)
                            )}
                          >
                            {resultUser.role}
                          </Badge>
                        )}
                        <ChevronRight className="h-4 w-4 text-white shrink-0" />
                      </button>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </div>
          </SheetContent>
        </Sheet>

        {/* Message User Sheet (opened after selecting a user from compose) */}
        <MessageUserSheet
          open={!!selectedUser}
          onOpenChange={(open) => {
            if (!open) setSelectedUser(null);
          }}
          user={selectedUser}
        />
      </div>
    </PullToRefresh>
  );
}
