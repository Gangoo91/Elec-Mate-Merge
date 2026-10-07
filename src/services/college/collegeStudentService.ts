import { supabase } from '@/integrations/supabase/client';
import { getMyCollegeId } from '@/lib/myCollege';

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
  send_flags: string[] | null;
  eal: boolean | null;
  ehcp_ref: string | null;
  first_language: string | null;
  pronouns: string | null;
  accessibility_notes: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export const getCollegeStudents = async (collegeId?: string): Promise<CollegeStudent[]> => {
  let query = supabase.from('college_students').select('*').order('name');

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
  let query = supabase.from('college_students').select('*').eq('status', 'Active').order('name');

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
  const { data, error } = await supabase.from('college_students').select('*').eq('id', id).single();

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
    .ilike('status', 'active')
    // The risk job writes 'High' and 'Critical' (there is no 'Medium' in the
    // data), so match both whatever the casing.
    .or('risk_level.ilike.high,risk_level.ilike.critical')
    .order('name');

  if (collegeId) {
    query = query.eq('college_id', collegeId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching at-risk students:', error);
    throw error;
  }

  // Critical first, then high. Sorting by the text column would put
  // 'Critical' last, so rank it here.
  const rank = (r: string | null | undefined) => ((r ?? '').toLowerCase() === 'critical' ? 0 : 1);
  return (data || []).sort((a, b) => rank(a.risk_level) - rank(b.risk_level));
};

export const createCollegeStudent = async (
  student: Omit<CollegeStudent, 'id' | 'created_at' | 'updated_at'>
): Promise<CollegeStudent> => {
  // ELE-1375 — the RLS insert check (_ch_same_college) requires college_id to
  // equal the adding admin's profiles.college_id. The Add Student dialog leaves
  // it null, so the insert silently failed RLS. Resolve it from the current
  // user's profile when it wasn't supplied.
  let collegeId = student.college_id;
  if (!collegeId) {
    const { data: auth } = await supabase.auth.getUser();
    if (auth?.user) {
      collegeId = await getMyCollegeId(auth.user.id).catch(() => null);
    }
  }

  const { data, error } = await supabase
    .from('college_students')
    .insert({ ...student, college_id: collegeId })
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
  // Throws on failure (RLS or a missing row), so the caller's mutation fails
  // and the screen says so. It used to return false, which mutations treated
  // as success: "Withdrawn" showed while nothing had changed.
  const { data, error } = await supabase
    .from('college_students')
    .update({ status: 'Withdrawn', updated_at: new Date().toISOString() })
    .eq('id', id)
    .select('id');

  if (error) throw new Error(error.message);
  if (!data || data.length === 0)
    throw new Error('The learner was not updated. You may not have access to this record.');
  return true;
};

export const assignStudentToCohort = async (
  studentId: string,
  cohortId: string
): Promise<boolean> => {
  // Throws on failure for the same reason as withdrawCollegeStudent.
  const { data, error } = await supabase
    .from('college_students')
    .update({ cohort_id: cohortId, updated_at: new Date().toISOString() })
    .eq('id', studentId)
    .select('id');

  if (error) throw new Error(error.message);
  if (!data || data.length === 0)
    throw new Error('The learner was not moved. You may not have access to this record.');
  return true;
};

export const deleteCollegeStudent = async (id: string): Promise<boolean> => {
  const { error } = await supabase.from('college_students').delete().eq('id', id);

  if (error) {
    console.error('Error deleting student:', error);
    return false;
  }

  return true;
};
