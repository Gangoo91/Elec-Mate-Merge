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
export type ConversationType = 'student_tutor' | 'college_employer' | 'student_employer';
export type ParticipantType = 'student' | 'staff' | 'employer';

export interface CollegeConversation {
  id: string;
  institution_id: string;
  conversation_type: ConversationType;
  participant_1_id: string;
  participant_1_type: ParticipantType;
  participant_2_id: string;
  participant_2_type: ParticipantType;
  student_id: string | null;
  status: 'active' | 'archived' | 'closed';
  unread_1: number;
  unread_2: number;
  last_message_at: string | null;
  last_message_preview: string | null;
  created_at: string;
  updated_at: string;
  // Joined data
  other_participant?: {
    id: string;
    name: string;
    avatar_url: string | null;
    type: ParticipantType;
    role?: string; // For staff: Tutor, Assessor, etc.
  };
  student?: {
    id: string;
    first_name: string;
    last_name: string;
  };
}

export interface CollegeMessage {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  message_type: 'text' | 'file' | 'system' | 'progress_update';
  metadata: Record<string, unknown>;
  is_confidential: boolean;
  visible_to_student: boolean;
  sent_at: string;
  read_at: string | null;
  created_at: string;
  // Joined
  sender?: {
    id: string;
    name: string;
    avatar_url: string | null;
    type: ParticipantType;
  };
}

// =====================================================
// CONVERSATIONS
// =====================================================

export const collegeConversationService = {
  /**
   * Get conversations for current user
   */
  async getMyConversations(): Promise<CollegeConversation[]> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('college_conversations')
        .select(`
          *,
          student:college_students(id, first_name, last_name)
        `)
        .or(`participant_1_id.eq.${user.id},participant_2_id.eq.${user.id}`)
        .eq('status', 'active')
        .order('last_message_at', { ascending: false, nullsFirst: false });

      if (error) {
        // Table may not exist yet - fail gracefully
        return [];
      }
      return (data as unknown as CollegeConversation[]) || [];
    } catch {
      // College chat feature not fully set up
      return [];
    }
  },

  /**
   * Get conversations for a specific student (staff view)
   */
  async getStudentConversations(studentId: string): Promise<CollegeConversation[]> {
    try {
      const { data, error } = await supabase
        .from('college_conversations')
        .select('*')
        .eq('student_id', studentId)
        .order('last_message_at', { ascending: false });

      if (error) return [];
      return (data as unknown as CollegeConversation[]) || [];
    } catch {
      return [];
    }
  },

  /**
   * Get or create a student-tutor conversation
   */
  async getOrCreateStudentTutorConversation(
    institutionId: string,
    studentUserId: string,
    tutorUserId: string,
    studentId?: string
  ): Promise<CollegeConversation> {
    // Try to find existing
    const { data: existing } = await supabase
      .from('college_conversations')
      .select('*')
      .eq('institution_id', institutionId)
      .eq('conversation_type', 'student_tutor')
      .or(`and(participant_1_id.eq.${studentUserId},participant_2_id.eq.${tutorUserId}),and(participant_1_id.eq.${tutorUserId},participant_2_id.eq.${studentUserId})`)
      .single();

    if (existing) return existing as unknown as CollegeConversation;

    // Create new
    const { data, error } = await supabase
      .from('college_conversations')
      .insert({
        institution_id: institutionId,
        conversation_type: 'student_tutor',
        participant_1_id: tutorUserId, // Staff initiates
        participant_1_type: 'staff',
        participant_2_id: studentUserId,
        participant_2_type: 'student',
        student_id: studentId || null,
      })
      .select()
      .single();

    if (error) throw error;
    return data as unknown as CollegeConversation;
  },

  /**
   * Get or create a college-employer conversation
   */
  async getOrCreateCollegeEmployerConversation(
    institutionId: string,
    staffUserId: string,
    employerUserId: string,
    studentId?: string
  ): Promise<CollegeConversation> {
    // Try to find existing
    const { data: existing } = await supabase
      .from('college_conversations')
      .select('*')
      .eq('institution_id', institutionId)
      .eq('conversation_type', 'college_employer')
      .or(`and(participant_1_id.eq.${staffUserId},participant_2_id.eq.${employerUserId}),and(participant_1_id.eq.${employerUserId},participant_2_id.eq.${staffUserId})`)
      .maybeSingle();

    if (existing) return existing as unknown as CollegeConversation;

    // Create new
    const { data, error } = await supabase
      .from('college_conversations')
      .insert({
        institution_id: institutionId,
        conversation_type: 'college_employer',
        participant_1_id: staffUserId,
        participant_1_type: 'staff',
        participant_2_id: employerUserId,
        participant_2_type: 'employer',
        student_id: studentId || null,
      })
      .select()
      .single();

    if (error) throw error;
    return data as unknown as CollegeConversation;
  },

  /**
   * Archive a conversation
   */
  async archiveConversation(conversationId: string): Promise<void> {
    const { error } = await supabase
      .from('college_conversations')
      .update({ status: 'archived' })
      .eq('id', conversationId);

    if (error) throw error;
  },

  /**
   * Get conversation stats
   */
  async getStats(): Promise<{ total: number; unread: number }> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { total: 0, unread: 0 };

    const { data, error } = await supabase
      .from('college_conversations')
      .select('id, unread_1, unread_2, participant_1_id')
      .or(`participant_1_id.eq.${user.id},participant_2_id.eq.${user.id}`)
      .eq('status', 'active');

    if (error) return { total: 0, unread: 0 };

    const total = data?.length || 0;
    const unread = data?.reduce((sum, conv) => {
      const unreadCount = conv.participant_1_id === user.id ? conv.unread_1 : conv.unread_2;
      return sum + (unreadCount || 0);
    }, 0) || 0;

    return { total, unread };
  },
};

