import { supabase } from '@/integrations/supabase/client';

// Types
export interface TeamChannel {
  id: string;
  employer_id: string;
  name: string;
  description: string | null;
  channel_type: 'general' | 'project' | 'announcements' | 'direct';
  is_private: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
  // Computed
  unread_count?: number;
  member_count?: number;
}

export interface TeamChannelMember {
  id: string;
  channel_id: string;
  user_id: string;
  role: 'admin' | 'member';
  last_read_at: string | null;
  notifications_enabled: boolean;
  joined_at: string;
  // Joined
  user?: {
    id: string;
    name: string;
    avatar_url: string | null;
  };
}

export interface TeamChannelMessage {
  id: string;
  channel_id: string;
  sender_id: string;
  content: string;
  message_type: 'text' | 'file' | 'system' | 'voice_note';
  metadata: Record<string, unknown>;
  reply_to_id: string | null;
  is_pinned: boolean;
  sent_at: string;
  edited_at: string | null;
  created_at: string;
  // Joined
  sender?: {
    id: string;
    name: string;
    avatar_url: string | null;
  };
}

export interface TeamDirectMessage {
  id: string;
  employer_id: string;
  participant_1_id: string;
  participant_2_id: string;
  unread_1: number;
  unread_2: number;
  last_message_at: string | null;
  last_message_preview: string | null;
  created_at: string;
  updated_at: string;
  // Joined - other participant info
  other_participant?: {
    id: string;
    name: string;
    avatar_url: string | null;
    role: string;
  };
}

export interface TeamDMMessage {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  message_type: string;
  metadata: Record<string, unknown>;
  sent_at: string;
  read_at: string | null;
  created_at: string;
}

// =====================================================
// CHANNELS
// =====================================================

export const teamChannelService = {
  /**
   * Get all channels for an employer
   */
  async getChannels(employerId: string): Promise<TeamChannel[]> {
    const { data, error } = await supabase
      .from('team_channels')
      .select('*')
      .eq('employer_id', employerId)
      .order('name');

    if (error) throw error;
    return data || [];
  },

  /**
   * Get channels the current user is a member of
   */
  async getMyChannels(): Promise<TeamChannel[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('team_channel_members')
      .select(`
        channel:team_channels(*)
      `)
      .eq('user_id', user.id);

    if (error) throw error;
    return (data?.map(d => d.channel) || []).filter(Boolean) as TeamChannel[];
  },

  /**
   * Create a new channel
   */
  async createChannel(params: {
    employer_id: string;
    name: string;
    description?: string;
    channel_type?: TeamChannel['channel_type'];
    is_private?: boolean;
  }): Promise<TeamChannel> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('team_channels')
      .insert({
        employer_id: params.employer_id,
        name: params.name,
        description: params.description || null,
        channel_type: params.channel_type || 'general',
        is_private: params.is_private || false,
        created_by: user.id,
      })
      .select()
      .single();

    if (error) throw error;

    // Add creator as admin
    await supabase.from('team_channel_members').insert({
      channel_id: data.id,
      user_id: user.id,
      role: 'admin',
    });

    return data;
  },

  /**
   * Add member to channel
   */
  async addMember(channelId: string, userId: string, role: 'admin' | 'member' = 'member'): Promise<void> {
    const { error } = await supabase
      .from('team_channel_members')
      .insert({
        channel_id: channelId,
        user_id: userId,
        role,
      });

    if (error) throw error;
  },

  /**
   * Remove member from channel
   */
  async removeMember(channelId: string, userId: string): Promise<void> {
    const { error } = await supabase
      .from('team_channel_members')
      .delete()
      .eq('channel_id', channelId)
      .eq('user_id', userId);

    if (error) throw error;
  },

  /**
   * Get channel members
   */
  async getMembers(channelId: string): Promise<TeamChannelMember[]> {
    const { data, error } = await supabase
      .from('team_channel_members')
      .select(`
        *,
        user:employer_employees!team_channel_members_user_id_fkey(id, name, photo_url)
      `)
      .eq('channel_id', channelId);

    if (error) throw error;
    return data || [];
  },
};

