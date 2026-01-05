import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getCollegeStudents,
  getActiveCollegeStudents,
  getCollegeStudentById,
  getStudentsByCohort,
  getStudentsAtRisk,
  createCollegeStudent,
  updateCollegeStudent,
  withdrawCollegeStudent,
  assignStudentToCohort,
  deleteCollegeStudent,
  CollegeStudent,
} from '@/services/college';

export const useCollegeStudents = (collegeId?: string) => {
  return useQuery({
    queryKey: ['college-students', collegeId],
    queryFn: () => getCollegeStudents(collegeId),
  });
};

export const useActiveCollegeStudents = (collegeId?: string) => {
  return useQuery({
    queryKey: ['college-students', 'active', collegeId],
    queryFn: () => getActiveCollegeStudents(collegeId),
  });
};

export const useCollegeStudent = (id: string) => {
  return useQuery({
    queryKey: ['college-students', 'student', id],
    queryFn: () => getCollegeStudentById(id),
    enabled: !!id,
  });
};

export const useStudentsByCohort = (cohortId: string) => {
  return useQuery({
    queryKey: ['college-students', 'cohort', cohortId],
    queryFn: () => getStudentsByCohort(cohortId),
    enabled: !!cohortId,
  });
};

export const useStudentsAtRisk = (collegeId?: string) => {
  return useQuery({
    queryKey: ['college-students', 'at-risk', collegeId],
    queryFn: () => getStudentsAtRisk(collegeId),
  });
};

export const useCreateCollegeStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (student: Omit<CollegeStudent, 'id' | 'created_at' | 'updated_at'>) =>
      createCollegeStudent(student),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['college-students'] });
      queryClient.invalidateQueries({ queryKey: ['college-cohorts'] });
    },
  });
};

export const useUpdateCollegeStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<CollegeStudent> }) =>
      updateCollegeStudent(id, updates),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['college-students'] });
      queryClient.invalidateQueries({ queryKey: ['college-students', 'student', variables.id] });
    },
  });
};

export const useWithdrawCollegeStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: withdrawCollegeStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['college-students'] });
      queryClient.invalidateQueries({ queryKey: ['college-cohorts'] });
    },
  });
};

export const useAssignStudentToCohort = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ studentId, cohortId }: { studentId: string; cohortId: string }) =>
      assignStudentToCohort(studentId, cohortId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['college-students'] });
      queryClient.invalidateQueries({ queryKey: ['college-cohorts'] });
    },
  });
};

export const useDeleteCollegeStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCollegeStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['college-students'] });
    },
  });
};
