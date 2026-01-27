import { supabase } from "@/integrations/supabase/client";

// Types
export type TrainingLevel = 'peer' | 'trained' | 'mhfa_certified';
export type ConversationStatus = 'active' | 'ended' | 'archived';

export interface PeerSupporter {
  id: string;
  user_id: string;
  display_name: string;
  bio?: string;
  avatar_url?: string;
  is_available: boolean;
  is_active: boolean;
  training_level: TrainingLevel;
  topics_comfortable_with: string[];
  total_conversations: number;
  last_active_at: string;
  created_at: string;
  updated_at: string;
}

export interface SeekerProfile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
}

export interface PeerConversation {
  id: string;
  supporter_id: string | null;
  seeker_id: string;
  status: ConversationStatus;
  started_at: string;
  ended_at?: string;
  last_message_at: string;
  // Joined data
  supporter?: PeerSupporter;
  seeker?: SeekerProfile;
  // Computed
  unread_count?: number;
}

export interface PeerMessage {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  is_read: boolean;
  created_at: string;
}

export interface CreateSupporterInput {
  display_name: string;
  bio?: string;
  avatar_url?: string;
  training_level?: TrainingLevel;
  topics_comfortable_with?: string[];
}

export interface UpdateSupporterInput {
  display_name?: string;
  bio?: string;
  avatar_url?: string;
  is_available?: boolean;
  training_level?: TrainingLevel;
  topics_comfortable_with?: string[];
}

// Training level display labels
export const trainingLevelLabels: Record<TrainingLevel, string> = {
  peer: 'Peer Supporter',
  trained: 'Trained Listener',
  mhfa_certified: 'MHFA Certified',
};

// Available topics for supporters
export const supportTopics = [
  'Work Stress',
  'Anxiety',
  'Depression',
  'Family Issues',
  'Financial Worries',
  'Loneliness',
  'Grief & Loss',
  'Relationship Problems',
  'Self-Confidence',
  'Burnout',
  'Work-Life Balance',
  'Career Concerns',
] as const;

// =====================================================
// PEER SUPPORTERS
// =====================================================
export const peerSupporterService = {
  /**
   * Get all available supporters (for browsing)
   * Uses RPC function to bypass PostgREST schema cache issues
   */
  async getAvailableSupporters(): Promise<PeerSupporter[]> {
    const { data, error } = await supabase
      .rpc('get_available_peer_supporters');

    if (error) throw error;
    return (data as unknown as PeerSupporter[]) || [];
  },

  /**
   * Get a single supporter by ID
   * Uses RPC function to bypass PostgREST schema cache issues
   */
  async getSupporter(id: string): Promise<PeerSupporter | null> {
    const { data, error } = await supabase
      .rpc('get_peer_supporter_by_id', { supporter_id: id });

    if (error && error.code !== 'PGRST116') throw error;
    return data as unknown as PeerSupporter | null;
  },

  /**
   * Get current user's supporter profile
   * Uses RPC function to bypass PostgREST schema cache issues
   */
  async getMyProfile(): Promise<PeerSupporter | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    // Use RPC function to bypass 406 error from direct table query
    const { data, error } = await supabase
      .rpc('get_my_peer_supporter_profile');

    if (error && error.code !== 'PGRST116') throw error;

    // RPC returns an array, get first item - ensure we return null not undefined
    const profile = Array.isArray(data) && data.length > 0 ? data[0] : data;
    return (profile ?? null) as PeerSupporter | null;
  },

  /**
   * Register as a peer supporter
   */
  async register(input: CreateSupporterInput): Promise<PeerSupporter> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('mental_health_peer_supporters')
      .insert({
        user_id: user.id,
        display_name: input.display_name,
        bio: input.bio || null,
        avatar_url: input.avatar_url || null,
        training_level: input.training_level || 'peer',
        topics_comfortable_with: input.topics_comfortable_with || [],
        is_available: true,
        is_active: true,
      })
      .select()
      .single();

    if (error) throw error;
    return data as unknown as PeerSupporter;
  },

  /**
   * Update supporter profile
   */
  async updateProfile(input: UpdateSupporterInput): Promise<PeerSupporter> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const updateData: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };

    if (input.display_name !== undefined) updateData.display_name = input.display_name;
    if (input.bio !== undefined) updateData.bio = input.bio;
    if (input.avatar_url !== undefined) updateData.avatar_url = input.avatar_url;
    if (input.is_available !== undefined) updateData.is_available = input.is_available;
    if (input.training_level !== undefined) updateData.training_level = input.training_level;
    if (input.topics_comfortable_with !== undefined) updateData.topics_comfortable_with = input.topics_comfortable_with;

    // Update last_active_at when toggling availability
    if (input.is_available) {
      updateData.last_active_at = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from('mental_health_peer_supporters')
      .update(updateData)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) throw error;
    return data as unknown as PeerSupporter;
  },

  /**
   * Toggle availability status
   */
  async toggleAvailability(): Promise<PeerSupporter> {
    const profile = await this.getMyProfile();
    if (!profile) throw new Error('Not registered as supporter');

    return this.updateProfile({
      is_available: !profile.is_available,
    });
  },

  /**
   * Deactivate supporter profile (soft delete)
   */
  async deactivate(): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { error } = await supabase
      .from('mental_health_peer_supporters')
      .update({
        is_active: false,
        is_available: false,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', user.id);

    if (error) throw error;
  },
};

