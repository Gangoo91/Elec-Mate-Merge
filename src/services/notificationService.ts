import { supabase } from '@/integrations/supabase/client';

export type NotificationType = 'job_assignment' | 'schedule_change' | 'safety_alert' | 'message' | 'general';

export interface Notification {
  id: string;
  employee_id: string;
  type: NotificationType;
  title: string;
  message: string;
  job_id: string | null;
  read_at: string | null;
  action_url: string | null;
  created_at: string;
}

export const getNotifications = async (employeeId?: string): Promise<Notification[]> => {
  let query = supabase
    .from('notifications')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50);

  if (employeeId) {
    query = query.eq('employee_id', employeeId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }

  return (data || []) as unknown as Notification[];
};

export const getUnreadNotifications = async (employeeId?: string): Promise<Notification[]> => {
  let query = supabase
    .from('notifications')
    .select('*')
    .is('read_at', null)
    .order('created_at', { ascending: false });

  if (employeeId) {
    query = query.eq('employee_id', employeeId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching unread notifications:', error);
    throw error;
  }

  return (data || []) as unknown as Notification[];
};

export const getUnreadCount = async (employeeId?: string): Promise<number> => {
  let query = supabase
    .from('notifications')
    .select('id', { count: 'exact', head: true })
    .is('read_at', null);

  if (employeeId) {
    query = query.eq('employee_id', employeeId);
  }

  const { count, error } = await query;

  if (error) {
    console.error('Error fetching unread count:', error);
    return 0;
  }

  return count || 0;
};

export const createNotification = async (
  notification: {
    employee_id: string;
    type: NotificationType;
    title: string;
    message: string;
    job_id?: string | null;
    action_url?: string | null;
  }
): Promise<Notification> => {
  const { data, error } = await supabase
    .from('notifications')
    .insert(notification)
    .select()
    .single();

  if (error) {
    console.error('Error creating notification:', error);
    throw error;
  }

  return data as unknown as Notification;
};

export const markAsRead = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('notifications')
    .update({ read_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    console.error('Error marking notification as read:', error);
    return false;
  }

  return true;
};

export const markAllAsRead = async (employeeId?: string): Promise<boolean> => {
  let query = supabase
    .from('notifications')
    .update({ read_at: new Date().toISOString() })
    .is('read_at', null);

  if (employeeId) {
    query = query.eq('employee_id', employeeId);
  }

  const { error } = await query;

  if (error) {
    console.error('Error marking all notifications as read:', error);
    return false;
  }

  return true;
};

export const deleteNotification = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('notifications')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting notification:', error);
    return false;
  }

  return true;
};
