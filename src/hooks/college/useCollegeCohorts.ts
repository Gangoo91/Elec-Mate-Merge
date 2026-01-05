import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getCollegeCohorts,
  getActiveCollegeCohorts,
  getCollegeCohortById,
  getCohortsByTutor,
  createCollegeCohort,
  updateCollegeCohort,
  deleteCollegeCohort,
  CollegeCohort,
} from '@/services/college';

export const useCollegeCohorts = (collegeId?: string) => {
  return useQuery({
    queryKey: ['college-cohorts', collegeId],
    queryFn: () => getCollegeCohorts(collegeId),
  });
};

export const useActiveCollegeCohorts = (collegeId?: string) => {
  return useQuery({
    queryKey: ['college-cohorts', 'active', collegeId],
    queryFn: () => getActiveCollegeCohorts(collegeId),
  });
};

export const useCollegeCohort = (id: string) => {
  return useQuery({
    queryKey: ['college-cohorts', 'cohort', id],
    queryFn: () => getCollegeCohortById(id),
    enabled: !!id,
  });
};

export const useCohortsByTutor = (tutorId: string) => {
  return useQuery({
    queryKey: ['college-cohorts', 'tutor', tutorId],
    queryFn: () => getCohortsByTutor(tutorId),
    enabled: !!tutorId,
  });
};

export const useCreateCollegeCohort = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cohort: Omit<CollegeCohort, 'id' | 'created_at'>) =>
      createCollegeCohort(cohort),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['college-cohorts'] });
    },
  });
};

export const useUpdateCollegeCohort = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<CollegeCohort> }) =>
      updateCollegeCohort(id, updates),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['college-cohorts'] });
      queryClient.invalidateQueries({ queryKey: ['college-cohorts', 'cohort', variables.id] });
    },
  });
};

export const useDeleteCollegeCohort = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCollegeCohort,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['college-cohorts'] });
    },
  });
};
