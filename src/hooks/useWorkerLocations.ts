import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { OFFLINE_FIRST, offlineSnapshot } from '@/lib/workerOfflineCache';
import { useEffect } from 'react';
import { useRealtimeInvalidate } from '@/hooks/useRealtimeInvalidate';
import {
  getLatestWorkerLocations,
  updateWorkerLocation,
  checkInWorker,
  checkOutWorker,
  getWorkerLocationsByJob,
  subscribeToLocationUpdates,
  updateOwnLocation,
  getMyEmployeeRecord,
  getMyLatestLocation,
  WorkerStatus,
} from '@/services/locationService';

export const useWorkerLocations = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['worker-locations'],
    queryFn: getLatestWorkerLocations,
    refetchInterval: 30000, // Refetch every 30 seconds as backup
  });

  // Subscribe to real-time updates
  useEffect(() => {
    const unsubscribe = subscribeToLocationUpdates(() => {
      // Invalidate and refetch on any location update
      queryClient.invalidateQueries({ queryKey: ['worker-locations'] });
    });

    return unsubscribe;
  }, [queryClient]);

  return query;
};

export const useWorkerLocationsByJob = (jobId: string) => {
  return useQuery({
    queryKey: ['worker-locations', 'job', jobId],
    queryFn: () => getWorkerLocationsByJob(jobId),
    enabled: !!jobId,
  });
};

export const useUpdateWorkerLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      employeeId,
      lat,
      lng,
      status,
      jobId,
      accuracy,
    }: {
      employeeId: string;
      lat: number;
      lng: number;
      status: WorkerStatus;
      jobId?: string;
      accuracy?: number;
    }) => updateWorkerLocation(employeeId, lat, lng, status, jobId, accuracy),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['worker-locations'] });
    },
  });
};

export const useCheckInWorker = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      employeeId,
      jobId,
      lat,
      lng,
    }: {
      employeeId: string;
      jobId: string;
      lat: number | null;
      lng: number | null;
    }) => checkInWorker(employeeId, jobId, lat, lng),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['worker-locations'] });
    },
  });
};

export const useCheckOutWorker = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: checkOutWorker,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['worker-locations'] });
    },
  });
};

// Hook to get the current user's employee record
export const useMyEmployeeRecord = () => {
  return useQuery({
    queryKey: ['my-employee-record'],
    // ELE-1828: Worker Tools opens with no signal (the roster row gates every page).
    ...OFFLINE_FIRST,
    queryFn: () =>
      offlineSnapshot('my-employee-record', getMyEmployeeRecord, { nullIsSuspect: true }),
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
};

// Hook for a worker's own latest presence (status + when it was set).
// employer_employees.status is EMPLOYMENT status ('active'), not presence —
// worker-side UI must read presence from employer_worker_locations.
export const useMyLatestLocation = (employeeId?: string) => {
  // ELE-2004: the office can override a worker's status, and clocking out sets
  // Off Duty. Listen for this worker's rows so the page never shows a stale one.
  useRealtimeInvalidate(
    `my-location-${employeeId ?? 'none'}`,
    [{ table: 'employer_worker_locations', filter: `employee_id=eq.${employeeId}` }],
    [['my-latest-location', employeeId]],
    !!employeeId
  );
  return useQuery({
    queryKey: ['my-latest-location', employeeId],
    queryFn: () => getMyLatestLocation(employeeId!),
    enabled: !!employeeId,
    staleTime: 30 * 1000,
  });
};

// Hook for workers to update their own location (self-service)
export const useUpdateOwnLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      lat,
      lng,
      status,
      jobId,
      accuracy,
    }: {
      lat: number | null;
      lng: number | null;
      status: WorkerStatus;
      jobId?: string;
      accuracy?: number;
    }) => updateOwnLocation(lat, lng, status, jobId, accuracy),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['worker-locations'] });
      queryClient.invalidateQueries({ queryKey: ['my-employee-record'] });
      queryClient.invalidateQueries({ queryKey: ['my-latest-location'] });
    },
  });
};
