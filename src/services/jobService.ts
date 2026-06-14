import { supabase } from '@/integrations/supabase/client';

export type JobStatus = 'Active' | 'Pending' | 'Completed' | 'On Hold' | 'Cancelled';

// Turn a job's address into map coordinates via the shared geocode-location
// edge function (Google Geocoding, UK-biased). Best-effort: a geocode miss must
// never block saving the job — the map just won't pin it until the address is
// good. Coords flow on to worker presence pins via the timesheet_presence trigger.
export const geocodeAddress = async (
  location: string | null | undefined
): Promise<{ lat: number; lng: number } | null> => {
  if (!location || !location.trim()) return null;
  try {
    const { data, error } = await supabase.functions.invoke('geocode-location', {
      body: { location },
    });
    if (error) return null;
    const loc = (data as { location?: { lat?: number; lng?: number } } | null)?.location;
    if (loc && typeof loc.lat === 'number' && typeof loc.lng === 'number') {
      return { lat: loc.lat, lng: loc.lng };
    }
    return null;
  } catch {
    return null;
  }
};

export interface Job {
  id: string;
  user_id: string;
  title: string;
  client: string;
  client_phone: string | null;
  client_email: string | null;
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
  const { data, error } = await supabase.from('employer_jobs').select('*').eq('id', id).single();

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

  // Auto-geocode the address so the job pins on the live map (unless coords passed in).
  let coords: { lat: number; lng: number } | null =
    job.lat != null && job.lng != null ? { lat: job.lat, lng: job.lng } : null;
  if (!coords && job.location) coords = await geocodeAddress(job.location);

  const { data, error } = await supabase
    .from('employer_jobs')
    .insert({ ...job, ...(coords ?? {}), user_id: userData.user.id })
    .select()
    .single();

  if (error) {
    console.error('Error creating job:', error);
    throw error;
  }

  return data;
};

export const updateJob = async (id: string, updates: Partial<Job>): Promise<Job | null> => {
  // If the address is being set (and coords weren't supplied), re-geocode so the
  // pin follows. If the address was cleared, drop the old coords. On a geocode miss
  // we leave existing coords untouched — a transient failure shouldn't wipe a pin.
  const patch: Partial<Job> = { ...updates };
  if (updates.location !== undefined && updates.lat == null && updates.lng == null) {
    if (!updates.location) {
      patch.lat = null;
      patch.lng = null;
    } else {
      const coords = await geocodeAddress(updates.location);
      if (coords) {
        patch.lat = coords.lat;
        patch.lng = coords.lng;
      }
    }
  }

  const { data, error } = await supabase
    .from('employer_jobs')
    .update({ ...patch, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating job:', error);
    return null;
  }

  return data;
};

export const updateJobStatus = async (id: string, status: JobStatus): Promise<boolean> => {
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
  const { error } = await supabase.from('employer_jobs').delete().eq('id', id);

  if (error) {
    console.error('Error deleting job:', error);
    return false;
  }

  return true;
};
