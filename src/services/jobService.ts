import { supabase } from '@/integrations/supabase/client';

export type JobStatus = 'Active' | 'Pending' | 'Completed' | 'On Hold' | 'Cancelled';

export interface Job {
  id: string;
  user_id: string;
  title: string;
  client: string;
  location: string;
  lat: number | null;
  lng: number | null;
  status: JobStatus;
  progress: number;
  start_date: string | null;
  end_date: string | null;
  value: number;
  workers_count: number;
  description: string | null;
  created_at: string;
  updated_at: string;
  archived_at?: string | null;
  is_template?: boolean;
  cover_photo_url?: string | null;
  position?: number;
}

export const getJobs = async (): Promise<Job[]> => {
  const { data, error } = await supabase
    .from('employer_jobs')
    .select('*')
    .is('archived_at', null)
    .eq('is_template', false)
    .order('position', { ascending: true })
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
  
  return data || [];
};

export const archiveJob = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('employer_jobs')
    .update({ archived_at: new Date().toISOString(), updated_at: new Date().toISOString() })
    .eq('id', id);
  
  if (error) {
    console.error('Error archiving job:', error);
    return false;
  }
  
  return true;
};

export const setJobAsTemplate = async (id: string, isTemplate: boolean): Promise<boolean> => {
  const { error } = await supabase
    .from('employer_jobs')
    .update({ is_template: isTemplate, updated_at: new Date().toISOString() })
    .eq('id', id);
  
  if (error) {
    console.error('Error updating job template status:', error);
    return false;
  }
  
  return true;
};

export const getJobById = async (id: string): Promise<Job | null> => {
  const { data, error } = await supabase
    .from('employer_jobs')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching job:', error);
    return null;
  }
  
  return data;
};

export const getActiveJobs = async (): Promise<Job[]> => {
  const { data, error } = await supabase
    .from('employer_jobs')
    .select('*')
    .eq('status', 'Active')
    .order('start_date');
  
  if (error) {
    console.error('Error fetching active jobs:', error);
    throw error;
  }
  
  return data || [];
};

export const createJob = async (
  job: Omit<Job, 'id' | 'created_at' | 'updated_at' | 'user_id'>
): Promise<Job> => {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('employer_jobs')
    .insert({ ...job, user_id: userData.user.id })
    .select()
    .single();

  if (error) {
    console.error('Error creating job:', error);
    throw error;
  }

  return data;
};

export const updateJob = async (
  id: string,
  updates: Partial<Job>
): Promise<Job | null> => {
  const { data, error } = await supabase
    .from('employer_jobs')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating job:', error);
    return null;
  }
  
  return data;
};

export const updateJobStatus = async (
  id: string,
  status: JobStatus
): Promise<boolean> => {
  const { error } = await supabase
    .from('employer_jobs')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id);
  
  if (error) {
    console.error('Error updating job status:', error);
    return false;
  }
  
  return true;
};

export const getJobsWithLocations = async (): Promise<Job[]> => {
  const { data, error } = await supabase
    .from('employer_jobs')
    .select('*')
    .not('lat', 'is', null)
    .not('lng', 'is', null);
  
  if (error) {
    console.error('Error fetching jobs with locations:', error);
    throw error;
  }
  
  return data || [];
};

export const deleteJob = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('employer_jobs')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting job:', error);
    return false;
  }
  
  return true;
};
