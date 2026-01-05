import { supabase } from '@/integrations/supabase/client';

export interface ILPTarget {
  description: string;
  target_date: string;
  status: 'Pending' | 'In Progress' | 'Achieved' | 'Overdue';
}

export interface CollegeILP {
  id: string;
  student_id: string | null;
  targets: ILPTarget[] | null;
  support_needs: string | null;
  review_date: string | null;
  last_reviewed: string | null;
  reviewed_by: string | null;
  status: string | null;
  created_at: string | null;
}

export const getCollegeILPs = async (): Promise<CollegeILP[]> => {
  const { data, error } = await supabase
    .from('college_ilps')
    .select('*')
    .order('review_date');

  if (error) {
    console.error('Error fetching college ILPs:', error);
    throw error;
  }

  return data || [];
};

export const getILPByStudent = async (studentId: string): Promise<CollegeILP | null> => {
  const { data, error } = await supabase
    .from('college_ilps')
    .select('*')
    .eq('student_id', studentId)
    .eq('status', 'Active')
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching student ILP:', error);
    return null;
  }

  return data;
};

export const getOverdueILPReviews = async (): Promise<CollegeILP[]> => {
  const today = new Date().toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('college_ilps')
    .select('*')
    .eq('status', 'Active')
    .lt('review_date', today)
    .order('review_date');

  if (error) {
    console.error('Error fetching overdue ILP reviews:', error);
    throw error;
  }

  return data || [];
};

export const getILPById = async (id: string): Promise<CollegeILP | null> => {
  const { data, error } = await supabase
    .from('college_ilps')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching ILP:', error);
    return null;
  }

  return data;
};

export const createILP = async (
  ilp: Omit<CollegeILP, 'id' | 'created_at'>
): Promise<CollegeILP> => {
  const { data, error } = await supabase
    .from('college_ilps')
    .insert(ilp)
    .select()
    .single();

  if (error) {
    console.error('Error creating ILP:', error);
    throw error;
  }

  return data;
};

export const updateILP = async (
  id: string,
  updates: Partial<CollegeILP>
): Promise<CollegeILP | null> => {
  const { data, error } = await supabase
    .from('college_ilps')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating ILP:', error);
    return null;
  }

  return data;
};

export const reviewILP = async (
  id: string,
  reviewerId: string,
  nextReviewDate: string
): Promise<CollegeILP | null> => {
  const { data, error } = await supabase
    .from('college_ilps')
    .update({
      last_reviewed: new Date().toISOString(),
      reviewed_by: reviewerId,
      review_date: nextReviewDate
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error reviewing ILP:', error);
    return null;
  }

  return data;
};

export const addILPTarget = async (
  id: string,
  target: ILPTarget
): Promise<CollegeILP | null> => {
  // First get current targets
  const { data: currentData, error: fetchError } = await supabase
    .from('college_ilps')
    .select('targets')
    .eq('id', id)
    .single();

  if (fetchError) {
    console.error('Error fetching ILP targets:', fetchError);
    return null;
  }

  const currentTargets = (currentData?.targets as ILPTarget[]) || [];
  const updatedTargets = [...currentTargets, target];

  const { data, error } = await supabase
    .from('college_ilps')
    .update({ targets: updatedTargets })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error adding ILP target:', error);
    return null;
  }

  return data;
};

export const updateILPTargetStatus = async (
  id: string,
  targetIndex: number,
  status: ILPTarget['status']
): Promise<CollegeILP | null> => {
  // First get current targets
  const { data: currentData, error: fetchError } = await supabase
    .from('college_ilps')
    .select('targets')
    .eq('id', id)
    .single();

  if (fetchError) {
    console.error('Error fetching ILP targets:', fetchError);
    return null;
  }

  const currentTargets = (currentData?.targets as ILPTarget[]) || [];
  if (targetIndex >= 0 && targetIndex < currentTargets.length) {
    currentTargets[targetIndex].status = status;
  }

  const { data, error } = await supabase
    .from('college_ilps')
    .update({ targets: currentTargets })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating ILP target status:', error);
    return null;
  }

  return data;
};

export const deleteILP = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('college_ilps')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting ILP:', error);
    return false;
  }

  return true;
};
