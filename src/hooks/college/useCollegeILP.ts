import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getCollegeILPs,
  getILPByStudent,
  getOverdueILPReviews,
  getILPById,
  createILP,
  updateILP,
  reviewILP,
  addILPTarget,
  updateILPTargetStatus,
  deleteILP,
  CollegeILP,
  ILPTarget,
} from '@/services/college';

export const useCollegeILPs = () => {
  return useQuery({
    queryKey: ['college-ilps'],
    queryFn: getCollegeILPs,
  });
};

export const useStudentILP = (studentId: string) => {
  return useQuery({
    queryKey: ['college-ilps', 'student', studentId],
    queryFn: () => getILPByStudent(studentId),
    enabled: !!studentId,
  });
};

export const useOverdueILPReviews = () => {
  return useQuery({
    queryKey: ['college-ilps', 'overdue'],
    queryFn: getOverdueILPReviews,
  });
};

export const useCollegeILP = (id: string) => {
  return useQuery({
    queryKey: ['college-ilps', 'ilp', id],
    queryFn: () => getILPById(id),
    enabled: !!id,
  });
};

export const useCreateILP = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ilp: Omit<CollegeILP, 'id' | 'created_at'>) =>
      createILP(ilp),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['college-ilps'] });
    },
  });
};

export const useUpdateILP = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<CollegeILP> }) =>
      updateILP(id, updates),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['college-ilps'] });
      queryClient.invalidateQueries({ queryKey: ['college-ilps', 'ilp', variables.id] });
    },
  });
};

export const useReviewILP = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      reviewerId,
      nextReviewDate,
    }: {
      id: string;
      reviewerId: string;
      nextReviewDate: string;
    }) => reviewILP(id, reviewerId, nextReviewDate),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['college-ilps'] });
    },
  });
};

export const useAddILPTarget = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, target }: { id: string; target: ILPTarget }) =>
      addILPTarget(id, target),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['college-ilps'] });
      queryClient.invalidateQueries({ queryKey: ['college-ilps', 'ilp', variables.id] });
    },
  });
};

export const useUpdateILPTargetStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      targetIndex,
      status,
    }: {
      id: string;
      targetIndex: number;
      status: ILPTarget['status'];
    }) => updateILPTargetStatus(id, targetIndex, status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['college-ilps'] });
      queryClient.invalidateQueries({ queryKey: ['college-ilps', 'ilp', variables.id] });
    },
  });
};

export const useDeleteILP = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteILP,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['college-ilps'] });
    },
  });
};
