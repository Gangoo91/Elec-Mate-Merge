import { supabase } from '@/integrations/supabase/client';
import { realtimeChannelName } from '@/lib/realtimeChannel';
import type { Employee } from './employeeService';
import type { Job } from './jobService';

export type WorkerStatus = 'On Site' | 'En Route' | 'Office' | 'On Leave' | 'Off Duty';

export interface WorkerLocation {
  id: string;
  employee_id: string;
  job_id: string | null;
  lat: number;
  lng: number;
  accuracy: number | null;
  status: WorkerStatus;
  checked_in_at: string | null;
  checked_out_at: string | null;
  last_updated: string;
  created_at: string;
}

export interface WorkerLocationWithEmployee extends WorkerLocation {
  employees?: Employee;
  jobs?: Job | null;
}

export const getWorkerLocations = async (): Promise<WorkerLocationWithEmployee[]> => {
  const { data, error } = await supabase
    .from('employer_worker_locations')
    .select(
      `
      *,
      employees:employer_employees (*),
      jobs:employer_jobs (*)
    `
    )
    .order('last_updated', { ascending: false });

  if (error) {
    console.error('Error fetching worker locations:', error);
    throw error;
  }

  return data || [];
};

export const getLatestWorkerLocations = async (): Promise<WorkerLocationWithEmployee[]> => {
  const { data, error } = await supabase
    .from('employer_worker_locations')
    .select(
      `
      *,
      employees:employer_employees (*),
      jobs:employer_jobs (*)
    `
    )
    .order('last_updated', { ascending: false });

  if (error) {
    console.error('Error fetching latest worker locations:', error);
    throw error;
  }

  // Dedupe by employee_id to get only the latest location per worker
  const latestByEmployee = new Map<string, WorkerLocationWithEmployee>();
  for (const location of data || []) {
    if (!latestByEmployee.has(location.employee_id)) {
      latestByEmployee.set(location.employee_id, location);
    }
  }

  return Array.from(latestByEmployee.values());
};

export const updateWorkerLocation = async (
  employeeId: string,
  lat: number,
  lng: number,
  status: WorkerStatus,
  jobId?: string,
  accuracy?: number
): Promise<WorkerLocation> => {
  const { data, error } = await supabase
    .from('employer_worker_locations')
    .insert({
      employee_id: employeeId,
      lat,
      lng,
      status,
      job_id: jobId,
      accuracy,
      last_updated: new Date().toISOString(),
      checked_in_at: status === 'On Site' ? new Date().toISOString() : null,
    })
    .select()
    .single();

  if (error) {
    console.error('Error updating worker location:', error);
    throw error;
  }

  return data;
};

export const checkInWorker = async (
  employeeId: string,
  jobId: string,
  lat: number,
  lng: number
): Promise<WorkerLocation> => {
  return updateWorkerLocation(employeeId, lat, lng, 'On Site', jobId);
};

export const checkOutWorker = async (locationId: string): Promise<void> => {
  // .select() so an RLS denial (0 rows updated, no error) surfaces as a failure
  // instead of a silent no-op behind a "checked out" toast.
  const { data, error } = await supabase
    .from('employer_worker_locations')
    .update({
      checked_out_at: new Date().toISOString(),
      status: 'Off Duty' as WorkerStatus,
      last_updated: new Date().toISOString(),
    })
    .eq('id', locationId)
    .select('id');

  if (error) {
    console.error('Error checking out worker:', error);
    throw error;
  }
  if (!data || data.length === 0) {
    throw new Error('Check-out was not recorded — you may lack permission to update this worker');
  }
};

export const getWorkerLocationsByJob = async (
  jobId: string
): Promise<WorkerLocationWithEmployee[]> => {
  const { data, error } = await supabase
    .from('employer_worker_locations')
    .select(
      `
      *,
      employees:employer_employees (*),
      jobs:employer_jobs (*)
    `
    )
    .eq('job_id', jobId)
    .eq('status', 'On Site')
    .order('last_updated', { ascending: false });

  if (error) {
    console.error('Error fetching worker locations by job:', error);
    throw error;
  }

  return data || [];
};

// Subscribe to real-time location updates
export const subscribeToLocationUpdates = (
  callback: (payload: { new: WorkerLocation; old: WorkerLocation | null }) => void
) => {
  const channel = supabase
    .channel(realtimeChannelName('employer-worker-locations'))
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'employer_worker_locations',
      },
      (payload) => {
        callback({
          new: payload.new as WorkerLocation,
          old: payload.old as WorkerLocation | null,
        });
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};

// Calculate distance between two points in km (Haversine formula)
export const calculateDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number => {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const toRad = (deg: number): number => deg * (Math.PI / 180);

// Estimate travel time in minutes (assuming average 30 km/h in urban areas)
export const estimateTravelTime = (distanceKm: number): number => {
  const averageSpeedKmh = 30;
  return Math.round((distanceKm / averageSpeedKmh) * 60);
};

// Get current user's employee record (for self-service).
// Resolution is by user_id — the account link set by claim_employee_records()
// on sign-in (email matching is only the CLAIM mechanism, not the lookup key;
// worker RLS policies also key on user_id). Excludes self-created Elec-ID
// stubs (employer_id null) — only real roster rows count.
export const getMyEmployeeRecord = async (): Promise<Employee | null> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const fetchRecord = () =>
    supabase
      .from('employer_employees')
      .select('*')
      .eq('user_id', user.id)
      .not('employer_id', 'is', null)
      .order('created_at', { ascending: true })
      .limit(1)
      .maybeSingle();

  let { data, error } = await fetchRecord();

  // No linked roster row yet — the employer may have added this person by
  // email. Claim any matching rows (confirmed-email match, employer-created
  // rows only) and retry once.
  if (!data && !error) {
    const { data: claimed } = await supabase.rpc('claim_employee_records');
    if ((claimed ?? 0) > 0) {
      ({ data, error } = await fetchRecord());
    }
  }

  if (error) {
    console.error('Error fetching employee record:', error);
    return null;
  }

  return data;
};

// Latest presence row the worker set for themselves (status + timestamp).
// RLS: "Worker manages own location" lets a worker read their own rows, so
// this works from the worker-side pages — employer_employees.status is
// EMPLOYMENT status ('active'/'archived'), never presence, and must not be
// used for it.
export const getMyLatestLocation = async (
  employeeId: string
): Promise<WorkerLocation | null> => {
  const { data, error } = await supabase
    .from('employer_worker_locations')
    .select('*')
    .eq('employee_id', employeeId)
    .order('last_updated', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('Error fetching own latest location:', error);
    return null;
  }

  return data;
};

// Update own location (for self-service - worker updates their own status)
export const updateOwnLocation = async (
  lat: number,
  lng: number,
  status: WorkerStatus,
  jobId?: string,
  accuracy?: number
): Promise<WorkerLocation | null> => {
  // First get the current user's employee record
  const employee = await getMyEmployeeRecord();
  if (!employee) {
    console.error('No employee record found for current user');
    return null;
  }

  try {
    const result = await updateWorkerLocation(employee.id, lat, lng, status, jobId, accuracy);
    return result;
  } catch (error) {
    console.error('Error updating own location:', error);
    return null;
  }
};

// Export as named object for backward compatibility
export const LocationService = {
  getWorkerLocations,
  getLatestWorkerLocations,
  calculateDistance,
  estimateTravelTime,
  getMyEmployeeRecord,
  updateOwnLocation,
};
