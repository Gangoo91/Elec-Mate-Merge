import { supabase } from '@/integrations/supabase/client';

export type AttendanceStatus = 'Present' | 'Absent' | 'Late' | 'Authorised';

export interface CollegeAttendance {
  id: string;
  student_id: string | null;
  cohort_id: string | null;
  date: string;
  status: AttendanceStatus | null;
  notes: string | null;
  recorded_by: string | null;
  created_at: string | null;
}

export const getCollegeAttendance = async (cohortId?: string): Promise<CollegeAttendance[]> => {
  let query = supabase
    .from('college_attendance')
    .select('*')
    .order('date', { ascending: false });

  if (cohortId) {
    query = query.eq('cohort_id', cohortId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching college attendance:', error);
    throw error;
  }

  return data || [];
};

export const getAttendanceByStudent = async (studentId: string): Promise<CollegeAttendance[]> => {
  const { data, error } = await supabase
    .from('college_attendance')
    .select('*')
    .eq('student_id', studentId)
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching student attendance:', error);
    throw error;
  }

  return data || [];
};

export const getAttendanceByDate = async (date: string, cohortId?: string): Promise<CollegeAttendance[]> => {
  let query = supabase
    .from('college_attendance')
    .select('*')
    .eq('date', date);

  if (cohortId) {
    query = query.eq('cohort_id', cohortId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching attendance by date:', error);
    throw error;
  }

  return data || [];
};

export const getStudentAttendanceRate = async (studentId: string): Promise<number> => {
  const { data, error } = await supabase
    .from('college_attendance')
    .select('status')
    .eq('student_id', studentId);

  if (error) {
    console.error('Error calculating attendance rate:', error);
    return 100;
  }

  if (!data || data.length === 0) return 100;

  const present = data.filter(a => a.status === 'Present' || a.status === 'Late').length;
  return Math.round((present / data.length) * 100);
};

export const getCohortAttendanceRate = async (cohortId: string): Promise<number> => {
  const { data, error } = await supabase
    .from('college_attendance')
    .select('status')
    .eq('cohort_id', cohortId);

  if (error) {
    console.error('Error calculating cohort attendance rate:', error);
    return 100;
  }

  if (!data || data.length === 0) return 100;

  const present = data.filter(a => a.status === 'Present' || a.status === 'Late').length;
  return Math.round((present / data.length) * 100);
};

export const recordAttendance = async (
  attendance: Omit<CollegeAttendance, 'id' | 'created_at'>
): Promise<CollegeAttendance> => {
  const { data, error } = await supabase
    .from('college_attendance')
    .insert(attendance)
    .select()
    .single();

  if (error) {
    console.error('Error recording attendance:', error);
    throw error;
  }

  return data;
};

export const bulkRecordAttendance = async (
  records: Array<Omit<CollegeAttendance, 'id' | 'created_at'>>
): Promise<CollegeAttendance[]> => {
  const { data, error } = await supabase
    .from('college_attendance')
    .insert(records)
    .select();

  if (error) {
    console.error('Error bulk recording attendance:', error);
    throw error;
  }

  return data || [];
};

export const updateAttendance = async (
  id: string,
  updates: Partial<CollegeAttendance>
): Promise<CollegeAttendance | null> => {
  const { data, error } = await supabase
    .from('college_attendance')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating attendance:', error);
    return null;
  }

  return data;
};

export const deleteAttendance = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('college_attendance')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting attendance:', error);
    return false;
  }

  return true;
};
