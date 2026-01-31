import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import {
  getLatestWorkerLocations,
  updateWorkerLocation,
  checkInWorker,
  checkOutWorker,
  getWorkerLocationsByJob,
  subscribeToLocationUpdates,
  updateOwnLocation,
  getMyEmployeeRecord,
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
      lat: number;
      lng: number;
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
    queryFn: getMyEmployeeRecord,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
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
      lat: number;
      lng: number;
      status: WorkerStatus;
      jobId?: string;
      accuracy?: number;
    }) => updateOwnLocation(lat, lng, status, jobId, accuracy),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['worker-locations'] });
      queryClient.invalidateQueries({ queryKey: ['my-employee-record'] });
    },
  });
};
