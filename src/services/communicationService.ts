import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

export type CommunicationType = 'announcement' | 'message' | 'alert';
export type CommunicationPriority = 'low' | 'normal' | 'high' | 'urgent';
export type TargetAudience = 'all' | 'managers' | 'specific';

type CommunicationRow = Database['public']['Tables']['employer_communications']['Row'];

/** One boundary conversion: the generated Row carries plain strings where the
 *  app uses unions (type/priority/audience — constrained by the compose UI and
 *  DB writers). Narrow here once instead of implicit casts at every return. */
const toCommunication = (row: CommunicationRow): Communication => row as unknown as Communication;

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
  /** Employer-side receipts — persisted, not session state. */
  employer_read_at: string | null;
  employer_acknowledged_at: string | null;
  /** True mandatory-reading flag — set at compose, never inferred from priority. */
  requires_acknowledgement: boolean;
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

  return (data || []).map(toCommunication);
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

  return (data || []).map(toCommunication);
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

  return data ? toCommunication(data) : null;
};

// Receipts are set by the system, not the composer; requires_acknowledgement
// defaults false (only the Mandatory Reading compose path sets it). Joined
// display fields (sender/read_count/total_recipients) are not DB columns.
type NewCommunication = Omit<
  Communication,
  | 'id'
  | 'created_at'
  | 'employer_read_at'
  | 'employer_acknowledged_at'
  | 'requires_acknowledgement'
  | 'sender'
  | 'read_count'
  | 'total_recipients'
> & { requires_acknowledgement?: boolean };

export const createCommunication = async (
  communication: NewCommunication
): Promise<Communication> => {
  // RLS requires sender_id = auth.uid() — stamp it here so no call site can
  // forget (null fails the INSERT policy with 42501)
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  // Explicit column list — never spread app objects into an insert
  const { data, error } = await supabase
    .from('employer_communications')
    .insert({
      type: communication.type,
      title: communication.title,
      content: communication.content,
      priority: communication.priority,
      target_audience: communication.target_audience,
      target_employee_ids: communication.target_employee_ids,
      attachments: (communication.attachments ?? null) as CommunicationRow['attachments'],
      is_pinned: communication.is_pinned,
      expires_at: communication.expires_at,
      sender_id: user.id,
      requires_acknowledgement: communication.requires_acknowledgement ?? false,
      // Your own message starts read — and your own mandatory post doesn't
      // need YOUR signature (the team's signatures are tracked per recipient),
      // so it must not sit in your "To sign" count forever
      employer_read_at: new Date().toISOString(),
      employer_acknowledged_at: communication.requires_acknowledgement
        ? new Date().toISOString()
        : null,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating communication:', error);
    throw error;
  }

  const created = toCommunication(data);

  // If targeting all or specific employees, create recipient records
  await createRecipientsForCommunication(created);

  return created;
};

export const updateCommunication = async (
  id: string,
  updates: Partial<NewCommunication>
): Promise<Communication | null> => {
  const { data, error } = await supabase
    .from('employer_communications')
    .update(updates as unknown as Database['public']['Tables']['employer_communications']['Update'])
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating communication:', error);
    return null;
  }

  return data ? toCommunication(data) : null;
};

export const deleteCommunication = async (id: string): Promise<void> => {
  // .select() so an RLS denial (0 rows deleted, no error) surfaces as a failure
  // instead of a silent no-op behind a success toast.
  const { data, error } = await supabase
    .from('employer_communications')
    .delete()
    .eq('id', id)
    .select('id');

  if (error) {
    console.error('Error deleting communication:', error);
    throw error;
  }
  if (!data || data.length === 0) {
    throw new Error('Message was not deleted — it may have been removed or you lack permission');
  }
};

export const pinCommunication = async (id: string, isPinned: boolean): Promise<void> => {
  const { data, error } = await supabase
    .from('employer_communications')
    .update({ is_pinned: isPinned })
    .eq('id', id)
    .select('id');

  if (error) {
    console.error('Error pinning communication:', error);
    throw error;
  }
  if (!data || data.length === 0) {
    throw new Error('Message was not updated — it may have been removed or you lack permission');
  }
};

