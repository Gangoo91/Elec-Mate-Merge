import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getCollegeLessonPlans,
  getLessonPlansByCohort,
  getLessonPlansByTutor,
  getUpcomingLessons,
  getLessonPlanById,
  createLessonPlan,
  updateLessonPlan,
  approveLessonPlan,
  markLessonDelivered,
  deleteLessonPlan,
  CollegeLessonPlan,
} from '@/services/college';

export const useCollegeLessonPlans = (collegeId?: string) => {
  return useQuery({
    queryKey: ['college-lesson-plans', collegeId],
    queryFn: () => getCollegeLessonPlans(collegeId),
  });
};

export const useLessonPlansByCohort = (cohortId: string) => {
  return useQuery({
    queryKey: ['college-lesson-plans', 'cohort', cohortId],
    queryFn: () => getLessonPlansByCohort(cohortId),
    enabled: !!cohortId,
  });
};

export const useLessonPlansByTutor = (tutorId: string) => {
  return useQuery({
    queryKey: ['college-lesson-plans', 'tutor', tutorId],
    queryFn: () => getLessonPlansByTutor(tutorId),
    enabled: !!tutorId,
  });
};

export const useUpcomingLessons = (days: number = 7, collegeId?: string) => {
  return useQuery({
    queryKey: ['college-lesson-plans', 'upcoming', days, collegeId],
    queryFn: () => getUpcomingLessons(days, collegeId),
  });
};

export const useCollegeLessonPlan = (id: string) => {
  return useQuery({
    queryKey: ['college-lesson-plans', 'plan', id],
    queryFn: () => getLessonPlanById(id),
    enabled: !!id,
  });
};

export const useCreateLessonPlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (lessonPlan: Omit<CollegeLessonPlan, 'id' | 'created_at'>) =>
      createLessonPlan(lessonPlan),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['college-lesson-plans'] });
    },
  });
};

export const useUpdateLessonPlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<CollegeLessonPlan> }) =>
      updateLessonPlan(id, updates),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['college-lesson-plans'] });
      queryClient.invalidateQueries({ queryKey: ['college-lesson-plans', 'plan', variables.id] });
    },
  });
};

export const useApproveLessonPlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: approveLessonPlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['college-lesson-plans'] });
    },
  });
};

export const useMarkLessonDelivered = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markLessonDelivered,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['college-lesson-plans'] });
    },
  });
};

export const useDeleteLessonPlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLessonPlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['college-lesson-plans'] });
    },
  });
};
