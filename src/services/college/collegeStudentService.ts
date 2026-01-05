import { supabase } from '@/integrations/supabase/client';

export interface CollegeStudent {
  id: string;
  college_id: string | null;
  user_id: string | null;
  name: string;
  email: string;
  phone: string | null;
  uln: string | null;
  cohort_id: string | null;
  employer_id: string | null;
  course_id: string | null;
  start_date: string | null;
  expected_end_date: string | null;
  status: string | null;
  progress_percent: number | null;
  risk_level: string | null;
  photo_url: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export const getCollegeStudents = async (collegeId?: string): Promise<CollegeStudent[]> => {
  let query = supabase
    .from('college_students')
    .select('*')
    .order('name');

  if (collegeId) {
    query = query.eq('college_id', collegeId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching college students:', error);
    throw error;
  }

  return data || [];
};

export const getActiveCollegeStudents = async (collegeId?: string): Promise<CollegeStudent[]> => {
  let query = supabase
    .from('college_students')
    .select('*')
    .eq('status', 'Active')
    .order('name');

  if (collegeId) {
    query = query.eq('college_id', collegeId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching active college students:', error);
    throw error;
  }

  return data || [];
};

export const getCollegeStudentById = async (id: string): Promise<CollegeStudent | null> => {
  const { data, error } = await supabase
    .from('college_students')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching student:', error);
    return null;
  }

  return data;
};

export const getStudentsByCohort = async (cohortId: string): Promise<CollegeStudent[]> => {
  const { data, error } = await supabase
    .from('college_students')
    .select('*')
    .eq('cohort_id', cohortId)
    .eq('status', 'Active')
    .order('name');

  if (error) {
    console.error('Error fetching students by cohort:', error);
    throw error;
  }

  return data || [];
};

export const getStudentsAtRisk = async (collegeId?: string): Promise<CollegeStudent[]> => {
  let query = supabase
    .from('college_students')
    .select('*')
    .eq('status', 'Active')
    .in('risk_level', ['Medium', 'High'])
    .order('risk_level', { ascending: false });

  if (collegeId) {
    query = query.eq('college_id', collegeId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching at-risk students:', error);
    throw error;
  }

  return data || [];
};

export const createCollegeStudent = async (
  student: Omit<CollegeStudent, 'id' | 'created_at' | 'updated_at'>
): Promise<CollegeStudent> => {
  const { data, error } = await supabase
    .from('college_students')
    .insert(student)
    .select()
    .single();

  if (error) {
    console.error('Error creating student:', error);
    throw error;
  }

  return data;
};

export const updateCollegeStudent = async (
  id: string,
  updates: Partial<CollegeStudent>
): Promise<CollegeStudent | null> => {
  const { data, error } = await supabase
    .from('college_students')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating student:', error);
    return null;
  }

  return data;
};

export const withdrawCollegeStudent = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('college_students')
    .update({ status: 'Withdrawn', updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) {
    console.error('Error withdrawing student:', error);
    return false;
  }

  return true;
};

export const assignStudentToCohort = async (studentId: string, cohortId: string): Promise<boolean> => {
  const { error } = await supabase
    .from('college_students')
    .update({ cohort_id: cohortId, updated_at: new Date().toISOString() })
    .eq('id', studentId);

  if (error) {
    console.error('Error assigning student to cohort:', error);
    return false;
  }

  return true;
};

export const deleteCollegeStudent = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('college_students')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting student:', error);
    return false;
  }

  return true;
};