// Recipients
const createRecipientsForCommunication = async (communication: Communication): Promise<void> => {
  let employeeIds: string[] = [];

  // employer_employees carries a PUBLIC SELECT policy (Elec-ID verification),
  // so these queries MUST self-scope to the sender's company — without the
  // filter an "All team" broadcast fans out to every employer's roster
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  if (communication.target_audience === 'all') {
    const { data: employees } = await supabase
      .from('employer_employees')
      .select('id')
      .eq('employer_id', user.id)
      .ilike('status', 'active');

    employeeIds = (employees || []).map((e) => e.id);
  } else if (communication.target_audience === 'managers') {
    const { data: employees } = await supabase
      .from('employer_employees')
      .select('id')
      .eq('employer_id', user.id)
      .ilike('status', 'active')
      .in('team_role', ['Manager', 'Admin', 'Supervisor']);

    employeeIds = (employees || []).map((e) => e.id);
  } else if (communication.target_audience === 'specific' && communication.target_employee_ids) {
    employeeIds = communication.target_employee_ids;
  }

  if (employeeIds.length > 0) {
    const recipients = employeeIds.map((employeeId) => ({
      communication_id: communication.id,
      employee_id: employeeId,
    }));

    const { error } = await supabase
      .from('employer_communication_recipients')
      .insert(recipients);

    if (error) {
      // A message with no recipient rows is invisible to every worker and
      // never triggers the push/bell fan-out — don't leave the orphaned
      // communication behind a success toast. Roll it back and surface.
      console.error('Error creating communication recipients:', error);
      await supabase.from('employer_communications').delete().eq('id', communication.id);
      throw new Error('Message could not be delivered to the selected recipients');
    }
  }
};

export const getRecipientsForCommunication = async (
  communicationId: string
): Promise<CommunicationRecipient[]> => {
  const { data, error } = await supabase
    .from('employer_communication_recipients')
    .select(
      `
      *,
      employee:employer_employees (
        id,
        name,
        photo_url
      )
    `
    )
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

export const acknowledgeMessage = async (
  communicationId: string,
  employeeId: string
): Promise<boolean> => {
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
  // !inner join so recipient rows whose parent communication is not visible
  // to this worker under RLS (e.g. manager-audience messages) are excluded —
  // keeps the badge in step with the list the worker can actually see.
  const { count, error } = await supabase
    .from('employer_communication_recipients')
    .select('id, communication:employer_communications!inner(id)', {
      count: 'exact',
      head: true,
    })
    .eq('employee_id', employeeId)
    .is('read_at', null);

  if (error) {
    console.error('Error getting unread count:', error);
    return 0;
  }

  return count || 0;
};

// Stats
/** Set the employer's own read state on a message (persisted on the row). */
export const setEmployerReadState = async (id: string, read: boolean): Promise<void> => {
  const { data, error } = await supabase
    .from('employer_communications')
    .update({ employer_read_at: read ? new Date().toISOString() : null })
    .eq('id', id)
    .select('id');

  if (error) {
    console.error('Error updating read state:', error);
    throw error;
  }
  if (!data || data.length === 0) {
    throw new Error('Message was not updated — it may have been removed or you lack permission');
  }
};

/** Employer sign-off on mandatory reading — a persisted acknowledgement record. */
export const acknowledgeAsEmployer = async (id: string): Promise<void> => {
  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from('employer_communications')
    .update({ employer_acknowledged_at: now, employer_read_at: now })
    .eq('id', id)
    .select('id');

  if (error) {
    console.error('Error acknowledging message:', error);
    throw error;
  }
  if (!data || data.length === 0) {
    throw new Error('Message was not updated — it may have been removed or you lack permission');
  }
};

export const getCommunicationStats = async (): Promise<{
  totalAnnouncements: number;
  unreadCount: number;
  pinnedCount: number;
}> => {
  const [announcementsResult, pinnedResult, unreadResult] = await Promise.all([
    supabase.from('employer_communications').select('id', { count: 'exact', head: true }),
    supabase
      .from('employer_communications')
      .select('id', { count: 'exact', head: true })
      .eq('is_pinned', true),
    // The EMPLOYER's unread — their own persisted receipts. (The old query
    // summed every worker's unread recipient rows across all messages.)
    supabase
      .from('employer_communications')
      .select('id', { count: 'exact', head: true })
      .is('employer_read_at', null),
  ]);

  return {
    totalAnnouncements: announcementsResult.count || 0,
    unreadCount: unreadResult.count || 0,
    pinnedCount: pinnedResult.count || 0,
  };
};
