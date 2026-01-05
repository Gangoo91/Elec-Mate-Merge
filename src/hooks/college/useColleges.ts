import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getColleges,
  getCollegeById,
  createCollege,
  updateCollege,
  deleteCollege,
  College,
} from '@/services/college';

export const useColleges = () => {
  return useQuery({
    queryKey: ['colleges'],
    queryFn: getColleges,
  });
};

export const useCollege = (id: string) => {
  return useQuery({
    queryKey: ['colleges', id],
    queryFn: () => getCollegeById(id),
    enabled: !!id,
  });
};

export const useCreateCollege = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (college: Omit<College, 'id' | 'created_at' | 'updated_at'>) =>
      createCollege(college),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['colleges'] });
    },
  });
};

export const useUpdateCollege = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<College> }) =>
      updateCollege(id, updates),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['colleges'] });
      queryClient.invalidateQueries({ queryKey: ['colleges', variables.id] });
    },
  });
};

export const useDeleteCollege = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCollege,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['colleges'] });
    },
  });
};
