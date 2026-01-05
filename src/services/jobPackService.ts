import { supabase } from '@/integrations/supabase/client';

export type JobPackStatus = 'Draft' | 'In Progress' | 'Complete';

export interface JobPack {
  id: string;
  title: string;
  client: string;
  location: string;
  scope: string | null;
  hazards: string[];
  assigned_workers: string[];
  status: JobPackStatus;
  rams_generated: boolean;
  method_statement_generated: boolean;
  briefing_pack_generated: boolean;
  start_date: string | null;
  estimated_value: number | null;
  sent_to_workers_at: string | null;
  briefing_content: string | null;
  required_certifications: string[];
  created_at: string;
  updated_at: string;
}

export const getJobPacks = async (): Promise<JobPack[]> => {
  const { data, error } = await supabase
    .from('job_packs')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching job packs:', error);
    throw error;
  }
  
  return (data || []) as JobPack[];
};

export const getJobPackById = async (id: string): Promise<JobPack | null> => {
  const { data, error } = await supabase
    .from('job_packs')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching job pack:', error);
    return null;
  }
  
  return data as JobPack;
};

export const createJobPack = async (
  jobPack: Omit<JobPack, 'id' | 'created_at' | 'updated_at'>
): Promise<JobPack> => {
  const { data, error } = await supabase
    .from('job_packs')
    .insert(jobPack)
    .select()
    .single();
  
  if (error) {
    console.error('Error creating job pack:', error);
    throw error;
  }
  
  return data as JobPack;
};

export const updateJobPack = async (
  id: string,
  updates: Partial<JobPack>
): Promise<JobPack | null> => {
  const { data, error } = await supabase
    .from('job_packs')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating job pack:', error);
    return null;
  }
  
  return data as JobPack;
};

export const deleteJobPack = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('job_packs')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting job pack:', error);
    return false;
  }
  
  return true;
};

export const updateJobPackDocumentStatus = async (
  id: string,
  documentType: 'rams_generated' | 'method_statement_generated' | 'briefing_pack_generated',
  status: boolean
): Promise<boolean> => {
  const { error } = await supabase
    .from('job_packs')
    .update({ [documentType]: status })
    .eq('id', id);
  
  if (error) {
    console.error('Error updating job pack document status:', error);
    return false;
  }
  
  return true;
};
