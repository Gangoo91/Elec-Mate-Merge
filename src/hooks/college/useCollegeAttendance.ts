import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getCollegeAttendance,
  getAttendanceByStudent,
  getAttendanceByDate,
  getStudentAttendanceRate,
  getCohortAttendanceRate,
  recordAttendance,
  bulkRecordAttendance,
  updateAttendance,
  deleteAttendance,
  CollegeAttendance,
} from '@/services/college';

export const useCollegeAttendance = (cohortId?: string) => {
  return useQuery({
    queryKey: ['college-attendance', cohortId],
    queryFn: () => getCollegeAttendance(cohortId),
  });
};

export const useStudentAttendance = (studentId: string) => {
  return useQuery({
    queryKey: ['college-attendance', 'student', studentId],
    queryFn: () => getAttendanceByStudent(studentId),
    enabled: !!studentId,
  });
};

export const useAttendanceByDate = (date: string, cohortId?: string) => {
  return useQuery({
    queryKey: ['college-attendance', 'date', date, cohortId],
    queryFn: () => getAttendanceByDate(date, cohortId),
    enabled: !!date,
  });
};

export const useStudentAttendanceRate = (studentId: string) => {
  return useQuery({
    queryKey: ['college-attendance', 'rate', 'student', studentId],
    queryFn: () => getStudentAttendanceRate(studentId),
    enabled: !!studentId,
  });
};

export const useCohortAttendanceRate = (cohortId: string) => {
  return useQuery({
    queryKey: ['college-attendance', 'rate', 'cohort', cohortId],
    queryFn: () => getCohortAttendanceRate(cohortId),
    enabled: !!cohortId,
  });
};

export const useRecordAttendance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (attendance: Omit<CollegeAttendance, 'id' | 'created_at'>) =>
      recordAttendance(attendance),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['college-attendance'] });
    },
  });
};

export const useBulkRecordAttendance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (records: Array<Omit<CollegeAttendance, 'id' | 'created_at'>>) =>
      bulkRecordAttendance(records),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['college-attendance'] });
    },
  });
};

export const useUpdateAttendance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<CollegeAttendance> }) =>
      updateAttendance(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['college-attendance'] });
    },
  });
};

export const useDeleteAttendance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAttendance,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['college-attendance'] });
    },
  });
};
