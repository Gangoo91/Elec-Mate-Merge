import { supabase } from '@/integrations/supabase/client';

export interface CollegeCohort {
  id: string;
  college_id: string | null;
  name: string;
  course_id: string | null;
  tutor_id: string | null;
  start_date: string | null;
  end_date: string | null;
  max_students: number | null;
  status: string | null;
  created_at: string | null;
}

export interface CollegeCohortWithDetails extends CollegeCohort {
  course?: { name: string; code: string | null };
  tutor?: { name: string };
  student_count?: number;
}

export const getCollegeCohorts = async (collegeId?: string): Promise<CollegeCohort[]> => {
  let query = supabase
    .from('college_cohorts')
    .select('*')
    .order('start_date', { ascending: false });

  if (collegeId) {
    query = query.eq('college_id', collegeId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching college cohorts:', error);
    throw error;
  }

  return data || [];
};

export const getActiveCollegeCohorts = async (collegeId?: string): Promise<CollegeCohort[]> => {
  let query = supabase
    .from('college_cohorts')
    .select('*')
    .eq('status', 'Active')
    .order('start_date', { ascending: false });

  if (collegeId) {
    query = query.eq('college_id', collegeId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching active college cohorts:', error);
    throw error;
  }

  return data || [];
};

export const getCollegeCohortById = async (id: string): Promise<CollegeCohort | null> => {
  const { data, error } = await supabase
    .from('college_cohorts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching cohort:', error);
    return null;
  }

  return data;
};

export const getCohortsByTutor = async (tutorId: string): Promise<CollegeCohort[]> => {
  const { data, error } = await supabase
    .from('college_cohorts')
    .select('*')
    .eq('tutor_id', tutorId)
    .eq('status', 'Active')
    .order('start_date', { ascending: false });

  if (error) {
    console.error('Error fetching cohorts by tutor:', error);
    throw error;
  }

  return data || [];
};

export const createCollegeCohort = async (
  cohort: Omit<CollegeCohort, 'id' | 'created_at'>
): Promise<CollegeCohort> => {
  const { data, error } = await supabase
    .from('college_cohorts')
    .insert(cohort)
    .select()
    .single();

  if (error) {
    console.error('Error creating cohort:', error);
    throw error;
  }

  return data;
};

export const updateCollegeCohort = async (
  id: string,
  updates: Partial<CollegeCohort>
): Promise<CollegeCohort | null> => {
  const { data, error } = await supabase
    .from('college_cohorts')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating cohort:', error);
    return null;
  }

  return data;
};

export const deleteCollegeCohort = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('college_cohorts')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting cohort:', error);
    return false;
  }

  return true;
};
