import { supabase } from '@/integrations/supabase/client';

export interface CollegeCourse {
  id: string;
  college_id: string | null;
  name: string;
  code: string | null;
  level: string | null;
  awarding_body: string | null;
  duration_months: number | null;
  status: string | null;
  created_at: string | null;
}

export const getCollegeCourses = async (collegeId?: string): Promise<CollegeCourse[]> => {
  let query = supabase
    .from('college_courses')
    .select('*')
    .order('name');

  if (collegeId) {
    query = query.eq('college_id', collegeId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching college courses:', error);
    throw error;
  }

  return data || [];
};

export const getActiveCollegeCourses = async (collegeId?: string): Promise<CollegeCourse[]> => {
  let query = supabase
    .from('college_courses')
    .select('*')
    .eq('status', 'Active')
    .order('name');

  if (collegeId) {
    query = query.eq('college_id', collegeId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching active college courses:', error);
    throw error;
  }

  return data || [];
};

export const getCollegeCourseById = async (id: string): Promise<CollegeCourse | null> => {
  const { data, error } = await supabase
    .from('college_courses')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching course:', error);
    return null;
  }

  return data;
};

export const createCollegeCourse = async (
  course: Omit<CollegeCourse, 'id' | 'created_at'>
): Promise<CollegeCourse> => {
  const { data, error } = await supabase
    .from('college_courses')
    .insert(course)
    .select()
    .single();

  if (error) {
    console.error('Error creating course:', error);
    throw error;
  }

  return data;
};

export const updateCollegeCourse = async (
  id: string,
  updates: Partial<CollegeCourse>
): Promise<CollegeCourse | null> => {
  const { data, error } = await supabase
    .from('college_courses')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating course:', error);
    return null;
  }

  return data;
};

export const deleteCollegeCourse = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('college_courses')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting course:', error);
    return false;
  }

  return true;
};
