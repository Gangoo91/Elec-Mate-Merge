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
} from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import { useHaptic } from '@/hooks/useHaptic';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import PullToRefresh from '@/components/admin/PullToRefresh';
import MessageUserSheet from '@/components/admin/MessageUserSheet';

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
  const totalConversations = conversations?.length || 0;

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
      <div className="space-y-4 pb-20">
        {/* Hero Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-600 via-yellow-600 to-orange-500 p-5">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
          <div className="relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-sm">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">User Messages</h1>
                  <p className="text-sm text-white/70">Support inbox</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setComposeOpen(true)}
                  className="h-11 touch-manipulation gap-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-xl font-semibold"
                >
                  <PenSquare className="h-4 w-4" />
                  New Message
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-xl bg-white/10 hover:bg-white/20 text-white touch-manipulation"
                  onClick={() => refetch()}
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-white/70" />
                  <span className="text-2xl font-bold text-white">{totalConversations}</span>
                </div>
                <p className="text-xs text-white/60 mt-0.5">Conversations</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                <div className="flex items-center gap-2">
                  <Inbox className="h-4 w-4 text-white/70" />
                  <span className="text-2xl font-bold text-white">{totalUnread}</span>
                  {totalUnread > 0 && (
                    <span className="flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-red-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                    </span>
                  )}
                </div>
                <p className="text-xs text-white/60 mt-0.5">Unread</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search conversations..."
            className="h-12 pl-11 pr-4 bg-card border-border rounded-xl text-base touch-manipulation"
          />
        </div>

        {/* Conversations List */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-card rounded-2xl p-4 animate-pulse">
                  <div className="flex items-center gap-3">
                    <div className="h-14 w-14 rounded-full bg-muted" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-32 bg-muted rounded" />
                      <div className="h-3 w-48 bg-muted rounded" />
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : filteredConversations?.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center py-16 px-4"
            >
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-amber-500/20 to-yellow-500/20 flex items-center justify-center">
                  <Inbox className="h-12 w-12 text-amber-400" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1">All caught up!</h3>
              <p className="text-sm text-muted-foreground text-center max-w-[250px]">
                No user messages yet. Messages will appear here when users contact support.
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-2"
            >
              {filteredConversations?.map((conv, index) => (
                <motion.div
                  key={conv.partnerId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <button
                    onClick={() => handleOpenConversation(conv)}
                    className={cn(
                      'w-full text-left bg-card rounded-2xl p-4 touch-manipulation',
                      'active:scale-[0.98] transition-all duration-150',
                      'border border-transparent hover:border-border',
                      conv.unreadCount > 0 &&
                        'bg-gradient-to-r from-amber-500/5 to-transparent border-amber-500/20'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {/* Avatar with online indicator */}
                      <div className="relative shrink-0">
                        <Avatar className="h-14 w-14 border-2 border-border">
                          <AvatarImage src={conv.partner?.avatar_url || undefined} />
                          <AvatarFallback className="bg-gradient-to-br from-amber-500 to-yellow-600 text-white font-semibold text-sm">
                            {getInitials(conv.partner?.full_name)}
                          </AvatarFallback>
                        </Avatar>
                        {conv.unreadCount > 0 && (
                          <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-500 px-1.5 text-xs font-bold text-black shadow-lg">
                            {conv.unreadCount}
                          </span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p
                            className={cn(
                              'font-semibold truncate',
                              conv.unreadCount > 0 ? 'text-foreground' : 'text-foreground/90'
                            )}
                          >
                            {conv.partner?.full_name || 'Unknown User'}
                          </p>
                          <span className="text-[11px] text-muted-foreground shrink-0">
                            {formatDistanceToNow(new Date(conv.lastMessage.created_at), {
                              addSuffix: false,
                            })}
                          </span>
                        </div>
                        <p
                          className={cn(
                            'text-sm mt-0.5 line-clamp-1',
                            conv.unreadCount > 0
                              ? 'text-foreground/80 font-medium'
                              : 'text-muted-foreground'
                          )}
                        >
                          {conv.lastMessage.message}
                        </p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <Badge
                            variant="outline"
                            className="text-xs px-1.5 py-0 h-5 bg-muted/50 border-0 text-muted-foreground"
                          >
                            {conv.messages.length} messages
                          </Badge>
                        </div>
                      </div>

                      {/* Arrow */}
                      <ChevronRight className="h-5 w-5 text-muted-foreground/50 shrink-0" />
                    </div>
                  </button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Conversation Detail Sheet */}
        <Sheet open={!!selectedConversation} onOpenChange={() => setSelectedConversation(null)}>
          <SheetContent side="bottom" className="h-[92vh] rounded-t-3xl p-0 border-0">
            <div className="flex flex-col h-full bg-background">
              {/* Drag Handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
              </div>

              {/* Header */}
              <SheetHeader className="px-4 py-3 border-b border-border">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-xl shrink-0 touch-manipulation"
                    onClick={() => setSelectedConversation(null)}
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <Avatar className="h-11 w-11 border-2 border-border">
                    <AvatarImage src={selectedConversation?.partner?.avatar_url || undefined} />
                    <AvatarFallback className="bg-gradient-to-br from-amber-500 to-yellow-600 text-white font-semibold text-sm">
                      {getInitials(selectedConversation?.partner?.full_name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <SheetTitle className="text-left text-base font-semibold">
                      {selectedConversation?.partner?.full_name || 'Unknown User'}
                    </SheetTitle>
                    <p className="text-xs text-muted-foreground">
                      {selectedConversation?.messages.length} messages
                    </p>
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
                            <span className="text-[11px] text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
                              {format(new Date(msg.created_at), 'd MMM yyyy')}
                            </span>
                          </div>
                        )}
                        <div className={cn('flex', isFromUser ? 'justify-start' : 'justify-end')}>
                          <div
                            className={cn(
                              'max-w-[80%] rounded-2xl px-4 py-2.5 shadow-sm',
                              isFromUser
                                ? 'bg-muted text-foreground rounded-bl-md'
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
                              <span
                                className={cn(
                                  'text-xs',
                                  isFromUser ? 'text-muted-foreground' : 'text-white/70'
                                )}
                              >
                                {format(new Date(msg.created_at), 'h:mm a')}
                              </span>
                              {!isFromUser && msg.read_at && (
                                <CheckCheck className="h-3.5 w-3.5 text-white/70" />
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
              <div className="p-4 border-t border-border bg-card/50 backdrop-blur-sm">
                <div className="flex gap-2">
                  <Input
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your reply..."
                    disabled={sendReplyMutation.isPending}
                    className="flex-1 h-12 rounded-xl bg-background border-border text-base touch-manipulation"
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

        {/* Compose New Message Sheet */}
        <Sheet open={composeOpen} onOpenChange={setComposeOpen}>
          <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl p-0 border-0">
            <div className="flex flex-col h-full bg-background">
              <div className="flex justify-center pt-3 pb-1">
                <div className="mx-auto w-12 h-1.5 rounded-full bg-muted-foreground/30" />
              </div>
              <div className="px-5 pb-4">
                <h3 className="text-lg font-semibold mb-4">New Message</h3>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-11 pl-11 pr-4 bg-card border-border rounded-xl text-base touch-manipulation"
                    autoFocus
                  />
                </div>
              </div>
              <ScrollArea className="flex-1 px-5">
                {searchQuery.length < 2 ? (
                  <div className="flex flex-col items-center justify-center py-16 px-4">
                    <div className="w-16 h-16 rounded-2xl bg-muted/30 flex items-center justify-center mb-4">
                      <Search className="h-8 w-8 text-muted-foreground/50" />
                    </div>
                    <p className="text-sm text-muted-foreground text-center">
                      Type at least 2 characters to search for users
                    </p>
                  </div>
                ) : searchResults?.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 px-4">
                    <div className="w-16 h-16 rounded-2xl bg-muted/30 flex items-center justify-center mb-4">
                      <Users className="h-8 w-8 text-muted-foreground/50" />
                    </div>
                    <p className="text-sm text-muted-foreground text-center">
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
                        className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 touch-manipulation min-h-[44px] active:scale-[0.98] transition-all duration-150"
                      >
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500/20 to-yellow-500/20 flex items-center justify-center text-sm font-semibold text-amber-400 shrink-0">
                          {resultUser.full_name?.[0]?.toUpperCase() || '?'}
                        </div>
                        <div className="text-left flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {resultUser.full_name || 'Unknown User'}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {resultUser.email}
                          </p>
                        </div>
                        {resultUser.role && (
                          <Badge variant="outline" className="text-xs capitalize shrink-0">
                            {resultUser.role}
                          </Badge>
                        )}
                        <ChevronRight className="h-4 w-4 text-muted-foreground/50 shrink-0" />
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