// =====================================================
// PEER CONVERSATIONS
// =====================================================
export const peerConversationService = {
  /**
   * Get all conversations for current user (as seeker or supporter)
   * Filters out conversations with blocked users
   * OPTIMIZED: Runs all independent queries in parallel
   */
  async getMyConversations(): Promise<PeerConversation[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    // OPTIMIZATION: Run ALL initial queries in parallel
    // - Profile check (to determine query filter)
    // - Blocked users (for filtering results)
    // We'll fetch conversations immediately after we have the profile
    const [supporterProfile, blockedUsers] = await Promise.all([
      peerSupporterService.getMyProfile(),
      peerBlockService.getBlockedUsers()
    ]);

    // Build query conditions - fetch conversations with supporter data
    let query = supabase
      .from('mental_health_peer_conversations')
      .select(`
        *,
        supporter:mental_health_peer_supporters(*)
      `)
      .order('last_message_at', { ascending: false });

    // If user is a supporter with a valid ID, get conversations where they are the supporter
    // Otherwise, get conversations where they are the seeker
    if (supporterProfile?.id) {
      query = query.or(`seeker_id.eq.${user.id},supporter_id.eq.${supporterProfile.id}`);
    } else {
      query = query.eq('seeker_id', user.id);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching conversations:', error);
      throw error;
    }

    const rawConversations = data || [];

    // Early return if no conversations - skip seeker profile fetch
    if (rawConversations.length === 0) {
      return [];
    }

    // Get unique seeker IDs and fetch their profiles
    const seekerIds = [...new Set(rawConversations.map(c => c.seeker_id))];
    const { data: seekerProfiles } = await supabase
      .from('profiles')
      .select('id, full_name, avatar_url')
      .in('id', seekerIds);

    // Map seeker profiles to conversations
    const profileMap = new Map(seekerProfiles?.map(p => [p.id, p]) || []);
    const conversationsWithProfiles = rawConversations.map(conv => ({
      ...conv,
      seeker: profileMap.get(conv.seeker_id) || { id: conv.seeker_id, full_name: null, avatar_url: null }
    })) as unknown as PeerConversation[];

    // Filter out conversations with blocked users
    let conversations = conversationsWithProfiles;
    if (blockedUsers.length > 0) {
      conversations = conversationsWithProfiles.filter(conv => {
        // Determine the other user in the conversation
        const otherUserId = conv.seeker_id === user.id
          ? conv.supporter?.user_id
          : conv.seeker_id;

        // Keep conversation if other user is not blocked
        return !otherUserId || !blockedUsers.includes(otherUserId);
      });
    }

    // Add unread counts to each conversation
    const conversationsWithUnread = await Promise.all(
      conversations.map(async (conv) => {
        const unreadCount = await peerMessageService.getUnreadCount(conv.id);
        return { ...conv, unread_count: unreadCount };
      })
    );

    return conversationsWithUnread;
  },

  /**
   * Get active conversations only
   */
  async getActiveConversations(): Promise<PeerConversation[]> {
    const conversations = await this.getMyConversations();
    return conversations.filter(c => c.status === 'active');
  },

  /**
   * Start a conversation with a supporter
   */
  async startConversation(supporterId: string): Promise<PeerConversation> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    // First insert the conversation
    const { data: conversation, error: insertError } = await supabase
      .from('mental_health_peer_conversations')
      .insert({
        supporter_id: supporterId,
        seeker_id: user.id,
        status: 'active',
      })
      .select(`
        *,
        supporter:mental_health_peer_supporters(*)
      `)
      .single();

    if (insertError) throw insertError;

    // Get seeker profile separately (profiles table uses user id as primary key)
    const { data: seekerProfile } = await supabase
      .from('profiles')
      .select('id, full_name, avatar_url')
      .eq('id', user.id)
      .single();

    return {
      ...conversation,
      seeker: seekerProfile || { id: user.id, full_name: null, avatar_url: null }
    } as unknown as PeerConversation;
  },

  /**
   * End a conversation
   */
  async endConversation(conversationId: string): Promise<void> {
    const { error } = await supabase
      .from('mental_health_peer_conversations')
      .update({
        status: 'ended',
        ended_at: new Date().toISOString(),
      })
      .eq('id', conversationId);

    if (error) throw error;
  },

  /**
   * Archive a conversation
   */
  async archiveConversation(conversationId: string): Promise<void> {
    const { error } = await supabase
      .from('mental_health_peer_conversations')
      .update({
        status: 'archived',
      })
      .eq('id', conversationId);

    if (error) throw error;
  },
};

