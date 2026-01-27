/**
 * Hook for admin messages - supports two-way chat between users and admin
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

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

// Get admin user IDs for identifying admin messages
const ADMIN_INDICATOR = 'admin'; // We'll check profiles.admin_role

export function useAdminMessages() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch all messages where user is sender or recipient
  const { data: messages, isLoading, refetch } = useQuery({
    queryKey: ['admin-messages', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];

      // Get messages where user is recipient (from admin) OR sender (to admin)
      const { data, error } = await supabase
        .from('admin_messages')
        .select('id, sender_id, recipient_id, subject, message, message_type, read_at, created_at')
        .or(`recipient_id.eq.${user.id},sender_id.eq.${user.id}`)
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) {
        console.error('Error fetching admin messages:', error);
        return [];
      }

      return (data || []) as AdminMessage[];
    },
    enabled: !!user?.id,
    staleTime: 10 * 1000, // 10 seconds for faster updates
    refetchInterval: 30 * 1000, // Refresh every 30 seconds
  });

  // Get conversation messages (for chat view)
  const getConversationMessages = (firstMessageId?: string) => {
    if (!messages || !user?.id) return [];

    // For now, just return all messages in chronological order for the chat
    return [...(messages || [])].sort(
      (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );
  };

  // Send a reply
  const sendReplyMutation = useMutation({
    mutationFn: async ({ message, subject }: { message: string; subject?: string }) => {
      if (!user?.id) throw new Error('Not authenticated');

      // Get an admin user to send to (exclude current user to avoid self-messaging)
      const { data: adminProfiles } = await supabase
        .from('profiles')
        .select('id')
        .not('admin_role', 'is', null)
        .neq('id', user.id) // Don't send to yourself
        .limit(1);

      const adminId = adminProfiles?.[0]?.id;
      if (!adminId) throw new Error('No admin available to receive messages');

      const { data, error } = await supabase
        .from('admin_messages')
        .insert({
          sender_id: user.id,
          recipient_id: adminId,
          subject: subject || 'Reply',
          message,
          message_type: 'in_app',
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-messages', user?.id] });
    },
  });

  // Mark as read
  const markAsReadMutation = useMutation({
    mutationFn: async (messageId: string) => {
      const { error } = await supabase
        .from('admin_messages')
        .update({ read_at: new Date().toISOString() })
        .eq('id', messageId)
        .eq('recipient_id', user?.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-messages', user?.id] });
    },
  });

  // Mark all as read
  const markAllAsReadMutation = useMutation({
    mutationFn: async () => {
      if (!user?.id) return;

      const { error } = await supabase
        .from('admin_messages')
        .update({ read_at: new Date().toISOString() })
        .eq('recipient_id', user.id)
        .is('read_at', null);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-messages', user?.id] });
    },
  });

  // Delete a message (only messages sent BY the user)
  const deleteMessageMutation = useMutation({
    mutationFn: async (messageId: string) => {
      if (!user?.id) throw new Error('Not authenticated');

      // Users can only delete messages they sent, or messages sent to them
      const { error } = await supabase
        .from('admin_messages')
        .delete()
        .eq('id', messageId)
        .or(`sender_id.eq.${user.id},recipient_id.eq.${user.id}`);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-messages', user?.id] });
    },
  });

  // Delete all messages for this user
  const deleteAllMessagesMutation = useMutation({
    mutationFn: async () => {
      if (!user?.id) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('admin_messages')
        .delete()
        .or(`sender_id.eq.${user.id},recipient_id.eq.${user.id}`);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-messages', user?.id] });
    },
  });

  // Calculate unread (only messages TO the user, not FROM the user)
  const unreadMessages = messages?.filter(m => m.recipient_id === user?.id && !m.read_at) || [];
  const unreadCount = unreadMessages.length;

  // Check if user is admin
  const isUserAdmin = async () => {
    if (!user?.id) return false;
    const { data } = await supabase
      .from('profiles')
      .select('admin_role')
      .eq('id', user.id)
      .single();
    return !!data?.admin_role;
  };

  return {
    messages: messages || [],
    conversationMessages: getConversationMessages(),
    unreadMessages,
    unreadCount,
    isLoading,
    refetch,
    markAsRead: markAsReadMutation.mutate,
    markAllAsRead: markAllAsReadMutation.mutate,
    sendReply: sendReplyMutation.mutateAsync,
    isSending: sendReplyMutation.isPending,
    isMarkingAsRead: markAsReadMutation.isPending,
    deleteMessage: deleteMessageMutation.mutate,
    deleteAllMessages: deleteAllMessagesMutation.mutate,
    isDeleting: deleteMessageMutation.isPending || deleteAllMessagesMutation.isPending,
  };
}

// Hook for admin to see all conversations
export function useAdminConversations() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: conversations, isLoading } = useQuery({
    queryKey: ['admin-all-conversations'],
    queryFn: async () => {
      if (!user?.id) return [];

      // Get unique users who have messaged
      const { data, error } = await supabase
        .from('admin_messages')
        .select(`
          id,
          sender_id,
          recipient_id,
          subject,
          message,
          read_at,
          created_at,
          sender:profiles!admin_messages_sender_id_fkey(id, full_name, avatar_url, role),
          recipient:profiles!admin_messages_recipient_id_fkey(id, full_name, avatar_url, role)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching conversations:', error);
        return [];
      }

      // Group by conversation partner
      const conversationMap = new Map();
      data?.forEach((msg: any) => {
        const partnerId = msg.sender_id === user.id ? msg.recipient_id : msg.sender_id;
        const partner = msg.sender_id === user.id ? msg.recipient : msg.sender;

        if (!conversationMap.has(partnerId)) {
          conversationMap.set(partnerId, {
            partnerId,
            partner,
            lastMessage: msg,
            unreadCount: 0,
          });
        }

        // Count unread
        if (msg.recipient_id === user.id && !msg.read_at) {
          const conv = conversationMap.get(partnerId);
          conv.unreadCount++;
        }
      });

      return Array.from(conversationMap.values());
    },
    enabled: !!user?.id,
    staleTime: 10 * 1000,
    refetchInterval: 30 * 1000,
  });

  return {
    conversations: conversations || [],
    isLoading,
    refetch: () => queryClient.invalidateQueries({ queryKey: ['admin-all-conversations'] }),
  };
}