// =====================================================
// MESSAGES
// =====================================================

export const collegeMessageService = {
  /**
   * Get messages for a conversation
   */
  async getMessages(conversationId: string, limit = 50): Promise<CollegeMessage[]> {
    const { data, error } = await supabase
      .from('college_messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('sent_at', { ascending: true })
      .limit(limit);

    if (error) throw error;
    return (data as unknown as CollegeMessage[]) || [];
  },

  /**
   * Send a message
   */
  async sendMessage(params: {
    conversation_id: string;
    content: string;
    message_type?: CollegeMessage['message_type'];
    is_confidential?: boolean;
    visible_to_student?: boolean;
    metadata?: Record<string, unknown>;
  }): Promise<CollegeMessage> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('college_messages')
      .insert({
        conversation_id: params.conversation_id,
        sender_id: user.id,
        content: params.content,
        message_type: params.message_type || 'text',
        is_confidential: params.is_confidential || false,
        visible_to_student: params.visible_to_student !== false,
        metadata: params.metadata || {},
      })
      .select()
      .single();

    if (error) throw error;

    // Send push notification to recipient (fire and forget)
    sendCollegeMessagePush(params.conversation_id, user.id, params.content).catch(console.error);

    return data as unknown as CollegeMessage;
  },

  /**
   * Mark messages as read
   */
  async markAsRead(conversationId: string): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Update messages
    await supabase
      .from('college_messages')
      .update({ read_at: new Date().toISOString() })
      .eq('conversation_id', conversationId)
      .neq('sender_id', user.id)
      .is('read_at', null);

    // Reset unread count
    const { data: conv } = await supabase
      .from('college_conversations')
      .select('participant_1_id, participant_2_id')
      .eq('id', conversationId)
      .single();

    if (conv) {
      const updateField = (conv as any).participant_1_id === user.id ? 'unread_1' : 'unread_2';
      await supabase
        .from('college_conversations')
        .update({ [updateField]: 0 })
        .eq('id', conversationId);
    }
  },

  /**
   * Subscribe to new messages
   */
  subscribeToMessages(conversationId: string, onMessage: (message: CollegeMessage) => void) {
    const channel = supabase
      .channel(`college-messages-${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'college',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => onMessage(payload.new as unknown as CollegeMessage)
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  },

  /**
   * Send a progress update (special message type for student progress)
   */
  async sendProgressUpdate(conversationId: string, progressData: {
    type: 'assessment' | 'attendance' | 'milestone';
    title: string;
    details: string;
    score?: number;
  }): Promise<CollegeMessage> {
    return this.sendMessage({
      conversation_id: conversationId,
      content: progressData.title,
      message_type: 'progress_update',
      metadata: progressData,
    });
  },
};

// =====================================================
// HELPERS
// =====================================================

export const collegeChatHelpers = {
  /**
   * Get user type from their ID
   */
  async getUserType(userId: string): Promise<ParticipantType | null> {
    // Check if student
    const { data: student } = await supabase
      .from('college_students')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (student) return 'student';

    // Check if staff
    const { data: staff } = await supabase
      .from('college_staff')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (staff) return 'staff';

    // Check if employer
    const { data: employer } = await supabase
      .from('college_employers')
      .select('id')
      .eq('portal_user_id', userId)
      .single();

    if (employer) return 'employer';

    return null;
  },

  /**
   * Get other participant details
   */
  async getParticipantDetails(userId: string, type: ParticipantType): Promise<{
    name: string;
    avatar_url: string | null;
    role?: string;
  }> {
    if (type === 'student') {
      const { data } = await supabase
        .from('college_students')
        .select('first_name, last_name, avatar_url')
        .eq('user_id', userId)
        .single();

      return {
        name: data ? `${data.first_name} ${data.last_name}` : 'Unknown Student',
        avatar_url: data?.avatar_url || null,
      };
    }

    if (type === 'staff') {
      const { data } = await supabase
        .from('college_staff')
        .select('first_name, last_name, avatar_url, role')
        .eq('user_id', userId)
        .single();

      return {
        name: data ? `${data.first_name} ${data.last_name}` : 'Unknown Staff',
        avatar_url: data?.avatar_url || null,
        role: data?.role,
      };
    }

    if (type === 'employer') {
      const { data } = await supabase
        .from('college_employers')
        .select('company_name, contact_name')
        .eq('portal_user_id', userId)
        .single();

      return {
        name: data?.company_name || data?.contact_name || 'Unknown Employer',
        avatar_url: null,
      };
    }

    return { name: 'Unknown', avatar_url: null };
  },
};

// =====================================================
// PUSH NOTIFICATION HELPERS
// =====================================================

/**
 * Send push notification for college chat message
 */
async function sendCollegeMessagePush(conversationId: string, senderId: string, content: string) {
  try {
    // Get conversation to find recipient
    const { data: conv } = await supabase
      .from('college_conversations')
      .select('participant_1_id, participant_2_id, participant_1_type, participant_2_type')
      .eq('id', conversationId)
      .single();

    if (!conv) return;

    // Determine recipient and sender type
    const isParticipant1 = (conv as any).participant_1_id === senderId;
    const recipientId = isParticipant1 ? (conv as any).participant_2_id : (conv as any).participant_1_id;
    const senderType = isParticipant1 ? (conv as any).participant_1_type : (conv as any).participant_2_type;

    // Get sender name
    const senderDetails = await collegeChatHelpers.getParticipantDetails(senderId, senderType);

    const title = `College: ${senderDetails.name}`;
    const body = content.length > 100 ? content.substring(0, 97) + '...' : content;

    await sendPushNotification(recipientId, title, body, 'college', {
      conversationId,
      senderId,
      senderName: senderDetails.name,
    });
  } catch (error) {
    console.error('College message push notification error:', error);
  }
}
