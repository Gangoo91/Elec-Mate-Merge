import { supabase } from '@/integrations/supabase/client';
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
    .select(`
      *,
      employer_employees (*),
      employer_jobs (*)
    `)
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
    .select(`
      *,
      employer_employees (*),
      employer_jobs (*)
    `)
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

export const checkOutWorker = async (
  locationId: string
): Promise<boolean> => {
  const { error } = await supabase
    .from('employer_worker_locations')
    .update({
      checked_out_at: new Date().toISOString(),
      status: 'Off Duty' as WorkerStatus,
      last_updated: new Date().toISOString(),
    })
    .eq('id', locationId);
  
  if (error) {
    console.error('Error checking out worker:', error);
    return false;
  }
  
  return true;
};

export const getWorkerLocationsByJob = async (
  jobId: string
): Promise<WorkerLocationWithEmployee[]> => {
  const { data, error } = await supabase
    .from('employer_worker_locations')
    .select(`
      *,
      employer_employees (*),
      employer_jobs (*)
    `)
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
    .channel('employer-worker-locations')
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
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const toRad = (deg: number): number => deg * (Math.PI / 180);

// Estimate travel time in minutes (assuming average 30 km/h in urban areas)
export const estimateTravelTime = (distanceKm: number): number => {
  const averageSpeedKmh = 30;
  return Math.round((distanceKm / averageSpeedKmh) * 60);
};

// Export as named object for backward compatibility
export const LocationService = {
  getWorkerLocations,
  getLatestWorkerLocations,
  calculateDistance,
  estimateTravelTime
};
