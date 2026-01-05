import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getCollegeActivity,
  getActivityByActor,
  getActivityByEntity,
  logActivity,
  logCollegeAction,
  deleteActivity,
  CollegeActivity,
} from '@/services/college';

export const useCollegeActivity = (collegeId?: string, limit: number = 50) => {
  return useQuery({
    queryKey: ['college-activity', collegeId, limit],
    queryFn: () => getCollegeActivity(collegeId, limit),
  });
};

export const useActivityByActor = (actorId: string, limit: number = 50) => {
  return useQuery({
    queryKey: ['college-activity', 'actor', actorId, limit],
    queryFn: () => getActivityByActor(actorId, limit),
    enabled: !!actorId,
  });
};

export const useActivityByEntity = (
  entityType: string,
  entityId: string,
  limit: number = 50
) => {
  return useQuery({
    queryKey: ['college-activity', 'entity', entityType, entityId, limit],
    queryFn: () => getActivityByEntity(entityType, entityId, limit),
    enabled: !!entityType && !!entityId,
  });
};

export const useLogActivity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (activity: Omit<CollegeActivity, 'id' | 'created_at'>) =>
      logActivity(activity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['college-activity'] });
    },
  });
};

export const useLogCollegeAction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      collegeId,
      actorId,
      action,
      entityType,
      entityId,
      details,
    }: {
      collegeId: string;
      actorId: string;
      action: string;
      entityType?: string;
      entityId?: string;
      details?: Record<string, unknown>;
    }) => logCollegeAction(collegeId, actorId, action, entityType, entityId, details),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['college-activity'] });
    },
  });
};

export const useDeleteActivity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['college-activity'] });
    },
  });
};
