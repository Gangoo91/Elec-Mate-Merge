import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getCollegeGrades,
  getGradesByStudent,
  getPendingGrades,
  getGradeById,
  createGrade,
  updateGrade,
  gradeAssessment,
  verifyGrade,
  deleteGrade,
  CollegeGrade,
} from '@/services/college';

export const useCollegeGrades = (courseId?: string) => {
  return useQuery({
    queryKey: ['college-grades', courseId],
    queryFn: () => getCollegeGrades(courseId),
  });
};

export const useStudentGrades = (studentId: string) => {
  return useQuery({
    queryKey: ['college-grades', 'student', studentId],
    queryFn: () => getGradesByStudent(studentId),
    enabled: !!studentId,
  });
};

export const usePendingGrades = () => {
  return useQuery({
    queryKey: ['college-grades', 'pending'],
    queryFn: getPendingGrades,
  });
};

export const useCollegeGrade = (id: string) => {
  return useQuery({
    queryKey: ['college-grades', 'grade', id],
    queryFn: () => getGradeById(id),
    enabled: !!id,
  });
};

export const useCreateGrade = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (grade: Omit<CollegeGrade, 'id' | 'created_at'>) =>
      createGrade(grade),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['college-grades'] });
    },
  });
};

export const useUpdateGrade = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<CollegeGrade> }) =>
      updateGrade(id, updates),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['college-grades'] });
      queryClient.invalidateQueries({ queryKey: ['college-grades', 'grade', variables.id] });
    },
  });
};

export const useGradeAssessment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      grade,
      score,
      feedback,
      assessorId,
    }: {
      id: string;
      grade: string;
      score: number;
      feedback: string;
      assessorId: string;
    }) => gradeAssessment(id, grade, score, feedback, assessorId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['college-grades'] });
    },
  });
};

export const useVerifyGrade = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: verifyGrade,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['college-grades'] });
    },
  });
};

export const useDeleteGrade = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteGrade,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['college-grades'] });
    },
  });
};