// =====================================================
// CHANNEL MESSAGES
// =====================================================

export const teamChannelMessageService = {
  /**
   * Get messages for a channel
   */
  async getMessages(channelId: string, limit = 50): Promise<TeamChannelMessage[]> {
    const { data, error } = await supabase
      .from('team_channel_messages')
      .select(`
        *,
        sender:employer_employees!team_channel_messages_sender_id_fkey(id, name, photo_url)
      `)
      .eq('channel_id', channelId)
      .order('sent_at', { ascending: true })
      .limit(limit);

    if (error) throw error;
    return data || [];
  },

  /**
   * Send a message to a channel
   */
  async sendMessage(channelId: string, content: string, messageType: string = 'text'): Promise<TeamChannelMessage> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('team_channel_messages')
      .insert({
        channel_id: channelId,
        sender_id: user.id,
        content,
        message_type: messageType,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Subscribe to new messages
   */
  subscribeToMessages(channelId: string, onMessage: (message: TeamChannelMessage) => void) {
    const channel = supabase
      .channel(`team-channel-${channelId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'team_channel_messages',
          filter: `channel_id=eq.${channelId}`,
        },
        (payload) => onMessage(payload.new as TeamChannelMessage)
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  },
};

// =====================================================
// DIRECT MESSAGES
// =====================================================

export const teamDMService = {
  /**
   * Get all DM conversations for current user
   */
  async getConversations(employerId: string): Promise<TeamDirectMessage[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('team_direct_messages')
      .select('*')
      .eq('employer_id', employerId)
      .or(`participant_1_id.eq.${user.id},participant_2_id.eq.${user.id}`)
      .order('last_message_at', { ascending: false, nullsFirst: false });

    if (error) throw error;
    return data || [];
  },

  /**
   * Get or create a DM conversation
   */
  async getOrCreateConversation(employerId: string, otherUserId: string): Promise<TeamDirectMessage> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    // Try to find existing
    const { data: existing } = await supabase
      .from('team_direct_messages')
      .select('*')
      .eq('employer_id', employerId)
      .or(`and(participant_1_id.eq.${user.id},participant_2_id.eq.${otherUserId}),and(participant_1_id.eq.${otherUserId},participant_2_id.eq.${user.id})`)
      .single();

    if (existing) return existing;

    // Create new
    const { data, error } = await supabase
      .from('team_direct_messages')
      .insert({
        employer_id: employerId,
        participant_1_id: user.id,
        participant_2_id: otherUserId,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Get messages for a DM conversation
   */
  async getMessages(conversationId: string, limit = 50): Promise<TeamDMMessage[]> {
    const { data, error } = await supabase
      .from('team_dm_messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('sent_at', { ascending: true })
      .limit(limit);

    if (error) throw error;
    return data || [];
  },

  /**
   * Send a DM
   */
  async sendMessage(conversationId: string, content: string): Promise<TeamDMMessage> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('team_dm_messages')
      .insert({
        conversation_id: conversationId,
        sender_id: user.id,
        content,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Mark messages as read
   */
  async markAsRead(conversationId: string): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Update messages
    await supabase
      .from('team_dm_messages')
      .update({ read_at: new Date().toISOString() })
      .eq('conversation_id', conversationId)
      .neq('sender_id', user.id)
      .is('read_at', null);

    // Reset unread count
    const { data: conv } = await supabase
      .from('team_direct_messages')
      .select('participant_1_id, participant_2_id')
      .eq('id', conversationId)
      .single();

    if (conv) {
      const updateField = conv.participant_1_id === user.id ? 'unread_1' : 'unread_2';
      await supabase
        .from('team_direct_messages')
        .update({ [updateField]: 0 })
        .eq('id', conversationId);
    }
  },

  /**
   * Subscribe to new messages
   */
  subscribeToMessages(conversationId: string, onMessage: (message: TeamDMMessage) => void) {
    const channel = supabase
      .channel(`team-dm-${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'team_dm_messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => onMessage(payload.new as TeamDMMessage)
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  },
};
