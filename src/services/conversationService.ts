import { supabase } from '@/integrations/supabase/client';

// Helper to send push notification (fire and forget)
const sendPushNotification = async (
  userId: string,
  title: string,
  body: string,
  type: 'job' | 'team' | 'college' | 'peer',
  data?: Record<string, unknown>
) => {
  try {
    await supabase.functions.invoke('send-push-notification', {
      body: { userId, title, body, type, data },
    });
  } catch (error) {
    console.error('Push notification error:', error);
  }
};

// Types
export interface Conversation {
  id: string;
  employer_id: string;
  electrician_profile_id: string;
  vacancy_id: string | null;
  application_id: string | null;
  status: 'active' | 'archived' | 'blocked';
  initiated_by: 'employer' | 'electrician';
  electrician_can_reply: boolean;
  unread_employer: number;
  unread_electrician: number;
  last_message_at: string | null;
  last_message_preview: string | null;
  created_at: string;
  updated_at: string;
  // Joined data
  electrician_profile?: {
    id: string;
    elec_id_number: string;
    ecs_card_type: string;
    verification_tier: string;
    is_verified: boolean;
    employee?: {
      id: string;
      name: string;
      email: string;
    };
  };
  vacancy?: {
    id: string;
    title: string;
    location: string;
    status: string;
  };
  application?: {
    id: string;
    status: string;
  };
}

export interface MessageAttachment {
  id: string;
  message_id: string;
  file_name: string;
  file_type: string;
  file_size: number;
  storage_path: string;
  thumbnail_path: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_type: 'employer' | 'electrician';
  sender_id: string;
  content: string;
  message_type: 'text' | 'system' | 'file' | 'invite';
  metadata: Record<string, unknown>;
  sent_at: string;
  delivered_at: string | null;
  read_at: string | null;
  edited_at: string | null;
  deleted_at: string | null;
  reply_to_id: string | null;
  created_at: string;
  // Joined data
  reactions?: MessageReaction[];
  attachments?: MessageAttachment[];
  reply_to?: Message;
}

export interface MessageReaction {
  id: string;
  message_id: string;
  user_id: string;
  emoji: string;
  created_at: string;
}

export interface VacancyInvitation {
  id: string;
  vacancy_id: string;
  electrician_profile_id: string;
  invited_by: string;
  status: 'pending' | 'viewed' | 'applied' | 'declined' | 'expired';
  message: string | null;
  sent_at: string;
  viewed_at: string | null;
  responded_at: string | null;
  expires_at: string;
  created_at: string;
  // Joined data
  vacancy?: {
    id: string;
    title: string;
    location: string;
  };
  electrician_profile?: {
    id: string;
    elec_id_number: string;
    employee?: {
      name: string;
    };
  };
}

// =====================================================
// Conversations
// =====================================================

export const getConversations = async (): Promise<Conversation[]> => {
  const { data, error } = await supabase
    .from('employer_conversations')
    .select(`
      *,
      electrician_profile:employer_elec_id_profiles (
        id,
        elec_id_number,
        ecs_card_type,
        verification_tier,
        is_verified,
        employee:employer_employees (
          id,
          name,
          email
        )
      ),
      vacancy:employer_vacancies (
        id,
        title,
        location,
        status
      ),
      application:employer_vacancy_applications (
        id,
        status
      )
    `)
    .eq('status', 'active')
    .order('last_message_at', { ascending: false, nullsFirst: false });

  if (error) {
    console.error('Error fetching conversations:', error);
    throw error;
  }

  return data || [];
};

