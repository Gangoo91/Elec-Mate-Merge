import { supabase } from '@/integrations/supabase/client';

// Types matching database schema
export interface College {
  id: string;
  name: string;
  code: string | null;
  address: string | null;
  settings: Record<string, unknown> | null;
  created_at: string | null;
  updated_at: string | null;
}

export const getColleges = async (): Promise<College[]> => {
  const { data, error } = await supabase
    .from('colleges')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching colleges:', error);
    throw error;
  }

  return data || [];
};

export const getCollegeById = async (id: string): Promise<College | null> => {
  const { data, error } = await supabase
    .from('colleges')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching college:', error);
    return null;
  }

  return data;
};

export const createCollege = async (
  college: Omit<College, 'id' | 'created_at' | 'updated_at'>
): Promise<College> => {
  const { data, error } = await supabase
    .from('colleges')
    .insert(college)
    .select()
    .single();

  if (error) {
    console.error('Error creating college:', error);
    throw error;
  }

  return data;
};

export const updateCollege = async (
  id: string,
  updates: Partial<College>
): Promise<College | null> => {
  const { data, error } = await supabase
    .from('colleges')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating college:', error);
    return null;
  }

  return data;
};

export const deleteCollege = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('colleges')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting college:', error);
    return false;
  }

  return true;
};
