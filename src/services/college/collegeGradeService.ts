import { supabase } from '@/integrations/supabase/client';

export interface CollegeGrade {
  id: string;
  student_id: string | null;
  course_id: string | null;
  unit_name: string | null;
  assessment_type: string | null;
  grade: string | null;
  score: number | null;
  feedback: string | null;
  assessed_by: string | null;
  assessed_at: string | null;
  status: string | null;
  created_at: string | null;
}

export const getCollegeGrades = async (courseId?: string): Promise<CollegeGrade[]> => {
  let query = supabase
    .from('college_grades')
    .select('*')
    .order('created_at', { ascending: false });

  if (courseId) {
    query = query.eq('course_id', courseId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching college grades:', error);
    throw error;
  }

  return data || [];
};

export const getGradesByStudent = async (studentId: string): Promise<CollegeGrade[]> => {
  const { data, error } = await supabase
    .from('college_grades')
    .select('*')
    .eq('student_id', studentId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching student grades:', error);
    throw error;
  }

  return data || [];
};

export const getPendingGrades = async (): Promise<CollegeGrade[]> => {
  const { data, error } = await supabase
    .from('college_grades')
    .select('*')
    .in('status', ['Pending', 'Submitted'])
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching pending grades:', error);
    throw error;
  }

  return data || [];
};

export const getGradeById = async (id: string): Promise<CollegeGrade | null> => {
  const { data, error } = await supabase
    .from('college_grades')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching grade:', error);
    return null;
  }

  return data;
};

export const createGrade = async (
  grade: Omit<CollegeGrade, 'id' | 'created_at'>
): Promise<CollegeGrade> => {
  const { data, error } = await supabase
    .from('college_grades')
    .insert(grade)
    .select()
    .single();

  if (error) {
    console.error('Error creating grade:', error);
    throw error;
  }

  return data;
};

export const updateGrade = async (
  id: string,
  updates: Partial<CollegeGrade>
): Promise<CollegeGrade | null> => {
  const { data, error } = await supabase
    .from('college_grades')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating grade:', error);
    return null;
  }

  return data;
};

export const gradeAssessment = async (
  id: string,
  grade: string,
  score: number,
  feedback: string,
  assessorId: string
): Promise<CollegeGrade | null> => {
  const { data, error } = await supabase
    .from('college_grades')
    .update({
      grade,
      score,
      feedback,
      assessed_by: assessorId,
      assessed_at: new Date().toISOString(),
      status: 'Graded'
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error grading assessment:', error);
    return null;
  }

  return data;
};

export const verifyGrade = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('college_grades')
    .update({ status: 'Verified' })
    .eq('id', id);

  if (error) {
    console.error('Error verifying grade:', error);
    return false;
  }

  return true;
};

export const deleteGrade = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('college_grades')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting grade:', error);
    return false;
  }

  return true;
};