// =====================================================
// PEER MESSAGES
// =====================================================
export const peerMessageService = {
  /**
   * Get messages for a conversation
   */
  async getMessages(conversationId: string, limit = 50): Promise<PeerMessage[]> {
    const { data, error } = await supabase
      .from('mental_health_peer_messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true })
      .limit(limit);

    if (error) throw error;
    return (data as unknown as PeerMessage[]) || [];
  },

  /**
   * Send a message
   */
  async sendMessage(conversationId: string, content: string): Promise<PeerMessage> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('mental_health_peer_messages')
      .insert({
        conversation_id: conversationId,
        sender_id: user.id,
        content,
      })
      .select()
      .single();

    if (error) throw error;

    // Send push notification to recipient (fire and forget)
    this.sendPushNotification(conversationId, user.id, content).catch(console.error);

    return data as unknown as PeerMessage;
  },

  /**
   * Send push notification to the other person in conversation
   */
  async sendPushNotification(conversationId: string, senderId: string, content: string): Promise<void> {
    try {
      // Get conversation to find recipient
      const { data: conversation } = await supabase
        .from('mental_health_peer_conversations')
        .select(`
          *,
          supporter:mental_health_peer_supporters(user_id, display_name)
        `)
        .eq('id', conversationId)
        .single();

      if (!conversation) return;

      // Get seeker profile separately
      const { data: seekerProfile } = await supabase
        .from('profiles')
        .select('id, full_name')
        .eq('id', conversation.seeker_id)
        .single();

      // Determine recipient
      const isSupporter = conversation.supporter?.user_id === senderId;
      const recipientId = isSupporter ? conversation.seeker_id : conversation.supporter?.user_id;
      const senderName = isSupporter
        ? (conversation.supporter?.display_name || 'Peer Supporter')
        : (seekerProfile?.full_name?.split(' ')[0] || 'Someone');

      if (!recipientId) return;

      // Call push notification edge function
      await supabase.functions.invoke('send-push-notification', {
        body: {
          userId: recipientId,
          title: `Message from ${senderName}`,
          body: content.length > 100 ? content.substring(0, 97) + '...' : content,
          type: 'peer',
          data: {
            conversationId,
            senderId,
            senderName,
          },
        },
      });
    } catch (error) {
      console.error('Failed to send push notification:', error);
    }
  },

  /**
   * Mark messages as read
   */
  async markAsRead(conversationId: string): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { error } = await supabase
      .from('mental_health_peer_messages')
      .update({ is_read: true })
      .eq('conversation_id', conversationId)
      .neq('sender_id', user.id);

    if (error) throw error;
  },

  /**
   * Mark ALL peer messages as read across all conversations
   */
  async markAllAsRead(): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    // Mark all messages not sent by me as read
    const { error } = await supabase
      .from('mental_health_peer_messages')
      .update({ is_read: true })
      .neq('sender_id', user.id)
      .eq('is_read', false);

    if (error) throw error;
  },

  /**
   * Get unread count for a conversation
   */
  async getUnreadCount(conversationId: string): Promise<number> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return 0;

    const { count, error } = await supabase
      .from('mental_health_peer_messages')
      .select('*', { count: 'exact', head: true })
      .eq('conversation_id', conversationId)
      .eq('is_read', false)
      .neq('sender_id', user.id);

    if (error) throw error;
    return count || 0;
  },

  /**
   * Delete a conversation and all its messages
   */
  async deleteConversation(conversationId: string): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    // Delete all messages first
    const { error: msgError } = await supabase
      .from('mental_health_peer_messages')
      .delete()
      .eq('conversation_id', conversationId);

    if (msgError) throw msgError;

    // Then delete the conversation
    const { error: convError } = await supabase
      .from('mental_health_peer_conversations')
      .delete()
      .eq('id', conversationId);

    if (convError) throw convError;
  },

  /**
   * Subscribe to new messages in a conversation (real-time)
   */
  subscribeToMessages(
    conversationId: string,
    onMessage: (message: PeerMessage) => void
  ) {
    const channel = supabase
      .channel(`peer-messages-${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'mental_health_peer_messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          onMessage(payload.new as unknown as PeerMessage);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  },
};

// =====================================================
// PEER BLOCKS
// =====================================================
export const peerBlockService = {
  /**
   * Block a user
   */
  async blockUser(blockedUserId: string): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { error } = await supabase.from('mental_health_peer_blocks').insert({
      blocker_id: user.id,
      blocked_user_id: blockedUserId
    });

    if (error) throw error;
  },

  /**
   * Unblock a user
   */
  async unblockUser(blockedUserId: string): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { error } = await supabase
      .from('mental_health_peer_blocks')
      .delete()
      .eq('blocker_id', user.id)
      .eq('blocked_user_id', blockedUserId);

    if (error) throw error;
  },

  /**
   * Get list of blocked user IDs
   */
  async getBlockedUsers(): Promise<string[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('mental_health_peer_blocks')
      .select('blocked_user_id')
      .eq('blocker_id', user.id);

    if (error) throw error;
    return data?.map(b => b.blocked_user_id) || [];
  },

  /**
   * Check if a specific user is blocked
   */
  async isBlocked(userId: string): Promise<boolean> {
    const blocked = await this.getBlockedUsers();
    return blocked.includes(userId);
  },

  /**
   * Check if the current user is blocked by another user
   */
  async amIBlockedBy(userId: string): Promise<boolean> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { data, error } = await supabase
      .from('mental_health_peer_blocks')
      .select('id')
      .eq('blocker_id', userId)
      .eq('blocked_user_id', user.id)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return !!data;
  },
};

// =====================================================
// PEER REPORTS
// =====================================================
export type ReportReason = 'harassment' | 'inappropriate' | 'spam' | 'other';

export interface PeerReport {
  id: string;
  reporter_id: string;
  reported_user_id: string;
  conversation_id?: string;
  reason: ReportReason;
  additional_notes?: string;
  status: 'pending' | 'reviewed' | 'actioned' | 'dismissed';
  admin_notes?: string;
  reviewed_by?: string;
  reviewed_at?: string;
  created_at: string;
}

export const peerReportService = {
  /**
   * Report a user
   */
  async reportUser(params: {
    reportedUserId: string;
    conversationId?: string;
    reason: ReportReason;
    additionalNotes?: string;
  }): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { error } = await supabase.from('mental_health_peer_reports').insert({
      reporter_id: user.id,
      reported_user_id: params.reportedUserId,
      conversation_id: params.conversationId || null,
      reason: params.reason,
      additional_notes: params.additionalNotes || null
    });

    if (error) throw error;
  },

  /**
   * Get my submitted reports
   */
  async getMyReports(): Promise<PeerReport[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('mental_health_peer_reports')
      .select('*')
      .eq('reporter_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return (data as unknown as PeerReport[]) || [];
  },
};

// =====================================================
// REAL-TIME PRESENCE (for availability indicators)
// =====================================================
export const peerPresenceService = {
  /**
   * Subscribe to supporter availability changes
   * OPTIMIZED: Returns single changed supporter instead of full list refetch
   */
  subscribeToAvailability(onUpdate: (supporter: PeerSupporter, eventType: 'INSERT' | 'UPDATE' | 'DELETE') => void) {
    const channel = supabase
      .channel('peer-supporters-availability')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'mental_health_peer_supporters',
        },
        (payload) => {
          onUpdate(payload.new as PeerSupporter, 'INSERT');
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'mental_health_peer_supporters',
        },
        (payload) => {
          onUpdate(payload.new as PeerSupporter, 'UPDATE');
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'mental_health_peer_supporters',
        },
        (payload) => {
          onUpdate(payload.old as PeerSupporter, 'DELETE');
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  },
};
