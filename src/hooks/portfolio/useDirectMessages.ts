/**
 * useDirectMessages
 *
 * Hook for managing direct messages between apprentices and tutors/mentors.
 * Uses the mentor_connections and mentor_messages tables.
 */

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import type { RealtimeChannel } from '@supabase/supabase-js';

export interface MentorConnection {
  id: string;
  apprentice_id: string;
  mentor_id: string;
  status: 'pending' | 'active' | 'declined' | 'ended';
  created_at: string;
  updated_at: string;
  mentor?: {
    id: string;
    full_name: string;
    avatar_url?: string;
    role?: string;
  };
}

export interface DirectMessage {
  id: string;
  connection_id: string;
  sender_type: 'mentor' | 'apprentice';
  sender_id: string;
  content: string;
  is_read: boolean;
  created_at: string;
}

export interface ConversationWithMessages {
  connection: MentorConnection;
  messages: DirectMessage[];
  unreadCount: number;
}

export function useDirectMessages() {
  const { user } = useAuth();
  const [connections, setConnections] = useState<MentorConnection[]>([]);
  const [messages, setMessages] = useState<DirectMessage[]>([]);
  const [activeConnectionId, setActiveConnectionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch mentor connections for the current user
  const fetchConnections = useCallback(async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('mentor_connections')
        .select(`
          *,
          mentor:profiles!mentor_connections_mentor_id_fkey(
            id,
            full_name,
            avatar_url,
            role
          )
        `)
        .eq('apprentice_id', user.id)
        .eq('status', 'active')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setConnections((data as MentorConnection[]) || []);
    } catch (err) {
      console.error('Error fetching connections:', err);
    }
  }, [user]);

  // Fetch messages for a specific connection
  const fetchMessages = useCallback(async (connectionId: string) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('mentor_messages')
        .select('*')
        .eq('connection_id', connectionId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages((data as DirectMessage[]) || []);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  }, [user]);

  // Fetch total unread count
  const fetchUnreadCount = useCallback(async () => {
    if (!user) return;

    try {
      // Get all active connections for this apprentice
      const { data: connectionData } = await supabase
        .from('mentor_connections')
        .select('id')
        .eq('apprentice_id', user.id)
        .eq('status', 'active');

      if (!connectionData || connectionData.length === 0) {
        setUnreadCount(0);
        return;
      }

      const connectionIds = connectionData.map((c) => c.id);

      // Count unread messages sent by mentors (not by the apprentice)
      const { count, error } = await supabase
        .from('mentor_messages')
        .select('*', { count: 'exact', head: true })
        .in('connection_id', connectionIds)
        .eq('sender_type', 'mentor')
        .eq('is_read', false);

      if (error) throw error;
      setUnreadCount(count || 0);
    } catch (err) {
      console.error('Error fetching unread count:', err);
    }
  }, [user]);

  // Send a message
  const sendMessage = useCallback(
    async (connectionId: string, content: string): Promise<boolean> => {
      if (!user || !content.trim()) return false;

      setIsSending(true);
      try {
        const { error } = await supabase.from('mentor_messages').insert({
          connection_id: connectionId,
          sender_type: 'apprentice',
          sender_id: user.id,
          content: content.trim(),
          is_read: false,
        });

        if (error) throw error;

        // Refresh messages
        await fetchMessages(connectionId);
        return true;
      } catch (err) {
        console.error('Error sending message:', err);
        toast.error('Failed to send message');
        return false;
      } finally {
        setIsSending(false);
      }
    },
    [user, fetchMessages]
  );

  // Mark messages as read
  const markAsRead = useCallback(
    async (connectionId: string) => {
      if (!user) return;

      try {
        await supabase
          .from('mentor_messages')
          .update({ is_read: true })
          .eq('connection_id', connectionId)
          .eq('sender_type', 'mentor')
          .eq('is_read', false);

        // Update unread count
        await fetchUnreadCount();
      } catch (err) {
        console.error('Error marking messages as read:', err);
      }
    },
    [user, fetchUnreadCount]
  );

  // Set active connection and fetch its messages
  const openConversation = useCallback(
    async (connectionId: string) => {
      setActiveConnectionId(connectionId);
      await fetchMessages(connectionId);
      await markAsRead(connectionId);
    },
    [fetchMessages, markAsRead]
  );

  // Close active conversation
  const closeConversation = useCallback(() => {
    setActiveConnectionId(null);
    setMessages([]);
  }, []);

  // Get conversation data for a connection
  const getConversation = useCallback(
    (connectionId: string): ConversationWithMessages | null => {
      const connection = connections.find((c) => c.id === connectionId);
      if (!connection) return null;

      const connectionMessages = messages.filter(
        (m) => m.connection_id === connectionId
      );
      const unread = connectionMessages.filter(
        (m) => m.sender_type === 'mentor' && !m.is_read
      ).length;

      return {
        connection,
        messages: connectionMessages,
        unreadCount: unread,
      };
    },
    [connections, messages]
  );

  // Initial load
  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      await fetchConnections();
      await fetchUnreadCount();
      setIsLoading(false);
    };
    load();
  }, [fetchConnections, fetchUnreadCount]);

  // Real-time subscription for new messages
  useEffect(() => {
    if (!user) return;

    let channel: RealtimeChannel | null = null;

    const setupSubscription = async () => {
      // Get connection IDs
      const { data: connectionData } = await supabase
        .from('mentor_connections')
        .select('id')
        .eq('apprentice_id', user.id)
        .eq('status', 'active');

      if (!connectionData || connectionData.length === 0) return;

      const connectionIds = connectionData.map((c) => c.id);

      channel = supabase
        .channel('mentor-messages')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'mentor_messages',
            filter: `connection_id=in.(${connectionIds.join(',')})`,
          },
          async (payload) => {
            const newMessage = payload.new as DirectMessage;

            // If this conversation is active, add the message
            if (activeConnectionId === newMessage.connection_id) {
              setMessages((prev) => [...prev, newMessage]);

              // Mark as read if sender was mentor
              if (newMessage.sender_type === 'mentor') {
                await markAsRead(newMessage.connection_id);
              }
            } else if (newMessage.sender_type === 'mentor') {
              // Show notification for messages from other conversations
              const connection = connections.find(
                (c) => c.id === newMessage.connection_id
              );
              toast.info(
                `New message from ${connection?.mentor?.full_name || 'your tutor'}`
              );
              await fetchUnreadCount();
            }
          }
        )
        .subscribe();
    };

    setupSubscription();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [user, activeConnectionId, connections, markAsRead, fetchUnreadCount]);

  return {
    // State
    connections,
    messages,
    activeConnectionId,
    isLoading,
    isSending,
    unreadCount,

    // Actions
    sendMessage,
    markAsRead,
    openConversation,
    closeConversation,
    refetch: fetchConnections,

    // Helpers
    getConversation,
    activeConnection: connections.find((c) => c.id === activeConnectionId),
  };
}

export default useDirectMessages;
