import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getCollegeEPAs,
  getEPAByStudent,
  getUpcomingEPAs,
  getEPAsByStatus,
  getEPAById,
  createEPA,
  updateEPA,
  updateEPAStatus,
  completeEPA,
  deleteEPA,
  CollegeEPA,
  EPAStatus,
} from '@/services/college';

export const useCollegeEPAs = () => {
  return useQuery({
    queryKey: ['college-epa'],
    queryFn: getCollegeEPAs,
  });
};

export const useStudentEPA = (studentId: string) => {
  return useQuery({
    queryKey: ['college-epa', 'student', studentId],
    queryFn: () => getEPAByStudent(studentId),
    enabled: !!studentId,
  });
};

export const useUpcomingEPAs = (days: number = 30) => {
  return useQuery({
    queryKey: ['college-epa', 'upcoming', days],
    queryFn: () => getUpcomingEPAs(days),
  });
};

export const useEPAsByStatus = (status: EPAStatus) => {
  return useQuery({
    queryKey: ['college-epa', 'status', status],
    queryFn: () => getEPAsByStatus(status),
  });
};

export const useCollegeEPA = (id: string) => {
  return useQuery({
    queryKey: ['college-epa', 'epa', id],
    queryFn: () => getEPAById(id),
    enabled: !!id,
  });
};

export const useCreateEPA = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (epa: Omit<CollegeEPA, 'id' | 'created_at' | 'updated_at'>) =>
      createEPA(epa),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['college-epa'] });
    },
  });
};

export const useUpdateEPA = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<CollegeEPA> }) =>
      updateEPA(id, updates),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['college-epa'] });
      queryClient.invalidateQueries({ queryKey: ['college-epa', 'epa', variables.id] });
    },
  });
};

export const useUpdateEPAStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
      updatedBy,
    }: {
      id: string;
      status: EPAStatus;
      updatedBy: string;
    }) => updateEPAStatus(id, status, updatedBy),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['college-epa'] });
    },
  });
};

export const useCompleteEPA = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      result,
      updatedBy,
    }: {
      id: string;
      result: string;
      updatedBy: string;
    }) => completeEPA(id, result, updatedBy),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['college-epa'] });
    },
  });
};

export const useDeleteEPA = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEPA,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['college-epa'] });
    },
  });
};
