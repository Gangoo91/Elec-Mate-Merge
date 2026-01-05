import { supabase } from '@/integrations/supabase/client';

export type EPAStatus = 'Not Started' | 'In Progress' | 'Pre-Gateway' | 'Gateway Ready' | 'Complete';

export interface CollegeEPA {
  id: string;
  student_id: string | null;
  status: EPAStatus | null;
  gateway_date: string | null;
  epa_date: string | null;
  result: string | null;
  notes: string | null;
  updated_by: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export const getCollegeEPAs = async (): Promise<CollegeEPA[]> => {
  const { data, error } = await supabase
    .from('college_epa')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching college EPAs:', error);
    throw error;
  }

  return data || [];
};

export const getEPAByStudent = async (studentId: string): Promise<CollegeEPA | null> => {
  const { data, error } = await supabase
    .from('college_epa')
    .select('*')
    .eq('student_id', studentId)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching student EPA:', error);
    return null;
  }

  return data;
};

export const getUpcomingEPAs = async (days: number = 30): Promise<CollegeEPA[]> => {
  const today = new Date();
  const futureDate = new Date();
  futureDate.setDate(today.getDate() + days);

  const { data, error } = await supabase
    .from('college_epa')
    .select('*')
    .gte('epa_date', today.toISOString().split('T')[0])
    .lte('epa_date', futureDate.toISOString().split('T')[0])
    .order('epa_date');

  if (error) {
    console.error('Error fetching upcoming EPAs:', error);
    throw error;
  }

  return data || [];
};

export const getEPAsByStatus = async (status: EPAStatus): Promise<CollegeEPA[]> => {
  const { data, error } = await supabase
    .from('college_epa')
    .select('*')
    .eq('status', status)
    .order('epa_date');

  if (error) {
    console.error('Error fetching EPAs by status:', error);
    throw error;
  }

  return data || [];
};

export const getEPAById = async (id: string): Promise<CollegeEPA | null> => {
  const { data, error } = await supabase
    .from('college_epa')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching EPA:', error);
    return null;
  }

  return data;
};

export const createEPA = async (
  epa: Omit<CollegeEPA, 'id' | 'created_at' | 'updated_at'>
): Promise<CollegeEPA> => {
  const { data, error } = await supabase
    .from('college_epa')
    .insert(epa)
    .select()
    .single();

  if (error) {
    console.error('Error creating EPA:', error);
    throw error;
  }

  return data;
};

export const updateEPA = async (
  id: string,
  updates: Partial<CollegeEPA>
): Promise<CollegeEPA | null> => {
  const { data, error } = await supabase
    .from('college_epa')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating EPA:', error);
    return null;
  }

  return data;
};

export const updateEPAStatus = async (
  id: string,
  status: EPAStatus,
  updatedBy: string
): Promise<CollegeEPA | null> => {
  const { data, error } = await supabase
    .from('college_epa')
    .update({
      status,
      updated_by: updatedBy,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating EPA status:', error);
    return null;
  }

  return data;
};

export const completeEPA = async (
  id: string,
  result: string,
  updatedBy: string
): Promise<CollegeEPA | null> => {
  const { data, error } = await supabase
    .from('college_epa')
    .update({
      status: 'Complete',
      result,
      updated_by: updatedBy,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error completing EPA:', error);
    return null;
  }

  return data;
};

export const deleteEPA = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('college_epa')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting EPA:', error);
    return false;
  }

  return true;
};
