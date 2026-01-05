import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getCollegeCourses,
  getActiveCollegeCourses,
  getCollegeCourseById,
  createCollegeCourse,
  updateCollegeCourse,
  deleteCollegeCourse,
  CollegeCourse,
} from '@/services/college';

export const useCollegeCourses = (collegeId?: string) => {
  return useQuery({
    queryKey: ['college-courses', collegeId],
    queryFn: () => getCollegeCourses(collegeId),
  });
};

export const useActiveCollegeCourses = (collegeId?: string) => {
  return useQuery({
    queryKey: ['college-courses', 'active', collegeId],
    queryFn: () => getActiveCollegeCourses(collegeId),
  });
};

export const useCollegeCourse = (id: string) => {
  return useQuery({
    queryKey: ['college-courses', 'course', id],
    queryFn: () => getCollegeCourseById(id),
    enabled: !!id,
  });
};

export const useCreateCollegeCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (course: Omit<CollegeCourse, 'id' | 'created_at'>) =>
      createCollegeCourse(course),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['college-courses'] });
    },
  });
};

export const useUpdateCollegeCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<CollegeCourse> }) =>
      updateCollegeCourse(id, updates),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['college-courses'] });
      queryClient.invalidateQueries({ queryKey: ['college-courses', 'course', variables.id] });
    },
  });
};

export const useDeleteCollegeCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCollegeCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['college-courses'] });
    },
  });
};
