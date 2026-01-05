import { supabase } from '@/integrations/supabase/client';

export interface JobAssignment {
  id: string;
  job_id: string;
  employee_id: string;
  start_date: string;
  end_date: string | null;
  role_on_job: string | null;
  status: 'assigned' | 'confirmed' | 'declined';
  assigned_by: string | null;
  assigned_at: string;
  notes: string | null;
  notify_email: boolean;
  created_at: string;
  updated_at: string;
}

export interface JobAssignmentWithDetails extends JobAssignment {
  employee?: {
    id: string;
    name: string;
    role: string;
    avatar_initials: string;
    phone: string | null;
    email: string | null;
  };
  job?: {
    id: string;
    title: string;
    client: string;
    location: string;
  };
}

export const getJobAssignments = async (jobId: string): Promise<JobAssignmentWithDetails[]> => {
  const { data, error } = await supabase
    .from('job_assignments')
    .select(`
      *,
      employee:employees(id, name, role, avatar_initials, phone, email)
    `)
    .eq('job_id', jobId)
    .order('assigned_at', { ascending: false });

  if (error) {
    console.error('Error fetching job assignments:', error);
    throw error;
  }

  return (data || []) as unknown as JobAssignmentWithDetails[];
};

export const getEmployeeAssignments = async (employeeId: string): Promise<JobAssignmentWithDetails[]> => {
  const { data, error } = await supabase
    .from('job_assignments')
    .select(`
      *,
      job:jobs(id, title, client, location)
    `)
    .eq('employee_id', employeeId)
    .order('start_date', { ascending: true });

  if (error) {
    console.error('Error fetching employee assignments:', error);
    throw error;
  }

  return (data || []) as unknown as JobAssignmentWithDetails[];
};

export const createJobAssignment = async (
  assignment: {
    job_id: string;
    employee_id: string;
    start_date: string;
    end_date?: string | null;
    role_on_job?: string | null;
    notes?: string | null;
    notify_email?: boolean;
    assigned_by?: string;
  }
): Promise<JobAssignment> => {
  const { data, error } = await supabase
    .from('job_assignments')
    .insert({
      ...assignment,
      status: 'assigned',
      notify_email: assignment.notify_email ?? true,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating job assignment:', error);
    throw error;
  }

  return data as unknown as JobAssignment;
};

export const updateJobAssignment = async (
  id: string,
  updates: Partial<JobAssignment>
): Promise<JobAssignment | null> => {
  const { data, error } = await supabase
    .from('job_assignments')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating job assignment:', error);
    return null;
  }

  return data as unknown as JobAssignment;
};

export const deleteJobAssignment = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('job_assignments')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting job assignment:', error);
    return false;
  }

  return true;
};

export const removeWorkerFromJob = async (jobId: string, employeeId: string): Promise<boolean> => {
  const { error } = await supabase
    .from('job_assignments')
    .delete()
    .eq('job_id', jobId)
    .eq('employee_id', employeeId);

  if (error) {
    console.error('Error removing worker from job:', error);
    return false;
  }

  return true;
};

export const checkForClashes = async (
  employeeId: string,
  startDate: string,
  endDate: string | null,
  excludeJobId?: string
): Promise<JobAssignmentWithDetails[]> => {
  let query = supabase
    .from('job_assignments')
    .select(`
      *,
      job:jobs(id, title, client, location)
    `)
    .eq('employee_id', employeeId);

  if (excludeJobId) {
    query = query.neq('job_id', excludeJobId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error checking for clashes:', error);
    return [];
  }

  // Filter for overlapping dates
  const clashes = (data || []).filter((assignment: any) => {
    const assignmentStart = new Date(assignment.start_date);
    const assignmentEnd = assignment.end_date ? new Date(assignment.end_date) : new Date('2099-12-31');
    const newStart = new Date(startDate);
    const newEnd = endDate ? new Date(endDate) : new Date('2099-12-31');

    return assignmentStart <= newEnd && assignmentEnd >= newStart;
  });

  return clashes as unknown as JobAssignmentWithDetails[];
};
