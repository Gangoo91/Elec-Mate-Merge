import { supabase } from '@/integrations/supabase/client';

export interface CollegeLessonPlan {
  id: string;
  college_id: string | null;
  title: string;
  cohort_id: string | null;
  tutor_id: string | null;
  scheduled_date: string | null;
  duration_minutes: number | null;
  objectives: string | null;
  content: Record<string, unknown> | null;
  resources: string[] | null;
  status: string | null;
  created_at: string | null;
  /** Where the lesson is taught, when set on the plan. */
  scheduled_room?: string | null;
  /** 'HH:MM:SS' when the lesson has a start time; sets its register session. */
  scheduled_start_time?: string | null;
}

/** A calendar day in Europe/London as YYYY-MM-DD, `offsetDays` from today. */
const londonIso = (offsetDays = 0) => {
  const d = new Date(Date.now() + offsetDays * 86_400_000);
  // en-CA formats as YYYY-MM-DD.
  return d.toLocaleDateString('en-CA', { timeZone: 'Europe/London' });
};

export const getCollegeLessonPlans = async (collegeId?: string): Promise<CollegeLessonPlan[]> => {
  let query = supabase
    .from('college_lesson_plans')
    .select('*')
    .order('scheduled_date', { ascending: false });

  if (collegeId) {
    query = query.eq('college_id', collegeId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching college lesson plans:', error);
    throw error;
  }

  return data || [];
};

export const getLessonPlansByCohort = async (cohortId: string): Promise<CollegeLessonPlan[]> => {
  const { data, error } = await supabase
    .from('college_lesson_plans')
    .select('*')
    .eq('cohort_id', cohortId)
    .order('scheduled_date');

  if (error) {
    console.error('Error fetching lesson plans by cohort:', error);
    throw error;
  }

  return data || [];
};

export const getLessonPlansByTutor = async (tutorId: string): Promise<CollegeLessonPlan[]> => {
  const { data, error } = await supabase
    .from('college_lesson_plans')
    .select('*')
    .eq('tutor_id', tutorId)
    .order('scheduled_date');

  if (error) {
    console.error('Error fetching lesson plans by tutor:', error);
    throw error;
  }

  return data || [];
};

/**
 * Lessons in the next `days` calendar days in Europe/London, today included
 * (days = 7 → today and the six days after it).
 */
export const getUpcomingLessons = async (days: number = 7, collegeId?: string): Promise<CollegeLessonPlan[]> => {
  let query = supabase
    .from('college_lesson_plans')
    .select('*')
    .gte('scheduled_date', londonIso(0))
    .lte('scheduled_date', londonIso(Math.max(days, 1) - 1))
    .order('scheduled_date');

  if (collegeId) {
    query = query.eq('college_id', collegeId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching upcoming lessons:', error);
    throw error;
  }

  return data || [];
};

export const getLessonPlanById = async (id: string): Promise<CollegeLessonPlan | null> => {
  const { data, error } = await supabase
    .from('college_lesson_plans')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching lesson plan:', error);
    return null;
  }

  return data;
};

export const createLessonPlan = async (
  lessonPlan: Omit<CollegeLessonPlan, 'id' | 'created_at'>
): Promise<CollegeLessonPlan> => {
  const { data, error } = await supabase
    .from('college_lesson_plans')
    .insert(lessonPlan)
    .select()
    .single();

  if (error) {
    console.error('Error creating lesson plan:', error);
    throw error;
  }

  return data;
};

export const updateLessonPlan = async (
  id: string,
  updates: Partial<CollegeLessonPlan>
): Promise<CollegeLessonPlan | null> => {
  const { data, error } = await supabase
    .from('college_lesson_plans')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating lesson plan:', error);
    return null;
  }

  return data;
};

export const approveLessonPlan = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('college_lesson_plans')
    .update({ status: 'Approved' })
    .eq('id', id);

  if (error) {
    console.error('Error approving lesson plan:', error);
    return false;
  }

  return true;
};

export const markLessonDelivered = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('college_lesson_plans')
    .update({ status: 'Delivered' })
    .eq('id', id);

  if (error) {
    console.error('Error marking lesson delivered:', error);
    return false;
  }

  return true;
};

export const deleteLessonPlan = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('college_lesson_plans')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting lesson plan:', error);
    return false;
  }

  return true;
};
