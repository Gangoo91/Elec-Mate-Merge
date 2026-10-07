import { supabase } from '@/integrations/supabase/client';

export type StaffRole =
  | 'tutor'
  | 'head_of_department'
  | 'support'
  | 'admin'
  | 'assessor'
  | 'iqa'
  | 'eqa';

export interface CollegeStaff {
  id: string;
  college_id: string | null;
  user_id: string | null;
  name: string;
  email: string;
  phone: string | null;
  role: StaffRole;
  department: string | null;
  specialisations: string[] | null;
  teaching_qual: string | null;
  assessor_qual: string | null;
  iqa_qual: string | null;
  max_teaching_hours: number | null;
  status: string | null;
  photo_url: string | null;
  created_at: string | null;
  updated_at: string | null;
  /** Named duties (ELE-1898). Only a manager can change them; the DB refuses anyone else. */
  is_dsl?: boolean | null;
  is_deputy_dsl?: boolean | null;
  is_prevent_lead?: boolean | null;
  is_h_and_s_lead?: boolean | null;
  is_quality_nominee?: boolean | null;
  is_mental_health_lead?: boolean | null;
  archived_at?: string | null;
}

export const getCollegeStaff = async (collegeId?: string): Promise<CollegeStaff[]> => {
  let query = supabase
    .from('college_staff')
    .select('*')
    .order('name');

  if (collegeId) {
    query = query.eq('college_id', collegeId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching college staff:', error);
    throw error;
  }

  return data || [];
};

export const getActiveCollegeStaff = async (collegeId?: string): Promise<CollegeStaff[]> => {
  let query = supabase
    .from('college_staff')
    .select('*')
    .eq('status', 'Active')
    .order('name');

  if (collegeId) {
    query = query.eq('college_id', collegeId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching active college staff:', error);
    throw error;
  }

  return data || [];
};

export const getCollegeStaffById = async (id: string): Promise<CollegeStaff | null> => {
  const { data, error } = await supabase
    .from('college_staff')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching staff member:', error);
    return null;
  }

  return data;
};

export const getCollegeStaffByRole = async (role: StaffRole, collegeId?: string): Promise<CollegeStaff[]> => {
  let query = supabase
    .from('college_staff')
    .select('*')
    .eq('role', role)
    .eq('status', 'Active')
    .order('name');

  if (collegeId) {
    query = query.eq('college_id', collegeId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching staff by role:', error);
    throw error;
  }

  return data || [];
};

export const createCollegeStaff = async (
  staff: Omit<CollegeStaff, 'id' | 'created_at' | 'updated_at'>
): Promise<CollegeStaff> => {
  const { data, error } = await supabase
    .from('college_staff')
    .insert(staff)
    .select()
    .single();

  if (error) {
    console.error('Error creating staff member:', error);
    throw error;
  }

  return data;
};

export const updateCollegeStaff = async (
  id: string,
  updates: Partial<CollegeStaff>
): Promise<CollegeStaff | null> => {
  const { data, error } = await supabase
    .from('college_staff')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  // ELE-1898: throw, never swallow. A refusal from the database (only a
  // manager can change roles, nobody can remove the last admin) used to
  // come back as null and the sheet said "Staff updated".
  if (error) {
    console.error('Error updating staff member:', error);
    throw new Error(staffWriteMessage(error));
  }

  return data;
};

/** Turns a refusal into words a college user can act on. */
export function staffWriteMessage(error: { message?: string; code?: string } | null): string {
  const msg = error?.message ?? '';
  if (error?.code === 'PGRST116') {
    return 'You do not have permission to change this staff member.';
  }
  if (/last admin|own role|college admin|Elec-Mate|manage staff/i.test(msg)) return msg;
  if (error?.code === '42501') return 'You do not have permission to make that change.';
  return msg || 'The change could not be saved.';
}

export const archiveCollegeStaff = async (id: string): Promise<boolean> => {
  const { data, error } = await supabase
    .from('college_staff')
    .update({ status: 'Archived', updated_at: new Date().toISOString() })
    .eq('id', id)
    .select('id');

  if (error) {
    console.error('Error archiving staff member:', error);
    throw new Error(staffWriteMessage(error));
  }
  if (!data || data.length === 0) {
    throw new Error('You do not have permission to archive this staff member.');
  }

  return true;
};

export const deleteCollegeStaff = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('college_staff')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting staff member:', error);
    return false;
  }

  return true;
};
