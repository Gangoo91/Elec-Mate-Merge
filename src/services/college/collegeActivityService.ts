import { supabase } from '@/integrations/supabase/client';

export interface CollegeActivity {
  id: string;
  college_id: string | null;
  actor_id: string | null;
  action: string;
  entity_type: string | null;
  entity_id: string | null;
  details: Record<string, unknown> | null;
  created_at: string | null;
}

export const getCollegeActivity = async (collegeId?: string, limit: number = 50): Promise<CollegeActivity[]> => {
  let query = supabase
    .from('college_activity')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (collegeId) {
    query = query.eq('college_id', collegeId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching college activity:', error);
    throw error;
  }

  return data || [];
};

export const getActivityByActor = async (actorId: string, limit: number = 50): Promise<CollegeActivity[]> => {
  const { data, error } = await supabase
    .from('college_activity')
    .select('*')
    .eq('actor_id', actorId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching activity by actor:', error);
    throw error;
  }

  return data || [];
};

export const getActivityByEntity = async (
  entityType: string,
  entityId: string,
  limit: number = 50
): Promise<CollegeActivity[]> => {
  const { data, error } = await supabase
    .from('college_activity')
    .select('*')
    .eq('entity_type', entityType)
    .eq('entity_id', entityId)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching activity by entity:', error);
    throw error;
  }

  return data || [];
};

export const logActivity = async (
  activity: Omit<CollegeActivity, 'id' | 'created_at'>
): Promise<CollegeActivity> => {
  const { data, error } = await supabase
    .from('college_activity')
    .insert(activity)
    .select()
    .single();

  if (error) {
    console.error('Error logging activity:', error);
    throw error;
  }

  return data;
};

export const deleteActivity = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('college_activity')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting activity:', error);
    return false;
  }

  return true;
};

// Helper to log common activities
export const logCollegeAction = async (
  collegeId: string,
  actorId: string,
  action: string,
  entityType?: string,
  entityId?: string,
  details?: Record<string, unknown>
): Promise<CollegeActivity> => {
  return logActivity({
    college_id: collegeId,
    actor_id: actorId,
    action,
    entity_type: entityType || null,
    entity_id: entityId || null,
    details: details || null
  });
};
