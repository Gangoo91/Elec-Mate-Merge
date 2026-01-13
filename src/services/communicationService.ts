import { supabase } from '@/integrations/supabase/client';

export type CommunicationType = 'announcement' | 'message' | 'alert';
export type CommunicationPriority = 'low' | 'normal' | 'high' | 'urgent';
export type TargetAudience = 'all' | 'managers' | 'specific';

export interface Communication {
  id: string;
  sender_id: string | null;
  type: CommunicationType;
  title: string;
  content: string;
  priority: CommunicationPriority;
  target_audience: TargetAudience;
  target_employee_ids: string[] | null;
  attachments: Record<string, unknown> | null;
  is_pinned: boolean;
  expires_at: string | null;
  created_at: string;
  // Joined data
  sender?: {
    name: string;
    photo_url: string | null;
  };
  read_count?: number;
  total_recipients?: number;
}

export interface CommunicationRecipient {
  id: string;
  communication_id: string;
  employee_id: string;
  read_at: string | null;
  acknowledged_at: string | null;
  created_at: string;
  // Joined data
  employee?: {
    id: string;
    name: string;
    photo_url: string | null;
  };
}

// Communications CRUD
export const getCommunications = async (): Promise<Communication[]> => {
  const { data, error } = await supabase
    .from('employer_communications')
    .select('*')
    .order('is_pinned', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching communications:', error);
    throw error;
  }

  return data || [];
};

export const getActiveCommunications = async (): Promise<Communication[]> => {
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from('employer_communications')
    .select('*')
    .or(`expires_at.is.null,expires_at.gt.${now}`)
    .order('is_pinned', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching active communications:', error);
    throw error;
  }

  return data || [];
};

export const getCommunicationById = async (id: string): Promise<Communication | null> => {
  const { data, error } = await supabase
    .from('employer_communications')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching communication:', error);
    return null;
  }

  return data;
};

export const createCommunication = async (
  communication: Omit<Communication, 'id' | 'created_at'>
): Promise<Communication> => {
  const { data, error } = await supabase
    .from('employer_communications')
    .insert(communication)
    .select()
    .single();

  if (error) {
    console.error('Error creating communication:', error);
    throw error;
  }

  // If targeting all or specific employees, create recipient records
  if (data) {
    await createRecipientsForCommunication(data);
  }

  return data;
};

export const updateCommunication = async (
  id: string,
  updates: Partial<Communication>
): Promise<Communication | null> => {
  const { data, error } = await supabase
    .from('employer_communications')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating communication:', error);
    return null;
  }

  return data;
};

export const deleteCommunication = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('employer_communications')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting communication:', error);
    return false;
  }

  return true;
};

export const pinCommunication = async (id: string, isPinned: boolean): Promise<boolean> => {
  const { error } = await supabase
    .from('employer_communications')
    .update({ is_pinned: isPinned })
    .eq('id', id);

  if (error) {
    console.error('Error pinning communication:', error);
    return false;
  }

  return true;
};

// Recipients
const createRecipientsForCommunication = async (communication: Communication): Promise<void> => {
  let employeeIds: string[] = [];

  if (communication.target_audience === 'all') {
    // Get all active employees
    const { data: employees } = await supabase
      .from('employer_employees')
      .select('id')
      .eq('status', 'Active');

    employeeIds = (employees || []).map(e => e.id);
  } else if (communication.target_audience === 'managers') {
    // Get employees with manager roles
    const { data: employees } = await supabase
      .from('employer_employees')
      .select('id')
      .eq('status', 'Active')
      .in('team_role', ['Manager', 'Admin', 'Supervisor']);

    employeeIds = (employees || []).map(e => e.id);
  } else if (communication.target_audience === 'specific' && communication.target_employee_ids) {
    employeeIds = communication.target_employee_ids;
  }

  if (employeeIds.length > 0) {
    const recipients = employeeIds.map(employeeId => ({
      communication_id: communication.id,
      employee_id: employeeId,
    }));

    await supabase.from('employer_communication_recipients').insert(recipients);
  }
};

export const getRecipientsForCommunication = async (communicationId: string): Promise<CommunicationRecipient[]> => {
  const { data, error } = await supabase
    .from('employer_communication_recipients')
    .select(`
      *,
      employee:employer_employees (
        id,
        name,
        photo_url
      )
    `)
    .eq('communication_id', communicationId)
    .order('read_at', { ascending: false, nullsFirst: false });

  if (error) {
    console.error('Error fetching recipients:', error);
    throw error;
  }

  return data || [];
};

export const markAsRead = async (communicationId: string, employeeId: string): Promise<boolean> => {
  const { error } = await supabase
    .from('employer_communication_recipients')
    .update({ read_at: new Date().toISOString() })
    .eq('communication_id', communicationId)
    .eq('employee_id', employeeId)
    .is('read_at', null);

  if (error) {
    console.error('Error marking as read:', error);
    return false;
  }

  return true;
};

export const acknowledgeMessage = async (communicationId: string, employeeId: string): Promise<boolean> => {
  const { error } = await supabase
    .from('employer_communication_recipients')
    .update({
      acknowledged_at: new Date().toISOString(),
      read_at: new Date().toISOString(), // Also mark as read
    })
    .eq('communication_id', communicationId)
    .eq('employee_id', employeeId);

  if (error) {
    console.error('Error acknowledging message:', error);
    return false;
  }

  return true;
};

// Get unread count for an employee
export const getUnreadCount = async (employeeId: string): Promise<number> => {
  const { count, error } = await supabase
    .from('employer_communication_recipients')
    .select('id', { count: 'exact', head: true })
    .eq('employee_id', employeeId)
    .is('read_at', null);

  if (error) {
    console.error('Error getting unread count:', error);
    return 0;
  }

  return count || 0;
};

// Stats
export const getCommunicationStats = async (): Promise<{
  totalAnnouncements: number;
  unreadCount: number;
  pinnedCount: number;
}> => {
  const [announcementsResult, pinnedResult] = await Promise.all([
    supabase.from('employer_communications').select('id', { count: 'exact' }),
    supabase.from('employer_communications').select('id', { count: 'exact' }).eq('is_pinned', true),
  ]);

  // Get unread count for current context (would need employee ID in real app)
  const unreadResult = await supabase
    .from('employer_communication_recipients')
    .select('id', { count: 'exact' })
    .is('read_at', null);

  return {
    totalAnnouncements: announcementsResult.count || 0,
    unreadCount: unreadResult.count || 0,
    pinnedCount: pinnedResult.count || 0,
  };
};