export const getConversationById = async (id: string): Promise<Conversation | null> => {
  const { data, error } = await supabase
    .from('employer_conversations')
    .select(`
      *,
      electrician_profile:employer_elec_id_profiles (
        id,
        elec_id_number,
        ecs_card_type,
        verification_tier,
        is_verified,
        employee:employer_employees (
          id,
          name,
          email
        )
      ),
      vacancy:employer_vacancies (
        id,
        title,
        location,
        status
      ),
      application:employer_vacancy_applications (
        id,
        status
      )
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching conversation:', error);
    return null;
  }

  return data;
};

export const getOrCreateConversation = async (params: {
  employer_id: string;
  electrician_profile_id: string;
  vacancy_id?: string;
  initiated_by: 'employer' | 'electrician';
}): Promise<Conversation> => {
  // First try to find existing conversation
  let query = supabase
    .from('employer_conversations')
    .select('*')
    .eq('employer_id', params.employer_id)
    .eq('electrician_profile_id', params.electrician_profile_id);

  if (params.vacancy_id) {
    query = query.eq('vacancy_id', params.vacancy_id);
  } else {
    query = query.is('vacancy_id', null);
  }

  const { data: existing } = await query.single();

  if (existing) {
    return existing;
  }

  // Create new conversation
  const { data, error } = await supabase
    .from('employer_conversations')
    .insert({
      employer_id: params.employer_id,
      electrician_profile_id: params.electrician_profile_id,
      vacancy_id: params.vacancy_id || null,
      initiated_by: params.initiated_by,
      electrician_can_reply: params.initiated_by === 'electrician', // If electrician starts, they can reply
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating conversation:', error);
    throw error;
  }

  return data;
};

export const archiveConversation = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('employer_conversations')
    .update({ status: 'archived' })
    .eq('id', id);

  if (error) {
    console.error('Error archiving conversation:', error);
    return false;
  }

  return true;
};

export const markConversationAsRead = async (
  id: string,
  userType: 'employer' | 'electrician'
): Promise<void> => {
  const updateField = userType === 'employer' ? 'unread_employer' : 'unread_electrician';

  const { error } = await supabase
    .from('employer_conversations')
    .update({ [updateField]: 0 })
    .eq('id', id);

  if (error) {
    console.error('Error marking conversation as read:', error);
  }

  // Also mark all messages as read
  await supabase
    .from('employer_messages')
    .update({ read_at: new Date().toISOString() })
    .eq('conversation_id', id)
    .neq('sender_type', userType)
    .is('read_at', null);
};

// =====================================================
// Messages
// =====================================================

export const getMessages = async (
  conversationId: string,
  options?: { limit?: number; offset?: number }
): Promise<Message[]> => {
  let query = supabase
    .from('employer_messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('sent_at', { ascending: true });

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  if (options?.offset) {
    query = query.range(options.offset, options.offset + (options.limit || 50) - 1);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }

  return data || [];
};

export const sendMessage = async (params: {
  conversation_id: string;
  sender_type: 'employer' | 'electrician';
  sender_id: string;
  content: string;
  message_type?: 'text' | 'system' | 'file' | 'invite';
  metadata?: Record<string, unknown>;
}): Promise<Message> => {
  const { data, error } = await supabase
    .from('employer_messages')
    .insert({
      conversation_id: params.conversation_id,
      sender_type: params.sender_type,
      sender_id: params.sender_id,
      content: params.content,
      message_type: params.message_type || 'text',
      metadata: params.metadata || {},
      sent_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error('Error sending message:', error);
    throw error;
  }

  // Send push notification to recipient (fire and forget)
  sendJobMessagePushNotification(params.conversation_id, params.sender_type, params.sender_id, params.content).catch(console.error);

  return data;
};

// Helper to send push notification for job messages
const sendJobMessagePushNotification = async (
  conversationId: string,
  senderType: 'employer' | 'electrician',
  senderId: string,
  content: string
) => {
  try {
    // Get conversation to find recipient
    const { data: conversation } = await supabase
      .from('employer_conversations')
      .select(`
        employer_id,
        electrician_profile_id,
        vacancy:employer_vacancies(title),
        electrician_profile:employer_elec_id_profiles(
          employee:employer_employees(name, user_id)
        )
      `)
      .eq('id', conversationId)
      .single();

    if (!conversation) return;

    // Determine recipient
    let recipientId: string;
    let senderName: string;

    if (senderType === 'employer') {
      // Sender is employer, recipient is electrician
      const userId = (conversation.electrician_profile as any)?.employee?.user_id;
      if (!userId) return;
      recipientId = userId;

      // Get employer name
      const { data: employer } = await supabase
        .from('employer_profiles')
        .select('company_name')
        .eq('id', conversation.employer_id)
        .single();
      senderName = employer?.company_name || 'Employer';
    } else {
      // Sender is electrician, recipient is employer
      recipientId = conversation.employer_id;
      senderName = (conversation.electrician_profile as any)?.employee?.name || 'Electrician';
    }

    const vacancyTitle = (conversation.vacancy as any)?.title;
    const title = vacancyTitle ? `${senderName} - ${vacancyTitle}` : `Message from ${senderName}`;
    const body = content.length > 100 ? content.substring(0, 97) + '...' : content;

    await sendPushNotification(recipientId, title, body, 'job', {
      conversationId,
      senderId,
      senderName,
      isEmployer: senderType === 'electrician', // Recipient perspective
    });
  } catch (error) {
    console.error('Error sending job message push:', error);
  }
};

export const markMessageAsDelivered = async (id: string): Promise<void> => {
  await supabase
    .from('employer_messages')
    .update({ delivered_at: new Date().toISOString() })
    .eq('id', id)
    .is('delivered_at', null);
};

export const markMessageAsRead = async (id: string): Promise<void> => {
  await supabase
    .from('employer_messages')
    .update({ read_at: new Date().toISOString() })
    .eq('id', id)
    .is('read_at', null);
};

export const editMessage = async (id: string, content: string): Promise<Message> => {
  const { data, error } = await supabase
    .from('employer_messages')
    .update({
      content,
      edited_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error editing message:', error);
    throw error;
  }

  return data;
};

export const deleteMessage = async (id: string): Promise<void> => {
  // Soft delete - mark as deleted instead of removing
  const { error } = await supabase
    .from('employer_messages')
    .update({
      deleted_at: new Date().toISOString(),
      content: '[Message deleted]',
    })
    .eq('id', id);

  if (error) {
    console.error('Error deleting message:', error);
    throw error;
  }
};

// =====================================================
// Message Reactions
// =====================================================

export const addReaction = async (
  messageId: string,
  emoji: string,
  userId: string
): Promise<MessageReaction> => {
  const { data, error } = await supabase
    .from('employer_message_reactions')
    .insert({
      message_id: messageId,
      user_id: userId,
      emoji,
    })
    .select()
    .single();

  if (error) {
    console.error('Error adding reaction:', error);
    throw error;
  }

  return data;
};

export const removeReaction = async (reactionId: string): Promise<void> => {
  const { error } = await supabase
    .from('employer_message_reactions')
    .delete()
    .eq('id', reactionId);

  if (error) {
    console.error('Error removing reaction:', error);
    throw error;
  }
};

export const getReactionsForMessage = async (messageId: string): Promise<MessageReaction[]> => {
  const { data, error } = await supabase
    .from('employer_message_reactions')
    .select('*')
    .eq('message_id', messageId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching reactions:', error);
    throw error;
  }

  return data || [];
};

// =====================================================
// Message Search
// =====================================================

export const searchMessages = async (
  conversationId: string,
  query: string
): Promise<Message[]> => {
  // Use ilike for basic search (full-text search can be added with pg_trgm extension)
  const { data, error } = await supabase
    .from('employer_messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .ilike('content', `%${query}%`)
    .is('deleted_at', null)
    .order('sent_at', { ascending: false })
    .limit(50);

  if (error) {
    console.error('Error searching messages:', error);
    throw error;
  }

  return data || [];
};

export const searchAllMessages = async (
  query: string,
  options?: { limit?: number; userType?: 'employer' | 'electrician'; userId?: string }
): Promise<Message[]> => {
  let queryBuilder = supabase
    .from('employer_messages')
    .select(`
      *,
      conversation:employer_conversations (
        id,
        employer_id,
        electrician_profile_id
      )
    `)
    .ilike('content', `%${query}%`)
    .is('deleted_at', null)
    .order('sent_at', { ascending: false })
    .limit(options?.limit || 50);

  const { data, error } = await queryBuilder;

  if (error) {
    console.error('Error searching all messages:', error);
    throw error;
  }

  return data || [];
};

// =====================================================
// Vacancy Invitations
// =====================================================

export const getInvitationsForProfile = async (profileId: string): Promise<VacancyInvitation[]> => {
  const { data, error } = await supabase
    .from('employer_vacancy_invitations')
    .select(`
      *,
      vacancy:employer_vacancies (
        id,
        title,
        location
      )
    `)
    .eq('electrician_profile_id', profileId)
    .order('sent_at', { ascending: false });

  if (error) {
    console.error('Error fetching invitations:', error);
    throw error;
  }

  return data || [];
};

export const getInvitationsForVacancy = async (vacancyId: string): Promise<VacancyInvitation[]> => {
  const { data, error } = await supabase
    .from('employer_vacancy_invitations')
    .select(`
      *,
      electrician_profile:employer_elec_id_profiles (
        id,
        elec_id_number,
        employee:employer_employees (
          name
        )
      )
    `)
    .eq('vacancy_id', vacancyId)
    .order('sent_at', { ascending: false });

  if (error) {
    console.error('Error fetching invitations:', error);
    throw error;
  }

  return data || [];
};

export const createInvitation = async (params: {
  vacancy_id: string;
  electrician_profile_id: string;
  invited_by: string;
  message?: string;
}): Promise<VacancyInvitation> => {
  const { data, error } = await supabase
    .from('employer_vacancy_invitations')
    .insert({
      vacancy_id: params.vacancy_id,
      electrician_profile_id: params.electrician_profile_id,
      invited_by: params.invited_by,
      message: params.message || null,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating invitation:', error);
    throw error;
  }

  return data;
};

export const updateInvitationStatus = async (
  id: string,
  status: VacancyInvitation['status']
): Promise<VacancyInvitation | null> => {
  const updates: Partial<VacancyInvitation> = { status };

  if (status === 'viewed') {
    updates.viewed_at = new Date().toISOString();
  } else if (status === 'applied' || status === 'declined') {
    updates.responded_at = new Date().toISOString();
  }

  const { data, error } = await supabase
    .from('employer_vacancy_invitations')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating invitation:', error);
    return null;
  }

  return data;
};

// =====================================================
// Electrician-side Conversations
// =====================================================

export interface ElectricianConversation {
  id: string;
  employer_id: string;
  electrician_profile_id: string;
  vacancy_id: string | null;
  application_id: string | null;
  status: 'active' | 'archived' | 'blocked';
  initiated_by: 'employer' | 'electrician';
  electrician_can_reply: boolean;
  unread_employer: number;
  unread_electrician: number;
  last_message_at: string | null;
  last_message_preview: string | null;
  created_at: string;
  updated_at: string;
  // Joined data - employer info instead of electrician
  employer?: {
    id: string;
    company_name: string;
    contact_name: string;
    email: string;
    logo_url: string | null;
  };
  vacancy?: {
    id: string;
    title: string;
    location: string;
    status: string;
    salary_min: number | null;
    salary_max: number | null;
  };
  application?: {
    id: string;
    status: string;
  };
}

/**
 * Get conversations for an electrician by their elec_id_profile_id
 */
export const getElectricianConversations = async (
  electricianProfileId: string
): Promise<ElectricianConversation[]> => {
  const { data, error } = await supabase
    .from('employer_conversations')
    .select(`
      *,
      employer:employer_profiles (
        id,
        company_name,
        contact_name,
        email,
        logo_url
      ),
      vacancy:employer_vacancies (
        id,
        title,
        location,
        status,
        salary_min,
        salary_max
      ),
      application:employer_vacancy_applications (
        id,
        status
      )
    `)
    .eq('electrician_profile_id', electricianProfileId)
    .eq('status', 'active')
    .order('last_message_at', { ascending: false, nullsFirst: false });

  if (error) {
    console.error('Error fetching electrician conversations:', error);
    throw error;
  }

  return data || [];
};

/**
 * Get conversation stats for an electrician
 */
export const getElectricianConversationStats = async (
  electricianProfileId: string
): Promise<{
  total: number;
  unreadCount: number;
  canReplyCount: number;
}> => {
  const [totalResult, unreadResult, canReplyResult] = await Promise.all([
    supabase
      .from('employer_conversations')
      .select('id', { count: 'exact' })
      .eq('electrician_profile_id', electricianProfileId)
      .eq('status', 'active'),
    supabase
      .from('employer_conversations')
      .select('id', { count: 'exact' })
      .eq('electrician_profile_id', electricianProfileId)
      .eq('status', 'active')
      .gt('unread_electrician', 0),
    supabase
      .from('employer_conversations')
      .select('id', { count: 'exact' })
      .eq('electrician_profile_id', electricianProfileId)
      .eq('status', 'active')
      .eq('electrician_can_reply', true),
  ]);

  return {
    total: totalResult.count || 0,
    unreadCount: unreadResult.count || 0,
    canReplyCount: canReplyResult.count || 0,
  };
};

// =====================================================
// Stats
// =====================================================

export const getConversationStats = async (): Promise<{
  total: number;
  unreadCount: number;
  activeCount: number;
}> => {
  const [totalResult, unreadResult, activeResult] = await Promise.all([
    supabase.from('employer_conversations').select('id', { count: 'exact' }),
    supabase.from('employer_conversations').select('id', { count: 'exact' }).gt('unread_employer', 0),
    supabase.from('employer_conversations').select('id', { count: 'exact' }).eq('status', 'active'),
  ]);

  return {
    total: totalResult.count || 0,
    unreadCount: unreadResult.count || 0,
    activeCount: activeResult.count || 0,
  };
};
